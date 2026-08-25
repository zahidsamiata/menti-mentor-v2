> ⚠️ TASLAK (2026-08-25) — HUKUKÇU ONAYI OLMADAN YAYINLANMAZ.
> Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` (envanter C-5, kod gerçeği). Sıfırdan yazıldı.

# Kişisel Veri Saklama ve İmha Politikası

> **İmha yöntemi (avukat onaylı):** silme yerine **anonimleştirme** — kişinin kim olduğu anlaşılamayacak düzeyde olmak şartıyla — yeterlidir. Aşağıda esas alınmıştır.
> ⚠️ **Süreler UYDURULMAMIŞTIR.** "Kod gerçeği" = şu an sistemin fiilen yaptığı; "önerilen" = hukukçu/PO onayına sunulan taslak.
>
> 🔴 **DÜRÜST DURUM (kod teyidi 2026-08-25):** Mevcut anonimleştirme kimlik/iletişim/profil/sosyal-medya/kişilik alanlarını temizler
> **ama HENÜZ TAM anonimleştirme değil, kısmi (takma-adlaştırma) düzeyindedir:** kayıt anahtarı (kullanıcı kimliği) değişmediği ve mesaj
> içerikleri ile yüklenen fotoğraf dosyası silinmediği için, bağlı kayıtlar üzerinden yeniden-tanımlanma riski **teorik olarak sürer.**
> Tam anonimleştirme bir **iş maddesidir** (madde 93). Bu metin, "geri döndürülemez tam anonimleştirme" **vaadi VERMEZ** — mevcut gerçeği beyan eder.

| Veri kategorisi | Tablo | Kod gerçeği (şu an) | Otomatik imha? | [PO/HUKUKÇU ONAYI] önerilen süre + gerekçe |
|---|---|---|---|---|
| Sistem/güvenlik kaydı | `SystemLog` | 90 gün sonra otomatik silinir | ✅ VAR (haftalık cron) | 90 gün (mevcut — güvenlik/iz sürme için makul) |
| Kimlik/profil/psikometrik | `User`, `UserProfile`, `UserResponse` | Hesap silme/anonimleştirmeye kadar (kullanıcı-tetikli) | ❌ YOK | Hesap kapanışından sonra **[öneri: X ay]** anonimleştirme — gerekçe: ihtilaf zamanaşımı süresince asgari saklama |
| Mesaj içeriği | `Message`/`Conversation` | **Süresiz** — hesap silmede bile silinmiyor (madde 39) | ❌ YOK | **[öneri: X ay]** + hesap silmede anonimleştirme/silme (madde 39 düzeltmesine bağlı) |
| Geri bildirim | `FeedbackLog`, `Feedback` | Süresiz (kodda "3 yıl" yorumu ama uygulanmamış) | ❌ YOK | **[öneri: 3 yıl]** sonra anonimleştirme — gerekçe: program kalite analizi + zamanaşımı |
| Görüşme/randevu | `Meeting`, `MeetingCheckIn` | Süresiz; hesap silmede kalıyor | ❌ YOK | **[öneri: X ay]** anonimleştirme |
| Oturum/şifre jetonu | `RefreshToken`, `PasswordResetToken` | `expiresAt`'e kadar; süre-bazlı otomatik purge yok | ⚠️ kısmi | Süresi dolanların düzenli temizliği (iş maddesi) |
| Taslak kurum başvurusu | `Tenant`+`User` (taslak) | 96 saat taslak kalırsa silinir | ✅ VAR | mevcut |

## Mevcut imha yetenekleri (kod — 2026-08-25 teyidi)
- **Anonimleştirme (`anonymizeUser`) TEMİZLER:** ad, e-posta (anonim değere çevrilir), biyografi/uzmanlık, CV (gönüllülük/proje/eğitim), **sosyal medya bağlantıları (LinkedIn/Instagram), avatar bağlantısı**, kişilik verileri (DISC/mizaç/enneagram/"aha" kartı), test yanıtları, kurum-profil kişilik alanları.
- **⚠️ Anonimleştirme ŞU AN TEMİZLEMEZ (madde 93 — açık uyum boşluğu):** (a) **mesaj içerikleri** (`Message.content`) · (b) **yüklenen fotoğrafın fiziksel dosyası** (yalnız bağlantı temizlenir, dosya diskte kalır) · (c) **görüşme not/telefon alanları** · (d) **kayıt anahtarı (kullanıcı kimliği) değişmez** → bağlı tablolar üzerinden teorik yeniden-tanımlanma. Bu nedenle mevcut düzey **takma-adlaştırma**dır; tam anonimleştirme iş maddesidir.
- **Kalıcı silme (`hardDeleteUser`):** bir kısım tabloyu siler; **ancak Meeting/Feedback/Message gibi kayıtlar teknik kısıt (FK) nedeniyle şu an silinemiyor → işlem gerçek veride başarısız olabilir** (madde 39 — düzeltilecek).

## Bilinen boşluklar (dürüst — iş maddeleri)
- **Tam anonimleştirme eksik (takma-adlaştırma düzeyi)** → mesaj içeriği + fiziksel foto dosyası + kayıt-anahtarı bağı temizlenmiyor → `00-KARAR-TAKIP` **madde 93**.
- **Genel otomatik imha/periyodik anonimleştirme süreci YOK** (yalnız SystemLog) → `00-KARAR-TAKIP` madde 81.
- **hardDelete FK kısıtı** (madde 39) — KVKK silme hakkının fiilen çalışması için düzeltme gerekli.
- **"Ghost/30 gün uyku modu"** (madde 35) yalnız tasarım; kodda yok — saklama süresi olarak henüz geçerli değil.

> Bu politikadaki **[öneri]** süreler hukukçu ve PO onayından sonra kesinleşir ve teknik olarak (cron + anonimleştirme) uygulanır. Onaya kadar "süresiz saklama" gerçeği dürüstçe beyan edilir.
