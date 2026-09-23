> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-23 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-23 durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)

# PERSONA + PANEL BELGELERİNİN GELİŞİMİ — Konsey (Felsefe · Gerçeklik Testi · 8 Rollü Değerlendirme)

**📸 DONDURULMUŞ — 2026-09-23 fotoğrafı. Plan değildir; bulguları `00-KUYRUK.md`'ye işlendikten sonra güncellenmez.**

**Tarih:** 2026-09-23 · **Mod:** 🟩 SALT-OKUMA (tek yeni dosya) · **Dal:** `otonom/CR-persona-panel-gelisimi-20260923`
**Kapsam:** `docs/raporlar/persona/` (3 içerik + INDEX) + `docs/raporlar/panel/` (4 içerik + INDEX) — 7 tasarım belgesi, ~1.038 satır.
**Amaç (PO isteği):** *"Önce çalışmaların felsefesini ve mantığını anla, sonra nasıl gelişmesi gerekir, nasıl olmalı üzerine BİRDEN FAZLA ROL ve bakış açısı ile değerlendirelim."*
**⛔ Bu tur ÖNERİ üretir.** 📸 dondurulmuş belgeler değiştirilmedi; `persona/` ve `panel/` klasörlerine yazılmadı; numara (PP-??/KARAR-??) verilmedi.

---

## 0. ⭐ ÖNCE OKU — en kritik 3 bulgu

**① Belgeler kendi koydukları tek şartı 7 hafta sonra hâlâ yerine getirmedi — ve promptun "gerçek kullanıcı testi" dediği şey gerçek değil.**
Yedi belgenin YEDİSİ de başında aynı şartı koşmuş: *"Eğitimli taslak. Gerçek mentilerle/mentörlerle/yöneticilerle görüşme ile doğrulanmalı."* (`menti-persona:5`, `mentor-persona:5`, `yonetici-persona:4-5`). Bu doğrulama **bugüne kadar hiç yapılmadı.** Promptun "⭐ GERÇEK DAVRANIŞ VERİSİ" diye kutsadığı 2026-09-09 testi, kanıt taramasında **3-5 kişilik bir menti görüşmesi değil**, tek somut çıktısı mentör panelindeki 4 İngilizce DISC etiketi olan tek bir gözlem çıktı (`konsey-icerik-2026-09-21.md:333`, kaynak `mentor/page.tsx:27-30`); katılımcı sayısı/senaryosu/sonucu hiçbir raporda yok. Sonuç: bu turda çıkarılan **34 varsayımın hiçbiri gerçek kullanıcıyla sınanmadı**; 10'u yapısal olarak davranışsal (koda karşı test edilemez, yalnız gerçek kullanıcıyla). Persona belgelerinin "havada" kalması bir aksaklık değil, **hiç kapatılmamış bir açık şart.**

**② Çürüyen 12 varsayımın omurgası tek kök nedende birleşiyor: "sinyal kullanıcıya ulaşır" varsayımları boş.** Belgeler baştan sona "değer üretilir VE kullanıcı onu görür/ölçer" varsayıyor. Kod ise "değer üretilir ama son adımda görünmez ya da ölçülemez" gösteriyor: DISC eşleştirme skorunun bilimsel dayanağı yok (`konsey-psikometri:93-96`), bildirim gönderimi varsayılan **kapalı** (`TENANT_NOTIFICATIONS_ENABLED=false`), `Match` tablosu boş — "eşleştirme kalitesi = bizim farkımız" metriği yapısal olarak üretilemiyor (`createMatchIfEligible` 1 tanım / 0 çağrı), ve görüşme `SCHEDULED→COMPLETED` geçişinin UI'ı yok → hiçbir görüşme "tamamlandı" sayılmıyor. Yani belgelerin en güçlü vaatleri (özgüven aşısı, %uyum aha'sı, kanıtlanabilir etki, küçük başarı kutlaması) kod tarafında **son bir adım bağlanmadığı için** görünmez.

**③ En ağır iki boşluk, personaların hiç öngörmediği yerde.** (a) **Kriz/kendine zarar kanalı yok:** belgeler kullanıcıyı bilinçle "kırılgan, kaygılı genç" seçip elde tutmayı optimize ederken (`menti-persona:12,37`), o kırılgan bireyin kriz ifadesini yakalayacak/yönlendirecek/haber verecek hiçbir kanal yok — 22 terimlik iki dilli tarama şemada/rotalarda 0 (`konsey-icerik:267-271`, kuyruk I-18 doğrulandı). (b) **Operasyon görüşme sayısıyla ölçekleniyor:** persona "az emek" vaat ederken (`yonetici-persona:104`), sistem her görüşmede iki elle iş gerektiriyor (link paylaşımı + `COMPLETED` işaretleme, ikincisi Postman/DB ile) → yük kurum sayısıyla değil görüşme sayısıyla büyüyor, **ölçeklenmez** (`uctan-uca-kurum-yolculugu:122-123`).

---

## 1. Kapsam beyanı

| Boyut | Değer |
|---|---|
| Okunan tasarım belgesi | 7 içerik (3 persona + 4 panel) + 2 INDEX = **9 dosya, 1.038 satır — TAM okundu** (elle, kısaltmasız) |
| Kanıt külliyatı | 4 paralel alt-ajanla digest: strateji-gerçek-denetimi (85 madde) · 3 güncel denetim (panel/uçtan-uca/operasyonel, 2026-09-19) · 4 konsey (2026-09-21) · 02-ILERLEME + 09-DURUM |
| Rol değerlendirmesi | 8 paralel alt-ajan (R1-R8), her biri kendi gözünden, birbirini görmeden |
| Toplam alt-ajan | **12** (4 digest + 8 rol) — hepsi salt-okuma, yapılandırılmış özet döndürdü |
| TAM kapsam mı | **Evet** — 7 çekirdek belge tam; kanıt tarafında 2 panel envanteri "kod denetimi" bölümleri digest'lendi (bkz. §9 Taranamayanlar) |

**Yöntem notu:** Bir digest ajanının bana verdiğim "ölü eşleşme hesaplanamıyor" özetini **koda karşı düzeltmesi** (aşağıda §3 Y-A4 notu) bu turun kanıt disiplinini doğruladı — önceki raporların sayısı kopyalanmadı, teyit edildi.

---

## 2. FAZ 1 — BELGELERİN FELSEFESİ

### 2.1 Yedi belgenin ORTAK zihniyeti (tek paragraf)

Bu yedi belge tek bir inancın üstünde duruyor: **"Bu bir pazaryeridir; arz (mentör) kıt, talep (menti) bol, ve her iki taraf da kırılgan bir bağla gelir — o yüzden asıl iş kazanım değil, TUTUNDURMADIR (retention)."** Bu inançtan üç tasarım ilkesi türetiliyor: (1) **Duyguyu mekanikten önce koy** — menti "cesaret/değer", mentör "takdir/kontrol", yönetici "rahatlama/kanıt" hisleriyle tutulur; arayüz bu hisleri servis etmeli. (2) **Boşluk = ölüm** — boş havuz, boş panel, çıplak ret, belirsizlik; her biri kullanıcının sessizce kaybolduğu andır ve platform bu boşlukları doldurmakla yükümlü. (3) **Özet → derinlik (drill-down)** — hem yönetici hem platform panelinde "sade yüzey, istenince en dibe inme"; karmaşa yüzeyi kirletmez. Belgeler dürüsttür: yedisi de kendini "eğitimli taslak" ilan edip gerçek kullanıcıyla doğrulanmayı şart koşar. Ama bu dürüstlük aynı zamanda en zayıf noktalarıdır — tutundurmayı optimize ederken **koruma** (kriz, mahremiyet), **kanıt** (ölçülebilir kalite) ve **operasyon** (kim elle ne yapacak) katmanlarını neredeyse hiç sormazlar.

