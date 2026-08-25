> ⚠️ TASLAK (2026-08-25) — HUKUKÇU ONAYI OLMADAN YAYINLANMAZ.
> Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` (envanter C-5, kod gerçeği). Sıfırdan yazıldı.

# Kişisel Veri Saklama ve İmha Politikası

> **İmha yöntemi (avukat onaylı):** silme yerine **anonimleştirme** — kişinin kim olduğu anlaşılamayacak düzeyde olmak şartıyla — yeterlidir. Aşağıda esas alınmıştır.
> ⚠️ **Süreler UYDURULMAMIŞTIR.** "Kod gerçeği" = şu an sistemin fiilen yaptığı; "önerilen" = hukukçu/PO onayına sunulan taslak.

| Veri kategorisi | Tablo | Kod gerçeği (şu an) | Otomatik imha? | [PO/HUKUKÇU ONAYI] önerilen süre + gerekçe |
|---|---|---|---|---|
| Sistem/güvenlik kaydı | `SystemLog` | 90 gün sonra otomatik silinir | ✅ VAR (haftalık cron) | 90 gün (mevcut — güvenlik/iz sürme için makul) |
| Kimlik/profil/psikometrik | `User`, `UserProfile`, `UserResponse` | Hesap silme/anonimleştirmeye kadar (kullanıcı-tetikli) | ❌ YOK | Hesap kapanışından sonra **[öneri: X ay]** anonimleştirme — gerekçe: ihtilaf zamanaşımı süresince asgari saklama |
| Mesaj içeriği | `Message`/`Conversation` | **Süresiz** — hesap silmede bile silinmiyor (madde 39) | ❌ YOK | **[öneri: X ay]** + hesap silmede anonimleştirme/silme (madde 39 düzeltmesine bağlı) |
| Geri bildirim | `FeedbackLog`, `Feedback` | Süresiz (kodda "3 yıl" yorumu ama uygulanmamış) | ❌ YOK | **[öneri: 3 yıl]** sonra anonimleştirme — gerekçe: program kalite analizi + zamanaşımı |
| Görüşme/randevu | `Meeting`, `MeetingCheckIn` | Süresiz; hesap silmede kalıyor | ❌ YOK | **[öneri: X ay]** anonimleştirme |
| Oturum/şifre jetonu | `RefreshToken`, `PasswordResetToken` | `expiresAt`'e kadar; süre-bazlı otomatik purge yok | ⚠️ kısmi | Süresi dolanların düzenli temizliği (iş maddesi) |
| Taslak kurum başvurusu | `Tenant`+`User` (taslak) | 96 saat taslak kalırsa silinir | ✅ VAR | mevcut |

## Mevcut imha yetenekleri (kod)
- **Anonimleştirme (`anonymizeUser`):** kimlik/profil alanlarını temizler, test yanıtlarını siler. **Ancak mesaj içeriği ve bazı geri bildirim serbest metinleri şu an anonimleştirilmiyor** (iş maddesi).
- **Kalıcı silme (`hardDeleteUser`):** bir kısım tabloyu siler; **ancak Meeting/Feedback/Message gibi kayıtlar teknik kısıt (FK) nedeniyle şu an silinemiyor → işlem gerçek veride başarısız olabilir** (madde 39 — düzeltilecek).

## Bilinen boşluklar (dürüst — iş maddeleri)
- **Genel otomatik imha/periyodik anonimleştirme süreci YOK** (yalnız SystemLog) → `00-KARAR-TAKIP` madde 81.
- **hardDelete FK kısıtı** (madde 39) — KVKK silme hakkının fiilen çalışması için düzeltme gerekli.
- **"Ghost/30 gün uyku modu"** (madde 35) yalnız tasarım; kodda yok — saklama süresi olarak henüz geçerli değil.

> Bu politikadaki **[öneri]** süreler hukukçu ve PO onayından sonra kesinleşir ve teknik olarak (cron + anonimleştirme) uygulanır. Onaya kadar "süresiz saklama" gerçeği dürüstçe beyan edilir.
