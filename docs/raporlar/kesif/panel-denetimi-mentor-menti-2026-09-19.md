> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-19 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-19 durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)
> İŞLENME: ✅ işlendi (2026-09-19, tur: TUR 4 — AŞAMA P) → `00-KUYRUK` AŞAMA P · KARAR-22 · kutu: 2026-09-23 DA turu (belge-duzeni-rehberi § KURAL 23)

# MENTÖR + MENTİ PANEL DENETİMİ — İSTENEN vs KODDA OLAN
**📸 DONDURULMUŞ** — bu turun kod fotoğrafı, güncellenmez; güncel durum: `docs/kararlar/09-DURUM.md`
**Tur:** H · **Dal:** `otonom/H-panel-denetimi-20260919` · **Denetim tarihi:** 2026-09-20
**Mod:** 🟩 PLANLA — salt-okuma. Kod/DB/şema DEĞİŞMEDİ, hiçbir şey silinmedi, `docs/otonom/` ellenmedi.
**Amaç:** platform-admin belgesinde uygulanan metodolojiyi (ideal → koda karşı kıyas → yanlış iddiaları yakala) mentör ve menti panellerine uygulamak.
**Yöntem:** 4 paralel salt-okuma alt-ajanı (menti paneli · mentör paneli · ortak ekranlar · backend+son işler) + orkestratörün elle teyidi. Her durum `dosya:satır` kanıtlı. **Belge ↔ kod çelişirse KOD kazanır.**

---

## ⚠️ ÖNCE OKU — BU TURUN ÖNCÜLÜ YANLIŞTI

Turun gerekçesi şuydu: *"Belgenin kendi 'Sonraki adım' maddesi 'aynı metodoloji mentör/menti için' diyor. BU YAPILMADI."*

**Yapılmış.** Mentör/menti kıyası **2026-08-20'de** yapılmış:
`docs/raporlar/kod-denetimi/strateji-gercek-denetimi-2026-08-20.md` — **B.1 MENTİ** (13 madde satırı) ve **B.2 MENTÖR** (14 madde), aynı metodoloji, `dosya:satır` kanıtlı, 7'li sınıflandırmayla.
O turun sonucu: menti ✅8 · 🟠1 · 🟡1 · 🔴2 · ⚠️1 — mentör ✅9 · 🟠2 · 🟡1 · 🔴1 · ⚠️1.

**Neden "yapılmadı" sanıldı (kanıtlı tahmin):** kıyas belgesi `docs/raporlar/panel/` altında DEĞİL, `docs/raporlar/kod-denetimi/` altına düşmüş. `panel/` klasöründe yalnız 4 dosya var (platform-admin ×2, stk-yönetici ×2) → mentör/menti kıyası orada aranırsa bulunamaz.

**Bu turun gerçek değeri şu oldu:** sıfırdan kıyas değil, **bir aylık delta + bağımsız yeniden doğrulama.** Aşağıda 08-20 ile bugünkü okumanın ayrıştığı yerler ayrıca işaretlendi — bir kısmı kod değişikliği DEĞİL, **denetçi yargı farkı** (bu da ayrıca raporlandı, çünkü karıştırılırsa sahte "ilerleme/gerileme" üretir).

---

## 1. KAPSAM BEYANLARI

### 1.1 Taranan dizinler
| Alan | Yol | Durum |
|---|---|---|
| Menti paneli | `frontend/src/app/(dashboard)/menti/**` | ✅ tarandı (`page.tsx` 363 satır tamamı) |
| Mentör paneli | `frontend/src/app/(dashboard)/mentor/**` | ✅ tarandı (`page.tsx` 492 satır tamamı) |
| Ortak ekranlar | `(dashboard)/` altında `disc-test · learning-journey · meetings · book-meeting · meeting-checkin · messages · profile · periodic-survey · dashboard` | ✅ tarandı |
| Onboarding | `frontend/src/app/onboarding/**` | ✅ tarandı (DISC sonuç kartı burada) |
| Bileşenler | `frontend/src/components/**` | ✅ tarandı |
| API sarmalayıcıları | `frontend/src/lib/api/**`, `frontend/src/lib/mentiMetrics.ts` | ✅ tarandı |
| Backend | `backend/` (submodule) | ⚠️ bkz. 1.3 |

### 1.2 Aranan terimler (KURAL 13 — iki dilli, harf duyarsız, `frontend/src` tamamı)
`mentor↔mentör` · `meeting↔görüşme/toplantı` · `journey↔yolculuk` · `certificate↔sertifika` · `availability↔müsaitlik` · `badge↔rozet` · `notification↔bildirim` · `capacity↔kapasite` · `share↔paylaş` · `download↔indir` · `strength↔güçlü yön/güçlü yan` · `archetype↔arketip` · `reject↔reddedil/reddet/ret` · `alternative↔alternatif` · `celebrate↔tebrik/kutla` · `milestone↔kilometre taşı` · `queue↔kuyruk/bekleme` · `request↔talep/niyet`

### 1.3 ⚠️ BACKEND KAPSAM UYARISI (üç alt-ajan bağımsız bildirdi, orkestratör teyit etti)
`/home/user/menti-mentor-v2/backend` bu çalışma alanında **BOŞ** (submodule init edilmemiş; `git submodule status` → `-130479049c...` baştaki `-` = çekilmemiş).

**Ama backend kaybolmuş değil:** ayrı depo olarak `/home/user/menti-mentor/` altında mevcut ve **v2'nin beklediği pointer ile birebir aynı commit**: `git cat-file -t 130479049c7262e42d1a5dd531a1fdd0079442c6` → `commit`, o deponun HEAD'i = `1304790`. Yani backend denetimi **doğru sürüm üzerinden** yapılabildi.
→ Aşağıdaki backend kanıtları `backend/src/...` mantıksal yoluyla yazıldı, okuma `/home/user/menti-mentor/src/...` üzerinden yapıldı.

### 1.4 Durum kodları (⚠️ 🟡'nin kapsamı genişletildi — açıkça beyan)
- ✅ **VAR** — kullanıcı görüyor (mount edilmiş + veri geliyor).
- 🟡 **YARIM** — iki durumdan biri: (a) kod var ama kullanıcıya ulaşmıyor (mount yok / uç çağrılmıyor / boş veri), **veya** (b) **istek kısmen karşılanıyor** (parçası var, parçası yok). Hangisi olduğu her satırda yazılı.
- ⬜ **YOK** — kodda izi yok; kapsam beyanı zorunlu.
- 🗑️ **GEÇERSİZ** — sonradan alınan bir karar iptal etmiş, belgede kanıtı var.
- ❓ **TEYİT GEREK** — anlaşılmadı ya da bu turda doğrulanamadı.

---

## 2. MENTİ PANELİ — İSTENEN vs OLAN