### 2.2 Belge belge — temel iddia · hangi sorunu çözüyor · ne öneriyor

| Belge | Temel iddia (belgenin kendi diliyle) | Öncelik sırası | Ne öneriyor (özet) |
|---|---|---|---|
| **menti-persona** | *"Menti kırılgan bir ruh hâliyle gelir ve ilk olumsuz deneyimde sessizce kaybolur"* (`:12`) | Tutundurma > kazanım; bekleme anı > her şey | 3 yuva (Keşif/Yolculuk/İlişkilerim), 4 sevdirme prensibi (özgüven aşısı, bekleme doldurma, reddi yumuşatma, küçük başarı kutlama) |
| **mentor-persona** | *"Mentörü elde tutmak, mentiyi elde tutmaktan önce gelir"* (`:13`) — en kıt kaynak | Kontrol + zahmetsizlik + takdir; ikinci giriş kritik | 3 yuva (Gelen ilgi/Aktif ilişkiler/Kendi etkim), 4 prensip (ilk 5 dk aha, DISC hediye, ritim dengesi, emeği görünür kıl) |
| **yonetici-persona** | *"Yönetici birine hesap verir; WhatsApp+Excel+Instagram'ın birden yapamadığını istiyor"* (`:32,39`) | Kanıt/görünürlük; az ve anlamlı metrik | 3 soru çerçevesi (S1 yaşıyor mu / S2 kaynıyor mu / S3 gösterebilir miyim), 14 metrik taslağı, drill-down |
| **stk-yonetici-strateji** | *"Dengeli yetki — yönetici izlesin + kritik birkaç aksiyon alabilsin"* (`:5`) | İzleme + müdahale; torpil önleme | Elle eşleştirme YOK (algoritma farkımız), hayalet mod (açık kapı yok), panel uyarır |
| **stk-yonetici-panel-envanteri** | *"İzleme geniş, aksiyon geniş — sıfırdan kurmak değil derinleştirmek gerek"* (`:163`) | (kod-kıyas belgesi) | En kritik eksik: `lastLoginAt` yok, drill-down yok, nudge yok (⚠️ bugün üçü de eklendi — §3) |
| **platform-admin-strateji** | *"Basit yüzey + derin arka oda — tam görünürlük ama loglu"* (`:25-35`) | Görünürlük + mahremiyet dengesi | Sade dashboard + kurum→kullanıcı→görüşme drill-down, KVKK audit log |
| **platform-admin-panel-envanteri** | *"Basit yüzey ✅ var; derin arka oda 🔴 backend hazır, frontend bağlanmamış"* (`:111-115`) | (kod-kıyas belgesi) | Drill-down frontend'e bağla (⚠️ bugün 2. seviye bağlandı — §3) |

### 2.3 Belgeler arası GÖRÜŞ AYRILIĞI (belgenin kendi içinde çelişki)

- **Menti stratejisi ↔ mentör stratejisi taban tabana zıt (belge bunu KABUL ediyor).** menti-persona:14 *"Menti ile mentör taban tabana zıt motivasyonlarla gelir."* Menti hızlı eşleşme + reddedilmeme ister; mentör seçicilik + az yük + kontrol ister. Bu bir **tasarım gerilimi**, kusur değil — ama iki belge de bu gerilimi *kendi* tarafından çözüyor, ortak hakem (panel bunu nasıl dengeleyecek) hiçbir belgede yok. → Bu, §4'teki **Rol Çatışması C5**'in kaynağı.
- **Yönetici metriği ↔ menti/mentör mahremiyeti.** yonetici-persona S2 "kimse kaynıyor mu → tıkla → kişiler" (`:80`) drill-down'ı kişiye indiriyor; menti-persona ise kullanıcıyı "kırılgan" tanımlıyor. İki belge birbirini okumuyor: yöneticinin görme hakkı ile mentinin mahremiyeti arasındaki sınır hiçbir belgede çizilmemiş. → **Rol Çatışması C1.**
- **"Silme" iç çelişkisi (aynı belgede).** platform-admin-strateji gövdesi "kurum dondurma/**silme**" vaat ediyor (`:66`) ama kendi 2026-08-05 kod-doğrulama notu hard-delete olmadığını, KVKK Md.7'nin karşılanmadığını itiraf ediyor (`:140`). Belge kendi içinde tutarsız.
- **Strateji ↔ envanter (aynı gün, kardeş belge) çelişkisi.** platform-admin-strateji §110 "eksikler güvenlik/gözlem tarafındaydı ve **kapatıldı**" derken, aynı gün yazılan envanter "lastLoginAt yok, büyüme trendi yok, otomatik anomali yok" diyor (`:120-121`). Kardeş belgeler aynı gün farklı hüküm veriyor.

---

## 3. FAZ 2 — VARSAYIM GERÇEKLİK TABLOSU

34 varsayım çıkarıldı. Her biri bugünkü kod/denetim kanıtına karşı test edildi. ⚠️ **Kritik ayrım:** persona varsayımlarının çoğu **davranışsaldır** ("menti kırılgandır") — bunlar koda karşı test EDİLEMEZ, yalnız gerçek kullanıcıyla. Bu tür varsayımlar ⬜ olarak işaretlendi; "kod öyle demiyor" onları çürütmez.

### Dağılım (SAYIYLA)
| Hüküm | Sayı | Anlam |
|---|---|---|
| ✅ DOĞRULANDI | **6** | Tasarım geçerli/uygulandı, kanıt destekliyor |
| ❌ ÇÜRÜDÜ | **12** | Bugünkü kanıt aksini gösteriyor (⭐ en değerli bulgu) |
| ⬜ HÂLÂ TEST EDİLMEDİ | **10** | Davranışsal; gerçek kullanıcı görüşmesi olmadan sınanamaz |
| ❓ KISMEN | **6** | Bir kısmı tutuyor, bir kısmı tutmuyor |
| **Toplam** | **34** | |

