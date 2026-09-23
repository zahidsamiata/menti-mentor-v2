> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-19 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-19 durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)

# UÇTAN UCA KURUM YOLCULUĞU — kayıttan ilk görüşmeye

**📸 DONDURULMUŞ** · 2026-09-19 · **SALT-OKUMA denetim** (hiçbir kod/DB değişmedi) · Bu turda yazılan tek dosya budur.

> **Neden bu tur:** Bugüne kadarki tüm testler HAZIR test hesaplarıyla (`admin@test.local`, `mentor1@test.local`…)
> yürüdü; 2026-09-09 gerçek kullanıcı testi de. Bir kurumun **sıfırdan kaydolup ilk görüşmeye** kadar gittiği yol
> baştan sona hiç yürünmedi. Bu belge o yolu **kodu okuyarak** adım adım yürür.

---

## 1 · KAPSAM BEYANLARI ve ÖNCEKİ İKİ BELGE

### 1.1 Bu turun kapsamı
- **Okunan kod:** backend `/home/user/menti-mentor/src` (+ `prisma/schema.prisma`, `scripts/`), frontend
  `menti-mentor-v2/frontend/src`. Submodule pointer bu turda `1304790` (çatı `main`).
- **Yöntem:** 1 ana ajan + 4 paralel salt-okuma alt-ajanı. **Her 🔴/🟡 iddia kaynaktan (dosya:satır) yeniden
  doğrulandı** — `yetki-haritasi-2026-08-29.md §F`'teki "ajan-yanılgıları" dersi gereği. Doğrulama sırasında
  bir alt-ajan iddiası düzeltildi (bkz. §9.2).
- **Tarama dili:** negatif iddialar iki dilde arandı (KURAL 13): `tenant↔kurum`, `invite↔davet`, `mentor↔mentör`,
  `meeting↔görüşme`, `match↔eşleşme`, `availability↔müsaitlik`, `feedback↔geri bildirim`, `empty↔boş`,
  `password↔şifre`, `expired↔süresi dolmuş`, `seed↔tohum`, `question↔soru`, `mail↔e-posta`.
- **SAYILAN BİRİM (KURAL 16 adayı):** "adım" = bu belgedeki 8 numaralı yolculuk adımı. "Kopma noktası" =
  kullanıcının kendi başına devam **edemediği** nokta. "Elle müdahale" = bir insanın (PO veya kurum yöneticisi)
  uygulama dışında/panelde iş yapması gereken nokta. Boş-durum sayımının birimi §5.3'te ayrıca tanımlandı.

### 1.2 Önceki iki belge ne kapsıyor (tekrar edilmedi)
| Belge | Ne kapsıyor | Bu turla ilişkisi |
|---|---|---|
| `docs/raporlar/kesif/katilim-modeli-mevcut-durum-notu-2026-08-02.md` 📸 | Davet **mesaj şablonu** (`InvitationTemplate`), stateless imzalı davet token'ı, yöneticinin elle üye ekleyebilmesi; "hayalet mod" ve toplu davetin YOK olduğu | Davet mekaniğinin **varlığını** doğru anlatıyor; **kod-gerçeği hâlâ geçerli**. Bu tur onun üstüne davet akışının *kullanıcı gözünden nerede tıkandığını* ekliyor (§4.4). |
| `docs/raporlar/kesif/yetki-haritasi-2026-08-29.md` 📸 | 187 uç için yetki sınıflandırması, RLS'in ne yaptığı/yapmadığı, 6 tenant-içi açık (3b-2'de kapatıldı), platform↔tenant admin ayrımı | Yetki **güvenlik** tarafı; bu tur **akış** tarafı. Tek kesişme: §4.6'daki PENDING kullanıcı `mentor-matches` erişimi — yetki haritasında sınıflandırılmamış bir akış boşluğu (yeni bulgu). |

⚠️ İkisi de 📸 dondurulmuş (2026-08). **Çelişkide KOD kazanır** — çelişkiler §9'da.

---

## 2 · ⭐ 8 ADIMLIK YOL TABLOSU

