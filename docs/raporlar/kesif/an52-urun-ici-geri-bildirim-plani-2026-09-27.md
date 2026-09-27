> 🧊 UYGULAMA PLANI — kod YOK. Bu belge AN-52 kapsamında hazırlandı: ürün-içi OTOMATİK, isteğe bağlı,
> kapatılabilir geri bildirim soruları için tasarım + veri + KVKK + iş listesi. Numara verilmedi (KARAR-??
> taslağı §5'te, CEVAP boş bırakıldı — kart numarasını PO/ajan sonraki turda `01-KARARLAR.md`'ye eklerken verir).

# AN-52 — Ürün-içi otomatik geri bildirim soruları: uygulama planı

**Tarih:** 2026-09-27 · **Mod:** 🟩 PLANLA (salt-okuma keşif + belge; kod yazılmadı, migration yapılmadı)
**Kaynak:** `docs/otonom/00-KUYRUK.md` AN-52 satırı · `docs/otonom/01-KARARLAR.md` KARAR-70 (CEVAP, PO eki) ve
KARAR-71 (cevapsız — tutundurma etiği sınırı) · `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` KARAR-80/M12 ·
`docs/raporlar/kesif/persona-panel-gelisimi-2026-09-23.md` (10 ⬜ davranışsal varsayım) ·
`docs/raporlar/kesif/geri-bildirim-envanteri-2026-09-25.md` (AN-47, mevcut geri bildirim kutuları envanteri).

## 0. Kapsam sınırı — bu plan neyi kapsamıyor

AN-52, KARAR-70'in PO ekinden doğdu: *"Sorular SİSTEMİN İÇİNE gömülsün — köşede, ZORUNLU DEĞİL, isteyen
cevaplar; veri otomatik biriksin."* Amaç, **persona/davranış varsayımlarını** (persona-panel raporunun 10 ⬜
maddesi) gerçek kullanıcıdan ucuz ve sürekli sinyalle sınamaktır — PO'nun tek tek insan aramasına gerek kalmadan.

Bu, **görüşme kalitesi sorularıyla (KR-08/AN-48/KARAR-89/KARAR-90) AYNI ŞEY DEĞİL.** O küme "bir görüşme ne
kadar iyiydi" sorar ve `MeetingCheckIn`/`Feedback` kutularının hangisinin canonical kalacağına bağlıdır (KARAR-89
hâlâ cevapsız). AN-52 ise "kullanıcı bu ürünü/rolü nasıl deneyimliyor" sorar — meclisi meeting'e değil, kullanıcının
yolculuğundaki anlara (bekleme, ilk adım, mentörlüğe başlama, ikinci giriş) bağlıdır. İkisi **aynı depolama
mekanizmasını** (bkz. §3) paylaşabilir — KARAR-80/M12'nin istediği "tek kutu" budur — ama **soru içerikleri ayrı
kalır.** Bu plan yalnız AN-52'nin (persona/davranış) sorularını kapsar; KR-08/KARAR-90'ın soruları kendi kartlarında
karara bağlanır.

F-31 (her sayfada serbest "hata/öneri bildir" köşesi) KARAR-80/M12'de AN-52'ye katlandı: bu iki mekanizma da aynı
depoyu (§3) paylaşabilir ama F-31 **kullanıcı-başlatır, serbest metin, sürekli açık**; AN-52 soruları **sistem-
başlatır, seçmeli (çoktan seçmeli), tek seferlik**. §4'te ayrı iş kalemi olarak bırakıldı — karıştırılmasın.

## 1. Sorular — hangi varsayımı sınıyor

Kaynak: `persona-panel-gelisimi-2026-09-23.md` §3, "34 varsayım · ⬜ HÂLÂ TEST EDİLMEDİ: 10 — davranışsal;
gerçek kullanıcı görüşmesi olmadan sınanamaz" (satır 78). Aşağıdaki 6 soru bu 10 varsayımdan **6'sını** hedefler;
kalan 4'ü aşağıda (§1.1) neden soru OLARAK tasarlanmadığı gerekçesiyle birlikte açıkça dışlanmıştır (uydurma soru
eklenmedi — CLAUDE.md "Yanlış Soru Tuzağı" ilkesi: gerçek karşılığı olmayan yerde soru üretmek yerine boşluğu
adlandırmak tercih edildi).