### 3.1 MENTİ persona (6 varsayım)
| # | Varsayım (kaynak) | Hüküm | Kanıt |
|---|---|---|---|
| M-A1 | Menti kırılgandır, ilk olumsuz deneyimde sessizce kaybolur (`menti:12,42`) | ⬜ | Davranışsal; gerçek menti görüşmesi yapılmadı |
| M-A2 | Menti bol, mentör kıt — talep>arz (`menti:11`) | ⬜ | Canlı kullanıcı yok; gerçek arz-talep bilinmiyor |
| M-A3 | Bekleme anı = ölüm noktası (`menti:62-74`) | ⬜ | Davranışsal; tasarım kısmen uygulandı (umut sinyali canlı PR#228 ama mentör<3'te gizli; öğrenme yolculuğu bağı yarım) |
| M-A4 | DISC "özgüven aşısı"dır, kaygılı genci cesaretlendirir (`menti:80-83`) | ❌ | Psikometrik dayanak çürük (`konsey-psikometri:93-96` "sezgisel, dayanağı yok"); kod: onboarding'de var, panelde/profilde `superPower`/`strengths` HİÇ render edilmiyor (BY-4) |
| M-A5 | Ret kişisel alınır → yumuşatılmalı, alternatif ver (`menti:88-90`) | ⬜ | Davranış test edilmedi; **uygulama ❌ HİÇ YOK** — mentör→menti ret + alternatif akışı yok, ret maili yok |
| M-A6 | İlk mesaj/talep göndermek geriyor (`menti:119`) | ⬜ | Davranışsal, test edilmedi |

### 3.2 MENTÖR persona (7 varsayım)
| # | Varsayım (kaynak) | Hüküm | Kanıt |
|---|---|---|---|
| MT-A1 | Mentör arkadaş ısrarıyla gelir, borç hisseder (`mentor:20-27`) | ⬜ | "En yaygın senaryo" iddiası; gerçek mentör görüşmesi yok |
| MT-A2 | Mentör en kıt kaynak, tutmak mentiden önce gelir (`mentor:11-13`) | ⬜ | Davranışsal/ekonomik; test edilmedi |
| MT-A3 | İlk 5 dk "aha" (uygun mentiler + %uyum) mentörü tutar (`mentor:68-71`) | ❌ | Kod: mentör **hiçbir yerde %uyum görmüyor** (BY-1; `Meeting.matchId` hiç yazılmıyor, çıplak "74"); 0 talepte kart kaybolur, ilk ekran dört "—" |
| MT-A4 | DISC hediye/gurur kaynağı, paylaşılabilir (`mentor:73-77`) | ❓ | Onboarding'de aha kartı + WhatsApp/LinkedIn paylaşımı var; panelde çıplak harf + filtrede 4 İngilizce etiket (`mentor/page.tsx:27-30`) |
| MT-A5 | Takdir (sertifika/rozet) mentörü tutar, para değil (`mentor:83-86`) | ⬜ | Davranışsal; kod: istatistik+takdir cümlesi (P-14) var ama takdir kalıcı değildi (BY-3, kısmen düzeltildi) |
| MT-A6 | İkinci giriş bir SEBEP (bildirim) ister (`mentor:107`) | ⬜ | Davranışsal; **sebep kanalı ❌** — bildirim gönderimi kapalı |
| MT-A7 | Ritim dengesi (seyrek+anlamlı bildirim) tutar (`mentor:79`) | ❌ | Bildirim gönderimi stub/kapalı; gerçek push/mail yok |

### 3.3 YÖNETİCİ persona + STK strateji (10 varsayım)
| # | Varsayım (kaynak) | Hüküm | Kanıt |
|---|---|---|---|
| Y-A1 | Yönetici birine hesap verir; 3 soru çerçevesi (S1/S2/S3) doğru (`yonetici:32,52-61`) | ✅ | R3 rolü çerçeveyi "tam kafamdaki soru" onayladı; tasarım geçerli (⬜ gerçek yönetici görüşmesiyle sınanmadı) |
| Y-A2 | Var-olma-sebebi = eşleştirme+görünürlük+kanıt (Excel yapamaz) (`yonetici:39-48`) | ❓ | Görünürlük/kanıt kısmen var; "eşleştirme kalitesi" ayağı çürük (Match boş — Y-A4) |
| Y-A3 | Az ve anlamlı metrik (kalabalık panel = kullanılmayan panel) (`yonetici:67`) | ✅ | Tasarım ilkesi hâlâ geçerli; F-19 proaktif alarm bu ilkeyle canlı |
| Y-A4 | Ortalama eşleşme uyum skoru = "bizim farkımız" (`yonetici:86`) | ❌ | `Match` tablosu boş (`createMatchIfEligible` 0 çağıran); `predictedScore` yazılıyor ama hiç okunmuyor; `/admin/eslesmeler` kalıcı "Henüz eşleşme yok" |
| Y-A5 | Terk sebebi kaydolma sebebinden değerli (`yonetici:111`) | ✅ | Ürün bilgeliği; hâlâ geçerli ve güçlü |
| Y-A6 | Drill-down (özet → tıkla → kişi) (`yonetici:94`, `stk-strateji:22`) | ✅ | CANLI — `ProgramHealthSection.tsx:70-166` tıklanabilir sayı → kişi |
| P-A1 | Elle eşleştirme YOK = torpil önleme + algoritma farkımız (`stk-strateji:64-68`) | ❓ | Karar uygulandı (elle pair endpoint yok) AMA algoritma sonucu `Match`'e yazılmadığı için "farkımız" kalıcılaşmıyor |
| P-A2 | Açık kapı yok, hep yönetici kontrolü (hayalet mod) (`stk-strateji:74-92`) | ✅ | Uygulandı — PENDING üye peer havuzunda görünmüyor (PR #31, `be295e2`) |
| P-A3 | Panel uyarır, yönetici aramaz (`stk-strateji:45`) | ❌ | Bildirim kanalı varsayılan kapalı; nudge maili SMTP boşsa sessiz düşer → uyarı kullanıcıya gitmiyor |
| P-A4 | Dengeli yetki: izle + kritik aksiyon (`stk-strateji:5`) | ✅ | Büyük ölçüde uygulandı (onay/rematch/nudge/settings) |

⚠️ **Envanter belgesi düzeltmesi (belge↔kod):** `stk-yonetici-panel-envanteri:124-146` "lastLoginAt yok / drill-down yok / nudge yok" diyor — **bugün üçü de eklendi** (`retentionMetrics.service.ts:72` lastLoginAt kullanıyor; drill-down + nudge canlı). Envanter belgesi bu üç noktada bayat. Ayrıca digest ajanı, bana verdiğim "ölü eşleşme Match boşluğundan hesaplanamıyor" özetini **düzeltti**: ölü eşleşme `VisibilityOptIn`+gerçek `Meeting` farkından hesaplanıyor (`retentionMetrics.service.ts:99-127`) → S2 sağlık metrikleri **çalışıyor**, Match boşluğundan etkilenmiyor. (Y-A4'ün çürümesi yalnız `Match`'e bağlı metrikleri vurur: ortalama uyum skoru, `/admin/eslesmeler`, successRate.)

### 3.4 PLATFORM admin (5 varsayım)
| # | Varsayım (kaynak) | Hüküm | Kanıt |
|---|---|---|---|
| PL-A1 | "Basit yüzey + derin arka oda" felsefesi (`platform-strateji:25-35`) | ❓ | Felsefe geçerli; kurum drill-down 2. seviye CANLI, 3. seviye (kurum→tek kullanıcı→en dibe) yarım |
| PL-A2 | Tam görünürlük AMA loglu (KVKK mahremiyet) (`platform-strateji:19,75`) | ❓ | KVKK audit log çalışıyor ✅; AMA check-in notları sahiplik kontrolsüz okunuyor (G-3 IDOR) — "loglu mahremiyet" bir yolda delinmiş |
| PL-A3 | lastLoginAt ile sistem-geneli aktiflik (`platform-strateji:44`) | ❌ | Platform-geneli lastLoginAt/trend HİÇ YOK — sistem "yaşıyor mu" platform katmanında ölçülemiyor |
| PL-A4 | Kurum dondurma/silme (yaşam döngüsü) (`platform-strateji:66`) | ❌ | Hard-delete yok, yalnız freeze → KVKK Md.7 karşılanmıyor (belge kendi de itiraf ediyor `:140`) |
| PL-A5 | Otomatik kötüye kullanım tespiti (`platform-strateji:50,78`) | ❓ | v1 basit kural var; otomatik anomali zayıf/derinleşmemiş |

### 3.5 ÖRTÜK varsayımlar (belgenin açıkça söylemediği ama üzerine kurulu) (6 varsayım)
| # | Örtük varsayım | Hüküm | Kanıt |
|---|---|---|---|
| U-A1 | DISC/eşleştirme **geçerli bir sinyaldir** (üç persona da bunun üstüne kurulu) | ❌ | `konsey-psikometri:93-96,528` — ağırlıklar sezgisel, psikometrik dayanağı yok; eşleştirmenin anlamını test eden tek test yok; OCEAN motoru 8 arketipin 6'sını erişilemez kılıyor |
| U-A2 | Bildirimler kullanıcıya **ULAŞIR** (tüm sevdirme/ritim stratejisi bunun üstünde) | ❌ | `TENANT_NOTIFICATIONS_ENABLED=false`; gönderim log-only; SMTP boşsa sessiz düşer |
| U-A3 | Sistem otomatik işler, insan müdahalesi minimaldir ("az emek", `yonetici:104`) | ❌ | Mutlu yolda 5, en kötü yolda 9 elle iş; her görüşmede 2 elle iş → görüşme sayısıyla ölçekleniyor (`uctan-uca:106-123`) |
| U-A4 | Kullanıcı kriz yaşamaz / kriz kapsam dışı | ❌ | Kriz akışı HİÇ YOK (22 terim taraması 0, `konsey-icerik:267-271`); kırılgan kitle hedefleniyor ama koruma yok |
| U-A5 | Görüşme gerçekleşir VE tamamlanır (retention/kutlama/metrik bunun üstünde) | ❌ | Toplantı linki hiçbir ekranda (K8); `SCHEDULED→COMPLETED` UI yok (K9) → görüşme "tamamlandı" sayılmıyor |
| U-A6 | Belge gerçek kullanıcıyla doğrulanacak (yedi belgenin kendi şartı) | ⬜ | 7 hafta sonra HİÇ yapılmadı — en önemli meta-bulgu (§0①) |

⭐ **Promptun özel sorusuna cevap:** *Belgeler "gerçek mentilerle doğrulanmalı" demişti — 2026-09-09 testi bunu ne kadar karşıladı?* **Neredeyse hiç.** O "test" gerçek bir menti/mentör görüşmesi değil; tek doğrulanan somut çıktı mentör panelindeki İngilizce DISC etiketi. Davranışsal varsayımların tamamı (⬜ işaretli 10 varsayım) **hâlâ havada.**

---

## 4. ⭐ FAZ 3 — SEKİZ ROLÜN DEĞERLENDİRMESİ + ROLLER ARASI ÇATIŞMA

Her rol kendi gözünden, birbirini görmeden değerlendirdi. Çelişen bakışlar bu turun **değeridir**, kusuru değil.

### 4.1 Rol bazında tablo (a: karşılıyor mu · b: eksik · c: yanlış)

| Rol | (a) Karşılıyor mu? | (b) EN kritik EKSİK | (c) EN kritik YANLIŞ | Rolün "en büyük tek riski" |
|---|---|---|---|---|
| **R1 · MENTİ** | Teşhis şaşırtıcı derecede doğru (korku, sessiz kaybolma, bekleme anı) | 🔴 Kriz/kendine zarar anı belgede HİÇ yok; mentör adı görünmüyor (BY-2); "neredeyim" kalıcı değil | "Reddi yumuşat" (P3) prensip olarak yazılı ama kodda karşılığı SIFIR; özgüven aşısı panelde kayboluyor | İlk olumsuz anımda beni tutacak (ret yumuşatma + kriz yakalama) hiçbir şey yok, haber vermeden giderim |
| **R2 · MENTÖR** | Beni anlamış (borç/rica, motivasyon tablosu isabetli) | Kabul/ret mekaniği yok (K6); görüşmeyi bitirme (K8/K9) atlanmış; müsaitlik boşken sessiz 409 (K7) | P1 "%92 uyum göster" ama %uyum HİÇ görünmüyor (BY-1); P4 takdir bir gün sonra siliniyor (BY-3) | İkinci girişimde beni geri çağıracak sebep (uyum, takdir, bildirim) kodda görünmüyor; borçla gelen ben ikinci kez girmem |
| **R3 · YÖNETİCİ** | S1/S2/S3 çerçevesi tam kafamdaki soru | 🔴 Rapor EXPORT (PDF/Excel) HİÇ yok — S3'ün kalbi; S1 ivme/trend yok | "Eşleşme kalitesi = farkımız" bugün üretilemez (`Match` boş); successRate sessiz "—" | Programı yaşatabilirim ama işe yaradığını KANITLAYAMAM — beni işten eden şey bu |
| **R4 · PLATFORM SAHİBİ (PO)** | Felsefe geçerli ama belgeler "karar aracı" değil "keşif fotoğrafı" | Elle müdahale yükü + ölçeklenememe belgede hiç yok; "sistem yaşıyor mu" ölçümü yok | Strateji "eksikler kapatıldı" der, envanter aynı gün "yok" der; "silme var" der, kod "freeze" verir | Sattığım "otomatik akıllı platform" ile teslim ettiğim "yarı-manuel araç" arasındaki uçurum ilk ciddi kurumda güveni kırar |
| **R5 · TASARIMCI/UX** | Duygu katmanı güçlü, akış/mikro-etkileşim katmanı zayıf | Sessiz kopmalar (6 adet) hiç ele alınmamış; hata/boş/yükleniyor durumları ve mikro-kopya yok | "DISC hediye/kalıcı" ↔ panelde çıplak harf; "%92 uyum" ↔ mentör hiç görmüyor; "N kişi bekliyor" ↔ yok | Kullanıcı tüm zinciri geçip görüşmeye katılma anına gelince toplantı linki hiçbir ekranda yok (K8) — tam başarı anında sessizce düşer |
| **R6 · ÖLÇÜM/VERİ** | 14 metrikten ~8'i gerçekten üretiliyor (lastLoginAt eklendi) | ~4-5 metrik verisiz: aylık görüşme+ivme, haftalık trend, export, platform aktiflik | ~5 metrik yanıltıcı/boş: ortalama uyum skoru (boş tablo), eslesmeler paneli, successRate, meeting-COMPLETED, DISC ağırlık geçerliliği | "Ortalama eşleşme uyum skoru — bizim farkımız": besleyen `Match` tablosuna yazan kod hiç çağrılmıyor (1 tanım / 0 çağrı) → yapısal olarak boş |
| **R7 · HUKUK/ETİK** | Belgeler tasarım açısından yetkin, etik/hukuki sorumluluk açısından yetersiz (konuyu hiç açmıyor) | 🔴 Kriz kanalı yok; kırılgan kullanıcı "zarar vermeme" tasarımı yok; rıza kalitesi + reşit-olmayan koruması yok | P2 "yakında eşleşeceksin" kanıtlanamaz umut (mentör kıtken); P1 kesin kimlik kartı aracın niteliğini aşan psikolojik iddia | Kırılgan kullanıcıyı ürüne bağlamayı optimize ederken kriz ifadesini fark edecek/haber verecek hiçbir kanal yok |
| **R8 · OPERASYON** | Üç belge de operasyonu neredeyse hiç hesaba katmıyor (mutlu-yol tasarımı) | Elle iş sayımı diye kavram yok; bildirim/haber-verme kapalı; izleme/yedek/destek altyapısı yok | "Panel birkaç tıkla halleder" ↔ davet WhatsApp'tan, COMPLETED Postman/DB'den; "panel uyarır" ↔ uyarı kanalı kapalı | Elle iş görüşme sayısıyla büyüyor + sessizce birikiyor (bildirim/izleme yok) → ilk yüz görüşmeden önce duvara toslar |

### 4.2 ⭐ ROLLER ARASI ÇATIŞMA (KARAR kartı adayları)

| # | Çatışma | Hangi rol ↔ hangi rol | Öz |
|---|---|---|---|
| **C1** | Yönetici drill-down'ı kişinin serbest-metin endişe notuna inmeli mi? | R3 (kim kaynıyor → kişi) ↔ R7+R1 (menti mahremiyeti, check-in notları) | R3 aksiyon için kişiye inmek istiyor; check-in endişe notları sahiplik kontrolsüz (G-3), kırılgan bireyin özel notu |
| **C2** | "Akıllı eşleştirme" satış vaadi ↔ ölçülemez/dayanaksız gerçek | R4 (sat, "farkımız") ↔ R6 (Match boş, ölçülemez) + R7 (dayanaksız skoru kesin kimlik olarak sunma) | PO'nun tek satış argümanı ölçüm ve etik tarafından ikisinden de destek görmüyor |
| **C3** | "Sevdirme" dili ne kadar kesin/iddialı olmalı? | R1+R2 (özgüven aşısı, konfeti, "yakında eşleşeceksin") ↔ R7 (manipülasyon riski, kanıtlanamaz umut) | Tutundurma etkili olsun diye kesin dil ister; etik kanıtlanamaz vaadi ve kırılgan bireyde yanlış özdeğeri reddeder |
| **C4** | Büyüme hedefi ↔ operasyon duvarı | R4+R3 (çok kurum/görüşme) ↔ R8 (görüşme başına 2 elle iş) | Büyüdükçe elle iş görüşme sayısıyla artıyor; büyüme kendi operasyon tavanını üretiyor |
| **C5** | Mentör seçiciliği ↔ menti bekleme/ret acısı | R2 (kontrol, az yük, seç) ↔ R1 (hızlı eşleşme, reddedilmeme) | Belgelerin "taban tabana zıt" dediği gerilim; ortak hakem (panel dengesi) hiçbir belgede yok |
| **C6** | Platform "tam görünürlük" ↔ KVKK veri minimizasyonu | R4 (derin arka oda, en dibe in) ↔ R7 (need-to-know, silme hakkı) | Görünürlük felsefesi ile mahremiyet yükümlülüğü arasındaki sınır çizilmemiş |

⚠️ **Tercih (kusur değil) olarak işaretlenenler:** R3'ün "S3>S2>S1 sıralaması" (belge S1'i öne alıyor) bir öncelik tercihidir; yuva isimleri/sayısı, konfeti kullanımı, arketip adları ("Öncü/Analist") tercih meselesidir — kusur sayılmadı.

---

## 5. ⭐ FAZ 4 — NASIL GELİŞMELİ

### 5.1 Belge mimarisi — A/B/C karşılaştırması (karar PO'nun)

| Yol | Kullanıcı ne kazanır | Ne kaybeder | Atıf kırılma riski | Bakım yükü | "Aktif iş kaynağı tektir" kuralına uyum |
|---|---|---|---|---|---|
| **A) Dondurmayı kaldır, YAŞAYAN yap** | Her zaman güncel tasarım zemini | Tur bütçesinin büyük kısmı belge muhasebesine gider (projede yaşanmış sorun); "eğitimli taslak" niteliği kaybolur | Düşük (yer değişmez) | 🔴 Yüksek — her canlı değişiklikte 7 belge güncellenmeli | ⚠️ Zayıf — sürekli-güncellenen ikinci bir gerçek kaynağı doğar |
| **B) HALEF yaşayan belge (persona-v2), eskiyi "yerini X aldı" ile yönlendir** | Gerçek kullanıcı verisiyle beslenmiş yeni zemin; tarihsel iz korunur | Halefi üretecek girdi (gerçek kullanıcı testi) YOKKEN üretilirse yine tahmin olur | Orta (emeklilik deseni projede uygulanmış — yönetilebilir) | 🟡 Orta — yalnız tetikleyici gelince | ✅ Uyumlu — persona iş listesi değil tasarım zemini; işler yine KUYRUK'a gider |
| **C) Dondurulmuş kalsın; güncel bilgi tek yerde (KUYRUK/09-DURUM), personalar tarihsel zemin** | Minimum bakım; tek gerçek kaynağı korunur | Personaların "varsayım tuttu mu" bilgisi hiçbir yere işlenmez → **tekrar bayatlar** (bugünkü sorun aynen sürer) | Yok | 🟢 En düşük | ✅ Tam uyumlu |

