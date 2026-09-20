# 00-KART-İNDEKSİ — 184 bilanço kartı köprü belgesi

> **Bu belge DURUM TUTMAZ, YÖNLENDİRİR.** Bir kalemin güncel durumu için "canonical kaynak" kolonundaki dosyaya bak.
> Burada durum değiştirilmez. (Oluşturuldu: 2026-09-19, harita P-2 çözümü — `docs/00-BELGE-HARITASI.md`.)

## Nasıl okunur
- **durum** = G-kartındaki en son geçerli durum (snapshot; canonical DEĞİL). 6 kod: ✅ YAPILDI · 🟡 YARIM · ⬜ AÇIK · ❓ TEYİT · 🗑️ GEÇERSİZ · 🔵 v2-backlog.
- **madde** = `kararlar/00-KARAR-TAKIP.md` karşılık numarası (varsa). **KUYRUK** = `otonom/00-KUYRUK.md` satırı (varsa).
- **canonical durum kaynağı** kuralı (KURAL 15 + harita P-2): *kuyrukta satırı varsa* → **KUYRUK** (aktif iş orada takip ediliyor); *yoksa* → **G-kartı**.
- Kart tam tanımı + kanıtı her zaman `bilanco/kararlar/G*.md`'de (KURAL 15: çelişkide KART kazanır).

## Kapsam (KURAL 16 — sayılan birim tanımlı)
- Bu indeks **184 kartın HEPSİNİ** kapsar (G1..G11, kart-bazında; kaynak: 12 G-dosyasının tam taraması 2026-09-19).
- Grup sayımı: G1=30 · G2=11 · G3=19 · G4=39 · G5=7 · G6=7 · G7=14 · G8=14 · G9=16 · G10=25 · G11=2 = **184.**
- "durum bulunamayan kart" = 0.
- ⚠️ **Numara ekseni uyarısı:** öncelik-sırası belgesi (`00-ONCELIK-SIRASI`) bazı işleri kendi G-numarasıyla anar (ör. "G2-09 sektör asimetri"); bu, G-KARTI numarasından FARKLI olabilir (G-kartı G2-09 = CORE-eşiği). Aşağıda **G-kartı numarası** esas alındı; AŞAMA F satırının kullandığı numara farklıysa KUYRUK kolonunda "(öncelik-doc no)" notu var.

---

## G1 — Güvenlik / KVKK (30 kart)
| kart | konu | durum | madde | KUYRUK | canonical |
|---|---|:---:|---|---|---|
| G1-01 | Yaş 18+ form-input/DB alanı | 🗑️ | md.3-alt | — | G-kartı |
| G1-02 | Menti→mentör DISC harf gizleme | ✅ | md.1-alt | — | G-kartı |
| G1-03 | listPendingTenants audit izi | ❓ | md.94 | — | G-kartı |
| G1-04 | SuspicionReport tenantId | 🗑️ | md.71 | — | G-kartı |
| G1-05 | KVKK kullanıcı-yüzü UI | ✅ | md.40/97 | K-12 | KUYRUK |
| G1-06 | KVKK otomatik veri imhası | 🟡 | md.81 | F-02 | KUYRUK |
| G1-07 | Rıza sürümü | ✅ | md.82 | — | G-kartı |
| G1-08 | OAuth açık rıza UI | ⬜ | md.83 | F-03 | KUYRUK |
| G1-09 | destek@ + hak-kullanım | ⬜ | md.84 | KARAR-18 | G-kartı |
| G1-10 | Aydınlatma metni eksik kategori | ⬜ | md.85 | KARAR-18 | G-kartı |
| G1-11 | DISC ayrı açık rıza | 🔵 | md.25(v2) | — | G-kartı |
| G1-12 | Veri İşleyen Sözleşmesi | ⬜ | md.90 | — | G-kartı |
| G1-13 | Kulüp-tipi kurum aktif | ⬜ | md.91 | KARAR-9/18 | G-kartı |
| G1-14 | Kalibrasyon audit ateşle-unut | ❓ | md.98 | F-06 | KUYRUK |
| G1-15 | SystemLog 90g iz kaybı | ⬜ | md.99 | F-07 · KARAR-19 | KUYRUK |
| G1-16 | Eski kayıt rıza backfill politikası | 🟡 | — | KARAR-19 | G-kartı |
| G1-17 | Admin server-side koruma | 🗑️ | md.66 | — | G-kartı |
| G1-18 | Çift-tenant kimlik teyidi | ❓ | — | — | G-kartı |
| G1-19 | qualityMultiplier okuma kaynağı | ✅ | — | — | G-kartı |
| G1-20 | RLS lint kuralı | ⬜ | md.26(v2) | — | G-kartı |
| G1-21 | Başlıksız→varsayılan tenant | 🟡 | — | — | G-kartı |
| G1-22 | k-anonimlik metrik yuvarlama | ⬜ | **madde 119** | — | G-kartı |
| G1-23 | logoUrl XSS koruması | ⬜ | — | F-04 | KUYRUK |
| G1-24 | OAuth token URL'de | ❓ | — | — | G-kartı |
| G1-25 | createMeeting kapsamsız findUnique | ❓ | — | — | G-kartı |
| G1-26 | Şüphe formu IP-limit/CAPTCHA | 🟡 | — | F-05 | KUYRUK |
| G1-27 | Prod admin anahtarı rotasyon | ⬜ | — | — | G-kartı |
| G1-28 | Sunucu/altyapı sertleştirme | ⬜ | **madde 120** | K-14 · KARAR-18 | KUYRUK |
| G1-29 | Kurum kalıcı silme yok | ⬜ | md.16(v2) | KARAR-19 | G-kartı |
| G1-30 | Çerez-izni bandı | ⬜ | md.67 | — | G-kartı |

