# MENTİMENTOR / SİVİLKAPASİTE — BELGE HARİTASI (INDEX)
**🔄 YAŞAYAN** (canonical: belge haritası) · **Son güncelleme:** 2026-08-19 · **Amaç:** Projenin kalıcı hafızası. Hangi bilgi hangi belgede.

> Bu belgeler, birden fazla sohbetten toplanan kararların konu bazlı derlemesidir.
> Claude Code / yeni Claude chat'i, ihtiyaç duyduğu konunun belgesini okur — hepsini değil.
> Bu sayede context şişmez.
>
> **Belge düzeni kuralları:** `belge-duzeni-rehberi.md` (canonical — 6 kural: canonical/tür/yaşayan-dondurulmuş/adlandırma/INDEX/işaretleme).
> Etiketler: **🔄 YAŞAYAN** (güncel tutulur) · **📸 DONDURULMUŞ** (o günün fotoğrafı, güncellenmez).

## Marka/İsim (netleşti 2026-08-02)
- **Sivilkapasite** = ana marka (canlı: sivilkapasite.org).
- **MentiMentor** = alt-ürün / mentörlük eşleştirme modülü (ilk yayına alınan çekirdek).
- **UniClub** = ESKİ/çalışma adı, artık geçersiz. Daha geniş vizyonun eski adıydı.

## 📁 Klasör yapısı (2026-08-02 düzenlendi)
Tüm dokümanlar `docs/` altında toplandı; proje kökü yalnızca gerçek proje dosyalarını tutar
(`CLAUDE.md`, `PROJECT_STATUS.md`, `package.json`, `docker-compose.yml`, `.gitignore`, `.gitmodules`).

```
docs/
├── kararlar/   → konu bazlı karar belgeleri (bu klasör; 00-INDEX + 01–10)
├── raporlar/   → keşif/teşhis raporları (tarihli)
└── arsiv/      → eski/geçersiz belgeler (silinmedi, saklandı)
```