Tüm sorular: **Türkçe · isteğe bağlı · köşede küçük kart · X ile kapatılabilir · sayfayı/akışı KİLİTLEMEZ.**

---

**S1 — Bekleme deneyimi**
- Sınadığı varsayım: **M-A3** "Bekleme anı = ölüm noktası" (`persona-panel-gelisimi-2026-09-23.md:87`)
- Soru: *"Şu anki bekleyişin senin için nasıl geçiyor?"*
- Seçenekler: `Rahat` · `Biraz sıkıntılı` · `Endişeliyim`
- Neden gerekli: umut sinyali (F-15/F-16, PR#228) zaten var ama işe yaradığı hiç ölçülmedi; bu soru o boşluğu
  doldurur.

**S2 — İlk adım**
- Sınadığı varsayım: **M-A6** "İlk mesaj/talep göndermek geriyor" (`persona-panel-gelisimi-2026-09-23.md:90`)
- Soru: *"İlk görüşme talebini göndermek nasıldı?"*
- Seçenekler: `Kolaydı` · `Biraz çekindim` · `Zor geldi, epey düşündüm`
- Neden gerekli: bu davranış koda karşı test edilemez (kullanıcı tıkladı mı diye ölçülebilir ama "neden zor geldi"
  ölçülemez); anlık, olay-tetiklemeli bir soru en ucuz sinyal.

**S3 — Mentörlüğe başlama nedeni**
- Sınadığı varsayım: **MT-A1** "Mentör arkadaş ısrarıyla gelir, borç hisseder" (`persona-panel-gelisimi-2026-09-23.md:95`)
- Soru: *"Mentör olmaya nasıl karar verdin?"*
- Seçenekler: `Kendim istedim` · `Bir tanıdığım/arkadaşım önerdi` · `Kurumum yönlendirdi` · `Diğer`
- Neden gerekli: bu, mentörün elde tutulma stratejisini doğrudan etkiler (kendi isteyen ile borç hisseden mentöre
  aynı "takdir" dili işlemeyebilir).

**S4 — Kapasite ve arz/talep** *(iki varsayım kümelenmiş — CLAUDE.md "KÜMELE" ilkesi)*
- Sınadığı varsayım: **MT-A2** "Mentör en kıt kaynak, tutmak mentiden önce gelir" (`:96`) + **M-A2** "Menti bol,
  mentör kıt — talep>arz" (`:86`) — ikisi de aynı arz/talep ekonomisinin iki yüzü, tek soru ikisini de bilgilendirir.
- Soru: *"Şu an aktif mentorluk yaptığın kişi sayısını düşünürsen, daha fazla mentiye açık mısın?"*
- Seçenekler: `Evet, daha fazla alabilirim` · `Şu an tam kapasiteyim` · `Kapasitemi azaltmayı düşünüyorum`
- Not: bu bir öznel-his sorusu değil, **kapasite beyanı**; zamanla değişebileceği için tek seferlik kısıtı (§2)
  burada bir "ilk fotoğraf" verir, kalıcı takip değil — yeterli, çünkü amaç varsayımı erken sınamak.

**S5 — Takdirin etkisi**
- Sınadığı varsayım: **MT-A5** "Takdir (sertifika/rozet) mentörü tutar, para değil" (`persona-panel-gelisimi-2026-09-23.md:99`)
- Soru: *"Mentörlükte seni en çok ne motive ediyor?"*
- Seçenekler: `Katkı sağladığımı görmek` · `Takdir edilmek (rozet/sertifika)` · `Yeni bağlantılar kurmak` · `Diğer`

**S6 — Geri dönüş nedeni**
- Sınadığı varsayım: **MT-A6** "İkinci giriş bir SEBEP (bildirim) ister" (`persona-panel-gelisimi-2026-09-23.md:100`)
- Soru: *"Bugün tekrar gelmene ne sebep oldu?"*
- Seçenekler: `Bir bildirim/hatırlatma gördüm` · `Kendiliğinden aklıma geldi` · `Bekleyen bir görüşmem/mesajım vardı`
  · `Diğer`
- Neden özellikle önemli: bugün bildirim gönderimi varsayılan **kapalı** (`TENANT_NOTIFICATIONS_ENABLED=false`,
  `backend/src/config.ts:135`). "Bir bildirim/hatırlatma gördüm" seçeneği bu bayrak açılana kadar zaten seçilemez
  olmalı — bu, S6'nın kendisinin bir doğrulama testi olduğu anlamına gelir (bildirim kapalıyken kimse bu şıkkı
  seçmemeli; seçen çıkarsa veri tutarsızlığı = ölçüm hatası sinyali).

