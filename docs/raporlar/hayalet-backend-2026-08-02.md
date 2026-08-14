# Hayalet-Backend Raporu
**📸 DONDURULMUŞ (2026-08-02)** — o günün keşif fotoğrafı, güncellenmez; güncel durum: `09-DURUM.md`
**Tarih:** 2026-08-02 · **Mod:** salt-okuma (kod okundu, çalıştırılmadı)
**Amaç:** Yazılmış ama kullanıcıya çıkmayan / yarım bağlı / ölü / kırık kod envanteri.
**Önemli:** Hiçbir kod değişmedi/silinmedi. Silme/bağlama kararı ürün sahibinde.

> Güven etiketi: **DOĞRULANDI** (route/dosya varlığı okunarak teyit) · **teyit gerek** (frontend-çağrı yokluğu dinamik çağrı ihtimaliyle %100 değil).
> ⚠️ Kural: hiçbir şeye kesin "ölü/sil" denmedi — "muhtemel hayalet, teyit gerek" dili kullanıldı.

---

## 1. Hiç çağrılmayan (muhtemel hayalet) endpoint'ler
Route varlığı **DOĞRULANDI** (`backend/src/routes/*` okundu); frontend çağrısı yokluğu **teyit gerek**.

| Endpoint | Yer | Durum | Not |
|---|---|---|---|
| `POST /api/scoring/compute-profile` | `sjtScoringRoutes.ts:20` | muhtemel hayalet | SJT profil hesaplama; frontend çağrısı görülmedi |
| `POST /api/scoring/rank-mentors` | `sjtScoringRoutes.ts:27` | muhtemel hayalet | SJT tabanlı sıralama; frontend çağrısı görülmedi |
| `POST /api/admin/users/:id/rematch` | `adminRoutes.ts:49` | muhtemel hayalet | Yeniden eşleştirme tetikleyici |
| `POST /api/admin/visibility-optin/:optInId/confirm` | `adminRoutes.ts:60` | muhtemel hayalet | `confirmDoubleOptIn` |
| `POST /api/admin/cron/run-tuning` | `adminRoutes.ts:68` | debug/manuel | Cron manuel tetik (bilinçli olabilir) |
| `POST /api/admin/cron/run-purge` | `adminRoutes.ts:69` | debug/manuel | Cron manuel tetik (bilinçli olabilir) |

**Öneri:** compute-profile / rank-mentors → **araştır** (SJT akışı bağlanacak mı, yoksa uyuyor mu?). rematch / confirm → frontend'e bağlanacaksa değerli; run-tuning/run-purge muhtemelen bilinçli debug → **ürün sahibine sor**.

## 2. Yarım bağlı
- **AlgorithmTuner:** backend tam (`algorithmTuner.ts` + `getPendingTuning/approve/reject`), admin UI (`algorithm-tuner/page.tsx`) bağlı. Ama manuel cron tetik endpoint'leri (yukarıda) debug amaçlı → yarım/izole. *(teyit gerek)*
- **Coaching Suggestions:** `coachingSuggestions.ts` + `admin.ts` `getCoachingSuggestions` çağrısı + `CoachingSuggestionsDialog.tsx` var; veri gösterimi tam mı → **araştır**. *(teyit gerek)*

## 3. Ters yön (frontend çağırıyor, backend'de yok?)
- ❌ **YANLIŞ BULGU (düzeltme):** Keşif ajanı *"`POST /api/users/me/orientation-completed` backend'de yok → 404 riski"* dedi. **Bu YANLIŞ.** Endpoint **mevcut**: `backend/src/routes/userRoutes.ts:137` — `router.post('/users/me/orientation-completed', requireRole('MENTI'), completedOrientation)`. **DOĞRULANDI (dosya okundu).** Kırık değil; ters-yön bulgusu yok.

