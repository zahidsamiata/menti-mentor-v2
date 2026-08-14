# Belge Temizlik Haritası

**📸 DONDURULMUŞ (2026-08-14)** — o günün keşif fotoğrafı, güncellenmez.
**Toplam belge:** 44 · **İLERLEME:** 44/44 tarandı (kararlar 19 · raporlar 16 · arsiv 3 · devir 6).

> **Amaç:** `docs/kararlar/belge-duzeni-rehberi.md` (6 kural) ışığında tüm belgeleri sınıflandırmak.
> **Bu harita SADECE keşiftir** — hiçbir belge taşınmadı/silinmedi/birleştirilmedi. Her öneri **PO kararı gerektirir**;
> uygulama AYRI bir turda yapılacak. Emin olunamayan sınıflandırmalarda "TEYİT GEREK" yazılıp iki kanıt yan yana konmuştur.
>
> **6 kural kısaca:** (1) tek canonical · (2) tür=klasör · (3) 🔄/📸 üst etiket · (4) adlandırma · (5) INDEX=harita · (6) eksik-işaretleme (silme yok).

---

## 1) Ana tablo — 44 belge

Durum kodları: `düzenli` · `bayat` (⚠️ işaretleme gerek) · `arşiv-adayı` · `birleşme/gruplama-adayı` · `yanlış-klasör` · `INDEX'te-yok` · `etiket-yok`.

### `docs/kararlar/` (19)

| Belge | Tür | Durum | Öneri (PO kararı gerekli) | Kanıt |
|---|---|---|---|---|
| `00-INDEX.md` | 🔄 | düzenli · etiketli | Kural 5 kapısı; raporlar/arsiv eksikleri giderilince güncellenmeli | s.2 "🔄 YAŞAYAN (canonical: belge haritası)" |
| `01-urun-vizyonu.md` | 🔄 | etiket-yok | Başa `🔄 YAŞAYAN` ekle | s.1-2 başlık + "Son güncelleme 2026-08-02", üst etiket yok |
| `02-mimari-ve-altyapi.md` | 🔄 | etiket-yok · **bayat** | 🔄 ekle; Next.js sürüm çelişkisine ⚠️ GÜNCELLEME notu | s.22 "14.2.35 vs 15.5.20 çelişki"; s.40 eski VPS/PaaS |
| `03-psikometri-ve-algoritma.md` | 🔄 | etiket-yok · bayat(hafif) | 🔄 ekle; stub durumunu tarih notuyla güncelle | s.37-40 "kod YAZILMADI — stub (nötr 50) ⏳" |
| `04-guvenlik-ve-kvkk.md` | 🔄 | etiket-yok · **bayat/çelişki** | 🔄 ekle; 2 IDOR maddesine ⚠️ DOĞRULAMA GEREK | s.28-29 "2 IDOR ⏳ DÜZELTİLMEDİ" ↔ belge-aksiyon-denetimi s.62-63 "ÇELİŞKİ" |
| `05-ozellikler-ve-paneller.md` | 🔄 | etiket-yok · **bayat** | 🔄 ekle; timezone+seed satırlarını TEYİT GEREK işaretle | s.26 timezone ⏳; s.36 "seed'lendi, teyit edecek ⏳" |
| `06-tasarim-ux.md` | 🔄 | etiket-yok · **bayat** | 🔄 ekle; "karar verildi-yapılmadı" satırlarını işaretle | s.21 landing dark/light; s.11 lacivert yön (uygulanmadı) |
| `07-calisma-tarzi.md` | 🔄 | etiket-yok | 🔄 ekle; CLAUDE.md ile tutarlı, içerik güncel | s.1-2 "Son güncelleme 2026-08-02", etiket yok |
| `08-acik-sorular.md` | 🔄 | etiket-yok · **bayat** · gruplama-adayı | 🔄 ekle; unutulmus-niyet-envanteri'ne cross-ref | s.23 timezone strikethrough eski format; konu çakışması ↔ unutulmus-niyet |
| `09-DURUM.md` | 🔄 | **düzenli · etiketli** (canonical) | Örnek düzen; değişiklik gerekmez | s.3 "🔄 YAŞAYAN (canonical: güncel durum)" |
| `10-yol-haritasi.md` | 🔄 | etiket-yok | Başa `🔄 YAŞAYAN` ekle (canonical iş kuyruğu) | s.8 "Son güncelleme 2026-08-11", üst 🔄 yok |
| `belge-aksiyon-denetimi-2026-08-11.md` | 📸 | düzenli · gruplama-adayı | 📸 üst etiketi netleştir; denetim kümesi cross-ref | s.1-2 tarih+amaç; denetim üçlüsü (aşağıda) |
| `belge-denetimi-2026-08-10.md` | 📸 | düzenli · gruplama-adayı | 📸 netleştir; denetim kümesi cross-ref | s.1 "Belge Denetimi 2026-08-10" |
| `belge-duzeni-rehberi.md` | 🔄 | **düzenli · etiketli** (canonical) | Örnek düzen; değişiklik gerekmez | s.3 "🔄 YAŞAYAN … Son güncelleme 2026-08-11" |
| `chat-v1-teslim.md` | 📸 | etiketli · **bayat(hafif)** | cross-tenant notu güncel mi TEYİT | s.19 "Conversation/Message TENANT_SCOPED değil" ↔ belge-aksiyon "çözüldü" |
| `dokploy-foto-volume-talimati.md` | 📸 | etiket-yok · klasör-TEYİT | 📸 ekle; kararlar/'da kalsın (blocker/talimat) — TEYİT | s.1 başlık etiketsiz; 10-yol E + 09-DURUM referanslı |
| `stk-admin-bulgu-envanteri-2026-08-11.md` | 📸 | düzenli · etiketli | Değişiklik gerekmez | s.1-2 "13 Bulgu Envanteri 2026-08-11, salt-okuma" |
| `tasarim-kararlari-admin-2026-08-11.md` | 🔄 | etiket-yok | Başa `🔄 YAŞAYAN` ekle (kararlar eklenebilir) | s.1-2 "Tasarım Kararları", üst 🔄 yok |
| `unutulmus-niyet-envanteri-2026-08-10.md` | 📸 | düzenli · gruplama-adayı | Etiketli; 08-acik-sorular'a cross-ref | s.1 "Unutulmuş Niyet Envanteri 2026-08-10" |