| # | Adım | Kullanıcı ne yapar | Sistem ne yapar | Durum | Tıkanırsa kullanıcı ne görür | Kanıt (dosya:satır) |
|---|---|---|---|---|---|---|
| 1 | **Kurum kaydı** | Landing → "Hemen Başla" → `/onboarding/stk` 5 adımlı sihirbaz (Slug · Şablon · Marka · Hesap · Davet). Hesap adımında ad+e-posta+şifre+KVKK. | `POST /api/tenants/self-serve/register`: tek transaction'da `Tenant` + `User(ADMIN, APPROVED)` + `TenantMembership` + 2 `Consent`. **E-posta alan adı kurumsalsa `AUTO_APPROVED`, gmail/hotmail gibi genel veya `.edu.tr` ise `PENDING_REVIEW`.** Anında access token + refresh cookie. | ✅ | Anlaşılır TR hata: `SLUG_MEVCUT` "Bu kurum adresi (slug) zaten kullanılıyor.", `EMAIL_MEVCUT` "Bu e-posta adresi zaten kayıtlı." | `selfServeController.ts:237-364` · sınıflandırma `:50-57`, `:245-246` · slug/email `:256-267` · FE `_StkOnboardingContent.tsx:40`, `Step4Account.tsx:85-115` |
| 2 | **Kurum onayı** | Kurumsal domain ise **hiçbir şey** (otomatik). Değilse `/onboarding/stk/pending-review` ekranında bekler. | Platform admini `/platform/dashboard`'dan `POST /api/platform/tenants/:id/approve` → `APPROVED` + audit + `notifyTenantVerification`. | 👤 **ELLE** (genel/edu domainde) | Bekleme ekranı: *"Platform ekibimiz başvurunuzu … inceleyecek ve size e-posta ile bilgi verecektir."* — **ama o e-posta bugün gitmiyor** (§6.4). PENDING_REVIEW iken üye kaydı 403, davet üretimi 403 (mesajlar net). | `platformController.ts:286-300` · `authController.ts:150-155` · `selfServeController.ts:618-623` · FE `pending-review/page.tsx:15-30` |
| 3 | **Yöneticinin ilk girişi** | `/login` → e-posta+şifre (şifre kayıt sırasında belirlendi; ayrı "şifre belirleme" linki yok ve gerekmiyor). | `getSmartRedirect` → ADMIN ⇒ `/admin/waiting-room`. Login **tenant onay durumuna bakmaz** → PENDING_REVIEW kurumun yöneticisi de panele girer. | ✅ giriş · 🟡 sıfır-durumu | Panelde **"Bekleme odası boş"**, **"Onay kuyruğu boş — Tüm kayıtlar işlendi."** gibi *başarı tonlu* ekranlar. Sıfır kullanıcılı yeni kurumda yanıltıcı; hiçbirinde "davet gönder" düğmesi yok. | `LoginForm.tsx:39-47` · `(admin)/admin/page.tsx:2` · `waiting-room/page.tsx:79-87` · `approvals/page.tsx:62-68` |
| 4 | **Mentör daveti** | `/admin/invite` (veya sihirbaz 5. adımı) → rol seç → "Oluştur" → "Metni Kopyala" → **kendi Gmail/WhatsApp'ından gönderir.** | `POST /api/tenants/:id/invitations` → imzalı JWT üretir, **DB'ye davet kaydı YAZMAZ**, linki + ham token'ı yanıt gövdesinde döner. Gerçek ömür **30 gün** (kodda sabit). | 👤 **ELLE** (tasarım gereği) | **Üç sessiz tıkanma:** (a) 403'ler ekranda hiç görünmüyor — `setMsg` tanımlı ama **hiç çağrılmıyor**; (b) kopyalanan metinde **kurum adı boş** çıkıyor; (c) sihirbaz "90 gün" derken panel "30 gün" diyor, gerçek 30. | `selfServeController.ts:592-642`, imza `:562-572` · FE `invite/page.tsx:103,135-136,160,229,262` · `Step5Invite.tsx:104` |
| 5 | **Mentörün katılması** | Davet linki → `/join` (kurum adı/logo ile karşılama) → "Ücretsiz Kaydol" → `/register?token=` → e-posta+şifre+KVKK → otomatik giriş → `/onboarding` (Profil → DISC → Sonuç → 3 soru). | `POST /api/auth/register`: **geçerli davet token'ı = doğrudan APPROVED** (tenantId + rol eşleşmeli). `User`+`Consent`+`UserProfile`+`TenantMembership` yazılır. | ✅ LOCAL · 🟡 OAuth | Geçersiz/süresi dolmuş token: *"Davet linki geçersiz veya süresi dolmuş. Yöneticinizden yeni bir link isteyin."* (net) — **ama hiçbir düğme yok**, kullanıcı yöneticiye nasıl ulaşacağını bilmiyor. **OAuth (Google) ile gelen davetli PENDING kalır** ve mentör ekranında bunu söyleyen hiçbir uyarı yok. | `authController.ts:165-171` · `oauthService.ts:109,135-140` · `_JoinContent.tsx:52-58` · `_OnboardingContent.tsx:34` |
| 6 | **Mentinin katılması** | Aynı boru hattı, tek fark token'daki rol. **Açık/self-serve menti kaydı FE'de kapalı** — davetsiz `/register` isteği hiç atılmaz. | Davetli menti APPROVED doğar; davetsiz/OAuth **PENDING** → kurum admini `/admin/waiting-room` veya `/admin/approvals`'dan onaylar. | ✅ davetle · 👤 onay gerekiyorsa | Davetsiz kayıt denemesi: *"Kayıt için geçerli bir davet bağlantısı gerekiyor…"*. LOCAL PENDING giriş: 403 + `/pending-approval` ekranı (en olgun ekran) — **ama token verilmediği için sayfa kullanıcının e-postasını boş gösterir**. | `_RegisterContent.tsx:208-214` · `registerMessages.ts:19-20` · `authController.ts:324-329` · `pending-approval/page.tsx:26,43` |
| 7 | **Eşleşme** | `/menti` → "Önerilen Mentorlar" → "Randevu Al" veya "Mesaj". | Motor **cron/admin tetiği olmadan, her ekran açılışında senkron** çalışır (`rankMentorsForMenti`); sonuç hiçbir tabloya yazılmaz. Mesaj yolu `POST /api/conversations` → `MatchRequest`+`Conversation`+`Message`. | ✅ liste · 🟡 talep | Boş liste iyi karşılanıyor: *"Şu an uygun mentor bulunamadı"* + **"DISC Profilini Güncelle →"** düğmesi. **Ama `MatchRequest`'te `status` alanı yok** → mentörün kabul/ret kapısı yok, sohbet anında açılır; "Gönderildi ✓" rozeti sayfa yenilenince kaybolur. | `matching.ts:351-431` · `conversationController.ts:99-172` · `schema.prisma:439-456` · `menti/page.tsx:248-258` |
| 8 | **İlk görüşme** | `/book-meeting` formu (format, tarih/saat, süre, konum, **50-500 karakter zorunlu niyet mesajı**) → mentör `/mentor`'dan "Onayla"/"Reddet". | `POST /api/meetings/book` → `Meeting(PENDING)`; onay → `SCHEDULED`; ret → `CANCELLED`. | 🟡 + 👤 | **En sessiz tıkanma burada:** mentör müsaitlik tanımlamamışsa **her talep 409** ile reddedilir, ama FE blok yokken "uygun" sayar ve tüm 409'lar **jenerik "Randevu oluşturulamadı."** olarak görünür (yanıtlar `message` taşımıyor, FE `message` okuyor). Toplantı linki **hiçbir ekranda gösterilmiyor**. `SCHEDULED→COMPLETED` geçişi yok → değerlendirme daveti hiç çıkmaz. | `meetingController.ts:463-532`, 409'lar `:483,:500,:506` · `client.ts:25-34` · `book-meeting/page.tsx:57,88` · `meetings/page.tsx` |

