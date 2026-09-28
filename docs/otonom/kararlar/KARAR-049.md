### KARAR-49 · `devir/01` ve `devir/06`: "dondurulmuş" mu, "kalıcı referans" mı?  [BELGE POLİTİKASI] (2 işi açar)
> ⭐ **Kaynak:** yönetişim konseyi (`docs/raporlar/kesif/konsey-yonetisim-2026-09-21.md`), 2026-09-21.

**Şu an ne var:** İki devir belgesi künyesinde **tek cümle içinde** hem 📸 DONDURULMUŞ hem *"kalıcı referans"* yazıyor (`devir/01-felsefe-ve-calisma-tarzi.md:3` · `devir/06-devir-kilavuzu.md:3`). Üstelik `01`'in başlığı **"yeni sohbet önce bunu oku"**. İçlerinde bugün geçersiz olan **6 "PR aç, merge etme" satırı** var (`01`'de 2 · `06`'da 2 · `03`'te 1 · `04`'te 1). Kanıt: `docs/00-BELGE-HARITASI.md:61`. İkinci kat çelişki: `00-BELGE-HARITASI.md:38` bu iki dosyayı **🔄** etiketliyor, dosyalar kendini **📸** diyor.

**Sorun ne:** Yeni bir oturum "önce bunu oku" diyen belgeyi açıp **artık geçerli olmayan merge kuralını** öğreniyor. Doğrusu kapıya bağlı (🟢 merge et · 🟡 PR'da bekle · 🔴 dokunma). Sonuç: ajan 🟢 işleri merge etmiyor, otonom kuyruk tıkanıyor. BB turu 9 yeri düzeltti, bu 6'sına "dondurulmuş belgeye dokunulmaz" gerekçesiyle dokunmadı — **iki turdur açık**.

**Neden sana soruyorum:** Dondurulmuş belgeye dokunmak "tarihsel iz" ilkesini deler; dokunmamak yanlış kuralı yürürlükte bırakır. İkisi de belge politikası kararı, teknik değil.

**Seçenekler:**
· **A — Künyeden "kalıcı referans" ibaresini kaldır, yönlendirme ekle.** Kullanıcı ne görür: `01`/`06` açınca *"bu 2026-08-11 fotoğrafıdır; güncel kural `CLAUDE.md § MERGE POLİTİKASI`"*. Ne kazanırsın: tarihsel iz **tam korunur**, yanlış kural etkisizleşir. **Ne kaybedersin:** belge hâlâ "önce bunu oku" diyor — yeni gelen yine oradan başlar, 6 bayat satırı yine okur. Süre **S** · geri alınır ✅ · migration yok.
· **B — 6 bayat satırı `~~[ESKİ]~~` + ⚠️ GÜNCELLEME ile damgala** (BB'nin diğer 9'da yaptığının aynısı). Kullanıcı ne görür: satırı görür ama üstü çizilidir, altında doğrusu yazar. Ne kazanırsın: **tutarlılık** — aynı kural her yerde aynı biçimde düzeltilmiş olur. **Ne kaybedersin:** dondurulmuş belge düzenlenmiş olur (ilke esner, emsal doğar); 4 dosyaya dokunulur; ileride "hangi 📸 belgeye dokunulabilir" sorusu belirsizleşir. Süre **S** · geri alınır ✅ · migration yok.
· **C — `devir/01-06` setini arşive taşı, yerine tek "yeni gelen" sayfası.** Kullanıcı ne görür: tek güncel başlangıç sayfası. Ne kazanırsın: kök sorun biter, "önce bunu oku" tek ve doğru yere işaret eder. **Ne kaybedersin: en pahalısı** — 6 belge taşınır, onlara giden atıflar kırılır, devir hikâyesi dağılır; SİLME PROTOKOLÜ'nün 5 adımı işletilmeli. Süre **M** · geri alınır ⚠️ (git mv + atıflar elle) · migration yok.

**Karşılaştırma:** A en ucuz ve ilkeye en sadık olanı ama "önce bunu oku" tuzağını bırakıyor. B tutarlılığı sağlıyor ve BB'nin zaten kurduğu deseni tamamlıyor; ilkeden sapması küçük çünkü damga **silme değil ekleme**. C sorunu kökten çözüyor ama bu turun kapasitesinin üstünde ve atıf ağını riske atıyor.

**Benim önerim:** **B** — çünkü BB zaten 9 yeri bu desenle düzeltti; 6'sını dışarıda bırakmak kuralın kendisini yarım uygulamak oluyor, ve damga hiçbir tarihsel izi silmiyor.

**Cevap vermezsen:** Belge işleri ilerler ama **yeni her oturum yanlış merge kuralını okumaya devam eder**; otonom kuyruk 🟢 işlerde tıkanmayı sürdürür.

**CEVAP:**

---

