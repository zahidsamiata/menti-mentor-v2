# Değiştirilenler arşivi — 2026-09-28 · AJ-63 (yönetici havuzları tablo → kart)

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Hiçbir dosya SİLİNMEDİ. İki havuz sayfasındaki `<table>`
> işaretlemesi, aynı bilgiyi gösteren ortak kart bileşeniyle (`frontend/src/components/organisms/AdminPoolCard.tsx`)
> DEĞİŞTİRİLDİ. Kuyruk: `docs/otonom/00-KUYRUK.md` AJ-63. Çatı dalı `otonom/AJ-63-havuz-kart-20260928`.

- **Niyet (neden yazılmıştı):** yöneticinin mentör/menti havuzunu salt-okunur liste olarak görmesi
  (ad, e-posta, DISC, sektörler, durum + onay/red izi, sertifika, kalite puanı, öğrenme yolculuğu, kayıt tarihi).
- **İkame kanıtı:** aynı alanların HEPSİ artık `AdminPoolCard` içinde gösteriliyor (sütun → kart eşlemesi PR açıklamasında);
  veri kaynağı (`adminApi.listUsers`) ve sayfalama değişmedi.
- **Yeni karar:** admin KARAR 2 — "Yatay tablo → KART görünümü" (`docs/kararlar/konu/tasarim-kararlari-admin.md` § KARAR 2, AN-35 Ö1).
- **Son commit (eski hâl):** `684000e` (iki dosya için de).
- **Geri alma:** `git checkout 684000e -- 'frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx' 'frontend/src/app/(admin)/admin/menti-havuzu/page.tsx'`
  ya da AJ-63 merge commit'ini `git revert`.

### 1. `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx` — tablo bloğu (satır 75-205, aynen)

```tsx
      {/* Tablo */}
      {!isLoading && data && data.items.length > 0 && (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ad</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">E-posta</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">DISC</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Sektörler</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Durum</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Sertifika</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Kalite Puanı</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Öğrenme Yolculuğu</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Kayıt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.items.map((user) => {
                  const sectorTags = user.sectorTags ?? [];
                  // Pasif > onay durumu (AJ-65, gerekçe: enumLabels.userStatusBadge).
                  const approval = userStatusBadge(user);
                  const registeredAt = new Date(user.createdAt).toLocaleDateString('tr-TR');

                  return (
                    <tr key={user.id} className="transition-colors hover:bg-muted/30">
                      {/* Ad */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <UserAvatar src={user.avatarUrl} name={user.fullName} size={32} className="text-xs" />
                          <span className="font-medium truncate max-w-[180px]">{user.fullName}</span>
                        </div>
                      </td>

                      {/* E-posta */}
                      <td className="px-4 py-3 text-muted-foreground truncate max-w-[220px]">
                        {user.email}
                      </td>

                      {/* DISC — #12 çoklu harf (ör. "Di"); birincil harfe göre renk. */}
                      <td className="px-4 py-3">
                        <DiscBadge discLetters={user.discLetters} discType={user.discType} />
                      </td>

                      {/* Sektörler */}
                      <td className="px-4 py-3 max-w-[200px]">
                        {sectorTags.length > 0 ? (
                          <span className="text-xs text-muted-foreground">
                            {sectorTags.slice(0, 2).join(', ')}
                            {sectorTags.length > 2 && ` +${sectorTags.length - 2}`}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>

                      {/* Durum + onay/red izi (İş 2) + red gerekçesi (İş 3) — yalnız admin */}
                      <td className="px-4 py-3">
                        <Badge variant={approval.variant} className="text-xs">
                          {approval.label}
                        </Badge>
                        {user.approvalStatus === 'APPROVED' && user.approvedAt && (
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            Onaylayan: {user.approvedByName ?? 'bir yönetici'} · {new Date(user.approvedAt).toLocaleDateString('tr-TR')}
                          </p>
                        )}
                        {user.approvalStatus === 'REJECTED' && (
                          <>
                            {user.rejectedAt && (
                              <p className="mt-1 text-[11px] text-muted-foreground">
                                Reddeden: {user.rejectedByName ?? 'bir yönetici'} · {new Date(user.rejectedAt).toLocaleDateString('tr-TR')}
                              </p>
                            )}
                            {user.rejectionReason && (
                              <p
                                className="mt-0.5 text-[11px] italic text-muted-foreground max-w-[180px] truncate"
                                title={user.rejectionReason}
                              >
                                “{user.rejectionReason}”
                              </p>
                            )}
                          </>
                        )}
                      </td>

                      {/* Sertifika — KARAR 4: yalnız pozitif rozet, sertifikasızda etiket yok */}
                      <td className="px-4 py-3">
                        {user.isCertified ? (
                          <Badge variant="success" className="text-xs">✓ Sertifikalı</Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>

                      {/* Kalite Puanı — #7 Aşama 1: feedback-türevi (5 üzerinden). YALNIZ yönetici (KVKK §5).
                          Veri/üyelik yoksa "—". Ham çarpan gösterilmez; qualityToFive ile çevrilir. */}
                      <td className="px-4 py-3 text-xs whitespace-nowrap">
                        {(() => {
                          const five = qualityToFive(user.qualityMultiplier);
                          return five === null ? (
                            <span className="text-muted-foreground" title="Henüz yeterli değerlendirme yok">—</span>
                          ) : (
                            <span className="font-medium tabular-nums">{five.toFixed(1)} / 5</span>
                          );
                        })()}
                      </td>

                      {/* Öğrenme Yolculuğu — #34: tamamlandıysa tarih (✓), yoksa "—". Retention göstergesi. */}
                      <td className="px-4 py-3 text-xs whitespace-nowrap">
                        {user.learningJourneyCompletedAt ? (
                          <Badge variant="success" className="text-xs">
                            ✓ {new Date(user.learningJourneyCompletedAt).toLocaleDateString('tr-TR')}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground" title="Öğrenme yolculuğu henüz tamamlanmadı">—</span>
                        )}
                      </td>

                      {/* Kayıt */}
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {registeredAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
```

