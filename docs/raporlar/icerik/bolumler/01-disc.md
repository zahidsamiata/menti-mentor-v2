# İçerik Dökümü — DISC Soruları (2026-08-26)
**🟢 BYPASS (yalnız-belge) · 📸 DONDURULMUŞ (2026-08-26)** — kaynak: `backend/prisma/seed.ts` (kod gerçeği). Kullanıcı yanıtı/PII yoktur.

---

## Kaynak & yöntem notu (kod gerçeği)

- Soru bankası: `backend/prisma/seed.ts` satır **30–184**, sabit adı `DISC_QUESTIONS`.
- Her sorunun veri tipi (`QuestionSeed`, satır 23–28): yalnızca `text`, `type`, `discDimension`, `order` alanlarını taşır. Yanıt ölçeği / puanlama yönü **veri alanı olarak tutulmaz** — yalnızca dosya başındaki açıklama yorumunda (satır 18–21) tanımlıdır.
- Veritabanına yazım: satır **324–337** (`for … prisma.question.create`). Yazılan alanlar: `tenantId: null`, `text`, `type`, `discDimension`, `order`, `isActive: true` (satır 327–334).
- **Global kanıtı:** her soru `tenantId: null` ile yazılır (satır 328, yorum: "global — tüm tenant'larda erişilebilir"). Ayrıca satır 322 yorumu: "32 global soru (tenantId: null → tüm tenant'larda görünür)". Seed öncesi temizlik de global kapsamı doğrular: satır 317–318 `prisma.question.deleteMany({ where: { tenantId: null } })`.

### Yanıt tipi (Likert 1-5) — kanıt
- Ölçek, `DISC_QUESTIONS` başlığındaki yorumda tanımlı (satır 20): **"Yanıt ölçeği: 1 = Hiç katılmıyorum … 5 = Tamamen katılıyorum"** → 5'li Likert.
- ⚠️ Bu ölçek `seed.ts` içinde **kod olarak (enum/alan) tutulmaz**, yalnızca yorumdur. Seçenek/skor tablosu bu dosyada yok.

### Puanlama mantığı — kanıt
- Yorum satır 21: **"Puanlama yönü: Her soru kendi boyutunu pozitif yönde ölçer (5 = yüksek boyut skoru)"** → her soru, `discDimension` alanındaki boyutu **pozitif yönde** ölçer; ters (reverse) kodlanan soru **yoktur**.
- Puan → boyut eşlemesi: sorunun `discDimension` alanı hangi boyutsa (D/I/S/C), verilen 1–5 puanı o boyuta pozitif katkı yapar.
- ⚠️ Puanların boyut skoruna **nasıl toplandığı/normalize edildiği** (ağırlık, ortalama vb.) `seed.ts` içinde **YOK** — bu dosya yalnız soru bankasını tohumlar. Toplama/normalize mantığı başka modülde olabilir; bu dosyadan **ANLAŞILMADI**.

> Not: `seed.ts` içinde import edilen `QuestionTier` / `AnswerFormat` enum'ları DISC sorularına **ait değildir**; bunlar ayrı **SJT** soru bankası içindir (`SjtQuestionSeed`, satır 520+). DISC soruları herhangi bir `answerFormat` alanı taşımaz.

---

## Sorular (32/32 — tam metin)

Her sorunun ortak nitelikleri (kod gerçeği): Yanıt = Likert 1-5 (yorum satır 20) · Puanlama = kendi boyutunu pozitif yönde (yorum satır 21) · global = `tenantId: null` (satır 328). Aşağıda her satır için tek tek tekrarlanmıştır.

### D (Dominant) — CORE

**1. (order 1 · boyut D · CORE)** — satır 33–36
> Karşılaştığım engellere rağmen hedefimi değiştirmeden ilerlemeyi tercih ederim.
- Yanıt tipi: Likert 1-5 (yorum satır 20). Puanlama: D boyutunu pozitif yönde (yorum satır 21). global: `tenantId: null` (satır 328).

**2. (order 2 · boyut D · CORE)** — satır 37–40
> Bir konuda tartışmak yerine hızla karar vererek öne çıkmayı tercih ederim.
- Yanıt tipi: Likert 1-5. Puanlama: D pozitif. global: `tenantId: null`.

