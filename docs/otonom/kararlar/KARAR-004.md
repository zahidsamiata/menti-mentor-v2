### KARAR-4 · Kriz durumunda yönlendirilecek "destek kaynağı" ne yazsın?  [ÜRÜN KARARI]
**Şu an ne var:** Bir şıkta "somut destek kaynağına yönlendirir" yazıyor ama kaynağın adı boş bırakılmış. Kanıt: kriz şıklarında destek yalnız soyut "profesyonel destek" diye geçiyor (`docs/raporlar/icerik/sertifika-oturum1-4-kritik-konu-2026-09-08.md:221-228`) ve belge somut kaynak adını çıkış blokeri sayıyor (KALEM 8, `:360-363`). Bugünkü seed'deki kriz şıkkı da yalnız "profesyonel yönlendirme" diyor (`backend/prisma/seed-certification.ts:242`); üründeki tek somut kaynak adı öğrenme yolculuğundaki "okul psikoloğu" (`backend/prisma/seed-learning-journey.ts:196`). Kurumun kendi destek birimini yazabileceği bir alan yok (`schema.prisma`'da karşılığı yok).
**Sorun ne:** Her kurumun kaynağı farklı: üniversitede psikolojik danışma birimi, şirkette İK, STK'da başka bir yapı. Tek metin hepsine uymuyor.
**Neden sana soruyorum:** Kurumlara görünen metin + kriz anıyla ilgili, yani yanlış yönlendirme zararlı olabilir.
**Seçenekler:**
**A) Sabit metin:** "kurumun psikolojik destek birimi; acil durumda 112" · Kullanıcı: her kurumda aynı metni görür · Kazanç: bugün çıkar, her kuruma kabaca uyar · Kayıp: birimi olmayan kurumda metin havada kalır · Süre: S · Migration: yok · Geri alınır: evet
**B) Kuruma özel alan** (`supportContactText`) — kurum kendi yazar, boşsa A metni görünür · Kullanıcı: kendi kurumunun gerçek birimini görür · Kazanç: doğru yönlendirme · Kayıp: küçük migration + kurum yönetici ekranı; kurumlar doldurmazsa zaten A'ya düşer · Süre: M · Migration: VAR · Geri alınır: kısmen (ekran kapatılır, kolon kalır)
**C) Yalnız "112 / acil yardım hattı"** · Kullanıcı: tek ulusal numara · Kazanç: her zaman doğru, hiç bakım istemez · Kayıp: kurum içi destek yolu görünmez; her durum 112'lik değil, orantısız kaçabilir · Süre: S · Migration: yok · Geri alınır: evet
**Karşılaştırma:** Kurumların çeşitliliği senin satış hikâyenin parçasıysa B doğru yatırım. Hızlı çıkmak istiyorsan A yeterli ve B'ye sonradan geçilebilir (A metni varsayılan olur). C tek başına eksik ama A ile birleştirilmiş hali zaten A'nın içinde.
**Benim önerim:** A şimdi, B'yi kuyruk adayı yap — A ile seed bugün atılır, B sonra üstüne gelir.
**Cevap vermezsen:** K-16 atlanır (KARAR-3 ile birlikte sertifika seed'ini kilitliyor).
**İlgili kartlar:** KARAR-3 (aynı kriz şıkkının hukuki metni) · KARAR-30 (kriz şıkları isim değişkeni taşıyor) · KARAR-38 (aynı avukat görüşmesi) · KARAR-46 (önkoşul: metin → sürüm) · KARAR-47 (avukat paketinin çatısı) · KARAR-95 (kriz kanalı; menti tarafı da destek kaynağı adına bağlı) — birlikte cevaplanması önerilir: KARAR-3 + KARAR-4 + KARAR-46
**CEVAP:**

---

