> 🧊 ARŞİV — `docs/otonom/00-KUYRUK.md` satırlarından taşınan üstü-çizili (geçersiz) katmanlar, AYNEN.
> Kural: CLAUDE.md § "tarihsel iz satırın İÇİNDE tutulmaz" + K-A (sık okunan dosyada eski metin arşive). Satırda `· geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md §<iş>` atfı durur.
> Neden ayrı dosya (kuyruğun sonunda `## GEÇMİŞ` değil): kuyruğun son bölümü AJAN-EKLEDİ tablosu, satırlar dosya sonuna eklenir → sonda bir GEÇMİŞ bölümü yeni satırları yanlış bölüme düşürürdü.

# 00-KUYRUK — GEÇMİŞ

## §K-16 (YN-09 · 2026-09-27)

~~[ESKİ · 2026-09-21] (yeni 2 senaryo+8 şık canlıya çıkmaz)~~
~~[ESKİ · 2026-09-21] fark yalnız **2 senaryo + 8 şık** (20/80 → 22/88)~~

## §P-99 (YN-09 · 2026-09-27)

~~[ESKİ · 2026-09-21] K-16 seed atarsa yeni 2 senaryo+8 şık ÇIKMAZ.~~
~~[ESKİ · 2026-09-21] fark yalnız **2 senaryo + 8 şık** (20/80 → 22/88)~~

## GÖREV 2.4 — duruma göre bölme (2026-09-28)

### BAŞLIK · § Kapılar + § Durum kodları (2026-09-28)

Aktif başlıktan çıkarılan satırlar (AYNEN; üstü çizili eski katmanlar, yerini 4 renk alan 2026-09-19 notu ve OTONOM-PROMPT § 2.1b / § 7'de AYNEN bulunan cümleler). Değiştirilen satırların tam eski hâli de buradadır.

```text
~~[ESKİ · 2026-09-26] 🟢 **YAP+MERGE** — yap, doğrulama listesi tam ✅ ise merge et, canlıya al~~
~~[ESKİ · 2026-09-26] 🟡 **YAP+PR** — yap, PR aç, merge etme (riskli/geniş)~~
~~[ESKİ · 2026-09-26] 🔴 **KARAR BEKLER** — ilgili KARAR cevapsızsa DOKUNMA, atla, sonrakine geç~~

…
Karantina 🔵 olur; gerçek silme (silme protokolünün son adımı) 🔴 kalır.
…

> ~~[ESKİ · 2026-09-26] (aşağıdaki 2026-09-19 gevşetme notu — 3 istisna 🟡 tanımı; yerini yukarıdaki 4 renk aldı: istisna 1 ve 3 → 🔵, istisna 2 → 🟢 + 7b (b)(c))~~
> ⚠️ GÜNCELLEME (2026-09-19, kapı politikası gevşetildi — PO): **Varsayılan kapı artık 🟢'dır.**
> Bir iş yalnız ŞU ÜÇ İSTİSNADAN birine giriyorsa 🟡 kalır (yoksa 🟢 yapılır):
>  1. **MIGRATION / SEED** gerektiriyorsa
>  2. **HASSAS DOSYA'ya dokunuyorsa:** auth/yetkilendirme (guard·middleware·token·session) · KVKK/rıza/aydınlatma/veri silme-dışa aktarma · matching/eşleştirme motoru/skorlama
>  3. **Canlı veriye GERİ DÖNÜLMEZ dokunuyorsa**
> Belirsizse 🟡 kalır. 🔴 (KARAR bekleyen) işler bu gevşetmeden **ETKİLENMEZ.**
> Gerekçe (PO): gerçek kullanıcı ~sıfır · her iş ayrı PR (tek tek revert edilebilir) · `npm run verify` + CI kapısı var.
…
~~[ESKİ · 2026-09-21] BEKLIYOR · CALISILIYOR · BITTI · ATLANDI(karar) · BASARISIZ · IPTAL(PO)~~
⚠️ **GÜNCELLEME (2026-09-21, BE turu): `PR-ACIK` EKLENDİ — 7 kod.**
**BEKLIYOR · CALISILIYOR · PR-ACIK · BITTI · ATLANDI(karar) · BASARISIZ · IPTAL(PO)**
…
Kanıt: `docs/otonom/OTONOM-PROMPT.txt:81-82` (canonical, en yeni) — motorun her tur okuduğu dosya zaten
7 kod sayıyordu; kuyruk 6 sayıyor ama gövdesinde `PR-ACIK`'ı **kullanıyordu** (F-19, GV-01/02).
Bu, **YN-07**'nin tam vakasıydı; hizalama o satırın bir ayağını kapatır. ⚠️ `belge-duzeni-rehberi.md` § KURAL 10'daki
```

### AJ-22 (2026-09-28)

**Önceki tam satır (AYNEN, 1965 bayt):**

| AJ-22 | Ş0 | **Tarayıcı güvenlik politikası (CSP) yalnız rapor modunda; kurum logosu herhangi bir https adresine konabiliyor** — izleme pikseli üyelerin IP/tarayıcı bilgisini toplayabilir (F-04 + AJ-05 kalanı). | 🟢 (+7b) | CSP engelleme modunda; logo yalnız izinli kaynaktan çiziliyor; test | BITTI (kısmen — KARAR-112) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` (F-04 QE5, AJ-05 QE2) · kanıt: `frontend/src/lib/securityHeaders.mjs:36` (`Content-Security-Policy-Report-Only`) · `backend/src/services/logoUrl.ts:64-76` (yalnız IP/localhost reddi) · eski BITTI: F-04 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:193` · AJ-05 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:383` · hazırlık: `docs/raporlar/kesif/csp-zorunlu-mod-hazirlik-2026-09-27.md` · karar gerekebilir: izinli görsel alan adları (img-src) · 🟨 **BITTI (kısmen) 2026-09-27:** çatı #387 (7b: kod güvenli, merge'e engel yok — https://github.com/zahidsamiata/menti-mentor-v2/pull/387#issuecomment-5859361822). Yapılan: CSP engelleme modunda (`frontend/src/lib/securityHeaders.mjs` başlık `Content-Security-Policy`; img-src `'self' data: blob: <api> https:` — http/joker yok); `frontend/next.config.mjs`. Test: `frontend/src/__tests__/security-headers.test.ts` (9). mutasyon: yerel — Report-Only'ye dönünce + img-src sabit listeye/`http:` eklenince kırmızı (inceleyici tekrarladı). E2E (Playwright) engelleme modunda geçti (run 36345570871). KALAN: logo yalnız izinli kaynaktan çizilsin → **KARAR-112** (ürün kararı: her https / alan adı listesi / sunucuya indirme) · CSP ihlal kaydı → **AJ-52**. Satır kuyrukta kalır (5c-a belirsiz). CANLIDA BAK: ana sayfa, giriş, menti paneli açılıyor; tarayıcı konsolunda CSP ihlali yok (kontrol: `docs/otonom/03-PO-ELLE-ISLER.md` § KABUL TESTİ LİSTESİ madde 13 + ana ajanın merge sonrası başlık/sayfa kontrolü 02-ILERLEME'de). |

**Satırdan çıkarılan katmanlar (AYNEN, 1244 bayt):**

- eski BITTI: F-04 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:193`
- AJ-05 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:383`
- karar gerekebilir: izinli görsel alan adları (img-src)
- 🟨 **BITTI (kısmen) 2026-09-27:** çatı #387 (7b: kod güvenli, merge'e engel yok — https://github.com/zahidsamiata/menti-mentor-v2/pull/387#issuecomment-5859361822). Yapılan: CSP engelleme modunda (`frontend/src/lib/securityHeaders.mjs` başlık `Content-Security-Policy`; img-src `'self' data: blob: <api> https:` — http/joker yok); `frontend/next.config.mjs`. Test: `frontend/src/__tests__/security-headers.test.ts` (9). mutasyon: yerel — Report-Only'ye dönünce + img-src sabit listeye/`http:` eklenince kırmızı (inceleyici tekrarladı). E2E (Playwright) engelleme modunda geçti (run 36345570871). KALAN: logo yalnız izinli kaynaktan çizilsin → **KARAR-112** (ürün kararı: her https / alan adı listesi / sunucuya indirme)
- CSP ihlal kaydı → **AJ-52**. Satır kuyrukta kalır (5c-a belirsiz). CANLIDA BAK: ana sayfa, giriş, menti paneli açılıyor; tarayıcı konsolunda CSP ihlali yok (kontrol: `docs/otonom/03-PO-ELLE-ISLER.md` § KABUL TESTİ LİSTESİ madde 13 + ana ajanın merge sonrası başlık/sayfa kontrolü 02-ILERLEME'de).

### K-15 (2026-09-28)

**Önceki tam satır (AYNEN, 1506 bayt):**

| K-15 | Ş2 | **AvailabilityBlock'a format + süre (tam randevu mimarisi).** ⛔ önce `availability_block_yedek_20260910`; migration default'lu (format=ONLINE, durationMin=60); mentör slot açarken format+süre seçer; menti slottan seçer. | ~~🟡~~ 🔵 | Mentör format+süre belirliyor, menti seçiyor, eski kayıtlar bozulmadı | PR-ACIK | 🔓 **KİLİT AÇILDI (2026-09-21, KARAR-1 → A).** Kapı **🟡 KALIR** — ⛔ **MIGRATION** (`AvailabilityBlock`'a `format` + `durationMin`, istisna 1). PO cevabının kendi şartı: **ÖNCE `availability_block_yedek_<tarih>` tablosu, SONRA PO'nun AÇIK onayı. Ajan tek başına migration ÇALIŞTIRMAZ.** Migration default'lu olmalı (`format=ONLINE`, `durationMin=60`) ki eski kayıtlar bozulmasın. · aile: Y-G · ⛔ **çelişki: KARAR-80/M10** (2026-09-25) · eski kapı: ~~🔴 KARAR-1~~ 🟡 *(KARAR-1 cevaplandı 2026-09-21: **A**)* · KARAR-80 işlendi (2026-09-26, A kabul) — M10: kapsam 'format + süre + koşul alanları'na genişledi (AN-25 katlandı); tek migration, tek yedek — migration onayı ayrıca gerekir (Bölüm 7b istisna 1). · kapı 2026-09-26 (4 renk) · 🔵 **HAZIRLANDI 2026-09-27:** backend #189 (⛔ MIGRATION: `AvailabilityBlock.format` @default ONLINE + `durationMin` @default 60; 7b ONAY) + çatı #374 (form + randevu ekranı; 7b ONAY). AN-25 koşul alanları bilerek dışarıda (tasarlanmadı). EVET/HAYIR: **KARAR-111** (mevcut blokların ONLINE/60'a daralması, <60 dk blok riski, yedek MERGE'DEN ÖNCE). |

**Satırdan çıkarılan katmanlar (AYNEN, 760 bayt):**

- 🔓 **KİLİT AÇILDI (2026-09-21, KARAR-1 → A).** Kapı **🟡 KALIR** — ⛔ **MIGRATION** (`AvailabilityBlock`'a `format` + `durationMin`, istisna 1). PO cevabının kendi şartı: **ÖNCE `availability_block_yedek_<tarih>` tablosu, SONRA PO'nun AÇIK onayı. Ajan tek başına migration ÇALIŞTIRMAZ.** Migration default'lu olmalı (`format=ONLINE`, `durationMin=60`) ki eski kayıtlar bozulmasın.
- ⛔ **çelişki: KARAR-80/M10** (2026-09-25)
- eski kapı: ~~🔴 KARAR-1~~ 🟡 *(KARAR-1 cevaplandı 2026-09-21: **A**)*
- KARAR-80 işlendi (2026-09-26, A kabul) — M10: kapsam 'format + süre + koşul alanları'na genişledi (AN-25 katlandı); tek migration, tek yedek — migration onayı ayrıca gerekir (Bölüm 7b istisna 1).
- kapı 2026-09-26 (4 renk)

### E-3 (2026-09-28)

**Önceki tam satır (AYNEN, 5178 bayt):**

| E-3 | değişir | **BAĞLA kovasını yap.** Her kalem ayrı PR, kendi şeridinde. Küçük ve migration'sız olanlar 🟢, diğerleri 🟡. Sırala: en az emekle en çok kullanıcı değeri önce. | ~~🟢/🟡~~ 🟢 | Her kalem için kullanıcı ekranda bir şey görüyor | BEKLIYOR | (kapı gevşetildi 2026-09-19: kova alt-kalemleri tek tek — migration/hassas/geri-dönülmez değilse 🟢) · **KR (2026-09-25):** rapor `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` D11 [teyit gerek] — 28 bağlanmamış uç bu kovanın adayı; liste bu turda yeniden çıkarılır · ⭐ **KEŞİF (2026-09-25):** `docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md` — 62 uç: **BAĞLA 10** (1'i 🔴 U-01) · MÜKERRER 21 · İÇ/SİSTEM 7 · TERK/ÜRÜN 24 (silinmez, yalnız listelendi). Bu turda işlenecek 🟢 alt-kalemler: **E-3a** çift sinyali rozeti (admin/eslesmeler) · **E-3b** gizlenen soruyu geri açma. 🟡 alt-kalemler (sonra): bağlamsal geri bildirim kartı · anlaşma taslağı · check-in geçmişi · çifti engelle (KR-19 sonrası) · değerlendirme okuma. · ⚠️ **2026-09-25 uygulama:** E-3a (çift sinyali) GEREKSİZ — rozet zaten `admin/eslesmeler` "Risk" sütununda; uç MÜKERRER'e taşındı (rapor GÜNCELLEME). E-3b: backend #127 + çatı #308 (inceleniyor). **E-3c (yeni bulgu, 🟢):** `GET /api/questions` `tenantId` döndürmüyor (DISC soruları kuruma özel gibi Düzenle/Sil ile görünüyor) + kurumun eklediği STK_CUSTOM sorular listeye hiç dönmüyor — #127 sonrası (aynı dosya). · ✅ **E-3b BITTI (2026-09-25):** backend #127 (`a6d9177`, inceleme https://github.com/zahidsamiata/menti-mentor/pull/127#issuecomment-5830772760) `GET /api/questions/hidden` (ADMIN, tenant filtresi; test `tests/question-hidden-list.test.ts` 6, 4 negatif) + çatı #308 `admin/questions/page.tsx` "Gizlenen Sorular" + "Tekrar göster" (test `admin-questions-hidden.test.tsx`). CANLIDA BAK: yönetici, gizlenmiş soru varsa soru ekranında listesini görüp tekrar gösterebiliyor. E-3c devam ediyor. · 🔀 **E-3c PR-ACIK (2026-09-26):** backend #135 MERGE EDİLDİ (`bdb5d9c`) · çatı #313 bağımsız inceleme zaten **SONUÇ: ONAY** (issuecomment #313) idi ama `CONFLICTING` idi (#308 ile aynı blok) — çakışma çözüldü + backend pointer `bdb5d9c`'ye bump edildi (`df28104`), CI **yeşile döndü** (iki koşu da 8/8) — **merge YAPILAMADI**: otomatik izin sınıflandırıcısı "Merge Without Review" gerekçesiyle reddetti; PO'nun elle merge etmesi gerekiyor. ✅ **DÜZELTME (2026-09-26): #313 MERGE EDİLMİŞ** (`mergedAt: 2026-09-26T10:18:12Z`, `gh pr view 313` ile doğrulandı) — bu satırdaki "merge YAPILAMADI" notu BAYAT, PO ya da önceki tur elle merge etmiş. Backend `bdb5d9c` zaten çatı main pointer'ının atası (main HEAD bugün `c2a9682`, sonra V-16 ile `11ed7dc`). CANLIDA BAK: soru yönetimi ekranında sistem/kuruma özel soru ayrımı ve kurumun eklediği STK_CUSTOM sorular listede görünüyor; canlı kontrol temiz (`/health` ok:true db:up). E-3 kovasının bu satırı **BITTI** sayılır. · kapı 2026-09-26 (4 renk) · ⭐ **AYIKLAMA 2026-09-27 (salt-okuma):** kalan BAĞLA alt kalemleri — **çifti engelle (yönetici formu)** engelsiz, E-3d olarak yapılıyor · **değerlendirme okuma** (`GET /api/meetings/:meetingId/feedback`) ve **check-in geçmişi** (`GET /api/meetings/:meetingId/check-ins`) engelsiz, sırada · **anlaşma taslağı** → 🔴 KARAR-109 (kim başlatır) · **bağlamsal geri bildirim kartı** → U-18'e (KARAR-97 EVET) bağlı · U-01 artık BITTI (KARAR-80/M11). · ✅ **E-3d BITTI 2026-09-27:** backend #187 (`4244924`; liste `GET /api/tenants/:id/block-pairs` + kaldır `DELETE /api/tenants/:id/block-pair/:pairId`; 7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/187#issuecomment-5855192450) + çatı #371 (`0cf3006`, pointer dahil; 7b 2. tur ONAY). CANLIDA BAK: kurum yöneticisi /admin/eslesmeler'de çift engelleyebiliyor, mevcut engelleri görüp kaldırabiliyor. Takip (engel değil): engel koyma ucu denetim kaydı yazmıyor · eşzamanlı iki yönetici güncellemesinde kayıp güncelleme riski · seçim listeleri ilk sayfa. Kalan alt kalemler: E-3e (değerlendirme/check-in okuma, çatı #372 düzeltmede) · anlaşma taslağı (KARAR-109) · bağlamsal geri bildirim (U-18). · ✅ **E-3e BITTI 2026-09-27:** çatı #372 (`e79ddff`; 7b 2. tur ONAY https://github.com/zahidsamiata/menti-mentor-v2/pull/372#issuecomment-5855327654). 1. tur SORUN VAR (yanlış tablo: Feedback yerine check-in) → düzeltildi. CANLIDA BAK: tamamlanmış her görüşme kartında kullanıcı KENDİ check-in değerlendirmesini görüyor ya da "Değerlendirme Yap" düğmesini; yönetici "Değerlendirmeler". Bu, "check-in geçmişi" alt kalemini karşıladı; "değerlendirme okuma" (`GET /api/meetings/:meetingId/feedback`, Feedback tablosu) KARŞILANMADI — E-3e `…/check-ins` okuyor (`frontend/src/components/organisms/MeetingCheckInReadout.tsx:6-13`) → **AJ-49** (düzeltme 2026-09-27, 7b #379 N1; eski metin `docs/arsiv/belge-senkron-2026-09-27.md`). Kalan: anlaşma taslağı (🔴 KARAR-109) · bağlamsal geri bildirim (U-18 / KARAR-97). |

**Satırdan çıkarılan katmanlar (AYNEN, 4578 bayt):**

- (kapı gevşetildi 2026-09-19: kova alt-kalemleri tek tek — migration/hassas/geri-dönülmez değilse 🟢)
- **KR (2026-09-25):** rapor `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` D11 [teyit gerek] — 28 bağlanmamış uç bu kovanın adayı; liste bu turda yeniden çıkarılır
- . Bu turda işlenecek 🟢 alt-kalemler: **E-3a** çift sinyali rozeti (admin/eslesmeler)
- **E-3b** gizlenen soruyu geri açma. 🟡 alt-kalemler (sonra): bağlamsal geri bildirim kartı
- anlaşma taslağı
- check-in geçmişi
- çifti engelle (KR-19 sonrası)
- değerlendirme okuma.
- ⚠️ **2026-09-25 uygulama:** E-3a (çift sinyali) GEREKSİZ — rozet zaten `admin/eslesmeler` "Risk" sütununda; uç MÜKERRER'e taşındı (rapor GÜNCELLEME). E-3b: backend #127 + çatı #308 (inceleniyor). **E-3c (yeni bulgu, 🟢):** `GET /api/questions` `tenantId` döndürmüyor (DISC soruları kuruma özel gibi Düzenle/Sil ile görünüyor) + kurumun eklediği STK_CUSTOM sorular listeye hiç dönmüyor — #127 sonrası (aynı dosya).
- ✅ **E-3b BITTI (2026-09-25):** backend #127 (`a6d9177`, inceleme https://github.com/zahidsamiata/menti-mentor/pull/127#issuecomment-5830772760) `GET /api/questions/hidden` (ADMIN, tenant filtresi; test `tests/question-hidden-list.test.ts` 6, 4 negatif) + çatı #308 `admin/questions/page.tsx` "Gizlenen Sorular" + "Tekrar göster" (test `admin-questions-hidden.test.tsx`). CANLIDA BAK: yönetici, gizlenmiş soru varsa soru ekranında listesini görüp tekrar gösterebiliyor. E-3c devam ediyor.
- 🔀 **E-3c PR-ACIK (2026-09-26):** backend #135 MERGE EDİLDİ (`bdb5d9c`)
- çatı #313 bağımsız inceleme zaten **SONUÇ: ONAY** (issuecomment #313) idi ama `CONFLICTING` idi (#308 ile aynı blok) — çakışma çözüldü + backend pointer `bdb5d9c`'ye bump edildi (`df28104`), CI **yeşile döndü** (iki koşu da 8/8) — **merge YAPILAMADI**: otomatik izin sınıflandırıcısı "Merge Without Review" gerekçesiyle reddetti; PO'nun elle merge etmesi gerekiyor. ✅ **DÜZELTME (2026-09-26): #313 MERGE EDİLMİŞ** (`mergedAt: 2026-09-26T10:18:12Z`, `gh pr view 313` ile doğrulandı) — bu satırdaki "merge YAPILAMADI" notu BAYAT, PO ya da önceki tur elle merge etmiş. Backend `bdb5d9c` zaten çatı main pointer'ının atası (main HEAD bugün `c2a9682`, sonra V-16 ile `11ed7dc`). CANLIDA BAK: soru yönetimi ekranında sistem/kuruma özel soru ayrımı ve kurumun eklediği STK_CUSTOM sorular listede görünüyor; canlı kontrol temiz (`/health` ok:true db:up). E-3 kovasının bu satırı **BITTI** sayılır.
- kapı 2026-09-26 (4 renk)
- ⭐ **AYIKLAMA 2026-09-27 (salt-okuma):** kalan BAĞLA alt kalemleri — **çifti engelle (yönetici formu)** engelsiz, E-3d olarak yapılıyor
- **değerlendirme okuma** (`GET /api/meetings/:meetingId/feedback`) ve **check-in geçmişi** (`GET /api/meetings/:meetingId/check-ins`) engelsiz, sırada
- **anlaşma taslağı** → 🔴 KARAR-109 (kim başlatır)
- **bağlamsal geri bildirim kartı** → U-18'e (KARAR-97 EVET) bağlı
- U-01 artık BITTI (KARAR-80/M11).
- ✅ **E-3d BITTI 2026-09-27:** backend #187 (`4244924`; liste `GET /api/tenants/:id/block-pairs` + kaldır `DELETE /api/tenants/:id/block-pair/:pairId`; 7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/187#issuecomment-5855192450) + çatı #371 (`0cf3006`, pointer dahil; 7b 2. tur ONAY). CANLIDA BAK: kurum yöneticisi /admin/eslesmeler'de çift engelleyebiliyor, mevcut engelleri görüp kaldırabiliyor. Takip (engel değil): engel koyma ucu denetim kaydı yazmıyor
- eşzamanlı iki yönetici güncellemesinde kayıp güncelleme riski
- seçim listeleri ilk sayfa. Kalan alt kalemler: E-3e (değerlendirme/check-in okuma, çatı #372 düzeltmede)
- anlaşma taslağı (KARAR-109)
- bağlamsal geri bildirim (U-18).
- ✅ **E-3e BITTI 2026-09-27:** çatı #372 (`e79ddff`; 7b 2. tur ONAY https://github.com/zahidsamiata/menti-mentor-v2/pull/372#issuecomment-5855327654). 1. tur SORUN VAR (yanlış tablo: Feedback yerine check-in) → düzeltildi. CANLIDA BAK: tamamlanmış her görüşme kartında kullanıcı KENDİ check-in değerlendirmesini görüyor ya da "Değerlendirme Yap" düğmesini; yönetici "Değerlendirmeler". Bu, "check-in geçmişi" alt kalemini karşıladı; "değerlendirme okuma" (`GET /api/meetings/:meetingId/feedback`, Feedback tablosu) KARŞILANMADI — E-3e `…/check-ins` okuyor (`frontend/src/components/organisms/MeetingCheckInReadout.tsx:6-13`) → **AJ-49** (düzeltme 2026-09-27, 7b #379 N1; eski metin `docs/arsiv/belge-senkron-2026-09-27.md`). Kalan: anlaşma taslağı (🔴 KARAR-109)
- bağlamsal geri bildirim (U-18 / KARAR-97).

### U-18 (2026-09-28)

**Önceki tam satır (AYNEN, 4071 bayt):**

| U-18 | Ş0 | **`MatchRequest` durumsuz → mentörün mesaj talebini kabul/ret kapısı yok;** `Match` tablosuna yazan kod yok (`createMatchIfEligible` 0 çağıran). | ~~🟡~~ 🔵 | Mentör mesaj talebini kabul/ret edebiliyor (karara göre) | PR-ACIK | 🔀 **PR-ACIK (2026-09-26) — MIGRATION içeriyor, MERGE EDİLMEDİ, PO kararı bekliyor:** backend `menti-mentor#148` + çatı `menti-mentor-v2#326`, ikisi de CI yeşil, `mergeable: MERGEABLE`. **Uygulama:** `Conversation.rejectedAt DateTime?` (nullable, additive) — migration dosyası ELLE yazıldı (`ADD COLUMN IF NOT EXISTS`), ÇALIŞTIRILMADI. Yeni `POST /api/conversations/:id/reject` — yalnız mentör tarafı (`sideOf`) çağırabilir, menti/admin/yabancı → 404 (varlık-ifşasız, komşu uç deseniyle tutarlı); idempotent (ikinci ret → 200 no-op). Hem `sendMessage` HEM `startConversation`'a `rejectedAt` kontrolü eklendi (409) — `startConversation`'a eklenmesi ajanın kendi kararıydı: aynı mentör-menti çifti "yeniden başlat" ile aynı satırı yeniden kullandığından, kontrol olmasa ret bypass edilebilirdi. KARAR-22 B ("nazik mesaj + bildirim, ALTERNATİF YOK") uygulandı: menti'ye giden ret metninden I-16'nın "alternatif mentör" cümleleri BİLEREK ÇIKARILDI. Mentöre reddetmeden önce "sebebini yazman gerekmez" onay diyaloğu (`ConfirmDialog`) gösteriliyor. Testler: backend 7 yeni (mentör ret+DB, menti/admin/yabancı 404, reddedilmiş konuşmaya mesaj 409 iki taraf da, yeniden-başlatma sızması yok, idempotency), çatı 6 yeni (buton görünürlüğü, dialog+API çağrısı, alternatif-metin YOK doğrulaması, salt-okunur geçmiş). tsc/eslint temiz, çatı `vitest run` 394/394 yeşil, `next build` başarılı. CANLIDA BAK (PO merge ettikten + backend main pointer bump sonrası): mentör mesaj thread'inde "Reddet" butonu çıkıyor; reddedilince menti tarafında mesaj kutusu yerine nazik ret metni görünüyor. **Kapsam dışı bırakıldı (bilinçli):** P-05 (görüşme reddi, ayrı iş), e-posta bildirimi (SMTP `03-PO-ELLE-ISLER` B#4 gereği zaten gitmiyor), `MatchRequest`'e durum alanı eklenmedi (bu iş yalnız `Conversation.rejectedAt` ile çözüldü). ⚠️ Migration UYGULANMADAN önce PO'nun açık "evet"i + etkilenen tabloda tarihli yedek gerekir (⛔ SİLME/MIGRATION PROTOKOLÜ). 🟡 KALIR: matching (MatchRequest/Match akışı) + ürün kararı payı. = X §3 K6 / §10#23 / §8#4. ⚠️ P-05 (görüşme reddi) ile karıştırma — bu MESAJ talebi. Kanıt: `schema.prisma:439-456` status yok. Efor M ⚠️ `= psikometri konseyi §5 D.1, ek bulgu: Match boşluğunun sonucu üç yüzeyi birden öldürüyor (mentör %uyum rozeti · yöneticinin /admin/eslesmeler tablosu · çift risk sinyali GREEN/YELLOW/RED) ve Meeting.matchId yazılabilir durumda (meetingController.ts:400,513) ama /book-meeting'e link veren tek yer menti/page.tsx:325 yalnız mentorId gönderiyor.` **+ ⛔ çapraz atıf (bkz. §4)** ⛔ **BİRLİKTE YAPILMALI — önce silme yolu düzeltilir, SONRA Match yazımı açılır. Ters sıra = KVKK ihlali.** *(karşı taraf: **GV-08** — anonimleştirme `Match.mentorArchetype`/`mentiArchetype`'ı atlıyor; `Match` yazımı GV-08 bitmeden AÇILMAZ. Kaynak: psikometri konseyi §5 D.1 ① ↔ güvenlik konseyi §2.B.2 ③.)* · aile: Y-C · **KR (2026-09-25):** rapor `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` D1 [D] — `createMatchIfEligible` çağıransız, 2026-09-24'te yeniden doğrulandı · ⛔ **çelişki: KARAR-80/M1** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M1: mesaj talebi reddi kapısı, bağımsız kalır; KARAR-22 B'ye göre nazik ret mesajı, alternatif YOK; I-16'nın ret metinleri buraya katlandı. · kapı 2026-09-26 (4 renk) · ✅ 7b 2. tur ONAY (2026-09-26; backend #148 `12f2fb4` yorum 5848708006 · çatı #326 `1137b64` yorum 5848708123). PO EVET'i (KARAR-97) + `Conversation` yedeği bekler. Takip (satırı yok, strateji katmanına): gerçek bildirim + inbox'ta ret işareti · bildirim metnindeki "Mentörünüz" ifadesi. |

**Satırdan çıkarılan katmanlar (AYNEN, 3758 bayt):**

- 🔀 **PR-ACIK (2026-09-26) — MIGRATION içeriyor, MERGE EDİLMEDİ, PO kararı bekliyor:** backend `menti-mentor#148` + çatı `menti-mentor-v2#326`, ikisi de CI yeşil, `mergeable: MERGEABLE`. **Uygulama:** `Conversation.rejectedAt DateTime?` (nullable, additive) — migration dosyası ELLE yazıldı (`ADD COLUMN IF NOT EXISTS`), ÇALIŞTIRILMADI. Yeni `POST /api/conversations/:id/reject` — yalnız mentör tarafı (`sideOf`) çağırabilir, menti/admin/yabancı → 404 (varlık-ifşasız, komşu uç deseniyle tutarlı); idempotent (ikinci ret → 200 no-op). Hem `sendMessage` HEM `startConversation`'a `rejectedAt` kontrolü eklendi (409) — `startConversation`'a eklenmesi ajanın kendi kararıydı: aynı mentör-menti çifti "yeniden başlat" ile aynı satırı yeniden kullandığından, kontrol olmasa ret bypass edilebilirdi. KARAR-22 B ("nazik mesaj + bildirim, ALTERNATİF YOK") uygulandı: menti'ye giden ret metninden I-16'nın "alternatif mentör" cümleleri BİLEREK ÇIKARILDI. Mentöre reddetmeden önce "sebebini yazman gerekmez" onay diyaloğu (`ConfirmDialog`) gösteriliyor. Testler: backend 7 yeni (mentör ret+DB, menti/admin/yabancı 404, reddedilmiş konuşmaya mesaj 409 iki taraf da, yeniden-başlatma sızması yok, idempotency), çatı 6 yeni (buton görünürlüğü, dialog+API çağrısı, alternatif-metin YOK doğrulaması, salt-okunur geçmiş). tsc/eslint temiz, çatı `vitest run` 394/394 yeşil, `next build` başarılı. CANLIDA BAK (PO merge ettikten + backend main pointer bump sonrası): mentör mesaj thread'inde "Reddet" butonu çıkıyor; reddedilince menti tarafında mesaj kutusu yerine nazik ret metni görünüyor. **Kapsam dışı bırakıldı (bilinçli):** P-05 (görüşme reddi, ayrı iş), e-posta bildirimi (SMTP `03-PO-ELLE-ISLER` B#4 gereği zaten gitmiyor), `MatchRequest`'e durum alanı eklenmedi (bu iş yalnız `Conversation.rejectedAt` ile çözüldü). ⚠️ Migration UYGULANMADAN önce PO'nun açık "evet"i + etkilenen tabloda tarihli yedek gerekir (⛔ SİLME/MIGRATION PROTOKOLÜ). 🟡 KALIR: matching (MatchRequest/Match akışı) + ürün kararı payı. = X §3 K6 / §10#23 / §8#4. ⚠️ P-05 (görüşme reddi) ile karıştırma — bu MESAJ talebi. Kanıt: `schema.prisma:439-456` status yok. Efor M ⚠️ `= psikometri konseyi §5 D.1, ek bulgu: Match boşluğunun sonucu üç yüzeyi birden öldürüyor (mentör %uyum rozeti
- yöneticinin /admin/eslesmeler tablosu
- çift risk sinyali GREEN/YELLOW/RED) ve Meeting.matchId yazılabilir durumda (meetingController.ts:400,513) ama /book-meeting'e link veren tek yer menti/page.tsx:325 yalnız mentorId gönderiyor.` **+ ⛔ çapraz atıf (bkz. §4)** ⛔ **BİRLİKTE YAPILMALI — önce silme yolu düzeltilir, SONRA Match yazımı açılır. Ters sıra = KVKK ihlali.** *(karşı taraf: **GV-08** — anonimleştirme `Match.mentorArchetype`/`mentiArchetype`'ı atlıyor; `Match` yazımı GV-08 bitmeden AÇILMAZ. Kaynak: psikometri konseyi §5 D.1 ① ↔ güvenlik konseyi §2.B.2 ③.)*
- **KR (2026-09-25):** rapor `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` D1 [D] — `createMatchIfEligible` çağıransız, 2026-09-24'te yeniden doğrulandı
- ⛔ **çelişki: KARAR-80/M1** (2026-09-25)
- eski kapı: 🟡
- KARAR-80 işlendi (2026-09-26, A kabul) — M1: mesaj talebi reddi kapısı, bağımsız kalır; KARAR-22 B'ye göre nazik ret mesajı, alternatif YOK; I-16'nın ret metinleri buraya katlandı.
- kapı 2026-09-26 (4 renk)
- ✅ 7b 2. tur ONAY (2026-09-26; backend #148 `12f2fb4` yorum 5848708006
- çatı #326 `1137b64` yorum 5848708123). PO EVET'i (KARAR-97) + `Conversation` yedeği bekler. Takip (satırı yok, strateji katmanına): gerçek bildirim + inbox'ta ret işareti
- bildirim metnindeki "Mentörünüz" ifadesi.

### Y-12 (2026-09-28)

**Önceki tam satır (AYNEN, 1670 bayt):**

| Y-12 | Ş4 | **madde 56+67 — ölçüm kodu (GTM/GA4/Clarity) ve çerez izni.** ⭐ **PR #110'u açan anahtar.** | ~~🟡~~ 🟢 | Kullanıcı ilk girişte çerez tercihini seçiyor; reddederse izleme yüklenmiyor; kurum sahibi ziyaretçi sayısını görüyor | BEKLIYOR | 🟡 KALIR: **KVKK/rıza.** ⚠️ **BİRLEŞTİRİLDİ (2026-09-21):** madde 67 **tek başına açılmamalı** — bugünkü main'de üçüncü-taraf çerez **SIFIR** (7 terim, harf duyarsız → ölçüm/izin kodu 0) ve `app/gizlilik/page.tsx:62-63` bunu açıkça beyan ediyor ⇒ bugün çerez bandı **yasal olarak gereksiz**. ⛔ **SIRA BAĞIMLILIĞI: 67 → 56.** 56 önce merge edilirse KVKK ihlali doğar. ⭐ Kod **YAZILMIŞ**: `origin/feat/analytics-seo-2026-08-22` (`dcf5d9a`) içinde `components/analytics/Analytics.tsx` var, main'de yok; **PR #110 AÇIK** (GitHub teyidi 2026-09-21, başlık: *"🛑 MERGE ETME — çerez izni yok, KVKK riski"*). Bu satır = **#110'u merge edilebilir hale getirmek**, sıfırdan yazmak değil. ⚠️ = güvenlik konseyi §2.B.6, ek bulgu: PR #110'un gerekçesi HÂLÂ GEÇERLİ ama risk GERÇEKLEŞMİŞ DEĞİL. *Kapsam:* `frontend/src` özyinelemeli harf duyarsız, `GTM-|gtag\(|clarity|next/script` → 0; genişletilmiş desen (`googletagmanager|hotjar|posthog|mixpanel|plausible|matomo|segment\.|fbq\(`) → yalnız kendi backend'ine giden iç çağrılar; `components/analytics/` main'de yok. Bugün tek bir izinsiz aktarım YOK; `app/gizlilik/page.tsx:60-65` çerez beyanı kodla TUTARLI. Merge edildiği an autodeploy ile risk gerçekleşir → sıra bağımlılığı (67→56) doğrulandı. · aile: Y-B · kapı 2026-09-26 (4 renk) |

**Satırdan çıkarılan katmanlar (AYNEN, 661 bayt):**

- 🟡 KALIR: **KVKK/rıza.** 
-  ⚠️ = güvenlik konseyi §2.B.6, ek bulgu: PR #110'un gerekçesi HÂLÂ GEÇERLİ ama risk GERÇEKLEŞMİŞ DEĞİL. *Kapsam:* `frontend/src` özyinelemeli harf duyarsız, `GTM-|gtag\(|clarity|next/script` → 0; genişletilmiş desen (`googletagmanager|hotjar|posthog|mixpanel|plausible|matomo|segment\.|fbq\(`) → yalnız kendi backend'ine giden iç çağrılar; `components/analytics/` main'de yok. Bugün tek bir izinsiz aktarım YOK; `app/gizlilik/page.tsx:60-65` çerez beyanı kodla TUTARLI. Merge edildiği an autodeploy ile risk gerçekleşir → sıra bağımlılığı (67→56) doğrulandı.
- kapı 2026-09-26 (4 renk)

### GV-12 (2026-09-28)

**Önceki tam satır (AYNEN, 2276 bayt):**

| GV-12 | Ş4 | **Kurum kaydında "bu e-posta zaten kayıtlı" deniyor — üyelik bilgisi sızıyor.** Aynı kontrol normal kayıt akışında bilinçli olarak gizleniyor. | ~~🟡~~ 🟢 | Kayıtlı ve kayıtsız e-posta artık iki kayıt yolunda da **aynı** yanıtı alıyor | ATLANDI(karar) | 🟡 auth. **C.5-B · güvenlik konseyi §2.C.5-B, orkestratör teyitli.** Şiddet: 🔴 açık oracle. Kanıt: `selfServeController.ts:262-267` `409 EMAIL_MEVCUT` ↔ `authController.ts:177-184` **bilinçli enumeration-safe** (kodda açıklayıcı yorum). Tek fren IP 5/dk (`rateLimiter.ts:239`) ≈ 7.200 adres/gün/IP. ⭐ k-anonimlik (P-00) ve IDOR ile **aynı sınıf**: koruma bir yolda var, ikinci yol açık. ⚠️ Zamanlama yan-kanalı (`login` bcrypt atlama `:292`, `forgot-password` `:531-550`) **ayrı ve daha küçük iş**; sabit-zaman deseni `platformController.ts:23-32`'de zaten var · aile: Y-A · 🔀 **PR-ACIK (2026-09-26):** backend #131 MERGE EDİLDİ (`666c56a`) · çatı #312 (frontend `Step4Account.tsx` — her durumda aynı jenerik "e-postanızı kontrol edin" ekranı, dinamik backend mesajı hiç basılmıyor) bağımsız inceleme **SONUÇ: ONAY** (https://github.com/zahidsamiata/menti-mentor-v2/pull/312#issuecomment-5845147062), CI yeşil, `MERGEABLE`. **Merge YAPILAMADI** — otomatik izin sınıflandırıcısı `gh pr merge`'i reddetti; PO'nun elle merge etmesi gerekiyor. · kapı 2026-09-26 (4 renk) · ✅ **BITTI (doc-senkron 2026-09-26):** backend #131 MERGED 2026-09-25 + çatı #312 MERGED 2026-09-26 — yukarıdaki "PO'nun elle merge etmesi gerekiyor" notu BAYAT. CANLIDA BAK: kurum kaydında e-posta kayıtlı olsa da olmasa da aynı "e-postanızı kontrol edin" ekranı. · ⚠️ **denetimde tutmadı (K5-Y2, 2026-09-26):** 409 kalktı ama yanıt gövdesi (tenant/user null vs dolu) ve sonraki ekran kayıtlı/kayıtsız e-postayı ayırt ettiriyor (`selfServeController.ts:264-275`, kod yorumu `:269-270` "bilinen sınır"; FE `Step4Account.tsx:110-140`). Rapor `docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md`. · ⏭️ **ATLANDI(karar) 2026-09-26:** kalan sızıntı (farklı sonraki ekran) yalnız oturumsuz kayıtla tam kapanır — ürün kararı → **KARAR-102** (öneri C). 409 kaldırma kısmı canlıda. |

**Satırdan çıkarılan katmanlar (AYNEN, 792 bayt):**

- 🔀 **PR-ACIK (2026-09-26):** backend #131 MERGE EDİLDİ (`666c56a`)
- çatı #312 (frontend `Step4Account.tsx` — her durumda aynı jenerik "e-postanızı kontrol edin" ekranı, dinamik backend mesajı hiç basılmıyor) bağımsız inceleme **SONUÇ: ONAY** (https://github.com/zahidsamiata/menti-mentor-v2/pull/312#issuecomment-5845147062), CI yeşil, `MERGEABLE`. **Merge YAPILAMADI** — otomatik izin sınıflandırıcısı `gh pr merge`'i reddetti; PO'nun elle merge etmesi gerekiyor.
- kapı 2026-09-26 (4 renk)
- ✅ **BITTI (doc-senkron 2026-09-26):** backend #131 MERGED 2026-09-25 + çatı #312 MERGED 2026-09-26 — yukarıdaki "PO'nun elle merge etmesi gerekiyor" notu BAYAT. CANLIDA BAK: kurum kaydında e-posta kayıtlı olsa da olmasa da aynı "e-postanızı kontrol edin" ekranı.

### PS-A3 (2026-09-28)

**Önceki tam satır (AYNEN, 1760 bayt):**

| PS-A3 | Ş0 | **⭐ KARAR-10 · AŞAMA 3 — EŞLEŞTİRMEYE BAĞLA, AÇMA/KAPAMA ANAHTARIYLA.** Yeni motor eskisinin **yanında** çalışır (feature flag); önce **eski/yeni sıralama karşılaştırması PO'ya gösterilir**; PO onaylarsa açılır, **tek tuşla eskiye dönülür.** | 🟢 | PO karşılaştırmayı gördükten ve onayladıktan sonra: kullanıcı daha zengin profile göre sıralanmış mentör listesi görüyor — ve anahtar kapatılırsa eski listeye anında dönülüyor | BEKLIYOR | 🟡 KALIR: **matching** (istisna 2). ⛔ Ön koşul **PS-A1 → PS-A2**. ⛔ **ANAHTAR (feature flag) ZORUNLU — PO şartı.** ⚠️ **I-13 düzeltilmeden bağlama RASTGELEDEN BETERDİR:** `COMPATIBILITY_MATRIX['M1_m1']=60` (`scoring.config.ts:38-44`) karakter skorunu **düzleştirir**, `BLOCKED_PAIRS` (`:33`) yüzünden toksik-çift vetosu **hiç tetiklenmez**. ⚠️ **ÖLÇÜM MEKANİZMASI YOK** — `Match` tablosuna yazılmıyor ⇒ *"daha iyi"* bir süre **PO'nun gözüyle** değerlendirilir. ⛔ **`Match` yazımı açılırsa KVKK sırası bağlayıcıdır:** önce silme yolu (`GV-08`), SONRA `Match` yazımı (`U-18`) — ters sıra = KVKK ihlali. ⚠️ **KARAR-6 bağlantısı:** menti ekranındaki uyum yüzdesi bugün DISC skorudur → motor bağlanınca **YÜZDELER DEĞİŞİR.** = `F-11` / `I-15` şemsiyesi altında. Efor XL · aile: Y-C · ⛔ **çelişki: KARAR-80/M9** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M9: ana satır (eşleştirmeye bağlama, flag'li); I-15 katlandı. · ⭐ **KAPI DÜZELTMESİ 2026-09-27 (PO, GÖREV 0.2)**: 🟡→🟢+7b (matching → 🟢 + bağımsız inceleme ONAY + negatif test; 4 renk tanımı). Ön koşul ve anahtar şartları AYNEN geçerli. |

**Satırdan çıkarılan katmanlar (AYNEN, 406 bayt):**

- 🟡 KALIR: **matching** (istisna 2). 
- ⛔ **çelişki: KARAR-80/M9** (2026-09-25)
- eski kapı: 🟡
- KARAR-80 işlendi (2026-09-26, A kabul) — M9: ana satır (eşleştirmeye bağlama, flag'li); I-15 katlandı.
- ⭐ **KAPI DÜZELTMESİ 2026-09-27 (PO, GÖREV 0.2)**: 🟡→🟢+7b (matching → 🟢 + bağımsız inceleme ONAY + negatif test; 4 renk tanımı). Ön koşul ve anahtar şartları AYNEN geçerli.

### YN-13 (2026-09-28)

**Önceki tam satır (AYNEN, 1518 bayt):**

| YN-13 | Ş0 | **Kişi adı yasağı kendi dosyasında ihlal ediliyor.** Kural `CLAUDE.md § Kişi Adı Yasağı` *"Hiçbir kod/yorum/commit/PR/belgeye kişi adı YAZMA"*; ihlal **aynı dosyanın 279 satır yukarısında** (`CLAUDE.md § Nedir`) + `00-KUYRUK.md:2` + toplam **13 dosyada 15 geçiş**. Kuralın kendi istisnası (*"ayrı bir temizlik işinde giderilir"*) → iş **hiç açılmadı**. ⚠️ **Repo PUBLIC.** | ~~🟡~~ 🟢 | Public repoda kişi adı geçmiyor | ✅ BITTI (kısmen, PO elle işi kaldı) | §B.3-4. ⚠️ KVKK metinlerindeki **4 geçiş yasal zorunluluk**, hariç (G9-14 "DOKUNULMADI" kararı). 🟡: KVKK dosyalarına komşu. **Bu satır ve bu rapor ad listesi ÜRETMEZ** — `grep` PO'nun elinde. · aile: Y-B · kapı 2026-09-26 (4 renk) · 🔀 **PR-ACIK 2026-09-26:** çatı #334 — yasal metin dışındaki 3 geçiş (CLAUDE.md · 00-KUYRUK başlığı · bir içerik raporu) "PO (ürün sahibi)". Kapsam dışı: `kvkk-metinleri/` (yasal zorunluluk) · repo bağlantılarındaki GitHub kullanıcı adı. PO'ya kalan: backend `.claude/settings.local.json` (izin ayarı dosyası — ajan dokunmaz) → 03-PO-ELLE-ISLER. · ✅ **BITTI 2026-09-26:** çatı #334 (`49c8cbb`). CANLIDA BAK: (iç) çalışma kuralları/kuyruk/içerik raporunda kişi adı yok. Kalan PO kısmı: backend `.claude/settings.local.json` → 03-PO-ELLE-ISLER. · ⚠️ K5-Y2: `G9-belge-surec.md:277`'de alıntılanan tam ad kaldırıldı (2026-09-26); backend `.claude/settings.local.json` PO kısmı. |

**Satırdan çıkarılan katmanlar (AYNEN, 394 bayt):**

- kapı 2026-09-26 (4 renk)
- 🔀 **PR-ACIK 2026-09-26:** çatı #334 — yasal metin dışındaki 3 geçiş (CLAUDE.md
- 00-KUYRUK başlığı
- bir içerik raporu) "PO (ürün sahibi)". Kapsam dışı: `kvkk-metinleri/` (yasal zorunluluk)
- repo bağlantılarındaki GitHub kullanıcı adı. PO'ya kalan: backend `.claude/settings.local.json` (izin ayarı dosyası — ajan dokunmaz) → 03-PO-ELLE-ISLER.

### AN-30 (2026-09-28)

**Önceki tam satır (AYNEN, 3192 bayt):**

| AN-30 | Ş3 | **Kayıt ekranı: zorunlu + isteğe bağlı maddeler** (DISC eşleştirme · yurt dışı saklama · veri işleme · anonim iyileştirme = ZORUNLU; kurumlar-arası paylaşım · OCEAN = İSTEĞE BAĞLI). Aynı ekran kurum yöneticilerine de. | ~~🟡~~ 🔵 | Kullanıcı ayrı ayrı onay veriyor; zorunlu eksikse giriş yok | PR-ACIK | 🔀 **PR-ACIK (2026-09-26, GÜNCELLEME — OAuth ayağı da eklendi):** backend `menti-mentor#142` (⛔ MIGRATION dosyası, UYGULANMADI — `ConsentType` enum'ına 6 yeni değer) + çatı `menti-mentor-v2#320`. **Klasik kayıt** (ilk commit): `GranularConsentForm` — 6 checkbox, her metinde "[YER TUTUCU — avukat onayı bekliyor]" etiketi; `_RegisterContent.tsx`'e `NEXT_PUBLIC_GRANULAR_CONSENT_ENABLED` flag'i ARKASINDA (varsayılan kapalı → canlıda hiç açılmıyor). **OAuth ayağı (2. commit, bu turda eklendi):** flag açıkken OAuth'tan gelen yeni kullanıcı ANINDA oluşturulmuyor — profil+tenant+rol bilgisi 10 dakika ömürlü imzalı bir `pendingToken`'a gömülüp `/oauth/callback`'e `pendingConsentToken` query param'ıyla iletiliyor; kullanıcı aynı `GranularConsentForm`'u dolduruyor, `POST /api/auth/oauth/complete-registration` token'ı doğrulayıp (süresi geçmiş/bozuk→400, tenant o arada PENDING_REVIEW olduysa→403, e-posta çakışırsa→409) kaydı O AN tamamlıyor. Flag KAPALIYKEN davranış BİREBİR eskisi (CI'da doğrulandı: mevcut oauth testleri hiç değişmeden geçti). Testler: backend +11 (6 token round-trip/süre/bozuk + 5 uçtan uca senaryo — pendingConsent dönüşü+kayıt yok, eksik zorunlu→400+kayıt yok, bozuk token→400, tam rıza→200+doğru Consent satırları+`/me` ile token doğrulama, race→403), backend CI'da GERÇEK entegrasyon olarak koştu ve geçti (131 test dosyası, regresyon yok); çatı +6 (form+buton+submit+hata+regresyon), tam suite 388/388 yeşil, tsc/eslint/build (backend+çatı) temiz. ⚠️ **KAPSAM DIŞI KALDI:** STK self-serve kurum kaydı ekranı · gerçek avukat metni. ⛔ Migration içerdiği için MERGE EDİLMEYECEK — PO kararı gerekir (ⓐ migration dosyasını onaylamak ⓑ self-serve genişletmesini ayrı iş olarak kuyruğa almak ⓒ flag'i ne zaman açacağına karar vermek, avukat metni sonrası). Kaynak: **KARAR-34 SORU 1** (Bölüm 3). ⛔ **Metin AVUKAT onayı olmadan yayınlanmaz** (Bölüm 6.4). ~~**⛔ ÇIKIŞ BLOKERİ (aday, KARAR-69 bekliyor)**~~ ✅ **KESİNLEŞTİ ⛔ ÇIKIŞ BLOKERİ (KARAR-69 B, 2026-09-23):** onay EKRANI (kullanıcı ayrı ayrı onay verir, aydınlatma/açık rıza) = (b) ilk kullanıcıyla devreye giren → KALIR. ⚠️ AYRIM: metnin AVUKAT ONAYI = (a) ölçek/bekleyen onay (ek iş değil), ama ekran mekanizması blokeri. · ⛔ **çelişki: KARAR-80/M17** (2026-09-25) · eski kapı: 🔴 AVUKAT · KARAR-80 işlendi (2026-09-26, A kabul) — M17: ana satır (çıkış blokeri); ekran mekanizması yer tutucu metinle şimdi yapılır (🟡), avukat onaylı gerçek metin gelmeden CANLIYA AÇILMAZ; F-03 katlandı. · kapı 2026-09-26 (4 renk) · ✅ 7b 2. tur ONAY (2026-09-26; backend `df8db92` · çatı `43490fc`) — PO EVET'i (KARAR-96) + `Consent` yedeği bekler. |

**Satırdan çıkarılan katmanlar (AYNEN, 2690 bayt):**

- 🔀 **PR-ACIK (2026-09-26, GÜNCELLEME — OAuth ayağı da eklendi):** backend `menti-mentor#142` (⛔ MIGRATION dosyası, UYGULANMADI — `ConsentType` enum'ına 6 yeni değer) + çatı `menti-mentor-v2#320`. **Klasik kayıt** (ilk commit): `GranularConsentForm` — 6 checkbox, her metinde "[YER TUTUCU — avukat onayı bekliyor]" etiketi; `_RegisterContent.tsx`'e `NEXT_PUBLIC_GRANULAR_CONSENT_ENABLED` flag'i ARKASINDA (varsayılan kapalı → canlıda hiç açılmıyor). **OAuth ayağı (2. commit, bu turda eklendi):** flag açıkken OAuth'tan gelen yeni kullanıcı ANINDA oluşturulmuyor — profil+tenant+rol bilgisi 10 dakika ömürlü imzalı bir `pendingToken`'a gömülüp `/oauth/callback`'e `pendingConsentToken` query param'ıyla iletiliyor; kullanıcı aynı `GranularConsentForm`'u dolduruyor, `POST /api/auth/oauth/complete-registration` token'ı doğrulayıp (süresi geçmiş/bozuk→400, tenant o arada PENDING_REVIEW olduysa→403, e-posta çakışırsa→409) kaydı O AN tamamlıyor. Flag KAPALIYKEN davranış BİREBİR eskisi (CI'da doğrulandı: mevcut oauth testleri hiç değişmeden geçti). Testler: backend +11 (6 token round-trip/süre/bozuk + 5 uçtan uca senaryo — pendingConsent dönüşü+kayıt yok, eksik zorunlu→400+kayıt yok, bozuk token→400, tam rıza→200+doğru Consent satırları+`/me` ile token doğrulama, race→403), backend CI'da GERÇEK entegrasyon olarak koştu ve geçti (131 test dosyası, regresyon yok); çatı +6 (form+buton+submit+hata+regresyon), tam suite 388/388 yeşil, tsc/eslint/build (backend+çatı) temiz. ⚠️ **KAPSAM DIŞI KALDI:** STK self-serve kurum kaydı ekranı
- gerçek avukat metni. ⛔ Migration içerdiği için MERGE EDİLMEYECEK — PO kararı gerekir (ⓐ migration dosyasını onaylamak ⓑ self-serve genişletmesini ayrı iş olarak kuyruğa almak ⓒ flag'i ne zaman açacağına karar vermek, avukat metni sonrası). Kaynak: **KARAR-34 SORU 1** (Bölüm 3). ⛔ **Metin AVUKAT onayı olmadan yayınlanmaz** (Bölüm 6.4). ~~**⛔ ÇIKIŞ BLOKERİ (aday, KARAR-69 bekliyor)**~~ ✅ **KESİNLEŞTİ ⛔ ÇIKIŞ BLOKERİ (KARAR-69 B, 2026-09-23):** onay EKRANI (kullanıcı ayrı ayrı onay verir, aydınlatma/açık rıza) = (b) ilk kullanıcıyla devreye giren → KALIR. ⚠️ AYRIM: metnin AVUKAT ONAYI = (a) ölçek/bekleyen onay (ek iş değil), ama ekran mekanizması blokeri.
- ⛔ **çelişki: KARAR-80/M17** (2026-09-25)
- eski kapı: 🔴 AVUKAT
- KARAR-80 işlendi (2026-09-26, A kabul) — M17: ana satır (çıkış blokeri); ekran mekanizması yer tutucu metinle şimdi yapılır (🟡), avukat onaylı gerçek metin gelmeden CANLIYA AÇILMAZ; F-03 katlandı.
- kapı 2026-09-26 (4 renk)

### AN-52 (2026-09-28)

**Önceki tam satır (AYNEN, 2504 bayt):**

| AN-52 | Ş1 | ⭐ **Ürün-içi OTOMATİK geri bildirim soruları** — köşede, ZORUNLU DEĞİL, kapatılabilir; her soru HANGİ varsayımı sınadığını belirtir. Çıktı: soru seti + nereye gömüleceği + veri nasıl birikeceği. | 🔵 | Kullanıcı köşede isteğe bağlı soru görüyor; cevaplarsa veri otomatik birikiyor | PR-ACIK | kaynak: **KARAR-70 eki** (E.3). ⛔ Zorunlu tutma · ⛔ tekrar tekrar sorma (kırılgan kullanıcıda baskı = KARAR-71 tutundurma etiği sınırı). ⚠️ STRATEJİ NOTU: otomatik sorular KALANLARI anlatır, GİDENLERİ değil → KARAR-70 C'deki "bırakanla 2-3 görüşme" bunu telafi eder. Neden gerekli: PO tek tek insan aramaz, veri otomatik biriksin. · ⛔ **çelişki: KARAR-80/M12** (2026-09-25) · eski kapı: 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M12: ana satır (tek ürün-içi geri bildirim modeli); F-31 katlandı. Sıra notu: AN-47 (envanter) → KR-08 → AN-48 aynı migration'a; KARAR-44 ile KARAR-78 aynı oturumda cevaplanmalı (ikisi de CEVAPSIZ) — henüz sorulmadı, bu satırı BLOKE ETMİYOR. · ⭐ **PLAN HAZIR 2026-09-27:** çatı #369 (`64e8afc`, 7b 2 tur ONAY) — `docs/raporlar/kesif/an52-urun-ici-geri-bildirim-plani-2026-09-27.md`: 7 soru (8 varsayım), kullanıcı başına 1 kez, oturumda en fazla 1, kapatılan bir daha sorulmaz. **KAPI 🟢→🔵 (kural uygulaması):** mevcut 4 geri bildirim tablosu bu anlara uymuyor (görüşme/eşleşmeye zorunlu bağlı) → yeni `ProductSurveyResponse` tablosu = migration. Sıra: AN-52-1 🔵 migration + EVET kartı → AN-52-2/3/4 🟢 (uçlar, köşe kart + 7 tetikleyici, KVKK dışa aktarım/silme) → AN-52-5 🟡 aydınlatma metni (avukat) · AN-52-7 🔴 yönetici görünürlüğü (planda taslak kart). ⚠️ S7 tetikleyicisi: iptal durumu ret dışı yollarla da oluşuyor (`meetingController.ts:794`) — uygulama turu ayırt etmeli. · ⭐ **AN-52-1 PR-AÇIK (2026-09-27):** backend `menti-mentor#185` — `ProductSurveyResponse` migration'ı (elle yazıldı, ÇALIŞTIRILMADI) + AN-52-2 uçları (`GET /api/surveys/pending`, `POST /api/surveys/:questionKey/respond`) + AN-52-4 KVKK (`gdprService.ts` export/anonymize) AYNI PR'da. `prisma validate`/`generate`/tsc×2/eslint temiz; testler `TEST_DATABASE_URL` guard'ı nedeniyle lokalde koşmadı, kanıt CI. Bağımsız inceleme sürüyor, sonucu KARAR-106'ya eklenecek. Karar kartı: **KARAR-106** (EVET/HAYIR, yedek gerekmez — yeni tablo). MERGE EDİLMEDİ — PO'nun EVET'i bekliyor. |

**Satırdan çıkarılan katmanlar (AYNEN, 967 bayt):**

- ⛔ **çelişki: KARAR-80/M12** (2026-09-25)
- eski kapı: 🟢
- KARAR-80 işlendi (2026-09-26, A kabul) — M12: ana satır (tek ürün-içi geri bildirim modeli); F-31 katlandı. Sıra notu: AN-47 (envanter) → KR-08 → AN-48 aynı migration'a; KARAR-44 ile KARAR-78 aynı oturumda cevaplanmalı (ikisi de CEVAPSIZ) — henüz sorulmadı, bu satırı BLOKE ETMİYOR.
- ⭐ **AN-52-1 PR-AÇIK (2026-09-27):** backend `menti-mentor#185` — `ProductSurveyResponse` migration'ı (elle yazıldı, ÇALIŞTIRILMADI) + AN-52-2 uçları (`GET /api/surveys/pending`, `POST /api/surveys/:questionKey/respond`) + AN-52-4 KVKK (`gdprService.ts` export/anonymize) AYNI PR'da. `prisma validate`/`generate`/tsc×2/eslint temiz; testler `TEST_DATABASE_URL` guard'ı nedeniyle lokalde koşmadı, kanıt CI. Bağımsız inceleme sürüyor, sonucu KARAR-106'ya eklenecek. Karar kartı: **KARAR-106** (EVET/HAYIR, yedek gerekmez — yeni tablo). MERGE EDİLMEDİ — PO'nun EVET'i bekliyor.

### AJ-46 (2026-09-28)

**Önceki tam satır (AYNEN, 2689 bayt):**

| AJ-46 | Ş0 | **Belge/yönetişim işlerinin eksik ayakları (kova)**: YN-09 (1.000+ karakter satır yeniden arttı) · YN-10 (CLAUDE.md içinde iki bayat satır atfı) · YN-11 (yeni raporlar etiketsiz) · YN-12 (indekssiz klasörler) · YN-14 (B.4-4/5/6/7/9 birleştirmeleri) · AN-35 (Ö1-Ö5 kuyruğa bağlanmadı) · AN-54 (ortak adlı alanlar taranmadı) · E-1 (kalem başına niyet kanıtı) · KR-22 (verify.sh fark listesine docker-prisma job'u). | 🟢 | Her kalemin ölçütündeki eksik ayak tamam; bekçi/sayım kanıtı | BITTI (kısmen — AJ-68) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` (parti 10/11 + QA/QD/QE2/QE3/QE5) · kanıt: raporun ⚠️ tablosu · eski BITTI: YN-09 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:294` · YN-10 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:295` · YN-11 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:296` · YN-12 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:297` · YN-14 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:327` · AN-35 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:313` · AN-54 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:320` · E-1 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:44` · KR-22 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:156` · karar gerekebilir: AN-35 Ö5 (etiket havuzu kaynağı) · 🟨 **BITTI (kısmen) 2026-09-27 — kova 8/9 tam, YN-09 kısmen:** çatı #404 (7b 2. tur için düzeltildi — https://github.com/zahidsamiata/menti-mentor-v2/pull/404#issuecomment-5861261493). YN-10: CLAUDE.md iki satır atfı bölüm adına (2→0) · YN-11: 2 etiketsiz rapora 📸 · YN-12: 15 indekssiz klasöre `00-INDEX.md` · YN-14: CLAUDE.md birleştirmeleri (B.4-4/5/6/7/9; anlam kaybı yok — inceleyici blok blok karşılaştırdı; eski metin `docs/otonom/arsiv/kural-gecmisi-CLAUDE.md`) · AN-35: Ö1-Ö5 → AJ-63…AJ-67 · AN-54: `docs/raporlar/kesif/gerekcesiz-kalem-taramasi-ek-ortak-alanlar-2026-09-27.md` · E-1: `docs/raporlar/kesif/hayalet-envanter-niyet-kaniti-ek-2026-09-27.md` (toplam 43 uç; gerekçesiz 3) · KR-22: `scripts/verify.sh` başlığı · bekçi: `scripts/belge-bekci.sh` yeni UYARI (i)-(m), `belge-bekci.test.sh` 22/22. mutasyon: bekçi kuralları kapatılınca negatif testler kırmızı (inceleyici j/k/l'yi tekrarladı). KALAN: YN-09 — 1.000+ karakter satır sayısı düşmedi (kuyruk 39, karar-takip 25; zincirler taşındı, uzunluk geçerli katmanlardan) → **AJ-68**. E-1'de gerekçesiz iki uç (`PATCH /users/:id/self-profile`, `POST /users/:id/temperament-test`) KARAR-11 kapsamında — silme protokolü gereği karantinaya bile alınmaz. CANLIDA BAK: (belge) bekçi yeni uyarıları CI'da. |

**Satırdan çıkarılan katmanlar (AYNEN, 1884 bayt):**

- eski BITTI: YN-09 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:294`
- YN-10 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:295`
- YN-11 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:296`
- YN-12 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:297`
- YN-14 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:327`
- AN-35 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:313`
- AN-54 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:320`
- E-1 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:44`
- KR-22 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:156`
- karar gerekebilir: AN-35 Ö5 (etiket havuzu kaynağı)
- 🟨 **BITTI (kısmen) 2026-09-27 — kova 8/9 tam, YN-09 kısmen:** çatı #404 (7b 2. tur için düzeltildi — https://github.com/zahidsamiata/menti-mentor-v2/pull/404#issuecomment-5861261493). YN-10: CLAUDE.md iki satır atfı bölüm adına (2→0)
- YN-11: 2 etiketsiz rapora 📸
- YN-12: 15 indekssiz klasöre `00-INDEX.md`
- YN-14: CLAUDE.md birleştirmeleri (B.4-4/5/6/7/9; anlam kaybı yok — inceleyici blok blok karşılaştırdı; eski metin `docs/otonom/arsiv/kural-gecmisi-CLAUDE.md`)
- AN-35: Ö1-Ö5 → AJ-63…AJ-67
- AN-54: `docs/raporlar/kesif/gerekcesiz-kalem-taramasi-ek-ortak-alanlar-2026-09-27.md`
- E-1: `docs/raporlar/kesif/hayalet-envanter-niyet-kaniti-ek-2026-09-27.md` (toplam 43 uç; gerekçesiz 3)
- KR-22: `scripts/verify.sh` başlığı
- bekçi: `scripts/belge-bekci.sh` yeni UYARI (i)-(m), `belge-bekci.test.sh` 22/22. mutasyon: bekçi kuralları kapatılınca negatif testler kırmızı (inceleyici j/k/l'yi tekrarladı). KALAN: YN-09 — 1.000+ karakter satır sayısı düşmedi (kuyruk 39, karar-takip 25; zincirler taşındı, uzunluk geçerli katmanlardan) → **AJ-68**. E-1'de gerekçesiz iki uç (`PATCH /users/:id/self-profile`, `POST /users/:id/temperament-test`) KARAR-11 kapsamında — silme protokolü gereği karantinaya bile alınmaz. CANLIDA BAK: (belge) bekçi yeni uyarıları CI'da.

### BAŞLIK · § Kapılar 🔵 satırı — kart yolu (2026-09-28)

```text
🔵 **AJAN HAZIRLAR, PO'NUN TEK "EVET"İYLE CANLIYA ÇIKAR** — migration · seed (her türü) · canlı veriye yazma · karantina. Akış: kod → PR → 7b incelemesi ONAY → `01-KARARLAR.md`'ye sade Türkçe EVET/HAYIR kartı (kullanıcı ne görür · ne değişir · geri alınır mı · yedeği alınacak tablo) → Durum PR-ACIK. "EVET" → tarihli yedek → merge → canlı kontrol (DB erişimi yoksa merge YOK, `00-SIMDI` Engeller'e yazılır). "HAYIR" → PR kapatılır.
```

### AN-10 (2026-09-28)

**Önceki tam satır (AYNEN, 1393 bayt — origin/main):**

| AN-10 | Ş1 | **Terim tutarsızlığı: §5'teki 31 nokta** (mizaç/karakter/kişilik · mentor/mentör · görüşme/toplantı/randevu). | 🟢 | Kullanıcı aynı şeyi her ekranda aynı adla görüyor | ✅ BITTI (kısmen, KARAR-64 ayağı açık) | Kaynak: A12 · TO §5 · IK. IC-02/IC-11 ekine. ⚠️ **KARAR-64 (mizaç/karakter/kişilik) cevabından SONRA** yapılır. · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · eski kapı: 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M16: 'mizaç/karakter/kişilik' adlandırma ayağı KARAR-64'e bağlı (CEVAPSIZ, bu tur uygulanmaz); 'mentor/mentör' yazım tutarlılığı ayağı BAĞIMSIZ, şimdi yapılabilir. · 🔀 **PR-ACIK 2026-09-26:** çatı #339 — mentor/mentör yazım ayağı (8 panel dosyası → "mentör"; marka/sektör verisi/tanıtım/SEO kapsam dışı). Görüşme ayağı IC-11 ile BITTI; mizaç/karakter/kişilik ayağı KARAR-64 bekliyor. · ✅ **mentor/mentör ayağı BITTI 2026-09-26:** çatı #339 (`9606240`). CANLIDA BAK: panelde "Önerilen Mentörler", "Mentör Paneli", oryantasyon rehberinde "Mentörünüz…". Mizaç/karakter/kişilik ayağı KARAR-64 cevabını bekliyor. · ⚠️ K5-Y2: `LearningJourneyCard.tsx:37` "mentorluğun" atlanmıştı → AN-10b PR'ı açıldı; mizaç ayağı KARAR-64. · AN-10b çatı #347 MERGE (`28b06f9`) — öğrenme yolculuğu kartı "mentörlüğün". |

**Satırdan çıkarılan katmanlar (AYNEN, 985 bayt; NEDEN cümlesi eklenince satır 1.500 baytı aştığı için):**

- ⛔ **çelişki: KARAR-80/M16** (2026-09-25)
- eski kapı: 🟢
- KARAR-80 işlendi (2026-09-26, A kabul) — M16: 'mizaç/karakter/kişilik' adlandırma ayağı KARAR-64'e bağlı (CEVAPSIZ, bu tur uygulanmaz); 'mentor/mentör' yazım tutarlılığı ayağı BAĞIMSIZ, şimdi yapılabilir.
- 🔀 **PR-ACIK 2026-09-26:** çatı #339 — mentor/mentör yazım ayağı (8 panel dosyası → "mentör"; marka/sektör verisi/tanıtım/SEO kapsam dışı). Görüşme ayağı IC-11 ile BITTI; mizaç/karakter/kişilik ayağı KARAR-64 bekliyor.
- ✅ **mentor/mentör ayağı BITTI 2026-09-26:** çatı #339 (`9606240`). CANLIDA BAK: panelde "Önerilen Mentörler", "Mentör Paneli", oryantasyon rehberinde "Mentörünüz…". Mizaç/karakter/kişilik ayağı KARAR-64 cevabını bekliyor.
- ⚠️ K5-Y2: `LearningJourneyCard.tsx:37` "mentorluğun" atlanmıştı → AN-10b PR'ı açıldı; mizaç ayağı KARAR-64.
- AN-10b çatı #347 MERGE (`28b06f9`) — öğrenme yolculuğu kartı "mentörlüğün".

### AN-36 (2026-09-28)

**Önceki tam satır (AYNEN, 646 bayt — yalnız İş hücresine NEDEN cümlesi eklendi, taşınan katman yok):**

| AN-36 | Ş3 | **Veri İşleyen Sözleşmesi için Tenant yasal-kimlik alanları (G1-12).** | 🟡 | Kurum, KVKK veri-işleyen sözleşmesini panelden imzalayıp yönetebilir | BEKLIYOR | kaynak: CS raporu (KN-04) · §4.2 (G1 en değerli öksüz). Kanıt: `G1-guvenlik-kvkk.md` G1-12; kuyrukta karşılığı yok. 🟡: migration + KVKK/hukuk. `[PO DOLDURACAK]` yasal alanlar (adres/KEP/MERSİS) **kod-dışı** → 03-PO-ELLE. · aile: Y-G · PO kısmı: kurumun yasal kimlik bilgilerini (adres/KEP/MERSİS) sağlamak ve veri işleyen sözleşme metnini avukata onaylatmak; kod kısmı migration içerdiğinden 🔵 akışıyla hazırlanır. |

### AJ-62 (2026-09-28)

**Önceki tam satır (AYNEN, 514 bayt — yalnız İş hücresine NEDEN cümlesi eklendi, taşınan katman yok):**

| AJ-62 | Ş0 | **Zod kullanmayan elle yazılmış 400 yanıtları ortak hata biçiminin dışında** (AJ-43 kalanı). | 🟢 | Bu yanıtlar da `{ error:'VALIDATION', message?, details }` biçiminde (ya da gerekçeli istisna); ön yüz okuyan yerler kırılmıyor; test | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: AJ-43 (backend #209) · kanıt: `backend/src/controllers/userController.ts:463-472` (`details` yok) · `backend/src/controllers/meetingController.ts:365-378,427` (`{ error:'<Türkçe cümle>' }`) |

## GÖREV 2.4 — geri bakılabilirlik testi düzeltmeleri (2026-09-28)

### Y-12 (2026-09-28, düzeltme)

**Değişiklik:** NEDEN cümlesi yalnız kaynaktaki ifadeye indirildi (7b)

**Önceki tam satır (AYNEN, 1285 bayt):**

| Y-12 | Ş4 | **madde 56+67 — ölçüm kodu (GTM/GA4/Clarity) ve çerez izni.** ⭐ **PR #110'u açan anahtar.** NEDEN: kurum sahibi ziyaretçi ölçümü istiyor; ölçüm kodu çerez izni olmadan yüklenirse kullanıcı verisi rızasız üçüncü tarafa gider (KVKK) — #110 bu yüzden "MERGE ETME" işaretli. | ~~🟡~~ 🟢 | Kullanıcı ilk girişte çerez tercihini seçiyor; reddederse izleme yüklenmiyor; kurum sahibi ziyaretçi sayısını görüyor | BEKLIYOR | ⚠️ **BİRLEŞTİRİLDİ (2026-09-21):** madde 67 **tek başına açılmamalı** — bugünkü main'de üçüncü-taraf çerez **SIFIR** (7 terim, harf duyarsız → ölçüm/izin kodu 0) ve `app/gizlilik/page.tsx:62-63` bunu açıkça beyan ediyor ⇒ bugün çerez bandı **yasal olarak gereksiz**. ⛔ **SIRA BAĞIMLILIĞI: 67 → 56.** 56 önce merge edilirse KVKK ihlali doğar. ⭐ Kod **YAZILMIŞ**: `origin/feat/analytics-seo-2026-08-22` (`dcf5d9a`) içinde `components/analytics/Analytics.tsx` var, main'de yok; **PR #110 AÇIK** (GitHub teyidi 2026-09-21, başlık: *"🛑 MERGE ETME — çerez izni yok, KVKK riski"*). Bu satır = **#110'u merge edilebilir hale getirmek**, sıfırdan yazmak değil. · aile: Y-B · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § Y-12 (2026-09-28) |

### AN-36 (2026-09-28, düzeltme)

**Değişiklik:** NEDEN cümlesi yalnız kaynaktaki ifadeye indirildi (7b)

**Önceki tam satır (AYNEN, 807 bayt):**

| AN-36 | Ş3 | **Veri İşleyen Sözleşmesi için Tenant yasal-kimlik alanları (G1-12).** NEDEN: kurumla KVKK veri işleyen sözleşmesi yapılabilmesi için kurumun yasal kimliği (adres/KEP/MERSİS) kayıtlı olmalı; bugün bu alanlar yok (G1-12). | 🟡 | Kurum, KVKK veri-işleyen sözleşmesini panelden imzalayıp yönetebilir | BEKLIYOR | kaynak: CS raporu (KN-04) · §4.2 (G1 en değerli öksüz). Kanıt: `G1-guvenlik-kvkk.md` G1-12; kuyrukta karşılığı yok. 🟡: migration + KVKK/hukuk. `[PO DOLDURACAK]` yasal alanlar (adres/KEP/MERSİS) **kod-dışı** → 03-PO-ELLE. · aile: Y-G · PO kısmı: kurumun yasal kimlik bilgilerini (adres/KEP/MERSİS) sağlamak ve veri işleyen sözleşme metnini avukata onaylatmak; kod kısmı migration içerdiğinden 🔵 akışıyla hazırlanır. |

### AN-52 (2026-09-28, düzeltme)

**Değişiklik:** kısaltmada düşen KARAR-44/78 sıra notu geri (7b) · kilit notu KARAR-106 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 1972 bayt):**

| AN-52 | Ş1 | ⭐ **Ürün-içi OTOMATİK geri bildirim soruları** — köşede, ZORUNLU DEĞİL, kapatılabilir; her soru HANGİ varsayımı sınadığını belirtir. Çıktı: soru seti + nereye gömüleceği + veri nasıl birikeceği. | 🔵 | Kullanıcı köşede isteğe bağlı soru görüyor; cevaplarsa veri otomatik birikiyor | PR-ACIK | kaynak: **KARAR-70 eki** (E.3). ⛔ Zorunlu tutma · ⛔ tekrar tekrar sorma (kırılgan kullanıcıda baskı = KARAR-71 tutundurma etiği sınırı). ⚠️ STRATEJİ NOTU: otomatik sorular KALANLARI anlatır, GİDENLERİ değil → KARAR-70 C'deki "bırakanla 2-3 görüşme" bunu telafi eder. Neden gerekli: PO tek tek insan aramaz, veri otomatik biriksin. · ⭐ **PLAN HAZIR 2026-09-27:** çatı #369 (`64e8afc`, 7b 2 tur ONAY) — `docs/raporlar/kesif/an52-urun-ici-geri-bildirim-plani-2026-09-27.md`: 7 soru (8 varsayım), kullanıcı başına 1 kez, oturumda en fazla 1, kapatılan bir daha sorulmaz. **KAPI 🟢→🔵 (kural uygulaması):** mevcut 4 geri bildirim tablosu bu anlara uymuyor (görüşme/eşleşmeye zorunlu bağlı) → yeni `ProductSurveyResponse` tablosu = migration. Sıra: AN-52-1 🔵 migration + EVET kartı → AN-52-2/3/4 🟢 (uçlar, köşe kart + 7 tetikleyici, KVKK dışa aktarım/silme) → AN-52-5 🟡 aydınlatma metni (avukat) · AN-52-7 🔴 yönetici görünürlüğü (planda taslak kart). ⚠️ S7 tetikleyicisi: iptal durumu ret dışı yollarla da oluşuyor (`meetingController.ts:794`) — uygulama turu ayırt etmeli. · F-31 buraya katlandı (KARAR-80/M12; sıra notu: AN-47 → KR-08 → AN-48 aynı migration'a) · AN-52-1 PR-ACIK: backend #185 (`ProductSurveyResponse` yeni tablo; migration elle yazıldı, uygulanmadı; AN-52-2 uçları + AN-52-4 KVKK dışa aktarım/anonimleştirme aynı PR'da) · EVET/HAYIR: KARAR-106 (yedek gerekmez — yeni tablo) · merge PO EVET'ini bekliyor · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AN-52 (2026-09-28) |

### E-3 (2026-09-28, düzeltme)

**Değişiklik:** Durum: tüm kalan ayaklar devredildi (koordinatör md.6); takip kalemleri AJ-106 · kilit notu KARAR-109 (koordinatör md.1b) · kilit notu KARAR-97 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 1194 bayt):**

| E-3 | değişir | **BAĞLA kovasını yap.** Her kalem ayrı PR, kendi şeridinde. Küçük ve migration'sız olanlar 🟢, diğerleri 🟡. Sırala: en az emekle en çok kullanıcı değeri önce. | ~~🟢/🟡~~ 🟢 | Her kalem için kullanıcı ekranda bir şey görüyor | BEKLIYOR | ⭐ **KEŞİF (2026-09-25):** `docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md` — 62 uç: **BAĞLA 10** (1'i 🔴 U-01) · MÜKERRER 21 · İÇ/SİSTEM 7 · TERK/ÜRÜN 24 (silinmez, yalnız listelendi) · DURUM (2026-09-27): E-3a gereksiz (rozet zaten `admin/eslesmeler` Risk sütununda) · E-3b (backend #127 + çatı #308) · E-3c (backend #135 + çatı #313) · E-3d (backend #187 + çatı #371) · E-3e (çatı #372) BITTI · KALAN: anlaşma taslağı → 🔴 KARAR-109 (kim başlatır — PO) · bağlamsal geri bildirim kartı → U-18 / KARAR-97 (PO EVET'i bekliyor) · değerlendirme okuma (`GET /api/meetings/:meetingId/feedback`) → AJ-49 · takip (satırı yok): engel koyma ucu denetim kaydı yazmıyor; eşzamanlı iki yönetici güncellemesinde kayıp güncelleme riski; seçim listeleri ilk sayfa · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § E-3 (2026-09-28) |

### AJ-22 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-112 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 1123 bayt):**

| AJ-22 | Ş0 | **Tarayıcı güvenlik politikası (CSP) yalnız rapor modunda; kurum logosu herhangi bir https adresine konabiliyor** — izleme pikseli üyelerin IP/tarayıcı bilgisini toplayabilir (F-04 + AJ-05 kalanı). | 🟢 (+7b) | CSP engelleme modunda; logo yalnız izinli kaynaktan çiziliyor; test | BITTI (kısmen — KARAR-112) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` (F-04 QE5, AJ-05 QE2) · kanıt: `frontend/src/lib/securityHeaders.mjs:36` (`Content-Security-Policy-Report-Only`) · `backend/src/services/logoUrl.ts:64-76` (yalnız IP/localhost reddi) · hazırlık: `docs/raporlar/kesif/csp-zorunlu-mod-hazirlik-2026-09-27.md` · DURUM: CSP engelleme modunda canlıda (çatı #387, 7b ONAY; test `frontend/src/__tests__/security-headers.test.ts` 9 test; mutasyon yerel) · KALAN: logo yalnız izinli kaynaktan çizilsin → KARAR-112 (PO kararı: her https / alan adı listesi / sunucuya indirme) · CSP ihlal kaydı → AJ-52 · satır 5c-a gereği kuyrukta (kısmen) · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AJ-22 (2026-09-28) |

### AJ-77 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-128 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 1443 bayt):**

| AJ-77 | Ş0 | **Durum alanlarının enum'a çevrilmesi + çift rol (`User.role` ↔ `TenantMembership.role`) okuma yolları envanteri** (G6-02 / madde 49) — serbest metin durum alanları geçersiz değer kabul ediyor; bazı okumalar hâlâ genel rolden. | 🔵 (migration; envanter + taslak kısmı 🟢) | Envanter (alan · canlı değer dağılımı, salt-okuma) + migration PR'ı + tarihli yedek planı + EVET/HAYIR kartı hazır; rol okumalarının `TenantMembership.role`'e geçiş listesi (AJ-01/40/56 sonrası kalan) | PR-ACIK | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:186` (GÖREV 4) · kanıt: `backend/prisma/schema.prisma` (Tenant · MeetingCheckIn · UserReport · MentorshipAgreement · InvitationTemplate String alanları) · `docs/otonom/00-KUYRUK.md:342` (madde 49 alınmadı) · 🔵 **PR-ACIK 2026-09-28:** backend #227 (⛔ MIGRATION `20260928000000_durum_alanlari_enum`, 13 kolon / 5 tablo) + çatı #420 (envanter `docs/raporlar/kod-denetimi/aj77-durum-alanlari-envanter-2026-09-28.md`); 7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/227#issuecomment-5865731487 · test `backend/tests/aj77-status-enum.unit.test.ts` (40) · mutasyon yerel 2/2 kırmızı · EVET kartı KARAR-128 · merge öncesi: §3b sayımı 0 + tarihli yedek (DB erişimi) · girmeyen: `Tenant.plan` (KARAR-119) · `SystemLog.category` (AUDIT temizliği) · rol okuma envanteri → AJ-105 |

### AJ-78 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-103 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 794 bayt):**

| AJ-78 | Ş0 | **Kurum KPI paneli ve CSV'de tamamlama oranları ve tamamlanan görüşme sayısı yok** (G4-30 kalanı + 08-acik-sorular genişletmesi) — CSV yalnız sayı, NPS ve eşleşme içeriyor. | 🟢 (+7b KVKK: toplu veri dışa aktarımı) | Kurum yöneticisi panelde ve CSV'de "kaydını tamamlayan üye %", "DISC tamamlama %" ve "tamamlanan görüşme" görüyor; küçük grupta (eşik 3) gizli; test (kurum izolasyonu + k-anonimlik). Dönemsel tarih aralığı → KARAR-103 md.10 | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:152` · `docs/kararlar/konu/08-acik-sorular.md:55` (GÖREV 4) · kanıt: `backend/src/services/kpiReport.service.ts:136-186` (CSV satırları) · `backend/src/controllers/adminController.ts:44-66` |

### K-15 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-111 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 967 bayt):**

| K-15 | Ş2 | **AvailabilityBlock'a format + süre (tam randevu mimarisi).** ⛔ önce `availability_block_yedek_20260910`; migration default'lu (format=ONLINE, durationMin=60); mentör slot açarken format+süre seçer; menti slottan seçer. | ~~🟡~~ 🔵 | Mentör format+süre belirliyor, menti seçiyor, eski kayıtlar bozulmadı | PR-ACIK | KAYNAK: KARAR-1 → A (2026-09-21; PO şartı: önce tarihli yedek, sonra açık onay) · AN-25 buraya katlandı (KARAR-80/M10; koşul alanları bu PR'da yok) · aile: Y-G · 🔵 **HAZIRLANDI 2026-09-27:** backend #189 (⛔ MIGRATION: `AvailabilityBlock.format` @default ONLINE + `durationMin` @default 60; 7b ONAY) + çatı #374 (form + randevu ekranı; 7b ONAY). AN-25 koşul alanları bilerek dışarıda (tasarlanmadı). EVET/HAYIR: **KARAR-111** (mevcut blokların ONLINE/60'a daralması, <60 dk blok riski, yedek MERGE'DEN ÖNCE). · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § K-15 (2026-09-28) |

### U-18 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-97 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 1270 bayt):**

| U-18 | Ş0 | **`MatchRequest` durumsuz → mentörün mesaj talebini kabul/ret kapısı yok;** `Match` tablosuna yazan kod yok (`createMatchIfEligible` 0 çağıran). | ~~🟡~~ 🔵 | Mentör mesaj talebini kabul/ret edebiliyor (karara göre) | PR-ACIK | aile: Y-C · DURUM: PR-ACIK — backend #148 + çatı #326 (CI yeşil; 7b 2. tur ONAY 2026-09-26) · ⛔ MIGRATION `Conversation.rejectedAt` (boş bırakılabilir ek alan; dosya elle yazıldı, uygulanmadı) → merge için PO EVET'i (KARAR-97) + `Conversation` tarihli yedeği · Uygulama: mentör `POST /api/conversations/:id/reject` ile reddediyor (menti/yönetici/yabancı → 404), menti nazik ret metni görüyor, alternatif mentör önerisi YOK (KARAR-22 B; I-16 ret metinleri buraya katlandı — KARAR-80/M1) · Kapsam dışı: P-05 (görüşme reddi) · e-posta bildirimi (SMTP) · `MatchRequest` durum alanı · Takip (satırı yok, strateji katmanına): gerçek bildirim + gelen kutusunda ret işareti; bildirim metnindeki "Mentörünüz" · ⛔ Sıra kuralı: `Match` yazımı ancak silme yolu (GV-08, tamamlandı) sonrası açılır · KAYNAK: X §3 K6 / §10#23 · kod incelemesi D1 · kanıt `schema.prisma:439-456` · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § U-18 (2026-09-28) |

### PS-A3 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-58 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 1648 bayt):**

| PS-A3 | Ş0 | **⭐ KARAR-10 · AŞAMA 3 — EŞLEŞTİRMEYE BAĞLA, AÇMA/KAPAMA ANAHTARIYLA.** Yeni motor eskisinin **yanında** çalışır (feature flag); önce **eski/yeni sıralama karşılaştırması PO'ya gösterilir**; PO onaylarsa açılır, **tek tuşla eskiye dönülür.** | 🟢 | PO karşılaştırmayı gördükten ve onayladıktan sonra: kullanıcı daha zengin profile göre sıralanmış mentör listesi görüyor — ve anahtar kapatılırsa eski listeye anında dönülüyor | BEKLIYOR | ⛔ Ön koşul **PS-A1 → PS-A2**. ⛔ **ANAHTAR (feature flag) ZORUNLU — PO şartı.** ⚠️ **I-13 düzeltilmeden bağlama RASTGELEDEN BETERDİR:** `COMPATIBILITY_MATRIX['M1_m1']=60` (`scoring.config.ts:38-44`) karakter skorunu **düzleştirir**, `BLOCKED_PAIRS` (`:33`) yüzünden toksik-çift vetosu **hiç tetiklenmez**. ⚠️ **ÖLÇÜM MEKANİZMASI YOK** — `Match` tablosuna yazılmıyor ⇒ *"daha iyi"* bir süre **PO'nun gözüyle** değerlendirilir. ⛔ **`Match` yazımı açılırsa KVKK sırası bağlayıcıdır:** önce silme yolu (`GV-08`), SONRA `Match` yazımı (`U-18`) — ters sıra = KVKK ihlali. ⚠️ **KARAR-6 bağlantısı:** menti ekranındaki uyum yüzdesi bugün DISC skorudur → motor bağlanınca **YÜZDELER DEĞİŞİR.** = `F-11` / `I-15` şemsiyesi altında. Efor XL · aile: Y-C · Kapı 🟢 + 7b (b)(c) (PO 2026-09-27, GÖREV 0.2 — matching dosyası); ön koşul ve anahtar şartları geçerli · I-15 buraya katlandı (KARAR-80/M9) · ön koşul durumu: PS-A1 tamamlandı · PS-A2 🔴 KARAR-58 bekliyor · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § PS-A3 (2026-09-28) |

### IC-10 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-45 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 1392 bayt):**

| IC-10 | Ş1 | **madde 139'un eksik yarısı: 4 menti "şimdilik" varyantı YAZILSIN.** Bugün yalnız mentör tarafı yazılı (4/8). | 🟢 | (ön koşul işi — kullanıcı etkisi `I-15` ile birlikte görünür: çoklu-arketip çıkan **menti** de "şimdilik" metnini okur) | ✅ BITTI (2026-09-26, metin yazıldı — onay bekliyor) | §0② · §2.1. Belge `arketip-ve-yaklasim-icerigi-2026-09-03.md:269` menti sürümü için **metin değil talimat** bırakmış; yazılı 4 varyant `:271,279,287,295` **yalnız mentör**. ⛔ **`I-15`'in ön koşulu** — I-15 bugün kodlanırsa menti tarafı boş kalır. Ayrı satır açıldı çünkü I-15 🔴 KARAR-10 kilitli, bu iş 🟢 ve ondan bağımsız ilerler. ⚠️ Eşik dalı yazılırken sihirli sayı YOK: eşik sabiti `scoring.config.ts:31` komşusuna. ⚠️ Ad seçimi ad↔kod kararına bağlı (**KARAR-45**). Efor S (yazım) · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · eski kapı: 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M16: ana satır ('şimdilik' varyantları); AN-05 yalnız '15/16 kombinasyon metni'ne daraltılmış olarak ayrıca ilerler. · ✅ **YAZILDI 2026-09-26:** `docs/raporlar/icerik/menti-simdilik-varyantlari.md` (4 varyant, mentör §6 yapısının birebir aynası; adlar yer tutuculu — KARAR-45). Kullanıcı etkisi I-15 ile görünür (🔴 KARAR-10). PO metin onayı belgede ⬜. |

### AN-05 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-45 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 1069 bayt):**

| AN-05 | Ş1 | **Menti "şimdilik" 4 varyantı + eşleşme detay 15/16 kombinasyon metnini yaz.** | 🟢 | Menti belirsiz eşleşmede doğru "şimdilik" metnini görüyor | 🟨 kısmen (metin yazıldı, PO onayı bekliyor — bitti-dogrulama 09-27 ⚠️) · ✅ BITTI (2026-09-26, metin yazıldı — onay bekliyor) | Kaynak: A6 · IK(D) · TO Y-30. IC-10 / I-11 ön koşulu; menti varyantı 0 yazılı. Neden: bugün boş/eksik metin. · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · eski kapı: 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M16: yalnız '15/16 kombinasyon metni'ne DARALTILDI (IC-10 ana satırdır, geri kalanı orada); bu dar kapsam bağımsız ilerler. · ✅ **YAZILDI 2026-09-26 (daraltılmış kapsam: 15/16 kombinasyon):** `docs/raporlar/icerik/birlikte-calisma-kombinasyonlari.md` — kaynak örnek (Rotacı×Ayna) aynen + 15 yeni metin, aynı 4 parçalı yapı; "eşleşme" sözcüğü kullanılmadı (KARAR-66 B). Adlar KARAR-45'e bağlı; PO metin onayı belgede ⬜. Menti "şimdilik" varyantları IC-10 ile ayrıca yazıldı. |

### AN-02 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-99 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 626 bayt):**

| AN-02 | Ş1 | **Seed metin yazım düzeltmesi:** `seed.ts:69` "güçlüğüm"→"güçlü yanım" + `seed.ts:537` "Menteen"→"Mentin". | ~~🟡~~ 🔵 | Kullanıcı doğru yazımı görüyor | PR-ACIK | Kaynak: A3 · IK(A.3). 🟡: seed dosyası (⛔ seed ÇALIŞTIRILMAZ, yalnız metin düzeltme); canlıda görünür. · aile: Y-G · kapı 2026-09-26 (4 renk) · 🔀 **PR-ACIK 2026-09-26 (🔵):** backend #160 — `seed.ts:70` "güçlüğüm"→"güçlü yanım" · `:540` "Menteen"→"Mentin" (seed ÇALIŞTIRILMADI; güncel satır numaraları 70/540). Canlı düzeltme = 2 satır UPDATE → **KARAR-99** EVET/HAYIR. |

### AN-10 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-64 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 814 bayt):**

| AN-10 | Ş1 | **Terim tutarsızlığı: §5'teki 31 nokta** (mizaç/karakter/kişilik · mentor/mentör · görüşme/toplantı/randevu). NEDEN: aynı kavram ekranlarda farklı adlarla geçiyor (TO §5: 31 nokta) — kullanıcı tutarsız dil görüyor, aynı şeyi ayrı şey sanabilir. | 🟢 | Kullanıcı aynı şeyi her ekranda aynı adla görüyor | ✅ BITTI (kısmen, KARAR-64 ayağı açık) | Kaynak: A12 · TO §5 · IK. IC-02/IC-11 ekine. ⚠️ **KARAR-64 (mizaç/karakter/kişilik) cevabından SONRA** yapılır. · DURUM: mentor/mentör yazım ayağı BITTI (çatı #339 + AN-10b #347) · görüşme ayağı IC-11 ile BITTI · KALAN: mizaç/karakter/kişilik adlandırma ayağı → 🔴 KARAR-64 (PO; KARAR-80/M16) · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AN-10 (2026-09-28) |

### AN-12 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-107 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 971 bayt):**

| AN-12 | Ş3 | **`interactionStyle` karantina** (dondurulmuş alanı yazma şemalarından çıkar) + tie-break tek kaynak (D>I>S>C ↔ D>I>C>S). | 🔵 | Tek tie-break kuralı; ölü alan yazılmıyor | PR-ACIK | Kaynak: A14 · TO Y-13/Y-16. ⛔ SİLME PROTOKOLÜ (karantina, silme değil). 🟡 matching; tie-break önce doğrula (harf sonucu değişir). · aile: Y-C · kapı 2026-09-26 (4 renk) · ⭐ **KAPI DÜZELTMESİ 2026-09-27 (kural uygulaması):** 🟢→🔵 — iş "karantina" (dondurulmuş alanı yazma şemalarından çıkar); OTONOM-PROMPT Bölüm 7: karantina 🔵 (PR + 7b + EVET kartı). Kaynak: kalan 🟢 ayıklaması (02-ILERLEME 2026-09-27). · 🔵 **HAZIRLANDI 2026-09-27:** backend #186 (karantina: 3 yazma yolu kapandı, okuma/şema aynı; 7b ONAY, CI yeşil) + çatı #370 (silme protokolü arşivi `docs/arsiv/silinenler-2026-09-27.md`). EVET/HAYIR: **KARAR-107**. Tie-break kısmı ayrı ürün sorusu: **KARAR-108** (bugün etkisi yok). |

### AN-26 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-98 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 1465 bayt):**

| AN-26 | Ş2 | **Müsaitlik hatırlatması (zamanlanmış iş) + kurum yöneticisine eskalasyon:** menti talebinden 3 gün→mentöre hatırlatma · 7 gün→2. hatırlatma · 10 gün→yöneticiye bildirim. | 🔵 | Yanıtsız mentör dürtülüyor, uzun sessizlikte yönetici haberdar | PR-ACIK | Kaynak: **KARAR-53 ④** (Bölüm 3, süreler ajan varsayılanı gerekçeli). ⚠️ SMTP'ye bağlı (03-PO B4); zamanlanmış iş altyapısı. 🟡. · aile: Y-D · ⛔ **çelişki: KARAR-80/M2** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M2: ana satır — KARAR-53 ④'e göre 3 gün mentöre hatırlatma, 7 gün 2. hatırlatma, 10 gün yöneticiye eskalasyon; I-10 buraya katlandı. · kapı 2026-09-26 (4 renk) · 🔀 **PR-ACIK 2026-09-26 (🔵 akışı — uygulama migration gerektirdi):** backend #157 (`fb6c411`) + çatı #337 (pointer). Migration: `Conversation` +3 nullable guard alanı (yalnız ekleme, ÇALIŞTIRILMADI). CI yeşil (923 test). **KARAR-98** EVET/HAYIR kartı açıldı. 7b incelemesi sürüyor. · ✅ 7b 2. tur ONAY (2026-09-26; backend #157 `cb6b83d` yorum 5849046560 · çatı #337 `10346e0` yorum 5849046681; 941 test). Kalan: KARAR-98 EVET (+ alt soru) + `Conversation` yedeği. · ⭐ **KAPI DÜZELTMESİ 2026-09-27 (kural uygulaması):** hücre 🟢 gösteriyordu, gövde 🔵 akışı (migration'lı PR backend #157 + çatı #337, KARAR-98 EVET + `Conversation` yedeği bekliyor) → 🔵. |

### AN-30 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-96 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 1281 bayt):**

| AN-30 | Ş3 | **Kayıt ekranı: zorunlu + isteğe bağlı maddeler** (DISC eşleştirme · yurt dışı saklama · veri işleme · anonim iyileştirme = ZORUNLU; kurumlar-arası paylaşım · OCEAN = İSTEĞE BAĞLI). Aynı ekran kurum yöneticilerine de. | ~~🟡~~ 🔵 | Kullanıcı ayrı ayrı onay veriyor; zorunlu eksikse giriş yok | PR-ACIK | KAYNAK: KARAR-34 SORU 1 · F-03 buraya katlandı (KARAR-80/M17) · ⛔ ÇIKIŞ BLOKERİ (KARAR-69 B, 2026-09-23): onay ekranı ilk kullanıcıyla devreye giren KVKK tabanı · DURUM: PR-ACIK — backend #142 (⛔ MIGRATION: `ConsentType`'a 6 yeni değer; dosya elle yazıldı, uygulanmadı) + çatı #320: klasik ve OAuth kaydında `GranularConsentForm` (6 kutu), `NEXT_PUBLIC_GRANULAR_CONSENT_ENABLED` bayrağı arkasında (varsayılan kapalı → canlıda görünmez) · metinler yer tutucu: ⛔ avukat onayı olmadan canlıya açılmaz · KALAN (PO): ⓐ migration onayı ⓑ STK self-serve kurum kaydı ekranı ayrı iş olarak kuyruğa alınsın mı (satırı yok) ⓒ bayrağın açılışı avukat metni sonrası · ✅ 7b 2. tur ONAY (2026-09-26; backend `df8db92` · çatı `43490fc`) — PO EVET'i (KARAR-96) + `Consent` yedeği bekler. · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AN-30 (2026-09-28) |

### AN-41 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-47 (koordinatör md.1b) · kilit notu KARAR-75 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 983 bayt):**

| AN-41 | Ş3 | **KVKK metin paketini kod-senkron güncelle** (avukata gitmeden önce; 4 boşluk kodda kapandı). | 🟡 | Avukat, ürünün gerçek (güncel) KVKK durumunu görür | BEKLIYOR | kaynak: CS raporu (KN-09) · Ç-12..15. Kanıt: metin "YOK/PR bekliyor" der, kodda merged: rıza sürümleme `consentService.ts:28` · hardDelete→anonymize `gdprService.ts:233` · FeedbackLog 3-yıl `gdprService.ts:370` · FE veri-hakları `profile/page.tsx:443`. ⚠️ KARAR-75 (kişi adı yasağı ↔ yasal metin, Ç-16) + YN-13 ile bağlı. 🟡 KVKK. KARAR-47 avukat paketine katılabilir. · aile: Y-B · ⛔ **çelişki: KARAR-80/M18** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M18: GV-18 notu eklendi — rıza sürümü kaydediliyor ama hiç kontrol edilmiyor; avukata 'sürümleme var' denecekse önce GV-18 kapanmalı. · PO kısmı: kod-senkron güncellenen KVKK metin paketini avukata götürüp onaylatmak (avukat paketi, KARAR-47). |

### AN-49 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-67 (koordinatör md.1b) · kilit notu KARAR-89 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 671 bayt):**

| AN-49 | Ş3 | ⭐ **Dört feedback modeli tek KALİTE GÖRÜNÜMÜNE bağlansın.** Kim görür → KARAR-67 (drill-down) ile bağlantılı, önce ona bak. | ~~🟡~~ 🟢 | Yönetici tek, tutarlı kalite görünümü görüyor | BEKLIYOR | kaynak: strateji karar oturumu (E.1c). ⛔ **SIRA ÖNEMLİ:** (1) KVKK silme yolu düzeltilsin (GV-08) → (2) SONRA `Match` yazımı açılsın (U-18/PS-04/F-11) → (3) SONRA kalite görünümü. Ters sıra KVKK ihlali doğurur. ⚠️ **KARAR-66 B ile çelişki YOK** — ölçüm kurulunca "yönlendirme kalitesi" iddiası KANITLA geri KONABİLİR. 🟡: matching/KVKK bağımlı. · aile: Y-C · kapı 2026-09-26 (4 renk) |

### AJ-50 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-116 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 1319 bayt):**

| AJ-50 | Ş0 | **Mevcut kayıtlarda kişilik kartının içinde ham DISC vektörü/puanı duruyor** (AJ-21 kalanı) — okuma yolu artık süzüyor, yeni kayıtlar temiz; eski kayıtların kartında fazlalık veritabanında kalıyor. | 🔵 (canlı veriye yazma) | Mevcut `discResultCard` kayıtlarında `discVector`/`rawScores` anahtarı yok; tarihli yedek alındı | PR-ACIK | ajan-ekledi 2026-09-27 · kaynak: AJ-21 (backend #194) · kanıt: `backend/src/controllers/onboardingController.ts` (2026-09-27 öncesi yazım karta `discVector` + `rawScores` gömüyordu) · okuma süzgeci `backend/src/services/discVisibility.ts:31-46` · yöntem önerisi: tarihli yedek + tek seferlik JSON güncellemesi (`discResultCard - 'discVector' - 'rawScores'`); DB erişimi gerekir (VPS'te yok) → hazırlık PR + EVET kartı · acil değil (sızıntı okuma yolunda kapalı) · 🔵 **PR-ACIK 2026-09-27:** backend #212 (7b ONAY 2. tur https://github.com/zahidsamiata/menti-mentor/pull/212#issuecomment-5861236295; CI yeşil; betik varsayılan kuru çalışma, `--uygula` her hedefte birebir host onayı; test `backend/tests/discCardCleanup.unit.test.ts` (16); mutasyon yerel — TEST_DATABASE_URL istisnası geri gelince 3 kırmızı). EVET/HAYIR: **KARAR-116**. MERGE YOK — PO EVET + tarihli yedek (DB erişimi) sonrası. |

### AJ-90 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-54 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 731 bayt):**

| AJ-90 | Ş0 | **Mentinin mentör havuzu sayfalanmıyor** — ön yüz tek istekte en çok 100 mentör çekiyor, uç sayfa/toplam dönmüyor; 100'den fazla uygun mentörü olan menti kalanları hiç görmüyor. | 🟢 (+7b) | Uç sayfa + sayfa boyutu + toplam döndürüyor, ön yüzde sayfa düğmeleri; sıralama sayfalar arasında kararlı; test: 40 aday → 3 sayfa, sınırda tekrar/eksik yok | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `docs/kararlar/konu/06-tasarim-ux.md:40` (GÖREV 4) · kanıt: `frontend/src/lib/api/matching.ts:24` (`limit=100`) · `backend/src/controllers/matchingController.ts:101-103` (yalnız `limit`, en çok 200) · sayfa başına kart sayısı KARAR-54'e bağlı; cevap yoksa 18 (tek sabit) |

### AJ-99 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-12 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 949 bayt):**

| AJ-99 | Ş0 | **Mentör panelindeki kendi NPS ortalaması küçük örnekte maskesiz** (AJ-69 7b yan bulgusu) — tek mentisi olan mentör, o kişinin verdiği puanı birebir görür; kurum ekranlarındaki k-anonimlik kuralı (eşik 3) burada yok. | 🟢 (+7b KVKK) | Yanıt sayısı eşiğin altındaysa mentör panelinde ortalama yerine "gizli (<3 yanıt)" görünüyor; negatif test (n=1,2 → ortalama dönmüyor) | BEKLIYOR | ajan-ekledi 2026-09-28 · kaynak: 7b #220 https://github.com/zahidsamiata/menti-mentor/pull/220#issuecomment-5864565605 · kanıt: `backend/src/controllers/mentorMetricsController.ts:49,99-100` (maskesiz ortalama) ↔ komşu `backend/src/services/mask.ts` `maskNpsSample` (AJ-69) · NEDEN: değerlendirme puanı kimin verdiği bilinirse menti dürüst puan vermekten çekinir · ⚠️ ürün sorusu olabilir: mentörün kendi geri bildirimini görmesi KARAR-12/44 ile ilişkili — uygulayıcı önce kontrol eder |

### AJ-101 (2026-09-28, düzeltme)

**Değişiklik:** kilit notu KARAR-127 (koordinatör md.1b)

**Önceki tam satır (AYNEN, 782 bayt):**

| AJ-101 | Ş0 | **Psikometri belgesinin "Mentörlük yetkinliği & sertifikasyon ✅" bölümü kodla çelişiyor** (GÖREV 2.2 KISMEN) — "Mini Akademi 4 modül" kodda yok, "Baraj 65" T4 kararıyla "%80 konu" oldu; belge ✅ diyor. | 🟢 belge (+ 🔴 KARAR-127 ürün kısmı) | Bölüm başlığı ve maddeler kod gerçeğine göre güncel (eski metin arşivde); Mini Akademi maddesi KARAR-127 cevabına bağlı olarak "yapılmadı / planlandı" | BEKLIYOR | ajan-ekledi 2026-09-28 · kaynak: `docs/raporlar/kod-denetimi/eski-onay-dogrulama-2026-09-28.md` (AJ aday 1) · kanıt: `docs/kararlar/konu/03-psikometri-ve-algoritma.md:47-50` ↔ `backend/src/services/certification.service.ts:27,33,52` · NEDEN: belge "var" dediği için kimse yapmıyor ya da kararını vermiyor |

### Y-18 (2026-09-28, düzeltme)

**Değişiklik:** KARAR-BEKLEYEN satırı · kod içindeki `|` → `\|` (tablo hücresi onarımı, anlam aynı)

**Önceki tam satır (AYNEN, 852 bayt):**

| Y-18 | Ş0 | **madde 126 — `answeredFollowup` olmayan tabloyu sorguluyor; profil tamamlanma yüzdesi sistematik DÜŞÜK.** | 🔴 KARAR-36 | Profil tamamlanma yüzdesi gerçek veriye dayanıyor | BEKLIYOR | ⚠️ **RAPOR DÜZELTMESİ — etki sanılandan BÜYÜK.** Rapor *"try/catch sessizce 0 dönüyor"* dedi; gerçek daha kötü: `profile-completeness.service.ts:43-50` **`(prisma as any).answeredFollowup?.count(...)`** — optional chaining **fırlatmadan `undefined` döner** → ` · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · eski kapı: 🟢 || 0` → **HER ZAMAN 0** ve **`catch` bloğu ÖLÜ KOD**, yani `profileSource==='HYBRID' ? 1 : 0` yedeği **hiç çalışmıyor**. Tablo gerçekten yok (`grep answeredFollowup schema.prisma` → 0). · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

### I-11 (2026-09-28, düzeltme)

**Değişiklik:** KARAR-BEKLEYEN satırı · kod içindeki `|` → `\|` (tablo hücresi onarımı, anlam aynı)

**Önceki tam satır (AYNEN, 1476 bayt):**

| I-11 | Ş1 | **madde 151+152+153 — eşleşme detay sayfası yok.** Bugün yalnız tek cümlelik "neden uyumlu" var. | 🔴 KARAR-64 | Menti "neden bu mentör · nasıl çalışırsınız · ilk görüşmede ne konuşulur" bölümlerini görüyor | BEKLIYOR | 🟡 KALIR: **içerik ön koşullu** — Bölüm 2'nin 16 kombinasyonundan **15'i YAZILMADI**. Katman-1 VAR: `compatibilityReason` render ediliyor (`menti/page.tsx:318`, `mentor/page.tsx:482-484`). Detay rotası YOK (FE dizin listesi teyitli). madde 153: cümle S1/S2/S3'ten DEĞİL, skor eşiğinden üretiliyor (`matchingController.ts:12-15,48-60`; `supportApproach · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · eski kapı: 🟡 |needStatement|threeQuestion` → 0). ⚠️ **Bölüm 1 ve 3 BAĞIMSIZ ilerler** — PO isterse ikiye bölünsün. ⚠️ S1 (`mentiNeeds`) karşı tarafa GÖSTERİLMEZ, yalnız örtüşme cümlesi. ⚠️ = psikometri konseyi §5 D.2 (KOPMA 3), ek bulgu: üç sorunun (mentiNeeds · mentorStrengths · supportApproach · priorityValue) tek yazanı onboardingController.ts; matching.ts · scoring.ts · scoring.service.ts · sector-scorer.service.ts içinde 0 eşleşme ⇒ veri toplanıyor ama hiçbir skorlama dosyasında okunmuyor (I-11'in "detay sayfası" ayağından ayrı, SKORLAMA ayağı). · aile: Y-C · KARAR-80 işlendi (2026-09-26, A kabul) — M16: hazır metinler AN-50 diline çevrilerek bağlanacak; AN-50 KARAR-64'e kilitli (CEVAPSIZ) → zincirleme kilit. |

### U-17 (2026-09-28, düzeltme)

**Değişiklik:** KARAR-BEKLEYEN satırı · kod içindeki `|` → `\|` (tablo hücresi onarımı, anlam aynı)

**Önceki tam satır (AYNEN, 1514 bayt):**

| U-17 | Ş0 | **Temiz DB'de DISC havuzu boş kalıyor ve yalnız yıkıcı `prisma/seed.ts` ile dolabiliyor** (`createQuestion` DISC'i 403'lüyor). Yeni ortam kurulurken patlar. | 🔴 KARAR-85 | Temiz DB'de DISC havuzu güvenli yolla dolabiliyor | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T2)** — temiz DB'de DISC havuzu boş — yeni ortam kurulurken patlar; tek yol yıkıcı `seed.ts` · 🟡 KALIR: SEED + yıkıcı `seed.ts` riski (PO kararı). = X §4.6 / §10#21. Kanıt: `questionService.ts:174`; `questionController.ts:124-129`; `seed.ts:295-319` koşulsuz `deleteMany`. Efor L ⚠️ = güvenlik konseyi §3.3, ek bulgu: aynı dosyada ikinci sorun — `prisma/seed.ts` prod'da çalışmayı ENGELLEYEN guard taşımıyor (*kapsam:* `prisma/seed.ts`, desen `NODE_ENV · **KARAR-80/M21 sıra notu:** seed koruması ayağı = KR-01 (#91 merge edildi). · 🔴 **kart açıldı (2026-09-25): KARAR-85** · eski kapı: 🟡 |isProd` harf duyarsız → 0) ve `:293` sabit bir seed şifresi içeriyor (`:383` yorumu düz metin tekrarlıyor). U-17 ile BİRLİKTE yapılmalı: dosyaya dokunulurken guard da eklensin. ⚠️ = psikometri konseyi §4 C.1, ek bulgu: havuz boşken /disc-test DOĞRU davranıyor (DiscTestEmpty, K-02'de düzeltilmiş) ama /onboarding savunmasız (→ PS-11); ayrıca mantık hatası questionService.ts:173 ve questionController.ts:327'de 0 >= 0 ⇒ havuz TEK soruya düşerse ilk cevapta discAssessmentCompletedAt yazılır ve admin'e "test tamamlandı" e-postası gider. · aile: Y-G |

### AN-26 (2026-09-28, düzeltme — 1.500 bayt aşımı)

**Satırdan çıkarılan katmanlar (AYNEN; önceki tam satır yukarıda § AN-26 düzeltme kaydında):**

- ⛔ **çelişki: KARAR-80/M2** (2026-09-25)
- eski kapı: 🟡
- kapı 2026-09-26 (4 renk)
- ⭐ **KAPI DÜZELTMESİ 2026-09-27 (kural uygulaması):** hücre 🟢 gösteriyordu, gövde 🔵 akışı (migration'lı PR backend #157 + çatı #337, KARAR-98 EVET + `Conversation` yedeği bekliyor) → 🔵.

## GÖREV 2.4 — 3. deneme düzeltmeleri (2026-09-28): NEDEN · sahip · tek kapı · bozuk kod aralığı

### U-17 (2026-09-28, 3. düzeltme)

**Değişiklik:** araya not girmiş bozuk kod aralığı onarıldı (not kod dışına alındı, "eski kapı" ibaresi arşive) · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1515 bayt):**

| U-17 | Ş0 | **Temiz DB'de DISC havuzu boş kalıyor ve yalnız yıkıcı `prisma/seed.ts` ile dolabiliyor** (`createQuestion` DISC'i 403'lüyor). Yeni ortam kurulurken patlar. | 🔴 KARAR-85 | Temiz DB'de DISC havuzu güvenli yolla dolabiliyor | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T2)** — temiz DB'de DISC havuzu boş — yeni ortam kurulurken patlar; tek yol yıkıcı `seed.ts` · 🟡 KALIR: SEED + yıkıcı `seed.ts` riski (PO kararı). = X §4.6 / §10#21. Kanıt: `questionService.ts:174`; `questionController.ts:124-129`; `seed.ts:295-319` koşulsuz `deleteMany`. Efor L ⚠️ = güvenlik konseyi §3.3, ek bulgu: aynı dosyada ikinci sorun — `prisma/seed.ts` prod'da çalışmayı ENGELLEYEN guard taşımıyor (*kapsam:* `prisma/seed.ts`, desen `NODE_ENV · **KARAR-80/M21 sıra notu:** seed koruması ayağı = KR-01 (#91 merge edildi). · 🔴 **kart açıldı (2026-09-25): KARAR-85** · eski kapı: 🟡 \|isProd` harf duyarsız → 0) ve `:293` sabit bir seed şifresi içeriyor (`:383` yorumu düz metin tekrarlıyor). U-17 ile BİRLİKTE yapılmalı: dosyaya dokunulurken guard da eklensin. ⚠️ = psikometri konseyi §4 C.1, ek bulgu: havuz boşken /disc-test DOĞRU davranıyor (DiscTestEmpty, K-02'de düzeltilmiş) ama /onboarding savunmasız (→ PS-11); ayrıca mantık hatası questionService.ts:173 ve questionController.ts:327'de 0 >= 0 ⇒ havuz TEK soruya düşerse ilk cevapta discAssessmentCompletedAt yazılır ve admin'e "test tamamlandı" e-postası gider. · aile: Y-G |

### I-11 (2026-09-28, 3. düzeltme)

**Değişiklik:** araya not girmiş bozuk kod aralığı onarıldı (not kod dışına alındı, "eski kapı" ibaresi arşive) · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1478 bayt):**

| I-11 | Ş1 | **madde 151+152+153 — eşleşme detay sayfası yok.** Bugün yalnız tek cümlelik "neden uyumlu" var. | 🔴 KARAR-64 | Menti "neden bu mentör · nasıl çalışırsınız · ilk görüşmede ne konuşulur" bölümlerini görüyor | BEKLIYOR | 🟡 KALIR: **içerik ön koşullu** — Bölüm 2'nin 16 kombinasyonundan **15'i YAZILMADI**. Katman-1 VAR: `compatibilityReason` render ediliyor (`menti/page.tsx:318`, `mentor/page.tsx:482-484`). Detay rotası YOK (FE dizin listesi teyitli). madde 153: cümle S1/S2/S3'ten DEĞİL, skor eşiğinden üretiliyor (`matchingController.ts:12-15,48-60`; `supportApproach · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · eski kapı: 🟡 \|needStatement\|threeQuestion` → 0). ⚠️ **Bölüm 1 ve 3 BAĞIMSIZ ilerler** — PO isterse ikiye bölünsün. ⚠️ S1 (`mentiNeeds`) karşı tarafa GÖSTERİLMEZ, yalnız örtüşme cümlesi. ⚠️ = psikometri konseyi §5 D.2 (KOPMA 3), ek bulgu: üç sorunun (mentiNeeds · mentorStrengths · supportApproach · priorityValue) tek yazanı onboardingController.ts; matching.ts · scoring.ts · scoring.service.ts · sector-scorer.service.ts içinde 0 eşleşme ⇒ veri toplanıyor ama hiçbir skorlama dosyasında okunmuyor (I-11'in "detay sayfası" ayağından ayrı, SKORLAMA ayağı). · aile: Y-C · KARAR-80 işlendi (2026-09-26, A kabul) — M16: hazır metinler AN-50 diline çevrilerek bağlanacak; AN-50 KARAR-64'e kilitli (CEVAPSIZ) → zincirleme kilit. |

### Y-18 (2026-09-28, 3. düzeltme)

**Değişiklik:** araya not girmiş bozuk kod aralığı onarıldı (not kod dışına alındı, "eski kapı" ibaresi arşive) · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 854 bayt):**

| Y-18 | Ş0 | **madde 126 — `answeredFollowup` olmayan tabloyu sorguluyor; profil tamamlanma yüzdesi sistematik DÜŞÜK.** | 🔴 KARAR-36 | Profil tamamlanma yüzdesi gerçek veriye dayanıyor | BEKLIYOR | ⚠️ **RAPOR DÜZELTMESİ — etki sanılandan BÜYÜK.** Rapor *"try/catch sessizce 0 dönüyor"* dedi; gerçek daha kötü: `profile-completeness.service.ts:43-50` **`(prisma as any).answeredFollowup?.count(...)`** — optional chaining **fırlatmadan `undefined` döner** → ` · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · eski kapı: 🟢 \|\| 0` → **HER ZAMAN 0** ve **`catch` bloğu ÖLÜ KOD**, yani `profileSource==='HYBRID' ? 1 : 0` yedeği **hiç çalışmıyor**. Tablo gerçekten yok (`grep answeredFollowup schema.prisma` → 0). · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

### I-12 (2026-09-28, 3. düzeltme)

**Değişiklik:** eski (2026-09-21) kanıt aralığı arşive — güncel kanıt ATLANDI notundaki (2026-09-26); "Kapı sütunu değiştirilmedi" ibaresi arşive · kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🟢" → "🟢" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1139 bayt):**

| I-12 | Ş1 | **madde 142 — karakter kartı derinleştikçe yeniden hesaplanmıyor (15→35 soru).** Kart onboarding'de bir kez üretiliyor, sonra hiç tazelenmiyor. | ~~🟡~~ 🟢 | Kullanıcı daha fazla soru cevaplayınca kartı güncelleniyor | ATLANDI(karar) | 🟡 KALIR: matching/skorlama dosyası. Kanıt (2026-09-21, raporda yoktu — bu turda bulundu): `discResultCard` YALNIZ `backend/src/controllers/onboardingController.ts:465-493`'te üretiliyor; `recalcDiscVector` (`discVectorService.ts:152-155`) `UserProfile.discD..C`'yi günceller ama **`discResultCard`'a dokunmaz**. ⚠️ I-13'ün ölçek düzeltmesinden SONRA anlamlı. · aile: Y-C · kapı 2026-09-26 (4 renk) · ⏭️ **ATLANDI(karar) 2026-09-26:** kartı derinleşen cevaplardan yeniden hesaplamak, "mizaç sonucunu hangi test belirler" sorusunu fiilen A (32 soruluk test esas) yönünde cevaplamak demek → **KARAR-57** cevaplanınca açılır. Kanıt: kart yalnız `onboardingController.ts:482-498` (8 soruluk test) üretiyor; `recalcDiscVector` (`discVectorService.ts:107-174`) `discType`/`discResultCard`'a dokunmuyor. Kapı sütunu değiştirilmedi. |

### AJ-76 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresi tek renk: "🟡 (paylaşımlı depo PO eli; kod kısmı 🟢 +7b)" → "🟡 (paylaşımlı depo PO eli)" (ikinci renk Not'a "kısım kapısı")

**Önceki tam satır (AYNEN, 708 bayt):**

| AJ-76 | Ş0 | **İstek sınırı sayaçları süreç belleğinde** (G8-11) — birden çok backend kopyası çalışırsa her kopya ayrı sayar, sınır kopya sayısıyla çarpılır. | 🟡 (paylaşımlı depo PO eli; kod kısmı 🟢 +7b) | Önce kopya sayısı teyidi (AN-06 / 03-PO #29): tek kopyaysa "bellek içi yeterli" kararı kodda gerekçeli yorum; çoksa sayaçlar paylaşımlı depoda (Redis ya da DB) ve iki kopyada toplam sınır aşılmıyor (test) | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:216` (GÖREV 4) · kanıt: `backend/src/middleware/rateLimiter.ts:14` (`new Map`) · backend `package.json` Redis yok · ilgili: AN-06, AJ-29 |

### AJ-77 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresi tek renk: "🔵 (migration; envanter + taslak kısmı 🟢)" → "🔵 (migration)" (ikinci renk Not'a "kısım kapısı")

**Önceki tam satır (AYNEN, 1485 bayt):**

| AJ-77 | Ş0 | **Durum alanlarının enum'a çevrilmesi + çift rol (`User.role` ↔ `TenantMembership.role`) okuma yolları envanteri** (G6-02 / madde 49) — serbest metin durum alanları geçersiz değer kabul ediyor; bazı okumalar hâlâ genel rolden. | 🔵 (migration; envanter + taslak kısmı 🟢) | Envanter (alan · canlı değer dağılımı, salt-okuma) + migration PR'ı + tarihli yedek planı + EVET/HAYIR kartı hazır; rol okumalarının `TenantMembership.role`'e geçiş listesi (AJ-01/40/56 sonrası kalan) | PR-ACIK | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:186` (GÖREV 4) · kanıt: `backend/prisma/schema.prisma` (Tenant · MeetingCheckIn · UserReport · MentorshipAgreement · InvitationTemplate String alanları) · `docs/otonom/00-KUYRUK.md:342` (madde 49 alınmadı) · 🔵 **PR-ACIK 2026-09-28:** backend #227 (⛔ MIGRATION `20260928000000_durum_alanlari_enum`, 13 kolon / 5 tablo) + çatı #420 (envanter `docs/raporlar/kod-denetimi/aj77-durum-alanlari-envanter-2026-09-28.md`); 7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/227#issuecomment-5865731487 · test `backend/tests/aj77-status-enum.unit.test.ts` (40) · mutasyon yerel 2/2 kırmızı · EVET kartı KARAR-128 · merge öncesi: §3b sayımı 0 + tarihli yedek (DB erişimi) · girmeyen: `Tenant.plan` (KARAR-119) · `SystemLog.category` (AUDIT temizliği) · rol okuma envanteri → AJ-105 · kilit: KARAR-128 bekliyor (EVET/HAYIR) |

### I-08 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🔵" → "🔵" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 800 bayt):**

| I-08 | Ş1 | **madde 158 — deneme sınırı GÜNLÜK değil.** Kural "her 2 başarısız denemede 24s bekleme"; madde "günde 2 deneme" istiyor (aynı gün ezberlenmesin). | ~~🟡~~ 🔵 | Aynı takvim gününde 2'den fazla deneme yapılamıyor | BEKLIYOR | 🟡 KALIR: deneme sayacına **takvim-günü** alanı = migration olası. 🟡 **YARIM — rapor "disiplin yok" diyordu, ÇÜRÜDÜ.** VAR: `certification.service.ts:30` `attemptsBeforeCooldown:2` · `:32` `cooldownHours:24` · `:144-151` cooldown kapısı + `COOLDOWN_ACTIVE` · `:221-229` sayaç yazımı · FE bekleme mesajı **ve** yolculuğa yönlendirme `mentor/certification/page.tsx:65-66,149-152,326-335`. FARK: `:226-227` `newAttempts % 2 === 0` — takvim-günü sıfırlaması yok. · aile: Y-G · kapı 2026-09-26 (4 renk) |

### I-17 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🔵" → "🔵" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 912 bayt):**

| I-17 | Ş1 | **madde 167 — öğrenme yolculuğunda GİZLİLİK + BİTİRME aşaması yok (8→10).** İki konu sertifikada SINANIYOR ama yolculukta hiç öğretilmiyor → "öğretilmemiş konuda eleme". | ~~🟡~~ 🔵 | Mentör yolculukta gizlilik ve bitirme aşamalarını görüyor | BEKLIYOR | 🟡 KALIR: **SEED** (KARAR + yedek şart; seed çalıştırılmaz). ⛔ **İÇERİK KONSEYİ DÜZELTMESİ (2026-09-21): bu satır "seed işi" diyor ama SEED'E KOYACAK İÇERİK HİÇ YAZILMAMIŞ** → önce **yazım turu**, seed ondan sonra. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md` §0② / §2.1. Kod kanıtı: `prisma/seed-learning-journey.ts` içinde `GIZLILIK`/`BITIRME` → **0 sonuç**; bugünkü sayım MENTOR 7 + MENTI 6 (`:7` yorumu + `:39-299`/`:300-500`). İçerik yazım turu ÖNKOŞUL. ⚠️ K-18 ile aynı seed dosyası → SIRALI. · aile: Y-G · kapı 2026-09-26 (4 renk) |

### K-15 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🔵" → "🔵" · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1009 bayt):**

| K-15 | Ş2 | **AvailabilityBlock'a format + süre (tam randevu mimarisi).** ⛔ önce `availability_block_yedek_20260910`; migration default'lu (format=ONLINE, durationMin=60); mentör slot açarken format+süre seçer; menti slottan seçer. | ~~🟡~~ 🔵 | Mentör format+süre belirliyor, menti seçiyor, eski kayıtlar bozulmadı | PR-ACIK | KAYNAK: KARAR-1 → A (2026-09-21; PO şartı: önce tarihli yedek, sonra açık onay) · AN-25 buraya katlandı (KARAR-80/M10; koşul alanları bu PR'da yok) · aile: Y-G · 🔵 **HAZIRLANDI 2026-09-27:** backend #189 (⛔ MIGRATION: `AvailabilityBlock.format` @default ONLINE + `durationMin` @default 60; 7b ONAY) + çatı #374 (form + randevu ekranı; 7b ONAY). AN-25 koşul alanları bilerek dışarıda (tasarlanmadı). EVET/HAYIR: **KARAR-111** (mevcut blokların ONLINE/60'a daralması, <60 dk blok riski, yedek MERGE'DEN ÖNCE). · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § K-15 (2026-09-28) · kilit: KARAR-111 bekliyor (EVET/HAYIR) |

### E-3 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟢/🟡~~ 🟢" → "🟢" · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1737 bayt):**

| E-3 | değişir | **BAĞLA kovasını yap.** Her kalem ayrı PR, kendi şeridinde. Küçük ve migration'sız olanlar 🟢, diğerleri 🟡. Sırala: en az emekle en çok kullanıcı değeri önce. | ~~🟢/🟡~~ 🟢 | Her kalem için kullanıcı ekranda bir şey görüyor | BITTI (kısmen — kalanlar devredildi: anlaşma taslağı → 🔴 KARAR-109 · bağlamsal kart → U-18/KARAR-97 · değerlendirme okuma → AJ-49 · 3 takip → AJ-106) | ⭐ **KEŞİF (2026-09-25):** `docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md` — 62 uç: **BAĞLA 10** (1'i 🔴 U-01) · MÜKERRER 21 · İÇ/SİSTEM 7 · TERK/ÜRÜN 24 (silinmez, yalnız listelendi) · DURUM (2026-09-27): E-3a gereksiz (rozet zaten `admin/eslesmeler` Risk sütununda) · E-3b (backend #127 + çatı #308) · E-3c (backend #135 + çatı #313) · E-3d (backend #187 + çatı #371) · E-3e (çatı #372) BITTI · KALAN: anlaşma taslağı → 🔴 KARAR-109 (kim başlatır — PO) · bağlamsal geri bildirim kartı → U-18 / KARAR-97 (PO EVET'i bekliyor) · değerlendirme okuma (`GET /api/meetings/:meetingId/feedback`) → AJ-49 · takip → AJ-106 (engel koyma ucu denetim kaydı · kayıp güncelleme · seçim listeleri ilk sayfa) · KARAR (GÖREV 2.4 düzeltmesi): yapılabilir 🟢 kısım kalmadı; kalan her ayağın sahibi var → Durum "BITTI (kısmen)", satır 5c-a gereği kuyrukta; anlaşma taslağı ayağının sahibi bu satır (KARAR-109) · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § E-3 (2026-09-28) · kilit: kalan ayak KARAR-109 bekliyor (kalan ayak: anlaşma taslağı (sahibi E-3)) — § 🔴 KİLİT HARİTASI · kilit: kalan ayak KARAR-97 bekliyor (kalan ayak: bağlamsal geri bildirim kartı, U-18 üzerinden) |

### E-4 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🔵" → "🔵" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 815 bayt):**

| E-4 | Ş0 | **ARŞİV BELGESİ + KARANTİNA.** `docs/arsiv/silinenler-2026-09-10.md` oluştur: her karantina adayı için tam kod içeriği, neden yazıldığı, neden devre dışı bırakıldığı, son commit hash'i, geri alma komutu. Sonra karantinaya al (rota kapat / @deprecated), **SİLME**. ⛔ Gerçek silme ayrı bir turda, PO'nun ikinci onayıyla. | ~~🟡~~ 🔵 | Arşiv belgesi tam + karantina PR'da; hiçbir şey silinmedi | BEKLIYOR | 🟡 KALIR: karantina = kaynak rota devre dışı bırakma (geri-dönüş hassas) + KARAR-11 silme protokolüne bağlı. · aile: Y-F · ⛔ **çelişki: KARAR-80/M14** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M14: ana satır (tek karantina turu, silme protokolü); K-13/AN-13/AN-40 katlandı. · kapı 2026-09-26 (4 renk) |

### P-08 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🔵" → "🔵" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 655 bayt):**

| P-08 | Ş1 | **Öğrenme yolculuğu ilerlemesi kalıcı değil.** Panel kartı yalnız "başla/tamamlandı"; "neredeyim, sıradaki adım" yok. Sayfadan çıkan menti ilerlemeyi kaybediyor. | ~~🟡~~ 🔵 | Menti yolculukta kaçıncı aşamada olduğunu kalıcı görüyor | BEKLIYOR | 🟡 KALIR: şema/migration gerekebilir (completedStages) — belirsiz (kanıt: "Backend/şema completedStages gerekebilir"). =M8. Kanıt: `ScenarioGuideEngine.tsx:97 useState(0)`; API `{completed,totalStages}` ama tamamlanan aşama SAYISI yok (`learningJourney.ts:79-84`). Backend/şema completedStages gerekebilir. Efor M · aile: Y-G · kapı 2026-09-26 (4 renk) |

### U-18 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🔵" → "🔵" · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1311 bayt):**

| U-18 | Ş0 | **`MatchRequest` durumsuz → mentörün mesaj talebini kabul/ret kapısı yok;** `Match` tablosuna yazan kod yok (`createMatchIfEligible` 0 çağıran). | ~~🟡~~ 🔵 | Mentör mesaj talebini kabul/ret edebiliyor (karara göre) | PR-ACIK | aile: Y-C · DURUM: PR-ACIK — backend #148 + çatı #326 (CI yeşil; 7b 2. tur ONAY 2026-09-26) · ⛔ MIGRATION `Conversation.rejectedAt` (boş bırakılabilir ek alan; dosya elle yazıldı, uygulanmadı) → merge için PO EVET'i (KARAR-97) + `Conversation` tarihli yedeği · Uygulama: mentör `POST /api/conversations/:id/reject` ile reddediyor (menti/yönetici/yabancı → 404), menti nazik ret metni görüyor, alternatif mentör önerisi YOK (KARAR-22 B; I-16 ret metinleri buraya katlandı — KARAR-80/M1) · Kapsam dışı: P-05 (görüşme reddi) · e-posta bildirimi (SMTP) · `MatchRequest` durum alanı · Takip (satırı yok, strateji katmanına): gerçek bildirim + gelen kutusunda ret işareti; bildirim metnindeki "Mentörünüz" · ⛔ Sıra kuralı: `Match` yazımı ancak silme yolu (GV-08, tamamlandı) sonrası açılır · KAYNAK: X §3 K6 / §10#23 · kod incelemesi D1 · kanıt `schema.prisma:439-456` · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § U-18 (2026-09-28) · kilit: KARAR-97 bekliyor (EVET/HAYIR) |

### Y-05 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🔵" → "🔵" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1058 bayt):**

| Y-05 | Ş0 | **madde 100 — `SystemLog.meta` JSON-yol sorguları indekssiz.** Log büyüdükçe kalibrasyon sayfası ve dürtme kontrolü yavaşlar. | ~~🟡~~ 🔵 | Log büyüdükçe kalibrasyon sayfası yavaşlamıyor | BEKLIYOR | 🟡 KALIR: **MIGRATION** (yeni `@@index`). madde 100. Kanıt: `prisma/schema.prisma:683-696` — `meta Json?` `:688`, indeksler `:691-695` (level/category/createdAt) — `meta` yok. ⭐ **Sorguyu YAPAN kod (raporda yoktu, bu turda bulundu):** `algorithmTuner.ts:209` `meta:{path:['tenantId']}` **ve** `nudgeService.ts:30` `meta:{path:['targetUserId']}` — indeks ikisini de hedeflemeli. · aile: Y-G · kapı 2026-09-26 (4 renk) · ⏸️ 2026-09-26: kod bu turda YAZILMADI — Prisma'nın JSON yol sorgusunun (`meta:{path:[…],equals}`) ürettiği SQL ile ifade indeksinin eşleştiği ancak veritabanında `EXPLAIN` ile kanıtlanabilir; Prisma şeması ifade indeksini temsil edemez (ileride `migrate dev` drift'i indeksi silmeye kalkabilir). **Tek seferlik DB erişimi gerekiyor (EXPLAIN)** → 00-SIMDI Engeller. |

### Y-12 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🟢" → "🟢"

**Önceki tam satır (AYNEN, 1260 bayt):**

| Y-12 | Ş4 | **madde 56+67 — ölçüm kodu (GTM/GA4/Clarity) ve çerez izni.** ⭐ **PR #110'u açan anahtar.** NEDEN: kurum sahibi ziyaretçi sayısını görmeli; ölçüm kodu çerez izninden önce açılırsa "KVKK ihlali doğar" (PR #110 başlığı: "çerez izni yok, KVKK riski"). | ~~🟡~~ 🟢 | Kullanıcı ilk girişte çerez tercihini seçiyor; reddederse izleme yüklenmiyor; kurum sahibi ziyaretçi sayısını görüyor | BEKLIYOR | ⚠️ **BİRLEŞTİRİLDİ (2026-09-21):** madde 67 **tek başına açılmamalı** — bugünkü main'de üçüncü-taraf çerez **SIFIR** (7 terim, harf duyarsız → ölçüm/izin kodu 0) ve `app/gizlilik/page.tsx:62-63` bunu açıkça beyan ediyor ⇒ bugün çerez bandı **yasal olarak gereksiz**. ⛔ **SIRA BAĞIMLILIĞI: 67 → 56.** 56 önce merge edilirse KVKK ihlali doğar. ⭐ Kod **YAZILMIŞ**: `origin/feat/analytics-seo-2026-08-22` (`dcf5d9a`) içinde `components/analytics/Analytics.tsx` var, main'de yok; **PR #110 AÇIK** (GitHub teyidi 2026-09-21, başlık: *"🛑 MERGE ETME — çerez izni yok, KVKK riski"*). Bu satır = **#110'u merge edilebilir hale getirmek**, sıfırdan yazmak değil. · aile: Y-B · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § Y-12 (2026-09-28) |

### Y-17 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟢~~ 🟢" → "🟢" · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1240 bayt):**

| Y-17 | Ş0 | **madde 166 — iki farklı `rankMentorsForMenti` fonksiyonu.** Aynı ad, iki dosya, farklı imza (biri senkron biri async); yanlışını import etmek kolay. | ~~🟢~~ 🟢 | Tek isim tek davranış; yanlış import imkânsız | BEKLIYOR | Kanıt (tam **2 tanım**): `scoring.service.ts:165` (senkron) ↔ `matching.ts:351` (async). Ayrı ayrı çağrılıyorlar: `sjtScoringController.ts:5,133` ve `sector-scorer.service.ts:4,110` → scoring.service · `matchingController.ts:5,107` → matching. ⚠️ I-13/I-14 ile aynı dosya ailesi → **SIRALI**. ⚠️ = psikometri konseyi §5 D.3 dipnotu, ek bulgu: güncel teyit — matching.ts:351 (canlı, async) ↔ scoring.service.ts:165 (ölü, senkron); karışıklık riski gerçek, bu raporun kendisi de ayrımı her seferinde açıkça yazmak zorunda kaldı. · **KARAR-80/M21 sıra notu:** PS-A1..A3'ten SONRA (hangi puanlama imzası kalacak PS-A3 ile belirlenir). · ⚠️ **2026-09-25 kapı düzeltmesi:** Not'taki sıra: PS-A1..A3'ten SONRA (hangi puanlama imzası kalacak) — onlar 🔴 KARAR-80. · KARAR-80 işlendi (2026-09-26, A kabul) — M21: sıra notu işlendi (PS-A1..A3'ten SONRA); bu bir karar değil sıra bilgisi, kapı eski haline (🟢) döndü. |

### YN-13 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🟢" → "🟢" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1305 bayt):**

| YN-13 | Ş0 | **Kişi adı yasağı kendi dosyasında ihlal ediliyor.** Kural `CLAUDE.md § Kişi Adı Yasağı` *"Hiçbir kod/yorum/commit/PR/belgeye kişi adı YAZMA"*; ihlal **aynı dosyanın 279 satır yukarısında** (`CLAUDE.md § Nedir`) + `00-KUYRUK.md:2` + toplam **13 dosyada 15 geçiş**. Kuralın kendi istisnası (*"ayrı bir temizlik işinde giderilir"*) → iş **hiç açılmadı**. ⚠️ **Repo PUBLIC.** | ~~🟡~~ 🟢 | Public repoda kişi adı geçmiyor | ✅ BITTI (kısmen, PO elle işi kaldı) | §B.3-4. ⚠️ KVKK metinlerindeki **4 geçiş yasal zorunluluk**, hariç (G9-14 "DOKUNULMADI" kararı). 🟡: KVKK dosyalarına komşu. **Bu satır ve bu rapor ad listesi ÜRETMEZ** — `grep` PO'nun elinde. · aile: Y-B · ✅ **BITTI 2026-09-26:** çatı #334 (`49c8cbb`). CANLIDA BAK: (iç) çalışma kuralları/kuyruk/içerik raporunda kişi adı yok. Kalan PO kısmı: backend `.claude/settings.local.json` → 03-PO-ELLE-ISLER. · ⚠️ K5-Y2: `G9-belge-surec.md:277`'de alıntılanan tam ad kaldırıldı (2026-09-26); backend `.claude/settings.local.json` PO kısmı. · Kapsam dışı (bilinçli): `kvkk-metinleri/` (yasal zorunluluk) · repo bağlantılarındaki GitHub kullanıcı adı · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § YN-13 (2026-09-28) |

### AN-02 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🔵" → "🔵" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 667 bayt):**

| AN-02 | Ş1 | **Seed metin yazım düzeltmesi:** `seed.ts:69` "güçlüğüm"→"güçlü yanım" + `seed.ts:537` "Menteen"→"Mentin". | ~~🟡~~ 🔵 | Kullanıcı doğru yazımı görüyor | PR-ACIK | Kaynak: A3 · IK(A.3). 🟡: seed dosyası (⛔ seed ÇALIŞTIRILMAZ, yalnız metin düzeltme); canlıda görünür. · aile: Y-G · kapı 2026-09-26 (4 renk) · 🔀 **PR-ACIK 2026-09-26 (🔵):** backend #160 — `seed.ts:70` "güçlüğüm"→"güçlü yanım" · `:540` "Menteen"→"Mentin" (seed ÇALIŞTIRILMADI; güncel satır numaraları 70/540). Canlı düzeltme = 2 satır UPDATE → **KARAR-99** EVET/HAYIR. · kilit: KARAR-99 bekliyor (EVET/HAYIR) |

### AN-06 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡 PO-ELLE~~ 🟢" → "🟢" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 695 bayt):**

| AN-06 | Ş0 | **Deploy topolojisi + kapasite teyidi:** Neon `connection_limit` · cron çok-instance advisory-lock. | ~~🟡 PO-ELLE~~ 🟢 | Topoloji doğrulandı, cron çift-çalışma riski kapandı | BEKLIYOR | Kaynak: A7 · OB-06/OB-08. PO teyidi = `03-PO-ELLE-ISLER.md`. Tek-instance ise OB-08 ⚫; değilse 🟡 kod işi. · aile: Y-? (belirsiz — deploy/cron altyapı, PO-ELLE) · kapı 2026-09-26 (4 renk) · ⚠️ 2026-09-26 not: cron çift-çalışma kilidi Neon bağlantı havuzunda (pooler) oturum-düzeyi `pg_advisory_lock` ile güvenilir çalışmaz; sağlam çözüm iş-penceresi tablosu = migration (🔵). Önce PO teyidi (tek instance mı) gerekir → 03-PO-ELLE-ISLER. |

### AN-27 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🔵" → "🔵" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 430 bayt):**

| AN-27 | Ş2 | **"Zaman önerisi" mesaj tipi:** yapılandırılmış mesaj (menti NEDEN görüşmek istediğini + talep edilen ZAMAN); mentör sıradan mesajdan ayırt eder. | ~~🟡~~ 🔵 | Mentör "zaman önerisi"ni normal mesajdan ayırt ediyor | BEKLIYOR | Kaynak: **KARAR-53 ②④** (Bölüm 3). Mesaj şemasına tip alanı → 🟡 (KARAR-1 birleşik migration'a katılabilir). · aile: Y-G · kapı 2026-09-26 (4 renk) |

### AN-29 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🟢" → "🟢" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 618 bayt):**

| AN-29 | Ş3 | **Topluluk tipi kurum + lider başvuru/onay akışı:** lider talep oluşturur → PO yalnız lideri onaylar → lider üyelerini kendisi davet eder. | ~~🟡~~ 🟢 | Topluluk lideri başvurup onaylanınca kendi ekosistemini açıyor | BEKLIYOR | Kaynak: **KARAR-34 SORU 1** (Bölüm 3). 🔴/🟡: auth + kurum akışı; KARAR-34 cevaplı ama kayıt metni AVUKAT bekliyor (AN-30). · ⛔ **çelişki: KARAR-80/M17** (2026-09-25) · eski kapı: 🔴 KARAR-34 · KARAR-80 işlendi (2026-09-26, A kabul) — M17: KARAR-34 CEVAPLANDI (2026-09-23) — kapı 🟡'ye döndü. · kapı 2026-09-26 (4 renk) |

### AN-30 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🔵" → "🔵" · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1322 bayt):**

| AN-30 | Ş3 | **Kayıt ekranı: zorunlu + isteğe bağlı maddeler** (DISC eşleştirme · yurt dışı saklama · veri işleme · anonim iyileştirme = ZORUNLU; kurumlar-arası paylaşım · OCEAN = İSTEĞE BAĞLI). Aynı ekran kurum yöneticilerine de. | ~~🟡~~ 🔵 | Kullanıcı ayrı ayrı onay veriyor; zorunlu eksikse giriş yok | PR-ACIK | KAYNAK: KARAR-34 SORU 1 · F-03 buraya katlandı (KARAR-80/M17) · ⛔ ÇIKIŞ BLOKERİ (KARAR-69 B, 2026-09-23): onay ekranı ilk kullanıcıyla devreye giren KVKK tabanı · DURUM: PR-ACIK — backend #142 (⛔ MIGRATION: `ConsentType`'a 6 yeni değer; dosya elle yazıldı, uygulanmadı) + çatı #320: klasik ve OAuth kaydında `GranularConsentForm` (6 kutu), `NEXT_PUBLIC_GRANULAR_CONSENT_ENABLED` bayrağı arkasında (varsayılan kapalı → canlıda görünmez) · metinler yer tutucu: ⛔ avukat onayı olmadan canlıya açılmaz · KALAN (PO): ⓐ migration onayı ⓑ STK self-serve kurum kaydı ekranı ayrı iş olarak kuyruğa alınsın mı (satırı yok) ⓒ bayrağın açılışı avukat metni sonrası · ✅ 7b 2. tur ONAY (2026-09-26; backend `df8db92` · çatı `43490fc`) — PO EVET'i (KARAR-96) + `Consent` yedeği bekler. · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AN-30 (2026-09-28) · kilit: KARAR-96 bekliyor (EVET/HAYIR) |

### AN-36 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresi tek renk: "🟡" → "🔵 (kod: migration)" (ikinci renk Not'a "kısım kapısı") · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı

**Önceki tam satır (AYNEN, 803 bayt):**

| AN-36 | Ş3 | **Veri İşleyen Sözleşmesi için Tenant yasal-kimlik alanları (G1-12).** NEDEN: kurum KVKK veri işleyen sözleşmesini panelden imzalayıp yönetebilmeli; bunun için yasal kimlik alanları (adres/KEP/MERSİS) gerekiyor (G1-12). | 🟡 | Kurum, KVKK veri-işleyen sözleşmesini panelden imzalayıp yönetebilir | BEKLIYOR | kaynak: CS raporu (KN-04) · §4.2 (G1 en değerli öksüz). Kanıt: `G1-guvenlik-kvkk.md` G1-12; kuyrukta karşılığı yok. 🟡: migration + KVKK/hukuk. `[PO DOLDURACAK]` yasal alanlar (adres/KEP/MERSİS) **kod-dışı** → 03-PO-ELLE. · aile: Y-G · PO kısmı: kurumun yasal kimlik bilgilerini (adres/KEP/MERSİS) sağlamak ve veri işleyen sözleşme metnini avukata onaylatmak; kod kısmı migration içerdiğinden 🔵 akışıyla hazırlanır. |

### AN-49 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🟢" → "🟢" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 900 bayt):**

| AN-49 | Ş3 | ⭐ **Dört feedback modeli tek KALİTE GÖRÜNÜMÜNE bağlansın.** Kim görür → KARAR-67 (drill-down) ile bağlantılı, önce ona bak. | ~~🟡~~ 🟢 | Yönetici tek, tutarlı kalite görünümü görüyor | BEKLIYOR | kaynak: strateji karar oturumu (E.1c). ⛔ **SIRA ÖNEMLİ:** (1) KVKK silme yolu düzeltilsin (GV-08) → (2) SONRA `Match` yazımı açılsın (U-18/PS-04/F-11) → (3) SONRA kalite görünümü. Ters sıra KVKK ihlali doğurur. ⚠️ **KARAR-66 B ile çelişki YOK** — ölçüm kurulunca "yönlendirme kalitesi" iddiası KANITLA geri KONABİLİR. 🟡: matching/KVKK bağımlı. · aile: Y-C · kapı 2026-09-26 (4 renk) · kilit: kalan ayak KARAR-67 bekliyor (önce KARAR-67: kim görür (drill-down)) — § 🔴 KİLİT HARİTASI · kilit: kalan ayak KARAR-89 bekliyor (kart KARAR-89 bu işi kilitlediğini söylüyor (tek değerlendirme kutusu)) |

### AJ-91 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresi tek renk: "🟡 (kuruma görünen metin — PO onayı; kod kısmı 🟢)" → "🟡 (kuruma görünen metin — PO onayı)" (ikinci renk Not'a "kısım kapısı")

**Önceki tam satır (AYNEN, 649 bayt):**

| AJ-91 | Ş0 | **Kurum yönetici paneli sayfa açıklama metinleri sadeleştirilmeli** — her sayfanın başındaki "bu sayfa ne işe yarar" metni daha basit/açıklayıcı olmalı (PO notu). | 🟡 (kuruma görünen metin — PO onayı; kod kısmı 🟢) | Metinler tek sözlük dosyasında; her panel sayfasında tek cümlelik sade tanım; PR'da eski/yeni metin tablosu, PO onaylı; metin testi | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `docs/kararlar/konu/06-tasarim-ux.md:59` (GÖREV 4) · kanıt: `frontend/src/app/(admin)/admin/**` sayfa başlık altı metinleri · PO kısmı: `03-PO-ELLE-ISLER.md` § 🟡 KAPI SATIRLARININ PO KISMI |

### AJ-101 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresi tek renk: "🟢 belge (+ 🔴 KARAR-127 ürün kısmı)" → "🟢 belge" (ikinci renk Not'a "kısım kapısı")

**Önceki tam satır (AYNEN, 864 bayt):**

| AJ-101 | Ş0 | **Psikometri belgesinin "Mentörlük yetkinliği & sertifikasyon ✅" bölümü kodla çelişiyor** (GÖREV 2.2 KISMEN) — "Mini Akademi 4 modül" kodda yok, "Baraj 65" T4 kararıyla "%80 konu" oldu; belge ✅ diyor. | 🟢 belge (+ 🔴 KARAR-127 ürün kısmı) | Bölüm başlığı ve maddeler kod gerçeğine göre güncel (eski metin arşivde); Mini Akademi maddesi KARAR-127 cevabına bağlı olarak "yapılmadı / planlandı" | BEKLIYOR | ajan-ekledi 2026-09-28 · kaynak: `docs/raporlar/kod-denetimi/eski-onay-dogrulama-2026-09-28.md` (AJ aday 1) · kanıt: `docs/kararlar/konu/03-psikometri-ve-algoritma.md:47-50` ↔ `backend/src/services/certification.service.ts:27,33,52` · NEDEN: belge "var" dediği için kimse yapmıyor ya da kararını vermiyor · kilit: kalan ayak KARAR-127 bekliyor (kalan ayak: Mini Akademi ürün kısmı) |

### AN-50 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟢~~ 🔴 KARAR-64" → "🔴 KARAR-64"

**Önceki tam satır (AYNEN, 998 bayt):**

| AN-50 | Ş3 | ⭐ **"eşleştirme" → "yönlendirme" (kullanıcıya GÖRÜNEN metin).** Ekran metinleri · kartlar · e-posta şablonları · sertifika metinleri · landing'de "eşleştirme" gözden geçir; doğrusu "öneri"/"yönlendirme". | ~~🟢~~ 🔴 KARAR-64 | Kullanıcı "sistem eşleştirir" değil "yönlendirir/önerir" dilini görüyor | BEKLIYOR | kaynak: **KARAR-66 B + PO düzeltmesi** (E.2a). ⛔ **KOD İÇİ teknik adlar DEĞİŞMEZ** (`matching.ts` · `matchScore` · `Match` tablosu) — yalnız kullanıcıya görünen metin. Kapsam beyanı ver (dizin · desen · harf duyarsız · iki dilli). ⚠️ **KARAR-64 (mizaç/karakter/kişilik adı) ile BİRLİKTE yapılmalı** — ayrı yapılırsa kullanıcıya İKİ KEZ metin değişikliği gider. Neden gerekli: sistem eşleştirmiyor, ÖNERİYOR (yanlış vaat). · ⚠️ **2026-09-25 kapı düzeltmesi:** Not'taki bağımlılık: KARAR-64 (mizaç/karakter/kişilik adı) ile BİRLİKTE yapılmalı; KARAR-64 cevapsız. |

### AN-51 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟢 belge~~ 🔴 KARAR-64" → "🔴 KARAR-64"

**Önceki tam satır (AYNEN, 583 bayt):**

| AN-51 | Ş4 | **BELGELERDE "eşleştirme" iddiası gözden geçir** (düşük öncelik). "Eşleştirme" iddiası geçen yerlere `~~üstü çizili~~` + "⚠️ DÜZELTME (2026-09-23, PO): sistem eşleştirmez, YÖNLENDİRİR." | ~~🟢 belge~~ 🔴 KARAR-64 | (belgeler "eşleştirme" değil "yönlendirme" der) | BEKLIYOR | kaynak: KARAR-66 B (E.2b). ⛔ 📸 DONDURULMUŞ belgelerin gövdesini DEĞİŞTİRME; not SONA eklenir. Neden gerekli: iddia belgelerde de yanlış. · ⚠️ **2026-09-25 kapı düzeltmesi:** AN-50 ile aynı terim kararına bağlı (KARAR-64 cevapsız). |

### AN-08 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟢~~ 🔴 KARAR-76" → "🔴 KARAR-76" · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 598 bayt):**

| AN-08 | Ş3 | **`Tenant.verifiedBy` yazımı** (doğrulama controller'ında `verifiedBy: adminId`). | ~~🟢~~ 🔴 KARAR-76 | Kurum doğrulamasında kim onayladı audit izinde | BEKLIYOR | Kaynak: A9 · OB-19. Bilinçli ertelenmiş audit izi. ⚠️ **KARAR-76'ya BAĞLI (2026-09-23):** `Tenant.verifiedBy` alanının kaderi KARAR-76'da (kalsın/karantina/sil) — "sil" gelirse bu iş İPTAL, "kalsın/karantina" gelirse bu yazım işi geçerli. Önce KARAR-76. · ⚠️ **2026-09-25 kapı düzeltmesi:** Not'taki bağımlılık: `Tenant.verifiedBy` alanının kaderi KARAR-76'da; cevapsız. |

### AN-38 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟢~~ 🔴 KARAR-87" → "🔴 KARAR-87"

**Önceki tam satır (AYNEN, 567 bayt):**

| AN-38 | Ş4 | **`reviewedBy` gerçek kimlik** — `platformController.ts:525` sabit `'platform-admin'` düzelt (G4-15). | ~~🟢~~ 🔴 KARAR-87 | Rapor incelendi kaydında gerçek yönetici adı görünür | BEKLIYOR | kaynak: CS raporu (KN-06) · §4.2 "kuyruk-boşluğu" (kart var, F-satırı yok). Kanıt: `platformController.ts:525`. Düşük efor. · ⚠️ **2026-09-25:** platform yöneticisi tek ortak hesap (`platformController.ts:35-60`, `sub: 'platform-admin'`) → kaydedilecek başka kimlik yok; "gerçek ad" yeni hesap modeli ister → **KARAR-87** |

### Y-07 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟢~~ 🔴 KARAR-88" → "🔴 KARAR-88" · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 544 bayt):**

| Y-07 | Ş4 | **madde 57 — Hakkımızda ve İletişim sayfaları yok.** | ~~🟢~~ 🔴 KARAR-88 | Ziyaretçi /hakkimizda ve /iletisim'i açıp iletişim yolunu görüyor | BEKLIYOR | Kanıt (4 desen `*hakkimizda*`/`*iletisim*`/`*about*`/`*contact*`, `find`, harf duyarsız → **0**): `frontend/src/app/` dizin listesi. ⚠️ Y-06 ile **aynı dosyalara** dokunur → **SIRALI** (önce Y-06 Footer bileşeni). İletişim bilgisi **PO'dan** gelmeli. · ⚠️ **2026-09-25:** metin + iletişim bilgisi PO'dan gelmeli → **🔴 KARAR-88**. |

### Y-11 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟢~~ 🔴 KARAR-88" → "🔴 KARAR-88" · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1371 bayt):**

| Y-11 | Ş4 | **madde 60+61 — "yukarı çık" ve yüzen WhatsApp düğmesi yok.** | ~~🟢~~ 🔴 KARAR-88 | Kullanıcı sağ-altta iki düğmeyi görüp kullanıyor | BEKLIYOR | Kanıt: `frontend/src/`, 6 terim (`scrolltotop`·`scrollTo(0`·`scrollTo({ top: 0`·`yukarı çık`·`back-to-top`·`backToTop`), harf duyarsız → **0**. ⚠️ **RAPOR DÜZELTMESİ:** WhatsApp yalnız `ShareButtons.tsx:21` denmişti; **ikinci kullanım `(admin)/admin/invite/page.tsx:39,77,209`** (davet metni şablonu) — ikisi de yüzen iletişim düğmesi DEĞİL. Klavye erişimi + `aria-label` zorunlu. Numara PO teyidi ister. · ⚠️ **2026-09-25:** WhatsApp ayağı (numara + düğme olsun mu) → **🔴 KARAR-88**; "yukarı çık" ayağı teknik, bağımsız yapılabilir. · 🟡 **KISMEN (2026-09-25):** "yukarı çık" ayağı çatı #299 (`f769daf`, inceleme https://github.com/zahidsamiata/menti-mentor-v2/pull/299#issuecomment-5829486936) · `frontend/src/components/atoms/ScrollToTopButton.tsx` · kök `app/layout.tsx` · test `scroll-to-top-button.test.tsx` (8; negatif: eşik altında gizli). CANLIDA BAK: uzun sayfada 600px aşağı inince sağ-altta ↑ düğmesi; tıklayınca/Enter ile başa döner. **Kalan:** WhatsApp → KARAR-88. · ⚠️ **2026-09-25 kapı düzeltmesi:** "yukarı çık" ayağı BITTI (#299); kalan WhatsApp ayağı KARAR-88'e bağlı. |

### Y-14 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🔴 KARAR-93" → "🔴 KARAR-93" · Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 2401 bayt):**

| Y-14 | Ş3 | **madde 36 — onaylı üyeyi kurumdan çıkarma ekranda YOK.** Backend zaten yapabiliyor; eksik olan düğme ve doğru e-posta metni. | ~~🟡~~ 🔴 KARAR-93 | Yönetici onaylı bir üyeyi kurumdan çıkarabiliyor ve kişi doğru metinli bilgilendirme alıyor | BEKLIYOR | 🟡 KALIR: yetki/rol akışı. ⚠️ **RAPOR DÜZELTMESİ — iş sanılandan KÜÇÜK.** Backend VAR: `adminController.ts:740-781` `rejectUser`, tek engel `:755` (REJECTED→409); **APPROVED engellenmiyor**. FE sarmalayıcı da VAR: `lib/api/admin.ts:83`. Eksik: **düğmenin onaylı-üye ekranlarına mount'u** (`mentor-havuzu`/`menti-havuzu`/`managers` bugün yalnız `rejectedAt` OKUYOR) **+ ayrı e-posta metni** — `emailService.ts:174` *"dilerseniz tekrar başvurabilirsiniz"* onaylı üye çıkarılırken **yanlış** (`adminController.ts:771-777` bunu da gönderiyor). 🔓 **KİLİT AÇILDI + KAPSAM GENİŞLEDİ (2026-09-22, KARAR-33 → B + detaylar).** Kapı **🟡 KALIR** — KVKK/silme + matching istisnası. Genişleyen kapsam (KARAR-33 CEVAP): (1) üyelik **dondurulur**, geçmiş kalır · (2) yönetici çıkarırken **SEBEP seçer**, mesaj tonu sebebe göre değişir · (3) yönetici çıkardıysa 30 gün içinde geri alınmazsa **karakter analizi (DISC/arketip/psikometri) SİLİNİR** (yeni zamanlı iş) · (4) kişi kendisi çıktıysa `/me/delete-account` akışıyla uyumlu, KVKK süresi · (5) mentörün **görüşme SAYISI düşmez** · (6) mentör geçmişinde eski üye adı **SOLUK** görünür — ⚠️ **AVUKAT onayına bağlı** (onaylanmazsa "Eski üye"). Bu ayak güvenlik konseyi ③'ü (`Match.mentorArchetype`) de çözer. Detay: `01-KARARLAR.md` KARAR-33 CEVAP. · aile: Y-B · **KARAR-80/M21 sıra notu:** GV-10 ve KR-20'den SONRA; arketip silme tek satırda (GV-08). · ⛔ **2026-09-25 doğrulama (düğme BAĞLANMADI):** `rejectUser` (`adminController.ts:760-770`) kurumdan değil **bütün platformdan** kapatıyor (User tek hesap, `schema.prisma:268` e-posta @unique; `TenantMembership` dokunulmuyor), "tekrar başvurabilirsiniz" e-postası (`emailService.ts:174`) + `reapply` ile kendi geri dönebiliyor (`authController.ts:441-453`) → KARAR-33 (B)'ye aykırı. İş yeniden tanım: backend'de kurum bazlı dondurma + sebep + mesaj + (30 gün sonra psikometri silme → canlı veri silme → **KARAR-93** evet/hayır). Sıra: GV-10 · KR-20 sonrası. |

### GV-12 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresinden üstü çizili eski kapı arşive: "~~🟡~~ 🟢" → "🟢" · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1648 bayt):**

| GV-12 | Ş4 | **Kurum kaydında "bu e-posta zaten kayıtlı" deniyor — üyelik bilgisi sızıyor.** Aynı kontrol normal kayıt akışında bilinçli olarak gizleniyor. | ~~🟡~~ 🟢 | Kayıtlı ve kayıtsız e-posta artık iki kayıt yolunda da **aynı** yanıtı alıyor | ATLANDI(karar) | 🟡 auth. **C.5-B · güvenlik konseyi §2.C.5-B, orkestratör teyitli.** Şiddet: 🔴 açık oracle. Kanıt: `selfServeController.ts:262-267` `409 EMAIL_MEVCUT` ↔ `authController.ts:177-184` **bilinçli enumeration-safe** (kodda açıklayıcı yorum). Tek fren IP 5/dk (`rateLimiter.ts:239`) ≈ 7.200 adres/gün/IP. ⭐ k-anonimlik (P-00) ve IDOR ile **aynı sınıf**: koruma bir yolda var, ikinci yol açık. ⚠️ Zamanlama yan-kanalı (`login` bcrypt atlama `:292`, `forgot-password` `:531-550`) **ayrı ve daha küçük iş**; sabit-zaman deseni `platformController.ts:23-32`'de zaten var · aile: Y-A · ⚠️ **denetimde tutmadı (K5-Y2, 2026-09-26):** 409 kalktı ama yanıt gövdesi (tenant/user null vs dolu) ve sonraki ekran kayıtlı/kayıtsız e-postayı ayırt ettiriyor (`selfServeController.ts:264-275`, kod yorumu `:269-270` "bilinen sınır"; FE `Step4Account.tsx:110-140`). Rapor `docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md`. · ⏭️ **ATLANDI(karar) 2026-09-26:** kalan sızıntı (farklı sonraki ekran) yalnız oturumsuz kayıtla tam kapanır — ürün kararı → **KARAR-102** (öneri C). 409 kaldırma kısmı canlıda. · DURUM: 409 ayağı BITTI (backend #131 + çatı #312, 2026-09-26); kalan sızıntı KARAR-102'de · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § GV-12 (2026-09-28) |

### AJ-97 (2026-09-28, 3. düzeltme)

**Değişiklik:** kapı hücresi tek renk: "🔴 silme protokolü (karantina 🔵 · gerçek silme PO ikinci onayı; kolon düşürme = migration)" → "🔴 silme protokolü" (ikinci renk Not'a "kısım kapısı") · numarasız 🔴 satırına açık "sahip:" alanı

**Önceki tam satır (AYNEN, 973 bayt):**

| AJ-97 | Ş0 | **Eski `kvkkConsentAt` alanları (User/Tenant) artık okunmuyor ama duruyor** (AJ-88 kalanı; consent planı `docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:46` "kaldırılması ayrı iş") — iki kaynak yan yana kaldıkça biri yanlışlıkla yeniden okunabilir. | 🔴 silme protokolü (karantina 🔵 · gerçek silme PO ikinci onayı; kolon düşürme = migration) | Önce okuma/yazma envanteri (dual-write hâlâ yazıyor mu, kimse okumuyor mu — dosya:satır); sonra NİYET → İKAME (Consent tablosu) → arşiv → karantina (okuma yolu yok, yazım durdurulur mu PO) → PO ikinci onayıyla kolon | BEKLIYOR | ajan-ekledi 2026-09-28 · kaynak: AJ-88 (backend #218) · `docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:46` · kanıt: `backend/prisma/schema.prisma` `kvkkConsentAt` (User, Tenant) · okuma yolu kaldırıldı `backend/src/controllers/platformTenantController.ts` (AJ-88) · NEDEN: KVKK kaydının tek kaynağı olmalı |

### F-01 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 863 bayt):**

| F-01 | Ş0 | **Belge reorg — taşıyıcı-ad + büyük reorg.** G9 grubu Faz 1a'da çoğu ✅; kalan: 5 canonical taşıyıcı belge (09-DURUM/10-yol/00-INDEX/00-KARAR-TAKIP) taşınması + ~38 referans + ~68 belge isim/klasör standardizasyonu. | 🟢 | Taşıyıcı adlar taşındı, referanslar kırılmadı | BEKLIYOR | (kapı gevşetildi 2026-09-19: belge işi) · =G9-11 (🟡) + G9-12 (⬜), Faz 1. Kanıt: 09-DURUM.md hâlâ `docs/kararlar/` kökünde ⚠️ = yönetişim konseyi §C.1/§C.3, ek bulgu: yeni açılan `docs/kararlar/konu/rtk-komut-rehberi.md` hiçbir `00-INDEX.md`'ye kaydedilmedi (KURAL 5 borcu) — bu reorg kapsamına girer. `grep -n rtk docs/kararlar/00-INDEX.md` → 0. · ⛔ **çelişki: KARAR-80/M15** (2026-09-25) · eski kapı: ~~🟡~~ 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M15: ana satır; YN-03 katlandı. |

### F-02 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1011 bayt):**

| F-02 | Ş3 | **Message otomatik imha (G1-06 kalanı).** FeedbackLog 3-yıl + SystemLog 90g imhası ✅ yazılı; kullanıcı **mesajlarının** (Message) saklama-süre imhası yazılmadı. | 🟡 | Mesaj saklama süresi dolunca otomatik siliniyor | BEKLIYOR | 🟡 KALIR: KVKK/veri imha. =G1-06, Faz 2. Süre G1-10 avukat metnine bağlı. Kanıt: `gdprService.ts` TODO(G1-10); FeedbackLog `deleteMany` var ⚠️ = güvenlik konseyi §2.B.4, ek bulgu: `Message` için süre yazılmamış olması BİLİNÇLİ ve gerekçeli (`gdprService.ts:375-378` TODO(G1-10): "kodda keyfi süre yazarsak aydınlatma metniyle çelişir"). Kıyas doğrulandı: SystemLog 90 gün `:341,366-368` ✅ ve FeedbackLog 3 yıl `:342,371-373` ✅ UYGULANIYOR — eski raporların "uygulanmamış" iddiası BAYAT. Kilit: avukat metni (03-PO #16 · P-a). · aile: Y-B · PO kısmı: avukattan kullanıcı mesajlarının KVKK saklama süresini belirletmek (03-PO-ELLE-ISLER #16); süre gelince silme kodu 🟢 kurallarıyla yazılır. |

### F-05 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1265 bayt):**

| F-05 | Ş4 | **CAPTCHA/step-up (G1-26).** Public şüphe formunda IP-limit ✅ var; CAPTCHA + step-up doğrulama yok. | 🟡 | Public formda bot/spam koruması güçlendi | BEKLIYOR | 🟡 KALIR: güvenlik/auth (step-up doğrulama). =G1-26, Faz 3. Kanıt: `suspicionRoutes.ts:9` rate-limit var; CAPTCHA grep boş · aile: Y-A · kapı 2026-09-26 (4 renk) · ⭐ **KAPI DÜZELTMESİ 2026-09-27 (kural uygulaması):** 🟢→🟡 — CAPTCHA gerçek bir dış servis hesabı + anahtar ister (PO eli, DK-01/Sentry deseni). Kod kısmı 🟢 kurallarıyla yapılıyor (anahtar yokken etkisiz); PO kısmı `03-PO-ELLE-ISLER.md`. · **2026-09-27 kod kısmı hazır:** backend #183 + çatı #367 (Cloudflare Turnstile; anahtar yokken no-op, 4 uç: register/forgot-password/self-serve-register/suspicion-reports). CI bekleniyor, MERGE YOK (PO kısmı = Turnstile hesabı + iki anahtar; bkz. `03-PO-ELLE-ISLER.md`). · ✅ **KOD KISMI CANLIDA 2026-09-27:** backend #183 (`e68f306`, 7b ONAY) + çatı #367 (`c03f754`, pointer + widget sıfırlama; 7b 2. tur ONAY). Anahtar yokken davranış aynı (no-op). ⏳ Satır 🟡 kuralı gereği PO kısmı bitene kadar AÇIK: Turnstile hesabı + iki anahtar (`03-PO-ELLE-ISLER.md` en üst, doğrulama yolu ve kesinti notu dahil). |

### DK-02 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1047 bayt):**

| DK-02 | Ş3 | **Kuruma giden "düzeltme" e-postası metni.** KARAR-23. Onay ve düzeltme maili açılır; **ret maili GÖNDERİLMEZ**. | 🟡 | Düzeltme isteyen kuruma açık, kırıcı olmayan, ne düzelteceğini söyleyen e-posta gider | BEKLIYOR | 🟡 kuruma görünen + hukuki metin — merge YOK. ⚠️ Ajan metni HAZIRLAR; bildirim AÇILMADAN ÖNCE **PO onayı** (`03-PO-ELLE-ISLER.md` avukat paketi md.8). ⚠️ SMTP (çıkış B4) + `TENANT_NOTIFICATIONS_ENABLED` (B5) bağımlı. `tenantNotifications.ts` mevcut altyapı. Detay: KARAR-23 CEVAP. · aile: Y-B · ⛔ **çelişki: KARAR-80/M21** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M21: avukat ön koşulu KALKTI (düzeltme maili metni zaten kodda var: tenantNotifications.ts:50-63, ayrıca avukat onayı gerekmiyor). Ajan metni hazırlar + gönderir; yalnız SMTP/TENANT_NOTIFICATIONS_ENABLED bağımlılığı kalır. · PO kısmı: Dokploy'da SMTP'yi ve `TENANT_NOTIFICATIONS_ENABLED='true'` ayarını açmak (03-PO-ELLE-ISLER B5 / #5). |

### IC-10 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1482 bayt):**

| IC-10 | Ş1 | **madde 139'un eksik yarısı: 4 menti "şimdilik" varyantı YAZILSIN.** Bugün yalnız mentör tarafı yazılı (4/8). | 🟢 | (ön koşul işi — kullanıcı etkisi `I-15` ile birlikte görünür: çoklu-arketip çıkan **menti** de "şimdilik" metnini okur) | ✅ BITTI (2026-09-26, metin yazıldı — onay bekliyor) | §0② · §2.1. Belge `arketip-ve-yaklasim-icerigi-2026-09-03.md:269` menti sürümü için **metin değil talimat** bırakmış; yazılı 4 varyant `:271,279,287,295` **yalnız mentör**. ⛔ **`I-15`'in ön koşulu** — I-15 bugün kodlanırsa menti tarafı boş kalır. Ayrı satır açıldı çünkü I-15 🔴 KARAR-10 kilitli, bu iş 🟢 ve ondan bağımsız ilerler. ⚠️ Eşik dalı yazılırken sihirli sayı YOK: eşik sabiti `scoring.config.ts:31` komşusuna. ⚠️ Ad seçimi ad↔kod kararına bağlı (**KARAR-45**). Efor S (yazım) · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · eski kapı: 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M16: ana satır ('şimdilik' varyantları); AN-05 yalnız '15/16 kombinasyon metni'ne daraltılmış olarak ayrıca ilerler. · ✅ **YAZILDI 2026-09-26:** `docs/raporlar/icerik/menti-simdilik-varyantlari.md` (4 varyant, mentör §6 yapısının birebir aynası; adlar yer tutuculu — KARAR-45). Kullanıcı etkisi I-15 ile görünür (🔴 KARAR-10). PO metin onayı belgede ⬜. · kilit: kalan ayak KARAR-45 bekliyor (kalan ayak: arketip adları (metinde yer tutucu)) |

### AN-05 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı

**Önceki tam satır (AYNEN, 1138 bayt):**

| AN-05 | Ş1 | **Menti "şimdilik" 4 varyantı + eşleşme detay 15/16 kombinasyon metnini yaz.** | 🟢 | Menti belirsiz eşleşmede doğru "şimdilik" metnini görüyor | 🟨 kısmen (metin yazıldı, PO onayı bekliyor — bitti-dogrulama 09-27 ⚠️) · ✅ BITTI (2026-09-26, metin yazıldı — onay bekliyor) | Kaynak: A6 · IK(D) · TO Y-30. IC-10 / I-11 ön koşulu; menti varyantı 0 yazılı. Neden: bugün boş/eksik metin. · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · eski kapı: 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M16: yalnız '15/16 kombinasyon metni'ne DARALTILDI (IC-10 ana satırdır, geri kalanı orada); bu dar kapsam bağımsız ilerler. · ✅ **YAZILDI 2026-09-26 (daraltılmış kapsam: 15/16 kombinasyon):** `docs/raporlar/icerik/birlikte-calisma-kombinasyonlari.md` — kaynak örnek (Rotacı×Ayna) aynen + 15 yeni metin, aynı 4 parçalı yapı; "eşleşme" sözcüğü kullanılmadı (KARAR-66 B). Adlar KARAR-45'e bağlı; PO metin onayı belgede ⬜. Menti "şimdilik" varyantları IC-10 ile ayrıca yazıldı. · kilit: kalan ayak KARAR-45 bekliyor (kalan ayak: arketip adları) |

### AN-12 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1013 bayt):**

| AN-12 | Ş3 | **`interactionStyle` karantina** (dondurulmuş alanı yazma şemalarından çıkar) + tie-break tek kaynak (D>I>S>C ↔ D>I>C>S). | 🔵 | Tek tie-break kuralı; ölü alan yazılmıyor | PR-ACIK | Kaynak: A14 · TO Y-13/Y-16. ⛔ SİLME PROTOKOLÜ (karantina, silme değil). 🟡 matching; tie-break önce doğrula (harf sonucu değişir). · aile: Y-C · kapı 2026-09-26 (4 renk) · ⭐ **KAPI DÜZELTMESİ 2026-09-27 (kural uygulaması):** 🟢→🔵 — iş "karantina" (dondurulmuş alanı yazma şemalarından çıkar); OTONOM-PROMPT Bölüm 7: karantina 🔵 (PR + 7b + EVET kartı). Kaynak: kalan 🟢 ayıklaması (02-ILERLEME 2026-09-27). · 🔵 **HAZIRLANDI 2026-09-27:** backend #186 (karantina: 3 yazma yolu kapandı, okuma/şema aynı; 7b ONAY, CI yeşil) + çatı #370 (silme protokolü arşivi `docs/arsiv/silinenler-2026-09-27.md`). EVET/HAYIR: **KARAR-107**. Tie-break kısmı ayrı ürün sorusu: **KARAR-108** (bugün etkisi yok). · kilit: KARAR-107 bekliyor (EVET/HAYIR) |

### AN-41 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1163 bayt):**

| AN-41 | Ş3 | **KVKK metin paketini kod-senkron güncelle** (avukata gitmeden önce; 4 boşluk kodda kapandı). | 🟡 | Avukat, ürünün gerçek (güncel) KVKK durumunu görür | BEKLIYOR | kaynak: CS raporu (KN-09) · Ç-12..15. Kanıt: metin "YOK/PR bekliyor" der, kodda merged: rıza sürümleme `consentService.ts:28` · hardDelete→anonymize `gdprService.ts:233` · FeedbackLog 3-yıl `gdprService.ts:370` · FE veri-hakları `profile/page.tsx:443`. ⚠️ KARAR-75 (kişi adı yasağı ↔ yasal metin, Ç-16) + YN-13 ile bağlı. 🟡 KVKK. KARAR-47 avukat paketine katılabilir. · aile: Y-B · ⛔ **çelişki: KARAR-80/M18** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M18: GV-18 notu eklendi — rıza sürümü kaydediliyor ama hiç kontrol edilmiyor; avukata 'sürümleme var' denecekse önce GV-18 kapanmalı. · PO kısmı: kod-senkron güncellenen KVKK metin paketini avukata götürüp onaylatmak (avukat paketi, KARAR-47). · kilit: kalan ayak KARAR-47 bekliyor (PO kısmı: avukat paketi) — § 🔴 KİLİT HARİTASI · kilit: kalan ayak KARAR-75 bekliyor (bağlı: yasal metinde kişi adı (Ç-16)) |

### F-07 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 645 bayt):**

| F-07 | Ş4 | **Denetim izi saklama gerilimi (G1-15).** Kalibrasyon AUDIT izi SystemLog'ta 90 günde siliniyor → iz-koruma ↔ KVKK imha gerilimi. | 🔴 KARAR-19 | İz-koruma ile imha politikası uzlaştırıldı | BEKLIYOR | 🟡 KALIR: KVKK (saklama/imha) + KARAR-19. =G1-15, Faz 3. Kanıt: `gdprService.ts:341,366`. Tasarım/hukuki karar tarafı KARAR-19'da ⚠️ **KAPI DÜZELTİLDİ (2026-09-21): 🟡 → 🔴 KARAR-19.** `01-KARARLAR.md` İÇİNDEKİLER KARAR-19'u *"1 (F-07)"* diye sayıyor ve F-07'nin kendi Not'u *"hukuki karar tarafı KARAR-19'da"* diyor. 🟡 kalırsa cevaplanmış bir kararın işi yanlışlıkla PR'a gider.|

### I-09 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 976 bayt):**

| I-09 | Ş1 | **madde 146 — isim değişkeni altyapısı (14 değişken).** Metinlerdeki kişi isimleri koda gömülü; kurum kendi adlarını kullanamıyor. | 🔴 KARAR-30 | Kurum senaryolardaki isimleri kendi bağlamına göre değiştirebiliyor | BEKLIYOR | 🟡 KALIR: tenant override alanı ❓ migration. Kanıt: 9 terim (`menti_denge`·`menti_rotaci`·`menti_izacan`·`menti_kasif`·`mentor_mimar`·`mentor_ayna`·`mentor_liman`·`mentor_pusula`·`sert_1`) × iki repo tamamı, harf duyarsız → **kodda 0 dosya** (7 isabetin hepsi `.md`). İçerik hazır: `menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md:56`. ⚠️ **SIRA ÖNEMLİ:** K-16/K-18 seed'inden ÖNCE yapılırsa isimler seed'e değişken girer; SONRA yapılırsa **ikinci kez seed** gerekir → **PO'ya sor** (kart: KARAR-30). · aile: Y-G · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

### GV-09 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1364 bayt):**

| GV-09 | Ş4 | **KVKK aydınlatma sayfası yanlış ülke ve yanlış hukuki rejim beyan ediyor.** Sayfa "İrlanda (AB), GDPR'a tabi" diyor; sunucu Londra/Birleşik Krallık'ta ve AB üyesi değil. OAuth ve e-posta sağlayıcısına aktarım hiç beyan edilmiyor. | 🔴 KARAR-38 | Kullanıcı aydınlatma metninde gerçek sunucu ülkesini, doğru hukuki rejimi ve tüm alıcıları görüyor | BEKLIYOR | 🔴 KARAR-38 + 🟡 KVKK/hukuk. **B.6 · güvenlik konseyi §2.B.6.** Kanıt: `app/kvkk/page.tsx:92-107` ↔ `menti-mentor-v2/CLAUDE.md § Ortam / Veritabanı` (madde 92, PO teyitli 2026-08-26); `:94-95` "yönetilen PostgreSQL" ↔ `docker-compose.yml:16-24` kendi konteyneri; `:60-64` OAuth+SMTP saymıyor; `:31-39` 8 veri kategorisi eksik (IP dâhil, `platformAudit.ts:32`). ⚠️ **PO ön koşulu: P-a (avukat sorusu) + P-b (sunucu ülkesi).** ⚠️ `app/gizlilik/page.tsx:76-81` ve `:13` de bayat (self-servis silme var, tarih eski). ⚠️ Y-06 ile aynı sayfalar → SIRALI · ⛔ **çelişki: KARAR-80/M18** (2026-09-25) · eski kapı: 🔴 KARAR-38 · KARAR-80 işlendi (2026-09-26, A kabul) — M18: bu satır artık YALNIZ 'hukuki rejim' yorumunu (GDPR/AB uygulanabilirliği, tüm alıcıların beyanı) kapsıyor, KARAR-38'e bağlı kalır (CEVAPSIZ). Ülke adı olgu düzeltmesi (İrlanda→Londra/BK) ayrı satıra taşındı: bkz. GV-09b. |

### V-15 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı

**Önceki tam satır (AYNEN, 1322 bayt):**

| V-15 | Ş2 | **Oryantasyon kilidi canlı `bookMeeting` yolunda uygulanmıyor** — yalnız kullanılmayan `createMeeting`'de bağlı; FE de yalnız banner basıyor → kilitli menti randevu alabiliyor. | 🔴 KARAR-40 | Karara göre oryantasyonsuz menti randevu alamıyor (ya da uyarı olarak kalıyor) | BEKLIYOR | ⚠️ ÜRÜN KARARI GEREKLİ (§9.2 KARAR aday, merge YOK): "Görüşme Kilidi Aktif" uyarı mı gerçek engel mi. AJAN fix tek satır (`bookMeeting`'e `checkOrientationLock`). = W §9.2 / §9.3#29. Kanıt: `meetingController.ts:162` (yalnız createMeeting), `bookMeeting:413-531` 0 satır. Efor S ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ÜRÜN KARARI gerekli (oryantasyon kilidi) ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli. ⚠️ = güvenlik konseyi §2.A.5 (G-11), ek bulgu: kilidi BASAN yer `feedbackController.ts:92-96` — yani GV-02 ile zincirli: saldırgan GV-02 ile kurbana kilit bastırır, kurban V-15 ile kilidi atlar; ikisi de düzeltilmeli. `checkOrientationLock` tanım `meetingController.ts:140`, tek çağrı `:162` (yalnız `createMeeting`). · aile: Y-A · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

### P-15 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1316 bayt):**

| P-15 | Ş0 | **Mentör kapasite/doluluk dengesi yok.** "Aktif Mentilerim" bir tavanla kıyaslanmıyor; "hangi noktadan sonra yük" kavramı kodlanmamış. | 🔴 KARAR-41 | Mentör doluluk/kapasite durumunu görüyor | BEKLIYOR | 🟡 KALIR: kapsam belirsiz — "kapasite kavramı olsun mu" ürün kararı (kart gerekebilir). =MT13 (⬜). Kanıt: capacity/kapasite/maxMenti 0 sonuç (mentör-bazlı). ⚠️ kapsam belirsiz — "kapasite kavramı olsun mu" PO'ya sonraki tur (kart gerekebilir). Efor M ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ürün kararı gerekebilir ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli. ⚠️ = psikometri konseyi §5 D.5, ek bulgu: "KARTSIZ GİZLİ 🔴" durumu KAPANDI — kontenjan sorusu artık kart olarak açıldı (**KARAR-41**). Kanıt: kapasite kavramı kodda YOK (kapsam BE src/ · prisma/ · tests/, 7 terim iki dilli harf duyarsız → ilgili 0 eşleşme) ve scoreAndFilter'ın hiçbir continue koşulu (matching.ts:267,270,274,278,283) aktif menti sayısını sorgulamıyor. · aile: Y-? (belirsiz — kapsam/ürün kararı, KARAR-41 bekliyor) · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

### F-08 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 857 bayt):**

| F-08 | Ş0 | **Sektör asimetri paydası (G2-09).** Sektör skoru paydası menti-etiket sayısı yerine iki tarafın etiket **birleşimi** olmalı (B9.4). | 🔴 KARAR-44 | Sektör skoru simetrik paydayla hesaplanıyor | BEKLIYOR | 🟡 KALIR: matching/skorlama (`scoring.ts`). =G2-09, Faz 5. KARAR-10'dan bağımsız küçük iş. Kanıt: `scoring.ts:34-40` payda `mentiSet.size` ⚠️ = psikometri konseyi §2 A.2, ek bulgu: güncel main'de HÂLÂ AÇIK — scoring.ts:40 paydası mentiSet.size (2026-09-21 teyidi); ayrıca ağırlık DÖRT yerde tanımlı (scoring.ts:89-90 · algorithmTuner.ts:28-33 · matching.ts:38 · scoring.config.ts:48) ve dördüncüsü ölü zincire ait. · aile: Y-C · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

### F-14 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 731 bayt):**

| F-14 | Ş1 | **Menti personası çeşitlendirme (B8).** Sertifika/içerik senaryolarında menti persona çeşitliliği — içerik işi. | 🔴 KARAR-46 | Senaryolarda çeşitli menti personaları var | BEKLIYOR | (kapı gevşetildi 2026-09-19: içerik/belge işi) · =Faz6 B8. İçerik turu. Kanıt: persona alanı/çeşitlendirme grep boş · ⚠️ **2026-09-25 kapı düzeltmesi:** Ölçüt (kullanıcı senaryolarda çeşitli persona görüyor) içerik seed'iyle canlıya çıkar; sertifika içeriği sürümü KARAR-46'da, cevapsız (seed kuralı). · ⭐ **KAPI HÜCRESİ SADELEŞTİ 2026-09-27 (GÖREV 0.2):** tek 🔴 = KARAR-46 (cevapsız). Hücre geçmişi: 🟡 → 🟢 (2026-09-19) → 🔴 KARAR-46 (2026-09-25). |

### P-99 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1451 bayt):**

| P-99 | Ş0 | **⭐ Sertifika içeriğini seed dosyasına taşı — K-16'nın ÖNKOŞULU.** Finalize 22 senaryo/88 şık (`docs/raporlar/icerik/sertifika-oturum1/2/3-...-2026-09-08.md`) seed'e taşınmamış; `seed-certification.ts` hâlâ 20/80 eski sürüm. | 🔴 KARAR-46 | seed-certification.ts 22 senaryo/88 şık içeriyor (seed ÇALIŞTIRILMAZ) | BEKLIYOR | 🟡 KALIR: SEED (seed-certification.ts, K-16 önkoşulu). TUR 3 B.2 bulgusu.  ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):**  — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**). ⛔ Pratik sonuç: taşınacak şık sayısı 8 değil **88'in TAMAMI**; düşecek senaryo **15**. Efor **S değil L**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md:16-19,118-122`. Seed dosyası değişir, seed çalıştırılmaz. ~~[ESKİ · 2026-09-21] Efor M~~ → **Efor L** · aile: Y-G · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. · geçmiş: bkz. `arsiv/00-KUYRUK-gecmis.md` §P-99 |

### AN-20 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 896 bayt):**

| AN-20 | Ş3 | **Mentör %uyum rozeti görsün** (BY-1, `Meeting.matchId` yazımı). | 🔴 KARAR-48 | Mentör eşleşme uyum yüzdesini görüyor | BEKLIYOR | Kaynak: PP §6 · MT-A3, R2/R6. 🔓 **KİLİT AÇILDI (KARAR-66 → B, 2026-09-23):** "akıllı eşleştirme/kalite" iddiası geri çekildi → rozet **"kalite garantisi" DEĞİL "yönlendirme uyumu"** olarak sunulur (E.2 eşleştirme→yönlendirme diliyle uyumlu). Kapı 🔴→**🟡** (matching verisine dokunur, hassas). 🟡: matching. · aile: Y-C · ⛔ **çelişki: KARAR-80/M5** (2026-09-25) · eski kapı: ~~🔴 KARAR-66~~ 🟡 *(KARAR-66 cevaplandı 2026-09-23: B)* · KARAR-80 işlendi (2026-09-26, A kabul) — M5: tek satır AN-20 (yönlendirme dili); P-04 ve PS-04 katlandı; sıra GV-08 → U-18 (Match yazımı) → AN-20. Metin dili KARAR-48'e (test sonucu/skor anlatımı) bağlı — CEVAPSIZ, kilit korunuyor. |

### YN-04 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 952 bayt):**

| YN-04 | Ş0 | ⭐ **Güvenlik kuralı yanlış kanıta dayanıyor — 24 gündür.** `CLAUDE.md § Güvenlik Kuralları › Yeniden kullanılacak kalıplar` aynen: *"`registerMessages.ts` örnek addır, dosya HENÜZ kodda YOK: grep boş"*. **Dosya VAR:** `frontend/src/lib/registerMessages.ts` (bu turda `ls` ile doğrulandı). | 🔴 KARAR-50 | Güvenlik kuralının gerekçesi kod gerçeğiyle uyuşuyor | BEKLIYOR | §B.3-1 · E-3. ⚠️ Rapor `:519` diyor — **bölme sonrası satır `:442`'ye kaydı** (rapor BB numarası). Desen: `~~[ESKİ · 2026-08-28] …~~` + `⚠️ GÜNCELLEME (2026-09-21): dosya var — kanıt: frontend/src/lib/registerMessages.ts`. F-28 ile aynı DOSYA adı ama **farklı iş** (F-28 = metin merkezileştirme). · ⛔ **çelişki: KARAR-80/M15** (2026-09-25) · eski kapı: 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M15: 'kuralların geçersizleşme koşulu zorunlu mu' KARAR-50'ye bağlandı; CEVAPSIZ. |

### YN-05 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 771 bayt):**

| YN-05 | Ş0 | ⭐ **Canonical rehber, DONDURULMUŞ belgeyi canonical gösteriyor.** `belge-duzeni-rehberi.md:13` *"Canonical'lar: … iş kuyruğu → `10-yol-haritasi.md`"*; o belge `:4`'te **📸 DONDURULMUŞ (2026-09-21)**. Rehberi okuyan ajan ölü belgeye yönlendiriliyor. | 🔴 KARAR-50 | Rehberi okuyan canlı kuyruğa (`00-KUYRUK.md`) yönleniyor | BEKLIYOR | §B.3-2 · E-2. KURAL 7 tablosundaki `10-yol` ve `00-CIKIS-PLANI` satırları da aynı durumda. Karşı kanıt: `CLAUDE.md § AKTİF İŞ KAYNAĞI TEKTİR` — *"Aktif iş kaynağı tektir: `docs/otonom/00-KUYRUK.md`"*. · ⛔ **çelişki: KARAR-80/M15** (2026-09-25) · eski kapı: 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M15: KARAR-50'ye bağlandı (YN-04 ile aynı karar); CEVAPSIZ. |

### YN-06 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı

**Önceki tam satır (AYNEN, 1064 bayt):**

| YN-06 | Ş4 | **2 belge künyesinde 🔄 YAŞAYAN diyor ama ölü** — `kararlar/konu/08-acik-sorular.md:5` *"canonical açık-karar takibi artık `00-KARAR-TAKIP.md`"* · `raporlar/icerik/kod-kalemleri-2026-09-03.md:8` *"✅ NUMARALANDI — madde 138-160'a işlendi"*. İkisi de devir kanıtını kendi içinde taşıyor. | 🔴 KARAR-51 | Okuyan bayat belgeyi güncel sanmıyor | BEKLIYOR | §D.1 · E-1. **Hazır dondurma notları raporda `:381-388`** (kopyala-yapıştır). Künyedeki `**🔄 YAŞAYAN**` → `~~[ESKİ · 2026-09-21] **🔄 YAŞAYAN**~~`. Diğer 2 "ölü adayı" PO kararına bağlı (kart §6). **ek bulgu (CS KN-12(b) / Ç-09):** `08-acik-sorular:5` "canonical artık 00-KARAR-TAKIP" ↔ `:2` 🔄 YAŞAYAN = **çift-kaynak** ("AKTİF İŞ KAYNAĞI TEKTİR" kuralıyla çelişir) → AN-44 ile tek PR'da çözülür. kaynak: CS raporu §3. · ⛔ **çelişki: KARAR-80/M15** (2026-09-25) · eski kapı: 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M15: '4 yaşayan-ama-ölü belge dondurulsun mu' KARAR-51'e bağlandı; CEVAPSIZ. |

### YN-02 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı

**Önceki tam satır (AYNEN, 1427 bayt):**

| YN-02 | Ş0 | ⭐ **Taşıma iki YENİ tutarsızlık doğurdu (bu turda oluştu).** (a) `belge-duzeni-rehberi.md`'de **KURAL 8 artık İKİ KEZ** var: `:99-109` (kendi gövdesi) + `:143-152` (CLAUDE.md'den taşınan kopya). (b) `rehber:6` hâlâ *"bu **6** kurala uyar"* diyor — dosyada artık **18 kural bloğu** var; `rehber:3` künyesi *"Son güncelleme: **2026-08-23**"*. | 🔴 KARAR-52 | Rehberi okuyan her kuralı bir kez ve tam görüyor; künye dosyanın gerçek hâlini söylüyor | BEKLIYOR | §A.7 AM-3 · §B.1 · §B.4-1. ⚠️ **Rapor B.4-1 "mükerrer çözülür" diyordu (`:337`, kazanç 933) — mükerrer ÇÖZÜLMEDİ, tek dosyanın içine TAŞINDI.** Rehberin kendi KURAL 1'i (tek gerçek kaynağı) kendi dosyasında ihlal oluyor. ⛔ Gövde SİLİNMEZ → biri `## GEÇMİŞ`e veya `~~[ESKİ]~~` damgasıyla. Sayım hatası raporda da vardı: `rehber:6` "6" · eski `CLAUDE.md:377` "8" · gerçek 18 (§B.1 `:276`). **= CS KN-14** (mükerrer, yeni satır AÇILMADI), ek bulgu (CS Ç-08): `belge-duzeni-rehberi:6` "6 kural" ↔ dosyada 16/18 kural + `:13` canonical `10-yol` (📸 donuk) gösteriyor (= YN-05) + künye `:3` bayat — hepsi bu satırın kapsamında. kaynak: CS raporu §3/§6. · ⛔ **çelişki: KARAR-80/M15** (2026-09-25) · eski kapı: 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M15: 'taşınan KURAL 8 mükerreri hangi gövde kalsın' KARAR-52'ye bağlandı; CEVAPSIZ. |

### AN-21 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 558 bayt):**

| AN-21 | Ş1 | **Bekleme "senin gibi N kişi bekliyor" akran sinyali** (mentör<3 gizlenme senaryosu dahil). | 🔴 KARAR-56 | Menti beklerken yalnız olmadığını görüyor | BEKLIYOR | Kaynak: PP §6 · M-A3, R1. 🔴: KVKK eşiği (küçük sayıda ifşa) + ürün kararı; KARAR-56 (çoklu talep) ile ilişkili. · ⛔ **çelişki: KARAR-80/M6** (2026-09-25) · eski kapı: 🔴 KVKK/KARAR-56 · KARAR-80 işlendi (2026-09-26, A kabul) — M6: ana satır (P-06 katlandı); küçük sayı k-anonimlik ile gizlenir; KARAR-56 CEVAPSIZ, kilit korunuyor. |

### F-09 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 872 bayt):**

| F-09 | Ş0 | **12 SJT senaryo + arketip seed.** Şema/model ✅ (`SjtQuestion.triggersOn/signalsArchetype`); seed'de yalnız 3 senaryo var (12 değil). | 🔴 KARAR-57 | Canlıda 12 SJT senaryosu + arketipler | BEKLIYOR | =Faz5 "12 senaryo+arketip". Seed=PO onayı + yedek. Kanıt: `seed.ts:530-573` 3 senaryo ⚠️ **KAPI DÜZELTİLDİ (2026-09-21): `🔴 seed` → 🟡.** Cevaplanacak bir KARAR **numarası yoktu** → sonsuz kilit; 13 🔴'nın numarasız tek'iydi. Emsal: **P-99 🟡** (*"seed dosyası değişir, seed çalıştırılmaz"*). ⛔ Seed **çalıştırılmaz**; yalnız dosya hazırlanır, çalıştırma PO onayı + yedek ister. · aile: Y-G · ⛔ **çelişki: KARAR-80/M9** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M9: KARAR-57/58 (hangi test, geçiş dönemi) SONRASINA; ikisi de CEVAPSIZ, kilit korunuyor. |

### PS-03 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 975 bayt):**

| PS-03 | Ş0 | **Likert yolu (`/disc-test`) `discType`'ı hiç yazmıyor** → testini güncelleyen kullanıcı onboarding'den kalma ESKİ `discType` ile eşleştirilmeye devam ediyor. | 🔴 KARAR-57 | Kullanıcı DISC testini güncelleyince eşleştirmesi gerçekten değişiyor | BEKLIYOR | 🟡 KALIR: matching/scoring. Kapsam beyanı (rapor): `discVectorService.ts` tamamı, `discType` harf duyarsız → **0 eşleşme**. Matris skoru (`scoring.ts:74,83`) ve anti-match (`:24-29`) `discType`'a dayanıyor. ⚠️ **PS-02 ile AYNI DOSYA AİLESİ → SIRALI.** ⚠️ **KARAR-42 (DISC tekrar testi) ile ilişkili**: tekrar test açılmazsa bu satırın kullanıcı faydası yalnız *ilk* Likert turunda görünür. = psikometri konseyi §4 C.2 · aile: Y-C · ⛔ **çelişki: KARAR-80/M8** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M8: hangi test mizacı belirleyeceği (Likert/discType yazımı) KARAR-57'ye kilitlendi; CEVAPSIZ. |

### PS-A2 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1119 bayt):**

| PS-A2 | Ş0 | **⭐ KARAR-10 · AŞAMA 2 — YENİDEN HESAPLAMA (backfill).** DB'de kayıtlı yanlış `archetype` / `ocean*` değerleri PS-A1'in düzeltilmiş formülüyle yeniden hesaplanır. | 🔴 KARAR-58 | Kayıtlı psikometrik değerler artık çöp değil (`M1`/`m1`'e sıkışmış değil) | BEKLIYOR | 🟡 KALIR: ⛔ **CANLI VERİ** (istisna 1 + 3). PO cevabının kendi şartı: **ÖNCE tarihli yedek tablo, SONRA PO'nun AÇIK onayı.** ⛔ **Şema migration'ı YOK** (kolon tipleri aynı) ama **verinin ANLAMI değişiyor** → `backfill/recompute` script'i. ⛔ Ön koşul **PS-A1**. ⚠️ **Kaç satırı etkilediği ÖLÇÜLMELİ, varsayılmamalı** → `03-PO-ELLE-ISLER` **#22(a)** (`SELECT count(*) FROM "UserProfile" WHERE "archetype" IS NOT NULL;`). ⛔ Bulut oturumu bunu **YAPAMAZ** (DB erişimi yok). Efor M · aile: Y-F · ⛔ **çelişki: KARAR-80/M9** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M9: yeniden hesaplama (backfill), KARAR-58 (eski DISC↔yeni Big Five geçişi) SONRASINA; CEVAPSIZ, kilit korunuyor — canlı veriye erken dokunulmasın. |

### F-11 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1885 bayt):**

| F-11 | Ş0 | **Algoritma çekirdeği — KARAR-10 kilitli küme.** OCEAN/sektör motoru canlı eşleştirmeye bağlama (G2-07/08/G10-21) + yeni skor formülü %45/30/25 + 2 veto (V1/V2) + triggersOn derinleşme (madde 125/B6) + Big Five göç planı (B12). Motorlar YAZILI ama `matching.ts` onları çağırmıyor. | 🔴 KARAR-61 | KARAR-10 cevabına göre motor bağlanır/ertelenir | BEKLIYOR | =Faz5 çoğu. Hepsi KARAR-10'a kilitli. Kanıt: `matching.ts:3-5` yeni motoru import etmez; `scoring.ts:89-90` hâlâ 0.6/0.4 ⚠️ `= psikometri konseyi §3 B.4, ek bulgu: seçeneklerin somut maliyeti KARAR-10 kartına eklendi; motorun SIFIR birim testi var ⇒ hangi seçenek seçilirse seçilsin onarımın doğruluğunu kanıtlayacak kanıt örtüsü bugün yok.` **+ ⛔ çapraz atıf (bkz. §4)** ⛔ **BİRLİKTE YAPILMALI — önce silme yolu düzeltilir, SONRA Match yazımı açılır. Ters sıra = KVKK ihlali.** *(karşı taraf: **GV-08**. `createMatchIfEligible` ölü OCEAN motorunun İÇİNDE (`scoring.service.ts:137`) ve arketipi bizzat o yazıyor — KARAR-10'a "C" cevabı gelirse `Match` yazımı bu satır üzerinden açılır.)* 🔓 **KİLİT AÇILDI (2026-09-21, KARAR-10 → C aşamalı).** Kapı **🟡 KALIR** — matching/skorlama (istisna 2). ⚠️ Bu satır **tek başına yapılmaz**: KARAR-10'un cevabı işi **üç aşamaya** böldü → `PS-A1` (düzelt+test) → `PS-A2` (backfill, ⛔ canlı veri) → `PS-A3` (bağlama, ⛔ feature flag). F-11 bu üç satırın **şemsiyesidir**. · aile: Y-C · ⛔ **çelişki: KARAR-80/M9** (2026-09-25) · eski kapı: ~~🔴 KARAR-10~~ 🟡 *(KARAR-10 cevaplandı 2026-09-21: **C, aşamalı**)* · KARAR-80 işlendi (2026-09-26, A kabul) — M9: yalnız 'formül + veto' olarak daraltıldı; yeni formülün ne zaman açılacağı KARAR-61 (+KARAR-65, D-mentör/S-menti yasağı) CEVAPSIZ, kilit korunuyor. |

### I-01 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 2116 bayt):**

| I-01 | Ş2 | **madde 31+151 — eşleşen taraflar birbirine nasıl yaklaşacağını hiçbir yerde okumuyor.** 8 hazır metin (4 mentöre + 4 mentiye) YAZILI ama ekranda gösterilmiyor. | 🔴 KARAR-64 | Eşleşme kurulunca iki taraf da karşısındakine nasıl yaklaşacağını okuyor | BEKLIYOR | ⭐ **İÇERİK HAZIR — iş "sıfırdan yaz" değil "hazır metni bağla".** ⚠️ **İÇERİK KONSEYİ TEYİDİ (2026-09-21): metin ✅ 8/8 TAM** (yer tutucu/editör notu yok, redaksiyonsuz ekrana konabilir) — **AMA bağlanamaz durumda:** 8 adın hiçbirinin kod değerine (`M1..M4`/`m1..m4`) **eşlemesi yazılı değil** ve "Kâşif" adı üç ayrı anlamda kullanılıyor (canlı DISC kartı C harfi `onboardingController.ts:94,97-98` ↔ canonical mentör M2 `03-psikometri-ve-algoritma.md:14` ↔ yeni menti arketipi `arketip-ve-yaklasim-icerigi-2026-09-03.md:53`). **Ad↔kod eşlemesi bir ÜRÜN KARARIDIR** → I-15/KARAR-10 ile birlikte. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md` §0② / §2.1③. 8/8 metin: `docs/raporlar/icerik/arketip-ve-yaklasim-icerigi-2026-09-03.md:307` (başlık) · mentöre `:322-363` · mentiye `:364-405`. Kod kanıtı (⬜): 5 terim (`approachGuide`·`mentorApproach`·`approachText`·`yaklasim`·`yaklaşım`) × BE `src/`+`prisma/` + FE `src/` harf duyarsız → 11 satır, **0'ı alakalı**. madde 152'den BAĞIMSIZ. Migration yok. ⚠️ = içerik konseyi §2.1, ek bulgu: metin 8/8 TAM doğrulandı (yer tutucu yok, editör notu yok, redaksiyonsuz konabilir) — ama iş "S" değil: şema/seed gerekmiyor, buna karşılık metni gösterecek **eşleşme-detay ekranı FE'de hiç yok** (metin S, uçtan uca **L**) ve ön koşul **ad↔kod eşlemesi** (**KARAR-45**) — anahtarlar `M1..M4`/`m1..m4`, yeni 8 ad için 0 eşleme. · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · eski kapı: 🟢 · KARAR-80 işlendi (2026-09-26, A kabul) — M16: hazır metinler AN-50 'yönlendirme' diline çevrilerek bağlanacak; AN-50'nin kendisi KARAR-64'e kilitli (CEVAPSIZ) → zincirleme kilit. Ayrıca ad↔kod eşlemesi KARAR-45 (CEVAPSIZ) gerektiriyor. |

### KR-20 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 751 bayt):**

| KR-20 | Ş4 | **Ret sonrası tekrar başvuru ve geri onay bozuk (rapor D5).** | 🔴 KARAR-72 | Reddedilen kurum aynı adresle tekrar başvurabiliyor; reddedilip onaylanan kullanıcı giriş yapabiliyor | BEKLIYOR | Dosyalar: `backend/src/controllers/selfServeController.ts` · `backend/src/controllers/adminController.ts`. Rapor: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` D5 [teyit gerek]. 🟡: hesap durumu/onay (belirsizde 🟡). SIRALI: KR-05'ten SONRA; GV-11 / GV-12 / U-13 ile. · aile: Y-KR · ⛔ **çelişki: KARAR-80/M21** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M21: KR-20 (reddedileni yeniden başvurtma) KARAR-72 (kalıcı red) cevabına kadar bekler — ters yönde olabilir. CEVAPSIZ. |

### AN-37 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 617 bayt):**

| AN-37 | Ş4 | **Kurum (tenant) kalıcı silme akışı (G1-29)** — KARAR-74 sonrası. | 🔴 KARAR-74 | Platform admin bir kurumu (yalnız freeze değil) kalıcı silebilir | BEKLIYOR | kaynak: CS raporu (KN-05) · §4.2. Kanıt: `platformRoutes.ts:53 /freeze` var; `hardDeleteTenant` grep **yok**. 🟡/🔴: geri-dönülmez silme + KVKK; çift-onay + tarihli yedek zorunlu (silme protokolü). · aile: Y-F · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · eski kapı: 🟡 KARAR-74 · KARAR-80 işlendi (2026-09-26, A kabul) — M19: KARAR-19 değil KARAR-74'e yönlendirildi (kurum silme kısmı); CEVAPSIZ. |

### U-12 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1205 bayt):**

| U-12 | Ş0 | **Davet token'ı e-postaya bağlı değil, tek kullanımlık değil, iptal edilemez, 30 gün geçerli.** | 🔴 KARAR-82 | Karara göre davet token modeli güçlendirildi | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T1)** — davet token'ı e-postaya bağlı değil, iptal edilemez, 30 gün — link sızarsa yabancı kalıcı üye olur · ⚠️ ÜRÜN/GÜVENLİK KARARI GEREKLİ (KARAR aday, merge YOK) + auth. = X §10#16. Kanıt: `selfServeController.ts:562-572`. Efor M ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ÜRÜN/GÜVENLİK KARARI gerekli (davet token modeli) ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli. ⚠️ = güvenlik konseyi §2.C.3, ek bulgu: token modelinden BAĞIMSIZ bir sızıntı kanalı var — davet JWT'si URL path'inde taşınıyor (`invitationRoutes.ts:13`) ve `requestLogger.ts:22-23` `originalUrl`'i olduğu gibi stdout'a basıyor → log'a erişen herkes geçerli davet token'ı toplar. Bu kanal ayrı ve daha ucuz kapanır → **GV-14** olarak ayrı satır açıldı; U-12 kartı beklerken GV-14 ilerleyebilir. · aile: Y-E · 🔴 **kart açıldı (2026-09-25): KARAR-82** · eski kapı: 🟡 |

### U-13 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1418 bayt):**

| U-13 | Ş4 | **Rol değiştiren (MENTOR↔MENTI) hiçbir uç yok; ADMIN düşürme körlemesine `MENTOR` yazıyor** (`adminController.ts:959`) → aslında MENTI ise rolü bozulur. | 🔴 KARAR-83 | Yanlış rolle kayıt düzeltilebiliyor; ADMIN düşürme rolü bozmuyor | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T1+T3)** — rol değiştirme ucu yok, ADMIN düşürme körlemesine `MENTOR` yazıyor — rol sessizce bozulur · 🟡 KALIR: auth/yetki (rol atama). = X §4.5 / §10#17. İki parça: (a) rol-değiştirme ucu yok (ürün) · (b) `:959` hardcoded MENTOR bug'ı. Kanıt: `UpdateUserSchema` `.strict()` (role yok); `adminController.ts:959`. Efor M ⚠️ = güvenlik konseyi §2.A.4 (G-8), ek bulgu: rol kaynağı sorunu yazma ucuyla sınırlı değil — `requireTenant` rolü `TenantMembership`'ten DEĞİL JWT payload'ından okuyor (`tenant.ts:82-85` membership'i çekiyor ama `select:{isActive:true}`, rol seçilmiyor; `:102` `role: payload.role`) → `demoteFromAdmin` (`adminController.ts:951-978`) iki tabloyu da güncellese bile token ≤1 saat ADMIN kalır. Ayrıca admin SAYIMLARI `prisma.user.count({role:'ADMIN'})` ile yapılıyor (`:909,929,960`) → `ensureMembershipSafe` non-fatal olduğu için senkron bozulursa `MAX_ADMINS` ve "son admin" koruması yanlış sayıya dayanır. Token iptali ayağı GV-10'da. · aile: Y-A · 🔴 **kart açıldı (2026-09-25): KARAR-83** · eski kapı: 🟡 |

### U-15 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1169 bayt):**

| U-15 | Ş0 | **Şifre sıfırlama tek kanala (SMTP) bağımlı;** SMTP hatası kullanıcıya hiç yansımıyor, admin tarafında sıfırlama ucu yok → mail kapalıyken şifresini unutan geri giremez. | 🔴 KARAR-84 | SMTP hatası kullanıcıya yansıyor / admin sıfırlama yolu var | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T2+T3)** — şifre sıfırlama tek kanala bağlı, hata yansımıyor — şifresini unutan geri giremez, kimse görmez · 🟡 KALIR: auth (şifre sıfırlama). ⚠️ PO ADIMI: SMTP teyidi (`03-PO`). = X §4.4 / §10#19. Kanıt: `authController.ts:534-550`; `UpdateUserSchema` password yok. Efor M ⚠️ = güvenlik konseyi §2.C.5, ek bulgu: sıfırlama akışının KENDİSİ örnek nitelikte (256-bit entropi `:534` · SHA-256 hash'li DB kaydı `:535-541` · 60 dk · tek kullanımlık `:580-587` · kullanımda tüm refresh token'lar silinir `:586` · pasif hesaba token verilmez `:531,568`) — sorun kanal bağımlılığında. Ayrı eksik: oturum-içi şifre DEĞİŞTİRME ucu hiç yok ve karmaşıklık kuralı yok → GV-19 (aynı dosya, SIRALI). · aile: Y-E · 🔴 **kart açıldı (2026-09-25): KARAR-84** · eski kapı: 🟡 |

### GV-17 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1054 bayt):**

| GV-17 | Ş3 | **Kişi kendi psikometrik profilini dışa aktaramıyor.** OCEAN/arketip/DISC türevlerinin tamamı ve kendi yazdığı mesajların içeriği dışa aktarımda yok. | 🔴 KARAR-94 | Kullanıcı verilerini indirdiğinde artık kendi psikometrik profilini ve kendi yazdığı mesajları da görüyor | BEKLIYOR | 🟡 KVKK. **B.3 · güvenlik konseyi §2.B.3.** Kanıt: `exportUserData` `gdprService.ts:284-333` yalnız **6 kaynak**; `UserProfile` **hiç yok**; `:314` mesaj **yalnız `count`** (tip `:280-281` → FE `kvkk.ts:20-22`). **16 tablo + ≈22 `User` alanı** eksik. ⚠️ **K-12 (BITTI) FE işiydi** — özet backend'in verdiğinden fazlasını üretemez; eksiklik **backend kaynaklı**, K-12 bayat sayılmaz. ⚠️ V-10 (BITTI) bu ucun rate limitini kapattı · aile: Y-B · ⛔ **çelişki: KARAR-80/M18** (2026-09-25) · eski kapı: 🟡 · KARAR-80 işlendi (2026-09-26, A kabul) — M18: GV-17 (dışa aktarım hakkı) için PO'ya ayrı karar kartı açıldı — bkz. KARAR-94 (çıkış blokeri olsun mu). CEVAPSIZ. |

### I-18 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1113 bayt):**

| I-18 | Ş0 | **madde 159 — kriz bildirimi akışı yok.** Kendine zarar ifadesinde kimse haberdar olmuyor; sertifikada senaryo olarak SINANIYOR ama canlı karşılığı yok. | 🔴 KARAR-95 | Kriz ifadesinde kurum yöneticisine bildirim gidiyor | BEKLIYOR | ⛔ **HUKUKİ ÖN KOŞUL.** Kanıt (7 terim, İKİ DİLLİ, harf duyarsız, BE `src/`+`prisma/seed.ts`+FE `src/`): `kriz`·`crisis`·`selfharm`·`self-harm`·`kendine zarar`·`acil durum`·`emergency` → **2 satır, 0'ı akış** (`analyticsEngine.ts:299` iş unvanı listesi · `admin/certification/page.tsx:23` sınav konu etiketi); ayrıca `seed-certification.ts` `topic:'kriz-yonetimi'` = **sınav konusu**, bildirim akışı değil. ⚠️ **G1-01 ÇELİŞKİSİ:** 18 yaş altı menti kabul edilecekse gerçek yaş + veli onayı gerekir → "18+ beyanı yeterli" çöker. Avukat paketine TEK SORU. · ⛔ **çelişki: KARAR-80/M20** (2026-09-25) · eski kapı: 🔴 KARAR-31 + avukat · KARAR-80 işlendi (2026-09-26, A kabul) — M20: KARAR-69 (c) gereği kriz kanalı HUKUK değil GÜVENLİK sorusu; yeni kart KARAR-95 açıldı. CEVAPSIZ. |

### IC-13 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1161 bayt):**

| IC-13 | Ş1 | **Menti tarafında kriz/kötü-muamele içeriği ve bildirim kanalı YOK.** | 🔴 KARAR-95 | Menti, kendisi ya da mentörü kaynaklı bir sorunda ne yapacağını ekranda okuyor ve nereye başvuracağını biliyor | BEKLIYOR | §4.3. `menti/orientation-guide/page.tsx:17-63` dört senaryo içeriyor, **hiçbiri** kriz/kötü muamele/sınır ihlali değil. Menti *"sadece konuşacak biri lazım"* diyebiliyor (`threeQuestionsText.ts:30`) ama bu yalnız eşleştirme sinyali, hiçbir destek çerçevesine bağlanmıyor. Tek "bildir" kanalı kriz için değil: `/bildir` kapsamı sahte kurum kaydı/yetkisiz davet (`bildir/page.tsx:55`). ⚠️ **`I-18`/KARAR-31'in MENTİ ayağı** — I-18 yalnız "kurum yöneticisine bildirim" tarafını kapsıyor. ⚠️ KARAR-4 (somut destek kaynağı adı) buraya da bağlı: ürün içindeki tek somut kaynak adı *"okul psikoloğu"* (`seed-learning-journey.ts:196`) — yetişkin menti/STK için karşılığı yok. Efor M · ⛔ **çelişki: KARAR-80/M20** (2026-09-25) · eski kapı: 🔴 KARAR-31 · KARAR-80 işlendi (2026-09-26, A kabul) — M20: I-18 ile birlikte KARAR-95'e bağlandı. CEVAPSIZ. |

### AN-31 (2026-09-28, 3. düzeltme)

**Değişiklik:** Not'taki eski kapı ibareleri ("eski kapı: …", "kapı 2026-09-26 (4 renk)", "kapı gevşetildi", "🟡 KALIR") arşive; gerekçe metni "hassasiyet:" olarak kaldı · İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 886 bayt):**

| AN-31 | Ş3 | **Kurumlar arası anonim toplu veri izni + gösterimi** (yalnız k-anonim toplu, kişi düzeyi YOK). | 🔴 KARAR-105 | İzin veren kurum anonim toplu karşılaştırma görüyor | BEKLIYOR | Kaynak: **KARAR-34 SORU 2 → B** (Bölüm 3). Altyapı hazır: `backend/src/services/mask.ts` · `applyKAnonymity`. 🟡 KVKK. · aile: Y-B · kapı 2026-09-26 (4 renk) · ⭐ **KAPI 2026-09-27:** 🟢→🔴 KARAR-105 — uygulama denemesi (salt-okuma) kararın izin yerini ve metrik setini tanımlamadığını ve kalıcı izin alanı için migration gerektiğini gösterdi (`backend/prisma/schema.prisma:181-262` Tenant'ta uygun alan yok; `isSharedPoolActive` :185 farklı özellik — kişi-düzeyi eşleştirme havuzu; AN-30'un `KURUMLARARASI_PAYLASIM` rızası kişi-düzeyi ve henüz merge değil). Altyapı hazır: `backend/src/services/mask.ts:70` `applyKAnonymity`. |

### V-16 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 957 bayt):**

| V-16 | Ş4 | **`/health`'in `version` alanı sabit `"0.1.0"` — canlıdaki gerçek kodu göstermiyor.** `process.env.npm_package_version` `package.json`'dan okunuyor (`health.ts:47`), git commit'iyle hiç değişmiyor. | 🟢 | `/health` yanıtı hangi backend commit'inin canlıda koştuğunu gösteriyor | ✅ BITTI (kısmen, PO elle işi kaldı) | Kaynak: PO talimatı (2026-09-26). **Kod tarafı canlıda:** `health.ts`'e `commit: process.env.GIT_SHA ?? 'unknown'` eklendi, Dockerfile `ARG GIT_SHA` + çatı `docker-compose.yml` `build.args` eklendi, merge edildi. Doğrulama (2026-09-26): `curl https://api.sivilkapasite.org/health` → `"commit":"unknown"` (alan VAR ama Dokploy `GIT_SHA` host değişkenini henüz set etmiyor — **beklenen**, hatalı değil). ⚠️ **Kalan adım kodla çözülemez → `03-PO-ELLE-ISLER.md:18`'e taşındı:** Dokploy backend build ayarına `GIT_SHA` set edilmeli. Migration/seed yok, geri alınır. aile: Y-E |

### DK-01 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 912 bayt):**

| DK-01 | Ş1 | **Sentry (ya da eşdeğeri) entegrasyonu + kişisel veri temizleme.** KARAR-27 → A. Backend+frontend hata toplama; PII scrub ayarı zorunlu. | 🟡 | Canlı hatalar merkezî olarak, kişisel veri temizlenmiş toplanıyor | BEKLIYOR | 🟡 KVKK (yurtdışı aktarım) — merge YOK, PR'da durur. ⚠️ **PO ön koşulu:** Sentry kullanımı aydınlatma metni + yurtdışı aktarım envanterinde YER ALMALI (avukat paketi md.4). ⚠️ PO işi: hesap açma + anahtarı Dokploy'a girme (`03-PO-ELLE-ISLER.md`). Ajan yalnız entegrasyon + veri temizleme kodunu yazar; anahtar gelmeden CANLI olmaz. Detay: KARAR-27 CEVAP. · aile: Y-B · **KARAR-80/M21 sıra notu:** kişisel veri temizleyicisini GV-07'den al. · PO kısmı: Sentry hesabını açıp anahtarı Dokploy'a girmek ve Sentry'nin aydınlatma metni/yurtdışı aktarım envanterine eklenmesini avukata onaylatmak (03-PO-ELLE-ISLER A4). |

### DK-03 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 930 bayt):**

| DK-03 | Ş0 | **Platform panelinde hata "iz kaydı" (tam stack) — PII temizlenmiş.** KARAR-24 → B. V-02'nin panel ayağı. | 🟡 | Platform operatörü bir 500'ün tam iz kaydını (kişisel veri temizlenmiş) panelde görüyor | BEKLIYOR | 🟡 KVKK — merge YOK (iz içinde kazara PII riski, scrub şart). ⚠️ **KAPSAM DIŞI:** platform yöneticisinin kurum verisine erişim KAYDI (denetim izi) KALDIRILMAZ — "kayıtsız tam erişim" ayrı HUKUKİ karar (avukat paketi md.6). Kanıt bağlam: `platformController.ts:182-185` bilinçli gizleme. Detay: KARAR-24 CEVAP. · aile: Y-B · **KARAR-80/M21 sıra notu:** kişisel veri temizleyicisini GV-07'den al. · PO kısmı: teyit gerek — satırda PO'nun eliyle yapılacak adım yazılı değil; yalnız kapsam dışı bırakılan "kayıtsız tam erişim" sorusu avukatta (03-PO-ELLE-ISLER A6). Kod kısmı (PII temizlenmiş iz kaydı) 🟢 kurallarıyla yapılır. |

### PS-A3 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1717 bayt):**

| PS-A3 | Ş0 | **⭐ KARAR-10 · AŞAMA 3 — EŞLEŞTİRMEYE BAĞLA, AÇMA/KAPAMA ANAHTARIYLA.** Yeni motor eskisinin **yanında** çalışır (feature flag); önce **eski/yeni sıralama karşılaştırması PO'ya gösterilir**; PO onaylarsa açılır, **tek tuşla eskiye dönülür.** | 🟢 | PO karşılaştırmayı gördükten ve onayladıktan sonra: kullanıcı daha zengin profile göre sıralanmış mentör listesi görüyor — ve anahtar kapatılırsa eski listeye anında dönülüyor | BEKLIYOR | ⛔ Ön koşul **PS-A1 → PS-A2**. ⛔ **ANAHTAR (feature flag) ZORUNLU — PO şartı.** ⚠️ **I-13 düzeltilmeden bağlama RASTGELEDEN BETERDİR:** `COMPATIBILITY_MATRIX['M1_m1']=60` (`scoring.config.ts:38-44`) karakter skorunu **düzleştirir**, `BLOCKED_PAIRS` (`:33`) yüzünden toksik-çift vetosu **hiç tetiklenmez**. ⚠️ **ÖLÇÜM MEKANİZMASI YOK** — `Match` tablosuna yazılmıyor ⇒ *"daha iyi"* bir süre **PO'nun gözüyle** değerlendirilir. ⛔ **`Match` yazımı açılırsa KVKK sırası bağlayıcıdır:** önce silme yolu (`GV-08`), SONRA `Match` yazımı (`U-18`) — ters sıra = KVKK ihlali. ⚠️ **KARAR-6 bağlantısı:** menti ekranındaki uyum yüzdesi bugün DISC skorudur → motor bağlanınca **YÜZDELER DEĞİŞİR.** = `F-11` / `I-15` şemsiyesi altında. Efor XL · aile: Y-C · Kapı 🟢 + 7b (b)(c) (PO 2026-09-27, GÖREV 0.2 — matching dosyası); ön koşul ve anahtar şartları geçerli · I-15 buraya katlandı (KARAR-80/M9) · ön koşul durumu: PS-A1 tamamlandı · PS-A2 🔴 KARAR-58 bekliyor · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § PS-A3 (2026-09-28) · kilit: kalan ayak KARAR-58 bekliyor (ön koşul PS-A2 üzerinden) |

### YN-07 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1194 bayt):**

| YN-07 | Ş0 | **Otonom sözlük çelişkisi — motorun her tur okuduğu üç dosya üç farklı set sayıyor, ikisi "başkası YASAK" diyor.** `OTONOM-PROMPT.txt:80-81` 7 kod (`PR-ACIK` dahil) · `00-KUYRUK.md:53-54` 6 kod (`PR-ACIK` **yok** ama gövdede F-19'da kullanılıyor) · `CLAUDE.md § KURAL 10` 6 tamamen farklı kod. Ayrıca prompt `:148-150` **"AŞAMA K"** sayıyor, kuyrukta `grep -c "AŞAMA K"` = **0**; kuyruktaki `A·B·C·D` promptta yok. | 🟢 | Motor her turda tanımlı kod setiyle çalışıyor; aşama listesi 11 = 11 | BASARISIZ | §D.3 Ç-1/Ç-4 · E-4. `OTONOM-PROMPT.txt:80-84` canonical (en yeni); kuyruk ona hizalansın. İki sözlüğe **"hangi belge için geçerli"** cümlesi eklenmeli. · ⚠️ **KISMEN (2026-09-25):** kuyruk ↔ prompt durum kodu hizası çözüldü (`00-KUYRUK.md` "Durum kodları" 7 kod). Kalan: CLAUDE.md sözlük hizası. · **BASARISIZ (2026-09-25):** teslimat `CLAUDE.md` düzenlemesi gerektiriyor; PO talimatı (2026-09-25): "CLAUDE.md'ye DOKUNMA" (önceki turda CLAUDE.md işlemi denetleyiciye takılmıştı). Merge kuralları bunun yerine `OTONOM-PROMPT.txt` §7b'ye yazıldı. PO elle yapabilir ya da ayrı onayla açılır. |

### YN-08 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 981 bayt):**

| YN-08 | Ş0 | **Mod etiketi 2 mi 3 mü + şerit sistemi promptta hiç yok.** `CLAUDE.md § MOD ETİKETİ` tablosu **2 mod** (🟥/🟩) ↔ `§ Çalışma Sözleşmesi` **3 mod** (PLAN/BYPASS/**MANUEL-ONAY**, renk yok). `00-KUYRUK.md:58-66` 5 şerit (Ş1-Ş4 + **Ş0**) ↔ `CLAUDE.md` "en fazla 4 şerit" ↔ `OTONOM-PROMPT.txt`'te şerit **hiç geçmiyor**. | 🟢 | Üç dosya aynı mod ve şerit tanımını veriyor | BASARISIZ | §D.3 Ç-2/Ç-3 · E-5. Mod tablosu canonical; üçüncü mod ya `~~[ESKİ]~~` ya tabloya renk koduyla girsin. Şerit: kuyruk canonical (dosya sahipliği orada), prompta tek satır atıf, CLAUDE.md "4" → "4 paralel + Ş0 sıralı". · **BASARISIZ (2026-09-25):** teslimat `CLAUDE.md` düzenlemesi gerektiriyor; PO talimatı (2026-09-25): "CLAUDE.md'ye DOKUNMA" (önceki turda CLAUDE.md işlemi denetleyiciye takılmıştı). Merge kuralları bunun yerine `OTONOM-PROMPT.txt` §7b'ye yazıldı. PO elle yapabilir ya da ayrı onayla açılır. |

### AN-26 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1287 bayt):**

| AN-26 | Ş2 | **Müsaitlik hatırlatması (zamanlanmış iş) + kurum yöneticisine eskalasyon:** menti talebinden 3 gün→mentöre hatırlatma · 7 gün→2. hatırlatma · 10 gün→yöneticiye bildirim. | 🔵 | Yanıtsız mentör dürtülüyor, uzun sessizlikte yönetici haberdar | PR-ACIK | Kaynak: **KARAR-53 ④** (Bölüm 3, süreler ajan varsayılanı gerekçeli). ⚠️ SMTP'ye bağlı (03-PO B4); zamanlanmış iş altyapısı. 🟡. · aile: Y-D · KARAR-80 işlendi (2026-09-26, A kabul) — M2: ana satır — KARAR-53 ④'e göre 3 gün mentöre hatırlatma, 7 gün 2. hatırlatma, 10 gün yöneticiye eskalasyon; I-10 buraya katlandı. · 🔀 **PR-ACIK 2026-09-26 (🔵 akışı — uygulama migration gerektirdi):** backend #157 (`fb6c411`) + çatı #337 (pointer). Migration: `Conversation` +3 nullable guard alanı (yalnız ekleme, ÇALIŞTIRILMADI). CI yeşil (923 test). **KARAR-98** EVET/HAYIR kartı açıldı. 7b incelemesi sürüyor. · ✅ 7b 2. tur ONAY (2026-09-26; backend #157 `cb6b83d` yorum 5849046560 · çatı #337 `10346e0` yorum 5849046681; 941 test). Kalan: KARAR-98 EVET (+ alt soru) + `Conversation` yedeği. · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AN-26 (2026-09-28, düzeltme) · kilit: KARAR-98 bekliyor (EVET/HAYIR) |

### AJ-46 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1188 bayt):**

| AJ-46 | Ş0 | **Belge/yönetişim işlerinin eksik ayakları (kova)**: YN-09 (1.000+ karakter satır yeniden arttı) · YN-10 (CLAUDE.md içinde iki bayat satır atfı) · YN-11 (yeni raporlar etiketsiz) · YN-12 (indekssiz klasörler) · YN-14 (B.4-4/5/6/7/9 birleştirmeleri) · AN-35 (Ö1-Ö5 kuyruğa bağlanmadı) · AN-54 (ortak adlı alanlar taranmadı) · E-1 (kalem başına niyet kanıtı) · KR-22 (verify.sh fark listesine docker-prisma job'u). | 🟢 | Her kalemin ölçütündeki eksik ayak tamam; bekçi/sayım kanıtı | BITTI (kısmen — AJ-68) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` (parti 10/11 + QA/QD/QE2/QE3/QE5) · kanıt: raporun ⚠️ tablosu · DURUM: kova 8/9 tamam — çatı #404 (7b ONAY; bekçi testi 22/22, mutasyon kanıtlı) · KALAN: YN-09 (1.000+ karakter satır sayısı düşmedi) → AJ-68 · E-1'de gerekçesiz iki uç (`PATCH /users/:id/self-profile`, `POST /users/:id/temperament-test`) KARAR-11 kapsamında — silme protokolü gereği karantinaya bile alınmaz · satır 5c-a gereği kuyrukta (kısmen) · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AJ-46 (2026-09-28) |

### AJ-53 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 371 bayt):**

| AJ-53 | Ş0 | **Eski bir testte gerçek kişi adına benzeyen örnek veri** (kişi adı yasağı; AJ-32 incelemesi yan bulgusu). | 🟢 | Test verisinde kişi adına benzeyen örnek yok (nötr örnek) | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: AJ-32 7b (backend #200) · kanıt: `backend/tests/log-sanitizer.unit.test.ts:16,94` · CLAUDE.md § Kişi Adı Yasağı |

### AJ-56 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 884 bayt):**

| AJ-56 | Ş0 | **Ana kurumu başka olan üye, yönetici listesinde görünüyor ama üzerinde tekil işlem yapılamıyor (404)** (AJ-40 kalanı) + Pasif üye sayımı ve onaylayan adı araması hâlâ ana kurumdan. | 🟢 (+7b) | Misafir üyede yönetici tekil işlemleri çalışıyor (ya da bilinçli olarak kapalı ve ekranda belirtiliyor); Pasif üye sayımı üyelikten; test | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: AJ-40 7b (backend #205) · kanıt: `backend/src/controllers/adminController.ts:150,490,623,671,726,777,912,944` (`prisma.user.findFirst({id,tenantId})` + `backend/src/db.ts:18-65` ana kurum filtresi) · `backend/src/services/retentionMetrics.service.ts` (`passiveWhere`) · karar gerekebilir: başka kurumun yöneticisi kişinin HER kurumda geçerli alanlarına (onay durumu, rol) yazabilir mi — yazamıyorsa işlem düğmeleri misafir üyede gizlenir |

### K-17 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 138 bayt):**

| K-17 | Ş3 | **Sosyal profile serbest bağlantı alanı** (migration). | 🔴 KARAR-2 | Kullanıcı ek link ekleyebiliyor | BEKLIYOR | |

### K-16 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1485 bayt):**

| K-16 | Ş0 | **madde 30 — sertifika bankası seed.** ⛔ önce `certification_option_yedek_20260910`, yalnız `seed-certification`. | 🔴 KARAR-3, KARAR-4 | Sertifika ekranında "Seçenek A" yerine gerçek metin | BEKLIYOR | = G3-08 (seed `seed-certification.ts` şu an **20 senaryo/80 şık** — eski sürüm; finalize **22/88 içeriği** `docs/raporlar/icerik/` 3 belgede yazılı ama seed'e taşınMADI → K-16 bugün seed atarsa 20/80 çıkar, içerik→seed taşıma adımı gerekir) · G3-09 (npm runner yok, `seed-certification.ts:320` tsx guard var). ⚠️ (PR #184'teki "sayı bayat" ifadesi düzeltildi: iki sayı da gerçek, farklı kaynak.) **ÖNKOŞUL: P-99 — içerik seed'e taşınmadan seed atılırsa 20/80 çıkar**  → ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):**  — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**). ⛔ Pratik sonuç: taşınacak şık sayısı 8 değil **88'in TAMAMI**; düşecek senaryo **15**. Efor **S değil L**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md:16-19,118-122`. · geçmiş: bkz. `arsiv/00-KUYRUK-gecmis.md` §K-16 |

### K-18 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 815 bayt):**

| K-18 | Ş0 | **Öğrenme yolculuğu seed** (madde 147/148). ⛔ önce yedek, `seed-learning-journey`. ⛔ **2026-09-21 (içerik konseyi): madde 147 içeriği 5/5 DOLU AMA HER AŞAMADA `{mentor_*}` YER TUTUCUSU taşıyor** ve bu değişkenlerin kodda **0 karşılığı** var (kapsam: iki repo `src`+`prisma`, harf duyarsız → 0 dosya) → **bugün seed edilirse kullanıcı ekranda ham `{mentor_mimar}` görür.** İki engel: (a) **I-09 / madde 146** isim değişkeni altyapısı, (b) seed'de **zaten 6 farklı menti aşaması var** → üzerine yazma/pasifleştirme **PO KARARI**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md` §0② / §2.1. | 🔴 KARAR-5 | Canlıda içerik görünüyor | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T2 KOŞULLU)** — yalnız C11 "seed tabloları boş" derse bloker · |

### F-12 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 318 bayt):**

| F-12 | Ş1 | **STK anket cevap tipi (G3-13).** Kurum-özel soru Likert-sabit; şıklı/açık cevap tipi seçimi yok (migration). | 🔴 KARAR-21 | Kurum soru eklerken cevap tipini seçiyor | BEKLIYOR | =G3-13, Faz 6. Migration. Kanıt: `Question` modelinde answerType yok (SjtQuestion.AnswerFormat farklı kavram) |

### IC-14 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 819 bayt):**

| IC-14 | Ş0 | **`M1`/`m1` ham arketip kodları yöneticiye çıplak görünüyor.** | 🔴 KARAR-45 | Yönetici eşleşme tablosunda kod yerine arketip adı görüyor | BEKLIYOR | §6.1②. `admin/eslesmeler/page.tsx:134,142` (`{match.mentorArchetype}`) — **hiçbir sözlük yok**, yönetici çıplak `M1`…`m4` görüyor. Sözlük yazılabilmesi için **hangi ad hangi koda** kararı şart: kodun tanıdığı değerler `disc-to-ocean.adapter.ts:27-43` · `scoring.config.ts:33-44` · `schema.prisma:997`; yeni 8 ad için **0 eşleme** (kapsam: `docs/**/*.md` + BE `src`/`prisma`, 8 ad × 8 kod, harf duyarsız → tek isabet, o da **eski** adlarla `03-psikometri-ve-algoritma.md:14-15`). ⚠️ `IC-03`'ten AYRI tutuldu: diğer 12 enum'un sözlüğü bugün yazılabilir, bu yazılamaz. Efor S (karar sonrası) |

### AN-33 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 638 bayt):**

| AN-33 | Ş4 | **Ghost / "kalıcı red" özelliğini kuyruğa al** (`rejectionType: GHOST`, veri temizleme, reapply bloğu) — KARAR-72 cevabı sonrası. | 🔴 KARAR-72 | Yönetici bir başvuruyu "kalıcı ret" işaretleyince kullanıcı sessizce elenir/yeniden başvuramaz | BEKLIYOR | kaynak: CS raporu (KN-01) · §0.3/§4.1. Kanıt: tasarım `konu/11-tasarim-kararlari-yasam-dongusu-ve-disc.md:53-81` TAM yazılı; kodda **0** (grep ghost/rejectionType boş); bugünkü red `adminController.ts:740 rejectUser` (şeffaf, yeniden başvurulabilir). 7 haftadır hiçbir tura girmemiş öksüz. 🔴: migration + ürün/hukuk kararı. |

### AN-34 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 566 bayt):**

| AN-34 | Ş4 | **Değerlendirme AŞAMA 2/3** (eşik-altı mentörün otomatik pasifleşmesi + yeniden-değerlendirme + onay döngüsü) kuyruğa al — KARAR-73 sonrası. | 🔴 KARAR-73 | Düşük puanlı mentör otomatik pasifleşir, yönetici onayıyla yeniden aktifleşir | BEKLIYOR | kaynak: CS raporu (KN-02) · §4.1. Kanıt: `konu/degerlendirme-metrik-sistemi-tasarim-2026-08-19.md:175-188`; AŞAMA 1 merged (`persistMentorQualityMultiplier` canlı), 2/3 kodda **0**; kuyrukta karşılığı yok (F-07/Y-14 farklı konu). 🔴: migration + ürün kararı. |

### KR-11 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 638 bayt):**

| KR-11 | Ş0 | **Dönemlik anket gönderilemiyor ve sayfaya bağlantı yok (rapor A8).** | 🔴 KARAR-78 | (karara göre) Anket bağlanıp çalışıyor ya da karantinaya alınmış | BEKLIYOR | Dosyalar: `frontend/src/app/(dashboard)/periodic-survey/page.tsx` (+ `backend/src/controllers/feedbackController.ts` şeması). Rapor: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` A8 [D] (anket aynı görüşme-başına-tek `Feedback` kaydına yazıyor → KR-08 / KARAR-77 ile bağlı). ⛔ Silme seçeneği SİLME PROTOKOLÜ'ne tabi (karantina önce). · aile: Y-KR · KARAR-77=A verildi (2026-09-25); KR-11 hâlâ KARAR-78'e bağlı. |

### KR-05 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 503 bayt):**

| KR-05 | Ş4 | **Zamanlanmış iş tetikleme uçlarında yetki kapsamı hatalı (rapor B5).** Ayrıntı rapora kapanışta eklenir. | 🔴 KARAR-79 | Zamanlanmış işleri yalnız karardaki rol, karardaki kapsamda tetikleyebiliyor | BEKLIYOR | ⭐ Öncelik 3 (B bloğu). Dosyalar: `backend/src/routes/adminRoutes.ts` · `backend/src/controllers/adminController.ts`. Rapor: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` B5 [D]. SIRALI: KR-20 bundan SONRA (aynı `adminController.ts`). · aile: Y-KR |

### KR-08 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 1244 bayt):**

| KR-08 | Ş0 | **Bir görüşmeye yalnız bir taraf değerlendirme yazabiliyor (rapor A5).** | 🔴 KARAR-89 | (karara göre) Mentör ve menti aynı görüşmeye ayrı ayrı değerlendirme yazabiliyor | BEKLIYOR | Dosyalar: `backend/prisma/schema.prisma` · `backend/src/controllers/feedbackController.ts`. Rapor: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` A5 [D]. ⛔ **MIGRATION** → tarihli yedek tablo + PO onayı (Y-G kuralları). İlişkili: AN-47 (geri bildirim modelleri envanteri). · aile: Y-KR · ⭐ **KARAR-77=A (2026-09-25).** Görünürlük testle kanıtlanacak (karşı taraf göremez · yönetici görür · yazan kendini görür). Önce AN-47 envanterine bak; çelişki varsa BASARISIZ + sebep. Mevcut kayıtların 'yazan kim' yorumu PR açıklamasında örnekle gösterilecek. · ⛔ **ÇELİŞKİ (2026-09-25, AN-47):** `MeetingCheckIn` KARAR-77=A'nın istediği taraf-başına kaydı zaten uyguluyor; `Feedback` bölünürse ikinci kutu doğar → **KARAR-89** cevaplanana kadar dokunulmaz. · ⭐ **KAPI HÜCRESİ SADELEŞTİ 2026-09-27 (GÖREV 0.2):** tek 🔴 = KARAR-89 (cevapsız, `01-KARARLAR.md` KARAR-89 CEVAP boş). Hücre geçmişi: ~~🔴 KARAR-77~~ → 🟡 (KARAR-77=A, 2026-09-25) → 🔴 KARAR-89. |

### AJ-11 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden)

**Önceki tam satır (AYNEN, 791 bayt):**

| AJ-11 | Ş0 | **Eski planlardaki 13 yapılmamış özellik — yapılsın mı?** (platform büyüme grafiği · platform ayarlar ekranı · plan/paket sınırları · yönetici demo modu · üye persona şablonları · kurum etki duvarı · kurumdan kuruma davet · mentör rozetleri · mentörde sektör filtresi · kurum KPI trendi · gerçek telefon bildirimi · soru bankasında ters kodlu sorular · mentör bildirim sıklığı) | 🔴 KARAR-103 | PO'nun seçtiği özellikler ayrı AJ satırı olarak kuyruğa giriyor; seçilmeyenler v2'ye | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `g-kart-dogrulama-2026-09-26.md:103,136,137,143,148,151,154,155,157,159,160,166,167` · kanıt: kart KARAR-103'te her kalem için dosya:satır. Hepsi "özellik var mı yok mu" = ürün kararı. |

### AN-45 (2026-09-28, 3. düzeltme)

**Değişiklik:** İş hücresine NEDEN cümlesi (satırın kendi İş/Bitti demek/Not özetinden) · numarasız 🔴 satırına açık "sahip:" alanı

**Önceki tam satır (AYNEN, 502 bayt):**

| AN-45 | Ş3 | **G2-10 eşleşme tetikleyicisi** (event vs sayfa-açılış) kararı — keşif. | 🔴 keşif | Eşleşme ne zaman hesaplanır netleşir | BEKLIYOR | kaynak: CS raporu (KN-13). Kanıt: `G2-eslestirme-psikometri.md` G2-10. ⚠️ **NUMARA ÇAKIŞMASI:** kuyrukta F-fazı "G2-10 🗑️" (satır 243) **FARKLI kalem** (qm² çift-çarpım, PR #138'de çürütüldü) — CS'nin G2-10'u eşleşme tetikleyicisidir, karıştırma. 🔴: keşif kararı gerekir (KARAR kartı henüz yok). |

### AJ-64 (2026-09-28, 3. düzeltme)

**Değişiklik:** numarasız 🔴 satırına açık "sahip:" alanı

**Önceki tam satır (AYNEN, 994 bayt):**

| AJ-64 | Ş0 | **Mentör aday listesinde mentinin DISC harfi yok** (AN-35 Ö2 · admin KARAR 2+5: mentör menti tipini görür) — mentöre dönen DTO türetilmiş harf alır, ham vektör yok. | 🔴 karar çelişkisi (önce doğrula) | Mentör aday kartında menti için "DI" gibi harf görüyor | BEKLIYOR | ajan-ekledi 2026-09-27 (AJ-46/AN-35) · kaynak: `tasarim-kararlari-admin.md` § Statü, Ö2 · kanıt: `backend/src/controllers/matchingController.ts:12-17` (`buildPublicItem`) DTO'da DISC tipi yok · `P-04` (uyum yüzdesi) ile aynı ekran → birlikte yapılabilir · ⚠️ **ÇELİŞKİ (7b #404):** `backend/src/controllers/matchingController.ts:10-11` kasıtlı karar "KARAR 3: … DISC tipi açıklanmaz" ↔ `tasarim-kararlari-admin` KARAR 5 ("mentör mentinin tipini görür"). Uygulamadan ÖNCE hangi kararın geçerli olduğu doğrulanır (01-KARARLAR + cevaplanmış arşiv); çelişki sürerse KARAR kartı açılır. DISC = psikometrik veri (KVKK) — 🟢 işlenmez. |

### AJ-67 (2026-09-28, 3. düzeltme)

**Değişiklik:** numarasız 🔴 satırına açık "sahip:" alanı

**Önceki tam satır (AYNEN, 814 bayt):**

| AJ-67 | Ş0 | **Başlangıç sektör/etiket havuzunun tek kaynağı yok + profilde havuzdan seçim yok** (AN-35 Ö5 · admin KARAR 12) — onboarding listesi frontend'e gömülü ve tehlikeli `seed.ts` havuzuyla farklı; onaylanan öneri ortak havuza girmiyor. | 🔴 KARAR (kart taslağı hazır, açılmadı) | Kullanıcı profilinde sektörünü hazır listeden seçiyor; onaylanan öneri herkesin listesine giriyor | BEKLIYOR | ajan-ekledi 2026-09-27 (AJ-46/AN-35) · kaynak: `tasarim-kararlari-admin.md` § Statü, Ö5 · kanıt: `frontend/src/app/onboarding/_steps/ProfileStep.tsx:12-16` · `SectorTagSuggest.tsx:15` · ürün sorusu: havuz kodda sabit liste mi, yönetici-yönetilir tablo mu (ikincisi şema değişikliği) — KARAR kartı taslağı AJ-46 PR'ında, `01-KARARLAR.md`'ye ana ajan açacak |

### BAŞLIK · KARAR-BEKLEYEN "Ne" satırı (2026-09-28, 3. düzeltme)

```text
**Ne:** `00-KUYRUK.md`'den kapısı 🔴 (yön kararı bekleyen) ve Durumu ATLANDI(karar) olan satırlar — satır metni AYNEN (tek karakter değişmedi), KARAR numarasına göre gruplu. Bir satır birden çok KARAR'a bağlıysa ilk KARAR'ın grubunda durur; diğer gruplarda yalnız "→ bkz." atfı vardır. Kapısında KARAR numarası olmayan 🔴 satırlar en sondaki "KARAR numarasız 🔴" grubundadır.
```

### BAŞLIK § Kapılar notu (2026-09-28, 3. düzeltme — üstü çizili kapı/eski katman arşive)

**Önceki tam satır (AYNEN, 144 bayt):**

⚠️ Bu dosyadaki eski Not'larda geçen "🟡 KALIR: auth/KVKK/matching" gibi ifadeler 2026-09-26 öncesi anlamdadır; kapı sütunu esastır.


### F-11 (2026-09-28, 3. düzeltme — üstü çizili kapı/eski katman arşive)

**Önceki tam satır (AYNEN, 2023 bayt):**

| F-11 | Ş0 | **Algoritma çekirdeği — KARAR-10 kilitli küme.** OCEAN/sektör motoru canlı eşleştirmeye bağlama (G2-07/08/G10-21) + yeni skor formülü %45/30/25 + 2 veto (V1/V2) + triggersOn derinleşme (madde 125/B6) + Big Five göç planı (B12). Motorlar YAZILI ama `matching.ts` onları çağırmıyor. NEDEN: yeni eşleştirme motoru yazılı ama canlı eşleştirme onu çağırmıyor; kullanıcı eski 0.6/0.4 formülüyle eşleşiyor. | 🔴 KARAR-61 | KARAR-10 cevabına göre motor bağlanır/ertelenir | BEKLIYOR | =Faz5 çoğu. Hepsi KARAR-10'a kilitli. Kanıt: `matching.ts:3-5` yeni motoru import etmez; `scoring.ts:89-90` hâlâ 0.6/0.4 ⚠️ `= psikometri konseyi §3 B.4, ek bulgu: seçeneklerin somut maliyeti KARAR-10 kartına eklendi; motorun SIFIR birim testi var ⇒ hangi seçenek seçilirse seçilsin onarımın doğruluğunu kanıtlayacak kanıt örtüsü bugün yok.` **+ ⛔ çapraz atıf (bkz. §4)** ⛔ **BİRLİKTE YAPILMALI — önce silme yolu düzeltilir, SONRA Match yazımı açılır. Ters sıra = KVKK ihlali.** *(karşı taraf: **GV-08**. `createMatchIfEligible` ölü OCEAN motorunun İÇİNDE (`scoring.service.ts:137`) ve arketipi bizzat o yazıyor — KARAR-10'a "C" cevabı gelirse `Match` yazımı bu satır üzerinden açılır.)* 🔓 **KİLİT AÇILDI (2026-09-21, KARAR-10 → C aşamalı).** Kapı **hassasiyet: ** — matching/skorlama (istisna 2). ⚠️ Bu satır **tek başına yapılmaz**: KARAR-10'un cevabı işi **üç aşamaya** böldü → `PS-A1` (düzelt+test) → `PS-A2` (backfill, ⛔ canlı veri) → `PS-A3` (bağlama, ⛔ feature flag). F-11 bu üç satırın **şemsiyesidir**. · aile: Y-C · ⛔ **çelişki: KARAR-80/M9** (2026-09-25) · eski kapı: ~~🔴 KARAR-10~~ 🟡 *(KARAR-10 cevaplandı 2026-09-21: **C, aşamalı**)* · KARAR-80 işlendi (2026-09-26, A kabul) — M9: yalnız 'formül + veto' olarak daraltıldı; yeni formülün ne zaman açılacağı KARAR-61 (+KARAR-65, D-mentör/S-menti yasağı) CEVAPSIZ, kilit korunuyor. |


### KR-08 (2026-09-28, 3. düzeltme — üstü çizili kapı/eski katman arşive)

**Önceki tam satır (AYNEN, 1357 bayt):**

| KR-08 | Ş0 | **Bir görüşmeye yalnız bir taraf değerlendirme yazabiliyor (rapor A5).** NEDEN: görüşmede ilk yazan tarafın değerlendirmesi kaydediliyor, diğerininki kayboluyor (kod inceleme A5). | 🔴 KARAR-89 | (karara göre) Mentör ve menti aynı görüşmeye ayrı ayrı değerlendirme yazabiliyor | BEKLIYOR | Dosyalar: `backend/prisma/schema.prisma` · `backend/src/controllers/feedbackController.ts`. Rapor: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` A5 [D]. ⛔ **MIGRATION** → tarihli yedek tablo + PO onayı (Y-G kuralları). İlişkili: AN-47 (geri bildirim modelleri envanteri). · aile: Y-KR · ⭐ **KARAR-77=A (2026-09-25).** Görünürlük testle kanıtlanacak (karşı taraf göremez · yönetici görür · yazan kendini görür). Önce AN-47 envanterine bak; çelişki varsa BASARISIZ + sebep. Mevcut kayıtların 'yazan kim' yorumu PR açıklamasında örnekle gösterilecek. · ⛔ **ÇELİŞKİ (2026-09-25, AN-47):** `MeetingCheckIn` KARAR-77=A'nın istediği taraf-başına kaydı zaten uyguluyor; `Feedback` bölünürse ikinci kutu doğar → **KARAR-89** cevaplanana kadar dokunulmaz. · ⭐ **KAPI HÜCRESİ SADELEŞTİ 2026-09-27 (GÖREV 0.2):** tek 🔴 = KARAR-89 (cevapsız, `01-KARARLAR.md` KARAR-89 CEVAP boş). Hücre geçmişi: ~~🔴 KARAR-77~~ → 🟡 (KARAR-77=A, 2026-09-25) → 🔴 KARAR-89. |


### P-99 (2026-09-28, 3. düzeltme — üstü çizili kapı/eski katman arşive)

**Önceki tam satır (AYNEN, 1583 bayt):**

| P-99 | Ş0 | **⭐ Sertifika içeriğini seed dosyasına taşı — K-16'nın ÖNKOŞULU.** Finalize 22 senaryo/88 şık (`docs/raporlar/icerik/sertifika-oturum1/2/3-...-2026-09-08.md`) seed'e taşınmamış; `seed-certification.ts` hâlâ 20/80 eski sürüm. NEDEN: finalize sertifika içeriği (22 senaryo/88 şık) seed dosyasında yok; seed atılırsa eski 20/80 içerik canlıya çıkar (K-16 ön koşulu). | 🔴 KARAR-46 | seed-certification.ts 22 senaryo/88 şık içeriyor (seed ÇALIŞTIRILMAZ) | BEKLIYOR | hassasiyet: SEED (seed-certification.ts, K-16 önkoşulu). TUR 3 B.2 bulgusu.  ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):**  — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**). ⛔ Pratik sonuç: taşınacak şık sayısı 8 değil **88'in TAMAMI**; düşecek senaryo **15**. Efor **S değil L**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md:16-19,118-122`. Seed dosyası değişir, seed çalıştırılmaz. ~~[ESKİ · 2026-09-21] Efor M~~ → **Efor L** · aile: Y-G · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. · geçmiş: bkz. `arsiv/00-KUYRUK-gecmis.md` §P-99 |


### AN-03 (2026-09-28, 3. düzeltme — üstü çizili kapı/eski katman arşive)

**Önceki tam satır (AYNEN, 647 bayt):**

| AN-03 | Ş1 | **Sertifika kod↔belge puan çatışması:** T05_A/T10_B (score 2→1) + Kültürel B tersliği + Kriz "yanında olurum" 2 puan geçişi. | 🔴 KARAR-46 | Puanlama belge ile tutarlı; kriz red-line doğru eliyor | BEKLIYOR | Kaynak: A4 · IK(B.6) · TO §4.4 · Y-3/Y-4/Y-5. KARAR-46 (88 şık taşıma) turunda yapılır. Neden: kriz red-line canlı mentör elemeyi etkiler. ~~**⛔ ÇIKIŞ BLOKERİ (aday, KARAR-69 bekliyor)**~~ ✅ **KESİNLEŞTİ ⛔ ÇIKIŞ BLOKERİ (KARAR-69 B, 2026-09-23):** ilk kurum mentörlerinin kalite/kriz-güvenlik kapısı doğru elemeli → KALIR (kriz ayağı KARAR-69 (c) güvenlik kovası). |

### AJ-77 (2026-09-28, 3. düzeltme — 1.500 bayt aşımı)

**Önceki tam satır (AYNEN, 1505 bayt):**

| AJ-77 | Ş0 | **Durum alanlarının enum'a çevrilmesi + çift rol (`User.role` ↔ `TenantMembership.role`) okuma yolları envanteri** (G6-02 / madde 49) — serbest metin durum alanları geçersiz değer kabul ediyor; bazı okumalar hâlâ genel rolden. | 🔵 (migration) | Envanter (alan · canlı değer dağılımı, salt-okuma) + migration PR'ı + tarihli yedek planı + EVET/HAYIR kartı hazır; rol okumalarının `TenantMembership.role`'e geçiş listesi (AJ-01/40/56 sonrası kalan) | PR-ACIK | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:186` (GÖREV 4) · kanıt: `backend/prisma/schema.prisma` (Tenant · MeetingCheckIn · UserReport · MentorshipAgreement · InvitationTemplate String alanları) · `docs/otonom/00-KUYRUK.md:342` (madde 49 alınmadı) · 🔵 **PR-ACIK 2026-09-28:** backend #227 (⛔ MIGRATION `20260928000000_durum_alanlari_enum`, 13 kolon / 5 tablo) + çatı #420 (envanter `docs/raporlar/kod-denetimi/aj77-durum-alanlari-envanter-2026-09-28.md`); 7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/227#issuecomment-5865731487 · test `backend/tests/aj77-status-enum.unit.test.ts` (40) · mutasyon yerel 2/2 kırmızı · EVET kartı KARAR-128 · merge öncesi: §3b sayımı 0 + tarihli yedek (DB erişimi) · girmeyen: `Tenant.plan` (KARAR-119) · `SystemLog.category` (AUDIT temizliği) · rol okuma envanteri → AJ-105 · kilit: KARAR-128 bekliyor (EVET/HAYIR) · kısım kapısı: envanter + taslak kısmı 🟢 |

**Çıkarılan katmanlar (AYNEN):**

- `docs/otonom/00-KUYRUK.md:342` (madde 49 alınmadı)
- EVET kartı KARAR-128


### IC-10 (2026-09-28, 3. düzeltme — 1.500 bayt aşımı)

**Önceki tam satır (AYNEN, 1576 bayt):**

| IC-10 | Ş1 | **madde 139'un eksik yarısı: 4 menti "şimdilik" varyantı YAZILSIN.** Bugün yalnız mentör tarafı yazılı (4/8). NEDEN: çoklu arketip çıkan menti "şimdilik" metnini göremiyor; bugün yalnız mentör varyantları yazılı (madde 139). | 🟢 | (ön koşul işi — kullanıcı etkisi `I-15` ile birlikte görünür: çoklu-arketip çıkan **menti** de "şimdilik" metnini okur) | ✅ BITTI (2026-09-26, metin yazıldı — onay bekliyor) | §0② · §2.1. Belge `arketip-ve-yaklasim-icerigi-2026-09-03.md:269` menti sürümü için **metin değil talimat** bırakmış; yazılı 4 varyant `:271,279,287,295` **yalnız mentör**. ⛔ **`I-15`'in ön koşulu** — I-15 bugün kodlanırsa menti tarafı boş kalır. Ayrı satır açıldı çünkü I-15 🔴 KARAR-10 kilitli, bu iş 🟢 ve ondan bağımsız ilerler. ⚠️ Eşik dalı yazılırken sihirli sayı YOK: eşik sabiti `scoring.config.ts:31` komşusuna. ⚠️ Ad seçimi ad↔kod kararına bağlı (**KARAR-45**). Efor S (yazım) · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M16: ana satır ('şimdilik' varyantları); AN-05 yalnız '15/16 kombinasyon metni'ne daraltılmış olarak ayrıca ilerler. · ✅ **YAZILDI 2026-09-26:** `docs/raporlar/icerik/menti-simdilik-varyantlari.md` (4 varyant, mentör §6 yapısının birebir aynası; adlar yer tutuculu — KARAR-45). Kullanıcı etkisi I-15 ile görünür (🔴 KARAR-10). PO metin onayı belgede ⬜. · kilit: kalan ayak KARAR-45 bekliyor (arketip adları (metinde yer tutucu)) |

**Çıkarılan katmanlar (AYNEN):**

- ⛔ **çelişki: KARAR-80/M16** (2026-09-25)

### AN-49 (2026-09-28, 2.4 sonrası düzeltme — geri bakılabilirlik puanlaması notu)

| AN-49 | Ş3 | ⭐ **Dört feedback modeli tek KALİTE GÖRÜNÜMÜNE bağlansın.** Kim görür → KARAR-67 (drill-down) ile bağlantılı, önce ona bak. NEDEN: dört ayrı geri bildirim modeli var; yönetici tek ve tutarlı bir kalite görünümü göremiyor (strateji karar oturumu E.1c). | 🟢 | Yönetici tek, tutarlı kalite görünümü görüyor | BEKLIYOR | kaynak: strateji karar oturumu (E.1c). ⛔ **SIRA ÖNEMLİ:** (1) KVKK silme yolu düzeltilsin (GV-08) → (2) SONRA `Match` yazımı açılsın (U-18/PS-04/F-11) → (3) SONRA kalite görünümü. Ters sıra KVKK ihlali doğurur. ⚠️ **KARAR-66 B ile çelişki YOK** — ölçüm kurulunca "yönlendirme kalitesi" iddiası KANITLA geri KONABİLİR. hassasiyet: matching/KVKK bağımlı. · aile: Y-C · kilit: kalan ayak KARAR-67 bekliyor (önce KARAR-67: kim görür (drill-down)) — § 🔴 KİLİT HARİTASI · kilit: kalan ayak KARAR-89 bekliyor (kart KARAR-89 bu işi kilitlediğini söylüyor (tek değerlendirme kutusu)) |

### AJ-68 (2026-09-28, 2.4 sonrası düzeltme — geri bakılabilirlik puanlaması notu)

| AJ-68 | Ş0 | **1.000+ karakterlik satırlar (YN-09 kalanı)** — kuyrukta 39, karar-takipte 25 satır tavanı aşıyor; üstü-çizili zincirler taşındı (AJ-46), kalan uzunluk tarihli GÜNCELLEME/BITTI katmanlarından. Satır başına elle yargı: son geçerli hâl satırda, eski katman `arsiv/00-KUYRUK-gecmis.md` / KARAR-TAKIP `## GEÇMİŞ`'e AYNEN. | 🟢 | Bekçi kural (m) iki dosyada da uyarı vermiyor; her taşımada `kalan + taşınan = önceki` sayısı PR'da | BEKLIYOR | ajan-ekledi 2026-09-27 (AJ-46/YN-09 kalanı) · ölçüm: `bash scripts/belge-bekci.sh` kural (m) · en uzunlar: kuyruk E-3 (4.830), karar-takip md.162 (2.880) · ⛔ anlam denetimi: taşınan katman "geçerli bilgi" içeriyorsa satırda özeti kalır · dikkat: kuyruk satırları ana ajanla aynı dosyada → sıralı · ek (2026-09-28, GÖREV 2.1 7b notu): AJ-46 (bu satırla) arşive geçince `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md`'deki 7 AJ-46 kaleminin (AN-35 · AN-54 · E-1 · YN-10 · YN-11 · YN-12 · YN-14) 🟨 ön eki AYNI commit'te ✅ TAMAMLANDI'ya çevrilir |

### P-08 (2026-09-28, kaynak izi eklendi — bekçi (i3))

| P-08 | Ş1 | **Öğrenme yolculuğu ilerlemesi kalıcı değil.** Panel kartı yalnız "başla/tamamlandı"; "neredeyim, sıradaki adım" yok. Sayfadan çıkan menti ilerlemeyi kaybediyor. NEDEN: sayfadan çıkan menti yolculuktaki ilerlemesini kaybediyor, nerede kaldığını göremiyor. | 🔵 | Menti yolculukta kaçıncı aşamada olduğunu kalıcı görüyor | BEKLIYOR | hassasiyet: şema/migration gerekebilir (completedStages) — belirsiz (kanıt: "Backend/şema completedStages gerekebilir"). =M8. Kanıt: `ScenarioGuideEngine.tsx:97 useState(0)`; API `{completed,totalStages}` ama tamamlanan aşama SAYISI yok (`learningJourney.ts:79-84`). Backend/şema completedStages gerekebilir. Efor M · aile: Y-G |

## AJ-68 — 1.000+ karakterlik satırlardan eski katmanlar (YN-09 kalanı, 2026-09-28)

> Kaynak dosya her başlıkta yazılı. Her başlık: satırın taşıma ÖNCESİ tam hâli (AYNEN) + satırdan çıkarılan katmanlar (AYNEN, ayraç ` · ` hariç). Satırda `geçmiş: bkz.` atfı durur.

### AJ-22 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1195 bayt):**

| AJ-22 | Ş0 | **Tarayıcı güvenlik politikası (CSP) yalnız rapor modunda; kurum logosu herhangi bir https adresine konabiliyor** — izleme pikseli üyelerin IP/tarayıcı bilgisini toplayabilir (F-04 + AJ-05 kalanı). | 🟢 (+7b) | CSP engelleme modunda; logo yalnız izinli kaynaktan çiziliyor; test | BITTI (kısmen — KARAR-112) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` (F-04 QE5, AJ-05 QE2) · kanıt: `frontend/src/lib/securityHeaders.mjs:36` (`Content-Security-Policy-Report-Only`) · `backend/src/services/logoUrl.ts:64-76` (yalnız IP/localhost reddi) · hazırlık: `docs/raporlar/kesif/csp-zorunlu-mod-hazirlik-2026-09-27.md` · DURUM: CSP engelleme modunda canlıda (çatı #387, 7b ONAY; test `frontend/src/__tests__/security-headers.test.ts` 9 test; mutasyon yerel) · KALAN: logo yalnız izinli kaynaktan çizilsin → KARAR-112 (PO kararı: her https / alan adı listesi / sunucuya indirme) · CSP ihlal kaydı → AJ-52 · satır 5c-a gereği kuyrukta (kısmen) · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AJ-22 (2026-09-28) · kilit: kalan ayak KARAR-112 bekliyor (logo yalnız izinli kaynaktan) |

**Çıkarılan katmanlar (AYNEN):**

- hazırlık: `docs/raporlar/kesif/csp-zorunlu-mod-hazirlik-2026-09-27.md`
-  (çatı #387, 7b ONAY; test `frontend/src/__tests__/security-headers.test.ts` 9 test; mutasyon yerel)
- satır 5c-a gereği kuyrukta (kısmen)

### AJ-77 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1424 bayt):**

| AJ-77 | Ş0 | **Durum alanlarının enum'a çevrilmesi + çift rol (`User.role` ↔ `TenantMembership.role`) okuma yolları envanteri** (G6-02 / madde 49) — serbest metin durum alanları geçersiz değer kabul ediyor; bazı okumalar hâlâ genel rolden. | 🔵 (migration) | Envanter (alan · canlı değer dağılımı, salt-okuma) + migration PR'ı + tarihli yedek planı + EVET/HAYIR kartı hazır; rol okumalarının `TenantMembership.role`'e geçiş listesi (AJ-01/40/56 sonrası kalan) | PR-ACIK | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:186` (GÖREV 4) · kanıt: `backend/prisma/schema.prisma` (Tenant · MeetingCheckIn · UserReport · MentorshipAgreement · InvitationTemplate String alanları) · 🔵 **PR-ACIK 2026-09-28:** backend #227 (⛔ MIGRATION `20260928000000_durum_alanlari_enum`, 13 kolon / 5 tablo) + çatı #420 (envanter `docs/raporlar/kod-denetimi/aj77-durum-alanlari-envanter-2026-09-28.md`); 7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/227#issuecomment-5865731487 · test `backend/tests/aj77-status-enum.unit.test.ts` (40) · mutasyon yerel 2/2 kırmızı · merge öncesi: §3b sayımı 0 + tarihli yedek (DB erişimi) · girmeyen: `Tenant.plan` (KARAR-119) · `SystemLog.category` (AUDIT temizliği) · rol okuma envanteri → AJ-105 · kilit: KARAR-128 bekliyor (EVET/HAYIR) · kısım kapısı: envanter + taslak kısmı 🟢 |

**Çıkarılan katmanlar (AYNEN):**

- kanıt: `backend/prisma/schema.prisma` (Tenant · MeetingCheckIn · UserReport · MentorshipAgreement · InvitationTemplate String alanları)
- ; 7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/227#issuecomment-5865731487
- test `backend/tests/aj77-status-enum.unit.test.ts` (40)
- mutasyon yerel 2/2 kırmızı
-  (envanter `docs/raporlar/kod-denetimi/aj77-durum-alanlari-envanter-2026-09-28.md`)
- `20260928000000_durum_alanlari_enum`, 

### AJ-89 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 2189 bayt):**

| AJ-89 | Ş0 | **Mentinin "ne arıyorum" (S1 ihtiyaç) cevabı hiçbir ekranda gösterilmiyor; tasarımın görünürlük kuralının (§10.3) kalan iki ayağı yok** — eşleşme kurulduktan sonra mentör görmüyor; yönetici toplu dağılımı görmüyor. | 🟢 (+7b) | Eşleşmiş mentör mentinin ihtiyaç beyanını görüyor (eşleşmemiş mentör göremiyor — negatif test); yönetici yalnız toplu dağılım görüyor, küçük grupta (eşik 3) gizli | BITTI (kısmen — KARAR-130) | ajan-ekledi 2026-09-27 · kaynak: `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:756` (GÖREV 4) · kanıt: `backend/prisma/schema.prisma:293-295` · `frontend/src/app/onboarding/_steps/ThreeQuestionsStep.tsx:62` (tek ekran; `(dashboard)` araması 0) · kural: tasarım belgesi `:604-620` · 🟨 **BITTI (kısmen) 2026-09-28 — yönetici kolu tam; mentör kolu → KARAR-130:** backend #235 + çatı #430 (7b ONAY https://github.com/zahidsamiata/menti-mentor-v2/pull/430#issuecomment-5870867316). Kod: yeni `backend/src/services/mentiNeedsDistribution.service.ts` (saf `buildMentiNeedsDistribution`: hücre ve payda k-anonimliği eşik 3 — `mask.ts` · `computeMentiNeedsDistribution`: `tenantMembership`ten başlar, yalnız `mentiNeeds`) · `adminController.ts` `getKpiDashboard` → `stats.mentiNeeds` (CSV'ye dokunulmadı) · ön yüz `frontend/src/components/organisms/MentiNeedsDistributionCard.tsx` + `/admin/kpi` (etiketler mevcut `MENTI_S1`). Test: `backend/tests/menti-needs-distribution.unit.test.ts` (5) · `backend/tests/menti-needs-kpi.test.ts` (5 DB; negatif: B kurumu görünmez, MENTOR/MENTI 403) · `frontend/src/__tests__/admin-kpi-menti-needs.test.tsx` (3). mutasyon: CI taslak #233 (k-anonimlik) + #234 (kurum filtresi) kırmızı, kapatıldı + yerel. Kalan: mentör kolu (mentöre hangi anda açılsın) → KARAR-130 · 3/3=%100 ve tamamlayıcı çıkarımı + tasarımdaki "ör. 5" eşik ↔ kod 3 → k-anonimlik eşiği/kural kartı adayı (KARAR-PAKETI notu). Canlı ok:true · db:up · /admin/kpi 200. CANLIDA BAK: kurum yöneticisi KPI panelinde "Mentilerin ihtiyaç dağılımı" kartını görüyor; 3'ten az seçilen seçenek "gizli". |

**Çıkarılan katmanlar (AYNEN):**

- kanıt: `backend/prisma/schema.prisma:293-295` · `frontend/src/app/onboarding/_steps/ThreeQuestionsStep.tsx:62` (tek ekran; `(dashboard)` araması 0)
-  (7b ONAY https://github.com/zahidsamiata/menti-mentor-v2/pull/430#issuecomment-5870867316)
- Kod: yeni `backend/src/services/mentiNeedsDistribution.service.ts` (saf `buildMentiNeedsDistribution`: hücre ve payda k-anonimliği eşik 3 — `mask.ts` · `computeMentiNeedsDistribution`: `tenantMembership`ten başlar, yalnız `mentiNeeds`) · `adminController.ts` `getKpiDashboard` → `stats.mentiNeeds` (CSV'ye dokunulmadı) · ön yüz `frontend/src/components/organisms/MentiNeedsDistributionCard.tsx` + `/admin/kpi` (etiketler mevcut `MENTI_S1`). Test: `backend/tests/menti-needs-distribution.unit.test.ts` (5) · `backend/tests/menti-needs-kpi.test.ts` (5 DB; negatif: B kurumu görünmez, MENTOR/MENTI 403) · `frontend/src/__tests__/admin-kpi-menti-needs.test.tsx` (3). mutasyon: CI taslak #233 (k-anonimlik) + #234 (kurum filtresi) kırmızı, kapatıldı + yerel. 
- Canlı ok:true · db:up · /admin/kpi 200. CANLIDA BAK: kurum yöneticisi KPI panelinde "Mentilerin ihtiyaç dağılımı" kartını görüyor; 3'ten az seçilen seçenek "gizli".
- kural: tasarım belgesi `:604-620`

### K-15 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1111 bayt):**

| K-15 | Ş2 | **AvailabilityBlock'a format + süre (tam randevu mimarisi).** ⛔ önce `availability_block_yedek_20260910`; migration default'lu (format=ONLINE, durationMin=60); mentör slot açarken format+süre seçer; menti slottan seçer. NEDEN: mentör görüşme biçimini ve süresini belirleyemiyor; menti uygun slotu seçemiyor (KARAR-1 → A). | 🔵 | Mentör format+süre belirliyor, menti seçiyor, eski kayıtlar bozulmadı | PR-ACIK | KAYNAK: KARAR-1 → A (2026-09-21; PO şartı: önce tarihli yedek, sonra açık onay) · AN-25 buraya katlandı (KARAR-80/M10; koşul alanları bu PR'da yok) · aile: Y-G · 🔵 **HAZIRLANDI 2026-09-27:** backend #189 (⛔ MIGRATION: `AvailabilityBlock.format` @default ONLINE + `durationMin` @default 60; 7b ONAY) + çatı #374 (form + randevu ekranı; 7b ONAY). AN-25 koşul alanları bilerek dışarıda (tasarlanmadı). EVET/HAYIR: **KARAR-111** (mevcut blokların ONLINE/60'a daralması, <60 dk blok riski, yedek MERGE'DEN ÖNCE). · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § K-15 (2026-09-28) · kilit: KARAR-111 bekliyor (EVET/HAYIR) |

**Çıkarılan katmanlar (AYNEN):**

- AN-25 buraya katlandı (KARAR-80/M10; koşul alanları bu PR'da yok)
-  (2026-09-21; PO şartı: önce tarihli yedek, sonra açık onay)

### E-3 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1832 bayt):**

| E-3 | değişir | **BAĞLA kovasını yap.** Her kalem ayrı PR, kendi şeridinde. Küçük ve migration'sız olanlar 🟢, diğerleri 🟡. Sırala: en az emekle en çok kullanıcı değeri önce. NEDEN: backend'de yazılmış ama hiçbir ekrana bağlanmamış uçlar kullanıcıya değer vermiyor (e3 keşfi: 62 uç, BAĞLA 10). | 🟢 | Her kalem için kullanıcı ekranda bir şey görüyor | BITTI (kısmen — kalanlar devredildi: anlaşma taslağı → 🔴 KARAR-109 · bağlamsal kart → U-18/KARAR-97 · değerlendirme okuma → AJ-49 · 3 takip → AJ-106) | ⭐ **KEŞİF (2026-09-25):** `docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md` — 62 uç: **BAĞLA 10** (1'i 🔴 U-01) · MÜKERRER 21 · İÇ/SİSTEM 7 · TERK/ÜRÜN 24 (silinmez, yalnız listelendi) · DURUM (2026-09-27): E-3a gereksiz (rozet zaten `admin/eslesmeler` Risk sütununda) · E-3b (backend #127 + çatı #308) · E-3c (backend #135 + çatı #313) · E-3d (backend #187 + çatı #371) · E-3e (çatı #372) BITTI · KALAN: anlaşma taslağı → 🔴 KARAR-109 (kim başlatır — PO) · bağlamsal geri bildirim kartı → U-18 / KARAR-97 (PO EVET'i bekliyor) · değerlendirme okuma (`GET /api/meetings/:meetingId/feedback`) → AJ-49 · takip → AJ-106 (engel koyma ucu denetim kaydı · kayıp güncelleme · seçim listeleri ilk sayfa) · KARAR (GÖREV 2.4 düzeltmesi): yapılabilir 🟢 kısım kalmadı; kalan her ayağın sahibi var → Durum "BITTI (kısmen)", satır 5c-a gereği kuyrukta; anlaşma taslağı ayağının sahibi bu satır (KARAR-109) · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § E-3 (2026-09-28) · kilit: kalan ayak KARAR-109 bekliyor (anlaşma taslağı (sahibi E-3)) — § 🔴 KİLİT HARİTASI · kilit: kalan ayak KARAR-97 bekliyor (bağlamsal geri bildirim kartı, U-18 üzerinden) |

**Çıkarılan katmanlar (AYNEN):**

-  — 62 uç: **BAĞLA 10** (1'i 🔴 U-01) · MÜKERRER 21 · İÇ/SİSTEM 7 · TERK/ÜRÜN 24 (silinmez, yalnız listelendi)
- DURUM (2026-09-27): E-3a gereksiz (rozet zaten `admin/eslesmeler` Risk sütununda) · E-3b (backend #127 + çatı #308) · E-3c (backend #135 + çatı #313) · E-3d (backend #187 + çatı #371) · E-3e (çatı #372) BITTI
- KALAN: anlaşma taslağı → 🔴 KARAR-109 (kim başlatır — PO) · bağlamsal geri bildirim kartı → U-18 / KARAR-97 (PO EVET'i bekliyor) · değerlendirme okuma (`GET /api/meetings/:meetingId/feedback`) → AJ-49 · takip → AJ-106 (engel koyma ucu denetim kaydı · kayıp güncelleme · seçim listeleri ilk sayfa)
- KARAR (GÖREV 2.4 düzeltmesi): yapılabilir 🟢 kısım kalmadı; kalan her ayağın sahibi var → Durum "BITTI (kısmen)", satır 5c-a gereği kuyrukta; anlaşma taslağı ayağının sahibi bu satır (KARAR-109)

### F-02 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1115 bayt):**

| F-02 | Ş3 | **Message otomatik imha (G1-06 kalanı).** FeedbackLog 3-yıl + SystemLog 90g imhası ✅ yazılı; kullanıcı **mesajlarının** (Message) saklama-süre imhası yazılmadı. NEDEN: kullanıcı mesajları süresiz saklanıyor; KVKK saklama süresi dolunca imha edilmeli (G1-06). | 🟡 | Mesaj saklama süresi dolunca otomatik siliniyor | BEKLIYOR | hassasiyet: KVKK/veri imha. =G1-06, Faz 2. Süre G1-10 avukat metnine bağlı. Kanıt: `gdprService.ts` TODO(G1-10); FeedbackLog `deleteMany` var ⚠️ = güvenlik konseyi §2.B.4, ek bulgu: `Message` için süre yazılmamış olması BİLİNÇLİ ve gerekçeli (`gdprService.ts:375-378` TODO(G1-10): "kodda keyfi süre yazarsak aydınlatma metniyle çelişir"). Kıyas doğrulandı: SystemLog 90 gün `:341,366-368` ✅ ve FeedbackLog 3 yıl `:342,371-373` ✅ UYGULANIYOR — eski raporların "uygulanmamış" iddiası BAYAT. Kilit: avukat metni (03-PO #16 · P-a). · aile: Y-B · PO kısmı: avukattan kullanıcı mesajlarının KVKK saklama süresini belirletmek (03-PO-ELLE-ISLER #16); süre gelince silme kodu 🟢 kurallarıyla yazılır. |

**Çıkarılan katmanlar (AYNEN):**

- Kıyas doğrulandı: SystemLog 90 gün `:341,366-368` ✅ ve FeedbackLog 3 yıl `:342,371-373` ✅ UYGULANIYOR — eski raporların "uygulanmamış" iddiası BAYAT. 

### F-05 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1354 bayt):**

| F-05 | Ş4 | **CAPTCHA/step-up (G1-26).** Public şüphe formunda IP-limit ✅ var; CAPTCHA + step-up doğrulama yok. NEDEN: herkese açık şüphe formu yalnız IP sınırıyla korunuyor; bot/spam başvuruları engellenemiyor (G1-26). | 🟡 | Public formda bot/spam koruması güçlendi | BEKLIYOR | hassasiyet: güvenlik/auth (step-up doğrulama). =G1-26, Faz 3. Kanıt: `suspicionRoutes.ts:9` rate-limit var; CAPTCHA grep boş · aile: Y-A · ⭐ **KAPI DÜZELTMESİ 2026-09-27 (kural uygulaması):** 🟢→🟡 — CAPTCHA gerçek bir dış servis hesabı + anahtar ister (PO eli, DK-01/Sentry deseni). Kod kısmı 🟢 kurallarıyla yapılıyor (anahtar yokken etkisiz); PO kısmı `03-PO-ELLE-ISLER.md`. · **2026-09-27 kod kısmı hazır:** backend #183 + çatı #367 (Cloudflare Turnstile; anahtar yokken no-op, 4 uç: register/forgot-password/self-serve-register/suspicion-reports). CI bekleniyor, MERGE YOK (PO kısmı = Turnstile hesabı + iki anahtar; bkz. `03-PO-ELLE-ISLER.md`). · ✅ **KOD KISMI CANLIDA 2026-09-27:** backend #183 (`e68f306`, 7b ONAY) + çatı #367 (`c03f754`, pointer + widget sıfırlama; 7b 2. tur ONAY). Anahtar yokken davranış aynı (no-op). ⏳ Satır 🟡 kuralı gereği PO kısmı bitene kadar AÇIK: Turnstile hesabı + iki anahtar (`03-PO-ELLE-ISLER.md` en üst, doğrulama yolu ve kesinti notu dahil). |

**Çıkarılan katmanlar (AYNEN):**

- ⭐ **KAPI DÜZELTMESİ 2026-09-27 (kural uygulaması):** 🟢→🟡 — CAPTCHA gerçek bir dış servis hesabı + anahtar ister (PO eli, DK-01/Sentry deseni). Kod kısmı 🟢 kurallarıyla yapılıyor (anahtar yokken etkisiz); PO kısmı `03-PO-ELLE-ISLER.md`.
- **2026-09-27 kod kısmı hazır:** backend #183 + çatı #367 (Cloudflare Turnstile; anahtar yokken no-op, 4 uç: register/forgot-password/self-serve-register/suspicion-reports). CI bekleniyor, MERGE YOK (PO kısmı = Turnstile hesabı + iki anahtar; bkz. `03-PO-ELLE-ISLER.md`).

### U-18 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1379 bayt):**

| U-18 | Ş0 | **`MatchRequest` durumsuz → mentörün mesaj talebini kabul/ret kapısı yok;** `Match` tablosuna yazan kod yok (`createMatchIfEligible` 0 çağıran). NEDEN: mentör kendisine gelen mesaj talebini kabul/ret edemiyor (X §3 K6). | 🔵 | Mentör mesaj talebini kabul/ret edebiliyor (karara göre) | PR-ACIK | aile: Y-C · DURUM: PR-ACIK — backend #148 + çatı #326 (CI yeşil; 7b 2. tur ONAY 2026-09-26) · ⛔ MIGRATION `Conversation.rejectedAt` (boş bırakılabilir ek alan; dosya elle yazıldı, uygulanmadı) → merge için PO EVET'i (KARAR-97) + `Conversation` tarihli yedeği · Uygulama: mentör `POST /api/conversations/:id/reject` ile reddediyor (menti/yönetici/yabancı → 404), menti nazik ret metni görüyor, alternatif mentör önerisi YOK (KARAR-22 B; I-16 ret metinleri buraya katlandı — KARAR-80/M1) · Kapsam dışı: P-05 (görüşme reddi) · e-posta bildirimi (SMTP) · `MatchRequest` durum alanı · Takip (satırı yok, strateji katmanına): gerçek bildirim + gelen kutusunda ret işareti; bildirim metnindeki "Mentörünüz" · ⛔ Sıra kuralı: `Match` yazımı ancak silme yolu (GV-08, tamamlandı) sonrası açılır · KAYNAK: X §3 K6 / §10#23 · kod incelemesi D1 · kanıt `schema.prisma:439-456` · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § U-18 (2026-09-28) · kilit: KARAR-97 bekliyor (EVET/HAYIR) |

**Çıkarılan katmanlar (AYNEN):**

-  (CI yeşil; 7b 2. tur ONAY 2026-09-26)
- Uygulama: mentör `POST /api/conversations/:id/reject` ile reddediyor (menti/yönetici/yabancı → 404), menti nazik ret metni görüyor, alternatif mentör önerisi YOK (KARAR-22 B; I-16 ret metinleri buraya katlandı — KARAR-80/M1)
- Kapsam dışı: P-05 (görüşme reddi) · e-posta bildirimi (SMTP) · `MatchRequest` durum alanı
- kanıt `schema.prisma:439-456`

### Y-05 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1121 bayt):**

| Y-05 | Ş0 | **madde 100 — `SystemLog.meta` JSON-yol sorguları indekssiz.** Log büyüdükçe kalibrasyon sayfası ve dürtme kontrolü yavaşlar. NEDEN: log tablosu büyüdükçe kalibrasyon sayfası ve dürtme kontrolü yavaşlıyor (madde 100). | 🔵 | Log büyüdükçe kalibrasyon sayfası yavaşlamıyor | BEKLIYOR | hassasiyet: **MIGRATION** (yeni `@@index`). madde 100. Kanıt: `prisma/schema.prisma:683-696` — `meta Json?` `:688`, indeksler `:691-695` (level/category/createdAt) — `meta` yok. ⭐ **Sorguyu YAPAN kod (raporda yoktu, bu turda bulundu):** `algorithmTuner.ts:209` `meta:{path:['tenantId']}` **ve** `nudgeService.ts:30` `meta:{path:['targetUserId']}` — indeks ikisini de hedeflemeli. · aile: Y-G · ⏸️ 2026-09-26: kod bu turda YAZILMADI — Prisma'nın JSON yol sorgusunun (`meta:{path:[…],equals}`) ürettiği SQL ile ifade indeksinin eşleştiği ancak veritabanında `EXPLAIN` ile kanıtlanabilir; Prisma şeması ifade indeksini temsil edemez (ileride `migrate dev` drift'i indeksi silmeye kalkabilir). **Tek seferlik DB erişimi gerekiyor (EXPLAIN)** → 00-SIMDI Engeller. |

**Çıkarılan katmanlar (AYNEN):**

- Kanıt: `prisma/schema.prisma:683-696` — `meta Json?` `:688`, indeksler `:691-695` (level/category/createdAt) — `meta` yok. 
-  (raporda yoktu, bu turda bulundu)

### Y-12 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1251 bayt):**

| Y-12 | Ş4 | **madde 56+67 — ölçüm kodu (GTM/GA4/Clarity) ve çerez izni.** ⭐ **PR #110'u açan anahtar.** NEDEN: kurum sahibi ziyaretçi sayısını görmeli; ölçüm kodu çerez izninden önce açılırsa "KVKK ihlali doğar" (PR #110 başlığı: "çerez izni yok, KVKK riski"). | 🟢 | Kullanıcı ilk girişte çerez tercihini seçiyor; reddederse izleme yüklenmiyor; kurum sahibi ziyaretçi sayısını görüyor | BEKLIYOR | ⚠️ **BİRLEŞTİRİLDİ (2026-09-21):** madde 67 **tek başına açılmamalı** — bugünkü main'de üçüncü-taraf çerez **SIFIR** (7 terim, harf duyarsız → ölçüm/izin kodu 0) ve `app/gizlilik/page.tsx:62-63` bunu açıkça beyan ediyor ⇒ bugün çerez bandı **yasal olarak gereksiz**. ⛔ **SIRA BAĞIMLILIĞI: 67 → 56.** 56 önce merge edilirse KVKK ihlali doğar. ⭐ Kod **YAZILMIŞ**: `origin/feat/analytics-seo-2026-08-22` (`dcf5d9a`) içinde `components/analytics/Analytics.tsx` var, main'de yok; **PR #110 AÇIK** (GitHub teyidi 2026-09-21, başlık: *"🛑 MERGE ETME — çerez izni yok, KVKK riski"*). Bu satır = **#110'u merge edilebilir hale getirmek**, sıfırdan yazmak değil. · aile: Y-B · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § Y-12 (2026-09-28) |

**Çıkarılan katmanlar (AYNEN):**

-  (7 terim, harf duyarsız → ölçüm/izin kodu 0)
-  ve `app/gizlilik/page.tsx:62-63` bunu açıkça beyan ediyor
-  (GitHub teyidi 2026-09-21, başlık: *"🛑 MERGE ETME — çerez izni yok, KVKK riski"*)

### Y-17 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1360 bayt):**

| Y-17 | Ş0 | **madde 166 — iki farklı `rankMentorsForMenti` fonksiyonu.** Aynı ad, iki dosya, farklı imza (biri senkron biri async); yanlışını import etmek kolay. NEDEN: aynı adlı iki fonksiyon var; yanlışını import etmek eşleştirme davranışını sessizce değiştirir (madde 166). | 🟢 | Tek isim tek davranış; yanlış import imkânsız | BEKLIYOR | Kanıt (tam **2 tanım**): `scoring.service.ts:165` (senkron) ↔ `matching.ts:351` (async). Ayrı ayrı çağrılıyorlar: `sjtScoringController.ts:5,133` ve `sector-scorer.service.ts:4,110` → scoring.service · `matchingController.ts:5,107` → matching. ⚠️ I-13/I-14 ile aynı dosya ailesi → **SIRALI**. ⚠️ = psikometri konseyi §5 D.3 dipnotu, ek bulgu: güncel teyit — matching.ts:351 (canlı, async) ↔ scoring.service.ts:165 (ölü, senkron); karışıklık riski gerçek, bu raporun kendisi de ayrımı her seferinde açıkça yazmak zorunda kaldı. · **KARAR-80/M21 sıra notu:** PS-A1..A3'ten SONRA (hangi puanlama imzası kalacak PS-A3 ile belirlenir). · ⚠️ **2026-09-25 kapı düzeltmesi:** Not'taki sıra: PS-A1..A3'ten SONRA (hangi puanlama imzası kalacak) — onlar 🔴 KARAR-80. · KARAR-80 işlendi (2026-09-26, A kabul) — M21: sıra notu işlendi (PS-A1..A3'ten SONRA); bu bir karar değil sıra bilgisi, kapı eski haline (🟢) döndü. |

**Çıkarılan katmanlar (AYNEN):**

- ; karışıklık riski gerçek, bu raporun kendisi de ayrımı her seferinde açıkça yazmak zorunda kaldı
- ⚠️ **2026-09-25 kapı düzeltmesi:** Not'taki sıra: PS-A1..A3'ten SONRA (hangi puanlama imzası kalacak) — onlar 🔴 KARAR-80.
- KARAR-80 işlendi (2026-09-26, A kabul) — M21: sıra notu işlendi (PS-A1..A3'ten SONRA); bu bir karar değil sıra bilgisi, kapı eski haline (🟢) döndü.

### DK-02 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1114 bayt):**

| DK-02 | Ş3 | **Kuruma giden "düzeltme" e-postası metni.** KARAR-23. Onay ve düzeltme maili açılır; **ret maili GÖNDERİLMEZ**. NEDEN: düzeltme istenen kurum ne düzelteceğini e-postayla öğrenemiyor (KARAR-23). | 🟡 | Düzeltme isteyen kuruma açık, kırıcı olmayan, ne düzelteceğini söyleyen e-posta gider | BEKLIYOR | 🟡 kuruma görünen + hukuki metin — merge YOK. ⚠️ Ajan metni HAZIRLAR; bildirim AÇILMADAN ÖNCE **PO onayı** (`03-PO-ELLE-ISLER.md` avukat paketi md.8). ⚠️ SMTP (çıkış B4) + `TENANT_NOTIFICATIONS_ENABLED` (B5) bağımlı. `tenantNotifications.ts` mevcut altyapı. Detay: KARAR-23 CEVAP. · aile: Y-B · ⛔ **çelişki: KARAR-80/M21** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M21: avukat ön koşulu KALKTI (düzeltme maili metni zaten kodda var: tenantNotifications.ts:50-63, ayrıca avukat onayı gerekmiyor). Ajan metni hazırlar + gönderir; yalnız SMTP/TENANT_NOTIFICATIONS_ENABLED bağımlılığı kalır. · PO kısmı: Dokploy'da SMTP'yi ve `TENANT_NOTIFICATIONS_ENABLED='true'` ayarını açmak (03-PO-ELLE-ISLER B5 / #5). |

**Çıkarılan katmanlar (AYNEN):**

- ⚠️ Ajan metni HAZIRLAR; bildirim AÇILMADAN ÖNCE **PO onayı** (`03-PO-ELLE-ISLER.md` avukat paketi md.8). 
- ⛔ **çelişki: KARAR-80/M21** (2026-09-25)

### IC-10 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1528 bayt):**

| IC-10 | Ş1 | **madde 139'un eksik yarısı: 4 menti "şimdilik" varyantı YAZILSIN.** Bugün yalnız mentör tarafı yazılı (4/8). NEDEN: çoklu arketip çıkan menti "şimdilik" metnini göremiyor; bugün yalnız mentör varyantları yazılı (madde 139). | 🟢 | (ön koşul işi — kullanıcı etkisi `I-15` ile birlikte görünür: çoklu-arketip çıkan **menti** de "şimdilik" metnini okur) | ✅ BITTI (2026-09-26, metin yazıldı — onay bekliyor) | §0② · §2.1. Belge `arketip-ve-yaklasim-icerigi-2026-09-03.md:269` menti sürümü için **metin değil talimat** bırakmış; yazılı 4 varyant `:271,279,287,295` **yalnız mentör**. ⛔ **`I-15`'in ön koşulu** — I-15 bugün kodlanırsa menti tarafı boş kalır. Ayrı satır açıldı çünkü I-15 🔴 KARAR-10 kilitli, bu iş 🟢 ve ondan bağımsız ilerler. ⚠️ Eşik dalı yazılırken sihirli sayı YOK: eşik sabiti `scoring.config.ts:31` komşusuna. ⚠️ Ad seçimi ad↔kod kararına bağlı (**KARAR-45**). Efor S (yazım) · KARAR-80 işlendi (2026-09-26, A kabul) — M16: ana satır ('şimdilik' varyantları); AN-05 yalnız '15/16 kombinasyon metni'ne daraltılmış olarak ayrıca ilerler. · ✅ **YAZILDI 2026-09-26:** `docs/raporlar/icerik/menti-simdilik-varyantlari.md` (4 varyant, mentör §6 yapısının birebir aynası; adlar yer tutuculu — KARAR-45). Kullanıcı etkisi I-15 ile görünür (🔴 KARAR-10). PO metin onayı belgede ⬜. · kilit: kalan ayak KARAR-45 bekliyor (arketip adları (metinde yer tutucu)) |

**Çıkarılan katmanlar (AYNEN):**

- Belge `arketip-ve-yaklasim-icerigi-2026-09-03.md:269` menti sürümü için **metin değil talimat** bırakmış; yazılı 4 varyant `:271,279,287,295` **yalnız mentör**. 
- ⛔ **`I-15`'in ön koşulu** — I-15 bugün kodlanırsa menti tarafı boş kalır. 
- Ayrı satır açıldı çünkü I-15 🔴 KARAR-10 kilitli, bu iş 🟢 ve ondan bağımsız ilerler. 
- KARAR-80 işlendi (2026-09-26, A kabul) — M16: ana satır ('şimdilik' varyantları); AN-05 yalnız '15/16 kombinasyon metni'ne daraltılmış olarak ayrıca ilerler.

### YN-13 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1384 bayt):**

| YN-13 | Ş0 | **Kişi adı yasağı kendi dosyasında ihlal ediliyor.** Kural `CLAUDE.md § Kişi Adı Yasağı` *"Hiçbir kod/yorum/commit/PR/belgeye kişi adı YAZMA"*; ihlal **aynı dosyanın 279 satır yukarısında** (`CLAUDE.md § Nedir`) + `00-KUYRUK.md:2` + toplam **13 dosyada 15 geçiş**. Kuralın kendi istisnası (*"ayrı bir temizlik işinde giderilir"*) → iş **hiç açılmadı**. ⚠️ **Repo PUBLIC.** NEDEN: repo public ve kişi adı yasağı ihlal ediliyor (13 dosyada 15 geçiş). | 🟢 | Public repoda kişi adı geçmiyor | ✅ BITTI (kısmen, PO elle işi kaldı) | §B.3-4. ⚠️ KVKK metinlerindeki **4 geçiş yasal zorunluluk**, hariç (G9-14 "DOKUNULMADI" kararı). hassasiyet: KVKK dosyalarına komşu. **Bu satır ve bu rapor ad listesi ÜRETMEZ** — `grep` PO'nun elinde. · aile: Y-B · ✅ **BITTI 2026-09-26:** çatı #334 (`49c8cbb`). CANLIDA BAK: (iç) çalışma kuralları/kuyruk/içerik raporunda kişi adı yok. Kalan PO kısmı: backend `.claude/settings.local.json` → 03-PO-ELLE-ISLER. · ⚠️ K5-Y2: `G9-belge-surec.md:277`'de alıntılanan tam ad kaldırıldı (2026-09-26); backend `.claude/settings.local.json` PO kısmı. · Kapsam dışı (bilinçli): `kvkk-metinleri/` (yasal zorunluluk) · repo bağlantılarındaki GitHub kullanıcı adı · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § YN-13 (2026-09-28) |

**Çıkarılan katmanlar (AYNEN):**

-  (`49c8cbb`). CANLIDA BAK: (iç) çalışma kuralları/kuyruk/içerik raporunda kişi adı yok
- hassasiyet: KVKK dosyalarına komşu. 
- ⚠️ K5-Y2: `G9-belge-surec.md:277`'de alıntılanan tam ad kaldırıldı (2026-09-26); backend `.claude/settings.local.json` PO kısmı.

### AN-05 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1106 bayt):**

| AN-05 | Ş1 | **Menti "şimdilik" 4 varyantı + eşleşme detay 15/16 kombinasyon metnini yaz.** | 🟢 | Menti belirsiz eşleşmede doğru "şimdilik" metnini görüyor | 🟨 kısmen (metin yazıldı, PO onayı bekliyor — bitti-dogrulama 09-27 ⚠️) · ✅ BITTI (2026-09-26, metin yazıldı — onay bekliyor) | Kaynak: A6 · IK(D) · TO Y-30. IC-10 / I-11 ön koşulu; menti varyantı 0 yazılı. Neden: bugün boş/eksik metin. · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M16: yalnız '15/16 kombinasyon metni'ne DARALTILDI (IC-10 ana satırdır, geri kalanı orada); bu dar kapsam bağımsız ilerler. · ✅ **YAZILDI 2026-09-26 (daraltılmış kapsam: 15/16 kombinasyon):** `docs/raporlar/icerik/birlikte-calisma-kombinasyonlari.md` — kaynak örnek (Rotacı×Ayna) aynen + 15 yeni metin, aynı 4 parçalı yapı; "eşleşme" sözcüğü kullanılmadı (KARAR-66 B). Adlar KARAR-45'e bağlı; PO metin onayı belgede ⬜. Menti "şimdilik" varyantları IC-10 ile ayrıca yazıldı. · kilit: kalan ayak KARAR-45 bekliyor (arketip adları) |

**Çıkarılan katmanlar (AYNEN):**

- ⛔ **çelişki: KARAR-80/M16** (2026-09-25)
- KARAR-80 işlendi (2026-09-26, A kabul) — M16: yalnız '15/16 kombinasyon metni'ne DARALTILDI (IC-10 ana satırdır, geri kalanı orada); bu dar kapsam bağımsız ilerler.

### AN-12 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1146 bayt):**

| AN-12 | Ş3 | **`interactionStyle` karantina** (dondurulmuş alanı yazma şemalarından çıkar) + tie-break tek kaynak (D>I>S>C ↔ D>I>C>S). NEDEN: dondurulmuş `interactionStyle` alanı hâlâ yazılıyor ve DISC eşitlik sırası iki yerde farklı — harf sonucu değişebilir (A14 · TO Y-13/Y-16). | 🔵 | Tek tie-break kuralı; ölü alan yazılmıyor | PR-ACIK | Kaynak: A14 · TO Y-13/Y-16. ⛔ SİLME PROTOKOLÜ (karantina, silme değil). 🟡 matching; tie-break önce doğrula (harf sonucu değişir). · aile: Y-C · ⭐ **KAPI DÜZELTMESİ 2026-09-27 (kural uygulaması):** 🟢→🔵 — iş "karantina" (dondurulmuş alanı yazma şemalarından çıkar); OTONOM-PROMPT Bölüm 7: karantina 🔵 (PR + 7b + EVET kartı). Kaynak: kalan 🟢 ayıklaması (02-ILERLEME 2026-09-27). · 🔵 **HAZIRLANDI 2026-09-27:** backend #186 (karantina: 3 yazma yolu kapandı, okuma/şema aynı; 7b ONAY, CI yeşil) + çatı #370 (silme protokolü arşivi `docs/arsiv/silinenler-2026-09-27.md`). EVET/HAYIR: **KARAR-107**. Tie-break kısmı ayrı ürün sorusu: **KARAR-108** (bugün etkisi yok). · kilit: KARAR-107 bekliyor (EVET/HAYIR) |

**Çıkarılan katmanlar (AYNEN):**

- ⭐ **KAPI DÜZELTMESİ 2026-09-27 (kural uygulaması):** 🟢→🔵 — iş "karantina" (dondurulmuş alanı yazma şemalarından çıkar); OTONOM-PROMPT Bölüm 7: karantina 🔵 (PR + 7b + EVET kartı). Kaynak: kalan 🟢 ayıklaması (02-ILERLEME 2026-09-27).

### AN-26 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1389 bayt):**

| AN-26 | Ş2 | **Müsaitlik hatırlatması (zamanlanmış iş) + kurum yöneticisine eskalasyon:** menti talebinden 3 gün→mentöre hatırlatma · 7 gün→2. hatırlatma · 10 gün→yöneticiye bildirim. NEDEN: mentör talebe yanıt vermezse menti süresiz bekliyor; kimse haberdar olmuyor (KARAR-53 ④). | 🔵 | Yanıtsız mentör dürtülüyor, uzun sessizlikte yönetici haberdar | PR-ACIK | Kaynak: **KARAR-53 ④** (Bölüm 3, süreler ajan varsayılanı gerekçeli). ⚠️ SMTP'ye bağlı (03-PO B4); zamanlanmış iş altyapısı. 🟡. · aile: Y-D · KARAR-80 işlendi (2026-09-26, A kabul) — M2: ana satır — KARAR-53 ④'e göre 3 gün mentöre hatırlatma, 7 gün 2. hatırlatma, 10 gün yöneticiye eskalasyon; I-10 buraya katlandı. · 🔀 **PR-ACIK 2026-09-26 (🔵 akışı — uygulama migration gerektirdi):** backend #157 (`fb6c411`) + çatı #337 (pointer). Migration: `Conversation` +3 nullable guard alanı (yalnız ekleme, ÇALIŞTIRILMADI). CI yeşil (923 test). **KARAR-98** EVET/HAYIR kartı açıldı. 7b incelemesi sürüyor. · ✅ 7b 2. tur ONAY (2026-09-26; backend #157 `cb6b83d` yorum 5849046560 · çatı #337 `10346e0` yorum 5849046681; 941 test). Kalan: KARAR-98 EVET (+ alt soru) + `Conversation` yedeği. · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § AN-26 (2026-09-28, düzeltme) · kilit: KARAR-98 bekliyor (EVET/HAYIR) |

**Çıkarılan katmanlar (AYNEN):**

- KARAR-80 işlendi (2026-09-26, A kabul) — M2: ana satır — KARAR-53 ④'e göre 3 gün mentöre hatırlatma, 7 gün 2. hatırlatma, 10 gün yöneticiye eskalasyon; I-10 buraya katlandı.
-  CI yeşil (923 test). **KARAR-98** EVET/HAYIR kartı açıldı. 7b incelemesi sürüyor.
-  (2026-09-26; backend #157 `cb6b83d` yorum 5849046560 · çatı #337 `10346e0` yorum 5849046681; 941 test)

### AJ-50 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1361 bayt):**

| AJ-50 | Ş0 | **Mevcut kayıtlarda kişilik kartının içinde ham DISC vektörü/puanı duruyor** (AJ-21 kalanı) — okuma yolu artık süzüyor, yeni kayıtlar temiz; eski kayıtların kartında fazlalık veritabanında kalıyor. | 🔵 (canlı veriye yazma) | Mevcut `discResultCard` kayıtlarında `discVector`/`rawScores` anahtarı yok; tarihli yedek alındı | PR-ACIK | ajan-ekledi 2026-09-27 · kaynak: AJ-21 (backend #194) · kanıt: `backend/src/controllers/onboardingController.ts` (2026-09-27 öncesi yazım karta `discVector` + `rawScores` gömüyordu) · okuma süzgeci `backend/src/services/discVisibility.ts:31-46` · yöntem önerisi: tarihli yedek + tek seferlik JSON güncellemesi (`discResultCard - 'discVector' - 'rawScores'`); DB erişimi gerekir (VPS'te yok) → hazırlık PR + EVET kartı · acil değil (sızıntı okuma yolunda kapalı) · 🔵 **PR-ACIK 2026-09-27:** backend #212 (7b ONAY 2. tur https://github.com/zahidsamiata/menti-mentor/pull/212#issuecomment-5861236295; CI yeşil; betik varsayılan kuru çalışma, `--uygula` her hedefte birebir host onayı; test `backend/tests/discCardCleanup.unit.test.ts` (16); mutasyon yerel — TEST_DATABASE_URL istisnası geri gelince 3 kırmızı). EVET/HAYIR: **KARAR-116**. MERGE YOK — PO EVET + tarihli yedek (DB erişimi) sonrası. · kilit: KARAR-116 bekliyor (EVET/HAYIR) |

**Çıkarılan katmanlar (AYNEN):**

-  (2026-09-27 öncesi yazım karta `discVector` + `rawScores` gömüyordu)
-  (7b ONAY 2. tur https://github.com/zahidsamiata/menti-mentor/pull/212#issuecomment-5861236295; CI yeşil; betik varsayılan kuru çalışma, `--uygula` her hedefte birebir host onayı; test `backend/tests/discCardCleanup.unit.test.ts` (16); mutasyon yerel — TEST_DATABASE_URL istisnası geri gelince 3 kırmızı)

### AJ-56 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 2311 bayt):**

| AJ-56 | Ş0 | **Ana kurumu başka olan üye, yönetici listesinde görünüyor ama üzerinde tekil işlem yapılamıyor (404)** (AJ-40 kalanı) + Pasif üye sayımı ve onaylayan adı araması hâlâ ana kurumdan. NEDEN: misafir üyeler yönetici listesinde görünüyor ama üzerlerinde işlem yapılamıyor (404); pasif üye sayısı yanlış kurumdan (AJ-40 kalanı). | 🟢 (+7b) | Misafir üyede yönetici tekil işlemleri çalışıyor (ya da bilinçli olarak kapalı ve ekranda belirtiliyor); Pasif üye sayımı üyelikten; test | BITTI (kısmen — KARAR-133) | ajan-ekledi 2026-09-27 · kaynak: AJ-40 7b (backend #205) · kanıt: `backend/src/controllers/adminController.ts:150,490,623,671,726,777,912,944` (`prisma.user.findFirst({id,tenantId})` + `backend/src/db.ts:18-65` ana kurum filtresi) · `backend/src/services/retentionMetrics.service.ts` (`passiveWhere`) · karar gerekebilir: başka kurumun yöneticisi kişinin HER kurumda geçerli alanlarına (onay durumu, rol) yazabilir mi — yazamıyorsa işlem düğmeleri misafir üyede gizlenir · BITTI (kısmen — KARAR-133) 2026-09-28: karar gerektirmeyen kısım backend #249 + çatı #442 (7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/249#issuecomment-5873599962). Kod: yeni `backend/src/services/tenantMember.ts` `findTenantMember` (aktif üyelik + üyelik satırındaki kurum) · `retentionMetrics.service.ts` `passiveWhere` üyelikten · `adminController.ts` onaylayan adı üyelikten (bu kurumla sınırlı) · `nudgeUser` + `getCoachingSuggestions` misafir üyede çalışıyor (ADMIN kontrolü üyelik rolüyle; hatırlatma sınırı kurum başına; misafirde `rematchCount` 0). Kişi-genel yazan işlemler (onay/ret/düzeltme/rematch/rol) misafirde 404 — KARAR-133 bekleniyor; negatif testle kilitli (kayıt değişmiyor). Test: `backend/tests/admin-uyelik-sayim-kalan.test.ts` (+10; negatif: bu kurumda üyeliği olmayan → 404, log yok). mutasyon: CI taslak #247 (ev kurumu) + #248 (kurum filtresi) 5+5 kırmızı. Arşiv `docs/arsiv/silinenler-2026-09-28.md` § AJ-56. Canlı ok:true · db:up · site 200. CANLIDA BAK: kurum yöneticisi misafir üyeye hatırlatma gönderebiliyor ve koçluk önerisini görüyor; pasif sayımı misafirleri de içeriyor; onay/rol işlemleri misafirde hâlâ kapalı (KARAR-133). |

**Çıkarılan katmanlar (AYNEN):**

- kanıt: `backend/src/controllers/adminController.ts:150,490,623,671,726,777,912,944` (`prisma.user.findFirst({id,tenantId})` + `backend/src/db.ts:18-65` ana kurum filtresi) · `backend/src/services/retentionMetrics.service.ts` (`passiveWhere`)
- karar gerekebilir: başka kurumun yöneticisi kişinin HER kurumda geçerli alanlarına (onay durumu, rol) yazabilir mi — yazamıyorsa işlem düğmeleri misafir üyede gizlenir
-  (7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/249#issuecomment-5873599962)
- Kod: yeni `backend/src/services/tenantMember.ts` `findTenantMember` (aktif üyelik + üyelik satırındaki kurum) · `retentionMetrics.service.ts` `passiveWhere` üyelikten · `adminController.ts` onaylayan adı üyelikten (bu kurumla sınırlı) · `nudgeUser` + `getCoachingSuggestions` misafir üyede çalışıyor (ADMIN kontrolü üyelik rolüyle; hatırlatma sınırı kurum başına; misafirde `rematchCount` 0). 
- Test: `backend/tests/admin-uyelik-sayim-kalan.test.ts` (+10; negatif: bu kurumda üyeliği olmayan → 404, log yok). mutasyon: CI taslak #247 (ev kurumu) + #248 (kurum filtresi) 5+5 kırmızı. Arşiv `docs/arsiv/silinenler-2026-09-28.md` § AJ-56. Canlı ok:true · db:up · site 200. CANLIDA BAK: kurum yöneticisi misafir üyeye hatırlatma gönderebiliyor ve koçluk önerisini görüyor; pasif sayımı misafirleri de içeriyor; onay/rol işlemleri misafirde hâlâ kapalı (KARAR-133).

### AJ-79 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1893 bayt):**

| AJ-79 | Ş0 | **"Varsayılana düşen profil/eşleştirme oranı" izleme metriği yok** (G2-06 / madde 111) — eşleştirme gevşetme seviyesi (`fallbackLevel`) yalnız istek başına dönüyor, hiçbir yerde toplanmıyor. | 🟢 (+7b) | Platform panelinde kurum başına "varsayılana düşen" oranı (toplu, kişi listesi yok) görünüyor; sayım testi (ör. 2/5 → %40) | BITTI (kısmen — AJ-111) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:86` · `docs/kararlar/00-KARAR-TAKIP.md:627` (GÖREV 4) · kanıt: `backend/src/services/matching.ts:266-272` · `backend/src/controllers/matchingController.ts:73` · BITTI (kısmen — (b) gevşetme oranı → AJ-111 🔵) 2026-09-28: (a) profil oranı backend #251 + çatı #444 (7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/251#issuecomment-5873940429). Kod: `backend/src/controllers/platformTenantController.ts` `getTenantAnalytics` → `defaultProfile` (yalnız `tenantMembership.count` + `discVector` `Prisma.AnyNull` — ham vektör okunmuyor) · `backend/src/services/mask.ts` `maskDefaultProfileRate` (aktif üye < 3 gizli) · ön yüz `frontend/src/app/platform/tenants/[id]/_components/DiscSummary.tsx` "Varsayılana düşen profil (DISC vektörü olmayan aktif üye): %40 (2/5)". Tanım alt sınır (bozuk/confidence'sız vektör sayılmaz — ham okuma gerektirir; PR'da yazılı). Test: `backend/tests/default-profile-rate.unit.test.ts` (5) · `k-anonymity-kpi-analytics.test.ts` (+3 DB; negatif: kurum yöneticisi 403, başka kurum/pasif sayılmaz) · `frontend/src/__tests__/platform-default-profile-rate.test.tsx` (4). mutasyon: CI taslak #250 + yerel kırmızı. Canlı ok:true · db:up · /platform/dashboard 200. CANLIDA BAK: platform yöneticisi kurum detayının Analizler sekmesinde "varsayılana düşen profil" oranını görüyor (küçük kurumda "gizli"). |

**Çıkarılan katmanlar (AYNEN):**

- kanıt: `backend/src/services/matching.ts:266-272` · `backend/src/controllers/matchingController.ts:73`
-  (7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/251#issuecomment-5873940429)
- Kod: `backend/src/controllers/platformTenantController.ts` `getTenantAnalytics` → `defaultProfile` (yalnız `tenantMembership.count` + `discVector` `Prisma.AnyNull` — ham vektör okunmuyor) · `backend/src/services/mask.ts` `maskDefaultProfileRate` (aktif üye < 3 gizli) · ön yüz `frontend/src/app/platform/tenants/[id]/_components/DiscSummary.tsx` "Varsayılana düşen profil (DISC vektörü olmayan aktif üye): %40 (2/5)". 
- Test: `backend/tests/default-profile-rate.unit.test.ts` (5) · `k-anonymity-kpi-analytics.test.ts` (+3 DB; negatif: kurum yöneticisi 403, başka kurum/pasif sayılmaz) · `frontend/src/__tests__/platform-default-profile-rate.test.tsx` (4). mutasyon: CI taslak #250 + yerel kırmızı. Canlı ok:true · db:up · /platform/dashboard 200. 

### AJ-80 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 1728 bayt):**

| AJ-80 | Ş0 | **İki DISC yolunda "temel soru" eşiği farklı** (G2-09) — uyarlanabilir test 5 temel cevapta derinleşmeyi açıyor, soru servisi tüm temel soruların bitmesini bekliyor. | 🟢 (+7b) | Farkın niyeti çıkarıldı (git log/belge): bilinçliyse iki yerde gerekçe yorumu + test, değilse tek sabite bağlı; eşik testi | BITTI (kısmen — KARAR-57) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:89` (GÖREV 4) · kanıt: `backend/src/services/adaptiveTestEngine.ts:22` · `backend/src/services/questionService.ts:131-139` · ⚠️ numara çakışması: F-08'deki "G2-09" başka kalem · BITTI (kısmen — KARAR-57) 2026-09-28: backend #243 + çatı #437 (7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/243#issuecomment-5872403710). Niyet araştırması: iki eşik `de6be04` toplu commit'ten, gerekçe yok (`git log -S`). Davranış DEĞİŞTİRİLMEDİ (tek sabite bağlamak `/disc-test` ile panodaki günün sorusu akışını ve bekleme odası bildirim anını değiştirir → KARAR-57 "esas test hangisi"). Kod: `backend/src/services/adaptiveTestEngine.ts` `MIN_CORE_RESPONSES` üstüne + `backend/src/services/questionService.ts` `coreThreshold` üstüne "belirsiz — KARAR-57'ye bağlı" gerekçe yorumu. Test: `backend/tests/disc-core-threshold.unit.test.ts` (7; iki yolun bugünkü eşiği kilitli; ek: uyarlanabilir yolda ilerleme göstergesi temel sorular sürerken "derinleşme" diyebiliyor — KARAR-57 ile birlikte). mutasyon: yerel 5→4 (2) · 5→6 (3) · coreThreshold→5 (3) kırmızı. Kalan: eşiklerin birleştirilmesi → KARAR-57. Canlı ok:true · db:up · site 200. CANLIDA BAK: kullanıcıya görünen değişiklik yok. |

**Çıkarılan katmanlar (AYNEN):**

- kanıt: `backend/src/services/adaptiveTestEngine.ts:22` · `backend/src/services/questionService.ts:131-139`
-  (7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/243#issuecomment-5872403710)
- Kod: `backend/src/services/adaptiveTestEngine.ts` `MIN_CORE_RESPONSES` üstüne + `backend/src/services/questionService.ts` `coreThreshold` üstüne "belirsiz — KARAR-57'ye bağlı" gerekçe yorumu. 
- mutasyon: yerel 5→4 (2) · 5→6 (3) · coreThreshold→5 (3) kırmızı. 
- Canlı ok:true · db:up · site 200. CANLIDA BAK: kullanıcıya görünen değişiklik yok.
-  (`git log -S`)

### AJ-95 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK.md` · **Önceki tam satır (AYNEN, 2522 bayt):**

| AJ-95 | Ş0 | **Prisma `Json` alanlarına yazım öncesi yapı doğrulaması yok** (madde 170) — uygulama tipi yazımda uygulanmıyor; 13 alanda yapısal boşluk. | 🟢 (+7b: psikometrik alanlar eşleştirmeye giriyor) | 13 alanın envanteri PR'da; her yazım noktasında Zod şeması (yazım yardımcıları tek dosyada); geçersiz yapı yazılamıyor, birim testleri | BITTI (kısmen — 95b/95c kaldı) | ajan-ekledi 2026-09-27 · kaynak: `docs/kararlar/00-KARAR-TAKIP.md:340` (GÖREV 4) · kanıt: `backend/prisma/schema.prisma` (13 `Json` alanı, grep) · ilk vaka `discVector` · ek (2026-09-28, AJ-94 7b): dördüncü doğrulamasız DISC okuması `backend/src/controllers/selfServeController.ts:512` (`admin.discVector as Record<string, number>`, kurum önizlemesi) — `parseDiscVector` (AJ-94) ile kapatılacak · BITTI (kısmen — 95b/95c + test yok 2 satır) 2026-09-28: **95a psikometrik alanlar** backend #246 + çatı #439 (7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/246#issuecomment-5873325052). Kod: yeni `backend/src/services/jsonFieldSchemas.ts` (`discVector` · `discResultCard` · `temperamentJson` yazım şemaları, strict; `toValidatedJson` — hata mesajında değer yok) · yazım noktaları `adaptiveTestEngine.ts:256` · `discVectorService.ts:143` · `onboardingController.ts:503-504` · `temperamentController.ts:60` (sunucu hesaplı: bozuk yapı 500 + günlük) · admin `userController.ts:278,284,341` (400 VALIDATION) · kurum önizlemesi `selfServeController.ts:508` `parseDiscVector` (AJ-94 dördüncü okuma). 7b: katı şemalar bugün yazılan her yapıyı kabul ediyor (kart 10 anahtar, vektör 5 anahtar); CI'da kayıt→DISC gönderimi 200. Test: 44 yeni (`json-field-schemas` 31 · `json-field-write-guard` 6 · `discvector-write-guard` 2 · `selfserve-preview-disc-parse` 5). mutasyon: yerel M1-M6 kırmızı. Arşiv `docs/arsiv/silinenler-2026-09-28-AJ-95a.md`. Kalan: 95b kurum ayarları Json (`tenantVocabulary`, `limits`, `blockedPairs`, `choices`) + `selfProfile`/CV alanları · 95c gerekçeli istisnalar (`SystemLog.meta`, `SjtOption.weights`) — envanter backend #246 açıklamasında · testsiz iki yazım satırı (`adaptiveTestEngine.ts:256`, `onboardingController.ts:503-504` negatif senaryo kurulamıyor) · AJ-108 (DISC `sum===0` NaN) · AJ-109 (`selectedEnneagram` sınırsız). Canlı ok:true · db:up · /onboarding /menti 200. CANLIDA BAK: (kullanıcıya görünen değişiklik yok) bozuk kişilik verisi artık veritabanına yazılamıyor. |

**Çıkarılan katmanlar (AYNEN):**

- kanıt: `backend/prisma/schema.prisma` (13 `Json` alanı, grep) · ilk vaka `discVector`
- ek (2026-09-28, AJ-94 7b): dördüncü doğrulamasız DISC okuması `backend/src/controllers/selfServeController.ts:512` (`admin.discVector as Record<string, number>`, kurum önizlemesi) — `parseDiscVector` (AJ-94) ile kapatılacak
-  (7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/246#issuecomment-5873325052)
- Kod: yeni `backend/src/services/jsonFieldSchemas.ts` (`discVector` · `discResultCard` · `temperamentJson` yazım şemaları, strict; `toValidatedJson` — hata mesajında değer yok) · yazım noktaları `adaptiveTestEngine.ts:256` · `discVectorService.ts:143` · `onboardingController.ts:503-504` · `temperamentController.ts:60` (sunucu hesaplı: bozuk yapı 500 + günlük) · admin `userController.ts:278,284,341` (400 VALIDATION) · kurum önizlemesi `selfServeController.ts:508` `parseDiscVector` (AJ-94 dördüncü okuma). 7b: katı şemalar bugün yazılan her yapıyı kabul ediyor (kart 10 anahtar, vektör 5 anahtar); CI'da kayıt→DISC gönderimi 200. Test: 44 yeni (`json-field-schemas` 31 · `json-field-write-guard` 6 · `discvector-write-guard` 2 · `selfserve-preview-disc-parse` 5). mutasyon: yerel M1-M6 kırmızı. Arşiv `docs/arsiv/silinenler-2026-09-28-AJ-95a.md`. 
- Canlı ok:true · db:up · /onboarding /menti 200. CANLIDA BAK: (kullanıcıya görünen değişiklik yok) bozuk kişilik verisi artık veritabanına yazılamıyor.

### K-16 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1605 bayt):**

| K-16 | Ş0 | **madde 30 — sertifika bankası seed.** ⛔ önce `certification_option_yedek_20260910`, yalnız `seed-certification`. NEDEN: sertifika ekranında gerçek soru metni yerine "Seçenek A" gibi yer tutucular görünüyor (madde 30 · G3-08). | 🔴 KARAR-3, KARAR-4 | Sertifika ekranında "Seçenek A" yerine gerçek metin | BEKLIYOR | = G3-08 (seed `seed-certification.ts` şu an **20 senaryo/80 şık** — eski sürüm; finalize **22/88 içeriği** `docs/raporlar/icerik/` 3 belgede yazılı ama seed'e taşınMADI → K-16 bugün seed atarsa 20/80 çıkar, içerik→seed taşıma adımı gerekir) · G3-09 (npm runner yok, `seed-certification.ts:320` tsx guard var). ⚠️ (PR #184'teki "sayı bayat" ifadesi düzeltildi: iki sayı da gerçek, farklı kaynak.) **ÖNKOŞUL: P-99 — içerik seed'e taşınmadan seed atılırsa 20/80 çıkar**  → ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):**  — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**). ⛔ Pratik sonuç: taşınacak şık sayısı 8 değil **88'in TAMAMI**; düşecek senaryo **15**. Efor **S değil L**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md:16-19,118-122`. · geçmiş: bkz. `arsiv/00-KUYRUK-gecmis.md` §K-16 |

**Çıkarılan katmanlar (AYNEN):**

-  — eski sürüm; finalize **22/88 içeriği** `docs/raporlar/icerik/` 3 belgede yazılı ama seed'e taşınMADI → K-16 bugün seed atarsa 20/80 çıkar, içerik→seed taşıma adımı gerekir
- ⚠️ (PR #184'teki "sayı bayat" ifadesi düzeltildi: iki sayı da gerçek, farklı kaynak.)
- → ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):**  — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**).

### AJ-10 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1473 bayt):**

| AJ-10 | Ş0 | **Bağlanmamış iki bileşen: `TenantSwitcher.tsx`, `ProfileStrengthCard.tsx`** (hiçbir yer import etmiyor) — önce niyet, sonra bağla ya da karantina. | 🔴 KARAR-15, KARAR-36 | (görünmez ya da bağlanırsa görünür) bileşenler ya ekrana bağlı ya karantinada | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `g-kart-dogrulama-2026-09-26.md:255` (G10-20) · kanıt: `frontend/src/components/organisms/TenantSwitcher.tsx` · `frontend/src/components/organisms/ProfileStrengthCard.tsx` (import 0, kendi dosyaları hariç). ⛔ SİLME PROTOKOLÜ: NİYET → İKAME → YENİ KARAR; karantina 🔵 (EVET kartı), gerçek silme 🔴. K-13/E-4 ailesiyle aynı şerit. · ⭐ **2026-09-27 niyet arkeolojisi (silme protokolü 1-3):** ikisi de `918727b` (2026-06-21, PLG onboarding) ile doğdu, hiç bağlanmadı. `TenantSwitcher` → **KARAR-15** (çok kuruma üye kullanıcı kurumlar arası geçiş; `01-KARARLAR.md` KARAR-15 'Kapsadığı kalemler: TenantSwitcher', CEVAP boş); ikame yok (başka kurum değiştirme akışı / `/my-tenants` yok). `ProfileStrengthCard` → beslendiği `profile-completeness.service.ts` veri hatası **KARAR-36**'ya (cevapsız) bağlı; kullanıcının kendi profil gücünü gösteren ikame yok (AN-28 soluklaştırma farklı mekanizma). ⇒ niyet belgeli, ikame yok, kararlar cevapsız: SİLİNMEZ, karantinaya ALINMAZ; kararlar gelince bağla ya da (C) karantina. Rapor: oturum scratchpad `aj10.md` (özet burada). |

**Çıkarılan katmanlar (AYNEN):**

-  (silme protokolü 1-3)
- ikisi de `918727b` (2026-06-21, PLG onboarding) ile doğdu, hiç bağlanmadı. 
-  Rapor: oturum scratchpad `aj10.md` (özet burada).

### V-15 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1302 bayt):**

| V-15 | Ş2 | **Oryantasyon kilidi canlı `bookMeeting` yolunda uygulanmıyor** — yalnız kullanılmayan `createMeeting`'de bağlı; FE de yalnız banner basıyor → kilitli menti randevu alabiliyor. | 🔴 KARAR-40 | Karara göre oryantasyonsuz menti randevu alamıyor (ya da uyarı olarak kalıyor) | BEKLIYOR | ⚠️ ÜRÜN KARARI GEREKLİ (§9.2 KARAR aday, merge YOK): "Görüşme Kilidi Aktif" uyarı mı gerçek engel mi. AJAN fix tek satır (`bookMeeting`'e `checkOrientationLock`). = W §9.2 / §9.3#29. Kanıt: `meetingController.ts:162` (yalnız createMeeting), `bookMeeting:413-531` 0 satır. Efor S ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ÜRÜN KARARI gerekli (oryantasyon kilidi) ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli. ⚠️ = güvenlik konseyi §2.A.5 (G-11), ek bulgu: kilidi BASAN yer `feedbackController.ts:92-96` — yani GV-02 ile zincirli: saldırgan GV-02 ile kurbana kilit bastırır, kurban V-15 ile kilidi atlar; ikisi de düzeltilmeli. `checkOrientationLock` tanım `meetingController.ts:140`, tek çağrı `:162` (yalnız `createMeeting`). · aile: Y-A · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

**Çıkarılan katmanlar (AYNEN):**

- ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ÜRÜN KARARI gerekli (oryantasyon kilidi) ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli.
- `checkOrientationLock` tanım `meetingController.ts:140`, tek çağrı `:162` (yalnız `createMeeting`).
- ⛔ **çelişki: KARAR-80/M19** (2026-09-25)
- KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ.

### P-15 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1401 bayt):**

| P-15 | Ş0 | **Mentör kapasite/doluluk dengesi yok.** "Aktif Mentilerim" bir tavanla kıyaslanmıyor; "hangi noktadan sonra yük" kavramı kodlanmamış. NEDEN: mentörün kaç menti alabileceğine dair bir tavan yok; aşırı yüklenme görünmüyor (MT13). | 🔴 KARAR-41 | Mentör doluluk/kapasite durumunu görüyor | BEKLIYOR | hassasiyet: kapsam belirsiz — "kapasite kavramı olsun mu" ürün kararı (kart gerekebilir). =MT13 (⬜). Kanıt: capacity/kapasite/maxMenti 0 sonuç (mentör-bazlı). ⚠️ kapsam belirsiz — "kapasite kavramı olsun mu" PO'ya sonraki tur (kart gerekebilir). Efor M ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ürün kararı gerekebilir ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli. ⚠️ = psikometri konseyi §5 D.5, ek bulgu: "KARTSIZ GİZLİ 🔴" durumu KAPANDI — kontenjan sorusu artık kart olarak açıldı (**KARAR-41**). Kanıt: kapasite kavramı kodda YOK (kapsam BE src/ · prisma/ · tests/, 7 terim iki dilli harf duyarsız → ilgili 0 eşleşme) ve scoreAndFilter'ın hiçbir continue koşulu (matching.ts:267,270,274,278,283) aktif menti sayısını sorgulamıyor. · aile: Y-? (belirsiz — kapsam/ürün kararı, KARAR-41 bekliyor) · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

**Çıkarılan katmanlar (AYNEN):**

- ⚠️ kapsam belirsiz — "kapasite kavramı olsun mu" PO'ya sonraki tur (kart gerekebilir).
- ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ürün kararı gerekebilir ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli.
- ek bulgu: "KARTSIZ GİZLİ 🔴" durumu KAPANDI — kontenjan sorusu artık kart olarak açıldı (**KARAR-41**).
- ⛔ **çelişki: KARAR-80/M19** (2026-09-25)
- KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ.

### P-99 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1546 bayt):**

| P-99 | Ş0 | **⭐ Sertifika içeriğini seed dosyasına taşı — K-16'nın ÖNKOŞULU.** Finalize 22 senaryo/88 şık (`docs/raporlar/icerik/sertifika-oturum1/2/3-...-2026-09-08.md`) seed'e taşınmamış; `seed-certification.ts` hâlâ 20/80 eski sürüm. NEDEN: finalize sertifika içeriği (22 senaryo/88 şık) seed dosyasında yok; seed atılırsa eski 20/80 içerik canlıya çıkar (K-16 ön koşulu). | 🔴 KARAR-46 | seed-certification.ts 22 senaryo/88 şık içeriyor (seed ÇALIŞTIRILMAZ) | BEKLIYOR | hassasiyet: SEED (seed-certification.ts, K-16 önkoşulu). TUR 3 B.2 bulgusu.  ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):**  — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**). ⛔ Pratik sonuç: taşınacak şık sayısı 8 değil **88'in TAMAMI**; düşecek senaryo **15**. Efor **S değil L**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md:16-19,118-122`. Seed dosyası değişir, seed çalıştırılmaz. **Efor L** · aile: Y-G · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. · geçmiş: bkz. `arsiv/00-KUYRUK-gecmis.md` §P-99 |

**Çıkarılan katmanlar (AYNEN):**

- ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):**  — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**).
- ⛔ **çelişki: KARAR-80/M19** (2026-09-25)
- KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ.

### YN-02 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1407 bayt):**

| YN-02 | Ş0 | ⭐ **Taşıma iki YENİ tutarsızlık doğurdu (bu turda oluştu).** (a) `belge-duzeni-rehberi.md`'de **KURAL 8 artık İKİ KEZ** var: `:99-109` (kendi gövdesi) + `:143-152` (CLAUDE.md'den taşınan kopya). (b) `rehber:6` hâlâ *"bu **6** kurala uyar"* diyor — dosyada artık **18 kural bloğu** var; `rehber:3` künyesi *"Son güncelleme: **2026-08-23**"*. | 🔴 KARAR-52 | Rehberi okuyan her kuralı bir kez ve tam görüyor; künye dosyanın gerçek hâlini söylüyor | BEKLIYOR | §A.7 AM-3 · §B.1 · §B.4-1. ⚠️ **Rapor B.4-1 "mükerrer çözülür" diyordu (`:337`, kazanç 933) — mükerrer ÇÖZÜLMEDİ, tek dosyanın içine TAŞINDI.** Rehberin kendi KURAL 1'i (tek gerçek kaynağı) kendi dosyasında ihlal oluyor. ⛔ Gövde SİLİNMEZ → biri `## GEÇMİŞ`e veya `~~[ESKİ]~~` damgasıyla. Sayım hatası raporda da vardı: `rehber:6` "6" · eski `CLAUDE.md:377` "8" · gerçek 18 (§B.1 `:276`). **= CS KN-14** (mükerrer, yeni satır AÇILMADI), ek bulgu (CS Ç-08): `belge-duzeni-rehberi:6` "6 kural" ↔ dosyada 16/18 kural + `:13` canonical `10-yol` (📸 donuk) gösteriyor (= YN-05) + künye `:3` bayat — hepsi bu satırın kapsamında. kaynak: CS raporu §3/§6. · ⛔ **çelişki: KARAR-80/M15** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M15: 'taşınan KURAL 8 mükerreri hangi gövde kalsın' KARAR-52'ye bağlandı; CEVAPSIZ. |

**Çıkarılan katmanlar (AYNEN):**

- ⚠️ **Rapor B.4-1 "mükerrer çözülür" diyordu (`:337`, kazanç 933) — mükerrer ÇÖZÜLMEDİ, tek dosyanın içine TAŞINDI.**
- Sayım hatası raporda da vardı: `rehber:6` "6" · eski `CLAUDE.md:377` "8" · gerçek 18 (§B.1 `:276`).
- ⛔ **çelişki: KARAR-80/M15** (2026-09-25)
- **= CS KN-14** (mükerrer, yeni satır AÇILMADI), 

### F-11 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1931 bayt):**

| F-11 | Ş0 | **Algoritma çekirdeği — KARAR-10 kilitli küme.** OCEAN/sektör motoru canlı eşleştirmeye bağlama (G2-07/08/G10-21) + yeni skor formülü %45/30/25 + 2 veto (V1/V2) + triggersOn derinleşme (madde 125/B6) + Big Five göç planı (B12). Motorlar YAZILI ama `matching.ts` onları çağırmıyor. NEDEN: yeni eşleştirme motoru yazılı ama canlı eşleştirme onu çağırmıyor; kullanıcı eski 0.6/0.4 formülüyle eşleşiyor. | 🔴 KARAR-61 | KARAR-10 cevabına göre motor bağlanır/ertelenir | BEKLIYOR | =Faz5 çoğu. Hepsi KARAR-10'a kilitli. Kanıt: `matching.ts:3-5` yeni motoru import etmez; `scoring.ts:89-90` hâlâ 0.6/0.4 ⚠️ `= psikometri konseyi §3 B.4, ek bulgu: seçeneklerin somut maliyeti KARAR-10 kartına eklendi; motorun SIFIR birim testi var ⇒ hangi seçenek seçilirse seçilsin onarımın doğruluğunu kanıtlayacak kanıt örtüsü bugün yok.` **+ ⛔ çapraz atıf (bkz. §4)** ⛔ **BİRLİKTE YAPILMALI — önce silme yolu düzeltilir, SONRA Match yazımı açılır. Ters sıra = KVKK ihlali.** *(karşı taraf: **GV-08**. `createMatchIfEligible` ölü OCEAN motorunun İÇİNDE (`scoring.service.ts:137`) ve arketipi bizzat o yazıyor — KARAR-10'a "C" cevabı gelirse `Match` yazımı bu satır üzerinden açılır.)* 🔓 **KİLİT AÇILDI (2026-09-21, KARAR-10 → C aşamalı).** Kapı **hassasiyet: ** — matching/skorlama (istisna 2). ⚠️ Bu satır **tek başına yapılmaz**: KARAR-10'un cevabı işi **üç aşamaya** böldü → `PS-A1` (düzelt+test) → `PS-A2` (backfill, ⛔ canlı veri) → `PS-A3` (bağlama, ⛔ feature flag). F-11 bu üç satırın **şemsiyesidir**. · aile: Y-C · ⛔ **çelişki: KARAR-80/M9** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M9: yalnız 'formül + veto' olarak daraltıldı; yeni formülün ne zaman açılacağı KARAR-61 (+KARAR-65, D-mentör/S-menti yasağı) CEVAPSIZ, kilit korunuyor. |

**Çıkarılan katmanlar (AYNEN):**

- Hepsi KARAR-10'a kilitli.
- 🔓 **KİLİT AÇILDI (2026-09-21, KARAR-10 → C aşamalı).** Kapı **hassasiyet: ** — matching/skorlama (istisna 2).
- ⛔ **çelişki: KARAR-80/M9** (2026-09-25)

### I-01 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 2223 bayt):**

| I-01 | Ş2 | **madde 31+151 — eşleşen taraflar birbirine nasıl yaklaşacağını hiçbir yerde okumuyor.** 8 hazır metin (4 mentöre + 4 mentiye) YAZILI ama ekranda gösterilmiyor. NEDEN: eşleşen taraflar birbirine nasıl yaklaşacağını okuyamıyor; 8 hazır metin ekrana bağlı değil (madde 31+151). | 🔴 KARAR-64 | Eşleşme kurulunca iki taraf da karşısındakine nasıl yaklaşacağını okuyor | BEKLIYOR | ⭐ **İÇERİK HAZIR — iş "sıfırdan yaz" değil "hazır metni bağla".** ⚠️ **İÇERİK KONSEYİ TEYİDİ (2026-09-21): metin ✅ 8/8 TAM** (yer tutucu/editör notu yok, redaksiyonsuz ekrana konabilir) — **AMA bağlanamaz durumda:** 8 adın hiçbirinin kod değerine (`M1..M4`/`m1..m4`) **eşlemesi yazılı değil** ve "Kâşif" adı üç ayrı anlamda kullanılıyor (canlı DISC kartı C harfi `onboardingController.ts:94,97-98` ↔ canonical mentör M2 `03-psikometri-ve-algoritma.md:14` ↔ yeni menti arketipi `arketip-ve-yaklasim-icerigi-2026-09-03.md:53`). **Ad↔kod eşlemesi bir ÜRÜN KARARIDIR** → I-15/KARAR-10 ile birlikte. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md` §0② / §2.1③. 8/8 metin: `docs/raporlar/icerik/arketip-ve-yaklasim-icerigi-2026-09-03.md:307` (başlık) · mentöre `:322-363` · mentiye `:364-405`. Kod kanıtı (⬜): 5 terim (`approachGuide`·`mentorApproach`·`approachText`·`yaklasim`·`yaklaşım`) × BE `src/`+`prisma/` + FE `src/` harf duyarsız → 11 satır, **0'ı alakalı**. madde 152'den BAĞIMSIZ. Migration yok. ⚠️ = içerik konseyi §2.1, ek bulgu: metin 8/8 TAM doğrulandı (yer tutucu yok, editör notu yok, redaksiyonsuz konabilir) — ama iş "S" değil: şema/seed gerekmiyor, buna karşılık metni gösterecek **eşleşme-detay ekranı FE'de hiç yok** (metin S, uçtan uca **L**) ve ön koşul **ad↔kod eşlemesi** (**KARAR-45**) — anahtarlar `M1..M4`/`m1..m4`, yeni 8 ad için 0 eşleme. · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M16: hazır metinler AN-50 'yönlendirme' diline çevrilerek bağlanacak; AN-50'nin kendisi KARAR-64'e kilitli (CEVAPSIZ) → zincirleme kilit. Ayrıca ad↔kod eşlemesi KARAR-45 (CEVAPSIZ) gerektiriyor. |

**Çıkarılan katmanlar (AYNEN):**

- metin 8/8 TAM doğrulandı (yer tutucu yok, editör notu yok, redaksiyonsuz konabilir) — ama 
- ⛔ **çelişki: KARAR-80/M16** (2026-09-25)

### U-12 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1313 bayt):**

| U-12 | Ş0 | **Davet token'ı e-postaya bağlı değil, tek kullanımlık değil, iptal edilemez, 30 gün geçerli.** NEDEN: davet bağlantısı sızarsa yabancı biri kalıcı üye olabiliyor (e-postaya bağlı değil, iptal edilemez, 30 gün). | 🔴 KARAR-82 | Karara göre davet token modeli güçlendirildi | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T1)** — davet token'ı e-postaya bağlı değil, iptal edilemez, 30 gün — link sızarsa yabancı kalıcı üye olur · ⚠️ ÜRÜN/GÜVENLİK KARARI GEREKLİ (KARAR aday, merge YOK) + auth. = X §10#16. Kanıt: `selfServeController.ts:562-572`. Efor M ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ÜRÜN/GÜVENLİK KARARI gerekli (davet token modeli) ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli. ⚠️ = güvenlik konseyi §2.C.3, ek bulgu: token modelinden BAĞIMSIZ bir sızıntı kanalı var — davet JWT'si URL path'inde taşınıyor (`invitationRoutes.ts:13`) ve `requestLogger.ts:22-23` `originalUrl`'i olduğu gibi stdout'a basıyor → log'a erişen herkes geçerli davet token'ı toplar. Bu kanal ayrı ve daha ucuz kapanır → **GV-14** olarak ayrı satır açıldı; U-12 kartı beklerken GV-14 ilerleyebilir. · aile: Y-E · 🔴 **kart açıldı (2026-09-25): KARAR-82** |

**Çıkarılan katmanlar (AYNEN):**

- ⚠️ ÜRÜN/GÜVENLİK KARARI GEREKLİ (KARAR aday, merge YOK) + auth.
- ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ÜRÜN/GÜVENLİK KARARI gerekli (davet token modeli) ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli.
- 🔴 **kart açıldı (2026-09-25): KARAR-82**

### U-17 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1620 bayt):**

| U-17 | Ş0 | **Temiz DB'de DISC havuzu boş kalıyor ve yalnız yıkıcı `prisma/seed.ts` ile dolabiliyor** (`createQuestion` DISC'i 403'lüyor). Yeni ortam kurulurken patlar. NEDEN: yeni ortam kurulurken DISC soru havuzu boş kalıyor; tek dolum yolu her şeyi silen `seed.ts` (çıkış blokeri T2). | 🔴 KARAR-85 | Temiz DB'de DISC havuzu güvenli yolla dolabiliyor | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T2)** — temiz DB'de DISC havuzu boş — yeni ortam kurulurken patlar; tek yol yıkıcı `seed.ts` · hassasiyet: SEED + yıkıcı `seed.ts` riski (PO kararı). = X §4.6 / §10#21. Kanıt: `questionService.ts:174`; `questionController.ts:124-129`; `seed.ts:295-319` koşulsuz `deleteMany`. Efor L ⚠️ = güvenlik konseyi §3.3, ek bulgu: aynı dosyada ikinci sorun — `prisma/seed.ts` prod'da çalışmayı ENGELLEYEN guard taşımıyor (*kapsam:* `prisma/seed.ts`, desen `NODE_ENV\|isProd` harf duyarsız → 0) ve `:293` sabit bir seed şifresi içeriyor (`:383` yorumu düz metin tekrarlıyor). U-17 ile BİRLİKTE yapılmalı: dosyaya dokunulurken guard da eklensin. ⚠️ = psikometri konseyi §4 C.1, ek bulgu: havuz boşken /disc-test DOĞRU davranıyor (DiscTestEmpty, K-02'de düzeltilmiş) ama /onboarding savunmasız (→ PS-11); ayrıca mantık hatası questionService.ts:173 ve questionController.ts:327'de 0 >= 0 ⇒ havuz TEK soruya düşerse ilk cevapta discAssessmentCompletedAt yazılır ve admin'e "test tamamlandı" e-postası gider. · aile: Y-G · **KARAR-80/M21 sıra notu:** seed koruması ayağı = KR-01 (#91 merge edildi). · 🔴 **kart açıldı (2026-09-25): KARAR-85** |

**Çıkarılan katmanlar (AYNEN):**

- **KARAR-80/M21 sıra notu:** seed koruması ayağı = KR-01 (#91 merge edildi).
- 🔴 **kart açıldı (2026-09-25): KARAR-85**

### Y-11 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1434 bayt):**

| Y-11 | Ş4 | **madde 60+61 — "yukarı çık" ve yüzen WhatsApp düğmesi yok.** NEDEN: "yukarı çık" ve yüzen iletişim düğmesi yok (madde 60+61). | 🔴 KARAR-88 | Kullanıcı sağ-altta iki düğmeyi görüp kullanıyor | BEKLIYOR | Kanıt: `frontend/src/`, 6 terim (`scrolltotop`·`scrollTo(0`·`scrollTo({ top: 0`·`yukarı çık`·`back-to-top`·`backToTop`), harf duyarsız → **0**. ⚠️ **RAPOR DÜZELTMESİ:** WhatsApp yalnız `ShareButtons.tsx:21` denmişti; **ikinci kullanım `(admin)/admin/invite/page.tsx:39,77,209`** (davet metni şablonu) — ikisi de yüzen iletişim düğmesi DEĞİL. Klavye erişimi + `aria-label` zorunlu. Numara PO teyidi ister. · ⚠️ **2026-09-25:** WhatsApp ayağı (numara + düğme olsun mu) → **🔴 KARAR-88**; "yukarı çık" ayağı teknik, bağımsız yapılabilir. · 🟡 **KISMEN (2026-09-25):** "yukarı çık" ayağı çatı #299 (`f769daf`, inceleme https://github.com/zahidsamiata/menti-mentor-v2/pull/299#issuecomment-5829486936) · `frontend/src/components/atoms/ScrollToTopButton.tsx` · kök `app/layout.tsx` · test `scroll-to-top-button.test.tsx` (8; negatif: eşik altında gizli). CANLIDA BAK: uzun sayfada 600px aşağı inince sağ-altta ↑ düğmesi; tıklayınca/Enter ile başa döner. **Kalan:** WhatsApp → KARAR-88. · ⚠️ **2026-09-25 kapı düzeltmesi:** "yukarı çık" ayağı BITTI (#299); kalan WhatsApp ayağı KARAR-88'e bağlı. |

**Çıkarılan katmanlar (AYNEN):**

- Kanıt: `frontend/src/`, 6 terim (`scrolltotop`·`scrollTo(0`·`scrollTo({ top: 0`·`yukarı çık`·`back-to-top`·`backToTop`), harf duyarsız → **0**.
- ⚠️ **2026-09-25:** WhatsApp ayağı (numara + düğme olsun mu) → **🔴 KARAR-88**; "yukarı çık" ayağı teknik, bağımsız yapılabilir.
- 🟡 **KISMEN (2026-09-25):** "yukarı çık" ayağı çatı #299 (`f769daf`, inceleme https://github.com/zahidsamiata/menti-mentor-v2/pull/299#issuecomment-5829486936) · `frontend/src/components/atoms/ScrollToTopButton.tsx` · kök `app/layout.tsx` · test `scroll-to-top-button.test.tsx` (8; negatif: eşik altında gizli). CANLIDA BAK: uzun sayfada 600px aşağı inince sağ-altta ↑ düğmesi; tıklayınca/Enter ile başa döner. **Kalan:** WhatsApp → KARAR-88.

### KR-08 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1268 bayt):**

| KR-08 | Ş0 | **Bir görüşmeye yalnız bir taraf değerlendirme yazabiliyor (rapor A5).** NEDEN: görüşmede ilk yazan tarafın değerlendirmesi kaydediliyor, diğerininki kayboluyor (kod inceleme A5). | 🔴 KARAR-89 | (karara göre) Mentör ve menti aynı görüşmeye ayrı ayrı değerlendirme yazabiliyor | BEKLIYOR | Dosyalar: `backend/prisma/schema.prisma` · `backend/src/controllers/feedbackController.ts`. Rapor: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` A5 [D]. ⛔ **MIGRATION** → tarihli yedek tablo + PO onayı (Y-G kuralları). İlişkili: AN-47 (geri bildirim modelleri envanteri). · aile: Y-KR · ⭐ **KARAR-77=A (2026-09-25).** Görünürlük testle kanıtlanacak (karşı taraf göremez · yönetici görür · yazan kendini görür). Önce AN-47 envanterine bak; çelişki varsa BASARISIZ + sebep. Mevcut kayıtların 'yazan kim' yorumu PR açıklamasında örnekle gösterilecek. · ⛔ **ÇELİŞKİ (2026-09-25, AN-47):** `MeetingCheckIn` KARAR-77=A'nın istediği taraf-başına kaydı zaten uyguluyor; `Feedback` bölünürse ikinci kutu doğar → **KARAR-89** cevaplanana kadar dokunulmaz. · ⭐ **KAPI HÜCRESİ SADELEŞTİ 2026-09-27 (GÖREV 0.2):** tek 🔴 = KARAR-89 (cevapsız, `01-KARARLAR.md` KARAR-89 CEVAP boş). |

**Çıkarılan katmanlar (AYNEN):**

- ⭐ **KAPI HÜCRESİ SADELEŞTİ 2026-09-27 (GÖREV 0.2):** tek 🔴 = KARAR-89 (cevapsız, `01-KARARLAR.md` KARAR-89 CEVAP boş).

### Y-14 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 2514 bayt):**

| Y-14 | Ş3 | **madde 36 — onaylı üyeyi kurumdan çıkarma ekranda YOK.** Backend zaten yapabiliyor; eksik olan düğme ve doğru e-posta metni. NEDEN: yönetici onaylı bir üyeyi kurumdan çıkaramıyor; düğme ve doğru bilgilendirme e-postası yok (madde 36). | 🔴 KARAR-93 | Yönetici onaylı bir üyeyi kurumdan çıkarabiliyor ve kişi doğru metinli bilgilendirme alıyor | BEKLIYOR | hassasiyet: yetki/rol akışı. ⚠️ **RAPOR DÜZELTMESİ — iş sanılandan KÜÇÜK.** Backend VAR: `adminController.ts:740-781` `rejectUser`, tek engel `:755` (REJECTED→409); **APPROVED engellenmiyor**. FE sarmalayıcı da VAR: `lib/api/admin.ts:83`. Eksik: **düğmenin onaylı-üye ekranlarına mount'u** (`mentor-havuzu`/`menti-havuzu`/`managers` bugün yalnız `rejectedAt` OKUYOR) **+ ayrı e-posta metni** — `emailService.ts:174` *"dilerseniz tekrar başvurabilirsiniz"* onaylı üye çıkarılırken **yanlış** (`adminController.ts:771-777` bunu da gönderiyor). 🔓 **KİLİT AÇILDI + KAPSAM GENİŞLEDİ (2026-09-22, KARAR-33 → B + detaylar).** Kapı **hassasiyet: ** — KVKK/silme + matching istisnası. Genişleyen kapsam (KARAR-33 CEVAP): (1) üyelik **dondurulur**, geçmiş kalır · (2) yönetici çıkarırken **SEBEP seçer**, mesaj tonu sebebe göre değişir · (3) yönetici çıkardıysa 30 gün içinde geri alınmazsa **karakter analizi (DISC/arketip/psikometri) SİLİNİR** (yeni zamanlı iş) · (4) kişi kendisi çıktıysa `/me/delete-account` akışıyla uyumlu, KVKK süresi · (5) mentörün **görüşme SAYISI düşmez** · (6) mentör geçmişinde eski üye adı **SOLUK** görünür — ⚠️ **AVUKAT onayına bağlı** (onaylanmazsa "Eski üye"). Bu ayak güvenlik konseyi ③'ü (`Match.mentorArchetype`) de çözer. Detay: `01-KARARLAR.md` KARAR-33 CEVAP. · aile: Y-B · **KARAR-80/M21 sıra notu:** GV-10 ve KR-20'den SONRA; arketip silme tek satırda (GV-08). · ⛔ **2026-09-25 doğrulama (düğme BAĞLANMADI):** `rejectUser` (`adminController.ts:760-770`) kurumdan değil **bütün platformdan** kapatıyor (User tek hesap, `schema.prisma:268` e-posta @unique; `TenantMembership` dokunulmuyor), "tekrar başvurabilirsiniz" e-postası (`emailService.ts:174`) + `reapply` ile kendi geri dönebiliyor (`authController.ts:441-453`) → KARAR-33 (B)'ye aykırı. İş yeniden tanım: backend'de kurum bazlı dondurma + sebep + mesaj + (30 gün sonra psikometri silme → canlı veri silme → **KARAR-93** evet/hayır). Sıra: GV-10 · KR-20 sonrası. |

**Çıkarılan katmanlar (AYNEN):**

- ⚠️ **RAPOR DÜZELTMESİ — iş sanılandan KÜÇÜK.** Backend VAR: `adminController.ts:740-781` `rejectUser`, tek engel `:755` (REJECTED→409); **APPROVED engellenmiyor**. FE sarmalayıcı da VAR: `lib/api/admin.ts:83`. Eksik: **düğmenin onaylı-üye ekranlarına mount'u** (`mentor-havuzu`/`menti-havuzu`/`managers` bugün yalnız `rejectedAt` OKUYOR) **+ ayrı e-posta metni** — `emailService.ts:174` *"dilerseniz tekrar başvurabilirsiniz"* onaylı üye çıkarılırken **yanlış** (`adminController.ts:771-777` bunu da gönderiyor).
- 🔓 **KİLİT AÇILDI + KAPSAM GENİŞLEDİ (2026-09-22, KARAR-33 → B + detaylar).** Kapı **hassasiyet: ** — KVKK/silme + matching istisnası.

### GV-17 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1163 bayt):**

| GV-17 | Ş3 | **Kişi kendi psikometrik profilini dışa aktaramıyor.** OCEAN/arketip/DISC türevlerinin tamamı ve kendi yazdığı mesajların içeriği dışa aktarımda yok. NEDEN: kullanıcı KVKK dışa aktarımında kendi psikometrik profilini ve mesajlarını alamıyor (güvenlik konseyi §2.B.3). | 🔴 KARAR-94 | Kullanıcı verilerini indirdiğinde artık kendi psikometrik profilini ve kendi yazdığı mesajları da görüyor | BEKLIYOR | 🟡 KVKK. **B.3 · güvenlik konseyi §2.B.3.** Kanıt: `exportUserData` `gdprService.ts:284-333` yalnız **6 kaynak**; `UserProfile` **hiç yok**; `:314` mesaj **yalnız `count`** (tip `:280-281` → FE `kvkk.ts:20-22`). **16 tablo + ≈22 `User` alanı** eksik. ⚠️ **K-12 (BITTI) FE işiydi** — özet backend'in verdiğinden fazlasını üretemez; eksiklik **backend kaynaklı**, K-12 bayat sayılmaz. ⚠️ V-10 (BITTI) bu ucun rate limitini kapattı · aile: Y-B · ⛔ **çelişki: KARAR-80/M18** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M18: GV-17 (dışa aktarım hakkı) için PO'ya ayrı karar kartı açıldı — bkz. KARAR-94 (çıkış blokeri olsun mu). CEVAPSIZ. |

**Çıkarılan katmanlar (AYNEN):**

- ⚠️ V-10 (BITTI) bu ucun rate limitini kapattı
- ⚠️ **K-12 (BITTI) FE işiydi** — özet backend'in verdiğinden fazlasını üretemez; eksiklik **backend kaynaklı**, K-12 bayat sayılmaz.
- ⛔ **çelişki: KARAR-80/M18** (2026-09-25)

### I-18 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1162 bayt):**

| I-18 | Ş0 | **madde 159 — kriz bildirimi akışı yok.** Kendine zarar ifadesinde kimse haberdar olmuyor; sertifikada senaryo olarak SINANIYOR ama canlı karşılığı yok. NEDEN: kendine zarar ifadesinde kimse haberdar olmuyor; kriz akışı yok (madde 159). | 🔴 KARAR-95 | Kriz ifadesinde kurum yöneticisine bildirim gidiyor | BEKLIYOR | ⛔ **HUKUKİ ÖN KOŞUL.** Kanıt (7 terim, İKİ DİLLİ, harf duyarsız, BE `src/`+`prisma/seed.ts`+FE `src/`): `kriz`·`crisis`·`selfharm`·`self-harm`·`kendine zarar`·`acil durum`·`emergency` → **2 satır, 0'ı akış** (`analyticsEngine.ts:299` iş unvanı listesi · `admin/certification/page.tsx:23` sınav konu etiketi); ayrıca `seed-certification.ts` `topic:'kriz-yonetimi'` = **sınav konusu**, bildirim akışı değil. ⚠️ **G1-01 ÇELİŞKİSİ:** 18 yaş altı menti kabul edilecekse gerçek yaş + veli onayı gerekir → "18+ beyanı yeterli" çöker. Avukat paketine TEK SORU. · ⛔ **çelişki: KARAR-80/M20** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M20: KARAR-69 (c) gereği kriz kanalı HUKUK değil GÜVENLİK sorusu; yeni kart KARAR-95 açıldı. CEVAPSIZ. |

**Çıkarılan katmanlar (AYNEN):**

- ⛔ **HUKUKİ ÖN KOŞUL.**
- KARAR-80 işlendi (2026-09-26, A kabul) — 
- ⛔ **çelişki: KARAR-80/M20** (2026-09-25)

### GV-12 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1784 bayt):**

| GV-12 | Ş4 | **Kurum kaydında "bu e-posta zaten kayıtlı" deniyor — üyelik bilgisi sızıyor.** Aynı kontrol normal kayıt akışında bilinçli olarak gizleniyor. NEDEN: kurum kaydı bir e-postanın sistemde kayıtlı olup olmadığını ele veriyor (üyelik bilgisi sızıyor; güvenlik konseyi §2.C.5-B). | 🟢 | Kayıtlı ve kayıtsız e-posta artık iki kayıt yolunda da **aynı** yanıtı alıyor | ATLANDI(karar) | 🟡 auth. **C.5-B · güvenlik konseyi §2.C.5-B, orkestratör teyitli.** Şiddet: 🔴 açık oracle. Kanıt: `selfServeController.ts:262-267` `409 EMAIL_MEVCUT` ↔ `authController.ts:177-184` **bilinçli enumeration-safe** (kodda açıklayıcı yorum). Tek fren IP 5/dk (`rateLimiter.ts:239`) ≈ 7.200 adres/gün/IP. ⭐ k-anonimlik (P-00) ve IDOR ile **aynı sınıf**: koruma bir yolda var, ikinci yol açık. ⚠️ Zamanlama yan-kanalı (`login` bcrypt atlama `:292`, `forgot-password` `:531-550`) **ayrı ve daha küçük iş**; sabit-zaman deseni `platformController.ts:23-32`'de zaten var · aile: Y-A · ⚠️ **denetimde tutmadı (K5-Y2, 2026-09-26):** 409 kalktı ama yanıt gövdesi (tenant/user null vs dolu) ve sonraki ekran kayıtlı/kayıtsız e-postayı ayırt ettiriyor (`selfServeController.ts:264-275`, kod yorumu `:269-270` "bilinen sınır"; FE `Step4Account.tsx:110-140`). Rapor `docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md`. · ⏭️ **ATLANDI(karar) 2026-09-26:** kalan sızıntı (farklı sonraki ekran) yalnız oturumsuz kayıtla tam kapanır — ürün kararı → **KARAR-102** (öneri C). 409 kaldırma kısmı canlıda. · DURUM: 409 ayağı BITTI (backend #131 + çatı #312, 2026-09-26); kalan sızıntı KARAR-102'de · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § GV-12 (2026-09-28) |

**Çıkarılan katmanlar (AYNEN):**

- ⏭️ **ATLANDI(karar) 2026-09-26:** kalan sızıntı (farklı sonraki ekran) yalnız oturumsuz kayıtla tam kapanır — ürün kararı → **KARAR-102** (öneri C). 409 kaldırma kısmı canlıda.

### AJ-14 (2026-09-28, AJ-68)

Kaynak: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md` · **Önceki tam satır (AYNEN, 1760 bayt):**

| AJ-14 | Ş2 | **Periyodik anket gönderimi her zaman reddediliyor** — sayfa `periodic*` alanlarını gönderiyor, sunucu şeması bunları tanımıyor ve "en az bir puan" kuralıyla 400 dönüyor. Sayfaya hiçbir yerden bağlantı da yok. | 🔴 KARAR-110 | Periyodik anket (doğrudan adresle açılınca) gönderiliyor ve kaydediliyor | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: E-3e alt ajan yan bulgusu (çatı #372) · kanıt: `backend/src/controllers/feedbackController.ts:11-30` (`FeedbackSchema` yalnız 5 puan + 2 metin; `.refine` en az bir puan ister; bilinmeyen alanlar atılır) ↔ `frontend/src/app/(dashboard)/periodic-survey/page.tsx:55-64` (yalnız `periodicNpsScore/TrustScore/ConfidenceScore/CareerGrowth` + `specificComments` gönderiyor) · model alanları var: `backend/prisma/schema.prisma:644-648` (migration gerekmez) · bağlantı: ön yüz ve backend'de `periodic-survey` referansı 0. ⚠️ Sayfayı kullanıcıya BAĞLAMAK (ne zaman/kime gösterilir) ayrı ürün sorusu — bu satır yalnız gönderimi düzeltir. · ⚠️ **GİZLİLİK NOTU (E-3e 7b yan bulgusu, 2026-09-27):** `getMeetingFeedback` (`feedbackController.ts:152-200`) `specificComments` + `periodic*` alanlarını MENTÖRÜN kendi alanı sayıp mentöre açıyor; periyodik anketi menti doldurursa mentinin notu mentöre görünür. Bugün sızıntı yok (gönderim zaten başarısız). Düzeltmede periyodik alanlar kimin yazdığına göre ayrılmalı (ya da ayrı sütun/kayıt → 🔵) — KARAR-80 M22 "en dar görünürlük". · ⭐ **KAPI 2026-09-27:** 🟢→🔴 KARAR-110 — düzgün düzeltme yeni kayıt yapısı (migration) + gösterim kararı istiyor; tek satırlık `Feedback`'te iki rolün cevabı çakışır ve gizlilik (M22) bozulur. |

**Çıkarılan katmanlar (AYNEN):**

- ⭐ **KAPI 2026-09-27:** 🟢→🔴 KARAR-110 — düzgün düzeltme yeni kayıt yapısı (migration) + gösterim kararı istiyor; tek satırlık `Feedback`'te iki rolün cevabı çakışır ve gizlilik (M22) bozulur.

