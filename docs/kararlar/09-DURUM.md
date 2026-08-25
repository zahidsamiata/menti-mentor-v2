# 09 — GÜNCEL DURUM (ŞU AN NEREDEYİZ)

**🔄 YAŞAYAN** (canonical: güncel durum) · **Son güncelleme:** 2026-08-23

> **⚡ ŞU AN (git ile doğrulandı):** Çatı main HEAD `753c545` (#95) · backend main HEAD / submodule pointer `b6187c1`
> (senkron) · **açık kod PR: 0/0, masa temiz.** Bu sabah **#12 DISC çoklu harf** (backend #47 + çatı #93 + docs #94) ve
> **#37 login enumeration sertleştirme** (backend #46 + çatı #91 + docs #92) MERGED → **canlıda.** Açık docs PR: keşif
> raporları (#96 tam-envanter · #97 belge-mimarisi) — merge PO'da, kod değil.
>
> **⚡ GÜNCELLEME (2026-08-19, sonraki tur):** Yukarıdaki snapshot bayat. Bu sabahki docs PR'ları (#96/#97) +
> #99 karar-takip MERGED → çatı main HEAD **`9a580a5`**, backend main HEAD/pointer **`b6187c1`** (senkron).
> **YENİ AÇIK KOD PR (bu tur, #7 Aşama 1 — MERGE OLMADI):** backend **#48** + çatı **#100** (FE + pointer bump).
> Detay: aşağıdaki "🔀 #7 AŞAMA 1" bölümü.
>
> **⚡ GÜNCELLEME (2026-08-19, merge turu — GÜNCEL SNAPSHOT):** #7 Aşama 1 PR'ları MERGED → **çatı main HEAD `ef2b995`**,
> **backend main HEAD `b5f4b88`**, **submodule pointer `b5f4b88` (senkron)**, **açık kod PR 0/0** (git doğrulandı).
> İki main CI yeşil. #7 Aşama 1 artık **CANLIDA** (autodeploy). Detay: aşağıdaki "🔀 #7 AŞAMA 1" bölümü (✅ MERGED notu).
>
> **⚡ GÜNCELLEME (2026-08-19, küçük işler paketi — ✅ MERGED, CANLIDA — GÜNCEL SNAPSHOT):** #34 + #7(A) + #9-gösterim
> PR'ları MERGED → **çatı main HEAD `0fd4942`**, **backend main HEAD `18cfc42`**, **submodule pointer `18cfc42` (senkron)**,
> **açık kod PR 0/0** (git doğrulandı). İki main CI yeşil. Backend #49 → `18cfc42`; çatı #102 → `0fd4942` (pointer backend main
> HEAD'e bump edildi, ileri-sarım teyitli). Bağlanan uçlar artık **CANLIDA** (autodeploy). Detay: "✅ KÜÇÜK İŞLER PAKETİ" bölümü.
>
> **⚡ GÜNCELLEME (2026-08-19, #37 kurum düzeltme-iste — ✅ MERGED, CANLIDA — GÜNCEL SNAPSHOT):** #37 PR'ları MERGED →
> **çatı main HEAD `2639e2e`**, **backend main HEAD `ba92dfa`**, **submodule pointer `ba92dfa` (senkron)**, **açık kod PR 0/0**
> (git doğrulandı). İki main CI yeşil. Backend #50 → `ba92dfa`; çatı #104 → `2639e2e` (pointer bump, ileri-sarım teyitli).
> 🛑 **MIGRATION CANLIDA:** `CORRECTION_REQUESTED` enum + `Tenant.correctionNote` (canlı DB'de VAR, teyitli; Tenant 3→3).
> Mail altyapısı hazır ama **GÖNDERİM KAPALI** (`TENANT_NOTIFICATIONS_ENABLED=false`). Detay: "✅ #37 KURUM DÜZELTME-İSTE" bölümü.
>
> **⚡ GÜNCELLEME (2026-08-23, strateji-denetimi + PO oturumu — GÜNCEL SNAPSHOT):** İki docs PR bu turda işlendi.
> (1) **Strateji↔gerçek denetimi** (`strateji-gercek-denetimi-2026-08-20.md`, salt-okuma): 6 strateji/persona belgesi kodla
> madde-madde karşılaştırıldı — **85 madde, %66 tam var.** PR **#106 → MERGED** (çatı main HEAD **`c747de1`**; backend main/pointer
> **`ba92dfa` değişmedi, senkron**; kod değişikliği YOK, yalnız yeni rapor). İki main CI yeşil.
> **Ana bulgu:** admin tasarım-kartları (6 panel + oyunlaştırma) baştan sona uygulanmış; kalan kopukluk 3 eksende —
> (a) mail/bildirim (37m, en yüksek kaldıraç · 🟠 küme), (b) menti retention inceliği (bekleme anı/ret-yumuşatma/kutlama),
> (c) yönetici kanıt katmanı (rapor export + ivme/oran metrikleri). Öz-doğrulama 2 alt-ajan false-negatif'ini düzeltti
> (mentör DISC aha-kartı + paylaşım aslında VAR).
> (2) **Karar-takip senkronu** (bu docs PR): PO'nun bu oturumdaki kararları `00-KARAR-TAKIP.md`'ye işlendi — 9a (tüm yöneticiler +
> değişiklik izi), 9b (düzeltilecek), K6 (v2), K3 (en son), sektör/etiket (talep-onay), 2a ghost-red (**30 gün uyku modu**),
> #7 otomatik pasifleştirme (varsayılan kapalı), #13 (ertelendi), #31 (felsefe-keşfi sonrası), **DISC-DERİNLEŞME kurgusu**
> (numarasız — eski "#38" etiketi madde-38 güvenlikle çakıştığı için 2026-08-23'te ada çevrildi), Y1–Y7 denetim işleri + 2 keşif turu (içerik-felsefe, belge-düzeni). Detay: `00-KARAR-TAKIP.md` Bölüm B.4 + satır-içi notlar.
>
> **⚡ GÜNCELLEME (2026-08-23, belge-düzeni reorg — salt-docs, KOD YOK):** `docs/kararlar/` ve `docs/raporlar/` şişince
> **alt-klasörlere** ayrıldı (git mv, içerik değişmedi): kararlar → `konu/` + `oz-denetim/`; raporlar → `kesif/` + `kod-denetimi/`
> + `panel/` + `persona/` + `icerik/`. Canonical taşıyıcılar (00-INDEX · 09-DURUM · 00-KARAR-TAKIP · 10-yol-haritasi ·
> 10-yol-tamamlananlar) `kararlar/` kökünde KALDI. 38 tam-yol referansı yeni konumlara güncellendi; 00-INDEX yeni ağaca göre
> yeniden yazıldı; `belge-duzeni-rehberi` Kural 2 alt-klasör genişletmesiyle tazelendi. **Kırık-link taraması: 0** (bayat 2 devir
> işaretçisi de düzeltildi). docs/ dosya sayısı 68 (kayıp yok). PR (docs) — **merge PO'da.** Kod/DB dokunulmadı, #110 ellenmedi.
>
> **⚡ GÜNCELLEME (2026-08-23, tam-belge taraması — salt-okuma keşif, KOD YOK):** Reorg turunda belgeler yüzeysel tarandığından
> içlerindeki kararlar sistematik çıkarılmamıştı. Bu turda **42 içerik belgesi TAM okundu + kod gerçeğiyle çapraz kontrol**
> (7 paralel salt-okuma ajanı) → **13 gerçek yeni kayıp madde** → `00-KARAR-TAKIP.md` **Bölüm F**. Bunların **3'ü 🔴 GÜVENLİK
> canlı-öncesi**: G1 `updateUser` password/PII sızıntısı (`userController.ts:272-277`), G2 `hardDeleteUser` FK-RESTRICT →
> KVKK kalıcı silme çalışmıyor (`gdprService.ts:172-174`), G3 `SuspicionReport` reporter PII maskesiz (`platformController.ts:353`).
> ⚠️ Repolar PUBLIC → önce PRIVATE + düzelt. Yeni rapor: `../raporlar/kod-denetimi/tam-belge-taramasi-2026-08-23.md`.
> MADDE 67 (çerez izni) 10-yol'da VAR (eklenmedi). Kod OKUNDU, değiştirilmedi; DB'ye dokunulmadı.
>
> **⚡ GÜNCELLEME (2026-08-23, niyet envanteri + numaralandırma — salt-docs):** (1) **Kırmızı kural düzeltmesi:** "güvenli seed" listesi
> silinen `seed-questions.ts`'i sayıyordu → gerçek liste `seed-certification`+`seed-learning-journey`+`seed-test-tenant.mjs` (CLAUDE.md+4 belge).
> (2) **Niyet envanteri (5 ajan):** yarım-iş/bağlanmamış-kod kod-arkeolojisi → `00-KARAR-TAKIP` **C.2** + rapor `yarim-is-niyet-envanteri-2026-08-23.md`;
> "~14 FE'siz özellik" → **9 doğrulandı.** (3) **Numaralandırma:** Bölüm F → yol haritası **madde 68-78** (`v1-H`); **#38 çakışması çözüldü**
> (madde 38=güvenlik canonical; DISC işi numarasız "DISC-DERİNLEŞME kurgusu"). (4) **KURAL 7** (taşıyıcı belge iş bölümü) rehbere eklendi.
> (5) `durum-panosu-2026-08-14` 🔄→📸 adayı (Bölüm E). Gerçek statü çelişkisi: 0. Tümü #112'de (merge PO'da).
>
> **⚡ GÜNCELLEME (2026-08-25, KVKK güvenlik turu — KOD + docs):** İlk KOD turu (docs değil).
> **(A) K0 güvenlik düzeltmeleri → backend PR #51 (MERGE OLMADI):** madde 38 `updateUser`/temperament password+PII sızıntısı
> (db.ts global omit `{user:{password:true}}` + explicit select + test) · madde 68 `SuspicionReport` reporter PII maskeleme
> (maskName/maskContact + test). tsc/tsc-test/eslint temiz; DB testleri CI'da (guard). **Çatı submodule pointer'ı DEĞİŞMEDİ** (backend merge olmadı).
> **(B) FAZ B teyitleri (salt-okuma):** T7 opt-in eşleşmeyi bloklamıyor (K2) · `maxMeetingsPerWeek` enforce EDİLMİYOR (madde 79) · 9b indirmesi doğru.
> **(C) KVKK veri aktarım envanteri** (kod-kanıtlı, 2 ajan) → `../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md`;
> 8 hukukçu sorusu + [PO DOLDURACAK] alanlar. **Yeni maddeler 79-87** (00-KARAR-TAKIP F.5). **KALAN (bu tur YAPILMADI):** FAZ D KVKK belge paketi
> (8 belge — envanter hazır, ayrı tur) · FAZ E FE entegrasyonu (merge-kilitli PR). Bağlam sınırı nedeniyle dürüstçe bırakıldı.
>
> **⚡ GÜNCELLEME (2026-08-23, canlı çıkış planı — salt-docs):** Dağınık ~58 açık iş **tek çıkış planına** sınıflandı → yeni canonical
> `00-CIKIS-PLANI.md` (K0-K5 + tur planı). **KATI test:** ~40 "v1" maddenin çoğu çıkışı ENGELLEMİYOR → **gerçek çıkış-bloker: 5 K0**
> (madde 38/68 PII sızıntısı · 39 KVKK silme · repo private · KVKK metinleri) **+ 1 K1** (foto volume) + 2 şüpheli (T7 opt-in, maxMeetings — TEYİT GEREK).
> **İndirilenler (K0/K1→K2):** çerez izni #67 (analytics'siz çıkışta gerekmez), 9b (henüz görünür yalan değil), K3 (~0 kullanıcı), T3, KVKK FE.
> **KURAL 8** (bulgu yaşam döngüsü) rehbere + CLAUDE.md'ye eklendi. Tur sırası: PO manuel (repo private+foto+metin) → güvenlik 38+68 (paralel) → G2 migration (tek başına). Kod OKUNDU, değiştirilmedi.
>
> Bu belge SIK güncellenir — her oturum başında oku, sonunda güncelle. **Sıradaki işler + öncelik:**
> `10-yol-haritasi.md`. **Tarih/SHA katmanı geçmişi (bu belgeden taşındı):** `docs/arsiv/09-DURUM-gecmis-katmanlar-2026-08-19.md`.
> **2026-08-10 öncesi tam geçmiş:** `docs/arsiv/09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md`.
> **Belge denetimi (neden temizlendi):** `belge-denetimi-2026-08-10.md`.

---

## ⚡ TEK BAKIŞTA (şu an — hepsi doğrulanmış)
- **Canlı:** sivilkapasite.org ayakta (Dokploy). **Mail çalışıyor** (generic SMTP relay — Resend/Brevo;
  Gmail App Password kaldırıldı, `emailService.ts`). Forgot/reset-password akışı tam.
- **DB:** Canlı = lokal aynı Neon (`ep-fancy-tooth-ab4u5xhr`). DISC soruları (20) + öğrenme aşamaları (13) yüklü.
- **Backend main HEAD:** `b6187c1` (#46 login enumeration merge) · **çatı main HEAD** `753c545` (#95) · **submodule pointer = `b6187c1`**
  (backend main HEAD ile TAM SENKRON, `git submodule status` + `ls-tree` doğrulandı). **Migration/DB/seed çalıştırma bu turda YOK.**
  > Eski SHA senkron katmanları (her merge turunun tarihsel izi) → `docs/arsiv/09-DURUM-gecmis-katmanlar-2026-08-19.md` (B bölümü).
- **Açık PR:** kod **çatı 0 · backend 0 — masa temiz** (git + `gh pr list` doğrulandı). Açık **docs PR: #96 (tam-envanter keşfi) · #97 (belge-mimarisi keşfi)** — merge PO'da, kod değil.
  > Eski "açık PR" katmanları (her turun tarihsel izi) → `docs/arsiv/09-DURUM-gecmis-katmanlar-2026-08-19.md` (C bölümü).
- **İzole test DB:** `backend/.env.test` + `assertTestDatabase` guard VAR (lokal `verify` güvenli).

## ✅ #7 AŞAMA 1 — DEĞERLENDİRME/METRİK ÖLÜ UÇLARINI BAĞLA — MERGED, CANLIDA (2026-08-19)
> **⚡ GÜNCELLEME (2026-08-19, merge turu):** ~~PR'DA (MERGE OLMADI)~~ → **MERGED, canlıda.** Backend **#48** → backend main `b5f4b88`;
> çatı **#100** → çatı main `ef2b995`; merge sırasında pointer backend main HEAD `b5f4b88`'e bump edildi (ileri-sarım teyitli: `6b84e27` ANCESTOR `b5f4b88`); pointer senkron; iki main CI yeşil. Aşağıdaki bağlanan uçlar artık CANLIDA (autodeploy). MERGE EDİLDİ.
>
> Backend **#48** + çatı **#100** (FE + submodule pointer). Başlangıçta MERGE EDİLMEMİŞTİ (PO inceledi → merge onayı verdi).
> Amaç: yarım kalmış "eşleşme-sonrası değerlendirme + metrik" özelliğinin **migration'sız** uçlarını bağlamak (sıfırdan yazım değil). Tasarım: `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md`.
- **Bağlanan uçlar:**
  1. **Kalite puanı kalıcı yazım** — `computeMentorQualityMultiplier` sonucu artık `TenantMembership.qualityMultiplier`'a event-driven yazılıyor (`persistMentorQualityMultiplier`, feedback gelince). Alan ZATEN vardı; sadece sertifika yazıyordu.
  2. **Yönetici görünürlüğü** — mentör havuzunda "Kalite Puanı" kolonu (5 üzerinden); eşleşmeler sayfasında "Risk" rozeti (İyi/Dikkat/Riskli). Backend: `adminListUsers` kalite + `adminListMatches` risk sinyali (batch).
  3. **Periyodik checkpoint cron** — ölü `findMatchesDueForCheckpoint` günlük cron'a bağlandı (`runCheckpointFeedbackReminderCron`), **LOG-ONLY**.
- **KVKK:** kalite puanı + risk sinyali YALNIZ yönetici endpoint'lerinde; kişi kendi puanını/sinyalini GÖRMEZ. Test: menti/mentör `/api/admin/*` → 403; tenant izolasyonu doğrulandı.
- **Migration/şema/seed: SIFIR.** Canlı eşleştirme sıralaması değişmez (`matching.ts` bu alanı okumaz).
- **Atlananlar (bilinçli):** otomatik pasifleştirme + tenant eşik alanı (şema=migration → Aşama 2); checkpoint cron gerçek bildirim (mail geri-alınamaz + dedup guard'ı şema ister → Aşama 2); `ContextualFeedbackHost` FE bağlama (kullanıcı-bazlı checkpoint endpoint'i + poller yok → Aşama 2/3); menti havuzu kalite kolonu (mentör metriği, menti'de yanıltıcı).
- **Doğrulama:** backend PR #48 CI **yeşil** (entegrasyon+unit CI'da geçti); FE lokal tsc ✓ · vitest 38/38 ✓ · build ✓. Lokal backend entegrasyon testleri TEST_DATABASE_URL guard'ıyla durur (canlıya truncate yok) — asıl kanıt CI.
- **Merge sırası (PO için):** backend #48 merge → çatı pointer'ı backend main HEAD'e bump (`git submodule update --remote backend`) → çatı #100 merge.

## ✅ #37 KURUM DÜZELTME-İSTE — MERGED, CANLIDA (2026-08-19)
> **⚡ GÜNCELLEME (2026-08-19, merge turu):** ~~PR'DA (MERGE OLMADI)~~ → **MERGED, canlıda.** Backend **#50** → backend main `ba92dfa`;
> çatı **#104** → çatı main `2639e2e` (pointer backend main HEAD `ba92dfa`'ya bump, ileri-sarım teyitli: `decfc75` ANCESTOR `ba92dfa`); pointer senkron; iki main CI yeşil. Kod gerçeği main'de + canlı DB'de (enum+kolon) teyitli. Aşağıdaki akış CANLIDA (autodeploy). **Mail GÖNDERİM HÂLÂ KAPALI** (env açılmadı). MERGE EDİLDİ.
>
> Backend **#50** + çatı **#104**. Kurum başvurusu için **onayla / reddet / DÜZELTME İSTE** üçlüsü. Reddetmek yerine revizyon talebi (kişi tarafı `requestCorrection` deseninin kurum karşılığı).
- **🛑 MIGRATION (PO onaylı, canlıya uygulandı):** `TenantVerificationStatus += CORRECTION_REQUESTED` + `Tenant.correctionNote String?`. Additive/nullable, `IF NOT EXISTS` SQL + `db execute` + `migrate resolve --applied` (db push YASAK). **Doğrulama:** Tenant 3→3 (değişmedi), durum dağılımı aynı, `verificationNote` (başvuru kanıtı) EZİLMEDİ — düzeltme notu AYRI `correctionNote`'a yazılır. Migration dosyası: `20260819000000_add_tenant_correction_request`.
- **Backend akış:** platform admin `POST /api/platform/tenants/:id/request-correction` (→ CORRECTION_REQUESTED + not); kurum admini `POST /api/tenants/self-serve/resubmit` (→ PENDING_REVIEW, correctionNote KORUNUR, IDOR-safe); `getMe` additive `tenant` bloğu (correctionNote YALNIZ ADMIN'e).
- **FE:** platform dashboard "Düzeltme İste" butonu + PII uyarılı not diyaloğu; STK admin layout `TenantCorrectionBanner` (durum + tekrar-gönderim formu, destekleyici dil).
- **📧 Mail altyapısı — GÖNDERİM KAPALI (kritik):** `tenantNotifications.ts` 3 Türkçe şablon (onay/red/düzeltme). Gönderim `TENANT_NOTIFICATIONS_ENABLED` env arkasında, **VARSAYILAN false** → gerçek mail GİTMEZ, log-only. **Bu turda açılmadı, canlıya test maili bile atılmadı.** Açma: PO `destek@` + prod SMTP env kurup bayrağı `true` yapacak (madde 37m).
- **Testler:** yetki (platform admin), IDOR (kurum yalnız kendini), durum geçişleri, geçmiş korunuyor, correctionNote görünürlük (ADMIN vs MENTI). Lokalde entegrasyon TEST_DATABASE_URL guard'ıyla durur → kanıt CI.
- **Doğrulama:** backend tsc/tsc-test/lint ✓ · FE tsc ✓ · vitest 38/38 ✓ · build ✓.
- **Bulgu:** iki paralel kurum-doğrulama yolu (`/api/platform/*` FE-kullanımı ↔ `/api/super-admin/verify` testler). Pre-existing duplikasyon, birleştirilmedi.
- **Merge sırası (PO için):** backend #50 merge → çatı pointer bump → çatı PR merge.

## ✅ KÜÇÜK İŞLER PAKETİ — #34 + #7(A) + #9-gösterim — MERGED, CANLIDA (2026-08-19)
> **⚡ GÜNCELLEME (2026-08-19, merge turu):** ~~PR'DA (MERGE OLMADI)~~ → **MERGED, canlıda.** Backend **#49** → backend main `18cfc42`;
> çatı **#102** → çatı main `0fd4942` (pointer backend main HEAD `18cfc42`'ye bump, ileri-sarım teyitli: `8d1d1dd` ANCESTOR `18cfc42`); pointer senkron; iki main CI yeşil. Kod gerçeği main'de doğrulandı. Aşağıdaki uçlar artık CANLIDA (autodeploy). MERGE EDİLDİ.
>
> Backend **#49** + çatı **#102**. Üç açık maddeyi tek turda kapattı; hepsi **migration'sız**, düşük riskli, farklı dosyalar. Sema değişmedi, DB'ye yazılmadı, seed çalıştırılmadı.
- **#34 — Öğrenme yolculuğu tamamlanma görünürlüğü (STK yönetici):** `adminListUsers` select'ine `learningJourneyCompletedAt` eklendi (mevcut tenant-scoped `tenantMembership` batch sorgusundan — qualityMultiplier ile aynı, N+1 yok). Platform admin'de ZATEN vardı; artık STK yöneticisi de menti/mentör havuzunda "Öğrenme Yolculuğu" kolonunda görür (tamamlandıysa tarih rozeti, yoksa "—"). KVKK: Analytical, PII değil. Test eklendi (alan döner + tamamlamayan null).
- **#7(A) — Aday menti kartı "neden uyumlu" gerekçesi:** backend `compatibilityReason`'ı ZATEN üretiyordu (`buildPublicItem`), FE render etmiyordu. Mentör dashboard aday kartında jenerik gerekçe render edildi; `RankedMenti` FE tipine alan eklendi. **⚠️ DISC harfi/tipi EKLENMEDİ** (KARAR 3/5 uzlaştırması PO'da — jenerik metin sızdırmaz).
- **#9-kısmi — Eşleştirme ağırlığı GÖSTERİMİ (ayarlama YOK):** kalibrasyon sayfası ağırlıkları yalnız bekleyen öneri varken gösteriyordu; artık "Mevcut Eşleştirme Ağırlıkları" kartı her zaman %60/%40 + açıklama gösterir. Yeni salt-okuma endpoint `GET /api/admin/algorithm-tuner/weights` (`getAlgorithmWeights` kaynağı). **Ayarlanabilirlik YAPILMADI** (input/slider/kaydet yok) — tenant-bazlı şema alanı + canlı eşleştirme değişikliği gerektirir → PO onaylı migration turu (bkz. 00-KARAR-TAKIP yeni madde a).
- **⚠️ Bulgu (çözülmedi, raporlandı):** canlı eşleştirme yolu (`scoring.ts:96`) ağırlığı **hardcoded 0.6/0.4** kullanıyor; kalibrasyonun sakladığı `getAlgorithmWeights` değerini OKUMUYOR → kalibrasyon şu an efektif olarak dekoratif. Canlı eşleştirmeye dokunulmadı (kural). PO kararı + ayrı tur.
- **Doğrulama:** backend tsc/tsc-test/lint ✓ (0 hata) · FE tsc ✓ · vitest 38/38 ✓ · build ✓. Backend entegrasyon testleri lokalde TEST_DATABASE_URL guard'ıyla durur — gerçek kanıt CI'da.
- **Merge sırası (PO için):** backend #49 merge → çatı pointer'ı backend main HEAD'e bump (`git submodule update --remote backend`) → çatı PR merge.
- **FAZ 4 keşif (kurum başvuru "düzeltme iste"):** salt-okuma yapıldı, kod yazılmadı → bulgular 00-KARAR-TAKIP yeni madde (b)'de.

## ✅ #37 LOGIN ENUMERATION SERTLEŞTİRME — MERGED, CANLIDA (2026-08-19)
> Backend **#46** (`b6187c1`) + çatı pointer **#91** (`af33339`) + docs **#92** (`1cd2c56`) MERGED → canlıda (git doğrulandı). İki repo main CI yeşil.
- **Sorun:** login akışında kimlik doğrulaması BAŞARISIZ olduğunda durum sızıyordu — (1) PENDING hesap yanlış/rastgele
  şifreyle `403 HESAP_ONAY_BEKLENIYOR` (`authController.ts:257-262` eski); (2) OAuth hesap şifre denemeden
  `401 OAUTH_HESAP` "sosyal giriş ile oluşturulmuştur" (`:267-272` eski). İkisi de e-postanın kayıtlı+durumunu şifresiz sızdırıyordu.
- **Çözüm:** "önce kimlik doğrula → sonra duruma göre yönlendir" deseni. Yok/OAuth/şifresiz/yanlış-şifre → **hepsi aynı generic 401**
  (ayırt edilemez). Durum (REJECTED/pasif/PENDING) yalnız doğru şifreden SONRA. Pasif hesap da artık şifre sonrası `HESAP_PASIF`
  (önce generic 401'di). Meşru akış korundu (onaylı giriş, red ekranı İş 3 P2, onay-bekleme). **Şema DEĞİŞMEDİ (migration yok).**
- **Test:** enumeration testleri eklendi (`auth.test.ts`) — yanlış-şifrede PENDING/OAuth/pasif sızmıyor + var-olmayan/PENDING/OAuth üçü aynı yanıt.
- **Doğrulama:** lokal backend tsc (src+test) + eslint yeşil; entegrasyon/enumeration testleri CI'da (lokal `TEST_DATABASE_URL` guard'ı canlı DB'yi korur).
- **Bilinen sınır:** timing (zamanlama) yan-kanalı kapsam dışı bırakıldı (üretim-öncesi, düşük risk).

## ✅ #12 DISC ÇOKLU HARF — MERGED, CANLIDA (2026-08-19)
> Backend **#47** (`4c63d0e`) + çatı (FE + pointer) **#93** (`61b6eb2`) + docs **#94** (`42e35bf`) MERGED → canlıda (git doğrulandı). İki repo main CI yeşil.
- **Ne:** DISC kimliği tek baskın harf yerine türetilmiş **1–3 harf** (ör. `D`, `DI`, `Di`, `DIs`) — KARAR 1 (#12=md.4).
- **Onaylanan eşikler (PO, 2026-08-17):** orta çizgi (midline) **0.25** (normalize vektör, eşit pay); geçen tipler gösterilir,
  birincil daima. BÜYÜK/küçük = **birincilin %75'i** (yakın→BÜYÜK, zayıfça geçen→küçük). Tek merkezi `DISC_LETTER_CONFIG`
  (başlangıç değerleri; gerçek kullanıcı verisiyle kalibre edilecek — kullanıcı isteği).
- **Migration YOK:** harf saklanan normalize vektörden türetilir (`discLetters.ts`). Şema değişmedi.
- **Güvenlik (KARAR 5/PII):** yalnız türetilmiş harf gönderilir; ham vektör response'a KONMAZ (adminList'te vektör
  select'e eklenir ama base map'te çıkarılır; `admin.test.ts` doğrular).
- **Gösterim (bu tur):** yönetici havuz (menti/mentör havuzu + bekleme odası) + kendi profil kartı + menti dashboard
  (paylaşılan `DiscBadge` atomu). **Kapsam DIŞI (belirgin):** peer kartı (menti→mentör KARAR 5'te gizli), platform üye
  tablosu + DISC dağılım grafiği (agregat), eşleşme aday kartı (=#7 follow-up).
- **Doğrulama:** lokal backend tsc(src+test) ✓ · eslint ✓ · frontend tsc ✓ · vitest 38/38 ✓ · build ✓; DISC saf mantık
  `tsx` ile 8/8 ✓. Entegrasyon/unit DISC testleri → CI (lokal TEST_DATABASE_URL guard'ı canlı DB'yi korur).
- **Sıradaki (Grup 2):** 2a ghost red (#35) — migration, AYRI tur.

## ✅ ① GRUBU — MASA TEMİZLİĞİ MERGED, CANLIDA (2026-08-17)
> Çatı main `41f91b4` · backend main `e83ec9c` · submodule pointer `e83ec9c` (senkron) · açık PR **0/0** (git + `gh pr list` doğrulandı). Merge sırası: backend #44 → #45 → çatı pointer bump #88 → çatı FE #87. Her adımda iki repo main CI yeşil. **Migration/DB yazımı/seed çalıştırma SIFIR.**
- **#32 — Admin soru düzenleme UI (çatı #87), canlıda:** kuruma özel soruya **Düzenle** butonu + inline form (`(admin)/admin/questions/page.tsx`). Backend PATCH `/api/questions/:id` (requireRole ADMIN + tenant-scoped IDOR: global soru `GLOBAL_SORU_KILITLI`, çapraz-tenant `YETKI_YETERSIZ`) **zaten hazırdı** → yalnız FE eksikti. Yalnız metin düzenlenir (backend `UpdateQuestionSchema` gereği; discDimension/type yapısal). CI Integration (Admin) yeşil.
- **#6 — Onay/red maili TEYİT + correction-fix (backend #44), canlıda:** `approveUser`→onay maili ✅, `rejectUser`→red maili (gerekçeli) ✅ **zaten çalışıyordu** (teyit). Bulunan bug: `requestCorrection` düzeltme notunu (`feedbackNote`) DB'ye yazıyor ama **e-postaya iletmiyordu** (yorum "iletir" diyordu, etmiyordu) → tek satır fix (`rejectionReason: parsed.data.feedbackNote`). PII yok.
  > ⚠️ NOT: 10-yol-haritasi md.6 "onay paneli bildirim maili" **kurum onay/ret + `destek@` + prod `PLATFORM_ADMIN_EMAIL`** kapsıyor — bu AYRI/geniş; yalnız kullanıcı onay/red/correction maili teyit+fix edildi, kurum/env kısmı DEĞİL.
- **#33 — Ölü/çelişen seed dosyası temizliği (backend #45), canlıda (KISMİ):** `prisma/seed-questions.ts` (hiç import edilmeyen standalone CLI, 20 global DISC sorusu) **silindi** — aktif `seed.ts` (32 soru) ile çelişiyordu. **DB'ye dokunulmadı, hiçbir seed çalıştırılmadı.**
  > ⚠️ KALAN (PO kararı, ayrı tur — canlı DB yazımı gerektirir): (1) **seed↔canlı tutarsızlığı**: canlı DB'de **20 DISC sorusu** var (eski standalone seed'in izi), aktif `seed.ts` **32** üretir → hangi set canonical, canlı re-seed mi seed.ts trim mi? (2) **SJT belge-kod çelişkisi**: `03-psikometri:47` "4 pedagojik SJT" der, **kod 3** (`seed.ts` SJT_QUESTIONS = 3, doğrulandı) → belge kod gerçeğine hizalandı (bu tur), içerik 4'e genişletme PO kararı.
- **#5 — ThemeToggle admin/platform nav (kod-doğrulandı bu tur):** ✅ **ZATEN MEVCUT** — `(admin)/layout.tsx:92` `<ThemeToggle />` + platform dashboard'da var. Yol haritasından düşürülebilir (kod gerçeği).
- **⚠️ BRIEF DÜZELTMELERİ (git+kod esas, dürüst pushback):** Bu turun brief'i 3 yanlış içeriyordu: (a) **#13 cevap-tipi "yapıldı" DEĞİL** — önceki turda migration gerektirdiği için ATLANDI, PR yok, hâlâ açık; (b) **SJT "kod 4" DEĞİL** — kod 3 (belge 4 diyor, tersi); (c) **#9/#34 "yapıldı" DEĞİL** — kod-doğrulama negatif (#9 ağırlık gösterimi yok, #34 `learningJourneyCompletedAt` STK adminController select'inde yok, yalnız platform süper-admin'de).

## ✅ İŞ 3 P2/P3 — REDDEDİLEN KULLANICI AKIŞI, CANLIDA (2026-08-16)
> Çatı main `513ba84` · backend main `a9fc0bf` · submodule senkron · açık PR 0/0. Yaklaşım: **Yol 1** (token vermeden).
- **P2 (gerekçe görme) — backend #43 + çatı #85, canlıda:** reddedilen kullanıcı doğru şifreyle giriş deneyince **token VERİLMEZ**; 403 yanıtında `rejectionReason` + `canReapply` döner; FE kibar red ekranı gösterir. **Enumeration-safe:** REJECTED kontrolü `bcrypt.compare`'den SONRA (yanlış şifre → generic 401, red bilgisi sızmaz). Token olmadığından reddedilen hiçbir korumalı sayfaya erişemez.
- **P3 (tekrar başvuru) — canlıda:** `POST /api/auth/reapply` (public, rate-limit) — email+şifre doğrular (enumeration-safe), yalnız **kendi** hesabını (IDOR yok) `REJECTED→PENDING` yapar, `isActive=true`. **Red geçmişi KORUNUR** (`rejectionReason`/`rejectedBy`/`rejectedAt` silinmez — çok-yönetici). Test/DISC/profil verisine dokunulmaz.
- **Kibar red e-postası:** destekleyici ton, "düzeltme" vaat etmez (Yol 1'de uygulama-içi düzeltme yok), "dilerseniz tekrar başvurabilirsiniz, verileriniz korunur". Best-effort.
- **Testler:** enumeration (P2+reapply yanlış şifre generic), IDOR-durum (reapply yalnız REJECTED), geçiş + geçmiş koruma + test-verisi koruma. CI'da geçti.
- **⚠️ KABUL EDİLEN SINIR (PO):** (1) **PENDING durumu login'de şifre-öncesi sızıyor** (mevcut, kapsam dışı) → ileride "giriş enumeration sertleştirme" ile ele alınacak (10-yol-haritasi). (2) **Uygulama-içi profil düzeltme YOK** (Yol 1); istenirse Yol 2 mimarisiyle ayrı iş.

## ✅ İŞ 2 + İŞ 3 P1 — ONAY/RED İZİ + GEREKÇE, CANLIDA (2026-08-16)
> Çatı main `b66e07c` · backend main `ed84806` · açık PR: yönetici-adı (#42+#83, merge PO'da).
- **Migration CANLIDA (additive/nullable, veri kaybı yok):** `User`'a `approvedBy`, `approvedAt`, `rejectedBy`, `rejectedAt`, `rejectionReason`. Yöntem: `db execute` (IF NOT EXISTS) + `migrate resolve --applied`; salt-okuma SELECT ile doğrulandı. `db push` kullanılmadı.
- **İş 2 (kim onayladı/reddetti izi) — backend #41 + çatı #81, canlıda:** `approveUser`/`rejectUser` yapan yöneticiyi + zamanı kaydeder; `approveUser` eski red izini temizler. `adminListUsers` denetim alanlarını döndürür (yalnız admin, audit).
- **İş 3 P1 (red gerekçesi) — canlıda:** `rejectUser` opsiyonel `reason` (≤500) → `rejectionReason`; `requestCorrection` `feedbackNote`'u kalıcı kaydeder (önceden yalnız e-posta).
- **İş 2/3 FE — çatı #82, canlıda:** havuz tablolarında onay/red tarihi + red gerekçesi (title ile tam metin) + reddet akışında gerekçe kutusu (`RejectReasonDialog`, PII uyarısı). Yalnız admin.
- **Yönetici-adı gösterimi (backend #42 + çatı #83, merge PO'da):** `approvedBy`/`rejectedBy` userId'si TEK sorgu + TENANT-SCOPED `fullName`'e çözülür (`approvedByName`/`rejectedByName`); çapraz-tenant isim sızmaz; havuzda "Onaylayan/Reddeden: [Ad] · [tarih]".
- **⏳ KALAN (AYRI TUR — auth/güvenlik kararı):** İş 3 **P2** (reddedilen kullanıcı kendi ekranında gerekçe görür) + **P3** (REJECTED→PENDING tekrar başvuru + başvuru revizyonu). Reddedilen `isActive=false` → login generic 401 (enumeration koruması); bu akışı değiştirmek PO ürün+güvenlik kararı.

## ✅ MASA TEMİZLİĞİ — 5 PR MERGED, CANLIDA (2026-08-15, geç oturumlar)
> Çatı main `444c025` · backend main `5eafbbd` · submodule senkron · açık PR 0/0 (git doğrulandı).
- **v1 #8 — admin sol menü 4-grup (çatı #76):** ✅ TAMAMLANDI, canlıda. Gruplar: Günlük İşler · İnsanlar · Program & İçerik · Ayarlar & Kurulum (KARAR 1). Salt-frontend (`(admin)/layout.tsx`).
- **v1 #11 — sertifika rozeti (backend #40 + çatı #77):** ✅ TAMAMLANDI, canlıda. **KİŞİ-GENELİ:** kişi HERHANGİ bir kurumda sertifikalıysa mentör havuzunda "✓ Sertifikalı" görünür — `TenantMembership.isCertified` üzerinden `some()` ile türetilir. `UserProfile.isCertified` **bakımsız** (hiç yazılmıyor) olduğu için kullanılmadı (kod kanıtıyla; migration gerekmedi).
- **v1 #10 — durum rozeti:** ✅ **ZATEN MEVCUTTU** (kod gerçeği — yol haritasında ⏳ görünüyordu ama yanlıştı). Mentör + menti havuz tablosunda "Durum" sütunu `APPROVAL_META` ile Onaylı/Bekliyor/Reddedildi gösteriyor (`mentor-havuzu/page.tsx`, `menti-havuzu/page.tsx`); admin-only. Yeniden yapılmadı, teyit edildi.
- **Raporlar (çatı #78 + #79):** değerlendirme/test/soru envanteri (`docs/raporlar/kod-denetimi/degerlendirme-test-soru-envanteri-2026-08-15.md`) + içerik dökümü (`docs/raporlar/icerik/`) + derinleştirilmiş eksik analizi (`docs/raporlar/kod-denetimi/eksikler-derinlestirilmis-2026-08-15.md`). Canlı DB salt-okuma sayımıyla seed↔canlı tutarlılığı doğrulandı.
  - ⚠️ **Kritik tespit:** sertifika bankası kodda 20 senaryo ama **canlıda yalnız 5 soru** (seed edilmemiş). Ayrıca STK-custom canlıda 1 (envanterin "0"ı düzeltildi). Detay: eksikler raporu.

## ✅ BU OTURUM — v1 İŞLERİ MERGED, CANLIDA (2026-08-15)
> ⚠️ GÜNCELLEME (2026-08-15, merge turu): **4 kod PR sırayla MERGED, canlıya deploy oldu** (#38→#73→#39→#74, `--merge`).
> Submodule TAM SENKRON (`379658a`). İki repo main CI yeşil. Regresyon testleri (oauth-kvkk-consent, mentor-matches, disc-visibility)
> CI Integration suite'te geçiyor. Açık PR yalnız bu docs (#72). **Aşağıdaki maddeler artık "tamamlandı" — merge oldu.**
> ---
> ⚠️ GÜNCELLEME (2026-08-15): KARAR 5 sonrası v1 işleri kodlandı. **Hepsi PR açık, merge PO'da** (henüz merge YOK →
> "tamamlandı" denmez). İki repo tüm CI yeşil (backend entegrasyon suite CI'da geçiyor). Merge sırası PO'da (aşağıda öneri).

- **KVKK v1-A (backend #38 + çatı #73):**
  - **K2 — `kvkkConsentAt` ispat yükü:** OAuth `handleNewUser` + self-serve kurucu admin `create` `new Date()` set eder
    (önceden NULL). `oauthService.ts` + `selfServeController.ts`. Test: `oauth-kvkk-consent.test.ts`.
  - **K5 — sunucu konumu/yurt dışı aktarım beyanı:** `kvkk/page.tsx` "8. Sunucu Konumu ve Yurt Dışı Aktarım" (İrlanda/AB, KVKK Md.9).
  - **K4 — 18+ beyanı:** **PO kararı: AYRI kutu DEĞİL** → tek KVKK onay kutusunun metnine gömüldü ("...ve 18 yaşından
    büyük olduğumu beyan ederim"). Ayrı `ageConsent` alanı (ilk denemede eklenmişti) **geri alındı**. DB'ye yaş yazılmaz (şema yok).
- **Havuz kart / menti→mentör uyum skoru (backend #39 + çatı #74) — v1-C kısmi:**
  - **GÜVENLİ YOL:** mevcut skorlama motoru (`computeTotalScore`) **ters yönde** okundu — `rankMentorsForMenti` (yeni
    salt-okuma yolu). **Canlı eşleştirme (`rankMentisForMentor`) DEĞİŞMEDİ.** Yeni endpoint `GET /mentis/:mentiId/mentor-matches`
    (IDOR: `requireSelfOrAdmin`).
  - **KARAR 5 güvenlik:** menti response'unda mentörün `discType`/`discScore` YOK; `compatibilityReason` jenerik (harf sızmaz).
    Menti yalnız **%uyum skoru + jenerik gerekçe** görür. Test: `mentor-matches.test.ts` (discType YOK + harf sızmaz + IDOR 403).
  - **FE:** `menti/page.tsx` mentör havuzu satır-listesi → **KART** (skor + neden uyumlu). `MentorMatch` tipi (discType yok).
  - **⚠️ KALAN v1-C (bu turda YOK — follow-up):** (1) **mentör→menti aday kartı** DISC+gerekçeli (RankedMenti'ye menti
    `discType` eklenmeli — KARAR 5 mentör→menti'ye izin verir → backend+çatı turu) · (2) **yönetici havuz kartları**
    (tablo→kart + durum rozeti KARAR 3 + sertifika rozeti KARAR 4, `tenantMembership.isCertified` DTO'ya) · (3) **sol menü
    4-grup** (KARAR 1). Bunlar `10-yol-haritasi.md` md.7/8/10/11'de.

## ✅ GÜVENLİK — KARAR 5 DÜZELTİLDİ, CANLIDA (backend #37 + çatı #71 MERGED)
> ⚠️ GÜNCELLEME (2026-08-15, merge turu): açık **KAPANDI, canlıda**. Backend **#37** (`0850eaa`) + çatı **#71** (`4c48a8e`)
> `--merge` ile MERGED; submodule pointer `0850eaa` backend main HEAD ile **tam senkron**; iki repo main CI yeşil; autodeploy
> ile canlıya çıktı. Regresyon testi `disc-visibility.test.ts` CI'da (Integration suite) geçiyor → açığın geri gelmesi guard'lı.
> **v1 #1 canlı-öncesi ŞART karşılandı.** Havuz kart işi (KARAR 2/7) ön-koşulu artık karşılandı → yapılabilir (sıradaki aday).
> ---
> ⚠️ GÜNCELLEME (2026-08-15): bu açık **kod düzeltmesiyle kapatıldı**, PR açık, **merge PO'da** (henüz merge YOK →
> "tamamlandı" denmez). Backend **PR #37** (`menti-mentor`) + çatı **PR #71** (`menti-mentor-v2`: FE gizleme + submodule pointer + bu docs).
> Fix: merkezi `services/discVisibility.ts` → `canViewerSeeDiscType(viewer,target)` (ADMIN hepsi · MENTOR→MENTI görür ·
> MENTI hiç kimseyi görmez). Kapatma backend'de: menti→mentör response'undan `discType`+`discResultCard` **tamamen
> çıkarılır** (`listUsers` + `getUser` public yol). FE `menti/page.tsx` DISC gösterimi kaldırıldı (savunma-derinliği).
> Regresyon testi `disc-visibility.test.ts` (menti→mentör YOK / mentör→menti VAR / admin VAR). Doğrulama: tsc+tsc-test+
> eslint+FE tsc/vitest/build yeşil; backend entegrasyon **gerçek kanıt CI'da** (lokal TEST_DATABASE_URL guard'ıyla durur).
> Havuz kart işi (KARAR 2/7) bu düzeltmeden SONRA yapılabilir; aynı `canViewerSeeDiscType` kuralından beslenecek.
- **KARAR 5 — menti mentörün DISC tipini görüyor (PII/mahremiyet açığı):** salt-okuma güvenlik denetimi 🔴 AÇIK buldu.
  Menti'ye mentörün `discType` (harf) + arketip backend'den dönüyor: `userController.ts:90` (`listUsers`) + `:138-139`
  (`USER_PUBLIC_SELECT`) + FE `menti/page.tsx:262-266`. Ham vektör güvenli (self/admin). Kod `discType`'ı bilinçli public
  tasarlamış → KARAR 5 (daha yeni PO kararı) ile çelişiyor. Düzeltme = viewer/target-role-aware select → **yol haritası v1 #1**
  (canlı-öncesi ŞART). Ön-koşul: havuz kart işi (KARAR 2/7) bu düzeltmeden SONRA.

## 🗺️ YOL HARİTASI — v1/v2 ÖNCELİKLENDİRİLDİ (2026-08-14)
- `10-yol-haritasi.md` gerçekle hizalandı + v1/v2 etiketlendi (kaynak: `00-karar-statu-haritasi-2026-08-14`). Biten işler
  (F1 foto upload / F2 platform drill-down / F7 KPI drill-down) düşürüldü; tasarım kararları (KARAR 1/3/4/11) eklendi.
  **v1 #1 = KARAR 5 güvenlik.** Sıradaki: v1 işlerini tek tek kodlama turları.
  > ⚠️ GÜNCELLEME (2026-08-15): **v1 #1 (KARAR 5) ✅ tamamlandı, canlıda** (#37+#71). Sıradaki v1 adayı: **havuz KART görünümü + "Neden uyumlu" L1 (KARAR 2/7)** — DISC güvenliği kapandığı için ön-koşul karşılandı, artık yapılabilir.

## ✅ CANLIDA / KAPANMIŞ (kod main'de)
- **CHAT v1 — TAM CANLIDA.** menti↔mentör mesajlaşma: inbox/thread + `MessagesBell` (45sn polling) +
  menti zorunlu ilk mesaj + katılımcı-bazlı yetki + okundu-bazlı e-posta. Backend #33 + frontend #47/#48 MERGED.
  Canlı Neon'da `Conversation`+`Message` tabloları var (migration applied). Detay: `chat-v1-teslim.md`.
- **MENTÖR PANELİ — TAM CANLIDA.** Gerçek metrik kartları (aktif menti · bekleyen · tamamlanan · ortalama NPS)
  endpoint `GET /api/mentors/:mentorId/dashboard-metrics` (IDOR korumalı `requireSelfOrAdmin`, salt-okuma) +
  **Yaklaşan Toplantılar** (onaylı/SCHEDULED). Backend #36 + çatı #52/#51 MERGED.
- **Ölü kod temizliği — menti-driven görünürlük talebi (Taraf-2):** `mentiRequestController.ts` + 3 rota
  SİLİNDİ (backend #35 + çatı pointer #50). Taraf-1 `setVisibilityOptIn` **kasıtlı korundu**.
- **Güvenlik turu (O1-O5) · eski PR kurtarma turu · retention (STK-yönetici) · platform admin turu ·
  fotoğraf altyapısı · timezone fix · IDOR fix'leri** — hepsi MERGED, canlıda (geçmiş detay arşivde).
- **Unutulmuş-niyet envanteri** (`unutulmus-niyet-envanteri-2026-08-10.md`, #54) + **belge denetimi** (#56) MERGED.

## ✅ CANLIDA / KAPANMIŞ — eski oturumlar (2026-08-11 + 2026-08-14)
> Bu iki kapanmış oturumun tam dökümü (STK admin UI #62 · belge işleri #58-#64 · IDOR kod-keşfi çözümü · 5 belge PR
> #65-#69) "şu an"a odaklanmak için arşive taşındı → `docs/arsiv/09-DURUM-tamamlanan-isler-arsiv-2026-08-19.md`.

## 4-rol metodolojisi (strateji→kıyas→aksiyon)
STK yönetici ✅ · Platform admin ✅ · **Mentör ✅** (panel + chat canlıda) · **Menti ⬜** (sıradaki).

## ⏳ BEKLEYEN — ürün sahibi elinde (kod değil, kaybolmasın)
- **Chat uçtan uca canlı test:** menti→mentör ilk mesaj · thread · çan rozeti · okundu.
- **Foto volume doğrulama** (Dokploy redeploy sonrası kalıcılık — `dokploy-foto-volume-talimati.md`).
- **Mentör paneli metriklerini canlıda gözle görme** (gerçek veri doluyor mu).
- **Repoları PRIVATE yapma** (GitHub web ayarı; sonra Dokploy erişimini doğrula).

## ⚠️ ERTELENMİŞ TEKNİK BORÇ (bilinçli)
- **`VisibilityOptIn.requestMessage` ŞEMA kolonu duruyor** — kod artık yazmıyor/okumuyor; DROP = migration
  → DB'ye dokunan, PO-onaylı ayrı bir migration turunda temizlenecek ("DB şeması değişmez" kuralı).

## 🔴 KIRMIZI KURALLAR (kalıcı)
- Canlı = lokal aynı Neon → DB işleminde (seed/migration/backfill) **önce onay al**. Tehlikeli seed asla.
- main'e merge = canlıya deploy (autodeploy açık) → **merge kararı ürün sahibinde**. PR aç, merge etme.
- Submodule sırası: backend push → çatı `git add backend` → çatı commit → çatı push (ara commit yok).
- Ürün kararı ürün sahibinde; dürüst pushback yap; testi/CI'ı yeşil gösterme, gerçeği ver.

## GÜNCELLEME NOTU
Bu belge yalnızca **ŞU AN**'ı tutar (tek tutarlı durum). Tamamlanan işler buraya kısa özet olarak yazılır,
detaylı geçmiş arşive taşınır. Karara bağlanan açık sorular 08'e/ilgili belgeye işlenir.

> ⚠️ 2026-08-14: **Karar-statü haritası çıkarıldı** — `00-karar-statu-haritasi-2026-08-14.md`. ~72 kararın
> plan/kod/çelişki statüsü; kritik bulgu: eski "yapılmadı" sanılan çok iş aslında 🟩 TAM (platform/KPI drill-down,
> foto upload), roadmap F1/F2/F7 bayat.
> ⚠️ 2026-08-14: **Durum panosu çıkarıldı** — `00-DURUM-PANOSU.md` (🔄): 92 kararın tek-bakışta renkli
> statüsü (31 🟩 tam · 17 🟨/🟧 az-işle-kazanç · 18 🟥 hiç). Sıradaki: yol haritası v1/v2 önceliklendirme.
