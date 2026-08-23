# Belge Mimarisi + Merge/Submodule Sürtünmesi — Öneri Raporu

> 📸 **DONDURULMUŞ (2026-08-19)** — o günkü keşif fotoğrafı ve öneri seti.
> **Bu bir TESPİT + ÖNERİ belgesidir, UYGULAMA belgesi DEĞİL.** Hiçbir mevcut belge/kod/CLAUDE.md
> bu turda değiştirilmedi. Aşağıdaki tüm öneriler ürün sahibinin (PO) onayına tabidir; uygulama ayrı
> turlarda yapılır. Kararı bu belge VERMEZ — gerekçeli seçenek sunar.

---

## 0. Amaç ve kapsam

Ürün sahibi iki kalıcı düzen sorununa çözüm istedi:

1. **Belge çokluğu** — `docs/` altında toplam **59 markdown belge** var; yeni katılan biri hepsini
   okuyamaz. Hangileri birleştirilmeli / yeniden adlandırılmalı / arşivlenmeli, klasör yapısı doğru mu,
   "yapılan / yapılacak kararlar" ayrımı mantıklı mı?
2. **Merge sürtünmesi** — her merge turunda tekrarlayan iki sorun: (A) submodule pointer bump dansı,
   (B) `09-DURUM.md` / `10-yol-haritasi.md` docs çakışması. Kalıcı çözüm.

**Yöntem:** `docs/` ağacının tamamı salt-okuma tarandı; her belge içeriğiyle değerlendirildi; örtüşme
iddiaları iki-belge kanıtıyla doğrulandı; CLAUDE.md ve git-config (`.gitmodules`, `.gitattributes`,
`scripts/`) okundu.

