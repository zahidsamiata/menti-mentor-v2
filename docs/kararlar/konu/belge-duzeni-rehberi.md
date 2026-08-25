# Belge Düzeni Rehberi

**🔄 YAŞAYAN** (düzen kuralları geliştikçe güncellenir) · Son güncelleme: 2026-08-23 (Kural 2 alt-klasör genişletmesi)

> **Amaç:** `docs/` bir daha dağılmasın; "neyin nerede olduğu, hangi bilginin güncel olduğu" her zaman net bulunsun.
> Bu, tek seferlik temizlik değil **kalıcı düzen**dir. Belge oluşturan/düzenleyen (ajan dahil) bu 6 kurala uyar.
> Mevcut `CLAUDE.md` kuralları "Belge Eş-Zamanlılığı" ve "Belge Düzeltme Deseni" ile tutarlıdır.

---

## KURAL 1 — Tek gerçek kaynağı (single source of truth)
- Her konunun **BİR yetkili (canonical) belgesi** olur; diğerleri ona **işaret eder**, bilgiyi **kopyalamaz**.
- Canonical'lar: **güncel durum → `09-DURUM.md`** · **iş kuyruğu → `10-yol-haritasi.md`** · **çalışma disiplini → `CLAUDE.md`**.
- **Neden:** kopyalanan bilgi eskir ve çelişir. **Uygulama:** aynı bilgi iki belgede çelişirse **canonical kazanır**;
  ikincil belge canonical'a link verir ("bkz. 09-DURUM").

## KURAL 2 — Belge türü = klasör
- **`kararlar/`** = yaşayan güncel kararlar + durum + kuyruk. **`raporlar/`** = bir kerelik keşif/analiz çıktıları
  (tarihli, dondurulmuş). **`arsiv/`** = eskimiş/geçersiz ama tarihsel iz için saklanan.
- **Neden:** klasör, belgenin ömrünü ve amacını baştan söyler. **Uygulama:** yeni belge oluşturulurken **türüne
  göre doğru klasöre** konur (keşif raporu → `raporlar/`, karar → `kararlar/`, eskiyen → `arsiv/`).

> ⚠️ GÜNCELLEME (2026-08-23): `kararlar/` ve `raporlar/` şişince **alt-klasörlere** ayrıldı (git mv, içerik değişmedi).
> Tür=klasör kuralı korunur, bir kademe derinleşti. Yeni belge doğru alt-klasöre konur:
> - **`kararlar/`** (kök) → yalnız yaşayan canonical taşıyıcılar: `00-INDEX` · `09-DURUM` · `00-KARAR-TAKIP` ·
>   `10-yol-haritasi` · `10-yol-tamamlananlar` (bunlar kökte kalır, taşınmaz).
> - **`kararlar/konu/`** → konu bazlı kalıcı karar belgeleri (vizyon, mimari, güvenlik, tasarım, çalışma tarzı,
>   DISC/yaşam-döngüsü, `belge-duzeni-rehberi`, tasarım-kararları, teslim/metrik tasarımı).
> - **`kararlar/oz-denetim/`** → belgelerin/kararların **kendi iç** denetimi (belge hijyeni, karar-statü haritası,
>   unutulmuş-niyet envanteri, durum panosu) — "kararlarımız gerçekle uyumlu mu?".
> - **`raporlar/kesif/`** → keşif/teşhis fotoğrafları (repo/backend envanteri, kapasite, rakip/tema/katılım, teşhis, panel tasarımı).
> - **`raporlar/kod-denetimi/`** → **kodun gerçeğe karşı** denetimi (envanter ↔ kod, strateji ↔ kod, kapsamlı denetim, eksik analizi).
> - **`raporlar/panel/`** → platform ↔ tenant admin panel envanteri + strateji (kardeş çiftler).
> - **`raporlar/persona/`** → menti/mentör/yönetici persona + sevdirme/metrik belgeleri.
> - **`raporlar/icerik/`** → test/değerlendirme içerik arşivi (soru/cevap dökümü).
>
> **İki "denetim" ayrımı (adına bak, hangisi olduğu anlaşılsın):** `oz-denetim/` = **belge/karar** iç denetimi
> (kendi kararlarımızın hijyeni) · `kod-denetimi/` = **kod/ürün** denetimi (belge ne diyor ↔ kod ne yapıyor).

