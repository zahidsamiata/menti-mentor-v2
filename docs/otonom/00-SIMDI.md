> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ) · kapılar 4 renk (Bölüm 7).

> ⛔ **GÜVENLİK BULGUSU (2026-09-27, BITTI doğrulaması — U-08 ⚠️, kalite kontrolü QB):** `POST /api/scoring/rank-mentors` onay kapısı yok — `backend/src/routes/sjtScoringRoutes.ts:25-29` yalnız `requireAuth()`; komşu uç `backend/src/controllers/matchingController.ts:74` `rejectIfCallerNotApproved` uyguluyor. Onay bekleyen/reddedilen menti mentör kimlik no + uyum skoru alabiliyor (ad dönmüyor). Bu oturumda DÜZELTME YOK → AJ satırı (sonraki tur).

**Son güncelleme:** 2026-09-27 · çatı main HEAD (bu commit) · backend main HEAD `3bd9ad3`

**Durum:** CALISIYOR — PO görevi: GÖREV 0 (kural: doğrulama opus + mutasyon kanıtı) → 1 (AJ-20…AJ-48; AJ-29/AJ-38 hariç) → 2 (kayıt+belge, kural h) → 3 (AJ: değerlendirme okuma ucu + E-3 notu) → 4 (sahipsiz kalanlar, salt-okuma) → DURDU (K1-a).

