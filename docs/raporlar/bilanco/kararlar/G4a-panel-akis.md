# BİLANÇO KARAR DOSYASI — G4a: STK-admin + Platform paneli (+ panel mekaniği)

**📸 DONDURULMUŞ** · 2026-08-27 · Kaynak: `00-SAYIM-2026-08-27.md` (c/G4) + `karar-defteri-2026-08-26.md` (GRUP 3/4)

> **Ne bu:** G4 grubu (Panel & akış) ikiye bölündü. **Bu dosya = G4a** (STK-admin paneli + Platform paneli + panel mekaniği). Retention/persona/sevdirme + mentör-menti akış kartları **G4b-panel-akis.md**'de. Her kalem tek karar kartı; PO tek tek işaretler. Salt-okuma + kod-teyit yapıldı; kod/DB/PR değiştirilmedi.

---

## MUTABAKAT (dosya başı)

- **Tur-5a beyanı G4 toplam:** 59 (ana tablo dağılımı: ✅20 · 🟡9 · ⬜22 · ❓5 · 🔵3 · 🗑️0).
- **Bu bölünme:** G4a = 40 kalem · G4b = 19 kalem → **40 + 19 = 59 ✓** (beyan TUTTU).
- **Bu dosyada (G4a) 40 kalem:**
  - Kart yazılan (🟡/⬜/❓/🔵): **21**
  - ✅ kart-YOK (dosya sonu listede): **19**
  - 21 + 19 = 40 ✓
- **G4a durum dağılımı:** ✅ 19 · 🟡 4 · ⬜ 10 · ❓ 4 · 🔵 3 · 🗑️ 0 (= 40)
- **G4b'ye kalan (mutabakat):** ✅1 · 🟡5 · ⬜12 · ❓1 = 19. (G4 toplamı çapraz-doğrulama: ✅ 19+1=20 ✓; 🟡 4+5=9 ✓; ⬜ 10+12=22 ✓; ❓ 4+1=5 ✓; 🔵 3+0=3 ✓ → beyan ✅20·🟡9·⬜22·❓5·🔵3 ile BİREBİR.)
- **PO okuma süresi (bu dosya):** ~21 kart × ~1.25 dk ≈ **26 dk**.
- **Kod-teyidi:** bu dosyadaki absans/durum iddiaları grep'lendi — 0 çürüme, aşağıda kod-teyit satırlarında.

**DURUM kodları:** ✅ YAPILDI · 🟡 YARIM · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ · 🔵 bilinçli erteleme

---

## KARTLAR — STK-admin paneli