### `docs/raporlar/` (16) — hepsi 📸 dondurulmuş keşif; **16/16 üst etiket yok, 14/16 INDEX'te yok**

| Belge | Tür | Durum | Öneri (PO kararı gerekli) | Kanıt |
|---|---|---|---|---|
| `admin-panelleri-tasarim-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-var | 📸 ekle; global-seed durumuna güncelleme notu | INDEX s.60; s.14-16 "global seed eksik" |
| `depo-denetimi-2026-08-02.md` | 📸 | etiket-yok · **INDEX'te-yok** | 📸 ekle; INDEX raporlar tablosuna ekle | INDEX'te sadece kaynak-sohbet bahsi (s.72) |
| `hayalet-backend-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · **arşiv-adayı(TEYİT)** | 📸+INDEX; İŞ 7 sonrası revalidate; ölü kod silinirse arşiv | s.16-17 çağrısız endpoint; s.34 iceBreaker "decommissioned" |
| `kapasite-analizi-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · **arşiv-adayı(TEYİT)** | 📸+INDEX; darboğaz giderilince arşiv | s.11-16 "listUsers sayfalama YOK" |
| `kart-havuz-backend-envanteri-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · gruplama-adayı | 📸+INDEX; foto-upload yapılınca revalidate | s.119-205 "upload altyapısı YOK" |
| `katilim-modeli-mevcut-durum-notu-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · **arşiv-adayı(TEYİT)** | 📸+INDEX; İŞ 5 sonrası arşiv | s.27-31 "hayalet mod YOK"; s.44 "kod yazılmadı" |
| `menti-persona-ve-sevdirme-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · gruplama-adayı | 📸+INDEX; persona üçlüsü olarak grupla | s.4 "eğitimli taslak" |
| `mentor-karti-rakip-analizi-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · **arşiv-adayı(TEYİT)** | 📸+INDEX; kart işi bitince arşiv | s.94-129 "6 KESİNLEŞEN KARAR" |
| `mentor-persona-ve-sevdirme-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · gruplama-adayı | 📸+INDEX; persona üçlüsü | başlık; P1-P4 retention prensipleri |
| `platform-admin-panel-envanteri-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · gruplama-adayı | 📸+INDEX; panel-envanteri kardeş çift | s.84-91 "drill-down backend hazır/frontend yok" |
| `platform-admin-strateji-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · **bayat** · gruplama-adayı | 📸+INDEX; "AdminAuditLog" iddiasını düzelt/işaretle | s.74 gövde "AdminAuditLog tablosu" ↔ s.137-138 not "SystemLog AUDIT" |
| `stk-yonetici-panel-envanteri-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · gruplama-adayı | 📸+INDEX; retention/lastLoginAt sonrası revalidate | s.124-127 "lastLoginAt HİÇ YOK" |
| `stk-yonetici-strateji-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · **bayat** · gruplama-adayı | 📸+INDEX; "hayalet mod" iddiasını PR #31 ile güncelle | s.81-87 gövde ↔ s.137-139 not "PR #31 düzeltildi" |
| `tema-durum-ve-landing-maliyeti-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · **arşiv-adayı(TEYİT)** | 📸+INDEX; PR #32 merge + tema canlı sonrası arşiv | s.24 "PR #32 (WIP)"; s.63 "canlı-sonrasına ertele" |
| `teshis-raporu-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-var | 📸 ekle; kapsamlı teşhis tarihsel referans | INDEX s.59; s.1 başlık etiketsiz |
| `yonetici-persona-ve-metrikler-2026-08-02.md` | 📸 | etiket-yok · INDEX'te-yok · gruplama-adayı | 📸+INDEX; persona üçlüsü | 3 profil + metrik taslağı |

