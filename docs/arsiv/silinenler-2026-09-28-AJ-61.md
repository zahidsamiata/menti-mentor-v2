# Değiştirilenler arşivi — 2026-09-28 · AJ-61 (şikâyet etiketleri tek kaynak)

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Hiçbir dosya/bileşen/özellik SİLİNMEDİ. Kurum şikâyet
> ekranındaki yerel etiket sözlükleri kaldırıldı; aynı METİNLER ortak sözlükte
> (`frontend/src/lib/enumLabels.ts` `REPORT_STATUS_LABELS` / `REPORT_REASON_LABELS`) zaten
> birebir duruyordu. Kullanıcıya görünen hiçbir metin değişmedi.
> Kuyruk: `docs/otonom/00-KUYRUK.md` AJ-61. Çatı dalı `otonom/AJ-61-sikayet-etiket-tek-kaynak-20260928`.

### Beş adım özeti
1. **Niyet:** yerel haritalar K-11 ile (kurum şikâyet paneli, `b5f1463`, #230) yazıldı — o gün ortak
   sözlük yoktu, ekranın enum değerlerini Türkçe göstermesi gerekiyordu.
2. **İkame kanıtı:** AJ-41 (`3b7067c`, çatı #400) ortak sözlüğe `REPORT_STATUS_LABELS` /
   `REPORT_REASON_LABELS` ekledi; metinler bu yerel haritadan birebir alındı (commit mesajı:
   "kurum şikâyet ekranıyla aynı karşılıklar"). Platform paneli (`frontend/src/app/platform/dashboard/page.tsx:33,559,561`)
   bunları kullanıyor.
3. **Yeni karar:** kuyruk satırı AJ-61 (ajan-ekledi 2026-09-27, kaynak AJ-41 7b incelemesi): kurum
   ekranı da ortak sözlükten okusun, tek kaynak.
4. **Arşiv:** bu dosya.
5. **Karantina:** gerekmedi — davranış/metin değişmiyor, yalnız metnin okunduğu yer değişiyor
   (aynı içerik ortak sözlükte yaşıyor). Rozet RENGİ (görsel karar) sayfada `STATUS_BADGE_VARIANT` olarak kaldı.

### Metin karşılaştırması (kaldırılan yerel ↔ ortak sözlük)
| Değer | Yerel (kurum ekranı) | Ortak sözlük | Fark |
|---|---|---|---|
| OPEN | Açık | Açık | yok |
| REVIEWED | İncelendi | İncelendi | yok |
| DISMISSED | Reddedildi | Reddedildi | yok |
| SPAM | Spam / istenmeyen | Spam / istenmeyen | yok |
| HARASSMENT | Taciz / rahatsız edici | Taciz / rahatsız edici | yok |
| INAPPROPRIATE | Uygunsuz içerik | Uygunsuz içerik | yok |
| NO_SHOW | Görüşmeye gelmedi | Görüşmeye gelmedi | yok |
| OTHER | Diğer | Diğer | yok |

### 1. `frontend/src/app/(admin)/admin/reports/page.tsx` — yerel `REASON_LABELS` / `STATUS_INFO` / `STATUS_FILTERS`

- **Son commit (eski hâl):** `cefa2c4`
- **Eski hâl (aynen):**
  ```ts
  import type { ReportReason, ReportStatus, TenantReport } from '@/types/admin';
  ```
  ```ts
  const REASON_LABELS: Record<ReportReason, string> = {
    SPAM: 'Spam / istenmeyen',
    HARASSMENT: 'Taciz / rahatsız edici',
    INAPPROPRIATE: 'Uygunsuz içerik',
    NO_SHOW: 'Görüşmeye gelmedi',
    OTHER: 'Diğer',
  };

  const STATUS_INFO: Record<ReportStatus, { label: string; variant: 'warning' | 'success' | 'secondary' }> = {
    OPEN: { label: 'Açık', variant: 'warning' },
    REVIEWED: { label: 'İncelendi', variant: 'success' },
    DISMISSED: { label: 'Reddedildi', variant: 'secondary' },
  };

  const STATUS_FILTERS: { key: ReportStatus | 'ALL'; label: string }[] = [
    { key: 'OPEN', label: 'Açık' },
    { key: 'REVIEWED', label: 'İncelendi' },
    { key: 'DISMISSED', label: 'Reddedildi' },
    { key: 'ALL', label: UI_TEXT.filters.all },
  ];
  ```
  ```tsx
    const statusInfo = STATUS_INFO[report.status];
  ```
  ```tsx
            <p className="text-sm font-semibold">{REASON_LABELS[report.reason] ?? report.reason}</p>
  ```
  ```tsx
          <Badge variant={statusInfo.variant} className="text-xs shrink-0">{statusInfo.label}</Badge>
  ```

### 2. `frontend/src/lib/enumLabels.ts` — iki açıklama satırı

- **Son commit (eski hâl):** `684000e`
- **Neden değişti:** "kurum ekranındaki karşılıklarla aynı" artık doğru değil; ekran sözlüğün kendisini kullanıyor.
- **Eski hâl (aynen):**
  ```ts
  /** Kullanıcı şikâyeti durumu (platform paneli + kurum şikâyet ekranı ile aynı karşılıklar). */
  ```
  ```ts
  /** Kullanıcı şikâyeti nedeni (kurum şikâyet ekranındaki karşılıklarla aynı). */
  ```

- **Geri alma:** `git revert <AJ-61 merge commit>` ya da
  `git checkout cefa2c4 -- 'frontend/src/app/(admin)/admin/reports/page.tsx'` (+ `git checkout 684000e -- frontend/src/lib/enumLabels.ts`).
