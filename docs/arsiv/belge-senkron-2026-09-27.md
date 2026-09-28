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

### docs/kararlar/00-KARAR-TAKIP.md:626 · F-22 → AJ-23 kapandı
````text
| 110 | "Görüşme tamamladım 🎉" paylaşım kartı (DISC-kartından ayrı) | ⬜ AÇIK (PO önceliklendirmedi) · 🟨 kısmen — F-22; kalan: Kart görünüyor ama LinkedIn paylaşımı ürünün olmayan sabit bir alan adına bağlanıyor; getSiteUrl() kullanılmalı → AJ-23 | 🟡 | T4-A2 | Görüşme sonrası paylaşılabilir kutlama kartı | DISC-sonuç paylaşım kartı VAR; görüşme-paylaşım kartı grep yok |
````

### docs/kararlar/00-KARAR-TAKIP.md:394 · F-15 → AJ-45 kapandı
````text
| Y1 | Menti **bekleme anı** deneyimi — öğrenme+DISC derinleştirme'yi bekleme ekranına bağla + umut/peer-count mesajı | 🟨 kısmen — F-15; kalan: Metin var, hiçbir testte assert edilmiyor. → AJ-45 | Bekleme ekranı CTA + sosyal-kanıt (S) | denetim B.1/6-8 |
````