> Kaynak belge: `docs/raporlar/persona/menti-persona-ve-sevdirme-2026-08-02.md` (149 satır) · 13 istek çıkarıldı.
> Panel dosyası: `frontend/src/app/(dashboard)/menti/page.tsx` (363 satır).

| # | İstek | Kaynak | Durum | Kod kanıtı | Not — kullanıcı ne görüyor |
|---|---|---|---|---|---|
| M1 | DISC sonucu "özgüven aşısı" gibi sunulsun | persona:80-83 | ✅ VAR *(yalnız ilk kez)* | `onboarding/_steps/ResultStep.tsx:80-127` — "Sen bir **{arketip}**sın!" + `✦ süper güç` (:87-89) + güçlü yan rozetleri (:96-106) + "💡 Gelişim Alanın" (:124-127) + konfeti (:64) | Kayıt akışında tam olarak belgenin istediği aşı yapılıyor. **Ama rapel yok:** panelde yalnız çıplak harf (`menti/page.tsx:217` "DISC Profili: Di"), profilde yalnız harf+arketip (`profile/page.tsx:213-230`). API güçlü yanları dönüyor (`lib/api/profile.ts:10-20` `discResultCard`) ama **hiçbir ekranda render edilmiyor** |
| M2 | Bekleme anı içerikle doldurulsun | persona:71-72, 85-86 | ✅ VAR | `menti/page.tsx:205-209` — `DiscConfidenceWidget` + `DailyQuestionWidget` + `LearningJourneyCard`; koşul `!needsDiscTest` (`:41`), **onay şartı YOK** | Mentörü yokken (PENDING) menti Öğrenme Yolculuğu davetini, günlük profil sorusunu ve güvenilirlik barını görüyor. ⚠️ 08-20 bunu 🟡 saymıştı — kod değişmedi, **yargı farkı** (bkz. §7.1) |
| M3 | Umut sinyali / sosyal kanıt | persona:73 | 🟡 YARIM *(b: kısmen)* | VAR: `menti/page.tsx:184-202` "Profiliniz analiz edildi. **N onaylı mentor** bu programda yer alıyor…" (veri: `/api/users/mentor-count`). YOK: akran sayısı | "Senin gibi N kişi bekliyor" ve "yakında eşleşeceksin" **yok**. Kapsam: `senin gibi·kişi bekliyor·yakında eşleş·kuyruk·queue·waitlist` → menti yüzeyinde 0 sonuç. N<3 ise sayı KVKK eşiğiyle gizleniyor (`:197-199`) → az mentörlü kurumda umut sinyali büsbütün kayboluyor |
| M4 | Çıplak "mentörün yok" ekranı ASLA | persona:74 | ✅ VAR | `menti/page.tsx:226-258` (3 ayrı boş durum, her birinde CTA butonu) · `meetings/page.tsx:150-158` | Belge birebir karşılanıyor. Kodda "henüz mentörün yok" dizesi hiç yok. Boş durumlar: "DISC Testini Başlat →" · "Yönetici onayı bekleniyor" · "Şu an uygun mentor bulunamadı" + "DISC Profilini Güncelle →" + yükleme iskeleti (`:242-247`) |
| M5 | Reddi yumuşat — "işte 3 alternatif" | persona:88-90 | ⬜ YOK | Kapsam beyanı: `frontend/src` tamamı, harf duyarsız, iki dilli — `reject·reddedil·reddet·ret·alternatif·başka mentör·declin·rematch·yeniden eşleş` → **menti-görünür ret/alternatif metni 0 sonuç**. Menti'nin gördüğü tek iz: `meetings/page.tsx:25` `CANCELLED: {label:'İptal Edildi', variant:'destructive'}` | Mentör reddedince menti **kırmızı "İptal Edildi" rozeti** görüyor — gerekçe yok, teselli yok, alternatif mentör yok. Üstelik kayıt "Geçmiş Görüşmeler"e düşüyor (`meetings/page.tsx:99-101`). Belgenin P3 prensibi ("reddi ASLA çıplak gösterme") **tam tersi** uygulanmış |
| M6 | Küçük başarıları kutla | persona:92-94 | ⬜ YOK *(kilometre taşı)* | Kapsam: `tebrik·kutla·congrat·celebrat·🎉·başardın·ilk görüşme·milestone·kilometre taşı·streak·achievement` → menti panelinde 0 sonuç. Var olan kutlamalar **akış-sonu jenerik**: `meeting-checkin/page.tsx:81-88` "🎉 Teşekkürler!" (her değerlendirmede aynı), `menti/orientation-guide/page.tsx:96-101`, `learning-journey/page.tsx:76-81` | "İlk görüşmeni tamamladın!" gibi **sayıya bağlı** kutlama yok. Menti 1. ve 10. görüşmesinde aynı jenerik ekranı görüyor |
| M7 | YUVA-1 Keşif — uygun mentör kart havuzu | persona:102 | ✅ VAR | `menti/page.tsx:220-316` — "Önerilen Mentorlar": avatar+ad, sektör etiketleri (:271-279), **%uyum** (:283), "Neden uyumlu: …" (:288-291), Randevu Al / Mesaj / Şikayet (:293-310). Veri: `/api/mentis/{id}/mentor-matches?limit=100` | Belgenin "umut, merak" yuvası tam. Menti kartta yüzde uyum skorunu **görüyor** (mentörün tersine — bkz. MT1) |
| M8 | YUVA-2 Yolculuk — aşamalar + ilerleme | persona:103, 107-108 | 🟡 YARIM *(b: kısmen)* | Sayfa ✅ `learning-journey/page.tsx` + nav `DashboardNav.tsx:14`; panel kartı ✅ `menti/page.tsx:209`. **Ama ilerleme kalıcı değil:** `ScenarioGuideEngine.tsx:97` `useState(0)` (oturum içi), durum ucu yalnız ikili bayrak — `lib/api/learningJourney.ts:79-84` `{audience, completed, completedAt, totalStages}`, **tamamlanan aşama sayısı YOK** | Yolculuk çalışıyor ve mentiye ulaşıyor. Ama panel kartı yalnız "Yolculuğa başla →" ya da "Tamamlandı ✓" diyebiliyor — belgenin istediği **"neredeyim, sıradaki adımım ne"** cümlesi kurulamıyor. Sayfadan çıkan menti ilerlemesini kaybediyor |
| M9 | YUVA-3 İlişkilerim — görüşmeler + sonraki randevu | persona:104 | 🟡 YARIM *(a+b)* | Yuva ayrı sekme olarak ✅ (`DashboardNav.tsx:16` "Görüşmelerim" → `meetings/page.tsx:139-165`). **Panelde YOK:** `menti/page.tsx:68-73` `/api/meetings`'i çekiyor ama listelemiyor, yalnız 2 sayıya indirgiyor (`:214-215`). **+ HATA:** `meetings/page.tsx:31` `const opponent = isMentor ? meeting.menti : null;` | ⚠️ **Kanıtlı hata (orkestratör elle teyit etti):** menti için `opponent` **her zaman null** → `:50-54`'teki karşı-taraf satırı hiç çizilmiyor ve oradaki `'Mentor'` etiketi **ölü dal**. **Menti, randevu kartında mentörünün adını hiçbir yerde göremiyor.** Ayrıca panelde "sonraki randevum" yok |
| M10 | Somut sonraki adım / yön | persona:50 | ✅ VAR *(dağınık)* | `menti/page.tsx:148` (Rehbere Başla) · `:163` (Karar Ver) · `:178` (Teste Başla) · `:256` (DISC Profilini Güncelle) · `:294-308` (Randevu Al / Mesaj) | Her durumda bir CTA çıkıyor. ⚠️ **Öncelik sıralaması yok:** birden çok koşul aynı anda doğruysa menti üst üste 3 uyarı bandı görüyor — belgenin istediği "somut TEK sonraki adım" bulanıklaşıyor |
| M11 | Erişilebilirlik hissi ("uzak değiller") | persona:51 | ❓ TEYİT GEREK | — | Bu bir **his**, kodda tek bir karşılığı yok. Kart havuzu (M7) + düşük eşikli mesaj modalı (M12) bu yönde çalışıyor ama "ölçülebilir istek" değil. Uydurmamak için ❓ bırakıldı; gerçek menti görüşmesi gerekir (persona:145) |
| M12 | İlk temas eşiği düşük — niyet mektubu kolaylaştırsın | persona:119-120 | ✅ VAR *(iki yol)* | (a) `menti/page.tsx:318-360` mesaj modalı: "Kendinizi kısaca tanıtın…" (:329-331), placeholder (:337), 2000 kr, boş gönderilemez (:103) → `/messages/{id}`. (b) `book-meeting/page.tsx:171-196` zorunlu niyet metni 50-500 kr + canlı sayaç | Mentör kartından **2 tıkla** ulaşılıyor, ikisi de rehberli. Belgenin "kolaylaştırmalı, zorlaştırmamalı" şartı karşılanıyor |
| M13 | Hızlı başarı hissi / erken kanıt | persona:53 | 🟡 YARIM *(a+b)* | `menti/page.tsx:211-218` 4 metrik kartı. **Gerçek veri yalnız 2'si**: `lib/mentiMetrics.ts:18-29`. ⚠️ `:213` "Gönderilen Talepler" = `sentIds.size`, kaynağı `:80` `useState<Set<string>>(new Set())` | ⚠️ **Kanıtlı hata (orkestratör elle teyit etti):** "Gönderilen Talepler" bir React state → **sayfa yenilenince 0'a düşüyor.** Dün 5 talep gönderen menti bugün "0" görüyor; kart kanıt üretmek yerine emeği siliyor. Ayrıca meetings sorgusu `enabled: isApproved` (`:71`) → onay bekleyen menti **"0 / 0 / 0"** duvarına bakıyor: erken kanıt yerine **erken sıfır** |

