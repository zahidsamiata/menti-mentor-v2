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
- **Barındırma:** bulut veritabanı — **Londra / Birleşik Krallık** (AWS Europe (London), bölge kodu `eu-west-2`; PO teyitli 2026-08-26) + uygulama sunucusu (Dokploy — ülke ayrıca teyit edilecek).
- **Üçüncü taraf:** SMTP e-posta · Google/LinkedIn ile giriş (opsiyonel). **Analitik/reklam YOK** (aktif değil).

### ✅ SUNUCU ÜLKESİ — ÇÖZÜLDÜ (2026-08-26, PO teyitli)
- **Veritabanı sunucusu Londra / Birleşik Krallık'tadır** (AWS Europe (London), bölge kodu `eu-west-2`). PO bulut sağlayıcı konsolundan teyit etti (2026-08-26).
- ⚠️ **GÜNCELLEME (2026-08-26):** eski belgelerdeki **"eu-west-2 / İrlanda"** beyanı **HATALIYDI** — `eu-west-2` = Londra (BK), İrlanda ise `eu-west-1`. Doğru bölge Londra/BK olarak kesinleşti; yasal metinlere bu işlendi.
- **⚠️ Hukukçu için kritik:** **Birleşik Krallık AB ÜYESİ DEĞİLDİR** → İrlanda'dan (AB) farklı olarak ayrı bir yeterlilik/yurt dışı aktarım değerlendirmesi gerekir (bkz. Bölüm 4, Soru 3). Uygulama sunucusu (Dokploy) konumu ayrıca teyit edilecek.

