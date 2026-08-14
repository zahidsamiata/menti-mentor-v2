# MENTİMENTOR / SİVİLKAPASİTE — BELGE HARİTASI (INDEX)
**🔄 YAŞAYAN** (canonical: belge haritası) · **Son güncelleme:** 2026-08-11 · **Amaç:** Projenin kalıcı hafızası. Hangi bilgi hangi belgede.

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

## Yeni belgeler — 2026-08-11 oturumu (`docs/kararlar/`)
| Belge | İçerik | Tür |
|---|---|---|
| `belge-duzeni-rehberi.md` | Belge düzeni 6 kuralı (canonical) | 🔄 YAŞAYAN · canonical (düzen) |
| `tasarim-kararlari-admin-2026-08-11.md` | STK admin tasarım kararları (12 karar; menü, kart, DISC mahremiyet, etiket havuzu) | 🔄 YAŞAYAN (kararlar eklenebilir) |
| `stk-admin-bulgu-envanteri-2026-08-11.md` | STK admin 13-bulgu keşfi (backend hazır mı / S-M-L) | 📸 DONDURULMUŞ (keşif) |
| `belge-aksiyon-denetimi-2026-08-11.md` | 34 belgedeki kararlar gerçekle kıyas (YAPILDI/UNUTULDU/…) | 📸 DONDURULMUŞ (denetim) |
| `chat-v1-teslim.md` · `dokploy-foto-volume-talimati.md` | Chat v1 teslim · foto volume talimatı | 📸 DONDURULMUŞ |
| `belge-denetimi-2026-08-10.md` · `unutulmus-niyet-envanteri-2026-08-10.md` | 09/10 denetimi · unutulmuş niyet envanteri | 📸 DONDURULMUŞ |
| `00-karar-statu-haritasi-2026-08-14.md` | ~72 kararın 3-boyutlu (plan/kod/çelişki) renkli statü haritası; 🟨 az-işle-kazanç öne çıkarılmış | 📸 DONDURULMUŞ (statü haritası) |

## Devir belgeleri — `docs/devir/` (2026-08-11)
| Klasör | İçerik | Tür |
|---|---|---|
| `docs/devir/01–06` | Kontrol katmanı devir seti (felsefe · proje durumu · KVKK · 13-bulgu · bekleyen kararlar · devir kılavuzu) | 📸 DONDURULMUŞ (devir fotoğrafı) |

## Raporlar — `docs/raporlar/`
| Belge | İçerik |
|---|---|
| `teshis-raporu-2026-08-02.md` | Niyet vs mevcut-kod envanteri, merge runbook, KVKK, güvenlik |
| `admin-panelleri-tasarim-2026-08-02.md` | 6 admin panelinin keşif + tasarım kartları |

## Arşiv — `docs/arsiv/`
| Belge | Neden arşivde |
|---|---|
| `SOHBET-KARAR-OZETI-devir.md` | Eski devir/özet belgesi — güncel karar 01–10'da |
| `strateji-ve-guvenlik-denetimi.md` | Eski strateji/güvenlik denetimi — güncel güvenlik 04'te |

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