### docs/kararlar/00-KARAR-TAKIP.md:572 · F-06 → AJ-45 kapandı
````text
| **98** | **Kalibrasyon audit yazımı `void` (fire-and-forget)** — `logger.info('AUDIT', …)` beklenmez; DB yazımı hata alırsa "son değişiklik" izi **sessizce kaybolur** (KVKK Md.12 denetim kaydı için zayıf). | teknik-borç (KVKK denetim) | `adminController.setAlgorithmWeightsHandler` `void logger.info(...)`; `logger.ts` catch sessiz | 🔵 küçük (migration'sız; audit yazımını await + hata yüzeye çıkar) · 🟨 kısmen — F-06; kalan: Hata yolu (audit yazımı başarısız) hiçbir testte ölçülmüyor; F-06'nın eklediği .catch hiç tetiklenemez. → AJ-45 |
````

### docs/kararlar/00-KARAR-TAKIP.md:620 · F-20 → AJ-39 kapandı
````text
| 104 | Bekleme salonu bildirim izni (`Notification.requestPermission`) | ⬜ AÇIK (PO önceliklendirmedi) · 🟨 kısmen — F-20; kalan: Tıklama→requestPermission testsiz; izin hiçbir bildirimde kullanılmıyor, "haber vereceğiz" metni (:34) karşılıksız vaat → AJ-39 | ⬜ | T2-C(A7)/T3-B(C-3)/T4-A2 | Bekleme retention — menti bekleme salonunda sessizce kaybolmasın, bildirimle geri çağır ("en kritik UX") | grep 0 dosya (`frontend/src`'te `requestPermission` yok); kodlanmamış |
````

## GÖREV 4 (2026-09-27) — sahipsiz kalanlar

Kaynak: `docs/raporlar/kod-denetimi/sahipsiz-kalanlar-2026-09-27.md`. Her kayıt: `belge:satır` · kalem(ler) · değişiklikten ÖNCEKİ satırın tam metni (kural h işaretleri). Geri alma: satırı bu metinle değiştir.

### docs/kararlar/00-KARAR-TAKIP.md:149 · mentorVisibilityEnabled 'kablosuz, hiç yazılmıyor' (U-19) (#0)
````text
>   3. **mentorVisibilityEnabled kablosuz** (hiç yazılmıyor, default true; havuzdan gizlenme fiilen yok — `userController.ts:177` sadece SELECT).
````

### docs/kararlar/00-KARAR-TAKIP.md:153 · DEVREDEN: OCEAN uçurumu (md.101) + k-anonimlik yok (G1-22) (V-05) (#1)
````text
>   + **DEVREDEN:** tasarım↔kod uçurumu (OCEAN, madde 101) · k-anonimlik yok (G1-22).
````

### docs/kararlar/00-KARAR-TAKIP.md:180 · S2 sözü Y1-Y7 kodlanacak — F-15 yalnız Y1 bekleme anı ayağı + S2 sözü Y1-Y7 kodlanacak — F-18 yalnız Y3 export ayağı + S2 sözü Y1-Y7 kodlanacak — F-19 yalnız Y4 kırmızı uyarı ayağı + S2 sözü Y1-Y7 kodlanacak — F-22 yalnız Y2 kutlama ayağı + S2 sözü Y1-Y7 kodlanacak — F-24 yalnız Y7→Y11 drill ayağı + S2 sözü Y1-Y7 kodlanacak — P-05 yalnız Y2 ret ayağı (#2, #3, #4, #5, #6, #7)
````text
| S2 | Denetim işleri (Y1-Y7) kodlanacak | 2026-08-20 | ⬜ hiçbiri başlanmadı; "neden bırakıldı" gerekçesiz | Y1-Y7 |
````

### docs/kararlar/00-KARAR-TAKIP.md:192 · S19 sunucu/altyapı sertleştirme taraması (K-14) (#8)
````text
| S19 | Sunucu/altyapı sertleştirme TARAMASI (HTTPS/firewall/SSH/SSL/yedek) — çıkış blokeri | 2026-08-27 | 🔴 çıkış öncesi ZORUNLU | G1-28 |
````

### docs/kararlar/00-KARAR-TAKIP.md:309 · Madde 139 çoklu-arketip metin SEÇİMİ (IC-10 yalnız metin yazdı) (#9)
````text
| 139 | İki/üç boyut yakınsa çoklu-arketip metni seçilsin (4 varyant YAZILI) | 🔵 ⛔MOTOR | gösterim-mantığı | Yakınlık kuralına göre çoklu-arketip metin seçimi. **⚠️ MOTOR ÖN KOŞULU** (Big Five boyut skoru canlıda üretilmiyor — bkz. madde 138). | arketip §6/§10-2 | Hayır | S |
````

### docs/kararlar/00-KARAR-TAKIP.md:310 · Madde 140 iki katmanlı arketip kartı (beş boyut) — I-02 yalnız akış sı (#10)
````text
| 140 | Arketip kartı iki katmanlı — arketip ekranı + "detayları gör" (beş boyut) | 🔵 ⛔MOTOR | FE-gösterim | İki katmanlı kart FE. **⚠️ MOTOR ÖN KOŞULU** (beş boyut skoru canlıda yok — bkz. madde 138). ⭐ **Kapsam eklemesi (2026-09-04):** AKIŞ SIRASI değişikliği bu kalemin PARÇASI — kart bugün üç sorudan ÖNCE gösteriliyor (`_OnboardingContent.tsx:223-234`), SONRAYA alınacak (arketip §4). Yalnız kart tasarımı değil. | arketip §4/§10-3 | Hayır | M |
````

### docs/kararlar/00-KARAR-TAKIP.md:311 · Madde 141 cümle + akış (I-02) · PO ek önlemleri: farklı görsel dil + k (#11)
````text
| 141 | Üç sorunun önüne tek cümle: "Son üç soru. Sonra karakter kartın hazır." | ⬜ AÇIK | FE-metin+akış | ~~[ESKİ · 2026-09-04] Üç-soru ekranına tek cümle ekle~~ **⚠️ ERTELENDİ (2026-09-04, kod turu).** Karar VERİLMİŞ (arketip §4: kart üç sorudan SONRA), ama mevcut kod TERSİ çalışıyor: Profil → Mizaç Testi → Sonuç(kart) → Tercihler(3 soru) (`_OnboardingContent.tsx:223-234`). ⭐ Yani 141 yalnız METİN işi DEĞİL — **AKIŞ SIRASI DEĞİŞİKLİĞİ** içerir. Ayrıca vaat edilen kart madde 140 (motor bekliyor). **Ön koşul: akış yeniden sıralaması + madde 140.** ⚠️ PO ek önlemleri (141 kapsamına): (1) sorular kart ekranıyla FARKLI görsel dilde ("test bitti, form dolduruyorum" hissi); (2) kart açılışına kısa gecikme — sorulardan ayırsın, ödül anını belirginleştirsin. | arketip §4/§10-4 | Hayır | S |
````

### docs/kararlar/00-KARAR-TAKIP.md:314 · Madde 144 yalnız seçilen şık; diğerlerinin gerekçesi 'numara adayı' (K (#12)
````text
| 144 | Geri bildirim gösterimi — yalnız SEÇİLEN şık görünür; renk YOK; doğru/yanlış işareti YOK; diğerleri kapalı/açılabilir | 🔀 PR'DA | FE-gösterim | **✅ KODLANDI (2026-09-04, çatı PR):** `ScenarioGuideEngine` opt-in `neutralFeedback` (öğrenme yolculuğu); `NeutralReveal` — yalnız seçilen+feedback, renk/işaret YOK, "Diğer seçenekler…" işaretsiz açılır. Görüşme Rehberi + sertifika DEĞİŞMEDİ. ⚠️ Diğer şıkların GEREKÇESİ yüklenmez (cevap anahtarı sızmasın) → açılınca yalnız etiket; meanings için backend genişletme = numara adayı. | menti §4/§11-3 | Hayır | M |
````

### docs/kararlar/00-KARAR-TAKIP.md:322 · Madde 152 eşleşme detay sayfası (AN-05 yalnız 15/16 metin) (#13)
````text
| 152 | Eşleşme detay sayfası — 3 bölüm (neden bu eşleşme·birlikte nasıl çalışırsınız·ilk görüşmede ne konuşulur). ⚠️ **Bölüm 2 için 16 kombinasyondan 15'i YAZILMADI → içerik turu gerekiyor**; Bölüm 1 ve 3 hazır. **Madde 151 bağımsız ilerler** | 🔵 | FE+içerik | Bölüm1/3 FE + Bölüm2 15 kombinasyon içerik turu | menti §6/§11-6 | Hayır (FE) | L |
````

### docs/kararlar/00-KARAR-TAKIP.md:325 · Madde 155 ret akışı: sebep gizli + alternatif aynı ekranda (P-05) (#14)
````text
| 155 | Ret akışı — sebep GİZLİ, "üzgünüz" YOK, alternatif aynı ekranda (2 metin YAZILI: menti + mentör) | 🔵 | FE+mantık | Ret ekranı: sebep gizle + alternatif; mentöre ret-yardım metni | menti §9/§11-9 | Hayır | S |
````

### docs/kararlar/00-KARAR-TAKIP.md:328 · Madde 158 günde 2 deneme + bekleme + yolculuk yönlendirmesi (AN-01) (#15)
````text
| 158 | Sertifika deneme sınırı — günde 2, üçüncüsü için bekleme; bekleme süresince öğrenme yolculuğuna yönlendirme | 🔵 | backend-mantık | Günlük deneme sayacı + bekleme + yolculuk yönlendirme | faz6 §5/§10-4 | ❓ (deneme sayacı/zaman alanı) | M |
````

### docs/kararlar/00-KARAR-TAKIP.md:332 · Madde 162 üç DISC yolunun birleştirilmesi (PS-02 yalnız confidence) (#16)
````text
| 162 | Üç DISC yolunun birleştirilmesi — `UserProfile.discD..C`'yi hangi yol dolduracak + eksik yolları bağlama | ⬜ AÇIK | KOD+KARAR | ⚠️ S33'ün 7. kararı; Faz 5 (g)/(k) bunsuz tanımlanamaz · **⚠️ KAPSAM NETLEŞTİ (2026-09-08, KEŞİF):** Zorunlu akış Yol 3 olduğu için `UserProfile.discD..C`'yi **Yol 3 doldurmalı** — . Migration GEREKMİYOR, alanlar zaten var (`schema.prisma:988-991`, `Float @default(0)`). Yol 1 ve Yol 2 opsiyonel; onlar da doldurursa iyi olur ama kritik olan Yol 3. Bu, **S33'ün 7. kararının cevabıdır.** · **⚠️ KAPSAM DÜZELTMESİ (2026-09-08, KEŞİF): ÖNCEKİ TANIM UYGULANAMAZ.**  → **`recalcDiscVector` verisini `UserResponse` tablosundan (Likert) okuyor; onboarding quiz'i A/B/C/D zorunlu-seçimdir ve `UserResponse` YAZMAZ** (`:449-501`). Çağrı eklenirse fonksiyon okuyacak veri bulamaz → vektörü düz 0.25'e ezer ya da matching skorlarını kaydırır. **Bu, "bugün çalışanı bozma" riskidir.** · ⭐ **GERÇEK ÇÖZÜM — `buildDiscVector` ortak yardımcısı.** Üç DISC yazıcısı (`recalcDiscVector` · `adaptiveTestEngine` · `submitDiscTest`) tek bir `buildDiscVector(...)` yardımcısından geçirilsin; yardımcı `confidence` alanını da üretsin. Bu **hem** onboarding vektörünün `scoring.ts:72` kapısından geçmesini sağlar **hem** üç yazıcıyı hizalar. Boyut: **S**. · **⚠️ ÖLÇEK ENDİŞESİ ÇÜRÜDÜ (canlı taraf):** üç yazıcının ÜÇÜ DE 0-1 (toplam 1.0) yazıyor — `discVectorService.ts:131-143` · `adaptiveTestEngine.ts:86-98,240` · `onboardingController.ts:232-237,478`. Okuyucu `computeVectorDiscScore` (`scoring.ts:53-61`) tam bunu bekliyor; `discLetters` eşikleri (0.25 orta nokta, `discLetters.ts:35,75`) de aynı ölçekte. **Canlı DISC ölçeği TUTARLI.** · ⚠️ **GERÇEK SORUN `confidence` EKSİKLİĞİ:** `calculateDiscResult` (`onboardingController.ts:201-204`) dönüş tipinde `confidence` YOK. `scoring.ts:72` kapısı `mentiVector.confidence > 0` istiyor → `undefined > 0` = false → **onboarding kullanıcılarının ince vektörü atlanıp tek-harf `DISC_COMPATIBILITY` matris skoruna düşülüyor.** Skor geçerli çıkıyor, sadece kaba. Sessiz kayıp. · ⚠️ **ÖLÇEK BLOKAJI DEVAM EDİYOR ama BAŞKA MOTORDA.** Bu maddenin `⛔ BLOKE` notu **OCEAN motoru** içindir (F.14 ölçek kalemi) ve geçerlidir. Canlı motor ile karıştırılmamalı: **canlı ✅ tutarlı, OCEAN ✗ bozuk.** · ⬜ **AÇIK KALAN:** onboarding kullanıcılarının `UserResponse` satırı var mı → ❓ TEYİT GEREK (DB sorgusu, PO onayı). Bugün 6 test kullanıcısı olduğu için pratik etkisi düşük; gerçek kullanıcı gelmeden sorulmalı. Detay: `../raporlar/kesif/` — bu keşif henüz belgeye yazılmadı, kaynak sohbet oturumu 2026-09-08. · ⛔ **BLOKE — ÖLÇEK UYUŞMAZLIĞI ÖNCE ÇÖZÜLMELİ.** Yol 3'e `recalcDiscVector` bağlansa BİLE arketip yine fallback M1/m1 çıkar (bkz. F.14 ölçek kalemi). **SIRA: ölçek düzeltmesi → madde 162 → Faz 5.** | `../raporlar/kesif/faz5-veri-akisi-kesfi-2026-09-08.md` §E | Hayır (alanlar mevcut) | L · geçmiş: bkz. GEÇMİŞ §md.162 |
````

### docs/kararlar/00-KARAR-TAKIP.md:334 · Madde 164 red-line eşiği >= 2 (I-04 notu) (#17)
````text
| 164 | `certification.test.ts:78` — `>= 2` kod turuyla birlikte güncellenmeli | ~~⬜ AÇIK~~ 🔀 PR'DA | KOD | madde 72/T4 ayağı · sertifika içeriği bu varsayımla yazıldı · **⚠️ SIRA KAYDI (2026-09-08): madde 164 madde 30'dan ÖNCE yapılmalıdır.** Sertifika içeriğinin 88 şıkkı `>= 2` varsayımıyla puanlandı; kod red-line konuda `=== 3` iken (`certification.service.ts:67`, kod-kanıtlı) seed atılırsa içerik yanlış eşikle canlıya çıkar ve ilk sınav sonuçları bozuk olur. ⚠️ **madde 164 F.13'e ve madde 163'e BAĞLI DEĞİL** — migration gerektirmiyor, saf kod + test. Paralel yürütülebilir. · ⚠️ **🔀 KODLANDI (2026-09-09, backend PR #71).** `isFirstAttemptPass` eşiği `=== 3` → `>= 2` (`certification.service.ts:66-73`). `isRedLine` parametresi KALDI (imza değişmedi; çağıranlar `:191`/`:457` + `RED_LINE_FAILED` kullanıyor). Test `certification.test.ts`: `:78` `toBe(false)` → `toBe(true)` **düzeltildi (silinmedi)** + alt sınır testi eklendi (red-line'da 1 ve 0 hâlâ eler). ⭐ **madde 30'un SON öncülü** — merge olunca zincir tamam. · ⚠️ **TEST KAPSAMI (2026-09-09):** eşik değişikliği ÜÇ test yerini etkiledi — birim (`:73`/`:78`) + entegrasyon (`red-line MUTLAK kapı` + `red-line ilk seçim` + `revealOption`). Entegrasyonda **ESKİ semantik fixture'a gömülüydü** (red-line'a score 2 verip "geçmez" bekliyordu); fixture'lar 0/1'e taşındı ve **YENİ davranış (red-line'da 2 GEÇER) için ek entegrasyon testi** eklendi (it 22→23). ⚠️ **DERS:** eşik/kural değişiklikleri yalnız birim testini değil **FIXTURE'A GÖMÜLÜ semantiği** de kırar → sonraki eşik/kural değişikliklerinde test fixture'ları da taransın. ⭐ Kanıt: `certification-retry.test.ts` etkilenmedi çünkü fixture `isRedLine:false` — fixture davranışı belirliyor, her iki yönde de. ⚠️ Bu ders **madde 171 (sessiz düşüş)** akrabası. · ⚠️ **eslint warn (non-blocking):** `isRedLine` gövdede kullanılmıyor (error değil, CI'ı kırmaz; param bilinçli tutuldu, `_isRedLine`/silme YAPILMADI). · ⚠️ **BAYAT YORUM → S38:** `certification.service.ts:86` tip-union yorumu ("ilk-denemede 3 ile geçilemedi") eşikle çelişiyor; bu turda "başka satır değişmez" kuralıyla dokunulmadı, **S38** ile takibe alındı. · ⚠️ **SEED HÂLÂ BEKLİYOR:** madde 159 (kriz hukuki) + KALEM 8 (destek kaynağı adı) — ikisi de PO işi, kod değil. | `../raporlar/kesif/faz5-veri-akisi-kesfi-2026-09-08.md` §E | Hayır | S |
````

### docs/kararlar/00-KARAR-TAKIP.md:350 · Sektör/etiket başlangıç havuzu (seed / admin tablo) — Y-16 yalnız tale (#18)
````text
| — | Sektör/etiket başlangıç havuzu (admin-tablo, KARAR 12) | 🔵 ❓ | ~~⚠️ **ÇİFT KOD (2026-09-08):** iki durum kodu (belirsizlik); tek koda indirme PO kararı — bkz. kod sözlüğü ÇİFT KOD KURALI.~~ ✅ **GEÇERLİ (2026-09-08, PO):** `🔵❓` = durum+engel kombinasyonu (tasarım hazır + karar bekliyor), belirsizlik değil — bkz. kod sözlüğü DURUM↔ENGEL AYRIMI. · seed mi / admin-yönetilir tablo mu → şema+PO kararı · **⚠️ GÜNCELLEME (2026-08-23): PO kararı — talep-onay akışı.** Yönetici etiket **yazabilir**; mentör/menti etiket ekleme **TALEBİNDE** bulunabilir; yönetici reddeder / kabul eder / farklı öneri sunar. **ÖNCE kodda ne olduğu keşfedilecek** (`PendingTag`/`tagController` var — bağlı mı?). | tam-envanter A9; `tasarim-kararlari-admin` | Evet |
````

### docs/kararlar/00-KARAR-TAKIP.md:351 · K3 eski kayıt consent politikası (yeniden-rıza/bulk/erteleme) — PO ürü + K3 eski kayıt rıza politikası (GV-18 yeniden onay ekledi) (#19, #220)
````text
| K3 | Eski kayıt consent politikası | ⏸️ EN SON | yeniden-rıza / bulk / erteleme → PO ürün+hukuk kararı · **⚠️ GÜNCELLEME (2026-08-23): YAPILACAK ama EN SONA** — canlıya çıkmadan hemen önce (o zamana dek hangi izinlerin isteneceği netleşecek). | tam-envanter A3; `08-acik-sorular` | Evet (backfill) |
````

### docs/kararlar/00-KARAR-TAKIP.md:395 · Y2 Menti reddi yumuşatma (3 alternatif) + küçük başarı kutlaması + Y2 küçük başarı kutlaması — F-22 (LinkedIn kalanı AJ-23) + Y2 ret yumuşatma (3 alternatif) — P-05 ret ayağı (#20, #21, #225)
````text
| Y2 | Menti **reddi yumuşatma** (3 alternatif) + **küçük başarı kutlaması** | 🔴 | Kutlama (S) canlı-öncesi; ret-yumuşatma (M) sonra | denetim B.1/10-11 |
````

### docs/kararlar/00-KARAR-TAKIP.md:396 · Y3 rapor export + görüşme ivmesi/tamamlama oranı metrikleri (F-18 yaln (#22)
````text
| Y3 | Yönetici **rapor EXPORT** (PDF/CSV) + görüşme ivmesi/tamamlama-uyum ORAN metrikleri | 🔴 | En az export (S) — Persona B/C kanıtı | denetim B.3/2,3,10,11,12,14 |
````

### docs/kararlar/00-KARAR-TAKIP.md:403 · Y11 3. seviye kullanıcı drill (F-24 platform tek-kullanıcı ucu) (#23)
````text
| Y11 | **3. seviye kullanıcı drill** (büyüme + ayar üstüne derinleştirme) | 🟡 | derinleştirme · düşük öncelik · ⚠️ **Y7'den ayrıldı (PO kararı 2026-09-08)** | denetim B.4/3,4,12,18 |
````

### docs/kararlar/00-KARAR-TAKIP.md:489 · Profil-güç zinciri: servis + ProfileStrengthCard dashboard mount (U-19 (#24)
````text
| **Profil-güç zinciri:** `profile-completeness.service.ts:28` + `ProfileStrengthCard.tsx` (ikisi de bağlanmamış) | Profil tamamlanma % kartı | Endpoint + dashboard mount (uçtan uca) | BEKLET (profil-güç özelliği) |
````

### docs/kararlar/00-KARAR-TAKIP.md:494 · Okuma-tarafı boşlukları: /requests, check-ins, /meetings/active, remin (#25)
````text
| **Endpoint okuma-tarafı boşlukları:** `GET /requests` + `/:id` · `GET /meetings/:id/check-ins` · `/meetings/active` (poller) · `reminders/send` · `orientation-lock` · `questions/respond` (bulk) | Yazma-tarafı bağlı, okuma/liste/tetik tarafı FE'siz | İlgili panel/akış | BEKLET / ❓ PO (uca göre) |
````

### docs/kararlar/00-KARAR-TAKIP.md:524 · Etiket-gerçek çelişkisi 3 belge (AN-44 yalnız tasarim-kararlari-admin) (#26)
````text
- **🟡 Etiket-gerçek çelişkisi — 3 yaşayan belge (KURAL 3/4 ihlali, AJAN-E 2026-08-23):** (a) `oz-denetim/durum-panosu-2026-08-14.md`
````

### docs/kararlar/00-KARAR-TAKIP.md:563 · Md.82 rıza metni sürümü tutulmuyor (GV-18) (#27)
````text
| **82** | Rıza metni **sürümü tutulmuyor** (`consentVersion` yok, yalnız `kvkkConsentAt` zaman damgası) → ispat açığı | yapılmamış-iş (KVKK ispat) | envanter C-6; grep `consentVersion` sonuç yok | 🟡 |
````

### docs/kararlar/00-KARAR-TAKIP.md:575 · Md.101 SJT/OCEAN katmanı canlı eşleştirmede okunmuyor + enneagramWing  (#28)
````text
| **101** | **SJT/OCEAN katmanı canlı eşleştirmede OKUNMUYOR** — SJT → OCEAN + `rank-mentors` sıralaması hesaplanıyor ve UserProfile'a yazılıyor AMA canlı eşleştirme (`matching.ts`) bunu okumuyor → bağlanmamış paralel katman. Ayrıca `enneagramWing` yaz-ama-oku-yok. Bilinçli mi, bağlanacak mı? | ölü-kod/karar (içerik-keşfi bulgusu) | döküm §7/§13; `scoring.ts:163-166` yorum + grep (AJAN-5) | 🔵❓ PO · ~~ · geçmiş: bkz. `## GEÇMİŞ` §md.101 · ⚠️ **FAZ 5'İN KAPSAMI BÜYÜYOR:** iş "motoru bağla" değil, **"motoru önce çalışır hale getir"**. Ölçek düzeltilmeden bağlanan motor herkese aynı arketipi verir. · ⬜ `sjtScoringController`'ın canlı FE rotasına bağlı olup olmadığı ❓ — önceki FE taraması `compute-profile`/`rank-mentors` uçlarının `frontend/src`'de ÇAĞRILMADIĞINI gösterdi, yani bugün tetiklenmiyor. Faz 5'te bağlanır bağlanmaz etkiler. · **⚠️ EK (2026-09-08, KEŞİF): CANLI ✅ / OCEAN ✗ — İKİSİ KARIŞTIRILMASIN.** Canlı eşleştirici (`matching.ts` → `scoring.ts`, `User.discVector` okur) **ölçek olarak TUTARLIDIR**: üç yazıcı da 0-1 toplam 1.0 yazıyor, okuyucu aynısını bekliyor. OCEAN/arketip motoru (`scoring.service.ts` → `disc-to-ocean.adapter.ts`, `UserProfile.discD..C` okur) **hâlâ BOZUK** — ölçek uyuşmazlığı nedeniyle her girdi fallback M1/m1 üretiyor (F.14 ölçek kalemi). ⚠️ "Ölçek sorunu çözüldü" DENEMEZ; çözülen yalnız canlı taraftır. |
````

### docs/kararlar/00-KARAR-TAKIP.md:590 · T5 güvenli seed runner (sertifika + SJT ortak) — AJ-08 (#29)
````text
| T5 | `seed-certification.ts` runner'a bağlı değil → 20-senaryo bankasını canlıya **güvenli** taşıma yöntemi yok (**madde #30'u BLOKLAR**) · **⚠️ GÜNCELLEME (2026-09-04, KEŞİF): güvenli seed runner işi SJT ile ORTAK** — Faz 5'te 39 senaryo da seed edilecek (`seedSjtQuestions` `seed.ts:575`, aynı TEHLİKELİ dosyada); sertifika + SJT AYNI muhafız desenini paylaşacak (Faz 5 §F-j). Detay: `../raporlar/kesif/faz5-onkosul-kesfi-2026-09-04.md`. · **⚠️ 🔀 KODLANDI — PR'DA (2026-09-08, backend PR #69):** `seed-certification.ts`'e doğrudan-çalıştırma muhafızı eklendi (`seed-learning-journey.ts:534-543` deseni birebir, **+11 satır**, fonksiyon gövdesi değişmedi). Artık `seedCertification()` **`deleteMany`'li `prisma/seed.ts`'ten geçmeden** çalıştırılabilir (`npx tsx prisma/seed-certification.ts`). · geçmiş: bkz. `## GEÇMİŞ` §T5 · ⚠️ **NOT:** T5 satırında ayrı Tür/durum kolonu YOK (5-kolon satır, F.2 başlığı 6-kolon — eski biçim farkı); durum bu nota gömüldü. | `package.json` (tek seed = `prisma/seed.ts`) | M | Evet |
````

### docs/kararlar/00-KARAR-TAKIP.md:592 · T7 mentör görünürlük opt-in FE (setVisibilityOptIn çağrılmıyor) — AN-2 (#30)
````text
| T7 | Mentör **görünürlük opt-in** FE ekranı bağlı değil (backend `setVisibilityOptIn` var) | yapılmamış-iş | backend var; FE çağrısı → yok | M | Hayır |
````

### docs/kararlar/00-KARAR-TAKIP.md:595 · T10 mentör emeği görünürlüğü: takdir/rozet/yılın mentörü (P-14 yalnız  (#31)
````text
| T10 | Mentör emeği görünür kılma (takdir/rozet/"yılın mentörü") — persona-kaynaklı, hiç yok | yapılmamış-iş | `mentor-persona:83-86`; kodda rozet → yok | M | Olası |
````

### docs/kararlar/00-KARAR-TAKIP.md:602 · F.4 kod-teyidi listesi (8 kalem) — AJ-06: N+1 kalanı + F.4 kod-teyidi listesi (8 kalem) — AJ-07: DISC light WCAG + F.4 kod-teyidi listesi (8 kalem) — AN-39: user-reports sayfalama + F.4 kod-teyidi listesi (8 kalem) — F-21: a11y + F.4 kod-teyidi listesi (8 kalem) — F-27: N+1 konuşma listesi + F.4 kod-teyidi listesi (8 kalem) — U-19: profile-completeness uçtan uc + F.4 kod-teyidi listesi (8 kalem) — Y-04: sayfalamasız listeler (#32, #33, #34, #35, #36, #37, #38)
````text
N+1 konuşma listesi · pagination'sız listeler · a11y (modal/label/radiogroup) · DISC light WCAG · onay/red maili başvurana gidiyor mu · KARAR 6 davet→oto-onay tetiği · `maxMeetingsPerWeek` enforce · profile-completeness uçtan uca bağı. (uydurma yok — TEYİT GEREK)
````

### docs/kararlar/00-KARAR-TAKIP.md:621 · Md.105 her sayfada genel 'Bildir' → ürün ekibi akışı (AN-09 yalnız şüp (#39)
````text
| 105 | Kullanıcı→ürün geri bildirim mekanizması (her sayfa "Bildir"→mail) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T1-B2(05:55)/T2-B(E24)/T4-A1(E21) | Kullanıcı ürün hakkında geri bildirim verebilsin | `SuspicionReport` DB'ye yazar ama MAİL GÖNDERMİYOR; genel "Bildir" akışı yok |
````

### docs/kararlar/00-KARAR-TAKIP.md:635 · Md.119 (G1-22) küçük-grup metrik k-anonimliği (V-05) (#40)
````text
| 119 | k-anonimlik (super-admin küçük-grup metrik yuvarlama) (= G1-22, bkz. bilanco/kararlar/G1-guvenlik-kvkk.md) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A2 | KVKK-agregat borcu: küçük grupta yeniden-tanımlanma riski | grep boş; iz zayıf |
````

### docs/kararlar/00-KARAR-TAKIP.md:636 · Md.120 (G1-28) kod dışı altyapı sertleştirmesi (K-14) (#41)
````text
| 120 | Sunucu/altyapı sertleştirme (Dokploy HTTP/firewall/SSH/SSL/yedek) (= G1-28, bkz. bilanco/kararlar/G1-guvenlik-kvkk.md) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ (KOD DIŞI) | T1-B2/T3-B/T4-A1(E15)/T4-A2 | Canlı-öncesi altyapı güvenliği | Hiç ele alınmadı; kod-dışı altyapı, önceden aksiyon-numarası yoktu |
````

### docs/kararlar/00-KARAR-TAKIP.md:942 · Kuyrukta satırı olmayan bulgular listesi (system-logs · User.role · as (#42, #43)
````text
> - aday · **Kuyrukta satırı olmayan bulgular** (strateji katmanı satır açsın mı): G-kart doğrulaması (`docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md`) ~30 ⬜ kalem · `GET /api/system-logs` denetim izi/meta · kurum-içi sayımlar `User.role` · frontend askı ekranı yok · token türü ayrımı (OAuth pending).
````

### docs/kararlar/konu/05-ozellikler-ve-paneller.md:61 · Sertifika soru ekleme: yönetici ekleyebilmeli mi? ❓ (F-13) (#44)
````text
- Sertifika soru ekleme: yönetici ekleyebilmeli mi, bilinçli kısıt mı? ❓
````

### docs/kararlar/konu/06-tasarim-ux.md:23 · DISC renk TON kararı (light) kullanıcı gözünden verilecek — KARAR BEKL + DISC renk TON kararı PO gözüyle onay bekliyor (AJ-07) (#45, #190)
````text
- **🔴 KARAR BEKLİYOR:** DISC renk TON kararı kullanıcının gözünden verilecek — light'ta henüz onaylanmadı (dashboard'lar çöktüğü için görülemedi, sonra seed geldi ama tema light test edilmedi).
````

### docs/kararlar/konu/06-tasarim-ux.md:33 · Kart havuzu 'tasarlanacak/kodlanmadı' (F-10 menti→mentör kartı) (#46)
````text
Karar verildi, henüz kodlanmadı. Backend %90 hazır (bkz. kart-havuz-backend-envanteri raporu).
````

### docs/kararlar/konu/08-acik-sorular.md:6 · Çift-kaynağı tek kaynağa indirme = AN-44 işi (#47)
````text
> ⚠️ ÇELİŞKİ (2026-09-23, CS raporu / Ç-09): bu etiket "🔄 YAŞAYAN (canonical: açık sorular)" ↔ aşağıdaki `:5` GÜNCELLEME "canonical açık-karar takibi artık `00-KARAR-TAKIP.md`" = **çift-kaynak** ("AKTİF İŞ KAYNAĞI TEKTİR" kuralıyla çelişir, YN-06). Tek-kaynağa indirme = AN-44 kuyruk işi; karar PO'nun.
````

### docs/kararlar/konu/08-acik-sorular.md:37 · Sertifika soru ekleme kısıtı bilinçli mi? ❓ (F-13) (#48)
````text
- **Sertifika soru ekleme:** Yönetici ekleyebilmeli mi, yoksa bilinçli kısıt mı? ❓
````

### docs/kararlar/konu/08-acik-sorular.md:52 · DISC renk ton kararı (light) hâlâ açık (AJ-07) (#49)
````text
- **DISC renk TON kararı (light):** hâlâ açık (bkz. 06 D22) — kart rozetini de etkiler. ❓
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:721 · Açık karar 7: k-anonimlik eşiği 'kodda YOK, platformTenantController.t (#50)
````text
7. K-anonimlik eşiği (kaç kişiden az olunca gizlensin) — `[ ] PO notu:` (S21 teyit: kodda YOK, `platformTenantController.ts:269`)
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:757 · K-anonimlik eşiği (G1-22) belirle — ❓ TEYİT GEREK (V-05) (#51)
````text
| 11 | K-anonimlik eşiği (G1-22) belirle | ❓ TEYİT GEREK | evet |
````

### docs/otonom/03-PO-ELLE-ISLER.md:101 · PO teyidi #13: 'Kod SCHEDULED→COMPLETED geçişi yazmıyor (U-01)' (#52)
````text
| 13 | **Canlıda `COMPLETED` görüşme var mı / `/admin/eslesmeler` boş mu — teyit** | Kod `SCHEDULED→COMPLETED` geçişi yazmıyor (X §6#2/U-01) ve `Match` tablosuna yazan kod yok (`createMatchIfEligible` 0 çağıran). Canlıda eski/elle veri olabilir; ürün kararı bu teyide bağlı. | Neon konsolu (salt-okuma). | `SELECT count(*) FROM "Meeting" WHERE status='COMPLETED';` ve `SELECT count(*) FROM "Match";`. |
````

### docs/otonom/03-PO-ELLE-ISLER.md:113 · P-05 canlı kontrol: 'uygulama içi çan bildirimi henüz yok' (#53)
````text
5. **P-05** · Mentör olarak gir → bir görüşme talebini reddet → mentinin e-posta kutusuna nazik bir ret e-postası gelmeli; menti ekranında kırmızı "İptal" yerine yumuşak bir etiket görmeli (uygulama içi çan bildirimi henüz yok) · test kurumu gerekir (🔵 kart bekliyor).
````

### docs/otonom/03-PO-ELLE-ISLER.md:131 · G8-04: 'COMPLETED geçişi kodda hiç yazılmıyor (U-01)' şüphesi (#54)
````text
| 15 | **[G8-04] Mentör paneli metriklerini canlıda gözle gör** | Metrik kartları canlıda (IDOR korumalı) ama **gerçek veriyle hiç bakılmadı**. Bu kartlar mentörün emeğinin tek görünür karşılığı; yanlış/sıfır sayı mentörün bırakmasına yol açar ve kimse fark etmez (uç 200 döner). **Somut şüphe:** `SCHEDULED→COMPLETED` geçişi kodda **hiç yazılmıyor** (U-01) → "tamamlanan" kartı kalıcı 0 gösterebilir. | Canlı site, gerçek mentör hesabı + Neon salt-okuma `SELECT` | 4 kart **"0"/"—" değil gerçek sayı** ve DB ile birebir: `SELECT count(*) FROM "Meeting" WHERE "mentorUserId"='<id>' AND status='SCHEDULED';` ↔ bekleyen · `status='COMPLETED'` ↔ tamamlanan (**0 çıkarsa bu U-01'in kanıtıdır, kart hatası değil — not düş**). "Yaklaşan Toplantılar" tarih sırasıyla görünüyor. **20 dk** |
````

### docs/otonom/03-PO-ELLE-ISLER.md:134 · #18 sertifika kısıtı gerekçesini PO yazsın (F-13 ajan yazdı) (#55)
````text
| 18 | **"Kurum kendi sertifika sorusunu ekleyemez" kuralının gerekçesini bir cümleyle yaz** | Kısıt kodda uygulanıyor (`certification.service.ts:385`) ama **NEDEN'i hiçbir belgede yok**. Gerekçe yazılmazsa bir sonraki tur "ölü kısıt" sanıp kaldırmaya kalkar — **bu projede üç kez yaşandı** (YANLIŞ SORU TUZAĞI). Ajan uyduramaz (SİLME PROTOKOLÜ adım 1: *"GEREKÇE BULUNAMADI yaz, UYDURMA"*). | PO — tek cümle | Cümle yazılı ✅ → **F-13** 🟢, 10 dakikalık belge işi |
````

### docs/otonom/03-PO-ELLE-ISLER.md:240 · Kod teyidi: PENDING (OAuth) menti mentor-matches'ten veri alıyor mu (U (#56)
````text
- PENDING (OAuth) menti `mentor-matches`'ten veri alıyor mu (X §8#6 / U-08, gerçek hesap).
````

### docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:30 · A4→141 üç sorunun önüne tek cümle (🔵) (I-02) (#57)
````text
| A4 → **141** | Üç sorunun önüne tek cümle: "Son üç soru. Sonra karakter kartın hazır." | 🔵 | ✅ |
````

### docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:52 · M3→144 yalnız seçilen şık; diğerleri kapalı/açılabilir (K-06) (#58)
````text
| M3 → **144** | Geri bildirim gösterimi — yalnız seçilen şık; diğerleri kapalı/açılabilir; renk yok | 🔵 | ✅ |
````

### docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:58 · M9→155 ret: sebep gizli, alternatif aynı ekranda (P-05) (#59)
````text
| M9 → **155** | Ret akışı — sebep gizli, alternatif aynı ekranda | 🔵 | ✅ |
````

### docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md:30 · GET /api/meetings/:meetingId/feedback (değerlendirme okuma) — E-3e değ (#66)
````text
| GET /api/meetings/:meetingId/feedback | meetingRoutes.ts:98 | geri bildirim gönderiliyor, okunmuyor | "verdiğim değerlendirme" · S · 🟡 · düşük değer | — |
````

### docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md:32 · BAĞLA öncelik listesi (bağlamsal geri bildirim · anlaşma · çift sinyal (#61, #62, #63)
````text
**Öncelik (en az emek / en çok değer):** 1) bağlamsal geri bildirim kartı (🟡 M) · 2) anlaşma taslağı formu (🟡 M) · 3) çift sinyali rozeti (🟢 S) · 4) gizlenen soruyu geri açma (🟢 S-M) · 5) check-in geçmişi (🟡 S-M). En yüksek değerli kalem "Görüşme yapıldı" düğmesi, ama KARAR-80/M11'e bağlı (🔴).
````

### docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md:63 · TERK/ÜRÜN: yönetici KVKK işlemleri anonymize/hard-delete ekranı (GV-08 (#64)
````text
Kulüp ailesi (7 + `/users/:userId/clubs`) · iş ilanı ailesi (4) · feedback-log ailesi (3; AN-47/KARAR-89) · `GET /api/analytics/:userId` (ham DISC türevi, KVKK hassas) · `POST /api/admin/users/:id/rematch` (KARAR-80/M14) · visibility-optin ×2 (Y-15, KARAR-80/M7) · `DELETE /api/meetings/orientation-lock/:userId` (KARAR-80/M19, KARAR-92) · `PATCH /api/users/:id` (yetki sorusu) · yönetici KVKK işlemleri `anonymize`/`hard-delete` (GV-08 🔴) · `GET /api/tenants/:slug/preview` (sihirbaz önizleme adımı hiç yapılmamış).
````

### docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md:66 · 'check-in geçmişi · değerlendirme okuma' kalemi (E-3e yalnız check-in) + Kuyrukta satırı olmayan BAĞLA + MÜKERRER kalemleri — E-3b (#65, #67)
````text
Kuyrukta kendi satırı olmayan BAĞLA kalemleri: bağlamsal geri bildirim kartı · anlaşma taslağı · çift sinyali · soru geri açma · check-in geçmişi · değerlendirme okuma. Kuyruk satırı olmayan MÜKERRER'ler: temperament-test, compute-profile/rank-mentors, `POST /api/users`, requests ailesi.
````

