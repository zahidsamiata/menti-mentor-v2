# Depo Denetimi Raporu
**Tarih:** 2026-08-02 · **Mod:** salt-okuma · **Kapsam:** repo hijyeni (boş/artık/yanlış-yerleşim/isimlendirme)
**Önemli:** Hiçbir dosya silinmedi/taşınmadı. Bu rapor yalnızca karar girdisidir; temizlik kararı Zahid'de.

> Risk kodları: 🟢 kesin güvenli · 🟡 teyit iste · 🔴 dokunma, Zahid'e sor
> node_modules, .git, dist, .next taramadan hariç tutuldu (build/dependency artefaktı).

---

## Genel değerlendirme
Repo **büyük ölçüde temiz ve profesyonel**. Klasik hijyen borcu (`.bak/.old/.tmp/*~/.orig`, `.DS_Store`, `Thumbs.db`, git'e sızmış `.env`, yanlışlıkla commit'lenmiş build çıktısı) **yok**. `.gitignore` sağlam: `.env`/`.env.*` ignore, `dist/`/`.next/` ignore. Gerçek repo-hijyen borcu ~sıfır; tek anlamlı soru işareti kökteki `Menti Mentör proje/` klasörü.

---

## Bulgular

### 🔴 1. `Menti Mentör proje/` (kök dizinde, untracked)
- **YOL:** `./Menti Mentör proje/` (içinde tek dosya: `Untitled`, 0 byte)
- **SORUN:** Amaç belirsiz bir klasör; backend/frontend ile ilişkisi yok, git'te izlenmiyor (`git status` → `?? "Menti Ment\303\266r proje/"`). İçindeki `Untitled` boş.
- **KANIT:** Git status untracked listesi + klasör içeriği yüzeysel tarama (0-byte `Untitled`).
- **ÖNERİ:** **DOKUNMA — Zahid'e sor.** Eski proje dump'ı/referans mı, geçici mi? Karara göre sil / `docs/arsiv/`'e taşı. İçeriğine derin girilmedi (büyükse ayrı iş).
- **RİSK:** 🔴 (amaç bilinmeden silmek veri kaybı riski). Ayrıca isim konvansiyon dışı (Türkçe karakter + boşluk; repo geneli kebab-case: `backend`, `frontend`, `docs`).

### 🟡 2. `backend/.env.backup-anaDB`
- **YOL:** `backend/.env.backup-anaDB` (~160 byte, gitignore'lu — git'e sızmıyor)
- **SORUN:** Ortam değişkeni yedeği; ana Neon connection bilgisinin yedeği olabilir. Lokal dosya, repoya girmiyor ama gereksiz duruyor olabilir.
- **KANIT:** Dosya varlığı + `.gitignore`'da `.env.backup-*` pattern'i (kasıtlı ignore). ⚠️ İçeriği **okunmadı/gösterilmedi** (secret olabilir).
- **ÖNERİ:** Yedek amacı bittiyse sil; env geçişleri için tutuluyorsa `scripts/` veya güvenli bir yere adlandırarak taşı → **teyit iste.**
- **RİSK:** 🟡 (secret içerebilir; silmeden önce env geçişi için hâlâ gerekli mi teyit et).

### 🟢 3. `frontend/.next/` build artefaktı
- **YOL:** `frontend/.next/` (içinde `standalone/...` derin ağaç)
- **SORUN:** Lokal build çıktısı; gitignore'lu, repo sorunu değil. Sadece lokal diskte yer kaplıyor.
- **KANIT:** `.gitignore`'da `/.next/`. Git'e girmiyor.
- **ÖNERİ:** Gerekirse `rm -rf frontend/.next && npm run build` ile tazele. Repo hijyeni açısından **sorun değil**.
- **RİSK:** 🟢 (yeniden üretilebilir, git dışı).

---

## Temiz çıkanlar (sorun yok)
- ✅ `.bak / .old / .tmp / *~ / .orig` yok
- ✅ `.DS_Store / Thumbs.db` yok
- ✅ Git'e commit'lenmiş `.env` **yok** (`.gitignore` `.env`/`.env.*` kapsıyor; sızıntı yok)
- ✅ Yanlışlıkla izlenen `dist/` / `.next/` yok
- ✅ backend/frontend/docs/scripts altında boş dosya/klasör yok (node_modules hariç)

---

## Sonuç
| Kategori | Sayı | Not |
|---|---|---|
| Boş dosya | 1 | `Menti Mentör proje/Untitled` (0 byte) |
| Artık/yedek | 1 | `backend/.env.backup-anaDB` (🟡 teyit) |
| Yanlış yerleşim / belirsiz | 1 | `Menti Mentör proje/` klasörü (🔴 Zahid'e sor) |
| İsimlendirme dışı | 1 | aynı klasör (Türkçe+boşluk) |

**Önerilen temizlik hacmi:** düşük. Tek gerçek karar = `Menti Mentör proje/` klasörünün akıbeti (Zahid). Diğerleri lokal/git-dışı, düşük öncelik. **Hiçbiri silinmedi.**
