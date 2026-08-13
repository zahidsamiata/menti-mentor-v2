# 09 — GÜNCEL DURUM (ŞU AN NEREDEYİZ)

**Son güncelleme:** 2026-08-10 (belge temizliği: eskimiş/çelişkili bloklar arşive taşındı → tek tutarlı durum).
Bu belge SIK güncellenir — her oturum başında oku, sonunda güncelle.
**Sıradaki işler + öncelik:** `docs/kararlar/10-yol-haritasi.md`. **2026-08-10 öncesi tam geçmiş:**
`docs/arsiv/09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md`. **Belge denetimi (neden temizlendi):**
`docs/kararlar/belge-denetimi-2026-08-10.md`.

---

## ⚡ TEK BAKIŞTA (şu an — hepsi doğrulanmış)
- **Canlı:** sivilkapasite.org ayakta (Dokploy). **Mail çalışıyor** (generic SMTP relay — Resend/Brevo;
  Gmail App Password kaldırıldı, `emailService.ts`). Forgot/reset-password akışı tam.
- **DB:** Canlı = lokal aynı Neon (`ep-fancy-tooth-ab4u5xhr`). DISC soruları (20) + öğrenme aşamaları (13) yüklü.
- **Backend main HEAD:** `afc2769` · çatı main submodule pointer = `afc2769` (senkron, doğrulandı).
- **Açık PR (kod):** SIFIR (iki repo). Bekleyen birikim yok.
- **İzole test DB:** `backend/.env.test` + `assertTestDatabase` guard VAR (lokal `verify` güvenli).

## ✅ CANLIDA / KAPANMIŞ (kod main'de)
- **CHAT v1 — TAM CANLIDA.** menti↔mentör mesajlaşma: inbox/thread + `MessagesBell` (45sn polling) +
  menti zorunlu ilk mesaj + katılımcı-bazlı yetki + okundu-bazlı e-posta. Backend #33 + frontend #47/#48 MERGED.
  Canlı Neon'da `Conversation`+`Message` tabloları var (migration applied). Detay: `chat-v1-teslim.md`.
- **MENTÖR PANELİ — TAM CANLIDA.** Gerçek metrik kartları (aktif menti · bekleyen · tamamlanan · ortalama NPS)
  endpoint `GET /api/mentors/:mentorId/dashboard-metrics` (IDOR korumalı `requireSelfOrAdmin`, salt-okuma) +
  **Yaklaşan Toplantılar** (onaylı/SCHEDULED). Backend #36 + çatı #52/#51 MERGED.
- **Ölü kod temizliği — menti-driven görünürlük talebi (Taraf-2):** `mentiRequestController.ts` + 3 rota
  SİLİNDİ (backend #35 + çatı pointer #50). Taraf-1 `setVisibilityOptIn` **kasıtlı korundu**.
- **Güvenlik turu (O1-O5) · eski PR kurtarma turu · retention (STK-yönetici) · platform admin turu ·
  fotoğraf altyapısı · timezone fix · IDOR fix'leri** — hepsi MERGED, canlıda (geçmiş detay arşivde).
- **Unutulmuş-niyet envanteri** (`unutulmus-niyet-envanteri-2026-08-10.md`, #54) + **belge denetimi** (#56) MERGED.

## 🔧 AÇIK PR — BU TURDA (merge PO'da)
- **STK admin 13-bulgu keşfi:** `docs/kararlar/stk-admin-bulgu-envanteri-2026-08-11.md` (13/13 kanıtlı; "arka-var-ön-yok" 3 madde).
- **STK admin UI bağlama (S işler):** 3 küçük "arka-var-ön-yok"/UI işi bağlandı — **B7** Yönetici atama UI
  (backend `promote/demote` zaten vardı, ön yüze bağlandı), **B9** CORE/DEEPENING görünen etiket Türkçeleştirme
  (enum-safe; DB değeri değişmedi), **B1** şifre göster/gizle (paylaşılan `PasswordField` molekülü → login + reset).
  Salt-frontend, şema/DB dokunulmadı. **PR: (aşağıda no).**
  - **Bilinen sınır / ertelendi:** **B4** (DISC ikincil/karma gösterim) bu turdan ÇIKARILDI — ikincil tipi göstermek
    backend'e yeni türetilmiş DISC alanı eklemeyi gerektiriyor; backend `CLAUDE.md` bunu PII sınıfında tutuyor
    ("yeni alanı sınıflandırmadan user-facing select'e ekleme") → PO/uyum kararı + ayrı backend turu gerekir.

## 4-rol metodolojisi (strateji→kıyas→aksiyon)
STK yönetici ✅ · Platform admin ✅ · **Mentör ✅** (panel + chat canlıda) · **Menti ⬜** (sıradaki).

## ⏳ BEKLEYEN — ürün sahibi elinde (kod değil, kaybolmasın)
- **Chat uçtan uca canlı test:** menti→mentör ilk mesaj · thread · çan rozeti · okundu.
- **Foto volume doğrulama** (Dokploy redeploy sonrası kalıcılık — `dokploy-foto-volume-talimati.md`).
- **Mentör paneli metriklerini canlıda gözle görme** (gerçek veri doluyor mu).
- **Repoları PRIVATE yapma** (GitHub web ayarı; sonra Dokploy erişimini doğrula).

## ⚠️ ERTELENMİŞ TEKNİK BORÇ (bilinçli)
- **`VisibilityOptIn.requestMessage` ŞEMA kolonu duruyor** — kod artık yazmıyor/okumuyor; DROP = migration
  → DB'ye dokunan, PO-onaylı ayrı bir migration turunda temizlenecek ("DB şeması değişmez" kuralı).

## 🔴 KIRMIZI KURALLAR (kalıcı)
- Canlı = lokal aynı Neon → DB işleminde (seed/migration/backfill) **önce onay al**. Tehlikeli seed asla.
- main'e merge = canlıya deploy (autodeploy açık) → **merge kararı ürün sahibinde**. PR aç, merge etme.
- Submodule sırası: backend push → çatı `git add backend` → çatı commit → çatı push (ara commit yok).
- Ürün kararı ürün sahibinde; dürüst pushback yap; testi/CI'ı yeşil gösterme, gerçeği ver.

## GÜNCELLEME NOTU
Bu belge yalnızca **ŞU AN**'ı tutar (tek tutarlı durum). Tamamlanan işler buraya kısa özet olarak yazılır,
detaylı geçmiş arşive taşınır. Karara bağlanan açık sorular 08'e/ilgili belgeye işlenir.