---

## 3 · ⭐ ZİNCİR KIRILMA HARİTASI (X.1)

**Kopma tanımı:** kullanıcının kendi başına devam **edemediği**, birinin elle müdahale etmesi gereken ya da hiç
geri bildirim almadığı nokta.

```
[1] Kurum kaydı ──✅──┐
                      │  genel/edu domain ise
                      ▼
[2] Platform onayı ═══K1═══ PO panele elle bakmalı · kuruma bildirim gitmiyor · üye kaydı+davet 403
                      │
                      ▼
[3] Yönetici girişi ──✅── (panel boş, "başla" yönlendirmesi yok → K2 yumuşak)
                      │
                      ▼
[4] Davet ═══K3═══ mail yok (tasarım): linki yönetici elle taşır · hatalar ekranda sessiz · kurum adı boş
                      │
                      ▼
[5] Mentör katılır ──✅ LOCAL── / ═══K4═══ OAuth ile gelirse PENDING'de sessiz kalır
                      │
                      ▼
[6] Menti katılır ──✅ davetle── / ═══K5═══ davetsiz-OAuth PENDING: admin onaylamazsa durur
                      │
                      ▼
[7] Eşleşme ──✅ liste── ═══K6═══ mentörün kabul/ret kapısı yok (MatchRequest durumsuz)
                      │
                      ▼
[8] Randevu ═══K7═══ müsaitlik yoksa her talep sessiz 409 · ═══K8═══ toplantı linki görünmüyor
                      │
                      ▼
    Görüşme sonrası ═══K9═══ COMPLETED'e geçiren hiçbir yol yok → değerlendirme akışı hiç açılmaz
```

**Zincir 9 yerde kopuyor** (K1-K9). Bunların **6'sı sessiz** (kullanıcı hiçbir açıklama görmüyor): K3-hata,
K4, K7, K8, K9 ve K2'nin "e-posta sözü tutulmuyor" kısmı.

| # | Kopma | Tür | Kanıt |
|---|---|---|---|
| K1 | Kurum onayı elle; PO'ya bildirim yok, kuruma bildirim de gitmiyor | 👤 + sessiz | `selfServeRegister` gövdesinde 0 bildirim çağrısı · `config.ts:88` |
| K2 | Sıfır-kullanıcılı panelde "sıradaki adım" yönlendirmesi yok | 🟡 | `mentor-havuzu/page.tsx:70-78` (link/düğme yok) |
| K3 | Davet ekranında hata gösterimi ölü + kurum adı boş dizeye çevriliyor | 🟡 sessiz | `invite/page.tsx:103,135-136,160` |
| K4 | Davetli OAuth ile gelirse APPROVED olmuyor, uyarı da yok | 🟡 sessiz | `oauthService.ts:109` · `authController.ts:163-164` |
| K5 | PENDING kullanıcı admin onaylamadan ilerleyemez; hatırlatma/eskalasyon yok | 👤 | `adminController.ts:634-669` |
| K6 | Mentörün mesaj talebini kabul/ret etme kapısı yok | 🟡 | `schema.prisma:439-456` (status alanı yok) |
| K7 | Müsaitlik yoksa her randevu 409; FE uyarmıyor, sebep görünmüyor | 👤 sessiz | `meetingController.ts:465-484` · `book-meeting/page.tsx:57` |
| K8 | Toplantı linki yazılıyor, hiçbir ekranda okunmuyor | 🟡 sessiz | FE'de 3 yazma noktası, 0 render |
| K9 | `SCHEDULED→COMPLETED` geçişi yok → check-in/feedback hiç açılmaz | 👤 sessiz | tek yazıcı `updateMeetingStatus`; FE'den PATCH çağrısı **0** |

---

## 4 · ÇAPRAZ SORULARIN CEVAPLARI

### 4.1 X.1 — kaç yerde kopuyor
**9 yerde** (K1-K9), **6'sı sessiz**. Harita §3'te.

### 4.2 X.2 — ⭐ ELLE MÜDAHALE SAYIMI
**Birim:** bir kurumun kaydolmasından ilk görüşmeye kadar, bir insanın uygulama akışı dışında yapmak zorunda
olduğu iş. **Mutlu yol (kurumsal domain + davetli LOCAL kullanıcılar) dahil sayım: 5 · en kötü yol: 9.**

