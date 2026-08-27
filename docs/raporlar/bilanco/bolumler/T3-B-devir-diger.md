# BELGE BİLANÇOSU — TUR 3 / GRUP B (`docs/devir/` — 6 belge, 07 hariç)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Tur 3/GRUP-B · Salt-okuma defter. Kod SALT-OKUNDU (spot-teyit), DEĞİŞTİRİLMEDİ · DB'ye DOKUNULMADI · PR/commit/belge-silme YOK.

> **Ne bu:** `docs/devir/` altındaki 6 devir belgesinin (01-06; `07-oturum-gunlugu` HARİÇ — başka ajan okuyor)
> BAŞTAN-SONA okuma-defteri. Bunlar **2026-08-11 devir seti** (📸 DONDURULMUŞ, 2026-08-14 + 2026-08-20 güncelleme
> notlarıyla tazelenmiş). Canonical eşleşmeleri: 01→`konu/07-calisma-tarzi`+`CLAUDE.md` · 02→`09-DURUM` · 03→`kvkk`/K-kodları
> · 04→`stk-admin-bulgu`/13-madde · 05→`00-KARAR-TAKIP`/bekleyen · 06→devir prosedürü.
> Çapraz-kontrol: `T1-A-canonical.md`, `T2-C-kod-denetimi.md` (aşağıda "TUR-N'de var" ile bağlandı).
> **⭐ Doğa gereği:** Bu 6 belge SENTEZ/ÖZET (kaynak: 09/10/KARAR-TAKIP + oz-denetim) → çoğu kalem T1/T2'de zaten
> numaralı/kayıtlı. Bu turun ASIL katkısı: (a) devir setinin İÇ güncelleme-notlarının (2026-08-20) hangi işi kapattığını
> göstermesi, (b) **05-C "unutulmuş niyet" listesi** — kağıt-üstü niyetlerin en zengin tek kaynağı.

---

## 0. OKUMA İLERLEME TABLOSU

| belge | toplam satır | okunan satır | tam✅/kısmi⚠️/okunmadı❌ | kalem |
|---|:---:|:---:|:---:|:---:|
| `01-felsefe-ve-calisma-tarzi.md` | 96 | 96 | ✅ TAM | 8 |
| `02-proje-durumu.md` | 79 | 79 | ✅ TAM | 12 |
| `03-kvkk-is-paketi.md` | 60 | 60 | ✅ TAM | 11 |
| `04-13-admin-bulgusu.md` | 73 | 73 | ✅ TAM | 15 |
| `05-bekleyen-kararlar-ve-manuel.md` | 90 | 90 | ✅ TAM | 27 |
| `06-devir-kilavuzu.md` | 79 | 79 | ✅ TAM | 6 |

**Toplam: 6/6 belge TAM okundu. Okunmayan: 0. Toplam defter kalemi: 79.**

> ⭐ KIRPILMA KONTROLÜ: 96'lık 01 ve 90'lık 05 dahil hepsi tek Read'de tam döndü (okunan=toplam). Kırpılma YOK.

---

## 1. DEFTER — belge belge (her kalem tek satır)

**DURUM kodları:** ✅ YAPILDI · 🟡 YARIM · 🔀 PR'DA · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ ADAYI

### 1.01 — felsefe-ve-calisma-tarzi (KOD DIŞI — çalışma disiplini; kalıcı referans)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :9-18 | ⚠️ GÜNCELLEME 2026-08-20: PO çalışma-tarzı ekleri (uzun otonom tur · sil-yerine-niyet-anla · belge silme-yok · 2 mod · karar-takip disiplini) | NUMARASIZ | ✅ YAPILDI (beyan) | KOD DIŞI (çalışma tarzı); `CLAUDE.md`'ye işlenmiş — kalıcı kural, aksiyon değil |
| :30 | 🟠 MANUEL-ONAY modu "ayrı mod gibi yazılmış; pratikte BYPASS-içi DUR-onay" (belge-içi tutarsızlık notu) | NUMARASIZ | ✅ YAPILDI (öz-düzeltme) | KOD DIŞI; belge kendi çelişkisini işaretlemiş (satır 15-16) |
| :51 | ⚠️ Kırmızı kural 1: "eu-west-2/**İrlanda**" yazıyor | NUMARASIZ | 🗑️ GEÇERSİZ ADAYI | TUR-1'de var: T1-A Ç6/madde 92 → sunucu **Londra/BK** (PO teyitli); bu satır BAYAT "İrlanda". NİYET: DB konum beyanı; NEREDE DURDU: devir belgesi 📸 dondurulmuş, madde 92 sonrası tazelenmemiş satır |
| :54-56 | ⚠️ GÜNCELLEME 2026-08-23: `seed-questions.ts` SİLİNDİ; güvenli liste = `seed-certification`/`seed-learning-journey`/`seed-test-tenant.mjs` | NUMARASIZ | ✅ YAPILDI (beyan) | KOD DIŞI; T1/T2'de kayıtlı (backend #45/`5745e0f`) |
| :38-48 | 8-UNSUR prompt standardı (büyük-resim/mod/devsecops/paralellik/duraklar/teyit/hata/kapanış) | NUMARASIZ | ✅ YAPILDI (kalıcı kural) | KOD DIŞI (çalışma tarzı); `CLAUDE.md` ile tutarlı |
| :50-57 | 3 kırmızı kural (canlı=lokal-Neon · tehlikeli-seed-asla · merge=PO) | NUMARASIZ | ✅ YAPILDI (kalıcı kural) | KOD DIŞI; `CLAUDE.md` canonical |
| :69-74 | Push öncesi `npm run verify` + verify↔CI farkı (TEST_DATABASE_URL guard) | NUMARASIZ | ✅ YAPILDI (kalıcı kural) | KOD DIŞI; `CLAUDE.md`/`scripts/verify.sh` |
| :17-18 | Karar-Takip Disiplini: oturum başı `00-KARAR-TAKIP` oku + hatırlat, tur sonu güncelle | NUMARASIZ | ✅ YAPILDI (kalıcı kural) | KOD DIŞI; `CLAUDE.md`'de tam bölüm |

