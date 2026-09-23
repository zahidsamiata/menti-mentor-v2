> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-23 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)

📸 DONDURULMUŞ — 2026-09-23 fotoğrafı. Plan değildir; bulgular `00-KUYRUK.md`'ye işlendikten sonra güncellenmez.

# Kanonik Karar Belgeleri (`konu/`) + Bilanço Öksüz Denetimi

> Salt-okuma denetim turu. Hiçbir kod/belge/DB değiştirilmedi. Bu tur **iki belge kütlesini bütün olarak** ilk kez denetler: (A) `docs/kararlar/konu/` — kanonik karar zemini; (B) `docs/raporlar/bilanco/` — projenin en büyük belge kütlesi. Her ikisi de bugüne kadar bütün olarak "hâlâ geçerli mi, kodla örtüşüyor mu" diye denetlenmemişti (kanıt: `docs/raporlar/kesif/00-ANALIZ-TURU-OZETI-2026-09-23.md` §7.8 (b)+(c) — bu turu "bir sonraki tur adayı" işaretledi).

---

## 0. ⭐ ÖNCE OKU — en kritik 3 bulgu

**1. Tasarım belgeleri kodun GERİSİNDE — "yapılacak" denen iş çoktan yazılmış, belge bunu bilmiyor.** En keskin örnek: `konu/03-psikometri-ve-algoritma.md:41-42` sektör skorunu *"reçete onaylandı ama kod YAZILMADI — şu an stub, nötr 50 dönüyor"* diye anlatıyor. Kod gerçeği tersine: `backend/src/services/sector-scorer.service.ts:7` ağırlık formülünü (`W={A:0.30,B:0.25,C:0.25,D:0.15,E:0.05}`) ve `:67 resolveSectorScore`'u TAM uyguluyor — ama `matching.ts` bu servisi **sıfır kez import ediyor** (grep-teyitli), yani yazılmış-ama-bağlanmamış. Aynı desen KVKK metinlerinde de var: paket 4 "boşluğu" (rıza sürümleme, FE veri-hakları ekranı, FeedbackLog 3-yıl imha, hardDelete→anonymize) *"YOK / PR bekliyor"* diyor, dördü de kodda merge edilmiş (`consentService.ts:28`, `gdprService.ts:233,370`, `profile/page.tsx:443`). **Sonuç:** belgeler avukata/PO'ya olduğundan kötümser bir resim veriyor.

