# 09 — GÜNCEL DURUM (ŞU AN NEREDEYİZ)
**Son güncelleme:** 2026-08-02 (geç oturum: güvenlik fix'leri + fotoğraf altyapısı + kart/retention kararları) · Bu belge SIK güncellenir — her oturum başında oku, sonunda güncelle.

## ⚡ TEK BAKIŞTA
- **Canlı:** sivilkapasite.org ayakta (Dokploy). Mail (Resend) çalışıyor.
- **DB:** Canlı = lokal aynı Neon. DISC soruları (20) + öğrenme aşamaları (13) yüklendi.
- **Açık PR'lar:** Hiçbiri merge edilmedi. Çok sayıda iş PR/commit'lerde bekliyor (bugün foto altyapısı da eklendi).
- **Bugün kapandı:** 2 IDOR açığı + timezone bug + fotoğraf altyapısı (upload+kart gösterimi).
- **Sıradaki (bkz. 10 güncel öncelik kuyruğu):** MERGE TURU (+ Dokploy foto volume) → profil-düzenleme keşfi → kart+sayfalama tasarımı → retention turu.
- **Açık kararlar:** tema DISC renk (light) + kart DISC gösterim biçimi + foto ne zaman zorunlu (bkz. 08).

## ✅ SON YAPILANLAR (2026-08-02 — GEÇ OTURUM: güvenlik + foto + kararlar)
> Hepsi commit'li, **HİÇBİRİ merge edilmedi** (branch'ler: çatı `feat/light-theme`, backend `feat/platform-panel-deep`).

**Güvenlik / bug:**
- 2 IDOR açığı kapatıldı (`/mentors/:id/candidates` + `/requests/:id`) — backend `161ae00`.
- bookMeeting timezone bug'ı (UTC/Europe-Istanbul) düzeltildi — backend `6a30f21`.

**Kapasite / UX:**
- `listUsers` sayfalama eklendi (kapasite darboğazı; gerçek sayfasız endpoint `/api/users`, tüketici menti mentör-tarama; şimdi `pageSize=100`) — backend `909c065` + frontend `60eb64f`.
- D21: admin/platform nav'a tema toggle butonu — frontend `188aad5`.

**Dokümantasyon / temizlik:**
- docs/ klasör düzeni + `06-tasarim-ux.md` geri eklendi; CLAUDE.md'ye "CANLI=LOKAL DB" uyarısı + "Proje Hafızası" haritası — `81d718c`.
- Kök "Menti Mentör proje/" boş klasörü + kök 06 kopyası silindi.
- 5 keşif raporu (docs/raporlar/): depo-denetimi, kapasite-analizi, hayalet-backend, tema-durum-ve-landing-maliyeti, **kart-havuz-backend-envanteri** (`e0608a4`).

**🖼️ FOTOĞRAF ALTYAPISI (bugünkü son iş — tamamlandı):**
- **Backend** (`3bee4ba`, `27cc788`, `1ab33cb`): `POST /api/users/me/avatar` — multer + magic-byte içerik doğrulaması (jpeg/png/webp, SVG red) + 5MB sınırı + kullanıcı-başı rate limit + güvenli rastgele isim (path traversal yok) + eski foto silme + `/uploads` statik güvenli servis (nosniff/CSP sandbox). `avatarUrl` havuz/aday/getUser select'lerine eklendi.
- **Frontend** (`278c142`, `26687cd`): `UserAvatar` atom (foto yoksa baş-harf fallback) + profil sayfası yükleme + 3 havuz kartında gösterim + apiClient FormData desteği + next.config remotePatterns.
- **Depolama:** KALICI DİSK (Dokploy persistent volume). Foto **OPSİYONEL** (ileride zorunlu).
- **⚠️ Dokploy'da yapılacak (Zahid):** persistent volume mount `/app/uploads` + `UPLOAD_DIR=/app/uploads` env + `NEXT_PUBLIC_API_URL` kontrolü.

**Bugünkü ürün kararları:** kart tasarımı + mesajlaşma (yok, niyet mektubu) + tema/landing (canlı-sonrası) → **06-tasarim-ux**'a; yeni öncelik kuyruğu → **10-yol-haritasi**'na; yeni açık sorular → **08**'e işlendi.