### MENTİ — sayılar
**✅ 6 · 🟡 4 · ⬜ 2 · 🗑️ 0 · ❓ 1 — toplam 13**

---

## 3. MENTÖR PANELİ — İSTENEN vs OLAN

> Kaynak belge: `docs/raporlar/persona/mentor-persona-ve-sevdirme-2026-08-02.md` (127 satır) · 13 istek çıkarıldı.
> Panel dosyası: `frontend/src/app/(dashboard)/mentor/page.tsx` (492 satır).

| # | İstek | Kaynak | Durum | Kod kanıtı | Not — kullanıcı ne görüyor |
|---|---|---|---|---|---|
| MT1 | İlk 5 dk "aha" — "sana uygun N menti, %92 uyum" | persona:68-72 | 🟡 YARIM *(b: kısmen)* | Aday listesi VAR: `mentor/page.tsx:386-452` (`GET /api/mentors/:id/candidates`). **Ama:** (1) skor `:436` `{c.totalScore.toFixed(0)}` + "uyum skoru" — **% işareti YOK**; (2) "N menti" sayısı başlık olarak hiç yazılmıyor; (3) liste **6 bloğun altında** (güvenilirlik, günlük soru, yolculuk, sertifika CTA, 4 metrik) | Belgenin istediği cümle ("işte sana **3** menti, **%92** uyum") kurulamıyor: sayı yok, yüzde işareti yok, liste ekranın altında. ⚠️ 08-20 bunu ✅ TAM VAR saymış ve kanıt olarak "`:386-452` (%uyum + gerekçe)" yazmıştı — **kod bunu doğrulamıyor** (bkz. §5 BY-1) |
| MT2 | Boş panel = kayıp; ilk ekran değer göstersin | persona:71 | 🟡 YARIM *(b: kısmen)* | Boş durumlar kısmen iyi: `:399-414` "Menti adayı bulunamadı / Filtreleriniz çok kısıtlayıcı olabilir / Filtreleri sıfırla →". **Ama:** `:194` metrikler veri yoksa **"—"** · `:202` bekleyen talep 0 ise **kart hiç render edilmiyor** (boş-durum metni bile yok) · `:463-466` "Yaklaşan toplantınız yok." (çıplak) | Yeni mentörün ilk ekranı: dört adet **"—"** + kaybolan talep kartı + çıplak "toplantınız yok". ⚠️ Ayrıca `messages/page.tsx:52-58` boş durumu **menti ağzıyla** yazılmış (rol dalı yok — orkestratör teyit etti): mentör kendi gelen kutusunda *"Bir mentöre mesaj gönderdiğinizde…"* okuyor |
| MT3 | DISC sonucu HEDİYE gibi sunulsun | persona:73-77 | ✅ VAR *(yalnız onboarding)* | `onboarding/_steps/ResultStep.tsx:80-127` (rol kapısı YOK: `_OnboardingContent.tsx:223-225` role parametresiz) — "Sen bir **{arketip}**sın!" + süper güç + güçlü yanlar + gelişim alanı | Mentör de tam kartı alıyor (08-20'nin öz-düzeltmesi doğru). **Ama panelde iz yok:** mentör `:160` "DISC Testini Güncelle" → `/disc-test` sonunda arketip kartı DEĞİL, çıplak "DISC Profiliniz Hazır!" görüyor (`disc-test/page.tsx:76-79`) |
| MT4 | DISC kartı paylaşılabilir olsun | persona:76-77 | ✅ VAR *(yalnız onboarding)* | `ResultStep.tsx:9-49` `ShareButtons` — WhatsApp (`wa.me`) + LinkedIn; metin `resultCard.shareHeadline` (`:131`) | Paylaşım butonları gerçek. ⬜ İndirme/görsel kaydetme yok (kapsam: `paylaş·share·indir·download·pdf·screenshot` → DISC ile ilgili 0 sonuç). Onboarding'i geçen mentör karta bir daha ulaşamadığı için pratikte **tek seferlik** |
| MT5 | Seyrek ama anlamlı bildirim (ritim) | persona:79-81 | 🟡 YARIM *(a: kullanıcıya ulaşmıyor)* | Tetikleyici VAR: `backend/src/services/notificationService.ts:84-93` `notifyMatchRequestReceived` → *"Yeni Eşleşme İsteği / Bir menti sizinle eşleşmek istiyor."*, çağrılıyor `meetingController.ts:528-529`. **Ama gönderim STUB:** `notificationService.ts:39-55` `sendPushNotification` yalnız `logger.info('SYSTEM','[PUSH-STUB] …')` yazıp `{sent:true}` dönüyor | ⚠️ **Canlı booking yolunda e-posta DA yok:** `sendMeetingRequestEmail` yalnız `createMeeting` (`meetingController.ts:199`) içinde; menti panelinin kullandığı `POST /api/meetings/book` (`:514-531`) e-posta göndermiyor. Sonuç: mentör talebi ancak **paneli kendisi açınca** öğreniyor. Belgenin "ikinci girişi sağlayan sebep"i (persona:107) kodda yok |
| MT6 | Emek görünür — "4 mentiyle görüştün, 12 saat" | persona:83-86 | 🟡 YARIM *(b: kısmen)* | Sayılar ✅ `GET /api/mentors/:id/dashboard-metrics` → `{pendingRequests, completedMeetings, activeMentis, avgNps}` (`backend/src/controllers/mentorMetricsController.ts:48-53`), kartlar `mentor/page.tsx:39-43,187-199` | "Kaç menti / kaç görüşme" var, **"kaç saat" YOK**. Kapsam beyanı (backend `src/`+`tests/`, frontend `src/`, 11 terim): `durationMin` yalnız 2 sonuç, ikisi de **süper-admin** (`adminSettingsController.ts:258-262,278-279` `totalMentoringHours`) — ve o metrik frontend'de **0 tüketici**. Ayrıca "bu dönem" çerçevesi yok: dört çıplak sayı, cümleye dökülmüş emek anlatısı yok |
| MT7 | Takdir — sertifika / rozet / "yılın mentörü" | persona:85-86, 45 | 🟡 YARIM *(a+b)* | Sertifika akışı ✅ (`sjtScoringRoutes.ts:40-58`, sayfa `mentor/certification/page.tsx`); sınav sonu `:189-200` "Tebrikler — Sertifikalı Mentörsün!" + `<Badge>SERTİFİKALI</Badge>`. **Ama kalıcı durum YOK:** `lib/api/certification.ts`'te "benim sertifika durumum" ucu yok; panel CTA'sı `mentor/page.tsx:172-184` **koşulsuz** — orkestratör teyit etti | ⚠️ Rozet yalnız sınavı bitirdiği **an** görünüyor; sayfadan çıkınca kayboluyor. **Ertesi gün panele giren sertifikalı mentör hâlâ "Sertifikaya başla →" görüyor.** "Yılın mentörü" / dönemsel teşekkür / rozet çeşitliliği yok. Belgenin "emeğin karşılığı takdirdir" prensibi zayıf |
| MT8 | YUVA-1 Gelen ilgi — niyet mektupları | persona:96 | ✅ VAR | `mentor/page.tsx:202-281` "Toplantı Talepleri"; **niyet metni tam okunuyor** `:223-228` `{m.requestMessage}` blockquote; veri `GET /api/meetings?status=PENDING` → `Meeting.requestMessage` (`backend/.../meetingController.ts:526`) | Belgenin "seçilmişlik, okumak keyif" yuvası çalışıyor — niyet mektubu en üstte, belirgin. ⚠️ Kart 0 talepte tamamen kayboluyor (MT2) ve yanındaki **%uyum rozeti hiç dolmuyor** (bkz. §5 BY-1) |
| MT9 | YUVA-2 Aktif ilişkiler — kime mentörlük + sıradaki | persona:97 | 🟡 YARIM *(b: kısmen)* | "Sıradaki görüşme" ✅ `:454-489` "Yaklaşan Toplantılar" (SCHEDULED + gelecek filtresi `:83-90`). "Kime mentörlük yapıyorum" ⬜: `:39` "Aktif Mentilerim" yalnız **sayı**; mentileri listeleyen bileşen yok | Mentör sıradaki görüşmesini görüyor ama **"şu an kime mentörlük yapıyorum" listesi panelde yok** — mentilerini ancak `/meetings` ve `/messages` kayıtlarından dolaylı çıkarıyor. Belgenin istediği "düzen, bağlılık" hissi yarım |
| MT10 | YUVA-3 Kendi etkim — istatistik + takdir | persona:98 | 🟡 YARIM *(b: kısmen)* | İstatistik ✅ `:187-199`. Takdir ⬜: mentör dosyalarında `takdir·teşekkür·etki·impact` → **0 eşleşme** | "Kendi etkim" yuvası tamamen **sayısal**. Mentöre teşekkür eden, emeğini anlatan tek cümle yok; gördüğü tek olumlu dönüş "Ortalama NPS" sayısı — veri yoksa **"—"**. Belgenin "gurur, anlam" hedefi karşılanmıyor |
| MT11 | Seçicilik — kabul/ret hakkı | persona:54, 61 | ✅ VAR | `mentor/page.tsx:257-274` Onayla / Reddet → `:94-100` → `POST /api/meetings/:id/approve|reject` (`backend/.../meetingRoutes.ts`) | Mentör tek tıkla reddedebiliyor — belgenin "her mentiyi kabul etmek zorunda değil" hakkı tam. ⚠️ Ret **gerekçesiz** gidiyor: API `reason?` destekliyor (`lib/api/meetings.ts:105`) ama çağrı `:97` parametresiz; onay/ret sonrası kullanıcıya başarı mesajı da gösterilmiyor |
| MT12 | Müsaitliğini kendi belirlesin | persona:55, 44 | ✅ VAR | Sayfa `mentor/availability/page.tsx:106-183` (gün + saat blokları, ekle/sil/kaydet) · uç `POST/GET /api/meetings/availability` (`backend/.../meetingRoutes.ts:33-43`) · **nav sekmesi** `DashboardNav.tsx:23` "📆 Müsaitliğim" | Belgenin "kontrol" motivasyonu tam karşılanıyor. Boşken uyarı: "Henüz müsaitlik eklenmedi. **Mentileriniz randevu talep edemez.**" (sonucu açıklayan iyi boş durum). Booking müsaitliği doğruluyor (`meetingController.ts:463-470`) |
| MT13 | Kapasite dengesi — kaç mentiye kadar keyif | persona:112 | ⬜ YOK | **Kapsam beyanı:** frontend `frontend/src` tamamı + backend `menti-mentor/src` + `tests/`; terimler iki dilli harf duyarsız: `capacity·kapasite·quota·doluluk·workload·maxMenti·max_menti·"N mentiyle dolu"·yük` → **mentör-bazlı kapasite 0 sonuç**. (`kapasite` 3 dosya/11 satır çıkıyor ama **hepsi `sivilkapasite.org` alan adı**, `middleware.ts:23-24` vb.) En yakını tenant-bazlı `Tenant.maxMeetingsPerWeek` | Mentör tarafında doluluk/kapasite kavramı yok. "Aktif Mentilerim" sayısı bir tavanla karşılaştırılmıyor. En yakın mekanizma **seçicilik filtresi** (`:284-384` min uyum skoru + engellenen DISC tipleri) — bu yük sınırı değil, aday süzgeci. Belgenin "hangi noktadan sonra yük" dengesi kodlanmamış |

### MENTÖR — sayılar
**✅ 5 · 🟡 7 · ⬜ 1 · 🗑️ 0 · ❓ 0 — toplam 13**

---

## 4. SAYILAR — TEK BAKIŞTA

| Panel | ✅ VAR | 🟡 YARIM | ⬜ YOK | 🗑️ GEÇERSİZ | ❓ TEYİT GEREK | Toplam |
|---|---|---|---|---|---|---|
| **MENTİ** | 6 | 4 | 2 | 0 | 1 | **13** |
| **MENTÖR** | 5 | 7 | 1 | 0 | 0 | **13** |
| **TOPLAM** | **11** | **11** | **3** | **0** | **1** | **26** |

**Sayılan birim (KURAL 16):** "istek" = persona belgesinin gövdesinde **kullanıcıya görünür bir davranış/ekran/metrik vaat eden** cümle. Sayılan yerler: belgelerin 3/4/5/6/7. bölümleri (prensipler + yuva tabloları + "ne bekler" listeleri). Sayılmayanlar: persona tanımı, motivasyon tablosu, "sonraki adım" maddeleri, kardeş-belge karşılaştırma tablosu. Farklı birim farklı sayı verir — 08-20 turu aynı belgelerden menti için 14, mentör için 14 madde çıkarmıştı (o tur şema/altyapı vaatlerini de saydı).

**Genel izlenim:** iki panelde de **iskelet kurulmuş** (11/26 tam çalışıyor, 3/26 hiç yok). Asıl kütle **🟡 YARIM'da (11/26)** — yani özellik yazılmış ama **son bir adım eksik kalmış**: bağlanmamış bir parametre, gösterilmeyen bir alan, kalıcı olmayan bir durum. Bu, "yeni özellik yaz" değil **"var olanı bitir"** işi olduğu için düşük efor / yüksek getiri demektir (bkz. §6).

---

## 5. ⭐ BELGE YANLIŞLARI — belge "var" diyor, kod başka söylüyor

> platform-admin turunda iki yanlış iddia bulunmuştu ("AdminAuditLog var" → yok; "kurum silme var" → yok).
> Aynı yöntemle bu turda **6 yanlış/bayat iddia** çıktı. Hepsi orkestratör tarafından elle teyit edildi (alt-ajan raporuna güvenilmedi).

### BY-1 (YÜKSEK) · "Mentör %uyum görüyor" — **mentör hiçbir yerde yüzde görmüyor**
- **Belge:** `strateji-gercek-denetimi-2026-08-20.md` B.2/4 — *"Toplantı Talepleri (niyet mesajı + **uyum skoru** + profil)"* ✅ TAM VAR · ve B.2/1 kanıtı *"`:386-452` (**%uyum** + gerekçe)"*.
- **Kod — iki ayrı sebep, ikisi de teyitli:**
  1. **Onay kuyruğunda skor HİÇ DOLMUYOR.** `mentor/page.tsx:214` `const score = m.match ? … : null` → `m.match` canlıda **her zaman null**, çünkü `Meeting.matchId` hiç yazılmıyor: `book-meeting/page.tsx:32` `matchId`'yi URL'den okuyor ama menti panelindeki tek link onu **göndermiyor** — `menti/page.tsx:297` `router.push(\`/book-meeting?mentorId=${mentor.mentorId}\`)`. `grep -rn matchId frontend/src` → üreten tek yer yok (kalanlar: tip tanımları, bağlanmamış `ContextualFeedbackHost`, `MeetingContext`). Ayrıca `Match` satırını yaratan tek yol `backend/src/services/scoring.service.ts:137`, o da FE'den çağrılmayan `POST /api/scoring/rank-mentors` içinde.
     → `mentor/page.tsx:230-240`'taki **"%N uyum" rozeti ve "Ortak sektör · Karakter uyumu" çipleri hiç render edilmiyor.**
  2. **Aday listesinde yüzde işareti yok.** `:436` `{c.totalScore.toFixed(0)}` + `:437` "uyum skoru" → mentör **çıplak sayı** görüyor ("74"), "%74" değil.
- **Gerçek:** Yüzde gösterimi **yalnız menti tarafında** çalışıyor (`menti/page.tsx:283`, veri `matchingController.ts:87` `matchScore: Math.round(m.totalScore) // menti'ye yüzde olarak gösterilir`).
- **Neden önemli:** Mentör personasının **P1 "ilk 5 dakikada aha"** prensibi ("%92 uyum") tam olarak buna dayanıyor — ve kodda karşılığı yok.

### BY-2 (YÜKSEK) · "Menti İlişkilerim yuvası TAM VAR" — **menti mentörünün adını göremiyor**
- **Belge:** 08-20 B.1/5 — *"✅ TAM VAR · `meetings/page.tsx` (Yaklaşan/Geçmiş, durum badge)"*.
- **Kod:** `meetings/page.tsx:31` → `const opponent = isMentor ? meeting.menti : null;`
  Menti için `isMentor` false → `opponent` **her zaman null** → `:50-54`'teki karşı-taraf satırı hiç çizilmiyor, oradaki `isMentor ? 'Menti' : 'Mentor'` ifadesinin **`'Mentor'` dalı ölü kod.**
- **Gerçek:** Sayfa var ve açılıyor (belge bu kadarıyla doğru), ama **menti randevu kartında kiminle görüşeceğini göremiyor.** Belge bunu yakalamamış.

### BY-3 (ORTA) · "Sertifika tam" — **sertifikalı mentör hâlâ "Sertifikaya başla →" görüyor**
- **Belge:** 08-20 B.2/8 — *"Sertifika **tam**: `mentor/certification/page.tsx:178-189` 'Sertifikalı Mentörsün'"*.
- **Kod (orkestratör teyidi):** O metin yalnız **sınavı bitirdiği ekranda** render ediliyor. Panel kartı `mentor/page.tsx:172-184` **koşulsuz** bir `<Card>` — içinde sabit "Sertifikaya başla →" linki; sertifikalı durumu okuyan hiçbir dal yok. `lib/api/certification.ts`'te "benim sertifika durumum" ucu da yok (yalnız questions/answer/certify/topics).
- **Gerçek:** Takdir **kalıcı değil**. Ertesi gün giren sertifikalı mentör hiçbir rozet görmüyor, üstüne "başla" çağrısı görüyor. Belge "tam" derken akışı doğru, **kalıcılığı yanlış** tarif etmiş.

### BY-4 (ORTA) · "DISC kartının profilde özeti var" — **güçlü yanlar hiçbir ekranda yok**
- **Belge:** 08-20 B.1/1 notu — *"Profil sayfasında da özet: `profile/page.tsx:218-220`"* (kartın yaşamaya devam ettiği izlenimi veriyor).
- **Kod:** `profile/page.tsx:213-230` yalnız **ikon + harf + arketip adı** gösteriyor, üstelik arketip adı API'den değil **sayfa içi yerel sabitten** (`profile/page.tsx:29-34`). API tam kartı dönüyor — `lib/api/profile.ts:10-20` `discResultCard {archetype, icon, superPower, description, strengths, growthArea, compatibleWith, dominant}` — ama `discResultCard` frontend'de **yalnız tip tanımında** geçiyor, hiçbir bileşen okumuyor.
- **Gerçek:** `superPower` · `strengths` · `growthArea` **onboarding dışında hiçbir ekranda render edilmiyor.** Veri hazır, ekran yok → klasik 🟡.

### BY-5 (YÜKSEK) · `backend/CLAUDE.md`: "Mentis write their own requestMessage on VisibilityOptIn (Akış B) and on MatchRequest" — **iki yol da ölü**
- **Belge:** `menti-mentor/CLAUDE.md`, "Key Business Rules" md.3.
- **Kod:** Niyet mektubu **yalnız `Meeting.requestMessage`** üzerinden yaşıyor (`book-meeting/page.tsx:81` → `meetingController.ts:526` → `mentor/page.tsx:224-226`).
  - `MatchRequest.requestMessage` yazan tek uç `POST /api/requests` (`requestController.ts:66`) — **FE'de 0 çağıran** (kapsam: `frontend/src/{lib/api,hooks,components,app}` tarandı, 116 benzersiz `/api/...` yolu çıkarıldı; `matchRequestApi` → 3 sonuç, 2'si test mock'u + 1 tanım).
  - Canlı yol `POST /api/conversations` MatchRequest'i **requestMessage'sız** yaratıyor (`conversationController.ts:154-156`) → `MatchRequest.requestMessage` canlıda **her zaman NULL**.
  - VisibilityOptIn "Akış B" zaten silinmiş — ve bunu söyleyen `09-DURUM.md:413`'ün kendisi. **Yani `backend/CLAUDE.md` ile `09-DURUM.md` birbiriyle çelişiyor** (bkz. §7.1).
- **KURAL 12 (tazelik) ihlali:** Akış B silindiğinde `backend/CLAUDE.md` güncellenmemiş.

### BY-6 (ORTA) · `09-DURUM.md` kendi içinde çelişiyor — "Menti ⬜" ↔ "K-09 CANLIDA"
- `09-DURUM.md:5` (2026-09-19): K-09 menti panelini canlıya aldı, 4 iş CANLIDA.
- `09-DURUM.md:432`: 4-rol tablosunda **Menti hâlâ ⬜ "(sıradaki)"**.
- CLAUDE.md'nin kendi **G9-03 kuralı** ("bayat gövde satırı üstü-çizili damgalanır") bu satıra uygulanmamış.

### ✅ DÜRÜSTLÜK NOTU — K-09 belgeleri YANLIŞ DEĞİL (yanlışlıkla "düzeltilmesin")
"Gönderilen Talepler" kartının sayfa yenilemede sıfırlanması **belgelenmiş ve bilinçli** bir kapsam kararı:
`docs/otonom/00-KUYRUK.md:60` → *"'Gönderilen Talepler'=oturum sayacı, **dokunulmadı**"* · `02-ILERLEME.md:12` yalnız iki kartın bağlandığını söylüyor · `09-DURUM.md:5` "iki kart" diyor · kod `lib/mentiMetrics.ts` tam olarak **iki** fonksiyon içeriyor.
→ Belge ile kod **birebir uyumlu.** Bu bir belge hatası değil, **açık kalmış bir kullanıcı sorunu** (bkz. §6.2).

---

## 6. ⭐ EN YÜKSEK ETKİLİ 5 EKSİK (en az emek → en çok kullanıcı değeri)

> Sıralama ölçütü: **(etkilenen kullanıcı × duygusal hasar) ÷ efor.** Efor tahminleri koda bakılarak verildi; S = tek/birkaç satır, M = yeni uç veya akış gerekir.
> ⛔ Bunlar **öneri değil, bulgu.** Hiçbiri kuyruğa işlenmedi, karar kartı açılmadı.

### 1. Menti, mentörünün adını hiçbir yerde göremiyor · **efor S** · her menti, her randevu
**Kullanıcı şu an ne göremiyor:** Menti "Görüşmelerim" sekmesini açtığında tarih ve durum rozetini görüyor ama **kiminle görüşeceğini göremiyor** — mentörün adı ekranda yok.
**Kanıt:** `meetings/page.tsx:31` `const opponent = isMentor ? meeting.menti : null;` → menti için daima null → `:50-54` karşı-taraf satırı çizilmiyor; oradaki `'Mentor'` etiketi **ölü dal**.
**Neden ucuz:** Veri **zaten gelmiş durumda** — backend `listMeetings` `include: { mentor: { select: { id, fullName } } }` yapıyor (`meetingController.ts` listMeetings include bloğu). Eksik olan tek şey: FE `Meeting` arayüzünde `mentor` alanı tanımlı değil (`lib/api/meetings.ts:20-35`, yalnız `menti?`) ve satır 31 `null` sabitlemiş. Yeni uç, yeni sorgu, migration **gerekmez**.

### 2. "Gönderilen Talepler" kartı sayfa yenilenince sıfırlanıyor · **efor S** · her menti
**Kullanıcı şu an ne göremiyor:** Dün 5 mentöre talep gönderen menti bugün panelde **"0"** görüyor. Kart, emeği kanıtlamak yerine **siliyor** — menti personasının "hızlı başarı hissi / erken kanıt" isteğinin (persona:53) tam tersi.
**Kanıt:** `menti/page.tsx:213` `value={sentIds.size}`; `sentIds` = `:80` `useState<Set<string>>(new Set())` — oturum-içi React state.
**Neden ucuz:** Panel **zaten** `/api/meetings`'i çekiyor (`:68-72`); PENDING sayısı aynı veriden türetilebilir (`lib/mentiMetrics.ts` deseni hazır, K-09'da kurulmuş). Alternatif olarak `GET /api/requests` non-admin'i `requesterUserId: me` ile kapsıyor.
**Not:** Bu bir belge hatası DEĞİL — bilinçli kapsam dışı bırakılmış ve `00-KUYRUK.md:60`'ta kayıtlı (§5 dürüstlük notu).