**2. Bilanço G-kartları "durum" taşıdığını sananları yanıltıyor — kartlar 7 hafta bayat.** Bilanço 2026-08-26/27 fotoğrafıdır; kartlardaki ⬜/❓ işaretleri O GÜNÜN durumu. Kod o günden çok ilerledi: en az **20+ kart kalemi** bugün canlıda ama kartta hâlâ açık görünüyor (örn. G1-22 k-anonimlik `mask.ts:52`'de CANLI, G10-22 `LoginForm.tsx` PR #206'da çözülmüş, G4'te ~13 kalem yapılmış). Canonical durum kaynağı artık kartlar değil, `docs/kararlar/00-KART-INDEKSI.md` → `docs/otonom/00-KUYRUK.md`. Kartların kendisi "TANIMı tutar, DURUMu tutmaz" — ama bunu söyleyen bir dondurma notu yok.

**3. Kuyruk devri %92 sağlam — ama üç değerli tasarım kararı devredilmemiş.** Bilanço G-kartlarının açık kalemlerinin ezici çoğunluğu (G2/G3/G4/G5-G8/G9 = **0 öksüz**) kuyruk/PO-ELLE'ye eksiksiz bağlı. Kaçan üç kalem, hepsi `konu/` tasarım belgelerinde tam yazılı ama **aktif kuyrukta karşılığı yok** (grep-teyitli): (a) **ghost/kalıcı red** özelliği (`11-tasarim-kararlari...:53-81`, kodda 0), (b) değerlendirme **AŞAMA 2/3** otomatik pasifleştirme + yeniden-değerlendirme (`degerlendirme-metrik...-08-19.md:175-188`), (c) **STK admin paneli 8 kararı** (`tasarim-kararlari-admin-2026-08-11.md`, yalnız KARAR 12=G3-19 bağlı). Bu tam olarak ANALIZ-OZETI §7.8(c)'nin öngördüğü boşluk.

---

## 1. Kapsam beyanı

| Taraf | Belge | Satır | Alt-ajan | TAM okundu mu |
|---|---|---|---|---|
| **A · `docs/kararlar/konu/`** | 16 `.md` + `kvkk-metinleri/` 10 `.md` = **26 dosya** | ~2.361 (konu) + kvkk metinleri | 5 alt-ajan (A-1…A-5) | **Evet** — okunamayan 0 |
| **B · `docs/raporlar/bilanco/`** | **37 dosya** (12 G-kart + 5 defter + 4 üst-düzey + 16 `bolumler/`) | ~9.400 | 9 alt-ajan (B-1…B-9) | **Evet** — okunamayan 0 |

Toplam **14 yazma-denetim alt-ajanı** + ana ajanın nokta kod-teyitleri (`sector-scorer`, `mask.ts`, `matching.ts`). Her alt-ajan yalnız yapılandırılmış özet döndürdü; ana bağlam temiz tutuldu.

> ⚠️ **Prompt "~16.000 satır bilanço" dedi; gerçek ölçüm ~9.400 satır** (37 `.md`). Fark: prompt muhtemelen `.docx` türevini veya daha erken bir durumu sayıyordu (bkz. §10).

**Önceki dört raporun kapsadığı — TEKRAR EDİLMEDİ, atıfla geçildi:**
- `docs/00-BELGE-HARITASI.md` (2026-09-20): envanter düzeyinde her iki klasörü de listeledi; çelişki tablosu Ç-3 (196/259/260) buradan alındı.
- `konsey-yonetisim-2026-09-21.md`: `07-calisma-tarzi` + `belge-duzeni-rehberi` numara/tanım/eksen çakışması; `bilanco/`'ya dokunmadı.
- `oksuz-bulgu-sayimi-2026-09-23.md`: kesif/kod-denetimi/panel/persona öksüzleri; `bilanco/`'dan yalnız `bolumler/T2-B/C/D`'yi baseline aldı, kendi G-kartlarını taramadı.
- `00-ANALIZ-TURU-OZETI-2026-09-23.md`: `03-psikometri/değerlendirme` eksenini derin okudu (ölçek-100× I-13, sertifika bekleme metni, 7↔8 aşama vb.); `bilanco/`'ya dokunmadı. §7.8 bu turu işaret etti.

---

## 2. A bulguları — `docs/kararlar/konu/` belge bazında

Statü: 🟢 kod↔belge uyumlu/sağlam · 🟡 kısmen bayat/açık uç · 🔴 belge kodun gerisinde ya da yapısal sorun.

| Belge | Kimlik (damga · belge tarihi / son commit) | Geçerlilik | İç/belge-arası çelişki | Gerekçesiz karar | Öksüz | Dondurma |
|---|---|---|---|---|---|---|
| `01-urun-vizyonu` | 🔄 · 08-02 / 08-23 | 🟡 freemium "⏳" ama kodda var (`schema.prisma:194-195`) | vizyon adı belirsizliği (08'de takip) | yok | yok | güncelleme adayı (satır 19 ⏳ düşmeli) |
| `02-mimari-ve-altyapi` | 🔄 · 08-02 / 08-25 | 🟡 çoğu doğru (Next 15.5.20 ✅) | **model sayısı "60+" ↔ kod 38** · Neon/Postgres (CLAUDE.md) | yok (gerekçeler var) | rate-limiter→Redis (düşük) | referans, güncelleme |
| `03-psikometri-ve-algoritma` | 🔄 · 08-02 / 08-28 | 🔴 **"sektör stub/50 dönüyor" BAYAT** — `sector-scorer` tam yazılı | sektör-stub satırı ↔ kod | **0.60/0.40, 30/25/25/15/5, clamp, baraj 65…** kaynaksız | ghost-red vb. 08'e atıflı | satır 38-42 düzeltilmeli |
| `11-tasarim-kararlari-yasam-dongusu-ve-disc` | 🔄 · 08-16 / 09-21 | 🟡 KARAR 1 kodda, KARAR 2 kodda 0 | **DISC "1-4 harf" ↔ kod "1-3" (`discLetters.ts:5,15`)** · zaman-tutarsız | midline 0.25 / ratio 0.75 (PO sezgisi) | **KARAR 2 ghost-red (öksüz, aşağı §4)** | KARAR 1 bölümü tazelenmeli |
| `degerlendirme-metrik-sistemi-tasarim-2026-08-19` | 🔄 · 08-19 / 08-28 | 🟡 §4.2 kısmen bayat | **§4.2 "kalite puanı yazılmıyor/checkpoint ölü" ↔ §8 MERGED, `~~[ESKİ]~~` damgası eksik** | öneri 3.1, DAY_3/14/30 kaynaksız (§7'de açık) | **AŞAMA 2/3 (öksüz, §4)** | vizyon açık, dondurulmaz |
| `degerlendirme-sistemi-tasarim-2026-08-27` | 🔄 · 08-27 / 09-23 | 🟢 sağlam; motor bağlanmayı bekliyor (F-11) | §10.2 akış-sırası notu (satır 586-588) ↔ kod düzeltilmiş | **akademik atıflı**, §15 "meslekî muhakeme" dürüst | §16 kuyruğa bağlı (öksüz değil) | **dondurulmaz — örnek YAŞAYAN** |
| `04-guvenlik-ve-kvkk` + `kvkk-metinleri/` (11 belge) | 🔄 taslak · 08-25 / 08-26 | 🔴 **4 boşluk kodda çözülü, metin "YOK" diyor** | anonimleştirme "PR bekliyor" ↔ kod merged · **kişi adı yasağı ihlali** (yasal metinde isim) | saklama süreleri dürüst (uydurulmamış); FeedbackLog 3-yıl dayanağı zayıf | `[PO DOLDURACAK]` alanları takipsiz · Dokploy ülke teyidi | **tüm paket + `.docx` = kod-senkron öncesi güncellenmeli** |
| `07-calisma-tarzi` | 🔄 · 09-21 | 🟢 CLAUDE.md'ye hizalı | 8-UNSUR CLAUDE.md'de yok (canonical belirsiz) · BÇ5/E12 atfı ölü | konsey sıklık "haftada bir" kaynaksız | **konsey sıklık tetiği yok** (öksüz kural) | dondurulmaz |
| `belge-duzeni-rehberi` | 🔄 · 08-23 künye / 09-21 commit | 🟡 künye bayat | **`:6` "6 kural" ↔ dosyada 16 kural** · `:13` canonical `10-yol` (📸 donuk) gösteriyor | yok (her kural "Neden:" taşır — en temizi) | YN-02/YN-03/YN-05 kuyrukta | künye yenilenmeli |
| `chat-v1-teslim` | 📸 · 08-06 / 08-23 | 🔴 **`:5` "MERGE YOK, karar PO'da" BAYAT — chat CANLIDA** | `:3` "canlıda" ↔ `:5` "merge bekliyor" (üstü çizilmemiş) | yok (örnek teslim) | `:64` requestMessage temizliği = G10-02 (kuyruk-öksüz) | `:5` `~~[ESKİ]~~` damgası almalı |
| `consent-modeli-plani-2026-08-28` | 📸 · 08-28 | 🟢 **kod↔belge TAM uyumlu (örnek)** | yok | yok (örnek hijyen) | G1-08 OAuth rıza açık (KARAR-TAKIP'te izli) | dondurma doğru |
| `tasarim-kararlari-admin-2026-08-11` | 🔄 · 08-11 / 08-23 | 🟡 KARAR 11 kodda, çoğu izsiz | **ad tarihli (📸 işareti) ↔ etiket 🔄 (KURAL 4 ihlali)** | yok (karar hijyeni güçlü) | **8 "uygulanacak" karar kuyruğa bağlanmamış** (§4) | ad tarihsizleştirilmeli, kararlar statülenmeli |
| `rtk-komut-rehberi` | 🔄 · 09-21 | 🟡 CLAUDE.md "AKTİF" ama fiili kullanım sinyali zayıf | yok | yok | INDEX'e kaydedilmedi (YN-03) | dondurulmaz |
| `05-ozellikler-ve-paneller` | 🔄 · 08-02 / 08-28 | 🟢 A1-A7 panelleri kodda | "Availability" ↔ kod `AvailabilityBlock` (isim) | **4 KPI seçimi gerekçesiz** | BEKLEYEN İŞLER kuyruğa atıflı | dondurulmaz |
| `06-tasarim-ux` | 🔄 · 08-28 | 🟢 **en bakımlı; H1 kodla birebir** (`HeroSection.tsx:39`) | doğru Belge Düzeltme Deseni | kart 15-18 sayısı (08'de ❓ dürüst) | Landing UX / AlgorithmBento (teyit gerek) | dondurulmaz |
| `08-acik-sorular` | 🔄 · 08-02 / 08-28 | 🟡 canonical'lığını `00-KARAR-TAKIP`'e devretmiş | **`:5` devir ↔ 🔄 YAŞAYAN = çift-kaynak** | pasif 30g/ölü 14g "default" | devir zinciri sağlam (öksüz yok) | **en güçlü devir/dondurma adayı** |

**A özeti:** 26 belgenin **6'sı 🟢 sağlam** (consent-plani, degerlendirme-08-27, 06-ux, 05-paneller, belge-duzeni gerekçe hijyeni, 07 hizalı) · **~8'i 🟡 kısmen bayat/açık uç** · **4'ü 🔴** (03-psikometri sektör-stub, KVKK paketi kod-gerisi, chat-v1 yanlış statü, tasarim-admin ad↔etiket). Dondurma/devir adayı: `08-acik-sorular`, KVKK paketi + `.docx`, `chat-v1` (statü düzeltmesiyle).

---

## 3. ⭐ A.3 — ÇELİŞKİ LİSTESİ (belge-içi + belge-arası + belge↔kod)

Her çelişki iki tarafıyla; "hangisi yeni/kodla uyumlu" işaretli. Kod-teyitli olanlar ⭐.

| # | Taraf 1 | Taraf 2 | Hangisi geçerli |
|---|---|---|---|
| Ç-01 ⭐ | `03-psikometri:41-42` "sektör skoru stub, 50 dönüyor" | `sector-scorer.service.ts:7,67` tam yazılmış | **Kod yeni** — belge bayat. Ama servis `matching.ts`'e bağlı DEĞİL (0 import) → yazılmış-bağlanmamış |
| Ç-02 ⭐ | `11-...disc:22,36` DISC "1-4 harf" | `discLetters.ts:5,15` "1-3 harf" + matematiksel gerekçe | **Kod yeni/doğru** — belge bayat |
| Ç-03 ⭐ | `degerlendirme-08-27` §10.2 (satır 586-588) "kod tersi: kart üç sorudan ÖNCE" | `_OnboardingContent.tsx` step sırası düzeltilmiş (üç soru önce, kart sonda) | **Kod yeni** — belge notu bayat (`~~[ESKİ]~~` bekliyor) |
| Ç-04 | `degerlendirme-08-19` §4.2 "kalite puanı DB'ye yazılmıyor / checkpoint ölü" | Aynı belge §8 "AŞAMA 1 MERGED — `persistMentorQualityMultiplier` canlıda" | **§8 yeni** — §4.2 gövde satırı çürütülmüş ama damgasız (kural ihlali) |
| Ç-05 ⭐ | `01-urun-vizyonu:19` freemium "⏳ uygulanmadı" | `schema.prisma:194-195` `plan`+`limits` var, 5 controller kullanıyor | **Kod yeni** — belge bayat |
| Ç-06 | `chat-v1-teslim:3` "chat canlıda" | Aynı belge `:5` "PR hazır, MERGE YOK, karar PO'da" | **`:3` doğru** (kod: `conversationController.ts` + migration + `/messages` FE canlı) — `:5` bayat, üstü çizilmemiş |
| Ç-07 | `tasarim-kararlari-admin` dosya adı `-2026-08-11` (tarihli = 📸 işareti) | Aynı belge `:2` etiket "🔄 YAŞAYAN" | KURAL 4 ihlali — ad↔etiket birbirini yalanlıyor; karar PO |
| Ç-08 | `belge-duzeni-rehberi:6` "bu 6 kurala uyar" | Aynı dosyada KURAL 1-16 (16 kural) | Gövde bayat — 16 doğru (YN-02 kuyrukta) |
| Ç-09 | `08-acik-sorular:5` "canonical artık 00-KARAR-TAKIP" | Aynı belge `:2` "🔄 YAŞAYAN" | Çift-kaynak gerilimi — "AKTİF İŞ KAYNAĞI TEKTİR" kuralıyla çelişir |
| Ç-10 ⭐ | `02-mimari:26` "60+ model" | `backend/CLAUDE.md` "38 model" (kod-teyitli) | **backend/CLAUDE.md yeni** — belge bayat |
| Ç-11 | `02-mimari:8-9` "canlı=lokal AYNI Neon" | Kök `CLAUDE.md` "PROD docker-compose Postgres, Neon değil" | **Çözülmemiş** — PO Dokploy teyidi bekliyor (`03-PO-ELLE-ISLER.md`); yeni bulgu değil |
| Ç-12 ⭐ | KVKK `02-acik-riza:37`+`03:47`+`05:37` "rıza SÜRÜMLENMİYOR" | `consentService.ts:28 CONSENT_VERSION='v1.0'` + dual-write + testler | **Kod yeni** — metin bayat (G1-07 uygulandı) |
| Ç-13 ⭐ | KVKK `05-saklama:22` "FeedbackLog süresiz, uygulanmamış" | `gdprService.ts:370` 3-yıl purge + `cronScheduler.ts:89` haftalık | **Kod yeni** — metin bayat |
| Ç-14 ⭐ | KVKK `05:30`+`07:34` hardDelete "PR bekliyor" | `gdprService.ts:233` `hardDeleteUser`→`anonymizeUser` merged | **Kod yeni** — metin bayat |
| Ç-15 ⭐ | KVKK `03-gizlilik:35`+`06:15` "FE hak-kullanım ekranı YOK" | `DataPrivacySection.tsx` `profile/page.tsx:443`'e mount edilmiş | **Kod yeni** — metin bayat |
| Ç-16 | KVKK yasal metinlerde açık kişi adı (`01:11,43`, `03:9`, `07:7,39`, `08:6`) | Kök `CLAUDE.md` "Kişi Adı Yasağı — hiçbir belgeye kişi adı yazma" | **Çelişki** — yasal metin isim zorunlu kılabilir; hukuk/PO kararı (§7 KARAR-D) |
| Ç-17 | `bilanco` 196 (`karar-defteri:437`+`bilanco-po-ozet:22` tablo) | `00-KATLAMA-IZI` 259 ↔ `00-SAYIM` 260 | Paragraf düzeltilmiş, **tablo hücreleri 196'da kalmış** (BELGE-HARITASI Ç-3); fotoğraf, tarihsel |
| Ç-18 ⭐ | `backend/CLAUDE.md:7,46,51` "Five models" · `iceBreaker.ts`/`matchReason.ts` "mevcut" | Kod: 38 model; iki dosya silinmiş; `:62` "LLM removed" (belge-içi çelişki) | **Kod yeni** — backend/CLAUDE.md onboarding snapshot ağır bayat |
| Ç-19 ⭐ | Kök `CLAUDE.md:81` (T3-C dökümü) "eu-west-2 = İrlanda" | Kod: eu-west-2 = AWS Londra; `02-mimari` PO-teyitli "Londra/BK" | **Kod/mimari yeni** — CLAUDE.md satırı bayat, üstü çizilmemiş |

**Toplam çelişki: 19** (belge-içi: 4 — Ç-04/06/09/18 · belge↔kod: 11 · belge-arası/kural: 4 — Ç-08/11/16/17). Bunların **11'i kod-teyitli** (⭐). Kritik desen: çoğu çelişkide belge kodun gerisinde — "yapılmadı" denen iş yapılmış.

---

## 4. B bulguları — `bilanco/` G-kart bazında öksüz listesi + `konu/` tasarım öksüzleri

### 4.1 `konu/` tasarım kararı öksüzleri (aktif kuyrukta karşılığı YOK — grep-teyitli)

| Kalem | Kaynak | Kod | Kuyruk | Kapı |
|---|---|---|---|---|
| **Ghost / kalıcı red** (`rejectionType: GHOST`, veri temizleme, reapply bloğu) | `11-...disc:53-81` | 0 (grep: ghost/rejectionType boş) | **0** (grep boş) — bilanço G10-02'de "requestMessage DROP" ile kısmen kesişir | 🔴 migration + ürün kararı |
| **Değerlendirme AŞAMA 2/3** (otomatik pasifleştirme + yeniden-değerlendirme + onay döngüsü) | `degerlendirme-metrik...-08-19:175-188` | AŞAMA 1 merged, 2/3 yok | **0** (F-07/Y-14 farklı konular) | 🔴 migration + ürün kararı |
| **STK admin paneli 8 kararı** (sol-menü, durum rozeti, DISC asimetri, mentör yaklaşım kılavuzu…) | `tasarim-kararlari-admin-2026-08-11` | KARAR 11 kodda; çoğu izsiz | Yalnız KARAR 12 = G3-19 | 🟢/🟡 statüleme + bağlama |

### 4.2 Bilanço G-kart öksüzleri ve bayatlıkları (özet — B-1…B-5 alt-ajan)

| Kart | Açık kalem | Öksüz (kuyruk yok) | Bugün CANLI (kart bayat) | Not |
|---|---|---|---|---|
| **G1** güvenlik/KVKK | 21 | **~11** (G1-03,11,12,16,18,20,21,22,24,25,27,29,30 — bir kısmı 🔵 bilinçli) | ≥3 (G1-22 k-anon `mask.ts:52`, G1-26 IP-limit, G1-14 audit) | En değerli öksüz: **G1-12** Veri İşleyen Sözleşmesi (migration+hukuk), **G1-29** tenant kalıcı silme |
| **G2** eşleştirme | 5 | 0 | G2-11 davetli-onay | G2-07/08 = F-11/KARAR-10 (cevaplandı C); sector-scorer atıl |
| **G3** içerik | 17 | 0 | G3-05 (F-13 bitti), G3-19 (✅) | KARAR-21 (answerType) hâlâ boş → G3-13 kilitli |
| **G4a+G4b** panel | ~32 | 0 | **~13 CANLI** (F-10/15/16/19/22/25 vb. bitti) | **G4-15, G4-16 "kuyruk-boşluğu"** (kart var, F-satırı yok, 🟢 düşük efor) |
| **G5-G8** | 38 | 0 | 3 (G5-04, G6-01, G7-03) | 8 kalem PO-ELLE; 6 kart bugün kapalı ama kartta açık |
| **G9** belge-süreç | 4 | 0 | — | Hepsi F-01'e bağlı |
| **G10** ölü-kod | 13 | **7** (G10-02,03,04,05,06,08,15,18) | G10-19 (KARAR-32 A alındı), G10-22 (PR #206) | Silme protokolü — karantina K-13/E-5'e bağlı; hiçbiri bugün silinemez |
| **G11** strateji | 2 | **2** (kod-dışı) | — | "tanım bekliyor" — kod-dışı, PO/iş kararı |
| `bolumler/` (16) | ~891 ham kalem | **0** | — | Ham defterin %100'ü G-kartlara sentezlenmiş; 16 aday tek tek G-kartta bulundu |
| T3/T4 bölümler | 9 öksüz-aday | 9 ama **hepsi 🌱 ürün-vizyonu** | — | Sosyal kanıt duvarı, etki kartı, bottom-up büyüme, onboarding şablon, çift-aha demo, freemium plan/limit… — iş kalemi değil, PO önceliği |

**B özeti:** Tarandı **~145 açık kart kalemi** (G1-G11). Öksüz (kuyruk/PO-ELLE karşılığı yok): **G1 ~11 + G10 7 + G11 2 = ~20 kalem** (G11'in 2'si kod-dışı). Kalan ~125'in hepsi kuyruk/PO-ELLE'ye bağlı (**G2/G3/G4/G5-G8/G9 + bolumler = 0 öksüz**). Ayrıca ≥20 kart kalemi bugün canlıda ama kartta açık (bayatlık, öksüzlük değil). **En kritik ikinci-derece öksüz:** G10-02 gibi kalemler bir G-kartta var ama G-kart'ın kendisi kuyruk-öksüz → tek katman derin bakınca "izli" görünüp aslında aktif motora hiç girmemiş.

### 4.3 B.5 — Mükerrer (aynı kalem birden çok kartta)

- **G2-08 ↔ G10-21** (sector-scorer atıl ↔ taxonomy/IndustryNode skorlamada yok) — aynı kök, ikisi de F-11/KARAR-10.
- **G10-08 ↔ G1-19** (`UserProfile.qualityMultiplier` ikiz — G1 okuma-kaynağı ✅, G10 DROP açık).
- **G6-02/requestMessage ↔ G10-02/G10-18** (ölü kolon iki karttan görünüyor; kart notu "DROP G6 değil G10" der).
- **G4-22↔G4-23**, **G4-26↔G4-28** (tereddüt çiftleri, tek Y/madde altında).
- **G1-09 ↔ G5-02** (destek@ + `PLATFORM_ADMIN_EMAIL` aynı env).
- **196/259/260 sayımı** üç üst-belgede farklı (Ç-17); **184 kart dağılımı** hem `00-PO-KARARLARI` hem `00-KART-INDEKSI`'de.

---

## 5. ⭐ B.4 — HAZIR DONDURMA METİNLERİ (kopyala-yapıştır; uygulama AYRI turda)

> ⛔ Bu metinleri SEN ekleme talimatı gereği eklenmedi — yalnız önerildi. Numara/tarih uygulama turunda doğrulanır.

**G1-G11 kartları için (her G-kartın başına):**
```
📸 DONDURULMUŞ — 2026-08-26/27 sayım fotoğrafı. Bu belge kalemlerin TANIMINI tutar,
DURUMUNU TUTMAZ. Buradaki ⬜/❓ işaretleri O GÜNÜN durumudur; kod o günden ilerledi
(ör. bu kartta açık görünen bazı kalemler bugün canlıda). Güncel durum:
docs/otonom/00-KUYRUK.md — köprü: docs/kararlar/00-KART-INDEKSI.md.
```

**`00-SAYIM` / `00-KATLAMA-IZI` için (zaten 📸, ek satır):**
```
⚠️ Buradaki 259/260 toplamı 2026-08-27 fotoğrafıdır; kalemler 2026-09-19'da koda karşı
yeniden doğrulandı (bkz. 00-KUYRUK.md AŞAMA F). Sayı canlı iş durumunu YANSITMAZ.
```

**`00-ONCELIK-SIRASI` için (damga çelişkisi düzeltmesi — TEK tutarlı damga):**
```
📸 DONDURULMUŞ — 2026-09-19'da DEVREDİLDİ. Açık kalemler docs/otonom/00-KUYRUK.md
AŞAMA F (F-01..F-33) olarak taşındı. Bu belge artık iş kaynağı değildir.
(:3 "DEVREDİLDİ" + :13 "DONDURULMUŞ" + başlık üçlüsü bu tek damgaya indirgenmeli.)
```

**`bilanco-po-ozet-2026-08-26` için (TEK etiketsiz belge — damga eklenmeli):**
```
📸 DONDURULMUŞ — 2026-08-26 PO özet fotoğrafı. [ ] PO notu alanları o güne aittir.
Güncel durum: docs/otonom/00-KUYRUK.md.
```

**`bolumler/` (T1-T4) için:** ek NOT GEREKMİYOR — 16 dosyanın her biri zaten satır 3'te `📸 DONDURULMUŞ` damgalı ve kapanış notu taşıyor.

---

## 6. HAZIR KUYRUK SATIRLARI (KN-??)

Kapı: varsayılan 🟢 · migration/seed·auth/KVKK/matching·geri-dönülmez → 🟡 · ürün kararı → 🔴 (+ §7 kartı).

| # | İş (tek cümle) | Kapı | Kaynak (dosya:satır) | Bitti demek (kullanıcı gözünden) |
|---|---|---|---|---|
| KN-01 | Ghost/kalıcı red özelliğini kuyruğa al (KARAR-A cevabı sonrası) | 🔴 | `11-...disc:53-81` | Yönetici bir başvuruyu "kalıcı ret" işaretleyince kullanıcı sessizce elenir/yeniden başvuramaz |
| KN-02 | Değerlendirme AŞAMA 2/3 (otomatik pasifleştirme + yeniden-değerlendirme) kuyruğa al (KARAR-B sonrası) | 🔴 | `degerlendirme-metrik...-08-19:175-188` | Düşük puanlı mentör otomatik pasifleşir, yönetici onayıyla yeniden aktifleşir |
| KN-03 | STK admin paneli 8 kararını tek tek statüle (✅/⬜) ve açık olanları kuyruğa bağla | 🟢 | `tasarim-kararlari-admin-2026-08-11:126` | (iç düzen — açık admin kararları görünür olur) |
| KN-04 | Veri İşleyen Sözleşmesi için Tenant yasal-kimlik alanları (G1-12) | 🟡 | `G1-guvenlik-kvkk` G1-12 | Kurum, KVKK veri-işleyen sözleşmesini panelden imzalayıp yönetebilir |
| KN-05 | Kurum (tenant) kalıcı silme akışı (G1-29, KARAR-C sonrası) | 🟡 | `G1-guvenlik-kvkk` G1-29 · `platformRoutes.ts:53` | Platform admin bir kurumu (yalnız freeze değil) kalıcı silebilir |
| KN-06 | `reviewedBy` gerçek kimlik — `platformController.ts:525` sabit `'platform-admin'` düzelt (G4-15) | 🟢 | `platformController.ts:525` | Rapor incelendi kaydında gerçek yönetici adı görünür |
| KN-07 | user-reports sayfalama (`take:200` → limit/offset) (G4-16) | 🟢 | `reportController.ts:86` | 200'den fazla rapor olan kurumda liste tümüyle gezilir |
| KN-08 | G10 ölü-kod karantina turu (G10-02/03/04/05/06/08/15/18) — silme protokolü adım 5 | 🟡 | `G10-olu-kod-terk` | (iç düzen — ölü uçlar/kolonlar güvenle devre-dışı) |
| KN-09 | KVKK metin paketini kod-senkron güncelle (avukata gitmeden önce; 4 boşluk kapandı) | 🟡 | `kvkk-metinleri/*` (Ç-12..15) | Avukat, ürünün gerçek (güncel) KVKK durumunu görür |
| KN-10 | Bayat belge satırlarını `~~[ESKİ]~~` + GÜNCELLEME ile düzelt (Ç-01..06,10,18,19) | 🟢 | 03-psikometri:41-42 · 11-disc:22 · chat-v1:5 · 02-mimari:26 · CLAUDE.md:81 · backend/CLAUDE.md:7-62 | (iç düzen — belge kod gerçeğiyle örtüşür) |
| KN-11 | Dondurma notları uygula: bilanco-po-ozet etiketsiz + ONCELIK damga + G-kart fotoğraf notu (§5) | 🟢 | §5 metinleri | (iç düzen — kartlar "durum" sanılmaz) |
| KN-12 | `tasarim-kararlari-admin` ad tarihsizleştir + `08-acik-sorular` çift-kaynak çöz (KURAL 4/tek-kaynak) | 🟢 | Ç-07, Ç-09 | (iç düzen) |
| KN-13 | G2-10 eşleşme tetikleyicisi (event vs sayfa-açılış) kararı — keşif | 🔴 | `G2-eslestirme-psikometri` G2-10 | Eşleşme ne zaman hesaplanır netleşir |
| KN-14 | `belge-duzeni-rehberi` künye + `:6` "6→16 kural" + `:13` `10-yol` atfı düzelt (YN-02/03/05) | 🟢 | `belge-duzeni-rehberi:3,6,13` | (iç düzen) |

> Not: `[PO DOLDURACAK]` KVKK alanları (adres/KEP/MERSİS/yürürlük) ve Dokploy ülke teyidi **kod-dışı** → kuyruk değil `03-PO-ELLE-ISLER.md`'ye eklenmeli.

---

## 7. HAZIR KARAR KARTLARI (KARAR-??)

### KARAR-A · Ghost / "kalıcı red" özelliği olacak mı? (2 işi açar: KN-01) [ÜRÜN KARARI]
**Şu an ne var:** Yönetici bir başvuruyu reddedince kullanıcı "düzeltme" mesajıyla bilgilendiriliyor ve yeniden başvurabiliyor (`adminController.ts:740 rejectUser`). "Sessiz/kalıcı" red yok. Kanıt: `11-...disc:53-81` tam tasarım var ama kodda 0.
**Sorun ne:** Kötü niyetli/uygunsuz bir kullanıcıyı sessizce (ona bildirmeden) ve kalıcı olarak (yeniden başvuramayacak şekilde) eleme yolu yok. Tasarım yazılmış ama hiçbir iş kuyruğuna girmemiş — 7 haftadır unutulmuş.
**Neden sana soruyorum:** Bir kişinin platformdan sessizce ve kalıcı elenmesi geri dönülmez bir kullanıcı-deneyimi ve olası KVKK/itiraz sonucu doğurur — teknik değil ürün+hukuk kararı.
**Seçenekler:**
- **A) Yapılsın (tasarımdaki gibi):** · Kullanıcı: uygunsuz kişi sessizce elenir, tekrar giremez · Kazanç: topluluk güvenliği · Kayıp: yanlış-red edilen kişi neden reddedildiğini bilemez, itiraz edemez (KVKK şeffaflık gerilimi) · Süre M · Geri alınır (kayıt tutulursa) · Migration VAR (`rejectionType` alanı)
- **B) Yalnız "düzeltme redi" kalsın (bugünkü):** · Kullanıcı: her red şeffaf, yeniden başvurabilir · Kazanç: şeffaflık, KVKK güvenli · Kayıp: kötü niyetli kullanıcı tekrar tekrar başvurabilir · Süre 0 · Migration YOK
- **C) Ghost yerine "süreli engelleme":** · Kullanıcı: X gün başvuramaz, sonra açılır · Kazanç: orta yol · Kayıp: ek tasarım · Süre M · Migration VAR
**Karşılaştırma:** A topluluk güvenliğini maksimize eder ama KVKK şeffaflığıyla gerilimli; B en güvenli/en zayıf koruma; C dengeli ama en çok iş. Gerçek kötüye-kullanım hacmi ~sıfırsa B yeterli olabilir.
**Benim önerim:** B (koru), gerçek kötüye-kullanım görülene kadar — çünkü ghost-red'in KVKK maliyeti, bugünkü ~sıfır kullanıcıda somut faydasından büyük. *(Bu senin ürün kararın; önerime güvenme — güvenlik ekibi farklı düşünebilir.)*
**Cevap vermezsen:** `11-...disc` KARAR 2 tasarımı belgede asılı kalır, tekrar tekrar "öksüz" raporlanır.
**CEVAP:**

### KARAR-B · Değerlendirme AŞAMA 2/3 (otomatik pasifleştirme) yapılacak mı? (1 iş açar: KN-02) [ÜRÜN KARARI]
**Şu an ne var:** Eşleşme sonrası karşılıklı değerlendirme AŞAMA 1 canlıda (kalite puanı `TenantMembership.qualityMultiplier`'a yazılıyor, yönetici havuzda görüyor). AŞAMA 2 (eşik-altı mentörün otomatik pasifleşmesi) ve AŞAMA 3 (yeniden-değerlendirme + onay döngüsü) yalnız tasarımda. Kanıt: `degerlendirme-metrik...-08-19:175-188`.
**Sorun ne:** Düşük puanlı bir mentör kendiliğinden pasifleşmiyor; yönetici elle müdahale etmezse zayıf eşleşmeler sürer.
**Neden sana soruyorum:** Bir mentörün otomatik (insan onayı olmadan) pasifleştirilmesi, mentörün göreceği/hissedeceği geri-dönülebilir ama hassas bir sonuç — eşiği ve otomasyon derecesini ürün sahibi belirler.
**Seçenekler:**
- **A) Tam otomatik pasifleştirme (eşik 3.1/5):** · Mentör: eşik altına düşünce eşleşme almaz · Kazanç: kalite kendini korur · Kayıp: tek kötü dönem mentörü haksız cezalandırır; 3.1 eşiği dayanaksız (belge itiraf ediyor) · Süre L · Migration VAR (`blocked`/`restrictedUntil`)
- **B) Yönetici-önerili (otomatik uyarı, elle onay):** · Mentör: yönetici karar verir · Kazanç: insan denetimi · Kayıp: yönetici iş yükü · Süre M · Migration VAR
- **C) Şimdilik yapılmasın:** · Kazanç: 0 iş, gerçek veri ~sıfır · Kayıp: kalite döngüsü yarım kalır · Süre 0
**Karşılaştırma:** Gerçek değerlendirme verisi ~sıfırken A'nın eşiği kalibre edilemez; B insan denetimiyle güvenli ama iş yükü; C en düşük risk. Veri birikene kadar C→B doğal yol.
**Benim önerim:** C şimdilik, veri birikince B — çünkü 3.1 eşiği bugün ampirik olarak savunulamaz. *(Ürün kararın.)*
**Cevap vermezsen:** AŞAMA 2/3 tasarımı öksüz kalır; kalite döngüsü "yarım özellik" olarak asılı durur.
**CEVAP:**

### KARAR-C · Kurum (tenant) kalıcı silme hakkı (G1-29) [ÜRÜN + KVKK KARARI]
**Şu an ne var:** Platform admin bir kurumu yalnız "dondurabiliyor" (`platformRoutes.ts:53 /freeze`); kalıcı silme (DELETE) yok (grep: `hardDeleteTenant` yok).
**Sorun ne:** Bir kurum platformdan tümüyle silinmek isterse (KVKK "unutulma hakkı" kurumsal karşılığı) bunu yapacak yol yok; veriler süresiz dondurulmuş kalır.
**Neden sana soruyorum:** Kurumun tüm verisinin (üyeler, eşleşmeler, geçmiş) geri-dönülmez silinmesi hem KVKK yükümlülüğü hem geri-alınamaz bir işlem — ürün+hukuk kararı.
**Seçenekler:**
- **A) Kalıcı silme eklensin (anonimleştirme+silme):** · Kazanç: KVKK uyumu, gerçek "unutulma" · Kayıp: yanlış silme felaketi; yedek/onay katmanı şart · Süre M · Migration VAR · Geri alınamaz
- **B) Yalnız freeze kalsın + elle DB silme:** · Kazanç: 0 iş · Kayıp: KVKK talebinde manuel/riskli operasyon; iz bırakmaz · Süre 0
- **C) Freeze + zamanlı otomatik imha (X ay sonra):** · Kazanç: dondur→sil köprüsü · Kayıp: en çok iş, süre kararı gerekir · Süre L · Migration VAR
**Karşılaştırma:** A KVKK'yı tam karşılar ama en riskli işlem; B hukuki talepte açık verir; C otomatik ama süre eşiği yeni bir karar doğurur.
**Benim önerim:** A — ama çift-onay + tarihli yedek tablo zorunluluğuyla (CLAUDE.md silme protokolü). *(Ürün+hukuk kararın.)*
**Cevap vermezsen:** G1-29 öksüz kalır; ilk kurum silme talebinde hazırlıksız yakalanılır.
**CEVAP:**

