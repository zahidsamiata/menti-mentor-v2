# 02 — PROJE DURUMU (şu an nerede, kanıtlı)

**📸 DONDURULMUŞ** — oturum devir notu (o günkü proje durumu). Güncel durum için: `docs/kararlar/09-DURUM.md`.

> **Amaç:** Yeni sohbet, projenin canlı/tamamlanmış durumunu tek yerden kanıtla görsün.
> Kaynak: `docs/kararlar/09-DURUM.md`, `belge-denetimi-2026-08-10.md`, `chat-v1-teslim.md`, git.
> **UYARI (bağlam devri):** Aşağıdaki PR numaraları belgelerden alındı; bağlam devrinde eskimiş olabilir.
> **İş yapmadan önce `gh pr list --state open` + `git log` ile git'ten DOĞRULA** (bkz. 06-devir-kilavuzu).
>
> **⚠️ GÜNCELLEME (2026-08-14):** Git durumu ilerledi — çatı main `0aaeac7` (#64), açık PR **#65** (belge temizliği,
> salt-docs). En güncel oturum özeti + tam bekleyen liste: **`docs/devir/07-oturum-gunlugu.md`** (oturum günlüğü).
> Aşağıdaki "devir anı" (2026-08-11) SHA/PR değerleri o güne aittir.
>
> **⚠️ GÜNCELLEME (2026-08-20):** Bu belge (2026-08-11 fotoğrafı) çok gerisinde kaldı. **Canonical güncel durum:
> `docs/kararlar/09-DURUM.md`**; "arkada ne kaldı": `00-KARAR-TAKIP.md`; oturum tarihçesi: `07-oturum-gunlugu.md`.
> Kısaca bu tarihe kadar **canlıya ek olarak çıkanlar:** #7 Aşama 1 (kalıcı kalite puanı + risk sinyali + checkpoint cron) ·
> #34 öğrenme-yolculuğu görünürlüğü · #7A mentör→menti kart gerekçesi · #9 ağırlık gösterimi (ayar yok) ·
> #37 kurum "düzeltme iste" (**migration canlıda**, mail KAPALI). **Güncel git (yazım anı):** çatı main `888ceb8`,
> backend/pointer `ba92dfa` (senkron), açık PR 0. 4-rol metodolojisi: menti tarafı da büyük ölçüde canlıda (denetim raporu 2026-08-20).

---

## Ürün özeti
MentiMentor / **sivilkapasite.org** — STK'lar için mentör↔menti eşleştirme platformu. DISC/mizaç
temelli psikometrik eşleştirme, çok-kurumlu (multi-tenant), rol bazlı paneller (platform admin ·
STK yönetici · mentör · menti).

## Repo yapısı (İKİ git repo)
- **Çatı (umbrella):** `menti-mentor-v2` — frontend + docker-compose + docs + **backend submodule**.
- **Backend (submodule):** `menti-mentor` — Express + Prisma + Postgres, çatının `backend/` dizininde.
- **Pointer kuralı:** backend değişince aynı tur içinde çatı `backend` pointer'ı güncellenir. Sıra:
  backend commit → backend push → çatı `git add backend` → çatı commit → çatı push (ara commit yok).
- **CI iki repoda:** her push sonrası `gh run list` HEM backend HEM çatı için kontrol edilir.
  Çatı (umbrella) CI her branch'te koşar; backend CI yalnız `main` hedefli PR/push'ta koşar.

## Ortam / DB (KRİTİK ayrım)
- **Lokal geliştirme + CANLI aynı Neon DB'yi paylaşır** (`ep-fancy-tooth-ab4u5xhr`). Lokalde DB'ye
  yazmak = canlıyı etkilemek. Salt-okuma sorgu, PII maskeli. DB işleminde onay al.
- **Test:** `TEST_DATABASE_URL` (izole DB) beklenir; yoksa `assertTestDatabase.ts` guard'ı canlı Neon'a
  TRUNCATE atılmasını engeller, suite durur.
