# STK YÖNETİCİ PERSONASI + METRİK TASLAĞI
**Tarih:** 2026-08-02 · **Amaç:** Yönetici paneli + retention tasarımı için temel referans
**Uyarı:** Bu bir *eğitimli taslak* — gerçek yöneticilerle konuşmanın yerini tutmaz.
Nihai kararlar (hangi metrik, hangi ekran) Zahid'de. Gerçek kullanıcı görüşmesiyle doğrulanmalı.

---

## 1. YÖNETİCİ KİM? (3 persona)

Platformun "yönetici"si tek tip değil. Üç farklı profil, üç farklı ihtiyaç:

### Persona A — "Gönüllü Kulüp Başkanı" (en yaygın)
- Üniversite öğrencisi, kulübü gönüllü yönetiyor, **zamanı yok**, maaş almıyor.
- Teknik değil. Karmaşık panel görürse bırakır.
- Derdi: "Üyelerimi doğru kişilerle buluşturmak ve bunu takip etmek elimde değil."
- Başarı tanımı: "Az emekle çok eşleşme + döneme güzel bir rapor."
- **Terk sebebi:** Kurulum/kullanım zahmetli olursa, ya da ilk hafta değer görmezse.

### Persona B — "Mezun Derneği Koordinatörü" (en kurumsal)
- Yarı-profesyonel, belki maaşlı. Yönetim kuruluna hesap veriyor.
- Derdi: "Programın işe yaradığını **kanıtlamam** gerekiyor (kurula, sponsora)."
- Başarı tanımı: "Sunulabilir etki verisi + düzenli işleyen bir program."
- **Terk sebebi:** Rapor üretemezse, ya da program 'ölü' görünürse.

### Persona C — "Sosyal Girişim / STK Program Yöneticisi"
- Fon/hibe ile çalışıyor. Fon verene **impact (etki)** raporu sunmak zorunda.
- Derdi: "Bağışçıya 'şu kadar gence dokunduk' diyebilmeliyim."
- Başarı tanımı: "Ölçülebilir sosyal etki + ROI."
- **Terk sebebi:** Etki ölçemezse, fonu kaybeder → platformu da bırakır.

> **Ortak payda (üçü de):** Hepsi birine hesap veriyor (hoca/kurul/sponsor) ve hepsi
> "program yaşıyor mu?" + "kimse kaynıyor mu?" + "bunu gösterebilir miyim?" istiyor.

---

## 2. YÖNETİCİ NEDEN KAYDOLUR? (var olma sebebi)

**Kritik gerçek:** Yöneticinin zaten WhatsApp grubu + Excel + Instagram'ı var.
Platforma geçmesi için bu üçünün **birden yapamadığını** vermelisin.

O şey = **eşleştirme + görünürlük**:
- "Kim kime uygun?" (DISC + sektör) → Excel yapamaz.
- "Kim kiminle eşleşti, işliyor mu?" → WhatsApp'ta kaybolur.
- "Program sağlıklı mı, kanıtı ne?" → Instagram göstermez.

**Bu platformun var olma sebebi:** Yöneticinin göremediği "eşleşme + takip + kanıt"ı
tek yerde, zahmetsizce görünür kılmak. Bunu çözmüyorsa, güzel bir Excel'den farkı yok.

---

## 3. YÖNETİCİNİN 3 TEMEL SORUSU (tüm metrikler bunlara hizmet etmeli)

Panel tasarımının anayasası. Her metrik şu üç sorudan birine cevap vermeli,
vermiyorsa panelde yeri yok:

| # | Soru | Amaç | Duygu |
|---|------|------|-------|
| **S1** | "Program yaşıyor mu, ölüyor mu?" | Aktiflik/ivme | Rahatlama ya da alarm |
| **S2** | "Kimse arada kaynıyor mu?" | Boşluk/risk tespiti | Harekete geçme |
| **S3** | "Bunu birine gösterebilir miyim?" | Kanıt/etki | Gurur/güven |

---

## 4. METRİK TASLAĞI (aday — Zahid süzecek)

> İlke: **Az ve anlamlı.** Kalabalık panel = kullanılmayan panel.
> Öncelik: 🟢 çekirdek (mutlaka) · 🟡 değerli (ikinci dalga) · ⚪ ileride.

### S1 — "Program yaşıyor mu?" (Aktiflik & İvme)
- 🟢 **Aktif üye** (bu hafta/ay giriş yapan) + oran (%). *En temel nabız.*
- 🟢 **Bu ay yapılan görüşme sayısı** + geçen aya göre ok (↑/↓). *İvme.*
- 🟡 Haftalık aktiflik trendi (küçük grafik). *Yaşıyor mu, sönüyor mu.*
- 🟡 Pasif üye sayısı (X gündür girmemiş). *Erime sinyali.*