## G2 — Eşleştirme / psikometri (11 kart)
| kart | konu | durum | madde | KUYRUK | canonical |
|---|---|:---:|---|---|---|
| G2-01 | DISC uyum matrisi onayı | 🗑️ | md.103 | — | G-kartı |
| G2-02 | Hard-gate toksik blok | 🗑️ | md.103 | — | G-kartı |
| G2-03 | Tiebreak D>I>S>C | 🗑️ | md.103 | — | G-kartı |
| G2-04 | Psikometrik gerekçe | 🗑️ | md.103 | — | G-kartı |
| G2-05 | %60/40 varsayılan oran | 🗑️ | md.9-alt | — | G-kartı |
| G2-06 | "Varsayılana düşen oran" metriği | ⬜ | **madde 111** | — | G-kartı |
| G2-07 | md.101 SJT/OCEAN okunmuyor | ⬜ | md.101 | F-11 · KARAR-10 | KUYRUK |
| G2-08 | md.14 sector-scorer uyuyor | 🟡 | md.14 | F-11 · KARAR-10 | KUYRUK |
| G2-09 | CORE-eşiği tutarsızlığı (kart) | ❓ | md.102 | — | G-kartı |
| G2-10 | Eşleşme tetikleyicisi (kart) | ❓ | A14 | — | G-kartı |
| G2-11 | Davetli otomatik onay tetiği | ✅ | KARAR-6 | — | G-kartı |

## G3 — İçerik (19 kart)
| kart | konu | durum | madde | KUYRUK | canonical |
|---|---|:---:|---|---|---|
| G3-01 | DISC-tipe-özel yaklaşım içeriği | ⬜ | md.31 | F-14 | KUYRUK |
| G3-02 | DISC-derinleşme kurgusu | 🔵 | A1 | — | G-kartı |
| G3-03 | Sınırsız yeniden-derinleşme | ❓ | A3 | — | G-kartı |
| G3-04 | STK-custom soru değer | ❓ | B8a | — | G-kartı |
| G3-05 | Sertifika soru ekleme yetkisi | ✅ | — | F-13 | KUYRUK |
| G3-06 | DISC canlı soru sayısı | ❓ | Ç3 | — | G-kartı |
| G3-07 | SJT içerik 3→4 | ⬜ | md.33 | — | G-kartı |
| G3-08 | Sertifika seed↔canlı tutarsızlık | ⬜ | md.30 | K-16 · P-99 | KUYRUK |
| G3-09 | Güvenli sertifika seed runner | ⬜ | md.73 | K-16 | KUYRUK |
| G3-10 | PO 68-soru inceleme | ⬜ | A2/A4 | — | G-kartı |
| G3-11 | 17 eşleştirme PO-onay | 🗑️ | md.103 | — | G-kartı |
| G3-12 | İçerik & soru felsefesi | ⬜ | A4 | — | G-kartı |
| G3-13 | Kurum-özel soru answerType | ⬜ | md.13 | F-12 · KARAR-21 | KUYRUK |
| G3-14 | İçerik felsefesi gözlemleri | ⬜ | — | — | G-kartı |
| G3-15 | Soru metni yazım hataları | ⬜ | — | — | G-kartı |
| G3-16 | Global içerik seed ana Neon | ⬜ | Y6 | — | G-kartı |
| G3-17 | Öğrenme yolculuğu kalan uçlar | ❓ | A15 | — | G-kartı |
| G3-18 | 6 canlı-teyit kuyruğu (DB) | ❓ | Y6 | — | G-kartı |
| G3-19 | Sertifika/etiket havuzu admin tablo | ✅ | KARAR-12/A9 | — | G-kartı |

