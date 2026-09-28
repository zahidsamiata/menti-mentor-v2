### KARAR-72 · Ghost / "kalıcı red" özelliği olacak mı? (1 iş açar: AN-33) [ÜRÜN + HUKUK KARARI]
> ⭐ Kaynak: CS bilanço denetimi (`docs/raporlar/kesif/konu-bilanco-denetimi-2026-09-23.md` §7 KARAR-A). CS'nin "A/B/C/D" harf kimlikleri bu turda 72-75 numaralarına dönüştürüldü.
**Şu an ne var:** Yönetici bir başvuruyu reddedince kullanıcı "düzeltme" mesajıyla bilgilendiriliyor ve yeniden başvurabiliyor (`adminController.ts:740 rejectUser`). "Sessiz/kalıcı" red yok. Kanıt: `konu/11-tasarim-kararlari-yasam-dongusu-ve-disc.md:53-81` tam tasarım var ama kodda 0.
**Sorun ne:** Kötü niyetli/uygunsuz bir kullanıcıyı sessizce (ona bildirmeden) ve kalıcı olarak (yeniden başvuramayacak şekilde) eleme yolu yok. Tasarım yazılmış ama hiçbir iş kuyruğuna girmemiş — 7 haftadır unutulmuş.
**Neden sana soruyorum:** Bir kişinin platformdan sessizce ve kalıcı elenmesi geri dönülmez bir kullanıcı-deneyimi ve olası KVKK/itiraz sonucu doğurur — teknik değil ürün+hukuk kararı.
**Seçenekler:**
- **A) Yapılsın (tasarımdaki gibi):** · Kullanıcı: uygunsuz kişi sessizce elenir, tekrar giremez · Kazanç: topluluk güvenliği · Kayıp: yanlış-red edilen kişi neden reddedildiğini bilemez, itiraz edemez (KVKK şeffaflık gerilimi) · Süre M · Geri alınır (kayıt tutulursa) · Migration VAR (`rejectionType` alanı)
- **B) Yalnız "düzeltme redi" kalsın (bugünkü):** · Kullanıcı: her red şeffaf, yeniden başvurabilir · Kazanç: şeffaflık, KVKK güvenli · Kayıp: kötü niyetli kullanıcı tekrar tekrar başvurabilir · Süre 0 · Migration YOK
- **C) Ghost yerine "süreli engelleme":** · Kullanıcı: X gün başvuramaz, sonra açılır · Kazanç: orta yol · Kayıp: ek tasarım · Süre M · Migration VAR
**Karşılaştırma:** A topluluk güvenliğini maksimize eder ama KVKK şeffaflığıyla gerilimli; B en güvenli/en zayıf koruma; C dengeli ama en çok iş. Gerçek kötüye-kullanım hacmi ~sıfırsa B yeterli olabilir.
**Benim önerim:** B (koru), gerçek kötüye-kullanım görülene kadar — çünkü ghost-red'in KVKK maliyeti, bugünkü ~sıfır kullanıcıda somut faydasından büyük. *(Bu senin ürün kararın; önerime güvenme — güvenlik ekibi farklı düşünebilir.)*
**Cevap vermezsen:** `11-...disc` KARAR 2 tasarımı belgede asılı kalır, tekrar tekrar "öksüz" raporlanır (AN-33 kilitli).
**CEVAP:**

