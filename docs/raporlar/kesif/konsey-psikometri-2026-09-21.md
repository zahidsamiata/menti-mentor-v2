# KONSEY 1 · PSİKOMETRİ VE EŞLEŞTİRME — ürünün asıl iddiası çalışıyor mu?

**📸 DONDURULMUŞ — 2026-09-21 fotoğrafı.** Bu belge plan değildir; tek işi kuyruğu beslemektir.
Bulguları `docs/otonom/00-KUYRUK.md`'ye işlendikten sonra güncellenmez.
(Kural: `CLAUDE.md` — *"AKTİF İŞ KAYNAĞI TEKTİR"* · yeni planlama belgesi açılmaz.)

> **Mod:** 🟩 PLANLA — salt-okuma. Kod, belge, şema, DB, seed **değişmedi**; hiçbir şey silinmedi.
> Canlı sisteme istek atılmadı, exploit yazılmadı. Yalnız kod okundu.
> **Kuyruk öneki:** `S-??` · **Kart numarası:** `KARAR-??` (numarayı yalnız PO verir).
> **Karşılaştırma tabanı:** güncel `main` (`a8cec0f`) + merge edilmemiş `otonom/BB-devir-uygulama-20260921` dalındaki kuyruk/kararlar.

---

## 0. ⭐ ÖNCE OKU — en kritik üç bulgu

**① `Match` tablosuna yazan kod YOK — eşleştirmenin kalıcı kaydı hiç doğmuyor.**
`prisma.match.create` backend'in tamamında **tek yerde** geçiyor: `scoring.service.ts:137`, `createMatchIfEligible()` içinde. Bu fonksiyonun **sıfır çağıranı** var (kapsam: `src/` · `tests/` · `scripts/` · `prisma/` harf duyarsız → tek isabet, o da tanımın kendisi; frontend `src/` → 0 isabet). Sonuç zincirleme: `Meeting.matchId` hiç dolmuyor → mentörün onay kuyruğundaki **`%{score} uyum` rozeti** (`mentor/page.tsx:292`) `m.match` null olduğu için **hiç çizilmiyor** → yöneticinin sol menüsündeki **`/admin/eslesmeler`** sayfası (`(admin)/layout.tsx:35`) sonsuza kadar *"Henüz eşleşme yok"* (`eslesmeler/page.tsx:100`) gösteriyor. Menti ekranında yüzde **görünürken** yöneticiye *"eşleşme yok"* demek, sessiz bir yalandır. ⚠️ Bu, kuyruktaki P-04 notunun (*"%rozeti hiç render edilmiyor"*) **düzeltilmesidir**: rozet kodda VAR, beslendiği veri yok.

**② Eşleştirmenin ANLAMINI doğrulayan test yok — yalnız "patlamıyor" testi var.**
*(A.4 — alt-ajan bulgusu bölüm 4'te, sayılarla.)*

**③ OCEAN motoru ölü (I-13) — ama kullanıcıya görünen bir şeyi bozuyor mu, ayrı soru.**
*(B.2 — bölüm 3'te, kanıtla.)*

---