| # | Kim | Ne yapmak zorunda | Mutlu yolda da var mı | Kanıt |
|---|---|---|---|---|
| 1 | **PO** | Platform paneline elle bakıp bekleyen kurumu görmek (bildirim yok) | Hayır (yalnız genel/edu domainde) | `listPendingTenants` + `selfServeRegister`'da 0 bildirim |
| 2 | **PO** | Kurumu onaylamak | Hayır | `platformController.ts:286` |
| 3 | **PO** | Onay bilgisini kuruma **elle** iletmek (bildirim bayrağı kapalı) | Hayır | `tenantNotifications.ts:116-122` |
| 4 | **Kurum yöneticisi** | Davet linkini kopyalayıp kendi e-posta/WhatsApp'ından göndermek (her rol için ayrı) | **EVET** | `invite/page.tsx:174-176` |
| 5 | **Kurum yöneticisi** | Davetsiz/OAuth gelen her kullanıcıyı panelden onaylamak | Hayır (davetli LOCAL otomatik) | `adminController.ts:634-669` |
| 6 | **Kurum yöneticisi** | Mentöre "müsaitlik gir" demek (yoksa menti randevu **alamaz**, sebebi de göremez) | **EVET** | `meetingController.ts:465-484` |
| 7 | **Taraflar** | Toplantı linkini sohbetten elle paylaşmak | **EVET** | FE'de 0 render |
| 8 | **Yönetici/geliştirici** | Görüşmeyi `COMPLETED` işaretlemek (UI yok → Postman/DB) | **EVET** | FE'den PATCH 0 |
| 9 | **Geliştirici/PO** | Yanlış rolle kaydolanı düzeltmek (rol değiştiren uç yok → DB) | Hayır | `UpdateUserSchema` `.strict()`, `role` yok |

⭐ **Ölçeklenme sonucu:** mutlu yolda bile **her görüşme başına** iki elle iş kalıyor (link paylaşımı + COMPLETED
işaretleme). Bu, kurum sayısıyla değil **görüşme sayısıyla** büyüyen bir yük — ölçeklenmez.

### 4.3 X.3 — SIFIR DURUMLARI
**Birim:** "boş kalabilen liste/veri bölümü" (salt-form sayfaları kapsam dışı). **21 bölüm tarandı → 16'sında
boş-durum metni var, 1'i kısmi, 4'ünde hiçbir şey yok. Yalnız 3'ünde anlamlı yönlendirme düğmesi var.**

- ✅ **İyi olanlar (3):** menti mentör listesi boşken "Şu an uygun mentor bulunamadı" + **"DISC Profilini Güncelle →"**
  (`menti/page.tsx:248-258`); mentör menti listesi boşken "Filtreleri sıfırla →" (`mentor/page.tsx:399-414`);
  görüşmeler boşken menti için "Mentor listesine git →" (`meetings/page.tsx:153-161`).
- 🟡 **Kuru metin (13):** admin havuzları, eşleşmeler, mesajlar, sertifika, etiketler… Hiçbirinde sonraki adıma
  düğme yok. En iyi kuru metin: `mentor/availability/page.tsx:178-181` — *"Henüz müsaitlik eklenmedi.
  **Mentileriniz randevu talep edemez.**"* (sonucu söylüyor).
- ⬜ **Hiçbir şey yok (4):** `admin/questions:190` (DISC soruları), `admin/certification:100` (sertifika konuları),
  `mentor/page.tsx:202` (toplantı talepleri kartı tamamen kaybolur), `book-meeting:106` (mentörün müsaitliği
  yokken uyarı yok).
- **Yapısal boşluk:** ortak bir `EmptyState` bileşeni yok; her ekran kendi metnini yeniden yazıyor.
- ⚠️ **Yanıltıcı metin:** `approvals/page.tsx:66` sıfır kullanıcılı yeni kurumda "🎉 **Tüm kayıtlar işlendi.**" diyor
  — hiçbir kayıt işlenmemişken.

### 4.4 X.4 — ⚠️ MAİL BAĞIMLILIĞI (en kritik soru)
**Cevap: zincir mail tamamen kapalıyken KOPMAZ — tek gerçek kopma noktası ŞİFRE SIFIRLAMADIR.**

- **Neden kopmuyor:** davet e-postası diye bir şey **kodda yok** (kapsam: `src/` tümü, harf duyarsız,
  `sendInvit*`/`inviteEmail`/`davet.*mail` → 0 sonuç). Davet linki API yanıtında dönüyor
  (`selfServeController.ts:629-632`) ve iki ekranda kopyalanabilir gösteriliyor. Davetli LOCAL kullanıcı
  APPROVED doğduğu için admin onay maili de beklenmiyor.
- **Tek kapı ve sessizliği:** `emailService.ts:31` `send()` — SMTP eksikse (`:38-41`) **sessiz return**, SMTP hatası
  (`:43-48`) **yutulur**, `.local/.test/.invalid/.example` alıcılar sessizce atlanır (`:20-40`). Dönüş tipi `void`;
  **çağıran mailin gidip gitmediğini asla öğrenemez.** Tüm çağrılar `void`/`.catch` — hiçbir ana işlem geri alınmaz.
- **Kopan tek yer:** `forgotPassword` ham token'ı **yalnızca** maile veriyor (`authController.ts:534-550`); DB'de
  yalnız hash tutuluyor. Admin'in/başkasının şifre belirleyeceği uç **yok** (`UpdateUserSchema` `.strict()`,
  `password` alanı yok). ⇒ **Mail kapalıyken şifresini unutan kullanıcı sisteme geri giremez** (DB müdahalesi hariç).
- **Sessizce körleşen (teknik değil operasyonel kopma):** admin'e "onay bekliyor" bildirimi, DISC tamamlandı
  bildirimi, onay/ret sonucu kullanıcıya, randevu talebi mentöre, randevu onayı mentiye, yeni mesaj bildirimi.
  Bu adımlarda süreç **panele elle bakılmadıkça fiilen durur.**
- **İkinci kanal yok:** `notificationService.ts:1-12` kendi başlığında "Stub Arayüzü" diyor; `sendPushNotification`
  yalnız log yazıyor. Şemada `Notification` modeli yok (38 model, 0 sonuç).
