# ŞEMA DRIFT KEŞFİ — Fiziksel DB ↔ schema.prisma (F.8)

**📸 DONDURULMUŞ** · 2026-08-30 · salt-okuma keşif (DB'ye YAZILMADI, şema DEĞİŞMEDİ, migration YOK) · Kaynak: canlı Neon (`ep-fancy-tooth-ab4u5xhr`) `pg_catalog` + `information_schema` + `prisma migrate diff`

> **⭐ NEDEN VAR:** Üç-soru migration'ının DURAK B'sinde `migrate diff` **exit 2** döndü — `migrate status` "up to date" dese de fiziksel şema ile `schema.prisma` uyuşmuyor. Drift üç-soru migration'ından **KAYNAKLANMIYOR** (o migration'ın dört alanı diff'te GEÇMİYOR, drift-siz); **önceden vardı.** Bu keşif, Faz 4'ün ikinci migration'ının (**tenant silme + onDelete**) ÖN KOŞULU: `onDelete` FK'lere dayanır, FK yoksa `onDelete` de yoktur.

---

## §A — Özet (TAM SAYILAR)

- **`migrate diff` kapsamı:** exit **2** · değişen tablo: **4** (`InvitationTemplate` · `LearningStage` · `MentorshipAgreement` · `UserReport`) — rapordaki "4 tablo" ile **uyuştu** (iki adımlı doğrulama: tam çıktı pipe'sız alındı, `grep -c "Changed the"` = 4).
- **İncelenen FK:** 7 (6 aday + InvitationTemplate teyidi)
- **⭐ EN KRİTİK:** `MentorshipAgreement` 3 FK yok **VE 150/150 satır öksüz** → 🔴
- Ciddiyet: **🔴 1 grup** (MentorshipAgreement) · **🟡 2 grup** (LearningStage davranış · UserReport boş-eksik) · **🟢** (updatedAt default ×4 + InvitationTemplate FK)

---

## §B — 2.1 FK'lerin GERÇEK durumu (pg_constraint, `contype='f'`)

`confdeltype` harfleri: `a`=NO ACTION · `r`=RESTRICT · `c`=CASCADE · `n`=SET NULL · `d`=SET DEFAULT.
Şema tarafı: **hiçbir ilişkide açık `onDelete` YOK** → Prisma varsayılanı (opsiyonel ilişki→`SetNull`; zorunlu ilişki→`Restrict`).

| FK | canlıda VAR mı | kısıt adı | ON DELETE (canlı) | şema bekliyor | teşhis |
|---|:---:|---|---|---|---|
| `LearningStage.tenantId` → Tenant.id | ✅ VAR | `LearningStage_tenantId_fkey` | `r` = RESTRICT | opsiyonel → SET NULL (`n`) | **(b) davranış farklı** |
| `MentorshipAgreement.tenantId` → Tenant.id | ❌ YOK | — | — | zorunlu → RESTRICT | **(a) FK yok** |
| `MentorshipAgreement.mentorId` → User.id | ❌ YOK | — | — | zorunlu → RESTRICT | **(a) FK yok** |
| `MentorshipAgreement.mentiId` → User.id | ❌ YOK | — | — | zorunlu → RESTRICT | **(a) FK yok** |
| `UserReport.reporterUserId` → User.id | ❌ YOK | — | — | zorunlu → RESTRICT | **(a) FK yok** |
| `UserReport.targetUserId` → User.id | ❌ YOK | — | — | zorunlu → RESTRICT | **(a) FK yok** |
| `InvitationTemplate.tenantId` → Tenant.id | ✅ VAR | `InvitationTemplate_tenantId_fkey` | `c` = CASCADE | eşleşiyor | **FK farkı YOK** (yalnız updatedAt default) |

> Not: `migrate diff`'in `LearningStage` için "FK kaldır→yeniden ekle" demesi = FK VAR ama ON DELETE şemadan farklı (case b), FK'nin yokluğu DEĞİL. Diğer beşi yalnız "[+] Added" = fiziksel DB'de gerçekten YOK (case a).

---

## §C — 2.2 ÖKSÜZ KAYIT TARAMASI (⭐ en önemli — yalnız COUNT, dokunulmadı)

| Tablo.FK | öksüz satır | tablo toplam | not |
|---|:---:|:---:|---|
| `MentorshipAgreement.tenantId` | **150** | 150 | 🔴 hepsi öksüz |
| `MentorshipAgreement.mentorId` | **150** | 150 | 🔴 hepsi öksüz |
| `MentorshipAgreement.mentiId` | **150** | 150 | 🔴 hepsi öksüz |
| `UserReport.reporterUserId` | **0** | 0 | tablo boş |
| `UserReport.targetUserId` | **0** | 0 | tablo boş |
| `LearningStage.tenantId` | **0** | 13 | FK (RESTRICT) zorluyor; 13 satır `tenantId=NULL` (global çekirdek aşama, **meşru** — `schema.prisma:782` "null = global çekirdek") |

**150/150 teyidi (sorgu artefaktı DEĞİL):**
- Pozitif eşleşme: `tenantId` IN Tenant = **0** · `mentorId` IN User = **0** · `mentiId` IN User = **0**.
- `MentorshipAgreement`'ta **150 farklı tenantId + 150 farklı mentorId** (her satır kendi tekil cuid'i).
- Canlı gerçek: **User = 6 · Tenant = 2.** MentorshipAgreement'ın hiçbir cuid'i bunlarla eşleşmiyor.
- Örnek satırlar `createdAt = 2026-07-13` (tek batch); cuid'ler mevcut tablolarda yok.
- **Yorum (kanıta dayalı):** FK olmadığı için var-olmayan ebeveyne referans veren satırlar girebilmiş. Görünüm sentetik/yük-test verisi (2026-07-13 tek batch, her satır tekil sahte tenant/user). ⚠️ Kesin köken **teyit gerek** — bu tur yalnız sayıldı, silme/düzeltme ÖNERİSİ YAZILMADI (PO kararı).

---

## §D — 2.3 updatedAt DEFAULT farkı

Dört tablonun da `updatedAt` sütununda canlı `column_default` = **`CURRENT_TIMESTAMP`**. Şema `@updatedAt` (uygulama katmanı) → DB default beklemez.

**Değerlendirme:** 🟢 **zararsız** (yüksek güven). `@updatedAt`, Prisma her `update`'te değeri kendisi yazar; `create`'te de set eder. DB'deki `CURRENT_TIMESTAMP` yalnız ham-SQL insert'lerde yedek default sağlar, Prisma yolunu etkilemez. Veri/davranış riski yok — kozmetik drift.

---

## §E — 2.5 CİDDİYET SINIFLANDIRMASI

| Bulgu | Sınıf | Gerekçe |
|---|:---:|---|
| `MentorshipAgreement` 3 FK yok + **150 öksüz** | 🔴 **CİDDİ** | Veri bütünlüğü ZATEN ihlal (150 satır var-olmayan ebeveyne bağlı). FK eklenmeye çalışılırsa **hata verir** (öksüzler kısıtı bozar). `onDelete` mekanizması yok. |
| `LearningStage.tenantId` davranış farkı (RESTRICT vs SET NULL) | 🟡 **ORTA** | FK VAR, öksüz 0 → bugün zarar yok. Ama RESTRICT, tenant silmeyi **bloklar** (tenant'a bağlı aşama varsa silinemez); şema SET NULL istiyor. Tenant silme migration'ını etkiler. |
| `UserReport` 2 FK yok | 🟡 **ORTA** | FK yok ama tablo **boş (0 satır)** → öksüz riski bugün yok. Kısıt yine de eksik; boş olduğu için eklenmesi trivial/güvenli. |
| `updatedAt` default ×4 tablo | 🟢 **ZARARSIZ** | §D — kozmetik, `@updatedAt` uygulama katmanında yönetir. |
| `InvitationTemplate.tenantId` FK | 🟢 **ZARARSIZ** | FK VAR + CASCADE, şemayla eşleşiyor; yalnız updatedAt default farkı. |

---

## §F — 2.6 TENANT SİLME İÇİN SONUÇ (öneri, KARAR DEĞİL)

Tenant silme + `onDelete` migration'ı bu FK'leri ekleyecek/düzeltecek. Bulgular gösteriyor ki **drift o migration tarafından KENDİLİĞİNDEN kapanmaz — önce bir blokör var:**

- 🔴 **BLOKÖR:** `MentorshipAgreement`'a tenantId/mentorId/mentiId FK'lerini eklemek, **150 öksüz satır dururken BAŞARISIZ olur.** O migration'dan ÖNCE 150 satırın triyajı gerekir (PO kararı: sentetik/test verisi mi → temizlik; yoksa gerçek veri mi → ebeveyn onarımı). Bu tur **öneri yazılmadı, yalnız sayı raporlandı.**
- 🟡 `LearningStage.tenantId`: migration RESTRICT→(şemanın istediği) SET NULL'a çevirecek; öksüz 0 → güvenli, ama tenant-silme davranışını bilinçli seçmek gerekir (SET NULL global-çekirdeğe düşürür mü — tasarım kararı).
- 🟡 `UserReport`: boş → FK ekleme trivial/güvenli.
- 🟢 `updatedAt` default'ları: kozmetik; migration ister düşürür ister bırakır, zarar yok.

**Özet öneri (PO onaylayacak):** tenant-silme migration'ı yazılmadan ÖNCE 150 `MentorshipAgreement` öksüz satırının kökeni + akıbeti PO tarafından karara bağlanmalı. Diğer kalemler migration'a güvenle dahil edilebilir.

---

## §G — KAPSAM BEYANI (KURAL 13)

- Negatif iddialar ("FK yok") **canlı `pg_constraint` sorgusuyla** kanıtlandı (7 FK tek tek, `contype='f'`, public şema). Pozitif iddialar ("FK var") kısıt adı + `confdeltype` ile.
- `migrate diff` tam çıktısı pipe'sız alındı, tablo sayısı iki yöntemle (`grep -c` + göz) doğrulandı = 4.
- Öksüz sayıları hem `NOT EXISTS` (negatif) hem `IN (...)` pozitif eşleşmeyle çapraz doğrulandı.
- Bu keşif SALT-OKUMA: tek `ALTER/UPDATE/DELETE/CREATE` çalıştırılmadı; geçici sorgu scriptleri iş sonunda silindi.