## 4. ⭐ HUKUKÇUYA SORULAR (tüm [HUKUKÇU KARARI] işaretleri + 3 açık soru)
**Belgelere gömülü kararlar:**
1. **DISC/psikometrik profil KVKK Md.6 özel nitelikli veri mi?** (Sayılırsa: ayrı açık rıza + ek güvenlik tedbiri + aktarım kısıtı.) — *Belge 1, 2.*
2. **VERBİS kaydı gerekli mi?** İşletmeci gerçek kişi, çalışan yok, bilanço yok. — *Belge 1.*
3. **Yurt dışı aktarım (Md.9, 2024):** sistematik aktarım için açık rıza yeterli mi, standart sözleşme + Kurul bildirimi mi? Ve **SS-3 açık sorusu:** Kurul'un "Veri İşleyenden Veri İşleyene" standart sözleşmesini bulut/e-posta sağlayıcısı imzalamazsa, mevcut GDPR DPA'sı bir mekanizmaya karşılık gelir mi; gelmezse kalan risk? — *Belge 2, 8.* **⚠️ Not (2026-08-26, PO teyitli): sunucu Birleşik Krallık'tadır (AB üyesi DEĞİL) — değerlendirmeyi buna göre yapmanızı rica ederiz.**
4. **Hukuki sebep eşlemesi:** hangi işleme amacı Md.5 hangi sebebine dayanır (sözleşmenin ifası / meşru menfaat / açık rıza)? — *Belge 1.*
5. **18+ yaş:** yalnız beyan (self-serve'de o da yok) yeterli mi, doğrulama gerekli mi? — *Belge 3, 7.*
   > ⚠️ GÜNCELLEME (2026-09-29): "self-serve'de o da yok" bayat — kurum başvurusu kutusunda da 18+ beyanı var (`Step4Account.tsx:267`, 2026-08-28). Soru (beyan yeterli mi) aynen geçerli.
6. **Çerezler:** zorunlu oturum çerezleri rıza gerektirmez teyidi + ileride analitik çerezleri hangi rıza mekanizması? — *Belge 4.*
7. **Saklama süreleri:** önerilen süreler (Belge 5 [öneri] alanları) uygun mu; süresiz mesaj/feedback saklama riski? — *Belge 5.*
8. **Rıza kutusu ayrımı + sürümleme:** KVKK+18 birleşik kutu ve OAuth'ta rıza kutusunun UI'da alınmaması + rıza sürümünün tutulmaması — düzeltme şart mı, önerilen ayrık tasarım uygun mu? — *Belge 2.*
   > ⚠️ GÜNCELLEME (2026-09-29): sorunun "rıza sürümünün tutulmaması" parçası **kodda kapandı** (sürüm kaydı + sürüm kontrolü var — Bölüm 6 / Bölüm 10). Soru kutu ayrımı ve OAuth için aynen geçerlidir.
9. **⭐ H-9 — Anonimleştirme düzeyi yeterli mi?** Hesap kapanışında/anonimleştirmede **tüm serbest metin ve kimlik/iletişim/kişilik alanları temizleniyor**, yüklenen fotoğraf dosyası siliniyor, oturum/jetonlar iptal ediliyor. **Ancak kayıt anahtarı `userId` — rastgele bir kimlik (cuid), kişisel bilgi içermez — bağlı kayıtlarda (görüşme/mesaj) kalıyor** (karşı tarafın geçmişi bozulmasın diye). **Bu düzey KVKK imha yükümlülüğünü karşılar mı, yoksa `userId` bağının da koparılması (ilişki NULL'lama) mı gerekir?** Ön düşüncemiz: içerik tümüyle temizlendiğinden pratik yeniden-tanımlama güçtür; ancak bunu avukat teyit etmeli. — *Belge 5.*

> Her soru için **bizim ön düşüncemiz belgelerde** işaretli (dayatma değil — avukat karar verir).

## 5. [PO DOLDURACAK] alanları (kalan)
> ✅ **Kapandı (2026-08-26, PO teyitli):** veri sorumlusu **kimliği/adı** (gerçek kişi — bkz. aşağıdaki not) · **bulut sağlayıcı ülkesi** (Londra/BK).
> **Kalan:** veri sorumlusu **adresi · MERSİS/vergi no (varsa) · KEP adresi** · **başvuru `destek@` e-postası (kodda tanımsız — kurulacak)** · uygulama sunucusu (Dokploy) ülkesi · VERBİS kayıt durumu · önceki hukukçu geri bildiriminin kapsamı · yürürlük tarihi.
>
> ℹ️ **Veri sorumlusu kimliği:** şu an **gerçek kişi** (işletmeci, sosyal sorumluluk projesi — şirket değil). **Şirketleşene kadar** gerçek kişi kimliği geçerlidir; şirket kurulunca **şirket unvanı/bilgileriyle** güncellenecektir (PO kararı, 2026-08-26).

## 6. Bilinen uyum boşlukları (DÜRÜST — gizlenmedi)
> Kod-senkron: 2026-09-29 (AN-41) — her madde backend/çatı `origin/main` üzerinde doğrulandı; ayrıntılı kanıt tablosu **Bölüm 10**.
- ~~[ESKİ · 2026-09-29] FE hak-kullanım ekranı YOK; başvuru e-postası tanımsız (madde 40/84).~~
  ⚠️ GÜNCELLEME (2026-09-29): **Hak-kullanım ekranı VAR** — profil sayfasında "Verilerimi indir" + "Hesabımı kapat" (`frontend/src/app/(dashboard)/profile/page.tsx:468` → `DataPrivacySection.tsx`; uçlar `backend/src/routes/userRoutes.ts:203-214` `/me/data-export` + `/me/delete-account`, oturumdan kimlik + hız sınırı) — backend PR #59 + çatı PR #135 (2026-08-29). **Başvuru e-postası hâlâ açık:** ön yüzde `destek@mentimentor.io` bağlantısı var (`Step4Account.tsx:169`, `join/_JoinContent.tsx:65`) ama adresin kurulu olduğu teyit edilmedi (`backend/src/config.ts:143` "ürün sahibi `destek@` adresini kurunca") → PO işi (Bölüm 5).
- ~~[ESKİ · 2026-09-29] Genel otomatik imha YOK; mesaj/feedback süresiz (madde 81).~~
  ⚠️ GÜNCELLEME (2026-09-29): **Kısmen kapandı.** Haftalık otomatik imha (Pazar 03:00 UTC, `cronScheduler.ts:474`) artık **iki** tabloyu kapsar: `SystemLog` 90 gün + **`FeedbackLog` 3 yıl** (`gdprService.ts:374-425`, backend PR #57, 2026-08-28). **Hâlâ süresiz:** mesaj içeriği (`Message` — kodda bilinçli olarak yazılmadı, süre avukat metnine bağlı: `gdprService.ts:429-431`), `Feedback`, `Meeting`, profil verileri. ⚠️ `FeedbackLog` süre dolunca **siliniyor** (anonimleştirilmiyor) — bkz. Bölüm 10 not N-3.
- ~~[ESKİ · 2026-09-29] Rıza metni sürümlenmiyor (madde 82).~~
  ⚠️ GÜNCELLEME (2026-09-29): **Kapandı.** Her rıza, türü (aydınlatma / açık rıza) + **metin sürümü** + kaynağı (form / OAuth / kurum başvurusu) ile ayrı kayıt olarak tutulur (`consentService.ts:29` `CONSENT_VERSION='v1.0'`; backend PR #58, 2026-08-28). Sürüm **kontrolü** de var: sürüm yükselince kullanıcıdan yeniden onay istenir (`consentService.ts:193-197` + `authController.ts:404,553,897`; ekran bandı `ReconsentBanner.tsx`) — backend PR #147 + çatı PR #324 (2026-09-26). ⚠️ Bugünkü sürüm `v1.0` bir yer tutucudur — bkz. Bölüm 10 not N-1.
- OAuth'ta açık rıza UI'da alınmıyor; KVKK+18 birleşik kutu (madde 83). *(2026-09-29 doğrulandı — hâlâ geçerli: birleşik kutu `_RegisterContent.tsx:416-435`, `Step4Account.tsx:261-270`; OAuth düğmeleri kutudan önce ve kutuya bağlı değil `_RegisterContent.tsx:321-329`, rıza sunucuda `OAUTH` kaynağıyla varsayılarak yazılıyor `oauthService.ts:133-141`.)*
- ~~[ESKİ · 2026-09-29] **`hardDelete` (madde 39) → anonimleştirmeye yönlendirildi** (PO kararı, PR bekliyor): FK kısıtı nedeniyle gerçek silme çalışmıyordu; artık "silme" talebi anonimleştirir + oturum iptal eder, kullanıcıya "silindi" DENMEZ (dürüst mesaj).~~
  ⚠️ GÜNCELLEME (2026-09-29): **Uygulandı (PR bekliyor değil).** `hardDeleteUser` → `anonymizeUser`'a delege eder (`gdprService.ts:266-267`) — backend PR #54 (2026-08-26). Kullanıcının kendi "Hesabımı kapat" isteği de aynı yoldan geçer (`gdprController.ts:142`).
- ~~[ESKİ · 2026-09-29] **Anonimleştirme genişletildi (madde 93, PR bekliyor):** kimlik/iletişim/kişilik + **serbest metin (mesaj içeriği, görüşme not/telefon, geri-bildirim/talep/şikayet)** + **fiziksel foto dosyası** + **oturum/jetonlar** temizlenir. **Sınır:** `userId` (rastgele cuid, kişisel bilgi içermez) bağlı kayıtlarda kalır → **H-9 (Bölüm 4)** hukukçuya soruldu. Saklama-imha metni bu gerçeği beyan eder; "tam geri-döndürülemez" vaadi **vermez.**~~
  ⚠️ GÜNCELLEME (2026-09-29): **Uygulandı** — içerik aynı, durum "PR bekliyor" → **canlıda** (backend PR #54, 2026-08-26; mesaj içeriği `[silindi]` `gdprService.ts:40`, jetonlar `:152-153`). **Sınır aynen geçerli:** `userId` bağı kalır → **H-9** hâlâ açık soru.
- 18+ yalnız beyan, doğrulama yok. *(2026-09-29 doğrulandı — hâlâ geçerli. Kurum başvurusunda da 18+ ibaresi artık var: `Step4Account.tsx:267`, 2026-08-28 `dcb9d6f`.)*
- VERBİS durumu belirsiz.
- Analitik (#110) merge-kilitli — çerez izni olmadan açılmayacak. *(2026-09-29 doğrulandı: PR #110 hâlâ AÇIK, birleştirilmedi.)*
- ⚠️ GÜNCELLEME (2026-09-29) — **yeni, henüz canlıda OLMAYAN iki iş (PR açık, merge bekliyor):** (a) **Hata izleme (Sentry)** — backend PR #290 + çatı PR #475; birleştirilirse yurt dışında yeni bir alt işleyen olur (bkz. Bölüm 10 not N-5). (b) **Platform panelinde hata iz kaydı** (kişisel veri temizlenmiş) — backend PR #286 + çatı PR #472. İkisi de avukat/PO onayı beklediği için birleştirilmedi.
- ⚠️ GÜNCELLEME (2026-09-29) — **yeni, canlıda olan iki koruma:** (a) Mentör panelinde memnuniyet puanı (NPS) ortalaması 3'ten az yanıt varsa gizlenir — tek tek kişinin puanı çıkarılamasın (`mentorMetricsController.ts:26-42`; backend PR #259 + çatı PR #459, 2026-09-28). (b) Başvurusu **reddedilmiş** kurum yöneticisi, kuruma yeni katılan kişinin ad/e-postasını içeren bildirimleri artık almaz (`membership.ts:117`; backend PR #277, 2026-09-28).

## 7. Kurumsal model (avukat teyitli — belgelerin temeli)
- **Platform = veri İŞLEYEN; her kurum (dernek) = kendi üyelerinin veri SORUMLUSU.** Ücretsiz sunmak bunu değiştirmez.
- **Üniversite kulüpleri:** veri sorumlusu **üniversitenin kendisidir**; kulüplerin sözleşme imza yetkisi yoktur → **kulüp-tipi tenant AKTİF EDİLMEZ** (iş maddesi).
- **Sunucu:** yurt dışı barındırma **kalıyor** (PO kararı) — "taşıma planlanıyor" YAZILMADI; mevcut durum dürüst beyan edildi.
- **Anonimleştirme:** silme yerine yeterli (kişi anlaşılamayacak düzeyde olmak şartıyla — avukat onaylı).

## 8. Paket içeriği
`01-aydinlatma-metni` (iki sürüm: platform + kurum şablonu) · `02-acik-riza-metni` · `03-gizlilik-politikasi` · `04-cerez-politikasi` · `05-saklama-imha-politikasi` · `06-ilgili-kisi-basvuru-formu` · `07-kullanim-kosullari` · `08-veri-isleyen-sozlesmesi-sablonu`.

## 9. Yayın planı
Hukukçu onayı → [PO DOLDURACAK] alanları doldurulur → FE PR (🛑 merge-kilitli) merge edilir → `/kvkk`, `/gizlilik`, `/terms` + yeni çerez/başvuru sayfaları güncellenir → "taslak" uyarıları kaldırılır. Rıza kutusu ayrımı + sürümleme + başvuru e-postası (madde 82/83/84) uygulanır.
> ⚠️ GÜNCELLEME (2026-09-29): "sürümleme" (madde 82) kodda yapıldı (backend PR #58 + #147, çatı PR #324); yayında yapılacak olan yalnız **sürüm numarasını avukat metnine göre yükseltmektir** (Bölüm 10 not N-1). Kalan: kutu ayrımı (madde 83) + başvuru e-postası (madde 84).

## 10. Kod durumu senkronu + avukata notlar (2026-09-29, AN-41)
> **NE:** paketteki "YOK / PR bekliyor / yapılmadı" durum beyanları, ürünün bugünkü kodu (backend + ön yüz `origin/main`) ile karşılaştırıldı. **NEDEN:** paket 2026-08-25'te yazıldı; o günden beri dört boşluk kodda kapandı ama metin hâlâ "yok" diyordu — avukat ürünün gerçek durumunu görmeli (kaynak: CS bilanço raporu KN-09 · Ç-12..15, `docs/raporlar/kesif/konu-bilanco-denetimi-2026-09-23.md:86-89,186`). **KAPSAM:** yalnız durum beyanları güncellendi (eski cümle üstü çizili + `⚠️ GÜNCELLEME (2026-09-29)`). **Hukuki metin cümleleri (aydınlatma, rıza, politika, sözleşme ifadeleri) DEĞİŞTİRİLMEDİ** — metinle kod arasındaki farklar aşağıda "avukata notlar" olarak listelendi. `.docx` bu senkronu henüz içermez (bkz. `README.md`).

### 10.1 Durum tablosu
| Paket yeri | Eski beyan | Bugünkü durum | Kanıt (dosya:satır · PR) |
|---|---|---|---|
| Kapak §6 · 03 "Haklarınız" · 05 "Bilinen boşluklar" · 06 "Bilinen kısıt" | Kullanıcının kendi verisini indirip hesabını kapatacağı ekran YOK | ✅ VAR — profil → "Verilerimi indir" / "Hesabımı kapat" | `frontend/src/app/(dashboard)/profile/page.tsx:468` · `backend/src/routes/userRoutes.ts:203-214` · backend #59 + çatı #135 (2026-08-29) |
| Kapak §6 · §4 soru 8 · §9 · 02 madde 4 · 03 "Değişiklikler" | Rıza metninin sürümü tutulmuyor | ✅ VAR — sürüm kaydı + sürüm yükselince yeniden onay | `backend/src/services/consentService.ts:29,193-197` · `authController.ts:404,553,897` · `ReconsentBanner.tsx` · backend #58 (2026-08-28) + #147, çatı #324 (2026-09-26) |
| Kapak §6 · 05 tablo "Geri bildirim" · 05 "Bilinen boşluklar" | Otomatik imha yalnız sistem kaydında; geri bildirim süresiz | 🟨 KISMEN — `FeedbackLog` 3 yılda otomatik silinir; mesaj/`Feedback`/görüşme/profil hâlâ süresiz | `backend/src/services/gdprService.ts:374-431` · `cronScheduler.ts:474` · backend #57 (2026-08-28) |
| Kapak §6 · 05 (başlık, "Mevcut imha", "Bilinen boşluklar") · 07 §7 · 08 §7 | "Silme" → anonimleştirme (madde 39) **PR bekliyor** / tam silme kısıtlı | ✅ CANLIDA | `gdprService.ts:266-267` · `gdprController.ts:142` · backend #54 (2026-08-26) |
| Kapak §6 · 05 (başlık, tablo "Mesaj", "Bilinen boşluklar") | Genişletilmiş anonimleştirme (madde 93: mesaj içeriği, not, foto, jetonlar) **PR bekliyor** | ✅ CANLIDA (sınır aynı: `userId` bağı kalır → H-9) | `gdprService.ts:40,77,152-153` · backend #54 (2026-08-26) |
| 02 madde 3 · kapak §4 soru 5 | Kurum başvurusunda 18+ ibaresi bile yok | ✅ VAR (ama aynı birleşik kutuda) | `frontend/src/app/onboarding/stk/_steps/Step4Account.tsx:267` · commit `dcb9d6f` (2026-08-28) |
| Kapak §6 · 02 madde 1-2 | KVKK+18 tek kutu; OAuth'ta rıza kutusu yok | ⬜ DEĞİŞMEDİ (doğrulandı) | `_RegisterContent.tsx:321-329,416-435` · `backend/src/services/oauth/oauthService.ts:133-141` |
| Kapak §6 | Analitik (#110) kilitli | ⬜ DEĞİŞMEDİ — PR #110 açık | `gh pr view 110` → OPEN |
| 05 tablo "Oturum/şifre jetonu" | Süre-bazlı otomatik temizlik yok | ⬜ DEĞİŞMEDİ (doğrulandı) — jetonlar yalnız çıkış/şifre değişimi/hesap kapatmada silinir | `gdprService.ts:403-431` (purge kapsamında yok) |
| 08 son not | Kurum yasal kimlik alanları kodda yok | ⬜ DEĞİŞMEDİ (doğrulandı) | `backend/prisma/schema.prisma` (unvan/vergi/KEP/MERSİS alanı yok) |
| Kapak §6 (yeni) | — | ✅ YENİ: mentör panelinde 3'ten az yanıtta NPS ortalaması gizli | `backend/src/controllers/mentorMetricsController.ts:26-42` · backend #259 + çatı #459 (2026-09-28) |
| Kapak §6 (yeni) | — | ✅ YENİ: reddedilmiş kurum yöneticisi yeni üye bildirimi (ad/e-posta) almaz | `backend/src/services/membership.ts:117` · backend #277 (2026-09-28) |
| Kapak §6 (yeni) | — | ⏳ PR AÇIK, merge bekliyor: hata izleme (Sentry) | backend #290 + çatı #475 (OPEN) |
| Kapak §6 (yeni) | — | ⏳ PR AÇIK, merge bekliyor: platform panelinde temizlenmiş hata iz kaydı | backend #286 + çatı #472 (OPEN) |

### 10.2 Avukata notlar — metin ↔ kod farkları (metin DEĞİŞTİRİLMEDİ; karar avukat/PO)
- **N-1 · Rıza sürümü bugün yer tutucu (`v1.0`).** Sistem her rızayı sürümüyle kaydediyor ve sürüm yükselince yeniden onay istiyor; ancak bugünkü `v1.0` hiçbir onaylı metne karşılık gelmiyor (`consentService.ts:186-188` yorumu). Onaylı metin yayına girdiği gün sürüm yükseltilmeli, yoksa kayıtlar "hangi metne rıza verildi" sorusuna yanlış cevap verir. Ayrıca 2026-08-28 öncesi kullanıcılar için yalnız açık rıza geriye dönük `v1.0-legacy` ile kaydedildi; aydınlatma kaydı **bilinçli olarak** yazılmadı ("olmamış onayı kayda geçirmek eksik kayıttan kötü" — PO kararı, `consentService.ts:165-175`). Bu yaklaşım ispat yükü açısından yeterli mi? *(Bağlı: KARAR-80/M18 GV-18 notu — "sürüm kaydediliyor ama kontrol edilmiyor" şartı backend #147 ile karşılandı.)*
- **N-2 · Üstü çizili politika cümlelerinin yerine ne yazılacak?** Gizlilik Politikası (Belge 3 "Haklarınız", "Değişiklikler", "Ne kadar saklıyoruz?" son iki madde), Başvuru Usulü (Belge 6 "Bilinen kısıt" ilk madde) ve Kullanım Koşulları (Belge 7 §7 son madde) cümleleri koddan geride; 2026-09-23'te üstleri çizildi ama yerine geçecek cümle yazılmadı. Bu cümleler kullanıcıya görünen hukuki metin olduğu için **yeni ifadeyi avukat/PO belirlemeli.** Özellikle Belge 3'teki "mesaj içeriği hesap silmede bile silinememektedir" ve "diğer verilerin çoğu için otomatik imha YOKTUR" cümleleri artık kısmen yanlış (mesaj içeriği hesap kapanışında `[silindi]` olur; geri bildirim kaydı 3 yılda silinir).
- **N-3 · Geri bildirim kaydı: öneri "anonimleştirme", kod "silme".** Belge 5 önerisi "3 yıl sonra anonimleştirme"; kod 3 yıl dolunca `FeedbackLog` satırını **siler** (`gdprService.ts:420-425`) ve süreyi koddaki yorumda "yasal minimum" diye anıyor (`:383`). (a) 3 yıl dayanağı doğru mu, (b) silme mi anonimleştirme mi tercih edilmeli? Ayrıca Belge 5 tablosu aynı satırda `Feedback` tablosunu da sayıyor; o tablo için otomatik imha **yok**.
- **N-4 · Kurumun tek yöneticisi hesabını kapatamaz.** "Hesabımı kapat" isteği, kişi kurumun tek aktif yöneticisiyse reddediliyor ("önce başka bir yönetici atayın") (`backend/src/controllers/gdprController.ts:132-139`). Silme/anonimleştirme hakkına getirilen bu kısıt Belge 6 ve Belge 7 §7'de yazmıyor — metinde beyan edilmeli mi, kısıt hukuken kabul edilebilir mi?
- **N-5 · Hata izleme (Sentry) birleştirilirse yeni yurt dışı alt işleyen doğar.** Kod hazır ama birleştirilmedi (backend #290 + çatı #475). Birleşirse Belge 1 "Aktarılan taraflar", Belge 3 "Kimlerle paylaşıyoruz", Belge 8 §4 alt işleyen tablosu ve kapak §3 "Üçüncü taraf" listesine eklenmesi gerekir; bugün metinlerde yok (doğru, çünkü canlı değil). PO ön koşulu: `00-KUYRUK` DK-01 satırı + `03-PO-ELLE-ISLER` A4.
- **N-6 · Platform operatörünün hata iz kaydını görmesi** (backend #286 + çatı #472, birleştirilmedi): iz kişisel veriden temizlenerek gösteriliyor ve her görüntüleme denetim kaydına yazılıyor. "Platform yöneticisinin kurum verisine kayıtsız tam erişimi" ayrı hukuki soru olarak açık (`03-PO-ELLE-ISLER` A6).
- **N-7 · Başvuru e-postası ön yüzde zaten görünüyor.** Metinlerde `[PO DOLDURACAK]` duran başvuru adresi, ön yüzde `destek@mentimentor.io` olarak kullanıcıya gösteriliyor (`Step4Account.tsx:169`, `join/_JoinContent.tsx:65`, `onboarding/stk/pending-review/page.tsx:108,172`); adresin kurulu ve okunuyor olduğu teyit edilmedi (`backend/src/config.ts:143`). Metinlere yazılacak adres bu mu olacak? (PO)
- **N-8 · Veri sorumlusu olarak gerçek kişi adı.** Belge 1, 3, 7, 8'de işletmecinin açık adı geçiyor; iç kurallarımızdaki "kişi adı yazılmaz" kuralıyla çelişiyor. Bu senkronda dokunulmadı; yasal metnin adı zorunlu kılıp kılmadığı hukuk/PO kararı (KARAR-75 · Ç-16 · YN-13).
- **N-9 · OAuth ve birleşik kutu değişmedi.** Kapak §4 soru 8'in kalan kısmı (kutu ayrımı + Google/LinkedIn ile girişte rızanın ekranda alınmaması) aynen geçerli; kod bu konuda hukukçu kararını bekliyor.
