### KARAR-54 · Mentör/menti kart havuzu 5 tasarım kararı  (5+ işi açar)  [ÜRÜN KARARI · TASARIM · EN YÜKSEK ÖNCELİK]
**Şu an ne var:** Menti panosunda basit bir mentör havuzu zaten var: iki sütunlu kartlar; her kartta ad, en çok 3 sektör etiketi ("+N" yok), uyum yüzdesi ve "neden uyumlu" satırı; mizaç gösterilmiyor (menti mentörün DISC tipini görmez kuralı); sayfalama/arama/filtre yok, tek istekte en çok 100 mentör (`menti/page.tsx:307-350` · `lib/api/matching.ts:24`). Rakip analizindeki zengin kart havuzu (rozet, etiket katlama, sayfa düzeni, menti kartı) için beş tasarım kararı verilmedi. Kanıt: `mentor-karti-rakip-analizi:87-91` · OB-01..05 (`00-ANALIZ-TURU-OZETI-2026-09-23.md:86`).
**Sorun ne:** Kullanıcı mentör/menti ararken bir kart havuzu görecek; bu havuzun beş temel biçim kararı (mizaç nasıl gösterilsin, sektör etiketi kaç tane, sayfa başına kaç kart, arama/filtre bu turda mı, menti kartı mentör kartıyla aynı mı) verilmeden ekran çizilemez. Beşi de kullanıcının ne göreceğini belirler, teknik değildir.
**Neden sana soruyorum:** Beş kalem de "kullanıcı ne görür / neyi yapabilir" kararı; kütüphane/kod değil, ürün biçimi.
**Seçenekler:** (bu kart KÜMELE — beş alt-soruyu tek tek A/B ile sun)

**54.1 — Mizaç kartta nasıl gösterilsin?**
· **A — Arketip adı + rozet** (ör. "Öncü" + renkli rozet). Kullanıcı ne görür: kartta arketip adı ve renkli rozet. Ne kazanırsın: sıcak, oyunsu, tek bakışta. **Ne kaybedersin:** ham boyut bilgisi gizlenir; "damgalayan dil" riski (bkz. KARAR-48); bugünkü "menti mentörün DISC tipini görmez" kuralı (`menti/page.tsx:308-309`) gevşer. Süre S · geri alınır ✅ · migration yok
· **B — Kısa ipucu cümlesi** ("iletişimde doğrudan"). Kullanıcı ne görür: kartta tek satır tarz ipucu, etiket yok. Ne kazanırsın: temkinli, etiketlemez. **Ne kaybedersin:** daha sönük, kart kalabalıklaşır. Süre S · geri alınır ✅ · migration yok

**54.2 — Sektör etiketi kaç tane + "+N" katlaması?**
· **A — En fazla 2 etiket + "+N"** (ör. "Yazılım, Eğitim +3"). Kullanıcı ne görür: 2 sektör ve kalanların sayısı. Ne kazanırsın: kart temiz. **Ne kaybedersin:** kullanıcı tüm sektörleri kartta göremez, tıklaması gerekir. Süre S · geri alınır ✅ · migration yok
· **B — En fazla 3 etiket + "+N"**. Kullanıcı ne görür: 3 sektör ve kalanların sayısı (bugün 3 var, sayı yok). Ne kazanırsın: daha çok bağlam. **Ne kaybedersin:** dar ekranda kart taşar. Süre S · geri alınır ✅ · migration yok

**54.3 — Sayfa başına kaç kart?**
· **A — 9 kart (3×3 grid) + sayfalama**. Kullanıcı ne görür: 9 kartlık sayfalar ve sayfa düğmeleri. Ne kazanırsın: hızlı yüklenir, net. **Ne kaybedersin:** çok mentör varken çok sayfa gezilir. Süre S · geri alınır ✅ · migration yok
· **B — 12+ kart, sonsuz kaydırma**. Kullanıcı ne görür: aşağı kaydırdıkça yeni kartlar yüklenir. Ne kazanırsın: akıcı gezinme. **Ne kaybedersin:** performans yükü (backend `take:500` + cache, A8), konum kaybı. Süre M · geri alınır ✅ · migration yok

**54.4 — Arama/filtre bu turda mı?**
· **A — Bu tur yalnız liste, arama/filtre sonraki tur**. Kullanıcı ne görür: yalnız uyuma göre sıralı liste. Ne kazanırsın: havuz hızlı canlıya çıkar. **Ne kaybedersin:** çok mentörde kullanıcı istediğini bulmakta zorlanır. Süre S · geri alınır ✅ · migration yok
· **B — Sektör + uyum% filtresi bu tur**. Kullanıcı ne görür: listenin üstünde sektör ve uyum filtresi. Ne kazanırsın: kullanıcı ilk günden filtreler. **Ne kaybedersin:** havuz işi büyür, gecikir. Süre M · geri alınır ✅ · migration yok

**54.5 — Menti kartı mentör kartıyla aynı mı?**
· **A — Aynı şablon** (aynı alanlar, aynı düzen). Kullanıcı ne görür: mentör ve menti kartları aynı düzende. Ne kazanırsın: tek bileşen, bakımı kolay. **Ne kaybedersin:** menti ile mentörün gösterilmesi gereken bilgi farklı olabilir (menti aranan konu, mentör uzmanlık). Süre S · geri alınır ✅ · migration yok
· **B — İki ayrı şablon**. Kullanıcı ne görür: menti kartında aradığı konu, mentör kartında uzmanlık öne çıkar. Ne kazanırsın: her role uygun alan. **Ne kaybedersin:** iki bileşen bakımı, tutarsızlık riski. Süre M · geri alınır ✅ · migration yok

**Karşılaştırma:** Beş kalemin ortak mantığı "hızlı canlıya çıkar + sade" (A tarafı) ile "zengin + esnek" (B tarafı) arasında. Havuzu bir an önce kullanıcının önüne koymak öncelikse çoğunlukla A; ilk izlenimde zenginlik öncelikse B.
**Benim önerim:** öneri YOK — bu beş alt-soru tamamen ürün/tasarım tercihi; her biri geri alınır ve düşük riskli, PO'nun görsel önceliğine bağlı.
**Cevap vermezsen:** zengin kart havuzu (OB-01..05) çizilemez; bugünkü basit liste (uyum% + en çok 3 sektör, `menti/page.tsx:307-350`) olduğu gibi kalır; AJ-90 (mentör havuzu sayfalama) cevap yoksa sayfa başına 18 kartla ilerler (`00-KUYRUK.md:159`).
**İlgili kartlar:** KARAR-45 (rozetteki arketip adı) · KARAR-48 (uyum% ve kimlik dili) · KARAR-60 (kartta yüzde gösterimi) · KARAR-64 (mizaç alanının adı)
**CEVAP:**

---

