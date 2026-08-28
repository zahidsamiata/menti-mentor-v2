# BİLANÇO KARAR DOSYASI — G5: Bildirim / Mail / İletişim

**📸 DONDURULMUŞ** · 2026-08-27 (Tur-5b) · Kaynak: `docs/raporlar/bilanco/kararlar/00-SAYIM-2026-08-27.md` (G5) + `docs/raporlar/bilanco/karar-defteri-2026-08-26.md`

> **Ne bu:** G5 grubundaki her kalem için PO'nun tek tek karar verebileceği kart. Salt-okuma + kod-teyit yapıldı (kod/DB/PR/commit değiştirilmedi). Her kartta işaret kutuları var — PO işaretler.

---

## DOSYA BAŞI — MUTABAKAT

- **Tur-5a beyanı:** G5 = **7 kalem**.
- **Bu dosyada yazılan:** 7 kart + 0 ✅ (kart-yok) = **7**. → **BEYAN TUTUYOR (7 = 7).**
- **Durum dağılımı (bu grup):** ⬜ 4 · 🟡 1 · 🔵 2 · ✅ 0 · ❓ 0 · 🗑️ 0.
- **Kod-teyidi:** SAYIM'da G5 için "kod-teyidi gereken = 1" denmişti (bekleme salonu bildirim izni). Bu turda **7 kalemin tamamı için kod teyidi yapıldı** (config bayrağı, tenantNotifications şablonu, notificationService push-stub, SuspicionReport mail, emailService). **7/7 doğrulandı, 0 çürüdü, 0 ❓.**
- **PO okuma süresi (tahmini):** ~6 dk.

---

**[G5-01] Kurum (STK) başvuru mail gönderimini AÇMA**
Ne: Kurum onay/ret/düzeltme-iste bildirimleri için gerçek mail gönderim bayrağı `TENANT_NOTIFICATIONS_ENABLED` şu an **kapalı** (varsayılan `false`). Bayrak kapalıyken kod gerçek mail atmaz; yalnızca "şu kuruma şu bildirim gidecekti" log'lar. Açmak için: `destek@` gönderen adresi + prod SMTP env kurulur, sonra bayrak `true` yapılır.
Neden başlanmıştı: Kuruma onay/ret/düzeltme haberi gitmeli; ama canlıya istenmeyen mail gitmesi geri alınamaz olduğu için bilinçli olarak opt-in (kapalı) bırakılmış.
Nerede durdu: Altyapı (şablon + gönderim fonksiyonu) tamamen hazır; `destek@` adresi ve prod SMTP env henüz kurulmadığı için bayrak açılmadı. 2026-08-20'den beri açık madde.
Bugünkü durum: ⬜
Etkisi: Açılmazsa kurum yöneticileri başvuru sonucunu (onay/düzeltme) mail ile öğrenemez — panelde manuel bakmaları gerekir.
İş boyu: PO-manuel (env kurulumu; kod tarafı hazır)
Kaynak: karar-defteri md.37m · Numara: NUMARASIZ (defterde 🔴 PO-manuel env)
⚠️ ilişkili: [G1] `destek@` config'te tanımsız (md.84) — bu mailin gönderen adresi de `destek@`; ikisi aynı env kurulumuna bağlı.
⚠️ ilişkili: [G5-02] kurum onay/ret maili — aynı bayrağın arkasında.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: 🔴 ÇIKIŞ BLOKERİ — çıkış öncesi tamamlanmalı.
---