### KARAR-D · KVKK yasal metinlerinde kişi adı — yasak mı istisna mı? (Ç-16) [HUKUK + POLİTİKA KARARI]
**Şu an ne var:** Kök `CLAUDE.md` "hiçbir belgeye kişi adı yazma" diyor; ama KVKK yasal metinleri (aydınlatma, gizlilik, kullanım koşulları, veri-işleyen sözleşmesi) veri sorumlusunu **açık kişi/kurum adıyla** yazıyor (`01:11,43`, `03:9`, `07:7,39`, `08:6`).
**Sorun ne:** İki kural birbirini yalanlıyor — biri isim yasaklıyor, diğeri (yasal geçerlilik için) isim zorunlu kılıyor olabilir.
**Neden sana soruyorum:** Yasal metnin geçerliliği için veri sorumlusunun adının yazılması gerekip gerekmediği hukuk kararı; "kişi adı yasağı"nın bu metinlere istisna olup olmadığı politika kararı.
**Seçenekler:**
- **A) KVKK metinleri yasağa İSTİSNA (isim kalır):** · Kazanç: yasal geçerlilik · Kayıp: yasak kuralı delinir, sınır bulanıklaşır · Süre 0 · Geri alınır
- **B) İsimler kurum/unvana çevrilsin ("Veri Sorumlusu: [Kurum]"):** · Kazanç: yasak korunur · Kayıp: avukat "yeterli mi" teyidi gerekir · Süre S · Geri alınır
**Karşılaştırma:** A pratik ama kuralı zayıflatır; B tutarlı ama hukuk teyidi ister. İkisi de ucuz.
**Benim önerim:** B (kurum/unvan) + avukat teyidi — çünkü kişisel ad zaten gereksiz, kurum adı yeterli. *(Hukuk kararın.)*
**Cevap vermezsen:** KVKK paketi hem yasağı ihlal etmeye devam eder hem her denetimde tekrar işaretlenir.
**CEVAP:**