### 3. DISC "özgüven aşısı" tek seferlik — panelde rapel yok · **efor S** · her menti + her mentör
**Kullanıcı şu an ne göremiyor:** Kayıt anında "Sen bir **Öncü**sün, süper gücün şu, güçlü yanların bunlar" kartını gören kullanıcı, **o ekrandan çıktıktan sonra bir daha asla göremiyor.** Panelde çıplak harf ("Di"), profilde harf + arketip adı. Menti personasının **P1** (özgüven aşısı, persona:80-83) ve mentör personasının **P2** (hediye gibi sun, persona:73-77) prensipleri tek atışlık kalıyor.
**Kanıt:** Zengin kart yalnız `onboarding/_steps/ResultStep.tsx:80-127`. `/disc-test` yolundan gelen **çıplak** ekran görüyor: `disc-test/page.tsx:76-79` "DISC Profiliniz Hazır!" (arketip yok, güçlü yön yok, konfeti yok) — ve panelden teste giden **herkes** bu yolu kullanıyor (`mentor/page.tsx:160`, `menti/page.tsx:178,232,256`).
**Neden ucuz:** Veri hazır ve **API zaten dönüyor** — `lib/api/profile.ts:10-20` `discResultCard {archetype, superPower, strengths, growthArea, …}`. `discResultCard` frontend'de **yalnız tip tanımında** geçiyor, hiçbir bileşen okumuyor. Yeni uç/migration gerekmez.