**[G5-02] Kurum onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL`**
Ne: Kurum başvuru sonuç maillerinin (onay/ret/düzeltme) içeriği + gönderen `destek@` adresi + platform admin adresi (`PLATFORM_ADMIN_EMAIL`) tam olarak bağlanması. **Kullanıcı-tarafı mailler çalışıyor** (görüşme daveti, onay, şifre sıfırlama, nudge, hatırlatma — hepsi gerçek gönderim); **kurum-tarafı** onay/ret maili ise altyapı hazır ama gönderim bayrağı kapalı olduğu için henüz gitmiyor.
Neden başlanmıştı: Kurum başvurusunu değerlendiren platform admini kuruma destekleyici tonda ("reddedilmedi, bilgi güncelleyin") haber vermeli.
Nerede durdu: Türkçe destekleyici mail metinleri (onay/ret/düzeltme) yazılı ve test edilebilir halde hazır; gönderim [G5-01]'deki bayrağa bağlı. `destek@` gönderen adresi kurulmadığı için bağlanmadı. `PLATFORM_ADMIN_EMAIL` kodda varsayılanı `admin@platform.local` — prod değeri env'e girilmeli.
Bugünkü durum: 🟡 (kullanıcı maili ✅; kurum kısmı açık)
Etkisi: Prod'da `PLATFORM_ADMIN_EMAIL` varsayılan kalırsa platform giriş/ikinci-faktör yanlış adrese bağlı olabilir; kurum mailleri gitmez.
İş boyu: PO-manuel (env) + S (bağlama teyidi)
Kaynak: karar-defteri md.6/84 · Numara: NUMARASIZ (defterde 🟡)
⚠️ ilişkili: [G5-01] gönderim bayrağı · [G1] `destek@` tanımsız (md.84)

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: 🔴 ÇIKIŞ BLOKERİ — çıkış öncesi tamamlanmalı.
---

**[G5-03] Otomatik nudge (sistem-tetikli dürtme)**
Ne: Sistemin, pasif/takılan üyeyi kendiliğinden (cron ile) dürtmesi — yönetici elle tetiklemeden. **Elle nudge zaten çalışıyor** (yönetici bir üyeyi "dürt" diyebiliyor: PASSIVE/DEAD_MATCH/GENERIC türleri, 24 saat aralık, denetim kaydı). Otomatik olan kısım bilinçli olarak ertelendi.
Neden başlanmıştı: Pasifleşen kullanıcıları elle takip etmek ölçeklenmez; sistem kendisi hatırlatmalı.
Nerede durdu: KVKK/rıza gerekliliği ve "spam" riski nedeniyle bilinçli olarak ertelendi (elle-nudge yeterli görüldü). Otomatik tetik yazılmadı.
Bugünkü durum: 🔵 (bilinçli erteleme)
Etkisi: Otomatik olmayınca pasif üye takibi yöneticinin elle çabasına bağlı kalır.
İş boyu: M
Kaynak: karar-defteri md.24(v2) · Numara: NUMARASIZ (defterde 🔵)
⚠️ ilişkili: [G4] elle nudge/hatırlatma (✅ mevcut, bu otomatik versiyonu)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G5-04] Bekleme salonu bildirim izni (`Notification.requestPermission`)**
Ne: Menti bekleme salonundayken tarayıcı bildirim iznini isteyen istem (`Notification.requestPermission`) — "mentörün geldiğinde sana haber verelim mi?" Kod-teyidi: frontend kaynağında `requestPermission` çağrısı **hiç yok** (0 dosya). Bekleme salonunun kendisi var (yönetici `/admin/waiting-room`, menti sonuç adımı), ancak bildirim-izni istemi yazılmamış. Arşiv bunu "en kritik bekleme-retention UX" diye işaretlemiş.
Neden başlanmıştı: Mentör kıtlığında bekleyen menti sessizce kaybolmasın; mentör uygun olunca tarayıcı bildirimi ile geri çağrılsın (retention).
Nerede durdu: Yalnız fikir/işaret düzeyinde; kod hiç yazılmadı (DURUŞ SEBEBİ BELGELENMEMİŞ — muhtemelen öncelik sırasında geride kaldı).
Bugünkü durum: ⬜
Etkisi: Bekleyen menti, mentör uygun olduğunda proaktif haber alamaz — geri dönme ihtimali düşer (retention kaybı).
İş boyu: M
Kaynak: karar-defteri (NUMARASIZ, "grep 0 dosya — KOD-TEYİT") · Numara: NUMARASIZ
(Not: bu kalem SAYIM'da G4'ten G5'e taşındı — G5'te kart aldı.)

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G5-05] Kullanıcı→ürün geri bildirim mekanizması**
Ne: Her sayfada "Bildir/Geri bildir" düğmesi → mesaj ürün ekibine mail olarak düşsün. Kod-teyidi: bugün en yakın mekanizma `SuspicionReport` (sahte kurum/davet şüphesi bildirimi); ancak bu **sadece DB'ye kayıt yazar, mail GÖNDERMEZ** (controller yalnızca `prisma.suspicionReport.create` yapıp döner — hiçbir mail çağrısı yok). Yani genel "ürüne geri bildirim" akışı yok.
Neden başlanmıştı: Kullanıcının yaşadığı sorunu/öneriyi anında iletebilmesi (ürün geliştirme sinyali).
Nerede durdu: NİYET belgelenmiş; genel geri-bildirim akışı hiç kurulmadı. Var olan SuspicionReport de mail atmıyor (yalnız kayıt).
Bugünkü durum: ⬜
Etkisi: Kullanıcı sorununu/önerisini iletemez; ürün ekibi sinyal alamaz. SuspicionReport'lar da kimseye mail düşmediği için panelde elle taranmadıkça fark edilmez.
İş boyu: M
Kaynak: karar-defteri E24 (teshis) · Numara: NUMARASIZ

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G5-06] Mentör bildirim ritmi (seyrek + anlamlı)**
Ne: Mentöre giden bildirimlerin "seyrek ama anlamlı" olması — her bildirim bir sebep taşısın (mentörü bunaltan sık/gereksiz bildirim olmasın). Kod-teyidi: mentör bildirimleri push-stub üzerinden gidiyor (gerçek taşıyıcı yok — bkz. [G5-07]); ritim/sıklık politikası tanımlanmamış.
Neden başlanmıştı: Mentör gönüllü; onu boğan bildirim akışı onu kaybettirir. Az ama değerli bildirim retention'ı korur.
Nerede durdu: Bilinçli ileride; ritim politikası yazılmadı, push taşıyıcısı da stub olduğu için henüz somutlaşmadı.
Bugünkü durum: ⬜
Etkisi: Ritim tanımlanmazsa mentöre ya çok az (kaçırır) ya çok çok (bunalır) bildirim gider.
İş boyu: M
Kaynak: karar-defteri (NUMARASIZ, "push stub · bilinçli ileride") · Numara: NUMARASIZ
⚠️ ilişkili: [G4] mentör bildirim ritmi / mentör retention (aynı temanın panel tarafı) · [G5-07] gerçek push (taşıyıcı stub olduğu için ritim henüz uygulanamıyor)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G5-07] Gerçek push bildirimi (Expo/FCM) — şu an stub**
Ne: Uygulama içi push bildirimi taşıyıcısı gerçek değil; stub. Kod-teyidi: `notificationService.ts` içindeki `sendPushNotification()` gerçek gönderim yapmadan **`sent: true` döndürüyor** (satır 54); dosya başındaki yorumda gerçek entegrasyonun (Expo Push API `expo-server-sdk` + `User.pushToken`, veya FCM `firebase-admin` + `User.fcmToken`) TODO olduğu yazılı. Şu an bildirimler SystemLog'a yazılıp konsola basılıyor; gerçek cihaz push'u gitmiyor. In-app/mail ile idare ediliyor.
Neden başlanmıştı: Kullanıcıya (mentör/menti/admin) anlık uygulama bildirimi ulaştırmak.
Nerede durdu: Taşıyıcı entegrasyonu (Expo veya FCM) yapılmadı; stub `sent:true` dönerek akışı bozmadan bekletiyor. Bilinçli erteleme (in-app/mail yeterli görüldü).
Bugünkü durum: 🔵/⬜ (defter işareti; stub bilinçli, entegrasyon açık)
Etkisi: `sent:true` dönmesi "gönderildi" yanılsaması yaratabilir — gerçekte hiçbir cihaza push gitmiyor. Anlık bildirime bağlı retention akışları (bekleme salonu, mentör ritmi) tam çalışmaz.
İş boyu: L
Kaynak: karar-defteri md.23 · Numara: NUMARASIZ
⚠️ ilişkili: [G4] mentör bildirim ritmi · [G5-06] mentör bildirim ritmi (ritim bu taşıyıcıya bağlı) · [G5-04] bekleme salonu bildirim izni

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## Bu grupta zaten yapılmışlar (kart yok)

- (Yok.) G5'te ✅ YAPILDI durumunda kalem bulunmuyor. En yakın "çalışıyor" olan iki mekanizma tam kart olarak ele alındı:
  - **Kullanıcı-tarafı mailler** (görüşme daveti/onay, şifre sıfırlama, admin yeni-kayıt, nudge, hatırlatma) `emailService.ts`'te gerçek gönderimle **çalışıyor** — ama bu, [G5-02]'nin "kurum kısmı açık" 🟡 durumunun bir parçası olduğu için ayrı ✅ kartı açılmadı.
  - **Elle nudge** (yönetici bir üyeyi elle dürtme) **çalışıyor** — ama bu G4'te kayıtlı; G5'teki ilgili kalem [G5-03] onun *otomatik* versiyonu (🔵 ertelenmiş).