### docs/kararlar/00-KARAR-TAKIP.md:207 · S34 söz: onboarding kullanıcılarının UserResponse satırı var mı — gerç (#218)
````text
| S34 | ⭐ **Onboarding kullanıcılarının `UserResponse` satırı var mı SORULACAK** — DISC quiz `UserResponse` yazmıyor, `recalcDiscVector` ondan okuyor → madde 162'nin `buildDiscVector` çözümü buna dayanır | 2026-09-08 | ⬜ **BUGÜN SORULMAYACAK** (6 test kullanıcısı, pratik değeri yok). ⚠️ **SÖZ: gerçek kullanıcı gelir gelmez sorulacak** — sonra sormak pahalı olur. ⚠️ SELECT bile PO onayı ister (kırmızı kural 1) | 162 |
````

### docs/kararlar/00-KARAR-TAKIP.md:208 · S35: ilk tenant özel ağırlık kaydettiğinde sıralamanın değiştiği doğru (#219)
````text
| S35 | ⭐ İlk tenant özel ağırlık kaydettiğinde sıralamanın beklendiği gibi değiştiği doğrulanacak — 9b canlıda ama 0 tenant kullandı, etkisi hiç gözlenmedi | 2026-09-08 | ⬜ BEKLİYOR | 9b · 171 |
````