### `docs/arsiv/` (3)

| Belge | Tür | Durum | Öneri (PO kararı gerekli) | Kanıt |
|---|---|---|---|---|
| `09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md` | 📸 | etiketli · **INDEX'te-yok** | INDEX arsiv tablosuna ekle | s.1-6 arşiv etiketi VAR; INDEX s.62-66 listede yok |
| `SOHBET-KARAR-OZETI-devir.md` | 📸 | INDEX'te-var · etiket-zayıf | Etiketi `📸 DONDURULMUŞ (tarih)` formatına standartlaştır | s.2 "Sohbetin bu kısmından…" (tam format değil); INDEX s.65 |
| `strateji-ve-guvenlik-denetimi.md` | 📸 | **etiket-yok** · iki-konu · TEYİT | 📸 ekle; "arşiv mi ileride-oku mu" netleştir; canonical link (01+04) | s.1 başlık etiketsiz; s.3-8 "UYGULAMA…" uyarısı; INDEX s.66 |

### `docs/devir/` (6) — kontrol katmanı devir seti, hepsi 📸 etiketli; canonical kopya-bilgi riski (Kural 1)

| Belge | Tür | Durum | Öneri (PO kararı gerekli) | Kanıt |
|---|---|---|---|---|
| `01-felsefe-ve-calisma-tarzi.md` | 📸 | düzenli · canonical-link-eksik | kararlar/07'ye "canonical" bağlantısı ekle | s.1-3 etiket VAR; kararlar/07 özeti |
| `02-proje-durumu.md` | 📸 | düzenli · **bayat(SHA)** | Eski SHA uyarısını kuvvetlendir; kararlar/09 canonical | s.61-62 sabit SHA (da6a138/afc2769); s.65-66 uyarı |
| `03-kvkk-is-paketi.md` | 📸 | düzenli · durum-TEYİT | K1-K6 mevcut durumu netleştir; kararlar/04 canonical | s.3 "canlı öncesi kritik"; K1-K6 durumu belirsiz |
| `04-13-admin-bulgusu.md` | 📸 | düzenli | kararlar/10-A + stk-admin-bulgu-envanteri ilişkisini INDEX'te açıkla | s.31 "ön tahmin = keşif öncesi" |
| `05-bekleyen-kararlar-ve-manuel.md` | 📸 | düzenli · durum-TEYİT | kararlar/09+10 (C/E) canonical; niyet-envanteri bağla | s.13 "ikisi de niyetli ama tam bağlanmamış" |
| `06-devir-kilavuzu.md` | 📸 | **düzenli** (kendisi canonical) | İyi yapılanmış; değişiklik gerekmez | s.22 "devir anı değerleri eskiyebilir" + doğrulama komutu |

