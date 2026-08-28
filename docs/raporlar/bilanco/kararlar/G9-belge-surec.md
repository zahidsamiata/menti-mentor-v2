# BİLANÇO KARAR DOSYASI — G9: Belge düzeni / çalışma tarzı / süreç

**📸 DONDURULMUŞ** · 2026-08-27 · Tur-5b · Kaynak: `00-SAYIM-2026-08-27.md` (c) G9 başlığı + `karar-defteri-2026-08-26.md` GRUP 7 (belge-hijyen). Salt-okuma + kod-teyit; kod/DB/PR/commit YOK, mevcut belge değiştirilmedi.

## Mutabakat (beyan ↔ yazılan)

- **Tur-5a beyanı (görev metni): G9 = 26 kalem.** Ancak canonical kaynak `00-SAYIM (c)` G9 listesinde **27 satır** var (ana tablo da "G9 | 27" yazar). **Fark açıklaması:** görev metnindeki "26" bir sayım-yuvarlamasıdır; canonical (c) 27 satırdır — bu dosya **27 kalem** üzerinden üretildi (zorlama/eleme yok).
- **27 kalem dağılımı (c'deki durum kodları):** ✅ 3 · 🟡 3 · ⬜ 5 · ❓ 3 · 🗑️ 12 · 📌 1.
- **Yazılan kart sayısı: 16** (🟡 3 + ⬜ 5 + ❓ 3 + 🗑️ 5-canlı). **Kart YOK: 11** → ✅ 3 + 📌 1 = 4 kalıcı/yapılmış · 🗑️ 7 madde-124'te düzeltilmiş = "zaten yapılmışlar" bölümüne.
  - Not: 🗑️ 12'nin **7'si** madde-124 turunda (2026-08-27, backend #55 + çatı) düzeltildi → kart YOK, "zaten yapılmışlar"a. **5'i** hâlâ açık geçersiz-adayı (belge-içi bayat gövde, içerik/ 6 belge vb.) → kart alır (PO onayı gerek).
- **Kod-teyidi:** 8 kalem kod/dosya-gerçeğiyle teyit edildi, **0 çürüdü**, **0 ❓-çözülemez** (aşağıda kartlarda belirtildi).
- **Durum dağılımı (bu dosya):** işleme-alınabilir açık = 16 · zaten-yapılmış/kalıcı = 11.
- **PO okuma süresi (tahmini): ~18 dk** (16 kart × ~1.1 dk).

---

## KARTLAR

---
**[G9-01] backend/CLAUDE.md `llmRateLimiter` middleware iddiası kodda karşılıksız**

Ne: backend/CLAUDE.md geçmişte "llmRateLimiter middleware var" diyordu; kodda böyle bir middleware yok.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (onboarding snapshot bayatı).
Nerede durdu: madde-124 turunda backend/CLAUDE.md düzeltildi (satır 92: "llmRateLimiter removed, grep boş"). Kalan iş: teyit-onayı.
Bugünkü durum: ✅ (madde-124'te düzeltildi; kart yalnız kapanış-teyidi için)
Etkisi: Düşük (yalnız belge tutarlılığı)
İş boyu: S
Kaynak: karar-defteri GRUP 7 (T3-C/B7)
Numara: NUMARASIZ
⚠️ bilanço yanılmış: "❓ kodda karşılıksız/silinmiş adayı" → GERÇEK: backend/CLAUDE.md:92 zaten "llmRateLimiter removed (grep -r llmRateLimiter src boş)" olarak düzeltilmiş; grep teyidi kodda gerçekten yok. Artık ❓ değil, çözülmüş.

[ ] işleme al   [ ] şimdilik alma   [x] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-02] CLAUDE.md `registerMessages.ts` merkezi mesaj dosyası kodda karşılıksız**

Ne: Kök CLAUDE.md (satır 256) "merkezi modül `registerMessages.ts`" diyor; kodda bu adla dosya yok.
Neden başlanmıştı: NİYET var — dağınık inline hata-mesajı yerine merkezi/enumeration-safe mesaj modülü önerisi.
Nerede durdu: CLAUDE.md satırı "`registerMessages.ts` / kod-bazlı resolver" der — yani "kod-bazlı resolver" alternatifi de anılıyor; dosya adı bir öneri/örnek olabilir, gerçek dosya yaratılmamış.
Bugünkü durum: ❓ (belge bir dosya adı veriyor ama kod o adı taşımıyor — ya belge düzeltilmeli ya modül yaratılmalı)
Etkisi: Düşük-Orta (belge yanıltıcı; gerçek merkezileştirme işi ayrı — bkz. G6 C17/temiz-kod)
İş boyu: S (belge düzeltme) / M (gerçek modül)
Kaynak: karar-defteri GRUP 7 (T3-C/B8)
Numara: NUMARASIZ
⚠️ bilanço yanılmış: "kodda karşılıksız" → TEYİT EDİLDİ (grep `registerMessages` kodda boş); ancak CLAUDE.md metni zaten "/ kod-bazlı resolver" alternatifini yazdığı için katı çelişki değil — belge-hijyen kalemi olarak açık.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-03] Belge-içi bayat gövde satırları (03:47 SJT-4, 08:13 sunucu-?, dm:111 maxMeetings, 05:27 timezone, 04:34 IDOR)**

Ne: Çeşitli karar belgelerinde ⚠️ GÜNCELLEME notu eklenmiş ama ESKİ (bayat) gövde satırı silinmemiş/kalmış (BH1-BH5): SJT "4 soru", sunucu-konumu belirsiz, maxMeetings uygulanmıyor, timezone, IDOR eski ifadeler.
Neden başlanmıştı: NİYET var — belge-hijyen ilkesi (KURAL 6: sil değil, ⚠️ notla düzelt) uygulanmış ama gövde temizliği yarım.
Nerede durdu: DURUŞ SEBEBİ YOK (kısmi hijyen; her belgeye tekil dokunuş gerekiyor).
Bugünkü durum: 🗑️ (geçersiz-adayı: bayat gövde satırları; PO onayıyla ⚠️ notla düzelt/arşivle)
Etkisi: Orta (sonraki okuyucu bayat gövdeyi gerçek sanabilir)
İş boyu: M
Kaynak: karar-defteri GRUP 7 (T1-B2 BH1-5)
Numara: NUMARASIZ

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-04] platform-strateji belgesi "AdminAuditLog tablosu" gövde bayat**

