# PO KARARLARI — İŞLENDİ (Tur-5c)

**2026-08-27** · Bilanço 184 karar kartının PO tarafından bağlanan kararları belgeye işlendi. Bu belge kararların ÖZETİDİR; detay her `G*.md` kartında `[x]` + PO notu olarak işaretli.

> **Bu tur yorum/karar/iş YAPMADI** — yalnız PO'nun strateji oturumundaki kararlarını kutulara işledi. Sıralama (öncelik) YAPILMADI (ayrı tur).

## 1. KARAR DAĞILIMI (TAM SAYI)

| Karar | Sayı | Not |
|---|:---:|---|
| ✅ İşleme al | **87** | 9 çıkış-blokeri dahil (78 normal + 9 bloker) |
| ⏸️ Şimdilik alma | **85** | öncelik verilmedi, sıraya girmedi |
| 🗑️ Geçersiz | **2** | G4-03, G9-01 |
| ❓ Önce keşif | **2** | G4-09, G4-10 (kutu işaretlenmedi, PO notu var) |
| ⬜ Boş (PO listesinde YOK) | **8** | aşağıda §7 — kararsız kaldı, raporlandı |
| **TOPLAM** | **184** | 176 karar + 8 boş |

> ⚠️ **GÜNCELLEME (2026-08-28): 8 boş kart PO'ca bağlandı → yeni dağılım (TAM SAYI, kod-kutusu doğrulandı):**
>
> | Karar | Eski | **Yeni** | Değişim |
> |---|:---:|:---:|---|
> | ✅ İşleme al | 87 | **92** | +5 (G3-08, G4-01, G4-24, G8-08, G9-05) |
> | ⏸️ Şimdilik alma | 85 | **87** | +2 (G4-11, G4-12) |
> | 🗑️ Geçersiz | 2 | **3** | +1 (G3-11) |
> | ❓ Önce keşif | 2 | **2** | (G4-10 PO-teyit edildi; kutu aynı) |
> | ⬜ Boş | 8 | **0** | hepsi bağlandı |
> | **TOPLAM** | 184 | **184** | — |
>
> Sıralama: `00-ONCELIK-SIRASI-2026-08-28.md` (S17 kapandı). §7'deki 8 kart artık karara bağlı (o bölüm tarihsel iz olarak korunur).

