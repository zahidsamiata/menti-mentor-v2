> 🔥 SICAK — her otonom turda okunur. Hedefli okuma: OTONOM-PROMPT.txt § 0.4
> TÜR: 🔥 · SON DOĞRULAMA: ❓ içerik denetlenmedi (başlık 2026-09-23 DA turunda eklendi) · TAZELEME TETİKLEYİCİSİ: her tur (ajan Durum/Not günceller; PO iş ekler)
> 🔴 Karar bekleyen işler bu dosyada DEĞİL: § 🔴 KİLİT HARİTASI (işaretçiler) → `00-KUYRUK-KARAR-BEKLEYEN.md` (rutin turda okunmaz). ≥1.500 baytlık satırların eski katmanları: `arsiv/00-KUYRUK-gecmis.md`.

# 00-KUYRUK — Otonom İş Kuyruğu (v2)
Güncelleme: 2026-09-10 · Sahip: PO *(kişi adı kaldırıldı 2026-09-26, YN-13)*

**🔄 YAŞAYAN** (canonical: **TEK aktif iş kaynağı** — otonom motorun okuduğu tek iş listesi)
> ⭐ **Bu belge projenin TEK iş kuyruğudur (2026-09-21).** `10-yol-haritasi.md` ve `00-CIKIS-PLANI.md` 📸 donduruldu; `00-ONCELIK-SIRASI-2026-08-28.md`'nin açık kalemleri **AŞAMA F**, PO'nun "EN ÖN SIRA" içerik bloğu **AŞAMA I**, yol-haritası/karar-takibi devri **AŞAMA Y** olarak buraya alındı.
> ⛔ **Yeni iş başka hiçbir belgeye açılmaz.** Tek istisna kod-dışı işler: `docs/otonom/03-PO-ELLE-ISLER.md`.
Ajan bu dosyayı OKUR, `Durum` ve `Not` kolonlarını günceller. **AJAN-EKLEDİ (K-C, PO 2026-09-26):** ajan, kodda dosya:satır ile DOĞRULADIĞI hata/eksik için `AJ-<sıra>` kimlikli satır EKLEYEBİLİR ve PO onayı beklemeden kapıya göre işler — ayrıntı: § AJAN-EKLEDİ SATIRLAR (dosya sonu).

## Kaynak kısaltmaları (yalnız bu kuyrukta geçenler · GÖREV 2.4, 2026-09-28)
| Kısaltma | Kaynak |
|---|---|
| X §n · X turu · K1-K9 · §6 / §10#n | `docs/raporlar/kesif/uctan-uca-kurum-yolculugu-2026-09-19.md` (uçtan uca yolculuk, "X turu") |
| A1…A16 (AN satırlarında "Kaynak: A12") | `docs/raporlar/kesif/00-ANALIZ-TURU-OZETI-2026-09-23.md` §3 birleşik kuyruk satırları |
| "rapor A5 / B5 / D1 / D11" (KR satırlarında) | `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` (A/B/C/D bulgu kodları; ⚠️ AN satırlarındaki A-kodlarıyla karıştırma) |
| IK · IK(D/F) · IK(A.3) | `docs/raporlar/kesif/icerik-kalitesi-2026-09-23.md` (analiz özeti Bölüm 2) |
| TO · TO §n · TO Y-n / Z-n | `docs/raporlar/kesif/icerik-tam-okuma-2026-09-23.md` (Y-n = o raporun çelişki no, Z-n = karar zinciri; kuyruktaki Y-xx kimlikleriyle karıştırma) |
| OB-n | `docs/raporlar/kesif/oksuz-bulgu-sayimi-2026-09-23.md` (analiz özeti Bölüm 3) |
| PP · PP §6 | `docs/raporlar/kesif/persona-panel-gelisimi-2026-09-23.md` |
| CS raporu (KN-n) · Ç-n | `docs/raporlar/kesif/konu-bilanco-denetimi-2026-09-23.md` (KN = kalem no, Ç = çelişki no) |
| güvenlik / psikometri / içerik / yönetişim konseyi §n | `docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md` · `konsey-psikometri-2026-09-21.md` · `konsey-icerik-2026-09-21.md` · `konsey-yonetisim-2026-09-21.md` |
| KARAR-80/Mn | KARAR-80 (22 çelişki maddesi, hepsi A) — `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` § KARAR-80 |
| madde N · md.N | `docs/kararlar/00-KARAR-TAKIP.md` (madde numarası) |
| Gn-nn (G1-12 …) | `docs/raporlar/bilanco/kararlar/G*.md` kartları (ör. `G1-guvenlik-kvkk.md`) |
| parti N · QA / QD / QE2 / QE3 / QE5 | `docs/raporlar/kod-denetimi/bitti-dogrulama-partiler/` (özet `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md`) |
| K5-Y1 · Y1-B8 / Y1-B9 · K5-Y2 | OTONOM-PROMPT § 14 K5 yedek iş havuzu: Y1 = kod incelemesi teyidi (`docs/raporlar/kesif/kod-inceleme-teyit-dogrulamasi-2026-09-26.md`) · Y2 = BITTI yeniden denetim (`docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md`) |
| E.1c · E.3 ("strateji karar oturumu", "KARAR-70 eki") | teyit — PO strateji karar oturumu 2026-09-23'ün madde kodları; yazılı kaynağı bulunamadı |
| aile: Y-A … Y-G · Y-KR · Y-? | bu dosya § 🟡 AİLE HARİTASI |
| 7b #NNN | o PR'daki bağımsız inceleme yorumu (OTONOM-PROMPT § 7b) |

## Kapılar
> ⚠️ **GÜNCELLEME 2026-09-26 (PO): 4 renk** — tam metin `OTONOM-PROMPT.txt` Bölüm 7 / 7b.

🟢 **AJAN YAPAR + MERGE EDER** — varsayılan. Auth/yetki · KVKK/rıza · matching/skorlama dosyasına dokunuyorsa Bölüm 7b'nin (b) bağımsız inceleme "SONUÇ: ONAY" ve (c) negatif test şartları KENDİLİĞİNDEN eklenir; ayrı renk yok. Merge sonrası canlı kontrol aynen geçerli.
🔵 **AJAN HAZIRLAR, PO'NUN TEK "EVET"İYLE CANLIYA ÇIKAR** — migration · seed (her türü) · canlı veriye yazma · karantina. Akış: kod → PR → 7b incelemesi ONAY → sade Türkçe EVET/HAYIR kartı (`docs/otonom/kararlar/KARAR-NNN.md` + `01-KARARLAR.md` indeks satırı) (kullanıcı ne görür · ne değişir · geri alınır mı · yedeği alınacak tablo) → Durum PR-ACIK. "EVET" → tarihli yedek → merge → canlı kontrol (DB erişimi yoksa merge YOK, `00-SIMDI` Engeller'e yazılır). "HAYIR" → PR kapatılır.
🟡 **YALNIZ PO'NUN ELİYLE YAPILABİLEN İŞ** — sunucu/Dokploy ayarı · hesap açma/anahtar girme · GitHub ayarı · avukat · kuruma görünen/hukuki metnin onayı. Satırın kod kısmı ajan tarafından 🟢 kurallarıyla yapılır; PO kısmı `03-PO-ELLE-ISLER.md`'ye "ne yapılacak + nasıl doğrulanır" biçiminde yazılır. Satır PO kısmı bitene kadar açık kalır.
🔴 **YÖN KARARI BEKLER** — ilgili KARAR cevapsızsa DOKUNMA, atla, sonrakine geç. (Değişmedi.)
Karantina / gerçek silme ayrımı → OTONOM-PROMPT § 7.
⛔ PO'dan ASLA "GitHub'dan merge et" istenmez; sınıflandırıcı reddi → `00-SIMDI` Engeller'e AYNEN, PR-ACIK, başka işe geç.
⚠️ Eski Not'lardaki "🟡 KALIR: …" / "🟡: …" ibareleri GÖREV 2.4'te (2026-09-28) "hassasiyet: …" olarak sadeleştirildi (gerekçe metni korunur, renk iddiası yok); kapı sütunu esastır. Eski hâller `arsiv/00-KUYRUK-gecmis.md`.

## ⛔ ÇIKIŞ BLOKERİ işareti (2026-09-21)

> ✅ **ÇIKIŞ TANIMLANDI (KARAR-69 CEVAPLANDI 2026-09-23: A+B):** ÇIKIŞ = **sistem uçtan uca çalışır VE ilk gerçek dernek mentileriyle kullanır** (B). **ÇIKIŞ BLOKERİ = "ilk kurum + KVKK tabanı için gereken".** Üç kova: **(a) ölçeğe bağlı hukuk** (VERBİS · kurumsal sözleşme · envanter · her metnin avukat onayı) → **ERTELENİR, "ilk kurum" kutusuna kayar, blokeri DEĞİL** · **(b) ilk kullanıcıyla devreye giren** (aydınlatma · açık rıza · silme hakkı · yurtdışı saklama bilgilendirmesi) → **blokeri KALIR** · **(c) kriz kanalı** → hukuk değil GÜVENLİK, ayrı karar (bu kararla kapanmaz). Güvenlik/ana-akış/sessiz-yanlış (T1/T2/T3) blokerleri "ilk kurum" için gerekli olduğundan KALIR. Bu turda gözden geçirme: mevcut ajan blokerlerinin tümü KALDI (hiçbiri saf (a)-kovası değil); yalnız 3 "aday" etiketi bu tanımla KESİNLEŞTİ (AN-03 · AN-30 · PS-02).

Not sütununda **`⛔ ÇIKIŞ BLOKERİ (T…)`** gören iş, **canlıya çıkışı tek başına engeller** — kapı renginden (🟢/🟡/🔴) **bağımsızdır** ve `OTONOM-PROMPT.txt` §4 sırasında **0. öncelikte**, hepsinden önce işlenir.

**Test** (kaynak: `00-CIKIS-PLANI.md` katı testi — o belge 📸 donduruldu ama **ölçüt yerinde kalır**):
- **T1** — yasa/sızıntı/geri alınamaz veri kaybı
- **T2** — ana akış kırılır (başvuru → onay → davet → giriş → eşleşme → randevu)
- **T3** — sessiz yanlış: kimse fark etmez, sistem "çalışıyor" görünür

⚠️ **Varsayılan = ERTELE.** Bir işin bloker olduğu **KANITLANIR**; şüpheyle işaretlenmez.
**Sayı (2026-09-21):** 24 çıkış blokeri — **14'ü ajanda** (bu dosyada işaretli), **10'u PO'da** (`docs/otonom/03-PO-ELLE-ISLER.md` en üstteki tablo). Kaynak: `docs/raporlar/kesif/devir-analizi-2026-09-21.md` §11.

## "Bitti" tanımı
> TEK KAYNAK (AJ-46 · YN-14, 2026-09-27): `CLAUDE.md` § Bitti tanımı buraya atıf yapar.

Bir iş ancak şu üçü varsa ✅:
1. **Kullanıcı görüyor** — ekranda bir şey değişti ya da bir hata kayboldu.
   ⛔ "Backend hazır" · "bileşen yazıldı ama mount edilmedi" · "uç eklendi" → BİTMEDİ.
2. **Testler yeşil** — mevcutlar + yeni davranış için en az bir test (`CLAUDE.md` § MERGE POLİTİKASI kontrol listesi)
3. **02-ILERLEME.md'ye yazıldı** — ne yapıldı, dosyalar, PR, "kullanıcı artık şunu görüyor"

Raporda YAPTIĞINI değil KULLANICININ GÖRECEĞİNİ yaz:
✅ "artık /disc-test açılıyor"   ❌ "loading state düzeltildi"