- **İki yanlış rapor:** `feedbackController.ts:205` hiç mail gitmese de *"N toplantı için hatırlatma e-postası
  gönderildi."* döner; `cronScheduler.ts:143-153` mail atlansa da `reminderEmailSentAt` yazar → **tek atımlık
  hatırlatma yakılır**, SMTP sonradan açılsa bile bir daha gönderilmez.
- ⚠️ **PO canlıda teyit etmeli:** prod'da `SMTP_*` gerçekten dolu ve geçerli mi, `TENANT_NOTIFICATIONS_ENABLED=true`
  mi. Kodda hem eksik config hem auth hatası sessizce yutulduğu için **log'a bakmadan dışarıdan anlaşılamaz.**

### 4.5 X.5 — GERİ DÖNÜŞ YOLLARI
| Senaryo | Durum | Not |
|---|---|---|
| Şifre unutma (FE+BE tam akış) | ✅ kod · 🟡 mail'e tam bağımlı | `authController.ts:516-590`; SMTP yoksa kullanıcıya yine "gönderildi" denir |
| Sıfırlama linki eksik/bozuk | ✅ | "Yeni bağlantı talep et" linki var (`_ResetPasswordContent.tsx:32-37`) |
| Sıfırlama token'ı süresi dolmuş (60 dk) | 🟡 | Hata net ama bu ekranda "yeni bağlantı talep et" linki **yok** — tutarsızlık |
| Davet linki süresi dolmuş | 🟡 → 👤 | Mesaj iki ekranda da doğru, **düğme yok**; yöneticiye ulaşma yolu gösterilmiyor |
| Yanlış rolle kayıt | ⬜ → 👤 | MENTOR↔MENTI değiştiren **hiçbir uç yok**; ayrıca ADMIN düşürme körlemesine `MENTOR` yazıyor (`adminController.ts:959`) — aslında MENTI ise rolü bozulur |
| PENDING kullanıcı girişi | ✅ | `/pending-approval` en olgun ekran; tek eksik "yöneticiye hatırlat" yolu |
| REJECTED kullanıcı | ✅ **referans desen** | Gerekçe + **"Tekrar Başvur"** düğmesi + `POST /api/auth/reapply` — diğer çıkmazlara şablon olabilir |

### 4.6 X.6 — TEST VERİSİ / SEED BAĞIMLILIĞI
**Cevap: TEMİZ bir veritabanında (yalnız migration, hiç seed) bu yol BAŞTAN SONA YÜRÜMEZ. İlk kırılma DISC testidir.**

- `Question` tablosu boş → test ekranında soru yok; `isComplete = totalAnswered >= totalInPool && totalInPool > 0`
  (`questionService.ts:174`) ⇒ **matematiksel olarak asla `true` olamaz.**
- **Kendi kendini kurtarma kapalı:** `createQuestion` `DISC_ASSESSMENT` kategorisini 403 ile reddediyor
  (`questionController.ts:124-129`) ve tenant admini global soru yaratamıyor ⇒ havuz **yalnız `prisma/seed.ts`** ile dolar.
- Somut ilk 4xx: STK onboarding önizlemesi `422 DISC_TESTI_EKSIK` (`selfServeController.ts:516-522`).
- İkinci kırılma: mentör sertifikasyonu `NO_ACTIVE_TOPICS` → FAILED (ama eşleşmeyi **bloklamaz**;
  `certificationStatus` yalnız görüntüleme amaçlı okunuyor).
- **Zarif bozulanlar (kırılmaz):** öğrenme yolculuğu boş liste döner; sektör taksonomisi boşsa yakınlık 0 olur ve
  skorlama sektör-ağırlıklı devam eder; eşleştirme `discType/discVector` null'a toleranslı.
