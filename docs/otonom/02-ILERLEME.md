# 02-ILERLEME — Otonom Tur İlerleme Defteri

> PO'nun turdan sonra okuyacağı TEK dosya. En baştaki "TUR ÖZETİ" bölümü kapanışta doldurulur.
> Önceki haftalar: aşağıdaki HAFTA DİZİNİ (haftalık döndürme — OTONOM-PROMPT § AKTİF/ARŞİV AYRIMI (d)). Bu dosyada yalnız 2026-W44.

## HAFTA DİZİNİ
| Hafta | Dosya | Ana tema | Neden o işler |
|---|---|---|---|
| 2026-W38 (14-20 Eylül) | `docs/otonom/arsiv/02-ILERLEME-2026-W38.md` | Otonom motorun ilk turları: bilanço devri (AŞAMA F), panel denetimi (P), uçtan uca yolculuk (U) ve ilk 🟢 işler (TUR 1-5, Z, AA, AB) | Sohbetten dosyaya geçiş: işler tek kuyruğa alındı ve PO yalnız karar verecek şekilde ajan kuyruğu kendi işlemeye başladı |
| 2026-W39 (21-27 Eylül) | `docs/otonom/arsiv/02-ILERLEME-2026-W39.md` | Devir analizi + dört konsey (GV/PS/IC/YN) kuyruğa · KARAR cevapları (KARAR-80 çelişki paketi dahil) · 4 renk kapı ve uzun çalışma kipi · 209 BITTI biriminin son doğrulaması · AJ güvenlik/KVKK negatif test kovaları | Altı ayrı plan belgesi PO önceliğini 21 gün kuyruktan kaçırmıştı; turlar erken duruyordu; "BITTI" denen işlerin bir kısmı koda karşı tutmuyordu |
| 2026-W40 (28 Eylül → 4 Ekim) | `docs/otonom/arsiv/02-ILERLEME-2026-W40.md` | T1 güvenlik/KVKK/veri kaybı işleri (AJ-51…AJ-87) · belge düzeni (GÖREV 2.x: bağlam ön ekleri, kart indeksi senkronu, duruma göre bölme) | Çıkış öncesi kalan güvenlik açıkları kapanıyor; sıcak dosyalar her turda gereksiz içerik okutuyordu |

| 2026-W43 (19-25 Ekim) | `docs/otonom/arsiv/02-ILERLEME-2026-W43.md` | PO NOTU 2026-10-21 + EK: 9 kartın CEVAP'ı kart dosyalarına aktarıldı, KARAR-143 açıldı (yalnız belge) | PO strateji katmanı üzerinden toplu karar verdi; uygulama normal tura bırakıldı |
| 2026-W44 (26 Ekim →) | bu dosya | PO NOTU 2026-10-21 kararlarının açtığı işler kuyruğa alınıp öne çekildi (§ AŞAMA PN) · Windows/Cursor ortamında araç eksikliği | PO "açtıkları işleri kuyrukta öne al" dedi; bu bilgisayarda node/gh/python olmadığı için kod işi merge edilemiyor |

## TUR ÖZETİ — 2026-10-27 · Windows/Cursor (PO bilgisayarı) · DURDU K1-a (bu ortamda yapılabilir iş kalmadı)

