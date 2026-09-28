> ⚪ gereksiz olabilir — soru donmuş belgenin (`00-KARAR-TAKIP`, PO 2026-09-26'dan beri güncellenmiyor) muhasebesi; DISC'in yerine geçecek motor KARAR-10 → C / F-11 · PS-A1..A3 ile kuyrukta; kapatma PO'nun
### KARAR-37 · `00-KARAR-TAKIP` madde 103 — kart mı özet mi kazanır  [BELGE/METODOLOJİ]
**Şu an ne var:** `G2-01..05` kartları madde 103 için **🗑️ geçersiz** diyor (`docs/raporlar/bilanco/kararlar/G2-eslestirme-psikometri.md:57` … `:95`, gerekçe: "DISC bırakıldı, Big Five'a geçildi"); madde 103 satırı hâlâ **🔵❓** duruyor (`docs/kararlar/00-KARAR-TAKIP.md:577`). G2-04 (`G2-eslestirme-psikometri.md:84`) madde 103 ile **aynı başlığı** taşıyor ("Psikometrik gerekçe BELGELENMEMİŞ"). Kodda DISC hâlâ çalışıyor (`backend/src/services/matching.ts:72` %60/%40 · `discLetters.ts:23` "kalibre edilecek"); DISC'in yerine yeni motor KARAR-10 → C ile kuyrukta (F-11 · PS-A1..A3). `00-KARAR-TAKIP` 2026-09-20'den beri güncellenmiyor (PO 2026-09-26, CLAUDE.md § Belge Senkronizasyonu).
**Sorun ne:** Aynı kalem iki yerde iki farklı durumda. KURAL 15 *"çelişkide KART kazanır"* diyor — G2-04 madde 103 ile aynı konuda (psikometrik gerekçenin belgelenmemesi), ama 🗑️ gerekçesi "DISC bırakıldı" bir tasarım kararı: kod hâlâ DISC kullandığı için madde 103'ün işaret ettiği boşluk yeni motor bağlanana kadar kodda sürüyor.
**Neden sana soruyorum:** Bu tam olarak **G1-23 vakasının tekrarı** — orada da özet belge, farklı konulu bir kanıta dayanarak bir kalemi yanlışlıkla kapatmıştı ("21. hayalet tamamlanmış") ve bu, KURAL 15'in doğma sebebi oldu.
**Seçenekler:**
· **A — Kart kazanır, madde 103 🗑️.** Kullanıcı/ajan ne görür: madde 103 kapalı listede. Ne kazanırsın: tek hamlede kapanır. Ne kaybedersin: **gerçekten ayrı bir konuysa sessizce kaybolur** (G1-23 tekrarı). Süre **S** · geri alınır ✅ · Migration: yok.
· **B — Ayrı konu; madde 103 ⬜ AÇIK kalır, gerekirse yeni kart açılır.** Kullanıcı/ajan ne görür: madde 103 açık listede, G2 kartlarıyla ayrı. Ne kazanırsın: kayıp yok. Ne kaybedersin: bir kalem daha açık listede. Süre **S** · geri alınır ✅ · Migration: yok.
· **C — ❓ TEYİT GEREK bırak.** Kullanıcı/ajan ne görür: bugünkü gibi 🔵❓. Ne kazanırsın: iş yok. Ne kaybedersin: belirsizlik sürer, her turda yeniden tartışılır. Süre **0** · geri alınır ✅ · Migration: yok.
**Karşılaştırma:** A hızlı ama G1-23 dersini görmezden gelir; B bir kalem maliyetine kaybı önler; C hiçbir şey çözmez.
**Benim önerim:** **B** — çünkü aynı hata bu projede bir kez ölçülmüş ve kural hâline getirilmiş (KURAL 15'in gerekçesi).
**Cevap vermezsen:** madde 103 belirsiz kalır, her denetim turunda yeniden gündeme gelir. Kuyrukta kilitli iş yok (madde 103 için satır yok, grep 0).
**İlgili kartlar:** KARAR-50 (bayat kayıt/kural birikmesi) · KARAR-51 (donmuş belgede bayat durum etiketi)
**CEVAP:**

---