---
**[G4-01] Havuz KART görünümü (rol-bazlı görünürlük)**
Ne: Mentör/menti havuzunu kart olarak göster; kim ne görecek role göre değişsin — yönetici DISC+durumu, mentör kendi mentisinin DISC+skorunu, menti ise mentörün YALNIZ uyum skorunu (ham DISC'i değil) görür.
Neden başlanmıştı: Rol-bazlı gizlilik (menti mentörün DISC'ini görmemeli) + havuzu tarayışı kolaylaştırma.
Nerede durdu: Backend ~%90 hazır (select'ler rol-ayrımlı); FE kart tasarımı yapılmadı.
Bugünkü durum: ⬜
Etkisi: Havuz kullanımı ve gizlilik sözleşmesi bu karta bağlı.
İş boyu: M
Kaynak: karar-defteri GRUP-3 · Numara: md.31-akraba/KARAR 2

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Faz 5. Yeni görünürlük kurallarıyla birleşiyor: karşılıklı tercihler kartta GÖRÜNÜR, ihtiyaç beyanı GÖRÜNMEZ; mentör eşleşme kurulduktan SONRA mentinin ne aradığını görür. Bkz. tasarım belgesi B10.3.
---
**[G4-02] "Neden uyumlu" Katman 1 (menti tarafı metin)**
Ne: Bir eşleşmenin neden uyumlu olduğunu anlatan zengin ama ham-DISC ifşa etmeyen metin. Mentör→menti yönünde FE'de render ediliyor; menti→mentör yönünde Katman-1 metin alanı FE'de yok.
Neden başlanmıştı: Eşleşmeye güven + şeffaflık, DISC'i açık etmeden.
Nerede durdu: Bir yön (mentör→menti) bağlandı; menti tarafı FE eksik.
Bugünkü durum: ⬜ (kısmen ✅)
Etkisi: Menti eşleşmesine güveni artırır.
İş boyu: S
Kaynak: karar-defteri GRUP-3 · Numara: KARAR 7
⚠️ ilişkili: [G4-21] (Katman-2 zengin gerekçe, ertelenmiş)

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-03] Manuel eşleştirme (sıfırdan çift oluşturma)**
Ne: Yöneticinin algoritmadan bağımsız, elle iki kişiyi eşleştirebilmesi. Envanter belgesi "eksik özellik" diyor, strateji belgesi "YASAK (algoritmik olmalı)" diyor — belgeler çelişiyor. Kodda manuel-pair endpoint YOK (yalnız algoritmik).
Neden başlanmıştı: NİYET BELGELENMEMİŞ (çelişkili — bir belge istiyor, biri yasaklıyor).
Nerede durdu: Karar verilmedi; hakem olunmadı.
Bugünkü durum: ❓
Etkisi: Yönetici kontrolü ↔ algoritma bütünlüğü dengesi.
İş boyu: M
Kaynak: karar-defteri GRUP-3 · Numara: md.76 (T8)/Ç5
⚠️ bilanço yanılmış değil: kod-teyit → manuel-pair/createPair endpoint 0 dosya, "algoritmik-only" doğru.

[ ] işleme al   [ ] şimdilik alma   [x] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Manuel eşleştirme YOK. Algoritma seçenek sunar, mentör ve menti kendi tercihleriyle görüşme kurar. Strateji belgesi geçerli, envanter 'eksik' kaydı YANLIŞ.
---
**[G4-04] Yöneticilik-verme akışı yeniden kurgu + "tüm onaylı liste"**
Ne: Bir üyeye admin yetkisi verme akışı. Şu an `promote-admin` (max 3) var; ama "tüm onaylı üyeleri listeleyip seç" ekranı eksik ve akışın yeniden kurgulanması sözü verilmiş.
Neden başlanmıştı: Yönetici atamayı sınırlı/net yapmak (max 3 kuralı).
Nerede durdu: Promote var; tam-liste ekranı ve yeniden-kurgu bekliyor (PO'ya sorulacaktı).
Bugünkü durum: 🟡
Etkisi: Çoklu-yönetici yönetimi kolaylaşır.
İş boyu: S
Kaynak: karar-defteri GRUP-3 · Numara: md.A9
⚠️ bilanço yanılmış değil: kod-teyit → `admin/managers/page.tsx` promote VAR (doğrulandı).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-05] adminSettings zayıf/izole desen**
Ne: adminSettings controller'ında tenant izolasyonu controller içinde elle (manuel `tenantId`) yapılıyor; diğer yerlerdeki merkezi desenden farklı/zayıf. İzole bir denetim önerisi var.
Neden başlanmıştı: Kod tutarlılığı + tenant-izolasyon güvenliği.
Nerede durdu: DURUŞ SEBEBİ YOK (denetim önerisi olarak asılı).
Bugünkü durum: ⬜
Etkisi: Tutarsız izolasyon deseni ileride sızıntı riski taşıyabilir.
İş boyu: S
Kaynak: karar-defteri GRUP-3 · Numara: NUMARASIZ

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-06] KARAR 1 "çok yakın=BÜYÜK harf" sayısal eşik kalibrasyonu**
Ne: DISC çoklu-harf gösteriminde (örn "DI") iki boyut "çok yakın" sayıldığında ikincisi de büyük harfle gösteriliyor; bu "çok yakın" eşiğinin kesin sayısal değeri kalibre edilmeli.
Neden başlanmıştı: Çoklu-harf gösterim doğruluğu.
Nerede durdu: Eşik kodda var ama ölçeğe bağlı; kesin değer PO/kalibrasyon bekliyor.
Bugünkü durum: ❓
Etkisi: Yanlış eşik = yanıltıcı ikincil-harf gösterimi.
İş boyu: S
Kaynak: karar-defteri GRUP-3 · Numara: (md.12 alt)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-07] Sektör kolonu havuzda "—" (veri boş)**
Ne: Havuz tablosunda sektör kolonu backend'de select ediliyor ama veri boş olduğundan "—" görünüyor — bir veri-girişi boşluğu, kod eksiği değil.
Neden başlanmıştı: Sektör bilgisini havuzda göstermek.
Nerede durdu: Bilinçli olarak canlı-sonrasına ertelendi (veri girişi gerekiyor).
Bugünkü durum: 🔵
Etkisi: Sektör bazlı tarama şimdilik boş.
İş boyu: S
Kaynak: karar-defteri GRUP-3 · Numara: B3/md.21(v2)/KARAR 10

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## KARTLAR — Platform paneli

