# İçerik Dökümü — SJT (Durumsal Yargı Testi) (2026-08-26)
**🟢 BYPASS (yalnız-belge) · 📸 DONDURULMUŞ (2026-08-26)** — kaynak: `backend/prisma/seed.ts`. PII yoktur.

---

## Özet — SAY & "3 vs 4" verdikti

- **Kesin senaryo sayısı: 3** — kanıt: `SJT_QUESTIONS` array literal `backend/prisma/seed.ts:530` başlar, `573` biter; içinde tam **3** obje vardır (satır 531, 545, 558'de `code:` alanları).
- **VERDİKT: Kod = 3, belge "4" YANLIŞ.** Belge "4" iddiası kod gerçeğiyle uyuşmuyor; seed'de yalnızca 3 senaryo tanımlı. (Not: `seedSjtQuestions()` sonunda `prisma.sjtQuestion.count()` DB'deki toplamı basar — bu, seed dışı elle eklenmiş DB kayıtları varsa farklı çıkabilir; ancak **seed kaynağı = 3**.)
- **Ölçülen boyut: OCEAN (Big Five)** — DISC DEĞİL. Kanıt: `weights` alanı yalnız `o | c | e | a | n` anahtarları kullanır (`SjtOptionSeed` tipi `seed.ts:513-518`; schema yorumu `schema.prisma:896` "OCEAN boyutu" ve `912` `Json // Partial<Record<"o"|"c"|"e"|"a"|"n", number>>`). Ek olarak `signalsArchetype` alanı arketip sinyali taşır (DISC matrisi değil).

---

## Şema Modeli (kanıt: `backend/prisma/schema.prisma`)

**`SjtQuestion`** (satır 889-903):
- `id` (cuid), `code` (String, @unique), `tier` (QuestionTier enum), `answerFormat` (AnswerFormat enum, default SINGLE), `forRole` (UserRole enum), `scenario` (String), `triggersOn` (String?, yorum: "OCEAN boyutu: o | c | e | a | n"), `isActive` (Boolean, default true), `options` (SjtOption[]), `createdAt`, `updatedAt`.
- `@@index([tier, forRole, isActive])`.

**`SjtOption`** (satır 905-917):
- `id` (cuid), `questionId`, `question` (SjtQuestion @relation, onDelete: Cascade), `key` (String), `label` (String), `weights` (Json — `Partial<Record<"o"|"c"|"e"|"a"|"n", number>>`), `signalsArchetype` (String?).
- `@@unique([questionId, key])`, `@@index([questionId])`.

Seed tarafı tipler: `SjtOptionSeed` (`seed.ts:513-518`), `SjtQuestionSeed` (`seed.ts:520-528`). Upsert mantığı: `seedSjtQuestions()` (`seed.ts:575-619`) — `sjtQuestion.upsert` (where: code) + her opsiyon için `sjtOption.upsert` (where: questionId_key). **Yalnız upsert; deleteMany YOK bu fonksiyonda.**

OCEAN kısaltmaları: o = Openness (Açıklık), c = Conscientiousness (Sorumluluk), e = Extraversion (Dışadönüklük), a = Agreeableness (Uyumluluk), n = Neuroticism (Duygusal denge/Nörotisizm).

---

## Senaryo 1 — `Q_MENTOR_CORE_01` (seed.ts:531-544)

- **code:** `Q_MENTOR_CORE_01`
- **tier:** CORE
- **forRole:** MENTOR
- **answerFormat:** SINGLE
- **triggersOn:** (yok)

**Tam senaryo metni:**
> Menteen, haftalardır çalıştığı bir projeyi sana getiriyor. Yaklaşımının temelden hatalı olduğunu fark ediyorsun. Ne yaparsın?

**Şıklar:**
- **A** — "Doğrudan söylerim: 'Bu yaklaşım çalışmaz, şu adımlarla yeniden kuralım.'"
  - weights: a: -2, c: +2, e: +1 · signalsArchetype: **M4**
- **B** — "Önce dinlerim, sorular sorarak hatayı kendisinin görmesini sağlarım."
  - weights: o: +2, e: +1, a: +1 · signalsArchetype: **M2**
- **C** — "Emeğini takdir ederek başlarım, endişelerimi nazikçe paylaşırım."
  - weights: a: +3, n: +1, e: -1 · signalsArchetype: **M3**
