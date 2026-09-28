### KARAR-120 · Pasif üyelere otomatik hatırlatma e-postası gitsin mi? (0 iş kilitliyor) [ÜRÜN KARARI · KVKK]
**Şu an ne var:** Kurum yöneticisi pasif bir üyeye tek tek elle hatırlatma gönderebiliyor; otomatik ya da toplu gönderim yok. Kanıt: `docs/kararlar/00-KARAR-TAKIP.md:375` (madde 24, v2 bekleme listesi: "manuel `nudgeUser` var") · kaynak `docs/kararlar/konu/08-acik-sorular.md:56` · kod `backend/src/routes/adminRoutes.ts:60-61` (`POST /users/:id/nudge`, bekleme süreli) · `backend/src/controllers/adminController.ts:135-140` ("otomatik toplu dürtme kapsam dışı" notu).
**Sorun ne:** 30 günü aşan pasif üyeler ancak yönetici hatırlarsa uyarılıyor; büyük kurumda elle takip sürmez.
**Neden sana soruyorum:** Kişinin istemediği e-postayı almaması (rıza, abonelikten çıkma) ve e-posta metni hukuki/ürün kararı.
**Seçenekler:**
- **A) Otomatik hatırlatma — kişi başına ayda en çok 1, her e-postada abonelikten çıkma bağlantısı.** · Kullanıcı ne görür: pasif üye ayda bir nazik e-posta alır · Kazanç: yöneticiye iş düşmez, geri dönüş artar · Kaybedersin: istenmeyen e-posta şikâyeti riski; avukattan metin/rıza teyidi gerekir · Süre: M · Geri alınır: evet (ayar bayrağı) · Migration: tercih alanı gerekirse var (bugün abonelikten çıkma yalnız kurum düzeyinde, üye düzeyinde yok: `backend/src/routes/selfServeRoutes.ts:39-40`)
- **B) Yarı otomatik — sistem "hatırlatılacaklar" listesini önerir, yönetici tek tuşla gönderir.** · Kullanıcı ne görür: yönetici listeyi onaylar; üye yine yöneticinin gönderdiği e-postayı alır · Kazanç: insan onayı korunur, rıza riski düşük · Kaybedersin: yönetici yine bir adım atmak zorunda · Süre: S · Geri alınır: evet · Migration: yok
- **C) Bugünkü gibi yalnız elle.** · Kullanıcı ne görür: değişiklik yok · Kazanç: sıfır risk · Kaybedersin: pasif üyeler fark edilmeden kaybolur · Süre: — · Geri alınır: — · Migration: yok
**Karşılaştırma:** Kurumlar büyükse A ölçeklenir ama hukuk teyidi ister; B riski düşük orta yol; C küçük pilot için yeterli.
**Benim önerim:** B — rıza riski olmadan yöneticinin işini hafifletir; bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** Yalnız elle hatırlatma sürer; başka iş kilitlenmez.
**İlgili kartlar:** KARAR-47 (e-posta metni/rıza avukat paketinde) · KARAR-71 (kırılgan kullanıcıda hatırlatma etiği)
**CEVAP:**


