# BİLANÇO KARAR DOSYASI — G1: Güvenlik / KVKK / hukuk

**📸 DONDURULMUŞ** · 2026-08-27 (Tur-5b) · Kaynak: `00-SAYIM-2026-08-27.md` (c/G1) + `karar-defteri-2026-08-26.md` (GRUP 1)

> **Ne bu:** G1 grubundaki her karar-gerektiren kalem için PO'nun tek tek işaretleyebileceği ayrı karar kartı. Salt-okuma + kod-teyit turu; kod değiştirilmedi, DB'ye dokunulmadı. Kartlardaki `[ ]` kutuları PO içindir.

---

## DOSYA BAŞI — mutabakat

- **Tur-5a beyanı (G1):** 49 kalem.
- **Bu dosyada fiilen yazılan kart sayısı:** 30 (durum: 🟡+⬜+❓+🔵).
- **✅ YAPILDI (kart-yok listesi):** 19 (dosya sonunda tek-satır).
- **⭐ BEYAN ↔ YAZILAN mutabakatı:** 49 = 30 (kart) + 19 (✅ kart-yok) → **✅ tuttu.**

**Durum dağılımı (kartlılar, 30):**

| durum | adet | kart no'ları |
|---|:---:|---|
| ⬜ AÇIK | 18 | G1-01, G1-04, G1-06, G1-07, G1-08, G1-09, G1-10, G1-13, G1-15, G1-16, G1-17, G1-18, G1-20, G1-22, G1-26, G1-27, G1-29, G1-30 |
| 🟡 YARIM | 3 | G1-05, G1-12, G1-21 |
| ❓ TEYİT GEREK | 7 | G1-02, G1-03, G1-14, G1-19, G1-23, G1-24, G1-25 |
| 🔵 bilinçli erteleme | 2 | G1-11, G1-28 |

