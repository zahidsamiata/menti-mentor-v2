# 📸 DONDURULMUŞ — Tam Gerçek Durum Envanteri (Belge vs Kod)

> **Tarih:** 2026-08-19 · **Tür:** Keşif fotoğrafı (dondurulmuş, `belge-duzeni-rehberi.md`) · **Mod:** SALT-OKUMA tespit turu
> **Kapsam:** Tüm proje — backend + frontend + şema + belgeler. Kod/şema/DB/mevcut-belge **değiştirilmedi**; tek çıktı bu belgedir.
> **Amaç:** Ürün sahibi için "belgede ne dedik, kodda karşılığı var mı; ne yarım kaldı; iş sayısı neden düştü; şu an tam neredeyiz" sorularının kanıtlı yanıtı.
>
> **Yöntem notu:** Karar-kritik iddialar (ölü mü, iş bitti mi) rapor yazarı tarafından **kendi grep'iyle** doğrulandı; alt-ajan raporuna körü körüne güvenilmedi. Kod ile belge çeliştiğinde **KOD KAZANIR** ve çelişki açıkça yazıldı. Doğrulanamayan yerler "BELİRSİZ / belgede net değil" olarak işaretlendi — uydurma zincir yok.
>
> **Güven etiketleri:** 🟩 rapor yazarı grep'iyle doğrulandı · 🟨 belge/alt-ajan kaynaklı, kod-teyidi kısmi · ❓ belirsiz, ayrı bakılmalı.

---

## Git Durumu (turun başında doğrulandı)

| Repo | main HEAD | Beklenen | Durum |
|---|---|---|---|
| Çatı (umbrella) | `753c545` | `753c545` civarı | ✓ eşleşti |
| Backend (submodule) | `b6187c1` | `b6187c1` | ✓ eşleşti |
| Pointer | `b6187c1` (senkron) | senkron | ✓ |
| Açık PR | Çatı 0 / Backend 0 | 0 / 0 | ✓ |

