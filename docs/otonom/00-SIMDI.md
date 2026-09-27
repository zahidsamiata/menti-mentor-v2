> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ) · kapılar 4 renk (Bölüm 7).

**Son güncelleme:** 2026-09-27 · çatı main HEAD `0cf3006`+docs · backend main HEAD `4244924` (= canlı pointer)

**Durum:** ÇALIŞIYOR — PO NOTU oturumu: GÖREV 0 (PO kararları K-A/K-B/K-C + kapı düzeltmeleri) → GÖREV 1 (belge aktif/arşiv ayrımı + bekçi) → GÖREV 2 (AJ- satırları) → Bölüm 14.

**Şu an yapılan:** GÖREV 0-2 ✅ · GÖREV 3: bu oturumda 17 iş canlıda (liste: Son merge'ler) · E-3e (görüşme değerlendirmesi/check-in okuma, çatı #372) düzeltmede · 🔵 hazır: AN-52-1 (#185, KARAR-106) · AN-12 (#186+#370, KARAR-107).

**Son merge'ler (bu oturum, en yeniden eskiye):**
| PR | İş | Canlı kontrol |
|---|---|---|
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
| çatı #110 | ⛔ MERGE ETME (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok.

**Engeller:**
- ⛔ 2026-09-27 04:50 UTC — `gh pr merge 356 --merge` (GÖREV 2 belge PR'ı, CI yeşil) REDDEDİLDİ. Ret metni AYNEN: `Permission for this action was denied by the Claude Code auto mode classifier. Reason: [Merge Without Review].` → bağımsız inceleme (3 tur) ONAY sonrası merge geçti (`79bc0f7`); ardışık ret sayacı sıfırlandı.
- ✅ (çözüldü 2026-09-27: #151 tazelenip merge edildi) ⛔ 2026-09-26 18:25 UTC — `gh pr merge 151 --merge` REDDEDİLDİ. Ret metni AYNEN: `Permission for this action was denied by the Claude Code auto mode classifier. Reason: [Merge Without Review].` (Ardışık ret sayısı sıfırlandı; sonraki merge'ler geçti.)
- 🗄️ Tek seferlik DB erişimi gerekiyor: **Y-05** (EXPLAIN) · 🔵 EVET gelirse yedek için: AN-30 · U-18 · AN-26 · AN-02.

**PO'ya sorular:** KARAR-109 (anlaşma taslağını kim başlatır) · KARAR-107 (🔵 AN-12 karantina EVET/HAYIR) · KARAR-108 (DISC eşitlik sırası) · KARAR-106 (🔵 AN-52 anket tablosu EVET/HAYIR — yeni tablo, yedek gerekmez) · KARAR-105 (kurumlar arası anonim karşılaştırma) · KARAR-104 (eşik ince ayarı, öneri A) · KARAR-103 (eski planlardaki 13 özellik, öneri B) · 03-PO C-14 (üyelik tamamlaması teyidi) · ⭐ **KARAR-101** (B8 güvenlik — Bekleme Odası) · KARAR-102 (kayıt sonrası e-posta doğrulaması, GV-12 kalanı) · KARAR-96/97/98/99 (🔵 EVET/HAYIR) · KARAR-100.

**Strateji katmanına not:**
- AJ-01 kapsam dışı bıraktı: platform/süper-admin geneli rol sayımları (`backend/src/controllers/platformController.ts`, `adminSettingsController.ts`) hâlâ `User.role` — tekil kişi mi üyelik mi sayılacağı ürün kararı adayı.
- Kuyrukta satırı olmayan bulgular: G-kart doğrulaması ~30 ⬜ kalem (`docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md`) · `GET /api/system-logs` iz/meta · kurum-içi sayımlar `User.role` (KPI + G1-18) · frontend askı ekranı yok · token türü ayrımı (OAuth pending) · U-18 gerçek bildirim/inbox ret işareti.
- Kapı: P-05 (🔵 ama migration'sız, ONAY'lı) · PS-A3/PS-A4 🟡 (yeni tanımla 🟢+7b).
- "BITTI ama kalemin tamamı değil" 5 vaka (F-04/G1-23 · F-27/G6-01 · G6-03 · G7-13 · F-21/G7-09) — K5-Y2 bu turda denetliyor.

**Karar kilidi (cevapsız kartlar, kilitlediği açık kuyruk satırı sayısına göre — 2026-09-27 yeniden sayım):** KARAR-64 (4: I-01, I-11, AN-50, AN-51) · KARAR-46 (3: F-14, P-99, AN-03) · KARAR-95/88/72/58/57/50/36 (2'şer; KARAR-58 → PS-A2 → PS-A3 → Y-17 zinciri) · 33 kart 1'er iş · 41 cevapsız kart hiçbir kuyruk satırını kilitlemiyor (bilgi/ince ayar). 🔵 EVET bekleyenler: KARAR-96 (AN-30) · 97 (U-18) · 98 (AN-26) · 99 (AN-02). ⭐ Güvenlik: KARAR-101 (Y1-B8).

**Sıradaki 5 iş:** (1) K5-Y2 sonucu → tutmayan BITTI'ler BEKLIYOR'a · (2) K5-Y3 eksik negatif testler · (3) F-01 belge reorg (büyük, belge) · (4) PO cevapları gelirse 🔵 işler (yedek + merge) · (5) K5-Y4 karar kartı kanıt tazeleme.