**Kod-teyidi:** bu turda **8 kod-iddiası** geniş (backend/src + frontend/src + schema) teyit edildi. **ÇÜRÜYEN: 0** tam çürüme; **1 kısmi düzeltme** (logoUrl XSS — CSP yalnız `/uploads`'a uygulanıyor, tenant logoUrl'e değil → G1-23'te not). **❓ kalan (teyit edilemeyen niyet/hukuk):** 7.

**Tahmini PO okuma süresi:** 30 kart × ~1.25 dk ≈ **37,5 dk**.

---

**[G1-01] Yaş (18+) için form-input ve DB alanı yok**
Ne: KVKK metninde 18+ öz-beyanı var ama kullanıcının doğum tarihi/yılı ne kayıt formundan alınıyor ne de veritabanında tutuluyor. Yani "18 yaşından büyüğüm" onayı METİN olarak var, gerçek bir yaş verisi yok.
Neden başlanmıştı: NİYET: 18+ doğrulama (küçükleri sistem dışında tutmak).
Nerede durdu: Veri-katmanı hiç yazılmadı; "metin var / input yok" nüansı fark edilince durdu.
Bugünkü durum: ⬜ AÇIK
Etkisi: 18 yaş altı biri sisteme girebilir; yaş kanıtı yok, KVKK/velayet açığı.
İş boyu: M
Kaynak: karar-defteri (md.3-alt / K4) · Numara: md.3-alt
⚠️ bilanço yanılmış DEĞİL: `birthDate`/`birthYear` hem backend/src hem frontend/src hem schema.prisma'da geniş arandı → hiç yok (⬜ doğrulandı).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-02] Menti→mentör DISC harfini gizleyen rol-ayrışması kanıtlanamadı**
Ne: Menti mentörün DISC'ini görmemeli. Yüzde/ham-vektör gizli olduğu doğrulandı ama DISC TİPİ'nin (harfin, ör. "DI") mentiye gösterilmediği, veriyi role göre kısan DTO katmanında kanıtlanamadı.
Neden başlanmıştı: NİYET: asimetrik mahremiyet (mentör mentinin DISC'ini görür, menti mentörünkini görmez).
Nerede durdu: DTO bu turda açılıp incelenmedi (TUR-4/kod-turu işi).
Bugünkü durum: ❓ TEYİT GEREK
Etkisi: Eğer harf sızıyorsa menti mentörün kişilik tipini görür — asimetrik mahremiyet ilkesi kısmen bozulur.
İş boyu: S
Kaynak: karar-defteri (md.1-alt) · Numara: md.1-alt

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-03] `listPendingTenants` görüntüleme audit izi yok (düşük)**
Ne: Platform yöneticisi onay bekleyen kurumları listelerken bu "görüntüleme" olayı bir denetim kaydına yazılmıyor. Kimin ne zaman baktığı izlenemiyor.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (madde 89'un doğurduğu düşük-öncelik nüans).
Nerede durdu: DURUŞ SEBEBİ YOK (düşük öncelik olarak işaretlenmiş).
Bugünkü durum: ❓ TEYİT GEREK
Etkisi: PII maskeli olsa da bakış izi olmadığı için kötüye kullanım geriye dönük izlenemez (düşük risk).
İş boyu: S
Kaynak: karar-defteri (md.94) · Numara: md.94

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-04] `SuspicionReport` kaydında `tenantId` yok → tenant izolasyon boşluğu**
Ne: Şüphe/ihbar bildirimlerinde raporun hangi kuruma ait olduğu bir `tenantId` alanıyla tutulmuyor; yalnız serbest-metin `tenantName` var. Kurumlar arası kesin ayrım (izolasyon) yok.
Neden başlanmıştı: NİYET: raporun hangi kuruma ait olduğunu kesin bilmek.
Nerede durdu: Kod-tasarım kararı (public ihbar formu bilinçli tenant-bağımsız mı, yoksa eksik mi belirsiz).
Bugünkü durum: ⬜ AÇIK
Etkisi: İhbarların kurum bazında filtrelenmesi/izolasyonu güvenilmez; yanlış kuruma atfedilme riski.
İş boyu: M
Kaynak: karar-defteri (md.71 / T3) · Numara: md.71
⚠️ bilanço doğrulandı: `schema.prisma:1168-1180` `SuspicionReport` modelinde `tenantName` var, `tenantId` YOK (geniş teyit edildi).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-05] KVKK kullanıcı-yüzü üçlüsü (veri indir / anonimleştir / sil) — arayüz yok**
Ne: Kullanıcının kendi verisini indirmesi (export), anonimleştirmesi ve silinmesini istemesi için backend hazır ama kullanıcının bunları tetikleyeceği hiçbir ekran/buton (frontend) yok. KVKK Md.11 hakları arayüzde kullanılamıyor.
Neden başlanmıştı: NİYET: KVKK Md.11 kullanıcı-yüzü (kişi haklarını kendi kullanabilsin).
Nerede durdu: Frontend 0 (backend endpoint'leri var, çağıran arayüz yok).
Bugünkü durum: 🟡 YARIM
Etkisi: Yasal hak (verimi indir/sil) fiilen kullanılamıyor; KVKK uyum açığı, canlı-öncesi kritik.
İş boyu: M
Kaynak: karar-defteri (md.40/97) · Numara: md.40/97
⚠️ bilanço doğrulandı: backend `userRoutes.ts:170-184` (anonymize/hard-delete/export) VAR; frontend/src'te `anonymize`/`hard-delete`/`export` çağrısı geniş arandı → 0 eşleşme (FE gerçekten yok).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: 🔴 ÇIKIŞ BLOKERİ — çıkış öncesi tamamlanmalı.
---

**[G1-06] KVKK otomatik veri imhası yok (mesaj/geri-bildirim süresiz kalıyor)**
Ne: Sistem günlükleri (SystemLog) 90 günde otomatik siliniyor ama kullanıcı mesajları (Message) ve geri-bildirim kayıtları (FeedbackLog) süresiz saklanıyor. KVKK saklama-süresi ilkesi tam uygulanmıyor.
Neden başlanmıştı: NİYET: KVKK Md.7 saklama süresi sınırı.
Nerede durdu: Temizleme cron'u yalnız SystemLog'u kapsıyor; diğer tablolar için imha politikası yazılmadı.
Bugünkü durum: ⬜ AÇIK
Etkisi: PII (mesaj içeriği vb.) süresiz birikir; gereğinden uzun saklama KVKK ihlali.
İş boyu: M
Kaynak: karar-defteri (md.81) · Numara: md.81

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-07] Rıza SÜRÜMÜ tutulmuyor → ispat açığı**
Ne: Kullanıcının rıza verdiği ANIN tarihi (`kvkkConsentAt`) tutuluyor ama HANGİ metin sürümüne rıza verdiği (`consentVersion`/`policyVersion`) tutulmuyor. Metin ileride değişirse kişinin neye onay verdiği kanıtlanamaz.
Neden başlanmıştı: NİYET: rıza ispatı (hangi sürüme onay verildi).
Nerede durdu: Yalnız `kvkkConsentAt` yazılmış; sürüm alanı hiç eklenmemiş.
Bugünkü durum: ⬜ AÇIK
Etkisi: Denetimde "kişi neye rıza gösterdi" ispatlanamaz; metin güncellenirse tüm eski rızalar belirsizleşir.
İş boyu: M
Kaynak: karar-defteri (md.82) · Numara: md.82
⚠️ bilanço doğrulandı: `consentVersion`/`policyVersion` hem backend hem frontend hem schema.prisma'da geniş arandı → yalnız belgelerde geçiyor, kodda YOK.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: 🔴 ÇIKIŞ BLOKERİ — çıkış öncesi tamamlanmalı.
---

