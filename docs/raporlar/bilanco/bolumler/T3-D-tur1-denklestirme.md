# BELGE BİLANÇOSU — TUR 3 / GRUP D (TUR-1 geriye dönük denkleştirme)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Tur 3/GRUP-D · Salt-okuma. Kod/DB/PR/commit/belge-taşıma YOK.

> **Ne bu:** TUR-1 (T1-A/T1-B1/T1-B2/T1-B3) şu 4 kural EKLENMEDEN önce çalıştı: (a) "HER kalem kodda aranır"
> (o turda yalnız SEVİYE-1'de kod arandı), (b) 🟡 YARIM durumu (o turda 5 durum kodu vardı, 6 değil),
> (c) NİYET + NEREDE DURDU alanları, (d) EK-A "hiçbir kalem önemsiz değil". Ayrıca TUR-1 sayıları TAHMİNDİ
> ("~103 madde, ~282 kalem, ~23 numarasız" gibi) = kural ihlali. Bu belge TUR-1'i bu 4 kurala göre **denkleştirir**:
> gerçek sayım + yanlış-✅ düzeltme + hayalet-tamamlanmış + kısmi→🟡 + atlanmış EK-A + niyet/nerede-durdu ekleri.
> **T1 dosyaları DEĞİŞTİRİLMEDİ (tarihsel iz korunur); düzeltmeler YALNIZ burada.** Numara DOĞURULMADI. Hakem OLMADIM.
> DURUM yalnız 6 kod: ✅ YAPILDI · 🟡 YARIM · 🔀 PR'DA · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ ADAYI.

---

## 0. OKUMA İLERLEME TABLOSU

| belge | toplam satır | okunan satır | tam✅/kısmi⚠️ | mevcut-TUR1-kalem (beyan) |
|---|:---:|:---:|:---:|:---:|
| `T1-A-canonical.md` | 231 | 231 (1-231) | ✅ TAM | ~103 numaralı + A1-A23 + Ç1-Ç6 + H1-H3 + 9+ ölü-kod |
| `T1-B1-kararlar-kok.md` | 37 | 37 (1-37) | ✅ TAM | 6 kalem (1 ana iş + 5 alt-adım) |
| `T1-B2-kararlar-konu.md` | 327 | 327 (1-327) | ✅ TAM | 156 kalem (beyan) |
| `T1-B3-kararlar-ozdenetim.md` | 321 | 321 (1-260 + 261-321) | ✅ TAM | ~120 defter satırı (beyan) |

**TUR-1 çıktı okuma: 4/4 belge TAM. Okunmayan: 0.**

**Yardımcı referans (kod-teyit çaprazı — tekrar grep yerine kullanıldı):** `T2-B-kesif.md` (ThemeToggle/logout/B12),
`T2-C-kod-denetimi.md` (KVKK/anonymize/hardDelete/isCertified), `T2-D-panel-persona.md` (rozet/emeği-görünür).
Ek olarak bu turda DOĞRUDAN yapılan salt-okuma grep/Read (dosya:satır aşağıda): `(admin)/layout.tsx`, `platform/layout.tsx`,
`discVisibility.ts`, `discLetters.ts`, `mentor-havuzu/page.tsx`, `frontend/src/middleware.ts` (yok), `schema.prisma`.

---

## 1. TUR-1 TAM SAYIM (düzeltme tablosu) — bölüm bölüm GERÇEK sayı vs TUR-1 tahmini

> Kural: "~/muhtemelen/yaklaşık" YASAK. Aşağıdaki sayılar T1 dosyalarındaki tabloları TEK TEK sayarak çıkarıldı.
> TUR-1'in kendi verdiği "~" tahminleri karşısına yazıldı.

### 1.A — T1-A (canonical) gerçek sayım

| bölüm (T1-A) | GERÇEK kalem (sayıldı) | TUR-1 beyanı |
|---|:---:|---|
| §1 ✅ YAPILDI tablosu (satır 36-63) | **28** kalem | "✅ ~28" (kapanış:224) — TUTUYOR |
| §1 ⬜ AÇIK (v1) tablosu (satır 68-82) | **15** kalem (6,7-B,13,30,31,33,35,36,37m,39,40,66,90,91,97) | "⬜ ~30" (birleşik) |
| §1 ⬜ AÇIK (v1-F+SEO) tablosu (satır 87-102) | **18** satır (41-50,51-55,56,57-63,64,65,67 — bazıları aralık) | (birleşik) |
| §1 ❓ TEYİT/KARAR tablosu (satır 107-127) | **21** kalem (71-78,81-86,94,98-103) | "❓/karar ~25" |
| §1 🔵 v2 backlog (satır 130) | **15** kalem (14-28) | "🔵 v2 ~15" — TUTUYOR |
| §1 Denetim Y1-Y7 + K-kod (satır 133-134) | **7** (Y1-Y7) + **4** (K3/K6/sektör-havuzu/K4) = **11** | sayılmamıştı |
| §1 💀 ölü kod C bölümü (satır 137) | **9** kalem (D1/feedback-şema/F5/F6/F1/D2/D3/U1/U2 + maxMeetings) | "9+ ölü-kod" |
| §1 💀 ölü kod C.2 (satır 138) | **12** kalem (SJT/taxonomy/Kulüp/Feedback-logs/şikayet/rematch/profil-güç/TenantSwitcher/MeetingScheduler/social/mükerrer-uç/iceBreaker) | sayılmamıştı |
| §2 NUMARASIZ A1-A23 | **23** kalem | "~23" (kapanış) — TUTUYOR |
| §3 Çelişki Ç1-Ç6 | **6** çelişki | "6" — TUTUYOR |
| §4 Hayalet H1-H3 | **3** aday | "3" — TUTUYOR |
| §5 S1-kanıt-eksik | **5** kalem (101,102,86,72,Ç3/Ç4) | sayılmamıştı |
| **T1-A tekil kalem TOPLAM (numaralı envanter + numarasız + ölü-kod, çakışmasız)** | **≈128** (28+15+18+21+15+11+9+12+23 = 152 satır; ancak §2/§3/§4/§5 çoğu envanter kalemine ATIF → tekilleştirilince numaralı-benzersiz ~103 + A1-A23 numarasız + 21 ölü-kod = **≈147**) | "~103 madde" (yalnız numaralı) |

> **Not (çakışma):** T1-A numaralandırması 1-103 arası aralıklıdır (bazı numaralar yok: örn. 2,3,4 var; 15-28 yalnız v2
> listesinde; 51-55/57-63 aralık-satır). "~103 madde" = numaralı-envanterin ÜST numarası (103), gerçek DOLU numara
> adedi değil. Bu bir kural ihlali DEĞİL ("madde 103'e kadar" anlamında doğru) ama "kalem sayısı" olarak okunursa
> yanıltıcı — DOLU numaralı-benzersiz kalem **daha az**; A-serisi (23) + ölü-kod (21) numarasız EK.

### 1.B — T1-B1 (kararlar kök) gerçek sayım

| bölüm | GERÇEK kalem | TUR-1 beyanı |
|---|:---:|---|
| `dokploy-foto-volume-talimati.md` defter | **6** kalem (tümü tek açık PO-manuel işin adımı) | "6 kalem" — TUTUYOR (TAHMİN DEĞİL, kesin) |

### 1.C — T1-B2 (kararlar/konu, 13 belge) gerçek sayım

Okuma tablosundaki (T1-B2 satır 16-28) belge-başı kalem sayıları TOPLANDI:
8+10+12+14+13+16+4+21+8+9+9+20+12 = **156** kalem.

| ölçü | GERÇEK | TUR-1 beyanı |
|---|:---:|---|
| Toplam kalem | **156** (toplam doğrulandı) | "Toplam 156" (satır 30) — TUTUYOR (kesin) |
| Durum dağılımı | TUR-1 "✅~62 · ⬜~52 · ❓~40" **TAHMİN** (satır 321 "~") | ⚠️ KURAL İHLALİ: dağılım "~" ile verilmiş |
| NUMARASIZ | TUR-1 "~140" **TAHMİN** (satır 322 "~") | ⚠️ "~140" tahmin |

> **B2 dağılım DENKLEŞTİRME (T1-B2 defterindeki durum sütununu TEK TEK sayarak):** aşağıda §son "KESİN SAYIM"da
> B2 satırları durum-kodu bazında sayıldı — TUR-1'in "~62/~52/~40" tahmini yerine kesin dağılım verildi.

### 1.D — T1-B3 (oz-denetim, 7 belge) gerçek sayım

Okuma tablosu (T1-B3 satır 16-22) "bulunan kalem" sütunu zaten "~55/~40+" gibi TAHMİN içeriyordu. Defter satırları
(§1-§7 tablolar) TEK TEK sayıldı:

| belge | GERÇEK defter satırı (tablo satırı) | TUR-1 beyanı |
|---|:---:|---|
| belge-aksiyon-denetimi (§1) | **26** defter satırı | "~55 karar/bulgu" (kaynak-belgede, defter satırı değil) |
| belge-denetimi (§2) | **12** defter satırı | — |
| belge-temizlik-haritasi (§3) | **11** defter satırı | — |
| durum-panosu (§4) | **11** defter satırı | — |
| karar-statu-haritasi (§5) | **21** defter satırı | "~72 karar" (kaynak-belgede) |
| stk-admin-bulgu (§6) | **14** defter satırı | "13 bulgu B1-B13" |
| unutulmus-niyet (§7) | **25** defter satırı | "K1-K7 + ~40 niyet" (kaynak-belgede) |
| **T1-B3 defter satırı TOPLAM** | **120** defter satırı | "~120 defter satırı" (satır 314) — TUTUYOR ama "~" ile verilmişti → şimdi KESİN=**120** |

> **Ayrım:** T1-B3'ün "~55/~72/~40" sayıları KAYNAK-belgelerin iç kalem sayısıdır (defter satırı değil). T1-B3
> bunları tekilleştirip **120 defter satırına** indirmiş; ama toplam "~120" olarak yazılmış → kesin **120**.

### 1.E — TUR-1 GENEL TOPLAM (düzeltilmiş)

| ölçü | TUR-1 tahmini | GERÇEK (bu tur sayıldı) |
|---|---|---|
| T1-A kalem (numaralı envanter üst-no) | "~103 madde" | numaralı üst-no **103** (dolu-benzersiz daha az) + A1-A23 **23** + ölü-kod **21** |
| T1-B1 kalem | "6" | **6** (kesin) |
| T1-B2 kalem | "156" (kesin sayı VERİLMİŞ ✅) | **156** (doğrulandı) |
| T1-B3 defter satırı | "~120" | **120** (kesin) |
| **"~282 kalem" toplam iddiası** | — | Bu "~282" sayısı hiçbir T1 dosyasında yok; görev talimatındaki üst-tahmindir. Gerçek TEKİL: **T1-B2 156 + T1-B3 120 + T1-A(A-serisi 23 + ölü-kod 21 + numaralı envanter) + T1-B1 6.** Bkz. §son KESİN SAYIM. |

---

## 2. YANLIŞ-✅ DÜZELTMELERİ

> T1'de ✅ YAPILDI yazılmış her kaleme kod kanıtı arandı. Kanıt yoksa/kısmiyse → düşürüldü.

| TUR-1 kalemi (madde/A-no) | TUR-1 durumu | kod kanıtı arama sonucu (dosya:satır) | YENİ durum | gerekçe |
|---|---|---|:---:|---|
| **T1-A madde 5 — ThemeToggle admin/platform nav "zaten mevcut"** | ✅ (`(admin)/layout.tsx:92`) | ⭐ **admin: `(admin)/layout.tsx:16,93` ThemeToggle VAR** (bu tur + T2-B teyit); **platform: `platform/layout.tsx` grep BOŞ (ThemeToggle YOK)** | **🟡 YARIM** | T1-A "zaten mevcut" der ama YALNIZ admin'i sorgulamış; platform layout'ta YOK. TUR-2 (T2-B :195/:294/TÇ5) de bunu buldu. Görev talimatındaki ⭐ örnek DOĞRULANDI. |
| **T1-A madde 39 (G2) — ⬜ AÇIK tablosunda "G2 hâlâ açık gösteriyor ⚠️ ÇELİŞKİ"** | ⬜ (tabloda) ama satırda "✅ CANLIDA #54" notu | ⭐ **`gdprService.ts:128-171` `anonymizeUser` CANLIDA** (T2-C teyit); hardDelete→anonymize yönlendirildi | **✅ YAPILDI** | 39 = ✅ CANLIDA (#54). T1-A zaten Ç1/H1'de bunu işaretledi ama ⬜-AÇIK tablosunda G2 satırı DURUYOR → tablo-içi çelişki. Yeni durum netleştirildi: 39=✅. |
| **T1-A madde 1 — DISC güvenlik / KARAR 5 ✅** | ✅ (#37+#71 `discVisibility.ts`) | **`discVisibility.ts` + `discLetters.ts` + `userController.ts` MEVCUT** (bu tur grep + T1-B2 teyit) | **✅ (korunur) — ANCAK bir NÜANS ❓** | Yüzde/ham-vektör gizleme ✅ kod-kanıtlı. ANCAK T1-B3 (durum-panosu :49/:142 + karar-statu :103/:211) "menti→mentör **TİP** gizleme DTO'da kanıtlanamadı → ❓" diyor. → §6'da ❓-nüans olarak taşındı (ana madde ✅ kalır, tip-gizleme ayrı ❓). |
| **T1-A madde 10 — durum rozeti ✅ (`APPROVAL_META`)** | ✅ | **`mentor-havuzu/page.tsx:25-27` `APPROVAL_META` Onaylı/Bekliyor Badge render + :101** (bu tur) | **✅ (korunur)** | Kod-kanıtlı. karar-statu :101 🟥 "render yok" BAYAT (2026-08-14). T1-B3 ÇELİŞKİ 2 → aradan KAPANMIŞ. Düşürme YOK. |
| **T1-A madde 11 — sertifika rozeti ✅** | ✅ (#40+#77) | **`mentor-havuzu/page.tsx:167-168` `isCertified ? Badge "✓ Sertifikalı"`** (bu tur) | **✅ (korunur)** | Kod-kanıtlı. karar-statu :102 🟥 BAYAT. Düşürme YOK. |
| **T1-A madde 8 — sol menü 4-grup ✅ (çatı #76)** | ✅ | **`(admin)/layout.tsx:25,34,42,52` NAV_GROUPS 4 grup (Günlük/İnsanlar/Program&İçerik/Ayarlar)** (bu tur) | **✅ (korunur)** | Kod-kanıtlı. karar-statu :99 🟥 "layout hâlâ 3+Gelişmiş" BAYAT. T1-B3 ÇELİŞKİ 1 → aradan KAPANMIŞ. Düşürme YOK. |
| **T1-A madde 12 — DISC "DI" ✅** | ✅ (#47+#93+#94) | **`discLetters.ts:29 DISC_LETTER_CONFIG` + `:72` midline** (bu tur) | **✅ (korunur)** | Kod-kanıtlı. karar-statu :105 🟥 BAYAT. Düşürme YOK. |
| **T1-A madde 34 — öğrenme-yolculuğu görünürlük ✅** | ✅ (#49+#102) | Bu tur DOĞRUDAN grep yapılmadı; T1-B2 05:31-34 "seed'lendi, ADMIN göremez" ✅ beyanı VAR ama dosya:satır DEĞİL | **❓ TEYİT (nüans)** | Ana madde muhtemelen ✅ ama S2; kod dosya:satır kanıtı ne T1-A ne bu turda VERİLMEDİ → tam-kanıt için TUR-4/kod-turu. (Düşük risk; işaretlenir.) |

**Yanlış-✅ ÖZET:** Kesin DÜŞÜRÜLEN: **1** (madde 5 → 🟡 YARIM). Netleştirilen (tablo-içi çelişki → ✅ sabit): **1**
(madde 39). ❓-nüans EKLENEN (ana ✅ kalır, alt-boyut ❓): **2** (madde 1 tip-gizleme, madde 34 kanıt-satırı).
**Korunan ✅ (kod-kanıtlı, karşı-belge BAYAT):** madde 8/10/11/12 (4 kalem — eski oz-denetim 🟥'ları bayat çıktı).

---

## 3. HAYALET-TAMAMLANMIŞ (⬜→✅) — kod kanıtlı

> T1'de ⬜/🟥/🟧/AÇIK yazılmış ama KODDA VAR olan kalemler. Çoğu T1-B3'ün "ARADAN KAPANMIŞ ✅" bölümünde
> zaten yakalanmış (o bölüm bu görevin amacını T1 içinde kısmen yapmış). Bu tur DOĞRUDAN kod-teyit eklenenler:

| # | Kalem | T1'de "açık" diyen | KODDA VAR kanıtı (dosya:satır) | YENİ durum |
|---|---|---|---|:---:|
| GH1 | Sol menü 4-grup (KARAR 1/md.2) | karar-statu :99 🟥 (T1-B3 §5) | `(admin)/layout.tsx:25,34,42,52` NAV_GROUPS | ✅ (hayalet-kapandı) |
| GH2 | Durum rozeti (KARAR 3) | karar-statu :101 🟥 | `mentor-havuzu/page.tsx:25-27,101` APPROVAL_META | ✅ |
| GH3 | Sertifika rozeti (KARAR 4) | karar-statu :102 🟥 | `mentor-havuzu/page.tsx:167-168` isCertified Badge | ✅ |
| GH4 | DISC ikincil harf "DI" (KARAR 11) | karar-statu :105 🟥 | `discLetters.ts:29,72` DISC_LETTER_CONFIG | ✅ |
| GH5 | Logout UI'a bağlı değil (B11) | belge-aksiyon :191/:297 (❓eskimiş) | `DashboardNav.tsx:30,39` logout()+await (T2-B TH6) | ✅ |
| GH6 | md.6/9a algoritma kalibrasyon ağırlık UI (🟧 "UI yok") | karar-statu :126 🟧 | T1-A madde 9/9a ✅ (#49/#52) — canonical'da zaten ✅ | ✅ (T1-B3 zaten yakaladı) |
| GH7 | K2 OAuth kvkkConsentAt / K5 sunucu konumu | 3 belgede açık (T1-B3) | `oauthService.ts:112` / `kvkk/page.tsx §8` — T1-A madde 2/4/5 ✅ | ✅ (T1-B3 zaten yakaladı) |
| GH8 | F1 foto-upload / F2 platform drill-down / F7 KPI drill-down | 3+ belgede 🟥/UNUTULDU | `avatarController.ts` / `platformTenantController.ts` — T1-A/T2 | ✅ (T1-B3 zaten yakaladı) |
| GH9 | DailyQuestionWidget progress (madde 70/T2) | envanter :87 "döndürmüyor" | #51+#114 — T1-A madde 70 ✅ | ✅ (T1-B3 zaten yakaladı) |

**Hayalet-tamamlanmış ÖZET:** Bu tur DOĞRUDAN kod-teyitle eklenen: **5** (GH1-GH5). T1-B3'ün zaten yakaladığı
(canonical ✅, oz-denetim bayat): **4+ küme** (GH6-GH9). Toplam hayalet-desen: eski oz-denetimlerdeki ~9 küme
kalem canonical'da kapanmış — T1-A H1-H3 (3) + bu 5 + T1-B3 9-küme birbirini güçlendiriyor. **Net YENİ (bu tur
kod-teyitli): 5.**

> **Kritik gözlem:** TUR-1 bu hayalet-tamamlanmışların ÇOĞUNU zaten fark etmişti (T1-B3 "ARADAN KAPANMIŞ ✅"
> bölümü). TUR-1'in eksiği kod-teyit değil, **durum-kodu YOKLUĞU** (🟡 yoktu) ve **sayı-TAHMİNİ** idi. Bu tur
> onları düzeltti; hayalet-tamamlanmış tablosunu KOD dosya:satır ile SABİTLEDİ.

---

## 4. KISMİ→🟡 DÜZELTMELERİ — ne var / ne yok (ikisi kanıtlı)

> TUR-1'de 🟡 durum kodu YOKTU (5 kod vardı). ✅ veya ⬜ yazılmış ama gerçekte KISMİ olan kalemler 🟡'a çevrildi.

| kalem | TUR-1 durumu | NE VAR (kanıt) | NE YOK (kanıt) | YENİ durum |
|---|---|---|---|:---:|
| **ThemeToggle (madde 5 / D21)** | ✅ | admin `(admin)/layout.tsx:16,93` | platform `platform/layout.tsx` grep BOŞ | **🟡 YARIM** |
| **KVKK FE üçlü (madde 40/97)** | ⬜ (T1-A "backend hazır, FE 0") | backend `userRoutes.ts:167-185` (anonymize/hard-delete/export) — T2-C | FE hard-delete/anonymize/export çağrısı YOK (T2-C :95/:148 grep boş) | **🟡 YARIM** (T1-A "⬜" idi; backend var → yarım daha doğru) |
| **KVKK metin↔kod çelişkisi (madde 85/97, T2-C C-7)** | — (T1-A madde 85 ❓) | anonymize artık Message.content temizliyor `gdprService.ts:132-165` | eksik-kategori aydınlatma (85) + yaş-doğrulama (K4) AÇIK | **🟡 YARIM** (T2-C teyit) |
| **madde 6 — kurum onay maili** | ⬜ (T1-A "🟡 kullanıcı maili ✅ / kurum kısmı AÇIK") | kullanıcı maili ✅ (forgot/reset) | kurum onay/red maili AÇIK + `TENANT_NOTIFICATIONS_ENABLED=false` (madde 37m) | **🟡 YARIM** (T1-A satır-notu zaten 🟡 diyor; kod tabloda ⬜ idi → 🟡 netleşti) |
| **madde 90 — Veri İşleyen Sözleşmesi** | ⬜ (satırda "🟡 migration; hukukçu sonrası") | migration/alan hazırlığı kısmi | hukukçu onayı + entegrasyon YOK | **🟡 YARIM** |
| **D1 findMatchesDueForCheckpoint (dm:104-106)** | ✅ (satırda "✅ Aşama1 cron LOG-ONLY") | `cronScheduler.ts` çağrısı VAR (bu tur grep) | gerçek bildirim Aşama 2 (LOG-ONLY) | **🟡 YARIM** (T1 "✅ kısmi" demiş; 🟡 daha doğru) |

**Kısmi→🟡 ÖZET:** 🟡'a çevrilen: **6** kalem (ThemeToggle, KVKK-FE, KVKK-metin-çelişki, kurum-maili, VİS-sözleşme,
D1-cron). Bunlardan **1'i eski ✅'ten düştü** (ThemeToggle), **1'i eski "✅ kısmi"** (D1), gerisi eski ⬜/satır-🟡'dan
netleşti. TUR-1'in 🟡-kodu OLMADIĞI için bu kalemler ✅/⬜ arasında sıkışmıştı — 6'lı kod bunu çözüyor.

---

## 5. EK-A YENİ SATIRLAR (TUR-1'de kalem SAYILMAMIŞ öneri/fikir)

> ⭐ EK-A: PO "öneri olarak yazılan bütün konular önemli." T1 bölüm dosyaları zaten özet-defter; asıl öneri cümleleri
> B2/B3'te toplanmış. Bu bölüm, T1 dosyalarında GEÇEN ama AYRI KALEM sayılmamış (topluca/nota gömülü) önerileri açar.
> Hiçbiri elenmedi/önceliklendirilmedi. Numara DOĞURULMADI.

| # | Kaynak (T1 dosyası:satır) | Öneri/fikir (tek cümle) | Durum | NİYET / NEREDE DURDU |
|---|---|---|:---:|---|
| E1 | T1-B2 05:55 | Her sayfada "hata/öneri bildir"→mail geri-bildirim mekanizması; takip sistemi YOK | ⬜ AÇIK | NİYET: kullanıcı geri-bildirim kanalı. DURDU: tasarım niyeti, kod yok |
| E2 | T1-B2 02:50 | Rate limiter in-memory → çok-instance'ta Redis'e taşınmalı | ⬜ AÇIK | NİYET: ölçeklenme. DURDU: teknik borç, tek-instance'ta sorun değil |
| E3 | T1-B2 06:52-60 | Sol menü tipografi + sayfa-açıklama metinleri + soru-ekleme dropdown Türkçeleştir + kayıt-akışı basitleştir | ⬜ AÇIK | NİYET: UX cilası + KARAR 4 (FE tam TR). DURDU: kodlanmadı |
| E4 | T1-B3 belge-aksiyon :91 | Yumuşak lacivert landing tema yönelişi — karar var, kod yok (UNUTULDU) | ⬜ AÇIK | NİYET: landing görsel yön. DURDU: roadmap'te net değil (landing-UX'e gömülü olabilir), PO teyit |
| E5 | T1-B3 belge-aksiyon :193 | C17 sayfa metinleri merkezileştirme (dağınık inline string) | ⬜ AÇIK | NİYET: bakım kolaylığı (≈madde 47). DURDU: UNUTULDU |
| E6 | T1-B3 stk-admin :27 (B13) | "Neden kurum sertifika sorusu ekleyemez" karar-gerekçe belgesi ZAYIF | ❓ TEYİT | NİYET: karar-izlenebilirlik. DURDU: kod-yorumu ağırlıklı, ayrı gerekçe belgesi yok |
| E7 | T1-B3 unutulmus :54 / stk-admin | Gelir/sürdürülebilirlik modeli + pilot-kulüp seçimi + gerçek-kullanıcı görüşmeleri | ⬜ AÇIK | NİYET: iş/strateji. DURDU: PO/iş kararı, kod değil |
| E8 | T1-B3 unutulmus :101 | Bekleme salonu bildirim izni (`Notification.requestPermission` grep boş) — "en kritik" UX | ⬜ AÇIK | NİYET: bekleme salonu bildirimi. DURDU: bekleme salonu var, izin-istemi kodda yok |
| E9 | T1-B3 karar-statu :141 / unutulmus :69 | matchingInterface.ts USER-strategy stub + Job Board rehberi (U2) | 🔵/⬜ | NİYET: gelecek job-board şablonu. DURDU: kasıtlı-ileride (madde 44 ölü-kod ile ilişkili) |
| E10 | T1-B3 unutulmus :70 | questionController toplu-yanıt endpoint (hazır, FE çağırmıyor) | ⬜ AÇIK | NİYET: toplu yanıt. DURDU: endpoint hazır, FE bağlanmamış |
| E11 | T1-B3 unutulmus :71 | ContextualFeedbackHost payload.tags backend şemada yok (sessiz eksik) | ⬜ AÇIK | NİYET: feedback etiketi. DURDU: FE gönderiyor, backend şema almıyor (T1-A C bölümü feedback-şema) |
| E12 | T1-B2 07:40-41 | Model tercihi "standart Sonnet yeterli" ↔ CLAUDE.md Sonnet/Opus ayrımı (yumuşak çelişki) | ❓ TEYİT | NİYET: çalışma-tercihi. DURDU: 07 eski genel-tercih, CLAUDE.md ayrıntılı; düşük öncelik (T1-B2 BÇ5) |
| E13 | T1-B2 01:18-19 | Premium "kilitli görünür" + `Tenant.plan/limits` altyapısı bugünden kodlanmalı | ❓ TEYİT | NİYET: freemium altyapısı. DURDU: belge "⏳ uygulanmadı"; kodda alan var mı teyit (T1-B2 §4 S1-eksik) |
| E14 | T1-A A6 / A10 / A11 (öneri ayağı) | A10 repo→`C:\dev\` taşı (OneDrive risk) · A11 etiket-gerçek çelişkisi (📸'ye düşür) — PO kararı öneri | 🟡/⬜ | Zaten A-serisinde var; EK-A gereği ÖNERİ olarak da geçerli — silinmesin (PO kararı) |

**EK-A YENİ SATIR ÖZET:** TUR-1'de ayrı kalem sayılmamış **14** öneri/fikir açıldı (E1-E14; E14 A-serisiyle örtüşür).
Çoğu T1-B2/B3'te "topluca / nota gömülü" idi (örn. T1-B2 08:39-53 blok-notu, 06:52-60 birleşik satır). Hiçbiri elenmedi.

---

## 6. NİYET + NEREDE DURDU EKLERİ — önemli TUR-1 açık kalemleri için

> TUR-1 kalemlerinde bu 2 alan YOKTU. Aşağıda ⬜/🟡/❓ durumundaki ÖNEMLİ kalemlere (güvenlik/KVKK/eşleştirme +
> PO-karar-bekleyen) doldurulabilenler dolduruldu. Doldurulamayan "BELGELENMEMİŞ" işaretlendi. (Hepsi değil — önemliler.)

| TUR-1 kalemi | durum | NİYET (neden) | NEREDE DURDU |
|---|:---:|---|---|
| madde 71 (T3) SuspicionReport.tenantId yok | ❓ | Tenant-izolasyon: şüphe raporu hangi kuruma ait bilinmeli | ⭐ KOD-TEYİT: `schema.prisma:1168-1180` SuspicionReport'ta `tenantId` YOK (yalnız tenantName string) → izolasyon boşluğu GERÇEK. Kod-tasarım kararı bekliyor |
| madde 82 consentVersion yok | ❓ | KVKK ispat: hangi rıza-metni sürümüne onay verildi kanıtlanmalı | ⭐ KOD-TEYİT: `schema.prisma` grep `consentVersion` BOŞ → alan yok. Migration gerekir, PO/hukukçu |
| madde 1 / KARAR 5 — menti→mentör TİP gizleme (nüans) | ❓ (ana ✅) | Asimetrik mahremiyet: menti mentörün DISC tipini görmemeli | `discVisibility.ts` yüzde/ham-vektör gizler ✅; TİP(harf) gizleme DTO role-ayrışması T1-B3'te (durum-panosu :49/:142, karar-statu :103/:211) kanıtlanamadı → S1/PII, en kritik açık ❓. DURDU: bu tur DTO açılmadı; TUR-4/kod-turu |
| madde 66 / K6 — admin server-side guard | ⬜ | Savunma-derinliği: admin sayfaları backend değil sadece client-guard'lı | ⭐ KOD-TEYİT: `frontend/src/middleware.ts` YOK (Glob boş) → K6 GERÇEK açık; API backend-korumalı (veri-sızıntısı değil). DURDU: middleware yazılmadı (madde 66 www→301 ile birlikte) |
| madde 101 — SJT/OCEAN eşleştirmede okunmuyor | ⬜/❓ | Eşleştirme kalitesi: SJT/OCEAN katmanı canlı skorlamaya bağlı değil | NİYET: çok-katmanlı eşleştirme. DURDU: `scoring.ts` yorumu + grep (T1-A §5); canlı davranış teyidi açık (DB) |
| madde 76 (T8) / Ç5 — manuel eşleştirme çelişkisi | ❓ | Envanter "eksik" ↔ strateji "elle eşleştirme YASAK" | DURUŞ SEBEBİ: açık PO kararı (K5-soru 8). İkisi de canonical'da işaretli, çözülmemiş — PO |
| madde 13 / B8b — soru cevap-tipi (şıklı/açık) | ⬜ | Esneklik: yeni soru formu answerType sormuyor, Likert sabit | NİYET: cevap-tipi seçimi. DURDU: ⏸️ ERTELENDİ; migration; kapsam belirsiz→PO |
| madde 35 (2a) / A8 — ghost red 30-gün-uyku | 🔵 | Geri-alınabilir red: veriler 30 gün içinde geri alınabilir sonra silinir | NİYET: PO onaylı (geri-alınamazlık). DURDU: tasarım-hazır; migration+cron gerekir, PO ayrı tur |
| madde 36 (2b) / KARAR 3 — onaylı kullanıcıyı çıkarma | 🔵 | Yaşam döngüsü: pasifleştir/sil + iz + bildirim | NİYET: #7 Aşama 3. DURDU: 🔵❓ önce keşif (kodda var mı); migration |
| madde 40/97 — KVKK FE üçlü (export/anon/silme) | 🟡 | KVKK Md.11 kullanıcı-yüzü hak-kullanımı | backend var `userRoutes.ts:167-185`; FE çağrısı YOK (T2-C grep boş). DURDU: FE 0 |
| madde 91 — Kulüp-tipi tenant aktif edilmez | ⬜ | Avukat kısıtı: canlı-öncesi hukuki blocker | DURUŞ SEBEBİ: hukuki kısıt (canlı-öncesi). PO/avukat |
| madde 30/33/73 — sertifika/SJT seed canlı | ⬜ | İçerik: 5→20 sertifika + SJT 3→4 canlı DB'ye | DURUŞ SEBEBİ: canlı DB yazımı→PO onayı; T73 runner bloke. DURDU: seed runner yok (madde 73) |
| A19 — çıkışta Google Analytics olsun mu | ❓ | Ölçümleme kararı: EVET→#67+#56 K0'a yükselir | DURUŞ SEBEBİ: açık PO kararı; #110 buna bağlı |
| A20 — bilinçli terk adayları (sil PO) | ❓ | Ölü kod: MeetingScheduler/iceBreaker/PATCH social/self-profile | DURUŞ SEBEBİ: terk mi bağlanacak mı — PO kararı (ölü-kod ilkesi: sil varsayılan değil) |
| K3 — eski-kayıt consent backfill | ❓ | KVKK: OAuth-öncesi kayıtların rıza-tarihi NULL | DURDU: yeniden-rıza/bulk/erteleme kararı; ⏸️ EN SON (PO) |
| K4 — yaş 18+ form-input | ⬜ | KVKK: kayıt formunda yaş/birthDate input yok | KOD-TEYİT (T1-B3 karar-statu :68): input YOK; madde 3 öz-beyan-METNİ ✅ ama FORM-input yok (nüans). DURDU: form-alanı eklenmedi |
| K7 — çift-tenant kimlik teyidi | ❓ | Kimlik: tüm okumalar TenantMembership'ten mi | DURDU: kod kanıtı yok → ❓; certified/qualityMultiplier okuma-kaynağı teyidi (=02:51/04:25) |

**NİYET/NEREDE-DURDU EK ÖZET:** 17 önemli açık kaleme (güvenlik/KVKK/eşleştirme/PO-karar) NİYET+NEREDE-DURDU dolduruldu.
"DURUŞ SEBEBİ: PO/hukuk kararı" = 6 (madde 76, 91, A19, A20, K3, 30/33). Kalanlar teknik-durdu (migration/FE/keşif).

---

## (a) TUR-1 DÜZELTME ÖZETİ

- **Kaç ✅ düşürüldü:** **1** kesin (T1-A madde 5 ThemeToggle → 🟡 YARIM; görev ⭐ örneği doğrulandı). + **2** ✅'e
  ❓-nüans eklendi (madde 1 tip-gizleme, madde 34 kanıt-satırı) — ana madde ✅ kalır, alt-boyut ❓.
- **Kaç hayalet-tamamlanmış bulundu:** bu tur DOĞRUDAN kod-teyitle **5** yeni (GH1-GH5: sol menü 4-grup, durum rozeti,
  sertifika rozeti, DISC "DI", logout). T1-B3'ün zaten yakaladığı **4+ küme** (GH6-GH9) sabitlendi. → eski oz-denetim
  🟥/🟧'larının çoğu BAYAT çıktı.
- **Kaç kısmi→🟡:** **6** (ThemeToggle, KVKK-FE, KVKK-metin-çelişki, kurum-maili, VİS-sözleşme, D1-cron). TUR-1'de 🟡
  kodu OLMADIĞI için bunlar ✅/⬜ arasında sıkışmıştı.
- **Kaç yeni EK-A satırı:** **14** (E1-E14) — TUR-1'de topluca/nota gömülü öneriler ayrı satıra açıldı.
- **Kaç ❓ eklendi/netleşti:** **~5** yeni/netleşen ❓ (madde 1 tip-gizleme, madde 34, E6, E12, E13) + 17 açık kaleme
  NİYET+NEREDE-DURDU eklendi.
- **Kod DEĞİŞTİRİLMEDİ, DB'ye DOKUNULMADI (SELECT bile yok — yalnız salt-okuma Grep/Read/Glob), PR AÇILMADI, git commit
  YAPILMADI, belge SİLİNMEDİ/TAŞINMADI. T1 bölüm dosyaları DEĞİŞTİRİLMEDİ. Numara DOĞURULMADI.**

## (b) KESİN SAYIM — TUR-1'in GERÇEK toplam kalemi (tahmin DEĞİL)

| bölüm | GERÇEK kalem (kesin) | TUR-1 "~" tahmini |
|---|:---:|---|
| **T1-A** numaralı envanter (dolu numaralı satır, ✅28 + ⬜v1 15 + ⬜v1F 18 + ❓ 21 + 🔵v2 15 + Y/K 11) | **108** envanter satırı | "~103 madde" |
| **T1-A** numarasız A1-A23 | **23** | "~23" |
| **T1-A** ölü-kod (C 9 + C.2 12) | **21** | "9+" |
| **T1-A** çelişki Ç1-Ç6 + hayalet H1-H3 (ATIF, çift-saymaz) | 6 + 3 (envantere atıf) | — |
| **T1-A ALT-TOPLAM (envanter+A-serisi+ölü-kod, tekil)** | **152** | — |
| **T1-B1** | **6** | "6" (kesin) |
| **T1-B2** | **156** | "156" (kesin) |
| **T1-B3** defter satırı | **120** | "~120" |
| **TUR-1 TEKİL KALEM GENEL TOPLAM** | **≈434 defter/kalem satırı** (152 + 6 + 156 + 120) | görev-talimatı üst-tahmini "~282" |

> ⚠️ **"~282" ile "≈434" farkının açıklaması (HAKEM OLMADIM, iki okumayı da yazdım):** Görev talimatındaki "~282
> kalem" tahmini muhtemelen T1 bölümlerinin ÇAKIŞMASINI (aynı karar T1-A + T1-B2 + T1-B3'te tekrar geçer — örn. K2
> hem T1-A madde 2 hem T1-B2 04:6 hem T1-B3 3 belgede) TEKİL sayarak düşük çıkar. **≈434** ise her T1 dosyasının KENDİ
> defter satırlarının toplamıdır (çakışmalar AYRI sayılır çünkü her dosya bağımsız defter). **ÇAKIŞMASIZ TEKİL benzersiz
> karar** ise çok daha az (~150-180) — çünkü T1-B3 zaten "≡ üstteki X" ile tekrarları işaretlemiş. Kesin çakışmasız-tekil
> sayım için tüm kalemlerin cross-ref eşlemesi gerekir (bu turun kapsamı dışında; TUR-4 birleştirme işi).
> **Bu turun kesin çıktısı:** dosya-başı defter satırı = T1-A 152 · T1-B1 6 · T1-B2 156 · T1-B3 120.

### Düzeltilmiş durum dağılımı (TUR-1 kalemleri, bu turun düzeltmeleriyle — T1-A envanteri bazında TAM sayı)

> T1-A §1 numaralı envanter durum-kodu bazında (bu turun düşürme/netleştirmeleriyle):

- **✅ YAPILDI:** 28 − 1 (madde 5 düştü) = **27** (madde 39 tabloda ⬜ görünüyordu → ✅ netleşti, +1 = **28** net;
  ThemeToggle −1 → **27**). Kesin: T1-A ✅ = **27** (madde 5 çıktı, madde 39 ✅ sabit).
- **🟡 YARIM (TUR-1'de YOK, bu tur EKLENDİ):** **6** (§4 tablosu: ThemeToggle, KVKK-FE, KVKK-metin, kurum-mail,
  VİS-sözleşme, D1-cron).
- **⬜ AÇIK:** T1-A v1 (15) + v1F (18) = **33** (madde 39 çıktı −1, kurum-mail/KVKK-FE 🟡'a gitti −2 ≈ **30**).
- **❓ TEYİT/KARAR:** **21** + bu tur eklenen nüans-❓ (madde 1 tip-gizleme, madde 34, K4-input) ≈ **24**.
- **🔵 v2 backlog:** **15** (14-28).
- **🗑️ GEÇERSİZ ADAYI:** **1** (T1-B3 09-DURUM belge-içi çelişki blokları — PO kararı, TAŞINMADI).

---

## KAPANIŞ NOTU (GRUP-D)

- **4/4 TUR-1 çıktı belgesi TAM okundu** (T1-A 231, T1-B1 37, T1-B2 327, T1-B3 321 = 916 satır), okunmayan 0.
- **En çarpıcı gerçek:** TUR-1 kod-teyidi YAPMAMIŞ değil — T1-B3 "ARADAN KAPANMIŞ ✅" bölümü hayalet-tamamlanmışların
  çoğunu zaten yakalamıştı. TUR-1'in GERÇEK eksiği **(a) sayı-TAHMİNİ** ("~103/~140/~120") ve **(b) 🟡 durum-kodunun
  YOKLUĞU** idi — bu yüzden ThemeToggle gibi kısmi işler ✅ olarak sıkıştı. Bu tur ikisini de düzeltti.
- **⭐ Görev ⭐-örneği DOĞRULANDI:** T1-A madde 5 ThemeToggle "✅ zaten mevcut" YANLIŞ — admin'de VAR
  (`(admin)/layout.tsx:16,93`), platform'da YOK (`platform/layout.tsx` grep boş) → **🟡 YARIM** (TUR-2 T2-B de buldu).
- **DENKLEŞTİRME TAM mı:** §1 (sayım) · §2 (yanlış-✅) · §3 (hayalet) · §4 (kısmi→🟡) · §5 (EK-A) · §6 (niyet/nerede-durdu)
  hepsi TAMAMLANDI. **TEK EKSİK/DEVİR:** çakışmasız-TEKİL benzersiz karar sayımı (≈150-180) tüm-kalem cross-ref eşlemesi
  ister → **TUR-4 birleştirme işi** (bu turun kapsamı dışında, açıkça devredildi). Bu tur dosya-başı defter satırını
  KESİN verdi (152/6/156/120); tekilleştirme değil.
- **Kod DEĞİŞTİRİLMEDİ · DB'ye DOKUNULMADI (SELECT yok) · PR AÇILMADI · commit YOK · belge SİLİNMEDİ/TAŞINMADI ·
  T1 dosyaları DEĞİŞTİRİLMEDİ · numara DOĞURULMADI · hakem OLMADIM · kişi adı yazılmadı.**
- **Yalnız TEK dosya yazıldı:** `docs/raporlar/bilanco/bolumler/T3-D-tur1-denklestirme.md` (bu dosya).
