> ⚠️ TASLAK (2026-08-25) — HUKUKÇU ONAYI OLMADAN YAYINLANMAZ.
> Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` (kod gerçeği). Önceki metinler yetersiz bulundu; sıfırdan yazıldı.

# Gizlilik Politikası

Bu politika, platformu kullanırken kişisel verilerinizin nasıl işlendiğini **sade dille** açıklar. Hukuki dayanak ve resmi bildirim için Aydınlatma Metni ve Açık Rıza Metni esastır.

## Kim veri sorumlusu?
- **Hesabınız, girişiniz ve platform güvenliği** için: platform işletmecisi (**Zahid Sami Ata** — gerçek kişi/sosyal sorumluluk projesi).
- **Üyesi olduğunuz kurumun programı kapsamındaki verileriniz** için: **kurumunuzun kendisi** (dernek/kulüp). Platform bu verileri kurum adına, kurumun talimatıyla işler (veri işleyen).

## Ne topluyoruz? (kod gerçeği)
- **Kimlik & iletişim:** ad-soyad, e-posta.
- **Profil:** biyografi, uzmanlık, CV bilgileri, avatar fotoğrafı, sosyal medya bağlantıları.
- **Kişilik/psikometrik veri:** DISC/mizaç testi, OCEAN, sertifika/SJT yanıtları — eşleştirme için.
- **Mesajlaşma içeriği:** platform içi mentor–menti mesajları.
- **Kullanım verisi:** son giriş zamanı, işlem/sistem kayıtları.

## Neden işliyoruz?
Size uygun mentor/menti eşleştirmesi yapmak, programı yürütmek ve kalitesini ölçmek, kurum-içi iletişimi sağlamak, hesap ve platform güvenliğini korumak.

## Kimlerle paylaşıyoruz?
- **Üyesi olduğunuz kurumun yöneticileri** (program yürütümü için) ve **eşleştiğiniz mentor/menti** (sınırlı profil).
- **Teknik altyapı sağlayıcıları (veri işleyenler/alt-işleyenler):** bulut veritabanı (yurt dışı), e-posta sağlayıcısı, (seçerseniz) Google/LinkedIn ile giriş.
- **Reklam/analitik üçüncü taraflara paylaşım YOKTUR** (analitik altyapı şu an aktif değildir).
- Ham kişilik vektörünüz (`discVector`) diğer kullanıcılara **gösterilmez**; yalnız türetilmiş sonuç/uyum paylaşılır.

## Ne kadar saklıyoruz? (dürüst — kod gerçeği, envanter C-5)
- Sistem/güvenlik kayıtları **90 gün** sonra otomatik silinir.
- **Diğer verilerin çoğu için şu an otomatik imha süreci YOKTUR** — hesabınız açık kaldığı sürece saklanır. Önerilen saklama süreleri ve otomatik imha, hukukçu/PO onayıyla belirlenecektir (bkz. Belge 5).
- **Not:** Mesaj içeriği ve bazı geri bildirim alanları, hesap silme işleminde bile teknik bir kısıt (madde 39) nedeniyle şu an tamamen silinememektedir; bu düzeltilecek bir iş maddesidir.

## Haklarınız
KVKK Md.11 kapsamındaki tüm haklara sahipsiniz (öğrenme, düzeltme, silme/anonimleştirme, itiraz, giderim). Kullanım için: bkz. Belge 6.
> **Şu an:** verilerinizi kendiniz indirebileceğiniz/silebileceğiniz bir kullanıcı ekranı **henüz yok**; talepler [PO DOLDURACAK: başvuru e-postası] üzerinden karşılanır. Bu ekran bir iş maddesidir (madde 40/84).

## Güvenlik tedbirleri (gerçek olanlar — kod)
- **Kurum (tenant) izolasyonu:** her sorgu kurum kimliğiyle sınırlandırılır; kurumlar birbirinin verisine erişemez.
- **Parola güvenliği:** parolalar geri döndürülemez biçimde (hash) saklanır ve hiçbir API yanıtında dönmez (global omit — madde 38).
- **Erişim kaydı (audit log):** hassas platform işlemleri kayıt altına alınır.
- **Aktarım:** oturum çerezleri `HttpOnly` + (üretimde) `Secure` + `SameSite=strict`.

## Çocukların verisi
Platform **18 yaş ve üzeri** kullanıma yöneliktir. Şu an yaş yalnızca **beyan** ile alınır; **doğrulama yapılmaz** (dürüst beyan — bir iş maddesi). 18 yaşından küçükseniz platformu kullanmayınız.

## Değişiklikler
Bu politika güncellenebilir; önemli değişiklikler kullanıcılara bildirilir. *(Rıza sürümleme henüz yok — madde 82.)*