**⭐ Öneri: TETİKLEYİCİLİ B (o zamana kadar C).**
- **Bugünden ilk gerçek kullanıcı testine kadar:** C uygula — belgeler dondurulmuş kalır, tarihsel zemin olarak durur; TEK istisna: bu raporun her personanın gerçeklik durumuna atıf verdiği bilinsin (bu dosya = 2026-09-23 fotoğrafı).
- **İlk gerçek kullanıcı testi (3-5 menti/mentör/yönetici görüşmesi) tamamlanınca:** B uygula — görüşme notlarından `persona-v2` halefi üret, eskisini "yerini persona-v2 aldı" ile yönlendir (emeklilik deseni).
- **Tek cümle gerekçe:** Belgelerin kendi koştuğu şart (gerçek kullanıcı) yerine gelmeden A/B'yi başlatmak yeni tahmin üretir; C ise öğrenmeyi kalıcı olarak kaybeder — bu yüzden doğru hamle, güncellemeyi **tek gerçek tetikleyiciye (ilk kullanıcı testi) bağlamaktır.**
- **"Yeni planlama belgesi açılmaz" kuralıyla çelişmez:** persona-v2 bir iş kuyruğu değil tasarım zeminidir; ondan çıkan işler `00-KUYRUK.md`'ye yazılır, planlama kaynağı tek kalır.

