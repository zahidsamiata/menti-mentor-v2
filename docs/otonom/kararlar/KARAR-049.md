> ⚪ gereksiz olabilir — seçenek B 2026-09-24'te fiilen uygulandı (`devir/01-felsefe-ve-calisma-tarzi.md:3-4,32-33,61-62` · commit 0c01c97; `devir/06-devir-kilavuzu.md:3,51` · 6d64e23); kalan yalnız 📸 03:61/04:75 ve belge haritası etiketi; kapatma PO'nun
### KARAR-49 · `devir/01` ve `devir/06`: "dondurulmuş" mu, "kalıcı referans" mı?  [BELGE POLİTİKASI] (2 işi açar)
> ⭐ **Kaynak:** yönetişim konseyi (`docs/raporlar/kesif/konsey-yonetisim-2026-09-21.md`), 2026-09-21.

**Şu an ne var:** Kartın sorduğu iki belge 2026-09-24'te düzeltildi (DC turu): `devir/01-felsefe-ve-calisma-tarzi.md:3-4` künyesi artık "🔄 YAŞAYAN (kısmen)", eski 📸 künyesi ve 2 bayat "PR aç, merge etme" satırı üstü çizili + GÜNCELLEME notlu (`:32-33` · `:61-62`, commit 0c01c97) — yani seçenek B bu iki satırda fiilen uygulanmış. `devir/06-devir-kilavuzu.md` baştan yazıldı (6d64e23): `:3` "🔄 YAŞAYAN giriş belgesi", `:51` doğru kapı kuralını veriyor (yalnız 🟡'de merge etme). Kalan 2 eski satır: `devir/03-kvkk-is-paketi.md:61` · `devir/04-13-admin-bulgusu.md:75` — ikisi de 📸 belgede, başlıkta "BUGÜNÜ ANLATMAZ" + güncel karşılık yönlendirmesi var (`:3-5`). Yeni çelişki ters yönde: `00-BELGE-HARITASI.md:27` · `:94` · `:99` bu iki dosyayı 📸 gösteriyor, dosyalar kendini 🔄 diyor.

**Sorun ne:** Asıl tuzak (yeni oturumun "önce bunu oku" belgesinden eski merge kuralını öğrenmesi) kapandı. Kalan: 📸 03/04'te iki eski satır (başlık uyarısıyla korunuyor) ve belge haritasının 01/06 için yanlış etiketi.

**Neden sana soruyorum:** Dondurulmuş belgeye dokunmak "tarihsel iz" ilkesini deler; dokunmamak yanlış kuralı yürürlükte bırakır. İkisi de belge politikası kararı, teknik değil.

**Seçenekler:**
· **A — Künyeden "kalıcı referans" ibaresini kaldır, yönlendirme ekle.** Kullanıcı ne görür: `01`/`06` açınca *"bu 2026-08-11 fotoğrafıdır; güncel kural `CLAUDE.md § MERGE POLİTİKASI`"*. Ne kazanırsın: tarihsel iz **tam korunur**, yanlış kural etkisizleşir. **Ne kaybedersin:** belge hâlâ "önce bunu oku" diyor — yeni gelen yine oradan başlar, 6 bayat satırı yine okur. Süre **S** · geri alınır ✅ · migration yok.
· **B — 6 bayat satırı `~~[ESKİ]~~` + ⚠️ GÜNCELLEME ile damgala** (BB'nin diğer 9'da yaptığının aynısı). Kullanıcı ne görür: satırı görür ama üstü çizilidir, altında doğrusu yazar. Ne kazanırsın: **tutarlılık** — aynı kural her yerde aynı biçimde düzeltilmiş olur. **Ne kaybedersin:** dondurulmuş belge düzenlenmiş olur (ilke esner, emsal doğar); 4 dosyaya dokunulur; ileride "hangi 📸 belgeye dokunulabilir" sorusu belirsizleşir. Süre **S** · geri alınır ✅ · migration yok.
· **C — `devir/01-06` setini arşive taşı, yerine tek "yeni gelen" sayfası.** Kullanıcı ne görür: tek güncel başlangıç sayfası. Ne kazanırsın: kök sorun biter, "önce bunu oku" tek ve doğru yere işaret eder. **Ne kaybedersin: en pahalısı** — 6 belge taşınır, onlara giden atıflar kırılır, devir hikâyesi dağılır; SİLME PROTOKOLÜ'nün 5 adımı işletilmeli. Süre **M** · geri alınır ⚠️ (git mv + atıflar elle) · migration yok.

**Karşılaştırma:** A en ucuz ve ilkeye en sadık olanı ama "önce bunu oku" tuzağını bırakıyor. B tutarlılığı sağlıyor ve BB'nin zaten kurduğu deseni tamamlıyor; ilkeden sapması küçük çünkü damga **silme değil ekleme**. C sorunu kökten çözüyor ama bu turun kapasitesinin üstünde ve atıf ağını riske atıyor.

**Benim önerim:** **B** — çünkü BB zaten 9 yeri bu desenle düzeltti; 6'sını dışarıda bırakmak kuralın kendisini yarım uygulamak oluyor, ve damga hiçbir tarihsel izi silmiyor.

**Cevap vermezsen:** 📸 03/04'teki iki eski satır başlık uyarısıyla yerinde kalır; `00-BELGE-HARITASI.md` 01/06'yı yanlış (📸) etiketlemeye devam eder. Kuyrukta bu karta kilitli iş yok (`00-KUYRUK.md` · `00-KUYRUK-KARAR-BEKLEYEN.md` grep 0).
**İlgili kartlar:** KARAR-50 (bayat kural satırları, aynı birikme sorunu) · KARAR-51 (📸/🔄 etiket tutarsızlığı, aynı belge haritası) · KARAR-52 (çift/bayat kural metni, belge politikası)

**CEVAP:**

---

