# İçerik Belgeleri İndeksi — `docs/raporlar/icerik/`

> 🔄 YAŞAYAN indeks · Oluşturuldu: 2026-09-03 · tur: `docs/icerik-kaydi-2026-09-03`
>
> Bu klasör, MentiMentor'un **kullanıcıya görünen içeriğinin** (arketip kartları, yaklaşım
> metinleri, öğrenme aşamaları, sertifika senaryoları, eşleşme/ret/bekleme metinleri) kalıcı
> kaydıdır. 2026-09-03 içerik oturumlarında üretildi; bu turda `docs/gelen/`'den buraya taşındı.
>
> ⚠️ Bu belgeler İÇERİK kaydıdır — kod DEĞİL. Senaryoların/kartların koda (seed) geçmesi ayrı ve
> sonraki turların işidir. Kod kalemleri: `kod-kalemleri-2026-09-03.md` (bu klasörde) → numaralar
> `00-KARAR-TAKIP`'te PO tarafından verilecek.

---

## 1. KAYDEDİLEN BELGELER (bu klasörde mevcut)

| Belge | Ne kapsıyor (tek satır) | Yol |
|---|---|---|
| `arketip-ve-yaklasim-icerigi-2026-09-03.md` | 8 arketip kartı (4 mentör + 4 menti) · 4 "şimdilik" varyantı · 8 yaklaşım (#31) metni · P3 kararı · 10 puanlık eşik kararı | `docs/raporlar/icerik/` |
| `faz6-ogrenme-ve-sertifika-2026-09-03.md` | 8 mentör öğrenme aşaması (24 şık) · 20 sertifika senaryosu (10 konu × 2 varyant, 80 şık) · havuz mantığı · 10 isim değişkeni | `docs/raporlar/icerik/` |
| `menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md` | 5 menti aşaması (15 şık) · geri bildirim gösterim kuralı · eşleşme detay sayfası (3 bölüm, 16 kombinasyon — 1 yazıldı) · 3 bekleme + 2 ret metni | `docs/raporlar/icerik/` |
| `kod-kalemleri-2026-09-03.md` | Üç belgeden doğan 23 kod kalemi envanteri + belge↔kod çelişki listesi + dürüstlük sınırları | `docs/raporlar/icerik/` |

**Önceden bu klasörde olan (2026-08-26 içerik incelemeleri):**

| Belge | Ne kapsıyor | Yol |
|---|---|---|
| `sorular-po-inceleme-2026-08-26.md` | Soru havuzu PO incelemesi | `docs/raporlar/icerik/` |
| `eslesme-uyum-po-inceleme-2026-08-26.md` | Eşleşme/uyum PO incelemesi | `docs/raporlar/icerik/` |
| `tam-soru-dokumu-2026-08-26.md` | Tam soru dökümü | `docs/raporlar/icerik/` |
| `bolumler/` | Bölüm bazlı içerik parçaları (alt klasör) | `docs/raporlar/icerik/bolumler/` |

---

## 2. ⬜ ATIF YAPILAN AMA HENÜZ KAYDEDİLMEMİŞ KARDEŞ BELGELER

Yukarıdaki üç 2026-09-03 belgesi bu dört belgeye atıf yapıyor. **Hiçbiri depoda yok**
(worktree + tüm branch + git geçmişi tarandı, 0 sonuç). Kayıtları geldiğinde bu tabloya taşınır ve
üç belgedeki `⚠️ Bu belge henüz kaydedilmedi` işaretleri kaldırılır.

| Belge | Beyan edilen kapsam | Durum |
|---|---|---|
| `senaryo-bankasi-2026-09-03.md` | 39 karakter senaryosu / 117 şık | ⬜ HENÜZ YAZILMADI |
| `olcme-mimarisi-2026-09-03.md` | 11 maddelik ölçme mimarisi | ⬜ HENÜZ YAZILMADI |
| `senaryo-denetim-protokolu.md` | Senaryo denetim protokolü v2 | ⬜ HENÜZ YAZILMADI |
| `olcme-arastirmasi-2026-09-03.md` | Akademik ölçme araştırması özeti | ⬜ HENÜZ YAZILMADI |

> ⚠️ NOT — karışmasın: `backend/prisma/senaryo-bankasi-tam.md` ADI benzer ama FARKLI bir belgedir
> (mentör **sertifika** senaryo bankası v2: 10 KONU × 2 varyant = 20 senaryo, yetkinlik-temelli 0-3
> puanlama; DISC/Big Five değil). Yukarıdaki `senaryo-bankasi-2026-09-03.md` (39 **karakter** senaryosu)
> ile aynı belge DEĞİL.

---

## 3. NEREYE BAKILIR

- **Güncel proje durumu:** `docs/kararlar/09-DURUM.md`
- **Açık iş/karar/çelişki takibi:** `docs/kararlar/00-KARAR-TAKIP.md`
- **Bu klasörün kod kalemleri:** `kod-kalemleri-2026-09-03.md` (aynı klasör)
- **İçerik ön-koşul keşifleri (2026-09-03):** `../kesif/icerik-onkosul-kesifleri-2026-09-03.md` — sertifika bankası ikizi (PO harmanla → 11 konu×2=22) · `outcome` alanı (S31 cevabı) · 4 ayrı içerik sistemi · madde 73 gerçek kapsamı (yalnız sertifika). Etkilediği maddeler: 30 · 73 · 145 · 147 · 148.
- **Faz 5 ön-koşul keşfi (2026-09-04):** `../kesif/faz5-onkosul-kesfi-2026-09-04.md` — OCEAN üretimi + 39 senaryonun koda girişi. ⭐ SJT altyapısı iskeleti ZATEN KODDA (SjtQuestion/SjtOption/sjt-scorer); 3 boşluk (SjtResponse yok · adaptif ters · güven rampası yok); Faz 5 = **11 iş + 6 karar**. Etkilediği maddeler: 101 · 138 · 139 · 140 · 73 + S33.
