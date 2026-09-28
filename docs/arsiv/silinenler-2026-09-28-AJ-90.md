# Değiştirilenler arşivi — 2026-09-28 · AJ-90 (menti mentör havuzu sayfalama)

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Hiçbir dosya/fonksiyon SİLİNMEDİ; aşağıdaki satırlar sayfalama
> eklemek için davranış değiştirecek biçimde düzenlendi. Backend dalı
> `otonom/AJ-90-mentor-havuzu-sayfalama-20260928`. Kuyruk: `docs/otonom/00-KUYRUK.md` AJ-90.
> Eşleştirme mantığı (skor, filtre, eşik, kurum filtresi, onay kapısı) DEĞİŞMEDİ.

### 1. `backend/src/services/matching.ts` — `rankMentorsForMenti` kesme satırı + dönüş tipi

- **Son commit (eski hâl):** `377746f` (backend main `f5ba23b` itibarıyla aynı)
- **Neden yazılmıştı:** AN-07 — skorlamadan sonra ilk N mentörü kesip yalnız onları zenginleştirmek
  (müsaitlik/profil sorguları). Menti ekranı tek istekte en çok 100 mentör istiyordu.
- **Neden değişti:** 100'den fazla uygun mentörü olan menti kalanları hiç göremiyordu. Artık `offset`
  ile istenen dilim döner, `total` = eşik sonrası tüm uygun mentör sayısı.
- **Eski hâl (aynen):**
  ```ts
  export async function rankMentorsForMenti(args: {
    mentiId: string;
    mentiTenantId: string;
    limit?: number;
  }): Promise<{ items: RankedMentor[] }> {
  ```
  ```ts
    if (!menti) return { items: [] };
  ```
  ```ts
    // limit verilmezse eski üst sınır (500) korunur — ağır zenginleştirme sınırsız büyümesin.
    const top = withinThreshold.slice(0, args.limit || MATCH_CANDIDATE_PAGE_SIZE);
  ```
  ```ts
    return { items };
  ```
- **Geri alma:** backend'de `git revert <AJ-90 merge commit>` ya da `git checkout f5ba23b -- src/services/matching.ts`.

### 2. `backend/src/controllers/matchingController.ts` — `getRankedMentorsForMenti` yanıtı

- **Son commit (eski hâl):** `50c5e71`
- **Neden yazılmıştı:** KARAR 5 — menti-safe DTO ile yalnız liste dönmek.
- **Neden değişti:** yanıta `total/limit/offset` EKLENDİ (ön yüz "Daha fazla göster" için); `items` aynen.
- **Eski hâl (aynen):**
  ```ts
  const MentorMatchQuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(200).optional(),
  });
  ```
  ```ts
    return res.json({ items: result.items.map(buildMentiFacingMentorItem) });
  ```
- **Geri alma:** `git checkout f5ba23b -- src/controllers/matchingController.ts` (backend).

### 3. `frontend/src/lib/api/matching.ts` — `mentorMatches` isteği

- **Son commit (eski hâl):** `d9fd456` (menti→mentör uyum kartı — `limit=100` bununla geldi).
- **Neden yazılmıştı:** havuz ekranı ilk açıldığında sayfalama yoktu; "yeterince büyük" tek istek.
- **Neden değişti:** sayfalı istek — sayfa boyu tek sabit `MENTOR_POOL_PAGE_SIZE` (KARAR-54.3 cevabıyla değişir).
- **Eski hâl (aynen):**
  ```ts
    mentorMatches: (api: BoundClient, mentiId: string): Promise<ApiResult<MentorMatchesResponse>> =>
      api<MentorMatchesResponse>(`/api/mentis/${mentiId}/mentor-matches?limit=100`),
  ```
- **Geri alma:** çatıda `git revert <AJ-90 çatı merge commit>`.