## G4 — Panel / akış (39 kart)
| kart | konu | durum | madde | KUYRUK | canonical |
|---|---|:---:|---|---|---|
| G4-01 | Havuz KART görünümü rol-bazlı | ⬜ | KARAR-2 | F-10 | KUYRUK |
| G4-02 | "Neden uyumlu" Katman-1 menti | ✅ | KARAR-7 | — | G-kartı |
| G4-03 | Manuel eşleştirme | 🗑️ | md.76 | — | G-kartı |
| G4-04 | Yöneticilik-verme + onaylı liste | ✅ | md.A9 | — | G-kartı |
| G4-05 | adminSettings zayıf izolasyon | ⬜ | — | F-23 | KUYRUK |
| G4-06 | "Çok yakın" eşik kalibrasyonu | ❓ | md.12-alt | — | G-kartı |
| G4-07 | Sektör kolonu "—" veri boş | 🔵 | B3/KARAR-10 | — | G-kartı |
| G4-08 | Platform drill-down yok | ⬜ | md.77 | F-24 | KUYRUK |
| G4-09 | Mükerrer platform API | ❓ | md.74 | K-13 | KUYRUK |
| G4-10 | setVisibilityOptIn Taraf-1 | ❓ | md.86 | K-13 | KUYRUK |
| G4-11 | Otomatik anomali tespiti (v2) | 🟡 | — | — | G-kartı |
| G4-12 | Platform büyüme trendi | ⬜ | Y7 | — | G-kartı |
| G4-13 | Platform ayarlar UI | ⬜ | Y7 | — | G-kartı |
| G4-14 | Sistem sağlığı mail-göstergesi | 🟡 | — | F-25 | KUYRUK |
| G4-15 | reviewedBy gerçek kimlik | ⬜ | — | — | G-kartı |
| G4-16 | user-reports sayfalama yok | ⬜ | — | — | G-kartı |
| G4-17 | PLATFORM_ADMIN_EMAIL .env.example | ⬜ | — | F-26 | KUYRUK |
| G4-18 | Fotoğraf zorunlu kılma | 🟡 | — | — | G-kartı |
| G4-19 | Premium kilit + Tenant.plan | ⬜ | E13/E24 | — | G-kartı |
| G4-20 | Hayalet mod + toplu CSV davet | 🔵 | md.17 | — | G-kartı |
| G4-21 | "Neden uyumlu" Katman-2 | 🔵 | md.19/KARAR-8 | — | G-kartı |
| G4-22 | Menti "bekleme anı" | ⬜ | Y1 | F-15 | KUYRUK |
| G4-23 | Umut sinyali / sosyal-kanıt | ⬜ | Y1 | F-15 · P-06 | KUYRUK |
| G4-24 | Menti "özgüven aşısı" sunumu | ⬜ | — | F-16 · P-03 | KUYRUK |
| G4-25 | Reddi yumuşat + kutlama | ⬜ | Y2 | F-17 · P-05 · KARAR-20/22 | KUYRUK |
| G4-26 | Mentör rozet çeşitliliği | ⬜ | md.78 | — | G-kartı |
| G4-27 | Mentör kapasite sınırı | ⬜ | Y5 | P-15 | KUYRUK |
| G4-28 | Mentör "kendi etkim" yuvası | 🟡 | md.78 | P-14 | KUYRUK |
| G4-29 | Mentör sektör filtresi | 🟡 | — | — | G-kartı |
| G4-30 | Yönetici rapor EXPORT | ⬜ | Y3 | F-18 | KUYRUK |
| G4-31 | Proaktif kırmızı uyarı | 🟡 | Y4 | F-19 | KUYRUK |
| G4-32 | STK zaman-serisi KPI | 🟡 | Y3/Y7 | — | G-kartı |
| G4-33 | Çift-aha yönetici-önizleme | ⬜ | A13 | KARAR-17 | G-kartı |
| G4-34 | STK "iki-aha modeli" | ❓ | A13 | KARAR-17 | G-kartı |
| G4-35 | Onboarding şablon-seçim | ⬜ | — | — | G-kartı |
| G4-36 | Menti/mentör retention sevdirme | ⬜ | — | — | G-kartı |
| G4-37 | Kurumlar-arası sosyal kanıt duvarı | ⬜ | — | — | G-kartı |
| G4-38 | Bottom-up "ters çekim" kanalı | ⬜ | **madde 116** | — | G-kartı |
| G4-39 | "Görüşme tamamladım" paylaşım kartı | 🟡 | — | F-22 | KUYRUK |

