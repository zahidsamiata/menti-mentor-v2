# Tema Durumu + Landing Maliyeti
**Tarih:** 2026-08-02 · **Mod:** salt-okuma · **Önemli:** Landing'e/temaya dokunulmadı. Bu rapor ürün sahibinin "maliyet yüksekse ertele" kararının girdisidir.

---

## (A) Dark/Light toggle — ŞU AN nerede çalışıyor?

**Altyapı çalışıyor (DOĞRULANDI):**
- `ThemeProvider` (`frontend/src/providers/ThemeProvider.tsx`): React Context, `localStorage` (`mm-theme`), `<html>` üzerine `.dark` class, sistem tercihi fallback.
- FOUC önleme: `app/layout.tsx` head'inde inline script (hydration'dan önce class uygular).
- Tailwind: `darkMode: ['class']`; `globals.css`'te `.dark { ... }` tüm app'i kapsıyor.
- `ThemeToggle` (`components/molecules/ThemeToggle.tsx`): semantic token kullanıyor (kendi içinde hardcoded renk yok).

**Toggle butonu nerede RENDER ediliyor (D21):**
| Nav | Dosya | ThemeToggle |
|---|---|---|
| Menti/Mentör DashboardNav | `components/organisms/DashboardNav.tsx` | ✅ VAR |
| Admin | `app/(admin)/layout.tsx` | ❌ YOK |
| Platform | `app/platform/layout.tsx` | ❌ YOK |
| Auth (login/register) | `app/(auth)/layout.tsx` | ❌ YOK |

**Sonuç:** Tema **global** çalışıyor (`.dark` + localStorage) — yani mentör/menti tarafında toggle'la light'a geçilince admin/platform da light görünür. Eksik olan yalnızca **admin/platform nav'ında buton** (D21). İşlev her yerde geçerli, tetik noktası dar.

**PR/merge durumu:** Tema altyapısı **PR #32 (WIP, merge bekliyor)** kapsamında; mevcut çalışma branch'i `feat/light-theme`. Merge edilene kadar canlıda aktif değil — durum #32'ye bağlı.

---

## (B) Landing'i dark/light SEÇİLEBİLİR yapmanın gerçek maliyeti

Landing (proje tanıtım) bilinçli olarak **her zaman dark** (06-tasarim-ux.md kararı: glow/gradient pazarlama tasarımı). Onu seçilebilir yapmak = tema token'larına geçirmek.

**Hardcoded renk noktası sayımı (grep tabanlı tahmin, ±):**
| Dosya | Tahmini hardcoded nokta |
|---|---|
| `app/_sections/GameSection.tsx` | ~56 |
| `app/_sections/AlgorithmBento.tsx` | ~53 |
| `app/_sections/AdminCockpit.tsx` | ~40 |
| `app/metodoloji/page.tsx` | ~33 |
| `app/_sections/EngineSection.tsx` | ~26 |
| `app/_sections/HeroSection.tsx` | ~18 (2 rgba dahil) |
| `app/_sections/PainSection.tsx` | ~13 |
| `app/_sections/Navbar.tsx` | ~10 |
| `app/page.tsx` (footer) | ~7 |
| **TOPLAM** | **~256 nokta / 9 dosya** |

> Not: 256 rakamı keşif ajanının grep sayımı; kesin değil (±). 06 dokümanının "205" tahminiyle aynı büyüklük mertebesinde — scope biraz genişlemiş (rgba + gradient class'lar dahil). Palet ağırlıklı `slate-*` (~110), `indigo/violet-*` (~65) + anlam taşıyan accent'ler (kırmızı=çatışma, yeşil=başarı).

**Efor:** Orta — **~10–13 saat / ~1.5 gün.**
- Semantic token tanımı (`--success`, `--conflict`, glow vb.): ~0.5 sa
- 9 dosyada ~256 noktayı token'a çevirme (kör regex riskli; her nokta tasarım amacı taşıyor): ~6–8 sa
- Light/dark QA + WCAG kontrast + gradient/opacity okuması + mobil: ~3–4 sa

**Risk:** Orta.
- Glow/gradient (`from-indigo-* via-violet-*`) ve `/10 /20` opacity kombinasyonları light'ta kolay bozulur.
- Anlam taşıyan renkler (kırmızı=çatışma, yeşil=başarı) her iki temada tutarlı kalmalı.
- Landing vitrin/dönüşüm sayfası — kırılırsa doğrudan ilk izlenim etkilenir.

---

## Sonuç (net cümle)
**Landing'i dark/light seçilebilir yapmak ≈ 256 hardcoded nokta / 9 dosya / ~10–13 saat orta efor + orta QA riski.**

**Öneri: CANLI-SONRASINA ERTELE.** Gerekçe: (1) dashboard/admin/platform zaten tema-uyumlu (semantic token), kullanıcı deneyimi bugün light'ı görebiliyor; (2) landing vitrin, dokunmak dönüşüm riski; (3) 06 dokümanının kararıyla uyumlu ("landing her zaman dark kalır"). Canlı-öncesi öncelik değil.

**Canlı-öncesi küçük değer (isteğe bağlı):** D21 — admin/platform nav'ına ThemeToggle butonu eklemek (işlev zaten global, sadece buton). Bu landing'den bağımsız ve küçük (~1-2 sa).