---

## 2) Öne çıkan listeler

### (1) BAYAT / YANLIŞ bilgi içerenler — öncelikli (yanlış okunmasın)
> Kural 6: silinmez, üstüne `⚠️ GÜNCELLEME (tarih): …` notu konur. Aşağıdakiler PO onayıyla işaretlenmeli.

1. **`04-guvenlik-ve-kvkk` s.28-29 — KRİTİK/ÇELİŞKİ:** 2 IDOR için iki denetçi ZIT kanıt verdi ("korumalı" ↔ "bozuk"). **Canlı öncesi doğrulama şart.** ⚠️ DOĞRULAMA GEREK notu.
   - **✅ ÇÖZÜLDÜ (2026-08-14):** Kod keşfi IDOR açığı OLMADIĞINI kanıtladı (tenant+sahiplik korumalı; commit `161ae00`). `04-guvenlik-ve-kvkk.md` ve `belge-aksiyon-denetimi-2026-08-11.md` belgelerine ✅ çözüm notu işlendi.
2. **`platform-admin-strateji` s.74 ↔ s.137-138:** gövde "AdminAuditLog tablosu (migration)" der; kod-doğrulama notu "ayrı tablo YOK, SystemLog'a AUDIT yazılıyor" der. Gövde düzeltilmeli/işaretlenmeli.
3. **`stk-yonetici-strateji` s.81-87 ↔ s.137-139:** gövde "hayalet mod havuzda görünmez" der; not "KISMEN yanlış, PR #31'de düzeltildi" der.
4. **`02-mimari` s.22/s.40:** Next.js 14.2.35 ↔ 15.5.20 sürüm çelişkisi; eski VPS/PaaS notları.
5. **`06-tasarim` s.21/s.11:** landing dark/light + lacivert yön "karar verildi, yapılmadı".
6. **`05-ozellikler` s.26/s.36:** timezone bug + seed durumu "⏳" — güncel mi TEYİT.
7. **`08-acik-sorular` s.23:** timezone çözüldü ama eski strikethrough format.
8. **`chat-v1-teslim` s.19:** cross-tenant snapshot güncellenmiş olabilir — TEYİT.
9. **`03-psikometri` s.37-40:** eşleşme skoru stub (nötr 50) — durum notu.
10. **`devir/02` s.61-62:** gövdede sabit eski SHA'lar; uyarı zayıf. **`devir/03`:** K1-K6 tamamlanma durumu belirsiz.

### (2) BİRLEŞME / GRUPLAMA adayları
> **Not:** Dondurulmuş raporlar TARİHSEL fotoğraftır — birleştirilmez. Uygun aksiyon çoğunlukla **INDEX'te gruplama + cross-ref**, fiziksel birleştirme değil. Hepsi PO kararı.

