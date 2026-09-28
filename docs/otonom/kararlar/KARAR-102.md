### KARAR-102 · Kayıttan sonra hemen giriş mi, önce e-posta doğrulaması mı? (1 iş açar: GV-12 kalanı) [ÜRÜN KARARI · GÜVENLİK]
**Şu an ne var:** Kurum kaydı (ve normal kayıt) başarılı olunca kişi **hemen oturum açmış** olarak kurulum ekranına geçiyor. E-posta zaten kayıtlıysa GV-12 düzeltmesiyle "zaten kayıtlı" denmiyor, aynı başarı mesajı dönüyor — ama bu sefer **oturum açılmıyor ve ekran farklı** (kurulum yerine "e-postanı kontrol et"). Yani dikkatli biri, sonraki ekrana bakarak bir e-postanın sistemde kayıtlı olup olmadığını anlayabiliyor. Kanıt: `backend/src/controllers/selfServeController.ts` GV-12 notu ("tam ayırt-edilemezlik oturumsuz kayıt gerektirir — ürün kararı"), `frontend/.../onboarding/stk/_steps/Step4Account.tsx:110-140`; denetim: `docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md` GV-12.
**Sorun ne:** Bir kişinin platformda hesabı olup olmadığı (hangi dernekle çalıştığı dahil) dışarıdan öğrenilebiliyor. Küçük bir sızıntı ama kişisel veri.
**Neden sana soruyorum:** Kapatmanın tek tam yolu kayıt akışını değiştirmek: herkes kayıttan sonra aynı "e-postanı kontrol et" ekranını görür, giriş e-postadaki bağlantıyla olur. Bu, yeni kullanıcı deneyimini (ilk dakikayı) değiştiren bir ürün kararı.
**Seçenekler:**
- **A) Önce e-posta doğrulaması (herkes için)** · Kullanıcı ne görür: kayıttan sonra "e-postanı kontrol et"; bağlantıya tıklayınca kurulum başlar · Ne kazanırsın: sızıntı tamamen kapanır + sahte e-postayla kayıt biter · **Ne kaybedersin:** kayıt bir adım uzar; e-posta gecikirse (SMTP) kullanıcı bekler; bazıları bırakır · Süre M · geri alınır ✅ · migration muhtemelen VAR (doğrulama bayrağı/token) → 🔵.
- **B) Bugünkü hâl** (hemen giriş; kayıtlı e-postada farklı ekran) · Ne kazanırsın: en akıcı kayıt · **Ne kaybedersin:** küçük sızıntı kalır.
- **C) Şimdilik B, ilk gerçek kurumlar girmeden önce A** · Ne kazanırsın: çıkış öncesi akış bozulmaz, sızıntı kurumlar gelmeden kapanır · **Ne kaybedersin:** iş ertelenir, unutulma riski (kuyrukta satır olarak durur).
**Karşılaştırma:** Gerçek kullanıcı ~0 iken B'nin riski düşük; ilk dernekler gelmeden A daha doğru. SMTP henüz tam güvenilir değilse A kaydı kilitleyebilir.
**Benim önerim:** C — sızıntı bugün kimseyi etkilemiyor; A'yı SMTP ayarları kesinleşince (03-PO-ELLE-ISLER B4) ve ilk kurumdan önce yapmak en güvenlisi. *(Ürün kararın, önerime güvenme.)*
**Cevap vermezsen:** GV-12 kalanı açık kalır (bilinen sınır olarak).
**CEVAP:**

---