- **CI:** ephemeral localhost Postgres (service container).
- **PROD:** docker-compose Postgres (Dokploy'da), Neon değil.

---

## ✅ TAMAMLANMIŞ / CANLIDA (kanıtlı)

| İş | Durum | Kanıt |
|---|---|---|
| **Chat v1 (menti↔mentör mesajlaşma)** | TAM CANLIDA | backend `#33` + frontend `#47`/`#48` MERGED. `Conversation`+`Message` tabloları canlı Neon'da (migration `20260806000000_add_chat_conversation_message`, additive). Detay: `chat-v1-teslim.md` |
| **Mentör paneli** | TAM CANLIDA | Gerçek metrik kartları (aktif menti · bekleyen · tamamlanan · ort. NPS) `GET /api/mentors/:mentorId/dashboard-metrics` + yaklaşan toplantılar. IDOR korumalı (`requireSelfOrAdmin`, salt-okuma). backend `#36` + çatı `#52`/`#51` MERGED |
| **Ölü kod temizliği (menti-driven görünürlük, Taraf-2)** | SİLİNDİ | `mentiRequestController.ts` + 3 rota silindi. backend `#35` + çatı pointer `#50`. **Taraf-1 `setVisibilityOptIn` kasıtlı korundu** |
| **Belge hijyeni + temizlik** | main'de | 09-DURUM + yol-haritası temizlendi, eskiler `docs/arsiv/`'e taşındı; `CLAUDE.md`'de "Belge Eş-Zamanlılığı" + "Belge Düzeltme Deseni" kuralları. Denetim `#56`, temizlik `#57` MERGED |
| **Mail** | ÇALIŞIYOR | `emailService.ts` generic SMTP relay (Resend/Brevo); Gmail App Password kaldırıldı. Forgot/reset-password akışı tam (`authRoutes.ts:34,38` + `authController.ts:411-446` + FE sayfaları) |
| **İzole test DB + guard** | VAR | `backend/.env.test` + `.env.test.example` + `assertTestDatabase.ts:44-76` + `tests/globalSetup.ts` |
| **P0 güvenlik kontrolleri** | kodlanmış + testli | tenant izolasyonu (5 katmanlı requireTenant + RLS), IDOR fix, eşleşme deadlock, DISC math guard, JSON guard, kural paneli Zod. Testler: `tenant-isolation-fixes.test.ts`, `security-audit-2.test.ts`, `matching.test.ts`, `hardening.test.ts` |

## Geçmiş turlar (kısaca, arşivde detay)
Güvenlik turu (O1-O5) · eski PR kurtarma · retention STK-yönetici dilimi · platform admin turu ·
fotoğraf altyapısı · timezone fix · IDOR fix'leri — hepsi MERGED, canlıda.
Detay: `docs/arsiv/09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md`.

## 4-rol metodolojisi (strateji → kıyas → aksiyon)
STK yönetici ✅ · Platform admin ✅ · **Mentör ✅** (panel + chat canlıda) · **Menti ⬜ (henüz)**.

## Chat v1 — bilinen sınırlar (PO kararı, kod eksiği değil)
- Backfill yok (eski `MatchRequest.requestMessage` chat'e taşınmadı).
- `VisibilityOptIn.requestMessage` ölü alan DROP edilmedi (şema değişikliği → ertelendi, bkz. 05).
- Deep-link e-postada yok; admin moderasyon inbox'ı yok (kapsam dışı).

---

## Son doğrulanan git durumu (2026-08-11, devir anı)
- Çatı main HEAD: `da6a138` (Merge `#57`). Backend main HEAD: `afc2769` (Merge `#36`).
- Submodule pointer `afc2769` = backend main HEAD → **senkron**.
- Açık PR: iki repoda **SIFIR** (devir anında). Çatı CI main: SUCCESS.

> ⚠️ Bu SHA/PR değerleri devir anına aittir. Yeni sohbet **git'ten yeniden doğrulamalı** —
> araya yeni iş girmiş olabilir. Sıradaki iş için **03-kvkk-is-paketi**'ne geç.