---
**[G4-08] Platform tek-kullanıcı profil drill-down endpoint yok**
Ne: Platform admin bir kurumun üye listesini görebiliyor ama tek bir kişinin profiline inen `/tenants/:id/users/:userId` endpoint'i yok; `MembersTable` satırı tıklanamıyor.
Neden başlanmıştı: Platform seviyesinde kişi-bazlı inceleme.
Nerede durdu: DURUŞ SEBEBİ YOK.
Bugünkü durum: ⬜ (🟡)
Etkisi: Platform admini sorunlu kişiye tek-tık inemez.
İş boyu: S
Kaynak: karar-defteri GRUP-4 · Numara: md.77 (T9)
⚠️ bilanço yanılmış değil: kod-teyit → `/tenants/:id/users/:userId` route 0 dosya (doğrulandı).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-09] Mükerrer platform API konsolidasyonu**
Ne: super-admin router mount edilmiş ama FE'de 0 kullanım; `/platform/*` API'leri onun yerini almış. İki paralel platform API yolu var — konsolidasyon/temizlik kararı bekliyor.
Neden başlanmıştı: Eski super-admin router ile yeni /platform yolu çakışması.
Nerede durdu: Karar yok (PO). Silinip silinmeyeceği belirsiz.
Bugünkü durum: ❓
Etkisi: Ölü/mükerrer API yüzeyi bakım borcu ve karışıklık.
İş boyu: S
Kaynak: karar-defteri GRUP-4 · Numara: md.74 (T6)/A1

[ ] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: ❓ ÖNCE KEŞİF: eski super-admin kapısında yeni /platform kapısında OLMAYAN bir yetenek var mı? Varsa taşınır, sonra kapatılır. Keşif olmadan silme YOK.
---
**[G4-10] setVisibilityOptIn Taraf-1 (super-admin) sil/bağla/ertele**
Ne: super-admin tarafındaki `setVisibilityOptIn` yeteneği kasıtlı korunmuş, davranışsal testli. Silinecek mi, bağlanacak mı, ertelenecek mi kararı bekliyor.
Neden başlanmıştı: Görünürlük opt-in yönetimi (PLG özelliği).
Nerede durdu: Karar yok (PO).
Bugünkü durum: ❓
Etkisi: Bağlanmamış ama korunan yüzey — karar netleşmeli.
İş boyu: S
Kaynak: karar-defteri GRUP-4 · Numara: md.86/A20

[ ] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: ❓ ÖNCE KEŞİF: eski super-admin kapısında yeni /platform kapısında OLMAYAN bir yetenek var mı? Varsa taşınır, sonra kapatılır. Keşif olmadan silme YOK. (⚠️ PO'nun ⏸️-listesinde de görünüyordu; keşif kararı esas alındı.) · ⚠️ GÜNCELLEME (2026-08-28): PO teyit etti — keşif kararı DOĞRU (çift-atama çözümü onaylandı); G4-09 ile birlikte keşif turu.
---
**[G4-11] Otomatik anomali/kötüye-kullanım tespiti (v2 derinleştirme)**
Ne: `abuseDetection.service.ts` v1 basit haliyle var; v2 derinleştirme ve alarm-banner yarım.
Neden başlanmıştı: Platform sağlığı + kötüye kullanım koruması.
Nerede durdu: v1 çalışıyor; v2/banner yarım kaldı.
Bugünkü durum: 🟡
Etkisi: Basit anomaliler yakalanıyor, derin/görsel alarm eksik.
İş boyu: M
Kaynak: karar-defteri GRUP-4 · Numara: NUMARASIZ
⚠️ bilanço yanılmış değil: kod-teyit → `abuseDetection.service.ts` VAR (doğrulandı).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Kullanıcı ~sıfırken kötüye kullanım da yok. v1 basit hali yeterli.
---
**[G4-12] Platform büyüme trendi + platform-geneli aktiflik**
Ne: Platform istatistikleri anlık sayı gösteriyor ama tarih-filtresi/zaman-serisi yok; büyüme ivmesi ve platform-geneli lastLoginAt aktiflik oranı yok.
Neden başlanmıştı: Platform sahibinin büyüme/ivme görebilmesi.
Nerede durdu: Anlık sayı var; trend katmanı yok.
Bugünkü durum: ⬜
Etkisi: Platform büyüyor mu duruyor mu tek bakışta görülmez.
İş boyu: M
Kaynak: karar-defteri GRUP-4 · Numara: Y7
⚠️ bilanço yanılmış değil: kod-teyit → `getPlatformStats` platformController'da VAR, tarih-filtresi yok (doğrulandı).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Ölçülecek büyüme henüz yok; anlık sayı yeterli.
---
**[G4-13] Platform seviyesi ayarlar UI yok (config env-sabit)**
Ne: Platform-seviyesi ayarlar env değişkenlerinde sabit; bunları düzenleyecek bir UI yok.
Neden başlanmıştı: Platform sahibinin ayarları koda dokunmadan değiştirmesi.
Nerede durdu: Düşük öncelik (platform = PO'nun kendisi).
Bugünkü durum: ⬜ (🔴)
Etkisi: Ayar değişikliği kod/deploy gerektirir.
İş boyu: M
Kaynak: karar-defteri GRUP-4 · Numara: Y7

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-14] Sistem sağlığı mail-göstergesi (gerçek probe değil)**
Ne: `getPlatformHealth` sistem sağlığı kartı env-config'e bakıyor; mail servisine gerçek probe atmıyor (yalnız yapılandırma var mı diye bakar).
Neden başlanmıştı: Mail sisteminin ayakta olup olmadığını görmek.
Nerede durdu: DURUŞ SEBEBİ YOK.
Bugünkü durum: 🟡
Etkisi: "Sağlıklı" göstergesi yanıltıcı olabilir (config var ≠ mail çalışıyor).
İş boyu: S
Kaynak: karar-defteri GRUP-4 · Numara: NUMARASIZ

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-15] `reviewedBy='platform-admin'` sabit metin → gerçek kimlik**
Ne: İnceleme kayıtlarında `reviewedBy` alanı sabit "platform-admin" metniyle yazılıyor; çoklu platform-admin olduğunda kimin incelediği kaybolur.
Neden başlanmıştı: Tek-admin varsayımı (o zaman yeterliydi).
Nerede durdu: Tek-admin varsayımı asılı; çoklu-admin gelince açık.
Bugünkü durum: ⬜
Etkisi: Denetim izinde gerçek aktör kaybı (çoklu-admin senaryosu).
İş boyu: S
Kaynak: karar-defteri GRUP-4 · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-16] user-reports listesi 200-tavan, sayfalama yok**
Ne: Kullanıcı şikâyet raporları listesi 200 kayıt tavanıyla dönüyor, sayfalama yok.
Neden başlanmıştı: (Genel N+1/pagination borcuna girebilir.)
Nerede durdu: DURUŞ SEBEBİ YOK.
Bugünkü durum: ⬜
Etkisi: 200'den fazla rapor olunca eskiler görünmez.
İş boyu: S
Kaynak: karar-defteri GRUP-4 · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-17] `PLATFORM_ADMIN_EMAIL` `.env.example`'da yok**
Ne: `PLATFORM_ADMIN_EMAIL` env değişkeni `.env.example`'da tanımlı değil → prod'da tanımsız kalıp varsayılana düşme riski.
Neden başlanmıştı: Config eksikliği/dokümantasyon.
Nerede durdu: Config eksik olarak asılı.
Bugünkü durum: ⬜
Etkisi: Prod'da yanlış/boş admin mail adresi riski.
İş boyu: S
Kaynak: karar-defteri GRUP-4 · Numara: NUMARASIZ

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## KARTLAR — Panel mekaniği / erişim

---
**[G4-18] Fotoğraf ZORUNLU kılma kararı**
Ne: Fotoğraf yükleme altyapısı hazır (backend ✅); fotoğrafı ZORUNLU kılıp kılmama ve ne zaman zorunlu olacağı kararı belirsiz.
Neden başlanmıştı: Havuzda kişilerin tanınabilir olması (eşleşme güveni).
Nerede durdu: PO kararı bekliyor (zorunluluk tarihi belirsiz).
Bugünkü durum: 🟡
Etkisi: Fotoğrafsız profiller havuz deneyimini zayıflatır.
İş boyu: S
Kaynak: karar-defteri GRUP-3 · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Fotoğraf şimdilik OPSİYONEL. Yükleme ve kartta gösterim zaten çalışıyor. Zorunluluk kararı sonraya.
---
**[G4-19] Premium "kilitli görünür" + `Tenant.plan/limits` (freemium)**
Ne: Freemium modeli için `Tenant.plan` şema alanı var (FREE/PRO/ENTERPRISE) ama plan-bazlı kısıtlama/kilitleme uygulama mantığı yok.
Neden başlanmıştı: İleride gelir modeli (freemium) altyapısı.
Nerede durdu: Şema var, uygulama-mantığı yazılmadı.
Bugünkü durum: ⬜ (❓)
Etkisi: İş modeli/gelir kararına bağlı; şu an kilitlenen bir şey yok.
İş boyu: L
Kaynak: karar-defteri GRUP-9 (v2-backlog) · Numara: E13/E24
⚠️ bilanço yanılmış değil: kod-teyit → `schema.prisma:162 plan @default("FREE")` VAR, limit-mantığı yok (doğrulandı).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## KARTLAR — bilinçli erteleme (🔵)

