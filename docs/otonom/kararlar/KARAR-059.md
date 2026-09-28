### KARAR-59 · Kurgu/persona kişi adları "Kişi Adı Yasağı"na dahil mi?  (2 işi açar)  [ÜRÜN KARARI · KURAL/KVKK]
**Şu an ne var:** İki ayrı yerde koda/belgeye gömülü kurgu kişi adları var:
1. **Seed/kod senaryoları:** öğrenme yolculuğu senaryolarında "Zeynep"/"Deniz" gibi adlar koda gömülü (`seed-learning-journey.ts`). Belge isim-değişkeni öngörüyor, kod uygulamamış. Kanıt: `icerik-kalitesi-2026-09-23.md:229-230` (A.4).
2. **Persona belgeleri:** persona/panel tasarım belgelerinde kurgu kişi adları kullanılmış. Kanıt: `persona-panel-gelisimi-2026-09-23.md:165,247` (A.4).
**Sorun ne:** CLAUDE.md "Kişi Adı Yasağı" kuralı gerçek kişi adlarını yasaklıyor; ama kurgu/persona adlarının (bir senaryodaki hayali "Zeynep", bir persona belgesindeki temsili kişi) bu yasağa girip girmediği tanımsız. Persona mı, ihlal mi belirsiz.
**Neden sana soruyorum:** Kurgu adın "kabul edilebilir tasarım öğesi" mi "kural ihlali" mi olduğu bir politika kararı; kullanıcıya görünen içerikte (senaryolar) ve iç belgede (persona) farklı sonuç verebilir.
**Seçenekler:**
· **A — Kurgu/persona adları yasağın DIŞINDA (kabul edilebilir kurgu).** Ne kazanırsın: senaryolar ve personalar sıcak, okunur kalır; iş yok. **Ne kaybedersin:** yasağın sınırı bulanıklaşır; ileride gerçek ad kurgu sanılabilir. Süre S · geri alınır ✅ · migration yok
· **B — Kurgu adlar da nötrleştirilir** (senaryolarda "bir menti", "M." gibi; personalarda "R1/menti"). Ne kazanırsın: tek net kural, ihlal riski sıfır. **Ne kaybedersin:** senaryolar/personalar soğur, okunması zorlaşır; iki yerde metin işi. Süre M · geri alınır ✅ · migration yok
· **C — Ayrı ayrı: senaryolarda (kullanıcı görür) kalsın, persona belgelerinde (iç) nötrleştirilsin.** Ne kazanırsın: kullanıcı deneyimi sıcak, iç belge kurala uyumlu. **Ne kaybedersin:** iki farklı politika = anlatması ve denetlemesi zor. Süre M · geri alınır ✅ · migration yok
**Karşılaştırma:** Yasak yalnız gerçek kişiyi korumak içinse A yeterli; kuralın mutlak netliği öncelikse B; kullanıcı sıcaklığı ile iç disiplin ayrı ele alınacaksa C.
**Benim önerim:** öneri YOK — bu bir kural yorumu + KVKK sınırı kararı; yasağın amacını yalnız PO tanımlayabilir.
**Cevap vermezsen:** öğrenme yolculuğu senaryolarının (A.4) ad-değişkeni işi ve persona belgelerinin gelişimi (KARAR-68) hangi ad politikasıyla ilerleyeceğini bilemez.
**CEVAP:**

---

