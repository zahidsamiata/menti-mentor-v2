> ⚠️ TASLAK (2026-08-25) — HUKUKÇU ONAYI OLMADAN YAYINLANMAZ.
> Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` (kod gerçeği).

# 📋 AVUKAT KONTROL DOSYASI (KVKK belge paketi kapağı)

> Bu dosya, avukatın 30 dakikada tam resmi görmesi içindir. Paket **sıfırdan, kod gerçeğine dayanarak** yazıldı; jenerik şablon değildir.
> **Önceki inceleme:** avukat mevcut (eski) metinleri **yetersiz** bulmuştu — bu yüzden temel alınmadı. Önceki geri bildirimin kapsadığı noktalar: [PO DOLDURACAK].

## 1. Ürün ne yapıyor (sade)
Platform, derneklerin/üniversite kulüplerinin **mentor–menti eşleştirme programlarını** yürüttüğü bir yazılım hizmetidir. Kullanıcı kayıt olur, kişilik (DISC/mizaç) değerlendirmesi doldurur; sistem **matematiksel** uyum skoruyla mentor/menti önerir. Platform içi mesajlaşma ve görüşme planlama vardır. Ürün canlıda, gerçek kullanıcı sayısı ~sıfır (yaygınlaşmadan önce uyum hedefleniyor). İşletmeci **gerçek kişi**, sosyal sorumluluk projesi (şirket değil).

## 2. Hangi veriyi neden topluyoruz
| Veri | Amaç |
|---|---|
| Kimlik/iletişim (ad, e-posta) | Hesap, kimlik doğrulama, iletişim |
| Profil (bio, CV, avatar, sosyal link) | Eşleştirme ve tanıtım |
| ⭐ Psikometrik (DISC/OCEAN/SJT) | Uygunluk skoru ile eşleştirme |
| Mesaj içeriği | Mentor–menti iletişimi |
| Kullanım/log | Güvenlik, iz sürme |

## 3. Veri nerede duruyor, nereye gidiyor (envanter özeti)
- **Barındırma:** bulut veritabanı (**yurt dışı**) + uygulama sunucusu.
- **Üçüncü taraf:** SMTP e-posta · Google/LinkedIn ile giriş (opsiyonel). **Analitik/reklam YOK** (aktif değil).

### 🔴 SUNUCU ÜLKESİ ÇELİŞKİSİ (öncelikli — yasal metinde ülke beyanı kritik)
- Proje belgeleri veritabanı bölgesini **"eu-west-2 / İrlanda"** yazıyor. **Bu içsel olarak ÇELİŞKİLİDİR:** `eu-west-2` bölge kodu **Londra (Birleşik Krallık)**'a, İrlanda ise **eu-west-1**'e karşılık gelir. Bir arşiv notu "eu-west-1/Ireland" diyor.
- **UK vs İrlanda ayrımı KVKK yurt dışı aktarımı için önemlidir** (İrlanda = AB; UK = AB dışı, ayrı yeterlilik değerlendirmesi).
- **→ Yasal metinlerde ülke adı YAZILMADI**, `[PO DOLDURACAK: sağlayıcı panelinden teyitli sunucu ülkesi]` bırakıldı. **PO, bulut sağlayıcı konsolundan gerçek bölgeyi teyit etmeli.** Uygulama sunucusu (Dokploy) konumu da kodda yok — teyit edilmeli.

## 4. ⭐ HUKUKÇUYA SORULAR (tüm [HUKUKÇU KARARI] işaretleri + 3 açık soru)
**Belgelere gömülü kararlar:**
1. **DISC/psikometrik profil KVKK Md.6 özel nitelikli veri mi?** (Sayılırsa: ayrı açık rıza + ek güvenlik tedbiri + aktarım kısıtı.) — *Belge 1, 2.*
2. **VERBİS kaydı gerekli mi?** İşletmeci gerçek kişi, çalışan yok, bilanço yok. — *Belge 1.*
3. **Yurt dışı aktarım (Md.9, 2024):** sistematik aktarım için açık rıza yeterli mi, standart sözleşme + Kurul bildirimi mi? Ve **SS-3 açık sorusu:** Kurul'un "Veri İşleyenden Veri İşleyene" standart sözleşmesini bulut/e-posta sağlayıcısı imzalamazsa, mevcut GDPR DPA'sı bir mekanizmaya karşılık gelir mi; gelmezse kalan risk? — *Belge 2, 8.*
4. **Hukuki sebep eşlemesi:** hangi işleme amacı Md.5 hangi sebebine dayanır (sözleşmenin ifası / meşru menfaat / açık rıza)? — *Belge 1.*
5. **18+ yaş:** yalnız beyan (self-serve'de o da yok) yeterli mi, doğrulama gerekli mi? — *Belge 3, 7.*
6. **Çerezler:** zorunlu oturum çerezleri rıza gerektirmez teyidi + ileride analitik çerezleri hangi rıza mekanizması? — *Belge 4.*
7. **Saklama süreleri:** önerilen süreler (Belge 5 [öneri] alanları) uygun mu; süresiz mesaj/feedback saklama riski? — *Belge 5.*
8. **Rıza kutusu ayrımı + sürümleme:** KVKK+18 birleşik kutu ve OAuth'ta rıza kutusunun UI'da alınmaması + rıza sürümünün tutulmaması — düzeltme şart mı, önerilen ayrık tasarım uygun mu? — *Belge 2.*

> Her soru için **bizim ön düşüncemiz belgelerde** işaretli (dayatma değil — avukat karar verir).

## 5. [PO DOLDURACAK] alanları (tam liste)
Veri sorumlusu kimliği (ad/unvan) · adres · MERSİS/vergi no (varsa) · KEP adresi · **başvuru `destek@` e-postası (kodda tanımsız — kurulacak)** · bulut sağlayıcı teyitli ülke · uygulama sunucusu ülkesi · VERBİS kayıt durumu · önceki hukukçu geri bildiriminin kapsamı · yürürlük tarihi.

## 6. Bilinen uyum boşlukları (DÜRÜST — gizlenmedi)
- FE hak-kullanım ekranı YOK; başvuru e-postası tanımsız (madde 40/84).
- Genel otomatik imha YOK; mesaj/feedback süresiz (madde 81).
- Rıza metni sürümlenmiyor (madde 82).
- OAuth'ta açık rıza UI'da alınmıyor; KVKK+18 birleşik kutu (madde 83).
- `hardDelete` FK kısıtı — KVKK tam silme fiilen çalışmıyor (madde 39).
- **Anonimleştirme kısmi (takma-adlaştırma):** sosyal/avatar/kişilik alanları temizlenir (2026-08-25 iyileştirildi) ama mesaj içeriği + fiziksel foto dosyası + kayıt-anahtarı bağı kalır → tam anonimleştirme iş maddesi (madde 93). Saklama-imha metni bu gerçeği beyan eder, "tam geri-döndürülemez" vaadi vermez.
- 18+ yalnız beyan, doğrulama yok.
- VERBİS durumu belirsiz.
- Analitik (#110) merge-kilitli — çerez izni olmadan açılmayacak.

## 7. Kurumsal model (avukat teyitli — belgelerin temeli)
- **Platform = veri İŞLEYEN; her kurum (dernek) = kendi üyelerinin veri SORUMLUSU.** Ücretsiz sunmak bunu değiştirmez.
- **Üniversite kulüpleri:** veri sorumlusu **üniversitenin kendisidir**; kulüplerin sözleşme imza yetkisi yoktur → **kulüp-tipi tenant AKTİF EDİLMEZ** (iş maddesi).
- **Sunucu:** yurt dışı barındırma **kalıyor** (PO kararı) — "taşıma planlanıyor" YAZILMADI; mevcut durum dürüst beyan edildi.
- **Anonimleştirme:** silme yerine yeterli (kişi anlaşılamayacak düzeyde olmak şartıyla — avukat onaylı).

## 8. Paket içeriği
`01-aydinlatma-metni` (iki sürüm: platform + kurum şablonu) · `02-acik-riza-metni` · `03-gizlilik-politikasi` · `04-cerez-politikasi` · `05-saklama-imha-politikasi` · `06-ilgili-kisi-basvuru-formu` · `07-kullanim-kosullari` · `08-veri-isleyen-sozlesmesi-sablonu`.

## 9. Yayın planı
Hukukçu onayı → [PO DOLDURACAK] alanları doldurulur → FE PR (🛑 merge-kilitli) merge edilir → `/kvkk`, `/gizlilik`, `/terms` + yeni çerez/başvuru sayfaları güncellenir → "taslak" uyarıları kaldırılır. Rıza kutusu ayrımı + sürümleme + başvuru e-postası (madde 82/83/84) uygulanır.