## Belgeler — `docs/kararlar/`
| Belge | İçerik | Ne zaman okunur |
|---|---|---|
| `01-urun-vizyonu.md` | Ne, kime, iş modeli, fiyatlandırma, modül sırası | Ürün kararı, yön |
| `02-mimari-ve-altyapi.md` | Stack, Neon=canlı DB, deploy, seed/migration kuralları | DB/deploy/altyapı işi |
| `03-psikometri-ve-algoritma.md` | DISC/OCEAN, arketipler, eşleşme formülü, SJT, sertifikasyon | Eşleştirme/skorlama işi |
| `04-guvenlik-ve-kvkk.md` | Tenant izolasyonu, IDOR, P0/P1 riskler, KVKK, sunucu güvenliği | Güvenlik/KVKK işi |
| `05-ozellikler-ve-paneller.md` | Paneller, admin akışları, takvim/feedback, sertifika | Özellik/panel işi |
| `06-tasarim-ux.md` | Tema, landing, tipografi, onboarding, UX | Tasarım/UX işi |
| `07-calisma-tarzi.md` | Prompt felsefesi, DevSecOps şablonu, kurallar | Her prompt öncesi |
| `08-acik-sorular.md` | Karara bağlanmamışlar (yaş, veri sorumlusu vb.) | Karar gerektiğinde |
| `09-DURUM.md` | ŞU AN ne bitti/ne bekliyor (sık güncellenir) | Oturum başında |
| `10-yol-haritasi.md` | Sıradaki işler yol haritası (İŞ 0–8, sıra + bağımlılık) | Sıradaki iş kararı |
| `11-tasarim-kararlari-yasam-dongusu-ve-disc.md` | Yaşam döngüsü + DISC gösterim kararları (KARAR 1 DISC çoklu harf/#12 · KARAR 2 ghost red/2a · KARAR 3 kullanıcı çıkarma/2b · KARAR 4 FE tam Türkçe) | #12 / 2a / 2b işine başlarken |

## Yeni belgeler — 2026-08-11 oturumu (`docs/kararlar/`)
| Belge | İçerik | Tür |
|---|---|---|
| `belge-duzeni-rehberi.md` | Belge düzeni 6 kuralı (canonical) | 🔄 YAŞAYAN · canonical (düzen) |
| `tasarim-kararlari-admin-2026-08-11.md` | STK admin tasarım kararları (12 karar; menü, kart, DISC mahremiyet, etiket havuzu) | 🔄 YAŞAYAN (kararlar eklenebilir) |
| `stk-admin-bulgu-envanteri-2026-08-11.md` | STK admin 13-bulgu keşfi (backend hazır mı / S-M-L) | 📸 DONDURULMUŞ (keşif) |
| `belge-aksiyon-denetimi-2026-08-11.md` | 34 belgedeki kararlar gerçekle kıyas (YAPILDI/UNUTULDU/…) | 📸 DONDURULMUŞ (denetim) |
| `chat-v1-teslim.md` · `dokploy-foto-volume-talimati.md` | Chat v1 teslim · foto volume talimatı | 📸 DONDURULMUŞ |
| `belge-denetimi-2026-08-10.md` · `unutulmus-niyet-envanteri-2026-08-10.md` | 09/10 denetimi · unutulmuş niyet envanteri | 📸 DONDURULMUŞ |
| `belge-temizlik-haritasi-2026-08-14.md` | 44 belgenin 6-kural taraması (etiket/INDEX/gruplama/bayat haritası) | 📸 DONDURULMUŞ (keşif) |
| `00-karar-statu-haritasi-2026-08-14.md` | ~72 kararın 3-boyutlu (plan/kod/çelişki) renkli statü haritası; 🟨 az-işle-kazanç öne çıkarılmış | 📸 DONDURULMUŞ (statü haritası) |
| `00-DURUM-PANOSU.md` | Kararların tek-bakışta renkli statü panosu (92 karar; 🟨 az-işle-kazanç öne çıkarılmış) | 🔄 YAŞAYAN (statü panosu) |
| `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` | #7 eşleşme-sonrası değerlendirme + metrik takip + otomatik pasifleştirme (dernek-ayarlı, varsayılan kapalı) + yeniden değerlendirme + periyodik hatırlatma vizyonu; VİZYON ↔ KOD GERÇEĞİ (dosya:satır) ayrı; 3 aşamalı plan | 🔄 YAŞAYAN (#7 inşasına başlarken) |

> **Denetim kümesi (birlikte okunur):** `belge-aksiyon-denetimi-2026-08-11` (kararlar gerçekle kıyas) · `belge-denetimi-2026-08-10` (09/10 denetimi) · `unutulmus-niyet-envanteri-2026-08-10` (unutulan niyetler) · `belge-temizlik-haritasi-2026-08-14` (düzen taraması). Farklı kapsam/tarih — birleştirilmez, çapraz referanslıdır.

## Devir belgeleri — `docs/devir/` (2026-08-11 seti + 2026-08-14 güncelleme)
| Klasör | İçerik | Tür |
|---|---|---|
| `docs/devir/01–06` | Kontrol katmanı devir seti (felsefe · proje durumu · KVKK · 13-bulgu · bekleyen kararlar · devir kılavuzu) | 📸 DONDURULMUŞ (2026-08-11) |
| `docs/devir/07-oturum-2026-08-14.md` | 2026-08-14 oturum kapanışı: git durumu + yapılanlar + TAM bekleyen liste (yeni oturum önce bunu + 09-DURUM okur) | 📸 DONDURULMUŞ (2026-08-14) |
| `docs/devir/08-oturum-2026-08-15.md` | 2026-08-15 oturum kapanışı: KARAR 5 + KVKK + havuz-kart merge sonrası git durumu + v1 kesin tablo (13 iş: 4✅/9⏳) + kalan 9 iş + boy | 📸 DONDURULMUŞ (2026-08-15) |

> **Canonical eşleşmesi (Kural 1 — devir belgeleri özet/kopyadır, güncel bilgi kararlar/'da):**
> `01`→`07-calisma-tarzi` · `02`→`09-DURUM` · `03`→`04-guvenlik-ve-kvkk` · `04`→`10-yol-haritasi` (A) + `stk-admin-bulgu-envanteri` · `05`→`09-DURUM` + `10-yol-haritasi` (C/E) · `06`→kendisi (devir prosedürü).

## Raporlar — `docs/raporlar/` (📸 DONDURULMUŞ — keşif fotoğrafları)
> Bir-kerelik keşif/analiz çıktıları; güncellenmez. Güncel durum daima `09-DURUM.md`'de.
> Konu kümelerine göre gruplu (kardeş belgeler birlikte okunur).

**Değerlendirme/test/soru envanteri (2026-08-15)**
| Belge | İçerik |
|---|---|
| `degerlendirme-test-soru-envanteri-2026-08-15.md` | 6 değerlendirme sistemi + yönetici yetki/görünürlük + soru/cevap envanteri (#78) |
| `icerik/00-icerik-index.md` + `icerik/*` | Her testin TAM soru/cevap içeriği (DISC/sertifika/öğrenme yolculuğu/SJT/STK-custom) + seed↔canlı tutarlılık (#79) |
| `eksikler-derinlestirilmis-2026-08-15.md` | 7 eksik derin analiz (DISC-yaklaşım 3 seçenek, sertifika 5→20, admin düzenleme UI vb.) (#79) |

**Teşhis / genel (2026-08-02)**
| Belge | İçerik |
|---|---|
| `teshis-raporu-2026-08-02.md` | Niyet vs mevcut-kod envanteri, merge runbook, KVKK, güvenlik |
| `admin-panelleri-tasarim-2026-08-02.md` | 6 admin panelinin keşif + tasarım kartları |
| `depo-denetimi-2026-08-02.md` | Repo hijyeni (boş/artık/yanlış-yerleşim/isimlendirme) |

**Persona üçlüsü** (birlikte okunur — menti/mentör/yönetici)
| Belge | İçerik |
|---|---|
| `menti-persona-ve-sevdirme-2026-08-02.md` | Menti personası + onboarding/retention |
| `mentor-persona-ve-sevdirme-2026-08-02.md` | Mentör personası + retention |
| `yonetici-persona-ve-metrikler-2026-08-02.md` | Yönetici personası + metrik taslağı |

**Panel envanteri** (kardeş çift — platform ↔ tenant)
| Belge | İçerik |
|---|---|
| `platform-admin-panel-envanteri-2026-08-02.md` | Platform admin paneli mevcut-durum envanteri |
| `stk-yonetici-panel-envanteri-2026-08-02.md` | STK yönetici (tenant admin) paneli envanteri |

**Panel stratejisi** (kardeş çift — ideal tasarım)
| Belge | İçerik |
|---|---|
| `platform-admin-strateji-2026-08-02.md` | Platform admin paneli ideal hâli |
| `stk-yonetici-strateji-2026-08-02.md` | STK yönetici paneli ideal hâli |

**Backend envanteri**
| Belge | İçerik |
|---|---|
| `hayalet-backend-2026-08-02.md` | Yarım bağlı / ölü / kırık kod envanteri |
| `kart-havuz-backend-envanteri-2026-08-02.md` | Kart/havuz/uyum/niyet-mektubu/foto backend envanteri |

**Diğer keşif**
| Belge | İçerik |
|---|---|
| `kapasite-analizi-2026-08-02.md` | Ölçeklenme/performans önlem raporu |
| `katilim-modeli-mevcut-durum-notu-2026-08-02.md` | Katılım/davet modeli mevcut durum (İŞ 5) |
| `mentor-karti-rakip-analizi-2026-08-02.md` | Menti kart tasarımı rakip analizi |
| `tema-durum-ve-landing-maliyeti-2026-08-02.md` | Tema durumu + landing maliyeti |

## Arşiv — `docs/arsiv/`
| Belge | Neden arşivde |
|---|---|
| `SOHBET-KARAR-OZETI-devir.md` | Eski devir/özet belgesi — güncel karar 01–10'da |
| `strateji-ve-guvenlik-denetimi.md` | Eski strateji/güvenlik denetimi — güncel güvenlik 04'te |
| `09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md` | 09-DURUM + 10-yol-haritası'nın 2026-08-10 öncesi tam hâli (tarihsel) |

## ⚠️ En kritik iki gerçek (her zaman hatırla)
1. **Canlı ve lokal AYNI Neon DB'sini paylaşıyor** (`ep-fancy-tooth-ab4u5xhr`). Lokalde DB'ye yazmak = canlıyı etkilemek. Detay: `02-mimari-ve-altyapi.md`.
2. **Tehlikeli `seed.ts`/`npm run seed`/`prisma db seed` veri SİLER** — asla çalıştırma. Detay: `02-mimari-ve-altyapi.md`.

## Kaynak sohbetler (bu belgeler nereden derlendi)
- **Psikometri/algoritma chat'i** → DISC/OCEAN/SJT/sertifikasyon tasarımı (03).
- **Strateji/güvenlik chat'i** → P0/P1 güvenlik riskleri, fiyatlandırma prensibi (04, 01).
- **PRD/isim/VPS chat'i** → vizyon, isim, barındırma tartışması (01, 02).
- **Mail/panel chat'i** → Resend, platform panel, DB operasyonları (02, 05).
- **Bugünkü oturum (2026-08-02)** → tema, teşhis, 5 admin paneli, global seed (05, 06, 09).

## Çelişki-çözüm kaydı (2026-08-02)
- **Fiyatlandırma:** "ücretsiz" vs "freemium" → ÇÖZÜLDÜ: şimdilik tamamen ücretsiz, ileride premium (freemium). Aynı şeyin iki aşaması.
- **İsim:** UniClub/MentiMentor/Sivilkapasite → ÇÖZÜLDÜ: Sivilkapasite ana marka, MentiMentor alt-ürün, UniClub geçersiz.
- **Erasmus:** İptal edildi, sosyal girişime dönüldü. Erasmus varsayımlı eski içerik geçersiz.
- **Barındırma:** Eski "VPS mi PaaS mi" tartışması AŞILDI → Neon (DB) + Dokploy (deploy) canlıda çalışıyor.
- **certified/qualityMultiplier konumu:** UserProfile → TenantMembership'e taşındı; eski kod eski yerden okuyor olabilir (teknik risk, bkz. 04).
