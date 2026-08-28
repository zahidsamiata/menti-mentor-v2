# Eşleştirme Uyum Tablosu — Ürün Sahibi İncelemesi (2026-08-26)
**📸 DONDURULMUŞ (2026-08-26)** — PO işaretleme dosyası (üst-etiket eklendi: G9-10, 2026-08-28).
**🟢 BYPASS (yalnız-belge)** — Sistem iki kişiyi eşleştirirken karakter (DISC) uyumunu nasıl hesaplıyor? Aşağıdaki kararlar KOD İÇİNDE sabit yazılı. Katılıp katılmadığınızı işaretleyin.

---

## Nasıl okunur

Sistem her kişiyi dört karakter tipinden biriyle etiketler: **D** (kararlı/hızlı), **I** (dışa dönük/ikna edici), **S** (sakin/destekleyici), **C** (titiz/analitik). Bir mentör ile bir menti eşleştirilirken, ikisinin karakter tipleri bir uyum tablosundan karşılaştırılır.

Aşağıdaki uyum değerlerini üç banda çevirdik (kolay okunsun diye):
- **düşük** = 40 ve altı (bu eşleşme karakter olarak zayıf)
- **orta** = 41–69 arası
- **yüksek** = 70 ve üstü (bu eşleşme karakter olarak güçlü)

⚠️ **Önemli — yön fark eder.** Tablo asimetriktir: "D mentör ile S menti" ile "S mentör ile D menti" AYNI DEĞİLDİR. Her satırda önce **mentörün** tipi, sonra **mentinin** tipi yazılıdır.

---

## 1. Uyum tablosu (16 kombinasyon)

- **D tipi mentör ↔ D tipi menti** → uyum **orta**
  `[ ] PO notu: `
- **D tipi mentör ↔ I tipi menti** → uyum **yüksek**
  `[ ] PO notu: `
- **D tipi mentör ↔ S tipi menti** → uyum **düşük**
  `[ ] PO notu: `
- **D tipi mentör ↔ C tipi menti** → uyum **yüksek**
  `[ ] PO notu: `
- **I tipi mentör ↔ D tipi menti** → uyum **yüksek**
  `[ ] PO notu: `
- **I tipi mentör ↔ I tipi menti** → uyum **orta**
  `[ ] PO notu: `
- **I tipi mentör ↔ S tipi menti** → uyum **yüksek**
  `[ ] PO notu: `
- **I tipi mentör ↔ C tipi menti** → uyum **yüksek**
  `[ ] PO notu: `
- **S tipi mentör ↔ D tipi menti** → uyum **düşük**
  `[ ] PO notu: `
- **S tipi mentör ↔ I tipi menti** → uyum **yüksek**
  `[ ] PO notu: `
- **S tipi mentör ↔ S tipi menti** → uyum **yüksek**
  `[ ] PO notu: `
- **S tipi mentör ↔ C tipi menti** → uyum **orta**
  `[ ] PO notu: `
- **C tipi mentör ↔ D tipi menti** → uyum **yüksek**
  `[ ] PO notu: `
- **C tipi mentör ↔ I tipi menti** → uyum **yüksek**
  `[ ] PO notu: `
- **C tipi mentör ↔ S tipi menti** → uyum **orta**
  `[ ] PO notu: `
- **C tipi mentör ↔ C tipi menti** → uyum **orta**
  `[ ] PO notu: `

**Asimetriye dikkat (aynı ikilinin iki yönü farklı sonuç veriyor):**
- **D mentör ↔ S menti = düşük**, ama **S mentör ↔ D menti = düşük** (bu ikili her iki yönde de düşük — ayrıca aşağıdaki 4. maddeye bakınız, D mentör + S menti tamamen eleniyor).
- **D mentör ↔ I menti = yüksek**, ama **I mentör ↔ D menti = yüksek** (ikisi de yüksek ama tablodaki ham puanları birbirinden farklı).
- Kısaca: kimin mentör, kimin menti olduğu sonucu etkiler. Aynı iki kişiyi rolleri değiştirerek eşleştirseniz farklı uyum çıkabilir.

**Özel durum — D mentör + S menti tamamen engelli:** Yukarıdaki "düşük" değerine ek olarak, sistemde tek bir kesin engel kuralı var: **D tipi mentör, S tipi bir menti ile hiç eşleştirilmez** (aday havuzunda başka seçenek kalmadıysa bu engel gevşetilir).
  `[ ] PO notu: `

---

## 2. Eşitlik bozucu — baskın harf sıralaması

Bir kişinin karakter testinde iki tip berabere çıkarsa (örneğin D ve I eşit puan aldıysa), sistem sabit bir sıraya göre birini "baskın" seçer:

**D > I > S > C** (yani eşitlikte önce D, sonra I, sonra S, en son C).

Bu, "berabere kaldı, hangisini baskın sayalım?" sorusuna verilen kesin cevaptır.
  `[ ] PO notu: `

---

## 3. Ağırlık: %60 sektör / %40 karakter

Bir eşleşmenin toplam puanı iki parçadan oluşur:
- **%60 → ortak sektör/ilgi alanı** (mentör ve mentinin aynı alanlarda olması)
- **%40 → karakter (DISC) uyumu** (yukarıdaki tablo)

Yani bugün sistem, karakter uyumundan çok ortak sektöre ağırlık veriyor. (Not: bu oran kuruma özel olarak değiştirilebiliyor; %60/%40 yalnızca varsayılan.)
  `[ ] PO notu: `

---

## Dürüst not — bu sayılar nereden geliyor?

Yukarıdaki her şey — 16 uyum değeri, D>I>S>C sıralaması ve %60/%40 ağırlığı — **kodun içine elle yazılmış sabit sayılardır.** Bunların bilimsel/psikometrik bir kaynağı, dayanağı ya da gerekçesi ne kodda ne de belgelerde **yoktur; belgelenmemiştir.** Kodun kendi yorumu da bunu dolaylı kabul eder: "başlangıç değerleri, gerçek kullanıcı verisi biriktikçe kalibre edilecek."

Yani bu sayılar şu an **sezgiseldir** — birinin makul bulup yazdığı başlangıç değerleridir, kanıtlanmış değildir. Bu tabloyu onaylamak ya da değiştirmek teknik bir konu değil, bir **ürün kararıdır** ve karar sizindir.
