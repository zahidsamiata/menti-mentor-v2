# Değiştirilenler arşivi — 2026-09-28 · AJ-65 (havuzda "Pasif" rozeti)

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Hiçbir dosya/bileşen SİLİNMEDİ. İki sayfadaki yerel
> `APPROVAL_META` sözlüğü aynı içerikle ortak sözlüğe (`frontend/src/lib/enumLabels.ts`
> `APPROVAL_STATUS_BADGE`) TAŞINDI; rozet artık `userStatusBadge(user)` ile seçiliyor.
> Kuyruk: `docs/otonom/00-KUYRUK.md` AJ-65. Çatı dalı `otonom/AJ-65-pasif-rozet-20260928`.

### 1. `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx` ve `frontend/src/app/(admin)/admin/menti-havuzu/page.tsx` — yerel `APPROVAL_META`

- **Son commit (eski hâl):** `64ddbc1` (iki dosya için de)
- **Neden yazılmıştı:** havuz tablosunda onay durumunu (Onaylı/Bekliyor/Reddedildi) rozetle göstermek.
- **Neden değişti:** admin KARAR 3 durum rozetini Onaylı/Bekliyor/**Pasif** olarak tanımlıyor;
  rozet yalnız `approvalStatus`'tan türediği için `isActive=false` kişi "Onaylı" görünüyordu. Aynı
  sözlük iki sayfada kopyaydı; AJ-63 (kart düzeni) de aynı rozeti kullanacağı için tek yere alındı.
- **Eski hâl (aynen, iki dosyada da):**
  ```ts
  import type { ApprovalStatus } from '@/types/auth';

  const APPROVAL_META: Record<ApprovalStatus, { label: string; variant: 'success' | 'warning' | 'destructive' }> = {
    APPROVED: { label: 'Onaylı', variant: 'success' },
    PENDING:  { label: 'Bekliyor', variant: 'warning' },
    REJECTED: { label: 'Reddedildi', variant: 'destructive' },
  };
  ```
  ```ts
                    const approval = APPROVAL_META[user.approvalStatus];
  ```
- **Geri alma:** `git revert <AJ-65 merge commit>` ya da
  `git checkout 64ddbc1 -- 'frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx' 'frontend/src/app/(admin)/admin/menti-havuzu/page.tsx'`.
