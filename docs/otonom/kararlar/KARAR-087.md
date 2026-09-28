### KARAR-87 · Birden çok platform yöneticisi olacak mı? (1 iş açar: AN-38) [YETKİ KARARI]
> ⭐ Kaynak: AN-38 uygulanırken (2026-09-25) koddan çıktı.
**Şu an ne var:** Platform yönetim paneline tek bir ortak hesapla giriliyor; e-posta ve şifre sunucu ayarlarında duruyor (`backend/src/controllers/platformController.ts:35-60`). Bir kullanıcı şikâyeti incelendiğinde kayda "platform-admin" yazılıyor (`platformController.ts:525`); denetim izi de aynı adı kullanıyor (`backend/src/services/platformAudit.ts:18`). Yani "kim inceledi" sorusunun cevabı bugün zaten tek: o ortak hesap.
**Sorun ne:** Kuyruktaki AN-38 "rapor incelendi kaydında gerçek yönetici adı görünsün" diyor. Ortak tek hesap varken kaydedilebilecek başka bir ad yok. Paneli birden çok kişi kullanırsa kimin ne yaptığı ayırt edilemez.
**Neden sana soruyorum:** Platform düzeyinde kimin yetkili olduğu ve yöneticilerin kişi bazında izlenip izlenmeyeceği bir yetki kararı. Ayrıca kişiye özel hesap, yeni bir hesap modeli ister.
**Seçenekler:**
- **A) Tek ortak hesap kalsın; AN-38 "değişiklik gerekmez" diye kapansın** · Kullanıcı ne görür: hiçbir şey değişmez · Kazanç: sıfır iş · **Ne kaybedersin:** paneli ileride iki kişi kullanırsa kim-ne-yaptı ayrımı olmaz · Süre 0 · Geri alınır · Migration yok
- **B) Kişiye özel platform yöneticisi hesapları** · Kullanıcı ne görür: her yönetici kendi e-postasıyla girer, incelemelerde kendi adı yazar · Kazanç: tam hesap verebilirlik (KVKK iz kaydı kişi bazında) · **Ne kaybedersin:** yeni hesap modeli + giriş akışı + yönetici ekleme/çıkarma ekranı; **migration VAR** · Süre L · Geri alınması zor
- **C) Tek hesap kalsın ama girişte "incelemeyi yapan" adı sorulsun** · Kazanç: hafif ayrım · **Ne kaybedersin:** ad beyana dayalı, doğrulanmaz · Süre S · Migration yok
**Karşılaştırma:** Paneli tek kişi kullanıyorsa A yeterli. Birden çok kişi kullanacaksa gerçek çözüm B. C ise doğrulanmayan bir ara yol.
**Benim önerim:** A — bugün paneli kullanan tek ekip var; B, ekip büyüdüğünde ayrı bir iş olarak açılabilir. *(Bu senin ürün kararın, önerime güvenme.)*
**Cevap vermezsen:** AN-38 kilitli kalır. Başka hiçbir iş etkilenmez.
**CEVAP:**

---

