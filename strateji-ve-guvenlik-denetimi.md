# Sosyal Girişim Stratejisi, Onboarding Akışları, Panel Tasarımları ve Güvenlik Denetimi

> **NOT (Claude Code için):** Bu proje uzun süre gelir elde etmeyen bir sosyal girişim
> olarak kalacak. Aşağıdaki dokümanda geçen **FİYATLANDIRMA ve MONETİZASYON** kısımlarını
> **UYGULAMA**. Sadece şu teknik prensibi al: tenant seviyesinde plan/limit alanları ve
> veri biriktirme altyapısı bulunsun (bugün herkes sınırsız/ücretsiz). Bunun dışındaki
> tüm ücretli/premium/paywall mantığını dahil etme.

---

## Sosyal Girişim Stratejisi: Ücretsiz Büyüme ve Freemium-to-Paid Eylem Planı

Bu stratejik güncelleme, önceki raporun temelini değiştirmiyor ama silahınızı değiştiriyor. Önceki raporda "kuruma satış için yönetici paneli şart" demiştim — bu hâlâ doğru, ama artık o panelin işi satış kapatmak değil, gelecekteki satışın tohumunu bugünden ekmek. Aşağıda bu farkı her başlıkta işliyorum.

Önce bir stratejik dürüstlük, çünkü bu modelin gizli bir tuzağı var ve onu görmezsek plan havada kalır: PLG (product-led growth) bir B2C oyunudur, siz bir B2B2C ürünüsünüz. ADPList viral olabiliyor çünkü tek bir bireyin kararıyla (bir mentör arkadaşını davet eder) büyüyor. Sizde ise "kurum" katmanı var — bir derneğin sisteminize geçmesi kurumsal bir karardır, viral değil. Yani saf ADPList taktiklerini kopyalayamazsınız; onları iki katmanlı uyarlamalısınız: (a) kurumu içeri çeken büyüme, (b) kurum içinde kullanıcıları çoğaltan büyüme. Bu ayrımı yapmayan her PLG planı bu modelde tıkanır. Aşağıdaki her öneri bu iki katmanı ayrı ele alıyor.

İkinci dürüstlük: Aşağıda ADPList'in viral mekaniklerine dair söylediklerim, önceki turda doğruladığım genel ürün davranışından ve PLG literatüründen geliyor; ADPList'in spesifik hangi viral döngüyü ne kadar kullandığına dair yeni bir arama yapmadım. Belirli bir mekaniğin onlarda tam olarak nasıl çalıştığını teyit etmek isterseniz aratırım.

### 1. "Ücretsiz Büyüme" — İki Katmanlı Viral Mimari

**Katman A: Kurumu içeri çeken büyüme (B2B acquisition)**

Burada hedef, yüksek bütçeli satış ekibi olmadan bir STK'nın kendi kendine gelip kaydolmasını sağlamak. Üç mekanizma:

1. **Tam self-serve kurulum (sıfır satış görüşmesi).** Bir dernek yöneticisi siteye gelmeli, "Kurumunu oluştur" demeli ve 10 dakika içinde kendi tenant'ını ayağa kaldırabilmeli. Kurumsal rakiplerin (Chronus, MentorcliQ) en büyük zayıflığı budur — onlarda her şey "demo talep et / satış ile konuş" arkasındadır. Sizin silahınız: demo beklemeden başlama. Bu tek başına sizi onlardan ayırır.

2. **Kurumlar arası "sosyal kanıt" döngüsü.** STK dünyası küçük ve birbirini tanır. Bir kurum sisteminizi kullanıyorsa, bunu diğer kurumlar görmeli. Mekanizma: kamuya açık (opt-in) bir "Bu platformu kullanan kurumlar" duvarı + her kurumun paylaşabileceği bir "Etki kartı" ("Derneğimiz X mentörlük saati sağladı"). Bir derneğin yöneticisi bunu LinkedIn'de paylaştığında, başka bir dernek yöneticisi görür. Kurumdan kuruma yayılım, sizin viral döngünüzün A katmanıdır.

3. **Mentör/menti kaynaklı "ters çekim" (bottom-up).** En güçlü B2B2C mekanizması budur: bir kurumun üyesi (mezun, gönüllü) sizi başka bir kurumda kullanır, beğenir ve kendi derneğine "biz de bunu kullanalım" der. Multi-tenant mimariniz (bir kişinin birden çok kuruma üye olabilmesi) bunu zaten teknik olarak destekliyor — bunu bir büyüme kanalına çevirin.

**Katman B: Kurum içinde kullanıcı çoğaltan büyüme (B2C virality)**

Kurum içeri girdikten sonra, içindeki ağın kendiliğinden büyümesi. ADPList ilhamları asıl burada işler:

| ADPList mekaniği | B2B2C uyarlaması | Viral etki |
|---|---|---|
| Mentörlerin ağlarını davet etmesi | Mentörler kendi mezun/meslektaş ağından yeni mentör davet eder ("Derneğine 3 mentör daha kat") | Havuz kurum içinde organik büyür |
| Sosyal medyada başarı paylaşımı | Eşleşme/görüşme sonrası paylaşılabilir kart ("İlk mentörlük görüşmemi tamamladım 🎉 — [Dernek] ağında") | Dış görünürlük + yeni üye çekimi |
| Rozetler/kilometre taşları | "5 görüşme", "Sertifikalı mentör", "Kurucu üye" rozetleri | İçsel motivasyon + statü |
| "Geri öde" kültürü | Menti büyüdükçe mentör olmaya davet | Arz tarafı kendi kendini besler |

