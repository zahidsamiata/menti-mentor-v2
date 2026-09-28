### KARAR-94 · Dışa aktarım hakkı (GV-17) çıkış blokeri olsun mu (1 iş açar: GV-17) [ÜRÜN KARARI · KVKK]
> ⭐ Kaynak: KARAR-80/M18 işlenirken (2026-09-26) doğdu. GV-08/GV-09/GV-18 zaten ⛔ ÇIKIŞ BLOKERİ (T1) — KARAR-69 (b)'nin "silme hakkı" ve "aydınlatma" maddelerine giriyorlar. GV-17 aynı kovada (KVKK) ama "dışa aktarım/taşınabilirlik hakkı" ayrı bir madde; KARAR-69 (b) bunu açıkça saymamıştı, o yüzden ajan kendiliğinden blokere eklemedi.
**Şu an ne var:** Kullanıcı "verilerimi indir" dediğinde (`gdprService.ts:284-333`) yalnız 6 kaynak dışa aktarılıyor; kendi psikometrik profili (OCEAN/arketip/DISC türevleri, ≈22 `User` alanı + 16 tablo) ve kendi yazdığı mesajların içeriği YOK.
**Sorun ne:** KVKK'nın "veri taşınabilirliği" hakkı — kullanıcı kendi verisinin tam kopyasını isteyebilmeli. Bugün istediği kopya eksik; bunu bir denetim ya da kullanıcı şikayeti ortaya çıkarırsa ilk kurumla karşılaşılan ilk KVKK talebi eksik yanıtlanmış olur.
**Neden sana soruyorum:** Bunu "çıkış blokeri" (canlıya çıkmadan önce şart) sayıp saymayacağın hukuki risk toleransına bağlı bir ürün kararı; ajan bunu kendi başına "elbette blokeri" diyip iş sırasını değiştiremez.
**Seçenekler:**
- **A) Evet, çıkış blokeri (T1)** · Kullanıcı ne görür: "verilerimi indir" artık eksiksiz · Kazanç: ilk kurum canlıya çıkmadan KVKK taşınabilirlik açığı kapanır · **Ne kaybedersin:** çıkış listesi bir iş daha uzar (efor M — 16 tablo + mesaj içerikleri) · Süre M · Geri alınır: evet · Migration: yok
- **B) Hayır, normal öncelikte (🟡) kalsın** · Kazanç: çıkış listesi uzamaz · **Ne kaybedersin:** ilk kurum canlıdayken eksik dışa aktarım açığı sürer; bir KVKK talebi gelirse elle tamamlanması gerekir
**Karşılaştırma:** İlk gerçek kurum + gerçek kullanıcı verisi varken bir KVKK "verilerimi ver" talebi gelme ihtimali düşük ama sıfır değil; A bu riski baştan kapatır, B riski PO'nun elle takip etmesine bırakır.
**Benim önerim:** A — GV-08/09/18 zaten aynı kovada bloker; dışa aktarımı ayrı bırakmak KVKK paketini yarım gösterir.
**Cevap vermezsen:** GV-17 🔴 KARAR-94 kilidinde kalır, 🟡 öncelikte de işlenmez.
**CEVAP:**

---