**Şu an yapılan:** GÖREV 0 MERGE (#381, 7b 3 tur ONAY) · GÖREV 3 MERGE (#382, AJ-49 🔴 KARAR-89) · GÖREV 1 sürüyor: AJ-21 backend #194 (7b incelemede) · AJ-24 çatı #383 (7b incelemede) · AJ-20 ve AJ-30 yapılıyor.

**Son merge'ler (bu oturum, en yeniden eskiye):**
| PR | İş | Canlı kontrol |
|---|---|---|
| çatı #382 | GÖREV 3 — AJ-49 + E-3 notu (docs) | CI 10/10 |
| çatı #381 | GÖREV 0 — doğrulama opus + mutasyon kanıtı kuralı (docs) | CI 10/10 |
| çatı #380 | GÖREV C — kural (h) + bekçi UYARI (docs+script) | CI 10/10 · canlı ok:true, db:up, site 200 |
| çatı #379 | GÖREV B — belge kapanış senkronu (docs) | docs · CI 10/10 |
| çatı #378 | GÖREV A — BITTI son doğrulama (docs) | docs · CI 10/10 |
| backend #193 + çatı #377 | AJ-19 (negatif test son parti) | ok:true, db:up, site 200 |
| backend #192 + çatı #376 | AJ-18 (19 uca negatif test) | ok:true, db:up, site 200 |
| backend #190 + #191 + çatı #375 | AJ-16 (20 uca negatif test) · AJ-17 (elle temizlik/kalibrasyon yalnız kendi kurumu) | ok:true, db:up, site 200 |
| backend #188 + çatı #373 | AJ-15 (20 uca negatif test) | ok:true, db:up, site 200 |
| çatı #372 | E-3e (görüşme kartında kendi değerlendirmesi) | ok:true, db:up, site 200 |
| backend #187 + çatı #371 | E-3d (çift engelleme/liste/kaldırma ekranı) | ok:true, db:up, site 200 |
| backend #151 + çatı #332 | IC-08 (bekleme ekranında düzeltme notu) | ok:true, db:up, site 200 |
| backend #184 + çatı #368 | AJ-13 (11 uca negatif test) | ok:true, db:up, site 200 |
| backend #183 + çatı #367 | F-05 kod kısmı (CAPTCHA, anahtar yokken etkisiz) | ok:true, db:up, site 200 |
| backend #182 + çatı #366 | F-24 (platform kullanıcı özet sayfası) | ok:true, db:up, site 200 |
| backend #181 + çatı #365 | AJ-09 (çerez + PII select refaktörü) | ok:true, db:up, site 200 |
| backend #179 + çatı #363 | AJ-05 (logo adresi kısıtı) | ok:true, db:up, site 200 |
| backend #180 + çatı #364 | PS-A4 (menti alt uyum eşiği) | ok:true, db:up, site 200 |
| backend #177 + çatı #362 | AJ-08 (seed komutları + CLAUDE.md seed listesi düzeltmesi) | ok:true, db:up, site 200 |
| backend #176 + #178 + çatı #361 | AJ-04 (20 uca negatif test) · AJ-12 (ret ucu gövdesiz 500) | ok:true, db:up, site 200 |
| backend #175 + çatı #360 | AJ-03 (çıkışta erişim anahtarı iptali) | ok:true, db:up, site 200 |
| çatı #359 | AJ-07 (DISC kontrastı + erişilebilirlik) | ok:true, db:up, site 200 |
| backend #173 + #174 + çatı #358 | AJ-01 (kurum-içi rol sayımı üyelikten) · AJ-06 (mesaj listesi N+1) | ok:true, db:up, site 200 (uptime 12 sn) |
| backend #172 + çatı #357 | AJ-02 (system-logs meta + denetim izi) | ok:true, db:up, site 200 (uptime 43 sn → dağıtıldı) |
| çatı #356 | GÖREV 2 — AJ satırları + KARAR-103 | docs |
| çatı #355 | GÖREV 1 — belge aktif/arşiv ayrımı + kural 5c + bekçi (YN-01/YN-14 kapandı) | docs · CI 5/5 |
| backend #162 + çatı #340 | P-05 (reddedilen görüşmede menti'ye nazik bildirim) — kapı 🟢 (PO 0.2) | ok:true, db:up, site 200 (uptime 455 sn — dağıtım teyidi bir sonraki kontrolde) |
| çatı #354 | GÖREV 0 — PO kararları K-A/K-B/K-C + kapı düzeltmeleri | docs |
| backend #171 + çatı #353 | AN-07 (aday kesmesi skordan sonra) | ok:true, db:up, site 200 |
| backend #170 + çatı #352 | Y3b (başka kurumun KVKK/metrik isteği → 404) | ok:true, db:up, site 200 |
| backend #169 + çatı #351 | K5-Y3 (10 uca 41 negatif test — açık yok) | ok:true, db:up, site 200 |
| çatı #350 | K-05b (saat yalnız müsait aralıklardan) | ok:true, db:up, site 200 |
| backend #168 + çatı #348 | KR-19b (engellenmiş çift mesaj/istek gönderemez) | ok:true, db:up, site 200 |
| çatı #349 · #347 | F-28b (UI_TEXT) · AN-10b (mentörlüğün) | ok:true, db:up |
| backend #167 + çatı #346 | Y1-B9c (askıdaki kuruma çapraz istek yok) | ok:true, db:up, site 200 |
| backend #166 + çatı #345 | Y1-B9b (askıdaki kurum önerilerde yok, reapply kapalı) | ok:true, db:up, site 200 |
| backend #165 + çatı #344 | Y1-B9 (dondurulmuş/reddedilmiş kurum erişemez; KVKK hakları açık) | ok:true, db:up ×2, site 200 |
| backend #163 + çatı #342 | F-18 (KPI CSV) | ok:true, db:up, site 200 |
| backend #161 · #159 + çatı #341 | KR-16 (açılış internetsiz) · IC-12 | ok:true, db:up ×3, site 200 |
| çatı #339 · #338 · #335 · #336 · #334 · #333 · #331 · #330 · #329 · #328 | AN-10 · IC-11/Y-02 · GV-19/AN-09 · KR-21/PS-09 · YN-13 · PS-10 · IC-01 · KR-22 · PS-A1/GV-08/KR-14 · GÖREV 0 | hepsi ok:true, db:up, site 200 |

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| backend #164 + çatı #343 | Y1-B8 OAuth onay kapısı (güvenlik) | yeşil | SORUN VAR (ürün) | **KARAR-101** — Bekleme Odası kalsın mı |
| backend #157 + çatı #337 | AN-26 hatırlatma/eskalasyon · 🔵 | yeşil | ✅ ONAY | KARAR-98 EVET (+ alt soru) + `Conversation` yedeği |
| backend #148 + çatı #326 | U-18 mesaj talebi reddi · 🔵 | yeşil | ✅ ONAY | KARAR-97 EVET + `Conversation` yedeği |
| backend #142 + çatı #320 | AN-30 granüler rıza · 🔵 · çıkış blokeri | yeşil | ✅ ONAY | KARAR-96 EVET + `Consent` yedeği |
| backend #160 | AN-02 seed metin yazımı · 🔵 | yeşil | — | KARAR-99 EVET + 2 satır UPDATE |
| backend #185 | AN-52-1 anket tablosu · 🔵 ⛔ MIGRATION | yeşil | ✅ ONAY | KARAR-106 EVET bekliyor (yedek gerekmez — yeni tablo) |
| backend #186 + çatı #370 | AN-12 karantina · 🔵 | yeşil | ✅ ONAY (iki PR) | KARAR-107 EVET bekliyor |
| backend #189 + çatı #374 | K-15 müsaitlik tür+süre · 🔵 ⛔ MIGRATION | yeşil | ✅ ONAY | KARAR-111 EVET + `AvailabilityBlock` yedeği (merge'den önce) |
| çatı #110 | ⛔ MERGE ETME (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok.

**Engeller:**
- ⛔ 2026-09-27 04:50 UTC — `gh pr merge 356 --merge` (GÖREV 2 belge PR'ı, CI yeşil) REDDEDİLDİ. Ret metni AYNEN: `Permission for this action was denied by the Claude Code auto mode classifier. Reason: [Merge Without Review].` → bağımsız inceleme (3 tur) ONAY sonrası merge geçti (`79bc0f7`); ardışık ret sayacı sıfırlandı.
- ✅ (çözüldü 2026-09-27: #151 tazelenip merge edildi) ⛔ 2026-09-26 18:25 UTC — `gh pr merge 151 --merge` REDDEDİLDİ. Ret metni AYNEN: `Permission for this action was denied by the Claude Code auto mode classifier. Reason: [Merge Without Review].` (Ardışık ret sayısı sıfırlandı; sonraki merge'ler geçti.)
- 🗄️ Tek seferlik DB erişimi gerekiyor: K-15 (<60 dk blok sayımı + yedek, KARAR-111 EVET gelirse) · **Y-05** (EXPLAIN) · 🔵 EVET gelirse yedek için: AN-30 · U-18 · AN-26 · AN-02.

**PO'ya sorular:** KARAR-111 (🔵 K-15 müsaitliğe tür+süre — mevcut bloklar Online/60'a daralır) · KARAR-110 (periyodik anket) · KARAR-109 (anlaşma taslağını kim başlatır) · KARAR-107 (🔵 AN-12 karantina EVET/HAYIR) · KARAR-108 (DISC eşitlik sırası) · KARAR-106 (🔵 AN-52 anket tablosu EVET/HAYIR — yeni tablo, yedek gerekmez) · KARAR-105 (kurumlar arası anonim karşılaştırma) · KARAR-104 (eşik ince ayarı, öneri A) · KARAR-103 (eski planlardaki 13 özellik, öneri B) · 03-PO C-14 (üyelik tamamlaması teyidi) · ⭐ **KARAR-101** (B8 güvenlik — Bekleme Odası) · KARAR-102 (kayıt sonrası e-posta doğrulaması, GV-12 kalanı) · KARAR-96/97/98/99 (🔵 EVET/HAYIR) · KARAR-100.

**Strateji katmanına not:**
- (7b #379 N1) `GET /api/meetings/:meetingId/feedback` (değerlendirme okuma) ucunun kuyrukta sahibi yok — rapor B.5 teyitinde "AJ-14'e bağlı" yazıyor ama AJ-14 periyodik anket işi; `00-KUYRUK.md` E-3 notu hâlâ "E-3e değerlendirme okumayı da karşıladı" diyor (yanlış: E-3e `…/check-ins` okuyor, `frontend/src/components/organisms/MeetingCheckInReadout.tsx:6-13`). Sonraki tur: AJ satırı + E-3 notu düzeltmesi. · (N2) `PATCH /api/meetings/:id (→COMPLETED)` ön yüzden çağrılmıyor; iş otomatik tamamlanmayla kapandı — mükerrer uç adayı (silme protokolü).
- AJ-01 kapsam dışı bıraktı: platform/süper-admin geneli rol sayımları (`backend/src/controllers/platformController.ts`, `adminSettingsController.ts`) hâlâ `User.role` — tekil kişi mi üyelik mi sayılacağı ürün kararı adayı.
- Kuyrukta satırı olmayan bulgular: G-kart doğrulaması ~30 ⬜ kalem (`docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md`) · `GET /api/system-logs` iz/meta · kurum-içi sayımlar `User.role` (KPI + G1-18) · frontend askı ekranı yok · token türü ayrımı (OAuth pending) · U-18 gerçek bildirim/inbox ret işareti.
- Kapı: P-05 (🔵 ama migration'sız, ONAY'lı) · PS-A3/PS-A4 🟡 (yeni tanımla 🟢+7b).
- "BITTI ama kalemin tamamı değil" 5 vaka (F-04/G1-23 · F-27/G6-01 · G6-03 · G7-13 · F-21/G7-09) — K5-Y2 bu turda denetliyor.

**Karar kilidi (cevapsız kartlar, kilitlediği açık kuyruk satırı sayısına göre — 2026-09-27 yeniden sayım):** KARAR-64 (4: I-01, I-11, AN-50, AN-51) · KARAR-46 (3: F-14, P-99, AN-03) · KARAR-95/88/72/58/57/50/36 (2'şer; KARAR-58 → PS-A2 → PS-A3 → Y-17 zinciri) · 33 kart 1'er iş · 41 cevapsız kart hiçbir kuyruk satırını kilitlemiyor (bilgi/ince ayar). 🔵 EVET bekleyenler: KARAR-96 (AN-30) · 97 (U-18) · 98 (AN-26) · 99 (AN-02). ⭐ Güvenlik: KARAR-101 (Y1-B8).

**Sıradaki 5 iş:** (1) ⛔ AJ-20 (rank-mentors onay kapısı, 🟢+7b) · (2) AJ-21 (ham DISC vektörü/puan mentöre dönüyor, 🟢+7b) · (3) AJ-22…AJ-32 güvenlik/KVKK kalanları (AJ-29 🟡 yasak bölge — PO turu) · (4) AJ-33 P-07 kutlama sayısı (❌) · (5) Feedback okuma ucu için AJ satırı + E-3 notu düzeltmesi (7b #379 N1). PO: KABUL TESTİ LİSTESİ (12 madde) + 🔵 EVET kartları.
