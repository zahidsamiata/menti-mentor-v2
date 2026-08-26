> ⚠️ TASLAK (2026-08-25) — HUKUKÇU ONAYI OLMADAN YAYINLANMAZ.
> Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` (envanter C-5, kod gerçeği). Sıfırdan yazıldı.

# Kişisel Veri Saklama ve İmha Politikası

> **İmha yöntemi (avukat onaylı):** silme yerine **anonimleştirme** — kişinin kim olduğu anlaşılamayacak düzeyde olmak şartıyla — yeterlidir. Aşağıda esas alınmıştır.
> ⚠️ **Süreler UYDURULMAMIŞTIR.** "Kod gerçeği" = şu an sistemin fiilen yaptığı; "önerilen" = hukukçu/PO onayına sunulan taslak.
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
| Sistem/güvenlik kaydı | `SystemLog` | 90 gün sonra otomatik silinir | ✅ VAR (haftalık cron) | 90 gün (mevcut — güvenlik/iz sürme için makul) |
| Kimlik/profil/psikometrik | `User`, `UserProfile`, `UserResponse` | Hesap silme/anonimleştirmeye kadar (kullanıcı-tetikli) | ❌ YOK | Hesap kapanışından sonra **[öneri: X ay]** anonimleştirme — gerekçe: ihtilaf zamanaşımı süresince asgari saklama |
| Mesaj içeriği | `Message`/`Conversation` | Hesap kapanışında **yazarın içeriği `[silindi]`** olur (karşı tarafınki + sohbet iskeleti kalır) — madde 93 (PR bekliyor) | ❌ süre-bazlı YOK | **[öneri: X ay]** genel saklama; hesap kapanışında yazarın içeriği anonimleştirilir |
| Geri bildirim | `FeedbackLog`, `Feedback` | Süresiz (kodda "3 yıl" yorumu ama uygulanmamış) | ❌ YOK | **[öneri: 3 yıl]** sonra anonimleştirme — gerekçe: program kalite analizi + zamanaşımı |
| Görüşme/randevu | `Meeting`, `MeetingCheckIn` | Süresiz; hesap silmede kalıyor | ❌ YOK | **[öneri: X ay]** anonimleştirme |
| Oturum/şifre jetonu | `RefreshToken`, `PasswordResetToken` | `expiresAt`'e kadar; süre-bazlı otomatik purge yok | ⚠️ kısmi | Süresi dolanların düzenli temizliği (iş maddesi) |
| Taslak kurum başvurusu | `Tenant`+`User` (taslak) | 96 saat taslak kalırsa silinir | ✅ VAR | mevcut |

## Mevcut imha yetenekleri (kod — 2026-08-26 teyidi, madde 93 genişletildi, PR bekliyor)
- **Anonimleştirme (`anonymizeUser`) TEMİZLER:** ad, e-posta (anonim değere çevrilir), biyografi/uzmanlık, CV (gönüllülük/proje/eğitim), **sosyal medya bağlantıları (LinkedIn/Instagram), avatar bağlantısı**, kişilik verileri (DISC/mizaç/enneagram/"aha" kartı), test yanıtları, kurum-profil kişilik alanları. **YENİ (madde 93):** bağlı **serbest-metin** (yazarın **mesaj içeriği → `[silindi]`**, görüşme not/telefon/adres, geri-bildirim/talep/şikayet serbest metinleri, sözleşme menti-hedefi), **yüklenen fotoğrafın fiziksel dosyası** (diskten silinir), **oturum/erişim jetonları** (RefreshToken/PasswordResetToken silinir + üyelik pasife alınır → eski token'la işlem yapılamaz).
- **⚠️ Anonimleştirmenin SINIRI (dürüst):** kayıt anahtarı `userId` — **rastgele cuid, kişisel bilgi içermez** — bağlı kayıtlarda **kalır** (karşı tarafın geçmişi bozulmasın diye). Bu yüzden bu düzeyin KVKK imha yükümlülüğünü tam karşılayıp karşılamadığı **hukukçuya soruldu (kapak H-9).** "Tam geri döndürülemez anonim" **vaadi verilmez.**
- **"Kalıcı silme" (`hardDeleteUser`) — madde 39:** FK kısıtı nedeniyle gerçek silme çalışmıyordu → **anonimleştirmeye yönlendirildi** (PO kararı). Kullanıcıya "silindi" DENMEZ; dürüst mesaj: *"Hesabınız kapatıldı ve kimliğinizle ilişkilendirilebilir verileriniz geri döndürülemez şekilde anonimleştirildi; ortak kayıtlarda kimliğiniz kaldırıldı."*

## Bilinen boşluklar (dürüst — iş maddeleri)
- **Anonimleştirme genişletildi (madde 93 — PR bekliyor):** serbest metin + fiziksel foto + oturum artık temizlenir. **KALAN sınır:** `userId` (cuid) bağı — hukukçu değerlendirmesine bağlı (H-9). Tam "geri döndürülemez" vaadi verilmez.
- **Genel otomatik imha/periyodik anonimleştirme süreci YOK** (yalnız SystemLog) → `00-KARAR-TAKIP` madde 81.
- **hardDelete (madde 39):** anonimleştirmeye yönlendirildi (PR bekliyor); "silme" endpoint'i artık patlamaz, gerçeği söyler.
- **FE hak-kullanım ekranı YOK** (kullanıcının kendi hesabını kapatma/anonimleştirme akışı) → iş maddesi (madde 40/84 ile bağlı).
- **"Ghost/30 gün uyku modu"** (madde 35) yalnız tasarım; kodda yok — saklama süresi olarak henüz geçerli değil.

> Bu politikadaki **[öneri]** süreler hukukçu ve PO onayından sonra kesinleşir ve teknik olarak (cron + anonimleştirme) uygulanır. Onaya kadar "süresiz saklama" gerçeği dürüstçe beyan edilir.