## 4. Ölü kod adayları (dosya VAR, kullanım "teyit gerek")
Dosya varlığı **DOĞRULANDI** (`src/services/` listelendi); import edilmediği **teyit gerek**.
- `iceBreaker.ts` — CLAUDE.md'de açıkça "decommissioned — no longer wired to any controller". **En güçlü ölü-kod adayı.**
- `rewardPenalty.ts` — import izi görülmedi → **araştır**.
- `matchingInterface.ts` — eski desen kalıntısı olabilir → **araştır**.
- `llmRetry.ts` — LLM kaldırıldığı için muhtemelen atıl → **araştır**.

## 5. Veritabanı (tanımlı, az/hiç kullanım) — *teyit gerek*
- `User.discResultCard` (JSON): yazılıyor (`onboardingController`) ama okuma izi görülmedi → "yaz-ama-okuma" adayı.
- `SjtQuestion` / `SjtOption`: SJT akışı yarım olduğu için minimal kullanım.
- `IndustryNode` + `taxonomy.service` (LCA): ağaç seed'li ama LCA yakınlığı canlı skorlamada kullanılmıyor (uyuyan `sector-scorer` ile bağlantılı).

## 6. ENV/config — *teyit gerek*
- `LLM_PROVIDER` gibi anahtarlar config'de var ama LLM devre dışı olduğu için etkin okunmuyor olabilir. ⚠️ Değerler **gösterilmedi**, sadece anahtar adı. Düşük öncelik.

## 7. Route/sayfa erişilebilirliği — *teyit gerek*
- `app/pending-approval`, `app/onboarding/stk/pending-review` gibi sayfalar nav/menüden linksiz olabilir (yalnız programatik yönlendirme). `platform/*` sayfaları bilinçli olarak ayrı auth (UI-linksiz doğru).

## 8. Feature izleri (yarım/uyuyan)
- **`sector-scorer.service.ts` — DEĞERLİ AMA UNUTULMUŞ:** 5 bileşenli tam sektör skoru (`resolveSectorScore`) yazılı ama **hiçbir controller import etmiyor**; canlı yol `matching.ts` basit etiket-örtüşmesi kullanıyor. (Ayrı işte incelendi — İŞ 7 adayı, canlı davranışı değiştirir, staging ister.)
- **OCEAN adapter** (`disc-to-ocean.adapter.ts`) + **SJT scorer** (`sjt-scorer.ts`): psikometri motorunun bağlanmamış parçaları.
- **NotificationService** (`notificationService.ts`): fonksiyonlar var, gerçek push provider yok (stub/TODO).

---

## Sonuç (sayılar — tümü "en az" tahmini, teyit gerek)
- **Muhtemel hayalet endpoint:** 6 (route DOĞRULANDI, frontend-yokluğu teyit gerek)
- **Yarım bağlı:** ~2–4 (AlgorithmTuner debug uçları, Coaching Suggestions, SJT akışı)
- **Ölü kod adayı:** ~4 dosya (iceBreaker en net)
- **Kırık/ters-yön:** **0** (ajanın tek "kırık" iddiası yanlış çıktı — orientation-completed mevcut)

### En dikkat çeken 5
1. **`sector-scorer.service.ts`** — emek verilmiş 5-bileşen skorlama, bağlı değil (değerli; İŞ 7'de canlı-güvenli bağlanacak).
2. **SJT scoring endpoint'leri** (`compute-profile`, `rank-mentors`) — tanımlı, çağrısız; SJT akışı yarım.
3. **`iceBreaker.ts`** — CLAUDE.md "decommissioned" diyor; net silme adayı (teyit sonrası).
4. **`NotificationService` stub** — 7 fonksiyon iskeleti, gerçek push yok.
5. **`User.discResultCard`** — yazılıyor ama okunmuyor (yaz-ama-oku-yok adayı).

**Not:** Endpoint→frontend eşleştirmesi statik okumaya dayanıyor; dinamik/parametrik çağrılar kaçmış olabilir. Hiçbiri silinmedi — her madde eyleme geçmeden önce "gerçekten çağrılmıyor mu" teyidi ister.
