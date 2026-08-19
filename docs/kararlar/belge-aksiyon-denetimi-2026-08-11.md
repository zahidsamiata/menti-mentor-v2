# Belge-Aksiyon Denetimi — "Kararlar aksiyona geçti mi?" (2026-08-11)

**📸 DONDURULMUŞ (2026-08-11)** — denetim fotoğrafı (kararlar aksiyona geçti mi?).

> **Amaç:** Aylardır süren projede docs/ altında biriken belgelerdeki ALINAN KARARLAR/FİKİRLER gerçekten
> koda/ürüne geçti mi, yoksa yazılıp unutuldu mu? Belge üretmek ≠ iş yapmak. Bu denetim her belgeyi açtı,
> somut kararları çıkardı ve GERÇEKLE (kod + git + güncel 10-yol-haritasi) kıyasladı.
>
> **İLERLEME: 34/34 belge tarandı** (15 kararlar + 16 raporlar + 3 arşiv). Kendi `docs/devir/` (6) kapsam dışı.
>
> **Yöntem:** 5 paralel salt-okuma denetçisi belge gruplarını taradı; bulgular tek rapora sentezlendi.
> Dört kategori: **YAPILDI** (kod/git kanıtı) · **YOL HARİTASINDA** (10-yol'da kayıtlı, yapılmadı) ·
> **UNUTULDU** (ne kodda ne yol haritasında) · **TEYİT GEREK** (kanıt belirsiz/çelişkili — tahmin edilmedi).
>
> **⚠️ Dürüstlük notu:** Bu salt-okuma denetimdir; hiçbir belge/kod değiştirilmedi. Bazı maddeler
> **TEYİT GEREK** çünkü denetçiler ÇELİŞKİLİ kanıt buldu (özellikle "2 IDOR" — biri "kod korumalı",
> diğeri "bozuk" dedi). Bu maddeler kesin iddia DEĞİL; ürün sahibi/derin inceleme gerektirir. Geçerlilik
> ve öncelik kararı **ürün sahibinde** — bu tur hiçbir karar ajan tarafından verilmedi, yol haritası güncellenmedi.
>
> **Not (raporlar 2026-08-02 tarihli):** raporlardaki birçok bulgu o günün fotoğrafı; aradan geçen
> ~9 günde çok iş merge oldu. "BOZUK/eksik" işaretli maddeler EskİMİŞ olabilir → çoğu TEYİT GEREK.

---

## BÖLÜM 1 — docs/kararlar/ (15 belge)

### 01-urun-vizyonu.md
| Karar/fikir | Akıbet | Kanıt |
|---|---|---|
| DISC/mizaç temelli eşleştirme | YAPILDI | `backend/src/services/scoring.config.ts` (COMPATIBILITY_MATRIX, BLOCKED_PAIRS) + `scoring.service.ts` |
| Multi-tenant B2B2C | YAPILDI | `schema.prisma` Tenant modeli + `middleware/tenant.ts` requireTenant |
| Anti-toksik + opt-in gizlilik (üçlü fark) | YAPILDI | `scoring.config.ts` BLOCKED_PAIRS (hard-gate) |
| Freemium (şimdilik ücretsiz, ileride premium) | TEYİT GEREK | `schema.prisma` `plan`/`limits` alanları VAR ama `limits` boş; "nasıl kullanılacak" tanımı yok |
| Modül sırası (Mentörlük→Hafıza→Sponsorluk→…) | YOL HARİTASINDA / TEYİT GEREK | ileride modüller; net roadmap satırı yok → PO teyit |
| Erasmus hariç (iptal) | YAPILDI | kodda Erasmus yok; belge kendini güncellemiş |

### 02-mimari-ve-altyapi.md
| Karar/fikir | Akıbet | Kanıt |
|---|---|---|
| Canlı=lokal aynı Neon (kritik uyarı) | YAPILDI | `backend/.env` host `ep-fancy-tooth-ab4u5xhr` (secret yazılmadı) |
| Express + Prisma + Next.js 15 | YAPILDI | `backend/package.json`, `frontend/package.json` |
| Resend/generic SMTP mail | YAPILDI | `emailService.ts` (Gmail App Password kaldırılmış) |
| Neon migration kuralı (IF NOT EXISTS, db push YASAK) | YAPILDI | belge + uygulanan migration deseni |
| Seed uyarısı (tehlikeli seed silicidir) | YAPILDI | güvenli seed listesi belgede |
| "31 migration / 60+ model" sayıları | TEYİT GEREK | model varlığı görüldü, migration sayısı sayılmadı |

### 03-psikometri-ve-algoritma.md
| Karar/fikir | Akıbet | Kanıt |
|---|---|---|
| DISC→OCEAN adapter | YAPILDI | `disc-to-ocean.adapter.ts` + `scoring.config.ts` DISC_TO_OCEAN_WEIGHTS |
| 8 arketip (4+4) | YAPILDI | `selfServeController.ts` DISC_ARCHETYPES + `deriveArchetype` |
| Formül (Sektör×0.60 + Mizaç×0.40)×qualityMultiplier | YAPILDI | `scoring.config.ts` WEIGHTS + `scoring.service.ts` |
| Hard-gate toksik blok | YAPILDI | `scoring.config.ts` BLOCKED_PAIRS + `isHardBlocked` |
| SJT senaryo soruları (Likert reddedildi) | YAPILDI | `sjt-scorer.ts` |
| Sektör skoru 5-bileşen (30/25/25/15/5) | **YOL HARİTASINDA** | `sector-scorer.service.ts` 5-bileşen YAZILI ama **canlı yola BAĞLI DEĞİL**; canlı `scoring.ts` `computeSectorScore` (tag-overlap ×0.6). 10-yol C bölümü "sektör skoru bağla" |
| Sertifika (5 boyut, 65 baraj, 24s cooldown) | YAPILDI | `certification.service.ts` CERT_CONFIG |
| Kademeli fallback (boş havuz hata değil) | YAPILDI | `matching.ts` fallbackLevel 0-3 |

### 04-guvenlik-ve-kvkk.md
| Karar/fikir | Akıbet | Kanıt |
|---|---|---|
| 5 katman tenant izolasyonu | YAPILDI | `middleware/tenant.ts` (header+JWT+çelişki 403+üyelik+RLS) |
| X-Tenant-Id güvensiz, JWT çapraz-doğrula | YAPILDI | `tenant.ts` cross-tenant 403 |
| **`/mentors/:mentorId/candidates` IDOR** | **TEYİT GEREK (ÇELİŞKİ)** | Denetçi-1: `matchingController.ts` yetki kontrolü VAR (korumalı görünüyor). Denetçi teshis: "BOZUK". **Çelişki → canlı doğrulama şart** |
| **`/requests/:id` IDOR** | **TEYİT GEREK (ÇELİŞKİ)** | Denetçi-1: `requestController.ts` üyelik doğrulaması VAR. teshis: "BOZUK". **Çelişki → doğrula** |
| ↳ **✅ ÇÖZÜLDÜ (2026-08-14)** — her iki IDOR | **KORUMALI — açık YOK** | Kod keşfi: her iki endpoint tenant izolasyonu + sahiplik kontrolü ile korumalı; düzeltme commit `161ae00` (`matchingController.ts:45-52`, `requestController.ts:116-121`). Çelişki kapandı: Denetçi-1 haklı; teshis "BOZUK" bulgusu eskimiş. |
| certified/qualityMultiplier UserProfile→TenantMembership | YAPILDI (kısmi) | `schema.prisma` TenantMembership'te alanlar VAR; tüm okumaların oradan olduğu TEYİT GEREK (K7) |
| DISC ham profil asla gösterilmez | YAPILDI | `matchingController.ts` buildPublicItem maskeleme |
| Audit log (KVKK Md.12) | YAPILDI | `platformAudit.ts` (SystemLog'a AUDIT) |
| Privacy center UI / DISC ayrı rıza / 18+ / FK nullable | YOL HARİTASINDA | 10-yol B (KVKK K1-K5) + envanter D |

### 05-ozellikler-ve-paneller.md
| Karar/fikir | Akıbet | Kanıt |
|---|---|---|
| Platform admin panel (detay+listeler+DISC dağılım) | YAPILDI (backend) / TEYİT GEREK (FE drill-down) | `platformTenantController.ts` endpoint'ler VAR; FE drill-down çağrısı belirsiz |
| 5 admin panel (eşleşme/havuz/sertifika/branding) | YAPILDI | `frontend/(admin)/admin/*` dizinleri + backend merged |
| Takvim/Availability + Meeting Feedback | YAPILDI | `schema.prisma` Availability/Meeting + `feedback.service.ts` |
| **Meeting feedback timezone (UTC vs İstanbul)** | **TEYİT GEREK** | belge ⏳ "düzeltilmedi"; canlı doğrula (eskimiş olabilir) |
| Öğrenme yolculuğu (13 aşama) | YAPILDI | `learningJourney.service.ts` + seed |
| DISC/sektör ağırlık ayarı (A6, hardcoded) | YOL HARİTASINDA | 10-yol A md.6 (kalibrasyon merkezi) |
| **Arkadaşın başvurusu panelde görünmedi (b3)** | **TEYİT GEREK** | belge ⏳; git'te membership fix var, doğrulama yok |

### 06-tasarim-ux.md
| Karar/fikir | Akıbet | Kanıt |
|---|---|---|
| Dark/light tema altyapısı | YAPILDI | `ThemeProvider.tsx` + `ThemeToggle.tsx` + Tailwind darkMode |
| ThemeToggle admin/platform nav'a | YOL HARİTASINDA / kısmi | menti/mentör nav'da VAR; admin/platform'da yok (D21) |
| **Landing slogan değişimi ("Mentörlük programınızı…")** | **UNUTULDU** | karar verilmiş (06:21); `frontend/src/app/page.tsx` hâlâ eski slogan; grep yeni slogan boş; yol haritasında spesifik değil |
| Landing UX paketi (tooltip/hover/WCAG kontrast) | YOL HARİTASINDA | 10-yol D (landing UX) |
| DISC renk WCAG (light) + platform rozet light | YOL HARİTASINDA | 10-yol D/E |
| **Yumuşak lacivert tema yönelişi** | **UNUTULDU** | karar var, kodda uygulanmamış; roadmap'te spesifik değil (landing UX'e gömülü olabilir → PO teyit) |
| Kart tasarımı (görsel kart + %uyum + detay sayfası) | YOL HARİTASINDA / kısmi | havuz tablo liste; kart-stil + detay sayfası yok (13-admin & kart işi) |

### 07-calisma-tarzi.md
| Karar/fikir | Akıbet | Kanıt |
|---|---|---|
| 8-unsur prompt standardı | YAPILDI (süreç) | `CLAUDE.md` + bu belge; çalışma kuralı |
| Hafıza sistemi (CLAUDE.md + docs/ + devir belgesi) | YAPILDI | `CLAUDE.md` + `docs/` + `docs/devir/` (bu oturum #58) |
| DB/prod refleksleri | YAPILDI | guard + kurallar CLAUDE.md'de |

### 08-acik-sorular.md (açık sorular — çoğu karar bekliyor)
| Karar/fikir | Akıbet | Kanıt |
|---|---|---|
| Yaş politikası (18+ vs genç+veli) | YOL HARİTASINDA | 10-yol B (K4); terms↔ürün çelişkisi sürüyor |
| Veri sorumlusu + sunucu konumu beyanı | YOL HARİTASINDA | 10-yol B (K5) |
| Yasal metin taslak (hukukçu) | YOL HARİTASINDA | 10-yol B (K1) |
| **Eşleşme tetikleyicisi (event-driven mi sayfa-açılınca mı)** | **UNUTULDU** | 08:20 karar yok; kodda net tetik yok; yol haritasında yok → PO kararı |
| Yöneticilik-verme (tüm onaylı liste) | YOL HARİTASINDA / kısmi | promote/demote var; liste UI eksik (13-admin md.7) |
| Etiket doğrudan ekleme | TEYİT GEREK | `adminSettingsRoutes.ts` — derin inceleme gerek (13-admin md.12) |
| Fotoğraf ne zaman zorunlu | YOL HARİTASINDA / karar | envanter; opsiyonel→zorunlu kararı yok |
| Kart DISC gösterimi (harf/renk/kelime), kart/sayfa sayısı | YOL HARİTASINDA | 13-admin md.3/4 (tasarım kararı) |

### 09-DURUM.md / 10-yol-haritasi.md (canonical durum/kuyruk)
| — | — | main'de günceldir (temizlik #57). Bu denetimin referans tabanı; kendileri "karar" değil durum belgesidir. Çelişki yok (belge hijyeni sonrası). |

### belge-denetimi-2026-08-10.md (önceki denetim)
| Bulgu | Akıbet | Kanıt |
|---|---|---|
| İŞ 0 mail eskimiş / İŞ 2 test DB guard | YAPILDI | doğrulandı (mail çalışıyor; `.env.test` + guard) |
| İŞ 1 temizlik / İŞ 5 staging / İŞ 7 sektör | YOL HARİTASINDA | 10-yol C/D; worktree `cati-lj/bump/compose` hâlâ var |

### chat-v1-teslim.md
| Karar | Akıbet | Kanıt |
|---|---|---|
| Chat v1 (başlat/thread/okundu/mail/polling) | YAPILDI | #33/#47/#48 MERGED; `conversationController.ts` + `MessagesBell` |
| Backfill yok / VisibilityOptIn.requestMessage DROP ertelendi | YOL HARİTASINDA | 10-yol C (DROP ayrı migration) |

### dokploy-foto-volume-talimati.md
| Karar | Akıbet | Kanıt |
|---|---|---|
| `/app/uploads` kalıcı volume + UPLOAD_DIR + uid 1001 test | YOL HARİTASINDA (PO MANUEL) | 10-yol E; Dokploy paneli işi, kod değil — merge/autodeploy öncesi ŞART |

### unutulmus-niyet-envanteri-2026-08-10.md
| Bulgu | Akıbet | Kanıt |
|---|---|---|
| K1-K6 KVKK | YOL HARİTASINDA | 10-yol B/C |
| Bekleme salonu bildirim izni | YOL HARİTASINDA | 10-yol C (envanter #54 D) — `Notification.requestPermission` kodda yok (grep boş) |
| Sektör skoru uyuyor / super-admin+Taraf-1 / VisibilityOptIn DROP | YOL HARİTASINDA | 10-yol C |

### 00-INDEX.md
| Karar | Akıbet | Kanıt |
|---|---|---|
| Belge haritası + çelişki çözüm kaydı (fiyat/isim/Erasmus) | YAPILDI | `docs/kararlar/` sistematik + arşiv mekanizması |

---

## BÖLÜM 2 — docs/raporlar/ (16 belge, hepsi 2026-08-02 — eski, dikkat)

> **Genel bulgu:** Raporlar keşif/strateji/persona niteliğinde. Panel/backend işlerinin ÇOĞU merged;
> tekrar eden desen: **backend HAZIR, frontend/UI bağlanmamış** veya **kod var, KPI'ya bağlı değil**.
> Persona/sevdirme raporları fikir ağırlıklı — birçoğu "ürüne geçti mi" TEYİT GEREK.

### admin-panelleri-tasarim / platform-admin-panel-envanteri / stk-yonetici-panel-envanteri
| Karar/fikir | Akıbet | Kanıt |
|---|---|---|
| Mentör/Menti havuzu (liste+filtre+sayfalama) | YAPILDI | `userController.ts` `GET /api/users?role=` + pagination |
| Sertifika sonuç panosu | YAPILDI (backend) / TEYİT GEREK (UI) | `TenantMembership.certificationStatus/certScore`; UI bağlama teyit |
| Branding düzenleme (logo https-only) | YAPILDI | `(admin)/admin/branding/page.tsx` + logo URL guard |
| Eşleşme paneli — **Match DB'ye persist ediliyor mu** | **TEYİT GEREK** | `Match` modeli var; runtime skorlama var; canlı persist sorgusu yapılmadı (DB'ye bağlanılmadı) |
| **Platform drill-down UI (backend hazır, FE yok)** | **UNUTULDU / TEYİT GEREK** | `platformTenantController.ts` overview/members/meetings/analytics VAR; `lib/api/platform.ts` çağrısı belirsiz; roadmap'te net değil → değerli aday |
| **`lastLoginAt` KPI'ya entegre değil** | **TEYİT GEREK / YOL HARİTASINDA** | `lastLoginAt` alanı + `retentionMetrics.service.ts` VAR; admin KPI'a bağlı mı belirsiz; 10-yol C retention |
| KPI drill-down (sayıdan kişiye) | UNUTULDU / TEYİT GEREK | özet sayılar var; drill-down UI belirsiz; roadmap'te spesifik değil |
| **Tenant hard-delete (KVKK Md.7)** | **UNUTULDU** | sadece freeze (soft) var; hard-delete endpoint yok; roadmap'te yok → KVKK ilişkili değerli aday |
| SuspicionReport tenantId/maskeleme | TEYİT GEREK | şema global; iyileştirme belirsiz |
| Otomatik nudge (pasif üyelere) | YOL HARİTASINDA | manuel `nudgeUser` var; otomatik cron 10-yol C (retention davranışsal) |

### platform-admin-strateji / stk-yonetici-strateji (self-audit'li — yüksek kalite)
| Karar/fikir | Akıbet | Kanıt |
|---|---|---|
| Ayrı platform katmanı (aud:'platform', requirePlatformAdmin) | YAPILDI | `platformAuth.ts` + `platformRoutes.ts` |
| Kurum yaşam döngüsü (approve/reject/freeze/activate) | YAPILDI | `platformController.ts` |
| Elle eşleştirme YOK (bilinçli sınır) | YAPILDI | tasarım kararı; `rankMentisForMentor` algoritma, pairing endpoint yok |
| Onay/davet/dürtme/yönetici-atama + son-admin guard + max 3 | YAPILDI | `adminController.ts` (son-admin guard, max 3) |
| Hayalet mod (onay kapısı, menti→mentör APPROVED filtresi) | YAPILDI | `matching.ts` + `listUsers` approvalStatus filtresi (#31) |
| Ön-tanımlı davet OTOMATİK onay (Yol B) | TEYİT GEREK | InvitationTemplate var; otomatik-onay davranışı net konumlanmadı |
| Sistem-geneli büyüme trendi (lastLoginAt zaman serisi) | YOL HARİTASINDA / UNUTULDU | anlık sayı var; trend yok; roadmap'te spesifik değil |

### tema-durum-ve-landing-maliyeti
| Karar | Akıbet | Kanıt |
|---|---|---|
| Tema altyapısı | YAPILDI | ThemeProvider |
| D21 toggle admin/platform · D22 WCAG · D23 rozet light | YOL HARİTASINDA | 10-yol D/E |
| Landing maliyeti (~256 nokta, canlı-sonrası ertele) | YOL HARİTASINDA | 10-yol D |

### teshis-raporu-2026-08-02 (kapsamlı bug/güvenlik/KVKK — EN çok bulgu)
| Grup / madde | Akıbet | Kanıt |
|---|---|---|
| A1-A4/A7 paneller (backend hazır, UI) | YAPILDI (backend) / TEYİT GEREK (UI güncel mi) | endpoint'ler var; UI çoğu sonradan merged — güncel durum doğrula |
| A6 DISC/sektör ağırlık ayarı | YOL HARİTASINDA | 10-yol A md.6 |
| A8 DISC soru görüntüleme | YAPILDI | `admin/questions` |
| **B11 logout / B12 kullanıcı kartı — "BOZUK"** | **TEYİT GEREK (muhtemelen eskimiş)** | teshis 2026-08-02 "logout UI'a bağlı değil". ~9 gün geçti; canlıda logout var mı DOĞRULA — eskimişse çöz |
| B10 sekme yavaşlık / B14 hata mesajı / B15 progress | TEYİT GEREK | teshis bulguları; güncel durum doğrula (B15 savunmacı guard eklenmiş) |
| C17 sayfa metinleri merkezileştirme | UNUTULDU | dağınık inline string; roadmap'te yok |
| C18 CORE/DEEPENING Türkçe | YOL HARİTASINDA | 10-yol A md.9 |
| **2 IDOR (mentors/candidates, requests/:id)** | **TEYİT GEREK (ÇELİŞKİ)** | teshis "BOZUK" ↔ 04-denetçi "kod korumalı". **Canlı doğrulama şart** (bkz. Bölüm 1 / 04) |
| Privacy center UI / DISC ayrı rıza / 18+ yaş / Meeting FK nullable | YOL HARİTASINDA | 10-yol B (KVKK) |
| E24 kullanıcı geri bildirim (mail göndermiyor, DB'ye yazıyor) | TEYİT GEREK / UNUTULDU | altyapı var; MVP bağlama belirsiz; roadmap'te net değil |

### Persona/sevdirme raporları (menti/mentör/yönetici — fikir ağırlıklı)
| Fikir | Akıbet | Kanıt |
|---|---|---|
| İlk-aha "ben değerliyim" (DISC kartı hediye gibi) | TEYİT GEREK | `discResultCard` verisi var; "hediye gibi" sunum UI'da render teyit |
| Bekleme anını doldur (Learning Journey) | YAPILDI | `learningJourney.service.ts` + seed |
| Reddi yumuşat ("3 alternatif") | TEYİT GEREK | fallback var; FE "alternatifli ret" gösterimi teyit |
| Emeği görünür kıl (mentör "12 saat" + rozet) | YAPILDI (metrik) / TEYİT GEREK (rozet UI) | `dashboard-metrics` var; sertifika/rozet UI bağlama teyit |
| **Mentör otomatik nudge/bildirim ritmi (P3)** | **YOL HARİTASINDA** | otomatik nudge yok; 10-yol C retention |
| Kart "az bilgi" + %uyum + foto zorunlu (rakip analizi kararları) | YOL HARİTASINDA / kısmi | kart bileşeni + foto upload yok (13-admin & kart işi) |

### hayalet-backend-2026-08-02 (ölü/bağlanmamış kod taraması)
| Bulgu | Akıbet | Kanıt |
|---|---|---|
| `iceBreaker.ts` ölü | YAPILDI (çözülmüş) | dosya yok (silinmiş) |
| `rewardPenalty.ts` "kullanılmıyor" | YAPILDI (yanlış alarm) | aktif kullanılıyor (feedback sinyali) |
| **`sector-scorer.service.ts` bağlanmamış** | **YOL HARİTASINDA** | 5-bileşen yazılı, canlı yola bağlı değil; 10-yol C |
| **SJT endpoint'leri (`/scoring/compute-profile`, `/rank-mentors`) — FE çağrısı yok** | **TEYİT GEREK** | route'lar var; frontend çağrısı grep boş → bağla mı sil mi (PO) |
| `/admin/users/:id/rematch`, `/visibility-optin/:id/confirm` — FE bağlama | TEYİT GEREK | endpoint var; UI çağrısı belirsiz |
| `matchingInterface.ts` / `llmRetry.ts` atıl mı | TEYİT GEREK | import izi belirsiz |

### depo-denetimi / kapasite-analizi / kart-havuz-backend-envanteri / katilim-modeli
| Bulgu | Akıbet | Kanıt |
|---|---|---|
| `listUsers` sayfalama (canlı-öncesi kritik darboğaz) | YAPILDI | `userController.ts` page/pageSize |
| Neon pool / mail cron / matching cache | YOL HARİTASINDA | canlı-sonrası; staging'de load-test |
| Cron multi-instance lock | TEYİT GEREK | in-process; staging'de lock |
| Uyum% / niyet mektubu / müsaitlik-takvim / DISC rozet | YAPILDI | `computeTotalScore` + `MatchRequest.requestMessage` + `AvailabilityBlock` |
| **Fotoğraf upload (client-side) — kart işini bloke ediyor** | **UNUTULDU** | `avatarUrl` var (OAuth'dan); client upload endpoint/UI yok; roadmap'te net değil → değerli aday |
| Ön-tanımlı davet + imzalı link + elle ekleme | YAPILDI | `InvitationTemplate` + `/invitations/:token/join` + `createUser` |
| **Hayalet mod (pasif ön-oluşturulmuş üye) + toplu CSV davet** | **UNUTULDU** | şemada yok; roadmap'te yok → ayrı tur, PO kararı |
| `.env.backup-*` temizliği | TEYİT GEREK | gitignore'lu; env geçişi bitince silinebilir (PO) |

---

## BÖLÜM 3 — docs/arsiv/ (3 belge)

### 09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md
Chat v1 · mentör metrik/toplantı · Taraf-2 temizliği · platform panel · güvenlik turu · foto altyapısı ·
`lastLoginAt` · learning journey seed → **hepsi YAPILDI / canlı** (arşiv doğru). Foto volume + sunucu
sertleştirme → **YOL HARİTASINDA (ertelendi)**.

### SOHBET-KARAR-OZETI-devir.md
Mail geçişi · panel kapsam B · sekmeli kurum detayı · `TenantMembership.role` kaynağı · DISC maskeleme ·
audit log → **YAPILDI**. Slogan/lacivert tema → **karar var, uygulama yok** (bkz. 06 UNUTULDU).

### strateji-ve-guvenlik-denetimi.md (değerli fikir kaynağı)
| Fikir | Akıbet | Kanıt |
|---|---|---|
| Eşleşme eşiği + hard-gate + kural paneli | YAPILDI | `adminSettingsRoutes.ts` (minMatchScore, Zod) |
| Super admin agregat-only | YAPILDI | platform endpoint'leri DTO whitelist |
| Eşleştirme deadlock fallback | YAPILDI | `matching.ts` fallbackLevel |
| **Bekleme salonu bildirim izni istemi** | **YOL HARİTASINDA** | bekleme salonu var; `Notification.requestPermission` yok (grep boş); 10-yol C |
| **Mentör görünürlük opt-in ekranı ("Ekran 7a")** | **TEYİT GEREK** | backend `setVisibilityOptIn` var; FE onboarding ekranı belirsiz |
| **STK "iki-aha modeli" (önizleme + gerçek aha)** | **TEYİT GEREK** | wizard var; "canlı veri ile aha" tam mı belirsiz |
| Aha anı tetikleyici (event-driven) | UNUTULDU | 08:20 ile aynı — karar yok |
| Çift-tenant kimlik testi (K7) | TEYİT GEREK | test var; tüm read'ler (userId,tenantId) mi — statik doğrulama yok |

---

## BÖLÜM 4 — ÖZEL KVKK TEST VAKASI (kanıtla cevaplandı)

Soru: ~1 ay eski (2026-07-07/08) merge edilmemiş KVKK/legal branch'lerindeki kararlar main'e girdi mi?

| Alt-soru | Cevap | Kanıt |
|---|---|---|
| **a) Register consent** | **YAPILDI (main'de)** | `backend/src/controllers/authController.ts:173` `kvkkConsentAt: new Date()` + `selfServeController.ts:284`. Yani `fix/user-kvkk-consent` branch'inin İÇERİĞİ main'e (başka yolla) girmiş — branch bayat |
| **b) OAuth-yolu (Google/LinkedIn) consent** | **AÇIK — YOL HARİTASINDA (K2)** | `backend/src/services/oauth/oauthService.ts` `handleNewUser` `prisma.user.create` bloğunda `kvkkConsentAt` **YOK** (grep boş). OAuth kullanıcıları NULL → KVKK Md.5 ispat yükü karşılanmıyor. `fix/k2-kvkk-consent` bunu çözüyor ama merge edilmemiş bayat branch |
| **c) Legal sayfalar** | **YAPILDI ama TASLAK** | `frontend/src/app/kvkk`, `gizlilik`, `terms` sayfaları main'de VAR, "taslak niteliğinde" ibaresiyle (envanter K1: kvkk/page.tsx:92). İçerik main'de; `feat/legal-pages` bayat |
| **d) Sonuç: 6 branch YAPILDI mı / açık mı** | **BAYAT (içerik büyük ölçüde main'de)** | Register consent + legal sayfalar main'de. Bu Temmuz branch'leri eski/terk edilmiş denemeler; MERGE ETME. **Tek GERÇEK açık: OAuth consent (K2)** — 10-yol B'de zaten kayıtlı |

> **Sonuç:** "Karar alındı ama yapıldı mı" testinin cevabı: register/legal **yapıldı** (bayat branch'lere gerek yok);
> OAuth consent **hâlâ açık** ve yol haritasında (K2). Bayat branch'ler 10-yol D "İŞ 1 temizlik"in silme hedefinde.

---

## 🎯 ÖNE ÇIKAN LİSTE 1 — UNUTULMUŞ ama POTANSİYEL DEĞERLİ (PO önce buna baksın)

> Ne kodda ne yol haritasında; belgede karar/fikir var. PO "hâlâ istiyorum / geçersiz" diye seçecek.

1. **Fotoğraf upload (client-side)** — `avatarUrl` var ama kullanıcı foto YÜKLEYEMİYOR (endpoint/UI yok). Kart tasarımı "foto zorunlu" kararını ve görsel havuzu **bloke ediyor**. (kart-havuz + rakip analizi)
2. **Platform drill-down UI** — backend 4 endpoint HAZIR (overview/members/meetings/analytics), frontend bağlanmamış; platform admin kurum detayına inemiyor. (platform-admin envanteri)
3. **Tenant hard-delete (KVKK Md.7 silme hakkı)** — sadece freeze (soft) var; kalıcı silme endpoint'i yok. Canlı-öncesi KVKK ilişkili. (platform-admin envanteri)
4. **Landing slogan değişimi** — yeni slogan kararlaştırılmış ("Mentörlük programınızı…") ama `page.tsx` hâlâ eski. Hızlı, görünür. (06 + devir özeti)
5. **Eşleşme hesaplama tetikleyicisi** — event-driven mi sayfa-açılınca mı hiç karara bağlanmadı; kodda net tetik yok. Eşleşme davranışını etkiler. (08 + strateji arşivi)
6. **Hayalet mod + toplu CSV davet** — pasif ön-oluşturulmuş üye / bulk import; şemada yok, ayrı tur. STK onboarding'i hızlandırabilir. (katılım modeli)
7. **KPI drill-down (sayıdan kişiye)** — yönetici "15 mentörsüz menti" görüyor ama listeye inemiyor → aksiyona geçemiyor. (yönetici persona/metrikler)
8. **Sayfa açıklama metinleri merkezileştirme (C17)** — 9+ dosyada dağınık inline string; bakım borcu. (teshis)

> **Sınırda (roadmap'te gömülü olabilir — PO teyit etsin):** mentör otomatik nudge (10-yol C'de "retention
> davranışsal" içinde olabilir), bekleme salonu bildirim izni (10-yol C envanter D), yumuşak lacivert tema
> (landing UX'e gömülü olabilir), sistem-geneli lastLoginAt trendi.

---

## 🎯 ÖNE ÇIKAN LİSTE 2 — ESKİMİŞ/GEÇERSİZ OLABİLİR + ÇELİŞKİ (PO teyidi gerek)

> Ajan elemesi YAPILMADI — geçerlilik kararı ürün sahibinde. Bunlar "kesin bug" değil; doğrulanmalı.

1. **⚠️ ÇELİŞKİ — 2 IDOR (`/mentors/:mentorId/candidates`, `/requests/:id`):** teshis-raporu (08-02) "BOZUK"
   dedi; bu turdaki kod denetçisi ise `matchingController.ts`/`requestController.ts`'de **yetki kontrolü VAR**
   buldu. **Zıt kanıt → canlı/güvenlik doğrulaması şart.** Gerçekten açıksa canlı-kritik; değilse teshis eskimiş.
2. **B11 logout / B12 kullanıcı kartı "yok":** teshis 08-02 tarihli; ~9 günde çok iş merge oldu. Canlıda
   logout gerçekten çalışmıyor mu **doğrula** — muhtemelen eskimiş.
3. **Meeting feedback timezone (UTC vs İstanbul):** 05-belge "düzeltilmedi" diyor; güncel kod doğrula.
4. **Arkadaşın başvurusu panelde görünmedi (b3 membership):** git'te ilgili fix var; test edilmedi — doğrula.
5. **SJT endpoint'leri (`/scoring/compute-profile`, `/rank-mentors`):** FE çağrısı yok (hayalet). Bağla mı,
   sil mi — PO kararı (10-yol C "algoritma + hardening"e ertelenmiş olabilir).
6. **`.env.backup-*`:** env geçişi bittiyse silinebilir — PO onayı.
7. **"31 migration / 60+ model" gibi sayısal iddialar** (02-mimari): doğrulanmadı, eskimiş olabilir.

---

## Yöntem / kanıt tabanı
- git: çatı main `da6a138`, backend main `afc2769`, submodule senkron; açık PR (denetim öncesi) yalnız #58.
- 5 paralel salt-okuma denetçisi; her madde dosya:satır/grep/PR kanıtlı. Kod DEĞİŞTİRİLMEDİ, DB'ye BAĞLANILMADI.
- Çelişkili/kanıtı belirsiz maddeler tahmin edilmeden **TEYİT GEREK** işaretlendi.
- Bu rapor **karar temeli**; yol haritası bu turda GÜNCELLENMEDİ (PO seçtikten sonra ayrı tur). Kişi adı yok.
