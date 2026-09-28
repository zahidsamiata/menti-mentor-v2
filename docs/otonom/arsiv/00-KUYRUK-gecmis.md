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
