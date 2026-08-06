# Chat v1 — Teslim Dökümanı (menti↔mentör talep mesajlaşma)

**Tarih:** 2026-08-06 · **Durum:** PR hazır, **iki repo CI YEŞİL** ✅, MERGE YOK — inceleme/revizyon kararı ürün sahibinde.
**PR'lar:** backend `menti-mentor#33` · çatı `menti-mentor-v2#40` (base `docs/merge-turu-devir`).
**Branch:** iki repoda `feat/chat-messaging`.
**CI:** backend `ci` pass · çatı Backend-TS+Lint + Frontend-TS+Build + Integration Tests pass.

> Ürün sahibi bu belgeyi okuyup beğenmediği/revize istediği yerleri işaretler; revizyon sonrası merge.

## Onaylı kapsam (kilitli)
- Menti bir mentöre **zorunlu ilk mesajla** konuşma açar → konuşma **hemen açık** (ayrı kabul adımı yok).
- Karşılıklı **düz-metin** yazışma; süresiz.
- **Okundu:** `mentorLastReadAt` / `mentiLastReadAt` (unread rozeti bunlardan türetilir).
- **Bildirim:** uygulama-içi (çan/rozet, her mesajda anlık) + **okundu-bazlı e-posta**.
- **Polling** — gerçek zamanlı YOK (WebSocket/"yazıyor…" yok).
- **Kapsam dışı:** dosya/foto, ses, grup, sil/düzenle, reaksiyon, "yazıyor…" göstergesi.

## Ne yapıldı (tur tur)
- **Tur 1 — Veri modeli:** `Conversation` + `Message` (schema + migration `20260806000000_add_chat_conversation_message`, additive). Migration Faz 1'de canlı=lokal DB'ye uygulandı (PO onaylı). `db.ts`: Conversation/Message **TENANT_SCOPED değil** (aşağıda "cross-tenant").
- **Tur 2 — Backend endpoint'leri + ownership + testler** (`conversationController.ts`, `conversationRoutes.ts`).
- **Tur 3 — Okundu-bazlı e-posta** (`emailService.sendNewChatMessageEmail` + controller tetiği).
- **Tur 4 — Frontend inbox + thread + ilk-mesaj entegrasyonu** (`/messages`, `/messages/[id]`, `menti/page.tsx`).
- **Tur 5 — Çan/rozet + polling** (`MessagesBell`, `DashboardNav`).

## Backend endpoint'leri (`/api/conversations`)
| Endpoint | İş | Yetki |
|---|---|---|
| `POST /` | Menti konuşma başlatır (zorunlu ilk mesaj; MatchRequest'e bağlanır) | rol MENTI |
| `POST /:id/messages` | Mesaj gönder | yalnız katılımcı |
| `GET /` | Inbox (konuşmalar + unread) | katılımcı (kendi konuşmaları) |
| `GET /:id/messages` | Thread (kronolojik) | katılımcı **veya aynı-tenant admin** |
| `POST /:id/read` | Okundu işaretle (`lastReadAt=now`) | yalnız katılımcı |
| `GET /unread-count` | Çan rozeti toplam | kendi |

## Güvenlik
- **Yetki KATILIMCI-bazlı** (mentor/menti), tenant değil — çünkü shared-pool'da taraflar farklı tenant'ta olabilir. Admin yalnız **kendi tenant'ındaki** konuşmayı OKUR (yazamaz). Yabancı → **404** (varlık ifşasını gizle; `requestController` deseni).
- **Cross-tenant tuzağı çözüldü:** Conversation/Message RLS otomatik tenant filtresinden çıkarıldı; erişim controller'da açık participant kontrolüyle sağlanır (aksi halde karşı taraf konuşmayı göremezdi).
- **IDOR:** `requesterUserId`/`senderUserId` daima auth'tan (body'den değil). Cross-tenant başlatmada `canCrossTenantMatch` guard.
- **PII:** mesaj içeriği (`Message.content`) **log'a yazılmaz**; e-postaya **mesaj metni konmaz**.

## E-posta kuralı (okundu-bazlı) — nasıl çalışıyor
Yeni mesaj oluşturulmadan ÖNCE, alıcının o konuşmadaki okunmamış sayısı hesaplanır:
- Okunmamışı **0** ise (alıcı güncel) → bu mesaj ilk okunmamış → **mail at** (`sendNewChatMessageEmail`).
- Okunmamışı **>0** ise (mail zaten gitmiş) → **mail atma**.
- Alıcı konuşmayı okuyunca (`lastReadAt` güncellenince) sayaç sıfırlanır → sonraki mesajda tekrar mail.
- **Zaman-cooldown DEĞİL**, tamamen okundu durumuna bağlı. Uygulama-içi bildirim (çan) her mesajda anlık (polling ile).

## Frontend
- `lib/api/conversations.ts` — API client (list/unread-count/thread/start/send/markRead).
- `/messages` inbox — karşı taraf adı/avatar, son mesaj önizleme, unread rozeti.
- `/messages/[id]` thread — kronolojik balonlar (kendi sağ/karşı sol), gönder kutusu (Enter=gönder), açılınca okundu.
- `menti/page.tsx` — "Mesaj" modalı artık **konuşma başlatır** (ilk mesaj zorunlu) → thread'e yönlendirir.
- `DashboardNav` — "Mesajlar" linki + `MessagesBell` (unread rozeti; **45sn polling** + route değişiminde tazele).

## Testler
- `tests/conversation.test.ts` — ownership (taraf 200 / yabancı 404 / admin okur-yazamaz), başlatma, unread, okundu akışı, tekrar-başlatma tek konuşma.
- `tests/conversation-email.test.ts` — okundu-bazlı mail (ilk mesaj mail, okunmadan 2. mail YOK, okununca tekrar, mentör cevabı mentiye).
- Yerel: **DB-free doğrulama YEŞİL** (backend src tsc + tsc-test + eslint; frontend tsc + next lint + next build). Entegrasyon testleri **CI'da** koşar (izole postgres; yerelde test DB yok → güvenlik kilidi canlı DB'ye test koşmayı engelliyor).

## Bilinen sınırlar / açık noktalar (PO kararı)
- **Backfill YOK:** eski `MatchRequest.requestMessage` kayıtları chat'e taşınmadı (kapsam gereği). Geçmiş talep mesajları thread'de görünmez.
- **`VisibilityOptIn.requestMessage` (ölü alan) kaldırılmadı:** kolon DROP = şema değişikliği → bu tur "DB şeması değişmez" kuralı gereği **ertelendi**. Frontend'de kullanılmıyor (kanıt: 0 referans); backend `mentiRequestController` hâlâ yazıyor. Ayrı, PO-onaylı bir temizlik turu gerektirir.
- **`Meeting.requestMessage` AYRI akış** — kasıtlı, dokunulmadı.
- **Unread sayımı** inbox/badge'de konuşma-başına `count` (küçük ölçekte uygun; çok konuşmada optimize edilebilir).
- **Deep-link e-postada yok:** mevcut mail deseni (link'siz "giriş yapıp bakın") izlendi; istenirse `/messages/:id` derin linki eklenebilir.
- **Admin moderasyon inbox'ı yok:** admin yalnız tek konuşmayı (aynı tenant) okuyabilir; toplu moderasyon ekranı kapsam dışı.

## Migration / DB
- Uygulanan: `20260806000000_add_chat_conversation_message` (Conversation, Message + indeks + FK). Additive, veri kaybı yok. `IF NOT EXISTS` + idempotent FK.
- Bu inşa turunda **yeni migration yok**, şema değişmedi.
