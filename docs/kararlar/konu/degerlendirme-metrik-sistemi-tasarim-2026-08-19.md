# Tasarım: Eşleşme Sonrası Değerlendirme + Metrik Takip + Otomatik Pasifleştirme (iş #7)

**🔄 YAŞAYAN** (canonical: #7 eşleşme-sonrası sistem vizyonu + aşamalı plan) · **Oluşturma:** 2026-08-19

> **Amaç:** Ürün sahibinin "eşleşme sonrası karşılıklı değerlendirme → metrikten takip → eşik altında otomatik
> pasifleştirme → yeniden değerlendirme → periyodik hatırlatma" vizyonunu **kanıtlı ve kalıcı** bir referansa
> dökmek. Sonraki kod turları (aşamalı) bu belgeyle hizalanır — sıfırdan tartışılmaz.
>
> **Bu tur kod YAZILMADI.** Salt-okuma keşif + tek tasarım belgesi. Migration/DB/seed YOK. Vizyonun uygulanması
> **ürün sahibi onaylı ayrı inşa turlarında**, "önce DUR" kuralıyla, aşama aşama yapılır.
>
> **Kritik ayrım:** Bu belgede **VİZYON** (ürün sahibi ne istiyor) ile **KOD GERÇEĞİ** (şu an kodda ne var,
> dosya:satır kanıtlı) AYRI başlıklardır — karıştırılmamalı.
>
> **İlgili belgeler:** iş kuyruğu `10-yol-haritasi.md` (#7 follow-up + 2b/#36 kullanıcı çıkarma) · yönetici metrik
> stratejisi `docs/raporlar/persona/yonetici-persona-ve-metrikler-2026-08-02.md` · feedback tasarımı
> `05-ozellikler-ve-paneller.md` · güvenlik/KVKK `04-guvenlik-ve-kvkk.md` (KARAR 5 = DISC görünürlük). Kişi adı yok.

---

## 1. AMAÇ ve KAPSAM
#7 "follow-up" işi başta yalnız bir **ön yüz kartı** sanıldı; keşif gösterdi ki gerçek ihtiyaç, **eşleşme sonrası
tüm yaşam döngüsünü** kapsayan bir **değerlendirme + metrik + müdahale** sistemidir. Sistemin büyük bölümü kodda
**zaten var ama uçları bağlanmamış** (bkz. §4). Bu belge vizyonu dondurur ve mevcut kodu tamamlayacak aşamalı
yolu çizer.

---

## 2. ÜRÜN SAHİBİNİN VİZYONU (tam akış — sırayla)
> Bu bölüm **niyet**tir (kod değil). Kod gerçeği §4'te.

1. **Karşılıklı değerlendirme:** Mentör ve menti her görüşme sonrası birbirini değerlendirir. Bu geri
   bildirimlerden kişinin bir **puanı** oluşur.
2. **İlişki uygulama dışına taşar:** İlk görüşme(ler) uygulamada olur; samimiyet oluşunca taraflar telefon/mesaja
   geçip uygulamayı az kullanır. Bu **normaldir ve engellenmez**.
3. **Yönetici metrikten takip eder:** Dernek yöneticisi herkesi tek tek arayamaz (ölçeklenmez) → **metriklerden**
   izler: kim-kimle-kaç-kez görüşmüş, ilişki aktif/sağlıklı mı, görüşme sıklığı ne.
4. **Zamana yayılı periyodik değerlendirme:** Belirli aralıklarla (ör. 1 ay, 3 ay) yeniden değerlendirme
   noktaları tetiklenir.
5. **Eşik altına düşerse otomatik pasifleştirme:** Kişinin puanı/aktifliği bir **eşiğin altına** düşerse sistem
   kişiyi **otomatik pasife** çeker → yeni görüşme açamaz (bkz. §3 — bu özellik dernek-ayarlı, varsayılan kapalı).
6. **Yöneticiye destekleyici bildirim:** Yöneticiye bildirim gider; durum **suçlayıcı olmayan, destekleyici** bir
   dille açıklanır.
7. **Yönetici birebir görüşür:** Yönetici kişiyle konuşur; menti ve mentör için **ayrı içerikle** ne yapıp
   yapmaması gerektiğini anlatır.
8. **Yeniden değerlendirme:** Kişi yeniden değerlendirilir — **mentörse tekrar mentörlük testi**, menti de aynı
   şekilde yeniden test/değerlendirme.
9. **Yönetici onay döngüsü:** Yöneticiye "onay" bildirimi gider → yönetici kişiyi **pasif bırakır** ya da
   **canlıya geri alır**.
10. **Pasif kalanlara periyodik hatırlatma:** Pasif kalanlar için belli aralıkla yöneticiye "bu kişileri unutma"
    hatırlatması gider.
11. **Son çare — sistemden çıkarma:** Yönetici düzeleceğine inanmıyorsa kişiyi **sistemden çıkarabilir** (bu, ayrı
    planlanan **2b / #36 "kullanıcı çıkarma"** işiyle örtüşür — bkz. §6/AŞAMA 3).

---

## 3. EŞİK ve OTOMATİK PASİFLEŞTİRME KARARI (ürün sahibi kararı)
- **Özellik dernek (tenant) bazında açılıp kapanır. VARSAYILAN: KAPALI.** Otomatik tetik, ancak dernek özelliği
  **bilinçli açınca** çalışır.
- **Eşiği dernek yöneticisi KENDİSİ belirler** (kendi oranını girer). Sistem yalnızca makul bir **başlangıç/öneri**
  değeri sunar: **5 üzerinden 3.1**. Bu bir öneridir; yönetici değiştirir. **Global sabit eşik YOK.**
- **Gerekçe:** Gerçek kullanıcı verisi ~sıfır; puan dağılımı bilinmiyor; her derneğin bağlamı farklı. Tek global
  eşik uydurmak yanlış olur → eşik **dernek-ayarlanabilir + varsayılan kapalı** olmalı. Otomatik pasifleştirme,
  dernek gerçek veri görüp eşiğini girip özelliği açtıktan sonra devreye girer.
- **ÜSLUP KURALI (zorunlu):** Pasifleştirme kişiye bildirilirken dil **destekleyici**dir; suçlayıcı/başarısızlık
  dili **yasak**. "Başarısız oldunuz", "puanınız düşük" gibi ifadeler **kullanılmaz**. Durumu açıklayan,
  yöneticinin kendisiyle görüşeceğini belirten, kapıyı kapatmayan bir dil kullanılır.

### 3.1 Örnek bildirim taslakları (Türkçe — destekleyici dil)
> Nihai metinler yazım/hukuk gözden geçirmesinden geçmeli; aşağıdakiler ton örneğidir.

- **Menti'ye:** "Merhaba, mentörlük yolculuğunda bir süredir hareket göremedik. Bu tamamen olağan — bazen zamanlama
  ya da ihtiyaçlar değişir. Kurum sorumlun kısa süre içinde seninle iletişime geçip nasıl devam etmek istediğini
  konuşacak. Dilediğinde profilini güncelleyebilir ve yeniden başlayabilirsin."
- **Mentör'e:** "Merhaba, mentörlük etkinliğinde bir süredir duraklama görüyoruz. Bu, katkının değerini
  azaltmaz — yoğunluk ve uygunluk zamanla değişebilir. Kurum sorumlun seninle iletişime geçip birlikte en uygun
  yolu değerlendirecek. Dilersen kısa bir güncel değerlendirmeyle tekrar aktif olabilirsin."
- **Yönetici bildirimi (bilgilendirici):** "[Kişi] için aktiflik/değerlendirme eşiğin altına inildi. Görüşüp
  durumu birlikte değerlendirmek isteyebilirsin. Ayrıntılar ve önerilen adımlar kişi kartında."

---

## 4. KOD GERÇEĞİ (dosya:satır kanıtlı — vizyondan AYRI)
> Önceki keşif + bu turun TEYİT-1/TEYİT-2 doğrulamaları. "Sanırım" yok; her iddia kanıtlı.

### 4.1 ZATEN VAR (şema + çalışan backend + canlı FE)
- **Şema neredeyse tam:** `Feedback` (`schema.prisma:574-614`, çift yönlü + periyodik alanlar), `MeetingCheckIn`
  (`539-572`, `overallRating/progressRating/continueIntent`), `MatchFeedback` (`1117-1134`, checkpoint
  DAY_3/14/30 + `earlyExit`), `FeedbackLog` (`463-485`, faz 1/3 ay), `Match`+`MatchStatus`
  (ACTIVE/COMPLETED/EARLY_EXIT/DISSOLVED), `MentorshipAgreement` (yenileme yaşam döngüsü), `qualityMultiplier`
  (`TenantMembership` + `UserProfile`), `Tenant.minMatchScoreThreshold` + `Tenant.maxMeetingsPerWeek`.
- **Çalışan backend (route'a bağlı):** feedback yaz/oku (`feedbackController.ts:29-137`), check-in
  (`meetingCheckInController.ts:10-96`), risk sinyali `getPairEfficiencySignal` GREEN/YELLOW/RED
  (`meetingCheckInController.ts:111-169`, `GET /api/meetings/pair-signal`), health metrics
  (`retentionMetrics.service.ts:38-140`), coaching suggestions (`coachingSuggestions.ts:17-168`).
- **Cron altyapısı çalışıyor:** `startCronScheduler()` (`server.ts:145`); aktif işler: algoritma ağırlığı, KVKK
  purge, taslak-tenant hatırlatma/temizlik, **feedback hatırlatma** (`cronScheduler.ts:204-238`, günlük 09:00),
  **anlaşma yenileme** (`244-276`), **mentör sertifika yönetici bildirimi** (`288-333`).
- **Canlı FE:** check-in formu (`(dashboard)/meeting-checkin/page.tsx`), bağlamsal feedback modalı
  (`MeetingFeedbackCard.tsx`), KPI **agregat** NPS (`(admin)/admin/kpi/page.tsx`), program-sağlığı drill-down +
  nudge (`ProgramHealthSection.tsx`).

### 4.2 ÖLÜ / BAĞLANMAMIŞ (yazılmış ama uçları bağlanmamış — doğrulandı)
- 🔴 **Periyodik checkpoint tetikleyici ÖLÜ:** `findMatchesDueForCheckpoint` (`feedback.service.ts:71`) tüm
  backend'de **tek geçiş = yalnız tanım** (grep: 1 occurrence). Hiçbir cron/route çağırmıyor → DAY_3/14/30
  otomatik değerlendirme istenmiyor.
- 🔴 **Kalite puanı DB'ye YAZILMIYOR:** `computeMentorQualityMultiplier` her çağrıda bellekte hesaplanıp
  eşleşme sıralamasında kullanılıp atılıyor (`scoring.ts` + `matching.ts`). `TenantMembership.qualityMultiplier`'a
  yalnız **sertifikada** yazılıyor (`certification.service.ts:240`, `STARTING_MULTIPLIER`) → yöneticinin
  görebileceği **kalıcı kişi puanı yok**.
- ~~[ESKİ · düzeltildi — madde 79] 🔴 **`maxMeetingsPerWeek` uygulanmıyor:** yalnız ayar CRUD'unda (`adminSettingsController.ts`), hiçbir görüşme akışında kontrol edilmiyor.~~
  ⚠️ GÜNCELLEME (2026-08-28): ENFORCE EDİLDİ — haftalık görüşme limiti **7-gün UTC kova** ile uygulanıyor (madde 79, T1-A). Bu gövde satırı bayattı; `dm:220-223` güncellemesi Aşama-1'i işlemiş ama bu satırı atlamıştı.
- 🔴 **`getPairSignal` FE'de çağrılmıyor:** API sarmalayıcı `frontend/.../lib/api/meetings.ts` tanımlı, hiçbir
  bileşen kullanmıyor → yöneticinin ilişki-sağlığı sinyalini gördüğü ekran yok.

### 4.3 TEYİT-1 — "Yeniden değerlendirme / tekrar test" (bu tur doğrulandı)
Arama terimleri: retest/reassess/reevaluate/retake/redoTest/resetTest/recertify/yenidenDegerlendirme/tekrarTest/sifirlaTest.
- **DISC/adaptif test tekrarı → KISMEN/YOK:** motor var (`adaptiveTestEngine.ts:85-178`); `recalcDiscVector`
  (`discVectorService.ts:95-159`) mevcut yanıtlardan **yeniden hesaplar** ama yanıtları sıfırlamaz. **"Testi
  sıfırdan yeniden başlat" için admin/self tetikleyici YOK.** UserResponse yalnız KVKK sil/anonimleştirmede
  temizleniyor (`gdprService.ts:76-84,147`).
- **Sertifikasyon (mentörlük testi) tekrarı → VAR:** `CERT_CONFIG.attemptsBeforeCooldown:2` + `cooldownHours:24`
  + `certAttempts` sayacı (`certification.service.ts:24-32,215-240`). Mentör **cooldown sonrası sertifika testini
  tekrar verebiliyor**; başarısız konular sonraki denemeye ağırlıklandırılıyor. **Admin override/cooldown-sıfırlama
  YOK.**
- **Yönetici-tetikli yeniden değerlendirme → YOK:** yalnız **rematch** var (`adminController.ts` triggerRematch —
  eşleştirmeyi sıfırlar, **test verisini değil**). `needsOrientation` kilidi var ama **self-servis** açılıyor
  ("rehber tamamlandı → kilit kalktı", `userController.ts:519-527`; mentör preparedness≤2 → kilitler,
  `feedbackController.ts:78`) — bu **yeniden-test değil**, hafif oryantasyon.
- **Dürüst pushback:** "yeniden değerlendirme yapıldı" → **kısmen doğru**: mentör için sertifika-retry yolu VAR;
  ama **genel, admin-tetikli, mentör+menti kapsayan bir "yeniden değerlendirme" akışı YOK.**

### 4.4 TEYİT-2 — "Periyodik hatırlatma" (bu tur doğrulandı)
- **Cron altyapısı → VAR + aktif** (`server.ts:145`; §4.1'deki işler). Yani "hatırlatma altyapısı" mevcut.
- **Periyodik değerlendirme checkpoint tetikleyici → ÖLÜ** (bkz. §4.2, `findMatchesDueForCheckpoint` çağrısız).
- **Pasif/unutulan kişi için periyodik yönetici hatırlatması → YOK:** `retentionMetrics` yalnız **istek-anında**
  hesaplanıyor (periyodik değil); `nudgeService` yalnız **elle** tetikleniyor (otomatik toplu re-engagement KVKK
  gerekçesiyle bilinçli kaldırılmış). Sertifika yönetici bildirimi periyodik ama **yalnız sertifika** kapsamında.
- **Dürüst pushback:** "periyodik hatırlatma olmalıydı" → **altyapı var, ilgili tetikler bağlı değil**;
  pasif-kişi periyodik hatırlatması hiç yok.

### 4.5 HİÇ OLMAYAN
- Kişi/eşleşme seviyesinde **`blocked`/`restrictedUntil`** alanı (otomatik pasifleştirme için) YOK.
- **Otomatik pasifleştirme mantığı** (eşik altı → görüşme izni verme) YOK.
- **Dernek-bazlı eşik ayarı + açma/kapama bayrağı** (§3) YOK (`minMatchScoreThreshold` var ama farklı amaçlı —
  eşleşme taban barajı, aktiflik/kalite pasifleştirme değil).
- Yöneticiye **kişi-bazlı puan** gösterimi + **onay döngüsü** (pasif bırak / canlıya al) ekranı YOK.

---

## 5. GÖRÜNÜRLÜK / KVKK KARARI
- **Kişi-bazlı feedback/kalite puanı YALNIZCA STK yöneticisine görünür** (kişinin kendisi görmez). Gerekçe:
  KARAR 5 ruhu — feedback vereni koru, puan enflasyonunu ve kişiler-arası gerilimi önle.
- **AÇIK NOKTA (hukuk):** KVKK Md.11 kapsamında kişinin kendi verisine erişim hakkı ayrı bir hukukçu konusudur.
  Buradaki karar **ürün/gösterim** kararıdır ("yalnız yönetici görür"); yasal metin tarafı (K1 taslak metinler,
  `01/04` belgeleri) ayrıca ele alınmalı. Bu belge yasal görüş yerine geçmez.

---

## 6. AŞAMALI UYGULAMA PLANI (kod turlarının yol haritası)
> Her aşama ayrı, PO onaylı inşa turu. Boy: S/M/L. "Migration?" = canlı Neon şema değişikliği gerekir mi.

### AŞAMA 1 — Uçları bağla (migration YOK, düşük risk) · Boy: **M**
Mevcut ama bağlanmamış parçaları göster/çalıştır:
- Risk sinyalini (`getPairEfficiencySignal`) yönetici ekranına bağla (`getPairSignal` FE'de çağrılsın).
- `computeMentorQualityMultiplier` sonucunu `TenantMembership.qualityMultiplier`'a **kalıcı yaz** (alan VAR →
  migration yok) + admin havuz tablosuna **kişi puanı sütunu** (yalnız yönetici, §5).
- Ölü `findMatchesDueForCheckpoint`'i bir cron'a bağla (periyodik değerlendirme tetikle) + feedback/hatırlatma
  bildirimi.
- **Otomatik pasifleştirme KODU bu aşamada yazılabilir ama TENANT AYARIYLA KAPALI gelir** — eşik alanı + açma/kapama
  bayrağı; tetik **varsayılan kapalı**. Yönetici her şeyi **görür**, kararı **elle** verir.
- Not: eşik alanı + bayrak `Tenant`'a eklenirse **küçük bir migration** gerekebilir (nullable/additive) — additive
  olduğundan Aşama 1'de tutulabilir ya da Aşama 2'ye bırakılabilir (PO seçer).

### AŞAMA 2 — Otomatik pasifleştirmeyi aktifleştir (migration VAR) · Boy: **M–L**
- Kişi-seviyesi `blocked`/`restrictedUntil` (+ gerekiyorsa dernek eşik/bayrak) alanları → **additive, nullable
  migration** (Neon shadow-DB kuralı: `IF NOT EXISTS` SQL + `db execute` + `migrate resolve`; `db push` YASAK).
- Görüşme oluşturma akışına (`bookMeeting`/`createMeeting`) **eşik kontrolü**: eşik altındaki kişi yeni görüşme
  açamaz; **destekleyici üslupla** (§3.1) bildirilir. Dernek özelliği açık + eşiğini girmişse çalışır.

### AŞAMA 3 — Yeniden değerlendirme + hatırlatma + onay döngüsü · Boy: **L**
- **Yeniden değerlendirme akışı** (TEYİT-1'e göre): mentör için mevcut sertifika-retry'ı yönetici-tetikli hale
  getir; menti için yeniden değerlendirme akışını tasarla (sıfırdan — çünkü şu an YOK).
- **Pasif kalanlara periyodik yönetici hatırlatması** (TEYİT-2'ye göre: cron altyapısı var, yeni bir periyodik
  iş bağlanır — sertifika-hatırlatma deseni örnek).
- **Yönetici onay döngüsü** (pasif bırak / canlıya al) ekranı + bildirimi.
- **2b / #36 "kullanıcı çıkarma"** (yönetici elle pasifleştir/sil + not + kim yaptı) bu vizyonun "yönetici elle
  karar verir / son çare çıkarma" kısmını tamamlar — ayrı ama ilişkili iş; bu aşamada birlikte ele alınabilir.

---

## 7. AÇIK NOKTALAR / PO KARARI GEREKLİ
> Uydurulmadı; PO netleştirene kadar açık.
1. **Puan hangi kaynaktan türer?** Üç ayrı feedback kaynağı var: `Feedback` (görüşme detay), `MatchFeedback`
   (DAY_3/14/30 checkpoint), `FeedbackLog` (1/3 ay). "Kişi puanı"nın **resmi kaynağı** hangisi (ya da bileşimi)?
2. **Periyodu kim ayarlar?** DAY_3/14/30 sabit mi, dernek-ayarlanabilir mi?
3. **Kısıtlama otomatik mı, yarı-otomatik mi?** Eşik altı → sistem otomatik mı engeller, yoksa yöneticiye uyarıp
   kararı ona mı bırakır? (Belge felsefesi "yönetici aramasın/uyarmalı" → **yarı-otomatik uyarı** daha uyumlu
   görünüyor; Aşama 1 zaten bunu yapıyor.)
4. **Yeniden değerlendirme UX'i:** menti tarafı sıfırdan tasarlanacak; mentör tarafı sertifika-retry'a mı
   bağlanacak? Yönetici-tetikli mi, self mi?
5. **Onay döngüsü ekran akışı:** yönetici "pasif bırak / canlıya al" kararını nerede/nasıl verir?
6. **Ölü kod kararı:** `maxMeetingsPerWeek`, `findMatchesDueForCheckpoint`, `blockedPairs` — bağlanacak mı,
   silinecek mi (temizlik)?

---

## 8. BU TURUN KAYDI
Salt-okuma keşif + tek tasarım belgesi. **SIFIR** kod/migration/DB/seed. Açık PR'lar (#12: backend #47 / çatı
#93+#94; #37: backend #46 / çatı #91+#92) **dokunulmadı** — PO merge'ini bekliyor. Bu belge ayrı docs branch'te
PR olarak açıldı, **MERGE EDİLMEDİ**. Sıradaki adımı PO seçer (Aşama 1'e girmeden önce açık merge kuyruğunu
temizlemek dahil).

> **⚡ GÜNCELLEME (2026-08-19, merge turu) — AŞAMA 1 ✅ MERGED, CANLIDA:** backend #48 (→ backend main `b5f4b88`) +
> çatı #100 (→ çatı main `ef2b995`, pointer senkron) merge edildi; iki main CI yeşil → aşağıda "bağlanan" kısımlar
> autodeploy ile CANLIDA. Aşağıya "PR'da, MERGE OLMADI" olarak yazılmıştı; artık merged. Aşama 2/3 kapsamı değişmedi (açık).
>
> **⚡ GÜNCELLEME (2026-08-19) — AŞAMA 1 UYGULANDI (PR'da, MERGE OLMADI):** backend **#48** + çatı **#100**.
> **Bağlanan (migration'sız):** (1) kalite puanı `TenantMembership.qualityMultiplier`'a kalıcı yazım (event-driven,
> `persistMentorQualityMultiplier`); (2) yönetici görünürlüğü — mentör havuzu "Kalite Puanı" kolonu + eşleşmeler
> "Risk" rozeti (`adminListUsers`/`adminListMatches`; §5 KVKK: yalnız yönetici); (3) ölü `findMatchesDueForCheckpoint`
> günlük cron'a (`runCheckpointFeedbackReminderCron`, **LOG-ONLY**). Puan kaynağı KORUNDU: `Feedback`
> (guidance/resourceSharing/trust) — §7 Açık Nokta 1 bu turda değişmedi, mevcut `computeMentorQualityMultiplier` esas alındı.
>
> **AŞAMA 1'den AŞAMA 2'ye KAYAN (bilinçli — migration/PO onayı gerekli):**
> - Otomatik pasifleştirme KODU + tenant eşik alanı + açma/kapama bayrağı (§3, §6-Aşama1'de "yazılabilir" denmişti →
>   şema=migration olduğu için Aşama 2'ye alındı; PO merge sırasında onay verirse Aşama 2'de).
> - Checkpoint cron **gerçek bildirim** (şu an LOG-ONLY): mail geri-alınamaz + sağlam tekrar-bildirme guard'ı
>   (`checkpointNotifiedAt` gibi) şema alanı ister.
> - FE `ContextualFeedbackHost`/`MeetingProvider` bağlama: kullanıcı-bazlı "vadesi gelen checkpoint" endpoint'i +
>   poller yok (kullanıcıya görünen modal → şüphede bağlama). Aşama 2/3.
> - feedback `periodic*` alanlarının doldurulması = değerlendirme formu (Aşama 3).