**Kritik denge — gizlilik vs. virality gerilimi:** Önceki raporda mentör opt-in görünürlüğünüzü bir güç olarak konumlandırmıştım. Ama dikkat: viral paylaşım mekanikleri (başarı kartları, sosyal medya) görünürlükle çelişebilir. Kapalı-devre vaadiniz varken "eşleşmeni sosyal medyada paylaş" demek tutarsız durabilir. Çözüm: paylaşılan içerik kişi/eşleşme detayı değil, agregat/anonim olmalı ("Derneğimiz 200 saat mentörlük üretti" — kim kiminle eşleşti değil). Bu, hem viraliteyi korur hem gizlilik vaadinizi bozmaz. Bu ayrımı net tutun.

**Self-serve onboarding akışı (kurum tarafı)**

Bir STK yöneticisinin sıfırdan çalışır sisteme ulaşma yolu, sürtünmesiz olmalı:

1. "Kurumunu oluştur" → e-posta + kurum adı + logo (2 dk)
2. Şablon seç: "Mezun mentörlüğü" / "Gönüllü gelişimi" / "Kulüp içi" → hazır ayarlarla başla, sıfırdan kurma yükü yok
3. İlk üyeleri davet et: toplu e-posta / davet linki / CSV yükle
4. "Sihirli an": ilk eşleşme gerçekleşir → yönetici bunu panelde görür
5. Etki kartı: "İlk eşleşmen hazır!" → paylaşıma teşvik

En kritik adım 4 — aktivasyon anı (aha moment). PLG'de bir ürünün tutması, kullanıcının "ilk değeri" ne kadar hızlı gördüğüne bağlıdır. Sizin kurum için aktivasyon anınız: ilk başarılı eşleşme. Onboarding'in tek amacı, yöneticiyi bu ana en hızlı şekilde ulaştırmak olmalı. Şablonlar (adım 2) burada kritik — boş bir sistemle baş başa kalan yönetici kaybolur ve terk eder.

### 2. Monetizasyon Temelleri — "Premium Kanca"ları Bugünden Ekmek

> **NOT (Claude Code için):** Bu bölümdeki monetizasyon/premium mantığını UYGULAMA.
> Sadece aşağıdaki teknik altyapı prensibini al:
> - Tenant seviyesinde plan/limit alanları (`Tenant.plan`, `Tenant.limits`) bulunsun,
>   bugün herkes `FREE_UNLIMITED` olsun. Limit getirmek ileride kod değil konfig değişikliği olsun.
> - Değer kanıtlama verilerini (görüşme saatleri, eşleşme başarıları, gelişim metrikleri)
>   bugünden biriktir. Rapor "premium" olmasın; herkese açık ve ücretsiz.

Haklısınız: bugün ücretsiz olanı yarın ücretli yapmak en zor pazarlama problemlerinden biridir. Kullanıcılar bir şeye alışınca onu "hak" olarak görür, geri alınması öfke yaratır. Bu yüzden altın kural şu: Bugün ücretsiz verdiğiniz şeyi yarın asla geri almayın. Bunun yerine, yarının ücretli özelliklerini bugünden "premium" olarak işaretleyip, ücretsiz katmanda hiç vermeyin veya kısıtlı verin.

Üç teknik prensip, kodu bugün yazarken uygulanmalı:

İlk olarak her şeyi tenant seviyesinde sayın ve sınırlayabilir kılın. Bugün limit koymasanız bile, mimaride "bu tenant'ın planı nedir, limiti nedir" alanı bulunsun (örneğin `Tenant.plan` ve `Tenant.limits`). Bugün herkes "FREE_UNLIMITED" olsun; yarın limit getirmek bir konfigürasyon değişikliği olsun, kod değişikliği değil. Bunu sonradan eklemek çok daha acılı.

Üçüncüsü veriyi bugünden biriktirin (kullanmasanız bile). Raporların dayanacağı veriyi (görüşme saatleri, eşleşme başarıları, gelişim metrikleri) bugünden toplamaya başlamalısınız.

### 3. Değer Kanıtlama Metrikleri — Yöneticiye "Faydayı" Göstermek

Bir STK için ROI = etki, üye bağlılığı, misyon gerçekleşmesi. Metrikleri bu kitleye göre seçmelisiniz.

**Yönetici panelinde biriktirilmesi ve görselleştirilmesi gereken metrikler**

Katman 1 — Aktivite metrikleri (sistemin canlı olduğunu gösterir):
- Toplam mentörlük saati → büyük sayaç + zaman içinde artış grafiği
- Aktif eşleşme sayısı + aktif kullanıcı oranı → trend çizgisi
- Gerçekleşen görüşme sayısı → aylık bar grafik