### S2 — "Kimse kaynıyor mu?" (Boşluk & Risk — harekete geçirir)
- 🟢 **Mentörsüz bekleyen menti** sayısı. *En kritik boşluk — tıklayınca kişiler.*
- 🟢 **Hiç görüşme yapmamış eşleşme** (eşleşti ama buluşmadı). *Ölü eşleşme.*
- 🟡 Mentör/menti dengesi (yeterli mentör var mı, arz-talep).
- 🟡 Uzun süredir pasif üyeler (dürtülecekler listesi). *tıkla → kim.*
- ⚪ Onay bekleyen mentör başvurusu (yönetici aksiyonu gereken).

### S3 — "Gösterebilir miyim?" (Kanıt & Etki)
- 🟢 **Toplam:** üye / eşleşme / görüşme (kümülatif büyük sayılar). *Sunum kartı.*
- 🟡 Onboarding/DISC tamamlama oranı (katılım kalitesi).
- 🟡 Ortalama eşleşme uyum skoru (eşleştirme kalitesi — bizim farkımız).
- ⚪ Memnuniyet/geri bildirim skoru (varsa feedback'ten).
- ⚪ Dönemsel/indirilebilir özet rapor (sponsora sunmak için).

---

## 5. PANEL TASARIM İLKELERİ (nasıl gösterilmeli)

1. **Önce özet, sonra detay (drill-down).** Panel açılınca büyük sayılar/durum.
   Bir sayı ilgini çekerse tıkla → altındaki kişiler. (Zahid'in kararı: kişi listesi
   değil, önce anlamlı veri; tıklayınca kişiler.)
2. **Okumadan anlaşılmalı.** Büyük rakam + renk (yeşil/kırmızı) + ok (↑/↓).
   Yönetici rapor indirmeye uğraşmamalı.
3. **Panel uyarmalı, yönetici aramamalı.** "15 menti mentör bekliyor" → kırmızı uyarı,
   yöneticinin fark etmesini bekleme.
4. **Rahatlat ya da uyar.** Ayda bir giren yönetici, ya "her şey yolunda" görüp
   rahatlamalı, ya da net bir sorun görüp harekete geçmeli. Belirsizlik bırakma.
5. **Az metrik.** 6-8 çekirdek metrik ilk ekranda yeter. Gerisi ikinci dalga.

---

## 6. DAHA DERİN SORULAR (metriği bunlar belirler — Zahid/gerçek yönetici cevaplamalı)

Standart "ne görmek istersin"in ötesinde, asıl karar anlarına inen sorular:

1. **"Bu programı neden BIRAKIRDIM?"** — Terk sebebi, kaydolma sebebinden değerli.
   Platformlar kaydolmamaktan değil, *bırakılmaktan* ölür.
2. **"İlk hafta ne yaşarsam 'işe yarıyor' derim?"** — İlk 'aha anı'. Yönetici ilk
   hafta değer görmezse gider; onboarding bunu vermeli.
3. **"Hangi an telefonu elime alıp bir üyeye mesaj atarım?"** — Panel beni ne zaman
   *harekete* geçirmeli? (retention'ın kalbi.)
4. **"Neyi, kime kanıtlamam gerekiyor?"** — Yöneticinin patronu kim (sponsor/kurul/
   rektörlük)? Panel onun dilini konuşmalı (S3 metrikleri buna göre).
5. **"Neden Excel değil?"** — Var olma sebebi testi. Her özellik bu testi geçmeli.
6. **"Kaç üyeden sonra bu iş elle yönetilemez olur?"** — Panelin gerçek değeri
   hangi ölçekte başlıyor (küçük kulüpte belki Excel yeter, büyük dernekte şart).

---

## 7. SONRAKİ ADIM ÖNERİSİ

1. **Zahid süzer:** Yukarıdaki metriklerden çekirdek 6-8'i seçer (🟢'lar öneri).
2. **Kod keşfi (retention turu, Aşama 1):** Bu metriklerin verisi backend'de var mı?
   (lastLoginAt, görüşme sayısı, eşleşme durumu, onboarding tamamlama... çekilebiliyor mu.)
   Envanter: "şu metrik hazır, şu metrik için veri eklemek gerek."
3. **Uygulama:** Yönetici istatistik paneli (özet → drill-down) + eksik veri altyapısı.
4. **(İdeal) Doğrulama:** 3-5 gerçek kulüp/dernek yöneticisiyle 30 dk görüşme →
   bu taslağı gerçekle test et. Bu, tüm tahminlerden değerli.

---
*Bu belge yönetici paneli + retention işinin strateji zeminidir. Kod keşfi ve metrik
seçimi bundan türetilecek. Kaynaklar: rakip analizi (ADPList/Together/Mentornity),
ürün/retention mantığı, MentiMentor mevcut yapısı.*
