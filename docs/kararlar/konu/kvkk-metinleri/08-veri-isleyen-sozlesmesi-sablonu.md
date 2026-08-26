> ⚠️ TASLAK (2026-08-25) — HUKUKÇU ONAYI OLMADAN YAYINLANMAZ.
> Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` (alt-işleyen listesi C-2). Sıfırdan yazıldı.
> **Avukat kararı gereği ZORUNLU belge:** platform = veri işleyen, kurum = veri sorumlusu.

# Veri İşleyen (Veri İşleme) Sözleşmesi — ŞABLON
### Taraflar: [Kurum Unvanı] ("Veri Sorumlusu") ↔ **Zahid Sami Ata** (gerçek kişi/işletmeci — Platform İşletmecisi) ("Veri İşleyen")

## 1. Tarafların rolleri
- **Veri Sorumlusu:** işleme amaç ve vasıtalarını belirleyen **Kurum** (dernek/kulüp). Üyelerinin kişisel verilerinden hukuken sorumludur (idari/mali sorumluluk kurumun tüzel kişiliğinde; [HUKUKÇU: cezai sorumluluk yönetim organında]).
- **Veri İşleyen:** verileri **yalnızca Veri Sorumlusu'nun yazılı talimatı** doğrultusunda işleyen Platform.
> ⭐ **Üniversite kulüpleri (avukat teyitli):** veri sorumlusu **üniversitenin tüzel kişiliğidir**; kulüplerin sözleşme imzalama yetkisi YOKTUR → bu sözleşme üniversite ile yapılır. (Bkz. `00-KARAR-TAKIP`: kulüp-tipi tenant yetkilendirme iş maddesi.)

## 2. İşlemenin konusu ve kapsamı
- **Amaç:** mentor–menti eşleştirme programının yürütülmesi ve kalite ölçümü.
- **Veri kategorileri (envanterden):** kimlik, iletişim, profil, ⭐psikometrik (DISC/OCEAN/SJT), mesaj içeriği, davranışsal/kullanım.
- **İlgili kişi grupları:** kurumun üyeleri (mentor/menti/yönetici).
- **Talimat ilkesi:** Veri İşleyen, sözleşmede/yazılı talimatta belirtilenin dışında işleme yapmaz; aksi hukuken zorunlu değilse.

## 3. Veri İşleyen'in yükümlülükleri
- Verileri yalnızca talimatla işlemek; gizlilik; erişimi yetkiyle sınırlamak.
- Uygun teknik/idari tedbirleri almak (kurum izolasyonu, parola hash, audit log, erişim kontrolü — mevcut tedbirler envanterde).
- İlgili kişi taleplerinde ve ihlallerde Veri Sorumlusu'na **destek** olmak.

## 4. ⭐ Alt işleyenler (envanter C-1/C-2 — kod gerçeği)
Veri İşleyen, aşağıdaki alt işleyenleri kullanır; Veri Sorumlusu bunları onaylar. Yeni alt işleyen eklenmeden önce bilgilendirme yapılır.
| Alt işleyen | Hizmet | Aktarılan veri | Konum |
|---|---|---|---|
| Bulut veritabanı sağlayıcısı | Verilerin barındırılması | Tüm kişisel veri | **Londra / Birleşik Krallık** (AWS `eu-west-2`; PO teyitli 2026-08-26 — ⚠️ AB üyesi DEĞİL) |
| E-posta (SMTP) sağlayıcısı | Bildirim/şifre e-postaları | Alıcı e-posta + ad + içerik başlığı | [PO DOLDURACAK: sağlayıcı + ülke] |
| Google (OAuth) | Sosyal medya ile giriş (opsiyonel) | E-posta, ad (asgari) | Yurt dışı |
| LinkedIn (OAuth) | Sosyal medya ile giriş (opsiyonel) | E-posta, ad (asgari) | Yurt dışı |
> Reklam/analitik alt işleyen **YOKTUR** (analitik altyapı aktif değil).

## 5. Yurt dışına aktarım
Barındırma ve OAuth sağlayıcıları yurt dışındadır. Aktarım **[HUKUKÇU KARARI 4]** kapsamında meşru kılınır (açık rıza ve/veya standart sözleşme + Kurul bildirimi). **[AÇIK SORU — SS-3:** sağlayıcı Kurul standart sözleşmesini imzalamazsa mevcut GDPR DPA'sının karşılığı].

## 6. Güvenlik ihlali bildirimi
Veri İşleyen, bir ihlali öğrenmesinden itibaren **gecikmeksizin** Veri Sorumlusu'na bildirir; Veri Sorumlusu Kurul'a/ilgili kişilere bildirim yükümlülüğünü yerine getirir. [HUKUKÇU KARARI: bildirim süresi — Kurul "en kısa sürede/72 saat" pratiği.]

## 7. Silme / iade
Sözleşme sona erdiğinde Veri İşleyen, Veri Sorumlusu'nun talimatına göre verileri **siler veya anonimleştirir ya da iade eder** (avukat: anonimleştirme yeterli). *(Not: mevcut tam-silme kısıtı madde 39 — düzeltme iş maddesi.)*

## 8. Denetim
Veri Sorumlusu, makul bildirimle Veri İşleyen'in bu sözleşmeye uyumunu denetleyebilir (bilgi talebi / rapor).

---
> **[KURUM DOLDURACAK]** ve **[PO DOLDURACAK]** alanları taraflarca tamamlanır. **Kayıt akışına entegrasyon (Tenant yasal kimlik alanları) KOD OLARAK YAPILMADI** → migration gerektirir, ayrı iş maddesi (`00-KARAR-TAKIP`). Bu şablon hukukçu onayı sonrası yürürlüğe girer.