---

## 8. ✅ HÂLÂ GEÇERLİ VE SAĞLAM (7 hafta sonra da doğru — korunmalı)

1. **`consent-modeli-plani-2026-08-28`** — kod↔belge TAM uyumlu (`consentService.ts` + migration + backfill). Gerekçe hijyeni + iç-tutarlılık örnek. Projenin en sağlıklı tasarım belgesi.
2. **`degerlendirme-sistemi-tasarim-2026-08-27`** — eşikleri akademik atıflarla bağlamış (§9.1 Dyrenforth 2010, §9.2 dayanak sütunu); §15'te "eşikler meslekî muhakeme, ampirik değil" diye dürüstçe itiraf ediyor. Bugün hâlâ aktif bakımlı (son commit 2026-09-23).
3. **`06-tasarim-ux`** — en bakımlı belge; H1 metni kodla birebir (`HeroSection.tsx:39`), Belge Düzeltme Deseni doğru uygulanmış.
4. **`belge-duzeni-rehberi`** — künyesi bayat olsa da her kural "Neden:" satırı taşıyor; gerekçe hijyeni açısından en temiz belge.
5. **Bilanço devir zinciri** — ham defter (`bolumler/`) → `00-SAYIM`/`00-KATLAMA` → G-kartları → `00-KART-INDEKSI` → `00-KUYRUK` AŞAMA F. Zincir satır-satır izlenebilir; `bolumler/`'in ~891 ham kalemi **%100 sentezlenmiş** (0 öksüz), `00-ONCELIK-SIRASI`/`00-PO-KARARLARI` açık kalemleri tam devredilmiş. "AKTİF İŞ KAYNAĞI TEKTİR" kuralına uygun.
6. **G2/G3/G4/G5-G8/G9 kartlarının açık kalemleri = 0 öksüz** — ~125 açık kart kaleminin hepsi kuyruk (F-/P-/K-) ya da PO-ELLE'ye bağlı. Öksüzlük yalnız G1 (güvenlik derinliği), G10 (ölü-kod) ve G11 (kod-dışı strateji) kenarlarında.
7. **KVKK saklama/imha otomatiği** — `cronScheduler.ts` gerçek ve kapsamlı (SystemLog 90g + FeedbackLog 3-yıl purge + taslak temizliği). Metin bayat ama **kod ileri** — nadir "iyi yönde" fark.
8. **04-guvenlik temel kararları kodda** — IDOR (`requireSelfOrAdmin`), rate-limit, k-anonimlik (`mask.ts:52`), tenant izolasyonu uygulanmış; kart "yok" dediklerinin çoğu bugün canlı.