### 1.02 — proje-durumu (KOD DIŞI durum-fotoğrafı; 2026-08-11, canonical=09-DURUM)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :14-19 | ⚠️ GÜNCELLEME 2026-08-20: belge "çok gerisinde"; canonical=09-DURUM; #7-Aşama1·#34·#7A·#9·#37 canlıda özeti | NUMARASIZ | ✅ YAPILDI (beyan) | TUR-1'de var: T1-A madde 29/34/37/9/9a — hepsi ✅ canonical'da |
| :7-8 | ⚠️ UYARI: PR numaraları eskimiş olabilir → `gh pr list`/`git log` doğrula | NUMARASIZ | 📌 not (prosedür) | KOD DIŞI (devir prosedürü) |
| :50 | Chat v1 (menti↔mentör mesajlaşma) TAM CANLIDA | NUMARASIZ | ✅ YAPILDI | backend #33+FE #47/#48; `Conversation`+`Message` migration `20260806000000` |
| :51 | Mentör paneli TAM CANLIDA (metrik kartları, IDOR korumalı) | NUMARASIZ | ✅ YAPILDI | `GET /api/mentors/:mentorId/dashboard-metrics`; backend #36+çatı #52/#51; TUR-2'de var: T2-C B.2 |
| :52 | Ölü kod temizliği (menti-driven görünürlük Taraf-2) SİLİNDİ | NUMARASIZ | ✅ YAPILDI | backend #35+çatı #50; Taraf-1 `setVisibilityOptIn` kasıtlı korundu |
| :53 | Belge hijyeni + temizlik (09/yol arşivlendi) main'de | NUMARASIZ | ✅ YAPILDI | denetim #56 + temizlik #57 |
| :54 | Mail generic SMTP relay ÇALIŞIYOR (forgot/reset-password tam) | NUMARASIZ | ✅ YAPILDI | `emailService.ts` + `authRoutes.ts:34,38`+`authController.ts:411-446`; ⚠️ NOT: bu "şifre-sıfırlama maili" — kurum onay/ret maili AYRI ve KAPALI (madde 6/37m, bkz. 1.05) |
| :55 | İzole test DB + guard VAR | NUMARASIZ | ✅ YAPILDI | `.env.test`+`assertTestDatabase.ts:44-76`+`tests/globalSetup.ts` |
| :56 | P0 güvenlik (tenant izolasyon 5-katman+RLS, IDOR, deadlock, DISC/JSON guard) kodlanmış+testli | NUMARASIZ | ✅ YAPILDI | test dosyaları listelendi; TUR-2'de var: T2-C B.5 SEC |
| :64 | 4-rol metodolojisi: STK✅·Platform✅·Mentör✅·**Menti ⬜ (henüz)** | NUMARASIZ | ✅ YAPILDI (aradan) | ⚠️ ARADAN KAPANMIŞ: satır 19 GÜNCELLEME "menti tarafı da büyük ölçüde canlıda (2026-08-20)"; TUR-2'de var: T2-C B.1 MENTİ 8✅. Bu satır 2026-08-11 fotoğrafı bayat |
| :67-69 | Chat v1 bilinen sınırlar (backfill yok · `requestMessage` DROP yok · deep-link/moderasyon yok) | =madde 18 / A21 | 🔵 ertelendi (PO) | TUR-1'de var: T1-A A21/madde 18; `requestMessage` şema kolonu KOD-TEYİT bu tur: `schema.prisma:364` HÂLÂ var. NİYET: teknik borç; NEREDE DURDU: DROP=migration→PO tur |
| :73-78 | Devir-anı git değerleri (çatı `da6a138`/backend `afc2769`, açık PR 0) | NUMARASIZ | 📌 not (bayat-SHA) | KOD DIŞI; belge kendi "git'ten doğrula" uyarısını taşıyor |