## ⛔ K-20 ZAMANLAMASI — belge senkronu gerçekten EN SON
K-20 PR'ı, diğer TÜM PR'lar merge edildikten SONRA hazırlanır.
Bir iş merge edilmeden belgeye "CANLIDA" YAZILMAZ; "PR'DA" da yazılmaz —
o iş belge senkronuna kadar beklenir.
Gerekçe (Tur 1'de yaşandı): K-20 PR'ı K-02 merge olmadan hazırlandı, sonra
K-02 merge edildi ama 09-DURUM'a dönülmedi → aynı commit içinde iki belge çelişti.
Kontrol: K-20'yi açmadan önce `gh pr list --state open --author @me` boş olmalı.

## ⏱️ CI BEKLERKEN BOŞ DURMA
CI koşarken poller döngüsüne girme (`sleep`, tekrarlı `gh pr checks`).
CI beklerken SIRADAKİ işin kök sebep analizine başla; merge'leri topluca yap.
Gerekçe (Tur 1'de yaşandı): 32 dakikanın kayda değer kısmı CI beklemekle geçti.
İstisna: turun SON PR'ı (K-20) — orada beklemek doğru, yapılacak başka iş yok.

## Durum kodları
Kod listesi → OTONOM-PROMPT § 2.1b (7 kod).
⭐ **`PR-ACIK`** = iş YAPILDI, PR AÇILDI, ama **MERGE EDİLMEDİ**.
⚠️ `belge-duzeni-rehberi.md` § KURAL 10'daki
`✅·🟡·🔀·⬜·❓·🗑️` **AYRI bir alfabedir** (karar-takip **kart kodları**) — bu liste **kuyruk satırı durumları** içindir;
ikisi karıştırılmaz (YN-07'nin ikinci ayağı).

---

## ŞERİT DAĞILIMI (paralel yazma — dosya sahipliği)

| Şerit | Sahip olduğu alan | İşler |
|---|---|---|
| **Ş1 · Menti akışı** | `app/(dashboard)/disc-test/**` · `app/(dashboard)/learning-journey/**` · `app/(dashboard)/menti/**` · DISC/test bileşenleri | K-02, K-06, K-07, K-09 |
| **Ş2 · Randevu** | `app/(dashboard)/book-meeting/**` · `app/(dashboard)/mentor/availability/**` · `components/organisms/MeetingScheduler.tsx` · `backend/src/controllers/meetingController.ts` · `backend/src/routes/meetingRoutes.ts` | K-03, K-05, K-15 |
| **Ş3 · Profil & KVKK** | `app/(dashboard)/profile/**` · `lib/api/profile.ts` · `backend/src/controllers/onboardingController.ts` · KVKK/veri sayfaları · fotoğraf yükleme | K-04, K-08, K-12, K-17 |
| **Ş4 · Admin & altyapı** | `app/(dashboard)/admin/**` · `backend/src/routes/adminRoutes.ts` · `backend/src/server.ts` · güvenlik ara katmanları · tema/global CSS | K-11, K-14, K-10 |
| **Ş0 · Sıralı** | Birden fazla şeridi ilgilendiren, ortak dosyaya dokunan işler. TEK BAŞINA çalışır, diğerleri beklemez ama onun dosyasına dokunmaz. | K-01, K-13, K-16, K-18, K-19, E-1..E-4, K-20 |

⚠️ Bir iş kendi şeridinin dışına çıkmak zorundaysa → Ş0'a taşı, Not'a yaz.

---

## 🟡 AİLE HARİTASI (2026-09-23, PO onaylı kapı çözümü)
> Kalan 🟡 işler ailelere ayrıldı; aynı aile TEK dalda TEK PR'da işlenir (Y-G hariç). Detay: her satırın Not'unda "aile: Y-x".
- **Y-A** Yetki ve sahiplik · 16 iş · tek PR'da işlenecek
- **Y-B** KVKK metin ve akışları · 21 iş · tek PR'da işlenecek
- **Y-C** Yönlendirme (matching) motoru · 22 iş · tek PR'da işlenecek
- **Y-D** Bildirim ve e-posta · 3 iş · tek PR'da işlenecek
- **Y-E** Oturum · cookie · token · 7 iş · tek PR'da işlenecek
- **Y-F** Geri-dönülmez işlemler · 5 iş · tek PR'da işlenecek
- **Y-G** MIGRATION/SEED · 20 iş · ⛔ GRUPLANMAZ, her biri ayrı PR + yedek + PO onayı
- **Y-?** Aileye oturmayan (belirsiz) · 8 iş · tek tek PO değerlendirmesi (K-14 · F-04 · GV-03 · P-15 · U-01 · AN-06 · AN-18 · AN-19)
- **Y-KR** Kod incelemesi 2026-09-24 · 11 🟡 iş · aileye TOPLANMADI — her biri ayrı PR, öncelik sırası EN ÜST — KR bloğunda (2026-09-25)

---

## 🔴 KİLİT HARİTASI (GÖREV 2.4, 2026-09-28)
> Kapısı 🔴 olan ya da Durumu ATLANDI(karar) olan 64 iş rutin turda okunmasın diye `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md`'ye AYNEN taşındı (kural: OTONOM-PROMPT § 5c (n)). Her KARAR için tek işaretçi; bekleyen iş sayısına göre sıralı. "Aktif kuyrukta ayrıca bekleyen" = satırı bu dosyada kalan, kalan ayağı ya da 🔵 EVET/HAYIR kartı o KARAR'ı bekleyen iş (Not'unda "kilit: kalan ayak KARAR-N bekliyor" yazar). CEVAP gelince bağlı satırlar AYNI commit'te buraya (eski bölümlerine) geri döner.

- KARAR-64 ("Mizaç" mı "karakter" mi "kişilik" mi) → 4 iş bekliyor: I-01, I-11, AN-50, AN-51 · aktif kuyrukta ayrıca bekleyen: AN-10 (kalan ayak: mizaç/karakter/kişilik adlandırması) · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-64
- KARAR-46 (Sertifika içeriğinin hangi sürümü canlıya gidecek) → 4 iş bekliyor: F-14, P-99, AN-03, K-16 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-46
- KARAR numarasız 🔴 (silme protokolü · karar çelişkisi · keşif · açılmamış kart) → 4 iş bekliyor: AN-45, AJ-64, AJ-67, AJ-97 · sahipler: AN-45 → PO (keşif kartı açılmadı, GÖREV 3) · AJ-64 → önce ajan doğrular, sonra PO · AJ-67 → PO (kart taslağı hazır, açılmadı, GÖREV 3) · AJ-97 → PO (silme protokolü; karantina 🔵 EVET kartı açılmadı, GÖREV 3) · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR numarasız 🔴
- KARAR-45 (Arketip adları: hangi metin hangi koda bağlanacak) → 1 iş bekliyor: IC-14 · aktif kuyrukta ayrıca bekleyen: IC-10 (kalan ayak: arketip adları (metinde yer tutucu)), AN-05 (kalan ayak: arketip adları) · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-45
- KARAR-57 (Kullanıcının mizaç sonucunu hangi test belirlesin) → 3 iş bekliyor: F-09, PS-03, I-12 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-57
- KARAR-58 (Eski DISC ↔ yeni Big Five geçiş dönemi) → 2 iş bekliyor: PS-A2, AN-04 · aktif kuyrukta ayrıca bekleyen: PS-A3 (ön koşul PS-A2 üzerinden) · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-58
- KARAR-89 (Görüşme değerlendirmesinin tek kutusu) → 2 iş bekliyor: KR-08, AJ-49 · aktif kuyrukta ayrıca bekleyen: AN-49 (kart KARAR-89 bu işi kilitlediğini söylüyor (tek değerlendirme kutusu)) · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-89
- KARAR-12 (Görüşme geri bildirim kayıt sistemi) → 1 iş bekliyor: AJ-38 · aktif kuyrukta ayrıca bekleyen: AJ-99 (olası ürün sorusu: mentör kendi geri bildirimini görsün mü (uygulayıcı önce kontrol eder)) · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-12
- KARAR-36 (Yarım 3 teknik kalem (`answeredFollowup` · ikiz alan · 2 yedek tablo)) → 2 iş bekliyor: Y-18, AJ-10 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-36
- KARAR-44 (Algoritma kendi sonuçlarından öğrensin mi + hangi memnuniyet "gerçek") → 2 iş bekliyor: F-08, AJ-38 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-44
- KARAR-50 (Kuralların "geçersizleşme koşulu" zorunlu olsun mu) → 2 iş bekliyor: YN-04, YN-05 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-50
- KARAR-61 (Yeni formül arketip motoruyla aynı anda mı açılsın) → 2 iş bekliyor: F-11, AJ-92 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-61
- KARAR-72 (Ghost / "kalıcı red" özelliği olacak mı) → 2 iş bekliyor: KR-20, AN-33 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-72
- KARAR-88 (Hakkımızda / İletişim + yüzen WhatsApp) → 2 iş bekliyor: Y-07, Y-11 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-88
- KARAR-95 (Kriz kanalı — güvenlik sorusu olarak yeniden) → 2 iş bekliyor: I-18, IC-13 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-95
- KARAR-97 (🔵 EVET/HAYIR — U-18 mentör mesaj talebini reddedebilsin (veritabanına 1 yeni alan)) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: U-18 (🔵 PR-ACIK — EVET/HAYIR kartı), E-3 (kalan ayak: bağlamsal geri bildirim kartı, U-18 üzerinden) · ayrıntı: kart `docs/otonom/kararlar/KARAR-097.md`
- KARAR-103 (Eski planlardaki 13 yapılmamış özellik — hangileri yapılsın) → 1 iş bekliyor: AJ-11 · aktif kuyrukta ayrıca bekleyen: AJ-78 (kalan ayak: dönemsel tarih aralığı (md.10)) · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-103
- KARAR-110 (Periyodik anket (ilişki geneli değerlendirme) ne olsun) → 2 iş bekliyor: AJ-14, AJ-49 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-110
- KARAR-2 (Profile serbest bağlantı alanı) → 1 iş bekliyor: K-17 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-2
- KARAR-3 (Sertifika "bildirim yükümlülüğü" hukuki metni) → 1 iş bekliyor: K-16 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-3
- KARAR-4 (Kriz destek kaynağı metni) → 1 iş bekliyor: K-16 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-4
- KARAR-5 (Öğrenme yolculuğu seed canlıya) → 1 iş bekliyor: K-18 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-5
- KARAR-11 (Kullanılmayan/mükerrer kod ne olsun) → 1 iş bekliyor: E-5 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-11
- KARAR-15 (Çok-kuruma üye kurumlar arası geçiş) → 1 iş bekliyor: AJ-10 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-15
- KARAR-19 (KVKK geri-dönülmez yetkiler kümesi) → 1 iş bekliyor: F-07 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-19
- KARAR-21 (STK anket cevap tipi (answerType)) → 1 iş bekliyor: F-12 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-21
- KARAR-30 (Senaryo isimleri: seed'den önce mi sonra mı) → 1 iş bekliyor: I-09 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-30
- KARAR-38 (Sunucu ülkesi + KVKK aydınlatma metni) → 1 iş bekliyor: GV-09 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-38
- KARAR-40 (Eski `POST /api/meetings` ucu: düzelt mi karantina mı) → 1 iş bekliyor: V-15 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-40
- KARAR-41 (Mentörün bir kontenjanı olsun mu) → 1 iş bekliyor: P-15 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-41
- KARAR-47 (Hukuki metin paketi — avukata tek seferde ne sorulacak) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AN-41 (PO kısmı: avukat paketi) · ayrıntı: kart `docs/otonom/kararlar/KARAR-047.md`
- KARAR-48 (Test sonucu ve eşleşme skoru kullanıcıya nasıl anlatılsın) → 1 iş bekliyor: AN-20 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-48
- KARAR-51 (4 "yaşayan ama ölü" belge dondurulsun mu) → 1 iş bekliyor: YN-06 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-51
- KARAR-52 (Taşınan KURAL 8 mükerreri: hangi gövde kalsın) → 1 iş bekliyor: YN-02 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-52
- KARAR-54 (Mentör/menti kart havuzu 5 tasarım kararı) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AJ-90 (kalan ayak: sayfa başına kart sayısı (cevap yoksa 18)) · ayrıntı: kart `docs/otonom/kararlar/KARAR-054.md`
- KARAR-56 (Menti aynı hafta birden fazla mentöre talep) → 1 iş bekliyor: AN-21 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-56
- KARAR-62 (İlk ölçüm: herkes aynı mı, adaptif mi) → 1 iş bekliyor: AN-04 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-62
- KARAR-67 (Yönetici drill-down serbest-metin nota inmeli mi) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AN-49 (önce KARAR-67: kim görür (drill-down)) · ayrıntı: kart `docs/otonom/kararlar/KARAR-067.md`
- KARAR-73 (Değerlendirme AŞAMA 2/3 otomatik pasifleştirme) → 1 iş bekliyor: AN-34 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-73
- KARAR-74 (Kurum (tenant) kalıcı silme hakkı (G1-29)) → 1 iş bekliyor: AN-37 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-74
- KARAR-75 (KVKK yasal metinlerinde kişi adı: yasak mı istisna mı) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AN-41 (bağlı: yasal metinde kişi adı (Ç-16)) · ayrıntı: kart `docs/otonom/kararlar/KARAR-075.md`
- KARAR-76 (`Tenant.verifiedBy` alanı ne olsun (silme protokolü boşluğu)) → 1 iş bekliyor: AN-08 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-76
- KARAR-78 (Dönemlik anket: bağla / karantina / beklet) → 1 iş bekliyor: KR-11 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-78
- KARAR-79 (Zamanlanmış iş tetikleme yetkisi kimde) → 1 iş bekliyor: KR-05 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-79
- KARAR-82 (Davet bağlantısı modeli) → 1 iş bekliyor: U-12 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-82
- KARAR-83 (Rolü kim, nasıl değiştirir) → 1 iş bekliyor: U-13 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-83
- KARAR-84 (E-posta yokken şifre sıfırlama) → 1 iş bekliyor: U-15 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-84
- KARAR-85 (Yeni ortamda DISC soru havuzu) → 1 iş bekliyor: U-17 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-85
- KARAR-87 (Birden çok platform yöneticisi olacak mı?) → 1 iş bekliyor: AN-38 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-87
- KARAR-93 (Üyeyi kurumdan çıkarma — 30 gün sonra kişilik verisi silme onayı) → 1 iş bekliyor: Y-14 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-93
- KARAR-94 (Dışa aktarım hakkı (GV-17) çıkış blokeri olsun mu) → 1 iş bekliyor: GV-17 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-94
- KARAR-96 (🔵 EVET/HAYIR — AN-30 ayrı ayrı rıza kutuları (veritabanına 6 yeni rıza türü)) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AN-30 (🔵 PR-ACIK — EVET/HAYIR kartı) · ayrıntı: kart `docs/otonom/kararlar/KARAR-096.md`
- KARAR-98 (🔵 EVET/HAYIR — AN-26 yanıtsız mentöre hatırlatma + yöneticiye bildirim (veritabanına 3 yeni alan)) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AN-26 (🔵 PR-ACIK — EVET/HAYIR kartı) · ayrıntı: kart `docs/otonom/kararlar/KARAR-098.md`
- KARAR-99 (🔵 EVET/HAYIR — AN-02 iki soru metnindeki yazım hatası canlıda düzeltilsin mi) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AN-02 (🔵 PR-ACIK — EVET/HAYIR kartı) · ayrıntı: kart `docs/otonom/kararlar/KARAR-099.md`
- KARAR-102 (Kayıttan sonra hemen giriş mi, önce e-posta doğrulaması mı (e-posta sızıntısının son kalıntısı)) → 1 iş bekliyor: GV-12 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-102
- KARAR-105 (Kurumlar arası anonim karşılaştırma: izni kim açar, hangi sayılar paylaşılır) → 1 iş bekliyor: AN-31 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-105
- KARAR-106 (🔵 EVET/HAYIR — AN-52-1 ürün-içi anket cevap tablosu (yeni tablo, mevcut veri etkilenmez)) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AN-52 (🔵 PR-ACIK — EVET/HAYIR kartı (AN-52-1)) · ayrıntı: kart `docs/otonom/kararlar/KARAR-106.md`
- KARAR-107 (🔵 EVET/HAYIR — dondurulmuş `interactionStyle` alanının yazılması kapatılsın mı (karantina)) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AN-12 (🔵 PR-ACIK — EVET/HAYIR kartı) · ayrıntı: kart `docs/otonom/kararlar/KARAR-107.md`
- KARAR-109 (Mentörlük anlaşması taslağını kim başlatabilsin) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: E-3 (kalan ayak: anlaşma taslağı (sahibi E-3)) · ayrıntı: kart `docs/otonom/kararlar/KARAR-109.md`
- KARAR-111 (🔵 EVET/HAYIR — müsaitliğe görüşme türü + süre (K-15, ⛔ MIGRATION)) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: K-15 (🔵 PR-ACIK — EVET/HAYIR kartı) · ayrıntı: kart `docs/otonom/kararlar/KARAR-111.md`
- KARAR-112 (Kurum logosu hangi adreslerden gösterilebilsin? (AJ-22 kalanı — izleme pikseli)) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AJ-22 (kalan ayak: logo yalnız izinli kaynaktan) · ayrıntı: kart `docs/otonom/kararlar/KARAR-112.md`
- KARAR-113 (Sertifika sınavında her seferinde kaç konu sorulsun, baraj neye göre? (AJ-34 / madde 149)) → 1 iş bekliyor: AJ-34 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-113
- KARAR-116 (🔵 EVET/HAYIR — eski kişilik kartlarındaki ham test puanları temizlensin mi (AJ-50)) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AJ-50 (🔵 PR-ACIK — EVET/HAYIR kartı) · ayrıntı: kart `docs/otonom/kararlar/KARAR-116.md`
- KARAR-127 (Sertifikadan önce "Mini Akademi" (4 kısa modül) yapılsın mı) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AJ-101 (kalan ayak: Mini Akademi ürün kısmı) · ayrıntı: kart `docs/otonom/kararlar/KARAR-127.md`
- KARAR-128 (🔵 EVET/HAYIR — 13 durum alanı veritabanında enum (AJ-77, migration)) → 0 iş KARAR-BEKLEYEN'de · aktif kuyrukta ayrıca bekleyen: AJ-77 (🔵 PR-ACIK — EVET/HAYIR kartı) · ayrıntı: kart `docs/otonom/kararlar/KARAR-128.md`

---

## ⛔⛔⛔⛔ EN ÜST — BITTI DOĞRULAMASI: GÜVENLİK/KVKK KALANLARI (AJ, 2026-09-27)
> Bu bölümde **38 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-28).
Kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` (209 BITTI biriminin son doğrulaması). Bu bölümdeki satırlar güvenlik/KVKK etkili kalanlardır; diğer kalanlar § AJAN-EKLEDİ SATIRLAR (AJ-33…AJ-48). ⛔ Bu satırlar 2026-09-27 doğrulama oturumunda YAPILMAZ (sonraki tur). Eski BITTI satırları arşivde değişmeden kalır; her satırın Not'unda çapraz bağlantı var.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AJ-22 | Ş0 | **Tarayıcı güvenlik politikası (CSP) yalnız rapor modunda; kurum logosu herhangi bir https adresine konabiliyor** — izleme pikseli üyelerin IP/tarayıcı bilgisini toplayabilir (F-04 + AJ-05 kalanı). | 🟢 (+7b) | CSP engelleme modunda; logo yalnız izinli kaynaktan çiziliyor; test | BITTI (kısmen — KARAR-112) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` (F-04 QE5, AJ-05 QE2) · kanıt: `frontend/src/lib/securityHeaders.mjs:36` (`Content-Security-Policy-Report-Only`) · `backend/src/services/logoUrl.ts:64-76` (yalnız IP/localhost reddi) · DURUM: CSP engelleme modunda canlıda · KALAN: logo yalnız izinli kaynaktan çizilsin → KARAR-112 (PO kararı: her https / alan adı listesi / sunucuya indirme) · CSP ihlal kaydı → AJ-52 · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AJ-22 (2026-09-28) + § AJ-22 (2026-09-28, AJ-68) · kilit: kalan ayak KARAR-112 bekliyor (logo yalnız izinli kaynaktan) |
| AJ-29 | Ş0 | **Vekil arkasında IP bazlı istek sınırları tek kovaya düşüyor** — `trust proxy` ayarı yok (K-14 kalanı). | 🟡 (YASAK BÖLGE — PO'nun server.ts turu) | IP limitçileri gerçek istemci IP'siyle çalışıyor | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` (K-14, parti 01 + QA) · kanıt: `backend/src/server.ts` (`app.set('trust proxy'` grep boş) · `backend/src/middleware/rateLimiter.ts:39,64-66` · eski BITTI: K-14 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:181` · ⛔ OTONOM-PROMPT Bölüm 10 YASAK BÖLGE: ajan dokunmaz |
| AJ-76 | Ş0 | **İstek sınırı sayaçları süreç belleğinde** (G8-11) — birden çok backend kopyası çalışırsa her kopya ayrı sayar, sınır kopya sayısıyla çarpılır. | 🟡 (paylaşımlı depo PO eli) | Önce kopya sayısı teyidi (AN-06 / 03-PO #29): tek kopyaysa "bellek içi yeterli" kararı kodda gerekçeli yorum; çoksa sayaçlar paylaşımlı depoda (Redis ya da DB) ve iki kopyada toplam sınır aşılmıyor (test) | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:216` (GÖREV 4) · kanıt: `backend/src/middleware/rateLimiter.ts:14` (`new Map`) · backend `package.json` Redis yok · ilgili: AN-06, AJ-29 · kısım kapısı: kod kısmı 🟢 +7b |
| AJ-77 | Ş0 | **Durum alanlarının enum'a çevrilmesi + çift rol (`User.role` ↔ `TenantMembership.role`) okuma yolları envanteri** (G6-02 / madde 49) — serbest metin durum alanları geçersiz değer kabul ediyor; bazı okumalar hâlâ genel rolden. | 🔵 (migration) | Envanter (alan · canlı değer dağılımı, salt-okuma) + migration PR'ı + tarihli yedek planı + EVET/HAYIR kartı hazır; rol okumalarının `TenantMembership.role`'e geçiş listesi (AJ-01/40/56 sonrası kalan) | PR-ACIK | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:186` (GÖREV 4) · 🔵 **PR-ACIK 2026-09-28:** backend #227 (⛔ MIGRATION 13 kolon / 5 tablo) + çatı #420 · merge öncesi: §3b sayımı 0 + tarihli yedek (DB erişimi) · girmeyen: `Tenant.plan` (KARAR-119) · `SystemLog.category` (AUDIT temizliği) · rol okuma envanteri → AJ-105 · kilit: KARAR-128 bekliyor (EVET/HAYIR) · kısım kapısı: envanter + taslak kısmı 🟢 · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § AJ-77 (2026-09-28, AJ-68) |
| AJ-89 | Ş0 | **Mentinin "ne arıyorum" (S1 ihtiyaç) cevabı hiçbir ekranda gösterilmiyor; tasarımın görünürlük kuralının (§10.3) kalan iki ayağı yok** — eşleşme kurulduktan sonra mentör görmüyor; yönetici toplu dağılımı görmüyor. | 🟢 (+7b) | Eşleşmiş mentör mentinin ihtiyaç beyanını görüyor (eşleşmemiş mentör göremiyor — negatif test); yönetici yalnız toplu dağılım görüyor, küçük grupta (eşik 3) gizli | BITTI (kısmen — KARAR-130) | ajan-ekledi 2026-09-27 · kaynak: `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:756` (GÖREV 4) · 🟨 **BITTI (kısmen) 2026-09-28 — yönetici kolu tam; mentör kolu → KARAR-130:** backend #235 + çatı #430. Kalan: mentör kolu (mentöre hangi anda açılsın) → KARAR-130 · 3/3=%100 ve tamamlayıcı çıkarımı + tasarımdaki "ör. 5" eşik ↔ kod 3 → k-anonimlik eşiği/kural kartı adayı (KARAR-PAKETI notu). · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § AJ-89 (2026-09-28, AJ-68) |

## ⛔⛔⛔ EN ÜST — KOD İNCELEMESİ BULGULARI (KR, 2026-09-24 taraması · 2026-09-25 kuyruğa işlendi)
> 🔴 Bu bölümden 4 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (KR-05, KR-08, KR-11, KR-20) · kilit haritası: § 🔴 KİLİT HARİTASI.

> ⭐ **PO talimatıyla eklendi (2026-09-25)** — "Ajan kuyruğa iş EKLEMEZ" kuralının PO onaylı istisnası.
> Kaynak: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` (çatı `99189a8` · backend `4686ba4`). Her satırda dosya adı + rapor madde kodu var.
> ⛔ **Public repo:** güvenlik (B) ve C1 satırlarında **yalnız dosya adı** durur; satır numarası ve açığın işleyişi yazılmaz. Ayrıntı raporun "Kapanış ekleri" bölümüne iş kapanınca `kapandı: <commit>` ile girer.
> ⭐ **ÖNCELİK (PO):** **KR-01** → **KR-02 + KR-03** (birlikte test) → **B bloğu:** GV-04 · GV-06 · GV-05 · KR-04 · KR-05 (🔴 KARAR-79) · K-14 → kalanlar.
> **Mevcut satıra bağlanan bulgular (yeni satır AÇILMADI, Not'a rapor atfı eklendi):** B1→GV-04 · B2→GV-06 · B3→GV-05 · B6→K-14 · B7→GV-03 · B10→GV-10 · B11→GV-15 · D1→PS-04 + U-18 · D11→K-13 + E-3.
> **❓ Eşleşmesi belirsiz (yeni satır AÇILMADI):** B8 (OAuth onay kapısı) → U-08 ile ilişkisi belirsiz · B9 (kurum dondurma/ret erişime yansımıyor) → GV-10 kapsamında olabilir · D8 (09-DURUM / 00-KARAR-TAKIP bayat) → yinelenen K-20 belge senkronu mu, ayrı iş mi belirsiz.
> **Kapsam dışı (kuyruk işi değil):** D9 canlı DB teyidi → `03-PO-ELLE-ISLER.md` ADIM 0 · D10 merge sırası (backend #90 → çatı #264) → operasyonel.
> **Arşiv kontrolü:** `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` tarandı; örtüşen BİTTİ satırı yok.
> **Dağılım:** 22 satır — 🟢 8 · 🟡 11 · 🔴 3.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|

---

> Bu aşamada **19 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27).

## ⛔⛔ EN ÜST — KİMLİK SAHTECİLİĞİ (GÜVENLİK KONSEYİ ①②, 2026-09-21)

> ⭐ **AŞAMA I dâhil her işten ÖNCE.** Güvenlik konseyinin iki numaralı bulgusu: kimlik istek **gövdesinden**
> alındığı için bir kullanıcı **başkasının adına** hareket edebiliyor. İkisi de canlıda, ikisi de sömürüsü basit.
> Kaynak: `docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md` §0①/②.
> ~~[ESKİ · 2026-09-21] **Bu iki satır bu turda KODLANMIYOR** — ayrı bir bulut turu (`otonom/BD-...`) düzeltme PR'ini hazırlıyor.~~
> ✅ **GÜNCELLEME (2026-09-21, BE turu): DÜZELTME PR'İ HAZIR VE ONAYLANDI.**
> Backend dalı `otonom/BD-guvenlik-kimlik-sahteciligi-20260921` · **strateji katmanı inceledi ve onayladı** ·
> ikisinin de Durumu **`PR-ACIK`** · **PO merge edecek.**
> ⚠️ **Merge sonrası ÇATI POINTER BUMP gerekir** (`git submodule update --remote backend` → `git add backend` →
> commit → çatı PR) — `CLAUDE.md` § "Merge sonrası pointer bump". Bulut bunu yapamaz, terminal turu gerekir.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
> Bu aşamada **2 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27).

---

## AŞAMA I — İÇERİK (PO "EN ÖN SIRA", 2026-09-03)
> 🔴 Bu bölümden 5 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (I-01, I-09, I-11, I-18, I-12) · kilit haritası: § 🔴 KİLİT HARİTASI.

> ⭐ **Bu aşama kuyruğun EN ÜSTÜNDE.** PO kararı (2026-09-03, `10-yol-haritasi.md:69`): *"bu testler bizim için en önemli işler"* → **EN ÖN SIRA.**
> 🔴 **Neden buraya yeni eklendi:** blok `10-yol-haritasi` ve `00-KARAR-TAKIP` B.1'de duruyordu ama **`00-KUYRUK.md`'ye hiç girmemişti.** Otonom motor yalnız kuyruğu işlediği için (`OTONOM-PROMPT.txt:33-37`) **21 gün hiçbir tura girmedi.** Kaynak: `docs/raporlar/kesif/devir-analizi-2026-09-21.md` §0.2.
>
> **SAYILAN BİRİM (KURAL 16):** "kalem" = `00-KARAR-TAKIP.md` B.1'de (satır 287-309) **kendi numarası olan madde** = madde 138…160 → **23 madde**. Bunların **3'ü zaten CANLIDA** (143·144·145), **2'si mevcut K-18'in kapsamında** (147·148) → **kuyruğa yeni giren: 18 satır (I-01…I-18)**.
> ⚠️ **Durumlar bu turda koda karşı TEK TEK doğrulandı** (backend `b5415bd` · çatı `a8cec0f`); kaynak raporun 5 maddedeki iddiası **çürüdü** ve burada düzeltilmiş hâliyle yazıldı (149·150·155·157·158 → ⬜ değil **🟡 YARIM**). Rapor terim taraması yapmış, davranış taraması yapmamıştı.
>
> ✅ **ZATEN CANLIDA — satır açılmadı (kod+test kanıtlı, 2026-09-21 teyidi):**
> · **madde 143** şık karıştırma → `frontend/src/lib/shuffle.ts:9` · `ScenarioGuideEngine.tsx:21,67,94,115-117` · test `__tests__/ScenarioGuideEngine.test.tsx:83-86`
> · **madde 144** nötr geri bildirim → `ScenarioGuideEngine.tsx:71-75,190-192` · `NeutralReveal` `:270-307` · test `:99-111`
> · **madde 145** yolculuk cevabı profile yazılmıyor → `backend/src/services/learningJourney.service.ts:169-176` · regresyon testi `tests/learning-journey.test.ts:116`
> · **madde 164** kritik konu eşiği `>= 2` → `backend/src/services/certification.service.ts:72-73`
> ⚠️ **madde 147+148** = mevcut **K-18** (öğrenme yolculuğu seed) kapsamında — yeni satır AÇILMADI, K-18 Not'una bakın.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| I-08 | Ş1 | **madde 158 — deneme sınırı GÜNLÜK değil.** Kural "her 2 başarısız denemede 24s bekleme"; madde "günde 2 deneme" istiyor (aynı gün ezberlenmesin). NEDEN: sınır 24 saatlik bekleme ile işliyor, takvim günü sınırı yok; madde 158 günde 2 deneme istiyor ("aynı gün ezberlenmesin"). | 🔵 | Aynı takvim gününde 2'den fazla deneme yapılamıyor | PR-ACIK | hassasiyet: deneme sayacına **takvim-günü** alanı = migration olası. 🟡 **YARIM — rapor "disiplin yok" diyordu, ÇÜRÜDÜ.** VAR: `certification.service.ts:30` `attemptsBeforeCooldown:2` · `:32` `cooldownHours:24` · `:144-151` cooldown kapısı + `COOLDOWN_ACTIVE` · `:221-229` sayaç yazımı · FE bekleme mesajı **ve** yolculuğa yönlendirme `mentor/certification/page.tsx:65-66,149-152,326-335`. FARK: `:226-227` `newAttempts % 2 === 0` — takvim-günü sıfırlaması yok. · aile: Y-G · 🔵 PR-ACIK 2026-09-28: ⛔ MIGRATION backend #291 (TenantMembership +`certDayAttempts` +`certLastAttemptAt`, nullable, IF NOT EXISTS; saf `src/services/certAttemptWindow.ts` İstanbul takvim günü; mola ertesi gün 00:00) + çatı #476 (ekran metinleri) · 7b opus ONAY iki PR https://github.com/zahidsamiata/menti-mentor/pull/291#issuecomment-5879743706 · mutasyon CI #292 (5 test kırmızı) · EVET/HAYIR kartı **KARAR-135** (main'de; "00:00 mı 24 saat mi" seçeneği dahil) · merge YALNIZ PO EVET + tarihli `TenantMembership` yedeği (DB erişimi) sonrası; merge sonrası pointer main HEAD'e yeniden taşınır · 7b yan bulgu (c) → **KARAR-136** (sertifikalı mentör yeniden sınavda kalırsa sertifika düşsün mü) |
| I-17 | Ş1 | **madde 167 — öğrenme yolculuğunda GİZLİLİK + BİTİRME aşaması yok (8→10).** İki konu sertifikada SINANIYOR ama yolculukta hiç öğretilmiyor → "öğretilmemiş konuda eleme". NEDEN: sertifika gizlilik ve bitirme konularını sınıyor ama yolculuk öğretmiyor — mentör öğretilmemiş konuda eleniyor. | 🔵 | Mentör yolculukta gizlilik ve bitirme aşamalarını görüyor | BEKLIYOR | hassasiyet: **SEED** (KARAR + yedek şart; seed çalıştırılmaz). ⛔ **İÇERİK KONSEYİ DÜZELTMESİ (2026-09-21): bu satır "seed işi" diyor ama SEED'E KOYACAK İÇERİK HİÇ YAZILMAMIŞ** → önce **yazım turu**, seed ondan sonra. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md` §0② / §2.1. Kod kanıtı: `prisma/seed-learning-journey.ts` içinde `GIZLILIK`/`BITIRME` → **0 sonuç**; bugünkü sayım MENTOR 7 + MENTI 6 (`:7` yorumu + `:39-299`/`:300-500`). İçerik yazım turu ÖNKOŞUL. ⚠️ K-18 ile aynı seed dosyası → SIRALI. · aile: Y-G |
> Bu aşamada **6 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27). 5 katlanmış satır → `docs/otonom/arsiv/00-KUYRUK-katlanmis.md`.

---

## AŞAMA A — Migration'sız, kullanıcının hemen göreceği işler

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
> Bu aşamada **13 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27).

## AŞAMA B — Temizlik ve güvenlik

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|

> Bu aşamada **1 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27). 1 katlanmış satır → `docs/otonom/arsiv/00-KUYRUK-katlanmis.md`.

## AŞAMA C — Ürün kararı / migration bekleyenler
> 🔴 Bu bölümden 3 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (K-16, K-17, K-18) · kilit haritası: § 🔴 KİLİT HARİTASI.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| K-15 | Ş2 | **AvailabilityBlock'a format + süre (tam randevu mimarisi).** ⛔ önce `availability_block_yedek_20260910`; migration default'lu (format=ONLINE, durationMin=60); mentör slot açarken format+süre seçer; menti slottan seçer. NEDEN: mentör görüşme biçimini ve süresini belirleyemiyor; menti uygun slotu seçemiyor (KARAR-1 → A). | 🔵 | Mentör format+süre belirliyor, menti seçiyor, eski kayıtlar bozulmadı | PR-ACIK | KAYNAK: KARAR-1 → A · aile: Y-G · 🔵 **HAZIRLANDI 2026-09-27:** backend #189 (⛔ MIGRATION: `AvailabilityBlock.format` @default ONLINE + `durationMin` @default 60; 7b ONAY) + çatı #374 (form + randevu ekranı; 7b ONAY). AN-25 koşul alanları bilerek dışarıda (tasarlanmadı). EVET/HAYIR: **KARAR-111** (mevcut blokların ONLINE/60'a daralması, <60 dk blok riski, yedek MERGE'DEN ÖNCE). · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § K-15 (2026-09-28) + § K-15 (2026-09-28, AJ-68) · kilit: KARAR-111 bekliyor (EVET/HAYIR) |

> Bu aşamada **1 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27).

## AŞAMA E — ⭐ HAYALET BACKEND: niyet arkeolojisi → triyaj → yapım
> 🔴 Bu bölümden 1 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (E-5) · kilit haritası: § 🔴 KİLİT HARİTASI.

Bağlam: Bir denetim "backend'de yazılmış ama kullanıcıya ulaşmamış ~17 blok · ~56 çağrılmayan uç · ~44 tekil kalem" buldu.
PO kararı: **hepsi ele alınacak** — ama "ele almak" hepsini yapmak değil. Önce NEDEN yazıldıkları anlaşılacak.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| E-3 | değişir | **BAĞLA kovasını yap.** Her kalem ayrı PR, kendi şeridinde. Küçük ve migration'sız olanlar 🟢, diğerleri 🟡. Sırala: en az emekle en çok kullanıcı değeri önce. NEDEN: backend'de yazılmış ama hiçbir ekrana bağlanmamış uçlar kullanıcıya değer vermiyor (e3 keşfi: 62 uç, BAĞLA 10). | 🟢 | Her kalem için kullanıcı ekranda bir şey görüyor | BITTI (kısmen — kalanlar devredildi: anlaşma taslağı → 🔴 KARAR-109 · bağlamsal kart → U-18/KARAR-97 · değerlendirme okuma → AJ-49 · 3 takip → AJ-106) | ⭐ **KEŞİF (2026-09-25):** `docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md` · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § E-3 (2026-09-28) + § E-3 (2026-09-28, AJ-68) · kilit: kalan ayak KARAR-109 bekliyor (anlaşma taslağı (sahibi E-3)) — § 🔴 KİLİT HARİTASI · kilit: kalan ayak KARAR-97 bekliyor (bağlamsal geri bildirim kartı, U-18 üzerinden) |
| E-4 | Ş0 | **ARŞİV BELGESİ + KARANTİNA.** `docs/arsiv/silinenler-2026-09-10.md` oluştur: her karantina adayı için tam kod içeriği, neden yazıldığı, neden devre dışı bırakıldığı, son commit hash'i, geri alma komutu. Sonra karantinaya al (rota kapat / @deprecated), **SİLME**. ⛔ Gerçek silme ayrı bir turda, PO'nun ikinci onayıyla. NEDEN: ölü/mükerrer kod silinmeden önce geri alınabilir biçimde devre dışı bırakılmalı (silme protokolü, KARAR-11). | 🔵 | Arşiv belgesi tam + karantina PR'da; hiçbir şey silinmedi | PR-ACIK | hassasiyet: karantina = kaynak rota devre dışı bırakma (geri-dönüş hassas) + KARAR-11 silme protokolüne bağlı. · aile: Y-F · ⛔ **çelişki: KARAR-80/M14** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M14: ana satır (tek karantina turu, silme protokolü); K-13/AN-13/AN-40 katlandı. · 🔵 PR-ACIK 2026-09-28: backend #289 (`src/middleware/quarantine.ts` — 7 yedek uç kimlik doğrulamadan sonra 410 + SystemLog WARN; `QUARANTINE_REOPEN` acil açma) + çatı #474 (arşiv `docs/arsiv/silinenler-2026-09-10.md` 728 satır, tam kod + niyet + ikame + geri alma; `MeetingScheduler.tsx` ve `getPairSignal` @deprecated) · 7b opus ONAY iki PR (kırılan çağıran YOK) https://github.com/zahidsamiata/menti-mentor/pull/289#issuecomment-5879454753 · EVET/HAYIR kartı **KARAR-134** (main'de) · gerekçesi bulunamayan 2 uç (`PATCH /users/:id/self-profile` · `POST /users/:id/temperament-test`) karantinaya ALINMADI → KARAR-134 "Ayrıca" sorusu · sonraki dilim 7 kalem (arşivde) · merge YALNIZ PO EVET sonrası; BITTI için §MUTASYON-CI taslak PR gerekecek · silme YOK |
> Bu aşamada **2 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27).

## AŞAMA D — Kapanış

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
> Bu aşamada **1 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27).

