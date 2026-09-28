> ⚠️ TASLAK (2026-08-25) — HUKUKÇU ONAYI OLMADAN YAYINLANMAZ.
> Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` (kod gerçeği). Önceki metinler yetersiz bulundu; sıfırdan yazıldı.

# Gizlilik Politikası

Bu politika, platformu kullanırken kişisel verilerinizin nasıl işlendiğini **sade dille** açıklar. Hukuki dayanak ve resmi bildirim için Aydınlatma Metni ve Açık Rıza Metni esastır.

## Kim veri sorumlusu?
- **Hesabınız, girişiniz ve platform güvenliği** için: platform işletmecisi (**Zahid Sami Ata** — gerçek kişi/sosyal sorumluluk projesi).
  > ⚠️ ÇELİŞKİ (2026-09-23, CS raporu): "Kişi Adı Yasağı" (kök CLAUDE.md) ile yasal metnin isim zorunluluğu çelişiyor — karar PO/hukuk (bkz. 01-KARARLAR.md KARAR-75). İsim yasal zorunluluk olabileceğinden değiştirilmedi; belgedeki sonraki geçişler için de geçerlidir.
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
> ⚠️ GÜNCELLEME (2026-09-29, AN-41 — yalnız durum; politika cümleleri DEĞİŞTİRİLMEDİ): bu bölümdeki iki cümle koddan geride — hesap kapanışında mesaj içeriği `[silindi]` olur (madde 39/93 canlıda, backend PR #54) ve `FeedbackLog` 3 yılda otomatik imha edilir (backend PR #57). Cümlelerin yeniden yazılması hukuki metin olduğu için avukat/PO işidir → kapak Bölüm 10 not N-2.

## Haklarınız
KVKK Md.11 kapsamındaki tüm haklara sahipsiniz (öğrenme, düzeltme, silme/anonimleştirme, itiraz, giderim). Kullanım için: bkz. Belge 6.
> ~~**Şu an:** verilerinizi kendiniz indirebileceğiniz/silebileceğiniz bir kullanıcı ekranı **henüz yok**; talepler [PO DOLDURACAK: başvuru e-postası] üzerinden karşılanır. Bu ekran bir iş maddesidir (madde 40/84).~~
> ⚠️ ÇELİŞKİ (2026-09-23, CS raporu): Kod tarafında FE veri-hakları ekranı MOUNT EDİLMİŞ — `DataPrivacySection.tsx` bileşeni `frontend/src/app/(dashboard)/profile/page.tsx:443`'te mount edilmiş. Metin "ekran henüz yok" diyor; kod tarafında ekran bağlı → iki taraf çelişik, metin bayat. Kanıt: `frontend/src/app/(dashboard)/profile/page.tsx:443`. Karar PO'nun.
> ⚠️ GÜNCELLEME (2026-09-29): `origin/main`'de doğrulandı — ekran `frontend/src/app/(dashboard)/profile/page.tsx:468` (satır kaydı; `DataPrivacySection`), uçlar `backend/src/routes/userRoutes.ts:203-214` — backend PR #59 + çatı PR #135 (2026-08-29). Üstü çizili cümlenin **yerine yayında ne yazılacağı** avukat/PO işi → kapak Bölüm 10 not N-2.

## Güvenlik tedbirleri (gerçek olanlar — kod)
- **Kurum (tenant) izolasyonu:** her sorgu kurum kimliğiyle sınırlandırılır; kurumlar birbirinin verisine erişemez.
- **Parola güvenliği:** parolalar geri döndürülemez biçimde (hash) saklanır ve hiçbir API yanıtında dönmez (global omit — madde 38).
- **Erişim kaydı (audit log):** hassas platform işlemleri kayıt altına alınır.
- **Aktarım:** oturum çerezleri `HttpOnly` + (üretimde) `Secure` + `SameSite=strict`.

## Çocukların verisi
Platform **18 yaş ve üzeri** kullanıma yöneliktir. Şu an yaş yalnızca **beyan** ile alınır; **doğrulama yapılmaz** (dürüst beyan — bir iş maddesi). 18 yaşından küçükseniz platformu kullanmayınız.

## Değişiklikler
Bu politika güncellenebilir; önemli değişiklikler kullanıcılara bildirilir. ~~*(Rıza sürümleme henüz yok — madde 82.)*~~
> ⚠️ ÇELİŞKİ (2026-09-23, CS raporu): Kod tarafında rıza sürümleme UYGULANMIŞ — `consentService.ts:28` `CONSENT_VERSION='v1.0'` + dual-write + testler VAR (G1-07 uygulandı). Metin "sürümleme henüz yok" diyor; kod sürümlüyor → iki taraf çelişik, metin bayat. Kanıt: `consentService.ts:28`. Karar PO'nun.
> ⚠️ GÜNCELLEME (2026-09-29): `origin/main`'de doğrulandı (sürüm kaydı + kontrolü) → kapak Bölüm 6 / Bölüm 10.
