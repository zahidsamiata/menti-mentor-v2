# 11 — Tasarım Kararları: Kullanıcı Yaşam Döngüsü & DISC Gösterimi

**🔄 YAŞAYAN** (canonical: yaşam döngüsü + DISC gösterim kararları · kararlar eklenebilir) · **Son güncelleme:** 2026-08-16

> **Amaç:** Ürün sahibinin **son turlarda verdiği tasarım kararlarını** kalıcı olarak yazmak. Bu kararlar şimdiye
> dek yalnızca sohbette duruyordu (projenin kronik sorunu: değerli karar konuşulur, yazılmaz, unutulur). İlgili işlere
> (**#12 DISC gösterim**, **2a ghost red**, **2b kullanıcı çıkarma**) geldiğimizde sıfırdan tartışmak yerine **bu
> belgeden hazır tasarımla** başlanır.
>
> **Bu tur kod YAZILMADI** — salt karar arşivi. Migration/DB/seed yok. Kararların çoğu **canlı DB'ye dokunur
> (migration)** → her biri **ürün sahibi onaylı ayrı inşa turunda**, "önce DUR" kuralıyla yapılır.
>
> **İlgili belgeler:** iş kuyruğu `10-yol-haritasi.md` (bu kararlar oradaki #12 / #35 / #36 kalemlerine bağlanır) ·
> DISC/psikometri `03-psikometri-ve-algoritma.md` · onay/red akışı geçmişi `09-DURUM.md` ("İŞ 3 P2/P3") ·
> STK admin kararları `tasarim-kararlari-admin-2026-08-11.md` (KARAR 11 = DISC ikincil harf — bu belgenin KARAR 1'i onu
> **detaylandırır/yerine geçer**). Kişi adı yok.

---

## KARAR 1 — DISC ikincil/çoklu harf gösterimi (iş: #12 · =md.4)

**Ne:** Kişinin DISC kimliği tek harf değil, **orta çizgiyi (midline) geçen tiplerden oluşan 1–4 harflik** bir gösterimdir
(ör. `D`, `DI`, `Di`, `DIs`). Havuzda/profil rozetinde bu gösterim kullanılır.

**Neden:** DISC literatüründe kişi genelde tek "saf" tip değildir; baskın tipe eşlik eden ikincil eğilimler davranışı anlamlı
biçimde değiştirir. Tek harf bilgi kaybettirir; zorla ikincil harf atamak ise yanlış profil üretir. Orta çizgi kuralı bu
dengeyi kurar.

**Nasıl uygulanacak (kuralın çerçevesi):**
1. **Orta çizgi (midline) filtresi:** Yalnızca orta çizgi eşiğini **geçen** tipler gösterilir. Geçmeyen tip **hiç yazılmaz**.
2. **Saf stil istisnası:** Yalnızca **tek tip** orta çizgiyi geçiyorsa → **tek harf** gösterilir (ör. `D`). İkincil harf **zorla atanmaz**.
3. **Güce göre sıralama:** Orta çizgiyi geçen harfler **güçten zayıfa** (büyükten küçüğe) sıralanır — en güçlü tip **başta**.
4. **BÜYÜK/küçük harf ayrımı (yakınlık):**
   - Birincile **çok yakın** (benzer güçte) olan harfler **BÜYÜK** yazılır.
   - Birincilden **belirgin daha zayıf** ama yine orta çizgiyi geçen harfler **küçük** yazılır.
   - Örnekler: `DI` (iki güçlü tip) · `Di` (baskın D + destekleyici i) · `DIs` (iki güçlü + zayıfça geçen s). Sonuç 1–4 harf arası değişir.

**⚠️ Açık nokta (#12 turunda netleşecek — bu belgede SAYI verilmez):**
- "Çok yakın = BÜYÜK" için **kesin sayısal eşik** (ör. ikincil, birincilin %X'i mi) sistemin kendi DISC puanlama
  **ölçeğine** bağlıdır. Aynı şekilde "orta çizgi" değerinin bu ölçekte nereye düştüğü de koda bağlıdır.
- **#12 turunun ilk adımı KEŞİF olacak:** mevcut DISC puanlama kodu okunacak (ölçek nedir, vektör nasıl normalize ediliyor,
  orta çizgi nerede) → **sonra** yakınlık/BÜYÜK-küçük eşiği o ölçeğe göre kalibre edilecek. Bu belge yalnız **kuralın
  çerçevesini** dondurur; kesin sayı #12 turuna bırakılır.

**Kaynak notu:** midline kuralı + "saf stil" istisnası + güce göre sıralama, ürün sahibinin literatür araştırmasıyla teyit edildi.

**Güvenlik/mahremiyet bağı:** Gösterilen **harf**tir (türetilmiş kategori), ham yüzde vektörü DEĞİL → `04-guvenlik-ve-kvkk` +
KARAR 5 (DISC görünürlük) ile uyumlu. Menti→mentör yönünde mentörün harfi **gösterilmez** kuralı (KARAR 5) burada da geçerli;
#12 uygulaması `canViewerSeeDiscType` kuralından beslenir.

---

## KARAR 2 — Ghost red / kalıcı reddetme (iş: 2a · yol haritası #35)

**Ne:** Mevcut sistemde **tek tip red** var (herkese kibar e-posta + tekrar başvuru hakkı — bkz. `09-DURUM` "İŞ 3 P2/P3").
Buna **ikinci bir red tipi** eklenir: **kalıcı red / "ghost"**. Yönetici reddederken iki tip arasında seçim yapar:
- **Düzeltme iste (mevcut akış):** kibar e-posta + kullanıcı gerekçeyi görür + tekrar başvurabilir.
- **Kalıcı reddet / ghost (yeni):** aşağıdaki davranış.

**Neden:** Kuruma kesinlikle uygun olmayan bir başvurana "dilerseniz tekrar başvurun" demek yanlış ve yorucu; yönetici bazı
başvuruları **kalıcı** kapatabilmeli, üstelik başvuranı gereksiz yere umutlandırmadan (sessiz).

**Nasıl uygulanacak (ghost davranışı):**
- **Giriş mesajı:** Kişi **doğru şifreyle** giriş yapmaya çalışınca şu mesajı görür: **"Başvurunuz yönetici tarafından
  kabul edilmemiştir."** (net, Türkçe). Token verilmez (İŞ 3 P2 "Yol 1" deseni — korumalı sayfaya erişemez).
- **Veri temizleme + kabuk koruma:** Kişinin **kişisel/test verileri SİLİNİR** (DISC cevapları, profil detayları). Ancak
  giriş yapıp mesajı görebilmesi için gereken **asgari hesap "kabuğu"** (kimlik/e-posta + red durumu) **kalır**. Yani "tam
  silme" değil → **"içerik temizleme + kabuk koruma"**.
- **Tekrar başvuru YOK:** Ghostlanan kişi `reapply` akışına **erişemez** (düzeltme reddinden farkı budur).
- **E-posta GİTMEZ** (sessiz).

**⚠️ Uygulama notu (2a turunda):**
- Red tipini ayırt etmek için muhtemelen **yeni alan** gerekir (ör. `rejectionType: CORRECTION | GHOST`) → **migration** →
  canlı DB → ürün sahibi onaylı ayrı tur.
- `reapply` endpoint'i ghost durumunu **reddetmeli** (yalnız CORRECTION-red REJECTED→PENDING olabilir).
- **Enumeration güvenliği korunur:** yanlış şifrede **generic** mesaj (hesap varlığı/red tipi sızmaz); red mesajı yalnız
  **doğru şifre + ghost** durumunda gösterilir (bcrypt.compare sonrası — İŞ 3 P2 deseni).
- **Veri silme = KVKK ile uyumlu** (içerik minimizasyonu), ancak "kabuk"un ne kadar asgari olduğu KVKK açısından 2a turunda netleştirilir.

**İş:** 2a · boyut M–L · **migration gerektirir** (canlı DB, PO onaylı ayrı tur).

---

## KARAR 3 — Onaylanmış (aktif) kullanıcıyı sistemden çıkarma (iş: 2b · yol haritası #36)

**Ne:** Yönetici, **APPROVED (aktif)** bir menti/mentörü sonradan sistemden çıkarabilir (red değil — kabul edilmiş kişiyi
çıkarma). Yönetici **iki seçenek** arasında karar verir:
- **Pasifleştir:** hesap durur, **veri KALIR**, **geri alınabilir**.
- **Tamamen sil:** kayıt **geri alınamaz** şekilde silinir.

**Neden:** Onaylı bir kişi sonradan uygunsuz hale gelebilir (ayrılma, ihlal, uyumsuzluk); yönetici bunu — veriyi koruyarak
(pasifleştir) ya da tümüyle (sil) — yönetebilmeli.

**Nasıl uygulanacak:**
- **İz (audit):** Çıkarmayı **yapan yöneticiyi + zamanı** diğer yöneticiler görebilir (İŞ 2'deki "kim onayladı/reddetti"
  mantığının aynısı: kim çıkardı + ne zaman).
- **Yönetici notu:** Yönetici işlem sırasında **not** bırakabilir (kendisi/diğer yöneticiler için: "neden çıkardım",
  sonradan hatırlamak için — iç bilgi).
- **Kişiye gösterilecek mesaj (opsiyonel):** Yönetici İSTERSE, çıkarılan kişiye gösterilecek bir **mesaj** yazabilir.
  - **⚠️ Kritik kısıt:** Kişiye mesaj gösterme **yalnız "pasifleştir"de mümkündür** (kişi giriş yapıp görebilir). **"Tamamen
    sil"de teknik olarak İMKANSIZ** (silinen hesaba mesaj iliştirilemez). Arayüz bunu yöneticiye **açıkça** söylemeli:
    *"Silerseniz kişi bilgilendirilemez."*
- **Çıkarılan kişinin ekranı:**
  - **Pasifleştirildiyse:** giriş yapınca yöneticinin mesajı (varsa) + *"hesabınız şu an aktif değil"* benzeri **nötr Türkçe** bilgi.
  - **Silindiyse:** hesap yok → giriş denemesinde normal *"e-posta veya şifre hatalı"* (özel mesaj gösterilemez).
- **Mentör çıkarılırsa eşleşmiş mentilere etki:** Eşleşmiş mentilere **bildirim** gider: *"Görüşmeniz/eşleşmeniz iptal
  edilmiştir, bilginiz olsun. Dilerseniz başka bir eşleşme yapabilirsiniz."* (Türkçe). Eşleşme(ler) iptal edilir.

**⚠️ Uygulama notu (2b turunda):**
- Çıkarma tipi (pasif/sil) + yönetici notu + kim çıkardı/ne zaman + kişiye mesaj → muhtemelen **yeni alanlar** (migration).
- Eşleşme iptali + menti bildirimi mantığı (mevcut bildirim/e-posta altyapısı kullanılır).
- Boyut **orta–büyük**; ürün sahibi *"uzun sürse de olur"* dedi.

**İş:** 2b · boyut M–L · **migration gerektirir** (canlı DB, PO onaylı ayrı tur).

---

## KARAR 4 — KALICI KURAL: ön yüzde HİÇ İngilizce olmayacak

**Ne:** Kullanıcının **gördüğü her metin Türkçe** olacak. Ön yüzde (FE) kullanıcıya görünen **hiçbir İngilizce tabir**
bulunmayacak (buton, etiket, başlık, hata/uyarı/bilgi mesajı, boş-durum metni, placeholder dahil).

**Neden:** Hedef kitle Türkçe konuşan STK'lar; tutarlı, profesyonel, erişilebilir bir deneyim için dil bütünlüğü şart.

**Kapsam / nasıl uygulanacak:**
- **Sadece kullanıcıya görünen metin** kapsamdadır. **Kod iç mekaniği** (değişken/fonksiyon/enum/commit/error-code adları)
  İngilizce kalabilir.
- Bu, **bundan sonraki tüm FE işleri için geçerli standarttır** — yeni ekran/bileşen eklerken uyulur.
- Mevcut ekranlarda İngilizce kalıntı varsa → **ayrı bir hijyen işi** olarak temizlenir (bu belge o işi *açar*, ama ayrı turdur).

**Not (mevcut kuralla ilişki):** Bu karar, kök `CLAUDE.md` → "Temiz Kod / Dil" kuralını (*"Kullanıcıya görünen her metin
TÜRKÇE; kod iç mekaniği İngilizce"*) **pekiştirir ve netleştirir** ("HİÇ İngilizce" + placeholder/boş-durum dahil). Çelişki
yok; bu belge onu FE standardı olarak sabitler. İleride `06-tasarim-ux.md`'ye de kısa referans düşülebilir (ayrı belge turu).

**İş:** kalıcı standart (tek bir işe ait değil) + ayrı "İngilizce kalıntı temizliği" hijyen işi (yol haritasına eklenebilir — PO kararı).

---

## Özet — bu kararların bağlandığı işler
| Karar | İş | Migration? | Durum |
|---|---|---|---|
| KARAR 1 — DISC çoklu harf | #12 (=md.4) | Belirsiz (keşif) — muhtemelen yok (türetme) | Çerçeve dondu; sayısal eşik #12 keşfinde |
| KARAR 2 — Ghost red | 2a (#35) | **Evet** (red tipi alanı) | Tasarım dondu; PO onaylı ayrı tur |
| KARAR 3 — Kullanıcı çıkarma | 2b (#36) | **Evet** (çıkarma tipi/not/iz alanları) | Tasarım dondu; PO onaylı ayrı tur |
| KARAR 4 — FE tam Türkçe | kalıcı standart | Yok | Yürürlükte (tüm yeni FE işleri) |

> **Kırmızı kurallar hatırlatma:** canlı = lokal aynı Neon → KARAR 2/3 migration'ları **önce DUR + PO onayı**; `db push`
> yasak (`IF NOT EXISTS` + `db execute` + `migrate resolve`); merge kararı ürün sahibinde.