### docs/kararlar/00-KARAR-TAKIP.md:335 · md.165 Ağırlık modeli 2→3 bileşen (Faz 5 i) (#221)
````text
| 165 | Ağırlık modeli 2→3 bileşen (8 kod noktası, **migration YOK**) | ⬜ AÇIK | KOD | Faz 5 (i) · ⚠️ migration YOK, F.13'e TAKILMIYOR | `../raporlar/kesif/faz5-veri-akisi-kesfi-2026-09-08.md` §E | Hayır | M |
````

### docs/kararlar/00-KARAR-TAKIP.md:338 · md.168 matching.ts ham DiscVector cast'i yerine parseDiscVector guard' (#222)
````text
| 168 | `matching.ts:286` ve `:400`'deki ham cast yerine mevcut `parseDiscVector` guard'ı kullanılsın — bugün `User.discVector` JSON'u doğrulamasız cast ediliyor; şekli bozuk bir kayıt sessizce yanlış skor üretebilir. Guard zaten kodda var, kullanılmıyor | ⬜ AÇIK | KOD | İki çağrı noktasını `parseDiscVector` guard'ından geçir | `matching.ts:286,400` + mevcut `parseDiscVector` | Hayır | S |
````

### docs/kararlar/00-KARAR-TAKIP.md:339 · md.169 İki ayrı DiscVector tipi (scoring.ts BÜYÜK+confidence ↔ scoring (#223)
````text
| 169 | **İki ayrı `DiscVector` tipi var** — `scoring.ts:12-18` (`confidence` zorunlu) ve `scoring.config.ts:8` (`confidence` yok, küçük harfli alanlar). Onboarding'in yazdığı obje ikisine de tam uymuyor. Tipler adlandırılıp ayrılsın ya da birleştirilsin | ⬜ AÇIK | KOD | İki tipi ayır/adlandır; `buildDiscVector` (madde 162) tek tipe dayansın · **⚠️ KAPSAM DARALTMASI (2026-09-08):**  → **keşif YAPILDI, kapsam netleşti.** Kök sebep: Prisma `Json?` sütununa yazarken tip `InputJsonValue` oluyor, uygulama tipi yazma sınırında hiç uygulanmıyor (kanıt: `.prisma/client/index.d.ts` `discVector?: NullableJsonNullValueInput \| InputJsonValue`). **Kod TEMİZ** — yazma noktasında `as`/`any`/`@ts-ignore` YOK, `tsconfig` `strict: true`. Tip kaçış sayımı: `@ts-ignore` **0** · `: any` **0** · `as any` **4** · `as unknown as` 171 ama %90'ı Express `RequestHandler` route şablonu, veriyle ilgisiz. **Boşluk kaçış-deseni kaynaklı DEĞİL.** Yapısal boşluk 13 JSON alanının hepsinde var; gözlenen hata yalnız `discVector`'da, çünkü katı app-tip sözleşmesi olan tek alan o. Bu madde artık **yalnız iki tip ayrımını** kapsar (S); genel JSON sertleştirmesi ayrı kalem (F.14, numarasız, M) | `scoring.ts:12-18` vs `scoring.config.ts:8` | Hayır | S · geçmiş: bkz. GEÇMİŞ §md.169 |
````

### docs/kararlar/00-KARAR-TAKIP.md:340 · md.170 JSON yazım koruması — 13 Json? alanda uygulama tipi yazımda uyg (#224)
````text
| 170 | JSON yazım koruması — Prisma `Json?` sütunlarına yazarken tip `InputJsonValue` olduğu için uygulama tipi hiç uygulanmıyor; 13 JSON alanında yapısal boşluk. Gözlenen tek hata `discVector`'da | ⬜ AÇIK | KOD+KEŞİF | ⚠️ **KAPSAM BEYANI EKSİK:** "diğer alanlar okuma tarafında savunuluyor" iddiası keşif turunun GÖZLEMİDİR, sistematik tarama DEĞİL — 13 alanın **her** okuma noktası taranmadı. **Tek korumasız okuma yolu varsa bu kalemin "opsiyonel" gerekçesi çöker.** İş: (a) KAPSAM BEYANLI tarama, (b) sonra tip-checked sarmalayıcı kararı | `.prisma/client/index.d.ts` `InputJsonValue` · madde 162/169 | Hayır | M |
````

### docs/kararlar/00-KARAR-TAKIP.md:366 · md.15 Eşleştirmeyi birleştir (iki skorlama → tek) — v2 (#226)
````text
| 15 | Eşleştirmeyi birleştir (iki skorlama → tek) | ⏸️ | Hayır | 14'ten sonra, staging |
````