### 5.2 İçerik — halef/güncel belge NE içermeli?

**Korunur (§8'deki hâlâ-güçlü maddeler):** menti≠mentör zıt motivasyon ayrımı · yönetici 3 soru çerçevesi · "terk sebebi kaydolma sebebinden değerli" · "neden Excel değil" testi · drill-down özet→kişi ilkesi · dengeli yetki · "basit yüzey + derin arka oda".

**Çıkarılır / düzeltilir:** envanter belgelerinin bayat "yok" iddiaları (lastLoginAt/nudge/drill-down artık var) · "eşleşme kalitesi = farkımız" iddiası (ölçülemezken kutsanamaz) · "AdminAuditLog tablosu" yanlış adı · "silme var" iç çelişkisi.

**YENİ bölüm eklenir (bugün olmayan):**
1. ⭐ **Her persona için "KANIT" bölümü** — bu varsayımın dayanağı ne: **gerçek test mi · denetim mi · tahmin mi**. Bugün bu ayrım hiç yok; §3'teki ⬜/❌/✅/❓ etiketi bu bölümün çekirdeği olabilir.
2. **Kriz/kırılgan kullanıcı koruması** — personanın en kırılgan anı (R7 boşluğu).
3. **Operasyon/insan-müdahalesi bütçesi** — her akış için "kim elle ne yapacak, kaç görüşmede duvara toslar" (R8 boşluğu).
4. **Panel belgeleri için envanter↔strateji ayrımı hâlâ doğru** ama envanter belgeleri "denetim" niteliğinde — kod ilerledikçe en hızlı bayatlayan bunlar; halefte envanterin yerini **canlı KPI + bu tür fotoğraf raporları** almalı.

### 5.3 ⭐ GÜNCELLEME RİTMİ (en önemlisi) — tetikleyici

Belge tetikleyici olmadan yine bayatlar (bugünkü sorun tam bu). Önerilen tetikleyiciler:
- **T1 · İlk gerçek kullanıcı testi tamamlanınca** → persona-v2 halefi üret (B yolu başlar). *Bu, belgelerin kendi şartıdır.*
- **T2 · İlk kurum canlıya girip ilk ~10 görüşme gerçekleşince** → gerçek davranış verisi; varsayımları (özellikle ⬜'ler) gözden geçir.
- **T3 · Terk/aktiflik ölçülebilir olunca** (platform-geneli lastLoginAt + funnel) → M-A3 (bekleme ölüm noktası) ve retention varsayımlarını sınamak.
- **T4 · Her yeni gerçek kullanıcı testinden sonra** → KANIT bölümlerini güncelle.

### 5.4 Sahiplik
- **Gerçek kullanıcı görüşmesi (T1/T2):** kodla çözülemez → **PO** yürütür/yaptırır; `docs/otonom/03-PO-ELLE-ISLER.md`'ye madde. Ajan görüşme notlarından halef belgeyi üretir.
- **KANIT bölümü + tetikleyici gözetimi:** bir "fotoğraf" turu (bu raporun kardeşi) — ajan üretir, PO okur.
- **Bayat "yok" iddialarının düzeltilmesi:** normal BYPASS turunda, envanter belgeleri emekli edilirken.

---

## 6. HAZIR KUYRUK SATIRLARI (PP-??) — öneri, numara verilmedi

> Kapı kuralı: seed/migration · auth/KVKK/matching · geri-dönülmez → 🟡; ürün kararı bekleyen → 🔴; küçük/geri-alınır → 🟢.
> ⚠️ Güvenlik/KVKK bulgularının çoğu **zaten `konsey-guvenlik-kvkk-2026-09-21` ve `konsey-icerik-2026-09-21`'de** kayıtlı — çift yazılmamalı, atıf bırakıldı. Aşağısı persona/panel gelişiminden **türeyen** kalemlerdir.

| Öneri | Kanıt | Önerilen kapı |
|---|---|---|
| PP · Menti randevu kartında mentörünün adını görebilsin (BY-2, `meetings/page.tsx:31`) | R1/R5 | 🟢 (frontend gösterim, geri-alınır) |
| PP · Mentör filtresindeki 4 İngilizce DISC etiketi Türkçeleştirilsin (`mentor/page.tsx:27-30`) | 2026-09-09 test bulgusu | 🟢 (çeviri) |
| PP · DISC arketip kartı (superPower/strengths) panelde/profilde de render edilsin (BY-4) | M-A4, R1/R2 | 🟢/🟡 (yalnız gösterim; matching'e dokunmuyor) |
| PP · Toplantı linki bir ekranda görünsün (K8) | R5 "en öldürücü kopma", U-A5 | 🟡 (yeni akış, geri-dönülmez değil ama kapsamlı) |
| PP · `SCHEDULED→COMPLETED` geçişi için UI (K9) → kutlama+değerlendirme akışı açılır | U-A5, R2/R8 | 🟡 (meeting durum akışı) |
| PP · Mentör %uyum rozeti görsün (BY-1, `Meeting.matchId` yazımı) | MT-A3, R2/R6 | 🔴 (matching verisine dokunur → KARAR-C ile bağlı) |
| PP · Bekleme "senin gibi N kişi bekliyor" akran sinyali (mentör<3 gizlenme senaryosu dahil) | M-A3, R1 | 🔴 (KVKK eşiği + ürün kararı → KARAR ile) |
| PP · Yönetici için dönemsel rapor EXPORT (PDF/Excel) | R3 "S3'ün kalbi", Y-A2 | 🟡 (yeni yetenek; PII içerir → KVKK gözet) |
| PP · Envanter belgelerinin bayat "yok" iddialarını düzelt (lastLoginAt/nudge/drill-down artık var) | §3.3 notu | 🟢 (belge hijyeni) |

---

## 7. HAZIR KARAR KARTLARI (KARAR-??) — öneri, numara verilmedi

> CLAUDE.md şablonu. Roller arası çatışmalardan (§4.2) türedi. "Ne kaybedersin" boş bırakılmadı.

### KARAR-?? · "Sevdirme" dili ne kadar kesin/iddialı olmalı? (C3) [ÜRÜN KARARI]
**Şu an ne var:** Onboarding "Sen bir Öncüsün!" + konfeti + paylaş düğmesi; bekleme "yakında eşleşeceksin". Kanıt: `onboarding.ts:20-33`, `menti-persona:73`.
**Sorun ne:** Ürün "iki dille konuşuyor" — metodoloji sayfası "kişilik tanısı değildir" derken kullanıcının gördüğü ekran kesin kimlik veriyor (`konsey-icerik:198-202`). DISC skorunun bilimsel dayanağı yok ama kesin sunuluyor; kırılgan kullanıcıda yanlış özdeğer riski.
**Neden sana soruyorum:** Teknik değil — "kullanıcıya ne söz veriyoruz" ürün+etik kararı.
**Seçenekler:**
- **A) Kesin/coşkulu dil korunur** · Kullanıcı: güçlü ilk aha · Kazanç: tutundurma etkisi · Kayıp: etik risk + dayanaksız iddia + kriz anında güven kaybı · Süre S · Geri alınır · Migration yok.
- **B) Temkinli dile geç** ("iletişim tarzın", "bir ipucu") · Kullanıcı: dürüst ama daha sönük aha · Kazanç: etik/hukuki güvenli, tek dil · Kayıp: coşku/paylaşım azalır · Süre M · Geri alınır.
- **C) Hibrit** — coşku kalır ama "kesin tanı değildir" mikro-notu + kanıtlanamaz vaat ("yakında eşleşeceksin") kaldırılır · Kayıp: metin işçiliği · Süre M.
**Karşılaştırma:** Gerçek kullanıcı yokken A'nın "işe yarıyor" kanıtı da yok; B en güvenli ama en test-edilmemiş; C dengeli.
**Benim önerim:** C — coşkuyu öldürmeden kanıtlanamaz vaadi ve kesinlik iddiasını törpüler. *(Bu senin ürün kararın; önerime güvenme — gerçek kullanıcı verisi yok.)*
**Cevap vermezsen:** M-A4, R7 boşluğu ve C3 çatışması açık kalır. **CEVAP:**

