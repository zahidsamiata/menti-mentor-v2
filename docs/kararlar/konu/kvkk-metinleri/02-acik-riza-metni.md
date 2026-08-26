> ⚠️ TASLAK (2026-08-25) — HUKUKÇU ONAYI OLMADAN YAYINLANMAZ.
> Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` (kod gerçeği).
> Not: önceki metinler hukukçu tarafından yetersiz bulundu; sıfırdan yazıldı.

# Açık Rıza Metni

> **İlke (KVKK):** Açık rıza aydınlatmadan **AYRI**, **özgür iradeye dayalı** ve **belirli bir konuya ilişkin** olmalıdır; hizmetin
> kullanımı ön şartına bağlanamaz (koşullu rıza geçersizdir). Bu yüzden bu belge aydınlatmadan ayrı ve rızalar **konu bazında ayrık** sunulur.

## 1. Genel açık rıza
> [HUKUKÇU KARARI 3'e göre: aşağıdaki işlemlerin hangileri açık rıza gerektirir, hangileri sözleşmenin ifası/meşru menfaat kapsamındadır netleşince bu bölüm daraltılacak.]

"Kişisel verilerimin, tarafıma sunulan Aydınlatma Metni'nde belirtilen amaçlarla işlenmesine açık rıza veriyorum."  ☐

## 2. ⭐ Psikometrik veri için AYRI açık rıza (DISC / mizaç / OCEAN profili)
"DISC/mizaç değerlendirmesi ve benzeri kişilik-profili verilerimin; eşleştirme kalitesi ve bana uygun mentor/menti önerisi amacıyla işlenmesine açık rıza veriyorum."  ☐

> **[HUKUKÇU KARARI 1]:** DISC/OCEAN/psikometrik profil KVKK **Md.6 özel nitelikli kişisel veri** sayılır mı?
> - Sayılırsa: bu rıza Md.6 kapsamında **ayrı açık rıza** olarak alınmalı + Kurul'un öngördüğü **ek güvenlik tedbirleri** uygulanmalı + aktarımda ek kısıt doğar.
> - Sayılmazsa: genel açık rıza kapsamında değerlendirilebilir. **Ajan bu soruyu cevaplamaz — hukukçu belirler.**

## 3. Yurt dışına aktarım için açık rıza
"Kişisel verilerimin, hizmetin sunulabilmesi için yurt dışında bulunan sunucularda barındırılmasına ve (sosyal medya ile giriş seçersem) ilgili kimlik doğrulama sağlayıcılarına asgari ölçüde aktarılmasına açık rıza veriyorum."  ☐

> **[HUKUKÇU KARARI 4]:** KVKK Md.9 (2024 değişikliği sonrası) kapsamında **sistematik** yurt dışı aktarım için açık rıza yeterli mi, yoksa
> **standart sözleşme (SS) + Kurul'a bildirim** mi gerekir? Ayrıca **[AÇIK SORU — 2. avukat görüşmesi]:** Kurul'un "Veri İşleyenden Veri İşleyene"
> (SS-3) standart sözleşmesini bulut/e-posta sağlayıcısı imzalamazsa, sağlayıcının mevcut GDPR DPA'sı bir aktarım mekanizmasına karşılık gelir mi;
> gelmezse kalan risk nedir? **Sunucu ülkesi: Londra / Birleşik Krallık** (AWS `eu-west-2`; PO teyitli 2026-08-26). ⚠️ **Birleşik Krallık AB üyesi DEĞİLDİR** — yurt dışı aktarım/yeterlilik değerlendirmesi buna göre yapılır.

---

## ⚠️ MEVCUT DURUM BULGUSU (kod gerçeği — envanter C-6) — dürüst beyan
Aşağıdakiler **şu anki kodda böyle**; hukukçu onayıyla düzeltilecek. Bu paket bunları gizlemez:
1. **KVKK onayı + 18+ beyanı TEK kutuda birleşik** (`_RegisterContent.tsx:414`) — açık rıza "özgür/ayrık" ilkesiyle çelişebilir.
2. **OAuth (Google/LinkedIn) girişinde açık rıza kutusu UI'da GÖSTERİLMİYOR** — kod "OAuth başlatmak = rıza" varsayıyor (`oauthService.ts:112` implicit `kvkkConsentAt`).
3. **Self-serve kurum başvurusunda 18+ ibaresi bile yok.**
4. **Rıza metninin SÜRÜMÜ tutulmuyor** (yalnız zaman damgası) → hangi metne rıza verildiği ispatlanamıyor.

### Önerilen ayrık tasarım (yalnız TASLAK öneri — KOD BU TURDA YAZILMADI)
- Kayıt/giriş ekranında **ayrı kutular:** (a) Aydınlatma metnini okudum · (b) 18 yaşımı doldurdum · (c) Genel açık rıza · (d) Psikometrik veri açık rızası · (e) Yurt dışı aktarım açık rızası. Her biri **bağımsız**, hizmet için zorunlu olmayanlar işaretsiz bırakılabilir.
- OAuth akışında da aynı kutular giriş ÖNCESİ gösterilir.
- Her rıza için **metin sürümü** (ör. `v2026-09`) DB'ye kaydedilir → ispat.
- Uygulama iş maddeleri: `00-KARAR-TAKIP` madde 82 (sürümleme) + madde 83 (rıza kutusu ayrımı). **Kod değişikliği hukukçu kararına bağlı.**