**S7 — (bugün UYGULANAMAZ, ileriye not) Ret kişisel alınır mı**
- Sınadığı varsayım: **M-A5** "Ret kişisel alınır → yumuşatılmalı, alternatif ver" (`persona-panel-gelisimi-2026-09-23.md:89`)
- Bugün eklenemez: persona raporunun kendi notu — *"uygulama ❌ HİÇ YOK — mentör→menti ret + alternatif akışı
  yok, ret maili yok"*. Soracak bir "ret ekranı" bugün yok (KARAR-80/M1 henüz karar bekliyor: P-05 · F-17 · I-16 ·
  U-18 ret deneyimi dört satıra dağılmış). **Öneri:** ret akışı (P-05/M1) yapılınca bu soru o ekranın parçası
  olarak eklensin; şimdiden numara ayrılmasın (bağımlı iş, ayrı takip).

### 1.1 Bilerek soru yapılmayan 4 varsayım (10 - 6 - 1 kalan = 3 gerekçeyle + M-A1)

- **M-A1** "Menti kırılgandır, ilk olumsuz deneyimde sessizce kaybolur" — **otomatik soru bunu test EDEMEZ.**
  KARAR-70'in kendi CEVAP'ı bunu zaten söylüyor: *"otomatik sorular KALANLARI anlatır, GİDENLERİ değil."*
  Vazgeçen kullanıcı platformda değildir, köşe kartını hiç görmez. Telafi zaten KARAR-70 CEVAP'ında var: ilk kurum
  geldiğinde bırakanlarla 2-3 kişilik yarım saatlik görüşme (PO eli, `03-PO-ELLE-ISLER.md`). Bu plana dahil
  edilmedi çünkü yanlış araç yanlış soruyu üretir.
- **M-A5** — bkz. S7 (bağımlı, uygulanamaz durumda, dışlanmadı, ertelendi).
- **U-A6** "Belge gerçek kullanıcıyla doğrulanacak" — bu meta bir varsayım (yedi belgenin toplamı hakkında),
  tek bir soruyla test edilemez; S1-S6'nın toplamı zaten bunun küçük bir parçasını karşılar, geri kalanı gerçek
  görüşmeyle (KARAR-70 CEVAP, C→B sırası) kapanır.
- **M-A2 ve MT-A2** ayrı ayrı sayılmadı, S4'e kümelendi (yukarıda not edildi) — bu ikisi "dışlanan" değil,
  birleştirilen varsayımlardır.

Toplam: **6 uygulanabilir soru (S1-S6) + 1 bağımlı/ertelenen (S7) + 3 açık gerekçeyle dışlanan/kümelenen.**
10 ⬜ varsayımın tamamına hesap verildi.

## 2. Nereye gömülecek, sıklık ve kırılgan kullanıcı sınırı

| Soru | Ekran (dosya) | Tetikleyici | Sıklık |
|---|---|---|---|
| S1 | `frontend/src/app/(dashboard)/menti/page.tsx` bekleme kartı bölgesi | Menti ilk kez "eşleşme yok / onay bekleniyor" durumunu gördüğünde, sayfa açılışından birkaç saniye sonra | Kullanıcı başına **1 kez** |
| S2 | `book-meeting` akışı sonrası "talebin gönderildi" onayı (`frontend/src/app/(dashboard)/book-meeting/page.tsx`) | Kullanıcının hesabındaki **İLK** görüşme/mesaj talebi başarıyla oluşturulunca | Kullanıcı başına **1 kez** |
| S3 | Mentör onboarding'in son adımı (`frontend/src/app/onboarding/page.tsx`, mentör rolü) | Mentör onboarding'i ilk kez tamamladığında | Kullanıcı başına **1 kez** |
| S4 | `frontend/src/app/(dashboard)/mentor/page.tsx` (mentör paneli) | Mentörün ilk tamamlanmış görüşmesinden sonra **veya** hesap 14 günden eskiyse (hangisi önce gelirse), panel açılışında | Kullanıcı başına **1 kez** |
| S5 | Mentör paneli, takdir/istatistik kartının göründüğü an (P-14) | Mentör ilk kez takdir/rozet göstergesini gördükten sonra | Kullanıcı başına **1 kez** |
| S6 | Giriş sonrası ana panel (mentör veya menti ortak) | Kullanıcının hesabındaki **2. giriş** (1. giriş hariç) | Kullanıcı başına **1 kez** |

