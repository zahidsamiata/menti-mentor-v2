> 📁 Kayda geçirildi: 2026-09-03 · tur: docs/icerik-kaydi-2026-09-03

# Kod Kalemleri Envanteri + Belge↔Kod Çelişki Listesi (2026-09-03 içerik belgeleri)

> 🔄 YAŞAYAN · Kaynak: üç 2026-09-03 içerik belgesi (`arketip-…` · `faz6-…` · `menti-…`, hepsi bu klasörde).
>
> **⚠️ BU BİR ÖNERİ LİSTESİDİR — NUMARA VERİLMEMİŞTİR.** Numara verme yetkisi PO'dadır; kalemler
> `00-KARAR-TAKIP.md`'ye işlendiğinde numaralarını ORADA alır (KURAL 8 adım 2). Bu belge o girişin
> kaynağıdır. Durum kodları yalnız 6: ✅ · 🟡 · 🔀 · ⬜ · ❓ · 🗑️.
>
> **Kapsam:** içeriğin KODA (seed/backend/FE) geçmesi için gereken 23 iş kalemi. İçeriğin kendisi
> (kartlar/senaryolar/metinler) ÜRETİLDİ ve bu klasörde kayıtlı; bu liste onların koda bağlanması içindir.

---

## 3A. KOD KALEMLERİ — TEK LİSTE (23 kalem)

Beyan: arketip 6 + faz6 7 + menti 10 = **23**. → Üç belgenin "KOD KALEMLERİ" bölümleri tek tek sayıldı,
**23 DOĞRULANDI.** Hepsi ⬜ AÇIK (hiçbiri koda bağlanmadı — bu tur kod okumadı/yazmadı).

### Arketip belgesinden (`arketip-ve-yaklasim-icerigi-2026-09-03.md` §10) — 6 kalem

