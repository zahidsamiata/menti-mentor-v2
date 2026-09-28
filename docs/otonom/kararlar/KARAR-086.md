### KARAR-86 · Platform üye listesinde kişilik tipi görünsün mü? (0 iş — yeni iş açar) [KVKK KARARI]
> ⭐ Kaynak: V-05 incelemesi (menti-mentor#100 yorum 5827763970).
**Şu an ne var:** Platform yöneticisinin kurum detayındaki üye listesi her satırda ad ile birlikte DISC tipini gösteriyor (`backend/src/controllers/platformTenantController.ts:186,202`; tek kişi detayında da `:240,261`). V-05 ile toplu grafikte küçük gruplar gizlendi, ama aynı bilgi üye listesinde kişi bazında duruyor. Her görüntüleme zaten iz kaydına yazılıyor (`:209,252`); bu kayıtlar 90 günde siliniyor (`gdprService.ts:374,414-416`).
**Sorun ne:** Platform ekibi bir kurumun üyelerini isim isim kişilik tipiyle tarayabiliyor; toplu grafikte gizlenen küçük grupların tipi listeden tek tek okunabiliyor. Bu, psikometrik veride "gereği kadar göster" ilkesine ters.
**Neden sana soruyorum:** Psikometrik veri (KVKK) kimin, hangi düzeyde göreceği ürün/KVKK kararı.
**Seçenekler:**
- **A) Üye listesinde DISC gösterilmesin (yalnız toplu grafik)** · Kazanç: platform düzeyinde kişi bazında psikometri görünmez · **Ne kaybedersin:** destek verirken kişinin tipine bakılamaz · Süre S · Migration: yok · Kullanıcı ne görür: platform yöneticisi listede ve kişi detayında tip bilgisini görmez · Geri alınır: evet
- **B) Kalsın (platform yöneticisi destek için görmeli)** · Kazanç: sıfır iş · **Ne kaybedersin:** V-05'in platform tarafındaki kazancı sembolik kalır · Süre 0 · Kullanıcı ne görür: değişiklik yok · Geri alınır: — · Migration: yok
- **C) Listede gösterilmesin, yalnız tek kişinin detay sayfasında kalsın** (iz kaydı bugün zaten var, `:252`) · Kullanıcı ne görür: listede tip sütunu yok, kişiye tıklayınca görür · Kazanç: toplu tarama kapanır, destek senaryosu korunur · **Ne kaybedersin:** kişi bazında psikometri yine görünür; iz kaydı 90 günde silindiği için geriye dönük denetim sınırlı · Süre S · Geri alınır: evet · Migration: yok
**Karşılaştırma:** A veri minimizasyonuna en uygun; B pratik; C ara yol.
**Benim önerim:** A — platform yöneticisinin kişi bazında kişilik tipine ihtiyacı olan somut bir destek senaryosu kodda yok. *(KVKK kararı senin.)*
**Cevap vermezsen:** mevcut durum sürer.
**İlgili kartlar:** KARAR-67 (yöneticinin kişi bazında hassas veriye inme sınırı) · KARAR-116 (aynı DISC verisinin gereksiz kopyası)
**CEVAP:**

---

