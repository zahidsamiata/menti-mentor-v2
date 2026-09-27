> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-26 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Doğrulama fotoğrafı; güncel durum `docs/otonom/00-KUYRUK.md`. Kaynak: `kod-inceleme-2026-09-24.md` [teyit gerek] maddeleri (OTONOM-PROMPT K5-Y1).

# K5-Y1 · kod-inceleme [teyit gerek] doğrulaması (2026-09-26)

Kaynak: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` içinde `[teyit gerek]` geçen tüm maddeler (A2 ve A4 alt-iddiaları dahil). A6 ve A8 raporda **[D]** etiketli, bu yüzden kapsam dışı: A6 → KR-09 BITTI, A8 → KR-11 BEKLIYOR (🔴 KARAR-78).

## Sayım
| Toplam | Kuyrukta kapanmış | DOĞRULANDI | ÇÜRÜDÜ | ❓ |
|---|---|---|---|---|
| 21 | 15 | 4 | 1 | 1 |

## Tablo
| Madde | Kısa | Kuyruk karşılığı + durum | Sonuç | Kanıt |
|---|---|---|---|---|
| A2 (alt iddia) | `/disc-test` kurum yüklenmediği için sonsuz yükleniyor | KR-03 · BITTI | kuyrukta kapandı: KR-03 | (ek not) `AuthTenantBridge.tsx` artık kurumu oturumdan (`useAuth().tenant`) alıyor. `disc-test/page.tsx:30` beklemesi o kaynağa bağlı. |
| A4 (canlı etkisi) | Ağırlık ayarı ölçek hatasının canlıdaki etkisi | KR-07 · ✅ BITTI | kuyrukta kapandı: KR-07 | (ek not) "FeedbackLog'a yazan ekran yok" iddiası hâlâ doğru: `frontend/src` içinde `feedback-logs` araması boş (harf duyarsız). Tek yazma yeri `feedbackLogController.ts:86` (`POST /api/feedback-logs`, `server.ts:126`). Canlıdaki kayıt sayısı DB'siz ölçülemez (PO işi). |
| A7 | Müsaitlik hata sonrası kaydedilince blokları siliyor | KR-10 · BITTI | kuyrukta kapandı: KR-10 | — |
| A9 | Randevu müsaitlik uyarısı 3 saat kayık | KR-12 · BITTI | kuyrukta kapandı: KR-12 | — |
| B7 | Görüşme bağlantısı doğrulaması | GV-03 · BITTI | kuyrukta kapandı: GV-03 | — |
| B8 | OAuth yolunda onay kapısı eksik | yok (satır açılmamış, U-08 ile ilişkisi ❓ olarak bırakılmış) · U-08 BITTI, ama yalnız eşleştirme uçlarını kapsıyor | **DOĞRULANDI** | Şifreli giriş onay bekleyeni (PENDING) reddediyor: `authController.ts:380-385` → 403 `HESAP_ONAY_BEKLENIYOR`. OAuth yolu ise `approvalStatus`'a hiç bakmıyor. Mevcut kullanıcıda seçim `oauthService.ts:38` (onay durumu seçilmiyor), anahtar `:82`'de veriliyor. Yeni PENDING kullanıcıya da `:149`'da anahtar veriliyor. Ortak kapı PENDING'i bilerek geçiriyor (`membershipAccess.ts:13-14`, `:35-37` yalnız REJECTED ve pasif hesabı kesiyor). Onay kapısı yalnız şu uçlarda var: `matchingController.ts:74,127` ve `userController.ts:55,209`. `approvalStatus` hiç okunmayanlar: `conversationController`, `meetingController`, `agreementController`, `sjtScoringController`, `matchRequestController` (tarama `src/controllers src/middleware src/routes`). Sonuç: OAuth ile gelen onaysız kullanıcı bu uçları kullanabiliyor. Şifreyle gelen aynı kullanıcı hiç anahtar alamıyor. |
| B9 | Kurumun dondurulması veya reddi erişime yansımıyor | yok (GV-10 kapsamı sanılmış, satır açılmamış). GV-10 ✅ BITTI ama yalnız kullanıcı düzeyinde | **DOĞRULANDI** | Dondurma yalnız `Tenant.isActive=false` yazıyor (`platformController.ts:389`). Ret yalnız `verificationStatus='REJECTED'` yazıyor (`:323-329`). Kurum kapısı `requireTenant` yalnız kurumun var olup olmadığına bakıyor (`tenant.ts:39-46`). `getCachedTenant` `isActive` ve `verificationStatus` alanlarını seçmiyor (`tenantCache.ts:45-49`). `src` içinde erişim yolunda `tenant.isActive` okuyan kod yok; tek okuma yönetici istatistiği/ayarında (`adminSettingsController.ts:238,301`). OAuth yeni kayıt (`oauthService.ts:102`) ve form kaydı (`authController.ts:158`) yalnız `PENDING_REVIEW`'u engelliyor, REJECTED ya da dondurulmuş kurumu engellemiyor. GV-10'un kendi kanıtı bu açığı yazmıştı ("getCachedTenant tenant isActive'ini seçmiyor") ama düzeltme kapsamına girmedi. |
| B10 | Kurum-içi rol kaynağı JWT | GV-10 · ✅ BITTI | kuyrukta kapandı: GV-10 | (ek not) `tenant.ts:111-115` rolü üyelikten okuyor. |
| B11 | E-posta şablonlarında girdi kaçışı | GV-15 · BITTI | kuyrukta kapandı: GV-15 | — |
| C2 | `cron-probe.ts` korumasız | KR-13 · BITTI | kuyrukta kapandı: KR-13 | — |
| C3 | Test DB koruması atlanabiliyor | KR-14 · ✅ BITTI | kuyrukta kapandı: KR-14 | — |
| C4 | E2E koruması lokalde etkisiz | KR-15 · BITTI | kuyrukta kapandı: KR-15 | — |
| D2 | Aynı saate iki randevu onaylanabiliyor | KR-17 · BITTI | kuyrukta kapandı: KR-17 | — |
| D3 | RENEWED anlaşma aktif listeden düşüyor | KR-18 · BITTI | kuyrukta kapandı: KR-18 | — |
| D4 | Çift engeli tek yönlü | KR-19 · ✅ BITTI | kuyrukta kapandı: KR-19 | — |
| D5 | Ret sonrası tekrar başvuru ve geri onay bozuk | KR-20 · BEKLIYOR (🔴 KARAR-72, CEVAPSIZ) | **DOĞRULANDI** | (a) `selfServeController.ts:244`: REJECTED kurumun adresi (slug) "boş" sayılıyor. Kayıt `:283` `tx.tenant.create` içinde aynı adresle yeniden deneniyor, ama `slug @unique` (`schema.prisma:184`). Sonuç: benzersizlik hatası. `errorHandler.ts` bu hatayı ayrıca yakalamıyor ve jenerik 500 `INTERNAL` dönüyor. (b) `rejectUser` hesabı `isActive:false` yapıyor (`adminController.ts:693+`, update `data.isActive:false`). `approveUser` `isActive`'e dokunmuyor (`adminController.ts:607-617`). Onaylanan kullanıcı girişte `authController.ts:372-377` → 403 `HESAP_PASIF` alıyor, ortak kapıda da `membershipAccess.ts:35` → 401. |
| D6 | Rapor sıklığı okunmuyor | KR-21 · ✅ BITTI | kuyrukta kapandı: KR-21 | — |
| D7 | verify.sh ≠ CI | KR-22 · ✅ BITTI | kuyrukta kapandı: KR-22 | — |
| D8 | Belgeler koddan geride | yok. Kuyrukta ❓ olarak bırakılmış (K-20 yinelenen belge senkronu mu, ayrı iş mi belirsiz) | **DOĞRULANDI** | `docs/kararlar/09-DURUM.md:6` → "Son güncelleme: 2026-09-20". `:33` → "Backend main HEAD: `b6187c1`", gerçek HEAD `14877f7`. `:36` açık PR bilgisi eski ("docs PR #96/#97"). Bu dosyaya son commit 2026-09-25'te (YN-09/YN-10, yalnız taşıma/atıf); içerik güncellenmemiş. |
| D10 | Merge sırası: backend #90 önce, çatı #264 sonra | yok (operasyonel) | **ÇÜRÜDÜ** | İkisi de merge edilmiş: backend `ff5f9f9` "Merge pull request #90", çatı `0ae4a5a` "Merge pull request #264". Çatı pointer'ı bugün backend main HEAD'i gösteriyor (`14877f7` = `14877f7`), yani sarkma yok. |
| D11 | Frontend'den çağrılmayan 55 backend ucu | K-13 → E-4 BEKLIYOR · E-3 BEKLIYOR | **❓ DOĞRULANAMADI** | Raporda uç listesi yok (K-13 notu: "uç listesi rapora alınmadı, bu turda yeniden çıkarılır"). 55 / 23 / 28 / 4 sayıları tam rota × frontend çağrı envanteri çıkarılmadan teyit edilemez; bu iş Y1'in kapsamını aşıyor. İş zaten E-3/E-4'te bekliyor. |

## Kuyrukta karşılığı OLMAYAN DOĞRULANDI maddeler
1. **B8 · OAuth yolunda onay kapısı yok.** Onay bekleyen (PENDING) kullanıcı OAuth ile anahtar alıyor. Şifreli giriş bunu 403 ile kesiyor. Onay kapısı yalnız eşleştirme ve kullanıcı uçlarında var; sohbet, randevu, anlaşma ve istek uçlarında yok. Komşu uç karşılaştırması: `authController.ts:380` ↔ `oauthService.ts:82,149`. Not: `membershipAccess.ts:13-14` PENDING'i bilerek geçiriyor (bekleme ekranı `/api/auth/me` için), yani çözüm yolu (ortak kapı + beyaz liste mi, uç uç kapı mı) seçim ister. Yetki ve auth konusu, 🟡.
2. **B9 · Dondurulmuş veya reddedilmiş kurumun kullanıcıları her şeyi kullanmaya devam ediyor.** `requireTenant` ve `tenantCache` kurum durumunu hiç okumuyor. OAuth ve form kaydı REJECTED veya dondurulmuş kuruma yeni üye alıyor. GV-10 kanıtında adı geçmiş ama düzeltilmemiş. Auth konusu, 🟡.
3. **D8 · `09-DURUM.md` 6 gün geride** (HEAD, açık PR ve son güncelleme bilgisi bayat). Belge işi; K-20 belge senkronuna mı katlanacağı, ayrı satır mı açılacağı strateji katmanının kararı.

(D5 DOĞRULANDI ama kuyrukta karşılığı var: KR-20, 🔴 KARAR-72 bekliyor.)