**[G1-08] OAuth açık rıza UI'da alınmıyor + KVKK ve 18+ tek kutuda**
Ne: Google vb. ile girişte kullanıcıdan açık rıza arayüzde ayrıca alınmıyor (kod dolaylı/implicit set ediyor). Ayrıca kayıt formunda KVKK onayı ile 18+ beyanı tek onay kutusunda birleştirilmiş — hukuken ayrı ayrı alınması gerekebilir.
Neden başlanmıştı: NİYET: geçerli açık rıza (her onay ayrık ve bilinçli olsun).
Nerede durdu: OAuth akışında rıza implicit; kayıt formunda tek kutu. Hukukçu görüşü bekliyor.
Bugünkü durum: ⬜ AÇIK
Etkisi: Rıza "açık ve ayrık" olma şartını karşılamayabilir → KVKK geçerlilik riski.
İş boyu: M
Kaynak: karar-defteri (md.83) · Numara: md.83

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-09] `destek@` adresi tanımsız + hak-kullanım ekranı yok**
Ne: KVKK başvuruları için bir destek e-postası (`destek@...`) yapılandırmada tanımlı değil (yer tutucu `admin@platform.local` duruyor). Kullanıcının haklarını kullanacağı ekran da yok.
Neden başlanmıştı: NİYET: kişi KVKK haklarını başvurabileceği bir kanala ulaşsın.
Nerede durdu: Ürün sahibi gerçek `destek@` adresini kurup prod ortam değişkenine bağlayınca açılacak; ekran tarafı da yapılmadı.
Bugünkü durum: ⬜ AÇIK
Etkisi: KVKK başvurusu için geçerli iletişim kanalı yok; aydınlatma metnindeki adres yer tutucu.
İş boyu: S (env) + M (ekran)
Kaynak: karar-defteri (md.84) · Numara: md.84
⚠️ bilanço doğrulandı: `config.ts:31` `PLATFORM_ADMIN_EMAIL ?? 'admin@platform.local'` yer-tutucu; kodda gerçek `destek@` tanımı yok (teyit).
⚠️ ilişkili: [G5] Kurum onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL` (aynı env'e bağlı).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: 🔴 ÇIKIŞ BLOKERİ — çıkış öncesi tamamlanmalı.
---

**[G1-10] Aydınlatma metninde eksik veri kategorileri**
Ne: KVKK aydınlatma metni bazı toplanan veri türlerini (mesajlaşma içeriği, sosyal medya linkleri, OCEAN kişilik, SJT senaryo yanıtları, telefon) saymıyor. Metin toplanan veriyle tam örtüşmüyor.
Neden başlanmıştı: NİYET: aydınlatma yükümlülüğü (toplanan her veri türü metinde açıkça sayılmalı).
Nerede durdu: DURUŞ SEBEBİ YOK; hukukçu görüşü bekliyor.
Bugünkü durum: ⬜ AÇIK
Etkisi: Aydınlatma eksik → KVKK Md.10 ihlali riski.
İş boyu: S
Kaynak: karar-defteri (md.85) · Numara: md.85

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: 🔴 ÇIKIŞ BLOKERİ — G1-13 (kulüp-tipi kurum aktif) ile TEK MADDE: aktif-etme + aydınlatma metnine AÇIK BEYAN birlikte yapılır; biri unutulursa hukuki açık kalır.
---

**[G1-11] DISC için ayrı açık rıza (hassas veri)**
Ne: DISC kişilik verisi "hassas veri" sayılabilir; şu an kayıtta tek genel rıza alınıyor. DISC için ayrı ve açık bir rıza istenip istenmeyeceği kararı.
Neden başlanmıştı: NİYET: hassas veriye ayrı açık rıza (register'daki tek rıza yetersiz olabilir).
Nerede durdu: Bilinçli erteleme (v2); hukukçu görüşüne bağlı.
Bugünkü durum: 🔵 bilinçli erteleme
Etkisi: DISC hassas veri sayılırsa ayrı rıza olmadan işlenmesi KVKK açığı olabilir.
İş boyu: M
Kaynak: karar-defteri (md.25(v2)/83) · Numara: md.25(v2)/83
⚠️ ilişkili: [G1-08] OAuth/tek-kutu rıza (aynı rıza tasarımı).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-12] Veri İşleyen Sözleşmesi entegrasyonu (kurum yasal alanı)**
Ne: Her kurumla (tenant) yapılacak "veri işleyen sözleşmesi" için gereken yasal alan/akış. Migration ve hukukçu görüşü gerektiriyor.
Neden başlanmıştı: NİYET: kurumlarla KVKK-uyumlu veri işleyen ilişkisini yasal zemine oturtmak.
Nerede durdu: Migration + hukukçu sonrası; kısmen başlanmış.
Bugünkü durum: 🟡 YARIM
Etkisi: Sözleşme altyapısı yoksa kurumlarla veri işleme ilişkisi belgesiz kalır (KVKK sorumluluk zinciri).
İş boyu: M
Kaynak: karar-defteri (md.90) · Numara: md.90

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-13] Kulüp-tipi kurum aktif edilmiyor (avukat kısıtı)**
Ne: "Kulüp" tipindeki kurumlar hukuki bir kısıt nedeniyle canlıda aktif edilmemeli. Bu bir hukuki karar/kısıt olarak kayda geçmiş.
Neden başlanmıştı: NİYET: hukuki kısıt (avukat önerisi, canlı-öncesi uyulmalı).
Nerede durdu: Hukuki kısıt olarak beklemede.
Bugünkü durum: ⬜ AÇIK
Etkisi: Kulüp-tipi kurum yanlışlıkla aktif edilirse hukuki risk doğar.
İş boyu: S
Kaynak: karar-defteri (md.91) · Numara: md.91

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: 🔴 ÇIKIŞ BLOKERİ. Kulüp-tipi kurum AKTİF EDİLSİN. ŞART: kulüp başkanının imza yetkisi olmadığı için hukuki koruma aydınlatma metnindeki AÇIK BEYANDIR (avukat görüşü). İki iş birbirine bağlı — biri yapılıp diğeri unutulursa açık kalır. G1-10 ile TEK MADDE olarak izlenir.
---

**[G1-14] Kalibrasyon denetim yazımı "ateşle-unut" (iz kaybolabilir)**
Ne: Ağırlık kalibrasyonunda "son değişikliği kim yaptı" denetim kaydı yazımı `void` (fire-and-forget) çağrılıyor; yazım başarısız olursa kimse fark etmez ve iz kaybolur.
Neden başlanmıştı: NİYET: kalibrasyon değişikliğinin denetlenebilir iz bırakması.
Nerede durdu: Yazım hataya dayanıklı değil; denetim önerisi açık.
Bugünkü durum: ❓ TEYİT GEREK
Etkisi: Denetim kaydı sessizce düşerse "kim değiştirdi" bilgisi kaybolur (hesap verebilirlik açığı).
İş boyu: S
Kaynak: karar-defteri (md.98) · Numara: md.98

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-15] SystemLog 90 gün temizliği "son değişiklik" izini 3 ayda yok ediyor**
Ne: Denetim kayıtları SystemLog'da tutuluyor ve 90 günde otomatik siliniyor. Kalibrasyon "son değişiklik" izi de burada olduğu için 3 ay sonra kayboluyor.
Neden başlanmıştı: NİYET: uzun-dönem denetim izinin korunması (imha politikasıyla çatışıyor).
Nerede durdu: DURUŞ SEBEBİ YOK; iz-koruma ile 90g imha arasındaki gerilim çözülmemiş.
Bugünkü durum: ⬜ AÇIK
Etkisi: 3 aydan eski değişikliklerin "kim/ne zaman" izi kaybolur; geriye dönük denetim yapılamaz.
İş boyu: S
Kaynak: karar-defteri (md.99) · Numara: md.99
⚠️ ilişkili: [G1-14] kalibrasyon audit yazımı (aynı iz).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-16] Eski kayıtlar için rıza geriye-doldurma (backfill) politikası yok**
Ne: Rıza mekanizması eklenmeden önce oluşmuş kullanıcı kayıtları için rızanın nasıl geriye doldurulacağına dair bir politika/kod yok.
Neden başlanmıştı: NİYET: eski kayıtların da rıza durumunun netleşmesi.
Nerede durdu: Backfill kodu yok; ürün sahibi kararıyla EN SON'a ertelenmiş.
Bugünkü durum: ⬜ AÇIK
Etkisi: Eski kullanıcıların rıza durumu belirsiz; denetimde "rızası var mı" sorusuna cevap yok.
İş boyu: M
Kaynak: karar-defteri (K3) · Numara: K3

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-17] Yönetici sayfalarına sunucu-tarafı (server-side) koruma yok**
Ne: Yönetici arayüzü sayfaları için sunucu-tarafı yönlendirme/koruma dosyası (`frontend/src/middleware.ts`) yok. API zaten backend'de korumalı, ama arayüz katmanında savunma-derinliği eksik.
Neden başlanmıştı: NİYET: savunma-derinliği (frontend'te de erken kapı).
Nerede durdu: Dosya hiç oluşturulmamış; veri sızıntısı DEĞİL (API korumalı), yalnız derinlik eksik.
Bugünkü durum: ⬜ AÇIK
Etkisi: Yetkisiz kullanıcı yönetici sayfasının kabuğunu görebilir (veri gelmez); UX/algı riski, kritik değil.
İş boyu: S
Kaynak: karar-defteri (K6/md.66) · Numara: K6/md.66
⚠️ bilanço doğrulandı: `frontend/src/middleware.ts` glob ile arandı → dosya YOK.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-18] Çift-tenant kimlik teyidi (tüm okumalar Membership'ten mi?)**
Ne: Bir kullanıcı farklı kurumlarda farklı rolde olabildiği için tüm rol/sertifika okumalarının `TenantMembership`'ten (doğru kaynak) yapıldığının bütünsel teyidi. Özellikle `certified`/`qualityMultiplier` okuma kaynağı.
Neden başlanmıştı: NİYET: kurum-içi kimlik/rol tek doğru kaynaktan okunsun.
Nerede durdu: Bütünsel kod-kanıtı bu turda toplanmadı.
Bugünkü durum: ❓ TEYİT GEREK
Etkisi: Bir yer yanlış kaynaktan okursa kullanıcının kurumdaki rolü/sertifikası yanlış hesaplanabilir.
İş boyu: M
Kaynak: karar-defteri (K7) · Numara: K7
⚠️ ilişkili: [G1-19] qualityMultiplier okuma kaynağı · [G10] UserProfile.qualityMultiplier ikiz-alan DROP (D3).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-19] `qualityMultiplier` UserProfile'dan Membership'e taşındı — eski kod eski yerden okuyor olabilir**
Ne: Kalite katsayısı (`qualityMultiplier`) ve sertifika bilgisi eski `UserProfile`'dan yeni `TenantMembership`'e taşınmış; bazı eski kodun hâlâ eski yerden okuyor olma ihtimali.
Neden başlanmıştı: NİYET: kurum-bağlamlı doğru veri kaynağı (Membership).
Nerede durdu: Eski-yer okuma kalıntısı bu turda kesin taranmamış.
Bugünkü durum: ❓ TEYİT GEREK
Etkisi: Yanlış kaynaktan okunursa eşleşme skoru/sertifika durumu hatalı çıkabilir.
İş boyu: S
Kaynak: karar-defteri (K7 akrabası) · Numara: (K7 akrabası)
⚠️ bilanço büyük ölçüde doğrulandı (kısmi kod-teyit): canlı okuma kaynakları Membership → `adminController.ts:324`, `sjtScoringController.ts:112`, `certification.service.ts` hep `TenantMembership.qualityMultiplier` okuyor; `UserProfile.qualityMultiplier` okuyan CANLI kod bulunamadı (ikiz alan atıl görünüyor).
⚠️ ilişkili: [G10] UserProfile.qualityMultiplier ikiz-alan DROP (D3) — aynı ikiz alanın silinme kararı.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-20] RLS lint kuralı (`findUnique` sızıntı tuzağı)**
Ne: Prisma'nın `findUnique` çağrıları tenant filtresini atlayıp başka kurumun kaydını çekebilir. Bunu otomatik yakalayan bir lint (statik-denetim) kuralı önerilmiş.
Neden başlanmıştı: NİYET: tenant sızıntısını yazım anında yakalamak (RLS/izolasyon güvenlik ağı).
Nerede durdu: Bilinçli erteleme (v2); kural yazılmamış.
Bugünkü durum: ⬜ AÇIK (🔵 alt-tür — v2)
Etkisi: Gelecekte yazılacak filtresiz bir `findUnique` fark edilmeden tenant sızıntısı yapabilir.
İş boyu: M
Kaynak: karar-defteri (md.26(v2)) · Numara: md.26(v2)
⚠️ ilişkili: birincil RLS oto-enjeksiyon zaten yapılmış (kart-yok listesi, güvenlik-denetimi 3.1) — bu onun lint güvenlik ağı.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-21] Başlık yoksa varsayılan-tenant'a düşme (denetim "reddet" öneriyordu)**
Ne: İstek `X-Tenant-Id` başlığı taşımıyorsa kod otomatik olarak varsayılan kuruma düşüyor. Güvenlik denetimi bunu "reddet" olarak öneriyordu; JWT kapısı riski azaltıyor ama tam kapatmıyor.
Neden başlanmıştı: NİYET: eksik başlıkta güvenli davranış (belki reddetmek).
Nerede durdu: Kasıtlı mı, kabul edilebilir mi = PO/güvenlik kararı bekliyor.
Bugünkü durum: 🟡 YARIM
Etkisi: Başlıksız istek varsayılan kuruma düşerse yanlış tenant bağlamı riski (JWT kapısıyla azalır).
İş boyu: S
Kaynak: karar-defteri (güvenlik-denetimi 3.1 nüans) · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-22] k-anonimlik (süper-admin küçük grup metrik yuvarlama)**
Ne: Süper-admin agregat metrikleri görürken çok küçük gruplarda (ör. 1-2 kişi) sayı bir kişiyi teşhis edebilir. Küçük grupları yuvarlayarak gizleme (k-anonimlik) uygulanmıyor.
Neden başlanmıştı: NİYET: agregat verinin bireyi ifşa etmemesi (KVKK-agregat borcu).
Nerede durdu: Kod yok (grep boş); iz zayıf.
Bugünkü durum: ⬜ AÇIK
Etkisi: Küçük kurumda agregat metrik tek kişiyi dolaylı teşhis edebilir (KVKK dolaylı-tanımlama riski).
İş boyu: M
Kaynak: karar-defteri (güvenlik-denetimi 3.2) · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-23] Kurum logo URL'i XSS koruması yetersiz (host/MIME allowlist + CSP)**
Ne: Kurum logo adresi yalnızca "geçerli URL mü" diye kontrol ediliyor (`z.string().url()`); zararlı bir `data:svg` veya kötü host geçebilir. Host/MIME beyaz-listesi ve bu görsele uygulanan bir içerik güvenlik politikası (CSP) yok.
Neden başlanmıştı: NİYET: yüklenen logo üzerinden XSS/kötü-içerik engellensin.
Nerede durdu: DURUŞ SEBEBİ YOK; kısmi önlem var ama yetersiz.
Bugünkü durum: ❓ TEYİT GEREK
Etkisi: Kötü niyetli logo URL'i ile XSS/izleme riski (düşük-orta).
İş boyu: S
Kaynak: karar-defteri (NUMARASIZ, logoUrl XSS) · Numara: NUMARASIZ
⚠️ bilanço KISMEN düzeltildi: (1) frontend `branding/page.tsx:50 isSafeLogoUrl` VAR ama YALNIZ istemci-tarafı, sadece `protocol === 'https:'` kontrol ediyor (host/MIME allowlist değil; kullanıcı API'yi doğrudan çağırıp atlayabilir). (2) Backend logoUrl doğrulaması hâlâ çıplak `z.string().url()` (`selfServeController.ts:367`, `tenantController.ts:11,82`) — host/MIME allowlist YOK. (3) CSP `img-src 'self'` başlığı VAR ama yalnız `/uploads` statik rotasına uygulanıyor (`server.ts:74`), tenant `logoUrl` bu rotadan servis edilmiyor → logoUrl'i CSP KAPSAMIYOR. Sonuç: bilanço iddiası ("z.string().url() yetersiz + CSP eksik") özünde DOĞRU; yalnız "hiç guard yok" değil (istemci https-guard var). ❓ korunur.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-24] OAuth erişim token'ı URL sorgusunda (Referer/log riski, düşük)**
Ne: OAuth dönüşünde erişim token'ı bir süre URL sorgu parametresinde taşınıyor; URL'ler tarayıcı geçmişi/Referer başlığı/sunucu loglarına düşebildiği için sızma riski. Token ömrü 1 saniye + FE-bellek olduğu için risk düşük.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (denetimde çıkan düşük-öncelik gözlem).
Nerede durdu: Düşük öncelik.
Bugünkü durum: ❓ TEYİT GEREK
Etkisi: Kısa ömürlü token URL'de görünse de log/Referer'a sızabilir (düşük risk).
İş boyu: S
Kaynak: karar-defteri (NUMARASIZ, OAuth accessToken) · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-25] `createMeeting` oryantasyon kilidi tenant-kapsamsız `findUnique` (düşük)**
Ne: Görüşme oluştururken oryantasyon kontrolü yapan sorgu tenant kapsamına alınmadan `findUnique` ile çalışıyor. PII/yazma yok, bu yüzden risk düşük ama izolasyon deseninin dışında.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (kod-denetimi gözlemi).
Nerede durdu: Düşük öncelik (PII/yazma yok).
Bugünkü durum: ❓ TEYİT GEREK
Etkisi: Teorik tenant-kapsam boşluğu; okuma-only olduğu için pratik risk düşük.
İş boyu: S
Kaynak: karar-defteri (NUMARASIZ, createMeeting) · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-26] Şüphe-bildirimi formunda IP-limit/CAPTCHA + KVKK şifre adımı yok (düşük)**
Ne: Herkese açık şüphe/ihbar formunda IP bazlı hız sınırı veya CAPTCHA (spam/kötüye kullanım koruması) yok; ayrıca hassas işlemde ek şifre-doğrulama (step-up) yok.
Neden başlanmıştı: NİYET: public formun kötüye kullanımını engellemek.
Nerede durdu: DURUŞ SEBEBİ YOK (düşük öncelik).
Bugünkü durum: ⬜ AÇIK
Etkisi: Public ihbar formu spam/otomatik kötüye kullanıma açık (düşük-orta).
İş boyu: S
Kaynak: karar-defteri (NUMARASIZ, suspicion-report) · Numara: NUMARASIZ
⚠️ ilişkili: [G1-04] SuspicionReport tenantId (aynı model).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-27] Prod yönetici anahtarı güçlü ama rotasyon opsiyonel**
Ne: Üretimdeki yönetici anahtarı 64-haneli güçlü bir değer; düzenli değiştirme (rotasyon) opsiyonel olarak not edilmiş.
Neden başlanmıştı: NİYET: güçlü kimlik + periyodik rotasyon (güvenlik hijyeni).
Nerede durdu: Rotasyon opsiyonel bırakılmış.
Bugünkü durum: ⬜ AÇIK
Etkisi: Rotasyon yapılmazsa uzun ömürlü anahtar riski (düşük — anahtar güçlü).
İş boyu: S
Kaynak: karar-defteri (NUMARASIZ, prod admin-key) · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-28] Sunucu/altyapı sertleştirme hiç ele alınmadı (canlı-öncesi ZORUNLU)**
Ne: Sunucu ve altyapı sertleştirme (Dokploy HTTP güvenliği, güvenlik duvarı, SSH, SSL, yedekleme) hiç ele alınmamış. Kod dışı bir altyapı işi ama canlıya çıkış öncesi zorunlu.
Neden başlanmıştı: NİYET: canlı ortam güvenliği (temel altyapı sertleştirme).
Nerede durdu: Kod dışı; aksiyon-numarası yok, hiç başlanmamış.
Bugünkü durum: ⬜ AÇIK (🔵 alt-tür — canlı-öncesi manuel)
Etkisi: Sertleştirme yapılmadan canlıya çıkış → sunucu ele geçirme/veri sızıntısı riski (yüksek, canlı-öncesi kritik).
İş boyu: L
Kaynak: karar-defteri (04:54-57 / A6 canlı-öncesi) · Numara: NUMARASIZ

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: 🔴 ÇIKIŞ BLOKERİ — çıkış öncesi tamamlanmalı.
---

**[G1-29] Kurum (tenant) kalıcı silme yok — yalnız dondurma (KVKK Md.7)**
Ne: Bir kurum kalıcı silinemiyor, yalnız donduruluyor (freeze). KVKK Md.7 gereği kurum verisinin kalıcı silinebilmesi (hard-delete) gerekiyor. Kullanıcı anonimleştirme yapıldı ama KURUM ayrı bir konu.
Neden başlanmıştı: NİYET: KVKK Md.7 — kurum verisinin de silinebilmesi.
Nerede durdu: `platformRoutes.ts` freeze var, DELETE yok; geri-alınamaz olduğu için PO kararı bekliyor.
Bugünkü durum: ⬜ AÇIK
Etkisi: Kurum "unutulma hakkını" kullanamaz; kurum verisi süresiz kalır (KVKK açığı).
İş boyu: M
Kaynak: karar-defteri (md.16(v2)/F3) · Numara: md.16(v2)/F3

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G1-30] Çerez-izni bandı (Consent Mode v2) — analitik ön-koşulu**
Ne: Sitede çerez izni bandı (Consent Mode v2) yok. Google Analytics/izleme açılmadan önce yasal ön-koşul; en yüksek numaralı madde (67).
Neden başlanmıştı: NİYET: analitik açmadan önce çerez rızası (yasal ön-koşul).
Nerede durdu: DURUŞ SEBEBİ YOK; analitik işine bağlı.
Bugünkü durum: ⬜ AÇIK
Etkisi: Çerez izni olmadan analitik açılırsa KVKK/e-Privacy ihlali; analitik işi bunsuz başlayamaz.
İş boyu: M
Kaynak: karar-defteri (md.67) · Numara: md.67
⚠️ ilişkili: [G7] GTM+GA4+Clarity analitik entegrasyonu (bu bandın tükettiği ön-koşul).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Çıkışta analytics OLMAYACAK (PO kararı). #110 kilitli kalır, çerez bandı onunla gelir.
---

## Bu grupta zaten yapılmışlar (kart yok)

Aşağıdakiler ✅ YAPILDI durumunda — karar gerektirmez, kayıt için listelenir:

1. DISC güvenlik: menti mentörün DISC yüzdesini/ham-vektörünü görmez — md.1 / KARAR 5
2. OAuth `kvkkConsentAt` set ediliyor (kod tam) — md.2 / K2
3. 18+ öz-beyan KVKK metnine gömülü (metin var) — md.3 / K4
4. Sunucu konumu beyanı (kvkk sayfası §8) — md.4 / K5
5. `updateUser` password+PII sızıntısı fix — md.38 (G1)
6. hardDelete FK ihlali → anonymize'e yönlendirildi (KVKK silme çalışır) — md.39 (G2)/96
7. Tam anonimleştirme + hardDelete→anonymize (dürüst metin + token iptali) — md.93+39 (96)
8. `SuspicionReport` reporter PII maske — md.68 (G3)
9. `getPlatformLogs` select + `listUserReports` maske — md.80
10. `getPlatformStats` recentLogs meta çıkarıldı — md.88
11. `listPendingTenants` admin PII maske — md.89 / 94-doğuran
12. Sunucu ülkesi Londra/BK doğrulandı (İrlanda hataydı) — md.92 (Ç6)
13. Kalibrasyon 'son değişiklik' aktör izi (getLastWeightChange) — md.95
14. Tenant izolasyon 5-katman + X-Tenant JWT çapraz-reddi + RLS oto-enjeksiyon (P0) — güvenlik-denetimi 3.1
15. Eşleştirme deadlock: boş havuz kademeli fallback (P0) — güvenlik-denetimi 2.1
16. DISC/SJT matematik sıfıra-bölme/NaN guard (P1) — güvenlik-denetimi 2.2
17. Settings clamp + blockedPairs Zod/Json-guard (P1) — güvenlik-denetimi 1.1/4
18. Super-admin gizlilik sınırı (agregat-only DTO whitelist) — madde 80 / güvenlik-denetimi 3.2
19. Resend key rotasyonu (açığa çıkan eski key silindi) — NUMARASIZ (tarihsel)