Ne: platform-strateji belgesinde (:106) "AdminAuditLog tablosu" anılıyor; gerçekte audit `SystemLog`'a yazılıyor. Belge-içi ⚠️ notu var ama gövde bayat.
Neden başlanmıştı: NİYET var — belge-hijyen (⚠️ not eklenmiş).
Nerede durdu: DURUŞ SEBEBİ YOK (gövde düzeltme yarım).
Bugünkü durum: 🗑️ (geçersiz-adayı gövde; PO onayıyla ⚠️ notla düzelt)
Etkisi: Düşük (yalnız belge; SystemLog gerçeği başka yerde doğru)
İş boyu: S
Kaynak: karar-defteri GRUP 7 (T2-D :60)
Numara: NUMARASIZ

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-05] 09-DURUM belge-içi çelişki blokları (chat 3-durum / VisibilityOptIn 2-durum / 4-rol / platform-tema)**

Ne: 09-DURUM.md içinde eski çelişkili durum blokları silinmemiş (chat için 3 farklı durum, VisibilityOptIn 2 durum, 4-rol, platform-tema).
Neden başlanmıştı: NİYET var — durum-canonical tek yer olmalı; eski katmanlar arşive taşınmalı.
Nerede durdu: DURUŞ SEBEBİ YOK (arşive-taşıma PO kararı bekliyor).
Bugünkü durum: 🗑️ (geçersiz-adayı bloklar; PO kararı: arşive taşı)
Etkisi: Orta (canonical durum dosyası kafa karıştırıyor)
İş boyu: M
Kaynak: karar-defteri GRUP 7 (T1-B3 belge-denetimi :59)
Numara: NUMARASIZ

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Faz 1. 09-DURUM'daki eski çelişki blokları arşive taşınacak (belge-hijyeni). Not: önceki PO notu yanlışlıkla sertifika/anket konusunu anlatıyordu — düzeltildi.
---