### 4. Mentör hiçbir yerde "uyum yüzdesi" görmüyor · **efor M** · her mentör
**Kullanıcı şu an ne göremiyor:** Mentör personasının **P1 "ilk 5 dakikada aha"** vaadi (*"işte sana 3 menti, **%92 uyum**"*, persona:68-72) ekranda hiç oluşmuyor: onay kuyruğunda yüzde rozeti **hiç render edilmiyor**, aday listesinde ise **çıplak sayı** ("74") yazıyor.
**Kanıt:** (a) `mentor/page.tsx:214` `m.match ? … : null` → `Meeting.matchId` hiç yazılmadığı için `m.match` daima null; menti panelindeki tek link matchId göndermiyor (`menti/page.tsx:297`) ve `Match` satırı yaratan tek yol FE'den çağrılmayan `POST /api/scoring/rank-mentors` (`scoring.service.ts:137`). (b) `mentor/page.tsx:436` `{c.totalScore.toFixed(0)}` — `%` işareti yok.
**Neden M:** (b) tek karakterlik düzeltme, ama (a) için `Match` kaydı **canlıda hiç üretilmiyor** — ya matchId akışı bağlanmalı ya da skor, zaten çalışan `/api/mentors/:id/candidates` ucundan okunmalı. **Hangisinin doğru olduğu ürün/mimari kararı → bu raporda karar verilmedi.**

