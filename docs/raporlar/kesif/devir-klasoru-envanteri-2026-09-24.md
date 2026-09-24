# `docs/devir/` klasörü envanteri: 2026-09-24

> 📸 **DONDURULMUŞ, 2026-09-24 fotoğrafı.** Bu belge, devir klasörü düzeni turunun (DC) 1. bölüm çıktısıdır. Durum tutmaz.
>
> - **Kapsam:** `docs/devir/` altındaki 10 dosyanın hepsi, **2.077 satır**. Okunanlar: 01-06 tam, ana ajan · 07 ve 08 tam, alt-ajan · `gunluk/` altındaki 2 dosya tam, alt-ajan.
> - **Karşılaştırma kaynakları:** `CLAUDE.md` · `docs/otonom/` (00-KUYRUK, 01-KARARLAR, 02-ILERLEME, 03-PO-ELLE-ISLER, OTONOM-PROMPT) · `docs/kararlar/09-DURUM.md` · `docs/00-BELGE-HARITASI.md`.
> - ⚠️ **`00-SIRADAKI.md` ve `01-CEVAPSIZ.md` `main`'de YOK.** İkisi de, üretici komutları olan `npm run otonom:turet` ve `scripts/otonom-turet.mjs` ile birlikte yalnız merge edilmemiş `otonom/DA-belge-sistemi-20260923` dalında var. Bu yüzden karşılaştırma bugünkü kaynaklara yapıldı: `00-KUYRUK` ve `01-KARARLAR`.

## Belge bazında karar tablosu