## G5 — Bildirim / mail (7 kart)
| kart | konu | durum | madde | KUYRUK | canonical |
|---|---|:---:|---|---|---|
| G5-01 | Kurum başvuru maili açma | ⬜ | md.37m | KARAR-18 | G-kartı |
| G5-02 | Kurum onay/ret maili + destek@ | 🟡 | md.6/84 | KARAR-18 | G-kartı |
| G5-03 | Otomatik nudge | 🔵 | md.24(v2) | — | G-kartı |
| G5-04 | Bekleme salonu bildirim izni | ⬜ | — | F-20 | KUYRUK |
| G5-05 | Kullanıcı→ürün geri bildirim | ⬜ | E24 | F-31 | KUYRUK |
| G5-06 | Mentör bildirim ritmi | ⬜ | — | P-10 | KUYRUK |
| G5-07 | Gerçek push (Expo/FCM) stub | 🔵 | md.23 | P-10 | KUYRUK |

## G6 — Veri modeli / borç (7 kart)
| kart | konu | durum | madde | KUYRUK | canonical |
|---|---|:---:|---|---|---|
| G6-01 | N+1 konuşma listesi | ⬜ | md.48 | F-27 | KUYRUK |
| G6-02 | String→enum + çift-rol | ⬜ | md.49 | — | G-kartı |
| G6-03 | onDelete stratejisi | ⬜ | md.49-akraba | — | G-kartı (✅ migrate edildi, bkz. G6-03 kartı) |
| G6-04 | User.email unique + index | ❓ | — | — | G-kartı |
| G6-05 | Sayfa metni merkezileştirme | ⬜ | md.47/C17 | F-28 | KUYRUK |
| G6-06 | Temiz-kod borcu | ⬜ | md.47 | — | G-kartı |
| G6-07 | Kullanılmayan 5 @radix-ui | ✅ | md.46 | — | G-kartı |

## G7 — UX / tasarım (14 kart)
| kart | konu | durum | madde | KUYRUK | canonical |
|---|---|:---:|---|---|---|
| G7-01 | Ekran-okuyucu düzeltmeleri | ⬜ | md.50 | F-21 | KUYRUK |
| G7-02 | DISC kontrast (WCAG) | ⬜ | md.64 | F-21 | KUYRUK |
| G7-03 | SEO teknik paketi | ⬜ | md.51-55 | F-29 | KUYRUK |
| G7-04 | www→301 yönlendirme | ✅ | md.66 | — | G-kartı |
| G7-05 | Ziyaretçi ölçümü | ⬜ | md.56 | — | G-kartı |
| G7-06 | Çıkışta GA (PO) | ❓ | A19 | — | G-kartı |
| G7-07 | GTM+GA4 son kontrol | 🔵 | A12 | — | G-kartı |
| G7-08 | Kurumsal sayfalar + JSON-LD | ⬜ | md.57-63 | — | G-kartı |
| G7-09 | WCAG 2.1 AA bütünsel | ⬜ | md.64 | F-21 | KUYRUK |
| G7-10 | Açılış UX paketi | ⬜ | md.22(v2) | — | G-kartı |
| G7-11 | Açılış koyu/açık tema | ⬜ | md.22(v2) | — | G-kartı |
| G7-12 | Açılış slogan | ✅ | F4/md.22 | — | G-kartı |
| G7-13 | Yumuşak lacivert tema yönü | ✅ | E4/md.65 | — | G-kartı |
| G7-14 | Mesaj listesi sanallaştırma | ⬜ | — | — | G-kartı |

