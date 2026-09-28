> 📸 DONDURULMUŞ (2026-09-28) — AJ-120 belge adı/klasör envanterinin fotoğrafı; güncellenmez. Güncel iş durumu: `docs/otonom/00-KUYRUK.md` (AJ-120).
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-28 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş); sonraki ad dilimi yeni tarihli envanter açar
> İŞLENME: ✅ işlendi (2026-09-28, tur: AJ-120) — taşınan 1 dosya bu PR'da; kalan kalemler § 6 KALEM LİSTESİ'nde, sahibi AJ-120 (kuyrukta)
> Kaynak: AJ-120 (`docs/otonom/00-KUYRUK.md`) · F-01 kalanı (çatı #467 PR açıklaması) · G9-12 (`docs/raporlar/bilanco/kararlar/G9-belge-surec.md` [G9-12]) · ölçüt: `docs/kararlar/konu/belge-duzeni-rehberi.md` KURAL 2 · 2-B · 3 · 4

# Belge adı / klasör envanteri (2026-09-28)

**NEDEN:** dağınık adlar belge bulmayı zorlaştırıyor, kırık atıf yanlış belgeye götürüyor (AJ-120). G9-12 "~68 belge"
diyordu (2026-08-26 bilançosu; birim: isim + klasör + arşiv + sadeleştirme adayı). Bu envanter yeniden **saydı**.

## 0. Sayılan birim ve kapsam (KURAL 16 / 25)

- **Birim:** dosya. Bir dosya birden çok kurala uymasa da **bir kez** sayılır (ilk uyduğu grupta).
- **Taranan:** `docs/**/*.md` = 391 dosya (2026-09-28, `origin/main` `fbc5551`).
- **Kapsam dışı (kural gereği adı değişmez):** `docs/arsiv/**` · `docs/otonom/arsiv/**` (arşiv, KURAL 6) ·
  `docs/otonom/kararlar/KARAR-NNN.md` (kendi adlandırma düzeni, OTONOM-PROMPT 5c-c) · her klasörün `00-INDEX.md`'si ·
  mevcut "↪️ TAŞINDI" yönlendirme dosyaları (5 adet, AN-44 / AJ-71).
- **Uyulan kurallar:** KURAL 2 (tür = klasör; `kararlar/` kökünde yalnız 5 taşıyıcı) · KURAL 2-B (indeks adı `00-INDEX.md`) ·
  KURAL 3 (🔄/📸 etiketi ↔ klasör) · KURAL 4 (📸 tarihli, 🔄 tarihsiz).
- **Taşıma koşulları (hepsi birden):** (a) rehber yeni yolu açıkça belirliyor · (b) `CLAUDE.md` · `OTONOM-PROMPT.txt` ·
  `scripts/*` · `.github/*` içinde atıf YOK · (c) 📸 dondurulmuş DEĞİL · (d) arşiv DEĞİL · (e) atıflar aynı PR'da güncellenebiliyor
  (yaşayan atıf düzeltilir; dondurulmuş/arşiv atıfı eski yolda "↪️ TAŞINDI" yönlendirmesiyle çözülür — AN-44/AJ-71 deseni).
- **Atıf sayısı** = dosya adı (uzantısız) geçen satırlar, `git grep -F`, `backend/` + `frontend/` hariç, dosyanın kendisi hariç; biçim `dosya/satır`.

**Sonuç:** kurala uymayan **78 dosya** · bu PR'da taşınan **1** · kalan **77** (koşulları sağlayan kalan: **0**).
Taşıyıcı 5 belge (`00-INDEX` · `09-DURUM` · `00-KARAR-TAKIP` · `10-yol-haritasi` · `10-yol-tamamlananlar`) **kökte** —
KURAL 2 (2026-08-23 güncellemesi) "kökte kalır, taşınmaz" ile uyumlu, dokunulmadı.

## 1. Taşınan (bu PR)

| Eski yol | Yeni yol | Kural | Atıf (dosya/satır) | Risk | Düzeltilen yaşayan atıf |
|---|---|---|---|---|---|
| `docs/raporlar/icerik/00-INDEKS.md` | `docs/raporlar/icerik/00-INDEX.md` | KURAL 2-B — rehber hedefi açıkça yazıyor ("o klasör bir sonraki düzenlemede `00-INDEX.md`'ye taşınırsa atıflar aynı turda güncellenir", rehber KURAL 2-B) | 20/59 (çoğu dondurulmuş/arşiv/günlük) | yok (CLAUDE.md · OTONOM-PROMPT · scripts · .github: 0) | `docs/00-BELGE-HARITASI.md:31,160` · `docs/raporlar/icerik/bolumler/00-INDEX.md:6` · `docs/kararlar/konu/belge-duzeni-rehberi.md` KURAL 2-B notu (`~~[ESKİ]~~` + ⚠️ GÜNCELLEME) |

Eski yolda "↪️ TAŞINDI" yönlendirmesi kaldı (dondurulmuş raporlardaki `00-INDEKS.md:NN` satır atıfları yeni dosyada aynı satırı gösterir).
Değişen satırların eski metni: `docs/arsiv/belge-senkron-2026-09-28.md` § AJ-120. Yan kazanç: 📸 `icerik-mutabakati-2026-09-23.md:406`'daki
`docs/raporlar/icerik/00-INDEX.md` atfı artık var olan dosyayı gösteriyor (kırık atıf −1).

## 2. Taşınmayan — kurala uymuyor ama koşul tutmuyor

### 2.1 KURAL 2 — `kararlar/` kökünde 5 taşıyıcı dışında dosya (4)

| Dosya | Tür | Neden taşınmadı | Atıf | Risk |
|---|---|---|---|---|
| `docs/kararlar/00-CIKIS-PLANI.md` | 📸 (2026-09-21) | (c) dondurulmuş · (b) CLAUDE.md atfı · rehber KURAL 7 tablosu bu yolu taşıyıcı sayıyor | 28/61 | CLAUDE.md |
| `docs/kararlar/00-KART-INDEKSI.md` | 🌡️ | (b) CLAUDE.md + OTONOM-PROMPT + `scripts/` atfı · rehber KURAL 22 bu yolu açıkça anıyor → hedef yok (a) | 95/179 | CLAUDE.md · OTONOM-PROMPT · scripts/ |
| `docs/kararlar/dokploy-foto-volume-talimati.md` | 📸 | (c) dondurulmuş (ayrıca KURAL 4: 📸 ama tarihsiz) | 21/28 | — |
| `docs/kararlar/sertifika-soru-standardi-gerekce-2026-09-21.md` | 📸 | (c) dondurulmuş; hedef klasör (`konu/` mu `raporlar/` mı) rehberde yok (a) | 8/12 | — |

### 2.2 KURAL 2 × KURAL 3 — `raporlar/` (dondurulmuş klasör) içinde 🔄 YAŞAYAN belge (4)

| Dosya | Neden taşınmadı | Atıf | Risk |
|---|---|---|---|
| `docs/raporlar/icerik/kod-kalemleri-2026-09-03.md` | KURAL 4 de ihlal (🔄 + tarihli). Ama "yaşayan mı ölü mü" **YN-06 / KARAR-051**'de cevap bekliyor — 📸'ye çekilirse tarihli ad doğru olur; ad değiştirmek kararı önceden vermek olur (a) | 19/51 | — |
| `docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md` | KURAL 4 de ihlal (🔄 + tarihli). Etiket ↔ klasör çelişiyor (`kesif/` = keşif fotoğrafı); doğru düzeltme ad mı etiket mi belirsiz (a) | 9/35 | — |
| `docs/raporlar/icerik/birlikte-calisma-kombinasyonlari.md` | 🔄 içerik taslağı `raporlar/` altında; rehber yaşayan içerik taslağına klasör tanımlamıyor (a) | 8/12 | — |
| `docs/raporlar/icerik/menti-simdilik-varyantlari.md` | aynı gerekçe (a) | 8/13 | — |

(G-kartları `bilanco/kararlar/G1·G9·G10` gövdede 🔄 diyor ama TÜR başlığı 🧊 dondurulmuş → 2.5'te sayıldı.)

### 2.3 KURAL 2 — `kararlar/konu/` (yaşayan karar klasörü) içinde 📸 belge (2)

| Dosya | Neden taşınmadı | Atıf | Risk |
|---|---|---|---|
| `docs/kararlar/konu/consent-modeli-plani-2026-08-28.md` | (c) dondurulmuş (G1-07/G1-08 uygulama kaynağı) | 17/34 | — |
| `docs/kararlar/konu/chat-v1-teslim.md` | (c) dondurulmuş (ayrıca KURAL 4: 📸 ama tarihsiz) | 18/27 | — |

### 2.4 KURAL 2 — `docs/devir/` klasörü rehberin tür listesinde yok (10)

`01-felsefe-ve-calisma-tarzi` (🔄 kısmen) · `02-proje-durumu` · `03-kvkk-is-paketi` · `04-13-admin-bulgusu` · `05-bekleyen-kararlar-ve-manuel` ·
`06-devir-kilavuzu` (🔄) · `07-oturum-gunlugu` (📸 günlük, 2026-09-24 DC turu) · `08-oturum-tezi-2026-08-28` · `gunluk/oturum-2026-08` · `gunluk/oturum-2026-09`.
Neden taşınmadı: (a) rehber `devir/`'e hedef göstermiyor; 8'i 📸 (c). Atıf aralığı 10/13 – 33/75 dosya/satır. Risk: CLAUDE.md'de `devir/` yolları ayrı ayrı anılmıyor.

### 2.5 KURAL 4 — 📸 dondurulmuş ama adı tarihsiz (56)

Hepsi (c) nedeniyle adı değişmez (dondurulmuş belge adı değişmez; KURAL 3/6).

| Grup | Dosya sayısı | Not |
|---|---:|---|
| `docs/kararlar/10-yol-haritasi.md` | 1 | taşıyıcı — kökte kalır (KURAL 2) · CLAUDE.md + `scripts/belge-bekci.sh` atfı (64/178) |
| `docs/raporlar/bilanco/bolumler/T*.md` | 16 | tarih üst klasörde değil; bilanço 2026-08-26 bölümleri |
| `docs/raporlar/bilanco/kararlar/G*.md` | 12 | G-kartları — rehber KURAL 15 `G*.md` desenini anıyor |
| `docs/raporlar/icerik/bolumler/0*.md` | 5 | içerik dökümü bölümleri (2026-08-26) |
| `docs/raporlar/kod-denetimi/bitti-dogrulama-partiler/*.md` | 22 | `bitti-dogrulama-2026-09-27.md`'nin partileri; klasör adı tarihsiz |

### 2.6 KURAL 2-B — klasörde ikinci giriş sinyali (1)

| Dosya | Neden taşınmadı | Risk |
|---|---|---|
| `docs/kararlar/konu/kvkk-metinleri/README.md` | klasörde `00-INDEX.md` de var; README "iç süreç / avukat paketi" notu — birleştirme içerik kararı, rehber hedef vermiyor (a) | atıf sayımı güvenilmez (`README` genel sözcük) |

## 3. Kırık atıflar — önce / sonra

Betik (commit edilmedi): `docs/**/*.md` içindeki `docs/…md` yollarını çıkarıp dosya var mı bakar; ek olarak göreli `](…md)` bağları.

| Ölçü | Önce (`fbc5551`) | Sonra (bu PR) |
|---|---:|---:|
| `docs/…md` yol atfı (satır içi geçiş) | 3.663 | 3.717 (bu envanterin kendi atıfları dahil) |
| — var olmayan hedef (tekil yol) | **15** | **14** |
| göreli markdown bağı | 301 | 301 |
| — kırık | **20** | **20** |

(F-01 #467 "24 → 23" diyordu; birim farklı: o sayım göreli bağları ve kalıp yolları birlikte saydı. Bu tablo aynı betikle önce/sonra.)

### 3.1 Kalan 14 hedefsiz `docs/…md` yolu — sınıflama

| Hedef | Nerede | Sınıf | Karar |
|---|---|---|---|
| `docs/arsiv/silinenler-2026-09-10.md` | `00-KUYRUK.md` E-4 satırı · arşiv | oluşturulacak dosya (E-4 işi "oluştur" diyor) | kırık değil — dokunulmadı |
| `docs/arsiv/silinenler-2026-09-27.md` | `00-KUYRUK.md` AN-12 · `KARAR-107.md:4` · arşiv | açık PR'da bekliyor (çatı #370, dal `otonom/AN-12-…`) | kırık değil |
| `docs/raporlar/kod-denetimi/aj77-durum-alanlari-envanter-2026-09-28.md` | `00-KUYRUK.md` AJ-105 · `KARAR-128.md:2` · arşiv | açık PR'da bekliyor (dal `otonom/AJ-77-…`) | kırık değil |
| `docs/otonom/00-SIRADAKI.md` · `docs/otonom/01-CEVAPSIZ.md` | 📸 `devir/00-INDEX` · `02` · `05` · `06` · rehber KURAL 18/19 | türetme betiği birleşmedi (rehberde "TEYİT GEREK" notu var) | kırık değil |
| `docs/otonom/kararlar/KARAR-NNN.md` | çok yerde | kalıp (şablon adı) | kırık değil |
| `docs/raporlar/icerik/sertifika-oturum1/2/3-...-2026-09-08.md` | 📸 `sertifika-soru-standardi-gerekce` · KARAR-003 · arşiv | kalıp (üç dosyanın kısaltması) | kırık değil |
| `docs/raporlar/kesif/hayalet-envanter-2026-09-10.md` | `00-KUYRUK.md` AJ-120 satırı · `arsiv/00-KUYRUK-bitti-2026-09.md:44` | **kaynağıyla çözüldü**: arşiv satırı işin *planlanan çıktı adı*; dosya git geçmişinde hiç yok (`git log --all -- '**/hayalet-envanter-2026-09-10.md'` → 0 commit); gerçek çıktı `docs/raporlar/kesif/hayalet-envanter-2026-09-19.md` | arşiv AYNEN — dokunulmadı |
| `docs/otonom/KARAR-KARTI-SABLONU.md` | 📸 `konsey-yonetisim-2026-09-21.md:121,509` · AJ-120 satırı | **kaynağıyla çözüldü**: 📸 konsey raporunun *önerdiği* dosya; git geçmişinde hiç yok (`git log --all` → 0 commit); şablonun fiilî yeri `CLAUDE.md` § "Karar kartı biçimi" | 📸 — dokunulmadı |
| `docs/raporlar/kesif/admin-panelleri-tasarim-2026-08-02.md` | 📸 `G9-belge-surec.md:261,269` · 📸 `strateji-gercek-denetimi:237` | hedef kesin: `docs/arsiv/admin-panelleri-tasarim-2026-08-02.md` (G9-13, 2026-08-28 git mv) | 📸 içinde → dokunulmadı |
| `docs/admin-panelleri-tasarim-2026-08-02.md` · `docs/teshis-raporu-2026-08-02.md` | yalnız `docs/arsiv/**` | arşiv içi kısaltılmış yol | dokunulmadı (arşiv) |
| `docs/gelen/senaryo-bankasi-2026-09-03.md` | 📸 `devir/gunluk/oturum-2026-09.md` (4 satır) | `docs/gelen/` gitignore'da (KURAL 24); dosya bugün `docs/raporlar/icerik/senaryo-bankasi-2026-09-03.md` | 📸 içinde → dokunulmadı |
| `docs/.../T4-A2-arsiv-strateji.md` | `docs/otonom/arsiv/01-KARARLAR-kart-gecmisi.md:290` | arşivde kısaltılmış yol (hedef `docs/raporlar/bilanco/bolumler/T4-A2-arsiv-strateji.md`) | dokunulmadı (arşiv) |

**Yaşayan belgede hedefi kesin bulunup düzeltilmeyen kırık atıf: 0.** Kalan 20 göreli kırık bağın hepsi
`docs/otonom/arsiv/01-KARARLAR-kart-gecmisi.md` içinde (`kararlar/KARAR-NNN.md` → hedefler `docs/otonom/kararlar/`'da var; arşiv AYNEN).

## 4. Bekçi

- Önce: `bash scripts/belge-bekci.sh` → çıkış 0, `✓ HATA yok (26 uyarı)` · `bash scripts/belge-bekci.test.sh` → çıkış 0.
- Sonra: aynı (bkz. PR açıklaması).

## 5. Sonraki dilim

Koşulların hepsini sağlayan kalan dosya **0**. Kalan 77'nin taşınabilmesi için önce rehber (teknik, ajanın verebileceği karar)
hedef tanımlamalı:
1. `raporlar/` içindeki 🔄 içerik taslakları (2.2'nin 3'ü) için klasör → rehber KURAL 2'ye satır.
2. `kod-kalemleri-2026-09-03.md` → KARAR-051 (YN-06) cevabı gelince: 📸 ise ad doğru, 🔄 ise `kod-kalemleri.md`.
3. `devir/` klasörünün tür tanımı → rehber KURAL 2'ye satır (belge taşımadan).
4. `kararlar/` kökündeki 4 dosya → taşıyıcı listesi (KURAL 2) ↔ KURAL 7 tablosu (`00-CIKIS-PLANI`) ↔ KURAL 22 (`00-KART-INDEKSI`) uyumlandırılmalı.
5. 📸 + tarihsiz 56 dosya: kural gereği adı değişmez — işlem gerekmez (bilinçli).

## 6. KALEM LİSTESİ (KURAL 9 / 23)

| # | Kalem | Önerilen durum | Numara adayı mı |
|---|---|---|---|
| 1 | `raporlar/icerik/00-INDEKS.md` → `00-INDEX.md` | ✅ YAPILDI (bu PR) | hayır (AJ-120) |
| 2 | Rehber KURAL 2: `raporlar/` altındaki 🔄 içerik taslaklarının ve `devir/` klasörünün yeri tanımlansın | ⬜ AÇIK | hayır — AJ-120 kalanı |
| 3 | Rehber KURAL 2 ↔ 7 ↔ 22: `kararlar/` kök listesi uyumlandırılsın (`00-CIKIS-PLANI` · `00-KART-INDEKSI`) | ⬜ AÇIK | hayır — AJ-120 kalanı |
| 4 | `kod-kalemleri-2026-09-03.md` adı | ❓ TEYİT GEREK (KARAR-051) | hayır — YN-06'ya bağlı |
| 5 | `hayalet-envanter-2026-09-10.md` · `KARAR-KARTI-SABLONU.md` atıfları | ✅ kaynağıyla çözüldü (hiç açılmamış dosyalar; § 3.1) — atıflar arşiv/📸 içinde, düzenlenmedi | hayır |