### KARAR-?? · "Akıllı eşleştirme" iddiası — ölçelim mi, geri mi çekelim? (C2) [ÜRÜN KARARI]
**Şu an ne var:** Belge "eşleşme kalitesi = bizim farkımız" (`yonetici:86`); kod: `Match` tablosu boş, `predictedScore` yazılmıyor/okunmuyor, DISC ağırlıkları sezgisel.
**Sorun ne:** PO'nun kurula/sponsora tek satış argümanı, kendi sistemi tarafından bile ispatlanamıyor.
**Neden sana soruyorum:** "Neyi vaat ediyoruz + nasıl kanıtlayacağız" ürün/pazarlama kararı.
**Seçenekler:**
- **A) `Match`'i yaz + kaliteyi ölç** (`createMatchIfEligible` çağrılsın, predicted↔gerçek karşılaştırması) · Kazanç: gerçek kanıt · Kayıp: matching koduna dokunma (🔴), efor L · Migration olası.
- **B) İddiayı geri çek** — "kalite metriği" yerine "eşleştirme yardımcısı" konumlandır · Kazanç: dürüst, hızlı · Kayıp: satış argümanı zayıflar · Süre S.
- **C) Bekle** — ilk gerçek görüşmeler birikene kadar iddiayı ne öne çıkar ne çek · Kayıp: belirsizlik sürer.
**Karşılaştırma:** A gerçek çözüm ama en pahalı ve matching-riskli; B dürüst ama pazarlamayı küçültür; C erteleme.
**Benim önerim:** A (uzun vade) ama ilk kurum canlıya girmeden B dili kullanılsın. *(Ürün kararın.)*
**Cevap vermezsen:** Y-A4, U-A1, R3/R4/R6 riski açık kalır. **CEVAP:**

