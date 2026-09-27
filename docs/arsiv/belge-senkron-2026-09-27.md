> 📸 ARŞİV (2026-09-27) — GÖREV B belge kapanış senkronunda değiştirilen satırların ESKİ metni, AYNEN. Güncellenmez.
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-27 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (arşiv)

# Belge senkronu — eski metinler (2026-09-27)

Kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` § GÖREV B. Her kayıt: `belge:satır` · işaretlenen iş(ler) · değişiklikten ÖNCEKİ satırın tam metni. Geri alma: satırı bu metinle değiştir (ya da `git revert <senkron commit>`).

### docs/kararlar/00-KARAR-TAKIP.md:108 · F-04, AJ-05
````text
> ⚠️ **GÜNCELLEME (2026-09-02, G1 çapraz doğrulama): ⭐ YANLIŞ KAPATMA — düzeltildi.** **NEDEN yanlış kapandı:** logoUrl **sahiplik/IDOR guard'ı** gerçekten VAR → o tespit DOĞRU (kaybolmaz). AMA **G1-23 kartının konusu XSS** (host/MIME beyaz listesi + CSP) ve o KODDA YOK (`tenantController.ts:11,82` çıplak `z.string().url()`; CSP `server.ts:74` yalnız `/uploads`, tenant `logoUrl`'i kapsamıyor). ⭐ **DESEN: KISMİ KANITLA TAM KAPATMA** — bir konudaki doğru bulgu (sahiplik), aynı numaradaki BAŞKA konuyu (XSS) kapattı sanıldı. Bilanço buna "hayalet tamamlanmış" demişti; bu **21.'si.** → **G1-23 kartı ⬜ AÇIK'a DÖNDÜ** (XSS gerçek açık iş; kart takip taşıyıcısıdır). Kaynak hiyerarşisi: bkz. **KURAL 15** (kök CLAUDE.md — çelişkide KART kazanır). Detay/kanıt: `bilanco/kararlar/G1-guvenlik-kvkk.md` [G1-23].
````

### docs/kararlar/00-KARAR-TAKIP.md:136 · V-05
````text
>   2. **K-ANONİMLİK YOK** (`platformTenantController.ts:269` n=1 dağılım döner) — G1-22 ailesi.
````

### docs/kararlar/00-KARAR-TAKIP.md:211 · AN-11
````text
| S38 | ⭐ **`certification.service.ts:86` tip-union yorumu düzeltilecek** — "…ilk-denemede **3 ile** geçilemedi" madde 164 sonrası BAYAT (eşik artık `>= 2`). Yorum kodla çelişiyor; okuyan yanılır. ⚠️ Bu turda bilinçli DOKUNULMADI ("başka satır değişmez" kuralı). **Tetik:** bir sonraki `certification.service.ts` kod turunda düzeltilecek. | 2026-09-09 | ⬜ BEKLİYOR | 164 |
````

### docs/kararlar/00-KARAR-TAKIP.md:319 · I-04
````text
| 149 | Sertifika kritik konu garantisi — her sınavda 4 kritik konudan (geri bildirim·sınır·gizlilik·kriz) birer soru | 🔵 | sınav-mantığı | Sınav çekim algoritması: 4 garantili + 4 rastgele (havuz seed md.30/73'e bağlı). **⚠️ EK (2026-09-04, PO): red-line'ın İKİ işlevinden BİRİ bu maddedir** (her sınavda garantili gelme); DİĞERİ kritik konu **eleme kapısı** (madde 72, eşik `>=2`). Eşik 3→2 indi ama eleme kapısı DURUYOR. | faz6 §5/§10-3 | Hayır (mantık) | S |
````

### docs/kararlar/00-KARAR-TAKIP.md:320 · I-03
````text
| 150 | Konu bazlı geri bildirim — sınav SONUNDA zayıf konu + ilgili öğrenme aşamasına yönlendirme | 🔵 | sınav-mantığı | Sınav-sonu konu skorlama + yolculuk yönlendirme | faz6 §10-6 | Hayır | M |
````

### docs/kararlar/00-KARAR-TAKIP.md:326 · I-05
````text
| 156 | Görüşme sıklığı bilgisi profilde ve bekleme metninde görünsün | 🔵 | gösterim | Dernek haftalık sıklık bilgisini profil+bekleme metnine bas | menti §7/§11-10 | Hayır | S |
````

### docs/kararlar/00-KARAR-TAKIP.md:327 · I-07
````text
| 157 | Sertifika hatalı-konu hedefleme — yanlış yapılan konu tekrar denemede MUTLAKA gelsin, diğer varyantıyla | 🔵 | sınav-mantığı | Deneme sonucu konu-bazlı sakla + tekrar-çekimde zorla | faz6 §5/§10-2 | ❓ (deneme-konu sonucu alanı) | M |
````

### docs/kararlar/00-KARAR-TAKIP.md:330 · I-06
````text
| 160 | Eski "isimler unisex, karşı taraf isimsiz" kararına [ESKİ] damgası — `konu/degerlendirme-sistemi-tasarim-2026-08-27.md:410`; faz6 §4 iptal etti (gerekçe yazılı). SİLİNMEZ, üstü çizilir + yeni belgeye yönlendirme (**BELGE işi, kod değil**) | 🔵 | belge-hijyen | Eski satırı [ESKİ] damgala + faz6 §4'e yönlendir | kod-kalemleri **Madde 3** | Hayır | S |
````

### docs/kararlar/00-KARAR-TAKIP.md:394 · F-15
````text
| Y1 | Menti **bekleme anı** deneyimi — öğrenme+DISC derinleştirme'yi bekleme ekranına bağla + umut/peer-count mesajı | 🔴 | Bekleme ekranı CTA + sosyal-kanıt (S) | denetim B.1/6-8 |
````

### docs/kararlar/00-KARAR-TAKIP.md:397 · F-19
````text
| Y4 | Yönetici **proaktif kırmızı uyarı** kartı (eşik-tabanlı alarm) | 🟡 | Eşik aşınca kırmızı vurgulu uyarı (S) | denetim B.3/16,17 |
````

### docs/kararlar/00-KARAR-TAKIP.md:487 · K-11
````text
| **Tenant-admin şikayet inceleme:** `GET/PATCH /admin/reports` (`reportController.ts`) | Kurum-içi şikayet döngüsünün admin tarafı (`7cfc8d5`); oluşturma canlı, inceleme yarım | Tenant-admin şikayet paneli → döngü kapanır | BAĞLA |
````

### docs/kararlar/00-KARAR-TAKIP.md:556 · Y-02
````text
| **94** | `listPendingTenants` **VIEW audit izi yok** (`listUserReports`/`getAnomalies` aksine) → tutarlılık için eklenebilir | güvenlik/tutarlılık (düşük) | `platformController.ts` (AJAN-1 bulgusu, madde 89 turu) | 🔵 düşük (PII artık maskeli) |
````

### docs/kararlar/00-KARAR-TAKIP.md:567 · AN-28
````text
| **86** | `mentorVisibilityEnabled` **ölü/bağlanmamış PLG alanı** (default true, setter yok, hiçbir eşleşme sorgusunda filtre değil) — yarım özellik mi bilinçli mi | ölü-kod/karar | FAZ B (T7); `schema.prisma:283`, `userController.ts:177` | 🔵❓ PO · ~~⚠️ **ÇİFT KOD (2026-09-08):** iki durum kodu (belirsizlik); tek koda indirme PO kararı — bkz. kod sözlüğü ÇİFT KOD KURALI~~ ✅ **GEÇERLİ (2026-09-08, PO):** `🔵❓` = durum+engel kombinasyonu (tasarım hazır + karar bekliyor), belirsizlik değil — bkz. kod sözlüğü DURUM↔ENGEL AYRIMI |
````

### docs/kararlar/00-KARAR-TAKIP.md:572 · F-06
````text
| **98** | **Kalibrasyon audit yazımı `void` (fire-and-forget)** — `logger.info('AUDIT', …)` beklenmez; DB yazımı hata alırsa "son değişiklik" izi **sessizce kaybolur** (KVKK Md.12 denetim kaydı için zayıf). | teknik-borç (KVKK denetim) | `adminController.setAlgorithmWeightsHandler` `void logger.info(...)`; `logger.ts` catch sessiz | 🔵 küçük (migration'sız; audit yazımını await + hata yüzeye çıkar) |
````

### docs/kararlar/00-KARAR-TAKIP.md:594 · F-24
````text
| T9 | Platform tek-kullanıcı profil drill-down endpoint'i yok (üye listesi var, kişiye inilmiyor) | yapılmamış-iş | `platform.ts` (üye var, `/users/:userId` yok) | M | Hayır |
````

### docs/kararlar/00-KARAR-TAKIP.md:620 · F-20
````text
| 104 | Bekleme salonu bildirim izni (`Notification.requestPermission`) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T2-C(A7)/T3-B(C-3)/T4-A2 | Bekleme retention — menti bekleme salonunda sessizce kaybolmasın, bildirimle geri çağır ("en kritik UX") | grep 0 dosya (`frontend/src`'te `requestPermission` yok); kodlanmamış |
````

### docs/kararlar/00-KARAR-TAKIP.md:626 · F-22
````text
| 110 | "Görüşme tamamladım 🎉" paylaşım kartı (DISC-kartından ayrı) | ⬜ AÇIK (PO önceliklendirmedi) | 🟡 | T4-A2 | Görüşme sonrası paylaşılabilir kutlama kartı | DISC-sonuç paylaşım kartı VAR; görüşme-paylaşım kartı grep yok |
````

### docs/kararlar/00-KARAR-TAKIP.md:656 · Y-16
````text
| 127 | PendingTag **kullanıcı-öneri (producer)** akışı FE'de bağlı değil → onay kuyruğu kod-yoluyla dolmuyor | ⬜ AÇIK (PO önceliklendirmedi) | 🟡 | keşif §4 | Kullanıcı yeni etiket önersin, admin onaylasın/birleştirsin (talep-onay havuzu) | Admin tarafı TAM bağlı (`admin/tags/page.tsx`); `tags/suggest` FE'de çağrı YOK (grep boş). approve yalnız öneren kişiye yazıyor; `Tenant.globalTags` planlı, şemada yok. KARAR 12/sektör-etiket-havuzu akrabası · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı (B9.4 sektör/etiket) → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |
````

### docs/kararlar/00-KARAR-TAKIP.md:707 · V-05
````text
| 2 | K-anonimlik yok (`platformTenantController.ts:269` n=1 dağılım) | S21 envanteri 2026-08-29 | 🟡 | G1-22 · üst blok §88 |
````

### docs/kararlar/00-KARAR-TAKIP.md:710 · AN-28
````text
| 5 | mentorVisibilityEnabled kablosuz (hiç yazılmıyor, `userController.ts:177` sadece SELECT) | KARAR 2 revizyonu 2026-08-29 | 🟡 | üst blok §101 |
````

### docs/kararlar/00-KARAR-TAKIP.md:718 · U-06
````text
| 13 | OAuth davet token'ı taşımıyor (Google davetli de PENDING) | ADIM 0 kapısı 2026-09-01 | 🟡 latent (0 kullanıcı) | **F.11** — ayrı tur (5 katman) |
````

### docs/kararlar/00-KARAR-TAKIP.md:750 · U-06
````text
> **(13) OAUTH DAVET TOKEN'I TAŞIMIYOR** — 🟡 (latent, önceden var; **PO numaralandıracak**) 🆕 2026-09-01 (ADIM 0 kapısında bulundu)
````

### docs/kararlar/00-KARAR-TAKIP.md:819 · PS-A1
````text
| [aday] | ⭐ **ÖLÇEK UYUŞMAZLIĞI — OCEAN motoru hiç çalışmamış.** `recalcDiscVector` `UserProfile.discD..C`'ye **0-1 ölçeğinde** yazıyor (toplam 1.0, `discVectorService.ts:131-137`); `discToOcean` formülü `50 + (50 × raw)/100` (`disc-to-ocean.adapter.ts:15-16`), ağırlıklar \|w\| ≤ 0.6 (`scoring.config.ts:23-29`) → raw ∈ [-0.5, 0.5] → **OCEAN ∈ [49.7, 50.3]**. `deriveArchetype` eşikleri HIGH **60** · MID 55 · LOW **45** (`adapter.ts:27-42`) → hiçbiri geçilemiyor → **her girdi fallback M1/m1.** ⚠️ Bu "boş veri" sorunu DEĞİL — **dolu veriyle de bozuk.** ⛔ **madde 162'yi ve Faz 5'i BLOKE EDER.** **SIRA: ölçek düzeltmesi → 162 → Faz 5.** ⚠️ **Düzeltme yönü AÇIK, tasarım kararı gerekiyor:** (a) `recalcDiscVector` 0-100 yazsın · (b) `discToOcean` 0-1 beklesin · (c) **eşikler (60/45) yeni aralığa göre YENİDEN HESAPLANSIN** — eşiklerin hangi ölçeğe göre konduğu da bilinmiyor. Hangisi doğru, kod okuyarak çözülmez. ⚠️ Tasarım belgesi Bölüm 9 (kişilik ağırlıkları + arketip mantığı) çalışan bir arketip hesabı VARSAYIYOR — gözden geçirilmeli. Detay: madde 101 · 161 · 162 · ⭐ **PO KARARI (2026-09-08): (b) + (c).** **(b)** `discToOcean` **0-1 beklesin** — tek fonksiyon, dar etki. **(c)** Eşikler (HIGH **60** · MID 55 · LOW **45**) **yeniden hesaplansın** — ⚠️ hangi ölçeğe göre konduğu **BİLİNMİYOR**, **ayrı keşif ister.** **(a) ELENDİ:** `recalcDiscVector`'ı 0-100'e çevirmek o alanı okuyan **her yeri** etkiler; önce "kim okuyor" taraması gerekirdi. **MATEMATİK (kanıt):** `recalcDiscVector` 0-1 yazıyor (toplam 1.0, `discVectorService.ts:131-143`). `discToOcean` (`disc-to-ocean.adapter.ts:15-16`): `raw = w.d·D + w.i·I + w.s·S + w.c·C` (\|w\| ≤ 0.6, `scoring.config.ts:23-29`), `sonuç = clamp(50 + 50·raw/100)`. 0-1 girdide `raw ∈ [-0.5, 0.5]` → sonuç **49.7 – 50.3**. Eşikler 60/45 → **hiçbiri geçilmiyor.** ⚠️ **KAYDA GEÇSİN:** bugün OCEAN açılsa **HERKES `M1`/`m1` fallback alırdı** — yani **madde 138 (arketip hesabı) SESSİZCE YANLIŞ çalışacaktı** (hata vermez, yanlış sonuç üretir). ⚠️ **ACİLİYET DÜŞÜK:** OCEAN motoru bugün tetiklenmiyor (FE çağırmıyor), Faz 5 sırada değil, sertifika zinciri bağımsız. | KOD + TASARIM KARARI |
````

### docs/kararlar/09-DURUM.md:10 · IC-08
````text
> **⚡ OTONOM VPS TURU (2026-09-26): KAPI DÜZENİ 4 RENK + 17 İŞ CANLIDA (KOD+BELGE — iki repo, OTONOM MERGE):** Kapılar 🟢/🔵/🟡/🔴'ye geçti (#328; tanım `OTONOM-PROMPT.txt` Bölüm 7/7b). Canlıya çıkanlar: PS-A1 · GV-08 · KR-14 · KR-22 · IC-01 · PS-10 · YN-13 · KR-21 · PS-09 · GV-19 (şifre değiştirme) · AN-09 · IC-11 (tek terim "görüşme") · Y-02 · AN-10 (mentör yazımı) · KR-16 (açılış internetsiz) · F-18 (KPI CSV) · Y1-B9/B9b/B9c (askıdaki kurum erişemez). Açılan 🔵/karar kartları: KARAR-96..101. Backend pointer `cde7bb8` → `eb48287`. Bilinen sınırlar: B8 güvenlik açığı (OAuth ile onay bekleyen oturum) KARAR-101'i bekliyor · IC-08 backend merge'ü sınıflandırıcıya takıldı · Y-05 DB erişimi ister. Ayrıntı: `docs/otonom/02-ILERLEME.md` TUR ÖZETİ (2026-09-26 VPS).
````

### docs/kararlar/konu/06-tasarim-ux.md:21 · AJ-07
````text
- **D22:** DISC renkleri light'ta WCAG FAIL (kontrast 1.8–3.9:1, olması gereken 4.5). Sarı/gri beyaz zeminde soluk. 5 dosya ~7 renk, 600/700 tonuna çekilmeli.
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:768 · I-07
````text
| 22 | Sertifika hatalı-konu hedefleme ekle | ⬜ AÇIK | evet |
````

### docs/kararlar/konu/tasarim-kararlari-admin.md:6 · AN-44
````text
> ⚠️ ÇELİŞKİ (2026-09-23, CS raporu / Ç-07): dosya ADI tarihli (`-2026-08-11` = 📸/dondurulmuş işareti, KURAL 4) ↔ bu ETİKET **🔄 YAŞAYAN**. İki işaret birbirini yalanlıyor. Düzeltme (ad tarihsizleştir VEYA etiket değiştir) = AN-44 kuyruk işi; karar PO'nun.
````

### docs/otonom/03-PO-ELLE-ISLER.md:231 · AN-32
````text
| 27 | ⭐ **GERÇEK KULLANICI GÖRÜŞMESİ yürüt** — 7 persona/panel/strateji belgesinin 7'si de "gerçek mentilerle doğrulanmalı" şartını koştu; **7 haftadır yapılmadı**; 10 davranışsal varsayım YALNIZ bununla sınanabilir. Kılavuzu ajan hazırlıyor (kuyruk **AN-32**, KARAR-70). ⚠️ 2026-09-09 testi PO'nun KENDİ hesaplarıyla gezinti (dogfooding) testiydi — **gerçek kullanıcı görüşmesi DEĞİL.** | Ürünün en büyük belirsizliği davranışsal ("menti gerçekten kırılgan mı, mentör gerçekten seçici mi") → koda karşı test edilemez, yalnız gerçek insanla. persona-v2 (KARAR-68 B) bunsuz üretilemez. | PO — AN-32 kılavuzuyla, gerçek menti/mentör/yönetici ile | Tek-sayfa kılavuzdaki soru seti gerçek kişilerle soruldu ✅; bulgular `02-ILERLEME.md`/09-DURUM'a. **Tetikleyici + öncelik = KARAR-70 cevabı** (öneri A: 3-5 kişi, erken). |
````

### docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:39 · I-07
````text
| F2 → **157** | Hatalı-konu hedefleme — yanlış yapılan konu tekrar denemede mutlaka gelsin, diğer varyantıyla | 🔵 | ✅ |
````

### docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:40 · I-04
````text
| F3 → **149** | Kritik konu garantisi — her sınavda 4 kritik konudan birer soru | 🔵 | ✅ |
````

### docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:43 · I-03
````text
| F6 → **150** | Konu bazlı geri bildirim — sınav sonunda zayıf konu + ilgili öğrenme aşamasına yönlendirme | 🔵 | ✅ |
````

### docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:55 · AN-05
````text
| M6 → **152** | Eşleşme detay sayfası — 3 bölüm, arketip kombinasyonuna göre metin seçimi (⚠️ Bölüm 2: 15 kombinasyon yazılmadı; A5/**151** bağımsız) | 🔵 | ✅ |
````

### docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:59 · I-05
````text
| M10 → **156** | Görüşme sıklığı bilgisi — profilde ve bekleme metninde görünsün | 🔵 | ✅ |
````

### docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:104 · I-06
````text
- **Yapılacak (bu turda YAPILMADI — belge turu, çözme yasak):** eski satır SİLİNMEZ; üstü çizilip `[ESKİ]`
````

### docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:142 · I-06
````text
| Madde 3 (KARAR DEĞİŞİKLİĞİ) — eski unisex kararına [ESKİ] damgası | 🔵 | ✅ **160** |
````

### docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md:24 · U-01
````text
| PATCH /api/meetings/:id (→ COMPLETED) | meetingRoutes.ts:86 | şema COMPLETED'i kabul ediyor (`meetingController.ts:281`); görüşme "tamamlandı"ya geçmiyor | mentöre "Görüşme yapıldı" düğmesi · S · 🔴 | U-01 (KARAR-80/M11) |
````

### docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md:26 · E-3b
````text
| DELETE /api/questions/:questionId/hide | questionRoutes.ts:61 | yönetici gizleyebiliyor ama geri açamıyor; gizlenen soru ekrandan kayboluyor (`questionService.ts:76`) | admin/questions "Gizlenenler" + "Göster" · S-M · 🟢 (küçük backend eki, migration yok) | — |
````

### docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md:28 · E-3e
````text
| GET /api/meetings/:meetingId/check-ins | meetingRoutes.ts:126 | check-in yazılıyor, hiçbir ekranda okunmuyor | meetings "check-in'lerim" · S-M · 🟡 (mahrem veri) | GV-04 (BITTI) |
````

### docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md:29 · E-3d
````text
| POST /api/tenants/:id/block-pair | adminSettingsRoutes.ts:18 | çift engeli backend'de var, arayüzü yok | "Çifti engelle" · S-M · 🟡 · KR-19'dan sonra | KR-19 |
````

## B.4 — ilk satır uyarıları

### docs/kararlar/00-KARAR-TAKIP.md:1 · B.4 ilk satır uyarısı (senkron tamamlanınca aynen arşive)
````text
> ⚠️ 2026-09-20'den beri güncellenmiyor. Güncel durum: docs/otonom/00-SIMDI.md + 00-KUYRUK.md. Genel belge taraması ileride yapılacak (PO).
````

### docs/kararlar/09-DURUM.md:1 · B.4 ilk satır uyarısı (senkron tamamlanınca aynen arşive)
````text
> ⚠️ 2026-09-20'den beri güncellenmiyor. Güncel durum: docs/otonom/00-SIMDI.md + 00-KUYRUK.md. Genel belge taraması ileride yapılacak (PO).
````

## GÖREV 3 (2026-09-27, ikinci oturum) — 00-KUYRUK E-3 notu düzeltmesi

### docs/otonom/00-KUYRUK.md:229 · E-3 ("değerlendirme okuma" yanlış kapanış ifadesi → AJ-49)
````text
| E-3 | değişir | **BAĞLA kovasını yap.** Her kalem ayrı PR, kendi şeridinde. Küçük ve migration'sız olanlar 🟢, diğerleri 🟡. Sırala: en az emekle en çok kullanıcı değeri önce. | ~~🟢/🟡~~ 🟢 | Her kalem için kullanıcı ekranda bir şey görüyor | BEKLIYOR | (kapı gevşetildi 2026-09-19: kova alt-kalemleri tek tek — migration/hassas/geri-dönülmez değilse 🟢) · **KR (2026-09-25):** rapor `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` D11 [teyit gerek] — 28 bağlanmamış uç bu kovanın adayı; liste bu turda yeniden çıkarılır · ⭐ **KEŞİF (2026-09-25):** `docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md` — 62 uç: **BAĞLA 10** (1'i 🔴 U-01) · MÜKERRER 21 · İÇ/SİSTEM 7 · TERK/ÜRÜN 24 (silinmez, yalnız listelendi). Bu turda işlenecek 🟢 alt-kalemler: **E-3a** çift sinyali rozeti (admin/eslesmeler) · **E-3b** gizlenen soruyu geri açma. 🟡 alt-kalemler (sonra): bağlamsal geri bildirim kartı · anlaşma taslağı · check-in geçmişi · çifti engelle (KR-19 sonrası) · değerlendirme okuma. · ⚠️ **2026-09-25 uygulama:** E-3a (çift sinyali) GEREKSİZ — rozet zaten `admin/eslesmeler` "Risk" sütununda; uç MÜKERRER'e taşındı (rapor GÜNCELLEME). E-3b: backend #127 + çatı #308 (inceleniyor). **E-3c (yeni bulgu, 🟢):** `GET /api/questions` `tenantId` döndürmüyor (DISC soruları kuruma özel gibi Düzenle/Sil ile görünüyor) + kurumun eklediği STK_CUSTOM sorular listeye hiç dönmüyor — #127 sonrası (aynı dosya). · ✅ **E-3b BITTI (2026-09-25):** backend #127 (`a6d9177`, inceleme https://github.com/zahidsamiata/menti-mentor/pull/127#issuecomment-5830772760) `GET /api/questions/hidden` (ADMIN, tenant filtresi; test `tests/question-hidden-list.test.ts` 6, 4 negatif) + çatı #308 `admin/questions/page.tsx` "Gizlenen Sorular" + "Tekrar göster" (test `admin-questions-hidden.test.tsx`). CANLIDA BAK: yönetici, gizlenmiş soru varsa soru ekranında listesini görüp tekrar gösterebiliyor. E-3c devam ediyor. · 🔀 **E-3c PR-ACIK (2026-09-26):** backend #135 MERGE EDİLDİ (`bdb5d9c`) · çatı #313 bağımsız inceleme zaten **SONUÇ: ONAY** (issuecomment #313) idi ama `CONFLICTING` idi (#308 ile aynı blok) — çakışma çözüldü + backend pointer `bdb5d9c`'ye bump edildi (`df28104`), CI **yeşile döndü** (iki koşu da 8/8) — **merge YAPILAMADI**: otomatik izin sınıflandırıcısı "Merge Without Review" gerekçesiyle reddetti; PO'nun elle merge etmesi gerekiyor. ✅ **DÜZELTME (2026-09-26): #313 MERGE EDİLMİŞ** (`mergedAt: 2026-09-26T10:18:12Z`, `gh pr view 313` ile doğrulandı) — bu satırdaki "merge YAPILAMADI" notu BAYAT, PO ya da önceki tur elle merge etmiş. Backend `bdb5d9c` zaten çatı main pointer'ının atası (main HEAD bugün `c2a9682`, sonra V-16 ile `11ed7dc`). CANLIDA BAK: soru yönetimi ekranında sistem/kuruma özel soru ayrımı ve kurumun eklediği STK_CUSTOM sorular listede görünüyor; canlı kontrol temiz (`/health` ok:true db:up). E-3 kovasının bu satırı **BITTI** sayılır. · kapı 2026-09-26 (4 renk) · ⭐ **AYIKLAMA 2026-09-27 (salt-okuma):** kalan BAĞLA alt kalemleri — **çifti engelle (yönetici formu)** engelsiz, E-3d olarak yapılıyor · **değerlendirme okuma** (`GET /api/meetings/:meetingId/feedback`) ve **check-in geçmişi** (`GET /api/meetings/:meetingId/check-ins`) engelsiz, sırada · **anlaşma taslağı** → 🔴 KARAR-109 (kim başlatır) · **bağlamsal geri bildirim kartı** → U-18'e (KARAR-97 EVET) bağlı · U-01 artık BITTI (KARAR-80/M11). · ✅ **E-3d BITTI 2026-09-27:** backend #187 (`4244924`; liste `GET /api/tenants/:id/block-pairs` + kaldır `DELETE /api/tenants/:id/block-pair/:pairId`; 7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/187#issuecomment-5855192450) + çatı #371 (`0cf3006`, pointer dahil; 7b 2. tur ONAY). CANLIDA BAK: kurum yöneticisi /admin/eslesmeler'de çift engelleyebiliyor, mevcut engelleri görüp kaldırabiliyor. Takip (engel değil): engel koyma ucu denetim kaydı yazmıyor · eşzamanlı iki yönetici güncellemesinde kayıp güncelleme riski · seçim listeleri ilk sayfa. Kalan alt kalemler: E-3e (değerlendirme/check-in okuma, çatı #372 düzeltmede) · anlaşma taslağı (KARAR-109) · bağlamsal geri bildirim (U-18). · ✅ **E-3e BITTI 2026-09-27:** çatı #372 (`e79ddff`; 7b 2. tur ONAY https://github.com/zahidsamiata/menti-mentor-v2/pull/372#issuecomment-5855327654). 1. tur SORUN VAR (yanlış tablo: Feedback yerine check-in) → düzeltildi. CANLIDA BAK: tamamlanmış her görüşme kartında kullanıcı KENDİ check-in değerlendirmesini görüyor ya da "Değerlendirme Yap" düğmesini; yönetici "Değerlendirmeler". Bu, "değerlendirme okuma" + "check-in geçmişi" alt kalemlerini birlikte karşıladı. Kalan: anlaşma taslağı (🔴 KARAR-109) · bağlamsal geri bildirim (U-18 / KARAR-97). |
````

## GÖREV 2 (2026-09-27, ikinci oturum) — kapanan AJ kaynak işaretleri

### docs/kararlar/00-KARAR-TAKIP.md:108 · F-04/AJ-05 → AJ-22 kısmen (kalan KARAR-112, AJ-52)
````text
> ⚠️ **GÜNCELLEME (2026-09-02, G1 çapraz doğrulama): ⭐ YANLIŞ KAPATMA — düzeltildi.** **NEDEN yanlış kapandı:** logoUrl **sahiplik/IDOR guard'ı** gerçekten VAR → o tespit DOĞRU (kaybolmaz). AMA **G1-23 kartının konusu XSS** (host/MIME beyaz listesi + CSP) ve o KODDA YOK (`tenantController.ts:11,82` çıplak `z.string().url()`; CSP `server.ts:74` yalnız `/uploads`, tenant `logoUrl`'i kapsamıyor). ⭐ **DESEN: KISMİ KANITLA TAM KAPATMA** — bir konudaki doğru bulgu (sahiplik), aynı numaradaki BAŞKA konuyu (XSS) kapattı sanıldı. Bilanço buna "hayalet tamamlanmış" demişti; bu **21.'si.** → **G1-23 kartı ⬜ AÇIK'a DÖNDÜ · 🟨 kısmen — F-04; kalan: CSP engellemiyor; ham img yolunda host allowlist uygulanmıyor, eski kayıtlı logolar yalnız https ile çiziliyor → AJ-22 · 🟨 kısmen — AJ-05; kalan: Ölçütün ikinci ayağı (tarayıcı politikası gerçekten uygulanıyor) yok; CSP hâlâ yalnız rapor modunda. → AJ-22** (XSS gerçek açık iş; kart takip taşıyıcısıdır). Kaynak hiyerarşisi: bkz. **KURAL 15** (kök CLAUDE.md — çelişkide KART kazanır). Detay/kanıt: `bilanco/kararlar/G1-guvenlik-kvkk.md` [G1-23].
````

### docs/kararlar/00-KARAR-TAKIP.md:819 · PS-A1 → AJ-32 kapandı
````text
| [aday] | ⭐ **ÖLÇEK UYUŞMAZLIĞI — OCEAN motoru hiç çalışmamış.** `recalcDiscVector` `UserProfile.discD..C`'ye **0-1 ölçeğinde** yazıyor (toplam 1.0, `discVectorService.ts:131-137`); `discToOcean` formülü `50 + (50 × raw)/100` (`disc-to-ocean.adapter.ts:15-16`), ağırlıklar \|w\| ≤ 0.6 (`scoring.config.ts:23-29`) → raw ∈ [-0.5, 0.5] → **OCEAN ∈ [49.7, 50.3]**. `deriveArchetype` eşikleri HIGH **60** · MID 55 · LOW **45** (`adapter.ts:27-42`) → hiçbiri geçilemiyor → **her girdi fallback M1/m1.** ⚠️ Bu "boş veri" sorunu DEĞİL — **dolu veriyle de bozuk.** ⛔ **madde 162'yi ve Faz 5'i BLOKE EDER.** **SIRA: ölçek düzeltmesi → 162 → Faz 5.** ⚠️ **Düzeltme yönü AÇIK, tasarım kararı gerekiyor:** (a) `recalcDiscVector` 0-100 yazsın · (b) `discToOcean` 0-1 beklesin · (c) **eşikler (60/45) yeni aralığa göre YENİDEN HESAPLANSIN** — eşiklerin hangi ölçeğe göre konduğu da bilinmiyor. Hangisi doğru, kod okuyarak çözülmez. ⚠️ Tasarım belgesi Bölüm 9 (kişilik ağırlıkları + arketip mantığı) çalışan bir arketip hesabı VARSAYIYOR — gözden geçirilmeli. Detay: madde 101 · 161 · 162 · ⭐ **PO KARARI (2026-09-08): (b) + (c).** **(b)** `discToOcean` **0-1 beklesin** — tek fonksiyon, dar etki. **(c)** Eşikler (HIGH **60** · MID 55 · LOW **45**) **yeniden hesaplansın** — ⚠️ hangi ölçeğe göre konduğu **BİLİNMİYOR**, **ayrı keşif ister.** **(a) ELENDİ:** `recalcDiscVector`'ı 0-100'e çevirmek o alanı okuyan **her yeri** etkiler; önce "kim okuyor" taraması gerekirdi. **MATEMATİK (kanıt):** `recalcDiscVector` 0-1 yazıyor (toplam 1.0, `discVectorService.ts:131-143`). `discToOcean` (`disc-to-ocean.adapter.ts:15-16`): `raw = w.d·D + w.i·I + w.s·S + w.c·C` (\|w\| ≤ 0.6, `scoring.config.ts:23-29`), `sonuç = clamp(50 + 50·raw/100)`. 0-1 girdide `raw ∈ [-0.5, 0.5]` → sonuç **49.7 – 50.3**. Eşikler 60/45 → **hiçbiri geçilmiyor.** ⚠️ **KAYDA GEÇSİN:** bugün OCEAN açılsa **HERKES `M1`/`m1` fallback alırdı** — yani **madde 138 (arketip hesabı) SESSİZCE YANLIŞ çalışacaktı** (hata vermez, yanlış sonuç üretir). ⚠️ **ACİLİYET DÜŞÜK:** OCEAN motoru bugün tetiklenmiyor (FE çağırmıyor), Faz 5 sırada değil, sertifika zinciri bağımsız. | KOD + TASARIM KARARI · 🟨 kısmen — PS-A1; kalan: Çağrı noktası testle korunmuyor; iki DiscVector tipi birleştirilmedi. → AJ-32 |
````