**3. (order 3 · boyut D · CORE)** — satır 41–44
> Rutin ve tekrar eden işler zaman içinde beni sıkmaya başlar.
- Yanıt tipi: Likert 1-5. Puanlama: D pozitif. global: `tenantId: null`.

**4. (order 4 · boyut D · CORE)** — satır 45–48
> Meydan okumalar ve zorluklar benim için bir motivasyon kaynağıdır.
- Yanıt tipi: Likert 1-5. Puanlama: D pozitif. global: `tenantId: null`.

**5. (order 5 · boyut D · CORE)** — satır 49–52
> Bir projeyi başlatmak, detaylandırmak ve tamamlamaktan daha çok ilgimi çeker.
- Yanıt tipi: Likert 1-5. Puanlama: D pozitif. global: `tenantId: null`.

### I (Influential) — CORE

**6. (order 6 · boyut I · CORE)** — satır 56–59
> Farklı ortamlarda yeni insanlarla tanışmak bana enerji verir.
- Yanıt tipi: Likert 1-5. Puanlama: I pozitif. global: `tenantId: null`.

**7. (order 7 · boyut I · CORE)** — satır 60–63
> Bir fikri hayata geçirmek için önce insanları ikna etmeye çalışırım.
- Yanıt tipi: Likert 1-5. Puanlama: I pozitif. global: `tenantId: null`.

**8. (order 8 · boyut I · CORE)** — satır 64–67
> Topluluk önünde konuşmak ya da sunum yapmak beni heyecanlandırır.
- Yanıt tipi: Likert 1-5. Puanlama: I pozitif. global: `tenantId: null`.

**9. (order 9 · boyut I · CORE)** — satır 68–71
> Başkalarını motive etmek ve ilham vermek benim doğal bir güçlüğüm gibi hissettiriyor.
- Yanıt tipi: Likert 1-5. Puanlama: I pozitif. global: `tenantId: null`.

**10. (order 10 · boyut I · CORE)** — satır 72–75
> İlişkileri ve iletişimi ön planda tutarak sonuca ulaşmayı tercih ederim.
- Yanıt tipi: Likert 1-5. Puanlama: I pozitif. global: `tenantId: null`.

### S (Steady) — CORE

**11. (order 11 · boyut S · CORE)** — satır 79–82
> Ani değişiklikler yerine önceden planlanmış rutinleri tercih ederim.
- Yanıt tipi: Likert 1-5. Puanlama: S pozitif. global: `tenantId: null`.

**12. (order 12 · boyut S · CORE)** — satır 83–86
> Bir ekipte herkesin üzerine düşeni yapması benim için önceliklidir.
- Yanıt tipi: Likert 1-5. Puanlama: S pozitif. global: `tenantId: null`.

**13. (order 13 · boyut S · CORE)** — satır 87–90
> Çevremdeki insanların ihtiyaçlarına duyarlı olmak ve destek vermek bana anlamlı gelir.
- Yanıt tipi: Likert 1-5. Puanlama: S pozitif. global: `tenantId: null`.

**14. (order 14 · boyut S · CORE)** — satır 91–94
> Uzun süreli ve güven temelli ilişkiler kurmak kısa vadeli kazanımlardan daha önemlidir.
- Yanıt tipi: Likert 1-5. Puanlama: S pozitif. global: `tenantId: null`.

**15. (order 15 · boyut S · CORE)** — satır 95–98
> Bir görevi tamamlarken sabırlı ve istikrarlı bir tempo ile ilerlemeyi tercih ederim.
- Yanıt tipi: Likert 1-5. Puanlama: S pozitif. global: `tenantId: null`.

### C (Conscientious) — CORE

**16. (order 16 · boyut C · CORE)** — satır 103–106
> Bir işe başlamadan önce tüm detayları ve olası riskleri değerlendirmem gerekir.
- Yanıt tipi: Likert 1-5. Puanlama: C pozitif. global: `tenantId: null`.

**17. (order 17 · boyut C · CORE)** — satır 107–110
> Hata yapmaktan kaçınmak için gerekirse daha fazla zaman harcarım.
- Yanıt tipi: Likert 1-5. Puanlama: C pozitif. global: `tenantId: null`.

