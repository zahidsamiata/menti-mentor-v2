# Consent (Rıza) Modeli — Şema Tasarımı + Migration Planı

**📸 DONDURULMUŞ (2026-08-28)** — Bu belge **G1-07 (rıza sürümü) + G1-08 (OAuth/tipli rıza) uygulama turunun KAYNAĞIDIR.** Tasarım kararı burada; uygulama ayrı, PO-onaylı migration turunda yapılır. Güncel durum için `09-DURUM.md`, açık iş için `00-KARAR-TAKIP.md`.

> **Kapsam (PO, 2026-08-28):** Bu belge YALNIZ **şema tasarımı + migration PLANI**dır (tasarım turu).
>
> ✅ **GÜNCELLEME (2026-08-28, Tur A tamamlandı — backend PR #58):** Bu tasarım **KODLANDI + CI'da prova edildi** (şema + `consentService` + dual-write + backfill + testler). **Sapmalar:** (1) backfill `.mjs` yerine **`.ts`** (tsx-run, saf mantık `src/services/consentBackfill.ts`, tsc-temiz); (2) planlanan tasarıma sadık kalındı — keşifte bir ajanın önerdiği `role`-scoped consent **REDDEDİLDİ** (bu belge canonical). Kritik guard `platformTenantController.ts:203` dual-write ile çalışmaya devam eder (G1-08'de consentService'e geçer).
>
> ✅ **GÜNCELLEME (2026-08-28, Tur B1 — migration CANLIDA uygulandı, PR #133):** `20260828000000_add_consent` CANLI Neon'a `db execute` + `migrate resolve --applied` ile uygulandı; `migrate status` = "up to date". **Doğrulama:** Consent tablosu (9 sütun) + `ConsentType`/`ConsentSource` enum + 3 index + 2 FK oluştu; **ön-sayımlar değişmedi** (mevcut veriye dokunulmadı); Consent boş (0 satır). Backfill **DRY-RUN**: 5 satır yazılacak (5 user + 0 tenant). ⬜ **Kalan Tur B2 (ayrı PO onayı):** backfill `--apply`.

---

## 1. Neden tipli tablo (minimal değil)
Mevcut durum kod-teyitli: rıza yalnız zaman damgası — `kvkkConsentAt DateTime?` (`schema.prisma:186` Tenant, `:277` User). Sürüm/tip YOK (`consentVersion` grep boş). Yazımı 3 yolda: `authController.ts:176` (normal), `selfServeController.ts` (STK), `oauthService.ts:112` (OAuth — UI'da rıza göstermeden).

**PO kararı — ayrı tipli+sürümlü `Consent` modeli:** Minimal şemada (tek `consentVersion` alanı) **her yeni rıza türü = yeni migration** (canlı DB kırmızı kural). Tipli tabloda **yeni satır yeter, migration gerekmez.** Avukattan kaç rıza türü geleceği belirsiz → esnek yapı şart. Örn. **Big Five kişilik profili ayrı açık rıza gerektirebilir (G1-11, avukat bekliyor)** → tipli tabloda tek `type` satırı olur.

## 2. Consent tablosu — alanlar
```prisma
model Consent {
  id         String        @id @default(cuid())
  // Özne: bireysel rıza → userId; kurum (self-serve register) → tenantId. Biri dolu.
  userId     String?
  tenantId   String?
  type       ConsentType             // rıza türü (bkz. §3)
  version    String                  // metin sürümü, ör. 'v1.0' (kodda CONSENT_VERSION sabiti)
  grantedAt  DateTime                // rıza anı (KVKK Md.5 ispat)
  revokedAt  DateTime?               // geri çekme anı (null = aktif)
  source     ConsentSource           // rıza hangi akıştan alındı
  createdAt  DateTime @default(now())

  user   User?   @relation(fields: [userId],   references: [id], onDelete: Cascade)
  tenant Tenant? @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  @@index([userId, type])
  @@index([tenantId, type])
}
```
- **"Güncel rıza" okuma:** verilen özne+`type` için `revokedAt = null` olan en yeni `grantedAt` satırı. Geçmiş satırlar **silinmez** (denetim izi + sürüm geçmişi).
- **18+ beyanı bu tabloya GİRMEZ** — beyandır, rıza değil; tek kutuda kalır (G1-01 kararı). KVKK ayrıklık kuralı **veri işleme rızaları** için geçerli.
- Mevcut `kvkkConsentAt` (User:277, Tenant:186) **bu turda silinmez** — geriye uyum; yeni yazımlar Consent'e (dual-write), eski alanın kaldırılması ayrı/sonraki iş.

## 3. Başlangıç `type` değerleri (enum)
```prisma
enum ConsentType {
  AYDINLATMA   // KVKK Aydınlatma Metni okundu/onaylandı (bilgilendirme onayı)
  ACIK_RIZA    // Kişisel veri işleme açık rızası (KVKK Md.5/1)
  // İLERİDE (yeni satır yeter, tablo/kolon migration'ı GEREKMEZ):
  //   PAZARLAMA        — iletişim/pazarlama rızası (avukat: gelebilir)
  //   BIG_FIVE_PROFIL  — kişilik profili işleme açık rızası (G1-11, avukat bekliyor)
}
enum ConsentSource { FORM OAUTH SELF_SERVE BACKFILL }
```
> Enum'a değer eklemek teknik olarak migration'dır AMA veri taşıma/tablo değişikliği YOK (düşük risk). Asıl kazanç: yeni rıza için yeni tablo/kolon açılmıyor.

## 4. Backfill — mevcut `kvkkConsentAt` taşıma (⚠️ G1-16 ile BAĞLI)
- **G1-16 = "eski kayıt rıza backfill"** ile aynı iş → kullanıcı ~sıfırken neredeyse bedava, sonra imkânsız (⭐ zamanlama kritik, şimdi yapılmalı).
- Her `User.kvkkConsentAt != null` için Consent satırı: `type=ACIK_RIZA · version='v1.0-legacy' · grantedAt=kvkkConsentAt · source=BACKFILL`. Aynısı `Tenant.kvkkConsentAt` için.
- **⭐ TEYİT CEVABI 1 (PO 2026-08-28) — AYDINLATMA backfill'i YAPILMAYACAK:** Yalnız `ACIK_RIZA` yazılır. Gerekçe: eski kullanıcılar ayrı bir aydınlatma onayı **GÖRMEDİ**; geriye dönük AYDINLATMA satırı yazmak **olmamış bir onayı kayda geçirmek** olur — eksik kayıttan daha kötü. Yerine: yeni sürüm yayınlanınca **bir sonraki girişte yeniden onay** istenir.
- **Idempotent:** "özne+type için satır varsa atla" → yeniden çalıştırılabilir.
- Backfill `backend/scripts/` altında, prod `DATABASE_URL`, PO onayı — **uygulama turunda yazılır/çalıştırılır.**

## 5. Geri alınabilirlik — rıza çekilirse ne olur
Geri çekme = ilgili aktif satıra `revokedAt = now()` (yeni "iptal" satırı değil). İleriye dönüktür — geçmiş yasal işlemeyi geçersiz kılmaz (KVKK).

- **⭐ TEYİT CEVABI 2 (PO 2026-08-28) — ACIK_RIZA çekilince OTOMATİK ANONİMLEŞTİRME YOK.** Davranış:
  1. Hesap **PASİFLEŞTİRİLİR**,
  2. eşleştirme/profil işleme **DURUR**,
  3. kullanıcıya **AYRICA** "verilerimi tamamen sil" seçeneği sunulur.
  Gerekçe: anonimleştirme geri alınamaz; kullanıcı rızasını çekerken hesabının yok olmasını istemiyor olabilir. KVKK "işleme dursun" der, "veri yok olsun" demez. ⚠️ **Nihai teyit avukatta → G1-10 paketine.**
- **AYDINLATMA:** bilgilendirme onayıdır, klasik "geri çekme" konusu değil; metin sürümü değişince (yeni `version`) yeniden onay istenir.
- **BIG_FIVE_PROFIL (ileride):** çekilirse yalnız kişilik-tabanlı skorlama devre dışı, hesap yaşayabilir (kısmi işleme) — G1-11 tasarımına bırakılır.

## 6. Migration — adım adım + geri alma (ÇALIŞTIRMA YOK, plan)
1. `schema.prisma`'ya `Consent` + `ConsentType` + `ConsentSource` ekle (User/Tenant'a `consents Consent[]` relation).
2. Migration SQL üret — **Neon shadow-DB kuralı:** `CREATE TABLE IF NOT EXISTS` + enum `IF NOT EXISTS` → elle SQL → `prisma db execute` → `prisma migrate resolve --applied`. **`db push --accept-data-loss` YASAK.**
3. Kod: `consentService.recordConsent()` yaz — üç kayıt yolu (`authController.ts:176`, `selfServeController.ts`, `oauthService.ts:112`) buna çağrı (dual-write: `kvkkConsentAt` + Consent). G1-08: OAuth akışında rıza gösterimi + tipli yazım.
4. Backfill script (idempotent, yalnız ACIK_RIZA) — PO onayı + prod URL, ayrı adım.
5. Doğrula: `Consent(ACIK_RIZA)` satır sayısı == dolu `kvkkConsentAt` sayısı.
- **Geri alma yolu:** tablo **additive** + dual-write → güvenli. Rollback = `DROP TABLE Consent` + enum'ları düşür (yalnız yeni consent satırları kaybolur; `kvkkConsentAt` dokunulmadığı için legacy akış tam çalışır). Kodun dual-write'ı geri alınır.

## 7. Bağlı işler / açık uçlar
- **G1-08:** OAuth rıza gösterimi + tipli yazım — bu modele bağlı, aynı/sonraki tur.
- **G1-10:** avukat aydınlatma metni → `CONSENT_VERSION` sürümü + geri-çekme nihai davranışı + Message saklama süresi bu pakete bağlı.
- **G1-11:** Big Five açık rızası — geldiğinde tipli tabloya `BIG_FIVE_PROFIL` satırı (migration yok).
- **G1-16:** eski kayıt backfill = §4 (birlikte yapılır).
- **G1-01:** 18-altı/veli onayı → G1-10 (avukat); consent tablosuna girmez.

---
*Canonical uygulama takibi: `00-KARAR-TAKIP.md` (G1-07/G1-08). Bu belge dondurulmuş tasarım kaynağıdır; uygulama turu bunu izler.*