### docs/kararlar/00-KARAR-TAKIP.md:373 · md.22 Landing UX paketi + yumuşak lacivert tema — canlı-sonrası (#228)
````text
| 22 | Landing UX paketi + yumuşak lacivert tema | ⏸️ | Hayır | canlı-sonrası |
````

### docs/kararlar/00-KARAR-TAKIP.md:401 · Y9 Platform büyüme metrikleri (ivme, aktif/pasif oran) — canlı-sonrası (#242)
````text
| Y9 | Platform **büyüme metrikleri** (ivme, aktif/pasif oran) | 🔴 | veri işi · düşük öncelik, canlı-sonrası · ⚠️ **Y7'den ayrıldı (PO kararı 2026-09-08)** | denetim B.4/3,4,12,18 |
````

### docs/kararlar/00-KARAR-TAKIP.md:402 · Y10 Platform ayar UI — canlı-sonrası (#243)
````text
| Y10 | Platform **ayar UI** | 🔴 | arayüz işi · düşük öncelik, canlı-sonrası · ⚠️ **Y7'den ayrıldı (PO kararı 2026-09-08)** | denetim B.4/3,4,12,18 |
````

### docs/kararlar/00-KARAR-TAKIP.md:558 · md.90 Veri İşleyen Sözleşmesi + Tenant yasal kimlik alanları (unvan/ad (#244)
````text
| **90** | **Veri İşleyen Sözleşmesi kayıt akışına entegrasyon** — Tenant yasal kimlik alanları (unvan/adres/VERBİS) | yapılmamış-iş (KVKK) | Belge 8; şema alanı yok → **migration** | 🟡 (hukukçu onayı sonrası) |
````

### docs/kararlar/00-KARAR-TAKIP.md:564 · md.83 OAuth'ta açık rıza UI'da alınmıyor + KVKK/18+ tek kutu + aydınla (#245)
````text
| **83** | **OAuth'ta açık rıza UI'da alınmıyor** (`oauthService.ts:112` implicit set; ekranda kutu yok) + KVKK/18+ **tek kutuda birleşik** + aydınlatma≠açık rıza ayrımı yok | yapılmamış-iş/[HUKUKÇU] | envanter C-6; `_RegisterContent.tsx:414` | 🟡 (hukukçu kararına bağlı) |
````

### docs/kararlar/00-KARAR-TAKIP.md:573 · md.99 SystemLog 90 gün purge → 'son değişiklik' izi 3 ayda kaybolur (P (#246)
````text
| **99** | **SystemLog 90 gün purge → "son değişiklik" izi 3 ay sonra kaybolur** — ağırlık özel kalsa bile aktör/eski→yeni izi `purgeExpiredData` ile silinir. PO kararı "iz tutulsun" idi (9a). | teknik-borç (KVKK/iz) | `gdprService.purgeExpiredData` 90g; `getLastWeightChange` SystemLog'a bağlı | 🔵 küçük (migration'sız; ağırlık değişim izini ayrı/kalıcı tut ya da AUDIT'i purge dışı bırak) |
````

### docs/kararlar/00-KARAR-TAKIP.md:588 · T3 SuspicionReport'ta tenantId yok → tenant-izolasyon boşluğu (#247)
````text
| T3 | `SuspicionReport`'ta `tenantId` yok → raporlar global, tenant-izolasyon boşluğu | açık-soru/güvenlik | `platformController.ts:348-356` | S | Olası |
````

### docs/kararlar/00-KARAR-TAKIP.md:622 · md.106 Onboarding şablon-seçim ekranı (Mezun/Gönüllü/Kulüp) (#229)
````text
| 106 | Onboarding şablon-seçim ekranı ("Mezun/Gönüllü/Kulüp") | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A2 | "Terk-oranını en-çok-düşüren ekran" (kayıtta rol/şablon seçimi) | grep: şablon-seçim ekranı yok |
````

### docs/kararlar/00-KARAR-TAKIP.md:623 · md.107 Menti/mentör retention 'sevdirme'/onboarding-aha — 'izi yok' (#230)
````text
| 107 | Menti/mentör tarafı retention "sevdirme"/onboarding-aha deneyimi | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A1(E36)/T2-D(persona) | Persona-temelli sevdirme; kullanıcı ürüne bağlansın | Yalnız STK-yönetici dilimi yapıldı; menti/mentör sevdirme izi yok |
````

### docs/kararlar/00-KARAR-TAKIP.md:627 · md.111 'Varsayılana düşen profil oranı' izleme metriği (= G2-06) (#231)
````text
| 111 | "Varsayılana düşen profil oranı" izleme metriği (= G2-06, bkz. bilanco/kararlar/G2-eslestirme-psikometri.md) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A2 | Psikometrik kör-nokta: kaç profil varsayılan/nötr'e düşüyor (madde 103 akrabası) | grep boş; metrik yok |
````

### docs/kararlar/00-KARAR-TAKIP.md:628 · md.112 Profil-düzenleme keşfi (kayıt sonrası bilgi/foto güncelleme var (#232)
````text
| 112 | Profil-düzenleme keşfi (kayıt-sonrası bilgi/foto güncelleme yeteneği var mı) | ⬜ AÇIK (PO önceliklendirmedi) | ❓ | T4-A1(E34) | Kullanıcı kayıttan sonra bilgisini/fotoğrafını güncelleyebilmeli | PLANLA keşfi hiç yapılmamış (gerçek tür ❓: önce kod-keşif) |
````

### docs/kararlar/00-KARAR-TAKIP.md:629 · md.113 PATCH /users/me/social bağlanmamış uç (= G10-10) (#233)
````text
| 113 | `PATCH /users/me/social` bağlanmamış endpoint (= G10-10, bkz. bilanco/kararlar/G10-olu-kod-terk.md) | ⬜ AÇIK (PO önceliklendirmedi) | ❓ | T2-C | **NİYET HİÇBİR BELGEDE YOK** (NİYET BELGELENMEMİŞ) | `onboardingController.ts:461` bağlanmamış; bilinçli terk mi bağlanacak mı = PO · ⚠️ **KAYNAK İZİ (2026-09-08):** F.6'da `b141738` (2026-08-26) ile numaralandı; endpoint ayrıca C.2'de (ölü kod) izli, orada da "niyet belgede yok". ⬜ Niyet hâlâ hiçbir belgede yok; ~~**PO kararı gerekiyor: bilinçli terk mi bağlanacak mı (🗑️ mı ⬜ mı)?**~~ · ⚠️ **PO KARARI (2026-09-08): SİLİNMEZ, TETİĞE BAĞLANDI.** `PATCH /users/me/social` bağlanmamış uç. **TETİK: madde 152 (eşleşme detay sayfası) yapılırken karar verilecek — bağlanır ya da silinir.** Gerekçe: menti belgesinde profil/eşleşme işleri var, sosyal bağlantı oraya bağlanabilir. **Silmek geri alınamaz, bırakmak ucuz.** |
````

### docs/kararlar/00-KARAR-TAKIP.md:630 · md.114 SjtQuestion/SjtOption tabloları 0 prisma query (= G10-09) (#234)
````text
| 114 | `SjtQuestion`/`SjtOption` tabloları 0 prisma query (= G10-09, bkz. bilanco/kararlar/G10-olu-kod-terk.md) | ⬜ AÇIK (PO önceliklendirmedi) | ❓ | T2-C(1.A) | SJT tabanlı profil (alternatif psikometri yolu) | `schema.prisma:889,906` 0 query; ölü-tablo mu SJT-genişletme mi = PO (DURUŞ SEBEBİ YOK) · ⚠️ **KAYNAK İZİ (2026-09-08):** SAHİPSİZ DEĞİL — niyet C.2 satırında belgeli: "SJT tabanlı profil+mentör sıralama alternatif yolu (cert paketleri, `1e11e73`)"; ayrıca Faz 5 / madde 101 ile ilişkili. Duruş sebebi: SJT canlıya girmedi. ⬜ Girecek mi = PO. |
````

### docs/kararlar/00-KARAR-TAKIP.md:631 · md.115 Kurumlar-arası sosyal kanıt duvarı + paylaşılabilir kurum 'Etki (#235)
````text
| 115 | Kurumlar-arası "sosyal kanıt" duvarı + paylaşılabilir kurum "Etki kartı" | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A2 | B2B2C viral büyüme (kurumlar birbirini görsün, etki kartı paylaşılsın) | grep: kamuya-açık kurum-duvarı/etki-kartı FE yok |
````

### docs/kararlar/00-KARAR-TAKIP.md:632 · md.116 Mentör/menti-kaynaklı 'ters çekim' bottom-up büyüme kanalı (= G (#236)
````text
| 116 | Mentör/menti-kaynaklı "ters çekim" bottom-up büyüme kanalı (= G4-38, bkz. bilanco/kararlar/G4b-panel-akis.md) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A2 | Kullanıcı-kaynaklı büyüme kanalı (multi-tenant altyapı hazır) | Kanala çevrilmedi |
````