**Git durumu (bu tur, doğrulandı):** Çatı `origin/main` = `753c545` (#95 merge). Açık PR: yalnız **#96**
(tam-envanter raporu, docs — bu turda dokunulmadı). Backend submodule pointer `b6187c1`, senkron.

> **Not — #96 kapsam dışı:** `docs/raporlar/tam-envanter-gercek-durum-2026-08-19.md` henüz main'de değil
> (PR #96, açık). Bu rapor main'in mevcut durumunu ele alır; tam-envanter belgesi merge olunca
> "denetim kümesi"ne (bkz. §2.2) dahil edilmeli.

---

# EKSEN 5 — Belge Mimarisi Analizi + Düzen Önerisi

## 5.1 Proje başıboş değil — mevcut düzen sistemi var

`docs/kararlar/belge-duzeni-rehberi.md` (59 satır, 🔄 canonical) **6 düzen kuralı** tanımlıyor:

| # | Kural | Özet |
|---|-------|------|
| 1 | Tek canonical kaynak | Her konu BİR belgede canonical; diğerleri link verir (09-DURUM · 10-yol-haritasi · CLAUDE.md) |
| 2 | Tür = klasör | `kararlar/` (yaşayan) · `raporlar/` (dondurulmuş, tarihli) · `arsiv/` (eski) |
| 3 | 🔄/📸 üst-etiket | Her belgenin başında net etiket: yaşayan 🔄 veya dondurulmuş 📸 (tarihli) |
| 4 | Adlandırma | Dondurulmuş = tarihli; yaşayan = tarihsiz/numaralı |
| 5 | INDEX = harita | `00-INDEX.md` tek kapı; yeni belge → INDEX güncellenir |
| 6 | Eksik-işaretleme | Silme yok; eskiyeni `⚠️ GÜNCELLEME (tarih)` notuyla işaretle veya `arsiv/`'e taşı |

**Değerlendirme:** Kurallar net ve iyi tasarlanmış. Sorun kuralların kendisi değil; **uygulamada ~%20
boşluk** var (aşağıda §5.4). Yani proje "birleştirme/yeniden-yapılandırma" değil, **bakım-hijyeni**
sorunu yaşıyor.

## 5.2 Envanter — 59 belge, klasör dağılımı

| Klasör | Belge sayısı | Tür | Not |
|--------|:---:|-----|-----|
| `docs/kararlar/` | 24 | 🔄 yaşayan + 📸 denetim/keşif | Canonical + karar arşivi + denetim kümesi |
| `docs/raporlar/` | 18 | 📸 dondurulmuş | Keşif fotoğrafları (çoğu 2026-08-02) |
| `docs/raporlar/icerik/` | 6 | 📸 dondurulmuş | Test/içerik tam-metin arşivi (2026-08-15) |
| `docs/devir/` | 8 | 📸 dondurulmuş | Oturum devir notları (01-06 set + 07/08 oturum) |
| `docs/arsiv/` | 3 | 📸 dondurulmuş | Eski kopya/özet |
| **Toplam** | **59** | | |

Ayrıca **repo kökünde** (docs/ dışı): `CLAUDE.md` (canonical çalışma kuralları, 18.5KB) ve
`PROJECT_STATUS.md` (11.5KB, 9 Ağu — 09-DURUM'dan eski, bkz. §5.4 deprecated).

## 5.3 Örtüşme noktaları — kanıtla değerlendirildi (karar PO'ya)

Ürün sahibinin özellikle sorduğu örtüşme şüphelerinin her biri iki-belge kanıtıyla incelendi. **Sonuç:
şüphelenilen büyük örtüşmelerin hiçbiri gerçek birleştirme adayı değil** — çoğu kasıtlı tasarım.

### (1) `00-DURUM-PANOSU` (158 satır, 🔄) vs `00-karar-statu-haritasi-2026-08-14` (216 satır, 📸)

- **İddia:** İkisi de "karar statüsü" belgesi → örtüşüyor mu?
- **Kanıt:** PANO belgesi (s.5-7) haritayı **kaynak olarak gösteriyor**: "Bu pano onun görsel özetidir —
  yeni bilgi üretmez; dosya:satır kanıtı ve tam gerekçe için ham haritaya bak." Pano 🔄 canlıdır
  (PO sık günceller); harita 📸 dondurulmuş ham kanıttır (o günün fotoğrafı, değişmez).
- **Değerlendirme:** ÖRTÜŞME YOK — **kasıtlı dual** (görsel özet ≠ ham kanıt). → **İKİSİ DE KALSIN.**
  Sayı farkı (pano ~92 statü satırı vs harita ~72 benzersiz karar) çapraz-referans/statü-satırı
  ayrımından; pano kendi içinde bunu not etmiş.

### (2) Denetim / envanter kümesi (5 belge)

`belge-aksiyon-denetimi-2026-08-11` (313 s.) · `belge-denetimi-2026-08-10` (104 s.) ·
`unutulmus-niyet-envanteri-2026-08-10` (120 s.) · `belge-temizlik-haritasi-2026-08-14` (145 s.) ·
*(+ PR #96'daki `tam-envanter-gercek-durum-2026-08-19`)*.

- **İddia:** Çok sayıda "denetim/envanter" belgesi → örtüşüyor mu?
- **Kanıt (farklı kapsamlar):** aksiyon-denetimi = "kararlar aksiyona geçti mi?" (YAPILDI/UNUTULDU) ·
  belge-denetimi = "09/10 bayatlaştı mı?" (çözülmüş/eski kontrol) · unutulmus-niyet = "niyet var, kod
  yok/yarım mı?" (K1-K7) · belge-temizlik = "44 belge 6-kurala uyuyor mu?" (düzen taraması). Her biri
  **ayrı bir soruyu** yanıtlıyor; çapraz-referanslı.
- **Değerlendirme:** Birleştirme DEĞİL — tamamlayıcı tarihsel fotoğraflar. → **HEPSİ KALSIN;** ancak
  00-INDEX'te dağınık duruyorlar → **"Denetim kümesi" başlığı altında grupla** (erişilebilirlik).

### (3) `09-DURUM` (226 s., 🔄) vs `10-yol-haritasi` (175 s., 🔄)

- **İddia:** İkisi de büyük/canlı → birleştir mi, böl mü?
- **Kanıt:** 09 = "ŞU AN ne bitti/bekliyor" (durum); 10 = "SIRADAKİ işler" (kuyruk). İçerik ayrışmış;
  ikisi de makul boyutta (226/175 satır — **teyit edildi**, önceki taramalardaki "600+/800+" iddiası
  yanlıştı).
- **Değerlendirme:** Birleştirme de bölme de gerekmez. → **AYRI KALSIN.** (09'un boyutu çoğunlukla
  ⚠️ GÜNCELLEME notları — bu normal ve Kural 6'ya uygun.)

### (4) `08-acik-sorular` (🔄) ↔ `unutulmus-niyet-envanteri` (📸)

- **Kanıt:** İkisinde de KVKK/timezone konuları geçiyor ama farklı açıdan: 08 = "karar açık mı?",
  unutulmus-niyet = "niyet unutulmuş mu?".
- **Değerlendirme:** Hafif örtüşme → birleştirme DEĞİL, **çapraz-referans ekle** (iki yönlü link).

### (5) STK admin tasarım çifti

`tasarim-kararlari-admin-2026-08-11` (🔄 karar arşivi, 12 karar) ↔
`stk-admin-bulgu-envanteri-2026-08-11` (📸 keşif, 13 bulgu).

- **Kanıt:** Biri kararları (yaşayan), diğeri kod-keşfini (dondurulmuş) tutuyor — planlı dual.
- **Değerlendirme:** → **İKİSİ DE KALSIN** (ayrı roller).

## 5.4 Belge-belge öneri tablosu

Kategori: **KALSIN** / **ETİKET EKLE** (Kural 3) / **⚠️ NOT EKLE** (Kural 6, bayat işaret) /
**ARŞİVLE** (koşullu) / **ADLANDIR/TAŞI** / **DEPRECATED**.

### `docs/kararlar/` (24 belge)

| Belge | Satır | Etiket | Öneri | Gerekçe |
|-------|:---:|:---:|-------|---------|
| 00-INDEX | 141 | 🔄 ✓ | KALSIN + tamamla | Harita; 15 belge listede eksik (§5.4-INDEX) |
| 00-DURUM-PANOSU | 158 | 🔄 ✓ | KALSIN | Kasıtlı pano (§5.3-1) |
| 00-karar-statu-haritasi | 216 | 📸 ✓ | KALSIN | Ham kanıt, tarihsel |
| 01-urun-vizyonu | 37 | ✗ | ETİKET EKLE (🔄) | İçerik güncel, üst-etiket yok |
| 02-mimari-ve-altyapi | 53 | ✗ | ETİKET + ⚠️ NOT | Next.js sürüm çelişkisi (belge↔kod teyit gerek) |
| 03-psikometri | 64 | ✗ | ETİKET + ⚠️ NOT | SJT stub (hafif bayat) |
| 04-guvenlik-ve-kvkk | 65 | ✗ | ETİKET + ⚠️ NOT (kritik) | IDOR ✅ çözüldü ama belge hâlâ "açık" diyor |
| 05-ozellikler | 60 | ✗ | ETİKET + ⚠️ NOT | timezone + seed durumu teyit gerek |
| 06-tasarim-ux | 63 | ✗ | ETİKET + ⚠️ NOT | tema/lacivert kararı uygulanmamış |
| 07-calisma-tarzi | 57 | ✗ | ETİKET EKLE (🔄) | İçerik güncel, CLAUDE.md uyumlu |
| 08-acik-sorular | 54 | ✗ | ETİKET + çapraz-ref | unutulmus-niyet ile link (§5.3-4) |
| 09-DURUM | 226 | 🔄 ✓ | KALSIN | Canonical canlı durum |
| 10-yol-haritasi | 175 | ✗ | ETİKET EKLE (🔄) | Canonical iş kuyruğu, üst-etiket yok |
| 11-tasarim-kararlari-yasam-dongusu | 148 | ✗ | ETİKET EKLE (🔄) | Tasarım arşivi |
| belge-aksiyon-denetimi | 313 | 📸 ✓ | KALSIN | Denetim kümesi 1 |
| belge-denetimi | 104 | 📸 ✓ | KALSIN | Denetim kümesi 2 |
| belge-duzeni-rehberi | 59 | 🔄 ✓ | KALSIN | Canonical 6 kural (model belge) |
| belge-temizlik-haritasi | 145 | 📸 ✓ | KALSIN | Önceki düzen taraması (tarihsel) |
| chat-v1-teslim | 70 | ✗ | ETİKET (📸) + ⚠️ NOT | v1 tamamlandı; cross-tenant snapshot eskimiş olabilir |
| degerlendirme-metrik-sistemi-tasarim | 212 | (teyit) | KALSIN | Yeni (#95, 2026-08-19); tasarım |
| dokploy-foto-volume-talimati | 71 | ✗ | ETİKET (⚠️ TAŞIMA İPTAL) | Operasyon talimatı. **⚠️ GÜNCELLEME (2026-08-23): PO kararı — `kararlar/`'da KALIYOR** (aktif operasyon talimatı/blocker, donmuş rapor değil); "raporlar/'a taşı" önerisi geçersiz, çelişki kapandı. |
| stk-admin-bulgu-envanteri | 61 | 📸 ✓ | KALSIN | Keşif (§5.3-5) |
| tasarim-kararlari-admin | 133 | ✗ | ETİKET EKLE (🔄) | Karar arşivi (§5.3-5) |
| unutulmus-niyet-envanteri | 120 | ✗ | ETİKET (📸) + çapraz-ref | Denetim kümesi 3; 08 ile link |

### `docs/raporlar/` (18 belge) — hepsi 📸, hiçbirinde üst-etiket yok, çoğu INDEX'te yok

| Belge | Öneri | Gerekçe |
|-------|-------|---------|
| admin-panelleri-tasarim-2026-08-02 | ETİKET (📸) | Tasarım referansı, kalsın |
| degerlendirme-test-soru-envanteri-2026-08-15 | ETİKET (📸) | Durum kaydı, kalsın |
| depo-denetimi-2026-08-02 | ETİKET (📸) | Repo hijyen denetimi; işaretlediği artıklar bugün teyit edilmeli |
| eksikler-derinlestirilmis-2026-08-15 | ETİKET (📸) | İş kuyruğu referansı, kalsın |
| hayalet-backend-2026-08-02 | ETİKET + ARŞİV adayı | Ölü kod kaydı; ölü kod silinince arşivle |
| kapasite-analizi-2026-08-02 | ETİKET + ARŞİV adayı | Darboğaz envanteri, büyük ölçüde eski |
| kart-havuz-backend-envanteri-2026-08-02 | ETİKET + ARŞİV adayı | Havuz-kart işi (#7) bitince |
| katilim-modeli-mevcut-durum-notu-2026-08-02 | ETİKET + ARŞİV adayı | İŞ 5 bitince |
| menti-persona-ve-sevdirme-2026-08-02 | ETİKET (📸) | Ürün stratejisi referansı, kalsın |
| mentor-karti-rakip-analizi-2026-08-02 | ETİKET + ARŞİV adayı | Kart tasarımı sabitlenince |
| mentor-persona-ve-sevdirme-2026-08-02 | ETİKET (📸) | Ürün stratejisi referansı, kalsın |
| platform-admin-panel-envanteri-2026-08-02 | ETİKET + ARŞİV adayı | Platform admin işleri bitince |
| platform-admin-strateji-2026-08-02 | ETİKET + ⚠️ NOT + ARŞİV adayı | AdminAuditLog iddiası kod-teyit gerek |
| stk-yonetici-panel-envanteri-2026-08-02 | ETİKET + ARŞİV adayı | Panel işi bitince |
| stk-yonetici-strateji-2026-08-02 | ETİKET + ⚠️ NOT | "Hayalet mod" iddiası kod-teyit gerek |
| tema-durum-ve-landing-maliyeti-2026-08-02 | ETİKET + ARŞİV adayı | Tema PR #32 canlıya alındıysa |
| teshis-raporu-2026-08-02 | ETİKET (📸) | Başlangıç fotoğrafı, kalsın |
| yonetici-persona-ve-metrikler-2026-08-02 | ETİKET (📸) | Ürün stratejisi referansı, kalsın |

`raporlar/icerik/` (6 belge): hepsi test/içerik tam-metin arşivi (2026-08-15), 📸 etiket eklenmeli;
başka değişiklik gerekmez.

### `docs/devir/` (8 belge)

| Belge | Öneri | Gerekçe |
|-------|-------|---------|
| 01-felsefe-ve-calisma-tarzi | KALSIN | Kalıcı kural referansı |
| 02-proje-durumu | ⚠️ NOT | Güncel durum 09-DURUM'da; işaret ekle |
| 03-kvkk-is-paketi | KALSIN | Aktif KVKK iş referansı |
| 04-13-admin-bulgusu | KALSIN | Panel işleri referansı |
| 05-bekleyen-kararlar-ve-manuel | KALSIN | Bekleyen iş referansı |
| 06-devir-kilavuzu | KALSIN | Devir prosedürü (kalıcı) |
| 07-oturum-2026-08-14 | ARŞİV adayı | Daha yeni 08 + 09-DURUM var |
| 08-oturum-2026-08-15 | KALSIN (şimdilik) | En yeni oturum; bir sonraki oturumda arşiv adayı |

> **devir/ hakkında:** Klasör "devir işlevi bitti mi?" diye sorulmuştu. **Devir işlevi bitmedi** —
> her oturum kapanışı buraya yazılıyor (07, 08 canlı örnek). 01-06 set kalıcı referans; sadece
> **eski oturum belgeleri** (07 ve öncesi) tarihsel arşiv adayı. Klasör KALSIN.

### `docs/arsiv/` (3 belge) — hepsi TUTULMALI (silme yok, Kural 6)

| Belge | Öneri | Gerekçe |
|-------|-------|---------|
| 09-DURUM-ve-yolharitasi-arsiv-2026-08-10 (633 s.) | TUT | Belge-kod tarihsel iz |
| strateji-ve-guvenlik-denetimi (433 s.) | TUT | Ürün vizyonu parçası (PO: monetizasyon uygulanmayacak notu) |
| SOHBET-KARAR-OZETI-devir (110 s.) | TUT (zayıf) | Eski sohbet özeti; kalite düşük ama tarihsel |

### Repo kökü (docs/ dışı)

| Belge | Öneri | Gerekçe |
|-------|-------|---------|
| `PROJECT_STATUS.md` | DEPRECATED → arşivle veya üstüne ⚠️ NOT | 09-DURUM canonical oldu; 9 Ağu'dan beri eski. Silme yerine `arsiv/`'e taşı + 09-DURUM'a yönlendir |
| `CLAUDE.md` | KALSIN | Canonical çalışma kuralları |

## 5.4-INDEX — 00-INDEX'te eksik belgeler (Kural 5 boşluğu)

Kural 5: yeni belge eklenince INDEX güncellenir. Pratikte **raporlar/ ve arsiv/ büyük ölçüde INDEX'te
yok** (kararlar/ 01-11 listeli, ama raporlar tablosu eksik). Öneri: 00-INDEX'e raporlar (18) +
raporlar/icerik (6) + arsiv (3) tam tablosu eklenmeli; ayrıca yeni
`degerlendirme-metrik-sistemi-tasarim-2026-08-19` kararlar listesine.

## 5.5 Yapısal öneriler

### "Yapılan / yapılacak kararlar" ayrımı — değerlendirme

Ürün sahibinin fikri: kararları "yapılan" ve "yapılacak" diye ayırmak. **Değerlendirme: bu ayrım
zaten mevcut yapıda var** — yeni klasör gerekmiyor:

| İhtiyaç | Şu an nerede karşılanıyor |
|---------|---------------------------|
| Yapılan kararlar (statü) | `00-DURUM-PANOSU` (renkli statü) + `00-karar-statu-haritasi` (ham kanıt) + 09-DURUM |
| Yapılacak işler (kuyruk) | `10-yol-haritasi.md` (v1/v2 öncelikli) + `08-acik-sorular` |
| Kararların gerekçesi | `01-11` numaralı kararlar/ belgeleri |
| Tarihsel keşif | `raporlar/` (dondurulmuş) |

Yani "yapılan/yapılacak" ayrımı halihazırda **statü-etiketi (Kural 3) + tür=klasör (Kural 2)** ile
sağlanıyor. **Öneri: yeni klasör açma;** bunun yerine §5.4'teki etiket + INDEX hijyenini tamamla —
ayrım zaten okunur hâle gelir.

*Alternatif (PO isterse):* `kararlar/` altında `01-11` kararlarını "durum" satırıyla zenginleştirmek
(her kararın başına ✅ YAPILDI / ⏳ BEKLİYOR / ❓ AÇIK rozeti). Bu, ayrı klasörden daha az taşıma
riski taşır ve pano ile tutarlı olur. **Bu bir seçenek, öneri değil — PO kararı.**

### "Yeni gelen biri" okuma yolu (net sıra — şu an kayıp)

Bugün yeni katılan biri 59 belgeyle karşılaşıp nereden başlayacağını bilemez. Önerilen **5 adımlı
giriş yolu** (00-INDEX'in başına "▶ Buradan başla" olarak konabilir):

1. **`CLAUDE.md`** (repo kökü) — çalışma kuralları, mod/onay, güvenlik, DB uyarıları. *Nasıl çalışıyoruz?*
2. **`docs/kararlar/00-INDEX.md`** — belge haritası. *Ne nerede?*
3. **`docs/kararlar/09-DURUM.md`** — şu an neredeyiz, ne bitti/bekliyor. *Bugün ne durumdayız?*
4. **`docs/kararlar/10-yol-haritasi.md`** — sıradaki işler. *Ne yapılacak?*
5. **`docs/kararlar/00-DURUM-PANOSU.md`** — karar statüsü tek bakışta. *Kararlar nerede?*

Derin gerekçe gerekince: `01-11` kararlar/ + ilgili `raporlar/` fotoğrafı.

### İdeal hedef durum (özet)

| Ölçüt | Bugün | Hedef |
|-------|:---:|-------|
| Klasör yapısı | kararlar/raporlar/devir/arsiv | **Aynı** (yeterli, değiştirme) |
| 🔄/📸 üst-etiket | ~%50 eksik | %100 |
| INDEX kapsamı | ~%35 | %100 |
| Bayat ⚠️ işareti | 0 (10 belge işaretsiz) | 10 belge işaretli |
| Giriş yolu | kayıp | 5 adımlı, INDEX'te net |
| Belge sayısı | 59 | ~55 (7 koşullu arşiv, taşıma; silme yok) |

**Ana mesaj:** Sorun mimari değil, **hijyen**. Birleştirme/yeniden-yapılandırma gerekmez; etiket +
INDEX + bayat-işaret + koşullu arşiv ile düzen tamamlanır.

---

# EKSEN 6 — Merge / Submodule / Docs-Çakışması Kalıcı Çözüm Önerisi

## 6.0 Mevcut CLAUDE.md kuralı ve config (kanıt)

- **Submodule Senkronizasyonu** (mevcut): "Backend değişince aynı tur içinde pointer güncellenir ve çatı
  push edilir. Sıra: backend commit → backend push → çatı `git add backend` → çatı commit → çatı push."
- **Koşullu Paralellik:** "migration, merge, submodule pointer güncelleme, paylaşılan servis/config
  dosyaları HER ZAMAN sıralıdır."
- **Belge Senkronizasyonu — ZORUNLU BİTİŞ ADIMI:** her BYPASS tur 09-DURUM/10-yol-haritasi kontrolü
  yapmadan tamamlanmış sayılmaz.
- **Belge Düzeltme Deseni:** eskiyi silme, `⚠️ GÜNCELLEME (tarih)` notu ekle.
- **Config gerçeği:** `.gitmodules` → `branch = main` tanımlı. `.gitattributes` **YOK**
  (`merge=union` tanımı yok). `scripts/` → yalnız `verify.sh` (submodule bump scripti yok).

## 6.1 SORUN A — Submodule pointer bump dansı

### Kök neden

1. Backend feature PR merge edilince → backend `main` HEAD ilerler (merge commit).
2. Çatı feature PR'ı, açıldığı andaki pointer'ı taşır — bu genelde **feature commit** (merge öncesi
   SHA), backend main HEAD (merge commit) DEĞİL.
3. Çatı PR'ının pointer'ı main HEAD'e **bump** edilmeli; her bump yeni bir çatı commit → CI yeniden
   beklenir.
4. **Paralel çatı PR'larında:** ilk grup merge olduğunda pointer taşınır; ikinci grubun pointer'ı
   "CONFLICTING" görünür ama aslında descendant olduğu için git auto-resolve eder (kafa karıştırıcı,
   **zararsız**).

### Mevcut kuralın boşluğu

Kural **sırayı** doğru veriyor (backend→çatı) ama şu edge-case'i **açıkça yazmıyor:**

> "Backend PR **merge edildikten sonra**, çatı pointer'ı feature commit'e değil **backend `main` HEAD'e
> (merge commit)** bump edilmeli; ve paralel çatı PR'larında bu bump **tek noktada, sıralı** yapılmalı."

Bu yazılı olmadığı için ajan her turda dansı yeniden keşfediyor. `.gitmodules`'ta `branch = main`
tanımlı olması, `git submodule update --remote backend` komutunun otomatik main HEAD'i çekmesini
mümkün kılıyor — ama bu bilgi kuralda yok.

### Öneri (gerekçeli)

- **(a) Yazılı reçete — ZORUNLU.** CLAUDE.md submodule kuralına net "merge sonrası bump" adımı eklenir
  (taslak §6.3). Düşük risk, sıfır maliyet, dansı kökten önler.
- **(b) Yardımcı script — OPSİYONEL.** `scripts/bump-submodule.sh`: `git submodule update --remote
  backend && git add backend && git commit`. Tekrarı azaltır ama zorunlu değil.
- **Önerilen:** **(a) zorunlu + (b) opsiyonel.** Asıl kazanç yazılı reçetede; script kolaylık.

## 6.2 SORUN B — Docs çakışması (09-DURUM / 10-yol-haritasi)

### Kök neden

Her iş bitişinde 09-DURUM/10-yol-haritasi'nin **ortak başlık bölgesine** ("Son güncelleme" satırı +
"⚡ TEK BAKIŞTA" / "Açık PR" bloğu) yazılıyor. Birden fazla iş aynı anda açıkken hepsi aynı satır
bölgesine dokununca → merge çakışması (#92/#94 böyle çakıştı, manuel çözüldü). Belgeler append-only
amaçlıyor ama **ortak-edit başlık bölgesi** çakışmaya açık. `.gitattributes` olmadığı için otomatik
union yok — her çakışma manuel çözülüyor (doğru yapılırsa sorun yok, ama insan-hatası riski).

### Öneri

- **TEK NET ÖNERİ — (a) Docs güncellemesini serileştir.** İş PR'ları kodu taşır, ama 09-DURUM/
  10-yol-haritasi güncellemesi **en sona, tek docs turunda** toplanır (veya sıralı yapılır — aynı anda
  iki iş bu iki dosyaya yazmaz). Merge/submodule zaten sıralı; docs da paylaşılan durum dosyası olduğu
  için sıralı olmalı. **Çakışma hiç doğmaz.** Mevcut "Koşullu Paralellik" kuralıyla birebir tutarlı
  (paylaşılan config/durum = sıralı). Ek araç gerektirmez.

- **Alternatif (b) `.gitattributes` + `merge=union`.** `docs/kararlar/09-DURUM.md merge=union` ve
  `10-yol-haritasi.md merge=union`. Otomatik satır-concat; manuel çözüm biter. **RİSK:** union anlam
  kontrolü yapmaz — iki dal farklı "Açık PR: X" yazarsa **ikisi de kalır** (çelişkili/yanıltıcı satır).
  Sadece saf append bölgeleri için güvenli; ortak başlık için riskli. **Tek başına önerilmez;** (a) ile
  birlikte "güvenlik ağı" olarak düşünülebilir.

- **Alternatif (c) Katı append-only disiplin.** Her iş kendi tarihli bölümüne yazar; ortak başlık
  bölgesine ("Son güncelleme"/"TEK BAKIŞTA") dokunmaz. Çakışmayı azaltır ama sıfırlamaz (aynı satıra iki
  ekleme yine çakışır) ve disiplin bağımlı.

**Önerilen:** **(a) serileştirme birincil kural** (kökü keser); (b) union yalnızca saf-append alt-bölge
için opsiyonel güvenlik ağı. (c) tek başına yetersiz.

## 6.3 CLAUDE.md'ye eklenmeye HAZIR kural taslağı

> Aşağıdaki metin **öneri taslağıdır** — bu turda CLAUDE.md'ye YAZILMADI. PO onaylayınca ayrı turda
> ilgili bölümlere eklenir.

### Taslak A — "Submodule Senkronizasyonu" bölümüne ek

```
## Submodule — merge sonrası pointer bump (dans önleme)
- Backend PR MERGE EDİLDİKTEN sonra çatı pointer'ı feature commit'e DEĞİL, backend `main` HEAD'e
  (merge commit) bump edilir. Komut: `git submodule update --remote backend` (`.gitmodules` branch=main).
- Sıra: (1) backend PR'ları merge et → (2) TEK çatı turunda `git submodule update --remote backend`
  + `git add backend` + commit → (3) çatı PR'ı bump → (4) tek CI bekle → (5) merge.
- Paralel çatı PR'ı varsa: pointer bump'ı TEK noktada, en son açık PR'da yap (her PR'da ayrı bump
  yapma — CI'ı gereksiz tekrar bekletir).
- "CONFLICTING" ama descendant görünen pointer: git auto-resolve eder, zararsız — panik yok, doğrula
  (`git merge-base --is-ancestor <eski> <yeni>`).
```

### Taslak B — "Belge Senkronizasyonu" bölümüne ek

```
## Docs güncellemesi — çakışma önleme (serileştir)
- 09-DURUM.md ve 10-yol-haritasi.md PAYLAŞILAN DURUM dosyalarıdır → "Koşullu Paralellik" gereği bu iki
  dosyaya yazım SIRALIDIR. Aynı anda iki iş bu dosyalara YAZMAZ.
- İş PR'ları kodu taşır; 09/10 güncellemesi en sona TEK docs turunda toplanır (veya sıralı yapılır).
- Ortak başlık bölgesine ("Son güncelleme", "⚡ TEK BAKIŞTA", "Açık PR") dokunurken: mevcut satırı
  değiştirmek yerine mümkünse tarihli alt-bölüme append et (Belge Düzeltme Deseni).
- (Opsiyonel güvenlik ağı) `.gitattributes`'a `docs/kararlar/09-DURUM.md merge=union` eklenebilir —
  ANCAK union çelişkili satırları da birleştirir; yalnız saf-append bölgeler için güvenli.
```

---

# ÖZET — En önemli öneriler (PO kararı)

**Eksen 5 (hijyen, mimari değil):**
1. 🔄/📸 üst-etiket ekle: ~11 kararlar/ + 18 raporlar/ + 6 icerik/ belge (Kural 3).
2. 00-INDEX'i tamamla: raporlar/arsiv tam tablosu + yeni degerlendirme-metrik belgesi (Kural 5).
3. Bayat ⚠️ NOT ekle: ~10 belge — kritik 04-guvenlik (IDOR çözüldü), platform-admin-strateji,
   stk-yonetici-strateji, 02-mimari (Kural 6).
4. Koşullu arşiv adayları (PO onayı): kapasite-analizi, katilim-modeli, platform-admin panel/strateji,
   kart-havuz, mentor-karti-rakip, tema-durum, devir/07 — "şu iş bitince" koşuluyla.
5. Yeni klasör GEREKMEZ; "yapılan/yapılacak" ayrımı mevcut yapı + etiketle sağlanıyor.
6. Yeni-gelen okuma yolu: CLAUDE.md → 00-INDEX → 09-DURUM → 10-yol-haritasi → 00-DURUM-PANOSU.
7. Deprecated: `PROJECT_STATUS.md` → arşivle + 09-DURUM'a yönlendir. `dokploy-*` yanlış klasörde → taşı.

**Eksen 6 (kalıcı çözüm):**
- SORUN A (pointer dansı): CLAUDE.md'ye "merge sonrası → `git submodule update --remote backend` →
  tek bump → tek CI" reçetesi (Taslak A). Opsiyonel `scripts/bump-submodule.sh`.
- SORUN B (docs çakışması): 09/10 = paylaşılan durum → **sıralı/serileştir** (Taslak B). Union yalnız
  opsiyonel güvenlik ağı.

**Bu turda uygulanan:** hiçbir mevcut belge/kod/CLAUDE.md değişmedi. Tek çıktı: bu öneri raporu.
**Sıradaki:** PO bu önerilerden hangilerini, hangi sırada uygulamak istediğine karar verir (etiket
hijyeni, INDEX tamamlama, bayat-işaret, CLAUDE.md kural ekleme, koşullu arşiv — her biri ayrı tur).
