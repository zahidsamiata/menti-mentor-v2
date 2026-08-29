# 00 — KARAR & İŞ TAKİBİ (NE KALDI · NE YARIM · NE UNUTULDU)

**🔄 YAŞAYAN** (canonical: açık iş/karar takibi) · **Son güncelleme:** 2026-08-23

> **Bu belge NEDEN var:** "Hep önümdeki işe odaklanıyorum ama arkada yarım bıraktığım işleri, ölü kodları,
> alıp da uygulamadığım kararları unutuyorum; canlıya çıkınca eksik keşfediyorum." Bu belge o sorunu çözer:
> **TEK yerde**, açık iş + yarım iş + ölü kod + uygulanmamış karar — durumu net, **kanıtlı** (dosya:satır),
> ve **iş yaptıkça otomatik güncellenir** (kural: `CLAUDE.md` "Karar-Takip Disiplini").
>
> **Kural:** Bu belge asla "yapıldı" demez — **kod öyle demedikçe.** Her statü grep/dosya kanıtıyla doğrulanır;
> doğrulanamayan "❓ TEYİT GEREK" işaretlenir (uydurma yok). Belge ↔ kod çelişirse **KOD KAZANIR**.
> Derin gerekçe için ilgili canonical belgeye link verilir (kopyalama yok — Kural 1).

---

## A. ⚡ TEK BAKIŞTA (şu an)

> **Çıkış önceliği (hangi iş çıkıştan önce/sonra):** `00-CIKIS-PLANI.md` — açık işler K0-K5'e sınıflandı; gerçek çıkış-bloker sadece 5 K0 + 1 K1.

> **⚠️ GÜNCELLEME (2026-08-26) — BELGE BİLANÇOSU (4-tur sayım) yapıldı:** Tüm docs (71 belge, 10.473 satır) + kök & backend `CLAUDE.md` baştan-sona okundu, kod gerçeğiyle çaprazlandı, tekilleştirildi → **≈259 benzersiz karar/iş/niyet** [⚠️ DÜZELTME (2026-08-27): önce "196" yazılmıştı — YANLIŞ; gerçek tekil **≈259** (270 veri satırı − 11 gerçek ikiz). "196" FAZ-2 aritmetiğiydi, yazılan satırlarla mutabakatsızdı. Kaynak: `../raporlar/bilanco/kararlar/00-KATLAMA-IZI-2026-08-27.md`]. **21 numara adayı → NUMARALANDI (104-124, PO talimatıyla, bkz. Bölüm F.6)** — hepsi durum **⬜ AÇIK (PO önceliklendirmedi)**; öncelik atanmadı, 10-yol'a eklenmedi. **15 tutulmamış söz**, **~29 unutulmuş erken niyet**, **6 çelişki** (5 kod-hakemli), **~20 hayalet-tamamlanmış** (belge "açık" der, kod yapılmış). En bayat canonical = `00-CIKIS-PLANI` (madde 39 + K5-soru 2 + repo-private 2026-08-26 kararlarından habersiz). Tam döküm: `../raporlar/bilanco/belge-bilancosu-2026-08-26.md` + `karar-defteri-2026-08-26.md`. PO özeti: `bilanco-po-ozet-2026-08-26.md`. Tekrar-önleme (KURAL 9-12 öneri, yürürlükte DEĞİL): `tekrar-onleme-2026-08-26.md`. **Sayım turu kod/DB değiştirmedi; numaralar yalnız bu belgede (F.6) doğdu.**

