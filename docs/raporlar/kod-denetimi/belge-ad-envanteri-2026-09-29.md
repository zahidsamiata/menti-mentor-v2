> 📸 DONDURULMUŞ (2026-09-29) — AJ-120 belge adı/klasör envanterinin **dilim 2** fotoğrafı; güncellenmez. Önceki dilim: `docs/raporlar/kod-denetimi/belge-ad-envanteri-2026-09-28.md` (📸, dokunulmadı). Güncel iş durumu: `docs/otonom/00-KUYRUK.md` (AJ-120).
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-29 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş); sonraki ad dilimi yeni tarihli envanter açar
> İŞLENME: ✅ işlendi (2026-09-29, tur: AJ-120 dilim 2) — rehber KURAL 2-C bu PR'da; taşınan 2 dosya bu PR'da; kalanlar § 6 KALEM LİSTESİ'nde, sahibi AJ-120 (kuyrukta) ve KARAR-51
> Kaynak: AJ-120 (`docs/otonom/00-KUYRUK.md`) · önceki envanter §5 "Sonraki dilim" · ölçüt: `docs/kararlar/konu/belge-duzeni-rehberi.md` KURAL 2 · 2-B · 2-C · 3 · 4

# Belge adı / klasör envanteri — Dilim 2 (2026-09-29)

**NEDEN:** 2026-09-28 dilimi 77 dosyayı taşıyamadı, çünkü rehber dört yer için hedef yol vermiyordu (önceki envanter §5).
Bu dilim önce o dört hedefi rehbere **teknik karar** olarak yazdı (KURAL 2-C), sonra hedefi kesinleşen dosyaları taşıdı.

## 0. Birim ve kapsam (KURAL 16 / 25)

- **Birim:** dosya — önceki envanterle aynı (bir dosya bir kez sayılır). Başlangıç kümesi = önceki envanterin **kalan 77** dosyası.
- **Taranan:** `docs/**/*.md` = 401 dosya (2026-09-29, `origin/main` `e378afb`); bu PR sonrası 406 (+2 yönlendirme · +1 `icerik-taslak/00-INDEX.md` · +1 `docs/arsiv/belge-senkron-2026-09-29.md` · +1 bu envanter).
- **Taşıma koşulları** (önceki dilimle aynı, hepsi birden): (a) rehber hedef yolu açıkça veriyor · (b) `CLAUDE.md` · `OTONOM-PROMPT.txt` · `scripts/*` · `.github/*` atfı YOK ·
  (c) 📸 DEĞİL · (d) arşiv DEĞİL · (e) tüm yaşayan atıflar aynı PR'da güncelleniyor; dondurulmuş/arşiv atıfları eski yoldaki "↪️ TAŞINDI" yönlendirmesiyle çözülür.
- **Atıf sayısı** = dosya adı (uzantısız) geçen dosya/satır, `git grep -F`, `backend/` + `frontend/` ve dosyanın kendisi hariç (önceki envanterle aynı yöntem).