## AŞAMA F — BİLANÇO DEVRİ (2026-08-28 öncelik sırası → koda karşı doğrulandı 2026-09-19)
> 🔴 Bu bölümden 6 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (F-07, F-08, F-09, F-11, F-12, F-14) · kilit haritası: § 🔴 KİLİT HARİTASI.

Bağlam: `docs/raporlar/bilanco/kararlar/00-ONCELIK-SIRASI-2026-08-28.md` (Faz 0-8, "87 işleme al") 21 gün işlenmemişti.
Bu tur her kalem **bugünün koduna karşı** doğrulandı (salt-okuma, 8 paralel alt-ajan). ✅/🗑️/⚫ kapananlar satır ALMADI;
örtüşenler mevcut K- satırının Not'una eklendi; açık (🟡/⬜) ve örtüşmeyen kalemler aşağıda. Faz sırası korundu.
Kaynak kalem kodu + doğrulama kanıtı (dosya:satır) her satırın Not'unda.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| F-01 | Ş0 | **Belge reorg — taşıyıcı-ad + büyük reorg.** G9 grubu Faz 1a'da çoğu ✅; kalan: 5 canonical taşıyıcı belge (09-DURUM/10-yol/00-INDEX/00-KARAR-TAKIP) taşınması + ~38 referans + ~68 belge isim/klasör standardizasyonu. NEDEN: canonical belgelerin yeri ve adları dağınık; referanslar kırılıyor, belge bulunamıyor (G9-11/G9-12). | 🟢 | Taşıyıcı adlar taşındı, referanslar kırılmadı | BITTI (kısmen — AJ-120) | · =G9-11 (🟡) + G9-12 (⬜), Faz 1. Kanıt: 09-DURUM.md hâlâ `docs/kararlar/` kökünde ⚠️ = yönetişim konseyi §C.1/§C.3, ek bulgu: yeni açılan `docs/kararlar/konu/rtk-komut-rehberi.md` hiçbir `00-INDEX.md`'ye kaydedilmedi (KURAL 5 borcu) — bu reorg kapsamına girer. `grep -n rtk docs/kararlar/00-INDEX.md` → 0. · ⛔ **çelişki: KARAR-80/M15** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M15: ana satır; YN-03 katlandı. · 🟨 2026-09-28 (çatı #467, opus ONAY): **taşıma YAPILMAZ** — `docs/kararlar/konu/belge-duzeni-rehberi.md:29` KURAL 2 "00-INDEX · 09-DURUM · 00-KARAR-TAKIP · 10-yol-haritasi · 10-yol-tamamlananlar kökte kalır, taşınmaz" (teknik karar: rehber kazanır; KARAR-80/M15 hedef yol vermiyor) · rtk-komut-rehberi kaydı zaten var (`docs/kararlar/00-INDEX.md:86`, commit 0c64a0f — Not'taki "grep → 0" bayattı) · kırık yol taraması: 3.790 `docs/…md` atfından 24 hedefsiz → 1 düzeltildi (`docs/kararlar/konu/04-guvenlik-ve-kvkk.md:12`), kalanlar açık dallarda bekleyen dosyalar / 📸-arşiv / belirsiz · kalan → AJ-120 |
| F-02 | Ş3 | **Message otomatik imha (G1-06 kalanı).** FeedbackLog 3-yıl + SystemLog 90g imhası ✅ yazılı; kullanıcı **mesajlarının** (Message) saklama-süre imhası yazılmadı. NEDEN: kullanıcı mesajları süresiz saklanıyor; KVKK saklama süresi dolunca imha edilmeli (G1-06). | 🟡 | Mesaj saklama süresi dolunca otomatik siliniyor | BEKLIYOR | hassasiyet: KVKK/veri imha. =G1-06, Faz 2. Süre G1-10 avukat metnine bağlı. Kanıt: `gdprService.ts` TODO(G1-10); FeedbackLog `deleteMany` var ⚠️ = güvenlik konseyi §2.B.4, ek bulgu: `Message` için süre yazılmamış olması BİLİNÇLİ ve gerekçeli (`gdprService.ts:375-378` TODO(G1-10): "kodda keyfi süre yazarsak aydınlatma metniyle çelişir"). Kilit: avukat metni (03-PO #16 · P-a). · aile: Y-B · PO kısmı: avukattan kullanıcı mesajlarının KVKK saklama süresini belirletmek (03-PO-ELLE-ISLER #16); süre gelince silme kodu 🟢 kurallarıyla yazılır. · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § F-02 (2026-09-28, AJ-68) |
| F-05 | Ş4 | **CAPTCHA/step-up (G1-26).** Public şüphe formunda IP-limit ✅ var; CAPTCHA + step-up doğrulama yok. NEDEN: herkese açık şüphe formu yalnız IP sınırıyla korunuyor; bot/spam başvuruları engellenemiyor (G1-26). | 🟡 | Public formda bot/spam koruması güçlendi | BEKLIYOR | hassasiyet: güvenlik/auth (step-up doğrulama). =G1-26, Faz 3. Kanıt: `suspicionRoutes.ts:9` rate-limit var; CAPTCHA grep boş · aile: Y-A · ✅ **KOD KISMI CANLIDA 2026-09-27:** backend #183 (`e68f306`, 7b ONAY) + çatı #367 (`c03f754`, pointer + widget sıfırlama; 7b 2. tur ONAY). Anahtar yokken davranış aynı (no-op). ⏳ Satır 🟡 kuralı gereği PO kısmı bitene kadar AÇIK: Turnstile hesabı + iki anahtar (`03-PO-ELLE-ISLER.md` en üst, doğrulama yolu ve kesinti notu dahil). · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § F-05 (2026-09-28, AJ-68) |
> Bu aşamada **21 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27). 3 katlanmış satır → `docs/otonom/arsiv/00-KUYRUK-katlanmis.md`.

