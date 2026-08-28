# İçerik Dökümü — DISC (Mizaç) Soruları (2026-08-15)

**📸 DONDURULMUŞ (2026-08-15)** — kaynak: `backend/prisma/seed-questions.ts` + canlı DB salt-okuma sayımı.

> 🗄️ **ARŞİV (2026-08-28, G9-08/16):** BAYAT döküm (silinmiş `seed-questions.ts`, "20 DISC") — `docs/raporlar/icerik/`'ten `docs/arsiv/icerik/`'e taşındı. Güncel kod-kanıtlı kaynak: [`tam-soru-dokumu-2026-08-26.md`](../../raporlar/icerik/tam-soru-dokumu-2026-08-26.md) (DISC=32).

> ⚠️ **GÜNCELLEME (2026-08-26):** **BAYAT** — kaynağı **silinmiş** `seed-questions.ts` (backend `5745e0f`); "20 DISC" der. Kod gerçeği artık **32 soru** (`seed.ts`, 20 CORE + 12 DEEPENING). Güncel döküm: [`bolumler/01-disc.md`](../../raporlar/icerik/bolumler/01-disc.md) + [`tam-soru-dokumu-2026-08-26.md`](../../raporlar/icerik/tam-soru-dokumu-2026-08-26.md).

> Bu belge DISC mizaç testinin **tüm sorularını tam metin** içerir. Kullanıcı yanıtı/PII **yoktur** — yalnız soru şablonları.

## Kaynak & tutarlılık
- **Kod kaynağı:** `backend/prisma/seed-questions.ts:5-33` — 16 CORE + 4 DEEPENING = **20 soru**.
- **Canlı DB (salt-okuma count):** 20 global DISC sorusu (16 CORE + 4 DEEPENING) → **kod ile birebir tutuyor.** ✅
- **⚠️ Seed çelişkisi:** `backend/prisma/seed.ts:18,124+` AYRICA kendi soru bankasına sahip (**32 soru**: 5 CORE + 3 DEEPENING/boyut; `seed.ts:503` "32" yazdırır). Ancak **canlıda 20 var, 32 değil** → canlı DISC seti güvenli `seed-questions.ts`'ten gelmiş; tehlikeli `seed.ts` (CLAUDE.md'de "çalıştırma" işaretli) uygulanmamış. **İki seed kaynağı çelişiyor — temizlenmeli** (bkz. eksikler raporu).
- **Cevap yapısı:** Likert (katılıyorum ölçeği); ayrı "cevap seçeneği" metni yok — her soru bir DISC boyutunu (D/I/S/C) ölçer. Yanıt `UserResponse` tablosunda tutulur (bireysel, admin görmez).
- **DISC-tipine-özel "mentiye yaklaşım" içeriği:** ❌ YOK — bu test kullanıcının KENDİ mizacını ölçer; mentiye yaklaşım öğretmez.

## CORE sorular (16) — her DISC boyutu 4 soru

### D — Dominant
1. (order 1) Bir grupta liderliği üstlenmekten keyif alırım.
2. (order 2) Hızlı karar vermek beni rahatsız etmez; tereddüt etmekten hoşlanmam.
3. (order 3) Hedef koyduğumda engelleri aşmak için ısrarcı olurum.
4. (order 4) Rekabetçi ortamlarda en iyi performansımı sergilerim.

### I — Influential
5. (order 5) İnsanları bir araya getirip motive etmekten zevk alırım.
6. (order 6) Yeni insanlarla tanışmak bana enerji verir.
7. (order 7) Fikirlerimi coşkuyla paylaşır ve başkalarını ikna ederim.
8. (order 8) Topluluk önünde konuşmak beni heyecanlandırır.

### S — Steady
9. (order 9) Bir projeyi tamamlamadan yenisine geçmemeyi tercih ederim.
10. (order 10) Takım arkadaşlarımı desteklemek ve onlara yardım etmek benim için önemlidir.
11. (order 11) Çatışma ortamından kaçınır, uzlaşı arayışına girerim.
12. (order 12) Tutarlı ve öngörülebilir bir çalışma düzeni tercih ederim.

### C — Conscientious
13. (order 13) Bir işe başlamadan önce detaylı araştırma yapmayı severim.
14. (order 14) Hata yapmamak için çalışmalarımı defalarca kontrol ederim.
15. (order 15) Kurallara ve prosedürlere uymak benim için doğal bir alışkanlıktır.
16. (order 16) Kalite, hız ve miktardan daha önemlidir.

## DEEPENING sorular (4) — karma/derinleştirme

17. (order 17, C) Stres altında bile sakin ve sistematik düşünmeyi sürdürebiliyorum.
18. (order 18, S) Başarımı başkalarıyla paylaşmak beni tek başıma başarmaktan daha çok memnun eder.
19. (order 19, D) Bir fikri savunmak için karşımdaki kişiyi tartışmaya girmeye hazırım.
20. (order 20, I) Çevremdeki insanların duygusal durumunu hızla fark ederim.

## Not
- DISC soruları **global + kilitli** (`tenantId=null`): yönetici ekleyemez/düzenleyemez/silemez; yalnız salt-okuma görür (`questions/page.tsx:150-175`).
- Canlıda bunlara ek **1 STK-custom soru** var (bkz. `stk-custom-sorular-2026-08-15.md`).
