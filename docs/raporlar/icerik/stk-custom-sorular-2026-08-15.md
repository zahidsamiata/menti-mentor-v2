# İçerik Dökümü — STK Custom Sorular (2026-08-15)

**📸 DONDURULMUŞ (2026-08-15)** — kaynak: canlı DB salt-okuma sayımı + `frontend/src/app/(admin)/admin/questions/page.tsx`.

> ⚠️ **GÜNCELLEME (2026-08-26):** Güncel kurum-özel soru altyapısı dökümü (Question/STK_CUSTOM, DISC kilidi, #13 cevap-tipi): [`bolumler/04-ogrenme-kurumozel.md`](bolumler/04-ogrenme-kurumozel.md) GÖREV B + [`tam-soru-dokumu-2026-08-26.md`](tam-soru-dokumu-2026-08-26.md).

## Bulgu — önceki "0" düzeltildi
- **Kod/seed:** STK_CUSTOM soru seed'de tanımlı **değil** (0). Envanter raporu (PR #78) bu yüzden "0 tanımlı" demişti.
- **⚠️ Canlı DB (salt-okuma count):** `category='STK_CUSTOM'` → **1 soru** var; `tenantId != null` → 1 (tenant-scoped). → **Canlıda 0 değil, 1 STK-custom soru mevcut.** Biri admin panelinden (`/admin/questions` "+ Yeni Soru") eklemiş. Önceki "0" iddiası **düzeltildi** (kod esas alınmıştı; canlı gerçeği farklı).
- **İçerik:** Bu soru **kullanıcıya ait bireysel veri değil**, kurumun eklediği bir soru tanımı; ancak bu raporda tam metni **listelenmedi** çünkü canlı içerik tek tek çekilmedi (yalnız sayım yapıldı; içerik dökümü için ek salt-okuma SELECT gerekir — PO isterse yapılır). STK-custom sorular **DISC skoruna katılmaz** (profil zenginleştirme; `questions/page.tsx:104,139`).

## Yönetici yetkisi (özet)
- Ekle: ✅ (yalnız STK_CUSTOM, tenant-scoped, `tenantScoped:true` — `questions/page.tsx:62-68`).
- Sil: ✅ (tenant custom — `questions/page.tsx:194-202`).
- Düzenle: ⚠️ backend PATCH var (`questionController.ts:115-147`) ama UI'da buton yok.
- Fiili durum: **(b→c)** — ekleme imkânı var, canlıda 1 tanımlı (artık tam boş değil).

## Not
STK-custom sorunun tam metnini görmek istenirse: `SELECT text, discDimension, type, tenantId FROM "Question" WHERE category='STK_CUSTOM'` (salt-okuma) — bu tur yalnız sayım yapıldı, içerik çekilmedi (gereksiz DB erişiminden kaçınıldı).
