> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ) · kapılar 4 renk (Bölüm 7).

**Son güncelleme:** 2026-09-27 04:12 UTC · çatı main HEAD `f220bbe` · backend main HEAD `f4f624a` (= canlı pointer)

**Durum:** ÇALIŞIYOR — PO NOTU oturumu: GÖREV 0 (PO kararları K-A/K-B/K-C + kapı düzeltmeleri) → GÖREV 1 (belge aktif/arşiv ayrımı + bekçi) → GÖREV 2 (AJ- satırları) → Bölüm 14.

**Şu an yapılan:** GÖREV 0 ✅ (#354). GÖREV 1 dalı `otonom/BELGE-AKTIF-ARSIV-20260926`: 6/7 commit hazır (kuyruk · kararlar · ilerleme · CLAUDE/PROMPT · kural 5c · bekçi); 03-PO + BELGE-HARİTASI alt ajanda → sonra PR + 7b. GÖREV 2 doğrulama taraması 2 salt-okuma alt ajanda. ⚠️ Kuyruk/ILERLEME güncellemeleri GÖREV 1 merge'ünü bekliyor (P-05 BITTI kaydı dahil).

**Son merge'ler (bu oturum, en yeniden eskiye):**
| PR | İş | Canlı kontrol |
|---|---|---|
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
| backend #151 + çatı #332 | IC-08 düzeltme notu | yeşil | ✅ ONAY | ⛔ #151 merge sınıflandırıcı reddi |
| backend #157 + çatı #337 | AN-26 hatırlatma/eskalasyon · 🔵 | yeşil | ✅ ONAY | KARAR-98 EVET (+ alt soru) + `Conversation` yedeği |
| backend #148 + çatı #326 | U-18 mesaj talebi reddi · 🔵 | yeşil | ✅ ONAY | KARAR-97 EVET + `Conversation` yedeği |
| backend #142 + çatı #320 | AN-30 granüler rıza · 🔵 · çıkış blokeri | yeşil | ✅ ONAY | KARAR-96 EVET + `Consent` yedeği |
| backend #160 | AN-02 seed metin yazımı · 🔵 | yeşil | — | KARAR-99 EVET + 2 satır UPDATE |
| çatı #110 | ⛔ MERGE ETME (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok.

**Engeller:**
- ⛔ 2026-09-26 18:25 UTC — `gh pr merge 151 --merge` REDDEDİLDİ. Ret metni AYNEN: `Permission for this action was denied by the Claude Code auto mode classifier. Reason: [Merge Without Review].` (Ardışık ret sayısı sıfırlandı; sonraki merge'ler geçti.)
- 🗄️ Tek seferlik DB erişimi gerekiyor: **Y-05** (EXPLAIN) · 🔵 EVET gelirse yedek için: AN-30 · U-18 · AN-26 · AN-02.

**PO'ya sorular:** ⭐ **KARAR-101** (B8 güvenlik — Bekleme Odası) · KARAR-102 (kayıt sonrası e-posta doğrulaması, GV-12 kalanı) · KARAR-96/97/98/99 (🔵 EVET/HAYIR) · KARAR-100.

**Strateji katmanına not:**
- Kuyrukta satırı olmayan bulgular: G-kart doğrulaması ~30 ⬜ kalem (`docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md`) · `GET /api/system-logs` iz/meta · kurum-içi sayımlar `User.role` (KPI + G1-18) · frontend askı ekranı yok · token türü ayrımı (OAuth pending) · U-18 gerçek bildirim/inbox ret işareti.
- Kapı: P-05 (🔵 ama migration'sız, ONAY'lı) · PS-A3/PS-A4 🟡 (yeni tanımla 🟢+7b).
- "BITTI ama kalemin tamamı değil" 5 vaka (F-04/G1-23 · F-27/G6-01 · G6-03 · G7-13 · F-21/G7-09) — K5-Y2 bu turda denetliyor.

**Karar kilidi (en çok iş açan cevapsız kartlar):** KARAR-57 (4, +I-12) · KARAR-45 (4, + IC-10/AN-05 adları) · KARAR-56 (3) · KARAR-68/65/62/61/59/55 (2'şer) · KARAR-101 (güvenlik) · 🔵 96/97/98/99.

**Sıradaki 5 iş:** (1) K5-Y2 sonucu → tutmayan BITTI'ler BEKLIYOR'a · (2) K5-Y3 eksik negatif testler · (3) F-01 belge reorg (büyük, belge) · (4) PO cevapları gelirse 🔵 işler (yedek + merge) · (5) K5-Y4 karar kartı kanıt tazeleme.