| # | Kalem (tek cümle) | Durum | Numara adayı mı |
|---|---|---|---|
| A1 | Arketip hesabı: en yüksek boyut + ikinci; fark < 10 puan ise "şimdilik" dili kullanılsın | ⬜ AÇIK | Evet |
| A2 | İki/üç boyut yakınsa çoklu-arketip metni seçilsin | ⬜ AÇIK | Evet |
| A3 | Kart iki katmanlı: arketip ekranı + "detayları gör" (beş boyut) | ⬜ AÇIK | Evet |
| A4 | Üç sorunun önüne tek cümle: "Son üç soru. Sonra karakter kartın hazır." | ⬜ AÇIK | Evet |
| A5 | Yaklaşım metni (#31) eşleşme kurulduktan sonra iki tarafa gösterilsin | ⬜ AÇIK | Evet |
| A6 | Kart derinleştikçe güncellensin (arketip değişebilir) | ⬜ AÇIK | Evet |

### Faz 6 belgesinden (`faz6-ogrenme-ve-sertifika-2026-09-03.md` §10) — 7 kalem

| # | Kalem (tek cümle) | Durum | Numara adayı mı |
|---|---|---|---|
| F1 | İsim değişkeni altyapısı — metinler `{menti_denge}` biçiminde tutulsun, gösterimde çözülsün, tenant bazında özelleştirilebilir | ⬜ AÇIK | Evet |
| F2 | Hatalı-konu hedefleme — yanlış yapılan konu tekrar denemede mutlaka gelsin, diğer varyantıyla | ⬜ AÇIK | Evet |
| F3 | Kritik konu garantisi — her sınavda 4 kritik konudan birer soru | ⬜ AÇIK | Evet |
| F4 | Deneme sınırı — günde 2, üçüncüsü için bekleme; bekleme süresince öğrenme yolculuğuna yönlendirme | ⬜ AÇIK | Evet |
| F5 | Şık sırası karıştırma — sertifikada ve öğrenmede, her gösterimde (⚠️ bkz. Çelişki #1 — kodda YOK) | ⬜ AÇIK | Evet |
| F6 | Konu bazlı geri bildirim — sınav sonunda zayıf konu + ilgili öğrenme aşamasına yönlendirme | ⬜ AÇIK | Evet |
| F7 | Kriz bildirimi — kendine zarar ifadesi geçtiğinde kurum yöneticisine otomatik bildirim (4B'nin canlı karşılığı) | ⬜ AÇIK | Evet |

### Menti belgesinden (`menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md` §11) — 10 kalem

| # | Kalem (tek cümle) | Durum | Numara adayı mı |
|---|---|---|---|
| M1 | Menti yolculuğu — 5 aşama, mentör yolculuğuyla aynı altyapı | ⬜ AÇIK | Evet |
| M2 | Mentör isim değişkenleri — `{mentor_mimar}` vb., tenant bazında özelleştirilebilir | ⬜ AÇIK | Evet |
| M3 | Geri bildirim gösterimi — yalnız seçilen şık; diğerleri kapalı/açılabilir; renk yok | ⬜ AÇIK | Evet |
| M4 | ⭐ Öğrenme cevapları kişilik profiline İŞLENMESİN (Kalem A) | ⬜ AÇIK | Evet |
| M5 | ⭐ `outcome` alanı teyidi — bugün nereye gidiyor, kodda kontrol (Kalem B) | ⬜ AÇIK | Evet |
| M6 | Eşleşme detay sayfası — 3 bölüm, arketip kombinasyonuna göre metin seçimi | ⬜ AÇIK | Evet |
| M7 | Örtüşme cümlesi üretimi — S1/S2/S3 verisinden şablon; ⚠️ S1 içeriği gösterilmez, yalnız örtüşme | ⬜ AÇIK | Evet |
| M8 | Bekleme zamanlayıcısı — 3. gün hatırlatma, 7. gün otomatik kapanış + alternatif gösterimi | ⬜ AÇIK | Evet |
| M9 | Ret akışı — sebep gizli, alternatif aynı ekranda | ⬜ AÇIK | Evet |
| M10 | Görüşme sıklığı bilgisi — profilde ve bekleme metninde görünsün | ⬜ AÇIK | Evet |

> **Not (kalem-içi bağımlılık, bilgi amaçlı):** F1 ↔ M2 aynı "isim değişkeni altyapısı"nın iki
> yarısıdır (menti-tipi isimleri vs. mentör-tipi isimleri); A5 (#31 gösterimi) ↔ M6 (eşleşme detay
> §Bölüm 2) örtüşür. Birleştirme/numaralandırma PO kararıdır — bu turda BİRLEŞTİRİLMEDİ, 23 kalem ayrı kaldı.

---

## 3B. ⭐ BELGE ↔ KOD ÇELİŞKİ LİSTESİ (3 çelişki — ⬜ AÇIK, ÇÖZÜLMEDİ)

> Strateji katmanında tespit edilip bu turda KODLA doğrulandı. **KURAL 10: belge ↔ kod çelişirse KOD kazanır.**
> Hiçbiri bu turda çözülmedi — yalnız kayıt.

### Çelişki #1 — "Şık sırası her gösterimde rastgele (global kural)" · kodda YOK

- **Belge iddiası:** `faz6-…-2026-09-03.md` §5 (satır 166) şık sırasının "zaten her gösterimde rastgele
  (global kural)" olduğunu **var olan bir kural gibi** anıyor. Aynı belge §10 kod kalemi 5 ise
  "şık sırası karıştırma … eklenecek" diyor — kendi içinde de tutarsız.
- **Kod gerçeği:** `shuffle|Math.random` araması **backend/src + frontend/src'te 0 eşleşme**
  (2 dizin, 2 terim, harf-duyarsız — negatif iddia kapsam beyanı, KURAL 13). Şık sırası SABİT; shuffle yok.
- **Sonuç:** Bu bir KURAL DEĞİL, **YAPILACAK İŞ** (= kod kalemi F5). Şıkların içeriği "en doğru→zararlı"
  sırayla yazıldığı için karıştırma yapılmadan gösterim "doğru cevap kokusu" sızdırır (faz6 §6 / arketip §8
  9-yazım-kuralı ile çelişir).
- **Durum:** ⬜ AÇIK · Numara adayı: Evet (F5 ile aynı iş; öncelik yükseltilmeli).

### Çelişki #2 — Canlı öğrenme yolculuğu (7+6) ↔ yeni tasarım (8+5); geçiş planı yok

- **Belge iddiası:** yeni tasarım mentör **8** öğrenme aşaması (faz6 §7) + menti **5** aşama (menti §3).
- **Kod gerçeği:** `backend/prisma/seed-learning-journey.ts:7` — "13 aşama: Mentör 7 (audience=MENTOR) +
  Menti 6 (audience=MENTI)." `MENTOR_STAGES` order 1-7 (7 aşama) · `MENTI_STAGES` order 1-6 (6 aşama).
  Yani canlı seed **7+6=13**, yeni tasarım **8+5=13** — toplam aynı ama dağılım ve içerik farklı.
- **Sonuç:** İçerik koda geçerken mevcut 13 aşamalık seed'in **nasıl migrate edileceği** hiçbir belgede yok
  (mentöre +1 aşama, mentiden −1 aşama; içerik de değişiyor). Geçiş planı gerekiyor.
- **Durum:** ⬜ AÇIK · Numara adayı: Evet.

### Çelişki #3 — Eski "isimler unisex, karşı taraf isimsiz" kararı iptal edildi; eski kayıt damgalanmalı

- **Yeni karar:** faz6 §4 (satır 126-134) "unisex ısrarından vazgeçildi" — gerekçe yazılı: temsil sorununu
  çözen şey unisex isim değil **persona çeşitliliği** (§3); ayrıca tam-unisex + Türk-İslam kesişimi dar.
  Yeni ilke: kültüre uygun, cinsiyet dağılımı dengeli isimler (sertifika 3E/3K, öğrenme 2E/2K).
- **Eski kayıt (yerini bul):** `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:410` —
  "**İSİMLER:** unisex (Deniz gibi). Anlatılan kişi hep aynı ad, karşı taraf …".
- **Yapılacak (bu turda YAPILMADI — belge turu, çözme yasak):** eski satır SİLİNMEZ; üstü çizilip `[ESKİ]`
  damgası + yeni belgeye (`faz6-…-2026-09-03.md §4`) yönlendirme düşülmeli (Belge Düzeltme Deseni, G9-03).
- **Durum:** ⬜ AÇIK · Numara adayı: Evet (belge-hijyen aksiyonu).

---

## 3C. DÜRÜSTLÜK SINIRLARI (üç belgeden birleşik — KIRPILMADI)

> Bu sınırlar üç belgenin "DÜRÜSTLÜK SINIRLARI" bölümlerinden aynen toplandı. Koda/pazarlamaya
> geçerken bunlar korunmalı — özellikle "bilimsel olarak doğrulanmış test" ifadesi KULLANILMAZ.

**Arketip belgesi (§12):**
- **Eşik (10 puan) muhakemedir, AMPİRİK DEĞİL.** Katı psikometrik ölçütle 15-20 çıkardı ve o zaman çoğu kişi "şimdilik" alırdı; eşik istatistiksel değil *anlatım eşiği* olarak kullanılıyor.
- **Kartlar hiç gerçek insana test edilmedi** — iki kişi yazdı, iki kişi eleştirdi.
- **"Bilimsel olarak doğrulanmış test" DENMEZ.** Denebilecek: "Big Five modeline dayanır, kendi verimizle kalibre edilecektir."
- Arketip adları ve metaforlar tamamen özgün — telif riski yok.

**Faz 6 belgesi (§12):**
- **İçerik hiç gerçek mentöre test edilmedi** — iki kişi yazdı, iki kişi eleştirdi.
- **"Doğru cevap" işaretlemeleri mesleki muhakemedir** — mentörlük literatürüne dayanıyor ama her senaryo için ayrı kaynak gösterilmedi.
- **⚠️ Kriz senaryoları (4A, 4B) HUKUKİ gözden geçirme istiyor** — bildirim yükümlülüğü ve gizlilik sınırı KVKK + mesleki etik açısından avukat teyidine tabi olmalı.
- **Sertifika geçme eşiği kalibre edilmedi** — kaç kişi ilk denemede geçiyor bilinmiyor.

**Menti belgesi (§13):**
- **Hiçbir metin gerçek kullanıcıya test edilmedi.**
- **5 aşama sayısı muhakemedir** — 4 de olabilirdi, 6 da; tamamlama oranıyla sınanacak.
- **Ret metninin işe yarayıp yaramadığı ölçülmeli** — ret alan kişi havuza dönüyor mu yoksa terk mi ediyor.
- **Görüşme sıklığı davranışı PO beyanıdır, kodda teyit EDİLMEDİ.**

---

## KALEM LİSTESİ (KURAL 9)

| Kalem | Önerilen durum | Numara adayı mı |
|---|---|---|
| 23 kod kalemi (A1-A6 · F1-F7 · M1-M10) | ⬜ AÇIK | Evet (23 ayrı; F1↔M2, A5↔M6 birleştirme PO kararı) |
| Çelişki #1 — şık sırası kodda yok (= F5 önceliği) | ⬜ AÇIK | Evet |
| Çelişki #2 — öğrenme yolculuğu 7+6→8+5 geçiş planı | ⬜ AÇIK | Evet |
| Çelişki #3 — eski unisex kararına [ESKİ] damgası | ⬜ AÇIK | Evet |
| 4 kardeş belge eksik (senaryo-bankasi/olcme-mimarisi/senaryo-denetim/olcme-arastirmasi 2026-09-03) | ⬜ AÇIK | Hayır (belge kaydı, kod değil) |
| Dürüstlük sınırları (12 madde) — pazarlama/koda geçerken korunacak | ⬜ AÇIK | Hayır (uyarı, kalem değil) |

> **Sayılan birim (KURAL 16):** "23 kalem" = üç belgenin **§KOD KALEMLERİ bölümlerindeki madde satırları**
> (arketip §10: 6 · faz6 §10: 7 · menti §11: 10). Belge gövdesindeki başka açık kalemler (§AÇIK KALEMLER
> tabloları) bu sayıya DAHİL DEĞİL — onlar ayrı ⬜ kalemlerdir ve numaralandırmada ayrı değerlendirilir.