| Kategori | Sayı | Tek cümle |
|---|:---:|---|
| 🔴/🟡/🔵 **v1 açık iş** | **6** | ⚡ #37 kurum "düzeltme iste" → **✅ CANLIDA** (backend #50 + çatı #104 merged, migration canlıda). Kalan: cevap-tipi(#13), kurum-maili(#6), 2a/2b/#7-B tasarım-hazır, içerik/seed/PO + **9a** ağırlık-ayar (migration bekliyor) + **37m** kurum-mail-açma (PO-manuel env) |
| ❓ **karar/keşif bekliyor** | **5** | K6 admin-guard, sektör/etiket havuzu, K3 eski-kayıt consent, #36 önce-keşif, **9b** scoring dekoratif-kalibrasyon (yeni bulgu) |
| 💀 **ölü kod / yarım bağlantı** | **9 kalem** | Çoğu TEK yarım özelliğin parçası: "eşleşme-sonrası değerlendirme/metrik" (#7 tasarımıyla bağlanacak) |
| 🔵 **v2 backlog** | **15** | Hiç dokunulmadı (14-28: algoritma/DB-riskli/ileri-faz/retention) |
| ✅ **canlıda (v1)** | **~10** | KARAR 5, K2, K5, menü, rozetler, DISC harf, İş 2+3, admin soru UI, login enumeration |

> **En çarpıcı gerçek:** Ölü kodların çoğu rastgele değil — **birlikte tek bir yarım-kalmış özellik** oluşturuyor
> ("görüşme sonrası değerlendirme + dönemsel metrik + otomatik checkpoint"). Bu özelliğin **tasarımı yeni yazıldı**
> (`degerlendirme-metrik-sistemi-tasarim-2026-08-19.md`, #7). Yani "ölü kod"u silmek değil, **#7 ile bağlamak** = özellik tamamlanır. Detay: **Bölüm C**.

> **⚡ GÜNCELLEME (2026-08-23) — strateji-denetimi + PO oturumu:** 6 strateji belgesi kodla karşılaştırıldı
> (`strateji-gercek-denetimi-2026-08-20.md`, 85 madde: %66 tam var). **Ana bulgu:** admin tasarım-kartları baştan sona
> uygulanmış; kalan kopukluk 3 eksende — mail/bildirim (37m, en yüksek kaldıraç), menti retention inceliği (bekleme/ret/kutlama),
> yönetici kanıt katmanı (export/oran/trend). **Yeni açık iş:** Y1–Y7 + **DISC-DERİNLEŞME kurgusu** (numarasız — bkz. **Bölüm B.4**).
> Bu turda birçok ❓ karara bağlandı (9b→düzeltilecek, K6→v2, K3→en son, sektör/etiket→talep-onay, 2a→30 gün uyku modu,
> #13→ertelendi); satır-içi **⚠️ GÜNCELLEME (2026-08-23)** notlarına bakınız.

> **⚡ GÜNCELLEME (2026-08-23) — belge-düzeni reorg (salt-docs, KOD YOK):** `docs/kararlar/` + `docs/raporlar/` alt-klasörlere
> ayrıldı (git mv, içerik değişmedi); canonical taşıyıcılar kökte kaldı; 38 tam-yol referansı güncellendi; 00-INDEX yeniden
> yazıldı; kırık-link 0; docs/ 68 dosya (kayıp yok). Bu turda **2 yeni 🟡 altyapı-hijyen maddesi** eklendi → **Bölüm E** (repo/altyapı hijyeni).

> **⚡ GÜNCELLEME (2026-08-23) — tam-belge taraması (42 belge, 7 paralel salt-okuma ajanı):** Reorg turunda belgeler yüzeysel
> tarandığından içlerindeki kararlar sistematik çıkarılmamıştı. Bu tur 42 içerik belgesi TAM okunup kod gerçeğiyle çapraz
> kontrol edildi → **13 gerçek yeni kayıp madde** çıktı (3'ü 🔴 GÜVENLİK canlı-öncesi) → **Bölüm F**. Ayrıca ~25 "belge açık
> diyor kod yapmış" bayat-not adayı + `icerik/` belgelerinin kökten bayat öncülü (`seed-questions.ts` yok) tespit edildi.
> **MADDE 67 (çerez izni) VAR** (10-yol:146) — eklenmedi. Tam döküm: `../raporlar/kod-denetimi/tam-belge-taramasi-2026-08-23.md`.

---

> **⚡ GÜNCELLEME (2026-08-29) — FAZ 3a middleware turu (G7-04 ✅ + G1-17 yeniden tanım):** Çatı PR (frontend-only, backend DOKUNULMADI).
> **G7-04 ✅ CANLI ADAY:** `frontend/src/middleware.ts` — `www.sivilkapasite.org → sivilkapasite.org` 301, yol+query korunur, apex/localhost döngü koruması (5 test).
> **⭐ G1-17 YENİDEN TANIMLANDI (kart):** *"Frontend middleware ile ÇÖZÜLEMEZ — cross-origin cookie: frontend `sivilkapasite.org`, backend `api.sivilkapasite.org`, parent domain paylaşımı yok → middleware auth cookie'sini/rolü OKUYAMAZ (access token zaten yalnız bellekte). JS-yazılabilir `mm_role` çerezi REDDEDİLDİ (devtools'tan atlanır → sahte güven, korumasızdan tehlikeli). Gerçek koruma BACKEND yetki kontrolüdür. Kalem **Faz 3b**'ye taşındı: admin/platform endpoint yetki denetimi (G1-23 ailesi). Middleware çözümü ancak backend cookie'ye parent domain verilirse mümkün — ayrı mimari karar."*
> **EK (bu tur):** (1) `platform/layout.tsx` istemci guard'ı YOKTU → eklendi (oturum `/health` ile doğrulanır, 401/403 → `/platform/login`; login sayfası muaf, döngü yok). KABA kapı — asıl kapı backend `requirePlatformAdmin`. (2) `(admin)/layout.tsx` "middleware Sprint 15'te" yorumu gerçekle değiştirildi. (3) `lib/api/platform.ts` fırlatılan hataya `.status` iliştirildi (401/403 güvenilir ayrım).
> **🆕 KEŞİF-BULGU (kalem adayı — DK1):** `platform/dashboard/page.tsx:82` 401 tespiti `e.message.includes('401')` ile yapıyor ama `platformFetch` Türkçe mesaj fırlatıyor (kod içermez) → **401'de login'e yönlendirmiyor, hata metni gösteriyor** (latent bug). Yeni layout guard'ı kullanıcı-etkisini maskeliyor ama sayfa-içi kontrol hâlâ hatalı → `.status` ile düzeltilmeli (küçük iş).

> **⚡ GÜNCELLEME (2026-08-29) — FAZ 3b: YETKİ HARİTASI (3b-1 denetim) + 6 AÇIK KAPATILDI (3b-2):** backend PR #60 + çatı PR (pointer + belge).
> **Denetim (3b-1, salt-okuma):** 23 route dosyası · **187 endpoint** tarandı (3 paralel Explore ajanı + elle doğrulama). Kalıcı referans belge: **`docs/raporlar/kesif/yetki-haritasi-2026-08-29.md`** (📸, "neyin otomatik / neyin elle" — yeni endpoint yazan okusun). **Dağılım: 🟢~167 · 🔵~14 · 🟡6 · 🔴0 · ❓0.** ⭐ **Cross-tenant izolasyon SAĞLAM (0 açık)** — merkezi RLS (`db.ts:60-64`) READ+scoped-model'i otomatik kesiyor; bulunan 6 açık **tenant-İÇİ peer maruziyeti** (RLS `findUnique`+yazma+scope-dışı modele DOKUNMAZ → elle sahiplik gerekir, atlanmıştı).
> **⭐ G1-17 → ✅ (gerçek çözüm bu tur):** Admin/platform backend uçları denetlendi — hepsi `requireRole('ADMIN')`/`requirePlatformAdmin` + tenant-scoped (🟢). Frontend middleware ile çözülemeyen kısmın ASIL koruması backend'de zaten var + eksik peer-katmanı kapatıldı. Kanıt: yetki haritası §B/§E + PR #60.
> **⭐ G1-23 → 🗑️ GEÇERSİZ (kanıtlı):** logoUrl 3 yazma yolunun üçünde de admin+kendi-tenant guard'ı VAR (`selfServeController.ts:~388`, `tenantController` `requirePlatformAdmin`). "Guard yok" iddiası eskimiş.
> **⭐ G1-04 → yeniden tanım:** SuspicionReport tenantId taşımıyor (`schema.prisma:1172-1184`) AMA public-create + platform-only-read → tenant-izolasyon açığı DEĞİL (tasarım). Spam sertleştirme isteğe bağlı ayrı UX işi.
> **6 YENİ BULGU — NUMARALANDI (131-136), 3b-2'de ✅ KAPATILDI (PR #60, IDOR testli):**
> - **131 (Y1)** `GET /requests` peer talep+PII sızıntısı → non-admin `OR[requester/target=self]` ✅ `requestController.ts`
> - **132 (Y2)** `GET /meetings` peer görüşme meta sızıntısı → non-admin `OR[mentor/menti=self]` ✅ `meetingController.ts`
> - **133 (Y3)** `GET /mentors/:mentorId/filter` peer filtre okuma → `requireSelfOrAdmin` ✅ `userRoutes.ts`
> - **134 (Y4)** `PUT /mentors/:mentorId/filter` peer filtre YAZMA (sabotaj) → `requireSelfOrAdmin` ✅ `userRoutes.ts`
> - **135 (Y5)** `POST /scoring/compute-profile` peer profil/rol ezme → self/admin guard + role token'dan ✅ `sjtScoringController.ts`
> - **136 (Y6)** `POST /questions` tenant admin global soru → daima tenant'a sınırlı ✅ `questionController.ts`
> Her fix ayrı commit + IDOR regresyon testi (5 test dosyası). Kırılan akış yok (FE kontrolü: §PR60). ⚠️ Entegrasyon testleri lokalde guard'la durur → kanıt CI. **MERGE EDİLMEDİ.**
> **DK1 (önceki tur):** dashboard 401 latent bug — hâlâ açık (küçük iş, `.status` ile düzeltilebilir; Y* dışı).

## ⭐ SONRAKİ-TUR SÖZLERİ (KURAL 11 — HER OTURUM BAŞINDA OKU)

> **Neden burada:** Oturumlarda "sonraki turda/ileride yapılacak" diye verilen sözler sonraki oturumlarca devralınmıyordu
> (bilanço teşhisi: 15 sözün 11'i düştü). KURAL 11: söz verildiği AN buraya tek satır kopyalanır; **her oturum başında bu bölüm
> okunur, PO'ya açık sözler hatırlatılır; söz yerine gelince ✅ + kaldırılır.** Kaynak: `../raporlar/bilanco/` (T3-A + nihai §7).
> Bu bölüm = "verilen ama tutulmamış söz" görünürlüğü; B/F tabloları = "iş/karar" görünürlüğü (çelişmez, tamamlar).

| # | Söz (ne yapılacaktı) | hangi oturum | bugünkü durum | ilgili madde |
|:---:|---|---|---|---|
| S15 | Kurum onay/ret maili gönderimi açılacak (env bağla) | 2026-08-20 | ⬜ hâlâ kapalı (`TENANT_NOTIFICATIONS_ENABLED=false`) — PO-manuel env | 37m |
| S2 | Denetim işleri (Y1-Y7) kodlanacak | 2026-08-20 | ⬜ hiçbiri başlanmadı; "neden bırakıldı" gerekçesiz | Y1-Y7 |
| S10 | Canlı DB soru sayıları teyit edilecek (DISC 32/SJT 3/sertifika 20 ↔ canlı) | 2026-08-15 / 08-26 | ⬜ hiç yapılmadı (DB'ye sorulmadı — kural) | 30 · 33 · 118 |
| S6/S7 | KVKK FE entegrasyonu + avukat-final tamamlanacak | 2026-08-25 | ⬜ hukukçu onayı (H-9) + [PO DOLDURACAK] bekliyor | 97 · 90 · 84 |
| S3/S9 | Kurum-düzeltme 3 sorusu + içerik 5 kararı PO'dan alınacak | 2026-08-23 | ⬜ PO karar kuyruğunda birikti | K5 soruları (00-CIKIS-PLANI) |
| S1 | 6 arşiv teyidi yapılacak | 2026-08-14 | ⬜ sonraki oturumlarda hiç anılmadı, izi kayboldu (sebep yok) | — (belge-hijyen) |
| S11 | Soru cevap-tipi (şıklı/açık-uçlu) yapılacak | (çeşitli) | ⬜ migration + kapsam belirsiz → PO netleştir; defalarca ertelendi | 13 |
| S12 | DISC-tipine-özel "mentiye yaklaşım" içeriği yazılacak (sıfırdan) | (çeşitli) | ⬜ içerik felsefesi keşfine bağlandı | 31 |
| S13 | DISC-DERİNLEŞME kurgusu tasarlanıp kodlanacak | 2026-08-23 | 🔵 içerik-felsefe keşfine bağlı, kodlanmadı | (A1, numarasız) |
| S14 | Belge yeniden-yapılandırma (~68 belge) tamamlanacak | 2026-08-23 | 🟡 kısmen (bu bilanço onun parçası), tamamı değil | 123 (A5) |
| S16 | Eşleştirme/değerlendirme sistemi TASARIM TEZİ yazılacak (DISC→Big Five, Likert→senaryo; keşif tespit turuydu) | 2026-08-27 | ✅ YAPILDI (2026-08-28, iki tur) — tasarım belgesi yazıldı: `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` (Bölüm 1-16). Kalemler Bölüm 16 KALEM LİSTESİ'nde. | 125-130 + G2 kartları |
| S17 | İşleme-al kalemleri ÖNCELİK SIRASINA sokulacak (87 işleme-al + 2 keşif → 10-yol'a) | 2026-08-27 | ✅ YAPILDI (2026-08-28) — 8 boş kart da bağlandı (dağılım 92 işleme-al/87 şimdilik/3 geçersiz/2 keşif); sıra: `bilanco/kararlar/00-ONCELIK-SIRASI-2026-08-28.md` + 10-yol "KOD İŞ SIRASI" bölümü | 00-ONCELIK-SIRASI + 10-yol |
| S18 | Super-admin kapısı KEŞFİ (yeni /platform'da olmayan yetenek var mı → taşı, sonra kapat) | 2026-08-27 | ⬜ keşif olmadan silme YOK | G4-09/G4-10 |
| S19 | Sunucu/altyapı sertleştirme TARAMASI (HTTPS/firewall/SSH/SSL/yedek) — çıkış blokeri | 2026-08-27 | 🔴 çıkış öncesi ZORUNLU | G1-28 |
| S20 | Fotoğraf kayıt-sonrası DÜZENLEME keşfi (kullanıcı foto/bilgi güncelleyebiliyor mu) | 2026-08-27 | ⬜ önce keşif sonra iş | G10-25 |
| S21 | Profil/hedef verisi envanter keşfi yapılacak — mentör/menti profilinde bugün hangi alanların TOPLANDIĞI kod-kanıtlı çıkarılacak; **üç soru (S1/S2/S3) bundan önce kesinleşmez** | 2026-08-28 | ⬜ tasarım belgesi Bölüm 10.6 ön koşul olarak işaretledi; keşif henüz yapılmadı | tasarım belgesi B10 + KALEM 13 |
| S22 | **Backend PR #56 merge olunca** çatı submodule pointer'ı backend `main` HEAD'e **re-bump** et (`git submodule update --remote backend`), tek çatı turunda | 2026-08-28 | ✅ **YAPILDI (2026-08-28)** — backend #56 merged (`303da85`); pointer re-bump `chore/faz1b-pointer-s22` turunda tamamlandı. ⚠️ Not: #129 pointer düzeltmesinden ÖNCE merge edildiği için ara bir sarkma oluştu (main pointer `0cb237c` feature commit'i gösterdi — ağaç doğruydu), bu turda kapatıldı. | G10-01 / çatı PR #129 / backend PR #56 |
| S23 | **G1-07 Tur B** — Consent migration + backfill'i CANLIYA uygula. **PO onayı ZORUNLU** (canlı=lokal aynı Neon). ⚠️ MIGRATION TEK BAŞINA. `CONSENT_VERSION` avukat metniyle (G1-10) sabitlenmeli. | 2026-08-28 | ✅ **TAM (2026-08-28, B1 PR #133 + B2 PR #134):** B1 migration CANLIDA · **B2 backfill `--apply` → 5 ACIK_RIZA yazıldı** (yalnız ACIK_RIZA, grantedAt==kvkkConsentAt 5/5, idempotens teyitli, revokedAt null). Ön-sayımlar değişmedi (6/2/5/0). Consent modeli canlıda tam devrede. **Kalan (ayrı işler):** CONSENT_VERSION→G1-10 · G1-08 OAuth rıza UI · G1-05 self-servis FE. | G1-07 / backend PR #58 / G1-10 |
| S24 | **Backend PR #59 (G1-05) merge olunca** çatı submodule pointer'ı backend `main` HEAD'e **re-bump** et (`git submodule update --remote backend`), tek çatı turunda — çatı PR feature-commit pointer taşıyor (sarkma önlemi, S22 deseni). | 2026-08-29 | ✅ **YAPILDI (2026-08-29):** backend #59 merged (merge commit `f74149b`); pointer `9808811 → f74149b` re-bump (çatı `c2edaf5`, #135'e dahil). Teyit: `origin/main` `9808811`'i içeriyor (feature-commit main'in atası, ileri sarım — sarkma yok). | G1-05 / backend PR #59 / çatı PR #135 |

> **Not:** Yukarıdaki sözlerin çoğu B.1 / F tablolarındaki maddelerle AYNI işlerdir — burada "söz olarak da verilmişti, tutulmadı"
> boyutuyla görünür. Yeni bir söz verildiğinde (yeni oturum) buraya EKLENİR; tutulunca ✅ işaretlenip kaldırılır (KURAL 11).

---

## B. 🔴 AÇIK İŞLER TABLOSU

> Durum: 🔴 hiç başlanmadı · 🟡 yarım/kısmi · 🔵 tasarım hazır kod bekliyor · ❓ karar/keşif bekliyor · ⏸️ bilinçli ertelendi.
> Numaralar `10-yol-haritasi.md` ile aynı (referans için sabit). Alternatif adlar parantezde.

### B.1 — v1 açık işler (canlı-öncesi)

| No | İş | Durum | Tür | Ne gerekiyor (somut sıradaki adım) | Kanıt | Migration? | Boy |
|---|---|:---:|---|---|---|:---:|:---:|
| 6 | Onay/red maili — **kurum/destek** kısmı | 🟡 | yarım-kaldı | Kurum(tenant)-onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL` env bağla (kullanıcı maili ✅ çalışıyor) | `10-yol:md.6`; tam-envanter C3 | Hayır | S-M |
| 7 | Havuz kartı (A) + eşleşme-sonrası değerlendirme (B) | (A) ✅ CANLIDA / (B) 🔵 | (A) TAMAMLANDI + (B) tasarım-hazır | (A) **✅ CANLIDA** aday kartı gerekçe FE render (çatı #102, DISC harfi hariç); (B) = **#7 sistem tasarımı** (bkz. C) | (A) main `mentor/page.tsx` compatibilityReason (2×) + `RankedMenti` tipi; (B) `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` | (A) Hayır (B) Evet | (A) S (B) L |
| 9 | Algoritma kalibrasyon ağırlık UI (0.60/0.40) | ✅ CANLIDA (gösterim) | gösterim TAMAMLANDI | **GÖSTERİM ✅ CANLIDA** (backend #49 + çatı #102): "Mevcut Ağırlıklar" kartı %60/%40 + salt-okuma endpoint. **AYARLAMA YAPILMADI** → madde 9a migration turu | main `algorithm-tuner/page.tsx` kart (2×) + `GET /algorithm-tuner/weights` | Hayır (gösterim) / Evet (ayar) | S |
| 13 | Soru cevap-tipi seçimi (şıklı/açık-uçlu) | ✅ İŞLEME AL (PO 2026-08-27) | canlandı (G3-13) | **⚠️ GÜNCELLEME (2026-08-27): PO kararıyla ⏸️→✅ İŞLEME AL** — STK şıklı-soru + anket isteği (G3-04) `answerType` şema alanını **zorunlu kılıyor (migration)**; artık ertelenmiş değil, sıraya girecek (öncelik ayrı tur). · Kapsam belirsiz (tipler/validation/skoring) → **PO netleştir**; sonra şema alanı = migration · **⚠️ GÜNCELLEME (2026-08-23): ERTELENDİ** · **⚠️ GÜNCELLEME (2026-08-26, KEŞİF):** kurum-özel `Question`/`UserResponse` yalnız Likert 1-5; cevap-tipi alanı YOK → yeni tip = **migration** (kanıt döküm §6). Şıklı altyapı SJT'de var ama STK_CUSTOM kullanmıyor. Detay: `../raporlar/icerik/tam-soru-dokumu-2026-08-26.md`. | tam-envanter A4; `schema.prisma` alan yok | **Evet** | M |
| 30 | Sertifika bankası 5→20 canlı seed | 🔴 | içerik-eksik | `seedCertification()` kontrollü çalıştır (idempotent) → **canlı DB yazımı, PO onayı ZORUNLU** · **⚠️ GÜNCELLEME (2026-08-26, KEŞİF):** kod 20 senaryo (4 red-line) teyitli; **güvenli seed runner YOK (madde 73 bloke)**; canlı sayısı ⏳ TEYİT GEREK (DB). Detay: `tam-soru-dokumu-2026-08-26.md`. | tam-envanter A5; canlı ~5, kod 20 | **Evet (seed)** | S |
| 31 | DISC-tipine-özel "mentiye yaklaşım" içeriği | 🔵 | içerik-eksik | 3 seçenek (statik kılavuz M / SJT koşullu L / sertifika varyant L) → PO seçsin · **⚠️ GÜNCELLEME (2026-08-23):** felsefe önce anlaşılacak · **⚠️ GÜNCELLEME (2026-08-26, KEŞİF): NEGATİF TEYİT — içerik SIFIRDAN yazılacak** (grep: DISC-tipine-göre yaklaşım metni 0 sonuç; `coachingSuggestions` yönetici-içindir). Doğal ev-sahibi: eşleşme kartı. DISC-DERİNLEŞME'nin aksiyon ayağı. Detay: `tam-soru-dokumu-2026-08-26.md` §9. | tam-envanter A6; `eksikler-...:9-18` | Seçeneğe göre | M-L |
| 33 | SJT belge-kod (3 vs 4) + seed↔canlı (32 vs 20) kalan | 🔴 ❓ | içerik-eksik | (a) seed↔canlı: re-seed mi trim mi (canlı DB, PO); (b) SJT 3→4 içerik genişletme (PO) · **⚠️ GÜNCELLEME (2026-08-26, KEŞİF):** KOD gerçeği kesin — **SJT=3** (belge "4" yanlış), **DISC=32** (belge "20"=silinmiş `seed-questions.ts`, tek kaynak artık `seed.ts`). ⚠️ SJT **OCEAN** ölçer (DISC değil) ve **canlı eşleştirmede OKUNMUYOR** (madde 101). Canlı sayılar ⏳ TEYİT GEREK. | tam-envanter C4; `03-psikometri:47` "4", kod 3 | **Evet (a)** | S |
| 34 | Öğrenme-yolculuğu tamamlanma görünürlüğü (STK admin) | ✅ CANLIDA | TAMAMLANDI | **✅ CANLIDA** (backend #49 → `18cfc42` + çatı #102 → `0fd4942`, merged): `adminListUsers`'a `learningJourneyCompletedAt` + havuz kolonu. Test var | 🟩 main `adminController.ts` alan döner (4×) + test; `menti/mentor-havuzu` kolonu (2×) | Hayır | S |
| 35 | **(2a)** İki tip red: "düzeltme iste" vs "kalıcı/ghost sessiz red" (KARAR 2) | 🔵 | tasarım-hazır | Backend red-tipi alanı + 2 buton + e-posta ayrımı (ghost = sessiz, tekrar-başvuru yok) · **⚠️ GÜNCELLEME (2026-08-23): ghost red = 30 GÜN UYKU MODU.** Kişinin verileri (DISC/profil/mesaj) hemen SİLİNMEZ; 30 gün içinde kurum geri alırsa veriler geri gelir, almazsa **TAMAMEN silinir** (PO geri-alınamazlığı bilerek onayladı). **Zamanlanmış iş (cron) gerekir.** | `11-tasarim-kararlari` KARAR 2; `10-yol:md.35` | **Evet** | M-L |
| 36 | **(2b)** Onaylanmış (aktif) kullanıcıyı sistemden çıkarma (KARAR 3) | 🔵 ❓ | tasarım-hazır + önce-keşif | **ÖNCE git'ten doğrula** (isActive=false/demote kodda var mı?), eksikse yap | `11-tasarim-kararlari` KARAR 3; `10-yol:md.36` | ❓ (keşif sonrası) | M |

### B.2 — Karar/keşif bekleyenler (kodlanamaz — önce PO/keşif)

| No | Konu | Durum | Ne gerekiyor | Kanıt | Migration? |
|---|---|:---:|---|---|:---:|
| K6 | Admin sayfaları server-side guard | ⏸️ v2 | v1-güvenlik mi v2-iyileştirme mi → PO (API zaten backend-korumalı, savunma-derinliği) · **⚠️ GÜNCELLEME (2026-08-23): v2'ye ERTELENDİ.** Ürün önce çıksın; ancak sistem yöneticisi paneli düzgün ayarlanmış olmalı. | tam-envanter A2; `04-guvenlik` | Hayır |
| — | Sektör/etiket başlangıç havuzu (admin-tablo, KARAR 12) | 🔵 ❓ | seed mi / admin-yönetilir tablo mu → şema+PO kararı · **⚠️ GÜNCELLEME (2026-08-23): PO kararı — talep-onay akışı.** Yönetici etiket **yazabilir**; mentör/menti etiket ekleme **TALEBİNDE** bulunabilir; yönetici reddeder / kabul eder / farklı öneri sunar. **ÖNCE kodda ne olduğu keşfedilecek** (`PendingTag`/`tagController` var — bağlı mı?). | tam-envanter A9; `tasarim-kararlari-admin` | Evet |
| K3 | Eski kayıt consent politikası | ⏸️ EN SON | yeniden-rıza / bulk / erteleme → PO ürün+hukuk kararı · **⚠️ GÜNCELLEME (2026-08-23): YAPILACAK ama EN SONA** — canlıya çıkmadan hemen önce (o zamana dek hangi izinlerin isteneceği netleşecek). | tam-envanter A3; `08-acik-sorular` | Evet (backfill) |
| — | K4 yaş **verisi** doğrulaması (beyan ✅ ama veri yok) | ❓ | Şemada yaş alanı yok; öz-beyan yeterli mi yoksa veri-doğrulama mı → PO | 🟩 `schema.prisma` yaş alanı yok (A1) | Evet |
| 9a | **Eşleştirme ağırlığı AYARLANABİLİRLİĞİ** (tenant bazlı) | ✅ CANLIDA (#52+#114) | **PO kararı alındı:** varsayılan %60/%40, dernek değiştirebilsin ama **5'er adımla** (küsürat yok), iki ağırlık toplamı hep %100 (biri artınca diğeri azalır). FE: slider ya da +/−, biçim uygulayıcıya. **Migration gerekli** (tenant-bazlı alan) + canlı eşleştirmeyi etkiler → #7 Aşama 2 ile birlikte, PO onaylı migration turu. **Ön iş: madde 9b** · **⚠️ GÜNCELLEME (2026-08-23):** ağırlığı kurumun **TÜM yöneticileri** değiştirebilir (yalnız kurucu değil); iz = kalibrasyon sayfasında tek satır *"son değişiklik: kim / ne zaman / eski→yeni"*; aynı iz hem ağırlık-değişikliği hem **kalibrasyon onay/red** aksiyonları için tutulur. | 🟩 `algorithmTuner.ts` STEP=0.05/MIN-MAX · **⚠️ GÜNCELLEME (2026-08-26): MIGRATION GEREKMEDİ** (ağırlık `tenantVocabulary` Json'da; audit `SystemLog.meta`) — keşif doğruladı. **✅ CANLIDA — backend #52 (`838d128`) + çatı #114 (`6e6e798`) merged.** `PUT /algorithm-tuner/weights` (tenant-izolasyon, TÜM adminler, audit) + FE +/− %5 UI. ⚠️ **'kim' izi YARIM** → madde 95. | **Hayır** |
| 9b | **`scoring.ts` saklanan ağırlığı yoksayıyor** (kalibrasyon dekoratif) | ❓ bulgu | #9 turunda keşfedildi: canlı eşleştirme (`scoring.ts:96` → `matching.ts`) hardcoded 0.6/0.4 kullanır; `getAlgorithmWeights` (Tenant.tenantVocabulary) YALNIZ kalibrasyon UI'ında okunur → approve edilen ağırlık canlıya YANSIMAZ. Düzeltilmeli mi (PO+staging) → 9a ile birleşebilir · **⚠️ GÜNCELLEME (2026-08-23): PO kararı — DÜZELTİLECEK** (❓ → 🔵). Canlı eşleştirme **kaydedilen ağırlığı OKUYACAK**; tüm kurumlar %60/%40 varsayılanıyla başlar, kurum kendi kitlesine göre ayarlar. | 🟩 canlı yol artık ağırlığı okur · **✅ CANLIDA — backend #52 (`838d128`):** `computeTotalScore` opsiyonel ağırlık; `matching.ts` bir kez okur (N+1 yok); regresyon testi. **madde 87 çözüldü.** ⭐ **DURAK-A (PO, Neon prod salt-okuma):** özel ağırlık kayıtlı tenant = **0 satır** → 9b hiçbir sıralamayı değiştirmedi (tümü varsayılan %60/%40). | Hayır (kod) |
| 37 | **Kurum (STK) başvurusu "DÜZELTME İSTE" akışı** (red değil, revizyon talebi) | ✅ CANLIDA | TAMAMLANDI | **✅ CANLIDA** (backend #50 → `ba92dfa` + çatı #104 → `2639e2e`, merged): migration (CORRECTION_REQUESTED enum + `Tenant.correctionNote`, canlıya uygulandı — DB teyitli) + platform admin "Düzeltme İste" endpoint/UI + kurum resubmit + getMe tenant bloğu + mail altyapısı (GÖNDERİM KAPALI). Test CI'da geçti. **⚠️ mail açma = madde 37m** | 🟩 main `platformController.requestTenantCorrection`; `resubmitTenantApplication`; `TenantCorrectionBanner`; `tenantNotifications.ts`; canlı DB enum+kolon VAR | ✅ (additive) |
| 37m | **Kurum mail gönderimini AÇMA** (env bağlama) | 🔴 PO-manuel | Altyapı hazır (`tenantNotifications.ts`, 3 şablon) ama `TENANT_NOTIFICATIONS_ENABLED=false` → gerçek mail GİTMİYOR (log-only). PO `destek@` adresi + prod SMTP env kurup bayrağı `true` yapınca açılır. **Kod işi YOK — PO/altyapı işi.** · **⚠️ GÜNCELLEME (2026-08-23): PO yapacak ama ŞİMDİ DEĞİL.** (Not: denetim raporu Bölüm C — bu bayrak en yüksek kaldıraç; 🟠 bildirim kümesinin tamamı buna bağlı.) | 🟩 `config.email.tenantNotificationsEnabled`; `tenantNotifications.ts` gate | Hayır |

### B.3 — v2 backlog (madde 14-28, hiç dokunulmadı)

| No | İş | Durum | Migration? | Not |
|---|---|:---:|:---:|---|
| 14 | Sektör skoru 5-bileşen canlı bağlama (`sector-scorer` U1) | ⏸️ | Hayır (kod hazır) | staging ŞART; bkz. C-U1 |
| 15 | Eşleştirmeyi birleştir (iki skorlama → tek) | ⏸️ | Hayır | 14'ten sonra, staging |
| 16 | F3 tenant hard-delete (KVKK Md.7) | 🔴 | **Evet** | GERİ-ALINAMAZ + DB → keşif+PO önce |
| 17 | F6 hayalet mod + toplu CSV davet | 🔴 | **Evet** | yeni model, büyük tur |
| 18 | `VisibilityOptIn.requestMessage` kolonu DROP | ⏸️ | **Evet** | teknik borç, PO-onaylı migration |
| 19 | "Neden uyumlu" Katman 2 (KARAR 8) | ⏸️ | Hayır | ürün olgunlaşınca |
| 20 | Mentör yaklaşım kılavuzu Katman 3 (KARAR 9) | ⏸️ | ? | KVKK+etik karar önce |
| 21 | Sektör kolonu (KARAR 10) | ⏸️ | Evet | canlı-sonrası |
| 22 | Landing UX paketi + yumuşak lacivert tema | ⏸️ | Hayır | canlı-sonrası |
| 23 | Gerçek push (Expo/FCM) — şu an stub `sent:true` | ⏸️ | Hayır | tam-envanter A8; in-app/e-posta idare ediyor |
| 24 | Retention otomatik nudge (cron) | ⏸️ | Hayır | manuel `nudgeUser` var |
| 25 | Privacy center UI + DISC için ayrı rıza | ⏸️ | Evet | KVKK ileri |
| 26 | RLS lint kuralı (`findUnique` sızıntı tuzağı) | ⏸️ | Hayır | güvenlik-iyileştirme |
| 27 | Staging ortamı (14/15 ön koşulu) | ⏸️ | Hayır | altyapı |
| 28 | Ortam temizliği (merged worktree/branch sil) | ⏸️ | Hayır | `git branch --merged` teyidi önce |

---

### B.4 — 🆕 2026-08-23 turu: strateji-denetimi + PO oturum kararları

> **Kaynak 1:** `docs/raporlar/kod-denetimi/strateji-gercek-denetimi-2026-08-20.md` (6 strateji belgesi ↔ kod, 85 madde) Bölüm D.
> **Kaynak 2:** bu oturumda ürün sahibinin sözlü verdiği kararlar (aşağıdaki yeni tasarım + erteleme/keşif kararları).
> Yukarıdaki B.1/B.2 satırlarına işlenen PO kararları için ilgili satırdaki **⚠️ GÜNCELLEME (2026-08-23)** notlarına bakınız
> (9a, 9b, K6, K3, sektör/etiket, #35/2a, #13, #31, 37m). Aşağıdakiler **yeni** kalemler.

**Denetimden çıkan yeni açık işler (Y1–Y7 — denetim raporu Bölüm D.1):**

| No | İş (denetimden) | Durum | Ne gerekiyor | Kaynak |
|---|---|:---:|---|---|
| Y1 | Menti **bekleme anı** deneyimi — öğrenme+DISC derinleştirme'yi bekleme ekranına bağla + umut/peer-count mesajı | 🔴 | Bekleme ekranı CTA + sosyal-kanıt (S) | denetim B.1/6-8 |
| Y2 | Menti **reddi yumuşatma** (3 alternatif) + **küçük başarı kutlaması** | 🔴 | Kutlama (S) canlı-öncesi; ret-yumuşatma (M) sonra | denetim B.1/10-11 |
| Y3 | Yönetici **rapor EXPORT** (PDF/CSV) + görüşme ivmesi/tamamlama-uyum ORAN metrikleri | 🔴 | En az export (S) — Persona B/C kanıtı | denetim B.3/2,3,10,11,12,14 |
| Y4 | Yönetici **proaktif kırmızı uyarı** kartı (eşik-tabanlı alarm) | 🟡 | Eşik aşınca kırmızı vurgulu uyarı (S) | denetim B.3/16,17 |
| Y5 | **Mentör kapasite sınırı** (kaç mentiye kadar) | 🔴 | Kapasite alanı + matching kullanımı (M) — PO kararı | denetim B.2/11 |
| Y6 | **Global seed doğrulaması** (A8 DISC soruları + oyunlaştırma stages canlı Neon'da var mı?) | ❓ veri | Salt-okuma `SELECT count(*) WHERE tenantId IS NULL`; boşsa seed (PO onaylı DB yazımı) | denetim B.5/SEED |
| Y7 | Platform **büyüme metrikleri** (ivme, aktif/pasif oran) + platform **ayar UI** + 3. seviye kullanıcı drill | 🔴/🟡 | Düşük öncelik (platform admin = PO); canlı-sonrası | denetim B.4/3,4,12,18 |

**🆕 Yeni ürün tasarımı — DISC/karakter derinleşme kurgusu (PO bu oturumda tanımladı):**

| No | İş | Durum | Tanım | Not |
|---|---|:---:|---|---|
| **DISC-DERİNLEŞME kurgusu** (numarasız · PO "yeni kurgu" dedi — ⚠️ eski "#38" etiketi madde-38 güvenlikle çakıştığı için ADA çevrildi; #33=SJT ile de KARIŞTIRMA) | Tek-seferlik DISC yerine **kademeli karakter derinleşmesi** | 🔵 ❓ tasarım | Önce bir **ANA KARAKTER** belirlensin; kişi sistemi kullandıkça (oyun gibi, soru cevapladıkça) karakter **DERİNLEŞSİN ve kesinleşsin**; sonra kişinin karakterine göre **karşı tarafa NASIL YAKLAŞACAĞI** anlatılsın. PO: *"kişiyi tespit ettik, karşındakini de tespit ettik, bildirdik — ama nasıl aksiyon alması gerektiğini de söylemek lazım."* | **#31 ile birleşik** düşünülecek. PO ayrıca **TÜM soruları görmek** istiyor, sonra beğendiklerini/beğenmediklerini ayıracak. Mevcut altyapı zaten adaptif (`adaptiveTestEngine`, DEEPENING) — kurgu buna oturabilir · **⚠️ GÜNCELLEME (2026-08-26, KEŞİF): fikrin ~%50-60'ı hazır.** Adaptif motor + DEEPENING profil-güncelleme (discVector ÜZERİNE yazar) ÇALIŞIYOR. **Eksik:** (a) #31 aksiyon içeriği (sıfırdan), (b) "netleşiyor" ilerleme UX'i, (c) sınırsız-yeniden-derinleşme davranışı karara bağlanmalı (her sefer profili değiştiriyor). ⚠️ **Üç ayrık sistem** (DISC→eşleştirme · SJT/OCEAN→okunmuyor m101 · öğrenme→puansız) birleştirilecek. PO inceleme: `../raporlar/icerik/sorular-po-inceleme-2026-08-26.md`. Detay: `tam-soru-dokumu-2026-08-26.md` §10/§13. |

**📁 Sonraki tur notları (bu oturumda PO tanımladı — uygulama YOK):**
- **İÇERİK & SORU FELSEFESİ KEŞFİ:** tüm soruların (DISC / sertifika / SJT / öğrenme-yolculuğu / kurum-özel) **içeriği + hangi felsefeyle üretildikleri + nasıl puanlandıkları** çıkarılacak. **DISC-DERİNLEŞME kurgusu, #31, #13, #30 bu keşfe bağlı** — keşiften önce kodlanmayacak.
- **BELGE YENİDEN YAPILANDIRMA TURU (~68 belge):** PO mevcut belge düzeninden **memnun değil.** Kapsam: klasör ayrımı
  (strateji/ ↔ envanter/), isim düzeltmeleri (karışan çiftler), arşivleme, tüm belge setinin referans haritası + sadeleştirme
  (denetim raporu Bölüm E ile aynı; `admin-panelleri-tasarim` güçlü arşiv adayı). Ayrı büyük tur.

**🔵 CANLI ÖNCESİ DENETİM LİSTESİ (yeni madde — zaman: TÜM geliştirme bitince, ayrı tur):**
> PO bir kontrol listesi tarif etti. ⚠️ Liste klasik **pazarlama sitesi** için yazılmış; bu ürün **giriş yapılan bir UYGULAMA** —
> bazı maddeler (portfolyo, harita, müşteri yorumları, ekip fotoğrafları) UYMAYABİLİR; SEO maddeleri yalnız **public/landing** için.
- **Public/landing (SEO):** 404 sayfası · hero CTA · iç linkleme · teşekkür sayfası · breadcrumb · SSS · site hızı · sticky CTA ·
  robots.txt · benzersiz `<title>` · meta description · OG/Twitter kartları · görsel alt etiketleri · JSON-LD schema · Search Console.
- **Yasal (zorunlu):** KVKK / gizlilik / çerez metinleri (K3 ile birleşir; sayfalar kodda MEVCUT, metin taslak).
- **Uygulamaya özel EK maddeler:** uygulama-içi (giriş sonrası) sayfaların arama motoruna **KAPALI** olduğu teyidi (KVKK) ·
  boş-durum ekranları · hata/yükleniyor durumları · **mail akışları uçtan uca testi** (37m açılınca) · mobil kullanılabilirlik
  (çok-kolonlu yönetici tabloları) · yedekleme/geri dönüş · **foto volume kalıcılığı** (Dokploy) · sunucu güvenliği.

**🔴/🟡 2026-08-23 hijyen + PO-manuel maddeleri (belge-düzeni turundan çıktı):**
- **🔴 Çerez izni / Consent Mode v2 bandı** — canlı-öncesi ZORUNLU. PR **#110** (analytics GTM/GA4/Clarity, **merge-kilitli**) buna bağlı; K3/çerez metinleriyle birleşik. Bant olmadan üçüncü-taraf veri aktarımı = KVKK ihlali (yurt-dışı aktarım beyanıyla çelişir).
- **✅ Repolar PRIVATE yapıldı** (2026-08-25, PO-manuel) — çatı `menti-mentor-v2` + backend `menti-mentor` artık private. (Eskiden public'ti; G1/G3 açıkları da #51 ile canlıda düzeltildi.)
- **✅ Depo hijyeni (2026-08-26):** 3 atıl worktree + 3 backend-kopyası kaldırıldı; merge olmuş yerel 91 + uzak 93 dal silindi. **Kalan (unmerged):** çatı 8 (#110 dahil) + backend 5 dal — gerçek açık işler, korundu.
- **🔵 Belge düzeni — alt-klasör + isimlendirme tasarımı HAZIR** (öneri; plan dosyasında): `kararlar/` sıcak-kök + `konu/`+`denetim/`; `raporlar/` `persona/panel/denetim/kesif/icerik/`. Uygulama ayrı BYPASS turu (git mv + ~120-150 referans + INDEX en son). Taşıyıcı 5 ad (09-DURUM/10-yol/00-KARAR-TAKIP/00-INDEX/CLAUDE.md) KALIR.

---

## C. 💀 ÖLÜ KOD & YARIM BAĞLANTILAR (niyeti anla → bağla; SİLME kararı PO'da)

> **Ürün sahibi ilkesi:** "Biz o kodu bir sebeple yazdık; önemli olan **neden yazdığımızı bulup kaldığı yerden devam etmek**."
> Bu bölüm her kalem için: ne yapıyor · **neden yazılmış (niyet)** · neye bağlanacak · bağlanınca hangi iş biter · kanıt.
> **"Sil" ÖNERİLMEZ** — gerçekten terk adayı olanlar "❓ bilinçli terk mi, PO kararı" diye işaretlenir.

### 🌟 ÖRÜNTÜ: "Eşleşme-sonrası değerlendirme + metrik + dönemsel checkpoint" — TEK yarım özellik
> Aşağıdaki **5 kalem birbirinden bağımsız ölü kod DEĞİL** — hepsi backend+şema+FE'de yazılıp **birbirine bağlanmadan bırakılmış tek bir özelliğin** parçaları. Tasarımı yeni formalize edildi: `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` (roadmap #7-B). **Bunları bağlamak = #7'yi inşa etmek** (silmek değil).

> **⚡ GÜNCELLEME (2026-08-19) — #7 Aşama 1 (migration'sız uçları bağla) PR'da 🔀 (MERGE OLMADI):**
> backend PR **#48** + çatı PR **#100**. Kod gerçeğiyle işaretlendi (PR'da bekliyor, "canlıda" DEĞİL):
> - ✅🔀 **D1 `findMatchesDueForCheckpoint`** → günlük cron'a bağlandı (`runCheckpointFeedbackReminderCron`), **LOG-ONLY** (gerçek bildirim Aşama 2 — mail geri-alınamaz + dedup guard'ı şema ister).
> - ✅🔀 **Kalite puanı kalıcı yazım** → `TenantMembership.qualityMultiplier`'a event-driven yazılır (`persistMentorQualityMultiplier`); yönetici havuzunda "Kalite Puanı" kolonu görünür.
> - ✅🔀 **F1 `getPairSignal` / `/pair-signal`** → yöneticiye TOPLU bağlandı (`adminListMatches` risk sinyali kolonu; eşleşmeler sayfası "Risk" rozeti). Esik mantığı `pairSignal.service.ts`'te.
> - 🟡 **F5/F6 `ContextualFeedbackHost`/`MeetingProvider`** → BAĞLANMADI (Aşama 2/3): kullanıcı-bazlı "vadesi gelen checkpoint" endpoint'i + poller yok; kullanıcıya görünen modal → şüphede bağlama kuralı.
> - 🟡 **feedback şema alanları** (`periodic*` vb.) → hâlâ yazılmıyor (değerlendirme formu Aşama 3).
> - ⏭️ **Otomatik pasifleştirme + tenant eşik alanı** → Aşama 2 (şema = migration = PO onayı gerekli). **⚠️ GÜNCELLEME (2026-08-23):** dernek **eşiği kendi girer**; özellik **varsayılan KAPALI**.

> **⚡ GÜNCELLEME (2026-08-19, merge turu) — #7 Aşama 1 ✅ MERGED, CANLIDA:** yukarıdaki 🔀 PR'lar merge edildi
> (backend #48 → backend main `b5f4b88`; çatı #100 → çatı main `ef2b995`; pointer senkron; iki main CI yeşil).
> Yani **✅🔀 kalemleri artık ✅ CANLIDA** (autodeploy açık): D1 checkpoint cron (LOG-ONLY), kalite puanı kalıcı
> yazım + yönetici "Kalite Puanı" kolonu, F1 risk sinyali + eşleşmeler "Risk" rozeti. **Hâlâ AÇIK (Aşama 2/3):**
> 🟡 F5/F6 ContextualFeedbackHost, 🟡 feedback `periodic*` alanları, ⏭️ otomatik pasifleştirme + tenant eşik (migration).

| Kalem | Yer (kanıt 🟩) | Ne / Niyet | Neye bağlanacak → hangi iş biter |
|---|---|---|---|
| **D1** `findMatchesDueForCheckpoint` | `backend/.../feedback.service.ts:71` (0 çağrı) | Dönemsel checkpoint'i gelen eşleşmeleri bulur — **periyodik değerlendirme tetikleyicisi** | #7 cron/periyodik metrik toplama → dönemsel değerlendirme otomatikleşir |
| **feedback şema alanları** `engagementScore`, `goalClarityScore`, `periodic*` (Trust/Network/Confidence/Nps/CareerGrowth) | `schema.prisma:589-590,597-601` — tanımlı, **hiçbir endpoint yazmıyor** (yalnız menti'den gizleme destructure'ı `feedbackController.ts:130-133`) | Mentör→menti dönemsel değerlendirme alanları (kariyer/güven/ağ/özgüven/NPS) | #7 değerlendirme formu → alanlar dolar, metrik hesaplanır |
| **F5/F6** `ContextualFeedbackHost` + `MeetingProvider`/`useMeeting` | `ContextualFeedbackHost.tsx:22` (mount yok) · `MeetingContext.tsx:34` (provider mount yok) | Görüşme sonrası **bağlamsal feedback formunu** otomatik gösteren FE zinciri | #7 FE tarafı. **Not:** backend `payload.tags` alanı eksik olduğu için bağlanmamış (`unutulmus-niyet:69`) |
| **F1 + öksüz endpoint** `getPairSignal` + `GET /api/meetings/pair-signal` | `meetings.ts:111` (0 çağrı); endpoint `meetingRoutes.ts` var | Mentör-menti çiftinin **sağlık/risk sinyali** (backend hazır, FE bağlanmamış) | #7 risk-sinyali/metrik paneli → çift durumu görünür |

### Diğer ölü/atıl kalemler (örüntü dışı)

| Kalem | Yer (kanıt 🟩) | Ne / Niyet | Durum → öneri (silme değil) |
|---|---|---|---|
| **D2** `llmRetry.ts` / `fetchWithRetry` | ~~`llmRetry.ts:34` (0 import)~~ SİLİNDİ | LLM retry sarmalayıcı; tüketici `matchReason.ts` yok (LLM kaldırılmış) | ✅ **YAPILDI (2026-08-28, Faz 1b, backend PR #56)** — G10-01; 0 import kod-teyitli, silindi (PO işleme-al kararı) |
| **D3** `UserProfile.qualityMultiplier` | `schema.prisma:970` (ikiz); canlı akış `TenantMembership.qualityMultiplier:1065` kullanıyor (certification/sjtScoring/matching/scoring) | Mentör kalite katsayısı; **UserProfile ikizi atıl** (tüm okuma/yazma TenantMembership'te) | **❓ PO:** DROP migration mi (canlı DB) yoksa ileride kullanılacak mı? Silme değil |
| **U1** `sector-scorer.service.ts` | `:67,99` (dış çağrı 0, coverage FNDA:0) | 5-bileşen sektör-uyum skoru; canlı basit Jaccard etiket-kesişimi kullanıyor | **⏸️ bilinçli bekliyor** = v2 #14 (staging şart). Bağlanmayı bekliyor |
| **U2** `matchingInterface.ts` (strategy pattern) | 0 import; yorum "USER akışı / planlı JOB_LISTING" | Gelecek iş-ilanı eşleştirmesi şablonu | **⏸️ bilinçli** gelecek-şablon. Dokunma |
| **maxMeetingsPerWeek** | `schema.prisma:167` + admin CRUD `adminSettingsController.ts:62-113` + test `hardening.test.ts:293` | Menti haftalık maks. görüşme sınırı — **admin ayarlanabilir + test var (ÖLÜ DEĞİL)** | **❓ TEYİT GEREK:** ayar yazılıyor ama görüşme oluşturmada **enforce ediliyor mu** doğrulanmadı → ayrı bakılmalı |

### C.2 — 2026-08-23 tam niyet envanteri (5 paralel ajan · kod-teyitli)
> Yukarıdaki C kümesine EK — 5 ajanın çıkardığı, C'de olmayan yarım-iş/bağlanmamış-kod kalemleri, **niyetiyle**.
> Niyet kaynağı çoğunda **2026-07-07 "sprint 8-11" mega-commit'i** (backend-first inşa) — o yüzden çok endpoint FE'siz kaldı.
> Tam döküm + FE-çağrı kanıtları: `../raporlar/kod-denetimi/yarim-is-niyet-envanteri-2026-08-23.md`. Sayı: **BAĞLA ~11 · BEKLET ~15 · ❓ PO ~12**.

| Kalem (dosya:satır) | Niyet (neden yazıldı) | Neye bağlanacak → biter | Öneri |
|---|---|---|---|
| **SJT psikometri akışı:** `POST /scoring/compute-profile` + `/rank-mentors` (`sjtScoringRoutes.ts:20,26`) + `SjtQuestion/SjtOption` tabloları (`schema.prisma:889,906`, 0 query) | SJT tabanlı profil+mentör sıralama alternatif yolu (cert paketleri, `1e11e73`) | SJT test akışı FE ekranı → canlı eşleşmeye alternatif | ❓ PO: SJT canlıya girecek mi (girmezse BEKLET) |
| **`taxonomy.service.ts` + `IndustryNode`** (`sector-scorer.service.ts:2`'den çağrılıyor) | Taksonomi ağacı yakınlığı → isabetli sektör skoru | U1 sector-scorer canlıya bağlanınca → İŞ 7 | BEKLET (U1/İŞ 7'ye bağlı) |
| **Kulüp modülü:** `/clubs` 7 uç (`clubRoutes.ts:20-44`) + `Club/ClubMembership` tabloları | Kulüp/topluluk özelliği (sprint 8-11 backend-first) | FE tümü + pilot kulüp kararı (`08-acik-sorular`) | ❓ PO KARARI (canlıya girecek mi, yarım-terk mi) |
| **Feedback-logs modülü:** `/feedback-logs` + `/combination-scores` (`feedbackLogRoutes.ts`) | ML geri-bildirim döngüsü / kombinasyon skor analizi | ML analiz paneli veya iç araç | ❓ PO KARARI (ürün-yüzü mü iç araç mı) |
| **Tenant-admin şikayet inceleme:** `GET/PATCH /admin/reports` (`reportController.ts`) | Kurum-içi şikayet döngüsünün admin tarafı (`7cfc8d5`); oluşturma canlı, inceleme yarım | Tenant-admin şikayet paneli → döngü kapanır | BAĞLA |
| **Admin manuel eşleştirme aksiyonları:** `/users/:id/rematch` (`adminRoutes.ts:55`) + `/visibility-optin/:id/confirm` (double-opt-in, `:68`) | Admin yeniden-eşleştirme + görünürlük onayı | Admin eşleşmeler ekranı butonu | BAĞLA (mentor opt-in T7 ile birlikte) |
| **Profil-güç zinciri:** `profile-completeness.service.ts:28` + `ProfileStrengthCard.tsx` (ikisi de bağlanmamış) | Profil tamamlanma % kartı | Endpoint + dashboard mount (uçtan uca) | BEKLET (profil-güç özelliği) |
| **`TenantSwitcher.tsx`** (mount yok) + backend `/my-tenants` endpoint YOK | Çok-kurum kullanıcı için kurum değiştirme UI | Nav'a mount + backend membership endpoint | BEKLET (çok-kurum UI) |
| **`MeetingScheduler.tsx`** (231 satır, mount yok) | Mentor müsaitlik+rezervasyon UI; backend `/availability` endpoint'i (`meetingRoutes.ts:34`) VAR, bileşen enum+callback ile ona bağlanmak için yazılmış | Bir sayfaya mount + endpoint'e bağla | ❓ PO KARARI — ⚠️ GÜNCELLEME (2026-08-28, Faz 1b): G10-01'de gözden geçirildi, **SİLİNMEDİ** (yarım özellik, ölü değil); bağla/PO kararı bekliyor (G10-20'de izli) |
| **`PATCH /users/me/social`** (`onboardingController.ts:461`) | Sosyal profil (linkedin/instagram) düzenleme | Profil düzenleme ekranı | ❓ PO / düşük-riskli BAĞLA (**niyet belgede yok**) |
| **Mükerrer/eski uçlar:** `/api/system-logs` (platform `/logs` varken) · `/api/super-admin/*` (T6, `/platform/*` varken) · `POST/PATCH /tenants` (platform elle kurum) | Eski/paralel platform-admin API'leri | — | ❓ PO KARARI (konsolide mi) |
| **Endpoint okuma-tarafı boşlukları:** `GET /requests` + `/:id` · `GET /meetings/:id/check-ins` · `/meetings/active` (poller) · `reminders/send` · `orientation-lock` · `questions/respond` (bulk) | Yazma-tarafı bağlı, okuma/liste/tetik tarafı FE'siz | İlgili panel/akış | BEKLET / ❓ PO (uca göre) |
| **`iceBreaker.ts`** (0 import, "decommissioned") | LLM ice-breaker (kaldırılmış) | — | ❓ PO KARARI (bilinçli terk; silme PO'da) |

> **⚠️ Not:** KVKK FE üçlüsü (export/anonymize/hard-delete) = **madde 40** (zaten takipte); mentör görünürlük opt-in FE = **Bölüm F T7**;
> admin sayfaları client-side guard (`(admin)/layout.tsx:6` "Sprint 15" TODO) = **K6** (server-side guard, B.2) — hepsi mevcut, burada tekrar sayılmadı.
> **"~14 FE'siz özellik" iddiası → kod-teyidiyle 9 doğrulandı** (AJAN-D); gerisi yanlış-pozitif (pair-signal FE-stub var, profile-completeness iki uçta bağsız, super-admin ikame).

---

## D. ✅ TAMAMLANANLAR (kısa referans — "bunu yaptım mı?")

> Detay: `10-yol-tamamlananlar.md` + `09-DURUM.md`. Buraya yalnız "yaptım mı?" hızlı-cevabı için liste.

- **v1 canlıda:** KARAR 5 DISC güvenlik (#37+#71) · K2 OAuth consent (#38+#73) · K4 18+ beyan · K5 sunucu konumu (#73) ·
  ThemeToggle (zaten vardı) · sol menü 4-grup (#76) · durum rozeti (zaten vardı) · sertifika rozeti (#40+#77) ·
  **DISC çoklu harf #12 (#47+#93)** · **login enumeration #37 (#46+#91)** · İş 2+3 zinciri (#41-43+#81-85) · admin soru düzenleme UI (#87).
- **Sürpriz "zaten tam" (belge yanılmıştı):** **K2 OAuth `kvkkConsentAt` TAM** — tüm giriş yollarında set ediliyor
  (🟩 `oauthService.ts:112`, `authController.ts:176`, `selfServeController.ts:284/303`). Eski "OAuth yarım" iddiası geçersiz.
- **Eski bayat sanılıp aslında canlıda:** F1 foto upload · F2 platform drill-down · F7 KPI drill-down.

---

## E. 🟡 Repo / altyapı hijyeni (PO kararı bekleyen — kod dışı)

> Kod dışı, repo/geliştirme-ortamı hijyeni. Kayıp gitmesin diye burada; çözümü ayrı tur + PO kararı.

- **🟡 OneDrive senkron riski:** Repo `OneDrive/Masaüstü/Geliştirme` altında — OneDrive'ın `.git` dosyalarını senkronlaması
  kilitleme/bozulma riski + disk doluluğu getiriyor (2026-08-23 turunda disk %98'e dayandı, bir önceki tur `sed` geçici-dosyası patlamıştı).
  **Aday:** repoyu OneDrive dışına taşımak (ör. `C:\dev\`). **PO kararı.**
- **✅ Dağınık backend kopyaları + atıl worktree'ler TEMİZLENDİ (2026-08-26):** 6 worktree (`backend-mail`/`testfix`/`cfgfix` + `cati-bump`/`compose`/`lj`) — hepsi **commit edilmemiş iş YOK** doğrulandı → kaldırıldı (disk ~1 GB geri). Ayrıca merge olmuş dallar temizlendi: **yerel 91** (çatı 64 + backend 27) · **uzak 93** (çatı 67 + backend 26). Unmerged dallar + #110 korundu.
- **🟡 Etiket-gerçek çelişkisi — 3 yaşayan belge (KURAL 3/4 ihlali, AJAN-E 2026-08-23):** (a) `oz-denetim/durum-panosu-2026-08-14.md`
  🔄 etiketli ama git'e göre **11 gün donmuş** + madde 38-78/#12/#37/#7'den habersiz + adı zaten tarihli → **📸'ye düşürülmeli** (en net vaka;
  canonical statü zaten `00-KARAR-TAKIP`'e taşındı). (b) `konu/tasarim-kararlari-admin-2026-08-11.md` + (c) `konu/degerlendirme-metrik-...-2026-08-19.md`:
  tarihli ad + 🔄 etiket (Kural-4 ad↔etiket tutarsızlığı) → yaşayan kalacaksa **ad tarihsizleştirilmeli**. **PO kararı** (ad değişimi
  referans+INDEX günceller; bu tur TAŞINMADI, salt öneri). ✅ Gerçek statü çelişkisi taraması: **0** (taşıyıcılar senkron, kodla teyitli).

---

## F. 🔍 2026-08-23 tam-belge taramasından çıkan kayıp maddeler

> 42 içerik belgesi (raporlar + kararlar/konu + oz-denetim) TAM okundu, kod gerçeğiyle çapraz kontrol edildi (7 paralel
> salt-okuma ajanı). Zaten takip edilenler (madde 1-67, B.4, ölü kod C) elendi; **arada yapılmış** olanlar bayat-not adayı
> olarak ayrıldı. Kalan **gerçek yeni kayıp maddeler** burada. Tam döküm + bayat liste: `../raporlar/kod-denetimi/tam-belge-taramasi-2026-08-23.md`.

### F.1 — 🔴 GÜVENLİK · CANLI ÖNCESİ (✅ #51 MERGED — düzeltmeler canlıda; repolar PO tarafından PRIVATE yapıldı)
> ✅ Üç açık da **#51 ile CANLIDA düzeltildi** (b4b6d66); repolar PO tarafından **PRIVATE yapıldı.** (Tarihsel: bu açıklar public repoda görünürdü.)

| Kod | İş | Kanıt (bu tur elle doğrulandı) | Migr | Not |
|---|---|---|:---:|---|
| G1 | `updateUser` (+2 kardeş uç) yanıtı `select`siz tüm User objesini döner → **password hash + PII sızıntısı** | `userController.ts:272→277` (ayrıca 355→381, 418→424) | Hayır | =10-yol madde 38 · **✅ CANLIDA (#51 MERGED → backend main `b4b6d66`):** db.ts global omit + explicit select + test |
| G2 | `hardDeleteUser` Meeting/Feedback FK non-null → **transaction rollback = KVKK kalıcı silme çalışmıyor** | `gdprService.ts:172-174` (kod-yorumu itiraf) + `schema.prisma` Meeting FK RESTRICT | Olası (SetNull) | =10-yol madde 39; ✅ **CANLIDA (2026-08-26, backend #54 → main `b433554`):** PO onayı (2) → `hardDeleteUser` **anonymizeUser'a yönlendirildi** (migration YOK); kullanıcıya "silindi" DENMEZ (ACCOUNT_CLOSED_MESSAGE). Test: satır silinmez, anonim+pasif. İki main CI yeşil. |
| G3 | `listSuspicionReports` `select`siz → **şüphe raporu edenin PII'si maskesiz** platform admin'e döner | `platformController.ts:353` | Hayır | =10-yol madde 68 · **✅ CANLIDA (#51 MERGED → backend main `b4b6d66`):** maskName/maskContact + explicit select + test |

### F.5 — 🔍 2026-08-25 güvenlik+KVKK turundan yeni maddeler (numara burada doğar, 79'dan)
> Kaynak: FAZ A/B/C (backend PR #51 + salt-okuma teyitler + `kvkk-veri-aktarim-envanteri-2026-08-25.md`). KURAL 8: numara YALNIZ burada.

| No | İş | Tür | Kanıt | Öncelik |
|:---:|---|---|---|---|
| **79** | `maxMeetingsPerWeek` enforce EDİLMİYORDU → menti limitsiz görüşme açar | yapılmamış-iş (sessiz yanlış) | `meetingController.ts` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** (menti başına · sabit 7-günlük UTC kova · tanımsızsa limit yok · 409 · iptal/tamamlanan hariç; test) |
| **80** | `getPlatformLogs` `select`siz + `listUserReports` fullName maskesiz | güvenlik/PII | `platformController.ts:175,411` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** (explicit select + maskName + test) |
| **88** | `getPlatformStats` → `recentLogs` `select`siz → ham `meta` (PII) | güvenlik/PII | `platformController.ts:98` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** (explicit select, meta çıkarıldı; test) |
| **89** | `listPendingTenants` admin `fullName`+`email` maskesiz | güvenlik/karar | `platformController.ts` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** — KARAR: maskele (onay akışı e-posta tüketmiyor, mail adresi yeniden çeker; `maskEmail` domain'i korur). Test |
| **94** | `listPendingTenants` **VIEW audit izi yok** (`listUserReports`/`getAnomalies` aksine) → tutarlılık için eklenebilir | güvenlik/tutarlılık (düşük) | `platformController.ts` (AJAN-1 bulgusu, madde 89 turu) | 🔵 düşük (PII artık maskeli) |
| **95** | Kalibrasyon **'son değişiklik'** satırında **AKTÖR (kim)** gösterilmiyor — `getWeights` yalnız `lastAdjustedAt`/`reason` döner; actorUserId SystemLog audit'te yazılı ama okuma tarafına açılmamış → 9a PO kararının (kim/ne zaman/eski→yeni) yarısı eksik | yapılmamış-iş (küçük) | `getWeights` son audit kaydından actor döndürsün; migration yok | ✅ **CANLIDA (2026-08-26):** backend **#53 → main `b433554`** (`getLastWeightChange` — actorName yalnız AD, e-posta değil; tenant-izolasyonlu; `WEIGHT_CHANGE_AUDIT_MESSAGE` tek-kaynak; **migration YOK**) + çatı **#116 → main `9b09dc3`** (FE "Son değişiklik: {ad} · {tarih} · %X → %Y"). Testler: aktör + eski→yeni + e-posta sızmıyor + okuma-tarafı tenant izolasyonu. İki main CI yeşil. |
| **90** | **Veri İşleyen Sözleşmesi kayıt akışına entegrasyon** — Tenant yasal kimlik alanları (unvan/adres/VERBİS) | yapılmamış-iş (KVKK) | Belge 8; şema alanı yok → **migration** | 🟡 (hukukçu onayı sonrası) |
| **91** | **Kulüp-tipi tenant AKTİF EDİLMEZ** — üniversite kulübünün veri sorumlusu üniversitedir, imza yetkisi yok (avukat) | karar/kısıt (KVKK) | Belge 8; kulüp modülü (madde 41) | 🔴 (canlı-öncesi kısıt) |
| **92** | **Sunucu ülkesi teyidi** — belge "eu-west-2/İrlanda" çelişkili (eu-west-2=Londra/UK, eu-west-1=İrlanda); yasal metin ülke beyanı için PO sağlayıcı panelinden teyit | PO-manuel (KVKK) | envanter C-1; kapak dosyası 🔴 | ✅ **ÇÖZÜLDÜ (2026-08-26, PO teyitli):** **Londra / Birleşik Krallık** (AWS `eu-west-2`, AB üyesi DEĞİL). Yasal metinlere (01/02/08/00-AVUKAT) + envanter ⚠️ notuna işlendi. Kalan: veri sorumlusu adres/KEP/VERBİS + `destek@` (PO). |
| **93** | **Tam anonimleştirme** — `anonymizeUser` kısmi (takma-adlaştırma). **✅ Kısmen CANLIDA (#51 MERGED):** sosyal/avatar/enneagram/discResultCard eklendi. **KALAN:** mesaj içeriği · fiziksel foto dosyası (disk) · `Meeting.phoneNumber/notes` · kayıt-anahtarı (userId PK) bağı → çapraz-tablo yeniden-tanımlanma riski | yapılmamış-iş (KVKK, mimari) | `gdprService.ts`; saklama-imha metni gerçeğe göre düzeltildi | ✅ **CANLIDA (2026-08-26, backend #54 → main `b433554`):** PO onayı (c)+(iii) → serbest metin (mesaj `[silindi]` iki-taraflı, görüşme/feedback/talep/şikayet/sözleşme), fiziksel avatar dosyası, oturum/token temizlenir. **MIGRATION YOK.** İki main CI yeşil. **Sınır (dürüst):** userId (cuid, kişisel değil) kalır → H-9 (hukukçu). Yasal metin "tam geri-döndürülemez" vaadi vermez. |
| **81** | KVKK **otomatik imha süreci** yok (yalnız SystemLog 90g); mesaj içeriği/FeedbackLog **süresiz**; hardDelete'te bile Message kalır | yapılmamış-iş (KVKK) | envanter C-5; `gdprService.ts:253` (yorum "3 yıl" uygulanmamış) | 🟡 (saklama politikası bağımlı) |
| **82** | Rıza metni **sürümü tutulmuyor** (`consentVersion` yok, yalnız `kvkkConsentAt` zaman damgası) → ispat açığı | yapılmamış-iş (KVKK ispat) | envanter C-6; grep `consentVersion` sonuç yok | 🟡 |
| **83** | **OAuth'ta açık rıza UI'da alınmıyor** (`oauthService.ts:112` implicit set; ekranda kutu yok) + KVKK/18+ **tek kutuda birleşik** + aydınlatma≠açık rıza ayrımı yok | yapılmamış-iş/[HUKUKÇU] | envanter C-6; `_RegisterContent.tsx:414` | 🟡 (hukukçu kararına bağlı) |
| **84** | Başvuru/`destek@` e-postası config'te **tanımsız** + FE hak-kullanım ekranı yok → Md.11 hak kullanım kanalı operasyonel eksik | yapılmamış-iş (KVKK) | envanter C-8; `config.ts:31,70-74` · **madde 40 (KVKK FE) ile bağla** | 🟡 |
| **85** | Aydınlatma metni **eksik kategoriler** (mesaj içeriği, sosyal linkler, OCEAN/SJT, lastLoginAt, phone sayılmıyor); OAuth aktarımı Md.5 listesinde yok | belge-kod çelişki (KVKK) | envanter C-7 (#3,#4) → KVKK paketi düzeltecek | 🟡 |
| **86** | `mentorVisibilityEnabled` **ölü/bağlanmamış PLG alanı** (default true, setter yok, hiçbir eşleşme sorgusunda filtre değil) — yarım özellik mi bilinçli mi | ölü-kod/karar | FAZ B (T7); `schema.prisma:283`, `userController.ts:177` | 🔵❓ PO |
| **87** | Onaylanan kalibrasyon önerisi scoring'de okunmuyordu (ölü yazma) | ölü-kod | 9b ile bağlandı | **✅ ÇÖZÜLDÜ CANLIDA — backend #52 (`838d128`)** — motor kaydedilen ağırlığı okur |
| **96** | **Tam anonimleştirme keşfi (madde 93+39 birleşik) — 🛑 DURAK-1 PO onayı bekliyor** — 3 salt-okuma ajan (2026-08-26): (A) `anonymizeUser` yalnız User/UserProfile/UserResponse'a dokunur; **8 serbest-metin alanı hiç temizlenmiyor** (`Message.content` NOT NULL → placeholder `[silindi]`; diğer 8 `String?` zaten nullable → migration YOK). Mesaj iki-taraflı: öneri = A'nın yazdığı içerik `[silindi]`, B'nin mesajları + iskelet kalır. (B) Fiziksel dosya: yalnız avatar (userId dosya adında sızıyor); `deleteLocalAvatar()` VAR ama `gdprService`'e **bağlı değil**; öneri = transaction SONRASI best-effort sil + hata log'la (rollback değil). (C) Kayıt anahtarı: ~13 Restrict-FK tablosu (userId NOT NULL) → hardDelete gerçekten patlıyor. Seçenekler: **(a)** SetNull migration (~22 kolon, riskli, karşı-taraf geçmişi bozar) · **(b)** Cascade sil (geçmiş yok olur) · **(c)** userId kalsın + tüm bağlı PII temizlensin (**migration YOK**, en ucuz; ama userId **deseni** kalır → "anonim mi pseudonim mi" = hukukçu **H-9**) · **(d)** pratik değil. madde 39: hardDelete'i anonymize'e yönlendir (migration'sız). **Önerilen paket: (c)+(2)+mesaj(iii)+avatar-log — MIGRATION YOK.** ⚠️ (c) seçilirse yasal metinde "tam geri-döndürülemez" vaadi **verilemez** (dürüst beyan kalır); yalnız (a) vaadi güçlendirir. | keşif/karar (KVKK, mimari) | AJAN A/B/C raporları (bu tur); `gdprService.ts`, `schema.prisma`, `avatarStorage.ts` | ✅ **CANLIDA (2026-08-26): PO KARARI 1·1·1 = (c)+(iii)+(2)** → backend **#54 → main `b433554`** (migration YOK) + KVKK metinleri (05/06/00-AVUKAT H-9, çatı #117). EK: hesap-kapatma "silindi" DEMEZ, token/oturum iptali (test). İki main CI yeşil. **Kalan H-9:** userId (cuid) bağı hukukçuya. Yeni iş: **madde 97** (FE) · küçük borç **98/99/100**. |

| **97** | **FE hesap-kapatma/anonimleştirme akışı YOK** — backend `anonymize`/`hard-delete` uçları ADMIN-only; kullanıcının kendi hesabını kapatabileceği (KVKK Md.11 hak-kullanım) FE ekranı yok. hardDelete anonymize'e yönlendirildiğinde gösterilecek onay/sonuç metni de FE'de yok. | yapılmamış-iş (KVKK FE) | grep: `frontend/src`'te silme/anonymize akışı 0 sonuç; madde 40/84 (KVKK FE üçlüsü) ile bağlı | ✅ **YAPILDI (2026-08-29, G1-05, backend PR #59 + çatı PR):** Self-servis uçlar + FE ekran. Backend: `GET /api/me/data-export` (userId TOKEN'dan → IDOR yapısal imkânsız; profil+rızalar+mesaj SAYISI, içerik yok) · `POST /api/me/delete-account` (e-posta teyidi → `hardDeleteUser` anonimleştirir; son-admin guard `isSoleActiveTenantAdmin` 409; ACIK_RIZA `revokeConsent` ile geri çekilir, satır silinmez). Kanıt: `gdprController.ts` (exportMyDataHandler/deleteMyAccountHandler), `gdprService.ts` (isSoleActiveTenantAdmin + anonymizeUser revoke), `userRoutes.ts` `/me/*`, test `tests/me-data-rights.test.ts`. FE: `DataPrivacySection.tsx` (indir + iki-adımlı onay), `lib/api/kvkk.ts`, profil sayfası altı. Onay metni ACCOUNT_CLOSED_MESSAGE korunur. **Kalan H-9** (userId-pseudonim) hukukçuda — bu iş kapsamı dışı. |
| **98** | **Kalibrasyon audit yazımı `void` (fire-and-forget)** — `logger.info('AUDIT', …)` beklenmez; DB yazımı hata alırsa "son değişiklik" izi **sessizce kaybolur** (KVKK Md.12 denetim kaydı için zayıf). | teknik-borç (KVKK denetim) | `adminController.setAlgorithmWeightsHandler` `void logger.info(...)`; `logger.ts` catch sessiz | 🔵 küçük (migration'sız; audit yazımını await + hata yüzeye çıkar) |
| **99** | **SystemLog 90 gün purge → "son değişiklik" izi 3 ay sonra kaybolur** — ağırlık özel kalsa bile aktör/eski→yeni izi `purgeExpiredData` ile silinir. PO kararı "iz tutulsun" idi (9a). | teknik-borç (KVKK/iz) | `gdprService.purgeExpiredData` 90g; `getLastWeightChange` SystemLog'a bağlı | 🔵 küçük (migration'sız; ağırlık değişim izini ayrı/kalıcı tut ya da AUDIT'i purge dışı bırak) |
| **100** | **`SystemLog.meta.tenantId` JSON-yol sorgusu indekssiz** — `getLastWeightChange` `meta path tenantId` ile filtreler; log büyüdükçe kalibrasyon sayfası yavaşlar (tam tarama). | teknik-borç (perf) | `algorithmTuner.getLastWeightChange`; `schema.prisma` SystemLog index'leri meta içermez | 🔵 düşük (GIN index veya ayrı audit tablosu — ileride) |
| **101** | **SJT/OCEAN katmanı canlı eşleştirmede OKUNMUYOR** — SJT → OCEAN + `rank-mentors` sıralaması hesaplanıyor ve UserProfile'a yazılıyor AMA canlı eşleştirme (`matching.ts`) bunu okumuyor → bağlanmamış paralel katman. Ayrıca `enneagramWing` yaz-ama-oku-yok. Bilinçli mi, bağlanacak mı? | ölü-kod/karar (içerik-keşfi bulgusu) | döküm §7/§13; `scoring.ts:163-166` yorum + grep (AJAN-5) | 🔵❓ PO · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |
| **102** | **CORE-eşiği tutarsızlığı** — `adaptiveTestEngine` sabit `MIN_CORE_RESPONSES=5` (canlı yol, çağrı zinciri kanıtlı) ↔ `questionService` dinamik tüm-CORE (ayrı tüketici). Tek akışta çakışmıyor ama hangi FE ekranı hangi ilerlemeyi gösteriyor **⏳ TEYİT GEREK (FE/uygulama)**. | tutarsızlık/teyit (içerik-keşfi) | döküm §12; `adaptiveTestEngine.ts:22` vs `questionService.ts:117,173` | 🔵 küçük · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |
| **103** | **Psikometrik gerekçe BELGELENMEMİŞ** — DISC uyum matrisi (16 değer), tiebreak D>I>S>C, %60/%40 ağırlık, anti-match, harf eşikleri (0.25/0.75) elle sabit; ampirik/teorik kaynak YOK (`discLetters.ts:23` "başlangıç değerleri, kalibre edilecek"). Uzman görüşü/pilot-veri kalibrasyonu iş kalemi mi? PO uyum tablosuna `eslesme-uyum-po-inceleme` ile karar verebilir. | teknik-borç/kalite (KVKK-otomatik-karar akrabası) | döküm §7; `scoring.ts:44-49`, `discLetters.ts` | 🔵❓ PO · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı (gerekçeler B9/B15) → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |

> **VERBİS teyidi + veri sorumlusu kimliği** = PO manuel (kod dışı); envanter [PO DOLDURACAK] alanlarında. **madde 39 (G2)** = KVKK silme migration'ı, F.1'de açık.

### F.2 — 🟡/🔵/❓ Yeni iş / karar / çelişki (takipte yoktu, kod-teyitli)
> **Yol-haritası numaraları (2026-08-23 verildi):** T1=**69** · T2=**70** · T3=**71** · T4=**72** · T5=**73** · T6=**74** · T7=**75** · T8=**76** · T9=**77** · T10=**78** (10-yol `v1-H`). G1=madde 38, G2=madde 39 (mevcut), G3=68.

| Kod | İş | Tür | Kanıt | Boy | Migr |
|---|---|---|---|:---:|:---:|
| T1 (madde 69) | Zod VALIDATION yanıtında `message` yok → generic "Hata" | ✅ **CANLIDA (#51, `b4b6d66`)** | `questionController.ts` (`firstValidationMessage`; FE zaten `message` okuyor → FE değişikliği YOK) | S | Hayır |
| T2 (madde 70) | adaptive-test backend `progress` döndürmüyor | ✅ **CANLIDA (#51 backend + #114 FE guard)** | `adaptiveTestEngine.ts` `computeProgress` + FE `DailyQuestionWidget` guard kaldırıldı (çatı #114 `6e6e798`) | M | Hayır |
| T3 | `SuspicionReport`'ta `tenantId` yok → raporlar global, tenant-izolasyon boşluğu | açık-soru/güvenlik | `platformController.ts:348-356` | S | Olası |
| T4 | Sertifika baraj "0 puan" kuralı yalnız `isRedLine`'da kodlanmış; "tüm sorularda mı" kararı yok | verilmemiş-karar | `certification.service.ts:67` | S | Hayır |
| T5 | `seed-certification.ts` runner'a bağlı değil → 20-senaryo bankasını canlıya **güvenli** taşıma yöntemi yok (**madde #30'u BLOKLAR**) · **⚠️ GÜNCELLEME (2026-08-26, KEŞİF): TEYİTLİ** — `seedCertification()` yalnız TEHLİKELİ `prisma/seed.ts:507`'den çağrılır (`npm run seed` = `deleteMany` içerir). Fonksiyon kendisi güvenli (upsert) ama izole güvenli runner YOK. Detay: `../raporlar/icerik/bolumler/03-sertifika.md`. | `package.json` (tek seed = `prisma/seed.ts`) | M | Evet |
| T6 | `superAdminRoutes` mount edilmiş ama FE'de 0 kullanım → paralel/ölü platform-admin API'si | ölü-kod/karar | `server.ts:12,105` + FE "super-admin" → yok | S | Hayır |
| T7 | Mentör **görünürlük opt-in** FE ekranı bağlı değil (backend `setVisibilityOptIn` var) | yapılmamış-iş | backend var; FE çağrısı → yok | M | Hayır |
| T8 | Sıfırdan manuel eşleştirme: envanter "eksik" ↔ strateji "elle eşleştirme YASAK" → **🗑️ ÇÖZÜLDÜ (PO 2026-08-27, G4-03)** | ✅ karar-verildi | **PO: manuel eşleştirme YOK — algoritma seçenek sunar, mentör+menti kendi tercihleriyle görüşme kurar; strateji belgesi geçerli, envanter "eksik" kaydı YANLIŞ.** Ç5 çelişkisi kapandı | `stk-panel-envanteri:71,148` ↔ `stk-strateji:67` | M | Hayır |
| T9 | Platform tek-kullanıcı profil drill-down endpoint'i yok (üye listesi var, kişiye inilmiyor) | yapılmamış-iş | `platform.ts` (üye var, `/users/:userId` yok) | M | Hayır |
| T10 | Mentör emeği görünür kılma (takdir/rozet/"yılın mentörü") — persona-kaynaklı, hiç yok | yapılmamış-iş | `mentor-persona:83-86`; kodda rozet → yok | M | Olası |

### F.3 — 📄 Bayat belge notu (ayrı hijyen turu)
- `raporlar/icerik/` 6 belgesi + `disc-sorulari` **var olmayan `seed-questions.ts`'e dayanıyor** (silindi #45); gerçek kaynak `seed.ts`=32 soru → bu belgelere ⚠️ GÜNCELLEME notu gerek.
- ~25 "belge açık diyor, kod yapmış" bayat-not adayı (kesif/panel/konu belgeleri) → tam liste tarama raporunda Bölüm 3. Kaynak belgelere ⚠️ notu düşülecek (silme yok).

### F.4 — ❓ Sonraki turda kod-teyidi bekleyen (bu tur okunmadı)
N+1 konuşma listesi · pagination'sız listeler · a11y (modal/label/radiogroup) · DISC light WCAG · onay/red maili başvurana gidiyor mu · KARAR 6 davet→oto-onay tetiği · `maxMeetingsPerWeek` enforce · profile-completeness uçtan uca bağı. (uydurma yok — TEYİT GEREK)

> **⚠️ Numara notu (✅ 2026-08-23 çözüldü):** F maddeleri numaralandı (G3+T1-T10 → **68-78**, `v1-H`). **#38 çakışması çözüldü:**
> **madde 38 = güvenlik `updateUser`** (sayı dizisinde KALIR, canonical) · B.4'teki DISC işi artık numarasız **"DISC-DERİNLEŞME kurgusu"** adıyla anılır (sayı dizisinden çıkarıldı). Sonraki yeni iş: **79'dan** başla.

---

### F.6 — 🆕 2026-08-26 BELGE BİLANÇOSU numara adayları → NUMARALANDI (104-124)

> **Kaynak:** 4-turluk belge bilançosu (`../raporlar/bilanco/belge-bilancosu-2026-08-26.md` §3 + `karar-defteri-2026-08-26.md`).
> Bilançoda numarasız yakalanan gerçek açık işler burada numaralandı (KURAL 8: numara YALNIZ burada doğar). **Numara = İZLENEBİLİRLİK, öncelik DEĞİL.**
> **PO talimatı (2026-08-26):** Hepsinin durumu **⬜ AÇIK (PO önceliklendirmedi)** — hiçbirine öncelik/aciliyet atanmadı, sıraya sokulmadı.
> Numara sırası = bilançoda kataloglanma sırası (öncelik değil). `madde-104` ≠ PR `#104` (ayrı ad-uzayı). Öncelik verilene dek
> **`10-yol-haritasi.md`'ye EKLENMEZ** (KURAL 8 adım 3: roadmap satırı yalnız öncelik verilince). "gerçek tür" = kalemin bilanço defterindeki
> olgusal iş-durumu (açık/yarım/teyit/belge-fix); PO-önceliklendirmesi bundan bağımsızdır.

| No | İş (tek cümle) | durum | gerçek tür | kaynak (bilanço) | NİYET | NEREDE DURDU |
|:---:|---|:---:|:---:|---|---|---|
| 104 | Bekleme salonu bildirim izni (`Notification.requestPermission`) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T2-C(A7)/T3-B(C-3)/T4-A2 | Bekleme retention — menti bekleme salonunda sessizce kaybolmasın, bildirimle geri çağır ("en kritik UX") | grep 0 dosya (`frontend/src`'te `requestPermission` yok); kodlanmamış |
| 105 | Kullanıcı→ürün geri bildirim mekanizması (her sayfa "Bildir"→mail) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T1-B2(05:55)/T2-B(E24)/T4-A1(E21) | Kullanıcı ürün hakkında geri bildirim verebilsin | `SuspicionReport` DB'ye yazar ama MAİL GÖNDERMİYOR; genel "Bildir" akışı yok |
| 106 | Onboarding şablon-seçim ekranı ("Mezun/Gönüllü/Kulüp") | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A2 | "Terk-oranını en-çok-düşüren ekran" (kayıtta rol/şablon seçimi) | grep: şablon-seçim ekranı yok |
| 107 | Menti/mentör tarafı retention "sevdirme"/onboarding-aha deneyimi | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A1(E36)/T2-D(persona) | Persona-temelli sevdirme; kullanıcı ürüne bağlansın | Yalnız STK-yönetici dilimi yapıldı; menti/mentör sevdirme izi yok |
| 108 | Mentör karar ekranında menti CHAT ilk mesajı görünsün | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A1(E29) | Mentör görüşme kararı verirken menti'nin ilk mesajını görsün ("KALICI İŞ") | Ön-koşul (chat) ✅ ama Conversation↔Meeting FK yok; ekran inşa edilmedi |
| 109 | Menti P1 DISC "özgüven aşısı" sunumu | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T2-D(menti:80) | Menti-yönü özel "değerlisin" sunumu | Menti-yönü özel sunum yapılmadı; DURUŞ SEBEBİ YOK |
| 110 | "Görüşme tamamladım 🎉" paylaşım kartı (DISC-kartından ayrı) | ⬜ AÇIK (PO önceliklendirmedi) | 🟡 | T4-A2 | Görüşme sonrası paylaşılabilir kutlama kartı | DISC-sonuç paylaşım kartı VAR; görüşme-paylaşım kartı grep yok |
| 111 | "Varsayılana düşen profil oranı" izleme metriği | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A2 | Psikometrik kör-nokta: kaç profil varsayılan/nötr'e düşüyor (madde 103 akrabası) | grep boş; metrik yok |
| 112 | Profil-düzenleme keşfi (kayıt-sonrası bilgi/foto güncelleme yeteneği var mı) | ⬜ AÇIK (PO önceliklendirmedi) | ❓ | T4-A1(E34) | Kullanıcı kayıttan sonra bilgisini/fotoğrafını güncelleyebilmeli | PLANLA keşfi hiç yapılmamış (gerçek tür ❓: önce kod-keşif) |
| 113 | `PATCH /users/me/social` bağlanmamış endpoint | ⬜ AÇIK (PO önceliklendirmedi) | ❓ | T2-C | **NİYET HİÇBİR BELGEDE YOK** (NİYET BELGELENMEMİŞ) | `onboardingController.ts:461` bağlanmamış; bilinçli terk mi bağlanacak mı = PO |
| 114 | `SjtQuestion`/`SjtOption` tabloları 0 prisma query | ⬜ AÇIK (PO önceliklendirmedi) | ❓ | T2-C(1.A) | SJT tabanlı profil (alternatif psikometri yolu) | `schema.prisma:889,906` 0 query; ölü-tablo mu SJT-genişletme mi = PO (DURUŞ SEBEBİ YOK) |
| 115 | Kurumlar-arası "sosyal kanıt" duvarı + paylaşılabilir kurum "Etki kartı" | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A2 | B2B2C viral büyüme (kurumlar birbirini görsün, etki kartı paylaşılsın) | grep: kamuya-açık kurum-duvarı/etki-kartı FE yok |
| 116 | Mentör/menti-kaynaklı "ters çekim" bottom-up büyüme kanalı | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A2 | Kullanıcı-kaynaklı büyüme kanalı (multi-tenant altyapı hazır) | Kanala çevrilmedi |
| 117 | Premium "kilitli görünür" + `Tenant.plan/limits` freemium altyapısı | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T1-B2(01:18)/T2-C/T4-A2 | Freemium iş modeli (bazı özellikler premium'da açılsın) | Şema alanı var; uygulama-mantığı yok |
| 118 | Global içerik seed'i ana Neon'a uygula (DISC/LearningJourney "boş" görünüyor) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T2-B(:10/:86)/T4-A2/T4-A1(A8) | Canlıda içerik dolsun (seed eksik görünüyor) | ⚠️ **CANLI DB YAZIMI → PO onayı ZORUNLU** (canlı=lokal aynı Neon); canlı sayı ⏳ DB-teyit |
| 119 | k-anonimlik (super-admin küçük-grup metrik yuvarlama) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A2 | KVKK-agregat borcu: küçük grupta yeniden-tanımlanma riski | grep boş; iz zayıf |
| 120 | Sunucu/altyapı sertleştirme (Dokploy HTTP/firewall/SSH/SSL/yedek) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ (KOD DIŞI) | T1-B2/T3-B/T4-A1(E15)/T4-A2 | Canlı-öncesi altyapı güvenliği | Hiç ele alınmadı; kod-dışı altyapı, önceden aksiyon-numarası yoktu |
| 121 | `backend/.env.backup-anaDB` sil (env geçişi bitince) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T2-B(depo:25) | Env geçişi bitince yedek dosyayı temizle | Dosya HÂLÂ VAR (`ls` teyit) |
| 122 | `PROJECT_STATUS.md` DEPRECATED → arşivle + 09-DURUM'a yönlendir | ✅ YAPILDI (2026-08-28, Faz 1a/G9-09) | ⬜ (belge-hijyen) | T2-B(:207) | Bayat onboarding belgesi güncel durumla karışmasın | ✅ `docs/arsiv/PROJECT_STATUS.md`'e taşındı (git mv) + CLAUDE.md:16 → 09-DURUM canonical; INDEX güncel |
| 123 | INDEX eksik (raporlar/arsiv büyük ölçüde INDEX'te yok) + ~29 belgede üst-etiket eksik | ✅ YAPILDI (2026-08-28, Faz 1a/G9-10) | ⬜ (belge-hijyen) | T2-B(:210)/T1-B3 | Belge haritası tam olsun (Kural 5) + 🔄/📸 üst-etiket | ✅ INDEX'e G1-G11+OKUMA-REHBERI+eslestirme-motoru+arsiv/icerik eklendi; 4 non-kvkk belgeye üst-etiket. ⚠️ kvkk-metinleri/ (10) DOKUNULMADI (yasal); tam top-label denetimi büyük reorg (G9-11/12) |
| 124 | `backend/CLAUDE.md` bayat onboarding düzeltmesi (5-model↔38, iceBreaker/matchReason yok, LLM içsel çelişki) | ✅ YAPILDI (2026-08-27) | belge-hijyen (grep-kanıtlı) | T3-C(B1-B6) | Ajanlar her oturum okuyor; yanlış zihinsel model riski | ✅ **backend PR #55** (backend/CLAUDE.md: 38 model, silinmiş dosyalar çıkarıldı, LLM tek ifade, llmRateLimiter kaldırıldı, etiket 50→80) + çatı PR (kök CLAUDE.md env-notu "İrlanda"→Londra). Tüm düzeltmeler grep-kanıtlı |

> **Not (dürüstlük):** Yukarıda "gerçek tür" sütunu, kalemin bilanço defterindeki olgusal iş-durumunu korur (🟡 yarım / ❓ teyit-karar /
> belge-hijyen). PO talimatı gereği **statü sütunu hepsi için ⬜ AÇIK (PO önceliklendirmedi)** — bu bir öncelik değil, "PO henüz sıraya
> koymadı" demektir. `118` canlı DB yazımı içerir (seed) → yapılırsa PO onayı ZORUNLU. Sonraki yeni iş numarası: **125'ten** başla.

### F.7 — 🆕 2026-08-27 EŞLEŞTİRME MOTORU KEŞFİ numara adayları → NUMARALANDI (125-130)

> **Kaynak:** `../raporlar/kesif/eslestirme-motoru-kesfi-2026-08-27.md` §9 KALEM LİSTESİ (tasarım-tezi öncesi son keşif).
> KURAL 8: numara YALNIZ burada doğar. **PO talimatı (2026-08-27):** hepsi **⬜ AÇIK (PO önceliklendirmedi)** — öncelik/sıra YOK, `10-yol`'a EKLENMEDİ.
> Keşifteki kalemlerin çoğu zaten G2 karar dosyasında/madde 101-103'te kart → onlar için YENİ numara açılmadı (raporda "G2-XX'de var" referanslı). Aşağıdakiler **yeni** (G2'de yok).

| No | İş (tek cümle) | durum | gerçek tür | kaynak | NİYET | NEREDE DURDU |
|:---:|---|:---:|:---:|---|---|---|
| 125 | `triggersOn` ölü alan — SJT adaptif tetikleme (boyut belirsizse o boyutun FOLLOWUP'ını aç) okuyan kod YOK | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | keşif §6.1 | Boyut-belirsizliğini kapatan derinleşme mekanizması (havuzu adaptif büyüt) | Veri modelinde tanımlı (`schema.prisma:896`, `seed.ts`) ama hiçbir servis okumuyor (grep `triggersOn` src boş); okuyucu katman yazılmadı. madde 101 akrabası, ayrı mekanizma · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı (B6 derinleşme) → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |
| 126 | `answeredFollowup` tablosu şemada YOK ama `profile-completeness.service.ts:44-50` onu sorguluyor (try/catch gizliyor) | ⬜ AÇIK (PO önceliklendirmedi) | ❓ | keşif §6.6 | SJT-followup tamamlanma takibi | Tablo hiç oluşturulmadı; kod try/catch ile fallback'e düşüyor → followup takibi yarım. Ölü-tablo mu, migration mı = ❓ · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı (B6 derinleşme) → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |
| 127 | PendingTag **kullanıcı-öneri (producer)** akışı FE'de bağlı değil → onay kuyruğu kod-yoluyla dolmuyor | ⬜ AÇIK (PO önceliklendirmedi) | 🟡 | keşif §4 | Kullanıcı yeni etiket önersin, admin onaylasın/birleştirsin (talep-onay havuzu) | Admin tarafı TAM bağlı (`admin/tags/page.tsx`); `tags/suggest` FE'de çağrı YOK (grep boş). approve yalnız öneren kişiye yazıyor; `Tenant.globalTags` planlı, şemada yok. KARAR 12/sektör-etiket-havuzu akrabası · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı (B9.4 sektör/etiket) → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |
| 128 | Eş-anlamlı/normalize etiket otomasyonu YOK (yazılım↔software ayrı etiket, skorda eşleşmez) | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | keşif §4 | Etiket kesişim skorunun eş-anlamlıları yakalaması (isabet artışı) | grep synonym/alias/stem boş; tek birleştirme = admin manuel `array_replace` merge. `toLowerCase()` locale-duyarsız (Türkçe İ/ı). Hiç otomasyon yazılmadı · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı (B9.4 çatılı eşleşme) → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |
| 129 | `konu/03-psikometri-ve-algoritma.md:41` "sector-scorer stub, nötr 50 dönüyor ⏳" satırı BAYAT (kod 5-bileşen TAM) | ⬜ AÇIK (PO önceliklendirmedi) | 🗑️ (belge-hijyen) | keşif §5c/§7.3 | — (bayat belge notu, ⚠️ GÜNCELLEME gerek, silme yok) | `sector-scorer.service.ts` tam yazılmış ("return 50" grep boş); belge hâlâ "stub" diyor → belge güncellenmedi · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı (B9.4) → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |
| 130 | IndustryNode taksonomi ağacı seed durumu ❓ — ağaç boşsa 5-bileşen A (taksonomi %30) hep 0 döner | ⬜ AÇIK (PO önceliklendirmedi) | ❓ (DB-teyit) | keşif §8 | Sektör kodları hiyerarşik ağaçta yakınlık ölçsün (LCA çatı-eşleşme) | `taxonomy.service` çalışır ama ağaç/`industryCode` atamaları seed'li mi DB'ye sorulmadı (kural). Boşsa sector-scorer bağlansa bile A bileşeni etkisiz · ⚠️ GÜNCELLEME (2026-08-28): tasarım belgesinde ele alındı (B9.4 IndustryNode/LCA) → `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` |

> **Not:** Keşifte G2/101/102/103'te ZATEN kart olanlar (canlı basit-sektör-skoru, %60/40 gerekçe, matris/anti-match/tiebreak gerekçe,
> SJT/OCEAN okunmuyor, CORE-eşiği, qualityMultiplier-görünürlük, varsayılana-düşen-oran, sektör-5-bileşen-ağırlık-onayı) için YENİ numara AÇILMADI.
> Sonraki yeni iş numarası: **131'den** başla.

---

## G. 📌 NASIL KULLANILIR (bu belgenin kendi kılavuzu)

1. **Her oturum başında** bu belge OKUNUR; ajan ürün sahibine açık maddeleri (🔴/🟡/🔵/❓) proaktif hatırlatır.
   Ürün sahibi "arkada ne kaldı" diye sormak zorunda kalmamalı — ajan söyler. *(Kural: `CLAUDE.md` "Karar-Takip Disiplini".)*
2. **Bir iş bitince** ilgili satır ✅'a çekilir + D bölümüne taşınır — **AMA önce KOD GERÇEĞİYLE doğrulanır**
   (grep/dosya). Belge asla "yapıldı" demez, kod öyle demedikçe. Doğrulanamıyorsa "❓ TEYİT GEREK".
3. **Yeni karar alınınca** buraya 🔴 satır EKLENİR (karar alındı ama yapılmadı = görünür kalır, unutulmaz).
4. **Bu belge ↔ 09-DURUM/10-yol ilişkisi:** bu belge = "**ne kaldı**" görünürlüğü (açık iş/ölü kod/karar tek bakışta) ·
   `09-DURUM` = "**şu an ne oldu**" anlatısı · `10-yol-haritasi` = öncelikli sıra · `10-yol-tamamlananlar` = biten v1.
   Çelişkide **KOD kazanır**, sonra bu belge düzeltilir (silme yok — `belge-duzeni-rehberi` Kural 6).