**18. (order 18 · boyut C · CORE)** — satır 111–114
> Belirlenen standartlara ve kurallara uymak benim için önemlidir.
- Yanıt tipi: Likert 1-5. Puanlama: C pozitif. global: `tenantId: null`.

**19. (order 19 · boyut C · CORE)** — satır 115–118
> Verilerle ve kanıtlarla desteklenmemiş kararlar beni rahatsız eder.
- Yanıt tipi: Likert 1-5. Puanlama: C pozitif. global: `tenantId: null`.

**20. (order 20 · boyut C · CORE)** — satır 119–122
> Kalite, hız veya miktardan her zaman daha önce gelir.
- Yanıt tipi: Likert 1-5. Puanlama: C pozitif. global: `tenantId: null`.

### D (Dominant) — DEEPENING

**21. (order 21 · boyut D · DEEPENING)** — satır 126–129
> Başkalarının eleştirilerine rağmen kendi kararımın doğru olduğuna inanıyorsam geri adım atmam.
- Yanıt tipi: Likert 1-5. Puanlama: D pozitif. global: `tenantId: null`.

**22. (order 22 · boyut D · DEEPENING)** — satır 130–133
> Rekabetçi ortamlar beni olumsuz etkilemez, tam tersine daha iyi performans göstermemi sağlar.
- Yanıt tipi: Likert 1-5. Puanlama: D pozitif. global: `tenantId: null`.

**23. (order 23 · boyut D · DEEPENING)** — satır 134–137
> Büyük, cesur hedefler belirlemek küçük adımlarla ilerlemekten daha ilgimi çeker.
- Yanıt tipi: Likert 1-5. Puanlama: D pozitif. global: `tenantId: null`.

### I (Influential) — DEEPENING

**24. (order 24 · boyut I · DEEPENING)** — satır 141–144
> Yalnız çalışmak yerine başkalarıyla birlikte bir şey üretmek daha anlamlı gelir.
- Yanıt tipi: Likert 1-5. Puanlama: I pozitif. global: `tenantId: null`.

**25. (order 25 · boyut I · DEEPENING)** — satır 145–148
> Bir görüşme ya da toplantıda olumlu bir atmosfer oluşturmak benim için önceliktir.
- Yanıt tipi: Likert 1-5. Puanlama: I pozitif. global: `tenantId: null`.

**26. (order 26 · boyut I · DEEPENING)** — satır 149–152
> Duygusal bağ kuramadığım insanlarla uzun soluklu iş yapmak benim için zorlaşır.
- Yanıt tipi: Likert 1-5. Puanlama: I pozitif. global: `tenantId: null`.

### S (Steady) — DEEPENING

**27. (order 27 · boyut S · DEEPENING)** — satır 156–159
> Belirsizlik içeren projelerde çalışmak stresimi belirgin şekilde artırır.
- Yanıt tipi: Likert 1-5. Puanlama: S pozitif. global: `tenantId: null`.

**28. (order 28 · boyut S · DEEPENING)** — satır 160–163
> Ekibim benimle hemfikir olmasa bile sakin ve yapıcı bir tutum sergilemeye çalışırım.
- Yanıt tipi: Likert 1-5. Puanlama: S pozitif. global: `tenantId: null`.

**29. (order 29 · boyut S · DEEPENING)** — satır 164–167
> Bir kez güvendiğim birine uzun süre sadık kalırım, ilişkiyi kolay bırakmam.
- Yanıt tipi: Likert 1-5. Puanlama: S pozitif. global: `tenantId: null`.

### C (Conscientious) — DEEPENING

**30. (order 30 · boyut C · DEEPENING)** — satır 172–175
> Sonuçtan çok sürecin doğru ve eksiksiz işlemesi benim için önemlidir.
- Yanıt tipi: Likert 1-5. Puanlama: C pozitif. global: `tenantId: null`.

**31. (order 31 · boyut C · DEEPENING)** — satır 176–179
> Kendi işimde en ufak bir hata bile olsa bunu fark etmek ve düzeltmek isterim.
- Yanıt tipi: Likert 1-5. Puanlama: C pozitif. global: `tenantId: null`.

