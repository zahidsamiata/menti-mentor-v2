# Silinen / değişen kod arşivi — 2026-09-28

## AJ-74 · Oryantasyon kilidi kurum filtresiz ve 404 kontrolünden önce

### 1) `backend/src/controllers/meetingController.ts` — `checkOrientationLock` + `createMeeting` içindeki çağrısı
- **Eski hâl (AYNEN):**
```ts
async function checkOrientationLock(mentiId: string, res: Response): Promise<boolean> {
  const menti = await prisma.user.findUnique({
    where:  { id: mentiId },
    select: { needsOrientation: true },
  });
  if (menti?.needsOrientation) {
    res.status(403).json({
      error:   'ORYANTASYON_KILIDI',
      message: 'Bu menti oryantasyon kilidi nedeniyle yeni görüşme oluşturamaz.',
    });
    return true;
  }
  return false;
}
```
  `createMeeting` içinde (GV-06 sahiplik kontrolünden hemen sonra, kurum-kapsamlı mentör/menti sorgusundan ÖNCE):
```ts
  if (await checkOrientationLock(mentiId, res)) return;
```
  ve kurum-kapsamlı menti sorgusunun seçimi: `select: USER_IDENTITY_SELECT,`
- **Neden yazılmıştı:** oryantasyon kilidi olan menti (ör. geri bildirim sonrası kilitlenen) görüşme rehberini tamamlamadan yeni görüşme açamasın diye; kontrol en başa, ayrı bir sorguyla konmuştu.
- **Neden değişti:** `findUnique` kurum filtresi taşımıyor (otomatik kurum filtresinin bilinçli dışında) ve 404 kontrollerinden önce koşuyordu → başka kurumdaki bir menti kimliğiyle istekte kilitliyse 403 `ORYANTASYON_KILIDI`, değilse 404 dönüyor, başka kurumdaki kaydın kilit durumu yanıttan çıkarılabiliyordu. Artık kilit, kurum-kapsamlı `findFirst` ile bulunan menti kaydından (`needsOrientation` seçime eklendi) okunuyor ve 404 kontrollerinden SONRA değerlendiriliyor (`rejectIfOrientationLocked`). Kendi kurumunda kilitli menti yine 403 `ORYANTASYON_KILIDI` alır.
- **Son commit (değişiklikten önce, backend):** `e1bce3bdf4bccdf944396586a5cd591a0f9d40e2` (dosyaya son dokunan) · backend main `b79547dd51c24bae7a3a96348f475d8268488124`
- **Geri alma:** backend'de `git revert <AJ-74 backend commit>` (şema/migration yok).
