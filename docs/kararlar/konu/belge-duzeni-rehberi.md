# Belge Düzeni Rehberi

**🔄 YAŞAYAN** (düzen kuralları geliştikçe güncellenir) · Son güncelleme: 2026-08-23 (Kural 2 alt-klasör + Kural 7 taşıyıcı iş bölümü + Kural 8 bulgu yaşam döngüsü)

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

## KURAL 7 — Taşıyıcı belgelerin iş bölümü (sınır kuralı) *(eklendi 2026-08-23)*
- **Neden:** İki 🔄 yaşayan belge aynı konuyu paralel takip ederse zamanla ayrı düşer ve çelişir (bugün G1/G2 güvenlik
  bulgusu yol-haritasında vardı ama karar-takipte yoktu — sınır yazılı olmadığı için). Her bilgi türünün **TEK canonical'ı** olur.
- **Uygulama:** aşağıdaki tablo. Aynı statü iki yaşayan belgeye **yazılmaz** — biri REFERANS verir (madde no / link), statüyü tek yer tutar.
  Çelişince **KOD kazanır**, tek-canonical düzeltilir, diğerleri referansı korur.

| Belge | ⬅ BURAYA GİRER (canonical) | ⛔ GİRMEZ (nereye ait) |
|---|---|---|
| `09-DURUM.md` | "ŞU AN ne oldu" anlatısı: son merge/PR, SHA/pointer snapshot, biten işin kod-anlatısı (dosya:satır, migration teyidi), bilinen sınırlar | açık iş kuyruğu/öncelik (→10-yol) · tek-bakış açık-iş/ölü-kod tablosu (→KARAR-TAKIP) · belge haritası (→INDEX) · biten iş özet-satırı (→tamamlananlar) |
| `10-yol-haritasi.md` | YALNIZ açık/yapılacak işlerin **öncelik sıralı kuyruğu** (v1/v2, madde no sabit, sıradaki somut adım — tek satır) | biten işin tam anlatısı (→09-DURUM) · biten iş özet-kaydı (→tamamlananlar) · ölü-kod niyet analizi (→KARAR-TAKIP) · SHA/snapshot (→09-DURUM) |
| `00-KARAR-TAKIP.md` | "NE KALDI" tek-bakış: açık iş + yarım iş + **ölü/bağlanmamış kod** (niyet→neye bağlanacak) + uygulanmamış karar; her kalem **kod-kanıtlı** (dosya:satır) | öncelik sıralaması (→10-yol) · "ne oldu" anlatısı/SHA (→09-DURUM) · biten iş kaydı (→tamamlananlar). *(Açık işleri 10-yol ile aynı madde-no ile REFERANSLAR, statüyü kopyalamaz.)* |
| `10-yol-tamamlananlar.md` | Biten v1 işlerinin **kompakt kaydı**: madde no + tek satır + PR no + tarih | tam anlatı/kod-detay (→09-DURUM) · açık/kısmi işler (→10-yol; kısmi burada DURMAZ) · ölü kod (→KARAR-TAKIP) |
| `00-INDEX.md` | Belge **haritası**: hangi bilgi hangi belgede, canonical mı/arşiv mi, 🔄 mı 📸 mı, okuma yolu | iş statüsü/durum içeriği (→09/10/KARAR-TAKIP) · karar gövdeleri (→konu/). *(Yalnız işaret eder, içerik tutmaz.)* |
| `00-CIKIS-PLANI.md` | Çıkış **önceliği sınıflandırması** (K0-K5 + tur planı): "hangi iş çıkıştan önce/sonra" bakışı | iş statüsü (→KARAR-TAKIP/09) · kuyruk detayı (→10-yol) · kanıt (→KARAR-TAKIP). *(Maddelere referans verir, statü/detay tutmaz.)* |

- **Yazımdan önce sor:** (1) "ne oldu" mu (→09), "ne kalacak" mı (→10/KARAR-TAKIP), "nerede" mi (→INDEX)? (2) Aynı statüyü ikinci yaşayan belgeye mi yazıyorum → DUR, biri referans versin. (3) Statü kaynağı hep KOD.

## KURAL 8 — Bulgu yaşam döngüsü (bulgu nasıl akar) *(eklendi 2026-08-23)*
- **Neden:** KURAL 7 "hangi bilgi nerede DURUR" der; KURAL 8 "bir bulgu keşiften çıkışa nasıl AKAR" der. Bu akış olmadan bulgular
  rapordan doğrudan yol haritasına sızıp mükerrer numara/kayıp madde üretir (bu turlarda yaşandı). **Tek giriş kapısı = KARAR-TAKIP.**
- **Akış (her bulgu bu sırayı izler):**
  1. **Keşif turu → tarihli 📸 rapor** (`raporlar/` altına). Ham kanıt (dosya:satır), güncellenmez. **Rapor AKSİYON KAYNAĞI OLARAK BIRAKILMAZ.**
  2. **AYNI TURDA → her aksiyon `00-KARAR-TAKIP`'e girer.** TEK GİRİŞ KAPISI. **Numarasını BURADA alır** (tek numara dizisi; başka hiçbir yerde numara verilmez). Rapordan doğrudan yol haritasına giden bulgu OLMAZ.
  3. **Öncelik verilince → `10-yol-haritasi`'na TEK SATIR** (numara + tek cümle + öncelik + "detay: KARAR-TAKIP"). Detay kopyalanmaz.
  4. **İş bitince → önce KOD doğrulanır, sonra dört yer:** KARAR-TAKIP ✅ · yol haritası stub · `10-yol-tamamlananlar` kaydı · `09-DURUM` anlatısı.
  5. **Oturum bitince → `07-oturum-gunlugu`'na bölüm.**
- **Uygulama:** numara yalnız KARAR-TAKIP'te doğar → çakışma olmaz (bkz. #38 çakışması, 2026-08-23'te ada çevrilerek çözüldü).

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
| 7 | Taşıyıcı belge iş bölümü | 5 taşıyıcının sınırı: statü tek yerde, diğerleri referans; çelişkide KOD kazanır |
| 8 | Bulgu yaşam döngüsü | rapor(📸)→KARAR-TAKIP(numara burada doğar)→yol-haritası(tek satır)→biten:4 yer→günlük |

> **Canonical:** Bu rehber, belge düzeninin tek yetkili kaynağıdır. `CLAUDE.md` buraya işaret eder.