### 5. Ret tamamen çıplak — menti "İptal Edildi" kırmızı rozetinden öğreniyor · **efor M** · reddedilen her menti
**Kullanıcı şu an ne göremiyor:** Menti, talebinin reddedildiğini **yalnız** geçmiş listesine düşmüş kırmızı "İptal Edildi" rozetinden anlıyor. **Bildirim yok, e-posta yok, gerekçe yok, alternatif mentör yok.** Menti personası bunu **en kritik risk** olarak işaretliyor: *"Mentör 'hayır' derse menti bunu 'ben yetersizim' diye okur… Reddi ASLA çıplak gösterme"* (persona:88-90).
**Kanıt (backend, teyitli):** `rejectMeetingByMentor` (`meetingController.ts:563-585`) yalnız `status: CANCELLED, notes: reason ?? null` yazıyor; fonksiyonda **hiçbir `notify*`/`send*Email` çağrısı yok**. Kardeş fonksiyon `approveMeetingByMentor` ise `:556-557`'de `notifyVisibilityApproved` çağırıyor → **asimetri koda gömülü.** FE gerekçeyi hiç göndermiyor (`mentor/page.tsx:97` 3. argüman atlanmış) → `notes` her retde **NULL'a set ediliyor** (varsa önceki notu da siler). Menti tarafında `notes` hiçbir ekranda render edilmiyor.
**Neden M:** Ürün kararı gerekiyor (gerekçe zorunlu mu? alternatif nasıl seçilir?) + ayrı `rejectionReason` alanı şemada yok (`notes` paylaşımlı).