| Belge | Satır | Belge içi tarih | Ne anlatıyor | BUGÜN geçerli mi (kanıt) | Yerini alan güncel kaynak | Öneri |
|---|---|---|---|---|---|---|
| `01-felsefe-ve-calisma-tarzi.md` | 95 | 2026-08-11, ekleri 08-20 ve 08-28 | Çalışma disiplini: kullanıcı, modlar, 8 unsurlu prompt, kırmızı kurallar, tarz, verify, submodule sırası, hata felsefesi | **KISMEN.** Aşağıdaki "01: satır ayrımı" bölümüne bakın | `CLAUDE.md` (kurallar) | 🔄 **YAŞASIN**. Bayat satırlar üstü çizili damgalanır, 06 bu belgeye atıf verir |
| `02-proje-durumu.md` | 79 | 2026-08-11, ekleri 08-14 ve 08-20 | Canlıda ne var, repo yapısı, DB ortamı, SHA ve PR fotoğrafı | **HAYIR** (durum kısmı). SHA değerleri `da6a138` ve `888ceb8`; açık PR sayısı "0". Bugün main `99189a8` ve çok sayıda açık PR var (`git log origin/main -1`). Repo yapısı kısmı (:28-34) `CLAUDE.md` "Submodule Senkronizasyonu" ile hâlâ uyumlu. DB kısmı (:36-42) `CLAUDE.md` "ÇELİŞKİ (2026-09-21)" notuna tabi | `docs/kararlar/09-DURUM.md` · `docs/otonom/02-ILERLEME.md`. `00-SIRADAKI.md` DA merge olunca eklenecek | 📸 **DONDUR** |
| `03-kvkk-is-paketi.md` | 60 | 2026-08-11, eki 08-20 | KVKK maddeleri K1-K6 | **KISMEN.** K2, K4 ve K5 canlıda (belgenin kendi notu :89-93). K1 (yasal metin) ve K3 hâlâ açık ve avukat paketinde takip ediliyor (`03-PO-ELLE-ISLER.md:130` "⚖️ AVUKAT PAKETİ") | `docs/otonom/03-PO-ELLE-ISLER.md` §"⚖️ AVUKAT PAKETİ" (:130) + `docs/otonom/01-KARARLAR.md` KARAR-47 | 📸 **DONDUR** |
| `04-13-admin-bulgusu.md` | 73 | 2026-08-11, eki 08-20 | STK admin panelindeki 13 bulgu | **BÜYÜK ÖLÇÜDE BİTTİ** (belgenin kendi notu :13-18). Açıkta kalanların kuyrukta karşılığı var: bulgu #8, #10 ve #13 (cevap tipi) → `00-KUYRUK` **F-12** (:212, 🔴 KARAR-21); etiket havuzu → `00-KUYRUK:236` (G3-19 notu); panel kararlarının statüsü → **AN-35** (:510). #2, #3 ve #5 (tasarım kararları) için kuyrukta satır bulunamadı (**TEYİT GEREK**) | `00-KUYRUK.md` F-12 · AN-35 · `00-KARAR-TAKIP.md` md.13 | 📸 **DONDUR** |
| `05-bekleyen-kararlar-ve-manuel.md` | 90 | 2026-08-11, ekleri 08-14 ve 08-20 | Karar bekleyen teknik işler, PO'nun elle yapacakları, unutulmuş niyetler | **HAYIR** (liste olarak). Belge kendi notunda (:86-90) canonical kaynağı `00-KARAR-TAKIP` olarak gösteriyor. O kaynağın da aktif iş rolü kuyruğa geçti (`CLAUDE.md` "AKTİF İŞ KAYNAĞI TEKTİR"). Elle işler bugün `03-PO-ELLE-ISLER.md`'de, kararlar `01-KARARLAR.md`'de | `docs/otonom/01-KARARLAR.md` (DA merge olunca: `01-CEVAPSIZ.md`) · `docs/otonom/03-PO-ELLE-ISLER.md` | 📸 **DONDUR** |
| `06-devir-kilavuzu.md` | 79 | 2026-08-11, ekleri 08-14 ve 08-20 | Yeni oturumun ilk turu ve doğrulama komutları | **HAYIR.** Okuma sırası `07` → `09-DURUM` → `10-yol-haritasi` şeklinde; `10-yol-haritasi` artık iş kaynağı değil (`CLAUDE.md` "AKTİF İŞ KAYNAĞI TEKTİR"). "Sıradaki iş = KVKK ve 13 bulgu" (:131-134) ifadesi bayat. "PR aç, MERGE ETME" (:139,141) bugünkü kapı politikasıyla çelişiyor (`CLAUDE.md:25-45`). `devir-analizi-2026-09-21.md` §6.1 bu çelişkiyi zaten işaretlemişti | — | ✍️ **YENİDEN YAZ** (tek yaşayan giriş belgesi) |
| `07-oturum-gunlugu.md` | 189 | 2026-09-09 → 2026-09-20 (TUR AA) | Son 5 oturumun kaydı + `gunluk/` indeksi | **Günlük, tarihsel kayıt.** 09-20'den sonra yazılmadı. AB, AC, BB, BC, BE, BG, I+Y ve 09-23 turları yalnız `02-ILERLEME.md`'de. Başlığında 🔄 damgası var (:3), bu yanlış izlenim veriyor. Bayat kısımlar: :116 ve :133 "untracked" (bugün izleniyor), :117 ve :138 "KARAR-1..11 cevapsız" (KARAR-10 cevaplandı, `01-KARARLAR.md:30`), :17 ve :28-30 "son 3 oturum" (gerçekte 5). Hâlâ geçerli olan: :42-71 migration yöntemi ve yedek kanıtı (`operasyonel-hazirlik-2026-09-19.md:225,256,272` bu kısma atıf veriyor) | `docs/otonom/02-ILERLEME.md` | 📸 **DONDUR (günlük)**. Not yalnız "güncel durum için 02-ILERLEME" |
| `08-oturum-tezi-2026-08-28.md` | 170 | 2026-08-28, eki 08-29 | Kararların arkasındaki muhakeme: DISC→Big Five, arketip, Likert yerine senaryo, çürütülen varsayımlar, yöntem dersleri | **Muhakeme kısmı geçerli** (:26-106, :139-155). `icerik-mutabakati-2026-09-23.md:380` gerekçe olarak :32'ye atıf veriyor. "Sonraki oturum" talimatları (:92-98, :157-167) bayat; yerine 00-KUYRUK aşamaları geçti | **YOK** (tarihsel) | 📸 **DONDUR** (başlık damgası zaten var) |
| `gunluk/oturum-2026-08.md` | 715 | 2026-08-14 → 08-30 | 34 oturumluk günlük arşivi | Tarihsel. 📸 damgası zaten var (:1-9). `07`'den aynen taşındı; kayıpsızlığı md5 ile kanıtlanmış (`00-BELGE-HARITASI.md:539-550`). İçindeki kalıcı kurallar (9 aday grep'le arandı) canonical belgelerde bulundu | `docs/otonom/02-ILERLEME.md` (güncel) | 📸 **DONDUR (günlük)**. Kısa not eklenir |
| `gunluk/oturum-2026-09.md` | 527 | 2026-09-01 → 09-09 | 17 oturumluk günlük arşivi | Tarihsel. 📸 damgası zaten var. Tek commit'i oluşturma commit'i (`dfb2fe4`) | `docs/otonom/02-ILERLEME.md` | 📸 **DONDUR (günlük)**. Kısa not eklenir |

**Toplam:** 🔄 1 (01) · ✍️ 1 (06) · 📸 8 (02, 03, 04, 05, 07, 08, gunluk ×2).

## 01: satır ayrımı (geçerli / bayat)

