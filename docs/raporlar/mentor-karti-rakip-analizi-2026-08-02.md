# MENTÖR / MENTİ KARTI — RAKİP ANALİZİ
**Tarih:** 2026-08-02 · **Amaç:** Menti mentör-tarama sayfası kart tasarımı için karar girdisi
**Not:** Bu bir araştırma özeti. Nihai karar (hangi bilgi, kaç kart/sayfa) ürün sahibinde. Yeni oturumda kullanılacak.

---

## İNCELENEN RAKİPLER
- **ADPList** — dünyanın en büyük ücretsiz mentörlük platformu (40.000+ mentör). Referans standart.
- **MentorCruise** — ücretli/uzman mentörlük pazaryeri.
- **Mentornity** — ürün sahibinin gösterdiği örnek (Türk STK/kulüp bağlamına yakın).
- **Genel kart-UI pratikleri** — LinkedIn/Amazon/Dribbble profil-kartı desenleri.

---

## 1. KARTTA NE GÖSTERİLİYOR (rakip karşılaştırması)

| Bilgi | ADPList | MentorCruise | Mentornity | Öneri (MentiMentor) |
|---|---|---|---|---|
| **Fotoğraf** | ✅ Büyük, zorunlu (net, profesyonel) | ✅ | ✅ | ✅ Zorunlu, yoksa baş harf avatarı |
| **İsim** | ✅ | ✅ | ✅ | ✅ |
| **Rol / unvan** | ✅ (ör. "Senior UX @ Google") | ✅ (ör. "Lead UX @ JP Morgan") | ✅ ("Öğrenci", "Kurucu") | ✅ |
| **Uzmanlık/sektör etiketleri** | ✅ (chip'ler) | ✅ (UX, UI, Research…) | ✅ (blockchain, eğitim, pazarlama…) | ✅ **Sektör + DISC** |
| **Kısa bio** | Profilde (kartta değil, hover/detay) | ✅ Kısa tanıtım | Kısmen | ⚪ Karta koyma → detayda |
| **Rating / puan** | ✅ Yıldız + oturum sayısı | ✅ 4.9/5 | ❌ | ⏳ İleride (canlı-öncesi yok) |
| **Deneyim (yıl/şirket)** | ✅ | ✅ | ❌ | ⚪ Opsiyonel |
| **Müsaitlik göstergesi** | ✅ ("Available") | ✅ | ❌ | ⏳ İleride |
| **Aksiyon butonu** | "Book session" | "Apply now" | "Mesaj Gönder" / "Takip Et" | ✅ "Talep Gönder" / "Mesaj" |

---

## 2. NET ÇIKARIMLAR (rakiplerin ortak dersleri)

### a) "Az bilgi = daha iyi" (en güçlü bulgu)
Kart tasarım araştırmaları net: **kartta 3 çekirdek unsur** en iyi sonucu veriyor.
Bir fintech redesign'ında kart 6 unsurdan 3'e (görsel, isim, fiyat) indirilince tıklama ~%33 artmış.
→ **Karta her şeyi tıkma. Fotoğraf + isim + rol + birkaç etiket yeter. Gerisi detay sayfasında.**

### b) Profil kartı = "dijital kartvizit"
LinkedIn/Twitter/GitHub hepsi aynı deseni kullanıyor: **avatar + isim + rol + aksiyon butonu + belki 1 satır istatistik.**
Bu kanıtlanmış bir desen — yeniden icat etme.

### c) Etiketler (chip) tarama için kritik
ADPList "uzmanlığa göre filtrele" diyor; Mentornity kartta sektör chip'leri gösteriyor.
→ **DISC + sektör etiketleri kartta olmalı** — menti bir bakışta "bu bana uygun mu" görebilsin.
→ MentiMentor'un FARKI burada: rakiplerde DISC yok. **DISC etiketi/rozeti bizim ayırt edici unsurumuz.**

### d) Grid + responsive
Standart: **mobilde 1 kolon → tablet 2 → masaüstü 3-4 kolon.**
Mentornity'de masaüstü 3 kolon (senin gösterdiğin ekranlarda da öyle).
→ 3 kolon iyi başlangıç.

### e) Fotoğraf kalitesi kritik
ADPList mentör kriteri: net, profesyonel, gülümseyen foto; çizgi film/güneş gözlüğü/pikselli olmaz.
→ Fotoğraf yoksa **baş harf avatarı** (Mentornity'deki "AA", "AB" gibi) — boş kalmasın.

---

## 3. SAYFALAMA (ürün sahibinin asıl endişesi)

Rakiplerin hiçbiri tek sayfada 100 kart göstermiyor — hepsi **grid + sayfalama/sonsuz kaydırma**.
ürün sahibinin sezgisi doğru: **sayfa başına ~12-20 kart, altında sayfa numaraları.**
- 300 mentör → sayfa başına ~20 → ~15 sayfa. Yığılma olmaz.
- ADPList'te ek olarak **arama kutusu** (isim/unvan/şirket) + **filtre** (uzmanlık/dil/müsaitlik) var.
→ MentiMentor için: sayfalama **öncelik**; arama/filtre **ikinci adım** (sektör/DISC'e göre filtre çok değerli olur).

---

## 4. ÖNERİLEN MENTİMENTOR KART İÇERİĞİ (karar girdisi)

**Kartta (tarama görünümü) — minimal tut:**
1. Fotoğraf (yoksa baş harf avatarı)
2. İsim
3. Rol/unvan (ör. "Mentör — Yazılım" / "Öğrenci")
4. **DISC rozeti** (D/I/S/C — renkli, bizim farkımız)
5. Sektör etiketleri (2-3 chip, fazlası "+2")
6. Aksiyon butonu ("Talep Gönder" / "Mesaj")

**Detay sayfasında (tıklayınca) — geri kalan her şey:**
- Uzun bio, tam sektör listesi, deneyim, geçmiş, müsaitlik, (ileride) rating.

**Layout:** Masaüstü 3 kolon → tablet 2 → mobil 1. Sayfa başına ~15-18 kart + sayfa numaraları.

---

## 5. AÇIK KARARLAR (yeni oturumda ürün sahibine sorulacak)
- Kartta DISC nasıl gösterilsin — sadece harf rozeti mi (D/I/S/C), renk kodlu mu, kelime mi ("Baskın")?
- Sektör etiketi kaç tane gösterilsin (2 mi 3 mü), fazlası "+N" mı?
- Sayfa başına tam kaç kart (15 / 18 / 20)?
- Arama + filtre bu turda mı, sonraki turda mı? (Öneri: önce kart+sayfalama, sonra filtre.)
- Menti kartı da mentör kartıyla aynı mı, farklı mı? (Menti kartında "Alan Seçimi/hedef" ön planda olabilir — Mentornity'de öyle.)

---

## 6. 🟢 ZAHİD'İN KESİNLEŞEN KARARLARI (2026-08-02)

Rakip analizi sonrası ürün sahibi şu kararları verdi — yeni oturumda bunlara göre tasarlanacak:

1. **Rating/yıldız YOK → "Uyum yüzdesi" var.** Kartta "%X uyum" gösterilecek.
   Uyum = **sektör etiketi uyumu + DISC uyum skoru** birleşimi (mevcut eşleştirme
   algoritmasından türetilir).
   ⚠️ BAĞIMLILIK: DISC uyumu çalışıyor ama sektör skoru İŞ 7'ye ertelendi (stub).
   Kartta tam doğru uyum için sektör skorunun bağlanması gerekebilir — kart işine
   başlarken kontrol et.

2. **Deneyim (yıl/şirket) YOK.** Sadece etiket yeterli. Kart sade kalsın.

3. **Müsaitlik kartta YOK → detayda takvim.** Karta tıkla → detay sayfası →
   takvimde mentörün boş müsaitliği → müsait saate tıkla → **niyet mektubu** yaz
   ("neden sizinle görüşmek istiyorum"). Mentör kimin neden geldiğini görür.
   (Rastgele talep yağmuru değil, niyetli/kaliteli talep.)

4. **Çift yönlü havuz.** Mentör de menti havuzunu, menti de mentör havuzunu aynı
   kart mantığıyla gezebilsin. İki taraf birbirini görür.

5. **Mesajlaşma → ŞİMDİLİK YOK.** Sadece niyet mektubu akışı. Serbest/LinkedIn-tarzı
   DM SONRAYA ertelendi. Gerekçe: toksiklik/spam riski + niyet-mektubu modelini
   sulandırmama + büyük modül (kart işine sığmaz). Serbest mesajlaşma ileride,
   eşleşme akışı oturduktan sonra (belki sadece eşleşme-sonrası).

6. **Fotoğraf ZORUNLU.** Sisteme dahil olan herkes (mentör+menti) profil fotoğrafı
   yüklemeli. (Yükleyene kadar baş harf avatarı; ama hedef: herkes foto yüklesin.)

### Bu kararlardan doğan yeni işler (kart tasarımı turunun parçası)
- Kart bileşeni: foto + isim + rol + DISC rozeti + sektör etiketi + **%uyum** + aksiyon.
- Detay sayfası: takvim + müsaitlik + niyet mektubu akışı.
- Fotoğraf zorunluluğu: kayıt/profil akışına foto yükleme (zorunlu alan).
- Çift yönlü havuz görünümü (menti havuzu da kart+sayfalama).
- (İleride) eşleşme-sonrası mesajlaşma.

---
*Kaynaklar: ADPList (adplist.org), MentorCruise, Mentornity örnek ekranları, kart-UI best-practice araştırmaları (LogRocket, Stan.vision, Eleken).*