Son çatı merge zinciri: `#95` (docs değerlendirme-metrik tasarım) · `#92/#91` (login enumeration #37) · `#94/#93` (DISC çoklu-harf #12). Masa temiz.

---

# EKSEN 1 — Ölü / Yarım / Bağlanmamış Kod

## 1.1 Backend — kesin ölü kod (🟩 kendi grep'imle doğrulandı)

| # | Öğe | Yer | Kanıt | Durum | İşaret |
|---|---|---|---|---|---|
| D1 | `findMatchesDueForCheckpoint` | `backend/src/services/feedback.service.ts:71` | Tüm repoda **tek geçiş** = tanım. 0 çağrı, hiçbir cron/route/servis bağlamıyor. | ❌ ÖLÜ | **silinebilir** |
| D2 | `fetchWithRetry` / `llmRetry.ts` | `backend/src/services/llmRetry.ts:34` | 0 import. Dosya yorumu "matchReason.ts kullanır" der ama **matchReason.ts yok**. LLM kaldırılınca atıl kalmış. | ❌ ÖLÜ | **silinebilir** |
| D3 | `UserProfile.qualityMultiplier` | `backend/prisma/schema.prisma:970` | Alan tanımlı; canlı okuma/yazma **`TenantMembership.qualityMultiplier`** (schema:1065) üzerinden yürüyor (certification.service, sjtScoring, scoring). UserProfile'daki ikiz alan atıl görünüyor. | 🟨 ÖLÜ ALAN adayı | **teyit sonrası silinebilir** (migration ister) |

> **D2 ek bulgu — belge disiplini boşluğu:** `llmRetry.ts` atıl olduğu **zaten fark edilmiş** ama karara bağlanmamış:
> `hayalet-backend-2026-08-02.md:38` "muhtemelen atıl → **araştır**", `belge-aksiyon-denetimi-2026-08-11.md:215` "import izi belirsiz → **TEYİT GEREK**". İki ayrı denetimde işaretlenip 8+ gün çözülmeden durması, tespit→aksiyon köprüsündeki kopukluğun somut örneği.

## 1.2 Backend — uyuyan yetenek (❗ ölü DEĞİL, bilinçli/ertelenmiş)

| # | Öğe | Yer | Kanıt | Yorum |
|---|---|---|---|---|
| U1 | `sector-scorer.service.ts` (`resolveSectorScore`, `rankMentorsWithSectorScore`) | `backend/src/services/sector-scorer.service.ts:67,99` | Yalnız kendi içinde + örnek yorumda geçiyor; dış çağrı 0. Coverage: `FNDA:0` (hiç çağrılmamış). Canlı `matching.ts` basit etiket-kesişim (Jaccard) kullanıyor. | **bilinçli duruyor** — 5-bileşen sektör skoru staging gerektiriyor (İŞ "sektör skoru canlı bağlama", v2). Silme değil, bağlanmayı bekliyor. |
| U2 | `matchingInterface.ts` (strategy pattern) | `backend/src/services/matchingInterface.ts` | 0 import; dosya yorumları "Mevcut akış USER, planlı akış JOB_LISTING" diyor. | **bilinçli duruyor** — gelecek iş-ilanı eşleştirmesi için şablon. |

## 1.3 Şema — şüpheli ölü/yarım alanlar

| Alan | Model | Kanıt (🟩) | Durum |
|---|---|---|---|
| `engagementScore`, `goalClarityScore` | `Feedback` (`schema.prisma:589-590`, "// YENİ") | `feedbackController.ts`'te yalnız **menti görünümünden ÇIKARMA** destructure'ında geçiyor (satır 130); hiçbir create/submit bu alanları **yazmıyor**. Form toplamıyor. | 🟨 tanımlı ama toplanmıyor → **yarım özellik** (bağla ya da sil) |
| `periodic*` (5 alan: CareerGrowth/Trust/Network/Confidence/Nps) | `Feedback` | Aynı destructure'da geçiyor, yazan endpoint yok. | 🟨 planlanmış-yazılmamış (dönemsel metrik özelliği tasarlanmış, bağlanmamış) |
| `UserProfile.qualityMultiplier` | `UserProfile` | Bkz. D3. | 🟨 ölü alan adayı |

> Not: `engagementScore`/`goalClarityScore` **kasıtlı olarak** menti görünümünden gizleniyor (mentörün menti hakkında yazdığı, mentinin görmemesi gereken alanlar) — bu doğru bir gizlilik davranışı. Ama alanların hiç **yazılmaması**, özelliğin arka-uçta tanımlanıp ön-uçta hiç toplanmadığını gösteriyor.

## 1.4 Frontend — kesin ölü kod (🟩 kendi grep'imle doğrulandı)

| # | Öğe | Yer | Kanıt | İşaret |
|---|---|---|---|---|
| F1 | `getPairSignal` (API sarmalayıcı) | `frontend/src/lib/api/meetings.ts:111` | Tek geçiş = tanım. Hiçbir sayfa/komponent çağırmıyor. | **silinebilir** |
| F2 | `matchingApi.listMentors` | `frontend/src/lib/api/matching.ts:18` | Tanım var; çağrı yerleri yalnız `mentorMatches`/`countMentors`/`getRankedMentis` kullanıyor (menti/mentor page). `listMentors` 0 çağrı. | **silinebilir** |
| F3 | `agreementsApi.create` | `frontend/src/lib/api/agreements.ts:47` | Çağrı yerleri `getActive`/`renew`/`end`/`confirm` kullanıyor; `create` 0 çağrı. | **silinebilir** (veya admin akışına bağlanacaksa bilinçli) |
| F4 | `questionsApi.unhide` | `frontend/src/lib/api/questions.ts:65` | 0 çağrı. | **silinebilir** |
| F5 | `ContextualFeedbackHost` komponenti | `frontend/src/components/organisms/ContextualFeedbackHost.tsx:22` | Tanım var, hiçbir layout/sayfa **mount etmiyor**. | **bağlanabilir ya da silinebilir** |
| F6 | `MeetingProvider` + `useMeeting` | `frontend/src/context/MeetingContext.tsx:34` | Provider hiçbir yere mount edilmemiş; `useMeeting` yalnız F5 içinde çağrılıyor, F5 de render edilmiyor → **tüm FE bağlamsal-feedback mekanizması ölü zincir**. | **bağlanabilir ya da silinebilir** |

> **F5/F6 not:** `unutulmus-niyet-envanteri-2026-08-10.md:69` bu komponentin `payload.tags backend şemasında yok; şimdilik yok` sorununu zaten işaretlemiş. Yani mekanizma yazılmış, backend alan eksikliği yüzünden bağlanmadan bırakılmış — yarım kalan bir özellik.

## 1.5 API uyumsuzluğu (arka var / ön kullanmıyor)

| Öğe | Backend | Frontend | Durum |
|---|---|---|---|
| `GET /api/meetings/pair-signal` | Endpoint mevcut (`meetingRoutes.ts`) | Sarmalayıcı var ama çağrılmıyor (F1) | **öksüz endpoint** — arka uç yazılmış, ön uçta özellik yok |

## 1.6 Eski envanter (`hayalet-backend-2026-08-02.md`) — güncel mi?

| Eski bulgu | 2026-08-19 durumu |
|---|---|
| `iceBreaker.ts` atıl | ✅ **temizlenmiş** — dosya artık yok |
| `sector-scorer` kullanılmıyor | ⚠️ **hâlâ kullanılmıyor** (U1) — değişim yok |
| `llmRetry.ts` atıl mı? | ⚠️ **hâlâ atıl** (D2), karara bağlanmamış |
| `qualityMultiplier` iki-konum riski | ⚠️ **sürüyor** (D3) — UserProfile ikizi atıl |

---

# EKSEN 2 — "Yapacağız Denip Yapılmayan" (Niyet vs Kod Gerçeği)

Kaynak omurga belgeler: `unutulmus-niyet-envanteri-2026-08-10`, `belge-aksiyon-denetimi-2026-08-11`, `00-karar-statu-haritasi-2026-08-14`, `11-tasarim-kararlari...`, `eksikler-derinlestirilmis-2026-08-15`, `04-guvenlik-ve-kvkk`.

## 2.a KARAR ALINDI AMA YAPILMADI (kod yok / taslak)

| # | Niyet | Belge | Kod gerçeği (🟩/🟨) | Durum |
|---|---|---|---|---|
| A1 | **K4 — 18+ yaş doğrulama** (input + DB alanı) | `04-guvenlik-ve-kvkk`, `08-acik-sorular` | 🟩 `schema.prisma`'da `birthDate`/`age`/`birthYear` **yok**; yaş girdisi yok. Metinlerde "18+" yazılı ama veri katmanında doğrulama yok. | ❌ YAPILMADI |
| A2 | **K6 — admin sayfaları server-side guard** | `04-guvenlik-ve-kvkk` | 🟨 middleware/server-guard izi yok; client-side koruma. (PO-kararı bekleyen madde olarak da geçiyor.) | ❌ YAPILMADI |
| A3 | **K3 — eski kayıt consent politikası** (backfill / yeniden-rıza) | `08-acik-sorular` | 🟨 backfill/trigger kodu yok; PO kararı bekliyor. | ❌ YAPILMADI (karar bekliyor) |
| A4 | **Soru cevap-tipi seçimi** (şıklı / açık-uçlu) | `10-yol-haritasi:71` (#13, "kapsam belirsiz, ❓ önce teyit") | 🟨 şema alanı yok, migration gerekir; önceki turda bu yüzden **atlandı** (`09-DURUM` brief-yanlışı (a)). | ❌ YAPILMADI |
| A5 | **Sertifika bankası 20-senaryo canlı seed** | `eksikler-derinlestirilmis-2026-08-15:20-27` | 🟨 `seed-certification.ts` 20 içeriyor, canlıda ~5. | ❌ YAPILMADI (seed gerekli) |
| A6 | **DISC-tipine yaklaşım içeriği** | `eksikler...:9-18` | 🟨 3 seçenek tartışıldı, kod yok. | ❌ YAPILMADI (tasarım bekliyor) |
| A7 | **Bekleme salonu bildirim izni** (`Notification.requestPermission`) | `arsiv/strateji`, `unutulmus-niyet` | 🟨 bekleme salonu var, tarayıcı bildirim izni kodu yok. | ❌ YAPILMADI |
| A8 | **Gerçek push (Expo/FCM)** | `notificationService.ts` TODO | 🟨 `sent:true` stub; in-app/e-posta idare ediyor. | ❌ STUB (bilinçli ertelenmiş) |
| A9 | **Sektör/etiket havuzu (admin-yönetilir tablo)** | `tasarim-kararlari-admin`, `00-karar-statu-haritasi` | 🟨 seed'de etiket var, admin-yönetilir tablo yok (PO-kararı bekleyen madde). | ❌ YAPILMADI |

## 2.b YAPILDI SANILMIYORDU AMA ZATEN VAR (sürprizler)

| # | Öğe | Belge algısı | Kod gerçeği | Durum |
|---|---|---|---|---|
| B1 | **K2 — OAuth `kvkkConsentAt`** | `unutulmus-niyet` / önceki envanter: "OAuth yol NULL bırakıyor, YARIM" | 🟩 **`oauthService.ts:112` `kvkkConsentAt: new Date()` SET EDİYOR.** Self-serve (`selfServeController.ts:284,303`) ve klasik kayıt (`authController.ts:176`) da set ediyor. | ✅ **BELGE YANILIYOR — KOD TAM.** K2 için OAuth boşluğu iddiası geçersiz; onay anı tüm giriş yollarında yazılıyor. |
| B2 | **F7 — KPI drill-down** | roadmap'te açık görünüyor (bayat) | 🟨 `00-karar-statu-haritasi:84` "kod TAM" | ✅ ZATEN VAR |
| B3 | **Durum rozeti / ThemeToggle admin-platform** | `10-yol-haritasi`'da ⏳ | 🟨 `09-DURUM`: durum rozeti/ThemeToggle "zaten mevcuttu" | ✅ ZATEN VAR (belge geç güncellenmiş) |

## 2.c YARIM KALDI (başlanmış, bitmemiş/bağlanmamış)

| # | Öğe | Kod gerçeği | Durum |
|---|---|---|---|
| C1 | **Öğrenme-yolculuğu tamamlanma görünürlüğü** | 🟩 `learningJourneyCompletedAt` **platform admin**'de görünür (`platformTenantController.ts:177,202`) ama **STK admin** panelinde yok (`adminController.ts`'te geçmiyor). | 🟨 YARIM — platform görüyor, kurum yöneticisi görmüyor. (Önceki iddia "hiç yok" idi; nüans: platformda VAR.) |
| C2 | **Havuz kartı (mentör→menti DISC+gerekçe)** | 🟨 backend kart verisi üretiyor; FE render değişken/eksik | 🟨 YARIM |
| C3 | **Onay paneli bildirim maili** | 🟨 kullanıcı onay/red maili çalışıyor; kurum/destek bildirimi bağlanmamış | 🟨 YARIM |
| C4 | **Ölü DISC seed kaynağı temizliği** | 🟨 `seed-questions.ts` silindi (backend #45); `seed.ts` çelişkisi kalmış | 🟨 KISMİ |
| C5 | **Feedback `engagementScore`/`goalClarityScore`/`periodic*`** | 🟩 şema alanları var, yazan form yok (bkz. 1.3) | 🟨 YARIM özellik |
| C6 | **Sektör skoru 5-bileşen** | 🟩 `sector-scorer.service.ts` yazılı, canlı yola bağlı değil (U1) | 🟨 YARIM (staging bekliyor) |

---

# EKSEN 3 — İş Sayısı Hikayesi (84-94 → 34 → 28)

> **Dürüstlük notu:** Bu kronolojinin bir kısmı belgede net, bir kısmı **değil**. Aşağıda hangisinin belgesel kanıtı var, hangisinin olmadığı ayrı işaretlendi. Kanıtlanamayan zincir **uydurulmadı**.

## 3.1 "84–94" — belgesel kanıt YOK ⚠️

- Bu büyük ham sayıyı **birebir veren bir belge bulunamadı.** Arşiv belgeleri (`arsiv/SOHBET-KARAR-OZETI-devir.md`, `arsiv/strateji-ve-guvenlik-denetimi.md`, `arsiv/09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md`) çok sayıda karar/madde içeriyor ama numaralı "84" ya da "94" listesi yok.
- **Değerlendirme:** "84–94" büyük olasılıkla erken sohbetlerde tüm karar + bulgu + madde toplamının **sözlü/yuvarlak** bir sayımıdır; hiçbir belgeye numaralı liste olarak geçmemiş. → **belgede net değil, muhtemelen sözlü.** (Boşluğun kendisi bir bulgu: erken vizyon sayımı belgelenmemiş.)

## 3.2 "34" — belgede geçiyor ama "birebir çıkmıyor" olarak işaretli 🟩

- `devir/08-oturum-2026-08-15.md:56-58` (aynen):
  > "Eski konuşmalarda geçen **'34 iş'** çerçevesi güncel yol haritasından **birebir çıkmıyor.** Kanıtlı sayı **28 kodlanabilir iş** (v1 13 + v2 15). 28 + 2 PO-kararı = 30; teyit/keşif eklenince ~40. '34' yuvarlak/eski bir çerçevedir."
- Yani "34" de tam kaynağı belgelenmemiş, **yuvarlak/eski** bir çerçeve olarak kabul edilmiş. → **34'ün türetimi belgede net değil**, ama "34 → 28 düzeltmesi" belgede net.

## 3.3 "28" — belgede KESİN ve kanıtlı 🟩

- `devir/08-oturum-2026-08-15.md:46-51` kesin durum tablosu:

  | Küme | Toplam | ✅ canlıda | ⏳ kaldı |
  |---|---|---|---|
  | v1 | 13 | 4 | 9 |
  | v2 | 15 | 0 | 15 |
  | **Kodlanabilir toplam** | **28** | 4 | 24 |

- Ek: **2 PO-kararı** (K6, sektör/etiket havuzu) + **~10 teyit/keşif** (doğrudan kodlanamaz). 28 + 2 = 30; +teyit ≈ 40.

## 3.4 Düşüşün sebebi — kanıtlı kısım vs boşluk

| Geçiş | Sebep | Kanıt durumu |
|---|---|---|
| 84–94 → 34 | Kapsam daraltma + madde birleştirme + kod-dışı/PO işlerinin ayrıştırılması | ⚠️ **belgede net değil** — ara adımı gösteren belge yok |
| 34 → 28 | "34" yuvarlak çerçeveydi; yol haritası **birebir sayılınca** 28 kodlanabilir iş çıktı (bazı maddeler "zaten var" / teyit-keşif / PO-kararı olarak ayrıldı) | 🟩 **belgede net** (`devir/08:56-58`) |
| 28 → "4 bitti" | 4 iş canlıya alındı (KARAR 5, KVKK K2/K4/K5) + sonraki turlarda daha fazlası | 🟩 kısmen net (aşağıda Eksen 4) |

> **Sonuç:** "84→34" ayağı **belgesel olarak kanıtlanamıyor** (muhtemelen sözlü kapsam kararları). "34→28" ayağı **belgede açıkça yazılı**. Bu, sayının kendisinden çok **belge disiplinindeki boşluğu** gösteriyor: büyük eleme kararları belgeye numaralı olarak işlenmemiş.

---

# EKSEN 4 — Güncel Tam Envanter + Net Tablo

> Durum kodları: ✅ canlıda · 🔀 PR'da bekliyor · ⏳ kaldı (kod yok/eksik) · ⏸️ bilinçli ertelendi · 🔵 tasarım hazır, kod bekliyor · ❓ belirsiz.
> **Kanıt sütunu:** 🟩 = rapor yazarı grep'iyle; PR no'ları belge-kaynaklı (git SHA teyidi bu turda yapılmadı, doküman referansı).

## 4.1 v1 (canlı-öncesi, 13 kodlanabilir iş)

| # | İş | Durum | Kanıt |
|---|---|---|---|
| 1 | KARAR 5 — DISC güvenlik (menti mentörün DISC'ini görmez) | ✅ canlıda | backend #37 + çatı #71 (`09-DURUM`) |
| 2 | K2 — onay anı (`kvkkConsentAt`) tüm giriş yolları | ✅ canlıda | 🟩 `authController.ts:176`, `selfServeController.ts:284/303`, `oauthService.ts:112` — **OAuth dahil** |
| 3 | K4 — 18+ **beyanı** (metin içinde) | ✅ canlıda (beyan) / ⏳ **veri doğrulaması yok** | 🟩 şemada yaş alanı yok (A1) |
| 4 | K5 — sunucu konumu beyanı | ✅ canlıda | `09-DURUM` (kvkk sayfası) |
| 5 | ThemeToggle admin/platform | ✅ zaten mevcuttu | `09-DURUM` (B3) |
| 6 | Onay/red maili (kullanıcı) | ✅ canlıda · kurum/destek maili ⏳ | C3 |
| 7 | Havuz kartı follow-up | 🟨 yarım (backend var, FE render eksik) | C2 |
| 8 | Sol menü 4-grup (KARAR 1) | ✅ canlıda | çatı #76 (`09-DURUM`) |
| 9 | Algoritma kalibrasyon sayfası (ağırlık UI) | ⏳ kaldı | `09-DURUM` — ağırlık gösterimi yok |
| 10 | Durum rozeti (KARAR 3) | ✅ canlıda / zaten vardı | `09-DURUM` |
| 11 | Sertifika rozeti (KARAR 4) | ✅ canlıda | backend #40 + çatı #77 (`09-DURUM`) |
| 12 | DISC baskın+ikincil harf "DI" (KARAR 11) | ✅ canlıda (bu turda merge) | 🟩 git: backend #47 + çatı #93 |
| 13 | Soru cevap-tipi seçimi | ⏳ kaldı (migration gerekli, atlandı) | A4 |

## 4.2 v1-ek: sonraki keşif turları (canlıya çıkanlar + açık)

| İş | Durum | Kanıt |
|---|---|---|
| İş 2+3 zinciri (onay/red izi + red gerekçesi + tekrar başvuru) | ✅ canlıda | backend #41-43 + çatı #81-85 (`09-DURUM`) |
| Admin soru düzenleme UI | ✅ canlıda | çatı #87 (`09-DURUM`) |
| #37 login enumeration sertleştirme | ✅ canlıda (bu turda merge) | 🟩 git: backend #46 + çatı #91 |
| Ölü DISC seed temizliği | 🟨 kısmi | backend #45 (C4) |
| #34 öğrenme-yolculuğu görünürlüğü (STK admin) | ⏳ kaldı (platformda var, STK'da yok) | C1 |
| #30 sertifika 5→20 canlı seed | ⏳ kaldı | A5 |
| #31 DISC-yaklaşım içeriği | 🔵 tasarım bekliyor | A6 |

## 4.3 Bekleyen büyük işler (tanım + versiyon + migration?)

| İş | Versiyon | Migration? | Durum | Kanıt |
|---|---|---|---|---|
| 2a — ghost/sessiz red | v1 | Evet | 🔵 tasarım hazır | `11-tasarim-kararlari...` KARAR 2 |
| 2b — sistemden çıkarma (aktif kullanıcı) | v1 | Evet (muhtemel) | 🔵 tasarım hazır / ❓ mevcut kod teyidi | `11...` KARAR 3 · `10-yol-haritasi:94` |
| #7 değerlendirme + metrik sistemi | v1/v2 | Evet | 🔵 tasarım belgesi yeni yazıldı | `raporlar/degerlendirme-metrik-sistemi-tasarim-2026-08-19` (çatı #95) |
| K6 — admin server-guard | v1 | Hayır | ⏳ + PO kararı | A2 |
| Sektör/etiket havuzu tablosu | v1 | Evet | ⏳ + PO kararı | A9 |
| Sektör skoru 5-bileşen canlı bağlama | v2 | Hayır (kod hazır) | ⏸️ staging bekliyor | U1/C6 |
| F3 tenant hard-delete · F6 hayalet-mod + CSV | v2 | Evet | ⏳ hiç başlanmadı (geri-alınamaz, ayrı büyük tur) | `10-yol-haritasi:114-116` |

## 4.4 Özet sayım (bu raporun net cevabı)

- **Kodlanabilir iş tabanı:** **28** (v1 13 + v2 15) — belgede kanıtlı (`devir/08`). Ek: 2 PO-kararı + ~10 teyit/keşif ⇒ genişletilmiş ~40.
- **Canlıda (v1):** ~9-10 iş bitti/mevcut (KARAR 5, K2, K5, menü, durum rozeti, sertifika rozeti, DISC harf, İş 2+3, admin soru UI, login enumeration) — bazıları "zaten vardı".
- **v1'de kalan:** ~4-5 (algoritma kalibrasyon UI, cevap-tipi, K4 yaş-verisi, havuz kartı FE, öğrenme-yolculuğu STK görünürlüğü) + tasarım-hazır (2a/2b/#7) + PO-kararı (K6, etiket havuzu).
- **v2:** 15 iş — **hiç dokunulmadı** (`devir/08:50`).
- **Ölü kod:** 3 kesin (D1 findMatchesDueForCheckpoint, D2 llmRetry, F1-F6 frontend zinciri) + şema ölü/yarım alanları (D3, engagement/goalClarity/periodic) + 1 öksüz endpoint (pair-signal). ~2 uyuyan yetenek (sector-scorer, matchingInterface) **bilinçli** duruyor.
- **En büyük "sürpriz":** **K2 OAuth aslında TAM** — belge/önceki-envanter yanılıyor (B1). En büyük "boşluk": iş sayısı "84→34" ayağının belgesel kanıtı yok (3.1/3.4).

---

## Bilinen Sınırlar (bu raporun kapsamı)

- PR numaraları belge-kaynaklı; her PR'ın git SHA teyidi bu turda yapılmadı (salt-tespit; git-arkeolojisi ayrı tur olabilir).
- `D3` (UserProfile.qualityMultiplier) ve `C5` (feedback yarım alanları) için "hiç yazılmıyor" iddiası kaynak koddan güçlü kanıtla desteklendi ama migration/silme kararı öncesi son bir gözden geçirme önerilir.
- Bu belge **düzeltme yapmaz**; 09-DURUM / 10-yol-haritasi / şema / kod değişmedi. Aksiyonlar (bağla/sil/tamamla) ürün sahibinin ayrı turlardaki kararıdır.
- Belge senkronu (09-DURUM/10-yol-haritasi güncellemesi) ve belge-mimarisi denetimi (Eksen 5-6) **ayrı turlara** bırakıldı.