### docs/kararlar/00-KARAR-TAKIP.md:633 · md.117 Premium 'kilitli görünür' + Tenant.plan/limits freemium altyapı (#237)
````text
| 117 | Premium "kilitli görünür" + `Tenant.plan/limits` freemium altyapısı | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T1-B2(01:18)/T2-C/T4-A2 | Freemium iş modeli (bazı özellikler premium'da açılsın) | Şema alanı var; uygulama-mantığı yok |
````

### docs/kararlar/00-KARAR-TAKIP.md:634 · md.118 Global içerik seed'i ana Neon'a (DISC/LearningJourney boş görün (#238)
````text
| 118 | Global içerik seed'i ana Neon'a uygula (DISC/LearningJourney "boş" görünüyor) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T2-B(:10/:86)/T4-A2/T4-A1(A8) | Canlıda içerik dolsun (seed eksik görünüyor) | ⚠️ **CANLI DB YAZIMI → PO onayı ZORUNLU** (canlı=lokal aynı Neon); canlı sayı ⏳ DB-teyit |
````

### docs/kararlar/00-KARAR-TAKIP.md:654 · md.125 triggersOn ölü alan — SJT adaptif tetikleme okuyan kod yok (#239)
````text
| 125 | `triggersOn` ölü alan — SJT adaptif tetikleme (boyut belirsizse o boyutun FOLLOWUP'ını aç) okuyan kod YOK | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | keşif §6.1 | Boyut-belirsizliğini kapatan derinleşme mekanizması (havuzu adaptif büyüt) | Veri modelinde tanımlı (`schema.prisma:896`, `seed.ts`) ama hiçbir servis okumuyor (grep `triggersOn` src boş); okuyucu katman yazılmadı. madde 101 akrabası, ayrı mekanizma · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı (B6 derinleşme) → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |
````

### docs/kararlar/00-KARAR-TAKIP.md:657 · md.128 Eş-anlamlı/normalize etiket otomasyonu yok (yazılım↔software) (#240)
````text
| 128 | Eş-anlamlı/normalize etiket otomasyonu YOK (yazılım↔software ayrı etiket, skorda eşleşmez) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | keşif §4 | Etiket kesişim skorunun eş-anlamlıları yakalaması (isabet artışı) | grep synonym/alias/stem boş; tek birleştirme = admin manuel `array_replace` merge. `toLowerCase()` locale-duyarsız (Türkçe İ/ı). Hiç otomasyon yazılmadı · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı (B9.4 çatılı eşleşme) → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |
````

### docs/kararlar/00-KARAR-TAKIP.md:659 · md.130 IndustryNode taksonomi ağacı seed durumu ❓ — boşsa taksonomi bi (#241)
````text
| 130 | IndustryNode taksonomi ağacı seed durumu ❓ — ağaç boşsa 5-bileşen A (taksonomi %30) hep 0 döner | ⬜ AÇIK (PO önceliklendirmedi) | ❓ (DB-teyit) | keşif §8 | Sektör kodları hiyerarşik ağaçta yakınlık ölçsün (LCA çatı-eşleşme) | `taxonomy.service` çalışır ama ağaç/`industryCode` atamaları seed'li mi DB'ye sorulmadı (kural). Boşsa sector-scorer bağlansa bile A bileşeni etkisiz · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı (B9.4 IndustryNode/LCA) → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |
````

### docs/kararlar/00-KARAR-TAKIP.md:925 · md.163 CertificationOption.internalNote migration'ı canlıya uygulanmad (#248)
````text
⚠️ **🔀 ŞEMA HAZIR — MIGRATION ÇALIŞTIRILMADI (2026-09-09, backend PR #70).** `CertificationOption.internalNote String?` eklendi (`schema.prisma:1158`) + migration dosyası üretildi (`20260909000000_add_internal_note`). **SQL:** `ALTER TABLE "CertificationOption" ADD COLUMN IF NOT EXISTS "internalNote" TEXT;` (schema-to-schema diff, DB-free; yasak ifade yok). Sızma yok (FE-dönük okumalar explicit `select`). ⛔ **MIGRATION ÇALIŞTIRILMADI** — canlı DB'ye dokunulmadı. Çalıştırma **AYRI TUR + PO ONAYI** ister. ⚠️ **F.13 KURALI:** çalıştırma turunda **önce `CertificationOption` için yedek tablo alınacak** (restore penceresi 6 saat). ⬜ Sonraki adım: PO migration'ı inceler → onaylarsa çalıştırma turu → sonra madde 164 → madde 30 (seed). · ⚠️ **F.13'e (Neon yedeği) TAKILI** · Oturum 1'in 🔒 iç notlarını BLOKLAR · ⚠️ **F.13 ÇÖZÜLDÜ (2026-09-08)** — restore penceresi 6 saat. Bu migration'da **yedek tablo ZORUNLU** (F.13 önlem kuralı). · 
````

### docs/kararlar/konu/01-urun-vizyonu.md:34 · Gelir/sürdürülebilirlik modeli hangi kanal (sponsor/kurumsal/hibe/bağı (#179)
````text
- Gelir/sürdürülebilirlik modeli hangi kanal (sponsor premium / kurumsal partnerlik / hibe / bağış)? ❓ MVP sonrası.
````

### docs/kararlar/konu/04-guvenlik-ve-kvkk.md:55 · KVKK açık soruları: yaş politikası · veri sorumlusu kimliği · sunucu k (#177)
````text
- Bunlar açık sorulara bağlı (bkz. 08): yaş politikası, veri sorumlusu kimliği, sunucu konumu beyanı.
````

### docs/kararlar/konu/04-guvenlik-ve-kvkk.md:58 · Dokploy HTTP+açık: firewall · SSH sertleştirme · SSL · yedekleme (#178)
````text
- Dokploy HTTP+açık = kritik. Firewall, SSH sertleştirme, SSL, yedekleme.
````

### docs/kararlar/konu/05-ozellikler-ve-paneller.md:54 · Panel PR'ları (#26/#29) merge — kodlandı, test bekliyor (#186)
````text
- Panel PR'ları (#26/#29) merge — kodlandı, test bekliyor.
````

### docs/kararlar/konu/06-tasarim-ux.md:10 · Landing dark/light seçilebilir yapılsın — canlı-sonrasına ertelendi (#189)
````text
- **Landing dark/light: CANLI-SONRASINA ERTELENDİ (2026-08-02 geç oturum'da güncellendi).** 🟢
````

### docs/kararlar/konu/06-tasarim-ux.md:40 · Mentör kart grid'i: sayfa başı ~15-18 kart, 300 mentör → çok sayfa (ke (#191)
````text
- **Grid + sayfalama:** sayfa başına ~15-18 kart (kesin sayı açık soru, bkz. 08); masaüstü 3 / tablet 2 / mobil 1 sütun. 300 mentör → çok sayfa.
````

### docs/kararlar/konu/06-tasarim-ux.md:45 · Fotoğraf herkesten istenecek — şimdilik opsiyonel, ne zaman zorunlu? ( (#192)
````text
- **Fotoğraf:** herkesten istenecek. Şimdilik **opsiyonel**, ileride zorunlu (bkz. 08 açık soru). Altyapı hazır (bugün tamamlandı).
````

### docs/kararlar/konu/06-tasarim-ux.md:59 · Admin sayfalarının başındaki açıklama metinleri daha basit/açıklayıcı  (#193)
````text
- **Sayfa açıklama metinleri:** Her admin sayfasının başındaki "bu sayfa ne işe yarar" metni daha basit/açıklayıcı olmalı (imleç/tooltip değil, metin iyileştirme).
````

### docs/kararlar/konu/06-tasarim-ux.md:69 · Çift-aha onboarding, bildirim yedeği vb. — kullanıcı karar vermedi (#194)
````text
- Çift-aha onboarding, bildirim yedeği vb. orta öncelikli işler — asistan "değerli ama sonra" dedi, kullanıcı karar vermedi. ⚪
````

### docs/kararlar/konu/08-acik-sorular.md:10 · Hâlâ açık: yaş politikası detayı, veri sorumlusu kimliği (K3 ile birle (#180)
````text
> Çözülenler: **K2 OAuth consent · K4 18+ · K5 sunucu konumu → CANLIDA** (2026-08-15). Hâlâ açık (bu belgede): yaş politikası detayı, veri sorumlusu kimliği (K3 ile birleşik, canlı öncesi en son). Bu belge ↔ `unutulmus-niyet-envanteri-2026-08-10` konu çakışması var.
````

### docs/kararlar/konu/08-acik-sorular.md:22 · Gelir/sürdürülebilirlik modeli (sponsor/kurumsal/hibe/bağış)? MVP sonr (#181)
````text
- **Gelir/sürdürülebilirlik modeli:** Hangi kanal (sponsor premium / kurumsal partnerlik / hibe / bağış)? MVP sonrası. Prensip: yük kulüplerde değil. ❓
````

### docs/kararlar/konu/08-acik-sorular.md:25 · Modül önceliklendirme onayı (viral/panel/metrik 'gerçek kullanıcı sonr (#182)
````text
- **Modül önceliklendirme onayı:** Viral/panel/metrik özellikleri "ürün gerçek kullanıcı kazanınca" ertelendi ama kullanıcı bu sırayı açıkça onaylamadı. ⚪
````

### docs/kararlar/konu/08-acik-sorular.md:40 · Arkadaşın başvurusu 'inceleniyor' ama panelde 'bekleyen yok' — gerçek  (#183)
````text
- **Arkadaşın başvurusu:** Canlıdan kaydoldu, "inceleniyor" gördü ama panelde "bekleyen yok". Çözülmedi. GERÇEK KİŞİ bekliyor. b3 membership backfill ile ilgili olabilir. ⏳
````

### docs/kararlar/konu/08-acik-sorular.md:55 · Yönetici paneli metrik genişletme: görüşme sayıları, onboarding tamaml (#184)
````text
- ~~**Yönetici paneli çekirdek metrikleri:**~~ İlk set YAPILDI (mentörsüz menti / ölü eşleşme / pasif üye / arz-talep — health-metrics). Genişletme (görüşme sayıları, onboarding-%) hâlâ açık. 🟡
````

### docs/kararlar/konu/08-acik-sorular.md:56 · Pasif üyelere OTOMATİK toplu re-engagement maili (rıza/opt-out) — bili (#185)
````text
- **Otomatik-nudge (KVKK/rıza):** Pasif üyelere OTOMATİK toplu re-engagement maili gönderilsin mi? Elle nudge yapıldı; otomatik = istenmeden mail (rıza/opt-out tasarımı gerekir) → bilinçli ERTELENDİ. Karar + tasarım ürün sahibinde. ❓
````

### docs/kararlar/konu/11-tasarim-kararlari-yasam-dongusu-ve-disc.md:42 · 'Çok yakın = BÜYÜK' harf için kesin sayısal eşik (DISC ölçeğine bağlı) (#187)
````text
**⚠️ Açık nokta (#12 turunda netleşecek — bu belgede SAYI verilmez):**
````

### docs/kararlar/konu/belge-duzeni-rehberi.md:174 · 07-oturum-gunlugu donduruldu ama OTONOM-PROMPT/rehber hâlâ oraya yazdı (#205)
````text
- Oturum kapanışında verilen her söz ("sonraki turda/ileride yapılacak"), `07-oturum-gunlugu`'ye yazıldığı AN buraya da **tek satır** kopyalanır (söz · hangi oturum · durum · ilgili madde no). ⚠️ (2026-09-24, DC turu): 📸 `07` günlük olarak donduruldu (son kayıt 2026-09-20); tur kaydının fiilî yeri `docs/otonom/02-ILERLEME.md`. Kural↔uygulama çelişkisi PO kararına bırakıldı — bkz. `docs/raporlar/kesif/devir-klasoru-envanteri-2026-09-24.md` §"Bulunan kural çelişkisi".
````

### docs/kararlar/konu/belge-duzeni-rehberi.md:263 · OTONOM-PROMPT § 13.5 (kapanışta SICAK dosya karakter ölçümü) main'de y (#203)
````text
  (`OTONOM-PROMPT.txt` § 13.5 — bu bölüm henüz `main`'de YOK, PO kararı bekliyor — TEYİT GEREK). Böylece şişme **üç hafta sonra değil, o turda** görünür.
````

### docs/kararlar/konu/belge-duzeni-rehberi.md:292 · 02-ILERLEME arşivlemesi main'de henüz yapılmadı (son 3 tur ana dosyada (#204)
````text
- `02-ILERLEME.md` için (⚠️ 2026-09-25 itibarıyla bu arşivleme `main`'de henüz YAPILMADI — tur sonunda güncel main üzerinde baştan yapılacak): son üç tur ana dosyada; öncekiler `docs/otonom/arsiv/02-ILERLEME-<YYYY-MM>.md`'ye.
````

### docs/kararlar/konu/degerlendirme-metrik-sistemi-tasarim-2026-08-19.md:158 · KVKK Md.11: kişi hakkındaki kalite puanına erişim hakkı — hukukçu konu (#206)
````text
- **AÇIK NOKTA (hukuk):** KVKK Md.11 kapsamında kişinin kendi verisine erişim hakkı ayrı bir hukukçu konusudur.
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:367 · Sınırsız yeniden-derinleşme davranışı (G3-03) — her tur profili yenide (#214)
````text
> değiştiriyor, sınır yok (G3-03). Karara bağlanmadı.
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:572 · Faz 5: gate (expectationCategories eleme) ile yeni skor aynı sinyali i (#215)
````text
  - ⚠️ Faz 5 için kalan GERÇEK soru (açık kalem, PO numaralandıracak): gate (eleme) ile skor aynı sinyali iki kez cezalandırıyor mu — yani ortak-beklentisi-olmayan aday hem eleniyor hem düşük skor alıyor mu?
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:586 · interactionStyle dondurma: pasif SELECT'lerin sonradan temizlenmesi (#216)
````text
- **İŞ 0 bulgusu (dondurma güvenli mi):** `interactionStyle` `matching.ts` DIŞINDA **fonksiyonel olarak okunmuyor** — yalnız 2 pasif SELECT (`userController.ts:175` getUser DTO · `onboardingController.ts:330` onboarding yanıtı) + FE DTO tipi (`lib/api/profile.ts:33`; profil sayfası **render etmiyor**). Dondurulunca SELECT'ler null döner, hiçbir mantık/gösterim tüketmediği için **fonksiyonel etki YOK.** *(Pasif SELECT'lerin sonradan temizlenmesi açık kalem — PO numaralandıracak.)*
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:597 · Kayıt sonunda sekmeyi kapatan üç soruya cevapsız kalır; profil sayfası (#217)
````text
- ⚠️ **AÇIK KALEM (PO numaralandıracak):** kayıt akışının sonunda sekmeyi kapatan kişi üç soruya CEVAPSIZ kalır. Migration additive olduğu için sistem çalışır (nötr) ama o kişiye SONRADAN SORMA YOLU YOK. Profil sayfasından tamamlama akışı gerekiyor mu — karar verilmedi.
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:753 · §16 #7 Çatılı eşleşme — IndustryNode/LCA mantığını bağla (#207)
````text
| 7 | Çatılı eşleşme — IndustryNode/LCA mantığını bağla | ⬜ AÇIK | evet |
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:754 · §16 #8 Kalite çarpanı çift-uygulama hatasını düzelt (#208)
````text
| 8 | Kalite çarpanı çift-uygulama hatasını düzelt | ⬜ AÇIK | evet |
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:756 · §16 #10 Görünürlük kuralları (10.3): S1 ihtiyacı seçimde gizli, mentör (#209)
````text
| 10 | Görünürlük kuralları (10.3) uygula | ⬜ AÇIK | evet |
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:758 · §16 #12 Eşleşme kartı metni (10.5) — algılanan benzerlik cümlesi (#210)
````text
| 12 | Eşleşme kartı metni (10.5) — algılanan benzerlik cümlesi | ⬜ AÇIK | evet |
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:762 · §16 #16 Kalibrasyon yön-kontrolü metrikleri (ana: ilişki süresi) (#211)
````text
| 16 | Kalibrasyon yön-kontrolü metrikleri kur (match length ana) | ⬜ AÇIK | evet |
````

### docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:764 · §16 #18 Karma ölçüm formatı (ipsatif sorunu) tasarımı (#212)
````text
| 18 | Karma ölçüm formatı (ipsatif) tasarımı | ⬜ AÇIK | evet |
````

### docs/otonom/00-SIMDI.md:80 · (7b #379 N1) GET /api/meetings/:meetingId/feedback okuma ucunun sahibi + (7b #379 N2) PATCH /api/meetings/:id (→COMPLETED) ön yüzden çağrılmıyo (#250, #251)
````text
- (7b #379 N1) `GET /api/meetings/:meetingId/feedback` (değerlendirme okuma) ucunun kuyrukta sahibi yok — rapor B.5 teyitinde "AJ-14'e bağlı" yazıyor ama AJ-14 periyodik anket işi; `00-KUYRUK.md` E-3 notu hâlâ "E-3e değerlendirme okumayı da karşıladı" diyor (yanlış: E-3e `…/check-ins` okuyor, `frontend/src/components/organisms/MeetingCheckInReadout.tsx:6-13`). Sonraki tur: AJ satırı + E-3 notu düzeltmesi. · (N2) `PATCH /api/meetings/:id (→COMPLETED)` ön yüzden çağrılmıyor; iş otomatik tamamlanmayla kapandı — mükerrer uç adayı (silme protokolü).
````

### docs/otonom/00-SIMDI.md:81 · AJ-01 kapsam dışı: platform/süper-admin geneli rol sayımları hâlâ User (#252)
````text
- AJ-01 kapsam dışı bıraktı: platform/süper-admin geneli rol sayımları (`backend/src/controllers/platformController.ts`, `adminSettingsController.ts`) hâlâ `User.role` — tekil kişi mi üyelik mi sayılacağı ürün kararı adayı.
````

### docs/otonom/00-SIMDI.md:82 · Frontend askı ekranı yok (kurum askıdayken) + GET /api/system-logs iz/meta + Kurum-içi sayımlar User.role (KPI + G1-18) + Token türü ayrımı (OAuth pending) + U-18 gerçek bildirim / inbox ret işareti (#253, #254, #255, #256, #257)
````text
- Kuyrukta satırı olmayan bulgular: G-kart doğrulaması ~30 ⬜ kalem (`docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md`) · `GET /api/system-logs` iz/meta · kurum-içi sayımlar `User.role` (KPI + G1-18) · frontend askı ekranı yok · token türü ayrımı (OAuth pending) · U-18 gerçek bildirim/inbox ret işareti.
````

### docs/otonom/00-SIMDI.md:84 · 'BITTI ama kalemin tamamı değil' 5 vaka (F-04/G1-23 · F-27/G6-01 · G6- (#258)
````text
- "BITTI ama kalemin tamamı değil" 5 vaka (F-04/G1-23 · F-27/G6-01 · G6-03 · G7-13 · F-21/G7-09) — K5-Y2 bu turda denetliyor.
````

### docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:145 · 4 kardeş belge eksik (senaryo-bankasi/olcme-mimarisi/senaryo-denetim/o (#202)
````text
| 4 kardeş belge eksik (senaryo-bankasi/olcme-mimarisi/senaryo-denetim/olcme-arastirmasi 2026-09-03) | ⬜ AÇIK | Hayır (belge kaydı, kod değil) |
````

### docs/raporlar/panel/00-INDEX.md:13 · 2 panel envanteri (*-panel-envanteri) kodla denetlenmedi → 'sonraki tu (#176)
````text
2 strateji denetlendi (aşağıdaki B.3/B.4); 2 envanter (`*-panel-envanteri`) denetlenmedi → `kod-denetimi/strateji-gercek-denetimi:337` "sonraki tur".
````

### docs/raporlar/kod-denetimi/00-INDEX.md:8 · indeks sayısı (yeni rapor satırı eklendi)
````text
## İçerik (12)
````