### KARAR-?? · Kriz/kendine zarar kanalı eklensin mi? (R7 + kuyruk I-18) [ÜRÜN KARARI]
**Şu an ne var:** Kriz akışı HİÇ YOK (`konsey-icerik:267-271`). Kırılgan genç kitle hedefleniyor, "konuşacak biri" bir menti ihtiyaç kategorisi ama kriz ifadesinde kimse haberdar olmuyor.
**Sorun ne:** En savunmasız kullanıcı korumasız; hukuki+ahlaki sorumluluk boşluğu.
**Neden sana soruyorum:** Hukuki sonucu olan + yetki (kim haberdar olacak) içeren geri-dönülmez ürün kararı.
**Seçenekler:**
- **A) Pasif kaynak** — kriz durumunda 112/183 + destek hattı yönlendirmesi gösteren statik içerik · Kazanç: düşük efor, sorumluluk azaltır · Kayıp: kimse "haberdar" olmaz (tespit yok) · Süre S · Geri alınır.
- **B) Aktif tespit + eskalasyon** — risk ifadesi yakalanınca yetkiliye/kuruma bildirim · Kazanç: gerçek koruma · Kayıp: KVKK+yanlış-pozitif+yetki karmaşası, ağır sorumluluk · Süre L · 🔴 hukukçu şart.
- **C) Kapsam dışı bırak, açıkça beyan et** — "bu platform kriz desteği vermez" · Kayıp: kırılgan kitle hedefiyle çelişir.
**Karşılaştırma:** A minimum sorumlu adım; B doğru ama en riskli/pahalı; C dürüst ama hedef kitleyle gerilimli.
**Benim önerim:** A (hemen) + B'yi hukukçu görüşüyle değerlendir. *(Ürün+hukuk kararın.)*
**Cevap vermezsen:** U-A4, R7 "en ağır sorumluluk boşluğu" açık kalır. **CEVAP:**

### KARAR-?? · Yönetici drill-down'ı kişinin serbest-metin endişe notuna inmeli mi? (C1) [ÜRÜN KARARI]
**Şu an ne var:** Drill-down kişiye iniyor (`yonetici:80`); check-in notları (1000 karakter+endişe etiketi) sahiplik kontrolsüz okunuyor (G-3, `konsey-guvenlik-kvkk`).
**Sorun ne:** Yöneticinin "kim kaynıyor" görme hakkı ile mentinin özel notunun mahremiyeti çarpışıyor.
**Neden sana soruyorum:** Yetki + KVKK + kullanıcı güveni kararı.
**Seçenekler:**
- **A) Yönetici yalnız AGGREGATE + durum görür**, serbest-metin notu göremez · Kazanç: mahremiyet · Kayıp: yönetici bağlamı azalır · Süre M.
- **B) Görür ama LOGLU + kullanıcı bilgilendirilir** · Kazanç: aksiyon gücü · Kayıp: kırılgan not maruz kalır · Süre M · 🔴 KVKK.
- **C) Notlar zaten yalnız taraflar arası** — yöneticiye hiç açılmaz · Kazanç: en güvenli · Kayıp: yönetici müdahale edemez.
**Karşılaştırma:** A dengeli; B güçlü ama riskli; C en korumacı ama aksiyonu keser.
**Benim önerim:** A. *(Ürün+KVKK kararın.)*
**Cevap vermezsen:** PL-A2, C1 çatışması + G-3 açık kalır. **CEVAP:**

### KARAR-?? · Persona/panel belgeleri nasıl gelişmeli: A/B/C? [ÜRÜN KARARI]
**Şu an ne var:** 7 belge 📸 dondurulmuş, 7 hafta güncellenmedi, kimse "varsayım tuttu mu" bakmadı.
**Sorun ne:** Tasarım zemini bayat; ama kör güncelleme tur bütçesini yer.
**Seçenekler:** §5.1'deki A (yaşayan) / B (halef persona-v2) / C (dondurulmuş kalır). Her birinin kazanç/kayıp/atıf/bakım tablosu §5.1'de.
**Benim önerim:** Tetikleyicili B (o zamana kadar C) — §5.1. *(Ürün+belge-yönetimi kararın.)*
**Cevap vermezsen:** U-A6 açık kalır, belgeler tekrar bayatlar. **CEVAP:**

---

## 8. ✅ HÂLÂ GEÇERLİ VE GÜÇLÜ olanlar (7 hafta sonra hâlâ doğru = korunmalı)