### 1.03 — kvkk-is-paketi (K1-K6; canonical=00-KARAR-TAKIP K-kodları, SEVİYE-1)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :10-14 | ⚠️ GÜNCELLEME 2026-08-20: K2·K4·K5 CANLIDA (#38+#73); K1 taslak·K3 PO·K6 v2 açık | NUMARASIZ | ✅ YAPILDI (beyan) | TUR-1'de var: T1-A madde 2/3/4 (K2/K4/K5) ✅ |
| :28 (K2) | OAuth `kvkkConsentAt` NULL → set edilmeli | TUR-1'de var: T1-A madde 2 / T2-C B1 | ✅ YAPILDI | `oauthService.ts:112` (T2-C KOD-TEYİT); ARADAN KAPANMIŞ (#38) — "en büyük sürpriz" |
| :27 (K1) | Yasal metinler TASLAK (`/kvkk`,`/gizlilik`,`/terms` "taslak niteliğinde") | =madde 40/91 ilişkili | ⬜ AÇIK (hukukçu) | `kvkk/page.tsx:92`,`gizlilik:85`,`terms:73`; NİYET: hukukçu-onaylı metin; NEREDE DURDU: hukukçu incelemesi bekliyor (A17: FE-entegrasyon PO'ca İPTAL, Word'le avukata) |
| :29 (K3) | Eski kayıt `kvkkConsentAt` NULL — backfill politikası yok | TUR-1'de var: T1-A K3 / T2-C 1.G A3 | ⬜ AÇIK (PO) | kodda backfill yok; NİYET: yeniden-rıza/bulk-accept/erteleme; NEREDE DURDU: ⏸️ EN SON, izinler netleşince (PO) |
| :30 (K4) | Yaş politikası çelişkili + yaş doğrulama input'u yok | TUR-1'de var: T1-A madde 3 (öz-beyan) / T2-C 1.G A1 | 🟡 YARIM | ⭐ KOD-TEYİT (T2-C): metin/öz-beyan ✅ (#38) ama `birthDate`/`birthYear` şemada YOK (form-input/DB-alan yok). NİYET: 18+ doğrulama; NEREDE DURDU: veri-katmanı yazılmadı |
| :31 (K5) | Veri sorumlusu kimliği + sunucu konumu beyanı yok | TUR-1'de var: T1-A madde 4/92 | ✅ YAPILDI | sunucu konumu beyanı `kvkk/page.tsx §8` (#73); Londra/BK teyitli (madde 92). ⚠️ NOT: satır 31 "Neon İrlanda/Hostinger belirsiz" der → bayat (Londra kesinleşti) |
| :32 (K6) | Admin sayfaları yalnız client-side guard (`middleware.ts` yok) | TUR-1'de var: madde 66 / T2-C 1.A:32,1.G A2 | ⬜ AÇIK | ⭐ KOD-TEYİT (bu tur): `frontend/src/middleware.ts` YOK (Glob boş). NİYET: server-side guard (savunma-derinliği); NEREDE DURDU: "Sprint 15"e ertelendi, v2 (API backend `requireRole` korumalı → veri-sızıntısı değil) |
| :35-37 | Privacy center UI (KVKK Md.11 self-servis silme/düzelt/export) — backend var, FE belirsiz | TUR-1'de var: T1-A madde 40/97 / T2-C 1.E:95 | ⬜ AÇIK | backend `userRoutes.ts:167-185` var; FE çağrısı YOK (T2-C grep boş). NİYET: KVKK Md.11 kullanıcı-yüzü; NEREDE DURDU: FE 0 |
| :38 | DISC için ayrı açık rıza (hassas veri) — tek rıza var, DISC'e ayrı yok | TUR-1'de var: T1-A madde 83 / v2#25 | ⬜ AÇIK (karar) | register tek rıza; NİYET: hassas-veri ayrı rıza; NEREDE DURDU: hukukçu/karar (madde 83 kümesiyle) |
| :40-44 | Zaten güvende (ham DISC gösterilmez·audit log·P0 tenant izolasyon) — yanlış-alarm önleme | NUMARASIZ | ✅ YAPILDI (not) | KOD DIŞI (güvence beyanı); `discVisibility` deseni; TUR-1/2'de kayıtlı |

### 1.04 — 13-admin-bulgusu (STK admin panel; canonical=stk-admin-bulgu / 13 madde)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :13-18 | ⚠️ GÜNCELLEME 2026-08-20: 13 bulgunun BÜYÜK KISMI uygulandı (6 panel canlıda); #1/#6/#7/#9/#12 + DISC-DI görünüyor; belge arşiv adayı | NUMARASIZ | ✅ YAPILDI (beyan) | TUR-2'de var: T2-C B.5 (6 panel TAMAMEN kodlanmış) |
| :9-11 | ⚠️ DÜRÜSTLÜK: gerçek S/M/L keşfi HENÜZ yapılmadı (o gün) | NUMARASIZ | ✅ YAPILDI (aradan) | ARADAN: keşif sonra yapıldı (T2-C kod-denetimi belgeleri); o günün "yapılmadı" notu bayat |
| :26 (#1) | Giriş şifre göster/gizle butonu yok (+ kayıt+sıfırlama) | NUMARASIZ | ✅ YAPILDI | satır 16 GÜNCELLEME "canlıda"; TUR-1/2'de "aradan kapanmış küme" (T1-B3/T2-C:55). NİYET: ucuz kazanım; canlıda |
| :27 (#2) | Admin sol menü sıralama/gruplama gözden geçir | =madde 8 ilişkili | ⬜ AÇIK (PO tasarım) | NİYET: tasarım kararı; NEREDE DURDU: PO kararı (madde 8 "4-grup" ✅ ama #2 gözden-geçirme tasarım-kararı olarak açık) |
| :28 (#3) | Havuz tablosu "Sektörler" kolonu — çoklu değer gösterimi | =madde 21 v2 ilişkili | ⬜ AÇIK (PO tasarım) | NİYET: sektör gösterim biçimi; NEREDE DURDU: PO gösterim-kararı (v2#21 sektör kolonu) |
| :29 (#4) | DISC tek harf — ikincil/karma tip backend'de mi | =madde 12 | ✅ YAPILDI | DISC çoklu-harf "DI" ✅ (#47+#93+#94; `DISC_LETTER_CONFIG`/`discLetters.ts`, T1-A madde 12). Backend karma tip tutuyor |
| :30 (#5) | Havuz sayfası layout | NUMARASIZ | ⬜ AÇIK (PO tasarım) | NİYET: tasarım; NEREDE DURDU: PO kararı |
| :31 (#6) | Algoritma Kalibrasyon Merkezi çok boş — ne göstermeli; ağırlık hardcoded 0.60/0.40 | =madde 9/9a | ✅ YAPILDI | ağırlık gösterim kartı %60/%40 ✅ (madde 9) + manuel ayar PUT weights ✅ (madde 9a, #52); artık hardcoded değil |
| :32 (#7) | Yöneticiler sayfası işlevi belirsiz (promote/demote-admin max 3) | NUMARASIZ | ✅ YAPILDI | satır 16 "`admin/managers` canlıda"; backend `promote-admin`/`demote-admin` max 3 |
| :33 (#8) | Soru Yönetimi: ifadelerin puanlama/cevap-tipi görünmüyor | =madde 13 ilişkili | 🟡 YARIM | soru düzenleme UI ✅ (madde 32) ama cevap-tipi görünürlüğü #13'e bağlı (ertelendi). NİYET: puanlama şeffaflığı; NEREDE DURDU: cevap-tipi şema-alanı yok |
| :34 (#9) | CORE/DEEPENING İngilizce → Türkçeleştir (enum mu görünüm mü tuzağı) | NUMARASIZ | ✅ YAPILDI | satır 16 "#9 CORE/DEEPENING Türkçeleştirme canlıda"; görünüm-etiketi olarak çözülmüş (#9 tuzağı: DB-enum kırma riski geçildi) |
| :35 (#10) | Yeni soru formu cevap-tipi (şıklı/açık) seçimi yok | TUR-1'de var: T1-A madde 13 | ⬜ AÇIK (⏸️ERTELENDİ) | ⭐ KOD-TEYİT (T2-C 1.G A4): cevap-tipi şema alanı YOK, migration gerekir. NİYET: soru esnekliği; NEREDE DURDU: kapsam belirsiz→PO, migration (madde 13) |
| :36 (#11) | Yeni soru formunda tek-seçenekli gereksiz dropdown | TUR-1'de var: T1-A A16 | ❓ TEYİT GEREK (minor) | NİYET: UI temizlik; NEREDE DURDU: güncel formda teyit gerek (A16 minor); DURUŞ SEBEBİ YOK |
| :37 (#12) | Etiket Yönetimi: hazır sistem etiketleri nerede tanımlı | =madde 12 / A9(etiket havuzu) | ✅/⬜ | satır 16 "#12 etiket yönetimi canlıda"; ancak **etiket havuzu talep-onay akışı** (A9/KARAR 12) HÂLÂ açık (T2-C 1.G A9). NİYET: standart havuz; sayfa var, talep-onay yok |
| :38 (#13) | Sertifika Konuları: içerik/senaryo görünmüyor + "kurum ekleyemez" gerekçesi; topic1-5 placeholder mı | =madde 30/33 ilişkili | 🟡 YARIM | sertifika 20-banka kodda MEVCUT ama canlı seed yok (madde 30/T5). NİYET: sertifika içerik şeffaflığı; NEREDE DURDU: canlı seed bloke (T5 runner yok) |

### 1.05 — bekleyen-kararlar-ve-manuel (⭐ EN ZENGİN — PO kararı + manuel iş + unutulmuş niyet)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :13-17 | ⚠️ GÜNCELLEME 2026-08-20: canonical=`00-KARAR-TAKIP`; PO manuel (destek@/SMTP·foto-volume·private·KVKK) geçerli; migration sırası 9a+9b→2a-ghost→#7-Aşama2 | NUMARASIZ | ✅/⬜ | 9a+9b ✅ (madde 9a/9b); 2a-ghost ⬜ (madde 35/A8); #7-Aşama2 ⬜ (madde 7-B) |
| :23-29 (A1) | super-admin router + `setVisibilityOptIn` Taraf-1 — sil/bağla/ertele | =madde 74(T6)/75(T7) | ⬜ AÇIK (PO) | `userRoutes.ts:76-81`/`matchingController.ts:80` kasıtlı korundu; super-admin davranışsal-testli. NİYET: yarım admin manuel-eşleştirme; NEREDE DURDU: bağla/kaldır/bırak PO kararı |
| :31-36 (A2) | `VisibilityOptIn.requestMessage` ŞEMA kolonu DROP → PO-onaylı migration turu | TUR-1'de var: T1-A A21 / madde 18 | 🔵 ertelendi (PO) | ⭐ KOD-TEYİT (bu tur): `schema.prisma:364 requestMessage String?` HÂLÂ var. NİYET: ölü-kolon temizlik; NEREDE DURDU: DROP=migration, Neon shadow-DB deseni, PO onaylı DB turu |
| :39 (A3-a) | Sektör-DISC ağırlık oranı admin-ayarlanabilir mi (0.60/0.40 hardcoded) | =madde 9a | ✅ YAPILDI | manuel ağırlık ayarı PUT weights ✅ (#52; madde 9a). O günün "hardcoded" durumu aradan çözüldü |
| :40 (A3-b) | Eşleşme hesaplama tetikleyicisi: event-driven mi sayfa-açılınca mı | TUR-1'de var: T1-A A14 | ❓ TEYİT GEREK | NİYET: hesaplama tetiği netleşsin; NEREDE DURDU: keşif+PO (A14/KARAR6 ile) |
| :41 (A3-c) | Yöneticilik-verme akışı: tüm onaylı kullanıcı listesi eksik | NUMARASIZ | ❓ TEYİT GEREK | NİYET: promote-admin için aday listesi; NEREDE DURDU: DURUŞ SEBEBİ YOK (envanter `08:27,30`); #7 yöneticiler sayfası canlı ama "tüm liste" teyidi açık |
| :42 (A3-d) | Fotoğraf zorunluluğu (opsiyonel→ileride zorunlu?) — karar yok | TUR-1'de var: T1-A A22 (foto volume ilişkili) | ⬜ AÇIK (PO) | NİYET: foto zorunlu-mu kararı; NEREDE DURDU: karar yok (`06-tasarim-ux:40`) |
| :43 (A3-e) | Gelir/sürdürülebilirlik modeli · pilot kulüp · gerçek kullanıcı görüşmeleri | NUMARASIZ | ⬜ AÇIK (PO iş/strateji) | KOD DIŞI (iş/strateji); NİYET: iş modeli; NEREDE DURDU: PO stratejik karar (`08:13,14,49`) |
| :51 (B-1) | Chat uçtan uca canlı test (thread·çan rozeti·okundu·mail) | TUR-1'de var: T1-A A22 | ⬜ AÇIK (PO manuel) | KOD DIŞI (PO-manuel); NİYET: canlı doğrulama; NEREDE DURDU: PO elinde gözlem |
| :52 (B-2) | Foto volume doğrulama (Dokploy `/app/uploads` kalıcı + uid 1001) — **merge ÖNCESİ ŞART** | TUR-1'de var: T1-A A22 | ⬜ AÇIK (PO manuel, kritik) | KOD DIŞI (altyapı-manuel); NİYET: fotoların silinmemesi; NEREDE DURDU: PO Dokploy ayarı (`dokploy-foto-volume-talimati.md`); canlı-öncesi kritik |
| :53 (B-3) | Mentör paneli metriklerini canlıda gözle görme | TUR-1'de var: T1-A A22 | ⬜ AÇIK (PO manuel) | KOD DIŞI; NİYET: gerçek-veri doğrulama; NEREDE DURDU: PO gözlem |
| :54 (B-4) | Repoları PRIVATE yapma | TUR-1'de var: T1-A A22/H3 | ✅ YAPILDI | ⚠️ ARADAN KAPANMIŞ: 2026-08-25 PO yaptı (`00-KARAR-TAKIP:149`; T1-A H3). Bu devir satırı bayat "yap" |
| :62-66 (C-1) | Sektör skoru servisi UYUYOR (`sector-scorer.service.ts` yazılı, canlıya bağlı değil); canlı basit `computeSectorScore` | TUR-1'de var: T1-A U1/madde 14 / T2-C 1.G U1 | 🔵 ertelendi | `scoring.ts:94` basit; NİYET: 5-bileşen sektör skoru; NEREDE DURDU: canlı-eşleşme değişir→staging ŞART (v2#14) |
| :67 (C-2) | Eşleştirmeyi birleştir (iki paralel skorlama tek sisteme, staging'de) | TUR-1'de var: madde 15 v2 | 🔵 ertelendi | NİYET: skorlama konsolidasyonu; NEREDE DURDU: staging sonrası (v2#15) |
| :68-69 (C-3) | Bekleme salonu bildirim izni: salon VAR ama `Notification.requestPermission` istemi kodda YOK ("en kritik") | TUR-1'de var: T1-B3 :101 / T2-C 1.G A7 | ⬜ AÇIK | ⭐ KOD-TEYİT (bu tur): `frontend/src` altında `requestPermission` grep 0 dosya. NİYET: bekleme UX ("en kritik" retention); NEREDE DURDU: izin-istemi kodu hiç yazılmadı |
| :70-71 (C-4) | Mentör görünürlük opt-in ekranı "Ekran 7a" — backend var, FE belirsiz | =madde 75(T7) | ⬜ AÇIK | backend `setVisibilityOptIn`+`VisibilityOptIn` tablosu var; FE ekranı yok (T2-C 1.C:37). NİYET: "görünür olmak için rıza" kapısı; NEREDE DURDU: FE yazılmadı |
| :72 (C-5) | STK "iki-aha modeli" (önizleme aha + gerçek aha) — wizard var, "canlı veri ile aha" tam değil | TUR-1'de var: T1-A A13 | ❓ TEYİT GEREK | NİYET: iki aşamalı aha; NEREDE DURDU: onboarding wizard var, canlı-veri-aha teyit (A13) |
| :73-74 (C-6) | Onay paneli bildirim maili (kurum onay/ret) + `destek@` gerçek kutu + prod `PLATFORM_ADMIN_EMAIL` — altyapı hazır, bağlanmadı | TUR-1'de var: T1-A madde 6/37m/84 | ⬜ AÇIK (PO manuel) | NİYET: başvurana geri-dönüş; NEREDE DURDU: `TENANT_NOTIFICATIONS_ENABLED=false` (37m); `destek@` config'te tanımsız (madde 84, `config.ts:31`); PO env bağlayacak |
| :75 (C-7) | Öğrenme yolculuğu kalan uçları (DISC ton + STK düzenleme + içerik onayı + uçtan uca test) | TUR-1'de var: T1-A A15 | ❓ TEYİT GEREK | kod MERGED, uçlar açık; NİYET: yolculuk tamamlama; NEREDE DURDU: teyit (A15) |
| :77 (C-8) | Landing UX paketi (lacivert tema·slogan·tooltip/hover/kontrast-WCAG·kart·light-tema DISC renk) | =madde 22 v2 / 64/65 | 🔵 ertelendi/⬜ | NİYET: landing parlatma; NEREDE DURDU: v2#22 landing UX+tema; WCAG=madde 64, tema=madde 65 |
| :79-80 (C-9) | Push bildirim STUB `notificationService.ts:49 TODO gerçek push (Expo/FCM)` sabit `sent:true`; admin rematch de stub | TUR-1'de var: T1-A madde 23 / T2-C 1.G A8 | ⬜ AÇIK (bilinçli) | NİYET: gerçek push; NEREDE DURDU: v2#23, in-app/mail idare ediyor (bilinçli) |
| :81 (C-10) | RLS lint kuralı (`findUnique` sızıntı tuzağı için lint) | =madde 26 v2 | 🔵 ertelendi | NİYET: güvenlik-iyileştirme lint; NEREDE DURDU: v2#26 (`04:18`) |
| :82-83 (C-11) | Altyapı temizliği: merge olmuş worktree/branch sil (`cati-lj`/`cati-bump`/`cati-compose`; `feat/learning-journey`/`fix/forgot-password-page`) | =madde 28 v2 | ⬜ AÇIK | ⭐ NOT: `git worktree list`/`git branch --merged` teyidi bu tur YAPILMADI (git-durum sorgusu kapsamda değil). NİYET: ortam temizliği; NEREDE DURDU: v2#28, önce teyit |
| :84 (C-12) | Staging ortamı (`staging.sivilkapasite.org` + ayrı Neon branch + Dokploy 2.app + `.env.compose.staging`) | =madde 27 v2 | 🔵 ertelendi | NİYET: canlı-riskli test zemini (sektör skoru için); NEREDE DURDU: v2#27 |
| :85-87 (C-13) | Sunucu/altyapı güvenliği HİÇ ele alınmadı (Dokploy HTTP·firewall·SSH·SSL·yedekleme) — ayrı tur | =A6 canlı-öncesi denetim ilişkili | ⬜ AÇIK | NİYET: prod sertleştirme; NEREDE DURDU: ayrı tur (`04-guvenlik:49-51`); canlı-öncesi denetim listesiyle (A6) örtüşür |
| :9-11 | ⚠️ GÜNCELLEME 2026-08-14: TAM bekleyen liste → `07-oturum-gunlugu` (PR #65 merge, 6 arşiv, durum-panosu) | NUMARASIZ | 📌 not (yönlendirme) | KOD DIŞI; 07 başka ajan turunda |

### 1.06 — devir-kilavuzu (KOD DIŞI prosedür; kalıcı referans)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :14-17 | ⚠️ GÜNCELLEME 2026-08-20: YENİ DEVİR DÜZENİ — her oturum ayrı dosya AÇILMAZ; tek yaşayan `07-oturum-gunlugu`; `08` arşive taşındı | NUMARASIZ | ✅ YAPILDI (beyan) | KOD DIŞI (devir prosedürü); yeni okuma sırası tanımlı |
| :9-12 | ⚠️ GÜNCELLEME 2026-08-14: 01-06 seti 2026-08-11 fotoğrafı → önce `07` oku; git değerleri (çatı `0aaeac7`/#65) | NUMARASIZ | 📌 not (bayat-SHA) | KOD DIŞI |
| :21-35 | İLK TUR prosedürü (devir oku→09/10 oku→`git fetch`+`gh pr list`+`submodule status` doğrula→sıradaki iş) | NUMARASIZ | ✅ YAPILDI (kalıcı prosedür) | KOD DIŞI; devir-anı SHA (çatı `da6a138`/backend `afc2769`) bayat ama "doğrula" uyarılı |
| :36-39 | Sıradaki iş: 🔴 KVKK paketi (03) + 🔴 13 admin bulgusu (04); paralel iki kuyruk, PO önceliklendirir | =03/04 kümeleri | ⬜/✅ | KVKK kısmen ✅ (K2/K4/K5), 13-bulgu büyük-kısmı ✅; kalanları yukarıda 1.03/1.04'te |
| :43-50 | Her turda sabitler özeti (mod+model·kanıt·3-kırmızı-kural·submodule-sıra·verify·kişi-adı-yok·09-DURUM-güncelle) | NUMARASIZ | ✅ YAPILDI (kalıcı kural) | KOD DIŞI; `CLAUDE.md` canonical |
| :78-79 | Altın kural: çelişkide **09-DURUM + git gerçeği kazanır**; devir belgeleri 2026-08-11 fotoğrafı | NUMARASIZ | 📌 not (kalıcı) | KOD DIŞI; bu bilanço turunun bayat-not tespitlerini yetkilendirir |

---

## 2. YARIM KALAN İŞLER (gruplu)

### (a) PO kararı bekliyor
- **super-admin/`setVisibilityOptIn` Taraf-1 sil/bağla/ertele** (1.05 A1 / madde 74/75) · **`requestMessage` kolon DROP** (1.05 A2 / madde 18 — migration, PO-onaylı DB turu) · **Fotoğraf zorunluluğu kararı** (1.05 A3-d) · **Admin sol menü gözden-geçirme** (1.04 #2) · **Havuz sektör-kolonu gösterim biçimi** (1.04 #3) · **Havuz layout** (1.04 #5) · **Etiket havuzu talep-onay akışı** (1.04 #12 / A9) · **Soru cevap-tipi (şıklı/açık)** (1.04 #10 / madde 13 — migration) · **Gelir modeli/pilot/kullanıcı-görüşmeleri** (1.05 A3-e, iş/strateji) · **DISC için ayrı açık rıza** (1.03:38 / madde 83, hukukçu) · **K3 eski-kayıt consent** (1.03 K3).

### (b) Başka işe bağlı
- **Kurum onay/ret maili + destek@ + PLATFORM_ADMIN_EMAIL** (1.05 C-6 / madde 6/37m/84) → **37m mail-açma** (`TENANT_NOTIFICATIONS_ENABLED=false`) · **Sektör skoru servisi bağlama** (1.05 C-1 / U1) → **staging** (1.05 C-12 / v2#27) · **Eşleştirme birleştirme** (1.05 C-2) → staging · **K1 yasal metin** (1.03 K1) → hukukçu · **K4 yaş-doğrulama input** (1.03 K4) → şema/migration + politika · **KVKK FE self-servis** (1.03:35 / madde 40) → backend hazır, FE bağlanacak.

### (c) Bilinçli ertelendi
- **Push STUB Expo/FCM** (1.05 C-9 / madde 23, in-app/mail idare) · **RLS lint** (1.05 C-10 / v2#26) · **Staging ortamı** (1.05 C-12 / v2#27) · **Landing UX/tema** (1.05 C-8 / v2#22, 64, 65) · **Sektör skoru 5-bileşen** (1.05 C-1 / v2#14, staging şart) · **Chat v1 sınırları: backfill/deep-link/moderasyon** (1.02:67-69, kapsam-dışı) · **K6 admin server-guard** (1.03 K6, v2, API zaten korumalı).

### (d) SEBEP YAZILMAMIŞ (DURUŞ SEBEBİ YOK / NİYET BELGELENMEMİŞ)
- **Yöneticilik-verme "tüm onaylı kullanıcı listesi" eksik** (1.05 A3-c) — DURUŞ SEBEBİ YOK (`08:27,30`) · **#11 tek-seçenekli gereksiz dropdown** (1.04 #11 / A16) — DURUŞ SEBEBİ YOK (güncel formda teyit) · **Altyapı-temizliği worktree/branch sil** (1.05 C-11) — git-teyidi bu tur yapılmadı, DURUŞ SEBEBİ YOK.

### (e) PO manuel (kod değil — elle yapılır)
- **Foto volume doğrulama** (1.05 B-2, canlı-öncesi ŞART) · **Chat uçtan uca canlı test** (1.05 B-1) · **Mentör metrik canlı gözlem** (1.05 B-3) · **Sunucu/altyapı güvenliği** (1.05 C-13, ayrı tur). [Repo PRIVATE ✅ 2026-08-25 — B-4 kapandı]

---

## 3. KESİN SAYIM

### Kalem + durum dağılımı (79 defter kalemi)
| durum | adet |
|---|:---:|
| ✅ YAPILDI (çoğu kalıcı-kural/beyan + ARADAN KAPANMIŞ) | 33 |
| 🟡 YARIM | 3 |
| 🔀 PR'DA | 0 |
| ⬜ AÇIK | 23 |
| ❓ TEYİT GEREK | 6 |
| 🗑️ GEÇERSİZ ADAYI | 1 |
| 🔵 (bilinçli erteleme — ⬜ alt-türü) | 8 |
| 📌 not / KOD DIŞI (prosedür/bayat-SHA/yönlendirme) | 5 |

> Toplam kontrol: 33+3+23+6+1+8+5 = 79. (🔵 ve 📌 ⬜ dışında ayrı sayıldı; çok-etiketli kalem yok.)
> ⚠️ Bu belgeler SENTEZ olduğundan ✅'ların çoğu ya **kalıcı çalışma-kuralı/beyanı** (01/06 tamamı) ya da
> **ARADAN KAPANMIŞ** iş (2026-08-20 güncelleme notlarının kanıtladığı); yeni açık iş çıkmadı — hepsi T1/T2 kümeleriyle örtüşüyor.

### ⭐ ARADAN KAPANMIŞ ✅ (devir 📸 2026-08-11/14 → sonra yapıldı; bu turun hayalet-tamamlanmış tespitleri)
1. **02:64 "Menti ⬜ (henüz)"** → menti tarafı büyük-ölçüde canlıda (2026-08-20; T2-C B.1) — satır bayat
2. **K2 OAuth `kvkkConsentAt`** (03:28) → ✅ `oauthService.ts:112` (#38)
3. **K5 sunucu konumu beyanı** (03:31) → ✅ `kvkk §8` (#73); "İrlanda belirsiz" satırı bayat (Londra kesin)
4. **05 B-4 Repo PRIVATE** (:54) → ✅ 2026-08-25 PO (T1-A H3) — "yap" satırı bayat
5. **05 A3-a ağırlık admin-ayarlanabilir** (:39) → ✅ PUT weights #52 (madde 9a); "hardcoded" bayat
6. **13-bulgu #1/#4/#6/#7/#9/#12** (04) → ✅ 6 panel canlıda (T2-C B.5); "keşif yapılmadı" (04:9) bayat

### ⭐ BAYAT-NOT ADAYI (devir belgesi içinde eski gerçek satırı; belge 📸 olduğundan silinmez, ⚠️ notu gerekir)
- **01:51 "İrlanda"** → 🗑️ GEÇERSİZ ADAYI: sunucu Londra/BK (madde 92, T1-A Ç6). Kırmızı-kural metnindeki DB-konum satırı bayat.
- **03:31 "Neon İrlanda / Hostinger belirsiz"** → K5 kapandı, Londra teyitli; satır bayat.
- **02:64 · 04:9 · 05:39 · 05:54** → yukarıda "aradan kapanmış" (bayat fotoğraf satırları).
> Not: Bu belgeler zaten kendi içinde "📸 2026-08-11 fotoğrafı; çelişkide 09-DURUM+git kazanır" (06:78) diyerek
> bayatlığı beyan ediyor — silme YOK, tarihli ⚠️ GÜNCELLEME deseni geçerli (belge-hijyeni).

### ⭐ SEVİYE-1 KOD-TEYİT (bu tur GERÇEK KODLA doğrulanan — kanıtsız ✅ DENMEDİ)
- ⭐ **K6 admin server-guard** — `frontend/src/middleware.ts` YOK (Glob boş) → **⬜ AÇIK doğru** (API `requireRole` korumalı, savunma-derinliği açığı)
- ⭐ **`VisibilityOptIn.requestMessage`** — `schema.prisma:364` HÂLÂ var → **DROP açık** (madde 18/A2) doğrulandı
- ⭐ **Bekleme salonu bildirim izni** — `frontend/src` altında `requestPermission` grep 0 dosya → **⬜ AÇIK doğru** (05 C-3)
> Diğer S1 kalemler (K2/K4/K5/KVKK-FE/consent-sürüm) T2-C'de GERÇEK KODLA doğrulanmıştı → burada "TUR-2'de var" ile bağlandı, tekrar sorgulanmadı.

---

## KAPANIŞ NOTU (GRUP-B / TUR-3)

- **6/6 belge TAM okundu** (okunan/toplam: 96/96, 79/79, 60/60, 73/73, 90/90, 79/79). Kırpılma YOK (96'lık 01 + 90'lık 05 dahil tek Read'de tam). Okunmayan: 0.
- **Toplam 79 defter kalemi.** Dağılım TAM: ✅ 33 · 🟡 3 · ⬜ 23 · ❓ 6 · 🗑️ 1 · 🔵 8 · 📌 5 · 🔀 0.
- **NUMARASIZ:** bu belgeler SENTEZ olduğundan çoğu kalem T1/T2'de zaten numaralı (madde/K/T/U/A serileri). GERÇEKTEN yeni numarasız YOK — 01/06'nın tamamı kalıcı çalışma-kuralı (numara almaz), 02-05'in içeriği canonical'a "TUR-N'de var" ile bağlandı.
- **🟡 YARIM: 3 kalem** (K4 yaş-input · #8 soru-cevap-tipi görünürlük · #13 sertifika-konu içerik) — üçünün de NİYET BELGELENMİŞ (yaş-doğrulama/puanlama-şeffaflık/sertifika-şeffaflık), NİYET-BELGELENMEMİŞ 🟡 YOK.
- **Hayalet-tamamlanmış (kod/beyan-kanıtlı): 6** (yukarıda ⭐ küme) — devir setinin 2026-08-11 fotoğraf satırları 2026-08-20 güncelleme notları + sonraki kodla aşılmış. Bu, T1'in "roadmap-bayat" + T2'nin "kod denetimin ötesine geçmiş" bulgusunu GÜÇLENDİRİR.
- **Çelişki: bu turda YENİ çelişki YOK** (devir belgeleri kendi bayatlığını beyan ediyor); **🗑️ GEÇERSİZ ADAYI: 1** (01:51 "İrlanda" — sunucu Londra/BK, T1-A Ç6 ile aynı; hakem olmadım, T1'in kaydına bağladım).
- **Kod arandı (bu tur spot-teyit): 3 S1 kalem** — `middleware.ts` (yok, K6 açık) · `requestMessage` (`schema.prisma:364` var, DROP açık) · `requestPermission` (yok, bekleme-izni açık). Üçü de kanıtla ⬜/🔵 bırakıldı; kanıtsız ✅ DENMEDİ.
- **⭐ En zengin belge: 05-bekleyen-kararlar** (27 kalem, C bölümü 13 unutulmuş niyet) — kağıt-üstü niyetlerin tek en yoğun kaynağı; hepsi T1/T2 kümeleriyle örtüştü (yeni açık iş doğmadı, ama görünürlük tek yerde toplandı).
- **⭐ En çarpıcı gerçek:** Devir seti (2026-08-11) kendi içinde 3 katmanlı tazeleme (2026-08-14, 2026-08-20, +2026-08-23 seed notu) taşıyor; buna rağmen **01:51 (İrlanda) + 03:31 (İrlanda belirsiz) + 02:64 (Menti henüz) + 04:9 (keşif yapılmadı) + 05:54 (repo private yap)** satırları hâlâ bayat fotoğraf — belge-hijyeni deseniyle (⚠️ GÜNCELLEME, silme yok) düzeltilebilir; taşıma/silme PO kararı.
- DB'ye HİÇBİR sorgu yapılmadı (SELECT bile yok) · kod SALT-OKUNDU/değiştirilmedi · PR açılmadı · commit yapılmadı · belge silinmedi/taşınmadı · numara doğurulmadı · kişi adı yazılmadı · yalnız T3-B dosyası yazıldı.