**Sonuç:** 77 → **taşınan 2** · **tanımla kurala uygun hâle gelen 15** · **kalan 60** (56'sı bilinçli: 📸 + tarihsiz ad değişmez).

## 1. Rehbere eklenen dört hedef tanımı (KURAL 2-C)

| # | Hedef | Karar (özet) | Gerekçe |
|---|---|---|---|
| (a1) | `raporlar/` altındaki 🔄 içerik taslağı | → `docs/kararlar/icerik-taslak/<konu>.md`, tarihsiz ad, klasör girişi `00-INDEX.md`; onaylanınca 📸'ye çekilir, yerinde kalır | `raporlar/` = dondurulmuş (KURAL 2); yaşayan taslak orada "güncel mi?" sorusunu cevapsız bırakıyor |
| (a2) | `raporlar/` altındaki kalem-işaretli tarihli keşif raporu (🔄 = "kural (h) işareti alır") | yerinde kalır, ad tarihli | taşımak kural (h) işaret akışını ve 📸 satır atıflarını bozar, kazanç yok |
| (b) | `docs/devir/` | tür = DEVİR KAYDI klasörü, 📸 tarihsel, yerinde dondurulmuş; taşınmaz/yeniden adlandırılmaz; yeni dosya açılmaz (tur kaydı → `02-ILERLEME`); yalnız `06` ve `01` güncellenir | içerik: 10 dosyanın 8'i dondurulmuş; tek yaşayan giriş `06` (2026-09-24 DC turu kararı `docs/devir/00-INDEX.md`) |
| (c) | `docs/kararlar/` kökü | kapalı liste 9: 5 taşıyıcı + `00-KART-INDEKSI` (köprü) + `00-CIKIS-PLANI` (📸 planlama) + 2 📸 tarihsel konum; yeni dosya kökte açılmaz | KURAL 2 (5 dosya) · KURAL 7 (`00-CIKIS-PLANI`) · KURAL 22 (`00-KART-INDEKSI`) üç ayrı liste veriyordu |
| (d) | `raporlar/icerik/kod-kalemleri-2026-09-03.md` | **KARAR-51 bekliyor** — dokunulmadı | `docs/otonom/kararlar/KARAR-051.md:22` CEVAP boş (2026-09-29); ad kararı "yaşayan mı / dondurulsun mu" cevabına bağlı |

Eski rehber satırları: KURAL 2 kök listesi `~~[ESKİ · 2026-09-29]~~` + ⚠️ GÜNCELLEME; KURAL 7 tablosunun altına ⚠️ GÜNCELLEME notu (`00-CIKIS-PLANI` ve `10-yol-haritasi` 📸); Özet tablosuna 2-C satırı.

## 2. Taşınan (bu PR)

| Eski yol | Yeni yol | Kural | Atıf (dosya/satır, önce) | Risk | Düzeltilen yaşayan atıf |
|---|---|---|---|---|---|
| `docs/raporlar/icerik/birlikte-calisma-kombinasyonlari.md` | `docs/kararlar/icerik-taslak/birlikte-calisma-kombinasyonlari.md` | KURAL 2-C (a1) | 9/13 | yok (CLAUDE.md · OTONOM-PROMPT · scripts · .github: 0) | `docs/otonom/00-KUYRUK.md:500` (AN-05) · `docs/raporlar/icerik/00-INDEX.md:24` |
| `docs/raporlar/icerik/menti-simdilik-varyantlari.md` | `docs/kararlar/icerik-taslak/menti-simdilik-varyantlari.md` | KURAL 2-C (a1) | 9/14 | yok (aynı tarama: 0) | `docs/otonom/00-KUYRUK.md:466` (IC-10) · `docs/raporlar/icerik/00-INDEX.md:25` |

- `git mv` (içerik aynı; yalnız 1. satırın sonuna yer notu eklendi → **satır numaraları değişmedi**, 📸 raporlardaki `:16-165` · `:13,21,29,37` · `belge:12` · `belge:55` atıfları yeni dosyada aynı satırı gösterir).
- Eski yolda "↪️ TAŞINDI" yönlendirmesi (ilk dilim deseni). Dokunulmayan atıflar: 📸 `bitti-yeniden-denetim-2026-09-26` · `bitti-dogrulama-2026-09-27` · `bitti-dogrulama-partiler/*` · önceki envanter · `docs/otonom/arsiv/**` → yönlendirme ile çözülür.
- `00-KUYRUK.md` satırlarının eski metni AYNEN: `docs/arsiv/belge-senkron-2026-09-29.md` (K-A). `raporlar/icerik/00-INDEX.md` hücreleri `~~[ESKİ]~~` + ⚠️ GÜNCELLEME ile çapraz atfa çevrildi (KURAL 2-B).
- Harita: yeni klasör `docs/kararlar/icerik-taslak/00-INDEX.md` · `docs/kararlar/00-INDEX.md` (ağaç + bölüm) · `docs/00-BELGE-HARITASI.md` (klasör bloğu) — KURAL 5.

## 3. Tanımla kurala uygun hâle gelen (taşıma yok) — 15

| Grup (önceki envanter §) | Dosya sayısı | Yeni durum |
|---|---:|---|
| 2.1 `kararlar/` kökünde 5 taşıyıcı dışı | 4 | KURAL 2-C (c) kapalı listede: `00-KART-INDEKSI` (köprü) · `00-CIKIS-PLANI` (📸 planlama) · `dokploy-foto-volume-talimati` · `sertifika-soru-standardi-gerekce-2026-09-21` (📸 tarihsel konum) |
| 2.2 `raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md` | 1 | KURAL 2-C (a2): kalem-işaretli tarihli keşif raporu, yerinde kalır (kural (h) işaretleri alıyor — son commit `32627ab`) |
| 2.4 `docs/devir/` | 10 | KURAL 2-C (b): tür klasörü tanımlandı; numaralı seri KURAL 4 istisnası |

## 4. Kalan — 60

| Grup | Sayı | Neden kaldı |
|---|---:|---|
| 2.5 📸 + tarihsiz ad | 56 | bilinçli — dondurulmuş belge adı değişmez (KURAL 3/6); işlem gerekmez |
| 2.3 `kararlar/konu/` içinde 📸 (`consent-modeli-plani-2026-08-28` · `chat-v1-teslim`) | 2 | (c) dondurulmuş; yol değişmez — 2-C (c)'deki "📸 tarihsel konum" ilkesiyle aynı; rehbere ayrı hedef yazılmadı (bu dilimin 4 hedefi dışında) |
| 2.6 `kararlar/konu/kvkk-metinleri/README.md` | 1 | klasörde `00-INDEX.md` de var; README avukat paketi notu — birleştirme içerik kararı (a) |
| 2.2 `raporlar/icerik/kod-kalemleri-2026-09-03.md` | 1 | **KARAR-51 bekliyor** (YN-06) — rehber 2-C (d) |

**Koşulların hepsini sağlayan kalan dosya: 0.**

## 5. Kırık atıflar — önce / sonra (aynı betik; commit edilmedi)

Betik: `docs/**/*.md` içindeki `docs/…md` yollarını çıkarır, dosya var mı bakar (tekil yol); ek olarak göreli `](…md)` bağları (dosyanın klasörüne ya da repo köküne göre).

| Ölçü | Önce (`e378afb`) | Sonra (bu PR) |
|---|---:|---:|
| `docs/…md` yol atfı (satır içi geçiş) | 3.726 | 3.768 (bu envanterin ve yeni indekslerin kendi atıfları dahil) |
| — var olmayan hedef (tekil yol) | **14** | **14** (aynı 14; § 3.1 önceki envanter sınıflaması geçerli) |
| göreli markdown bağı | 309 | 309 |
| — kırık | **20** | **20** (hepsi `docs/otonom/arsiv/01-KARARLAR-kart-gecmisi.md`, arşiv AYNEN) |

Taşınan iki dosyanın eski yolu yönlendirme olarak durduğu için yeni kırık atıf doğmadı; yeni yol yaşayan atıflarda kullanıldı.

## 6. KALEM LİSTESİ (KURAL 9 / 23)

| # | Kalem | Önerilen durum | Numara adayı mı |
|---|---|---|---|
| 1 | Rehbere 4 hedef tanımı (KURAL 2-C a/b/c/d) | ✅ YAPILDI (bu PR) | hayır (AJ-120) |
| 2 | `birlikte-calisma-kombinasyonlari.md` · `menti-simdilik-varyantlari.md` → `kararlar/icerik-taslak/` | ✅ YAPILDI (bu PR) | hayır (AJ-120) |
| 3 | `kod-kalemleri-2026-09-03.md` adı/yeri | ❓ TEYİT GEREK (KARAR-51 cevabı) | hayır — YN-06'ya bağlı |
| 4 | `kararlar/konu/` içindeki 2 📸 ve `kvkk-metinleri/README.md` | ⬜ AÇIK (düşük değer; 📸 yolu değişmez, README içerik kararı) | hayır — AJ-120 kalanı |
| 5 | `e3-baglanmamis-uclar-2026-09-25.md` üstündeki 🔄 etiketinin anlamı | ✅ tanımlandı (2-C a2) — etiket değiştirilmedi | hayır |