---
**[G9-06] durum-panosu-2026-08-14 🔄 ama 13+ gün donmuş → 📸'ye düşür + tarihli adları tarihsizleştir**

Ne: `docs/kararlar/oz-denetim/durum-panosu-2026-08-14.md` üst-etiketi "🔄 YAŞAYAN, son güncelleme 2026-08-14" ama 2026-08-27 itibarıyla ~13 gün güncellenmemiş. "Yaşayan" iddiası artık yanlış.
Neden başlanmıştı: NİYET var — kararları tek-bakışta gösteren yaşayan pano.
Nerede durdu: Kod ilerledi ama pano güncellenmedi → yaşayan iddiası bayatladı; PO kararı bekliyor.
Bugünkü durum: 🟡 (📸 dondurulmuşa düşür + 2 tarihli-ad tarihsizleştir)
Etkisi: Orta (belge-hijyen KURAL 3/4; yanlış "yaşayan" etiketi)
İş boyu: S
Kaynak: karar-defteri GRUP 7 (A11)
Numara: A11
⚠️ Kod-teyit: `durum-panosu-2026-08-14.md:3` "🔄 YAŞAYAN · Son güncelleme: 2026-08-14" DOĞRULANDI (dosya mevcut, etiket bayat).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-07] OneDrive senkron riski → repoyu yerel diske (`C:\dev\`) taşı**

Ne: Depo `C:\Users\...\OneDrive\Masaüstü\Geliştirme` altında; OneDrive senkronu `.git` ile çakışabilir (kilitlenme/bozulma riski). Öneri: repoyu OneDrive dışına taşı.
Neden başlanmıştı: NİYET var — `.git` senkron güvenliği + disk performansı.
Nerede durdu: 08-26b'de ayrı disk açıldı ama OneDrive TAŞIMA yapılmadı; PO kararı/işlemi bekliyor (yerel makine adımı).
Bugünkü durum: 🟡 (PO-manuel; taşıma yapılmadı)
Etkisi: Orta-Yüksek (git bozulma riski, canlı-öncesi güvenlik ağı)
İş boyu: S (PO yerel işlem)
Kaynak: karar-defteri GRUP 7 (A10)
Numara: A10

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-08] `docs/raporlar/icerik/` 6 belge kökten bayat (silinmiş seed-questions.ts'e dayanır, "20 DISC")**

Ne: İçerik keşif belgeleri (`icerik/bolumler/01-disc..05` + dated dosyalar) silinmiş `seed-questions.ts`'e ve "20 DISC sorusu" bayatına dayanıyor; kod gerçeği 32 DISC.
Neden başlanmıştı: NİYET var — içerik keşfi/döküm (aksiyon kaynağı).
Nerede durdu: Kod (DISC 32) ilerledi, belgeler güncellenmedi; ⚠️ GÜNCELLEME notu gerek.
Bugünkü durum: 🗑️/⬜ (kökten bayat; PO kararı: ⚠️ not + gerekirse arşiv)
Etkisi: Orta (içerik kararları bu belgelerden okunuyor, yanlış sayı)
İş boyu: M
Kaynak: karar-defteri GRUP 7 (T2-C :64)
Numara: NUMARASIZ
⚠️ Kod-teyit: `docs/raporlar/icerik/` altında 6 belge (00-index + bolumler/01-05) MEVCUT DOĞRULANDI; DISC kod-gerçeği 32 (backend seed) — bilanço "20 DISC bayat" iddiası tutarlı.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-09] PROJECT_STATUS.md DEPRECATED → arşivle + 09-DURUM'a yönlendir**

Ne: `PROJECT_STATUS.md` (kökte) 9 Ağustos'tan eski/dondurulmuş onboarding; CLAUDE.md hâlâ ona işaret ediyor ama canonical durum 09-DURUM.
Neden başlanmıştı: NİYET var — canonical durum tek yer (09-DURUM); eski dosya arşive.
Nerede durdu: DURUŞ SEBEBİ YOK (arşive taşıma + yönlendirme yapılmadı).
Bugünkü durum: ⬜ (arşivle + 09-DURUM'a yönlendirme notu)
Etkisi: Düşük-Orta (onboarding okuyucusu bayat statü görebilir)
İş boyu: S
Kaynak: karar-defteri GRUP 7 (T2-B :207)
Numara: NUMARASIZ
⚠️ Kod-teyit: `PROJECT_STATUS.md` kökte MEVCUT DOĞRULANDI; CLAUDE.md "Genel tanıtım (dondurulmuş onboarding): PROJECT_STATUS.md" satırı bunu işaret ediyor.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-10] INDEX eksik (raporlar/arsiv büyük ölçüde 00-INDEX'te yok, KURAL 5) + üst-etiket eksik ~29 belge**

Ne: `00-INDEX.md` yeni raporlar/arşiv belgelerinin çoğunu içermiyor (KURAL 5 ihlali); ~29 belgede yaşayan/dondurulmuş üst-etiketi (KURAL 3) eksik.
Neden başlanmıştı: NİYET var — belge-düzeni 8 kuralı (INDEX güncel + üst-etiket zorunlu).
Nerede durdu: DURUŞ SEBEBİ YOK (kümülatif borç; her yeni belge INDEX'e eklenmeliydi, atlanmış).
Bugünkü durum: ⬜ (INDEX doldur + eksik üst-etiketleri ekle) — A5 reorg kapsamıyla örtüşür
Etkisi: Orta (belge bulunabilirliği; canonical INDEX güvenilmez)
İş boyu: M
Kaynak: karar-defteri GRUP 7 (T2-B :210)
Numara: NUMARASIZ
⚠️ Kod-teyit: `docs/kararlar/00-INDEX.md` MEVCUT; `docs/raporlar/` altında INDEX'te anılmayan çok sayıda belge var (bilanço/icerik/kesif klasörleri).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-11] Belge düzeni reorg (kararlar/ + raporlar/ alt-klasör, 38 referans) — 5 canonical taşıyıcı ad TAŞINMADI**

Ne: 2026-08-23'te kısmi reorg (git mv) yapıldı ama 5 canonical taşıyıcı belge (09-DURUM, 10-yol-haritasi, 00-INDEX, 00-KARAR-TAKIP vb.) yerinde bırakıldı; 38 referans etkilenir.
Neden başlanmıştı: NİYET var — belge-düzeni 8 kuralı (tür=klasör).
Nerede durdu: Kısmi yapıldı; taşıyıcı-ad taşıma referans-kırılma riski yüzünden ertelendi.
Bugünkü durum: 🟡 (kısmi; taşıyıcı 5 ad + referans güncellemesi kaldı)
Etkisi: Orta (belge-düzeni tamlığı)
İş boyu: M-L
Kaynak: karar-defteri GRUP 7 (A5)
Numara: A5

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-12] BELGE YENİDEN YAPILANDIRMA turu (~68 belge, isim/klasör/arşiv/referans/sadeleştirme)**

Ne: Kapsamlı belge-reorg turu: ~68 belgede isim standardizasyonu, klasör düzeni, arşivleme, referans güncelleme, sadeleştirme. Bu bilanço turu onun bir parçası.
Neden başlanmıştı: NİYET var — belge-düzeni 8 kuralı; kümülatif belge borcu.
Nerede durdu: Kısmen (bu bilanço + kısmi git mv); büyük gövde bekliyor.
Bugünkü durum: ⬜ (büyük reorg turu; G9-10/G9-11 bunun alt-parçaları)
Etkisi: Orta-Yüksek (uzun-ömür sürdürülebilirlik; ama canlı-akışı kilitlemez)
İş boyu: L
Kaynak: karar-defteri GRUP 7 (A5)
Numara: A5

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-13] `admin-panelleri-tasarim-2026-08-02` GÜÇLÜ ARŞİV ADAYI (6 panel uygulandı)**

Ne: `docs/raporlar/kesif/admin-panelleri-tasarim-2026-08-02.md` tasarım belgesi; anlattığı 6 panel zaten uygulandı → arşiv adayı.
Neden başlanmıştı: NİYET var — tasarım/keşif belgesi (aksiyon kaynağı, artık tamamlandı).
Nerede durdu: DURUŞ SEBEBİ YOK (arşive taşıma PO kararı bekliyor).
Bugünkü durum: ⬜ (arşiv adayı; PO kararı)
Etkisi: Düşük (belge-hijyen; tamamlanmış tasarım aktif klasörde)
İş boyu: S
Kaynak: karar-defteri GRUP 7 (T2-B belge-mimarisi :156)
Numara: NUMARASIZ
⚠️ Kod-teyit: `docs/raporlar/kesif/admin-panelleri-tasarim-2026-08-02.md` MEVCUT DOĞRULANDI; 6 panel (Kpi/Members/Meetings/DiscSummary + drill-down) kod-tarafında uygulanmış (bkz. G4 ✅ platform paneli kalemleri).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-14] Kişi-adı yasağı: mevcut belgelerdeki isimler AYRI temizlik işinde**

Ne: CLAUDE.md kalıcı kuralı (satır ~kişi-adı yasağı) yeni içeriğe isim eklemeyi yasaklar; mevcut belgelerdeki isimler ayrı bir temizlik turunda giderilecek — o tur henüz yapılmadı.
Neden başlanmıştı: NİYET var — kişi-adı yasağı (kalıcı kural); geriye-dönük temizlik ertelendi.
Nerede durdu: DURUŞ SEBEBİ YOK (ayrı-tur bekliyor; yeni-içerik kuralı yürürlükte).
Bugünkü durum: ⬜ (mevcut belgelerdeki isimleri tara + nötrleştir)
Etkisi: Orta (gizlilik/nötrlük; belge-hijyen)
İş boyu: M
Kaynak: karar-defteri GRUP 7 (T3-C)
Numara: NUMARASIZ

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-15] Model tercihi 07 "Sonnet yeterli" ↔ CLAUDE.md Sonnet/Opus ayrımı (yumuşak çelişki)**

Ne: `07` oturum belgesi "Sonnet yeterli" derken CLAUDE.md "Model Yönlendirme" bölümü Sonnet(basit)/Opus(karmaşık) ayrımı yapar — yumuşak çelişki.
Neden başlanmıştı: NİYET var — model-yönlendirme kuralı netleştirilmeli.
Nerede durdu: DURUŞ SEBEBİ YOK (düşük öncelik; belge-uyumu).
Bugünkü durum: ❓ (belge-uyumu: hangisi canonical netleştir)
Etkisi: Düşük (yalnız belge tutarlılığı)
İş boyu: S
Kaynak: karar-defteri GRUP 7 (BÇ5/E12)
Numara: BÇ5/E12

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G9-16] `icerik/` 6 belgenin "kökten bayat" statüsü — 🗑️ mi ⬜-düzelt mi karar noktası**

Ne: G9-08'in ikiz karar-noktası: `icerik/` 6 belge silinsin/arşive mi (🗑️) yoksa ⚠️ GÜNCELLEME notuyla yerinde düzeltilsin mi (⬜) — bilanço bu ikisini "🗑️/⬜" olarak işaretledi, PO seçmeli.
Neden başlanmıştı: NİYET var — içerik döküm belgeleri; kararı belirsiz kaldı.
Nerede durdu: DURUŞ SEBEBİ YOK (belge yaşam-döngüsü kararı PO'da: arşiv vs düzelt).
Bugünkü durum: 🗑️ (geçersiz-adayı; PO: sil/arşiv mi ⚠️-not mu)
Etkisi: Düşük-Orta (belge-hijyen tekrar; G9-08 ile bağlı)
İş boyu: S (karar) / M (uygulama)
Kaynak: karar-defteri GRUP 7 (T2-E "SAYILMADI" notu)
Numara: NUMARASIZ
⚠️ Not: Bu kalem G9-08 ile aynı belge-kümesine bakar ama farklı karar-eksenidir (G9-08 = "bayat olduğunu tespit"; G9-16 = "arşiv mi düzelt mi seçimi"). İkisi tek işte kapatılabilir.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---

## Bu grupta zaten yapılmışlar (kart YOK)

Aşağıdaki 11 kalem ya ✅ tamamlandı (kod/belge-gerçeğiyle teyitli), ya 📌 kalıcı kuraldır, ya da 🗑️ olarak işaretlenip **madde-124 turunda (2026-08-27, backend #55 + çatı) düzeltildi** — bu yüzden artık geçersiz-adayı değil, çözülmüş:

**Madde-124'te düzeltilen 🗑️'ler (grep-kanıtlı, backend/CLAUDE.md:5 GÜNCELLEME notu):**
1. 🗑️→✅ **CLAUDE.md:81 "eu-west-2/İrlanda" bayat** → düzeltildi: kök CLAUDE.md:81 artık "eu-west-2 = **Londra/Birleşik Krallık**, AB DEĞİL — madde 92, PO teyitli". (kod-teyit: grep DOĞRULANDI)
2. 🗑️→✅ **backend/CLAUDE.md "Five models" ↔ kod 38 model** → düzeltildi: backend/CLAUDE.md "**38 models**" (grep-kanıtlı `^model `=38).
3. 🗑️→✅ **backend/CLAUDE.md `iceBreaker.ts` core-modül tablosunda** → düzeltildi: satır 50 "`iceBreaker.ts` **deleted**".
4. 🗑️→✅ **backend/CLAUDE.md "LLM yalnız ice-breaker" ↔ "LLM removed" içsel çelişki** → düzeltildi: satır 9/65/90 tutarlı "LLM removed, no active path".
5. 🗑️→✅ **backend/CLAUDE.md `matchReason.ts`+`iceBreaker.ts` LLM kuralı (iki dosya YOK)** → düzeltildi: satır 65/90 "both deleted".
6. 🗑️→✅ **teshis :106 sunucu-konumu "İrlanda/AB"** → Londra/BK ile çürütüldü (madde 92 canonical; kök CLAUDE.md düzeltildi).
7. 🗑️→✅ **backend/CLAUDE.md etiket-uzunlukları / bayat kod-gerçeği** → madde-124 GÜNCELLEME notunda "etiket uzunlukları" düzeltildi.

**Zaten ✅ tamamlanmış (madde-124 dışı):**
8. ✅ **Belge güvenli-seed listesi düzeltmesi** — CLAUDE.md:75-78 "seed-questions.ts SİLİNDİ #45; güvenli = seed-certification/learning-journey/test-tenant.mjs" kodla TAM örtüşür (`prisma/seed.ts:300 deleteMany` tehlikeli). Kod-teyit ✅.
9. ✅ **Submodule pointer bump dansı önleme kuralı** — CLAUDE.md "Merge sonrası pointer bump — DANS ÖNLEME" bölümüne işlendi (Taslak A).
10. ✅ **Docs çakışma serileştirme kuralı** — CLAUDE.md "Docs çakışması önleme — SERİLEŞTİR" bölümüne işlendi (Taslak B).

**📌 Kalıcı kural (kod-dışı, kart almaz):**
11. 📌 **Çalışma-tarzı/güvenlik kuralları CLAUDE.md'de canonical** (8-unsur belge-düzeni / DevSecOps / 3-kırmızı-kural / belge-senkron / karar-takip) — yürürlükteki kural, aksiyon değil.

> **Not (tekil operasyonel not'lar):** 00-SAYIM (c) G9 listesinde ayrıca "Arkadaşın başvurusu — gerçek kişi bekliyor" ve "İŞ 1 o-güne-özel worktree/branch listesi (2026-08 tarihli)" 🗑️ satırları görünür; bunlar o-güne-özel geçici operasyonel notlardır (aksiyon değil, arşiv-adayı) ve yukarıdaki 27-sayımına dahildir — kart açmayı gerektirmez, belge temizliğinde silinir.