**Ortak kurallar (KARAR-70 eki + KARAR-71'in bugünkü, henüz cevaplanmamış hâliyle en muhafazakâr yorumu):**
- **Zorunlu değil** — soru cevaplanmadan hiçbir akış durmaz, hiçbir düğme kilitlenmez.
- **Aynı soru bir kullanıcıya en fazla 1 kez** gösterilir. Kapatılırsa (X) — cevaplasa da cevaplamasa da —
  **bir daha asla** gösterilmez. "Sonra hatırlat" seçeneği YOK (bu, KARAR-71'in henüz cevaplanmamış "tekrar tekrar
  sorma" sınırını en güvenli tarafta tutar).
- **Aynı oturumda en fazla 1 soru** gösterilir; birden fazla tetikleyici aynı anda tutarsa sıraya girer, üst üste
  binmez.
- **Kullanıcı ömrü boyunca en fazla 6 otomatik soru** (bu setin tamamı) — F-31'in serbest "hata/öneri bildir" köşesi
  bu sınıra dahil değildir (o süreklidir ama kullanıcı-başlatır, sistem onu hiç push etmez).
- **Ton kısıtı** (KARAR-71 cevaplanana kadar en muhafazakâr varsayım — platform kırılgan/kaygılı genç dahil
  HERKESİ hedeflediği için ayrım yapılmaz, hepsine aynı nazik kural uygulanır): suçluluk dili YOK ("cevaplamazsan
  kaybedersin" gibi ifade yasak), sayaç/streak/"eksik bıraktın" baskısı YOK, kapatma düğmesi en az cevap seçenekleri
  kadar göze çarpar (kapatmayı gizleyip cevaba zorlama YOK).
- ⚠️ **KARAR-71 açık kaldığı sürece bu kurallar geçicidir** — uzman görüşü (ruh sağlığı) gelirse ve daha sıkı bir
  sınır (ör. bazı sorular hiç gösterilmesin) çıkarsa, bu plan o karara göre daraltılır, genişletilmez.

## 3. Veri nasıl birikecek

### 3.1 Mevcut tablolarla mümkün mü — HAYIR, kanıtla

AN-47 envanteri (`docs/raporlar/kesif/geri-bildirim-envanteri-2026-09-25.md`) dört geri bildirim kutusunu
doğruladı; hiçbiri bu 6 sorunun bağlanacağı ana olaylara (bekleme, ilk talep, onboarding bitişi, panel açılışı,
2. giriş) uymuyor:

- **`MeetingCheckIn`** (`backend/prisma/schema.prisma:586`) — bugün gerçekten dolan TEK kutu, ama **her kaydın
  bir `meetingId`'ye bağlı olması ZORUNLU** (`@unique([meetingId, userId])`). S1/S3/S4/S6 hiçbir görüşmeye bağlı
  değil (bekleme anı, onboarding bitişi, panel açılışı, giriş anı) — şemaya sığmaz.
- **`Feedback`** (`:621`) — `meetingId` üzerinden **tekil** (`@unique`), aynı sınır; ayrıca `/periodic-survey`
  zaten her göndermede reddediliyor (KARAR-78 konusu, ölü).
- **`MatchFeedback`** (`:1165`) — `matchId` + `Checkpoint` (DAY_3/14/30) zorunlu; bir **eşleşmesi olmayan** kullanıcı
  (S1 bekleme anındaki menti, henüz eşleşmedi) için kayıt açılamaz. Ayrıca frontend'de hiç kullanılmıyor (grep boş).
- **`FeedbackLog`** (`:510`) — `mentorId` + `mentiId` + `phase` zorunlu (ikili ilişki), tek taraflı/ilişkisiz
  sorulara (S3, S5, S6) uymaz; ayrıca FE'den hiç yazılmıyor (ölü, KARAR-44 konusu).

**Sonuç: yeni bir tablo/model gerekir → MIGRATION.** Bu, F-31 kartının 2026-09-21 düzeltmesinde zaten tespit
edilmişti (*"Ürün geri-bildirim akışı için uygun depo YOK... yeni model gerekir = MIGRATION"*,
`docs/otonom/arsiv/00-KUYRUK-katlanmis.md:30`) — AN-52 bu tespiti doğruluyor, aynı sonuca farklı yoldan varıyor.

### 3.2 Önerilen tasarım — tek migration, sonraki sorular migrationsız eklensin

Codebase'de bu problem daha önce çözülmüş: **`Consent`** tablosu (`backend/prisma/schema.prisma:1294-1312`) tam
olarak bu deseni kullanıyor — *"yeni rıza türü = yeni SATIR (migration YOK)"* (şema yorumu, satır 1292). Aynı
deseni öneriyoruz:

```
model ProductSurveyResponse {   // ÖNERİ — bu planda kod yazılmadı, tasarım fikri
  id           String   @id @default(cuid())
  userId       String
  tenantId     String
  questionKey  String   // "S1_BEKLEME", "S2_ILK_TALEP" ... — kodda TEK config listesinde tanımlı sabitler
  answerKey    String?  // seçilen şık kodu; null = yalnız kapatıldı, cevaplanmadı
  shownAt      DateTime @default(now())
  respondedAt  DateTime?
  dismissedAt  DateTime?

  @@unique([userId, questionKey])   // aynı soru aynı kullanıcıya bir kez — DB seviyesinde garanti
  @@index([tenantId, questionKey])
}
```

Bu tasarımın kazancı: **yeni bir soru eklemek (S7 hazır olduğunda, ya da KARAR-90'ın yeni soruları) yeni bir
migration İSTEMEZ** — yalnız kod tarafında yeni bir `questionKey` sabiti ve tetikleyici mantığı eklenir. Tek
migration = tüm setin (bugünkü 6 + gelecekteki tüm ek sorular) ortak deposu. Bu, KARAR-80/M12'nin istediği
**"tek kutu, tek migration"** hedefiyle birebir örtüşür.

**`@@unique([userId, questionKey])`** aynı zamanda §2'deki "bir kullanıcıya bir soru en fazla 1 kez" kuralını kod
seviyesinde değil **veritabanı seviyesinde** garanti eder — ikinci bir yazma denemesi constraint hatası verir,
UI seviyesindeki kontrol tek başına yeterli değildir (aynı kullanıcı iki sekmede aynı anda soruyu görürse).

### 3.3 KVKK

- **Kişisel veri mi?** Evet. Cevaplar `userId`'ye bağlı ve bir kısmı öznel/duygusal durum içeriyor (S1 "Endişeliyim"
  gibi) — `gdprService.ts`'teki PII tanımına (satır 14-21, "kişilik verisi — hassas kategori" gibi örtük durum
  bilgisi) yakın bir kategori. **Hassas kategori (özel nitelikli KVKK verisi) DEĞİL** — sağlık/ruh hâli teşhisi
  değil, ürün deneyimi hakkında kısa bir beyan; ama yine de kişiye bağlı öznel veri olduğu için sıradan PII
  muamelesi görmeli.
- **Aydınlatma metni etkisi:** Bugünkü KVKK aydınlatma metinleri (`kvkk-metinleri/`) muhtemelen "ürün geliştirme
  amaçlı isteğe bağlı anket yanıtları" gibi bir toplama amacını açıkça saymıyor (bu planda metin taranmadı —
  ayrı iş, §4). **Avukat onayı bekleyen genel KVKK paketine (GV-09/KARAR-38 zaten bu kapıda) bir madde eklenmesi
  gerekebilir** — yeni bir ayrı metin değil, mevcut bekleyen onayın kapsamı genişler.
- **Silme/dışa aktarım:** `gdprService.ts`'in `exportUserData` ve `anonymizeUser` fonksiyonları bu yeni tabloyu
  DAHİL ETMELİDİR (güvenlik kuralı zaten bunu zorunlu kılıyor — "Hassas veri eklerken... KVKK: toplanması meşru
  mu, silinebiliyor mu?"). Bu, §4'te ayrı bir iş kalemi (AN-52-4).
- **Anonim toplama seçeneği:** Teknik olarak `userId` olmadan (yalnız `tenantId` + soru + cevap + tarih) tutulabilir
  ama o zaman: (a) "aynı kullanıcıya bir daha sorma" kuralı DB seviyesinde uygulanamaz (yalnız istemci tarafı
  hafızasına — ör. localStorage — güvenilir, ki bu tarayıcı değişince/temizlenince sıfırlanır), (b) mentör/menti
  ve yeni/eski kullanıcı ayrımı yapan segment analizi kaybolur (S3/S4/S5 zaten role bağlı). **Öneri: kimlikli
  tut**, ama yönetici ekranında **kişi bazlı DEĞİL yalnız toplu/AGGREGATE** gösterilsin (KARAR-71 netleşene kadar
  muhafazakâr — persona raporunun C1 tartışmasındaki "yönetici serbest metne inebilir mi" gerilimine benzer risk).

## 4. Uygulama işleri — kapı önerisiyle

| # | İş | Kapı | Not |
|---|---|---|---|
| AN-52-1 | `ProductSurveyResponse` modeli — yeni tablo migration'ı | 🔵 | Var olan veriye dokunmuyor (yeni tablo, mevcut satır değişmiyor) — CLAUDE.md "yedek zorunlu" kuralı var olan veriyi DEĞİŞTİREN migration'lar için; burada yedek konusu YOK ama şema değişikliği yine PO'nun tek EVET'ini gerektirir (CANLI=LOKAL AYNI DB kuralı). EVET/HAYIR kartı hazırlanır. |
| AN-52-2 | Backend: `POST /api/product-survey/respond` (cevap/kapatma yaz), `GET /api/product-survey/pending` (bu kullanıcının o an görebileceği soruları döndür — hangi tetikleyici koşulları sağlanmış) | 🟢 | AN-52-1'e bağlı (migration sonrası). Auth zorunlu, `userId` oturumdan alınır (istek gövdesinden DEĞİL — Komşu Uç Karşılaştırması kuralı), Zod doğrulama, tenant izolasyonu. |
| AN-52-3 | Frontend: tek bir "köşe soru kartı" bileşeni (generic, kapatılabilir) + 6 tetikleyici noktasına entegrasyon (§2 tablosu) | 🟢 | Soru metinleri/şıkları TEK config dosyasında (sihirli dize yok kuralı) — yeni soru eklemek bu dosyaya satır eklemektir. |
| AN-52-4 | KVKK: `gdprService.ts` `exportUserData` + `anonymizeUser`'a `ProductSurveyResponse` ekle | 🟢 | Güvenlik/KVKK kuralı zaten zorunlu kılıyor; AN-52-1'e bağlı. |
| AN-52-5 | KVKK aydınlatma metni taraması: mevcut metin bu toplama amacını kapsıyor mu, madde eklenmesi mi gerekiyor | 🟡 | Kod değil — avukat/PO eli; `docs/otonom/03-PO-ELLE-ISLER.md`'ye madde (GV-09/KARAR-38 paketine eklenmesi önerilir, ayrı metin değil). |
| AN-52-6 | S7 (ret kişisel alınır mı) — P-05/KARAR-80 M1 (ret akışı) yapılınca eklenecek soru olarak not düşüldü, şimdi numara/iş açılmadı | — | Bağımlı, beklemede; ret akışı işine not olarak bırakılır. |
| AN-52-7 | Yönetici tarafında bu verinin AGGREGATE görünümü (ör. "%X kullanıcı bekleme anını 'endişeli' işaretledi") | 🔴 | Ürün kararı: bkz. §5 taslak kart — kişi bazlı mı toplu mu, hangi rol görsün. CEVAP boş bırakıldı. |

**Sıra notu:** AN-52-1 (migration kararı) diğer tüm işleri bloke eder. AN-52-2/3/4 aynı migration turunda,
sıralı ilerler (paylaşılan şema dosyası — "Koşullu Paralellik" kuralı gereği migration+pointer+submodule işleri
HER ZAMAN sıralı). AN-52-5 ve AN-52-7 bağımsız, paralel yürütülebilir (biri PO eli, diğeri ürün kararı bekliyor).
KARAR-44/KARAR-78'in cevaplanması bu satırı bloke ETMEZ (kuyruk notu zaten böyle diyor) — ama KARAR-89 (tek kutu)
ileride "her şey tek tabloda toplansın" yönünde çıkarsa, `ProductSurveyResponse`'un o birleştirmeye nasıl
katılacağı (ya da bağımsız kalacağı) ayrı bir değerlendirme gerektirir; bu tablo tasarımı zaten izole/generic
olduğu için birleştirme riski düşük.

## 5. Taslak karar kartı (numara verilmedi, CEVAP boş)

### KARAR-?? · AN-52 anket cevapları yöneticiye nasıl görünsün? [ÜRÜN KARARI · KVKK]
**Şu an ne var:** AN-52 planı (bu belge) 6 otomatik soru öneriyor; cevaplar kullanıcıya bağlı (`userId`) saklanacak.
Yöneticinin bu veriyi görüp göremeyeceği, görürse hangi ayrıntı düzeyinde göreceği belirsiz.
**Sorun ne:** Persona raporunun C1 çatışması (yönetici drill-down'ı kişinin serbest notuna insin mi) burada da
aynen çıkıyor — S1 gibi bir soruya "Endişeliyim" diyen bir menti, yöneticinin o kişiyi tek tek görebileceği bir
ekranda mı yoksa yalnız toplu yüzdede mi görünsün.
**Neden sana soruyorum:** Kişiye bağlı öznel/duygusal beyanın kim tarafından görülebileceği KVKK + güven kararı;
teknik değil.
**Seçenekler:**
- **A) Yalnız AGGREGATE** (ör. "%18 menti bekleme anını 'endişeli' işaretledi") · Kullanıcı ne görür: hiçbir şey
  değişmez, kişisel görünürlük yok · Ne kazanırsın: mahremiyet, kullanıcı güveni; kişiye bağlı ifşa riski sıfır ·
  **Ne kaybedersin:** yönetici "kim endişeli" bilip müdahale edemez (drill-down yok) · Süre S · Geri alınır evet ·
  Migration yok (ek alan gerekmez)
- **B) Kişi bazlı görünür + kullanıcı bilgilendirilir** (KVKK şeffaflık) · Kullanıcı ne görür: cevabının yöneticiye
  gidebileceğini önceden bilir · Ne kazanırsın: yönetici erken uyarı alıp destek sunabilir · **Ne kaybedersin:**
  kullanıcı "izleniyorum" hissiyle daha az dürüst cevap verebilir (özellikle kırılgan kullanıcıda — KARAR-71 ile
  gerilimli) · Süre M · Geri alınır evet · Migration yok
- **C) Hiç gösterilmez, yalnız ürün/ajan tarafı analiz eder** · Kullanıcı ne görür: değişiklik yok · Ne kazanırsın:
  en güvenli, yönetici yükü yok · **Ne kaybedersin:** yöneticinin "S1/S2 pilotu" bu turda hiç fayda görmez
  (yalnızca ajan/PO raporlarda görür) · Süre 0 · Geri alınır evet
**Karşılaştırma:** A ve C mahremiyeti korur ama yöneticiye aksiyon gücü vermez; B aksiyon gücü verir ama KARAR-71
netleşmeden riskli (kırılgan kullanıcıda "izleniyorum" hissi tutundurma etiğini ihlal edebilir).
**Benim önerim:** A — KARAR-71 (tutundurma etiği sınırı) cevaplanana kadar en güvenli taraf; C1'deki aynı gerilim
burada da var ve orada da öneri A (yalnız aggregate) idi (persona-panel-gelisimi-2026-09-23.md, KARAR-?? C1 taslağı).
*(Bu senin ürün kararın; önerime güvenme — KARAR-71 uzman görüşü bu kararı değiştirebilir.)*
**Cevap vermezsen:** AN-52-7 iş kalemi başlamaz; toplanan veri yalnız ham tabloda kalır, hiçbir ekranda görünmez.
**CEVAP:**