## G8 — Altyapı / PO-manuel (14 kart)
| kart | konu | durum | madde | KUYRUK | canonical |
|---|---|:---:|---|---|---|
| G8-01 | Fotoğraf kalıcı disk (volume) | ⬜ | A22 | K-04 · KARAR-18 | KUYRUK |
| G8-02 | Ortam değişkeni teyidi | ⬜ | — | K-04 · KARAR-18 | KUYRUK |
| G8-03 | Chat canlı uçtan-uca test | ⬜ | A22 | KARAR-18 | G-kartı |
| G8-04 | Mentör paneli canlıda görme | ⬜ | A22 | KARAR-18 | G-kartı |
| G8-05 | .env.backup-anaDB sil | ⬜ | **madde 121** | KARAR-18 | G-kartı |
| G8-06 | Ortam temizliği (branch/worktree) | 🟡 | md.28(v2) | KARAR-18 | G-kartı |
| G8-07 | Ayrı staging ortamı | ⬜ | md.27(v2) | — | G-kartı |
| G8-08 | İzole test DB | 🟡 | md.İŞ2 | KARAR-18 | G-kartı |
| G8-09 | DB havuzu + mail seri | ❓ | — | — | G-kartı |
| G8-10 | Eşleştirme önbelleği yok | ⬜ | — | — | G-kartı |
| G8-11 | Rate limiter Redis'e | ⬜ | md.02:50/E2 | — | G-kartı |
| G8-12 | Cron çok-sunucuda çift | ⬜ | — | — | G-kartı |
| G8-13 | Sekme geçiş yavaşlığı | ❓ | E17/B10 | F-32 | KUYRUK |
| G8-14 | Sol-alt kullanıcı kartı | ❓ | B12 | F-33 | KUYRUK |

## G9 — Belge / süreç (16 kart)
| kart | konu | durum | madde | KUYRUK | canonical |
|---|---|:---:|---|---|---|
| G9-01 | llmRateLimiter iddiası | ✅ | — | — | G-kartı |
| G9-02 | registerMessages.ts karşılıksız | ✅ | — | — | G-kartı |
| G9-03 | Belge-içi bayat gövde (BH1-5) | ✅ | — | — | G-kartı |
| G9-04 | AdminAuditLog bayat | ✅ | — | — | G-kartı |
| G9-05 | 09-DURUM çelişki blokları | ✅ | — | — | G-kartı |
| G9-06 | durum-panosu 📸'ye | 🟡 | A11 | F-01 (reorg) | KUYRUK |
| G9-07 | OneDrive → yerel disk | 🟡 | A10 | KARAR-18 | G-kartı |
| G9-08 | icerik/ 6 belge bayat | ✅ | — | — | G-kartı |
| G9-09 | PROJECT_STATUS.md arşivle | ✅ | — | — | G-kartı |
| G9-10 | INDEX + üst-etiket eksik | ✅ | — | — | G-kartı |
| G9-11 | Belge reorg 5 taşıyıcı ad | 🟡 | A5 | F-01 | KUYRUK |
| G9-12 | Belge yeniden yapılandırma | ⬜ | A5 | F-01 | KUYRUK |
| G9-13 | admin-panelleri arşiv | ✅ | — | — | G-kartı |
| G9-14 | Kişi-adı geriye-dönük temizlik | ✅ | — | — | G-kartı |
| G9-15 | Model tercihi çelişkisi | ✅ | BÇ5/E12 | — | G-kartı |
| G9-16 | icerik/ 6 belge 🗑️/⬜ karar | ✅ | — | — | G-kartı |