- **Ürün kodunda test hesabı bağımlılığı YOK** (kapsam: iki repo `src`+`prisma`+`scripts`, 13 sonuç — hepsi seed
  script'i, test dosyası, yorum veya placeholder). **Tek istisna:** `config.ts:31` `DEV_PLATFORM_EMAIL =
  'admin@platform.local'` — platform girişinin tahmin edilebilir varsayılanı (ayrı bir PR'da uyarı eklendi).
- ⚠️ **`prisma/seed.ts` prod'da yıkıcı:** `:295-319` koşulsuz `deleteMany()` (userResponse, feedback, meeting,
  matchRequest, visibilityOptIn, club…) + tüm global DISC havuzunu siler. Temiz DB'yi doldurmanın tek yolu bu
  dosya olduğu için **risk ile ihtiyaç aynı script'te** — PO kararı gerektirir.

---

## 5 · ⭐ "İLK KURUM GELSE NE OLURDU" — dürüst senaryo

Kurumsal bir e-posta adresiyle (`@dernek.org`) gelen bir dernek, landing'den `/onboarding/stk`'ya girip 5 adımı
10 dakikada tamamlar; kurum **otomatik onaylanır**, yönetici anında panele düşer. Panelde "Bekleme odası boş /
Tüm kayıtlar işlendi 🎉" yazan başarı tonlu ekranlar görür ve sıradaki adımın davet olduğunu kendi tahmin etmek
zorunda kalır; sol menüden "📨 Davet"i bulup link üretir — **ama kopyaladığı metinde kurum adı boş çıkar** ve
linki kendi WhatsApp'ından gönderir. Mentör ve menti linke tıklayıp **e-posta+şifre ile** kaydolursa otomatik
onaylı olur ve akış temiz yürür (Google ile kaydolurlarsa sessizce onay bekler duruma düşerler ve bunu söyleyen
bir ekran yoktur). Menti mentör listesini görür, "Randevu Al"a basar — **ve burada duvara çarpar: mentör
müsaitlik girmediyse her talep reddedilir, ekranda yalnızca "Randevu oluşturulamadı." yazar, sebebi asla
söylenmez.** Mentör müsaitliğini girdiyse randevu oluşur, mentör onaylar, **ama online görüşmenin linki hiçbir
ekranda görünmez** — taraflar sohbetten elle paylaşmak zorundadır. Görüşme yapılır ve **orada biter:** hiçbir
kod görüşmeyi "tamamlandı" işaretlemediği için değerlendirme/geri bildirim akışı hiç açılmaz. **Kısacası: yol
yürür ama üç yerde bir insanın elle devreye girmesi şarttır (davet taşıma, müsaitlik hatırlatma, link paylaşma)
ve ilk gerçek tıkanma ADIM 8'de, en kötü yerde — tam ürünün vaadinin gerçekleştiği anda — sessizce olur.**
Genel bir e-posta (gmail) ile gelen kurum ise daha en başta durur: onay bekler, kimseye haber gidmez, PO panele
bakana kadar hiçbir şey yapamaz.

---

## 6 · EN KRİTİK 5 EKSİK (bu düzelmeden gerçek kurum alınamaz)

| Sıra | Eksik | Neden kritik | Efor | Kim çözer |
|---|---|---|---|---|
| **1** | **`bookMeeting` 409'ları kullanıcıya ulaşmıyor** — yanıtlar `message` taşımıyor, FE `message` okuyor; ayrıca mentörün müsaitliği yokken FE "uygun" sayıyor (`book-meeting/page.tsx:57`) ve "Randevu Al" açık kalıyor | Ürünün ana vaadi olan randevu adımı **sebepsiz** başarısız oluyor; kullanıcı ne yapacağını bilmiyor | **S** | **AJAN** (yanıtlara `message` eklemek + FE boş-müsaitlik uyarısı) |
| **2** | **`SCHEDULED → COMPLETED` geçişi yok** — UI yok, cron yok; check-in ve feedback yalnız COMPLETED'de açılıyor | Görüşme sonrası **tüm** değerlendirme/kalite döngüsü hiç başlamıyor; ürünün veri motoru boş kalıyor | **M** | **PO kararı + AJAN** (kim/ne zaman işaretler: mentör mü, otomatik saat sonrası mı — ürün kararı) |
| **3** | **Toplantı linki hiçbir ekranda görünmüyor** — 3 alana yazılıyor, 0 yerde okunuyor (backend zaten JSON'da gönderiyor) | Online görüşmeye nasıl katılınacağı uygulamadan öğrenilemiyor | **S** | **AJAN** (yalnız FE render) |
| **4** | **Davet ekranı sessiz + kurum adı boş** — `setMsg` hiç çağrılmıyor (403'ler görünmez), `{KurumAdı}` boş dizeye çevriliyor (`invite/page.tsx:160`) | Kurumun ilk gerçek işi olan davet, hatayı göstermeden başarısız olabiliyor; giden mesajda kurum adı yok | **S** | **AJAN** |
| **5** | **Kurum onayı iki yönden de sessiz** — PO'ya "yeni başvuru" bildirimi yok, kuruma onay/ret bildirimi bayrak kapalı olduğu için gitmiyor; oysa bekleme ekranı e-posta sözü veriyor | Genel/edu domainli kurum belirsiz süre bekler, PO haberi olmaz — ilk izlenim burada kaybedilir | **M** | **PO** (env: `TENANT_NOTIFICATIONS_ENABLED` + SMTP teyidi) **+ AJAN** (uygulama-içi durum göstergesi) |

> **6. sıradaki (eşikte):** temiz DB'de DISC havuzunun yalnız yıkıcı `seed.ts` ile dolabilmesi (§4.6) — yeni
> kurum canlıya alınırken değil, **yeni bir ortam kurulurken** patlar; bu yüzden ilk beşe girmedi ama PO kararı ister.

---

## 7 · ✅ ZATEN İYİ OLANLAR (boş bırakılmaz)

1. **Self-serve kurum kaydı tek transaction'da atomik** — tenant + admin + membership + çift KVKK rızası birlikte yazılıyor (`selfServeController.ts:276-322`).
2. **Domain temelli otomatik onay** — kurumsal domain sürtünmesiz geçiyor, şüpheli domain incelemeye düşüyor (`:245-246`).
3. **"Davet = onay" kararı doğru uygulanmış** — token tenant+rol eşleşmesiyle doğrulanıyor; sahte token onay kazandırmıyor ama kaydı da reddetmiyor (`authController.ts:157-171`).
4. **Davet akışı mail'e bağımlı değil** — link yanıt gövdesinde ve ekranda kopyalanabilir; SMTP çöktüğünde bile kurum üye toplayabilir.
5. **`/pending-approval` ve REJECTED akışları olgun** — gerekçe gösterimi + "Tekrar Başvur" düğmesi + `reapply` ucu (`authController.ts:393-431`).
6. **Menti/mentör boş-liste ekranları anlamlı ve aksiyonlu** — "DISC Profilini Güncelle →", "Filtreleri sıfırla →".
7. **Eşleştirme motoru eksik veriye dayanıklı** — DISC null, ağırlık okunamazsa varsayılan, taksonomi boşsa 0 katkı; hiçbirinde patlamıyor (`matching.ts:31-40,286,299-300`).
8. **Randevu talebinde 50-500 karakter niyet mesajı zorunlu** — kalite kapısı (`meetingController.ts:407-409`).
9. **Tenant izolasyonu sağlam** — RLS + elle sahiplik kontrolleri; bu turda cross-tenant bir akış boşluğu **bulunmadı** (yetki haritasıyla tutarlı).
10. **Rate limiting kritik public uçlarda var** — kayıt, slug kontrolü, davet katılımı, login, şifre sıfırlama.
11. **KVKK izleri akışa gömülü** — kayıtta dual-write consent, `gdprService` PII envanterinde toplantı konum alanları da listeli.

---

## 8 · TARANAMAYANLAR / TEYİT GEREK

1. **PO canlıda teyit etmeli:** prod'da `SMTP_*` geçerli mi, mailler gerçekten ulaşıyor mu; `TENANT_NOTIFICATIONS_ENABLED=true` mi. (Kodda eksik config **ve** auth hatası sessizce yutuluyor.)
2. **PO canlıda teyit etmeli:** canlı DB'de `Question` / `CertificationQuestion` / `LearningStage` dolu mu (seed çalıştırılmış mı).
3. **PO canlıda teyit etmeli:** canlıda `COMPLETED` statüsünde görüşme var mı; varsa kim/nasıl işaretlemiş.
4. **PO canlıda teyit etmeli:** `/admin/eslesmeler` ekranı gerçekten boş mu (`Match` tablosuna yazan kod yok — `createMatchIfEligible` 0 çağıran; eski veri olabilir).
5. **TEYİT GEREK:** `book-meeting`'deki saat dilimi kayması (FE `getUTCDay/getUTCHours` ile yerel tarihi karşılaştırıyor) pratikte İstanbul'da 409 üretiyor mu — canlı deneme ister.
6. **TEYİT GEREK:** PENDING (OAuth) bir mentinin `mentor-matches` ucundan gerçekten veri alıp almadığı — kodda onay kapısı yok, gerçek hesapla denenmeli.
7. **TEYİT GEREK:** `cronScheduler.ts:143-153`'teki "yakılan hatırlatma" canlıda kaç kurumu etkiledi — DB sorgusu ister.
8. **Taranmadı:** mesajlaşma (`/messages`) akışının derinlemesine denetimi, KPI/analitik ekranlarının doğruluğu, mobil görünüm, performans. Bu tur yalnız **kayıt→ilk görüşme** hattına baktı.
9. **Kısıt notu:** X.3/X.5 ve ADIM 7-8 alt-ajanları raporlarını teslim ettikten hemen sonra oturum kotasına takılıp sonlandı. Raporları tam; ancak o iki başlıkta ajanın kendi "TEYİT GEREK" satırları ana ajan tarafından **kısmen** (en yüksek etkili 6 iddia) yeniden doğrulandı, tamamı değil.

---

## 9 · BELGE ↔ KOD ÇELİŞKİLERİ (işaretlendi, çözülmedi)

| # | Belge ne diyor | Kod ne diyor | Kanıt |
|---|---|---|---|
| 9.1 | `CLAUDE.md` "Yeniden kullanılacak kalıplar": *"merkezi mesaj resolver'ı (PLANLANAN desen — `registerMessages.ts` … dosya HENÜZ kodda YOK: grep boş)"* | **Dosya VAR ve kullanılıyor:** `frontend/src/lib/registerMessages.ts`, 3 dosyadan import ediliyor; backend'de de `REGISTER_MESSAGES` sabiti var (`authController.ts:125`) | KOD KAZANIR |
| 9.2 | Alt-ajan iddiası: *"`meetingCheckInController.ts:124` COMPLETED yazıyor"* | O satır bir **okuma filtresi** (`getPairEfficiencySignal`'da `where`), yazma değil. Tek yazıcı `updateMeetingStatus`; FE'den PATCH çağrısı **0** → K9 bulgusu **doğrulandı** | Ajan iddiası düzeltildi |
| 9.3 | `Step5Invite.tsx:104` ekranda *"Bu linkler **90 gün** geçerlidir"* · `.env.example:48` `INVITATION_TOKEN_EXPIRY="90d"` | Gerçek ömür **30 gün**, kodda sabit (`selfServeController.ts:571`); `config.invitationTokenExpiry` (`config.ts:100`) **hiçbir yerde okunmuyor** (kapsam: `src/`, harf duyarsız → 1 sonuç, o da tanımın kendisi) | KOD KAZANIR |
| 9.4 | `pending-review/page.tsx:28-29` kuruma söz veriyor: *"Onay veya ret kararı e-posta adresinize iletilecektir."* | `TENANT_NOTIFICATIONS_ENABLED` varsayılanı **false** (`config.ts:88`) ve `.env.example`'da **hiç yok** → bildirim log-only (`tenantNotifications.ts:116-122`) | KOD KAZANIR — ekrandaki söz bugün tutulmuyor |
| 9.5 | `schema.prisma:585` yorumu "zorunlu değerlendirme" | Teknik olarak zorunlu değil; engelleyen kapı yok, yalnız banner + e-posta hatırlatıcısı (ve o da COMPLETED'e bağlı → hiç açılmıyor) | KOD KAZANIR |
| 9.6 | `katilim-modeli-...-2026-08-02.md` 📸 "yönetici elle üye ekleyebilir → `POST /api/users`" | Hâlâ geçerli (`userController.ts:494` bildirimiyle birlikte) — **çelişki yok**, doğrulandı | — |

---

## 10 · KALEM LİSTESİ (KURAL 9)

**Birim:** bu turda çıkan benzersiz bulgu satırı. **Toplam 24 kalem.** Numara verme yetkisi PO'dadır —
hiçbirine numara verilmedi, hiçbiri kuyruğa eklenmedi (bu tur yalnız rapor yazar).

| # | Kalem (tek cümle) | Önerilen durum | Numara adayı mı |
|---|---|---|---|
| 1 | `bookMeeting` 409/400 yanıtları `message` taşımıyor → kullanıcı hep jenerik "Randevu oluşturulamadı." görüyor | ⬜ AÇIK | **evet** |
| 2 | Mentörün müsaitliği yokken FE "uygun" sayıyor (`book-meeting/page.tsx:57`) ve uyarı vermiyor | ⬜ AÇIK | **evet** |
| 3 | `SCHEDULED→COMPLETED` geçiren hiçbir UI/cron yok → check-in + feedback hiç açılmıyor | ⬜ AÇIK | **evet** |
| 4 | Toplantı linki (`locationUrl/locationText/phoneNumber`) hiçbir ekranda render edilmiyor | 🟡 YARIM | **evet** |
| 5 | `/admin/invite` hata gösterimi ölü: `setMsg` tanımlı, hiç çağrılmıyor → 403'ler sessiz | 🟡 YARIM | **evet** |
| 6 | `invite/page.tsx:160` `{KurumAdı}` boş dizeye çevriliyor → davet metninde kurum adı yok | 🟡 YARIM | **evet** |
| 7 | Yeni kurum başvurusunda platform admin'e bildirim yok → PO elle bakmalı | ⬜ AÇIK | **evet** |
| 8 | Kuruma onay/ret bildirimi bayrak kapalı (`TENANT_NOTIFICATIONS_ENABLED` varsayılan false, `.env.example`'da yok) ama ekran e-posta sözü veriyor | 🟡 YARIM | **evet** |
| 9 | Davetli kullanıcı OAuth ile gelirse APPROVED olmuyor, mentör ekranında uyarı da yok | 🟡 YARIM | **evet** |
| 10 | LOCAL PENDING kullanıcı `/pending-approval`'da kendi e-postasını boş görüyor (token yok → `user` null) | 🟡 YARIM | evet |
| 11 | Onay kapısı yalnız `GET /api/users`'ta; `mentor-matches` PENDING'e açık (`requireApproved` benzeri middleware yok) | ❓ TEYİT GEREK | **evet** |
| 12 | Sıfır-kullanıcılı admin panelinde "davet et" yönlendirmesi yok; `approvals` boş durumu "Tüm kayıtlar işlendi" diyor | 🟡 YARIM | evet |
| 13 | 4 ekranda boş-durum hiç ele alınmamış (`admin/questions`, `admin/certification`, mentör toplantı talepleri kartı, book-meeting müsaitlik kartı) | ⬜ AÇIK | evet |
| 14 | Ortak `EmptyState` bileşeni yok; 21 bölümün her biri kendi metnini yeniden yazıyor | ⬜ AÇIK | hayır |
| 15 | Davet süresi üç yerde üç farklı: ekran 90 gün, panel 30 gün, kod 30 gün; `INVITATION_TOKEN_EXPIRY` ölü ayar | 🟡 YARIM | evet |
| 16 | Davet token'ı e-postaya bağlı değil, tek kullanımlık değil, iptal edilemez, 30 gün geçerli | ❓ TEYİT GEREK (PO kararı) | **evet** |
| 17 | Rol değiştiren (MENTOR↔MENTI) hiçbir uç yok; ADMIN düşürme körlemesine `MENTOR` yazıyor | ⬜ AÇIK | **evet** |
| 18 | Süresi dolmuş davet/sıfırlama ekranlarında "yeni link iste" düğmesi yok (REJECTED akışında var — şablon hazır) | 🟡 YARIM | evet |
| 19 | Şifre sıfırlama tek kanala (SMTP) bağımlı; SMTP hatası kullanıcıya hiç yansımıyor, admin tarafında sıfırlama ucu yok | 🟡 YARIM | **evet** |
| 20 | `emailService.send()` başarı/başarısızlık bilgisini çağırana hiç vermiyor → iki yerde yanlış rapor (`feedbackController.ts:205`, `cronScheduler.ts:143-153` yakılan hatırlatma) | 🟡 YARIM | evet |
| 21 | Temiz DB'de DISC havuzu boş kalıyor ve yalnız yıkıcı `prisma/seed.ts` ile doldurulabiliyor (`createQuestion` DISC'i 403'lüyor) | ⬜ AÇIK | **evet** |
| 22 | k-anonimlik/minimum havuz kapısı yok; tek `>=3` kontrolü bekleme-odası metnini değiştiren kozmetik FE guard'ı | ❓ TEYİT GEREK (PO kararı) | **evet** |
| 23 | `MatchRequest` durumsuz → mentörün mesaj talebini kabul/ret kapısı yok; `Match` tablosuna yazan kod yok (`createMatchIfEligible` 0 çağıran) | 🟡 YARIM | evet |
| 24 | Profil tamamlanma kapısı yok: boş profilli mentör havuzda görünüyor; `computeProfileCompleteness` ve `mentorVisibilityEnabled` bağlanmamış | 🟡 YARIM | evet |

---

## 11 · BU TURUN SINIRLARI

- **Hiçbir kod dosyası değiştirilmedi.** Yazılan tek dosya budur.
- `docs/otonom/`, `docs/kararlar/`, `docs/devir/`, `CLAUDE.md`, `.env.example` ve
  `docs/raporlar/kesif/operasyonel-hazirlik-2026-09-19.md` dosyalarına **dokunulmadı**.
- Kuyruğa iş eklenmedi, karar kartı açılmadı, numara verilmedi — bunlar PO'nun/ilgili turun işidir (KURAL 8 adım 2).
- Canlı DB'ye, migration'a, seed'e dokunulmadı.
