> ⚠️ TASLAK (2026-08-25) — HUKUKÇU ONAYI OLMADAN YAYINLANMAZ.
> Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` (kod gerçeği).
> Not: önceki metinler hukukçu tarafından YETERSİZ bulundu; bu paket sıfırdan, kod gerçeğine dayanarak yazıldı.
> **Model (avukat teyitli):** Platform = **veri İŞLEYEN**; her kurum (dernek/kulüp) = kendi üyelerinin **veri SORUMLUSU**. Bu yüzden iki sürüm var.

# Aydınlatma Metni (KVKK Md.10)

## SÜRÜM 1A — Platformun KENDİ veri sorumlusu olduğu işlemler
*(Hesap açma / kimlik doğrulama, platform güvenliği, global içerik — bu işlemlerde platform veri sorumlusudur.)*

**Veri sorumlusu:** [PO DOLDURACAK: veri sorumlusunun tam kimliği — gerçek kişi ad/soyad veya varsa unvan; adres; KEP/e-posta; VERBİS kayıt no varsa]
*(Not: PO şirket değil, gerçek kişi/sosyal sorumluluk projesi — [HUKUKÇU KARARI 2: VERBİS kaydı gerekli mi?])*

**İşlenen kişisel veri kategorileri (kod gerçeği — envanter C-4):**
- **Kimlik:** ad-soyad, e-posta (`User.fullName/email`).
- **Profil:** biyografi, uzmanlık, CV alanları (gönüllülük/proje/eğitim), avatar, sosyal medya bağlantıları (LinkedIn/Instagram).
- **⭐ Psikometrik veri (özel başlık):** DISC/mizaç profili, OCEAN skorları, arketip, SJT ve sertifika yanıtları (`discVector`, `temperamentJson`, `selfProfile`, `UserProfile.ocean*`, `UserResponse`).
  - **[HUKUKÇU KARARI 1]:** Bu veriler KVKK Md.6 **özel nitelikli kişisel veri** sayılır mı? Sayılırsa ayrı açık rıza + ek güvenlik tedbiri gerekir.
- **İşlem güvenliği / davranışsal:** son giriş zamanı, sistem logları (`lastLoginAt`, `SystemLog`).

**İşleme amaçları:** üyelik hesabının oluşturulması ve kimlik doğrulama; platform ve hesap güvenliğinin sağlanması; hizmetin sunulabilmesi için zorunlu teknik işlemler.

**Hukuki sebep:** [HUKUKÇU KARARI 3: hangi amaç hangi Md.5 sebebine dayanır — sözleşmenin ifası (Md.5/2-c) · meşru menfaat (Md.5/2-f) · açık rıza (Md.5/1) ayrımı]. Psikometrik veri işlemesi büyük olasılıkla **açık rızaya** dayanır (bkz. Açık Rıza Metni).

**Aktarılan taraflar (envanter C-1/C-2):**
- **Barındırma (yurt dışı):** Veritabanı bulut sağlayıcısında barındırılır — **[PO DOLDURACAK: sağlayıcı panelinden teyitli sunucu ülkesi]** *(🔴 belgelerde çelişki var — kapak dosyasına bkz.; yanlış ülke beyanı yasal risk)*.
- **Kimlik doğrulama (isteğe bağlı):** Google / LinkedIn ile giriş seçildiğinde bu sağlayıcılarla asgari kimlik verisi (e-posta, ad) alışverişi (yurt dışı).
- **E-posta:** bildirim/şifre-sıfırlama e-postaları için SMTP sağlayıcısı (alıcı e-posta + ad).
- **Not:** Reklam/analitik üçüncü taraflara aktarım **YOKTUR** (analitik altyapı şu an aktif değildir).

**Toplama yöntemi:** kayıt formu, sosyal medya ile giriş (OAuth), kullanıcı tarafından doldurulan profil ve test/anket yanıtları (otomatik + kısmen otomatik yöntemler).

**İlgili kişi hakları (KVKK Md.11):** kişisel verinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını öğrenme, aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini, şartlar oluşmuşsa silinmesini/anonimleştirilmesini isteme, işlemenin münhasıran otomatik sistemlerle analiziyle aleyhinize bir sonuç çıkmasına itiraz, zarara uğramanız hâlinde giderim talep etme.

**Başvuru yolu:** [PO DOLDURACAK: başvuru e-posta adresi — kodda `destek@` tanımsız, kurulacak] *(bkz. Belge 6 — İlgili Kişi Başvuru Usulü)*.

---

## SÜRÜM 1B — Kurum (dernek/kulüp) ADINA işlenen veriler için ŞABLON
*(Kurumun kendi üyelerine sunacağı aydınlatma metni şablonu. Bu işlemlerde VERİ SORUMLUSU KURUMDUR; platform yalnız veri işleyendir.)*

**Veri sorumlusu:** **[Kurum Unvanı]** — [Kurum adresi] · [Kurum KEP/e-posta] · [Kurum VERBİS kayıt no, varsa].
> Platform (`[PO DOLDURACAK: platform işletmecisi]`) bu verileri **veri işleyen** sıfatıyla, yalnızca kurumun talimatı doğrultusunda işler (bkz. Veri İşleyen Sözleşmesi — Belge 8).

**İşlenen veri kategorileri:** Sürüm 1A'daki kategorilerin aynısı (kimlik, profil, ⭐psikometrik, davranışsal) — kurum üyeleri için.

**İşleme amaçları (kurum tarafı):** mentor–menti eşleştirmesi, program yürütümü ve kalite ölçümü, kurum-içi iletişim, program raporlaması.

**Hukuki sebep:** [HUKUKÇU KARARI 3] (kurumun üyeleriyle ilişkisine göre — üyelik sözleşmesi / açık rıza).

**Aktarılan taraflar:** platform (veri işleyen) + platformun alt işleyenleri (barındırma, e-posta, OAuth — bkz. Belge 8 alt-işleyen listesi).

**İlgili kişi hakları + başvuru:** KVKK Md.11 (yukarıdaki tam liste). **Başvuru öncelikle KURUMA yapılır**; kurum, gerekli hallerde platformdan (veri işleyen) teknik destek alır.

> **[KURUM DOLDURACAK]** işaretli tüm alanları kurum kendi bilgileriyle tamamlar. Platform bu şablonu sağlar, doldurmaz.