**32. (order 32 · boyut C · DEEPENING)** — satır 180–183
> Bir konuyu tam olarak anlamadan ve yeterli bilgiye sahip olmadan harekete geçemem.
- Yanıt tipi: Likert 1-5. Puanlama: C pozitif. global: `tenantId: null`.

---

## D/I/S/C dağılım tablosu

| Boyut | CORE | DEEPENING | Toplam | Order aralıkları |
|-------|------|-----------|--------|------------------|
| D (Dominant)       | 5 | 3 | 8 | CORE 1–5,  DEEPENING 21–23 |
| I (Influential)    | 5 | 3 | 8 | CORE 6–10, DEEPENING 24–26 |
| S (Steady)         | 5 | 3 | 8 | CORE 11–15, DEEPENING 27–29 |
| C (Conscientious)  | 5 | 3 | 8 | CORE 16–20, DEEPENING 30–32 |
| **Toplam**         | **20** | **12** | **32** | order 1–32 |

- Kod yorumu (satır 18): "5 CORE + 3 DEEPENING = 8 soru/boyut (toplam 32)" → tablo bununla birebir uyuşur.

---

## "20 vs 32 çelişkisi" — sayım & kanıt

- **`DISC_QUESTIONS` dizisinde fiilen 32 nesne var.** Her sorunun `order` alanı 1'den 32'ye kadar kesintisiz artar (satır 35 `order: 1` … satır 182 `order: 32`). Elle sayım: CORE 20 + DEEPENING 12 = **32**.
- **Yazım döngüsü 32 kez çalışır:** satır 324–337 döngü `DISC_QUESTIONS` üzerinde döner ve her turda `questionCount++` yapar; ardından satır 338 log: `console.log(` ✓ Soru bankası: ${questionCount} soru oluşturuldu (8D + 8I + 8S + 8C)`)`. Dizi 32 elemanlı olduğundan log **"32 soru"** basar.
- **"20" nereden gelir?** Kodda tek başına "20" yalnızca **CORE** alt kümesinin sayısıdır (order 1–20 = 20 CORE sorusu). Yani 20, DISC bankasının tümü değil, yalnızca CORE dilimidir. Kod içinde "toplam 20 soru" iddiası **YOKTUR** — tersine hem yorum (satır 18, 322–323) hem log (satır 338) net biçimde **32** der.
- **Sonuç:** Kod gerçeğinde çelişki YOK — banka **32 sorudur (20 CORE + 12 DEEPENING)**. Eğer başka bir belgede "20 soru" yazıyorsa, bu ya yalnız CORE dilimini kastediyordur ya da eskimiş bir bilgidir; `seed.ts` kod gerçeği 32'dir.

### Silinmiş `seed-questions.ts` referansı
- `seed.ts` içinde `seed-questions.ts`'e **hiçbir import/referans yoktur** (import blokları satır 12–13 yalnız `seed-certification.js` ve `seed-learning-journey.js` çeker). DISC soruları tümüyle `seed.ts` içindeki inline `DISC_QUESTIONS` dizisinden gelir.
- Proje notuna göre `seed-questions.ts` daha önce silinmiştir (backend `5745e0f`, "ölü/çelişen seed-questions.ts kaldır"). Dolayısıyla soru bankasının **tek canonical kaynağı** artık `seed.ts` içindeki `DISC_QUESTIONS`'tır.

---

## ANLAŞILMADI (uydurulmadı)

1. **Puan → boyut skoru toplama/normalize mantığı:** `seed.ts` yalnızca soruları tohumlar; 1–5 yanıtların boyut skorlarına nasıl toplandığı/ağırlıklandırıldığı/normalize edildiği bu dosyada YOK. Başka bir servis modülünde olabilir (bu görevin kapsamı `seed.ts` ile sınırlı).
2. **Yanıt seçeneklerinin fiziksel tanımı:** Likert 1-5 yalnızca yorumda (satır 20) belirtilir; seçenek etiketleri ("Hiç katılmıyorum" vb.) `Question` kaydına alan olarak yazılmaz. Etiketlerin nerede tanımlandığı (frontend sabiti vb.) bu dosyadan ANLAŞILMADI.