### ⚠️ Beşliye girmedi ama GÜVENLİK/KVKK olduğu için ayrıca bildiriliyor
**`GET /api/users/mentor-count` k-anonimlik eşiği yalnız FRONTEND'de.**
Backend ham sayıyı **koşulsuz** dönüyor (`backend/src/controllers/userController.ts:125-135` — eşik/maskeleme kodu yok). N<3 koruması yalnız `menti/page.tsx:189`'da (`count >= 3 ?`), yorumu da *"Küçük havuz koruması: eşik altında (<3) sayı gösterme — kimliği daraltabilir"*.
→ PENDING bir menti ucu **doğrudan çağırıp** 1 veya 2 değerini okuyabilir. Bu, çatı `CLAUDE.md`'nin kendi kuralını ihlal ediyor: *"Frontend guard yeterli DEĞİL — Kullanıcı API'yi doğrudan çağırabilir."*
**Yan bulgu (ayrı):** sayım `User.role` üzerinden yapılıyor; `CLAUDE.md` "kurum-içi rol/sayım kaynağı **`TenantMembership.role`**, `User.role` DEĞİL" diyor. Tek kurumlu kullanıcıda fark yok, çok kurumluda sayı şişer → **TEYİT GEREK** (çok kurumlu canlı veri var mı bilinmiyor).

---

## 7. BELGELER ARASI ÇELİŞKİLER (işaretlendi — ÇÖZÜLMEDİ)

> ⛔ CLAUDE.md gereği bu tur hiçbirini çözmedi, karar kartı açmadı. Yalnız kayda geçirildi.