1. **Menti ≠ mentör zıt motivasyon ayrımı** (`menti:14,21-27`) — tasarımın en isabetli teşhisi; R1 ve R2 rolleri bağımsız olarak "beni anlamış" dedi. Halefte korunur.
2. **Yönetici 3 soru çerçevesi (S1/S2/S3)** (`yonetici:52-61`) — R3 "tam kafamdaki soru" onayladı. Çerçeve sağlam; eksik olan içindeki metriklerin beslenmesi.
3. **"Terk sebebi kaydolma sebebinden değerli"** (`yonetici:111`) — ürün bilgeliği, evrensel doğru.
4. **"Neden Excel değil?" var-olma-sebebi testi** (`yonetici:119`) — her özelliğin geçmesi gereken test; hâlâ keskin.
5. **Drill-down (özet → tıkla → kişi) ilkesi** (`yonetici:94`) — CANLI ve çalışıyor; hem yönetici hem platformda uygulandı.
6. **Dengeli yetki + "elle eşleştirme yok = torpil önleme"** (`stk-strateji:64-68`) — tasarım kararı sağlam; uygulandı.
7. **"Basit yüzey + derin arka oda" felsefesi** (`platform-strateji:25`) — PO rolü bile "ürün DNA'm, itirazım yok" dedi. Geçerli.
8. **Bekleme anının kritikliği teşhisi** (`menti:62-74`) — doğru teşhis; sadece çözüm (umut sinyali) yarım kaldı.
9. **Hayalet mod / açık kapı yok** (`stk-strateji:74-92`) — KVKK+kalite için doğru; uygulandı (PR #31).
10. **"Az ve anlamlı metrik"** (`yonetici:67`) — kalabalık panele karşı doğru ilke; F-19 alarmıyla yaşıyor.

---

## 9. Taranamayanlar

- **Gerçek kullanıcı testi ham verisi** — böyle bir dosya YOK (Glob: `gercek-kullanici-testi-*` boş, dizin `docs/`, harf-duyarsız). Yalnız tek türev bulgu var (`konsey-icerik:333`). Prompt bu dosyaya yönlendirdi ama mevcut değil (§10/1-2).
- **`docs/arsiv/admin-panelleri-tasarim-2026-08-02.md`** — B.5 panel tasarım kartları denetimi digest'lendi (`strateji-gercek-denetimi` üzerinden) ama kaynak tasarım kartları belgesinin kendisi tam okunmadı (arşivde, kapsam dışı).
- **Canlı DB / gerçek kullanım metrikleri** — salt-okuma + DB'ye bağlanılmadı; "kaç kullanıcı, kaç görüşme gerçekleşti" gibi gerçek sayılar bilinmiyor (varsayımların ⬜ kalmasının bir nedeni).
- **2 panel envanteri belgesinin bağımsız kod-denetimi** — panel INDEX'e göre "sonraki tur" (`panel/00-INDEX.md:10`); bu turda envanter belgeleri felsefe+güncel-durum olarak okundu, satır-satır yeniden denetlenmedi.

---

## 10. ⭐ BU TURUN PROMPTUNA ELEŞTİRİ

1. **"2026-09-09 GERÇEK KULLANICI TESTİ" abartılı çerçevelenmiş.** Prompt bunu Faz 2'nin "⭐ GERÇEK DAVRANIŞ VERİSİ" dayanağı yapmış; gerçekte 3-5 kişilik bir görüşme değil, tek somut çıktısı mentör panelindeki İngilizce DISC etiketi olan tek bir gözlem. Doğru çerçeve: *"gerçek kullanıcı testi hâlâ yapılmadı"* — ki bu zaten turun en büyük bulgusu (§0①). Prompt en zayıf kanıtı en güçlü sanmış.
2. **Prompt var olmayan bir dosya yoluna yönlendirdi.** `docs/raporlar/kesif/gercek-kullanici-testi-*` diye bir dosya YOK; referans günlük loga/konseye gömülü. Bir sonraki turda kanıt kaynakları var-yok diye önce doğrulanmalı.
3. **"~54 iş canlıya çıktı" ifadesi projenin kendi 'Bitti tanımı' kuralıyla gerilimli.** Merge ≠ canlı ≠ kullanıcı görüyor. Bazı işler merge bekliyor (I-02), bildirim gönderimi kapalı (mail gitmiyor). Prompt "canlıya çıktı" ile "kullanıcı görüyor"u eşitleyerek Faz 2'yi olduğundan iyimser bir zemine oturtma riski taşıdı.
4. **8 rol "gerçeklik" gibi sunulma riski taşıyor.** Roller (menti/mentör dahil) gerçek kişi değil, yine tahmin — kod-teyitli kanıtla beslenseler de. Prompt "çok rollü değerlendirme"yi gerçek kullanıcının yerine koyma tehlikesine karşı uyarı içermeliydi; roller varsayımı test etmez, yalnız çeşitlendirir.
5. **Persona/strateji ↔ envanter belgeleri aynı "7 belge" torbasına konmuş ama türleri farklı.** Envanterler zaten "kod ne diyor" denetim belgeleri; onların "felsefesini çıkar" (Faz 1) adımı bu belgelere tam oturmuyor — envanterin felsefesi = kod gerçeği. Bu ayrım promptta yok.
6. **Faz 2 "varsayım tuttu mu" kurgusu davranışsal varsayımlar için yanlış mahkeme seçiyor.** Persona varsayımlarının çoğu davranışsal ("menti kırılgandır") ve KODA karşı test edilemez; ancak gerçek kullanıcıyla sınanır. Prompt "bugünkü kanıtla karşılaştır" derken kanıtı büyük ölçüde koda indirgemiş. Bu turda bu ayrım elle yapıldı (⬜ ağırlığı) ama prompt bunu istememişti.
7. **En ağır etik bulgu (kriz/I-18) yalnız R7'ye ipucu olarak bırakılmış, zorunlu karara bağlanmamış.** Kırılgan kitle hedefleyip kriz kanalı olmaması, "bir KARAR kartına mutlaka çıkar" sinyalini hak ediyordu; prompt bunu opsiyonel bıraktı.
8. **Kapı (🟡/🔴) ataması salt-okuma turda kesinleştirilemez, prompt bunu istedi.** Gate doğru atanması için matching/auth dosyalarına dokunulup dokunulmayacağının kesin bilinmesi gerekir; salt-okuma turda çoğu kalem için ancak "önerilen kapı" verilebilir. Prompt bu sınırı kabul etmiş görünse de "kapı kuralı" kesinlik ima ediyor — §6'da bu yüzden "önerilen kapı" denildi.

---

## KAPANIŞ RAPORU

1. **Okunan belge/satır · alt-ajan · kapsam:** 9 dosya (7 içerik + 2 INDEX), 1.038 satır — TAM okundu. 12 alt-ajan (4 kanıt digest + 8 rol). Kanıt tarafında 4 denetim + 4 konsey + ILERLEME/DURUM digest'lendi. **TAM KAPSAM.**
2. **Varsayım sayısı · dağılım:** 34 varsayım · ✅ 6 · ❌ 12 · ⬜ 10 · ❓ 6.
3. **⭐ ÇÜRÜYEN varsayım:** **12** — omurgası tek kök nedende ("sinyal ulaşır/ölçülür" boş): DISC dayanaksız, bildirim kapalı, Match boş, görüşme tamamlanmıyor.
4. **Hâlâ test edilmemiş varsayım:** **10** — tamamı davranışsal; gerçek kullanıcı görüşmesi olmadan sınanamaz (belgelerin kendi şartı 7 hafta açık).
5. **Roller arası çatışma:** **6** (C1-C6) · bunlardan **5'i karar kartına** çıktı (C1→KARAR-D, C2→KARAR-B, C3→KARAR-A, ayrıca kriz KARAR-C, belge mimarisi KARAR-E; C4/C5/C6 gövdede işaret edildi).
6. **Belge mimarisi önerisi:** **Tetikleyicili B (o zamana kadar C)** — belgelerin kendi şartı (gerçek kullanıcı testi) yerine gelmeden kör güncelleme yeni tahmin üretir, sürekli dondurmak öğrenmeyi kaybeder.
7. **Güncelleme tetikleyicisi:** İlk gerçek kullanıcı testi (T1) → persona-v2 halefi; ilk 10 canlı görüşme (T2) → davranışsal varsayımları sınama.
8. **Prompt eleştirisi:** **8 madde.**
9. **PR no:** #258 (açık bırakıldı, merge edilmedi).

**🟩 PLANLA/SALT-OKUMA — hiçbir mevcut dosya değişmedi; yalnız bu tek yeni dosya yazıldı.**