> **Örtüşme — mevcut K- satırlarına eklenen kalemler (yeni satır AÇILMADI):**
> - **K-13** (mükerrer uçlar) = G10-01(c) MeetingScheduler mount edilmeyen bileşen · G4-09/G4-10 super-admin ikizi (FE 0 kullanım) · G10-23 (mentiRequestController — dosya silinmiş, çözülmüş). Hepsi E-2/E-3/E-4 hayalet akışında.
> - **K-14** (sunucu sertleştirme) = G1-28 (Faz 0 altyapı, KARAR-18) + F-04 (G1-23 CSP, aynı `server.ts` → SIRALI) + F-05 (G1-26 kısmi).
> - **K-16** (sertifika seed) = G3-08 (seed kodu 20/80 eski sürüm · finalize 22/88 içeriği `docs/raporlar/icerik/` 3 belgede yazılı, seed'e taşınmadı → içerik→seed taşıma adımı gerekir; ⚠️ 2026-09-21: bu "sürüm farkı" DEĞİL — 20'nin 15'i elenmiş, kalan 5'i yeniden yazılmış, 88 şıkın tamamı taşınacak, efor **L**; bkz. P-99) · G3-09 (npm runner yok, dosya-içi tsx guard var).
> - **K-04** (foto yükleme) = G8-01/G8-02 foto volume (Faz 0, KARAR-18).
> - **K-12** (KVKK insan-okunur özet) = G1-05 zaten ✅; K-12 onun bir sonraki adımı (ham JSON → okunur sayfa).