İlgili importlar (kart bileşenine taşındı):

```tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { UserAvatar } from '@/components/atoms/UserAvatar';
import { DiscBadge } from '@/components/atoms/DiscBadge';
import { qualityToFive } from '@/lib/adminMetrics';
import { userStatusBadge } from '@/lib/enumLabels';
```

### 2. `frontend/src/app/(admin)/admin/menti-havuzu/page.tsx` — tablo bloğu (satır 73-181, aynen)

Not: menti tablosunda avatar yerine elle yazılmış baş-harf dairesi vardı; kartta ortak `UserAvatar` kullanılıyor
(fotoğraf varsa fotoğraf, yoksa aynı baş-harf yedeği — admin KARAR 2 "fotoğraf").

```tsx
      {/* Tablo */}
      {!isLoading && data && data.items.length > 0 && (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ad</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">E-posta</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">DISC</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Sektörler</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Durum</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Öğrenme Yolculuğu</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Kayıt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.items.map((user) => {
                  const sectorTags = user.sectorTags ?? [];
                  // Pasif > onay durumu (AJ-65, gerekçe: enumLabels.userStatusBadge).
                  const approval = userStatusBadge(user);
                  const registeredAt = new Date(user.createdAt).toLocaleDateString('tr-TR');

                  return (
                    <tr key={user.id} className="transition-colors hover:bg-muted/30">
                      {/* Ad */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                            {user.fullName[0]?.toUpperCase()}
                          </div>
                          <span className="font-medium truncate max-w-[180px]">{user.fullName}</span>
                        </div>
                      </td>

                      {/* E-posta */}
                      <td className="px-4 py-3 text-muted-foreground truncate max-w-[220px]">
                        {user.email}
                      </td>

                      {/* DISC — #12 çoklu harf (ör. "Di"); birincil harfe göre renk. */}
                      <td className="px-4 py-3">
                        <DiscBadge discLetters={user.discLetters} discType={user.discType} />
                      </td>

                      {/* Sektörler */}
                      <td className="px-4 py-3 max-w-[200px]">
                        {sectorTags.length > 0 ? (
                          <span className="text-xs text-muted-foreground">
                            {sectorTags.slice(0, 2).join(', ')}
                            {sectorTags.length > 2 && ` +${sectorTags.length - 2}`}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>

                      {/* Durum + onay/red izi (İş 2) + red gerekçesi (İş 3) — yalnız admin */}
                      <td className="px-4 py-3">
                        <Badge variant={approval.variant} className="text-xs">
                          {approval.label}
                        </Badge>
                        {user.approvalStatus === 'APPROVED' && user.approvedAt && (
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            Onaylayan: {user.approvedByName ?? 'bir yönetici'} · {new Date(user.approvedAt).toLocaleDateString('tr-TR')}
                          </p>
                        )}
                        {user.approvalStatus === 'REJECTED' && (
                          <>
                            {user.rejectedAt && (
                              <p className="mt-1 text-[11px] text-muted-foreground">
                                Reddeden: {user.rejectedByName ?? 'bir yönetici'} · {new Date(user.rejectedAt).toLocaleDateString('tr-TR')}
                              </p>
                            )}
                            {user.rejectionReason && (
                              <p
                                className="mt-0.5 text-[11px] italic text-muted-foreground max-w-[180px] truncate"
                                title={user.rejectionReason}
                              >
                                “{user.rejectionReason}”
                              </p>
                            )}
                          </>
                        )}
                      </td>

                      {/* Öğrenme Yolculuğu — #34: tamamlandıysa tarih (✓), yoksa "—". Retention göstergesi. */}
                      <td className="px-4 py-3 text-xs whitespace-nowrap">
                        {user.learningJourneyCompletedAt ? (
                          <Badge variant="success" className="text-xs">
                            ✓ {new Date(user.learningJourneyCompletedAt).toLocaleDateString('tr-TR')}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground" title="Öğrenme yolculuğu henüz tamamlanmadı">—</span>
                        )}
                      </td>

                      {/* Kayıt */}
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {registeredAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
```

İlgili importlar:

```tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { DiscBadge } from '@/components/atoms/DiscBadge';
import { userStatusBadge } from '@/lib/enumLabels';
```