## ✅ SON YAPILANLAR (2026-08-02 — ERKEN OTURUM)
- Çöken mentör/menti dashboard düzeltildi (DailyQuestionWidget). Commit cfda33c.
- Kapsamlı teşhis → docs/teshis-raporu-2026-08-02.md.
- Admin panelleri tasarım keşfi → docs/admin-panelleri-tasarim-2026-08-02.md.
- Çıkış butonu (B11) + anlamlı hata mesajları (B14). Commit a606bab.
- 5 admin paneli kodlandı (mentör/menti havuzu, sertifika sonuç, eşleşme, branding).
- Global içerik seed (DISC 20 + aşama 13) ana Neon'a. Mevcut veri sabit.
- Hafıza sistemi kuruldu (bu docs/ belgeleri).

## 📂 AÇIK PR'LAR (hiçbiri MERGE EDİLMEDİ)
- **PR #32** (feat/light-theme): tema altyapısı + dashboard fix + çıkış butonu + hata mesajları + 5 admin paneli (frontend).
- **PR #26** (feat/platform-panel-deep, backend): panel derin görünüm + yeni admin endpoint'leri (eşleşme/sertifika — 08-02'de eklendi).
- **PR #29** (frontend panel derin görünüm — mail/panel chat'inden).
- **PR #27/#28** (güvenlik paketi), **PR #30** (UX), **PR #31** (CLAUDE.md).
- Merge runbook: teshis-raporu'nda. Sıra: backend PR → çatı pointer bump → çatı PR. b3 membership backfill dikkat.

## ⏳ BEKLEYEN İŞLER (öncelik Zahid'de)

### 🔴 Canlı-öncesi kritik
- ~~2 yeni IDOR fix (/mentors/:mentorId/candidates + /requests/:id).~~ ✅ YAPILDI (backend `161ae00`).
- KVKK blocker'ları (privacy center, DISC rıza, 18+ — açık sorulara bağlı, bkz. 08).
- Sunucu/altyapı güvenliği (Dokploy HTTP+açık, firewall, SSH, SSL) — hiç ele alınmadı.
- Arkadaşın başvurusu — gerçek kişi bekliyor.

### 🟡 Kullanılabilirlik / özellik
- B10 cache turu (yavaşlık) — karar verildi, ayrı dikkatli tur.
- Admin panellerini tarayıcıda gez + onayla (kodlandı ama görülmedi).
- A8 DISC görüntüleme + oyunlaştırma teyidi (seed geldi, kullanıcı bakacak).
- Yöneticilik akışı (A9) — yeniden kurgu, kod öncesi kullanıcıya sorulacak.
- Geri bildirim mekanizması (mail ile).

### 🟡 Tasarım / UX
- Tema bitirme: D21 toggle admin'e + D22 DISC renk kontrast + D23 rozetler. DISC renk TON kararı kullanıcı gözünden bekliyor.
- Landing slogan uygulama + Landing UX paketi.
- Sol menü tipografi, açıklama metinleri, dropdown Türkçeleştirme.

### 🟡 Algoritma (psikometri chat'inden yarım kalanlar)
- Sektör skoru kodu (sectorScoreResolver) — reçete var, kod stub (nötr 50 dönüyor). **= İŞ 7** (staging sonrası; canlı eşleşmeyi değiştirir). Kart %UYUM'u buna BAĞLI DEĞİL — bugünkü skorla çalışır.
- UserProfile sektör alanları migration + IndustryNode ağacı.
- Tenant plan/limit altyapısı (freemium için).
- ~~timezone bug düzeltmesi (bookMeeting).~~ ✅ YAPILDI (backend `6a30f21`).

## 📌 KALICI HATIRLATMALAR
- Canlı = lokal aynı DB → DB işleminde onay al (detay: 02).
- Tehlikeli seed.ts asla çalıştırma (detay: 02).
- PR aç, merge etme (Zahid inceler).
- Ürün kararı Zahid'de, dürüst pushback yap.

## GÜNCELLEME NOTU
Bu belge her oturum sonunda güncellenmeli. Karara bağlanan açık sorular 08'den ilgili belgeye taşınmalı.