- **Denetim kümesi (tamamlayıcı, cross-ref öner):** `belge-aksiyon-denetimi-2026-08-11` + `belge-denetimi-2026-08-10` + `unutulmus-niyet-envanteri-2026-08-10`. Üçü de "kararlar gerçekle kıyas / unutulan" konusu; farklı kapsam ve tarih → birleştirme değil, aralarında "bkz." bağı.
- **`08-acik-sorular` ↔ `unutulmus-niyet-envanteri`:** KVKK / fotoğraf / eşleşme tetikleyicisi konuları çakışıyor. Biri yaşayan karar kuyruğu, diğeri dondurulmuş keşif → cross-ref (birleştirme değil).
- **Persona üçlüsü (INDEX'te tek başlık altında grupla):** `menti-persona` + `mentor-persona` + `yonetici-persona`.
- **Panel envanteri kardeş çifti:** `platform-admin-panel-envanteri` + `stk-yonetici-panel-envanteri`.
- **Strateji kardeş çifti:** `platform-admin-strateji` + `stk-yonetici-strateji`.
- **Backend envanteri:** `hayalet-backend` + `kart-havuz-backend-envanteri` (aynı kategori; ayrı konu, gruplama yeterli).
- **`devir/01-06` ↔ kararlar canonical (07 / 09 / 04 / 10):** kopya-bilgi riski (Kural 1). Her devir belgesine "canonical: kararlar/XX" bağlantısı öner.
- **`arsiv/strateji-ve-guvenlik` ↔ `01-urun-vizyonu` + `04-guvenlik`:** iki konu tek belgede; canonical'lara link.

### (3) ARŞİV adayları — hepsi **TEYİT GEREK** (koşula bağlı, PO kararı)
| Belge | Arşiv koşulu |
|---|---|
| `hayalet-backend` | İŞ 7 sonrası + ölü kod (iceBreaker vb.) fiilen silindiyse |
| `kapasite-analizi` | Listelenen darboğazlar (sayfalama vb.) giderildiyse |
| `katilim-modeli-mevcut-durum-notu` | İŞ 5 (hayalet mod/davet) tamamlandıysa |
| `mentor-karti-rakip-analizi` | Kart işi + 6 karar uygulandıysa |
| `tema-durum-ve-landing` | PR #32 merge + tema canlıya alındıysa |
| `devir/` seti (01-06) | Kontrol katmanı devri işlevini tamamladıysa (tarihsel iz olarak arsiv/) |

> Hiçbiri bu turda taşınmadı; koşullar doğrulanmadan arşivlenmemeli.

### (4) INDEX'te eksik olanlar (Kural 5)
- **raporlar/ (14):** depo-denetimi · hayalet-backend · kapasite-analizi · kart-havuz-backend-envanteri · katilim-modeli-mevcut-durum-notu · menti-persona · mentor-karti-rakip-analizi · mentor-persona · platform-admin-panel-envanteri · platform-admin-strateji · stk-yonetici-panel-envanteri · stk-yonetici-strateji · tema-durum-ve-landing · yonetici-persona. (Sadece `teshis-raporu` + `admin-panelleri-tasarim` listeli.)
- **arsiv/ (1):** `09-DURUM-ve-yolharitasi-arsiv-2026-08-10`.

### (5) ÜST ETİKET eksik olanlar (Kural 3 — 🔄/📸)
- **kararlar (11):** 01, 02, 03, 04, 05, 06, 07, 08, 10 (→ 🔄); `dokploy-foto-volume-talimati` (→ 📸); `tasarim-kararlari-admin` (→ 🔄).
- **raporlar (16/16):** hepsine `📸 DONDURULMUŞ (2026-08-02)`.
- **arsiv (1-2):** `strateji-ve-guvenlik-denetimi` (etiket yok → 📸); `SOHBET-KARAR-OZETI-devir` (zayıf format → standartlaştır).
- **Zaten düzenli/etiketli (dokunma):** `00-INDEX`, `09-DURUM`, `belge-duzeni-rehberi`, `belge-aksiyon-denetimi`, `belge-denetimi-2026-08-10`, `stk-admin-bulgu-envanteri`, `unutulmus-niyet-envanteri`, `chat-v1-teslim`, `devir/01-06`, `arsiv/09-DURUM-arsiv`.

---

## 3) Özet sayılar
- **Bayat/yanlış işaretleme gereken:** ~10 belge (2'si KRİTİK: 04-guvenlik IDOR çelişkisi, strateji belgelerindeki eski iddialar).
- **Üst etiket eksik:** ~29 belge (en yoğun: raporlar 16/16).
- **INDEX'te yok:** 15 belge (14 rapor + 1 arşiv).
- **Gruplama/cross-ref adayı:** 6 küme.
- **Arşiv adayı (TEYİT):** 6 belge/set.
- **Yanlış klasör:** belirgin yok (1 TEYİT: `dokploy` — kararlar/'da kalması öneriliyor).

> **Sonraki adım (AYRI tur, PO onayıyla):** Bu haritadaki öneriler önceliklendirilip uygulanır. En yüksek öncelik: (a) `04-guvenlik` IDOR çelişkisinin canlı-öncesi doğrulanması, (b) iki strateji raporundaki yanlış iddiaların işaretlenmesi, (c) INDEX'in 15 eksik belgeyle tamamlanması.