| Satır | İçerik | Durum | Kanıt |
|---|---|---|---|
| :22-25 | Kullanıcı kim, dürüst pushback | ✅ geçerli | `CLAUDE.md` "Dürüst pushback" + "Karar kartı biçimi — PO teknik bilmiyor" |
| :15-16, :27-31 | Mod adları 🔵 PLANLA / 🟢 BYPASS / 🟠 MANUEL-ONAY | ❌ bayat | `CLAUDE.md` "MOD ETİKETİ": 🟩 PLANLA / 🟥 BYPASS. Daireler artık kapı anlamında |
| :29, :56 | "PR aç, MERGE ETME, merge PO'da" | ❌ bayat | `CLAUDE.md:25-45`: 🟢 kapıda doğrulama listesi tamsa merge edilir. Bulut hiçbir kapıda merge edemez |
| :37-46 | Prompt standardı, 8 unsur | ✅ geçerli (tarz) | Çelişen kural bulunamadı. Güncel promptlar da BÜYÜK RESİM, MOD ve KANIT unsurlarını taşıyor |
| :50 | "Neon eu-west-2/İrlanda" | ❌ bayat | `CLAUDE.md` "Ortam / Veritabanı": eu-west-2 = **Londra/Birleşik Krallık** (madde 92). Ayrıca canlı DB kimliği tartışmalı: `CLAUDE.md` "ÇELİŞKİ (2026-09-21)" |
| :52-55 | Seed yasağı ve güvenli liste | ✅ geçerli (08-23 notuyla) | `CLAUDE.md` "CANLI = LOKAL AYNI DB" |
| :58-66 | Tarz kuralları | ✅ geçerli | `CLAUDE.md` "Çalışma Sözleşmesi" · "Kişi Adı Yasağı" · "Dil" |
| :68-79 | verify, branch ve submodule sırası | ✅ geçerli | `CLAUDE.md` "Push Öncesi", "Submodule Senkronizasyonu" |
| :81-86 | Hata felsefesi | ✅ geçerli | `CLAUDE.md` "Hata Felsefesi" |
| :89 | "Her iş tamamlanınca 09-DURUM güncellenir" | ❌ bayat | `CLAUDE.md` "Belge senkronu — SONA, tek sefer" (otonom turda kuyruğun sonunda tek PR) |
| :90-93 | Belge düzeltme deseni, fetch önce | ✅ geçerli | `CLAUDE.md` "Belge Düzeltme Deseni", "Git Fetch Önce" |
| :95 | "Sonra 02-proje-durumu, iş için 06" | ❌ bayat | 02 donduruldu. Giriş belgesi artık 06 |

## Beklenen eşlemelerde düzeltme gerekenler (tur talimatına göre)

- **"Bir kalemin durumu için `00-KART-INDEKSI.md`":** **Kısmen doğru.** `00-KART-INDEKSI.md` kendisi 📸 DONDURULMUŞ (2026-09-21) ve "DURUM TUTMAZ, YÖNLENDİRİR" diyor (:3-8). Aktif bir iş kaleminin durumu `00-KUYRUK.md`'dedir (`CLAUDE.md` "AKTİF İŞ KAYNAĞI TEKTİR"). İndeks yalnız eski bilanço kartlarından kuyruğa geçişi gösterir. Kılavuza bu ayrımla yazıldı.
- **"`00-SIRADAKI` ve `01-CEVAPSIZ` + `npm run otonom:turet`":** **Komut adı doğrulandı**: `"otonom:turet": "node scripts/otonom-turet.mjs"` (DA dalının `package.json:8` satırı). Ama `main`'de yok. Kılavuz bunu "DA merge olunca" koşuluyla yazdı.
- **"Remote Control" modu:** Güncel hiçbir belgede tanımı yok. Satır `OTONOM-PROMPT.txt`'ye PR #200 ile girmiş, `2d84138` "PO güncellemesi"nde çıkarılmış (`git log -S REMOTE -- docs/otonom/OTONOM-PROMPT.txt`). Kılavuzdaki tabloya git geçmişinden alınarak **TEYİT GEREK** notuyla konuldu.

## Bulunan kural çelişkisi (bu turda ÇÖZÜLMEDİ, kapsam dışı)

- `07-oturum-gunlugu` fiilen 09-20'de durdu. Buna rağmen iki yer hâlâ ona yazmayı söylüyor:
  - `OTONOM-PROMPT.txt:325` ("docs/devir/ oturum gunlugu: bir kayit")
  - `docs/kararlar/konu/belge-duzeni-rehberi.md:107,148,166` ("oturum bitince → 07'ye bölüm")
- Oturum kaydının bugünkü fiilî yeri `02-ILERLEME.md`.
- `OTONOM-PROMPT` PO'nun her turda aynen gönderdiği metin, rehber de kalıcı kural belgesi. İkisi de bu turda **değiştirilmedi**; karar PO'nun.
