> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ) · kapılar 4 renk (Bölüm 7).

**Son güncelleme:** 2026-09-28 ~18:45 UTC · çatı main HEAD `ae939ed` · backend main HEAD `635f220`

**Durum:** CALISIYOR — PO NOTU 2026-09-28 (kuyruğun önüne geçer): İŞ 1 AJ-96 · İŞ 2 bayat belge bekçisi · İŞ 3 KARAR-101 zenginleştirme; sonra normal kuyruk. Önceki turun özeti 02-ILERLEME başında (TUR ÖZETİ 2026-09-28).

**Şu an yapılan (yazma şeridi 2/2):**
- Ş1 İŞ 1 **AJ-96** — backend #255 (migrate-dev onayı yalnız yerel host) · 7b opus ONAY (2 tur: ana + `$` sertleştirme deltası) · mutasyon yerel 3-4 test kırmızı · CI bekliyor → merge → çatı pointer PR.
- Ş2 İŞ 2 **bayat belge bekçisi** — çatı #455 (bekçi kural t · 36 KART-INDEKSI hücresi · OTONOM-PROMPT 0.4/5i/5c/6) · mutasyon: 5 bayat satır geri → 5 HATA · 7b opus inceleniyor.
- İŞ 3 KARAR-101 zenginleştirme — İŞ 1 merge olunca başlar (belge; CEVAP satırına dokunulmaz).

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| backend #227 + çatı #420 | AJ-77 13 durum alanı enum · 🔵 ⛔ MIGRATION | yeşil (#420 main gerisinde) | ✅ ONAY | KARAR-128 EVET + §3b sayım + 5 tablo yedeği (DB erişimi) |
| backend #212 | AJ-50 ham DISC kart temizliği · 🔵 | yeşil | ✅ ONAY | KARAR-116 EVET + yedek (DB erişimi) |
| backend #164 + çatı #343 | Y1-B8 OAuth onay kapısı (güvenlik) | CONFLICTING | SORUN VAR (ürün) | KARAR-101 |
| backend #157 + çatı #337 | AN-26 hatırlatma · 🔵 ⛔ | CONFLICTING | ✅ | KARAR-98 |
| backend #148 + çatı #326 | U-18 mesaj talebi reddi · 🔵 ⛔ | CONFLICTING | ✅ | KARAR-97 |
| backend #142 + çatı #320 | AN-30 granüler rıza · 🔵 ⛔ · çıkış blokeri | CONFLICTING | ✅ | KARAR-96 |
| backend #160 | AN-02 seed metni · 🔵 | yeşil | — | KARAR-99 |
| backend #185 | AN-52-1 anket tablosu · 🔵 ⛔ | yeşil | ✅ | KARAR-106 |
| backend #186 + çatı #370 | AN-12 karantina · 🔵 | yeşil | ✅ | KARAR-107 |
| backend #189 + çatı #374 | K-15 müsaitlik tür+süre · 🔵 ⛔ | yeşil | ✅ | KARAR-111 + yedek |
| backend #255 | AJ-96 migrate-dev yerel host · 🟢 +7b | bekliyor | ✅ ONAY | CI |
| çatı #455 | İŞ 2 bayat belge bekçisi · 🟢 +7b | bekliyor | inceleniyor | CI + 7b |
| çatı #110 | ⛔ MERGE ETME (analytics/çerez) | — | — | kalıcı kural |

**Push edilmemiş iş:** yok. **Stash:** yok.

**Engeller:**
- 🗄️ Tek seferlik DB erişimi gerekiyor: AJ-77 (§3b sayım + 5 tablo yedeği) · AJ-50 · K-15 · Y-05 (EXPLAIN) · 🔵 EVET gelirse yedek: AN-30 · U-18 · AN-26 · AN-02.
- ⛔ Sınıflandırıcı reddi 2 (ardışık değil): AJ-75 ve AJ-66 7b inceleme yorumları `Excess Sensitive Detail` → kısa yorumla geçildi.

**PO'ya sorular:** ⭐ **toplu karar paketi: `docs/otonom/KARAR-PAKETI.md`** — ilk 10 karar 28 iş açar · 🔵 EVET/HAYIR: KARAR-96 · 97 · 98 · 99 · 106 · 107 · 111 · 116 · 128 · ⭐ güvenlik: KARAR-101 · bu oturumun yeni kartları: KARAR-126…133 · kabul testleri: `03-PO-ELLE-ISLER.md` 13.1 (sosyal giriş) · 13.2 (8 madde) · 13.3 (landing teması).

**Strateji katmanına not:** (1) Bekçi (i5) E-5 uyarısı bilinçli: KARAR-11 ✅ ama gerçek silme PO ikinci onayı + karantina turu bekliyor. (2) 00-KUYRUK 116 KB > 90 KB eşiği — kalan uzunluk AJ-96…111 yeni satırlarından ve gerekçeli uzun satırlardan (AJ-68 kısmen). (3) 🔵 PR'ların 4'ü main ile çakışıyor — EVET gelince rebase gerekir. (4) Paylaşılan backend `.gitignore` artık `node_modules` sembolik bağını da yakalıyor (AJ-69 dersi).

**Sıradaki 5 iş:** İŞ 1 merge + pointer · İŞ 2 merge · İŞ 3 KARAR-101 + KARAR-PAKETI risk sırası · sonra kuyruk: AJ-97…111 (örn. AJ-103/104 güvenlik) · AJ-95b/c.