## KURAL 3 — Yaşayan mı, dondurulmuş mu (üst etiket)
- Her belgenin **en üstünde** net etiket olur: **🔄 YAŞAYAN** (sürekli güncellenir; ör. `09-DURUM`) veya
  **📸 DONDURULMUŞ (tarih)** (o günün fotoğrafı, güncellenmez; ör. keşif raporları).
- **Neden:** okuyan "bu güncel mi?" diye şüphe etmesin. **Uygulama:** dondurulmuş belge sonradan **düzenlenmez**;
  yanlışsa Kural 6 ile üstüne not düşülür veya arşive taşınır.

## KURAL 4 — Adlandırma
- **Dondurulmuş** belgeler **TARİHLİ** (ör. `teshis-raporu-2026-08-02`, `stk-admin-bulgu-envanteri-2026-08-11`).
- **Yaşayan** belgeler **TARİHSİZ / sabit-numaralı** (ör. `09-DURUM`, `10-yol-haritasi`, `belge-duzeni-rehberi`).
- **Neden:** isimden bile "fotoğraf mı yaşayan mı" anlaşılsın. **Uygulama:** dosya adını türüne göre seç.

## KURAL 5 — INDEX = harita
- **`docs/kararlar/00-INDEX.md`**, "neyi nerede bulurum"un **TEK kapısıdır**. Her önemli belgeyi listeler:
  ne olduğu + **canonical mı / arşiv mi** + **yaşayan mı / dondurulmuş mu**.
- **Neden:** `docs/`'a bakan önce tek yerden yönelensin. **Uygulama:** **yeni belge eklenince INDEX güncellenir**
  (bu, belge işinin bitiş adımıdır — atlanmaz).

## KURAL 6 — Eksik/yanlış işaretleme (silme yok)
- Güncelliğini yitirmiş/şüpheli bilgi **silinmez**; **başına** net uyarı konur:
  **`⚠️ GÜNCELLEME (tarih): [ne değişti / teyit gerek]`**.
- **Neden:** tarihsel iz korunur + kimse eski bilgiyi güncel sanmaz ("yanlış bilgiyi okumak, hiç okumamaktan kötü").
- **Uygulama:** mevcut `CLAUDE.md` "Belge Düzeltme Deseni" ile aynı; yaşayan belgede blok bayatladıysa üstüne
  bu notu ekle, gerçeğiyle güncelle (bkz. bu turda `09-DURUM` "açık PR" bloğu düzeltmesi).

---

## Özet (tek bakış)
| # | Kural | Pratik |
|---|---|---|
| 1 | Tek gerçek kaynağı | Kopyalama, link ver; çelişkide canonical kazanır |
| 2 | Tür = klasör (+ alt-klasör 2026-08-23) | kararlar/ yaşayan (kök: canonical · konu/ · oz-denetim/) · raporlar/ dondurulmuş (kesif/ · kod-denetimi/ · panel/ · persona/ · icerik/) · arsiv/ eskiyen |
| 3 | Yaşayan/dondurulmuş etiketi | Belge üstünde 🔄 veya 📸 (tarih) |
| 4 | Adlandırma | Dondurulmuş=tarihli · yaşayan=tarihsiz/numaralı |
| 5 | INDEX = harita | Yeni belge → 00-INDEX güncelle |
| 6 | Eksik-işaretleme | Silme; ⚠️ GÜNCELLEME (tarih) notu ekle |

> **Canonical:** Bu rehber, belge düzeninin tek yetkili kaynağıdır. `CLAUDE.md` buraya işaret eder.
