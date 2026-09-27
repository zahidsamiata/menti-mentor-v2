# Kalite kontrolü QE4 — BITTI son doğrulama (2026-09-27)
Denetçi: opus alt-ajan (partileri yapmayan) · referans: çatı 191a256 · backend 3bd9ad3 · salt-okuma
Özet: kontrol edilen 19 · TUTAR 13 · ÇÜRÜDÜ 6 (parti-05: 2 · parti-06: 1 · parti-07: 0 · parti-09: 2 · parti-10: 1 · parti-11: 0) · yeniden koşulan mutasyon 0

| İş | Parti | Parti kategorisi | QC kararı | Doğru kategori | Kanıt dosya:satır | Kalan (⚠️/🔁/👁 için) | Güvenlik/KVKK etkisi | Karar gerekebilir |
|---|---|---|---|---|---|---|---|---|
| K-02 | parti-05 | ✅ | ÇÜRÜDÜ | ⚠️ KISMEN | kod: disc-test/page.tsx:87-97 · test yalnız hook: useDiscTest.test.tsx:49-99; sayfa dallarını (hata/boş/soru kartı) render eden test yok | Asıl kök neden olan sayfa koşulu (:87-97) testsiz; eski koşula dönülse testler geçer | hayır — yalnız yükleme ekranı | hayır |
| K-09 | parti-05 | ✅ | TUTAR | ✅ | mentiMetrics.ts:18-46 · menti/page.tsx:81-88,260-262 (/api/meetings) · mentiMetrics.test.ts:20-65 | — (not: sayfa sonradan 6 kez değişti, bağlama bozulmadı; kart bağlaması sayfa testinde ölçülmüyor) | — | — |
| F-10 | parti-05 | ✅ | TUTAR | ✅ | menti/page.tsx:305-345 kart · matchingController.ts:96-117 menti-güvenli DTO · menti-mentor-card-bookable.test.tsx:74-123 · backend mentor-matches.test.ts:47-48 discType yok | — | — | — |
| F-22 | parti-05 | ✅ | ÇÜRÜDÜ | ⚠️ KISMEN | meetings/page.tsx:129-134 · ShareButtons.tsx:19 varsayılan shareUrl 'https://menti-mentor.io' (repoda başka hiçbir yerde yok; canlı alan adı farklı) · test yalnız metin: meeting-completion-share.test.tsx:46-52 | Kart görünüyor ama LinkedIn paylaşımı ürünün olmayan sabit bir alan adına bağlanıyor; getSiteUrl() kullanılmalı | evet — sahipliği doğrulanmamış alan adına kullanıcı paylaşımı yönlendiriliyor | hayır |
| F-30 | parti-06 | ✅ | TUTAR | ✅ | LoginForm.tsx:3-11 ("Sprint 14" yok; grep yalnız dashboard/page.tsx:5'te, kapsam dışı) | — | — | — |
| U-02 | parti-06 | ✅ | ÇÜRÜDÜ | 🔁 SONRADAN DEĞİŞTİ | U-02 dd6b822 (#201) → GV-03 1143ad1 aynı render'ı değiştirdi: meetings/page.tsx:88-103 isHttpUrl · meetings-location.test.tsx:62-118 (GV-03 negatifi :74-83) | Güncel hâl ölçütü karşılıyor (online link, konum, telefon görünür); http(s) olmayan link artık tıklanamaz | hayır — GV-03 ile kapandı, kalan açık yok | hayır |
| U-09 | parti-06 | ✅ | TUTAR | ✅ | admin/page.tsx:2 yönetici girişi approvals'a yönlenir · approvals/page.tsx:62-75 · approvals-empty-invite.test.tsx:24-31 | — (not: waiting-room/page.tsx:81-92 testsiz, ikincil yüzey) | — | — |
| V-07 | parti-07 | ✅ | TUTAR | ✅ | feedbackController.ts:232-291 · meetingRoutes.ts:147-151 ADMIN · reminder-batch-cooldown.test.ts:57-89 | — (U-16 aynı fonksiyonu değiştirdi ama batch/cooldown mantığına dokunmadı) | — | — |
| IC-04 | parti-07 | ✅ | TUTAR | ✅ | types/certification.ts:68 · mentor/certification/page.tsx:227-231 · mentor-certification-fail.test.tsx:63-66; COOLDOWN/NO_ACTIVE sonuç ekranına gelmiyor (sjtScoringController.ts:238-246 hata) | — | — | — |
| F-33 | parti-09 | ✅ | ÇÜRÜDÜ | 👁 İNSAN GÖZÜ (kod ✅) | DashboardNav.tsx:98-121 · (dashboard)/layout.tsx:15 · dashboard-user-card.test.tsx:51-137 (DOM yapısı; jsdom yerleşim ölçmez) | "Sol-altta durur, içeriği örtmez" görsel iddiası yalnız tarayıcıda doğrulanır; ilk inceleme tam bu yüzden SORUN VAR demişti | hayır | hayır |
| Y-10 | parti-09 | ✅ | ÇÜRÜDÜ | 👁 İNSAN GÖZÜ (kod ✅) | structuredData.ts:24-48 · app/page.tsx:39 · json-ld.test.tsx:26-65 · siteUrl.ts:9-10 (ayar yoksa localhost) · 03-PO-ELLE-ISLER.md:13 | Ölçüt "arama sonucunda zengin sonuç" — yalnız canlıda/arama motorunda; NEXT_PUBLIC_SITE_URL build ayarı yoksa adresler localhost | hayır | hayır (PO eli: build ayarı) |
| GV-15 | parti-09 | ✅ | TUTAR | ✅ | htmlEscape.ts:23-26 · emailService.ts 40 kullanım, :89 konu temizliği · tenantNotifications.ts 5 · email-html-escape.unit.test.ts:71-190 gönderim fonksiyonlarını çağırıp gövdeyi assert ediyor | — | — | — |
| IC-07 | parti-09 | ✅ | TUTAR | ✅ | apiErrorMessage.ts:23-38 · useMutation.ts:46 · bildir/page.tsx:41 · admin/certification/page.tsx:30-51 · api-error-message.test.tsx:25-115 (sayfa render + negatif); backend "tenantSlug zorunlu" grep boş | — | — | — |
| YN-12 | parti-10 | ✅ | ÇÜRÜDÜ | ⚠️ KISMEN | belge-duzeni-rehberi.md:51-54 komut 7 indeksin 7'sini yakalar; ama ölçüt "her klasörün giriş noktası" — kuyruk satırının kendisi "indekssiz 13 klasör kalan" diyor | İndekssiz klasörler hâlâ var; desen bulunanı yakalıyor, giriş noktası olmayan klasörler çözülmedi | hayır | hayır |
| AN-17 | parti-10 | ✅ | TUTAR | ✅ | mentor/page.tsx:184 · profile/page.tsx:249 · disc-recall-card-mentor-profile.test.tsx:106-137 | — | yan bulgu evet: userController.ts:161,229-240 mentör→menti bakışında discResultCard içindeki discVector+rawScores (onboardingController.ts:483-489) dönüyor | evet — ham DISC puanı mentöre görünsün mü (yan bulgu) |
| AN-39 | parti-10 | ✅ | TUTAR | ✅ | pagination.ts:11-27 · reportController.ts:78-96 · report-pagination.test.ts:41-94 · admin-reports-pagination.test.tsx:38-95 · platform-user-reports-pagination.test.tsx:58-74; take:200 grep boş | — | — | — |
| AN-48 | parti-11 | ✅ | TUTAR | ✅ | geri-bildirim-envanteri-2026-09-25.md:153-236 (Ö1-Ö11) · 01-KARARLAR.md:133-136,1400-1428 KARAR-89..92 | — | — | — |
| AJ-07 | parti-11 | ✅ | TUTAR | ✅ | DiscBadge.tsx:19-20 · profile/page.tsx:36-37 · mentor/page.tsx:31-32 · admin/questions/page.tsx:16 (yellow/green-700, Tailwind 3) · dark-mode-contrast.test.tsx:61-76 · rapor erisilebilirlik-denetimi-2026-09-27.md | — (not: 3 sayfa dosyasında test yalnız -500'ü yasaklıyor, -600'e dönüşü yakalamaz) | — | — |
| E-3b | parti-11 | ✅ | TUTAR | ✅ | questionRoutes.ts:51-52,65-66 · questionController.ts:277-294 · questionService.ts:110-122 tenant filtresi · question-hidden-list.test.ts:51-123 · admin-questions-hidden.test.tsx:44-103 | — (E-3c aynı sayfaya dokundu, gizlenenler bölümü bozulmadı) | — | — |

## Notlar

### K-02 — ✅ → ⚠️ KISMEN
Kuyruk kök nedeni sayfa koşulu (`page:86 loading==questions.length`). Düzeltme iki yerde: hook `loading` bayrağı (`useDiscTest.ts:64,99,110,137`) ve sayfa dalları (`disc-test/page.tsx:87-97`: iskelet / hata ekranı / boş ekran). Test (`useDiscTest.test.tsx:49-99`) yalnız hook durumunu ölçüyor; `__tests__` altında `disc-test/page`, "Test yüklenemedi", "aktif test sorusu" geçen test yok. Sayfa koşulu eski hâline dönse testler yeşil kalır.

### F-22 — ✅ → ⚠️ KISMEN
Kutlama metni ve düğmeler var ve test ediliyor. Ama `ShareButtons.tsx:19` LinkedIn paylaşımına varsayılan `https://menti-mentor.io` ekliyor; bu alan adı repoda başka hiçbir yerde geçmiyor, belgelerdeki canlı adres farklı ve kodda kanonik adres için `lib/siteUrl.ts` `getSiteUrl()` zaten var. Kullanıcı paylaşımı ürünün olmadığı (sahipliği doğrulanmamış) bir adrese bağlanıyor. Test yalnız "WhatsApp/LinkedIn" metnini arıyor, href'i ölçmüyor.

### U-02 — ✅ → 🔁 SONRADAN DEĞİŞTİ
U-02 (`dd6b822`, #201) ham `locationUrl`'i `<a href>` yaptı; GV-03 (`1143ad1`) aynı bloğu değiştirip `isHttpUrl` koşulu ve "geçersiz bağlantı" yedeği ekledi (`meetings/page.tsx:88-103`). Parti bunu notta söylemiş ama 🔁 vermemiş. Güncel hâl ölçütü karşılıyor; test (`meetings-location.test.tsx:62-118`) üç biçimi ve GV-03 negatifini ölçüyor.

### F-33 — ✅ → 👁 İNSAN GÖZÜ (kod ✅)
Ölçüt yerleşimle ilgili ("sol-alt", CANLIDA BAK "içerik örtülmüyor"). Test DOM ilişkisini ve `fixed` yokluğunu ölçüyor (`dashboard-user-card.test.tsx:82-101`), gerçek konum/örtme jsdom'da ölçülemez. İlk inceleme SORUN VAR'ı tam bu görsel örtme yüzünden vermişti.

### Y-10 — ✅ → 👁 İNSAN GÖZÜ (kod ✅)
Kuyruk ölçütü "arama sonucunda kurum zengin sonuç olarak görünüyor"; parti bunu "ölçütün dışı" sayarak ✅ vermiş. Kod ve test yalnız JSON-LD üretimini ölçüyor. Ayrıca `siteUrl.ts:9-10` ayar yoksa `localhost` döndürüyor; `NEXT_PUBLIC_SITE_URL` build ayarı `03-PO-ELLE-ISLER.md:13`'te PO işi olarak açık.

### YN-12 — ✅ → ⚠️ KISMEN
Koruma komutu dört kalıbı yakalıyor (doğrulandı: `find docs` 7 indeks, 7'si eşleşiyor). Ama ölçüt "her klasörün giriş noktası bulunuyor"; kuyruk satırının kendisi "indekssiz 13 klasöre indeks açma ayrı iş" diyerek bu ayağı açık bırakmış. İndeksi olmayan klasörlerde desen bir şey bulamıyor.

### Yan bulgu (ÇÜRÜME değil) — AN-17 satırında
`USER_PUBLIC_SELECT` `discResultCard`'ı içeriyor (`userController.ts:161`) ve mentör→menti bakışında süzülmeden dönüyor (`:229-240`, `discVisibility.ts:26-27`). Bu JSON onboarding'de `discVector` ve `rawScores` ile yazılıyor (`onboardingController.ts:483-489`). Seçim yorumu "ham DISC vektörü ASLA sızmaz" diyor, oysa kart içinde sızıyor. AN-17 satırı bunu "ayrı denetim (takip)" diye not etmiş; bu, AN-17 ölçütünün dışında ama KVKK açısından hassas psikometrik veri.
