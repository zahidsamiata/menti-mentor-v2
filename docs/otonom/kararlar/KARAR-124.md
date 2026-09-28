### KARAR-124 · Platform yöneticisinin "mentör/menti sayısı" neyi saysın: kişiyi mi, kurum üyeliğini mi? (0 iş kilitliyor; cevap 1 küçük iş açar) [ÜRÜN KARARI · VERİNİN ANLAMI]
**Şu an ne var:** Platform ve süper-yönetici panelindeki mentör/menti sayıları kullanıcının genel rolünden sayılıyor; kurum panelleri ise AJ-01 ile kurum üyeliğindeki role geçti. Kanıt: `backend/src/controllers/platformController.ts:121-124` · `backend/src/controllers/adminSettingsController.ts:292-293` · kaynak `docs/otonom/00-SIMDI.md:81`.
**Sorun ne:** İki kurumda farklı rolde olan bir kişi platformda tek rolle sayılıyor; kurum toplamlarıyla platform toplamı tutmuyor.
**Neden sana soruyorum:** Sayının anlamı (kaç insan mı, kaç kurum-rolü mü) yöneticiye verilen mesajı değiştirir.
**Seçenekler:**
- **A) Üyelik say (kurum-rol çifti).** · Kullanıcı ne görür: platform toplamı kurum toplamlarının toplamına eşit · Kazanç: tutarlılık · Kaybedersin: aynı kişi iki kez sayılır; "kaç insan" sorusu cevapsız · Süre: S · Geri alınır: evet · Migration: yok
- **B) Tekil kişi say; rolü "en az bir kurumda mentör" diye tanımla.** · Kullanıcı ne görür: gerçek insan sayısı · Kazanç: büyüme için doğru ölçü · Kaybedersin: iki rolü olan kişi iki grupta da görünür; toplamlar toplanmaz · Süre: S · Geri alınır: evet · Migration: yok
- **C) İkisini birden göster ("X kişi · Y üyelik").** · Kullanıcı ne görür: iki sayı yan yana · Kazanç: iki soru da cevaplı · Kaybedersin: panel kalabalıklaşır · Süre: S · Geri alınır: evet · Migration: yok
**Karşılaştırma:** Kurum raporlarıyla tutarlılık istiyorsan A; platform büyümesini insan olarak izlemek istiyorsan B; ikisini de görmek istiyorsan C.
**Benim önerim:** C — iki sayı da düşük maliyetli ve yanlış yorum riskini kaldırır; bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** Platform sayıları genel role göre kalır (tutarsızlık sürer).
**CEVAP:**


