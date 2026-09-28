# Değiştirilenler arşivi — 2026-09-28 · AJ-62 (elle yazılmış 400'ler ortak biçimde)

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Hiçbir dosya/fonksiyon/uç SİLİNMEDİ; yalnız aşağıdaki 400 yanıt satırları
> ortak yardımcıya (`sendValidationError`, `backend/src/middleware/validate.ts`) bağlandı. Türkçe metinler ve
> durum kodları AYNI; değişen yalnız gövde biçimi. Backend dalı `otonom/AJ-62-400-ortak-bicim-20260928`.
> Kuyruk: `docs/otonom/00-KUYRUK.md` AJ-62.

- **Neden yazılmıştı:** müsaitlik/randevu (`de6be04` sprint 8-11, sonra K/AJ işleriyle genişledi), check-in çift
  sinyali (`36746b2` MeetingCheckIn), selfProfile bomba koruması (`de6be04`) kontrolleri Zod şeması yerine elle
  yazılmıştı; hata cümlesi o dönemin alışkanlığıyla `error` alanına kondu.
- **Neden değişti:** AJ-43 (backend #209) ortak biçimi `{ error: 'VALIDATION', message?, details }` olarak tek
  yerde (`validateRequest`) kurdu; bu elle yazılmış 16 yanıt biçim dışında kaldı (`error` alanında cümle ya da
  `details` yok). Ön yüz (`frontend/src/lib/api/client.ts` `withValidationMessage`) önce `message`'ı okur →
  kullanıcının gördüğü metin değişmez.
- **Son commit (eski hâl):** backend main `fa253fd` itibarıyla — `meetingController.ts` `50c5e71` ·
  `meetingCheckInController.ts` `a934173` · `userController.ts` `55a195d`.
- **Geri alma:** backend'de `git revert <AJ-62 merge commit>` ya da
  `git checkout fa253fd -- src/controllers/meetingController.ts src/controllers/meetingCheckInController.ts src/controllers/userController.ts src/middleware/validate.ts`.

### 1. `backend/src/controllers/meetingController.ts` — eski hâl (aynen)

```ts
import { validateRequest } from '../middleware/validate.js';
    return res.status(400).json({ error: 'blocks bir dizi olmalı.' });
      return res.status(400).json({ error: `Geçersiz gün: ${b.weekday}` });
      return res.status(400).json({ error: 'Saatler HH:MM formatında olmalı.' });
      return res.status(400).json({ error: 'Başlangıç saati bitişten önce olmalı.' });
    return res.status(400).json({ error: 'mentorUserId query parametresi gerekli.' });
    return res.status(400).json({ error: `Geçersiz format: ${format}` });
    return res.status(400).json({ error: 'startsAt/endsAt geçerli ISO tarih olmalı.' });
    return res.status(400).json({ error: 'Başlangıç bitişten önce olmalı.' });
    return res.status(400).json({ error: 'Geçmiş bir zamana görüşme oluşturulamaz.' });
      return res.status(400).json({ error: 'mentorUserId bu eşleşmenin mentörüyle uyuşmuyor.' });
    return res.status(400).json({ error: 'Online görüşmeyi onaylamak için görüşme bağlantısı girmelisiniz.' });
  if (!meetingId) return res.status(400).json({ error: 'meetingId gerekli.' });
```
(satırlar sırasıyla 9, 368, 373, 378, 381, 430, 481, 487, 490, 493, 524, 700, 863)

### 2. `backend/src/controllers/meetingCheckInController.ts` — eski hâl (aynen)

```ts
import { validateRequest } from '../middleware/validate.js';
    return res.status(400).json({ error: 'mentorId ve mentiId gerekli.' });
```
(satırlar 8, 135)

### 3. `backend/src/controllers/userController.ts` — eski hâl (aynen)

```ts
import { validateRequest } from '../middleware/validate.js';
    return res.status(400).json({ error: 'VALIDATION', message: 'Body bir JSON objesi olmalıdır.' });
    return res.status(400).json({ error: 'VALIDATION', message: 'selfProfile en fazla 50 anahtar içerebilir.' });
    return res.status(400).json({ error: 'VALIDATION', message: 'selfProfile anahtarları en fazla 100 karakter olabilir.' });
```
(satırlar 12, 470, 476, 479)
