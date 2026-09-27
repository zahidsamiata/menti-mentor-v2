# Kalite kontrolü QD — BITTI son doğrulama (2026-09-27)
Denetçi: opus alt-ajan (partileri yapmayan) · referans: çatı 191a256 · backend 3bd9ad3 · salt-okuma
Özet: kontrol edilen 24 · TUTAR 17 · ÇÜRÜDÜ 7 (parti-05: 1 · parti-06: 1 · parti-07: 1 · parti-09: 1 · parti-10: 1 · parti-11: 2) · yeniden koşulan mutasyon 0

| İş | Parti | Parti kategorisi | QC kararı | Doğru kategori | Kanıt dosya:satır | Kalan (⚠️/🔁/👁 için) | Güvenlik/KVKK etkisi | Karar gerekebilir |
|---|---|---|---|---|---|---|---|---|
| GV-22 | parti-09 | ✅ | TUTAR | ✅ | be src/config.ts:65-74 (isSafeInteger+warn) · :175 → middleware/avatarUpload.ts:20 · tests/config-upload-max-bytes.unit.test.ts:28-35 (7 geçersiz değer) | — | — | — |
| F-16 | parti-05 | ✅ | TUTAR | ✅ | DiscRecallCard.tsx:99-103 role==='MENTI' · menti/page.tsx:249 role="MENTI" · disc-recall-card.test.tsx:38-46 (var/yok çifti) | — | — | — |
| E-2 | parti-05 | ✅ | TUTAR | ✅ | hayalet-envanter-2026-09-19.md:94-113 (4 kova+sayı) · 01-KARARLAR.md:255-337 KARAR-12..17 · küçük sapma: gerekçesiz Tenant.verifiedBy SOR yerine BAĞLA'ya kondu (:101) | — | — | — |
| YN-13 | parti-11 | ✅ | ÇÜRÜDÜ | ⚠️ KISMEN | backend repoda izlenen .claude/settings.local.json:4,21 kişi adı içeren yol taşıyor · satırın kendi durumu "BITTI (kısmen)" · 03-PO-ELLE-ISLER.md:151 | Backend public repodaki .claude/settings.local.json'da ad hâlâ geçiyor (PO elle işi). | evet — kişisel veri (ad) public repoda duruyor | hayır |
| F-06 | parti-05 | ✅ | ÇÜRÜDÜ | ⚠️ KISMEN | adminController.ts:835-850 await+.catch · logger.ts:29-41 writeLog hatayı kendisi yakalar, hiç reject etmez → .catch ölü dal · test algorithm-weights-manual.test.ts:160-181 yalnız mutlu yol | Hata yolu (audit yazımı başarısız) hiçbir testte ölçülmüyor; F-06'nın eklediği .catch hiç tetiklenemez. | hayır — hata logger.ts:40'ta zaten konsola düşüyor | hayır |
| P-01 | parti-06 | ✅ | TUTAR | ✅ | meetings/page.tsx:49-51,70-71 · be meetingController.ts:290 mentor include · meetings-opponent-name.test.tsx (menti/mentör/yedek metin) | — | — | — |
| U-14 | parti-07 | ✅ | ÇÜRÜDÜ | ⚠️ KISMEN | join: _JoinContent.tsx:58-77 + join-expired-request-link.test.tsx:26-38 ✅ · sıfırlama: ResetPasswordForm.tsx:31-33,66-70 süresi dolmuş token hatasında yalnız "Giriş sayfasına dön" | Başlık "davet/sıfırlama" diyor; süresi dolmuş sıfırlama linkinde (token var, sunucu reddeder) "yeni bağlantı iste" düğmesi yok. | hayır | hayır |
| KR-06 | parti-07 | ✅ | TUTAR | ✅ | be userController.ts:189-190 USER_FULL_SELECT · FE profile/page.tsx:102,159 aynı uçtan dolup geri yazıyor · profile-social-links.test.ts:30-42 | — | — | — |
| AJ-12 | parti-11 | ✅ | TUTAR | ✅ | meetingController.ts:706-720 RejectMeetingSchema + req.body ?? {} · meeting-reject-notify.test.ts:103-124 (gövdesiz 200 + IDOR 404) | — | — | — |
| I-06 | parti-05 | ✅ | TUTAR | ✅ | degerlendirme-sistemi-tasarim-2026-08-27.md:414-415 · kalan tek düz geçiş arketip-ve-yaklasim-icerigi-2026-09-03.md:467 🧊 DONMUŞ belge (kapsam dışı) | — | — | — |
| YN-14 | parti-11 | ✅ | ÇÜRÜDÜ | ⚠️ KISMEN | Yalnız B.4-3 ÇELİŞKİ paragrafı tek kopya (CLAUDE.md:253↔:267) · TEST_DATABASE_URL uyarısı hâlâ 3 yerde (:32,:204,:262) · iki paralellik (:124,:279) · üç belge senkronu (:151,:300 + Karar-Takip) | Kapsamdaki B.4-4/5/6/7/9 birleştirmeleri yapılmadı; aynı kural hâlâ birden çok yerde yazıyor. | hayır | hayır |
| IC-01 | parti-09 | ✅ | TUTAR | ✅ | discTest.ts:135-147 discDimensionLabel · mentor/page.tsx:30-33 · disc-dimension-label.test.ts (4 dosyada İngilizce ad yok) · arketip sözlükleri KARAR-45'e bırakıldı (satırda yazılı) | — | — | — |
| IC-09 | parti-10 | ✅ | ÇÜRÜDÜ | 👁 İNSAN GÖZÜ (kod ✅) | admin.ts:211-217 5 şablon · correctionNotePresets.test.ts:23-46 yalnız anahtar kelime kara listesi · e-posta çerçevesi be emailService.ts:196-206 "Başvurunuz şu an onaylanmadı" | "Azarlanmadan okuyor" tonu ve e-postanın bütün hâli (onaylanmadı çerçevesiyle) yalnız canlıda insanla doğrulanır. | hayır | hayır |
| IC-05 | parti-09 | ✅ | TUTAR | ✅ | be zodLocale.ts:40-58 + config.ts:5 global yükleme · zod-locale.unit.test.ts (uzunluk/zorunlu/biçim + negatif sızıntı + özel mesaj önceliği) | — | — | — |
| KR-01 | parti-07 | ✅ | TUTAR | ✅ | be seedGuard.ts:28-66 fail-closed 3 şart + ?host= reddi · prisma/seed.ts:296-299 guard ilk satır, öncesinde DB yazımı yok · seedGuard.unit.test.ts | — | — | — |
| P-02 | parti-06 | ✅ | ÇÜRÜDÜ | 🔁 SONRADAN DEĞİŞTİ | P-02 (#211, 2026-09-20) sonra F-27 (be #86, 2026-09-21) conversationController.ts:23,279-288 listeyi 30 ile sınırladı · menti/page.tsx:108-110 items.length sayıyor, total değil | Güncel hâl ≤30 talepte ölçütü karşılıyor; 30'dan fazla konuşmada sayı 30'da takılır (yanıttaki total kullanılmıyor). | hayır | hayır |
| P-03 | parti-06 | ✅ | TUTAR | ✅ | DiscRecallCard.tsx:114-126 · menti/page.tsx:249 mount · disc-recall-card.test.tsx:25-35 | — | — | — |
| P-12 | parti-06 | ✅ | TUTAR | ✅ | be mentorMetricsController.ts:107-111,131 · certification.service.ts:242-248 aynı alanı yazıyor · mentor/page.tsx:196-208 · parti mutasyonu kırmızıya döndü (tekrar koşulmadı) | — | — | — |
| Y-08 | parti-09 | ✅ | ÇÜRÜDÜ | ⚠️ KISMEN | privateAreaMetadata.ts:12-14 + 7 layout · private-area-noindex.test.ts meta'yı ölçüyor · publicRoutes.ts:21-29 robots Disallow /admin /platform /onboarding /menti /mentor /messages /dashboard | Disallow'lu yollarda arama motoru noindex'i okuyamaz (URL dizine girebilir); "arama sonucunda görünmüyor" yalnız canlıda doğrulanır. | hayır — sayfalar zaten oturum ister, içerik sızmaz | hayır |
| KR-13 | parti-08 | ✅ | TUTAR | ✅ | be tests/helpers/probeGuard.ts:12-30 · cron-probe.ts:22 · k1-probe.ts:14 (PrismaClient'tan önce) · probeGuard.unit.test.ts (2 negatif) | — | — | — |
| KR-14 | parti-08 | ✅ | TUTAR | ✅ | be tests/helpers/assertTestDatabase.ts:52-59 databaseIdentity (-pooler/port/harf) · :111-124 · globalSetup.ts:91 requireDistinct · assertTestDatabase.test.ts:51+ | — | — | — |
| P-13 | parti-06 | ✅ | TUTAR | ✅ | be mentorMetricsController.ts:114-122 sayı≡liste · mentor/page.tsx:245-256 · mentor-metrics.unit.test.ts:48-63 | — | — | — |
| F-32 | parti-09 | ✅ | TUTAR | ✅ | queryCache.ts · useQuery.ts:50-92 · client.ts:94-109 invalidate · query-cache-f32.test.tsx (9) · "sonra commit yok" iddiası yanlış (d6281fa, 2ccfe23, 56c8688) ama mekanizma sağlam | — | — | — |
| AN-18 | parti-10 | ✅ | TUTAR | ✅ | meetings/page.tsx:87-100 "Görüşmeye katıl" · meetings-location.test.tsx:62-83 | — | — | — |

## Notlar

### YN-13 — ✅ → ⚠️ KISMEN (parti-11)
Başarı ölçütü "Public repoda kişi adı geçmiyor". Çatı reposunda KVKK metinleri (kasıtlı istisna) ve GitHub kullanıcı adı içeren bağlantılar dışında geçiş kalmadı. Ancak backend reposunda git'in izlediği `.claude/settings.local.json` dosyasında (satır 4 ve 21) kişi adı içeren yerel klasör yolu hâlâ duruyor. Kuyruk satırının kendisi "BITTI (kısmen, PO elle işi kaldı)" diyor, `03-PO-ELLE-ISLER.md:151` de bunu kaydetmiş. Ölçüt bugün karşılanmıyor, bu yüzden ✅ değil ⚠️.

### F-06 — ✅ → ⚠️ KISMEN (parti-05)
`logger.ts:16-41` `writeLog` DB hatasını kendi içinde yakalayıp `console.error` basıyor ve hiçbir zaman reject etmiyor. Bu davranış F-06'dan önce de vardı (`git show 19e7703:src/services/logger.ts` satır 31). Sonuç olarak `adminController.ts:844` `.catch(...)` hiç çalışamayan bir dal. F-06'nın asıl etkisi `await` ile satırın yanıttan önce yazılması; test (`algorithm-weights-manual.test.ts:160-181`) de yalnız bunu ölçüyor. Ölçüt olan "hata yutulmuyor" logger sayesinde kodda karşılanıyor, ama hata yolunu ölçen bir test yok.

### U-14 — ✅ → ⚠️ KISMEN (parti-07)
Satırın başlığı "süresi dolmuş davet/sıfırlama ekranları". Davet ekranı tamam, testi de var. Sıfırlamada `_ResetPasswordContent.tsx` "Yeni bağlantı talep et" bağlantısını yalnız token HİÇ yokken gösteriyor. Token var ama süresi dolmuşsa form gönderiliyor, sunucu reddediyor ve `ResetPasswordForm.tsx:31-33` yalnız bir hata metni gösteriyor. Bu durumda tek bağlantı "Giriş sayfasına dön" (`:66-70`), "yeni link iste" düğmesi yok.

### YN-14 — ✅ → ⚠️ KISMEN (parti-11)
Kapsam: `konsey-yonetisim-2026-09-21.md:356-363`'teki B.4-3/4/5/6/7/9/10 birleştirmeleri. Yapılan tek iş, B.4-3 içindeki ÇELİŞKİ paragrafını tek kopyaya indirmek. B.4-10 (Model Yönlendirme, `CLAUDE.md:292`) da fiilen kısa. Ölçüt "aynı kural iki yerde yazmıyor" ama bugün:
- `TEST_DATABASE_URL` uyarısı üç yerde: `CLAUDE.md:32`, `:204`, `:262`.
- İki ayrı paralellik kuralı: `:124`, `:279`.
- Belge senkronu yükümlülüğü üç yerde: `:151`, `:300` ve Karar-Takip KURAL 2.
- Submodule ikilisi: `:219`, `:224`.

### IC-09 — ✅ → 👁 İNSAN GÖZÜ (kod ✅) (parti-10)
Ölçüt, kullanıcının e-postadaki tonu nasıl algıladığı. Test yalnız bir anahtar kelime kara listesi ile sayı/sıra kontrolü yapıyor, tonu ölçmüyor. Şablon metni, `emailService.ts:196-206` içinde "Başvurunuz şu an onaylanmadı… dilerseniz tekrar başvurabilirsiniz" çerçevesiyle gidiyor (düzeltme isteği `adminController.ts:682-685` üzerinden `approved:false`). E-postanın bütün hâlinin azarlayıcı olup olmadığı yalnız canlıda bir insanın okumasıyla doğrulanabilir. Kod kısmı ✅.

### P-02 — ✅ → 🔁 SONRADAN DEĞİŞTİ (parti-06)
- P-02 çatı #211 ile 2026-09-20'de merge edildi. Sayı `menti/page.tsx:108-110`'da `conversationsData.items` sayılarak bulunuyor.
- Bir gün sonra F-27 (backend #86, `b5415bd`, 2026-09-21) `/api/conversations`'a sayfalama ekledi: `CONVERSATION_PAGE_DEFAULT = 30` (`conversationController.ts:23`, `:279-288`).
- FE, `limit` göndermiyor ve yanıttaki `total` alanını kullanmıyor (`conversations.ts:47-48`). Bu yüzden 30'dan fazla konuşması olan mentide sayaç 30'da takılır.
- ≤30 durumda ölçüt karşılanıyor. Parti bu backend değişikliğini görmedi, çünkü yalnız FE dosyalarının geçmişine baktı.

### Y-08 — ✅ → ⚠️ KISMEN (parti-09)
Test, layout'ların `robots:{index:false}` dışa aktardığını gerçekten ölçüyor. Ancak `publicRoutes.ts:21-29`'daki robots.txt Disallow listesi `/admin`, `/platform`, `/onboarding`, `/menti`, `/mentor`, `/messages`, `/dashboard` yollarını taramaya kapatıyor. Bu yollarda tarayıcı sayfayı açamadığı için noindex etiketini de okuyamaz; dışarıdan bağlantı verilen URL yalnız adres olarak dizine girebilir. Kuyruk satırı bu sınırı kendisi yazmış (F-29 kararı korunmuş). Ölçüt olan "arama sonuçlarında görünmüyor" bu yollarda mekanizma olarak güvenceli değil ve sonuç yalnız canlıda (arama konsolu) doğrulanabilir.