### Ç-1 (YÜKSEK) · `backend/CLAUDE.md` ↔ `09-DURUM.md:413` — doğrudan çelişki
`backend/CLAUDE.md` "Key Business Rules" md.3: *"Mentis write their own `requestMessage` on `VisibilityOptIn` (**Akış B**) and on `MatchRequest`."*
`09-DURUM.md:413`: *"VisibilityOptIn: **Taraf-2 (menti-driven) SİLİNDİ**"*.
→ Biri "var" diyor, diğeri "silindi" diyor. **Kod 09-DURUM'u doğruluyor** (§5 BY-5). `backend/CLAUDE.md` KURAL 12 (tazelik) gereği güncellenmemiş.

### Ç-2 (ORTA) · `09-DURUM.md` kendi içinde çelişiyor
`:5` "K-09 menti paneli CANLIDA" ↔ `:432` "Menti ⬜ (sıradaki)". Aynı belge, aynı gün. G9-03 üstü-çizili damgalama kuralı uygulanmamış.

### Ç-3 (ORTA) · Bu turun promptu ↔ `strateji-gercek-denetimi-2026-08-20.md`
Prompt: *"mentör/menti kıyası BU YAPILMADI"*. Gerçek: B.1 + B.2 olarak yapılmış (§giriş). Kök sebep muhtemelen **klasör dağınıklığı**: kıyas `raporlar/kod-denetimi/` altında, `raporlar/panel/` altında değil.

### Ç-4 (ORTA · metodolojik) · 08-20 ile bu tur aynı koda farklı not verdi — **kod değişmedi**
| Madde | 08-20 | Bu tur | Kod değişti mi |
|---|---|---|---|
| Menti bekleme anı (M2) | 🟡 "içerik var ama bekleme anına konumlandırılmamış" | ✅ "kart PENDING'de görünüyor" | **HAYIR** — koşul hâlâ `!needsDiscTest` (`menti/page.tsx:209`) |
| Mentör ilk aha (MT1) | ✅ TAM VAR | 🟡 YARIM | **HAYIR** — `:386-452` aynı aralık |
| Mentör aktif ilişkiler (MT9) | ✅ TAM VAR | 🟡 YARIM | **HAYIR** |
→ Bu **gerileme değil, eşik farkı.** 08-20 "özellik mevcut mu?" diye sordu; bu tur "belgedeki cümle ekranda kuruluyor mu?" diye sordu. **İki sayım kıyaslanamaz** (KURAL 16 — birim farklı). Birleştirme turunda bu ayrım korunmalı, yoksa sahte "ilerleme/gerileme" üretir.

### Ç-5 (DÜŞÜK) · İki persona belgesi DISC'in **rol-farklı** sunulmasını istiyor — kod rol-agnostik
menti persona:83 *"Mentör için DISC 'ilginç içgörü'ydü; menti için **ÖZGÜVEN AŞISI**"* · mentör persona:77 *"mentör için DISC = ilginç içgörü; menti için = özgüven aşısı"*. **İki belge bu ayrımda hemfikir.**
Kod: `ResultStep` **rol parametresi almıyor** (`_OnboardingContent.tsx:223-225`) — oysa aynı sihirbazın diğer adımları alıyor (`:191` ProfileStep `role=`, `:229` ThreeQuestionsStep `role=`). İçerik farkı yalnız backend `DISC_RESULT_CARDS`'tan gelebilir → **TEYİT GEREK**.

### Ç-6 (DÜŞÜK · açık kalan) · `stk-yonetici-panel-envanteri:47` "öğrenme yolculuğu seed uygulanmamış → boş görünüyor"
Bu turda **doğrulanamadı** — bulut oturumunda Neon erişimi yok (`CLAUDE.md` "Bulut oturumu farkı"). Kod tarafı sağlam (`learningJourneyRoutes.ts` 4 uç, FE 4'ünü de çağırıyor), ama veri boşsa menti `learning-journey/page.tsx:41-46` **"Yolculuk yüklenemedi."** çıplak hatasını görür. → ❓ açık.

---

## 8. TARANAMAYANLAR (açıkça beyan)

| # | Taranamayan | Sebep | Etkilenen madde |
|---|---|---|---|
| 1 | `menti-mentor-v2/backend/` submodule'ü **yerinde** | Bu checkout'ta init edilmemiş (boş dizin) | Yok — backend ayrı klondan (`/home/user/menti-mentor`, **aynı commit** `1304790`) okundu; §1.3'te kanıtlı |
| 2 | **Canlı DB içeriği** (Neon) — LearningStage, Question, CertificationOption seed'li mi | Bulut VM'de Neon erişimi YOK (`CLAUDE.md` "Bulut oturumu farkı") | M8, Ç-6, B3 "veri doluluğu" |
| 3 | **E-posta/push'un canlıdaki gerçek davranışı** | `TENANT_NOTIFICATIONS_ENABLED` çalışma zamanı değeri okunamadı; kod stub olduğu doğrulandı ama canlı yapılandırma değil | MT5 |
| 4 | **Backend `DISC_RESULT_CARDS` içeriği rol-farklı mı** | Kart üretimi okundu ama rol bazlı içerik farkı doğrulanmadı | Ç-5 |
| 5 | **Gerçek kullanıcı doğrulaması** | Persona belgelerinin kendisi 3-5 gerçek görüşme istiyor (menti persona:145, mentör persona:123) — yapılmadı | M11 (❓) |
| 6 | `02-ILERLEME.md:30` K-08 kök-sebep satır numaraları | K-08 bu turun kapsamı dışıydı; numara bayat olabilir | — |
| 7 | **Mobil/responsive · erişilebilirlik (a11y) · performans** | Bu turun kapsamı "istenen vs olan" işlevsel kıyastı | — |
| 8 | `(admin)` ve `/platform` panelleri | Kapsam dışı — ikisi de daha önce denetlendi | — |
| 9 | **Çok kurumlu (multi-tenant) canlı veri var mı** | DB erişimi yok | `mentor-count` `User.role` yan bulgusu |

---

## KAPANIŞ

Bu tur **kod/DB/şema değiştirmedi**, hiçbir şey silmedi, `docs/otonom/` altına dokunmadı, mevcut hiçbir belgeyi değiştirmedi. Tek değişen dosya bu rapordur.

Bulguların özeti: iki panelin de **iskeleti kurulmuş** (26 istekten 11'i tam çalışıyor, yalnız 3'ü hiç yok), asıl kütle **11 adet 🟡 YARIM** — yani "yeni özellik yaz" değil **"var olanı son bir adımla bitir"** işi. En pahalı üç sorun (ret deneyimi · mentör bildirimi · uyum yüzdesi) ürün kararı isterken, en ucuz üçü (mentör adı · talep sayacı · DISC rapeli) **veri zaten elde olduğu için** yeni uç ya da migration gerektirmiyor.

**SONRAKİ TUR: bu bulgular 00-KUYRUK.md'ye işlenecek.**