## G10 — Ölü kod / terk (25 kart)
| kart | konu | durum | madde | KUYRUK | canonical |
|---|---|:---:|---|---|---|
| G10-01 | Kesin-ölü kod bloğu | 🟡 | md.44 | K-13 · E-1..E-5 | KUYRUK |
| G10-02 | VisibilityOptIn.requestMessage DROP | 🔵 | md.18/A21 | — | G-kartı |
| G10-03 | matchingInterface USER-strategy | 🔵 | U2/md.44 | — | G-kartı |
| G10-04 | findMatchesDueForCheckpoint LOG-ONLY | 🟡 | D1 | — | G-kartı |
| G10-05 | Feedback şema alanları yazılmıyor | 🟡 | — | — | G-kartı |
| G10-06 | ContextualFeedbackHost bağlanmadı | ⬜ | F5/F6 | — | G-kartı |
| G10-07 | llmRetry.ts silindi | ✅ | D2/md.44 | — | G-kartı |
| G10-08 | UserProfile.qualityMultiplier ikiz | ❓ | D3 | — | G-kartı |
| G10-09 | SjtQuestion/Option ölü-tablo çürüdü | ✅ | **madde 114** | — | G-kartı |
| G10-10 | PATCH /users/me/social bağlanmamış | ❓ | **madde 113** | K-13 | KUYRUK |
| G10-11 | PATCH /users/:id/self-profile mükerrer | ❓ | A20 | K-13 | KUYRUK |
| G10-12 | /clubs 7 uç FE'siz | ⬜ | md.41 | KARAR-9 | G-kartı |
| G10-13 | /feedback-logs FE'siz | ❓ | md.42 | KARAR-12 | G-kartı |
| G10-14 | /rematch admin FE yok | ⬜ | — | KARAR-16 | G-kartı |
| G10-15 | questionController toplu-yanıt | ⬜ | md.70 | — | G-kartı |
| G10-16 | rewardPenalty import çürüdü | ✅ | — | — | G-kartı |
| G10-17 | discResultCard yaz-oku çözüldü | ✅ | — | — | G-kartı |
| G10-18 | enneagramWing tüketici yok | 🟡 | md.86/101 | — | G-kartı |
| G10-19 | mentorVisibilityEnabled ölü PLG | ❓ | md.86 | — | G-kartı |
| G10-20 | 5-dosya yarım-özellik bundle | 🔵 | md.45 | — | G-kartı |
| G10-21 | taxonomy/IndustryNode skorlamada yok | ⬜ | — | F-11 · KARAR-10 | KUYRUK |
| G10-22 | LoginForm "Sprint 14" yorum | ❓ | — | F-30 | KUYRUK |
| G10-23 | mentiRequestController YOK çözüldü | ✅ | — | K-13 | KUYRUK |
| G10-24 | Mentör karar ekranı menti ilk chat | ⬜ | — | — | G-kartı |
| G10-25 | Profil-düzenleme keşfi | ✅ | — | — | G-kartı |

## G11 — Ürün stratejisi (2 kart)
| kart | konu | durum | madde | KUYRUK | canonical |
|---|---|:---:|---|---|---|
| G11-01 | Modül sırası (yol haritası) | ⬜ | — | — | G-kartı |
| G11-02 | Gelir modeli + pilot | ⬜ | — | — | G-kartı |

---

## Kapsam raporu (dürüstlük)
- **184/184 kart** listelendi (grup sayımı yukarıda; kaynak: 12 G-dosyası tam tarama 2026-09-19).
- **durum** kolonu G-kartı snapshot'ıdır — canonical DEĞİL; güncel durum "canonical" kolonundaki dosyadan okunur.
- **KUYRUK eşlemesi:** AŞAMA F/P + K-satırlarının `=Gxx` etiketlerinden türetildi (bidirectional, kod-teyitli). Kuyrukta izi olmayan kartlarda "—".
- **Eksik/zayıf noktalar (sessizce kırpılmadı):**
  1. **madde no** kolonu G-kartlarının "Kaynak/Numara" satırından alındı; bir kısmı karar-defteri iç-numarası (A/B/E/Y/md.) — `00-KARAR-TAKIP` tablo-numarasıyla birebir olmayabilir. Yalnız 7 doğrulanmış çift (**119/120/111/121/113/114/116**) kesin (E.2, çift-yönlü atıflı).
  2. **G2 numara ekseni:** öncelik-doc "G2-09 sektör asimetri / G2-10 çift-uygulama" ≠ G-kartı G2-09/G2-10 (CORE-eşiği/tetikleyici). AŞAMA F F-08 öncelik-doc numarasını kullanır; bu indeks G-kartı numarasını esas alır. Karışıklık kapanışta raporlandı.
  3. **P-satırları** (panel denetimi) çoğunlukla G-kartı DEĞİL (menti/mentör panel bulguları); yalnız G-kartıyla örtüşen P'ler (P-03/05/06/10/14/15) ilgili G satırında not edildi.