> ⚠️ **GÜNCELLEME 2 (2026-08-28, öncelik-düzeltme turu — PO teyidi): revize dağılım (kod-kutusu doğrulandı):**
>
> | Karar | (bir önceki) | **Son** | Değişim |
> |---|:---:|:---:|---|
> | ✅ İşleme al | 92 | **87** | −5 (G2-01..05 geçersiz'e çevrildi) |
> | ⏸️ Şimdilik alma | 87 | **87** | — |
> | 🗑️ Geçersiz | 3 | **8** | +5 (G2-01, G2-02, G2-03, G2-04, G2-05 — DISC matrisi Big Five'a bırakıldı) |
> | ❓ Önce keşif | 2 | **2** | — |
> | ⬜ Boş | 0 | **0** | — |
> | **TOPLAM** | 184 | **184** | — |
>
> Ayrıca G9-05 notu düzeltildi (yanlış karta yazılmış sertifika/anket notu → belge-hijyeni notuyla değiştirildi); G1-01→Faz 2, G3-05→Faz 6, G4-39→Faz 7 taşındı. Detay: `00-ONCELIK-SIRASI-2026-08-28.md`.

## 2. 🔴 ÇIKIŞ BLOKERLERİ (9 — çıkış öncesi ZORUNLU)
- **G8-01** — Foto kalıcı disk (Dokploy volume); yoksa her deploy fotoğrafları siler.
- **G1-05** — KVKK kullanıcı-yüzü üçlüsü (veri indir/anonimleştir/sil) arayüzü yok.
- **G1-07** — Rıza SÜRÜMÜ tutulmuyor → ispat açığı.
- **G1-09** — `destek@` tanımsız + hak-kullanım ekranı yok.
- **G1-10** — Aydınlatma metninde eksik veri kategorileri (⚠️ G1-13 ile TEK MADDE).
- **G1-13** — Kulüp-tipi kurum AKTİF EDİLSİN + hukuki koruma açık beyan (⚠️ G1-10 ile TEK MADDE).
- **G1-28** — Sunucu/altyapı sertleştirme (HTTPS/firewall/SSH/SSL/yedek).
- **G5-01** — Kurum başvuru mail gönderimini AÇMA (env).
- **G5-02** — Kurum onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL`.

## 3. ✅ İŞLEME AL (87, grup grup)
- **G1:** 01,02,04,06,08,14,15,16,17,19,23,26,29 + blokerler 05,07,09,10,13,28
- **G2:** 01,02,03,04,05,07,08,11
- **G3:** 04,05,09,**13**,15,16,18,19  *(G3-13 PO kararıyla ⏸️→✅ canlandı)*
- **G4:** 02,04,05,08,14,17,22,23,25,30,31,39
- **G5:** 04,05,07 + blokerler 01,02
- **G6:** 01,03,05,07
- **G7:** 01,02,03,04,09,12,13
- **G8:** 02,03,04,05,06,13,14 + bloker 01
- **G9:** 02,03,04,06,07,08,09,10,13,14,15,16
- **G10:** 01,22,23,25

## 4. ⏸️ ŞİMDİLİK ALMA (85, grup grup + neden)
- **G1:** 03,11,12,18,20,21,22,24,25,27,30 — *çoğu KVKK inceliği (hukukçu bekliyor) veya v2; **G1-30** = çerez bandı → **analytics kararı: çıkışta YOK***
- **G2:** 06,09,10 — *psikometri/kalibrasyon, model değişimine bakılacak*
- **G3:** 01,02,03,06,07,10,12,14,17 — ***G3-01+G3-10 = TASARIM TEZİNE BAĞLI** (DISC→Big Five yeniden tanımlıyor); diğerleri içerik-felsefe/DB-teyit*
- **G4:** 06,07,13,15,16,18,19,20,21,26,27,28,29,32,33,34,35,36,37,38 — *retention/UX incelikleri, canlı-sonrası; **G4-18** = foto opsiyonel (zorunluluk sonraya)*
- **G5:** 03,06 — *bildirim/push (v2)*
- **G6:** 02,04,06 — *teknik borç (enum/perf), bilinçli erteleme*
- **G7:** 05,06,07,08,10,11,14 — ***G7-05+G7-06 = analytics çıkışta YOK**; diğerleri SEO/landing (canlı-sonrası)*
- **G8:** 07,09,10,11,12 — *altyapı/perf (Neon pool, rate-limit), canlı-sonrası*
- **G9:** 11,12 — *belge-hijyen (kişi-adı temizliği, model-tercihi), düşük öncelik*
- **G10:** 02-21,24 (21 kalem) — *ölü/yarım kod: bilinçli terk veya v2; **G10-12 (/clubs)** = "kulüp modeli AKTİF" notu (⚠️ G1-13'e bağlı)*
- **G11:** 01,02 — *ürün stratejisi: modül sırası (ilerleyen yıllar), gelir modeli (hacim gelince minimum ücret, uzun süre yok)*

## 5. 🗑️ GEÇERSİZ (2)
- **G4-03** — Manuel eşleştirme: "Algoritma seçenek sunar, mentör+menti kendi tercihleriyle görüşme kurar. Strateji belgesi geçerli, envanter 'eksik' kaydı YANLIŞ." → **Ç5 çelişkisi ÇÖZÜLDÜ.**
- **G9-01** — (bilançoda 🗑️ adayıydı; PO onayladı geçersiz).

## 6. ❓ ÖNCE KEŞİF (2 — ayrı küçük tur)
- **G4-09 + G4-10** — Eski super-admin kapısında yeni `/platform` kapısında OLMAYAN bir yetenek var mı? Varsa taşınır, sonra kapatılır. **Keşif olmadan silme YOK.**

## 7. ⚠️ PO LİSTESİNDE OLMAYAN 8 KART (boş bırakıldı — karar bekliyor)
> Bu kartlar PO'nun karar listesinde hiç geçmedi; uydurma yapılmadı, boş bırakıldı. Bir sonraki karar turunda bağlanmalı:

| Kart | Başlık | Not |
|---|---|---|
| **G3-08** | Sertifika seed↔canlı tutarsızlığı (kod 20 ↔ canlı ~5) | içerik/seed — muhtemelen G3 kümesiyle |
| **G3-11** | 17 eşleştirme PO-onay noktası (matris/%60-40) | ⚠️ tasarım teziyle ilişkili olabilir |
| **G4-01** | Havuz KART görünümü (rol-bazlı) | panel — karar bekliyor |
| **G4-11** | Otomatik anomali/kötüye-kullanım tespiti (v2) | platform — karar bekliyor |
| **G4-12** | Platform büyüme trendi + aktiflik | platform — karar bekliyor |
| **G4-24** | Menti P1 DISC "özgüven aşısı" sunumu | ⚠️ model değişimiyle ilişkili olabilir |
| **G8-08** | İzole test DB (`TEST_DATABASE_URL` + Neon test dalı) | altyapı — karar bekliyor |
| **G9-05** | 09-DURUM belge-içi çelişki blokları | belge-hijyen — karar bekliyor |

## 8. ⭐ BAĞLI KARARLAR (birlikte izlenmeli — biri unutulursa açık kalır)
- **G1-13 ↔ G1-10** — Kulüp-tipi kurum aktif etme **+** aydınlatma metnine açık beyan = TEK MADDE (kulüp başkanı imza yetkisiz → hukuki koruma beyan; avukat görüşü).
- **G10-12 (/clubs) ↔ G1-13** — Kulüp modülü AKTİF kararı, kulüp-tipi kurum aktifleştirmesine bağlı.
- **G3-04 → G3-13** — STK anket/şıklı-soru isteği, `answerType` şema alanını (migration) zorunlu kılar (G3-13 bu yüzden canlandı).
- **G1-17 ↔ G7-04** — (PO: aynı dosyada iki iş — birlikte yapılır).
- **G2-07 + G2-08 + G10-21** — Tek iş: sektör 5-bileşen + OCEAN katmanını canlı eşleştirmeye bağlama (uyuyan boru hatları).
- **G8-01 ↔ G10-25** — Fotoğraf zinciri: kalıcı disk (bloker) + kayıt-sonrası foto/bilgi düzenleme keşfi.

## 9. ⚠️ İŞLEME NOTLARI (dürüstlük)
- **G4-10 çift-atama:** PO'nun ⏸️-listesinde de, ❓-keşif listesinde de görünüyordu. Keşif kararı (özel PO notu taşıdığı için) esas alındı; erteleme listesindeki tekrar not olarak karta işlendi. **PO teyit edebilir.**
- **G10-12 gerilimi (bilgi):** kutu ⏸️ (şimdilik alma) ama not "kulüp modeli AKTİF". "Aktif kararı verildi ama iş sırasına şimdilik alınmadı" olarak yorumlandı (çelişki değil); box PO listesine sadık işlendi.
- Kart METİNLERİ değiştirilmedi; yalnız kutu + PO notu eklendi.

## 10. ⏳ SIRALAMA YAPILMADI
İşleme-al (87) ve keşif (2) kalemleri **öncelik sırasına SOKULMADI** (KURAL 8: yalnız öncelik verilince `10-yol-haritasi`'na girer). Öncelik sıralama = ayrı tur. Bu tur yalnız "işleme al / alma / geçersiz / keşif" kararını kaydetti.
