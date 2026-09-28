> ⚠️ TASLAK (2026-08-25) — HUKUKÇU ONAYI OLMADAN YAYINLANMAZ.
> Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` (envanter C-5, kod gerçeği). Sıfırdan yazıldı.

# Kişisel Veri Saklama ve İmha Politikası

> **İmha yöntemi (avukat onaylı):** silme yerine **anonimleştirme** — kişinin kim olduğu anlaşılamayacak düzeyde olmak şartıyla — yeterlidir. Aşağıda esas alınmıştır.
> ⚠️ **Süreler UYDURULMAMIŞTIR.** "Kod gerçeği" = şu an sistemin fiilen yaptığı; "önerilen" = hukukçu/PO onayına sunulan taslak.
>
> ⚠️ GÜNCELLEME (2026-09-29): bu belgedeki tüm "madde 93 / madde 39 — PR bekliyor" ibareleri **bayat** — ikisi de backend PR #54 ile 2026-08-26'da canlıya girdi (`backend/src/services/gdprService.ts:77` `anonymizeUser`, `:266-267` `hardDeleteUser`→`anonymizeUser`). Ayrıntı: kapak Bölüm 10.
>
> **DÜRÜST DURUM (kod teyidi 2026-08-26, madde 93 genişletildi — PR bekliyor):** Anonimleştirme artık kimlik/iletişim/profil/sosyal-medya/kişilik
> alanlarına **EK OLARAK**: bağlı **serbest-metin** içerikleri (mesaj içeriği → `[silindi]`; görüşme not/telefon; geri-bildirim, talep, şikayet
> serbest metinleri; sözleşme menti-hedefi), **yüklenen fotoğrafın fiziksel dosyası** ve **oturum/erişim jetonları** temizlenir; hesap her kurumda pasife alınır.
> **⚠️ AMA "TAM geri döndürülemez anonimleştirme" DEĞİLDİR:** kayıt anahtarı `userId` — **rastgele bir kimlik (cuid); kişisel bilgi içermez** — bağlı
> kayıtlarda **kalır**, böylece karşı tarafın (görüşme/mesaj) geçmişi bozulmaz. Tüm serbest metin ve kimlik alanları temizlendiği için pratik yeniden-tanımlama
> güçtür; ancak bu düzeyin KVKK imha yükümlülüğünü **tam** karşılayıp karşılamadığı **hukukçuya soruldu (kapak H-9).** Bu metin, "geri döndürülemez tam
> anonimleştirme" **vaadi VERMEZ** — mevcut gerçeği beyan eder. (Detay: `00-KARAR-TAKIP` madde 93/39/96.)

| Veri kategorisi | Tablo | Kod gerçeği (şu an) | Otomatik imha? | [PO/HUKUKÇU ONAYI] önerilen süre + gerekçe |
|---|---|---|---|---|
| Sistem/güvenlik kaydı | `SystemLog` | 90 gün sonra otomatik silinir | ✅ VAR (haftalık cron) | 90 gün (mevcut — güvenlik/iz sürme için makul) · doğrulama 09-28: `backend/src/services/gdprService.ts:414` · `backend/src/services/cronScheduler.ts:18` |
| Kimlik/profil/psikometrik | `User`, `UserProfile`, `UserResponse` | Hesap silme/anonimleştirmeye kadar (kullanıcı-tetikli) | ❌ YOK | Hesap kapanışından sonra **[öneri: X ay]** anonimleştirme — gerekçe: ihtilaf zamanaşımı süresince asgari saklama |
| Mesaj içeriği | `Message`/`Conversation` | Hesap kapanışında **yazarın içeriği `[silindi]`** olur (karşı tarafınki + sohbet iskeleti kalır) — madde 93 ~~(PR bekliyor)~~ ⚠️ GÜNCELLEME (2026-09-29): canlıda (backend PR #54; `gdprService.ts:40`) | ❌ süre-bazlı YOK (2026-09-29 doğrulandı: kodda bilinçli olarak yazılmadı, süre avukat metnine bağlı — `gdprService.ts:429-431`) | **[öneri: X ay]** genel saklama; hesap kapanışında yazarın içeriği anonimleştirilir |
| Geri bildirim | `FeedbackLog`, `Feedback` | ~~Süresiz (kodda "3 yıl" yorumu ama uygulanmamış)~~ ⚠️ ÇELİŞKİ (2026-09-23, CS raporu): Kod tarafında 3-yıl purge UYGULANMIŞ — `gdprService.ts:370` 3-yıl purge + `cronScheduler.ts:89` haftalık cron VAR. Metin "süresiz/uygulanmamış" diyor; kod otomatik purge yapıyor → iki taraf çelişik, metin bayat. Kanıt: `gdprService.ts:370`, `cronScheduler.ts:89`. Karar PO'nun. ⚠️ GÜNCELLEME (2026-09-29): `origin/main`'de doğrulandı — `gdprService.ts:374-425` (`FeedbackLog` 3 yıl dolunca **silinir**, anonimleştirilmez) + `cronScheduler.ts:474` Pazar 03:00 UTC; backend PR #57 (2026-08-28). `Feedback` tablosu için süre-bazlı imha YOK. | ~~[ESKİ · 2026-09-29] ❌ YOK~~ ⚠️ GÜNCELLEME (2026-09-29): ✅ `FeedbackLog` VAR (3 yıl, silme) · ❌ `Feedback` YOK | **[öneri: 3 yıl]** sonra anonimleştirme — gerekçe: program kalite analizi + zamanaşımı |
| Görüşme/randevu | `Meeting`, `MeetingCheckIn` | Süresiz; hesap silmede kalıyor | ❌ YOK | **[öneri: X ay]** anonimleştirme |
| Oturum/şifre jetonu | `RefreshToken`, `PasswordResetToken` | `expiresAt`'e kadar; süre-bazlı otomatik purge yok | ⚠️ kısmi | Süresi dolanların düzenli temizliği (iş maddesi) |
| Taslak kurum başvurusu | `Tenant`+`User` (taslak) | 96 saat taslak kalırsa silinir | ✅ VAR | mevcut · doğrulama 09-28: `backend/src/services/cronScheduler.ts:120,195` |

## Mevcut imha yetenekleri (kod — 2026-08-26 teyidi, madde 93 genişletildi, PR bekliyor)
> ⚠️ GÜNCELLEME (2026-09-29): "PR bekliyor" bayat — madde 93 + 39 canlıda (backend PR #54, 2026-08-26). Kullanıcı bunu kendisi de başlatabilir: profil → "Hesabımı kapat" (`POST /api/me/delete-account`, `backend/src/routes/userRoutes.ts:210-214`; backend PR #59 + çatı PR #135). ⚠️ Kurumun **tek** yöneticisi hesabını kapatamaz (`gdprController.ts:132-139`) → kapak Bölüm 10 not N-4.
- **Anonimleştirme (`anonymizeUser`) TEMİZLER:** ad, e-posta (anonim değere çevrilir), biyografi/uzmanlık, CV (gönüllülük/proje/eğitim), **sosyal medya bağlantıları (LinkedIn/Instagram), avatar bağlantısı**, kişilik verileri (DISC/mizaç/enneagram/"aha" kartı), test yanıtları, kurum-profil kişilik alanları. **YENİ (madde 93):** bağlı **serbest-metin** (yazarın **mesaj içeriği → `[silindi]`**, görüşme not/telefon/adres, geri-bildirim/talep/şikayet serbest metinleri, sözleşme menti-hedefi), **yüklenen fotoğrafın fiziksel dosyası** (diskten silinir), **oturum/erişim jetonları** (RefreshToken/PasswordResetToken silinir + üyelik pasife alınır → eski token'la işlem yapılamaz).
- **⚠️ Anonimleştirmenin SINIRI (dürüst):** kayıt anahtarı `userId` — **rastgele cuid, kişisel bilgi içermez** — bağlı kayıtlarda **kalır** (karşı tarafın geçmişi bozulmasın diye). Bu yüzden bu düzeyin KVKK imha yükümlülüğünü tam karşılayıp karşılamadığı **hukukçuya soruldu (kapak H-9).** "Tam geri döndürülemez anonim" **vaadi verilmez.**
- **"Kalıcı silme" (`hardDeleteUser`) — madde 39:** FK kısıtı nedeniyle gerçek silme çalışmıyordu → **anonimleştirmeye yönlendirildi** (PO kararı). Kullanıcıya "silindi" DENMEZ; dürüst mesaj: *"Hesabınız kapatıldı ve kimliğinizle ilişkilendirilebilir verileriniz geri döndürülemez şekilde anonimleştirildi; ortak kayıtlarda kimliğiniz kaldırıldı."*

## Bilinen boşluklar (dürüst — iş maddeleri)
- **Anonimleştirme genişletildi (madde 93 — ~~PR bekliyor~~ ⚠️ GÜNCELLEME (2026-09-29): canlıda, backend PR #54):** serbest metin + fiziksel foto + oturum artık temizlenir. **KALAN sınır:** `userId` (cuid) bağı — hukukçu değerlendirmesine bağlı (H-9). Tam "geri döndürülemez" vaadi verilmez.
- ~~[ESKİ · 2026-09-29] **Genel otomatik imha/periyodik anonimleştirme süreci YOK** (yalnız SystemLog) → `00-KARAR-TAKIP` madde 81.~~
  ⚠️ GÜNCELLEME (2026-09-29): haftalık otomatik imha artık `SystemLog` (90 gün) + **`FeedbackLog` (3 yıl)** kapsar (`gdprService.ts:374-425`, `cronScheduler.ts:474`; backend PR #57); taslak kurum başvurusu (96 saat) ise ayrı, **günlük** bir işle temizlenir (`cronScheduler.ts:197` `runDraftTenantCleanup`, her gün 04:00 UTC — `:490-493`). **Hâlâ YOK:** mesaj, `Feedback`, görüşme, profil verisi için süre-bazlı imha + periyodik anonimleştirme → madde 81 kısmen açık.
- **hardDelete (madde 39):** anonimleştirmeye yönlendirildi ~~(PR bekliyor)~~; "silme" endpoint'i artık patlamaz, gerçeği söyler.
  ⚠️ ÇELİŞKİ (2026-09-23, CS raporu): Kod tarafında hardDelete→anonymize BİRLEŞTİRİLMİŞ (merged), "PR bekliyor" değil — `gdprService.ts:233` `hardDeleteUser`→`anonymizeUser`. Metin "PR bekliyor" diyor; kod tarafında uygulanmış → iki taraf çelişik, metin bayat. Kanıt: `gdprService.ts:233`. Karar PO'nun.
- ~~[ESKİ · 2026-09-29] **FE hak-kullanım ekranı YOK** (kullanıcının kendi hesabını kapatma/anonimleştirme akışı) → iş maddesi (madde 40/84 ile bağlı).~~
  ⚠️ GÜNCELLEME (2026-09-29): ekran VAR — profil sayfasında "Verilerimi indir" + "Hesabımı kapat" (`frontend/src/app/(dashboard)/profile/page.tsx:468`; backend PR #59 + çatı PR #135, 2026-08-29). Madde 84'ün başvuru e-postası ayağı hâlâ PO'da.
- **"Ghost/30 gün uyku modu"** (madde 35) yalnız tasarım; kodda yok — saklama süresi olarak henüz geçerli değil.

> Bu politikadaki **[öneri]** süreler hukukçu ve PO onayından sonra kesinleşir ve teknik olarak (cron + anonimleştirme) uygulanır. Onaya kadar "süresiz saklama" gerçeği dürüstçe beyan edilir.