---
**[G4-20] Hayalet mod (pasif hesap) + toplu CSV davet**
Ne: Yöneticinin CSV ile toplu üye davet etmesi ve bu hesapların "pasif/hayalet" olarak önce oluşturulup sonra aktifleşmesi. Bilinçli olarak ayrı büyük bir tura (migration içerir) ertelenmiş.
Neden başlanmıştı: Toplu onboarding + üye davet kolaylığı.
Nerede durdu: Migration + büyük tur gerektirdiği için bilinçli ertelendi.
Bugünkü durum: 🔵
Etkisi: Toplu davet olmadan üye eklemek tek tek.
İş boyu: L
Kaynak: karar-defteri GRUP-9 (v2-backlog) · Numara: md.17/F6

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-21] "Neden uyumlu" Katman-2 (zengin gerekçe)**
Ne: Eşleşme gerekçesinin Katman-1'in ötesinde daha zengin, ayrıntılı bir açıklama katmanı. Bilinçli olarak ertelenmiş.
Neden başlanmıştı: Eşleşmeye derin güven inşası.
Nerede durdu: Bilinçli erteleme (v2).
Bugünkü durum: 🔵
Etkisi: Şimdilik Katman-1 metniyle yetiniliyor.
İş boyu: M
Kaynak: karar-defteri GRUP-9 (v2-backlog) · Numara: md.19/KARAR 8
⚠️ ilişkili: [G4-02] (Katman-1 menti tarafı FE eksik)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## Bu grupta zaten yapılmışlar (✅ — kart YOK)

> HAYALET-TAMAM: belgede "eksik/yok" sanılan ama kodda TAM çıkan kalemler (platform drill-down, KPI drill-down, nudge, lastLoginAt, sertifika rozeti vb.). Kart almazlar.

- ✅ Sol menü 4-grup (Günlük/İnsanlar/Program&İçerik/Ayarlar) — `(admin)/layout.tsx NAV_GROUPS` [md.8/KARAR 1]
- ✅ Durum rozeti (Onaylı/Bekliyor/Pasif, yalnız yönetici, otomatik) — `mentor-havuzu/page.tsx APPROVAL_META` [md.10/KARAR 3]
- ✅ Sertifika rozeti kişi-geneli ("✓ Sertifikalı", herkes görür) [md.11/KARAR 4]
- ✅ DISC çoklu harf "DI" (baskın+ikincil, yüzde yok; midline+istisna) — `discLetters.ts` [md.12/KARAR 11]
- ✅ Admin soru düzenleme UI (tenant-scoped IDOR) — `questions/page.tsx` [md.32]
- ✅ Öğrenme-yolculuğu tamamlanma görünürlüğü (STK admin) — `adminController.ts` [md.34]
- ✅ Kurum "DÜZELTME İSTE" akışı (CORRECTION_REQUESTED, migration canlıda) [md.37]
- ✅ Pasif/takılan üyeye elle nudge/hatırlatma — `POST /users/:id/nudge` (HAYALET-TAMAM) [NUMARASIZ]
- ✅ Şifre göster/gizle (login+register+reset PasswordField) [B1/md.1]
- ✅ Platform admin paneli B-kapsam (KpiCards/MembersTable/MeetingsTable/DiscSummary) + ayrı auth [NUMARASIZ]
- ✅ Platform drill-down FE (kurum→üye, 4 endpoint mask+audit) — HAYALET-TAMAM [F2]
- ✅ KPI drill-down (sayıdan kişiye, health-metrics) — HAYALET-TAMAM [F7]
- ✅ lastLoginAt/lastActiveAt User modelinde (retention temeli) — HAYALET-TAMAM [md.4-STK]
- ✅ Görüşme/mentörsüz-menti/ölü-eşleşme metrikleri (aggregate/JOIN) — HAYALET-TAMAM [NUMARASIZ]
- ✅ Hayalet-mod PENDING havuzda görünmez (PR#31 + test) [NUMARASIZ]
- ✅ Fotoğraf upload (client-side multer + magic-byte) + avatarUrl havuz select'lerinde [F1]
- ✅ Logout UI'a bağlı — `DashboardNav.tsx logout()+await` [B11]
- ✅ Zod validation hata mesajı (firstValidationMessage) [md.69/B14]
- ✅ Haftalık görüşme limiti enforce (menti başına, 7-gün UTC kova, 409) [md.79]

*(19 ✅ kalem.)*
