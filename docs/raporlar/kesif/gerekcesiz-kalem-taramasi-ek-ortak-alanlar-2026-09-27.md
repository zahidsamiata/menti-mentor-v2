> 📸 DONDURULMUŞ (2026-09-27) — fotoğraf; güncellenmez. Güncel durum: `docs/otonom/00-KUYRUK.md` (AJ-46 · AN-54 ayağı).
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-27 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> Ana belge: `gerekcesiz-kalem-taramasi-2026-09-26.md` (🧊, değiştirilmedi). Salt-okuma; **hiçbir şey silinmedi, silme önerilmedi** (silme protokolü: gerekçe → ikame → arşiv → karantina 🔵 → gerçek silme 🔴).

# AN-54 EKİ · Ortak adlı alanlar — model bazlı ikinci geçiş (2026-09-27)

## Neden bu ek
Ana belge kapsam beyanı (`:16`): *"Tam-kelime sayımı alan adını model ayırmadan sayar; ortak adlı alanlar (`notes`, `description`, `location`, `status` …) başka modelde kullanıldığı için bu taramada kaçabilir. Ortak adlı alanlar için model-bazlı ikinci geçiş YAPILMADI."* Bu ek o ikinci geçiştir.

## Kapsam beyanı
- **Şema:** backend `origin/main` @ `b79547d` → `prisma/schema.prisma` (1327 satır).
- **Ortak adlı alan:** en az **iki modelde** aynı adla geçen skaler/enum alan. `id · createdAt · updatedAt · tenantId · userId` hariç (her modelde var, ayrı denetlendi). Sonuç: **36 ad · 105 (model, alan) çifti.** (`notes` / `location` bugünkü şemada iki modelde geçmiyor → ortak ad değil; ana belgenin ilk geçişinde zaten sayıldılar.)
- **Model bazlı kullanım ölçüsü:** her model için `src/` altında modele erişen dosyalar (`prisma.<model>` · `tx.<model>` · tip adı) bulundu; alan adı **o dosyalarda** aranınca eşleşen dosya sayısı = "model bağlamında kullanım". 0 ya da 1 çıkan çiftler **elle, satır satır** okundu (ilişki `include`'u ile dolaylı okuma dahil).
- **Niyet araması:** `git log origin/main -S<alan> --reverse -- prisma/schema.prisma` + şema yorumu + `docs/` araması + kod yorumu.
- Betik: tek seferlik Python (şema ayrıştırma + dosya eşleştirme), çıktı aşağıdaki sayılarla tekrarlanabilir.

## Sayım
| | Adet |
|---|---|
| Ortak ad / (model, alan) çifti | 36 / 105 |
| Model bağlamında 0 dosya | 8 |
| Model bağlamında 1 dosya | 29 |
| Elle okununca **gerçekten okunmayan/yazılmayan** | **10** (6 sertifika ikizi + `qualityMultiplier` + `hiddenAt` + SJT `scenario`/`label`) |
| Bunlardan **GEREKÇE BULUNAMADI** | **0** |
| Yanlış alarm (ilişki `include`'u ile okunuyor) | 5 |

## Bulgular (elle doğrulanmış)
| Model.alan | Model bağlamında kullanım (dosya:satır) | Niyet araması | Sonuç | Kuyrukta |
|---|---|---|---|---|
| `UserProfile.isCertified` · `certificationStatus` · `certScore` · `certifiedAt` · `certAttempts` · `cooldownUntil` (6 alan) | **0 oku · 0 yaz** UserProfile üzerinden. Aynı adlı TenantMembership alanları canlı: `certification.service.ts:245-248` yazar, `adminController.ts:458-463` `prisma.tenantMembership` üzerinden okur. Kod yorumu ikameyi söylüyor: `scoring.service.ts:165-166` "TenantMembership'ten okunmalıdır — UserProfile'daki cert alanları kullanılmaz" · `mentorMetricsController.ts:63` "sertifika tek kaynak; UserProfile değil" | İlk ekleyen `de6be04` (2026-07-07, gövde yok, PR yok). Belge: `docs/kararlar/09-DURUM.md:147` "`UserProfile.isCertified` **bakımsız** (hiç yazılmıyor) olduğu için kullanılmadı" | **GEREKÇE VAR** (niyet: sertifika durumu; kurum-bazlı TenantMembership'e taşınınca ikiz kaldı) — ilk geçişte ad TenantMembership'te kullanıldığı için görünmemişti | — (satır yok; `UserProfile.qualityMultiplier` ikizi aynı desen: KT D3) |
| `UserProfile.qualityMultiplier` | 0 (kontrol) — canlı `TenantMembership.qualityMultiplier` | KT "D3" satırı (bilinen ikiz) | GEREKÇE VAR (bilinen) | KT D3 |
| `LearningStageHide.hiddenAt` | Yalnız `@default(now())` ile yazılıyor; hiçbir sorgu okumuyor (`learningJourney.service.ts:128,194,285,399,422,444,463,473` → `stageId`/`tenantId` seçiyor). İkiz desen `QuestionHide.hiddenAt` OKUNUYOR (`questionService.ts:113-115`, gizlenen soru listesi sıralaması) | İlk ekleyen `ae78fb0` (2026-07-27, "öğrenme yolculuğu motoru + STK paneli"); şema yorumu: "QuestionHide ile aynı desen" | GEREKÇE VAR (desen gereği denetim izi; okuma tarafı yalnız soru gizlemede bağlandı) | — (E-3b'nin "gizleneni geri aç" ikizi öğrenme aşamasında yok — yalnız not) |
| `SjtQuestion.scenario` · `SjtOption.label` | `sjt-scorer.ts:48-61` soruları `include: { options: true }` ile okuyup yalnız `code`/`key`/`weights` kullanıyor; senaryo metnini ya da şık etiketini kullanıcıya **gösteren uç yok** (FE'de SJT ekranı yok) | `de6be04` + `docs/arsiv/icerik/sjt-sorulari-2026-08-15.md` (içerik bankası) | GEREKÇE VAR (içerik bankası; gösterim ekranı yazılmadı) | F-09 · AN-04 (KARAR-57/58/62) |

**Yanlış alarm (5):** `CertificationOption.questionId/key/label` (`certification.service.ts:164,197,313-315`) · `SjtOption.questionId/key` (`sjt-scorer.ts:50,61`) — ilişki `include` ile okunuyor, model adı dosyada geçmediği için ölçüde 0 çıktı. `CertificationQuestion.scenario` ayrı modeldir, canlı (`certification.service.ts:282,312`).

**1 dosyalı 29 çiftin geri kalanı** (Club · ClubMembership · InvitationTemplate · JobListing · LearningStage · MatchFeedback · MeetingCheckIn · MentorshipAgreement · PasswordResetToken · PendingTag · QuestionHide · SjtQuestion.code/isActive · SuspicionReport · IndustryNode): alanın tek dosyası o modelin kendi denetleyicisi/servisi — **canlı**, aday değil.

## Sonuç
- İkinci geçiş **yeni GEREKÇE BULUNAMADI kalemi çıkarmadı** (ana belgedeki 2 aynen geçerli: `Tenant.verifiedBy` · `ProfileSource.SJT_ENRICHED`).
- Görünür olan yeni kalem: **UserProfile'daki 6 sertifika ikizi** — niyeti belli, ikamesi kodda yorumlu. Silme önerilmez; ileride şema temizliği gündeme gelirse silme protokolünün 1-2. adımı bu tabloyla hazır.
- Kod kalemleri (fonksiyon/dosya) bu ekin de kapsamı dışında — onlar E-1 ekinde (`hayalet-envanter-niyet-kaniti-ek-2026-09-27.md`) ve `e3-baglanmamis-uclar-2026-09-25.md`'de.
