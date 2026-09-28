### KARAR-114 · Tarayıcı bildirimi gerçekten gönderilsin mi? (0 iş kilitliyor — yeni özellik sorusu) [ÜRÜN KARARI]
**Şu an ne var:** Menti panelinde "🔔 Bildirimlere izin ver" düğmesi var; izin verilince artık vaat içermeyen bir metin görünüyor (AJ-39, #399), ama uygulama hiçbir tarayıcı bildirimi göndermiyor. Kanıt: `frontend/src/components/organisms/NotificationOptInButton.tsx:21-25` · kodda `new Notification`/push/service worker yok (grep `frontend/src`, 2026-09-27).
**Sorun ne:** Düğme, kullanılmayan bir izni istiyor; kullanıcı izin verse de bir şey değişmiyor.
**Neden sana soruyorum:** Bildirim göndermek yeni bir özellik; tam hâli kişisel veri (tarayıcı abonelik bilgisi) saklamayı ve KVKK değerlendirmesini gerektirir.
**Seçenekler:**
- **A) Bugünkü gibi kalsın (düğme + dürüst metin).** · Kullanıcı ne görür: izin düğmesi, bildirim yok · Kazanç: iş yok · Kaybedersin: izin istemenin karşılığı yok · Süre: — · Geri alınır: evet · Migration: yok
- **B) Sayfa açıkken bildirim.** · Kullanıcı ne görür: panel sekmesi açıkken görüşme onayı/eşleşme gelince tarayıcı bildirimi · Kazanç: izin anlam kazanır, veri saklama yok · Kaybedersin: sekme kapalıyken işe yaramaz · Süre: S-M · Geri alınır: evet · Migration: yok
- **C) Tam bildirim (sekme kapalıyken de, Web Push).** · Kullanıcı ne görür: telefon/masaüstünde bildirim · Kazanç: gerçek geri dönüş kanalı · Kaybedersin: abonelik tablosu (migration), KVKK aydınlatma güncellemesi, bakım · Süre: L · Geri alınır: kısmen · Migration: var
- **D) Düğme kaldırılsın.** · Kullanıcı ne görür: düğme yok · Kazanç: kafa karışıklığı biter · Kaybedersin: özellik silme — silme protokolü (karantina → ikinci onay) · Süre: S · Geri alınır: evet · Migration: yok
**Karşılaştırma:** Gerçek kullanıcı azken A yeterli; kullanıcılar panele sık dönüyorsa B ucuz bir kazanç; bildirim ürünün ana kanalı olacaksa C.
**Benim önerim:** A — bugün gerçek kullanıcı yok, B ya da C'ye kullanıcı geri bildirimiyle karar vermek daha doğru; bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** Bugünkü davranış sürer (A); hiçbir iş kilitli değil.
**CEVAP:**