Katman 2 — Kalite/sağlık metrikleri (eşleşmelerin işe yaradığını gösterir):
- Eşleşme başarı/memnuniyet oranı (feedback'ten) → memnuniyet skoru + yıldız dağılımı
- Eşleşme devamlılık oranı → tutundurma (retention) eğrisi
- Ortalama görüşme sıklığı

Katman 3 — Etki/dönüşüm metrikleri:
- Mentilerin öz-bildirimli gelişimi ("hedefime yaklaştım" oranı)
- Başarı hikayeleri (anonim veya opt-in)
- Üye bağlılığı/elde tutma etkisi
- Mezun ağı aktivasyonu

**Stratejik sıralama uyarısı:** Bu metriklerin hepsini MVP'de göstermeye çalışmayın. MVP'de Katman 1 yeterli. Ama Katman 3'ün verisini MVP'den itibaren sessizce toplayın. "Bugün göster" ile "bugün topla" farkını koruyun.

---

## Self-Serve Onboarding: Kurum Yöneticisi Kullanıcı Yolculuğu

Aktivasyon anınız "ilk eşleşme", ama bir tuzak var: Eşleşme olması için sistemde birden fazla üye ve onların tamamlanmış profilleri (DISC + sektör) gerekiyor. Yani yönetici tek başına "aha" anına ulaşamaz. Bu da klasik bir PLG problemidir: aktivasyon, yöneticinin kontrolü dışındaki bir olaya bağlı.

**Çözüm: yolculuğu iki aha anına bölüyorum.** Önce "Önizleme Aha" (yönetici daha kimseyi davet etmeden, kendi profilini doldurup sistemin nasıl eşleştirdiğini canlı bir demo/önizlemeyle görür). Sonra "Gerçek Aha" (davet ettiği üyeler katılınca ilk gerçek eşleşme düşer).

**İkinci prensip:** her ekran tek bir iş yapar ve tek bir karar ister.

### Akışın Kuş Bakışı

```
[0] Landing → [1] Kayıt → [2] Şablon Seçimi → [3] Kurum Kimliği
     → [4] Yönetici Kendi Profili (Önizleme Aha tetikleyici)
     → [5] ÖNİZLEME AHA: "Sistem böyle eşleştiriyor"
     → [6] Üye Daveti → [7] Karşılama Paneli (boş-durum, beklenti yönetimi)
     → ...üyeler katılır...
     → [8] GERÇEK AHA: "İlk eşleşmen hazır!" → paylaşım kancası
```

### EKRAN 0 — Landing Page
- **Amaç:** Ziyaretçiyi 5 saniyede ikna edip "Kurumunu oluştur"a tıklatmak.
- **İstenen veri:** Hiçbiri.
- Ana başlık farkı söylemeli: "Üyelerinizi sadece uzmanlığa değil, karaktere göre eşleştirin."
- Alt başlık sürtünmesizliği vurgulamalı: "Derneğiniz için mentörlük ağınızı 10 dakikada kurun. Ücretsiz, satış görüşmesi yok."
- İki buton: Birincil → "Kurumunu Ücretsiz Oluştur". İkincil → "Nasıl çalışır?"
- **Kritik:** "Demo talep et" butonu koymayın. Tek mesaj: hemen başla.

### EKRAN 1 — Kayıt
- **Amaç:** Hesabı en az sürtünmeyle açmak.
- **İstenen veri (minimum):** E-posta, şifre (veya tek-tıkla Google/Microsoft — STK'lar genelde Google Workspace kullanır, önceliklendirin).
- Üstte ince ilerleme göstergesi: "1/4". Mikro-metin: "Kredi kartı yok. Kurulum 10 dakika."

### EKRAN 2 — Şablon Seçimi
- **Amaç:** "Boş sistem korkusunu" yenmek. Terk oranını en çok düşüren ekran.
- **İstenen veri:** Tek seçim (program tipi).
- Üç büyük görsel kart: "Mezun Mentörlüğü" / "Gönüllü Gelişimi" / "Kulüp İçi Mentörlük". Her kart bir kullanım senaryosu + "bu şablonda neler hazır gelir" mikro-listesi.
- "Sıfırdan kur" seçeneği bilinçli olarak küçük ve ikincil.
- Kartların altında: "Merak etme, her şeyi sonra değiştirebilirsin."

### EKRAN 3 — Kurum Kimliği
- **Amaç:** Tenant'ı oluşturmak; "kendi platformu" hissini başlatmak.
- **İstenen veri (minimum):** Kurum adı (zorunlu), logo (opsiyonel), alt alan adı/slug (otomatik öneri).
- Logo yüklenince canlı önizleme: "İşte üyelerinin göreceği karşılama ekranı."
- Mikro-metin: "Bu senin kurumunun özel alanı. Verileriniz size özel, kapalı ve güvende."

### EKRAN 4 — Yönetici Kendi Profilini Oluşturur (Önizleme Aha tetikleyici)
- **Amaç:** Yöneticiyi kendi DISC + sektör profilini doldurmaya ikna etmek.
- **İstenen veri:** Hızlı DISC mini-testi (~6-8 soru), sektör + beceri etiketleri (çiplerle), rol tercihi.
- Çerçeveleme: "Sistemin nasıl eşleştirdiğini sana canlı gösterelim. Önce seni tanıyalım."
- Test biter bitmez: "Sen bir [Kâşif] mizacısın 🧭" — kişiselleştirilmiş sonuç.

### EKRAN 5 — ÖNİZLEME AHA: "Sistem Böyle Eşleştiriyor"
- **Amaç:** Yöneticiyi hiç üye davet etmeden hemen ikna etmek. Onboarding'in ilk dönüşüm zirvesi.
- **İstenen veri:** Hiçbiri (gösterim ekranı).
- Yöneticinin profilini alır, örnek/demo profillerle nasıl eşleştiğini canlı gösterir.
- Yeşil (yüksek uyum) ve kırmızı (engellenen) örnekleri gösterir: "Sistemimiz toksik eşleşmeleri otomatik engeller."
- Bu ekran ürünün "büyü" anı — görsel olarak en cilalı ekran olmalı.

### EKRAN 6 — Üye Daveti
- **Amaç:** Gerçek aha anına giden tek köprü.
- **İstenen veri:** Davet yöntemi seçimi — (1) Davet linki kopyala (en kolay, WhatsApp için), (2) E-posta ile davet, (3) CSV yükle.
- Davet linkini öne çıkarın. "En az 5 kişi davet et" gibi yumuşak hedef (Zeigarnik etkisi).
- Şablona göre "Mentör olarak davet et" / "Menti olarak davet et" sekmeleri.

### EKRAN 7 — Karşılama Paneli (Boş Durum + Beklenti Yönetimi)
- **Amaç:** En kırılgan an — boş panel yöneticiyi terk ettirir. Boşluğu anlamlı kılmak.
- İlerleme adımları (checklist): ✓ Kurumun hazır ✓ Profilin oluşturuldu ✓ Davetler gönderildi ◯ Üyeler katılıyor ◯ İlk eşleşme.
- Beklenti yönetimi: "Üyelerin testi doldurması genelde birkaç saat sürer. Hazır olunca sana bildirim göndereceğiz — burada beklemene gerek yok."
- **Bildirim izni iste:** "İlk eşleşmen hazır olunca haber verelim mi?" → yöneticiyi geri getirecek kanal.

### EKRAN 8 — GERÇEK AHA: "İlk Eşleşmen Hazır!"
- **Amaç:** Onboarding'in zirvesi. Bağlanma anı.
- Kutlama anı + konfeti/animasyon. İlk gerçek eşleşme(ler).
- **Paylaşılabilir etki kartı:** "[Dernek] ağında ilk eşleşme gerçekleşti! 🎉" — anonim/agregat, kişi detayı yok.

**İki kritik tasarım kararı:** (1) Çift-aha yapısı: Ekran 5 yöneticiyi davet göndermeye ikna eder, Ekran 8 onu bağlar. (2) Ekran 7'nin beklenti yönetimi: checklist + "burada beklemene gerek yok" + bildirim izni.

---

## Üye (Mentör/Menti) Onboarding Kullanıcı Yolculuğu

**Birincisi** — üye yöneticiden çok daha "soğuk" gelir. Bir WhatsApp grubunda linke tıkladı; sabrı düşük. Üye akışı daha da kısa ve bağlamsal olmalı.

**İkincisi** — üyenin "aha"sı eşleşmeyi beklemeye dayanamaz. Testi biter bitmez gördüğü kişiselleştirilmiş mizaç sonucu, üyeyi tatmin eden ani değerdir.

**Kritik teknik not:** Davet linki hangi kuruma ve hangi role ait olduğunu taşımalı (token içinde `tenantId` + opsiyonel önceden-atanmış rol).

### Akışın Kuş Bakışı

```
[Davet linki tıklandı]
   → [1] Bağlamsal Karşılama ("X Derneği seni davet etti")
   → [2] Hızlı Kayıt (e-posta/Google)
   → [3] Rol Onayı (Mentör / Menti)
   → [4] Mini Profil (sektör + beceri, çiplerle)
   → [5] Mizaç Testi (SJT/CORE, oyunlaştırılmış)
   → [6] ÜYE AHA: Kişiselleştirilmiş mizaç sonucu
   → [7a] Mentör ise: Görünürlük Opt-in
   → [8] Bekleme Salonu (beklenti yönetimi + bildirim izni)
```

### EKRAN 1 — Bağlamsal Karşılama
- **Amaç:** "Neredeyim, kim çağırdı, neden buradayım?" sorularını tek saniyede yanıtlamak.
- Davet eden kurumun logosu ve adı büyük ve net. Davet eden kişi belliyse kişiselleştirme.
- Tek cümlelik ne-olduğu + "Sadece 3 dakika sürer" + gizlilik notu.
- **Kritik:** Bu ekran mobilde kusursuz olmalı — link %90 ihtimalle telefonda WhatsApp içinden açılacak. Mobil için tasarla, masaüstüne uyarla.

### EKRAN 2 — Hızlı Kayıt
- Google/Microsoft ile tek-tık giriş (en üstte) veya e-posta + şifre.
- İstemediğimiz: Ad/soyad bile burada gerekmez. Telefon asla.
- Üstte küçük kurum logosu kalsın (bağlam sürekliliği).

### EKRAN 3 — Rol Onayı (Mentör / Menti)
- **Senaryo A** — Davet linki rolü zaten taşıyorsa: Bu ekranı atlayın veya tek onaya indirin.
- **Senaryo B** — Rol belli değilse: İki büyük net kart ("Mentör olmak istiyorum" / "Menti olmak istiyorum").
- Yargısız dil: "Her seviyede deneyim değerlidir."

### EKRAN 4 — Mini Profil
- Sektör/alan (tek seçim, şablona göre filtrelenmiş), beceri/ilgi etiketleri (tıklamalı çipler — yazma yok), deneyim seviyesi (öğrenci / 0-2 / 3-7 / 8+ yıl).
- Menti için: "Neyi öğrenmek istiyorsun?" Mentör için: "Neyde rehberlik edebilirsin?"

### EKRAN 5 — Mizaç Testi (SJT/CORE)
- **Amaç:** Eşleştirmenin %40'lık mizaç ayağı — DISC profilini çıkarmak. En kırılgan adım.
- CORE SJT soruları (~6-8), senaryo-bazlı, single-select.
- Oyunlaştırma: hikaye formatı, tek soru/tam ekran, anlık ilerleme çubuğu, süre güvencesi ("7 kısa senaryo, 90 saniye"), görsel cevap kartları.
- En güçlü kanca: "Birkaç soru daha, mizaç tipini öğreneceksin."

### EKRAN 6 — ÜYE AHA: Kişiselleştirilmiş Mizaç Sonucu
- **Amaç:** Üyeye anlık, kişisel ödül. Eşleşme gelmeden tatmin.
- Mizaç tipi görsel kart: "Sen bir [Kâşif] 🧭 mizacısın." Kısa, pozitif betimleme.
- **Paylaşım kancası:** anonim, kişisel-veri-içermeyen kart ("Ben bir Kâşif mizacıyım — sen hangisisin?"). Gizlilik bozulmadan viral an.

### EKRAN 7a — Görünürlük Opt-in (YALNIZCA MENTÖR)
- "Profilini, eşleştiğin mentilere göstermek ister misin?"
- Gizliliği güç ve kontrol olarak çerçevele. "Sonra değiştirebilirsin."
- **Likidite riskini yönet:** çok az mentör görünür olursa havuz "ölü" görünür. "Görünür mentörler daha hızlı eşleşir" — nazik teşvik, baskı yok.

### EKRAN 8 — Bekleme Salonu
- "Profilin hazır! 🎉 Sana en uygun eşleşmeyi arıyoruz."
- Net beklenti: "Genelde [birkaç saat / 1 gün] içinde." Profil doluluk göstergesi + "profili güçlendir" gönüllü önerisi.
- **Bildirim izni iste (en kritik):** üyeyi geri getirecek tek köprü. Bu olmadan üye uygulamayı kapatır ve yöneticinin "Gerçek Aha"sı tetiklenmez.
- "Burada beklemene gerek yok — hazır olunca sana ulaşacağız."

---

## 4 Aktör İçin Ekran Akışları ve Arayüz Tasarımı

**Tasarım felsefesi:** Her panel "sıfır dış destek" hedefiyle kendi kendini açıklamalı — boş durum rehberliği, satır-içi açıklamalar, geri alınabilir aksiyonlar.

**Yetki sınırları:** Super Admin tüm platformu görür ama tenant'ların içeriğine (kişisel eşleşme detayları, özel mesajlar) erişimi etik ve gizlilik açısından kısıtlı olmalı. Super Admin paneli **agregat/metrik düzeyinde** tasarlanmalı, bireysel veri ayıklama düzeyinde değil.

### 1. UYGULAMA YÖNETİCİSİ (SUPER ADMIN) KONTROL PANELİ

**Ekran 1.1 — Genel Görünüm (Platform Sağlık Panosu)**
- Üst şerit: Aktif Dernek (Tenant) sayısı · Toplam Mentör · Toplam Menti · Toplam üretilen mentörlük saati.
- Platform sağlık göstergesi, büyüme grafiği, "Dikkat gerektirenler" kutusu.
- Aksiyon: "Tenant'ları Yönet", "Global Etki Raporu İndir", uyarıya tıklayınca ilgili tenant.
- Tekrar kullanılabilir `<StatCard>` bileşeni. Grafikler için charting kütüphanesi. Masaüstü öncelikli.

**Ekran 1.2 — Tenant Yönetim Ekranı**
- Tüm derneklerin tablosu: ad + logo · üye sayısı · aktiflik durumu · plan · katılım tarihi · son aktivite.
- Her tenant satırında etki özeti (agregat).
- Aksiyon: "Askıya Al / Aktifleştir" (geri alınabilir, onay diyaloğuyla), "Etki Metriklerini İncele" (agregat detay), "Tenant'a Mesaj Gönder".
- **Kritik tasarım sınırı:** "Verilerini incele" derken bireysel kullanıcıların kişisel profillerini/eşleşmelerini ayıklama yetkisi vermeyin. Super Admin agregat metrik görür, ama "Ayşe kiminle eşleşti" görmemeli. Bu sınır panelde teknik olarak zorlanmalı (yetki katmanı).

### 2. DERNEK YÖNETİCİSİ (TENANT ADMIN) AKIŞI VE ESNEK KURAL PANELİ

**Ekran 2.1 — Onboarding Sonrası Boş Panel** (bkz. Yönetici Onboarding Ekran 7)
- Rehberli checklist, davet linki üretme alanı, "Ne olacak?" önizlemesi.

**Ekran 2.2 — Günlük Kullanım Ekranı (4 KPI + Erken Uyarı)**

| KPI | Ne gösterir | Neden bu metrik |
|---|---|---|
| Aktif Yolculuklar | Şu an süren eşleşme/mentörlük sayısı | Programın canlılığı |
| Boştaki Kapasite | Eşleşme bekleyen mentör/menti | Atıl kaynağı görüp harekete geçmek |
| Ortalama Eşleşme Süresi | Üye katıldıktan eşleşene kadar süre | Sistemin akıcılığı; uzunsa havuz dengesizliği |
| NPS / Mutluluk Skoru | Feedback'ten türeyen memnuniyet | Kalitenin ana göstergesi |

Erken Uyarı Sistemi: ayrı "Dikkat Gerekenler" paneli. Yakaladığı durumlar: düşük memnuniyet, erken çıkış yapanlar, uzun süredir eşleşememiş üyeler, hiç görüşme yapmamış eşleşmeler (ölü eşleşme), sürekli iptal edenler. Her uyarı eyleme dönük.
- **Ton:** uyarılar suçlayıcı değil yardımcı tonda ("şu kötü" değil "şuna bakmak iyi olur").
- **Tasarım dengesi:** Erken uyarı gizlilik kurallarıyla çatışmamalı. Yönetici "düşük memnuniyet var" sinyalini görebilir ama mentinin yazdığı özel yorumun tamamını okuyamayabilir. Agregat sinyal evet, özel içerik hayır.

**Ekran 2.3 — Esnek Program Ayarları Paneli** (dökümanın kalbi)

Her ayar satır-içi açıklamalı, geri alınabilir ve anında önizlemeli olmalı.

*Bölüm A — Görüşme Limitleri:* "Bir menti haftada en fazla kaç mentörle görüşebilir?" (1–5 stepper, varsayılan önerili). Satır-içi açıklama. Mentör kapasitesi.

*Bölüm B — Eşleşme Eşik Skoru ve Override:* "Eşleşme Eşik Skoru" (kaydırıcı, canlı önizleme: "Bu eşikle şu an X eşleşme geçerli olur"). El ile müdahale (override).
- **Önemli:** Eşik skoru ile **hard-gate** (toksik eşleşme bloğu) farklıdır ve karışmamalı. Eşik skoru yöneticinin ayarladığı kalite barajıdır (override edilebilir); hard-gate sabit güvenlik bloğunuzdur (yönetici bunu açamamalı). Panelde bu ikisi net ayrılmalı.

*Bölüm C — İdari Bloklama / Kara Liste:* "birbiriyle eşleşmemeli" dediği kullanıcı çiftleri. Yeni blok ekleme.
- **Gizlilik/incelik:** Bloklama sessiz olmalı — bloklanan kişilere bildirim gitmemeli.

### 3. MENTÖR VE MENTİ AKIŞI
(bkz. yukarıdaki Üye Onboarding Yolculuğu — özet)
- Ekran 3.1 Linkle giriş ve bağlamsal karşılama (tenant `primaryColor` + logo runtime'da yüklenir; mobil öncelikli).
- Ekran 3.2 Mini profil + oyunlaştırılmış DISC testi.
- Ekran 3.3 Üye "Aha" anı (mizaç sonuç kartı).
- Ekran 3.4 Mentör görünürlük opt-in.
- Ekran 3.5 Bekleme salonu + eşleşme bildirimi.

### Aktörler Arası Bağlantı ve Tasarım Tutarlılığı
1. **Veri akışı yukarı doğru toplanır:** Üye test çözer/eşleşir → Tenant Admin KPI panelini besler → tüm tenant'lar Super Admin global panosunu oluşturur. Aynı metrik dili her katmanda tutarlı ("mentörlük saati", "memnuniyet skoru").
2. **Gizlilik sınırı her katmanda korunur:** Üye kendi verisini girer → Tenant Admin agregat + sınırlı sinyal → Super Admin sadece agregat tenant metriği. Kademeli mahremiyet.
3. **"Sıfır dış destek" her ekranda yaşar:** boş durumlar rehberli, ayarlar satır-içi açıklamalı, yıkıcı aksiyonlar geri alınabilir/onaylı.

**İki kritik tasarım kararı:** (1) Eşik skoru ile hard-gate ayrımı (Ekran 2.3-B). (2) Super Admin'in gizlilik sınırı (Ekran 1.2).

---

## Derin Tehdit, Mantık ve Bug Avcılığı Raporu — Production Öncesi Güvenlik Denetimi

**Kapsam:** Node/Express/Prisma backend + Next.js 14 frontend, multi-tenant izolasyon, eşleştirme motoru, psikometrik hesaplama.

> **Yöntemsel not:** Bu rapor bir test planı ve hipotez listesidir. Her maddeyi yazılacak
> testle doğrula. Gerçek kod (özellikle `matching.ts`, `calculateDiscResult`, `requireTenant`)
> incelendiğinde öngörüler kesin bulgulara döner.

### 1. ETKİLEŞİMLİ OTONOM AJAN KURGULARI

**1.1 "Manipülatif / Kaotik Yönetici" Ajanı**

Risk: Tenant Admin, esnek kural panelinden (görüşme limiti, `minMatchScoreThreshold`, `blockedPairs`) sisteme doğrudan parametre yazabiliyor.

Saldırı senaryoları:
- Görüşme limitini 0 veya negatif (-1) yapmak.
- `minMatchScoreThreshold`'u %101 veya 999 yapmak → havuz tamamen kilitlenir.
- `blockedPairs` JSON'una bozuk veri: `[{"a": null}]`, `["sadece_string"]`, devasa dizi (10.000 çift), kendi kendini bloklayan çift (`{a: "x", b: "x"}`).
- Aynı çifti yüzlerce kez ekleyip duplicate ile şişirmek.
- Limiti hızlıca uç değerler arasında değiştirip race condition yakalamak.

Beklenen güvenli davranış:
- Her sayısal ayar **sunucu tarafında** clamp edilmeli: `Math.max(1, Math.min(5, input))`; threshold 0-100 arası zorlanmalı.
- `blockedPairs` yazılmadan önce Zod şema doğrulaması: her eleman `{a: string, b: string}`, `a !== b`, dizi uzunluğu tavanla sınırlı (örn. max 500).
- Tüm ayar yazımları idempotent ve atomik.

Önerilen "akıllı bariyer": **anlamlı sonuç garantisi (sanity guardrail).** Ayar "hiç kimse eşleşemez" durumu yaratıyorsa, kaydetmeden önce uyar: "Bu eşik %95 — şu an hiçbir eşleşme bu barajı geçemiyor. Yine de kaydetmek istiyor musunuz?" Ve **güvenli mod fallback:** bir tenant'ın ayarları bozuk/parse-edilemez çıkarsa varsayılan güvenli değerlere düş (çökme yok), logla.

**1.2 "Kötü Niyetli / Sabotajcı Menti" Ajanı**

Risk: `/disc/submit` endpoint'i kullanıcıdan cevap dizisi alıyor.

Saldırı senaryoları:
- Eksik soru ID'leri (8'den 3'ü). Mükerrer soru ID. Var olmayan/başka tenant'ın soru ID'si.
- Zod saldırıları: `optionKey` yerine dizi/null/obje/devasa string.
- Cross-tenant: A menti'si, B'nin `tenantId`'sini payload'a basar.
- Most/Least: `mostKey === leastKey`.

Beklenen güvenli davranış:
- Zod sıkı: `optionKey` sadece bilinen enum. Sunucu, gönderilen soru ID'lerini DB'deki aktif sorularla doğrulamalı.
- Eksik cevap: ya reddedilmeli ya eksik boyut nötr bırakılmalı (asla yanlış hesaplama).
- `tenantId` asla payload'dan alınmamalı — her zaman doğrulanmış oturum bağlamından.

### 2. ALGORİTMİK DEADLOCK VE PSİKOMETRİK EDGE-CASE

**2.1 Eşleştirme Motoru Deadlock (`matching.ts`)**

Risk: Hard-gate + minimum threshold birlikte, havuzdaki herkesi eleyebilir. Eğer `matching.ts` "en az bir eşleşme vardır" varsayımıyla yazıldıysa, boş havuzda `array[0]` / `.sort()[0]` null/undefined döner → TypeError.

Senaryolar: 1 mentör + 1 menti ikisi de blocked; tüm mentörler sertifikasız; threshold %100; hiç mentör yok (yeni tenant); tek aday `visibility=false`.

Beklenen güvenli davranış: Tüm durumlarda motor istisna fırlatmadan `{ items: [], fallbackLevel: N }` dönmeli. Kademeli fallback: ideal → threshold gevşet (level 1) → sektör-only (level 2) → boş + açıklama (level 3). **Boş sonuç bir hata değil, geçerli bir durumdur.**

**2.2 `calculateDiscResult` Matematiksel Edge-Case**

Risk: Ortalama/normalleştirme/bölme içeriyor. Boş girdide sıfıra bölme (`hits[key] === 0` iken `sum/hits`) → NaN.

Senaryolar: hiç cevap (0/0 = NaN); bir boyut hiç beslenmiyor (`hits=0`); çelişkili most/least; tüm ağırlıklar 0; tüm cevaplar aynı şık.

Beklenen güvenli davranış: Her bölmeden önce `hits > 0` guard. `Number.isFinite()` son kontrol. `deriveArchetype` tüm boyutlar nötr olsa bile güvenli varsayılan dönmeli (asla undefined).

**Gizli matematiksel sızıntı (ürün hatası):** Bir boyut tam 50'ye (nötr) düşerse ve eşikler `>60 / <45` ise, kişi hiçbir tipe net düşmez ve varsayılana kayar. Çok kullanıcı "varsayılan tip"e düşerse eşleştirme çeşitliliği çöker. **İzle:** "varsayılana düşen profil oranı."

### 3. MULTI-TENANT İZOLASYONU VE SİBER GÜVENLİK

**3.1 `requireTenant` Bypass ve Cross-Tenant Sızıntı — EN YÜKSEK ÖNCELİK**

Risk: Tek bir izolasyon açığı tüm iş modelini bitirir. `X-Tenant-Id` header'ı istemci tarafından kontrol edilir ve sahtelenebilir.

Senaryolar:
- A kullanıcısı isteğe B'nin `X-Tenant-Id`'sini koyar → B verisini görebiliyor mu?
- JWT A'ya ait ama header B diyor → sistem hangisine güveniyor?
- Header hiç yok → "varsayılan tenant"a mı düşüyor (tehlikeli)?
- Geçerli ama kullanıcının üye OLMADIĞI tenant ID → membership kontrolü var mı?
- Token A'ya ait ama A kullanıcısı B'nin `matchId`'sini API'ye verir → kaynak-seviyesi yetki var mı?

Beklenen güvenli davranış:
- `X-Tenant-Id` asla tek başına güven kaynağı olmamalı. Gelen `tenantId`, kullanıcının doğrulanmış oturumundaki membership'iyle çapraz kontrol edilmeli. Değilse 403.
- Header ile token çelişirse → reddet. Header eksikse → reddet (varsayılana düşme).
- Her kaynak sorgusu hem ID hem `tenantId` ile filtrelenmeli — `findUnique({ id })` değil, `findFirst({ id, tenantId })`.
- **İdeal:** Prisma middleware/extension ile her sorguya `tenantId` filtresini otomatik enjekte et.

**3.2 Super Admin Gizlilik Sınırı Sızıntısı**

Risk: Agregat sorgularda yanlışlıkla `include: { user: true }` veya ham kayıt dönülürse, bireysel veri API yanıtına sızar (frontend göstermese bile ihlaldir).

Beklenen güvenli davranış: Agregat endpoint'ler yalnızca sayısal/toplam alanlar dönmeli — DTO whitelisting. Super Admin rolü bireysel-veri endpoint'lerine yapısal olarak erişememeli. **k-anonimlik:** çok küçük gruplarda (1-2 kişi) metrik gizlenmeli/yuvarlanmalı.

### 4. RUNTIME VE VERİTABANI SAĞLAMLAŞTIRMA

Risk: Neon (serverless Postgres) bağlantı havuzu kopabilir/uyuyabilir; Prisma `Json` alanları (`limits`, `blockedPairs`) şemasız olduğu için bozuk veri barındırabilir.

Beklenen güvenli davranış:
- Tüm Json okumalarında tip guard zorunlu: `const pairs = Array.isArray(t.blockedPairs) ? t.blockedPairs : []`. Asla doğrudan `.some()`.
- Tüm controller'larda try/catch; DB hatası kullanıcıya 500 stack değil nazik mesaj.
- Prisma connection pool + retry/timeout (Neon için önemli).
- Kritik yazma (eşleşme oluşturma) unique constraint ile: `@@unique([tenantId, mentorId, mentiId])`.
- Json alanlar okunurken Zod ile runtime parse.

### EK: 5 GİZLİ RİSK ALANI

**Gizli Risk 1 — Bildirim Bağımlılığı ("Sessiz Ölüm Spirali"):** Tüm onboarding bildirimle geri çağırmaya dayanıyor. E-posta spam'a düşer / push izni yok / bildirim job'u sessizce fail olursa: yönetici "Gerçek Aha"ya ulaşmaz, tenant ölür, panelde "düşük aktivite" görünür ama nedenini bilemezsin. **Öneri:** bildirim gönderiminin kendisini izle (gönderildi/açıldı/tıklandı). Eşleşme oluştu ama 48 saat bildirim açılmadıysa operasyonel uyarı. Push'a tek bağımlı olma — e-posta + uygulama-içi fallback.

**Gizli Risk 2 — Likidite Çöküşü ("Boş Havuz Algısı"):** Mentör opt-in + hard-gate + threshold birleşince küçük/yeni tenant'ta matematiksel olarak hiç eşleşme üretilemeyebilir. En kritik anda (büyüme) vurur. **Öneri:** tenant "eşleşebilirlik sağlığı" metriği (kaç menti hiç geçerli eşleşme bulamıyor). Yüksekse yöneticiyi uyar. Fallback kademelerini agresif yap.

**Gizli Risk 3 — Çift-Tenant Kullanıcının Kimlik Karışması:** Bir kullanıcı A'da mentör B'de menti olabiliyor. Kodun herhangi bir yeri profili/rolü/sertifikayı `userId`'ye göre çekerse (tenant'ı unutursa), yanlış tenant'ın verisi gelir. `isCertified`/`qualityMultiplier` `UserProfile`'dan `TenantMembership`'e taşınmıştı — ama eski kod hâlâ `UserProfile`'dan okuyor olabilir. Sessizce yanlış sonuç üreten en zor bug türü. **Öneri:** tüm profil/rol/sertifika okumalarının `(userId, tenantId)` çiftiyle yapıldığını statik olarak denetle. Test: aynı kullanıcıyı iki tenant'a farklı rollerle kaydet, her tenant'ta doğru profili gördüğünü doğrula.

**Gizli Risk 4 — "Aha Anı"nın Asla Tetiklenmemesi (Aktivasyon Yarış Durumu):** Eşleşme ne zaman hesaplanıyor? Sadece "menti eşleşme sayfasını açtığında" hesaplanıyorsa, kimse açmazsa eşleşme hiç oluşmaz → bildirim gitmez. **Öneri:** eşleşme hesaplama tetikleyicisini deterministik yap — yeni profil tamamlandığında ilgili havuzda eşleşme yeniden değerlendirilmeli (event-driven). Test: "5. üye profilini bitirdi → eşleşme oluştu → yöneticiye + iki tarafa bildirim gitti" tam zincirini integration testiyle doğrula.

**Gizli Risk 5 — Frontend'de Tenant Cache Zehirlenmesi (Next.js'e özel):** Kullanıcı A'dan B'ye geçtiğinde, veri çekme `tenantId`'yi cache anahtarına dahil etmiyorsa (React Query/SWR `queryKey` veya Next fetch cache), A'nın verisi B ekranında görünür. UX bug'ı + gizlilik sızıntısı. **Öneri:** tüm veri çekme anahtarlarına `tenantId` dahil et; tenant değişiminde cache'i agresif invalidate et; Next.js fetch cache'inde tenant-bazlı tags. Test: A'da veri yükle → B'ye geç → A'nın kalıntısı kalmadığını doğrula.

### Önceliklendirilmiş Eylem Özeti

| Öncelik | Alan | Neden önce |
|---|---|---|
| **P0 — Çıkışı durdurur** | Tenant izolasyonu (3.1) + Çift-tenant kimlik karışması (Gizli 3) | Sızıntı = iş modelinin sonu; geri dönüşü yok |
| **P0** | Eşleştirme deadlock (2.1) + boş-havuz çökmesi | Çökme = ilk kullanıcı deneyiminin ölümü |
| **P1 — Çıkıştan önce** | DISC matematik edge-case (2.2) + Json guard (4) | Sessiz yanlış sonuç + runtime çökme |
| **P1** | Kural paneli hardening (1.1, 1.2) | Yönetici/menti sistemi felç edebilir |
| **P2 — Çıkışla izle** | Bildirim spirali (Gizli 1) + likidite (Gizli 2) + aktivasyon yarışı (Gizli 4) | Büyümeyi sessizce öldürür; metrikle yakala |
| **P2** | Super Admin gizlilik (3.2) + Next cache (Gizli 5) | Önemli ama daha dar yüzey |

**Net tavsiye:** P0'ları çözmeden production'a çıkma. Özellikle tenant izolasyonu ve eşleştirme deadlock — bu ikisi "çalışıyor gibi görünüp" canlıda ilk gerçek trafikte patlayan türden.