- **D** — "Hatayı net gösteririm ve yapılandırılmış bir düzeltme planı sunarım."
  - weights: c: +2, o: +2 · signalsArchetype: **M1**

**Neyi ölçüyor:** OCEAN. weights alanları yalnız o/c/e/a/n taşıyor. Mentörün geri bildirim üslubunu (doğrudan vs. yönlendirici vs. uyumlu) OCEAN boyutlarına ve mentör arketiplerine (M1–M4) eşliyor.

---

## Senaryo 2 — `Q_MENTI_CORE_01` (seed.ts:545-557)

- **code:** `Q_MENTI_CORE_01`
- **tier:** CORE
- **forRole:** MENTI
- **answerFormat:** SINGLE
- **triggersOn:** (yok)

**Tam senaryo metni:**
> Mentörün net bir yönerge vermeden 'Şunu bir araştır' diyor. Ne yaparsın?

**Şıklar:**
- **A** — "Hemen detaylı bir plan yapar, adım adım sistematik ilerlerim."
  - weights: c: +3, o: -1 · signalsArchetype: **m1**
- **B** — "Heyecanlanırım; farklı yönlere dalar, ilginç bulduğum şeyleri kurcalarım."
  - weights: o: +3, c: -2, e: +1 · signalsArchetype: **m2**
- **C** — "Biraz kaygılanırım, netleştirmek için mentöre tekrar yazıp yönerge isterim."
  - weights: n: +2, a: +1, c: +1 · signalsArchetype: **m3**
- **D** — "Fırsat olarak görürüm; kendi yorumumu katıp iddialı bir şey hazırlarım."
  - weights: o: +2, e: +2, a: -2 · signalsArchetype: **m4**

**Neyi ölçüyor:** OCEAN. weights yalnız o/c/e/a/n. Belirsizlik karşısında menti tepkisini (planlı/keşifçi/kaygılı/iddialı) OCEAN boyutlarına ve menti arketiplerine (m1–m4) eşliyor.

---

## Senaryo 3 — `Q_MENTI_FOLLOWUP_N_01` (seed.ts:558-572)

- **code:** `Q_MENTI_FOLLOWUP_N_01`
- **tier:** FOLLOWUP
- **forRole:** MENTI
- **answerFormat:** MOST_LEAST
- **triggersOn:** **n** (Neuroticism / duygusal denge boyutu — bu boyutta belirsizlik olunca tetiklenir)

**Tam senaryo metni:**
> Mentörün mesafeli bir geri bildirim verdi. Aşağıdakilerden seni EN ÇOK ve EN AZ yansıtanı seç.

**Şıklar:**
- **A** — "Üslubuna takılmam, içeriğe bakarım."
  - weights: n: -3 · signalsArchetype: **m1**
- **B** — "İlişkinin durumunu uzun uzun sorgularım."
  - weights: n: +3, a: +1 · signalsArchetype: **m3**
- **C** — "Mesafeli üslubu ben de mesafeyle karşılarım."
  - weights: a: -2, e: -1 · signalsArchetype: (yok)
- **D** — "Heyecanla karşılarım, yeni fikirlerle dönüş yaparım."
  - weights: o: +2, e: +2 · signalsArchetype: **m2**

**Neyi ölçüyor:** OCEAN — özellikle **n (Neuroticism)** boyutunu keskinleştirmeye yönelik FOLLOWUP (derinleştirme) sorusu. `triggersOn: 'n'` ile, ana testte n boyutu belirsiz kalan mentiye MOST_LEAST formatında sorulur. weights yalnız o/c/e/a/n.

---

## Notlar

- Üç senaryonun tümü **OCEAN** ölçer; **DISC yoktur** (ana kişilik/DISC seed'i ayrı: `seed.ts:503` "Soru: 32 (CORE:20 + DEEPENING:12) — D/I/S/C" — bu farklı bir soru havuzudur, SJT değildir). SJT havuzu tamamen OCEAN + arketip sinyali temellidir.
- Arketip kodları iki ayrı harita: **M1–M4** (MENTOR, büyük harf) ve **m1–m4** (MENTI, küçük harf). Senaryo 3'te C şıkkında `signalsArchetype` yoktur (schema'da nullable).
- **ANLAŞILMADI:** yok — tüm alanlar kod ve şema ile netleşti.
