### KARAR-61 · Eşleşme puanının yeni formülü arketip motoruyla AYNI ANDA mı açılsın?  (2 işi açar)  [ÜRÜN KARARI]
**Şu an ne var:** Kullanıcının eşleşme kartında gördüğü yüzde bugün iki parçadan hesaplanıyor: alan/sektör benzerliği %60 + DISC mizaç uyumu %40 (`scoring.ts:89-90`). Eşleşmeyi tamamen engelleyen tek kural "D tipi mentör + S tipi menti" ve havuz daralınca gevşiyor (`matching.ts:210`). Ağustos tasarım kararı (`TAS:428,494`) bunu üç parçaya çeviriyor: hedef/değer uyumu %45 + alan %30 + kişilik %25; engelleme de iki kişilik-tabanlı kurala (V1/V2, `TAS:460-462`) dönüşüyor. Yeni formül kodda yok.
**Sorun ne:** KARAR-10'a "C, aşamalı" cevabı verildi: kişilik motoru üç adımda açılacak, son adımda eski↔yeni sıralama karşılaştırmalı gösterilecek. Ama formül değişikliğinin o adıma dahil olup olmadığı yazılı değil; kuyruk ikisini aynı satırda (F-11) sayıyor. İkisi aynı anda açılırsa farkın ne kadarının motordan, ne kadarının yeni ağırlıklardan geldiği ayrılamaz. Ayrıca %45'lik "hedef/değer" parçası kayıttaki üç sorunun cevabına dayanıyor; eski kullanıcılarda bu doluluk ölçülmedi.
**Neden sana soruyorum:** Kullanıcının gördüğü uyum yüzdesi değişir ve bazı çiftlerin sırası yer değiştirir; bu kaç kez ve hangi sırayla olsun kararı ürün kararıdır.
**Seçenekler:**
· **A — Tek seferde: motor + yeni formül + yeni engelleme kuralları birlikte açılır.** Kullanıcı ne görür: yüzdeler bir kez değişir. Ne kazanırsın: tasarım kararı tek turda canlıya çıkar; iş bir kez yapılır. **Ne kaybedersin:** karşılaştırmada farkın kaynağı ayrılamaz; sorun çıkarsa hangi parça bozdu bulunamaz; üç soruyu boş bırakan kullanıcıda ağırlığın %45'i boş veriyle hesaplanır. Süre L · geri alınır ✅ (açma/kapama) · migration yok (TEYİT GEREK)
· **B — İki adım: önce motor bugünkü 60/40 içinde açılır, yeni formül sonraki adımda gelir.** Kullanıcı ne görür: yüzdeler iki kez değişir. Ne kazanırsın: her adımda tek değişken, karşılaştırma anlamlı kalır; üç sorunun doluluğu arada ölçülür. **Ne kaybedersin:** iş iki kez test edilir; eski formül bir süre daha canlıda kalır; kullanıcı yüzdenin iki kez oynadığını fark edebilir. Süre M+M · geri alınır ✅ · migration yok
· **C — Yeni formül rafa kalkar, 60/40 kalıcı olur.** Kullanıcı ne görür: bugünkü yüzdeler (motor açılınca yalnız kişilik kısmı değişir). Ne kazanırsın: en az iş, en az risk. **Ne kaybedersin:** "ne arıyorsun ↔ ne verebilirim" uyumu puana hiç girmez; üç soru toplanır ama kullanılmaz; Ağustos kararı yeniden açılır. Süre — · geri alınır ✅ · migration yok
**Karşılaştırma:** Hızlı tek seferlik geçiş istiyorsan ve sorun çıkarsa hepsini birden kapatmayı göze alıyorsan A. KARAR-10'daki "önce/sonra karşılaştırması" gerçekten anlamlı olsun istiyorsan B. Tasarım kararından vazgeçtiysen C.
**Benim önerim:** B — KARAR-10'a verdiğin "aşamalı ve karşılaştırmalı" cevabın ruhu, her aşamada tek şeyin değişmesi.
**Cevap vermezsen:** PS-A3 (bağlama) hangi formülle açılacağını bilemez; F-11'in formül ayağı belirsiz kalır.
**CEVAP:**

---