**BITTI ve CANLIDA: 0 iş** — bu turda kod değişikliği yok, canlıya bir şey çıkmadı. Kullanıcı ekranında değişiklik YOK.
**YAPILAN (yalnız belge, push edildi):** PO NOTU 2026-10-21 + EK'teki 9 kararın açtığı 24 iş `00-KUYRUK.md` § ⭐ AŞAMA PN'de en üste alındı (13'ü KARAR-BEKLEYEN'den döndü, 11'i yeni; I-18 + IC-13 KARAR-95 gereği **IPTAL(PO)**); PN-07 (KARAR-63'ün C ayağı) KARAR-62'yi bekliyor; 9 kart arşive; KİLİT HARİTASI ve indeks güncellendi; 02-ILERLEME W40 + W43 arşive döndürüldü; git kimliği kalıcı ayarlandı.
**KARAR BEKLİYOR:** KARAR-143 (iki menti arketip adı — 4 işin ad ayağı) · 🔵 EVET/HAYIR: KARAR-96 · 97 · 98 · 99 · 106 · 107 · 111 · 116 · 128 · 134 · 135 · 137 · 139 · 140 · 141 · 142 · ürün: 136 · 138 · toplam cevapsız kart 113.
**BASARISIZ: 0.** Kod işi başlatılmadı — sebep: bu bilgisayarda `node`/`npm`, `gh`, `python` yok → verify, bekçi, PR ve merge yapılamıyor (PO NOTU md.2).
**CANLIDA KONTROL EDİLECEKLER:** yok (merge yok). `/health` bu turda sorgulanmadı (değişiklik olmadığı için).
**PO'NUN KENDİ YAPMASI GEREKENLER:** `03-PO-ELLE-ISLER.md` — en kritik 3: (1) ⭐ YENİ: bu bilgisayara Node 22 + GitHub CLI + Python kur ya da oturumu VPS'te başlat (en üst madde, komutlar yazılı) · (2) canlı `DATABASE_URL` hangi sunucu teyidi · (3) KARAR-143'e cevap (öneri A: "Gezgin" + "Adım Atan").
**KUYRUK SON DAĞILIMI (AŞAMA PN):** 🟢 18 satır (15'i hemen çalışılabilir; IC-14 · I-01 · I-11 kısmi kilitli) · 🔵 4 (U-12B · U-12C · U-13C · F-09) · IPTAL(PO) 2 · 🔴 1 (PN-07, KARAR-BEKLEYEN). Kuyruğun geri kalanı önceki turla aynı (önceki dağılım: `docs/otonom/arsiv/02-ILERLEME-2026-W40.md` başı).
**BACKEND:** pointer `358e085` = backend origin/main `358e085` (eşit; değişiklik yok).
**STASH:** yok.
**Bekçi:** lokalde çalışmadı (python3 yok); CI docs-guard `b299fc7` için YEŞİL (run 40469273751). UYARI ayrıntısı araçlı oturumda.
**Limitin en çok gittiği yer:** uzun kuyruk satırlarını aynen taşımak için yapılan satır düzeyinde belge cerrahisi.

## TUR BAŞLANGICI — 2026-10-27 · Windows/Cursor (PO bilgisayarı) · uzun çalışma kipi

- Başlangıç: 2026-10-27 · çatı main `77c9c73` · backend pointer `358e085`. Çalışma ağacı temiz, stash yok.
- Kalan 🟢 BEKLIYOR (başlangıç, PN eklenmeden): 00-SIMDI'ye göre hepsi kilitli/notlu (27). PN eklendikten sonra çalışılabilir 🟢: 15 (Y1-B8 · U-12 · U-13 · U-15 · AN-50 · AN-51 · PN-06 · PN-03 · PS-03 · I-12 · PN-01 · PN-02 · PN-04 · PN-05 · IC-14 · I-01 · I-11 · PN-08 — I-11/IC-14/I-01 kısmi kilitli) · yeni 🔵: U-12B · U-12C · U-13C · F-09.
- Git kimliği tanımlı değildi → PO NOTU md.3 gereği kalıcı (global) ayarlandı: `user.name zahidsamiata` · `user.email zahidsamiata35@gmail.com`.
- ⛔ **ORTAM ENGELİ:** bu bilgisayarda `node`/`npm`, `gh` ve `python` YOK (`Get-Command` boş; `python` = Microsoft Store kısayolu, çalışmıyor). Sonuç: `npm run verify` koşamaz · bekçi (`scripts/belge-bekci.sh`, python3 ister) koşamaz · PR açılamaz · merge yapılamaz. PO NOTU md.2 gereği 🟢 kod işi merge EDİLMEZ; PR bile açılamadığı için kod işi bu oturumda başlatılmadı (doğrulanamayan, PR'sız dal bırakmak yerine). Belge (docs/otonom) commit'leri muaf → yapıldı. Çözüm adımı 03-PO-ELLE-ISLER'e yazıldı.

## PO NOTU 2026-10-21 + EK — kuyruğa alındı (2026-10-27)

- **NE:** 9 cevaplı kartın açtığı işler `00-KUYRUK.md` § ⭐ AŞAMA PN'ye alındı ve en üste çekildi (öncelik satırı bölüm başında). KARAR-BEKLEYEN'den dönen 13 satır: IC-14 · F-09 · PS-03 · I-12 · I-01 · I-11 · AN-50 · AN-51 · U-12 · U-13 · U-15 (kapı cevaba göre güncellendi) + I-18 · IC-13 (**IPTAL(PO)**, KARAR-95 "Hiçbiri"). Yeni satırlar (ajan-ekledi): Y1-B8 (kuyrukta satırı yoktu) · U-12B · U-12C · U-13C · PN-01…PN-06 · PN-08 (aktif) · PN-07 (🔴 KARAR-62, KARAR-BEKLEYEN). Aktif satır notları: AN-10 kalan ayak açıldı (AN-50 ile tek PR) · IC-10 / AN-05 ad ayağı artık KARAR-143'ü bekliyor.
- **KARTLAR:** KARAR-45 · 57 · 63 · 64 · 82 · 83 · 84 · 95 · 101 → `docs/otonom/arsiv/kararlar/` (git mv, metin aynen + İŞLENDİ notu); indekste ✅ bölümüne (bekleyen 122 → 113 · cevaplanmış başlığı gerçek sayıya göre 32). KİLİT HARİTASI: 7 işaretçi kalktı, KARAR-62 işaretçisine PN-07 eklendi, KARAR-143 işaretçisi eklendi.
- **NEDEN:** PO NOTU 2026-10-27 md.4 ("açtıkları işleri kuyrukta öne al"). Satırlar 5c-n "geri dönüş yeri" yerine PN bölümünde — PO talimatı; eski bölüm her satırın Not'unda.
- ⚠️ **Strateji notu:** KARAR-83'te kartın C seçeneği "yalnız platform yöneticisi" idi; CEVAP metni C'yi "rol tarihçesi" olarak tanımlıyor → CEVAP metni uygulandı (U-13C). Farklı niyet varsa PO düzeltir.
- **PO NOTU metni (01-KARARLAR § ✍️ PO NOTU'ndan AYNEN taşındı, alan boşaltıldı):**


> ⚙️ Ajan durumu (2026-10-21): aşağıdaki not AYNEN yazıldı; 6 kararın CEVAP'ı kart dosyalarına aktarıldı (KARAR-101 · 64 · 95 · 57 · 45 · 63 → indekste ✍️). KARAR-45'in "yeni 2 ad"ı için KARAR-143 açıldı. Uygulama normal otonom turda; not, normal tur işleyince 02-ILERLEME'ye kaydedilip boşaltılır.

```text
PO NOTU · 2026-10-21 · strateji katmanı üzerinden (PO'nun sohbetteki cevapları)

KARAR-101 → B (genişletilmiş, PO tarifi). Onay bekleyen herkes şifre, Google ya da LinkedIn ile giriş yapabilir; iki giriş yolu eşit davranır. Kayıt sürecinin tamamını doldurabilir: kişilik testi (8 soru), mentör/menti soruları, profil. Eşleşme, mentör listesi, mesaj, randevu, talep ve anlaşma yönetici onayına kadar KAPALI (varsayılan kapalı, izin listesiyle). Geçerli davetle gelen onay beklemez (bu zaten var: authController register approvalStatus + oauthService U-06). PR backend #164 + çatı #343 bu kapsama göre yeniden yazılır.

KARAR-64 → C (Kişilik). Kullanıcıya görünen her yerde "kişilik" kullanılır.

KARAR-95 → Hiçbiri; kriz algılama/bildirim/yardım ekranı yapılmaz. KURAL: hiçbir metin (sertifika, kurum sayfası, pazarlama, belge) platformda bir kriz prosedürü ya da algılama sistemi olduğunu vaat etmez. Sertifika KONU 10 mentörün kişisel davranışını (dinle, ciddiye al, profesyonele yönlendir) öğretmeye devam eder. I-18 ve IC-13 "yapılmayacak" olarak işaretlenir.

KARAR-57 → A (tek havuz, tek formül). PO tasarımı:
(1) İlk girişte yalnız 8 soruluk bölüm etkin; diğer bölümler görünür ama bulanık ve tıklanamaz; 8 soru bitince açılır.
(2) Sonra kişi her sayfaya girdiğinde ekranın ortasında günlük soru çıkar. Kapatma düğmesi var; kapatırsa o gün tekrar sorulmaz.
(3) Soru sınırı yok: her cevaptan sonra sıradaki soru gelir; kişi isterse tek oturumda tüm havuzu bitirir, isterse zamana yayar.
(4) Kayıt 8 sorusu, günlük sorular ve 32 soruluk havuz aynı hesaba girer; tek formül.
(5) /disc-test ayrı bir akış olmaktan çıkar; ona giden düğmeler (mentor/page.tsx, profile/page.tsx, menti/page.tsx) bu akışa bağlanır. Sayfa SİLİNMEZ (silme kuralı).
(6) Profilde ve panelde ilerleme oranı görünür: "Kişilik profilin %X tamamlandı" (cevaplanan / toplam soru). Amaç teşvik. ⚠️ Bu, KARAR-60 (kişinin kendi kişilik puan yüzdesini görmesi) DEĞİLDİR; KARAR-60 avukatı bekliyor ve bu cevapla açılmaz.
(7) Tip değişince bildirim/mesaj yok. Soru ekranında önceden bilgi notu: "Çözdüğünüz sorular eşleşmenizi daha sağlıklı hale getirir; cevaplarınıza göre ana kişilik tipiniz ya da yakın tipleriniz değişebilir." (anlam korunur, ifade düzeltilebilir)
(8) "8 soruyu bitir" kilidi ile "yönetici onayı bekleniyor" kilidi ekranda ayrı nedenlerle yazılır.

KARAR-45 → C. 8 yeni arketip adı kullanılır; "Kâşif" ve onaysız "İz Açan" yeniden adlandırılır. Yeni 2 adı ajan önerir, PO onaylar (yeni kart; kullanıcıya görünen metin).

KARAR-63 → A + C. Herkes ana tipini ve yakın (ikinci) tipini görür; fark azsa "şimdilik" dili. 45/55/60 eşikleri ve "eşik aşılmazsa varsayılan M1/m1" kuralı kaldırılır. Kişilik motoru, kişinin kararsız kaldığı boyutlara odaklı sorular sorarak belirsizliği gidermeye çalışır (günlük soru akışında). Sıra: önce A; C, soru hedefleme motoruna (KARAR-62) bağlı.

AVUKATA AYRILANLAR: ⚖️ işaretli KARAR-3, 31, 38, 47, 72, 75, 91 ve 🔒 KVKK işaretli kartlar şimdilik avukata bırakıldı. Bu kartlara öneri/zorlama yapılmaz; kilitledikleri işler kilitli kalır.
```

### PO NOTU EK · 2026-10-21

> ⚙️ Ajan durumu (2026-10-21): aşağıdaki ek AYNEN yazıldı; KARAR-82 · 83 · 84 CEVAP'ları kart dosyalarına aktarıldı (indekste ✍️); KARAR-101 CEVAP satırının sonuna "GÜNCELLEME (PO NOTU EK 2026-10-21)" eklendi (önceki CEVAP silinmedi). Uygulama normal otonom turda.

```text
PO NOTU EK · 2026-10-21 · strateji katmanı üzerinden

KARAR-101 → GÜNCELLEME (önceki notun "mentör listesi KAPALI" kısmının yerine geçer). Onay bekleyen kişi: giriş yapar, kayıt sürecini tamamlar, 8 soruyu ve günlük soruların tamamını çözer, sistemde gezinip inceleme yapabilir. Mentörleri YALNIZ isimsiz önizleme olarak görür (ör. "Bu programda 12 mentör var: 4'ü yazılım, 3'ü pazarlama"); ad, fotoğraf, profil detayı görünmez. Eşleşme, mesaj, talep, randevu ve anlaşma yönetici onayına kadar KAPALI. Gerekçe: onaylanmamış kişiye mentörlerin kişisel verisi açılmaz.

KARAR-82 → A + B + C. Kurum yöneticisinin iki davet yolu olur: (1) toplu link — 7 gün geçerli, "linki iptal et" düğmesiyle kapatılabilir; (2) kişiye özel, e-postaya bağlı, tek kullanımlık davet. Sıra: önce A + B (çıkış blokeri bunlarla kapanır), C sonra (SMTP'nin canlıda çalıştığı teyit edilince). B/C migration ister → kural gereği yedek + PO onayı.

KARAR-83 → A + C. Kurum yöneticisi kullanıcının rolünü değiştirebilir (MENTOR↔MENTI; yöneticilikten düşürmede hedef rol seçilir — bugünkü "her zaman MENTOR yazma" hatası biter). Rol değişince aktif eşleşmeler OLDUĞU GİBİ sürer. Sistemde önceki rol ve yeni rol görünür (rol tarihçesi). Bir kişi aynı kurumda hem yönetici hem mentör olmak isterse AYRI HESAP açar (hesap değiştirme özelliği yapılmaz; e-posta global benzersiz olduğu için ikinci e-posta gerekir). Rol tarihçesi migration isterse → yedek + PO onayı.

KARAR-84 → B. E-posta çalışmazsa şifre sıfırlama bağlantısını YALNIZ platform yöneticisi üretir; her üretim iz kaydına yazılır.
```

## TUR BAŞLANGICI — 2026-10-27 (2. oturum) · Windows/Cursor (PO bilgisayarı, araçlar kuruldu) · uzun çalışma kipi

- Başlangıç: çatı main `5a128f5` · backend pointer `358e085`. Çalışma ağacı temiz, stash yok.
- Araç teyidi (PO NOTU md.1): `node -v` = v24.22.1 (CI/canlı Node 22 — lokal sonuç ön kontroldür, kanıt CI) · `gh auth status` = zahidsamiata girişli · `py --version` = Python 3.15.2. DATABASE_URL yok ve kurulmaz (K8.3).
- Kalan 🟢 BEKLIYOR (§ AŞAMA PN, çalışılabilir): Y1-B8 · U-12 · U-13 · U-15 · AN-50 · AN-51 · PN-06 · PN-03 · PS-03 · I-12 · PN-01 · PN-02 · PN-04 · PN-05 · IC-14 · I-01 · I-11 · PN-08 · AJ-38 · F-08 · PN-09 (21).

## PO NOTU 2026-10-27 (KARAR-143 · 44 · 12) — kuyruğa alındı (2026-10-27)

- **NE:** üç kartın CEVAP'ı kart dosyalarına aktarıldı (commit `93ad6bf`), sonra işlendi: kartlar `docs/otonom/arsiv/kararlar/`'a (İŞLENDİ notu); indekste ✅ (bekleyen 113 → 110 · cevaplanmış 32 → 35).
- **NEDEN bu işler:** KARAR-44 C (güven ağırlıklı öğrenme + NPS 3. ayda + genel geri bildirim) ve KARAR-12 (FeedbackLog kullanıcıya açılmaz) ile memnuniyet/öğrenme zincirinin kilidi açıldı; KARAR-143 ile 8 arketip adının hepsi belli.
- **§ AŞAMA PN'ye eklenen (aktif):** AJ-38 (başarı oranı check-in'den — KARAR-BEKLEYEN'den döndü, kapı 🟢) · F-08 (sektör paydası — M19 kilidi kalktı, 🟢 +7b) · **PN-09** (öğrenen eşleştirme, 🟢 +7b, migration yok) · **PN-12** (genel öneri/hata bildirimi, 🔵 yeni tablo).
- **KARAR-BEKLEYEN § KARAR-89'a eklenen:** **PN-10** (NPS sorusu 3. ay değerlendirmesine — PO: "hangi kutuya yazılacağı KARAR-89'a bağlıdır") · **PN-11** (periyodik anket + kullanılmayan NPS alanı silme protokolü, PN-10'dan sonra).
- **Kilit kalkan:** IC-14 · I-01 · IC-10 · AN-05 ad ayağı (KARAR-143 ✅: "Merak Eden" · "Yola Çıkan").
- **Kart notları:** KARAR-89'a ajan önerisi (NPS kutusu: `MeetingCheckIn`, migrationsız ara yol `FeedbackLog` phase 3) · KARAR-110 ve KARAR-78 başına "kapsam değişti" notu (cevap yazılmadı).
- **Kod teyidi (envanter):** PO'nun andığı ölçek hatası (0-10 NPS ortalaması ↔ 70 eşiği) kodda ZATEN düzeltilmiş — `backend/src/services/algorithmTuner.ts:48-60` (KR-07); kalan yalnız `backend/README.md:359` örnek değer → PN-10'a yazıldı.
- KİLİT HARİTASI: KARAR-12 · 44 · 143 işaretçileri kalktı; KARAR-89 → 4 iş (KR-08 · AJ-49 · PN-10 · PN-11).

Not metni (AYNEN, `01-KARARLAR.md` § PO NOTU'ndan taşındı):

```text
=== KARARLAR (AYNEN YAZ) ===
KARAR-143 → PO kendi seçimi: "Kâşif" yerine "Merak Eden", "İz Açan" yerine "Yola Çıkan". Menti seti: Rotacı · Merak Eden · Denge Arayan · Yola Çıkan. Kart gövde metinleri değişmez; yalnız ad ve adın geçtiği cümleler.

KARAR-44 → C (PO tasarımı, güven ağırlıklı öğrenme):
(1) Görüşme sonrası check-in puanı eşleşme kombinasyon skoruna OTOMATİK yansır ve sıralamada kullanılır.
(2) Etkisi iki tarafın kişilik profili doluluk oranıyla orantılıdır (cevaplanan / toplam soru); profil az doluyken etki küçük, tam doluyken tam. Amaç: sistemin kişiyi yanlış tipte bildiği dönemde o tipe haksız ödül/ceza yazmamak.
(3) Bir kombinasyon için asgari görüşme sayısına ulaşılmadan öğrenme başlamaz (eşiği ajan belirler, gerekçesiyle belgeler). Öğrenme tek bayrakla kapatılabilir kalır. Haftalık algoritma ayarlayıcı ile bu öğrenme çelişmemeli — ajan tek tutarlı yol önerir ve belgeler.
(4) Memnuniyet puanı (NPS) KALIR ama AYRI ANKET KALKAR: periyodik anket sayfası (/periodic-survey) kaldırılır; NPS sorusu ("Bu mentörlük programını bir arkadaşına önerir misin? 0-10" — anlam korunur, ifade düzeltilebilir) 3. ay görüşme değerlendirmesine TEK SORU olarak eklenir. Tek NPS alanı kalır; hangi kutuya yazılacağı KARAR-89'a bağlıdır — ajan önerisini KARAR-89 kartına ekler. Kullanılmayan NPS alanı ve anket sayfası SİLME KURALI ile kaldırılır (gerekçe → ikame kanıtı → docs/arsiv/silinenler-*.md → karantina → PO'nun ikinci onayı). Ölçek hatası (0-10 ortalamanın 70 eşiğiyle kıyaslanması) düzeltilir. Yönetici KPI'daki NPS kartı ve mentör panelindeki "Ortalama NPS" kartı bu tek kaynaktan dolar; küçük grup gizlilik maskesi korunur. Migration gerekiyorsa yedek + PO onayı.
(5) Yönetici panelindeki "Başarı oranı" kartı görüşme değerlendirmelerinden hesaplanır; NPS ayrı gösterge olarak kalır.
(6) Yeni özellik: herkesin platform için öneri/hata bildirebileceği genel geri bildirim alanı (05-ozellikler-ve-paneller.md'deki "her sayfada hata/öneri bildir" planının tamamlanması). Yazılanları YALNIZ platform yöneticisi okur; kurum yöneticisi ve diğer kullanıcılar görmez.
Not: KARAR-110 ve KARAR-78 periyodik ankete bağlı; anket kalktığı için kapsamları değişti — iki kartın başına not düş, cevap yazma (KARAR-110 avukat bekliyor).

KARAR-12 → KARAR-44 ile birlikte cevaplandı: ikinci geri bildirim kayıt sistemi kullanıcıya açılmaz; görüşme değerlendirme kaynağı check-in'dir; NPS tek alanda, 3. ay değerlendirmesinde toplanır.
=== KARARLAR SONU ===
```

## İŞ KAYITLARI — 2026-10-27 (2. oturum)

- ⚠️ **Sıra sapması:** PN önceliği Y1-B8 → U-12 idi; U-12 (küçük, bağımsız) Y1-B8 haritalaması sürerken önce yazıldı. Y1-B8 aynı oturumda tamamlandı (PR-ACIK).
- ✅ **U-12 BITTI** — backend #312 + çatı #490 merge · 7b ONAY · CI iki repoda yeşil (backend 242 test dosyası; `u12-davet-7-gun.unit` 5 + `u12-davet-join-7-gun` 2 test koştu) · mutasyon: yaş kontrolü geri alınınca negatif test kırmızı. **CANLIDA BAK:** yönetici davet ekranında "Davet Linki (7 gün geçerli)"; 7 günü geçmiş (değişiklikten önce üretilmiş 30 günlük olanlar dahil) bağlantı "Davet linki geçersiz veya süresi dolmuş" der. Canlı: `/health` ok:true · db:up · smtp:verified · site 200.
- ⏳ **Y1-B8 PR-ACIK** — backend #313 + çatı #491: onay bekleyen kişi şifre/Google/LinkedIn ile girer, kayıt sürecini tamamlar; mentörleri yalnız "N onaylı mentör · Alanlar: yazılım (4) …" özetiyle görür; mesaj/talep/randevu/anlaşma/eşleşme/mentör listesi 403 (varsayılan kapalı + izin listesi, `pendingApprovalGate.ts`). 7b ONAY (not 1 '#' bypass düzeltildi). §MUTASYON-CI #314: y1b8 + auth PENDING testleri KIRMIZI ✓. Mutasyon CI'ı `mentor-count-membership` testinin tam eşitlik beklediğini de gösterdi → testte alt-küme eşleşmesine geçildi.
- ⏳ **U-13 PR-ACIK** — backend #315 + çatı #492: Yöneticiler sayfasında "Üye rolleri" (Mentör↔Menti) + "Yöneticilikten çıkar" → yeni rol seçimi. Havuz kartına konmadı (KARAR-133 açık). 7b sürüyor; mutasyon taslağı #316.
- 🧰 Ortam notu: bekçi öz-testleri Windows'ta ortamsal düşüyor (grep 3.0 emoji + `\` yol ayırıcısı); bekçinin repo denetimi ve CI docs-guard yeşil.
- Kalan 🟢 (PN, çalışılabilir): U-15 · AN-50 · AN-51 · PN-06 · PN-03 · PS-03 · I-12 · PN-01 · PN-02 · PN-04 · PN-05 · IC-14 · I-01 · I-11 · PN-08 · AJ-38 · F-08 · PN-09 (18) + PR-ACIK 2 (Y1-B8, U-13).
- ✅ **U-13 BITTI** — backend #315 + çatı #492 merge · 7b ONAY · CI iki repoda yeşil · mutasyon #316 (3 U-13 testi kırmızı). **CANLIDA BAK:** kurum yöneticisi "Yöneticiler" sayfasında "Üye rolleri" → onaylı üyeyi "Menti yap"/"Mentör yap"; "Yöneticilikten çıkar" → "Yeni rolü: Mentör | Menti". Çatı PR'ı #490 merge'ünden sonra submodule pointer çakışması verdi → main birleştirildi, pointer U-13 merge commit'inde tutuldu (ata kontrolü ✓).
- ⏳ **Y1-B8** — backend #313 MERGE (`e69a2c1`); eski #164/#343 gerekçeyle kapatıldı; mutasyon #314 kapatıldı (kanıt #313 yorumunda). Backend CI ilk koşuda `rank-mentors-approval-gate` mesaj eşitliği yakaladı → test kapı 4c mesajına güncellendi. Çatı #491 CI bekliyor.
- ⏳ **U-15** — backend #317 MERGE (`bfe0af9`); 7b ONAY (CSRF: platform çerezi sameSite strict); mutasyon #318 (4 test kırmızı). Çatı #493 main birleştirme + CI bekliyor.
- 🔵 **U-12B PR-ACIK** — backend #319 + çatı #494 (⛔ MIGRATION, yeni tablo `InvitationLink`, yedek gerekmez) · 7b ONAY · **KARAR-144** EVET/HAYIR kartı açıldı. EVET gelince merge + canlı kontrol; sonra U-12C.
- ✅ **Y1-B8 BITTI** — çatı #491 merge (`7d53871`) · canlı yeniden başladı, `/health` ok:true db:up. **CANLIDA BAK:** onay bekleyen kişi şifre/Google/LinkedIn ile giriş yapıp 8 soruya / paneline gidiyor; menti bekleme kartında "N onaylı mentör · Alanlar: …" (isimsiz) ve yöneticinin notu; mesaj/talep/randevu/anlaşma/eşleşme/mentör listesi açılmıyor.
- 🔵 **U-13C PR-ACIK** — backend #320 + çatı #495 (⛔ MIGRATION, yeni tablo `RoleChange`, yedek gerekmez) · 7b ONAY · **KARAR-145** EVET/HAYIR kartı. Neden tablo: rol değişiklikleri bugün yalnız 90 günde silinen sistem günlüğünde.

