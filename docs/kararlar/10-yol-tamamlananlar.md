# Yol Haritası — Tamamlanan v1 İşleri (kayıt)

**🔄 YAŞAYAN** (canonical: biten v1 işlerinin kaydı) · Son güncelleme: 2026-08-22

> **Amaç:** `10-yol-haritasi.md` (aktif iş kuyruğu) yalnız **açık/yapılacak** işi göstersin diye, **biten v1 işleri** burada
> toplanır. Bu belge DURUM-PANOSU deseniyle çalışır: **özet + PR/tarih kaydı**; her işin tam anlatısı `09-DURUM.md`'nin
> ilgili ✅ bölümündedir (tek gerçek kaynağı orası). Madde numaraları `10-yol-haritasi.md` ile aynıdır (referans için sabit).
>
> **Neden ayrı belge, taşıma değil:** Numaralı maddeler CLAUDE.md/çapraz-belgelerde numarayla referanslanır
> (ör. "v1 #1", "md.5"). Numaraları başka dosyaya taşımak referans ağını kırar (bkz. belge-mimarisi raporu #97 uyarısı).
> Bu yüzden aktif roadmap'te maddeler numarasıyla + ✅ işaretiyle **yerinde kalır**; bu belge onların birleşik kaydıdır.

---

## ✅ Tamamlanan v1 işleri (canlıda)

| # | İş | Durum / PR | Tarih |
|---|-----|-----------|-------|
| 1 | KARAR 5 — DISC güvenlik açığı (menti mentörün DISC tipini görmesin) | ✅ backend #37 + çatı #71 | 2026-08-15 |
| 2 | K2 — OAuth `kvkkConsentAt` ispat yükü | ✅ #38+#73 | 2026-08-15 |
| 3 | K4 — Yaş 18+ öz-beyan (KVKK metnine gömülü) | ✅ #38+#73 | 2026-08-15 |
| 4 | K5 — Sunucu konumu/yurt dışı aktarım beyanı | ✅ #73 | 2026-08-15 |
| 5 | ThemeToggle admin/platform nav | ✅ zaten mevcut (kod-doğrulandı) | 2026-08-17 |
| 8 | Sol menü 4-grup gruplama (KARAR 1) | ✅ çatı #76 | 2026-08-15 |
| 10 | Durum rozeti (KARAR 3) | ✅ zaten mevcuttu (kod-doğrulandı) | 2026-08-15 |
| 11 | Sertifika rozeti (KARAR 4, kişi-geneli) | ✅ backend #40 + çatı #77 | 2026-08-15 |
| 12 | DISC baskın+ikincil harf "DI" (KARAR 11) | ✅ backend #47 + çatı #93 + docs #94 | 2026-08-19 |
| 29 | İş 2 + İş 3 (P1+P2+P3) — onay/red izi + gerekçe + yönetici-adı + reddedilen akışı | ✅ #41-#43, #81-#85 | 2026-08-16 |
| 32 | Admin soru düzenleme UI | ✅ çatı #87 | 2026-08-17 |
| 34 | Öğrenme yolculuğu tamamlanma görünürlüğü (STK admin havuz kolonu) | ✅ backend #49 + çatı #102 | 2026-08-19 |
| 37 | Giriş enumeration sertleştirme (PENDING dahil) | ✅ backend #46 + çatı #91 + docs #92 | 2026-08-19 |

> **Kısmi/kalanı açık olanlar aktif roadmap'te kalır:** md.6 (kullanıcı maili ✅ / kurum maili AÇIK) ·
> md.7 (menti→mentör kart + (A) gerekçe + Aşama 1 ✅ / Aşama 2-3 AÇIK) · md.9 (ağırlık gösterimi ✅ / 9a-9b AÇIK) ·
> md.33 (ölü seed ✅ / seed↔canlı + SJT AÇIK). Bunlar `10-yol-haritasi.md`'de açık işler index'inde.

---

## Madde 1 — KARAR 5 DISC güvenlik açığı (tam tarihsel gövde)

> Bu, `10-yol-haritasi.md` md.1'in uzun tarihsel gövdesidir; aktif roadmap'te kompakt ✅ stub'a indirildi, tam kayıt burada.
> Güncel anlatı: `09-DURUM.md` "✅ GÜVENLİK — KARAR 5" bölümü.

**✅ KARAR 5 — DISC güvenlik açığı düzeltmesi — v1 #1, canlı-öncesi ŞART → TAMAMLANDI, CANLIDA** *(backend #37 `0850eaa` + çatı #71 `4c48a8e` MERGED)*.

- **✅ tamamlandı, canlıda:** `--merge` ile MERGED; submodule pointer senkron; iki repo main CI yeşil; regresyon testi CI Integration suite'te geçiyor. **v1 #1 kapandı.**
- **Fix:** Merkezi `discVisibility.ts` (`canViewerSeeDiscType`): `listUsers`+`getUser` menti→mentör `discType`/`discResultCard`'ı response'tan çıkarır; FE menti kartı DISC göstermez; regresyon testi eklendi.
- **Bulgu (salt-okuma denetimi):** Menti, mentörün DISC **tipini (harf) + arketipini** görüyordu → KARAR 5 ihlali. Kanıt: `backend/src/controllers/userController.ts:90` (`listUsers` select `discType`) + `:138-139` (`USER_PUBLIC_SELECT`) + `frontend/src/app/(dashboard)/menti/page.tsx:262-266` (render). Ham vektör güvenli (`USER_FULL_SELECT` self/admin).
- **Çelişki:** kod `discType`'ı bilinçli public tasarlamıştı (yorum s.138) — KARAR 5 (2026-08-11) daha yeni PO kararı → **KARAR 5 kazandı**.
- **İş:** viewer-role + target-role farkındalıklı select (menti→mentör **gizle**; mentör→menti **göster**; admin hepsi).
- **⚠️ ÖN-KOŞUL (tarihsel):** havuz kart işi (v1-C, KARAR 2/7) bu düzeltmeden SONRA yapıldı — açığı ekrana taşımamak için.