---

## 9. Taranamayanlar

**Yok — A tarafı 26/26, B tarafı 37/37 belge TAM okundu (okunamayan 0 satır).** İki nokta "teyit gerek" bırakıldı (hüküm verilmedi, kesin konuşulmadı):
- `06-tasarim-ux`'taki "Landing UX paketi" ve "AlgorithmBento sıfır-skor çelişkisi" kalemlerinin kuyruk karşılığı — A-1 ajanı kuyruğun uzun satırlarında kesinleştiremedi (1 kalem çifti).
- `.docx` (`KVKK-BELGE-PAKETI-2026-08-25.docx`) içeriği açılmadı — README'ye göre `.md`'lerden python-docx ile üretilen türev; canonical `.md`'ler okundu (1 türev dosya).

---

## 10. ⭐ BU TURUN PROMPTUNA ELEŞTİRİ

1. **"~16.000 satır bilanço" rakamı yanlış — gerçek ~9.400 satır (37 `.md`).** Prompt kapsamı olduğundan büyük gösterdi; muhtemelen `.docx` veya eski bir durum sayılmış. Alt-ajan bütçesi buna göre fazla ayrıldı (zararsız ama kapsam beyanı şişik başladı).
2. **A ve B ayrı denetlendi ama aralarında güçlü köprü var — prompt bunu sormadı.** `konu/` tasarım kararları ile `bilanco/` G-kartları AYNI kalemleri farklı numarayla anıyor (03-psikometri sektör-skoru ↔ G2-08 ↔ G10-21; 11-disc KARAR 2 ghost ↔ G10-02 requestMessage). En değerli üç öksüz (ghost-red, AŞAMA 2/3, admin 8-karar) bu köprüde yaşıyor. Bir sonraki tur **"konu ↔ bilanco numara köprüsü haritası"** çıkarmalı.
3. **"Öksüz" tanımı tek-katman kuruldu; ikinci-derece öksüzü öngörmedi.** Prompt "kuyruk/kart karşılığı var mı?" diye sordu. Ama en sinsi bulgu: bir kalem bir G-kartta VAR (yani "izli" görünüyor) ama **G-kart'ın kendisi kuyruk-öksüz** (G10-02 gibi) → aktif motora hiç girmemiş. "Kart var" ≠ "iş kuyrukta". Öksüz taraması iki katman derin gitmeli.
4. **"Çıkış tanımı yok" dedi ama çıkış-blokeri değerlendirmesi istedi — bu havada kaldı.** Her alt-ajan "tanım bekliyor" yazmak zorunda kaldı. PO'dan **çıkış tanımı kararı** alınmadan bu her turda tekrar sorulacak; prompt bunu bir KARAR kartına dönüştürmeliydi (öneri: bir sonraki tur çıkış-tanımı kartı açsın).
5. **B.4 dondurma önerisini G-kartlara odakladı ama asıl acil iki nokta daha dar:** G-kartların çoğu ZATEN 📸 damgalı; asıl sorun (a) `bilanco-po-ozet` TEK etiketsiz belge ve (b) `00-ONCELIK-SIRASI`'nın çelişkili üçlü damgası. Prompt "her G kartına not" derken bu iki nokta-hedefi kaçırabilirdi (raporda §5'te öne çekildi).
6. **Kişi Adı Yasağı ↔ KVKK metni çelişkisini öngörmedi** — denetimde çıktı (Ç-16, KARAR-D). Prompt "iç çelişki örneği Neon/Postgres" verdi ama kural↔yasal-metin türü çelişkiyi aramadı; kapsamı yalnızca teknik çelişkiye daralttı.
7. **Bir sonraki tur neye bakmalı:** (a) **konu↔bilanco numara köprüsü**; (b) **çıkış tanımı KARAR'ı**; (c) ghost-red + AŞAMA 2/3 + admin 8-karar → **kuyruğa devir turu** (bu raporun KN-01/02/03'ü); (d) `docs/kararlar/oz-denetim/` (T1-B3'te dökülen 7 eski öz-denetim fotoğrafı) — bu tur kapsamı dışıydı, kendi öksüzleri taranmadı.