> **✅/🗑️/⚫ kapananlar (satır ALMADI, kanıt aşağıda) — "yapılmamış sanılıp YAPILMIŞ" olanlar dahil:**
> Faz1: G9-grubu·G9-05·G6-07·G7-12·G7-13 ✅. Faz2: G1-05·G1-07 ✅; G1-01 ⚫ (bilinçli kapsam düşürüldü→metin beyanı).
> Faz3: G7-04·G1-02·G1-19 ✅; G1-17 ⚫ (backend `requireRole`'de çözüldü, middleware admin-guard teknik imkânsız); G1-04 ⚫ (yeniden tanım: public form, tenant izolasyon açığı değil).
> Faz4: S21·Üç-soru·G6-03(onDelete) ✅. Faz5: G2-10 🗑️ (qm² çift-çarpım iddiası PR #138'de çürütüldü).
> Faz6: G3-19 (etiket havuzu — kart ⬜ der, `PendingTag`+tagController VAR)·B7·B8-yüzey ✅.
> Faz8: **G4-02·G4-04·G2-11·G10-25 = kart açık/eksik der ama KODDA VAR** (compatibilityReason FE · managers paneli · davetli=onaylı tetiği `authController.ts:165` · profil düzenleme çalışıyor); G10-23 🗑️.
> ❓ TEYİT (bulut/DB yapamaz): G3-16/G3-18 canlı içerik sayıları — DB-teyit turu gerekir.

## AŞAMA P — PANEL DENETİMİ BULGULARI (2026-09-19)
> 🔴 Bu bölümden 2 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (P-15, P-99) · kilit haritası: § 🔴 KİLİT HARİTASI.

Kaynak: `docs/raporlar/kesif/panel-denetimi-mentor-menti-2026-09-19.md` (H turu, PR #186). Mentör+menti paneli "istenen vs kodda olan":
26 istek → ✅11 · 🟡11 · ⬜3 · ❓1. Asıl kütle 🟡 YARIM'da — özellik yazılmış, **son bir adım eksik** (düşük efor/yüksek getiri).
Aşağıya raporun §6 (en yüksek etkili 5) + §2/§3 tablolarındaki TÜM 🟡/⬜ kalemler alındı. Sıra: en az emek→en çok değer üstte (rapor ölçütü).
P-01..P-05 = raporun §6 beşlisi. P-00 = güvenlik (ayrı). ⛔ KOD YAZILMAZ — sıradaki otonom tur yapacak.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| P-08 | Ş1 | **Öğrenme yolculuğu ilerlemesi kalıcı değil.** Panel kartı yalnız "başla/tamamlandı"; "neredeyim, sıradaki adım" yok. Sayfadan çıkan menti ilerlemeyi kaybediyor. NEDEN: sayfadan çıkan menti yolculuktaki ilerlemesini kaybediyor, nerede kaldığını göremiyor. | 🔵 | Menti yolculukta kaçıncı aşamada olduğunu kalıcı görüyor | BEKLIYOR | hassasiyet: şema/migration gerekebilir (completedStages) — belirsiz (kanıt: "Backend/şema completedStages gerekebilir"). =M8. Kanıt: `ScenarioGuideEngine.tsx:97 useState(0)`; API `{completed,totalStages}` ama tamamlanan aşama SAYISI yok (`learningJourney.ts:79-84`). Backend/şema completedStages gerekebilir. Efor M · aile: Y-G · kaynak: `docs/raporlar/kesif/panel-denetimi-mentor-menti-2026-09-19.md` (M8) |
> Bu aşamada **13 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27). 2 katlanmış satır → `docs/otonom/arsiv/00-KUYRUK-katlanmis.md`.

> **Kapsam denetimi (İŞ2 disiplini):** Rapor §2/§3'te 11 🟡 + 3 ⬜ = **14 açık kalem** var; hepsi kuyruğa alındı
> (M3→P-06 · M5→P-05 · M6→P-07 · M8→P-08 · M9→P-01 · M13→P-02 · MT1→P-04 · MT2→P-09 · MT5→P-10 · MT6→P-11 · MT7→P-12 · MT9→P-13 · MT10→P-14 · MT13→P-15).
> Ek: P-03 (DISC rapel, §6#3 — M1/MT3 ✅ ama gap) · P-00+P-16 (güvenlik) · P-99 (seed önkoşulu). **Alınmayan:** ✅ VAR (11) + ❓ M11 (his, ölçülemez) — İŞ2 gereği doğru.

## AŞAMA U — UÇTAN UCA YOLCULUK BULGULARI (2026-09-19)
> 🔴 Bu bölümden 4 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (U-12, U-13, U-15, U-17) · kilit haritası: § 🔴 KİLİT HARİTASI.

Kaynak: `docs/raporlar/kesif/uctan-uca-kurum-yolculugu-2026-09-19.md` (X turu). Kayıt→ilk görüşme hattı; zincir **9 yerde kopuyor (K1-K9, 6'sı sessiz)**, elle müdahale mutlu yolda 5.
Sıra: §6 (en kritik 5) → §10 (24 kalem) kalanları. Kapı = güncel politika (varsayılan 🟢; migration/seed·auth/KVKK/matching·geri-dönülmez → 🟡; ürün kararı → not'ta KARAR aday, merge YOK).

⚠️ **Numaralandırma notu (çakışma kontrolü uygulandı):** §6 kritik **#1 (bookMeeting 409 + FE "uygun" sayıyor) = K-05** ile ÖRTÜŞÜR → yeni satır AÇILMADI, K-05 Not'una işlendi. Bu yüzden U-satırları kritik #2'den başlar. §10#1,#2 → K-05; §10#22 (k-anon) → P-06/P-16 kümesine işlendi; §10#14 (ortak `EmptyState` bileşeni) rapor "numara adayı: hayır" → satır açılmadı (U-10 içinde değinilir).
⚠️ **PO/env bağımlı kalemler** (kurum bildirimi, SMTP) `03-PO-ELLE-ISLER.md`'ye de girdi; buradaki satır yalnız **AJAN kısmını** taşır, Not'ta "PO ADIMI OLMADAN ETKİSİZ" ile.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| U-18 | Ş0 | **`MatchRequest` durumsuz → mentörün mesaj talebini kabul/ret kapısı yok;** `Match` tablosuna yazan kod yok (`createMatchIfEligible` 0 çağıran). NEDEN: mentör kendisine gelen mesaj talebini kabul/ret edemiyor (X §3 K6). | 🔵 | Mentör mesaj talebini kabul/ret edebiliyor (karara göre) | PR-ACIK | aile: Y-C · DURUM: PR-ACIK — backend #148 + çatı #326 · ⛔ MIGRATION `Conversation.rejectedAt` (boş bırakılabilir ek alan; dosya elle yazıldı, uygulanmadı) → merge için PO EVET'i (KARAR-97) + `Conversation` tarihli yedeği · Takip (satırı yok, strateji katmanına): gerçek bildirim + gelen kutusunda ret işareti; bildirim metnindeki "Mentörünüz" · ⛔ Sıra kuralı: `Match` yazımı ancak silme yolu (GV-08, tamamlandı) sonrası açılır · KAYNAK: X §3 K6 / §10#23 · kod incelemesi D1 · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § U-18 (2026-09-28) + § U-18 (2026-09-28, AJ-68) · kilit: KARAR-97 bekliyor (EVET/HAYIR) |
> Bu aşamada **14 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27).

> **Örtüşme/alınmayan (X):** §6#1 & §10#1,#2 → **K-05** · §10#22 (k-anon) → **P-06/P-16** · §10#14 (ortak `EmptyState`, "numara adayı: hayır") → U-10 içinde. §7 (11 "zaten iyi"), §8 (TEYİT GEREK, PO canlı teyidi) satır ALMADI — §8 teyitleri `03-PO-ELLE-ISLER.md`/09-DURUM'a.

## AŞAMA V — OPERASYONEL HAZIRLIK BULGULARI (2026-09-19)
> 🔴 Bu bölümden 1 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (V-15) · kilit haritası: § 🔴 KİLİT HARİTASI.

Kaynak: `docs/raporlar/kesif/operasyonel-hazirlik-2026-09-19.md` (W turu). İzleme·yedek·koruma·ortam. Sıra: raporun **§4 RİSK SIRALAMASI** (1 en tehlikeli üstte).
⚠️ **AYRIM (raporun "Kim çözer" sütunu):** yalnız **AJAN** kısmı buraya girer. **PO** kısmı (Dokploy/hesap/SMTP/Neon/sunucu) → `03-PO-ELLE-ISLER.md`; kuyruğa YAZILMADI. İkisi de gerekiyorsa satır AJAN kısmını taşır, Not'ta "⚠️ PO ADIMI OLMADAN ETKİSİZ".
⚠️ **Yeni 🔴 açılmadı** (🔴 sayısı 12 sabit). Ürün kararı gereken kalemler 🟡 + "KARAR aday" ile işaretlendi (merge YOK).
⚠️ **Çakışma/PO-only nedeniyle satır AÇILMAYAN riskler:** #1 avatar disk → **K-04** (PO→03-PO) · #3 trust proxy/`X-Tenant-Id` → **K-14** (⛔ yasak bölge) · #4 kurum bildirimi → **U-04** + Bölüm4/03-PO · #7 6-saat yedek + restore provası → **madde 120 / [G1-28] 🔴 çıkış blokeri** (§9.1: yeni numara VERİLMEZ, mevcuda bağlanır) → 03-PO · #12 yedek tablo DROP (S26/S37) → §4.4 KARAR + 03-PO · #14 `NEXT_PUBLIC_API_URL` build-time → PO (03-PO) · #18 `RATE_LIMIT_RPM` mimarisi → yasak bölge (yalnız Bölüm4 .env belgesi) · #19 `mentorVisibilityEnabled` → **U-19** + §4.5 KARAR. Belgelenmemiş env (§7#23/#24/#25) → **Bölüm 4** (.env.example).

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| V-16 | Ş4 | **`/health`'in `version` alanı sabit `"0.1.0"` — canlıdaki gerçek kodu göstermiyor.** `process.env.npm_package_version` `package.json`'dan okunuyor (`health.ts:47`), git commit'iyle hiç değişmiyor. NEDEN: canlıda hangi kodun çalıştığı görülemiyor; merge sonrası dağıtım doğrulanamıyor. | 🟢 | `/health` yanıtı hangi backend commit'inin canlıda koştuğunu gösteriyor | ✅ BITTI (kısmen, PO elle işi kaldı) | Kaynak: PO talimatı (2026-09-26). **Kod tarafı canlıda:** `health.ts`'e `commit: process.env.GIT_SHA ?? 'unknown'` eklendi, Dockerfile `ARG GIT_SHA` + çatı `docker-compose.yml` `build.args` eklendi, merge edildi. Doğrulama (2026-09-26): `curl https://api.sivilkapasite.org/health` → `"commit":"unknown"` (alan VAR ama Dokploy `GIT_SHA` host değişkenini henüz set etmiyor — **beklenen**, hatalı değil). ⚠️ **Kalan adım kodla çözülemez → `03-PO-ELLE-ISLER.md:18`'e taşındı:** Dokploy backend build ayarına `GIT_SHA` set edilmeli. Migration/seed yok, geri alınır. aile: Y-E |
> Bu aşamada **14 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27).

> **Örtüşme/alınmayan (W):** §5 (44 "zaten iyi") + §6 (taranamadı, PO canlı teyidi) satır ALMADI — PO teyitleri `03-PO-ELLE-ISLER.md`'ye. §9.3#30 (kalem 11-12 numara verilmesin) aksiyon değil, §9.1 yönergesiyle uygulandı (→ G1-28). Kalıntı riskler (§7 sonu: magic-byte polyglot, avatar silme best-effort, `superAdminRoutes` limitçi, `systemLogController` AUDIT enum, `ALLOWED_ORIGINS` trim) — düşük öncelik, bu turda satır ALMADI, W raporunda kayıtlı.

---
## AŞAMA Y — YOL HARİTASI + KARAR TAKİBİ DEVRİ (2026-09-21)
> 🔴 Bu bölümden 4 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (Y-07, Y-11, Y-14, Y-18) · kilit haritası: § 🔴 KİLİT HARİTASI.

> **Kaynak:** `docs/raporlar/kesif/devir-analizi-2026-09-21.md` §3.1/§3.3/§3.4. `10-yol-haritasi.md` ve `00-CIKIS-PLANI.md` 📸 donduruldu; açık kalemleri buraya devredildi.
> ⚠️ **Her satır bu turda koda karşı TEK TEK doğrulandı** (backend `b5415bd`). Kaynak raporun **6 iddiası düzeltildi**, **1 satır hiç açılmadı** (aşağıda gerekçesiyle).
> ⛔ **AÇILMAYAN: madde 71** (`SuspicionReport.tenantId` yok). Olgu doğru ama kart **G1-04 ⚫ GEÇERSİZ** diyor (`docs/raporlar/bilanco/kararlar/G1-guvenlik-kvkk.md:100,105`): *public-create + platform-only-read → tenant izolasyon açığı değil, **tasarım kararı***. **KURAL 15: çelişkide KART kazanır** → satır AÇILMADI. Spam sertleştirme istenirse ayrı kart **G1-26** altında izlenir.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| Y-05 | Ş0 | **madde 100 — `SystemLog.meta` JSON-yol sorguları indekssiz.** Log büyüdükçe kalibrasyon sayfası ve dürtme kontrolü yavaşlar. NEDEN: log tablosu büyüdükçe kalibrasyon sayfası ve dürtme kontrolü yavaşlıyor (madde 100). | 🔵 | Log büyüdükçe kalibrasyon sayfası yavaşlamıyor | BEKLIYOR | hassasiyet: **MIGRATION** (yeni `@@index`). madde 100. ⭐ **Sorguyu YAPAN kod:** `algorithmTuner.ts:209` `meta:{path:['tenantId']}` **ve** `nudgeService.ts:30` `meta:{path:['targetUserId']}` — indeks ikisini de hedeflemeli. · aile: Y-G · ⏸️ 2026-09-26: kod bu turda YAZILMADI — Prisma'nın JSON yol sorgusunun (`meta:{path:[…],equals}`) ürettiği SQL ile ifade indeksinin eşleştiği ancak veritabanında `EXPLAIN` ile kanıtlanabilir; Prisma şeması ifade indeksini temsil edemez (ileride `migrate dev` drift'i indeksi silmeye kalkabilir). **Tek seferlik DB erişimi gerekiyor (EXPLAIN)** → 00-SIMDI Engeller. · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § Y-05 (2026-09-28, AJ-68) |
| Y-12 | Ş4 | **madde 56+67 — ölçüm kodu (GTM/GA4/Clarity) ve çerez izni.** ⭐ **PR #110'u açan anahtar.** NEDEN: kurum sahibi ziyaretçi sayısını görmeli; ölçüm kodu çerez izninden önce açılırsa "KVKK ihlali doğar" (PR #110 başlığı: "çerez izni yok, KVKK riski"). | 🟢 | Kullanıcı ilk girişte çerez tercihini seçiyor; reddederse izleme yüklenmiyor; kurum sahibi ziyaretçi sayısını görüyor | BEKLIYOR | ⚠️ **BİRLEŞTİRİLDİ (2026-09-21):** madde 67 **tek başına açılmamalı** — bugünkü main'de üçüncü-taraf çerez **SIFIR** ⇒ bugün çerez bandı **yasal olarak gereksiz**. ⛔ **SIRA BAĞIMLILIĞI: 67 → 56.** 56 önce merge edilirse KVKK ihlali doğar. ⭐ Kod **YAZILMIŞ**: `origin/feat/analytics-seo-2026-08-22` (`dcf5d9a`) içinde `components/analytics/Analytics.tsx` var, main'de yok; **PR #110 AÇIK**. Bu satır = **#110'u merge edilebilir hale getirmek**, sıfırdan yazmak değil. · aile: Y-B · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § Y-12 (2026-09-28) + § Y-12 (2026-09-28, AJ-68) · 2026-09-28 tur kontrolü: iş = PR #110'u merge edilebilir yapmak; OTONOM-PROMPT Bölüm 10 "⛔ #110 MERGE ETME işaretli PR'a DOKUNMA" kalıcı kuralı → ajan yapamaz, PO/strateji kararı gerekir (sıra geçildi) |
| Y-17 | Ş0 | **madde 166 — iki farklı `rankMentorsForMenti` fonksiyonu.** Aynı ad, iki dosya, farklı imza (biri senkron biri async); yanlışını import etmek kolay. NEDEN: aynı adlı iki fonksiyon var; yanlışını import etmek eşleştirme davranışını sessizce değiştirir (madde 166). | 🟢 | Tek isim tek davranış; yanlış import imkânsız | BEKLIYOR | Kanıt (tam **2 tanım**): `scoring.service.ts:165` (senkron) ↔ `matching.ts:351` (async). Ayrı ayrı çağrılıyorlar: `sjtScoringController.ts:5,133` ve `sector-scorer.service.ts:4,110` → scoring.service · `matchingController.ts:5,107` → matching. ⚠️ I-13/I-14 ile aynı dosya ailesi → **SIRALI**. ⚠️ = psikometri konseyi §5 D.3 dipnotu, ek bulgu: güncel teyit — matching.ts:351 (canlı, async) ↔ scoring.service.ts:165 (ölü, senkron). · **KARAR-80/M21 sıra notu:** PS-A1..A3'ten SONRA (hangi puanlama imzası kalacak PS-A3 ile belirlenir). · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § Y-17 (2026-09-28, AJ-68) · 2026-09-28 tur kontrolü: KARAR-80/M21 sırası gereği PS-A3'ten SONRA; PS-A3 PS-A2 (KARAR-58) yüzünden kilitli → sıra geçildi |
> Bu aşamada **10 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27). 1 katlanmış satır → `docs/otonom/arsiv/00-KUYRUK-katlanmis.md`.

> **Örtüşme/alınmayan (devir analizi):** §3.4'teki `madde 35` · `madde 7` · `madde 49` · `madde 70` · `madde 137` · `madde 128` · `madde 108` · `madde 171+170` · `madde 173` · `S38` · belge düzeltme paketi — bu turda **satır AÇILMADI**; kaynak raporda tek satır özet hâlinde duruyorlar ve çoğu 🔴 KARAR'a bağlı. Bir sonraki devir turunda ele alınacak.

---
## AŞAMA DK — DÖRT KARARIN AÇTIĞI YENİ İŞLER (2026-09-22, terminal turu)

> KARAR-23 · KARAR-24 · KARAR-27 · KARAR-33 CEVAPLANDI (PO, 2026-09-21, strateji katmanı). Bu bölüm
> cevapların açtığı **yeni uygulama işlerini** taşır. Detay ve gerekçe: `01-KARARLAR.md` ilgili kart.
> KARAR-33 akışı ayrı satır AÇILMADI → mevcut **Y-14**'e absorbe edildi (mükerrer önleme; Y-14 Not'una bak).

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| DK-01 | Ş1 | **Sentry (ya da eşdeğeri) entegrasyonu + kişisel veri temizleme.** KARAR-27 → A. Backend+frontend hata toplama; PII scrub ayarı zorunlu. NEDEN: canlı hatalar merkezî toplanmıyor; sorunlar kullanıcı bildirmeden görülmüyor (KARAR-27 → A). | 🟡 | Canlı hatalar merkezî olarak, kişisel veri temizlenmiş toplanıyor | PR-ACIK | 🟡 KVKK (yurtdışı aktarım) — merge YOK, PR'da durur. ⚠️ **PO ön koşulu:** Sentry kullanımı aydınlatma metni + yurtdışı aktarım envanterinde YER ALMALI (avukat paketi md.4). ⚠️ PO işi: hesap açma + anahtarı Dokploy'a girme (`03-PO-ELLE-ISLER.md`). Ajan yalnız entegrasyon + veri temizleme kodunu yazar; anahtar gelmeden CANLI olmaz. Detay: KARAR-27 CEVAP. · aile: Y-B · **KARAR-80/M21 sıra notu:** kişisel veri temizleyicisini GV-07'den al. · PO kısmı: Sentry hesabını açıp anahtarı Dokploy'a girmek ve Sentry'nin aydınlatma metni/yurtdışı aktarım envanterine eklenmesini avukata onaylatmak (03-PO-ELLE-ISLER A4). · 🟡 PR-ACIK 2026-09-28: KOD KISMI hazır — backend #290 (`@sentry/node`; `src/services/errorMonitor.ts` + `errorMonitorScrub.ts`; DSN yoksa SDK yüklenmez) + çatı #475 (`@sentry/browser`; replay/tracing/oturum takibi kapalı; CSP yalnız DSN https ise; `frontend/Dockerfile` boş ARG) · veri toplama `dataCollection` ile tamamen kapalı (v11'de `sendDefaultPii` etkisiz — 7b yakaladı), olay/işlem adı/URL GV-07+GV-14 süzgecinden · 7b opus ONAY (2 tur; 1. tur SORUN VAR: IP çıkarımı + davet token'lı işlem adı → düzeltildi) https://github.com/zahidsamiata/menti-mentor/pull/290#issuecomment-5879877886 · npm audit: yeni kayıt yok · mutasyon yerel (6 düzeltme, hepsi kırmızı) · satır notu gereği MERGE YOK · PO kısmı: 03-PO-ELLE-ISLER DK-01 satırı (sıra: avukat → Sentry AB bölgesi + IP saklama kapalı → Dokploy env/build arg → merge) |
| DK-02 | Ş3 | **Kuruma giden "düzeltme" e-postası metni.** KARAR-23. Onay ve düzeltme maili açılır; **ret maili GÖNDERİLMEZ**. NEDEN: düzeltme istenen kurum ne düzelteceğini e-postayla öğrenemiyor (KARAR-23). | 🟡 | Düzeltme isteyen kuruma açık, kırıcı olmayan, ne düzelteceğini söyleyen e-posta gider | BEKLIYOR | 🟡 kuruma görünen + hukuki metin — merge YOK. ⚠️ SMTP (çıkış B4) + `TENANT_NOTIFICATIONS_ENABLED` (B5) bağımlı. `tenantNotifications.ts` mevcut altyapı. Detay: KARAR-23 CEVAP. · aile: Y-B · KARAR-80 işlendi (2026-09-26, A kabul) — M21: avukat ön koşulu KALKTI (düzeltme maili metni zaten kodda var: tenantNotifications.ts:50-63, ayrıca avukat onayı gerekmiyor). Ajan metni hazırlar + gönderir; yalnız SMTP/TENANT_NOTIFICATIONS_ENABLED bağımlılığı kalır. · PO kısmı: Dokploy'da SMTP'yi ve `TENANT_NOTIFICATIONS_ENABLED='true'` ayarını açmak (03-PO-ELLE-ISLER B5 / #5). · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § DK-02 (2026-09-28, AJ-68) · 2026-09-29: KOD KISMI tamam — düzeltme maili notu zaten gidiyordu (`tenantNotifications.ts:54-68`); eksik bulunan: ret e-postası KARAR-23'e aykırı biçimde bağlıydı → backend #295 (`isTenantNotificationEmailed`: yalnız onay + düzeltme; ret şablonu silinmedi) MERGE `21e5acc` · opus ONAY https://github.com/zahidsamiata/menti-mentor/pull/295#issuecomment-5880089270 · test `tests/tenant-notifications-karar23.unit.test.ts` 5/5 · mutasyon yerel · canlıya pointer bump ile çıkar · satır PO kısmı (SMTP + `TENANT_NOTIFICATIONS_ENABLED`) bitene kadar AÇIK · ilgili metin düzeltmesi → AJ-123 |
| DK-03 | Ş0 | **Platform panelinde hata "iz kaydı" (tam stack) — PII temizlenmiş.** KARAR-24 → B. V-02'nin panel ayağı. NEDEN: platform operatörü bir 500 hatasının iz kaydını panelde göremiyor (KARAR-24 → B). | 🟡 | Platform operatörü bir 500'ün tam iz kaydını (kişisel veri temizlenmiş) panelde görüyor | PR-ACIK | 🟡 KVKK — merge YOK (iz içinde kazara PII riski, scrub şart). ⚠️ **KAPSAM DIŞI:** platform yöneticisinin kurum verisine erişim KAYDI (denetim izi) KALDIRILMAZ — "kayıtsız tam erişim" ayrı HUKUKİ karar (avukat paketi md.6). Kanıt bağlam: `platformController.ts:182-185` bilinçli gizleme. Detay: KARAR-24 CEVAP. · aile: Y-B · **KARAR-80/M21 sıra notu:** kişisel veri temizleyicisini GV-07'den al. · PO kısmı: teyit gerek — satırda PO'nun eliyle yapılacak adım yazılı değil; yalnız kapsam dışı bırakılan "kayıtsız tam erişim" sorusu avukatta (03-PO-ELLE-ISLER A6). Kod kısmı (PII temizlenmiş iz kaydı) 🟢 kurallarıyla yapılır. · 🟡 PR-ACIK 2026-09-28: KOD KISMI hazır — backend #286 (`scrubStackTrace` + `GET /api/platform/logs/:id/trace`, requirePlatformAdmin + rate limit + VIEW_PLATFORM_LOG_TRACE denetim kaydı; AJ-102 meta kilidi korunuyor) + çatı #472 ("İz kaydını göster") · 7b opus ONAY (#286 2 tur: 1. tur SORUN VAR — 500+ karakter tırnaklı değer maskelenmiyordu → 8aab1c4 ile kapandı; #472 ONAY) · mutasyon CI #287 (yetki testleri kırmızı) + yerel · satır notu gereği MERGE YOK (KVKK — iz içinde kazara kişisel veri riski); merge kararı PO/strateji katmanında · PO kısmı: TEYİT GEREK (satırda PO adımı yazılı değil; "kayıtsız tam erişim" sorusu avukatta, 03-PO A6) |

---
## AŞAMA GV — GÜVENLİK VE KVKK KONSEYİ (2026-09-21)
> 🔴 Bu bölümden 3 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (GV-09, GV-17, GV-12) · kilit haritası: § 🔴 KİLİT HARİTASI.

> Kaynak: `docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md`. Önek **GV-** seçildi çünkü raporun `G-??`
> öneki bilanço kart kodlarıyla (`G1-22`, `G3-08`…) karışıyor.
> ⚠️ **GV-01 ve GV-02 bu tabloda DEĞİL** — kuyruğun en üstündeki ⛔⛔ bloğunda (bkz. yukarı).
> ⚠️ **GV-24 ve GV-25 RAPOR BOŞLUĞUDUR:** raporun §2.A.2'si 7 IDOR bulgusu sayıyor ama §3 tablolarına
> yalnız 5'i alınmış. KURAL 9 gereği (*"listede satır almayan bulgu, bulgu sayılmaz"*) satır açıldı ve `⚠️`
> ile işaretlendi — **PO onaylamazsa düşer, kayıt kalır.**
> ⚠️ **Kapı sapması:** GV-09 raporda 🟡 önerilmişti; aynı rapor onun için karar kartı açtığı için kuyruk kapı
> kuralı gereği **🔴 KARAR-38** yapıldı. Diğer tüm kapılar raporun önerisiyle birebir.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|

---

> Bu aşamada **21 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27).

## AŞAMA PS — PSİKOMETRİ KONSEYİ (2026-09-21)
> 🔴 Bu bölümden 2 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (PS-03, PS-A2) · kilit haritası: § 🔴 KİLİT HARİTASI.

> Kaynak: `docs/raporlar/kesif/konsey-psikometri-2026-09-21.md`. Önek **PS-** (raporun `S-??` öneki yerine).
> ⚠️ **Kapı sapmaları gerekçeli:** PS-05 · PS-07 · PS-08 · PS-11 raporda 🟡 idi → **🟢** (üç istisnanın hiçbiri
> yok; PS-07/PS-08 yalnız `tests/` altına dokunuyor — motor dosyasına tek satır girerse kapı 🟡'ye döner).
> PS-10 raporda 🟢 idi → **🟡** (k-anonim maskeleme davranışına temas ediyor).
> ⭐ **EK (2026-09-21, BE turu): `PS-A1`…`PS-A4` — KARAR CEVAPLARINDAN doğan 4 satır** (konsey bulgusu değil).
> `PS-A1/A2/A3` = **KARAR-10 → C**'nin üç aşaması (düzelt+test → backfill → bağlama+feature flag); sırayla yapılır, atlanmaz.
> `PS-A4` = **KARAR-6 ek(1)** menti tarafı alt uyum eşiği. Dördü de 🟡 (matching / canlı veri).
> ⚠️ **PS-04, U-18'in sonuç ayağıdır** — PO isterse açılmaz ve U-18 Not'una katlanır; ama o zaman
> `/admin/eslesmeler` tablosu ve çift risk sinyali **izsiz kalır** (bugün hiçbir satırda yoklar).

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| PS-A3 | Ş0 | **⭐ KARAR-10 · AŞAMA 3 — EŞLEŞTİRMEYE BAĞLA, AÇMA/KAPAMA ANAHTARIYLA.** Yeni motor eskisinin **yanında** çalışır (feature flag); önce **eski/yeni sıralama karşılaştırması PO'ya gösterilir**; PO onaylarsa açılır, **tek tuşla eskiye dönülür.** NEDEN: kullanıcı daha zengin profile göre sıralanmış mentör listesi göremiyor; yeni motor canlı eşleştirmeye bağlı değil (KARAR-10 aşama 3). | 🟢 | PO karşılaştırmayı gördükten ve onayladıktan sonra: kullanıcı daha zengin profile göre sıralanmış mentör listesi görüyor — ve anahtar kapatılırsa eski listeye anında dönülüyor | BEKLIYOR | ⛔ Ön koşul **PS-A1 → PS-A2**. ⛔ **ANAHTAR (feature flag) ZORUNLU — PO şartı.** ⚠️ **I-13 düzeltilmeden bağlama RASTGELEDEN BETERDİR:** `COMPATIBILITY_MATRIX['M1_m1']=60` (`scoring.config.ts:38-44`) karakter skorunu **düzleştirir**, `BLOCKED_PAIRS` (`:33`) yüzünden toksik-çift vetosu **hiç tetiklenmez**. ⚠️ **ÖLÇÜM MEKANİZMASI YOK** — `Match` tablosuna yazılmıyor ⇒ *"daha iyi"* bir süre **PO'nun gözüyle** değerlendirilir. ⛔ **`Match` yazımı açılırsa KVKK sırası bağlayıcıdır:** önce silme yolu (`GV-08`), SONRA `Match` yazımı (`U-18`) — ters sıra = KVKK ihlali. ⚠️ **KARAR-6 bağlantısı:** menti ekranındaki uyum yüzdesi bugün DISC skorudur → motor bağlanınca **YÜZDELER DEĞİŞİR.** = `F-11` / `I-15` şemsiyesi altında. Efor XL · aile: Y-C · Kapı 🟢 + 7b (b)(c) (PO 2026-09-27, GÖREV 0.2 — matching dosyası); ön koşul ve anahtar şartları geçerli · I-15 buraya katlandı (KARAR-80/M9) · ön koşul durumu: PS-A1 tamamlandı · PS-A2 🔴 KARAR-58 bekliyor · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § PS-A3 (2026-09-28) · kilit: kalan ayak KARAR-58 bekliyor (ön koşul PS-A2 üzerinden) · 2026-09-28 tur kontrolü: ön koşul PS-A2 🔴 KARAR-58 bekliyor → sıra geçildi (BEKLIYOR kalır) |

---

> Bu aşamada **11 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27). 1 katlanmış satır → `docs/otonom/arsiv/00-KUYRUK-katlanmis.md`.

## AŞAMA IC — İÇERİK KONSEYİ (2026-09-21)
> 🔴 Bu bölümden 2 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (IC-13, IC-14) · kilit haritası: § 🔴 KİLİT HARİTASI.

> Kaynak: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md`. Önek **IC-** (raporun `C-??` öneki yerine).
> ⚠️ AŞAMA I ile **örtüşen** bulgular buraya YENİ satır olarak girmedi — ilgili `I-xx` satırının Not'una
> *"= içerik konseyi §…, ek bulgu: …"* biçiminde eklendi (I-01 · I-03 · I-10 · I-15 · I-16 · I-17 · K-18).
> Kapı dağılımı: 🟢 10 · 🟡 2 (IC-06, IC-08 — ikisi de auth) · 🔴 2 (IC-13, IC-14). Migration/seed gerektiren **yok**.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| IC-10 | Ş1 | **madde 139'un eksik yarısı: 4 menti "şimdilik" varyantı YAZILSIN.** Bugün yalnız mentör tarafı yazılı (4/8). NEDEN: çoklu arketip çıkan menti "şimdilik" metnini göremiyor; bugün yalnız mentör varyantları yazılı (madde 139). | 🟢 | (ön koşul işi — kullanıcı etkisi `I-15` ile birlikte görünür: çoklu-arketip çıkan **menti** de "şimdilik" metnini okur) | ✅ BITTI (2026-09-26, metin yazıldı — onay bekliyor) | §0② · §2.1. ⚠️ Eşik dalı yazılırken sihirli sayı YOK: eşik sabiti `scoring.config.ts:31` komşusuna. ⚠️ Ad seçimi ad↔kod kararına bağlı (**KARAR-45**). Efor S (yazım) · ✅ **YAZILDI 2026-09-26:** `docs/raporlar/icerik/menti-simdilik-varyantlari.md` (4 varyant, mentör §6 yapısının birebir aynası; adlar yer tutuculu — KARAR-45). Kullanıcı etkisi I-15 ile görünür (🔴 KARAR-10). PO metin onayı belgede ⬜. · kilit: kalan ayak KARAR-45 bekliyor (arketip adları (metinde yer tutucu)) · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § IC-10 (2026-09-28, AJ-68) |
> Bu aşamada **11 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27).

---

## AŞAMA YN — YÖNETİŞİM KONSEYİ (2026-09-21)
> 🔴 Bu bölümden 4 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (YN-02, YN-04, YN-05, YN-06) · kilit haritası: § 🔴 KİLİT HARİTASI.

> Kaynak: `docs/raporlar/kesif/konsey-yonetisim-2026-09-21.md`. Önek **YN-** çünkü `Y-` zaten yol haritası
> devri için kullanılıyor (AŞAMA Y).
> ⚠️ **YN-01 ve YN-02 bu turda KISMEN KAPANDI:** CLAUDE.md bölme KADEME 1 bu PR'da uygulandı ve
> **commit edildi** (47.456 → 34.742 karakter, pay 258). YN-01'in "commit edilmemiş" uyarısı bu PR ile düştü;
> **Kademe 2 açık kalıyor.** YN-02'nin doğurduğu KURAL 8 mükerreri de bu turda oluştu ve AÇIK.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| YN-07 | Ş0 | **Otonom sözlük çelişkisi — motorun her tur okuduğu üç dosya üç farklı set sayıyor, ikisi "başkası YASAK" diyor.** `OTONOM-PROMPT.txt:80-81` 7 kod (`PR-ACIK` dahil) · `00-KUYRUK.md:53-54` 6 kod (`PR-ACIK` **yok** ama gövdede F-19'da kullanılıyor) · `CLAUDE.md § KURAL 10` 6 tamamen farklı kod. Ayrıca prompt `:148-150` **"AŞAMA K"** sayıyor, kuyrukta `grep -c "AŞAMA K"` = **0**; kuyruktaki `A·B·C·D` promptta yok. NEDEN: otonom motorun okuduğu üç dosya farklı durum kodu setleri sayıyor; ajan yanlış kodla çalışabilir. | 🟢 | Motor her turda tanımlı kod setiyle çalışıyor; aşama listesi 11 = 11 | BASARISIZ | §D.3 Ç-1/Ç-4 · E-4. `OTONOM-PROMPT.txt:80-84` canonical (en yeni); kuyruk ona hizalansın. İki sözlüğe **"hangi belge için geçerli"** cümlesi eklenmeli. · ⚠️ **KISMEN (2026-09-25):** kuyruk ↔ prompt durum kodu hizası çözüldü (`00-KUYRUK.md` "Durum kodları" 7 kod). Kalan: CLAUDE.md sözlük hizası. · **BASARISIZ (2026-09-25):** teslimat `CLAUDE.md` düzenlemesi gerektiriyor; PO talimatı (2026-09-25): "CLAUDE.md'ye DOKUNMA" (önceki turda CLAUDE.md işlemi denetleyiciye takılmıştı). Merge kuralları bunun yerine `OTONOM-PROMPT.txt` §7b'ye yazıldı. PO elle yapabilir ya da ayrı onayla açılır. |
| YN-08 | Ş0 | **Mod etiketi 2 mi 3 mü + şerit sistemi promptta hiç yok.** `CLAUDE.md § MOD ETİKETİ` tablosu **2 mod** (🟥/🟩) ↔ `§ Çalışma Sözleşmesi` **3 mod** (PLAN/BYPASS/**MANUEL-ONAY**, renk yok). `00-KUYRUK.md:58-66` 5 şerit (Ş1-Ş4 + **Ş0**) ↔ `CLAUDE.md` "en fazla 4 şerit" ↔ `OTONOM-PROMPT.txt`'te şerit **hiç geçmiyor**. NEDEN: mod ve şerit tanımı üç dosyada farklı; ajan hangisine uyacağını bilemiyor. | 🟢 | Üç dosya aynı mod ve şerit tanımını veriyor | BASARISIZ | §D.3 Ç-2/Ç-3 · E-5. Mod tablosu canonical; üçüncü mod ya `~~[ESKİ]~~` ya tabloya renk koduyla girsin. Şerit: kuyruk canonical (dosya sahipliği orada), prompta tek satır atıf, CLAUDE.md "4" → "4 paralel + Ş0 sıralı". · **BASARISIZ (2026-09-25):** teslimat `CLAUDE.md` düzenlemesi gerektiriyor; PO talimatı (2026-09-25): "CLAUDE.md'ye DOKUNMA" (önceki turda CLAUDE.md işlemi denetleyiciye takılmıştı). Merge kuralları bunun yerine `OTONOM-PROMPT.txt` §7b'ye yazıldı. PO elle yapabilir ya da ayrı onayla açılır. |
| YN-13 | Ş0 | **Kişi adı yasağı kendi dosyasında ihlal ediliyor.** Kural `CLAUDE.md § Kişi Adı Yasağı` *"Hiçbir kod/yorum/commit/PR/belgeye kişi adı YAZMA"*; ihlal **aynı dosyanın 279 satır yukarısında** (`CLAUDE.md § Nedir`) + `00-KUYRUK.md:2` + toplam **13 dosyada 15 geçiş**. Kuralın kendi istisnası (*"ayrı bir temizlik işinde giderilir"*) → iş **hiç açılmadı**. ⚠️ **Repo PUBLIC.** NEDEN: repo public ve kişi adı yasağı ihlal ediliyor (13 dosyada 15 geçiş). | 🟢 | Public repoda kişi adı geçmiyor | ✅ BITTI (kısmen, PO elle işi kaldı) | §B.3-4. ⚠️ KVKK metinlerindeki **4 geçiş yasal zorunluluk**, hariç (G9-14 "DOKUNULMADI" kararı). **Bu satır ve bu rapor ad listesi ÜRETMEZ** — `grep` PO'nun elinde. · aile: Y-B · ✅ **BITTI 2026-09-26:** çatı #334. Kalan PO kısmı: backend `.claude/settings.local.json` → 03-PO-ELLE-ISLER. · Kapsam dışı (bilinçli): `kvkk-metinleri/` (yasal zorunluluk) · repo bağlantılarındaki GitHub kullanıcı adı · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § YN-13 (2026-09-28) + § YN-13 (2026-09-28, AJ-68) |

---

> Bu aşamada **7 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27). 1 katlanmış satır → `docs/otonom/arsiv/00-KUYRUK-katlanmis.md`.

## AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)
> 🔴 Bu bölümden 13 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (AN-03, AN-04, AN-08, AN-20, AN-21, AN-31, AN-33, AN-34, AN-37, AN-38, AN-45, AN-50, AN-51) · kilit haritası: § 🔴 KİLİT HARİTASI.

> Kaynak raporlar (hepsi `docs/raporlar/kesif/`): `00-ANALIZ-TURU-OZETI-2026-09-23.md` (§3 A1-A16) · `persona-panel-gelisimi-2026-09-23.md` (§6 PP) · `icerik-tam-okuma` · `icerik-mutabakati` · `icerik-kalitesi`. Her satır kaynağını OKUMADAN anlaşılır olsun diye Not'ta kanıt (dosya:satır) + kaynak + "neden gerekli" var.
> ⚠️ **A11 (NOT-ekle, yeni satır AÇMA):** §3 A11'in beş bulgusu için YENİ satır açılmadı (kurala uyuldu). Dispozisyon: OB-16→**KARAR-45** (EK, Bölüm 4) · OB-17→**I-10/I-16** (VisibilityOptIn migration'sız yol, mevcut satır) · OB-18→**K-18** (7↔8 aşama) · OB-20→**IC-11** (algorithm-tuner "kişilik uyumu") · OB-21→**KARAR-48** (EK, Bölüm 4). Kanıt: `00-ANALIZ-TURU-OZETI-2026-09-23.md:73`.
> ⚠️ **"⛔ ÇIKIŞ BLOKERİ" etiketi:** işaretli satırların "çıkış blokeri" olup olmadığı **KARAR-69 ("çıkış" tanımı) bekliyor** — tanım gelene kadar etiket adaydır.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AN-02 | Ş1 | **Seed metin yazım düzeltmesi:** `seed.ts:69` "güçlüğüm"→"güçlü yanım" + `seed.ts:537` "Menteen"→"Mentin". NEDEN: kullanıcı soru metinlerinde yazım hatası görüyor ("güçlüğüm", "Menteen"). | 🔵 | Kullanıcı doğru yazımı görüyor | PR-ACIK | Kaynak: A3 · IK(A.3). hassasiyet: seed dosyası (⛔ seed ÇALIŞTIRILMAZ, yalnız metin düzeltme); canlıda görünür. · aile: Y-G · 🔀 **PR-ACIK 2026-09-26 (🔵):** backend #160 — `seed.ts:70` "güçlüğüm"→"güçlü yanım" · `:540` "Menteen"→"Mentin" (seed ÇALIŞTIRILMADI; güncel satır numaraları 70/540). Canlı düzeltme = 2 satır UPDATE → **KARAR-99** EVET/HAYIR. · kilit: KARAR-99 bekliyor (EVET/HAYIR) |
| AN-05 | Ş1 | **Menti "şimdilik" 4 varyantı + eşleşme detay 15/16 kombinasyon metnini yaz.** | 🟢 | Menti belirsiz eşleşmede doğru "şimdilik" metnini görüyor | 🟨 kısmen (metin yazıldı, PO onayı bekliyor — bitti-dogrulama 09-27 ⚠️) · ✅ BITTI (2026-09-26, metin yazıldı — onay bekliyor) | Kaynak: A6 · IK(D) · TO Y-30. IC-10 / I-11 ön koşulu; menti varyantı 0 yazılı. Neden: bugün boş/eksik metin. · ✅ **YAZILDI 2026-09-26 (daraltılmış kapsam: 15/16 kombinasyon):** `docs/raporlar/icerik/birlikte-calisma-kombinasyonlari.md` — kaynak örnek (Rotacı×Ayna) aynen + 15 yeni metin, aynı 4 parçalı yapı; "eşleşme" sözcüğü kullanılmadı (KARAR-66 B). Adlar KARAR-45'e bağlı; PO metin onayı belgede ⬜. Menti "şimdilik" varyantları IC-10 ile ayrıca yazıldı. · kilit: kalan ayak KARAR-45 bekliyor (arketip adları) · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § AN-05 (2026-09-28, AJ-68) |
| AN-06 | Ş0 | **Deploy topolojisi + kapasite teyidi:** Neon `connection_limit` · cron çok-instance advisory-lock. NEDEN: cron birden çok kopyada çift çalışabilir; deploy topolojisi ve bağlantı kapasitesi teyit edilmedi (A7 · OB-06/OB-08). | 🟢 | Topoloji doğrulandı, cron çift-çalışma riski kapandı | BEKLIYOR | Kaynak: A7 · OB-06/OB-08. PO teyidi = `03-PO-ELLE-ISLER.md`. Tek-instance ise OB-08 ⚫; değilse 🟡 kod işi. · aile: Y-? (belirsiz — deploy/cron altyapı, PO-ELLE) · ⚠️ 2026-09-26 not: cron çift-çalışma kilidi Neon bağlantı havuzunda (pooler) oturum-düzeyi `pg_advisory_lock` ile güvenilir çalışmaz; sağlam çözüm iş-penceresi tablosu = migration (🔵). Önce PO teyidi (tek instance mı) gerekir → 03-PO-ELLE-ISLER. · 2026-09-28 tur kontrolü: PO teyidi (tek instance mı) 03-PO-ELLE-ISLER'de bekliyor; sağlam kilit = migration (🔵) → sıra geçildi |
| AN-10 | Ş1 | **Terim tutarsızlığı: §5'teki 31 nokta** (mizaç/karakter/kişilik · mentor/mentör · görüşme/toplantı/randevu). NEDEN: aynı kavram ekranlarda farklı adlarla geçiyor (TO §5: 31 nokta) — kullanıcı tutarsız dil görüyor, aynı şeyi ayrı şey sanabilir. | 🟢 | Kullanıcı aynı şeyi her ekranda aynı adla görüyor | ✅ BITTI (kısmen, KARAR-64 ayağı açık) | Kaynak: A12 · TO §5 · IK. IC-02/IC-11 ekine. ⚠️ **KARAR-64 (mizaç/karakter/kişilik) cevabından SONRA** yapılır. · DURUM: mentor/mentör yazım ayağı BITTI (çatı #339 + AN-10b #347) · görüşme ayağı IC-11 ile BITTI · KALAN: mizaç/karakter/kişilik adlandırma ayağı → 🔴 KARAR-64 (PO; KARAR-80/M16) · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AN-10 (2026-09-28) · kilit: kalan ayak KARAR-64 bekliyor (mizaç/karakter/kişilik adlandırması) |
| AN-12 | Ş3 | **`interactionStyle` karantina** (dondurulmuş alanı yazma şemalarından çıkar) + tie-break tek kaynak (D>I>S>C ↔ D>I>C>S). NEDEN: dondurulmuş `interactionStyle` alanı hâlâ yazılıyor ve DISC eşitlik sırası iki yerde farklı — harf sonucu değişebilir (A14 · TO Y-13/Y-16). | 🔵 | Tek tie-break kuralı; ölü alan yazılmıyor | PR-ACIK | Kaynak: A14 · TO Y-13/Y-16. ⛔ SİLME PROTOKOLÜ (karantina, silme değil). 🟡 matching; tie-break önce doğrula (harf sonucu değişir). · aile: Y-C · 🔵 **HAZIRLANDI 2026-09-27:** backend #186 (karantina: 3 yazma yolu kapandı, okuma/şema aynı; 7b ONAY, CI yeşil) + çatı #370 (silme protokolü arşivi `docs/arsiv/silinenler-2026-09-27.md`). EVET/HAYIR: **KARAR-107**. Tie-break kısmı ayrı ürün sorusu: **KARAR-108** (bugün etkisi yok). · kilit: KARAR-107 bekliyor (EVET/HAYIR) · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § AN-12 (2026-09-28, AJ-68) |
| AN-26 | Ş2 | **Müsaitlik hatırlatması (zamanlanmış iş) + kurum yöneticisine eskalasyon:** menti talebinden 3 gün→mentöre hatırlatma · 7 gün→2. hatırlatma · 10 gün→yöneticiye bildirim. NEDEN: mentör talebe yanıt vermezse menti süresiz bekliyor; kimse haberdar olmuyor (KARAR-53 ④). | 🔵 | Yanıtsız mentör dürtülüyor, uzun sessizlikte yönetici haberdar | PR-ACIK | Kaynak: **KARAR-53 ④** (Bölüm 3, süreler ajan varsayılanı gerekçeli). ⚠️ SMTP'ye bağlı (03-PO B4); zamanlanmış iş altyapısı. 🟡. · aile: Y-D · 🔀 **PR-ACIK 2026-09-26 (🔵 akışı — uygulama migration gerektirdi):** backend #157 (`fb6c411`) + çatı #337 (pointer). Migration: `Conversation` +3 nullable guard alanı (yalnız ekleme, ÇALIŞTIRILMADI). · ✅ 7b 2. tur ONAY. Kalan: KARAR-98 EVET (+ alt soru) + `Conversation` yedeği. · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AN-26 (2026-09-28, düzeltme) + § AN-26 (2026-09-28, AJ-68) · kilit: KARAR-98 bekliyor (EVET/HAYIR) |
| AN-27 | Ş2 | **"Zaman önerisi" mesaj tipi:** yapılandırılmış mesaj (menti NEDEN görüşmek istediğini + talep edilen ZAMAN); mentör sıradan mesajdan ayırt eder. NEDEN: mentör menti'nin zaman önerisini sıradan mesajdan ayırt edemiyor (KARAR-53 ②④). | 🔵 | Mentör "zaman önerisi"ni normal mesajdan ayırt ediyor | BEKLIYOR | Kaynak: **KARAR-53 ②④** (Bölüm 3). Mesaj şemasına tip alanı → 🟡 (KARAR-1 birleşik migration'a katılabilir). · aile: Y-G |
| AN-29 | Ş3 | **Topluluk tipi kurum + lider başvuru/onay akışı:** lider talep oluşturur → PO yalnız lideri onaylar → lider üyelerini kendisi davet eder. NEDEN: topluluk lideri kendi ekosistemini açamıyor; PO yalnız lideri onaylama modeli kodda yok (KARAR-34 SORU 1). | 🟢 (+7b) | Topluluk lideri başvurup onaylanınca kendi ekosistemini açıyor | BEKLIYOR | Kaynak: **KARAR-34 SORU 1** (Bölüm 3). hassasiyet: auth + kurum akışı; KARAR-34 cevaplı ama kayıt metni AVUKAT bekliyor (AN-30). · ⛔ **çelişki: KARAR-80/M17** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M17: KARAR-34 CEVAPLANDI (2026-09-23) — kapı 🟡'ye döndü. · ⚠️ 2026-09-28 tur kontrolü: KAPI YANLIŞ — "topluluk tipi kurum" için şemada kurum türü alanı yok (`backend/prisma/schema.prisma` model Tenant: type/kind/community alanı YOK, grep 0) → yeni alan = migration → Bölüm 7 gereği 🔵; ayrıca kayıt metni avukat bekliyor (AN-30). Kapı hücresi değiştirilmedi (strateji katmanı onaylasın), satır bu turda yapılmadı |
| AN-30 | Ş3 | **Kayıt ekranı: zorunlu + isteğe bağlı maddeler** (DISC eşleştirme · yurt dışı saklama · veri işleme · anonim iyileştirme = ZORUNLU; kurumlar-arası paylaşım · OCEAN = İSTEĞE BAĞLI). Aynı ekran kurum yöneticilerine de. NEDEN: KVKK gereği kullanıcı zorunlu ve isteğe bağlı rızaları ayrı ayrı verebilmeli; bugün tek onay var (KARAR-34 SORU 1, çıkış blokeri). | 🔵 | Kullanıcı ayrı ayrı onay veriyor; zorunlu eksikse giriş yok | PR-ACIK | KAYNAK: KARAR-34 SORU 1 · F-03 buraya katlandı (KARAR-80/M17) · ⛔ ÇIKIŞ BLOKERİ (KARAR-69 B, 2026-09-23): onay ekranı ilk kullanıcıyla devreye giren KVKK tabanı · DURUM: PR-ACIK — backend #142 (⛔ MIGRATION: `ConsentType`'a 6 yeni değer; dosya elle yazıldı, uygulanmadı) + çatı #320: klasik ve OAuth kaydında `GranularConsentForm` (6 kutu), `NEXT_PUBLIC_GRANULAR_CONSENT_ENABLED` bayrağı arkasında (varsayılan kapalı → canlıda görünmez) · metinler yer tutucu: ⛔ avukat onayı olmadan canlıya açılmaz · KALAN (PO): ⓐ migration onayı ⓑ STK self-serve kurum kaydı ekranı ayrı iş olarak kuyruğa alınsın mı (satırı yok) ⓒ bayrağın açılışı avukat metni sonrası · ✅ 7b 2. tur ONAY (2026-09-26; backend `df8db92` · çatı `43490fc`) — PO EVET'i (KARAR-96) + `Consent` yedeği bekler. · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AN-30 (2026-09-28) · kilit: KARAR-96 bekliyor (EVET/HAYIR) |
| AN-36 | Ş3 | **Veri İşleyen Sözleşmesi için Tenant yasal-kimlik alanları (G1-12).** NEDEN: kurum KVKK veri işleyen sözleşmesini panelden imzalayıp yönetebilmeli; bunun için yasal kimlik alanları (adres/KEP/MERSİS) gerekiyor (G1-12). | 🔵 (kod: migration) | Kurum, KVKK veri-işleyen sözleşmesini panelden imzalayıp yönetebilir | BEKLIYOR | kaynak: CS raporu (KN-04) · §4.2 (G1 en değerli öksüz). Kanıt: `G1-guvenlik-kvkk.md` G1-12; kuyrukta karşılığı yok. hassasiyet: migration + KVKK/hukuk. `[PO DOLDURACAK]` yasal alanlar (adres/KEP/MERSİS) **kod-dışı** → 03-PO-ELLE. · aile: Y-G · PO kısmı: kurumun yasal kimlik bilgilerini (adres/KEP/MERSİS) sağlamak ve veri işleyen sözleşme metnini avukata onaylatmak; kod kısmı migration içerdiğinden 🔵 akışıyla hazırlanır. · kısım kapısı: PO kısmı (yasal kimlik bilgileri + avukat onayı) → 03-PO — güncel kapı Not'taki son karardan: "kod kısmı migration içerdiğinden 🔵 akışıyla hazırlanır" |
| AN-41 | Ş3 | **KVKK metin paketini kod-senkron güncelle** (avukata gitmeden önce; 4 boşluk kodda kapandı). NEDEN: KVKK metin paketi kodda kapanmış boşlukları hâlâ "yok" diye yazıyor; avukat ürünün gerçek durumunu görmeli (CS raporu KN-09). | 🟡 | Avukat, ürünün gerçek (güncel) KVKK durumunu görür | PR-ACIK | kaynak: CS raporu (KN-09) · Ç-12..15. Kanıt: metin "YOK/PR bekliyor" der, kodda merged: rıza sürümleme `consentService.ts:28` · hardDelete→anonymize `gdprService.ts:233` · FeedbackLog 3-yıl `gdprService.ts:370` · FE veri-hakları `profile/page.tsx:443`. ⚠️ KARAR-75 (kişi adı yasağı ↔ yasal metin, Ç-16) + YN-13 ile bağlı. 🟡 KVKK. KARAR-47 avukat paketine katılabilir. · aile: Y-B · ⛔ **çelişki: KARAR-80/M18** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M18: GV-18 notu eklendi — rıza sürümü kaydediliyor ama hiç kontrol edilmiyor; avukata 'sürümleme var' denecekse önce GV-18 kapanmalı. · PO kısmı: kod-senkron güncellenen KVKK metin paketini avukata götürüp onaylatmak (avukat paketi, KARAR-47). · kilit: kalan ayak KARAR-47 bekliyor (PO kısmı: avukat paketi) — § 🔴 KİLİT HARİTASI · kilit: kalan ayak KARAR-75 bekliyor (bağlı: yasal metinde kişi adı (Ç-16)) · 🟡 PR-ACIK 2026-09-29: çatı #477 — `docs/kararlar/konu/kvkk-metinleri/` durum senkronu (14 satır: 6 değişen · 4 yeni · 4 aynı; hukuki metin cümlelerine dokunulmadı) + avukata notlar N-1…N-9 (kapak Bölüm 10.2; yeni bulgu N-4: tek kurum yöneticisi hesabını kapatamıyor, 409 SON_ADMIN) · opus doğrulama ONAY https://github.com/zahidsamiata/menti-mentor-v2/pull/477#issuecomment-5879994976 (1 yanlış satır düzeltildi) · merge YOK (avukat paketi) · PO kısmı: `.docx` yeniden üretimi (`python scripts/kvkk-docx-gen.py`) + avukata gönderim |
| AN-49 | Ş3 | ⭐ **Dört feedback modeli tek KALİTE GÖRÜNÜMÜNE bağlansın.** Kim görür → KARAR-67 (drill-down) ile bağlantılı, önce ona bak. NEDEN: dört ayrı geri bildirim modeli var; yönetici tek ve tutarlı bir kalite görünümü göremiyor (strateji karar oturumu E.1c). | 🟢 ⚠️ şu an yapılabilir kısmı YOK — tamamı KARAR-67 + KARAR-89 bekliyor | Yönetici tek, tutarlı kalite görünümü görüyor | BEKLIYOR | kaynak: strateji karar oturumu (E.1c). ⛔ **SIRA ÖNEMLİ:** (1) KVKK silme yolu düzeltilsin (GV-08) → (2) SONRA `Match` yazımı açılsın (U-18/PS-04/F-11) → (3) SONRA kalite görünümü. Ters sıra KVKK ihlali doğurur. ⚠️ **KARAR-66 B ile çelişki YOK** — ölçüm kurulunca "yönlendirme kalitesi" iddiası KANITLA geri KONABİLİR. hassasiyet: matching/KVKK bağımlı. · aile: Y-C · kilit: kalan ayak KARAR-67 bekliyor (önce KARAR-67: kim görür (drill-down)) — § 🔴 KİLİT HARİTASI · kilit: kalan ayak KARAR-89 bekliyor (kart KARAR-89 bu işi kilitlediğini söylüyor (tek değerlendirme kutusu)) |
| AN-52 | Ş1 | ⭐ **Ürün-içi OTOMATİK geri bildirim soruları** — köşede, ZORUNLU DEĞİL, kapatılabilir; her soru HANGİ varsayımı sınadığını belirtir. Çıktı: soru seti + nereye gömüleceği + veri nasıl birikeceği. | 🔵 | Kullanıcı köşede isteğe bağlı soru görüyor; cevaplarsa veri otomatik birikiyor | PR-ACIK | kaynak: **KARAR-70 eki** (E.3). ⛔ Zorunlu tutma · ⛔ tekrar tekrar sorma (kırılgan kullanıcıda baskı = KARAR-71 tutundurma etiği sınırı). ⚠️ STRATEJİ NOTU: otomatik sorular KALANLARI anlatır, GİDENLERİ değil → KARAR-70 C'deki "bırakanla 2-3 görüşme" bunu telafi eder. Neden gerekli: PO tek tek insan aramaz, veri otomatik biriksin. · ⭐ **PLAN HAZIR 2026-09-27:** çatı #369 (`64e8afc`, 7b 2 tur ONAY) — `docs/raporlar/kesif/an52-urun-ici-geri-bildirim-plani-2026-09-27.md`: 7 soru (8 varsayım), kullanıcı başına 1 kez, oturumda en fazla 1, kapatılan bir daha sorulmaz. **KAPI 🟢→🔵 (kural uygulaması):** mevcut 4 geri bildirim tablosu bu anlara uymuyor (görüşme/eşleşmeye zorunlu bağlı) → yeni `ProductSurveyResponse` tablosu = migration. Sıra: AN-52-1 🔵 migration + EVET kartı → AN-52-2/3/4 🟢 (uçlar, köşe kart + 7 tetikleyici, KVKK dışa aktarım/silme) → AN-52-5 🟡 aydınlatma metni (avukat) · AN-52-7 🔴 yönetici görünürlüğü (planda taslak kart). ⚠️ S7 tetikleyicisi: iptal durumu ret dışı yollarla da oluşuyor (`meetingController.ts:794`) — uygulama turu ayırt etmeli. · F-31 buraya katlandı (KARAR-80/M12; sıra notu: AN-47 → KR-08 → AN-48 aynı migration'a; KARAR-44 ile KARAR-78 aynı oturumda cevaplanmalı — ikisi de CEVAPSIZ, bu satırı BLOKE ETMİYOR) · AN-52-1 PR-ACIK: backend #185 (`ProductSurveyResponse` yeni tablo; migration elle yazıldı, uygulanmadı; AN-52-2 uçları + AN-52-4 KVKK dışa aktarım/anonimleştirme aynı PR'da) · EVET/HAYIR: KARAR-106 (yedek gerekmez — yeni tablo) · merge PO EVET'ini bekliyor · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AN-52 (2026-09-28) · kilit: KARAR-106 bekliyor (EVET/HAYIR (AN-52-1)) |

---

> Bu aşamada **17 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-27). 11 katlanmış satır → `docs/otonom/arsiv/00-KUYRUK-katlanmis.md`.

## AJAN-EKLEDİ SATIRLAR (K-C · PO kararı 2026-09-26, kalıcı)
> 🔴 Bu bölümden 10 iş karar bekliyor → `00-KUYRUK-KARAR-BEKLEYEN.md` (AJ-10, AJ-11, AJ-14, AJ-34, AJ-38, AJ-49, AJ-64, AJ-67, AJ-92, AJ-97) · kilit haritası: § 🔴 KİLİT HARİTASI.
Ajan, kodda **dosya:satır ile DOĞRULADIĞI** bir hata/eksik için bu bölüme satır ekler ve PO onayı beklemeden kapı kuralına göre işler.
- **Kimlik:** `AJ-<sıra>` (mevcut Y1-B8/Y1-B9 kimlikleri korunur).
- **Not'ta zorunlu:** `ajan-ekledi <tarih> · kaynak: <rapor:satır> · kanıt: <dosya:satır>`.
- **Kapı:** varsayılan 🟢 (hassas dosyada 7b) · migration/seed/canlı veri/karantina → 🔵 + EVET kartı · ürün/yetki/KVKK sonucu olan soru → 🔴 + karar kartı. Şüphede 🔵/🔴 tarafına yuvarlanır.
- **Doğrulanamayan bulgu satır OLMAZ** (kaynak rapordaki "teyit gerek" listesinde kalır). Mükerrerlik önce kuyrukta + `docs/otonom/arsiv/` altında aranır.
- Silme/kaldırma → silme protokolü (karantina 🔵, gerçek silme 🔴).
- Ürün kararı gerektiren "şu da yapılmalı" gözlemi yine `01-KARARLAR.md`'ye karar kartı olarak gider.

> Bu bölümde **56 iş BITTI** → arşiv: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` (son taşıma 2026-09-28).


| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AJ-46 | Ş0 | **Belge/yönetişim işlerinin eksik ayakları (kova)**: YN-09 (1.000+ karakter satır yeniden arttı) · YN-10 (CLAUDE.md içinde iki bayat satır atfı) · YN-11 (yeni raporlar etiketsiz) · YN-12 (indekssiz klasörler) · YN-14 (B.4-4/5/6/7/9 birleştirmeleri) · AN-35 (Ö1-Ö5 kuyruğa bağlanmadı) · AN-54 (ortak adlı alanlar taranmadı) · E-1 (kalem başına niyet kanıtı) · KR-22 (verify.sh fark listesine docker-prisma job'u). NEDEN: BITTI denen belge/yönetişim işlerinin eksik ayakları yeniden doğrulamada ortaya çıktı; belgeler kod gerçeğini yansıtmıyor (bitti-dogrulama-2026-09-27). | 🟢 | Her kalemin ölçütündeki eksik ayak tamam; bekçi/sayım kanıtı | BITTI (kısmen — AJ-68) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` (parti 10/11 + QA/QD/QE2/QE3/QE5) · kanıt: raporun ⚠️ tablosu · DURUM: kova 8/9 tamam — çatı #404 (7b ONAY; bekçi testi 22/22, mutasyon kanıtlı) · KALAN: YN-09 (1.000+ karakter satır sayısı düşmedi) → AJ-68 · E-1'de gerekçesiz iki uç (`PATCH /users/:id/self-profile`, `POST /users/:id/temperament-test`) KARAR-11 kapsamında — silme protokolü gereği karantinaya bile alınmaz · satır 5c-a gereği kuyrukta (kısmen) · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AJ-46 (2026-09-28) |
| AJ-50 | Ş0 | **Mevcut kayıtlarda kişilik kartının içinde ham DISC vektörü/puanı duruyor** (AJ-21 kalanı) — okuma yolu artık süzüyor, yeni kayıtlar temiz; eski kayıtların kartında fazlalık veritabanında kalıyor. | 🔵 (canlı veriye yazma) | Mevcut `discResultCard` kayıtlarında `discVector`/`rawScores` anahtarı yok; tarihli yedek alındı | PR-ACIK | ajan-ekledi 2026-09-27 · kaynak: AJ-21 (backend #194) · kanıt: `backend/src/controllers/onboardingController.ts` · okuma süzgeci `backend/src/services/discVisibility.ts:31-46` · yöntem önerisi: tarihli yedek + tek seferlik JSON güncellemesi (`discResultCard - 'discVector' - 'rawScores'`); DB erişimi gerekir (VPS'te yok) → hazırlık PR + EVET kartı · acil değil (sızıntı okuma yolunda kapalı) · 🔵 **PR-ACIK 2026-09-27:** backend #212. EVET/HAYIR: **KARAR-116**. MERGE YOK — PO EVET + tarihli yedek (DB erişimi) sonrası. · kilit: KARAR-116 bekliyor (EVET/HAYIR) · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § AJ-50 (2026-09-28, AJ-68) |
| AJ-56 | Ş0 | **Ana kurumu başka olan üye, yönetici listesinde görünüyor ama üzerinde tekil işlem yapılamıyor (404)** (AJ-40 kalanı) + Pasif üye sayımı ve onaylayan adı araması hâlâ ana kurumdan. NEDEN: misafir üyeler yönetici listesinde görünüyor ama üzerlerinde işlem yapılamıyor (404); pasif üye sayısı yanlış kurumdan (AJ-40 kalanı). | 🟢 (+7b) | Misafir üyede yönetici tekil işlemleri çalışıyor (ya da bilinçli olarak kapalı ve ekranda belirtiliyor); Pasif üye sayımı üyelikten; test | BITTI (kısmen — KARAR-133) | ajan-ekledi 2026-09-27 · kaynak: AJ-40 7b (backend #205) · BITTI (kısmen — KARAR-133) 2026-09-28: karar gerektirmeyen kısım backend #249 + çatı #442. Kişi-genel yazan işlemler (onay/ret/düzeltme/rematch/rol) misafirde 404 — KARAR-133 bekleniyor; negatif testle kilitli (kayıt değişmiyor). · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § AJ-56 (2026-09-28, AJ-68) |
| AJ-68 | Ş0 | **1.000+ karakterlik satırlar (YN-09 kalanı)** — kuyrukta 39, karar-takipte 25 satır (2026-09-27 ölçümü; 2026-09-28 GÖREV 2.4 sonrası kuyrukta 28 satır 1.000+ karakter, en uzun E-3 1.656) tavanı aşıyor; üstü-çizili zincirler taşındı (AJ-46), kalan uzunluk tarihli GÜNCELLEME/BITTI katmanlarından. Satır başına elle yargı: son geçerli hâl satırda, eski katman `arsiv/00-KUYRUK-gecmis.md` / KARAR-TAKIP `## GEÇMİŞ`'e AYNEN. | 🟢 | Bekçi kural (m) iki dosyada da uyarı vermiyor; her taşımada `kalan + taşınan = önceki` sayısı PR'da | BITTI (kısmen — 18 gerekçeli uzun satır) | ajan-ekledi 2026-09-27 (AJ-46/YN-09 kalanı) · ölçüm: `bash scripts/belge-bekci.sh` kural (m) · en uzunlar: kuyruk E-3 (4.830), karar-takip md.162 (2.880) · ⛔ anlam denetimi: taşınan katman "geçerli bilgi" içeriyorsa satırda özeti kalır · dikkat: kuyruk satırları ana ajanla aynı dosyada → sıralı · ek (2026-09-28, GÖREV 2.1 7b notu): AJ-46 (bu satırla) arşive geçince `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md`'deki 7 AJ-46 kaleminin (AN-35 · AN-54 · E-1 · YN-10 · YN-11 · YN-12 · YN-14) 🟨 ön eki AYNI commit'te ✅ TAMAMLANDI'ya çevrilir · 🟨 2026-09-28 çatı #453 (7b ONAY https://github.com/zahidsamiata/menti-mentor-v2/pull/453#issuecomment-5875598111): 66 satırın eski katmanları AYNEN taşındı (00-KUYRUK 22 + KARAR-BEKLEYEN 17 → `docs/otonom/arsiv/00-KUYRUK-gecmis.md`; 00-KARAR-TAKIP 27 → kendi `## GEÇMİŞ`), satır başına `kalan + taşınan = önceki` tutuyor, kayıp 0. YN-09: kuyruk 34 → 15 · karar-takip 28 → 3 · KARAR-BEKLEYEN 25 → 18. Kalan uzun satırlar gerekçeli ("geçerli bilgi — açık PR/kalan iş/sıra uyarısı/NEDEN; taşınabilecek katman atıftan kısa"): liste #453 açıklamasında. Ölçüt (bekçi uyarısı yok) tam tutmadı → satır kuyrukta kalır; bir sonraki taşıma yeni tarihli katmanlar biriktikçe. |
| AJ-79 | Ş0 | **"Varsayılana düşen profil/eşleştirme oranı" izleme metriği yok** (G2-06 / madde 111) — eşleştirme gevşetme seviyesi (`fallbackLevel`) yalnız istek başına dönüyor, hiçbir yerde toplanmıyor. | 🟢 (+7b) | Platform panelinde kurum başına "varsayılana düşen" oranı (toplu, kişi listesi yok) görünüyor; sayım testi (ör. 2/5 → %40) | BITTI (kısmen — AJ-111) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:86` · `docs/kararlar/00-KARAR-TAKIP.md:627` (GÖREV 4) · BITTI (kısmen — (b) gevşetme oranı → AJ-111 🔵) 2026-09-28: (a) profil oranı backend #251 + çatı #444. Tanım alt sınır (bozuk/confidence'sız vektör sayılmaz — ham okuma gerektirir; PR'da yazılı). CANLIDA BAK: platform yöneticisi kurum detayının Analizler sekmesinde "varsayılana düşen profil" oranını görüyor (küçük kurumda "gizli"). · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § AJ-79 (2026-09-28, AJ-68) |
| AJ-80 | Ş0 | **İki DISC yolunda "temel soru" eşiği farklı** (G2-09) — uyarlanabilir test 5 temel cevapta derinleşmeyi açıyor, soru servisi tüm temel soruların bitmesini bekliyor. | 🟢 (+7b) | Farkın niyeti çıkarıldı (git log/belge): bilinçliyse iki yerde gerekçe yorumu + test, değilse tek sabite bağlı; eşik testi | BITTI (kısmen — KARAR-57) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:89` (GÖREV 4) · ⚠️ numara çakışması: F-08'deki "G2-09" başka kalem · BITTI (kısmen — KARAR-57) 2026-09-28: backend #243 + çatı #437. Niyet araştırması: iki eşik `de6be04` toplu commit'ten, gerekçe yok. Davranış DEĞİŞTİRİLMEDİ (tek sabite bağlamak `/disc-test` ile panodaki günün sorusu akışını ve bekleme odası bildirim anını değiştirir → KARAR-57 "esas test hangisi"). Test: `backend/tests/disc-core-threshold.unit.test.ts` (7; iki yolun bugünkü eşiği kilitli; ek: uyarlanabilir yolda ilerleme göstergesi temel sorular sürerken "derinleşme" diyebiliyor — KARAR-57 ile birlikte). Kalan: eşiklerin birleştirilmesi → KARAR-57. · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § AJ-80 (2026-09-28, AJ-68) |
| AJ-91 | Ş0 | **Kurum yönetici paneli sayfa açıklama metinleri sadeleştirilmeli** — her sayfanın başındaki "bu sayfa ne işe yarar" metni daha basit/açıklayıcı olmalı (PO notu). | 🟡 (kuruma görünen metin — PO onayı) | Metinler tek sözlük dosyasında; her panel sayfasında tek cümlelik sade tanım; PR'da eski/yeni metin tablosu, PO onaylı; metin testi | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `docs/kararlar/konu/06-tasarim-ux.md:59` (GÖREV 4) · kanıt: `frontend/src/app/(admin)/admin/**` sayfa başlık altı metinleri · PO kısmı: `03-PO-ELLE-ISLER.md` § 🟡 KAPI SATIRLARININ PO KISMI · kısım kapısı: kod kısmı 🟢 |
| AJ-95 | Ş0 | **Prisma `Json` alanlarına yazım öncesi yapı doğrulaması yok** (madde 170) — uygulama tipi yazımda uygulanmıyor; 13 alanda yapısal boşluk. | 🟢 (+7b: psikometrik alanlar eşleştirmeye giriyor) | 13 alanın envanteri PR'da; her yazım noktasında Zod şeması (yazım yardımcıları tek dosyada); geçersiz yapı yazılamıyor, birim testleri | BITTI (kısmen — 95b/95c kaldı) | ajan-ekledi 2026-09-27 · kaynak: `docs/kararlar/00-KARAR-TAKIP.md:340` (GÖREV 4) · BITTI (kısmen — 95b/95c + test yok 2 satır) 2026-09-28: **95a psikometrik alanlar** backend #246 + çatı #439. Kalan: 95b kurum ayarları Json (`tenantVocabulary`, `limits`, `blockedPairs`, `choices`) + `selfProfile`/CV alanları · 95c gerekçeli istisnalar (`SystemLog.meta`, `SjtOption.weights`) — envanter backend #246 açıklamasında · testsiz iki yazım satırı (`adaptiveTestEngine.ts:256`, `onboardingController.ts:503-504` negatif senaryo kurulamıyor) · AJ-108 (DISC `sum===0` NaN) · AJ-109 (`selectedEnneagram` sınırsız). · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § AJ-95 (2026-09-28, AJ-68) |
| AJ-98 | Ş0 | **JWT tür ayrımının geçiş dalları (tür bilgisi olmayan eski anahtarlar) kalıcı kalmamalı** (AJ-87 7b notu) — erişim/platform geçişi bir anahtar ömrü, davet geçişi 30 gün sürer; süre dolunca `typ === undefined` dalları gereksiz kabul yüzeyi olarak kalır. + gerçek `signInvitationToken`'ın `typ` yazdığını ölçen test yok. | 🟢 (+7b) | 2026-10-29 sonrası: erişim/platform/davet doğrulayıcılarında tür-siz anahtar kabul dalı yok (kod yorumundaki kaldırma yolu); `signInvitationToken` çıktısında `typ:'invitation'` testi | BEKLIYOR | ajan-ekledi 2026-09-28 · kaynak: 7b #219 https://github.com/zahidsamiata/menti-mentor/pull/219#issuecomment-5864499148 · kanıt: `backend/src/middleware/jwtAuth.ts` (`LEGACY_UNTYPED_TOKENS_ACCEPTED_UNTIL_MS`, `isLegacyAccessShape`) · `backend/src/controllers/selfServeController.ts:555-566` · `backend/src/services/invitationToken.ts:30` · NEDEN: geçiş bittiğinde eski biçimi kabul eden her dal, tür ayrımının kapattığı karışıklığı geri açabilir · ⏳ 2026-10-29'dan önce YAPILMAZ (eski davet bağlantıları 30 gün geçerli) · 2026-09-28 tur kontrolü: tarih kapısı açılmadı → sıra geçildi (BEKLIYOR kalır) |
| AJ-111 | Ş0 | **Eşleştirme gevşetme oranı (istek başına `fallbackLevel`) izlenmiyor** (AJ-79 (b) kalanı; G2-06 / md.111) — NEDEN: kaç eşleştirme isteğinin kurum filtresi gevşetilerek (varsayılana düşerek) karşılandığı görülmüyor; hesap için her istekte kalıcı sayaç gerekir. | 🔵 (kalıcı sayaç = yeni tablo/alan → migration; ya da SystemLog satırı → hacim + saklama kararı) | Platform panelinde kurum başına "gevşetilen eşleştirme %" (toplu); migration PR + EVET kartı + yedek planı | BEKLIYOR | ajan-ekledi 2026-09-28 · kaynak: AJ-79 (backend #251) · kanıt: `backend/src/services/matching.ts:52,267-291` → `matchingController.ts:73` (yalnız istek başına) |
| AJ-120 | Ş0 | **Belge adı/klasör standardizasyonu + kalan kırık atıflar** (F-01 kalanı) — `docs/` altında 391 .md; ~68 belge isim/klasör standardı dışında (G9-12); F-01 taramasında 23 hedefsiz atıf kaldı (çoğu açık dallarda bekleyen dosya, 📸/arşiv içi ya da belirsiz: `silinenler-2026-09-10.md` · `hayalet-envanter-2026-09-10.md` · `KARAR-KARTI-SABLONU.md`). | 🟢 belge | Belge-düzeni rehberi KURAL 1-16'ya uymayan adlar listelendi ve `git mv` + tüm atıflar aynı PR'da; taşıyıcı 5 belge kökte (KURAL 2); belirsiz atıflar kaynağıyla çözüldü ya da gerekçeyle listede; bekçi yeşil | BITTI (kısmen — kalan 77 dosya rehber hedef tanımı bekliyor) | ajan-ekledi 2026-09-28 · kaynak: F-01 (çatı #467 PR açıklaması — sayılar) · G9-12 · kanıt: `docs/kararlar/konu/belge-duzeni-rehberi.md` KURAL 1-16 · NEDEN: dağınık adlar belge bulmayı zorlaştırıyor, kırık atıf yanlış belgeye götürüyor · düşük öncelik (kullanıcıya görünmez) · 🟨 2026-09-28 (çatı #470, opus ONAY https://github.com/zahidsamiata/menti-mentor-v2/pull/470#issuecomment-5878112038): envanter `docs/raporlar/kod-denetimi/belge-ad-envanteri-2026-09-28.md` — uymayan 78 · taşınan 1 (`docs/raporlar/icerik/00-INDEKS.md` → `00-INDEX.md`, yönlendirmeli) · kalan 77 (56 📸 tarihsiz ad — değişmez; 10 `devir/` tür tanımsız; 4 `kararlar/` kök; 4 `raporlar/` 🔄 taslak; 2 `konu/` 📸; 1 README) · kırık tekil yol 15 → 14 · iki belirsiz ad çözüldü (git geçmişinde yok) · KALAN (bu satırda): rehbere 4 hedef tanımı (raporlar 🔄 taslak klasörü · devir/ türü · kararlar/ kök listesi · kod-kalemleri → KARAR-51) sonra sonraki dilim; teknik karar, ajan verebilir |
| AJ-122 | Ş0 | **Entegrasyon testlerinde `cleanDb` kilitlenmesi (40P01) CI'ı rastgele kırıyor** — OAuth kaydında arka planda koşan yönetici bildirimi sorgusu (TenantMembership→User kilit sırası) sonraki testin `TRUNCATE "User","Tenant","SystemLog" CASCADE`'iyle (User→TenantMembership) ters sırada kilitleniyor; kurban arka plan işi olursa ret (#281 `.catch` ile kapandı), kurban cleanDb olursa test kırmızı (bugün iki PR'ın ilk koşusu). | 🟢 | `tests/helpers/db.ts` cleanDb yalnız 40P01'de (en çok 3 kez, kısa bekleme) yeniden deneyen saf `withDeadlockRetry` ile sarıldı; ürün koduna dokunulmadı; birim test (40P01 → yeniden dener ve başarır · başka hata → yeniden denemeden fırlar) retry kaldırılınca KIRMIZI; CI yeşil. Rastgele düşüşün kalmadığı birkaç koşu gözlemiyle — o zamana kadar "BITTI (kısmen — gözlem sürüyor)" | BITTI (kısmen — gözlem sürüyor) | ajan-ekledi 2026-09-28 · kaynak: DK-03 PR'ları ilk koşular (backend run 36482252788 · çatı run 36482315281, attempt 1: `FAIL tests/oauth-kvkk-consent.test.ts` → `cleanDb tests/helpers/db.ts:26`) + çatı #465 (runs 36476155553 · 36476158784) · kök sebep araştırması (opus, salt-okuma) · kanıt: `backend/src/services/oauth/oauthService.ts:152` → `backend/src/services/membership.ts:112-121` ↔ `backend/tests/helpers/db.ts:24-29` · NEDEN: rastgele kırmızı CI birleştirmeyi durduruyor ve gerçek hatayı gizleyebiliyor · ilgili: AJ-105 · #281 · 🟨 2026-09-28: backend #288 (`22f770c`) + pointer #473 · opus doğrulama ONAY https://github.com/zahidsamiata/menti-mentor/pull/288#issuecomment-5878904456 (gerçek hata biçimi P2010 + meta.code 40P01 yakalanıyor) · kod `backend/tests/helpers/deadlockRetry.ts` + `tests/helpers/db.ts` cleanDb · test `tests/aj122-deadlock-retry.unit.test.ts` 4/4 · mutasyon yerel 2 kırmızı · CI yeşil (232/232) · KALAN (bu satırda): sonraki ~5 CI koşusunda `oauth-kvkk-consent` 40P01 görülmezse BITTI; görülürse kök sebep (arka plan işlerini beklenebilir kılmak) ayrı iş |
| AJ-123 | Ş0 | **Kurum başvuru bekleme sayfası ret için de e-posta sözü veriyor** (DK-02 inceleme notu) — "Onay veya ret kararı bu ekranda görünür; e-posta bildirimi de gönderilir." diyor; KARAR-23 gereği ret e-postası gönderilmiyor (backend #295). Bildirim bayrağı açılınca reddedilen kuruma yanlış söz olur. | 🟡 (kuruma görünen metin — PO onayı) | Metin KARAR-23 ile tutarlı (ör. "Karar bu ekranda görünür; onay ve düzeltme isteği ayrıca e-postayla da bildirilir."); metin testi; PR'da eski/yeni metin; PO onaylı | BEKLIYOR | ajan-ekledi 2026-09-29 · kaynak: inceleme #295 https://github.com/zahidsamiata/menti-mentor/pull/295#issuecomment-5880089270 · kanıt: `frontend/src/app/onboarding/stk/pending-review/page.tsx:131` ↔ KARAR-23 cevabı (`docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md:221-236`) ↔ `backend/src/services/tenantNotifications.ts` isTenantNotificationEmailed · NEDEN: kuruma verilen söz tutulmamalı değil, doğru söylenmeli · ilgili: DK-02 · kısım kapısı: kod kısmı 🟢 (metin taslağı + test), yayın PO metin onayıyla |
