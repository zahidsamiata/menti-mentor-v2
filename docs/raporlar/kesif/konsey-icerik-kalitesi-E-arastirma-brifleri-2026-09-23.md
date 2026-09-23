# KONSEY 5 · İÇERİK KALİTESİ — BÖLÜM E: HAZIR ARAŞTIRMA BRİFLERİ

> **Tarih:** 2026-09-23 · **Mod:** 🟩 PLANLA niteliğinde (ürün kodu değişmedi; yalnız bu rapor yazıldı)
> **Tür:** 📸 keşif çıktısı · **Kapsam:** bu turun promptunun yalnız **E bölümü** ("E BÖLÜMÜ GÜNCELLEMESİ — ARAŞTIRMA BRİFLERİ")
> ⚠️ **KAPSAM UYARISI:** "5-KONSEY-İÇERİK-KALİTESİ" promptunun **A–D, F, G bölümleri bu oturuma ulaşmadı**
> (oturumda yalnız E'yi değiştiren blok var; repoda da prompt metni yok — `grep -ri "konsey-icerik-kalitesi"` → 0).
> Bu nedenle bu rapor **yalnız E'yi** teslim eder; A–D/F/G bulguları **yoktur**, uydurulmadı.
> Kod gerçeği backend `main` (`b0b3dcb`) ve çatı `main` (`a0f7b65`) üzerinden okundu. Kod yolları `backend/…` önekiyle verilir.

---

## 0. ⭐ ÖNCE OKU — üç cümle

1. **En acil brif B-1 (DISC→Big Five köprüsü):** KARAR-10 **C (aşamalı)** cevaplandı, PS-A1→A3 bu köprüyü eşleştirmeye bağlayacak — ama köprünün girdisi 8 soruluk **zorunlu seçim** DISC'i (toplamı 1'e sabit, 3 serbestlik derecesi) ve çıktısı 5 boyut. Yani ölçek hatası düzeltilse bile **5 boyutun en az ikisi diğerlerinin doğrusal türevi** olacak (matematik, araştırma değil). Araştırmanın cevaplayacağı soru bunun **ne kadar zarar** verdiği.
2. **Aday listesindeki "kararsızlık bandı (40-60)" KODDA YOK** (`backend/src` içinde bant/eşik → 0 isabet; yalnız belgede: `03-psikometri-ve-algoritma.md:36`). SJT motorunun da **frontend çağıranı yok** (`frontend/src` içinde `/scoring` → 0). Yani B-5, B-8 bir **tasarım** sorusudur; canlı davranışı düzeltme değil.
3. Aday listesine **bir brif eklendi, iki aday birleştirildi:** eklenen = **B-2 "kişilik uyumu mentörlük sonucunu yordar mı"** (eşleşme skorunun %40'ı bu varsayıma dayanıyor, hiçbir belgede dayanağı yok). Birleştirilen = "sosyal arzu edilebilirlik" + belgedeki çözülmemiş **"ipsatif uyarısı"** → **B-3** (aynı formatın iki yüzü).

---

## 1. İNDEKS — 8 brif, etki sırasıyla

| # | Başlık | Beklettiği iş/karar | Karar kriteri dolu mu |
|:--:|---|---|:--:|
| B-1 | DISC'ten Big Five türetmenin güvenilirliği | KARAR-10 (C) · PS-A1/A2/A3 · I-13 · Göç Planı (`degerlendirme-sistemi-tasarim:672-681`) | ✅ |
| B-2 | Kişilik uyumu mentörlük çıktısını yordar mı | PS-A3 · KARAR-44 · `COMPATIBILITY_MATRIX` · ağırlık %12/%25/%40 çelişkisi | ✅ |
| B-3 | Zorunlu seçim: sahtelemeye direnç vs kişiler-arası karşılaştırma | senaryo bankası formatı · `degerlendirme-sistemi-tasarim:146-151` açık kalemi | ✅ |
| B-4 | Sertifika: 0-3 puanın ikili geçme kararına indirgenmesi | KARAR-46 · P-99 · K-16 · canlı eleme | ✅ |
| B-5 | SJT şık ağırlıklarının toplanması ve ölçeklenmesi | PS-A1 (test) · `sjt-scorer.ts` · seed ağırlıkları | ✅ |
| B-6 | Psikometrik sonuç dilinin damgalama/Barnum etkisi | KARAR-48 · I-15 (madde 139) · paylaş düğmesi | ✅ |
| B-7 | Profil eşikleri: arketip atama ve "şimdilik" 10 puanı | I-15 · KARAR-45 · `ARCHETYPE_THRESHOLDS` | ✅ |
| B-8 | Kısa form (15 senaryo) + statik kararsızlık bandı | I-12 · senaryo bankası akışı · CAT/IRT reddi | ✅ |

---

## 2. BRİFLER

### B-1 · DISC'ten Big Five türetmenin güvenilirliği

**1. BAŞLIK:** Zorunlu seçimli DISC'ten Big Five boyutu türetme güvenilirliği

**2. NET SORU:** Toplamı sabit (ipsatif) 4 boyutlu bir DISC profilinden sabit doğrusal ağırlıklarla türetilen 5 Big Five puanı, doğrudan Big Five ölçümüyle hangi boyutlarda ne büyüklükte ilişki gösterir ve hangi boyutlar (özellikle Açıklık ve Duygusal Denge) pratikte türetilemez?

**3. NEDEN ÖNEMLİ**
- Bekleyen: **KARAR-10 = C (aşamalı)** → PS-A1 (ölçek düzelt) · PS-A2 (backfill) · PS-A3 (eşleştirmeye bağla). Ayrıca `degerlendirme-sistemi-tasarim-2026-08-27.md:672-681` **Göç Planı** "AÇIK — karar verilmedi" (a) sıfırdan test / (b) DISC'ten türet / (c) karma.
- ⭐ **Yanlış cevabın bedeli:** köprü güvenilmezse PS-A1 ölçek hatasını düzeltir, motor "çalışır görünür" ve eşleştirme skorunun %40'ı **ölçülmemiş bir kişiliğe** göre verilir — hata vermez, log düşmez, kimse fark etmez.

**4. ŞU AN NE VAR**
- Kod: `backend/src/services/scoring.config.ts:23-29` `DISC_TO_OCEAN_WEIGHTS` (5×4 sabit matris) · `disc-to-ocean.adapter.ts:12-25` `clamp(50 + 50·Σw·disc/100)` · girdi `discVectorService.ts:117,131-137` 0–1, **toplam = 1** (psikometri konseyi §3 B.1).
- Canlı girdi: `onboardingController.ts:109` → **8 soruluk, 4 şıklı, tek seçimli** DISC (her şık bir harf).
- Belge: `03-psikometri-ve-algoritma.md:11` "O ve N (DISC'te zayıf) SJT ile override edilir"; `degerlendirme-sistemi-tasarim:678` köprü için **"doğruluk düşük"** diyor.
- **Karar nasıl verilmiş:** ağırlık matrisinin **kaynağı yazılı değil** (belge/commit/yorum → 0; `scoring.config.ts:2` yalnız "pilot veri biriktikçe güncelleyin" diyor). "Seçilmiş".

**5. TAM OLARAK NE BİLİNMİYOR**
- ✅ Bilinen (matematik): ipsatif 4'lü vektörün 3 serbestlik derecesi var → doğrusal eşleme 5 çıktının **en fazla 3'ünü** bağımsız üretebilir. Bu araştırma gerektirmez.
- ✅ Bilinen: bugün köprü ölçek hatası yüzünden `[49,75–50,30]` bandında (I-13).
- ❓ **Varsayılıyor, dayanağı yok:** DISC boyutları ile Big Five boyutları arasındaki ilişkinin **yönü ve büyüklüğü** matristeki sayılara yakın. (Örn. `n.s = −0,4`: "S yüksekse kaygı düşük".)
- ❓ **Varsayılıyor, dayanağı yok:** SJT override O ve N'deki boşluğu kapatır — ama SJT'nin frontend çağıranı yok (`frontend/src` → 0), yani bugün override **hiç gelmiyor**.
- ❓ Bilinmiyor: 8 maddelik tek seçimli bir DISC'in kendi güvenilirliği; köprünün taşıyabileceği bilgi bununla sınırlı.

**6. CEVABIN BİÇİMİ:** **Boyut bazında tablo** — satır: O/C/E/A/N · sütunlar: (a) literatürde DISC↔Big Five ilişkisinin yönü, (b) raporlanan ilişki büyüklüğü aralığı, (c) kanıt gücü, (d) "türetilebilir / zayıf / türetilemez" hükmü, (e) bizim matristeki işaretle **uyumlu mu**. Artı tek paragraf: ipsatif girdiden normatif çıktı türetmenin genel sınırı.

**7. ⭐⭐ KARAR KRİTERİ**
- **Cevap A (≥3 boyutta orta+ ilişki, işaretler matrisle uyumlu)** → PS-A1 aynen yürür; türetilemez çıkan boyutlar için köprü o boyutta **nötr 50 döner + "ölçülmedi" bayrağı**, arketip kuralları o boyutu kullanmaz.
- **Cevap B (≤2 boyutta anlamlı ilişki ya da işaretler ters)** → PS-A3 (eşleştirmeye bağlama) **durur**; Göç Planı (a) veya (c) seçilir — KARAR-10'a "köprü yetersiz" maliyet eki yazılır, PO'ya yeni kart açılır.
- **Net çıkmazsa** → varsayılan: PS-A1 **yalnız ölçeği** düzeltir; PS-A3 feature flag **kapalı** kalır ve karşılaştırma raporu (PS-A3 kendi şartı) PO'ya sunulmadan açılmaz.

**8. ARAŞTIRMA PROMPTU**
```
Bağlam: Çok kiracılı bir mentörlük eşleştirme ürünü. Kullanıcılar 8 maddelik, 4 şıklı,
tek seçimli (zorunlu seçim) bir DISC anketi dolduruyor; sonuç toplamı 1'e sabit 4 boyutlu
bir vektör. Ürün bu vektörden sabit doğrusal ağırlıklarla 5 Big Five puanı (0-100) türetip
eşleştirmede kullanmayı planlıyor.

Soru: İpsatif 4 boyutlu bir DISC profilinden doğrusal ağırlıklarla türetilen Big Five
puanları, doğrudan Big Five ölçümüyle hangi boyutlarda ne büyüklükte ilişki gösterir;
hangi boyutlar pratikte türetilemez?

İstenen çıktı: Boyut bazında tablo (O, C, E, A, N) — yön, raporlanan ilişki büyüklüğü
aralığı, kanıt gücü, hüküm (türetilebilir/zayıf/türetilemez). Ayrıca ipsatif girdiden
normatif puan türetmenin genel sınırları üzerine tek paragraf.

KAPSAM DIŞI: MBTI/Enneagram karşılaştırmaları; DISC'in ticari geçerlilik iddiaları;
Big Five'ın kendi geçerliliği (kabul edilmiş sayılır); işe alım seçimi hukuku.

Kaynak: hakemli çalışmalar ve derlemeler öncelikli. DISC sağlayıcılarının teknik
el kitapları ayrı etiketle "sağlayıcı metni" olarak işaretlenir, kanıt sayılmaz.

[9-EK bloğu buraya aynen eklenir — bkz. §3]
Emin olunmayan yerde "kanıt yetersiz" yaz, doldurma.
```

**9. KAYNAK BEKLENTİSİ:** hakemli/akademik (DISC–Big Five ilişki çalışmaları, ipsatif veri analizi) · sektör uygulaması (ikincil) · ⚠️ **DISC literatürü büyük ölçüde sağlayıcı kaynaklı** — pazarlama/teknik el kitabı kanıt sayılmaz · ⚠️ Türkçe DISC uyarlaması ve Türkçe Big Five normları ayrı işaretlenmeli.

---

### B-2 · Kişilik uyumu mentörlük çıktısını yordar mı

**1. BAŞLIK:** Mentör–menti kişilik uyumunun ilişki sonucuna etkisi

**2. NET SORU:** Mentörlük ilişkilerinde mentör ve mentinin kişilik özellikleri arasındaki benzerlik ya da tamamlayıcılık, ilişki memnuniyetini ve sürdürülmesini, sektör/hedef uyumuna kıyasla ne büyüklükte yordar?

**3. NEDEN ÖNEMLİ**
- Bekleyen: **PS-A3** (OCEAN'ı eşleştirmeye bağla) · **KARAR-44** (algoritma kendi sonucundan öğrensin mi) · canlı DISC matrisi.
- ⭐ **Yanlış cevabın bedeli:** kişilik uyumu çıktıyı yordamıyorsa, eşleşme skorunun %40'ı kullanıcıya "%87 uyum" diye gösterilen **gürültüdür** ve menti listesinin sırasını gerekçesiz değiştirir.

**4. ŞU AN NE VAR**
- Kod (canlı): `backend/src/services/scoring.ts:43-49` `DISC_COMPATIBILITY` 4×4 matris (ör. D→S **30**, D→C **85**) · ağırlık `scoring.service.ts:45` ve `scoring.config.ts:48` **SEKTÖR 0,60 / KARAKTER 0,40**.
- Kod (uyuyan): `scoring.config.ts:38-44` `COMPATIBILITY_MATRIX` (M1_m2=100, M3_m3=30…) · `BLOCKED_PAIRS` `:33-36`.
- Belge: `senaryo-bankasi-2026-09-03.md:48` kişilik ağırlığı **%12 → %25** · `arketip-ve-yaklasim-icerigi:60` kişilik **%25** · `03-psikometri-ve-algoritma` "anti-match: D mentör + S menti bloklu (toksik dinamik riski)".
- **Karar nasıl verilmiş:** matris değerleri ve "toksik çift" için **gerekçe/kaynak yazılı değil**; üç belge üç farklı ağırlık söylüyor (%12 · %25 · %40) → **seçilmiş, çelişkili**.

**5. TAM OLARAK NE BİLİNMİYOR**
- ✅ Bilinen: kod %40 uyguluyor; belge %12–25 istiyor — bu bir **çelişki**, araştırma değil PO/teknik kararı.
- ❓ Varsayılıyor, dayanağı yok: **tamamlayıcılık** (farklı tipler iyi eşleşir) doğru model; benzerlik değil.
- ❓ Varsayılıyor, dayanağı yok: belirli çiftler (D→S) **zarar verir** — "toksik" iddiası.
- ❓ Bilinmiyor: kişilik uyumunun etkisi, sektör/hedef uyumunun **üzerine** ne ekliyor (artımsal geçerlilik).

**6. CEVABIN BİÇİMİ:** **"Şu koşulda şu" kural seti** + kısa tablo: (a) benzerlik mi tamamlayıcılık mı — hangi boyut için hangisi, (b) etki büyüklüğü aralığı, (c) derin-düzey (kişilik/değer) ile yüzey-düzey (demografi/sektör) benzerliğin göreli ağırlığı, (d) "zarar veren eşleşme" iddiasına kanıt var/yok.

**7. ⭐⭐ KARAR KRİTERİ**
- **Cevap A (kişilik uyumu küçük ama tutarlı etki; benzerlik yönlü)** → ağırlık belgedeki **%12–25** bandına çekilir (kod 0,40 → düşürülür, ayrı 🟡 iş); matris **tamamlayıcılıktan benzerliğe** yeniden kurulması KARAR kartı olur.
- **Cevap B (anlamlı etki yok / kanıt tutarsız)** → kişilik uyumu **sıralamaya girmez**, yalnız "tanışma önerisi/yaklaşım metni" (I-01) için kullanılır; `BLOCKED_PAIRS` vetosu kaldırma değil **karantina** adayı (SİLME PROTOKOLÜ).
- **Net çıkmazsa** → varsayılan: belge ile kod çelişkisi en düşük değerde (%12) çözülür; kişilik skoru kullanıcıya **yüzde olarak gösterilmez** (KARAR-48 A ile uyumlu); KARAR-44 verisi birikince yeniden bakılır.

**8. ARAŞTIRMA PROMPTU**
```
Bağlam: Çok kiracılı bir mentörlük eşleştirme ürünü. Eşleşme skoru bugün %60 sektör/hedef
uyumu + %40 kişilik uyumu. Kişilik uyumu, "farklı tipler birbirini tamamlar" varsayımıyla
kurulmuş bir tabloyla hesaplanıyor; bazı tip çiftleri "zararlı" diye engelleniyor.

Soru: Mentörlük ilişkilerinde mentör–menti kişilik benzerliği ya da tamamlayıcılığı,
ilişki memnuniyeti ve sürdürülmesini, sektör/hedef uyumuna kıyasla ne büyüklükte yordar?

İstenen çıktı: Kural seti ("şu boyutta benzerlik / şu boyutta tamamlayıcılık / şu durumda
etkisiz") + etki büyüklüğü aralıkları + "zararlı eşleşme" iddiasına kanıt tablosu.

KAPSAM DIŞI: romantik ilişki/evlilik uyumu literatürü (yalnız karşılaştırma notu olarak);
ekip bileşimi; flört uygulamaları; ticari eşleştirme platformlarının vaka iddiaları.

Kaynak: mentörlük araştırması (iş yeri, eğitim, gençlik mentörlüğü ayrı işaretlenir),
meta-analizler öncelikli. Platform pazarlama metinleri kanıt sayılmaz.

[9-EK bloğu buraya aynen eklenir — bkz. §3]
Emin olunmayan yerde "kanıt yetersiz" yaz, doldurma.
```

**9. KAYNAK BEKLENTİSİ:** hakemli/akademik (mentörlük ilişki kalitesi, derin-düzey benzerlik) · sektör uygulaması (kurumsal mentörlük programları) · ⚠️ çalışmaların çoğu ABD iş yeri/üniversite örneklemi — **gönüllü STK mentörlüğüne ve Türkçe konuşan kitleye genellenmesi GARANTİ DEĞİL** · ⚠️ eşleştirme yazılımı satıcılarının "başarı oranı" metinleri kaynak sayılmaz.

---

### B-3 · Zorunlu seçim: sahtelemeye direnç vs kişiler-arası karşılaştırma

**1. BAŞLIK:** "En çok/en az" formatının sahtelemeye direnci ve ipsatiflik bedeli

**2. NET SORU:** Üç şıklı "en çok ben / en az ben" formatındaki kısa bir senaryo ölçeği, tek seçimli ya da derecelendirmeli formata göre sosyal arzu edilebilirlik kaynaklı sahtelemeyi ne kadar azaltır ve bunun karşılığında kişiler-arası karşılaştırma (eşleştirmenin tam yaptığı iş) ne kadar bozulur?

**3. NEDEN ÖNEMLİ**
- Bekleyen: senaryo bankası formatı (39 senaryo · 117 şık, koda geçmedi) · `degerlendirme-sistemi-tasarim-2026-08-27.md:146-151` **"İPSATİF UYARISI — ÇÖZÜLMEDİ"** + **"karma format tasarlanacak — AÇIK"**.
- ⭐ **Yanlış cevabın bedeli:** format kişi-içi sıralamayı ölçüp kişiler-arası seviyeyi kaybediyorsa, iki farklı insan aynı profili alır ve eşleştirme **profilleri değil yazım desenini** eşler.

**4. ŞU AN NE VAR**
- Belge: `senaryo-bankasi-2026-09-03.md` "Format kararı (kesin)": ölçek yok · 3 şık · "en çok/en az" · şık sırası karıştırılır. `03-psikometri-ve-algoritma.md:30-34` Likert "faking'e açık" diye reddedildi.
- Kod: `sjt-scorer.ts:66-73` MOST_LEAST (+1,0 / −0,5) mekanizması var; seed'de **4 şık** var (`prisma/seed.ts:560-567`), bankada 3 → uyumsuz. Canlı DISC de ipsatif (tek seçim, 4 harf).
- **Karar nasıl verilmiş:** sahteleme direnci gerekçeli yazılı; **ipsatiflik bedeli belgenin kendisinde "çözülmedi"** diye açık bırakılmış.

**5. TAM OLARAK NE BİLİNMİYOR**
- ✅ Bilinen (belgede): zorunlu seçim kişiler-arası karşılaştırmayı zorlaştırır; Thurstonian IRT çözümü "bizim ölçeğimiz için ağır" bulunmuş.
- ❓ Varsayılıyor, dayanağı yok: **−0,5 "en az" katsayısı** sinyali güçlendirir (belge böyle diyor; ölçüm gerekçesi yok).
- ❓ Bilinmiyor: tek soru başına 3 şık + 5 boyut + çok boyutlu şıklar (yan sinyal) durumunda ipsatifliğin **pratik** büyüklüğü — "kısmi ipsatif" mi, tam mı.
- ❓ Bilinmiyor: Thurstonian IRT'nin **hafif** bir uygulaması (ya da puanlama sonrası düzeltme) mümkün mü, yoksa karma format tek yol mu.

**6. CEVABIN BİÇİMİ:** **Seçenek karşılaştırma tablosu** — seçenekler: (i) saf en çok/en az, (ii) tek seçim, (iii) karma (bazı senaryolar normatif), (iv) zorunlu seçim + model tabanlı puanlama. Ölçütler: sahteleme direnci · kişiler-arası karşılaştırılabilirlik · madde başına bilgi · kullanıcı süresi · uygulama maliyeti (bizim ölçekte) · kanıt gücü.

**7. ⭐⭐ KARAR KRİTERİ**
- **Cevap A (kısmi ipsatif formatta kişiler-arası karşılaştırma kabul edilebilir düzeyde)** → senaryo bankası formatı aynen koda geçer; seed 4 şık → 3 şık düzeltilir.
- **Cevap B (belirgin bozulma; karma format önerilir)** → "karma format" açık kalemi kapatılır: normatif senaryo oranı araştırmanın önerdiği değerle yazılır, bankada hangi senaryoların normatife döneceği **yazım turu** olur (kuyruğa satır).
- **Net çıkmazsa** → varsayılan: format kalır, ama eşleştirmede OCEAN **mutlak seviye** yerine yalnız **baskın boyut** (kişi-içi sıralama) kullanılır — ipsatif verinin güvenle taşıyabildiği tek bilgi.

**8. ARAŞTIRMA PROMPTU**
```
Bağlam: Çok kiracılı bir mentörlük eşleştirme ürünü, Big Five temelli karakter ölçümü,
senaryo bazlı sorular. Her senaryoda 3 şık var; kullanıcı "en çok beni yansıtan" ve
"en az beni yansıtan" şıkkı seçer. Şıklar bir veya birden çok boyuta ağırlık taşır.
Sonuçlar farklı kişileri birbiriyle eşleştirmek için kullanılacak.

Soru: Bu format, tek seçimli ya da derecelendirmeli formata göre sosyal arzu edilebilirlik
kaynaklı sahtelemeyi ne kadar azaltır ve kişiler-arası karşılaştırılabilirliği ne kadar bozar?

İstenen çıktı: Karşılaştırma tablosu — seçenekler: saf en çok/en az; tek seçim; karma;
zorunlu seçim + model tabanlı puanlama. Ölçütler: sahteleme direnci, kişiler-arası
karşılaştırılabilirlik, madde başına bilgi, yanıt süresi, küçük ekip için uygulama maliyeti.

KAPSAM DIŞI: işe alım seçim hukuku; klinik ölçekler; tamamen Likert tabanlı ölçek tasarımı
(yalnız karşılaştırma ölçütü olarak).

Kaynak: hakemli çalışmalar, meta-analizler; ölçek tasarım kitapları ikincil.
Test sağlayıcılarının "sahte cevaba dayanıklı" pazarlama iddiaları kanıt sayılmaz.

[9-EK bloğu buraya aynen eklenir — bkz. §3]
Emin olunmayan yerde "kanıt yetersiz" yaz, doldurma.
```

**9. KAYNAK BEKLENTİSİ:** hakemli/akademik (zorunlu seçim, ipsatif veri, Thurstonian modeller) · araç dokümantasyonu (model tabanlı puanlama paketlerinin gereksinimleri) · ⚠️ sahteleme çalışmalarının çoğu **yüksek riskli işe alım** bağlamında — düşük riskli gönüllü mentörlükte sahteleme motivasyonu farklı olabilir; bunu not düşmeli · ⚠️ Türkçe örneklem nadir.

---

### B-4 · Sertifika: 0-3 puanın ikili geçme kararına indirgenmesi

**1. BAŞLIK:** Konu başına tek maddeyle sertifika geçme kararının güvenilirliği

**2. NET SORU:** Her konunun mentörün ilk seçtiği tek bir şıkla (0-3 puan, ≥2 geçer) değerlendirildiği ve aktif konuların %80'inin geçilmesinin istendiği bir sertifika sınavında, geçti/kaldı kararının tutarlılığı (aynı kişiye tekrar uygulansa aynı karar çıkma olasılığı) ne düzeydedir ve kısmi puanı atmak yerine korumak bu tutarlılığı ne kadar değiştirir?

**3. NEDEN ÖNEMLİ**
- Bekleyen: **KARAR-46** (hangi sertifika sürümü canlıya) · **P-99** (88 şıkkın seed'e taşınması) · **K-16** (seed) · canlıda mentör eleme.
- ⭐ **Yanlış cevabın bedeli:** karar tutarsızsa, yetkin bir gönüllü mentör **şansa bağlı olarak elenir** (ve 24 saat bekletilir); zayıf biri geçer — üstelik STK yöneticisi bunu "3 gündür geride" bildirimiyle mentörün kusuru sanar.

**4. ŞU AN NE VAR**
- Kod: `backend/src/services/certification.service.ts:24-39` `CERT_CONFIG` (eşik 0,8 · min 5 konu · 2 deneme · 24 s) · `:50-52` `ceil(konu × 0,8)` · `:72-74` `isFirstAttemptPass = competencyScore >= 2` (red-line dahil) · `:197-214` konu başına **ilk seçim**.
- ⚠️ **Kod içi çelişki (yan bulgu):** dosya başı yorumu `:10` *"Red-line konu: ilk seçim SADECE 3 → geçer"* diyor; kod `:65-73` 2026-09-04 PO kararıyla **≥2**. Yorum bayat (belge düzeltme adayı, 🟢).
- Belge: `:69-70` "88 şık bu eşiğe göre yazıldı (1↔2 çizgisi = prensip uygulandı mı)".
- **Karar nasıl verilmiş:** %80 ve ≥2 **PO kararıdır, gerekçesi ürün mantığı** (öğret, eleme); ölçme güvenilirliği hesabı **yazılı değil**.

**5. TAM OLARAK NE BİLİNMİYOR**
- ✅ Bilinen: 4 puanlık şık bilgisi ikili karara indiriliyor (3 ile 2 aynı, 1 ile 0 aynı) — bilgi kaybı kesin.
- ✅ Bilinen: 5 konulu kurumda 4/5 gerekiyor → **tek bir madde** kararı çeviriyor.
- ❓ Varsayılıyor, dayanağı yok: tek senaryodaki ilk seçim, o konudaki **yetkinliği** temsil eder.
- ❓ Bilinmiyor: konu sayısı 5–10 arasında değişirken karar tutarlılığının nasıl değiştiği; toplam puan (0-3 toplamı) + red-line kapısı modelinin daha tutarlı olup olmayacağı.

**6. CEVABIN BİÇİMİ:** **Yöntem seçimi + uygulama koşulları**: (a) kısa sınavlarda sınıflama tutarlılığı nasıl tahmin edilir (tek uygulamadan), (b) kısmi puan korunursa ne kazanılır, (c) "konu başına tek madde" ile "konu başına 2 madde" arasında tutarlılık farkı için kaba kural, (d) kesme puanı belirleme yöntemleri (uzman-yargısı tabanlı) ve hangisinin bizim ölçeğe uygun olduğu.

**7. ⭐⭐ KARAR KRİTERİ**
- **Cevap A (5-10 tek madde ile tutarlılık kabul edilemez düşük)** → eleme **yumuşatılır**: kalma sonucu "sertifika bekliyor + öğrenme önerisi" olur, 24 s bekleme kalkar → KARAR kartı (kullanıcının gördüğü değişir); uzun vadede konu başına 2. madde **yazım turu**.
- **Cevap B (kısmi puanı korumak belirgin kazanç)** → skor modeli "toplam puan + red-line kapısı"na çevrilir (🟡 iş, `certification.service.ts` + test); %80 eşiği toplam-puan karşılığına dönüştürülür.
- **Net çıkmazsa** → varsayılan: bugünkü kural kalır, ama **veri toplanır**: her denemenin şık-bazlı puanı saklanıyor mu kontrol edilir; ilk 50 sınav sonrası madde analizi (uzman paketi) yapılır.

**8. ARAŞTIRMA PROMPTU**
```
Bağlam: Gönüllü mentörler için senaryo bazlı bir yetkinlik sertifikası. 5-10 konu var;
her konu tek bir senaryoyla ölçülüyor. Her şık 0-3 puanlı (3 en doğru, 0 zararlı).
Mentörün bir konudaki İLK seçimi 2 veya 3 ise konu geçilmiş sayılıyor. Sertifika için
konuların en az %80'i geçilmeli; bazı kritik konular ayrıca zorunlu.

Soru: Bu tasarımda geçti/kaldı kararının tutarlılığı ne düzeydedir ve kısmi puanı
korumak (0-3 toplamı) tutarlılığı ne kadar değiştirir?

İstenen çıktı: Yöntem seçimi + uygulama koşulları: tek uygulamadan sınıflama tutarlılığı
tahmin yöntemleri; kısmi puanlamanın getirisi; madde sayısı–tutarlılık kaba kuralı;
kısa sınavlar için uygun kesme puanı belirleme yöntemi.

KAPSAM DIŞI: büyük ölçekli ulusal sınavlar için bilgisayarlı uyarlamalı testler;
yasal lisans sınavı mevzuatı; soru bankası yazım teknikleri.

Kaynak: ölçme ve değerlendirme alanı hakemli yayınları, standart kitaplar, kesme puanı
yöntem derlemeleri. Sertifika sağlayıcılarının tanıtım metinleri kanıt sayılmaz.

[9-EK bloğu buraya aynen eklenir — bkz. §3]
Emin olunmayan yerde "kanıt yetersiz" yaz, doldurma.
```

**9. KAYNAK BEKLENTİSİ:** hakemli/akademik (sınıflama tutarlılığı, kısmi puanlama, kesme puanı) · standart ölçme kitapları · ⚠️ yerel bağlam: Türkiye'de ÖSYM/MEB ölçme literatürü var ama **gönüllü, düşük riskli** sertifikalara genellenmesi tartışmalı — işaretlenmeli.

---

### B-5 · SJT şık ağırlıklarının toplanması ve ölçeklenmesi

**1. BAŞLIK:** Çok boyutlu SJT şık ağırlıklarını puana toplama yöntemi

**2. NET SORU:** Her şıkkın birden çok boyuta işaretli ağırlık taşıdığı (ör. {n:3, a:1}) ve "en az" seçiminin ters katsayıyla sayıldığı bir senaryo testinde, boyut puanını "ağırlıkların ortalaması" ile üretmek, toplam, standartlaştırılmış toplam ya da model tabanlı puanlamaya göre hangi koşullarda yanlı sonuç verir?

**3. NEDEN ÖNEMLİ**
- Bekleyen: **PS-A1** (ölçek düzelt + test yaz — test beklenen değerleri buradan çıkar) · senaryo bankasının koda geçişi · `sjt-scorer.ts`.
- ⭐ **Yanlış cevabın bedeli:** puanlama yanlışsa **tutarlı cevap veren kişi daha orta puan alır** (aşağıdaki hesap) — en net profiller sistematik olarak "şimdilik"e düşer.

**4. ŞU AN NE VAR**
- Kod: `backend/src/services/sjt-scorer.ts:25-38` her sıfır-olmayan ağırlık `hits`'i 1 artırır — **"en az" seçimi dahil** · `:80` `50 + (sum/hits/3)·50` → ağırlık tavanı **3** varsayılıyor · `:70-73` en az = −0,5.
- ⭐ **Elle hesap (yan bulgu):** en çok = {n:+3}, en az = {n:−3} (kişi tutarlı): `sum = 3 + (−0,5)(−3) = 4,5`, `hits = 2` → ort. 2,25 → **87,5**. Aynı kişi "en az"ı başka boyuttan seçseydi: `3/1` → **100**. ⇒ **tutarlı ters seçim puanı düşürüyor** ("en az" pay'a yarım, payda'ya tam giriyor).
- Seed: `prisma/seed.ts:560-567` şık ağırlıkları {n:−3}, {n:3,a:1}, {a:−2,e:−1}, {o:2,e:2}. Bankada (`senaryo-bankasi`) ağırlık **sayısal değil**, "yüksek/düşük/yan sinyal" diye sözel.
- **Karar nasıl verilmiş:** +1/−0,5 gerekçesi `03-psikometri-ve-algoritma.md:34` ("sinyali güçlendirir") — **ölçüm dayanağı yok**; ortalama/3 normalizasyonu **belgelenmemiş**.

**5. TAM OLARAK NE BİLİNMİYOR**
- ✅ Bilinen: yukarıdaki payda asimetrisi matematiksel, araştırma gerektirmez — düzeltme adayı.
- ❓ Varsayılıyor, dayanağı yok: şık ağırlıkları uzman yargısıyla (±3) verilebilir ve toplanabilir.
- ❓ Bilinmiyor: "yan sinyal" (ikincil boyut) ağırlıklarının ana sinyale oranı ne olmalı; boyutlar arası farklı sinyal sayısı (bankada boyut başına ~9) nasıl dengelenir.

**6. CEVABIN BİÇİMİ:** **"Şu koşulda şu" kural seti**: (a) veri yokken (pilot öncesi) önerilen puanlama kuralı, (b) "en az" seçiminin nasıl puanlanacağı (ters ağırlık / ayrı sayım / hiç), (c) yan sinyal oranı için kaba kural, (d) kaç yanıttan sonra veri tabanlı (ampirik) anahtara geçilmeli.

**7. ⭐⭐ KARAR KRİTERİ**
- **Cevap A (ters ağırlıklı toplam + sabit payda önerilir)** → PS-A1'e ek madde: `sjt-scorer.ts:80` payda "hits" yerine "o boyuta dokunan senaryo sayısı" olur; elle hesaplı test yazılır (🟡, matching dosyası).
- **Cevap B (uzman ağırlığı yetersiz, ampirik anahtar gerekli)** → ağırlıklar **geçici** etiketlenir; senaryo bankası koda geçerken sözel sinyal → sayısal eşleme tablosu `scoring.config.ts`'e yazılır ve N yanıt sonrası yeniden anahtarlama "veri toplandıktan sonra" listesine gider.
- **Net çıkmazsa** → varsayılan: yalnız matematiksel asimetri düzeltilir (bulgu kesin), diğer her şey aynı kalır.

**8. ARAŞTIRMA PROMPTU**
```
Bağlam: Big Five temelli, senaryo bazlı bir karakter ölçümü. Her senaryoda şıklar bir
veya birden çok boyuta işaretli ağırlık taşıyor (ör. duygusal dengesizlik +3, uyumluluk +1).
Kullanıcı "en çok" ve "en az" beni yansıtan şıkkı seçiyor; "en az" ters ve yarım
katsayıyla sayılıyor. Boyut puanı, dokunan ağırlıkların ortalamasıyla hesaplanıyor.
Henüz gerçek yanıt verisi yok.

Soru: Bu tür çok boyutlu şık ağırlıklarını boyut puanına toplamanın hangi yöntemi
(ortalama, toplam, standartlaştırılmış toplam, model tabanlı) hangi koşulda yanlı sonuç verir?

İstenen çıktı: Kural seti — veri yokken önerilen kural; "en az" seçiminin puanlanması;
ikincil boyut ağırlık oranı; ampirik anahtara geçiş için gereken yanıt sayısı kaba kuralı.

KAPSAM DIŞI: sertifika/doğru-yanlış tipi SJT puanlaması (uzman uzlaşısı ile doğru cevap);
tam IRT kalibrasyonu yapılabilecek büyük örneklem senaryoları.

Kaynak: SJT puanlama yöntemleri üzerine hakemli çalışmalar ve derlemeler; ölçek
geliştirme kitapları. Test sağlayıcılarının metinleri kanıt sayılmaz.

[9-EK bloğu buraya aynen eklenir — bkz. §3]
Emin olunmayan yerde "kanıt yetersiz" yaz, doldurma.
```

**9. KAYNAK BEKLENTİSİ:** hakemli/akademik (SJT puanlama: rasyonel/ampirik/yapısal anahtarlar) · ⚠️ SJT literatürünün çoğu **yetkinlik (doğru cevap)** ölçer; bizimki **kişilik eğilimi** ölçüyor — bu ayrım prompta yazıldı, bulgularda ayrı işaretlenmeli · ⚠️ Türkçe örneklem nadir.

---

### B-6 · Psikometrik sonuç dilinin damgalama ve Barnum etkisi

**1. BAŞLIK:** "Sen busun" ile "şimdilik" dilinin kullanıcı üzerindeki etkisi

**2. NET SORU:** Kişilik testi sonucunun kimlik etiketi ("Sen bir Öncü'sün"), eğilim dili ("şu an şu tarafın öne çıkıyor") ya da boyut profili olarak sunulması, kullanıcının sonuca aşırı güvenmesini (Barnum etkisi), kendini etikete göre davranmaya zorlamasını ve ürüne katılımını nasıl farklı etkiler?

**3. NEDEN ÖNEMLİ**
- Bekleyen: **KARAR-48** (A koşullu dil / B çekince / C değişmesin) · **I-15 / madde 139** (4 "şimdilik" varyantı; menti sürümü yazılmamış) · sonuç kartındaki **paylaş düğmesi**.
- ⭐ **Yanlış cevabın bedeli:** 8 soruluk zorunlu seçimden çıkan bir etiket paylaşılabilir bir **kimlik** olarak sunulursa, genç bir menti kendini "Komutan değilim" diye sınırlar — ve ürünün kendi metodoloji sayfası bunun tanı olmadığını söylerken.

**4. ŞU AN NE VAR**
- Kod (canlı): `onboardingController.ts:464-466` DISC harfinden kart → `ResultStep.tsx:39-43,71,98-100` "Sen bir Öncüsün!", "En İyi Eş", "eşleştirileceksin" (KARAR-48 kanıtı) · `menti/page.tsx:311` "%87 uyum".
- Belge: `arketip-ve-yaklasim-icerigi-2026-09-03.md:67-106` **P3 kararı: B + dürüstlük kademesi** (herkes arketip alır, dil güvene göre değişir) · `:267-300` 4 "şimdilik" varyantı.
- **Karar nasıl verilmiş:** P3 kararı **gerekçeli** (ödülsüz kalma/terk riski) ama "anlatım eşiği" kararı; **dil etkisine dair kaynak yazılı değil**.

**5. TAM OLARAK NE BİLİNMİYOR**
- ✅ Bilinen: ürün iki dille konuşuyor (metodoloji temkinli, kart iddialı) — KARAR-48 bunu zaten tespit etti.
- ❓ Varsayılıyor, dayanağı yok: "şimdilik" dili, katılımı düşürmeden aşırı güveni azaltır.
- ❓ Varsayılıyor, dayanağı yok: kimlik etiketi "aha anı" üretir ve paylaşımı artırır — buna karşılık damgalama maliyeti **ölçülmemiş**.
- ❓ Bilinmiyor: menti (genç, kariyer başı) ile mentör için dil etkisinin farklı olup olmadığı.

**6. CEVABIN BİÇİMİ:** **Seçenek karşılaştırma tablosu** — seçenekler: kimlik etiketi · eğilim dili · boyut profili · karma (etiket + koşullu alt metin). Ölçütler: aşırı güven/Barnum riski · kendini-sınırlama/damgalama riski · anlaşılırlık · katılım/tamamlama etkisi · paylaşılabilirlik · kanıt gücü. Artı: **yazım kuralları listesi** (en fazla 8 madde) — "şimdilik" varyantlarını yazacak turun doğrudan kullanacağı.

**7. ⭐⭐ KARAR KRİTERİ**
- **Cevap A (etiket dili belirgin zarar/aşırı güven; eğilim dili katılımı düşürmüyor)** → KARAR-48'e **A önerisi kanıtla** güçlendirilir; madde 139 menti varyantları bu kurallarla yazılır; paylaş düğmesi metni koşullu dile çekilir.
- **Cevap B (etiket dili zararsız ya da kanıt zayıf, katılım etkisi güçlü)** → KARAR-48 kartına "B savunulabilir" notu eklenir; yalnız "En İyi Eş" ve "eşleştirileceksin" (ürünün tutamadığı vaatler) düzeltilir.
- **Net çıkmazsa** → varsayılan: KARAR-48'in mevcut önerisi (A) kalır; araştırma sonucu karta "kanıt yetersiz" notu olarak eklenir — PO kararına bırakılır.

**8. ARAŞTIRMA PROMPTU**
```
Bağlam: Çok kiracılı bir mentörlük eşleştirme ürünü. Kullanıcı kısa bir kişilik testi
(birkaç dakikalık, zorunlu seçimli) bitirince bir sonuç kartı görüyor: bugün "Sen bir X'sin"
biçiminde, paylaşılabilir. Ürün, net olmayan profillerde "şimdilik X tarafın öne çıkıyor"
dilini kullanmayı planlıyor. Kullanıcılar gençler (menti) ve gönüllü profesyoneller (mentör).

Soru: Sonucun kimlik etiketi, eğilim dili ya da boyut profili olarak sunulması aşırı güveni
(Barnum etkisi), kendini-sınırlamayı ve katılımı nasıl farklı etkiler?

İstenen çıktı: Karşılaştırma tablosu (ölçütler: aşırı güven riski, damgalama/kendini-sınırlama
riski, anlaşılırlık, katılım etkisi, paylaşılabilirlik, kanıt gücü) + en fazla 8 maddelik
yazım kuralı listesi.

KAPSAM DIŞI: klinik tanı bildirimi; işe alım sonuç bildirimi hukuku; burç/astroloji
içerik pazarlaması; genel UX yazım rehberleri (psikometrik bağlam dışı).

Kaynak: hakemli psikoloji çalışmaları (kişilik geri bildirimi, Barnum etkisi, etiketleme,
sabit/gelişen zihniyet), ölçme standartlarının sonuç bildirimi bölümleri. Test platformlarının
tanıtım metinleri kanıt sayılmaz.

[9-EK bloğu buraya aynen eklenir — bkz. §3]
Emin olunmayan yerde "kanıt yetersiz" yaz, doldurma.
```

**9. KAYNAK BEKLENTİSİ:** hakemli/akademik · ölçme standartları (sonuç bildirimi) · ⚠️ **Türkçe'de "sen …sın" yapısı ve hitap sıcaklığı farklı algılanabilir** — bulguların çevirisi garantili değil, dil testi "veri toplandıktan sonra" listesine · ⚠️ yaş: genç kullanıcıya dair bulgular ayrı işaretlenmeli (KARAR-31 yaş sınırı ile bağlantılı).

---

### B-7 · Profil eşikleri: arketip atama ve "şimdilik" 10 puanı

**1. BAŞLIK:** Kısa ölçekte baskın boyut ve profil farkı eşikleri

**2. NET SORU:** Boyut başına yaklaşık 9 sinyalle ölçülen 5 boyutlu bir profilde, iki boyut arasındaki farkın "gerçek" sayılması için gereken en küçük puan farkı ve bir boyutun "yüksek/düşük" sayılması için kullanılacak kesme noktaları, ölçme hatası dikkate alınarak nasıl belirlenir?

**3. NEDEN ÖNEMLİ**
- Bekleyen: **I-15** (madde 138·139·140) · **KARAR-45** (ad↔kod eşlemesi) · `ARCHETYPE_THRESHOLDS` · I-15 notu: "eşik sabiti `scoring.config.ts:31` komşusuna".
- ⭐ **Yanlış cevabın bedeli:** eşikler yanlışsa (bugün olduğu gibi) **herkes aynı arketipi alır ve kimse fark etmez** — ya da tersi, çoğunluk "şimdilik" alır ve P3'te reddedilen C seçeneğine geri dönülür.

**4. ŞU AN NE VAR**
- Kod: `backend/src/services/scoring.config.ts:31` `{HIGH:60, MID:55, LOW:45}` · `disc-to-ocean.adapter.ts:27-43` sıralı kural zinciri, **fallback M1/m1** · <10 puan "şimdilik" eşiği **kodda yok** (I-15 notu).
- Belge: `arketip-ve-yaklasim-icerigi-2026-09-03.md:94-102` 10 puan: *"rastgele olsaydı en yüksek ile ikinci arasındaki fark 10-12 olurdu"* · **"⚠️ DÜRÜSTLÜK SINIRI: ampirik değil, muhakeme"** · güvenilirlik 0,6-0,7'de gerekli fark **15-20** · `:104` **"⬜ AÇIK KALEM: akademik dayanak araştırması yapılacak"** · `:106` kalibrasyon ölçütü: "şimdilik" oranı >%60 ya da <%10.
- **Karar nasıl verilmiş:** 60/55/45 **gerekçesiz**; 10 puan **gerekçeli ama belgenin kendisi "muhakeme"** diyor.

**5. TAM OLARAK NE BİLİNMİYOR**
- ✅ Bilinen (belge kendi yazmış): istatistiksel eşik 15-20, anlatım eşiği 10 — bilinçli bir uzlaşı.
- ✅ Bilinen: kural zinciri sıralı ve fallback'li → ilk eşleşen kural kazanıyor; iki arketip birden uyduğunda sıra belirleyici (tasarım sorusu, araştırma değil).
- ❓ Varsayılıyor, dayanağı yok: 60/45 kesmeleri, türetilmiş (B-1) ya da SJT'den gelen puanların dağılımına uygun — **dağılım bilinmiyor**, 50 merkezli olduğu bile doğrulanmadı.
- ❓ Bilinmiyor: "anlatım eşiği" yaklaşımının literatürde bir karşılığı var mı (profil yorumlamada güven bantları, sabit kesme yerine yüzdelik).

**6. CEVABIN BİÇİMİ:** **Bir SAYI + gerekçesi** (iki adet): (a) profil farkı için önerilen minimum fark — güvenilirliğe bağlı formül ve 0,6 / 0,7 / 0,8 için değerleri; (b) "yüksek/düşük" kesmesi için **sabit puan mı, yüzdelik mi** önerisi ve pilot öncesi kullanılacak geçici değer. Artı: iki arketip birden uyduğunda raporlama kuralı.

**7. ⭐⭐ KARAR KRİTERİ**
- **Cevap A (anlatım eşiği yaklaşımının dayanağı var; 10 puan savunulabilir)** → I-15 10 puanla yazılır, sabit `scoring.config.ts`'e eklenir; pilotta "şimdilik" oranı ölçülür (%10–60 bandı).
- **Cevap B (sabit puan yerine yüzdelik/norm tabanlı kesme önerilir)** → 60/55/45 **geçici** işaretlenir; ilk N kullanıcıdan sonra yüzdeliğe geçiş "veri toplandıktan sonra" listesine; o zamana kadar kart yalnız **baskın boyutu** söyler (yüksek/düşük iddiası yok).
- **Net çıkmazsa** → varsayılan: belgedeki mevcut uzlaşı (10 puan anlatım, 60/55/45) kalır, **ama** kalibrasyon ölçütü (`:106`) izleme sorgusu olarak kuyruğa yazılır — veri geldiğinde eşikler oradan ayarlanır.

**8. ARAŞTIRMA PROMPTU**
```
Bağlam: Big Five temelli, senaryo bazlı kısa bir karakter ölçümü; boyut başına yaklaşık
9 sinyal, puanlar 0-100. Kullanıcıya en yüksek boyutuna göre bir "arketip" gösteriliyor;
en yüksek iki boyut arasındaki fark küçükse "şimdilik" dili kullanılıyor. Bir boyutun
yüksek/düşük sayılması için sabit kesmeler var. Henüz gerçek kullanıcı verisi yok;
tahmini güvenilirlik 0.6-0.7.

Soru: İki boyut arasındaki farkın gerçek sayılması için gereken minimum fark ve yüksek/düşük
kesmeleri, ölçme hatası dikkate alınarak nasıl belirlenir; veri yokken hangi geçici değer
savunulabilir?

İstenen çıktı: (a) güvenilirliğe bağlı minimum fark formülü ve 0.6/0.7/0.8 için değerler;
(b) sabit puan mı yüzdelik mi önerisi + geçici değer; (c) iki profil birden uyduğunda
raporlama kuralı. Her sayı için gerekçe.

KAPSAM DIŞI: klinik kesme puanları; zekâ testi profil analizi; tipoloji (MBTI) kategorileri.

Kaynak: ölçme kuramı kitapları ve hakemli yayınlar (fark puanı güvenilirliği, ölçmenin
standart hatası, profil yorumlama). Sağlayıcı teknik raporları ayrı etiketlenir.

[9-EK bloğu buraya aynen eklenir — bkz. §3]
Emin olunmayan yerde "kanıt yetersiz" yaz, doldurma.
```

**9. KAYNAK BEKLENTİSİ:** hakemli/akademik · standart ölçme kitapları · ⚠️ norm/yüzdelik önerileri **Türkçe normu olmayan** bir ölçekte doğrudan uygulanamaz — işaretlenmeli; yerel norm ancak kendi verimizle çıkar.

---

### B-8 · Kısa form (15 senaryo) + statik kararsızlık bandı

**1. BAŞLIK:** 15 senaryolu kısa ölçek ve basit uyarlamalı soru seçimi

**2. NET SORU:** 5 boyutu ölçen 5 sabit + 10 uyarlamalı senaryodan oluşan bir ilk oturum, boyut puanı 40-60 arasında kalan ("kararsız") boyuta ek soru veren statik bir kuralla, tam uyarlamalı (IRT tabanlı) seçime ve sabit uzun forma göre hangi güvenilirliğe ulaşır ve bu statik kural hangi koşulda yetersiz kalır?

**3. NEDEN ÖNEMLİ**
- Bekleyen: **I-12** (kart derinleştikçe yeniden hesaplanmıyor, 15→35) · senaryo bankası akışı (`senaryo-bankasi-2026-09-03.md:45-48`) · CAT/IRT reddi (`03-psikometri-ve-algoritma.md:36`).
- ⭐ **Yanlış cevabın bedeli:** 15 senaryo yetersizse ilk arketip kartı **gürültüdür** ama "ödül anı" olarak en güçlü izlenimi o bırakır; bant kuralı yanlışsa ek sorular zaten net olan boyuta gider, bulanık olan bulanık kalır.

**4. ŞU AN NE VAR**
- Belge: `senaryo-bankasi-2026-09-03.md:45-48` ilk oturum 5 sabit + 10 uyarlamalı, katman-2 "en bulanık boyuttan", kişilik ağırlığı ≥4 sinyal sonrası %12→%25 · `03-psikometri-ve-algoritma.md:36` "gerçek IRT/CAT yerine statik kararsızlık bayrağı (40-60 bandı); veri ileride CAT'e geçecek formatta saklanır".
- Kod: **40-60 bandı yok** (`backend/src` → 0 isabet). Canlı uyarlama `adaptiveTestEngine.ts:9-14,22` yalnız DISC için: 5 CORE → baskın boyutun DEEPENING soruları (bant değil, **baskın boyut** kuralı — belge ile ters mantık).
- **Karar nasıl verilmiş:** CAT/IRT reddi **gerekçeli** (Sprint 1, ölçek/maliyet); "40-60" ve "15" için **dayanak yazılı değil**.

**5. TAM OLARAK NE BİLİNMİYOR**
- ✅ Bilinen: canlı DISC motoru baskın boyutu derinleştiriyor; belge bulanık boyutu derinleştirmeyi istiyor — **iki ters kural** (tasarım çelişkisi, PO değil teknik karar).
- ❓ Varsayılıyor, dayanağı yok: 15 senaryo (boyut başına ~3 ana sinyal + yan sinyaller) ilk kart için yeterli.
- ❓ Varsayılıyor, dayanağı yok: 40-60 bandı "kararsız" için doğru bölge — puan dağılımı bilinmeden bant sabitlenmiş.
- ❓ Bilinmiyor: "veri CAT'e geçecek formatta saklanır" iddiası kodda karşılanıyor mu (yanıt başına madde kimliği + şık + zaman) — bu **kod sorusu**, araştırmaya değil kod keşfine gider.

**6. CEVABIN BİÇİMİ:** **"Şu koşulda şu" kural seti**: (a) kısa formlarda boyut başına minimum madde sayısı için kaba kural (kanıtla), (b) statik bant kuralının yeterli olduğu koşullar (madde sayısı, havuz büyüklüğü, boyut sayısı), (c) belirsizlik temelli seçim için IRT'siz basit alternatifler (ör. puanın standart hatasına dayalı durdurma), (d) CAT'e geçiş için gereken havuz/örneklem büyüklüğü.

**7. ⭐⭐ KARAR KRİTERİ**
- **Cevap A (15 senaryo + bant kuralı ilk kart için yeterli)** → akış aynen kalır; canlı motorun "baskın boyut" kuralı belgedeki "bulanık boyut" kuralına çevrilir (senaryo bankası koda geçerken, 🟡).
- **Cevap B (15 yetersiz ya da bant kuralı kötü seçim yapıyor)** → ilk kart **B-7'deki "şimdilik" diline zorunlu** bağlanır (15 senaryo sonrası kesin dil yok); I-12 (yeniden hesaplama) önceliği yükselir; bant yerine önerilen basit kural yazılır.
- **Net çıkmazsa** → varsayılan: akış kalır, ama ilk kart her durumda "şimdilik" kademesinden başlar ve katman-2 sinyal eşiği (≥4) sağlanınca netleşir — kullanıcıya kesin dil yalnız yeterli sinyal sonrası.

**8. ARAŞTIRMA PROMPTU**
```
Bağlam: Big Five temelli, senaryo bazlı bir karakter ölçümü. İlk oturumda kullanıcı
5 sabit + 10 uyarlamalı senaryo (~5 dakika) çözüyor; uyarlama kuralı basit: puanı 40-60
arasında kalan boyuta ek senaryo ver. Tam uyarlamalı test (IRT tabanlı) maliyet nedeniyle
reddedildi. Sonraki haftalarda her girişte 1-2 senaryo daha ekleniyor.

Soru: Bu 15 senaryolu ilk oturum ve statik bant kuralı, sabit uzun forma ve tam uyarlamalı
teste göre hangi güvenilirliğe ulaşır; statik kural hangi koşulda yetersiz kalır?

İstenen çıktı: Kural seti — kısa formda boyut başına minimum madde kaba kuralı; statik bant
kuralının yeterli olduğu koşullar; IRT gerektirmeyen belirsizlik temelli seçim/durdurma
alternatifleri; tam uyarlamalı teste geçiş için gereken havuz ve örneklem büyüklüğü.

KAPSAM DIŞI: büyük ölçekli yetenek/başarı sınavları için CAT algoritmaları; ticari CAT
motorlarının karşılaştırması; madde üretimi (yazım) teknikleri.

Kaynak: kısa form kişilik envanterleri ve uyarlamalı kişilik ölçümü üzerine hakemli
çalışmalar; ölçme kitapları. Sağlayıcı metinleri kanıt sayılmaz.

[9-EK bloğu buraya aynen eklenir — bkz. §3]
Emin olunmayan yerde "kanıt yetersiz" yaz, doldurma.
```

**9. KAYNAK BEKLENTİSİ:** hakemli/akademik (kısa Big Five formları, uyarlamalı kişilik ölçümü) · araç dokümantasyonu (açık kaynak CAT paketlerinin minimum gereksinimleri) · ⚠️ kısa form güvenilirlikleri **madde tipi Likert** olan envanterlerden gelir; senaryo+zorunlu seçim formatına aktarımı doğrudan değildir — bulgularda işaretlenmeli · ⚠️ Türkçe kısa form uyarlamaları varsa ayrı listelenmeli.

---

## 3. 9-EK BLOĞU — her araştırma promptunun sonuna AYNEN eklenir

```
KANIT GÜCÜ VE ERİŞİM ŞEFFAFLIĞI
Her iddia için şu üç şeyi belirt:
 · ERİŞİM: [tam metin okundu] / [yalnız özet okundu] / [ikincil kaynaktan aktarıldı]
 · KANIT GÜCÜ: [meta-analiz/derleme] > [birden çok bağımsız çalışma] > [tek çalışma]
   > [sektör uygulaması] > [sağlayıcı/ürün metni]
 · DOĞRULANABİLİR BAĞLANTI: açılabilir bir URL ya da DOI

YASAKLAR:
 · Ödeme duvarının arkasındaki metni "okudum" deme — özetten okunduysa açıkça yaz ve
   "yöntem ayrıntıları görülemedi" notu düş.
 · Atıf UYDURMA. Bağlantısını veremediğin kaynağı yazma. Emin değilsen:
   "bu konuda doğrulanabilir kaynak bulunamadı" yaz.
 · Sağlayıcı/ürün pazarlama metnini kanıt sayma — ayrı etiketle.
 · Tek çalışmaya dayanıp "kanıtlandı" deme.

ÇELİŞEN BULGULAR: alanda tartışma varsa iki tarafı da yaz; "uzlaşı var mı yok mu" açıkça söyle.

SINIRLILIK BÖLÜMÜ ZORUNLU: bu araştırmanın cevaplayamadığı şey ne? Hangi soru ancak
ürünün kendi verisiyle test edilebilir? Bunları ayrı listele.

YEREL BAĞLAM: bulgular çoğunlukla başka dil ve örneklemlerde üretilmiş. Türkçe konuşan
kullanıcıda aynı çalışacağı garanti değil — her bulguda bunu not düş.
```

---

## 4. SONRAKİ TURA BIRAKILAN ARAŞTIRMA BAŞLIKLARI (8'e sığmayanlar)

- **Eşleştirme kalitesinin ölçütü** — hangi sonuç değişkeni (NPS, yıldız, ilişki süresi, hedef ilerlemesi) "eşleşme işe yaradı" kanıtı sayılır? (KARAR-44; B-2'nin ölçüm tarafı)
- **Test-tekrar test kararlılığı** — kısa DISC/Big Five kaç hafta sonra tekrarlanmalı, değişim ne zaman "gerçek"? (KARAR-42, I-12)
- **Evet-deme (acquiescence) ve ters madde oranı** — zorunlu seçimde hâlâ gerekli mi? (`degerlendirme-sistemi-tasarim:153-155`)
- **Türkçe ölçme değişmezliği** — senaryoların Türkçe'de aynı boyutu ölçtüğünün nasıl sınanacağı (her brifte not olarak var; bağımsız brif veri gerektirir)
- **Sertifika senaryolarında madde yanlılığı** — sektör/yaş gruplarına göre farklı işleyen madde (B-4 verisi birikince)
- **Arketip değişiminin kullanıcıya bildirilmesi** — ertelenmiş PO kalemi (`arketip-ve-yaklasim-icerigi:136-138`)

## 5. ARAŞTIRMA GEREKTİRMEYEN, DOĞRUDAN DÜZELTİLEBİLİR YAN BULGULAR

> Brif yazarken bulundu; matematik/kod gerçeği, araştırma beklemez. Kuyruğa aday (numara verilmedi).

| # | Bulgu | Kanıt | Kapı önerisi |
|:--:|---|---|:--:|
| Y-a | SJT puanında "en az" seçimi payda'ya tam, pay'a yarım giriyor → tutarlı ters seçim puanı **düşürüyor** (100 → 87,5) | `backend/src/services/sjt-scorer.ts:31-36,70-73,80` | 🟡 (matching/skorlama dosyası) |
| Y-b | Sertifika dosya başı yorumu red-line için "SADECE 3" diyor, kod ≥2 | `certification.service.ts:10` ↔ `:65-73` | 🟢 (yalnız yorum) |
| Y-c | Kişilik ağırlığı üç yerde üç değer: kod 0,40 · belge %25 · belge %12→%25 | `scoring.config.ts:48` · `arketip-…:60` · `senaryo-bankasi:48` | 🔴 (ürün kararı → B-2 sonrası kart) |
| Y-d | SJT seed'i 4 şıklı, senaryo bankası "kesin" 3 şık diyor | `prisma/seed.ts:560-567` ↔ `senaryo-bankasi:37-39` | 🟡 (seed dosyası; seed ÇALIŞTIRILMAZ) |
| Y-e | Canlı uyarlama baskın boyutu derinleştiriyor, belge bulanık boyutu istiyor | `adaptiveTestEngine.ts:9-14` ↔ `senaryo-bankasi:47` | 🟡 (B-8 sonrası) |

---

## 6. BU TURUN PROMPTUNA ELEŞTİRİ

1. **Promptun ana gövdesi (A–D, F, G) bu oturuma gelmedi.** E bloğu "gönderdiysen aynı oturuma ikinci mesaj olarak yapıştır" diyor — ama bu oturumun **ilk ve tek** mesajıydı. Sonuç: E, dayanması gereken tarama bulguları olmadan yazıldı (brifler doğrudan kod+belge taramasıyla kuruldu). **Öneri:** değiştirme blokları ana promptun tamamını içersin ya da ana promptun repo yolunu versin (`docs/otonom/` altında).
2. **Aday listesi kodda olmayan bir şeyi var sayıyordu.** "Kararsızlık bandı (40-60) kullanılıyor" — kodda yok; SJT motoru da ekrana bağlı değil. Aday listeleri "kodda var mı" kontrolüyle gelmezse araştırma **olmayan bir sistemin** iyileştirmesine gider. **Öneri:** her aday yanında `kod: var/yok/uyuyor` etiketi.
3. **En büyük soru sorulmamıştı:** "Kişilik uyumu mentörlük çıktısını yordar mı?" — skorun %40'ı buna dayanıyor. Aday listesi hep **ölçümün nasıl yapılacağını** sordu, **ölçülen şeyin işe yarayıp yaramadığını** sormadı. Eklendi (B-2).
4. **"Sosyal arzu edilebilirlik" sorusu tek taraflı çerçevelenmişti.** "En çok/en az faking'i ne kadar azaltır" sorusu, formatın bedelini (ipsatiflik — belgede "ÇÖZÜLMEDİ" diye duruyor) görünmez kılıyordu. Soru iki yönlü yeniden kuruldu (B-3).
5. **Araştırma ile kod düzeltmesi ayrılmamıştı.** Bazı "araştırılacak" başlıkların bir kısmı saf matematik (ipsatif 3 serbestlik derecesi; SJT payda asimetrisi). Bunlar araştırmaya gönderilirse gereksiz bekler. §5'te ayrıldı. **Öneri:** promptta "araştırma mı, hesap mı?" ayrımı zorunlu olsun.
6. **"Türkçe/yerel bağlam" her brifte istendi ama bağımsız bir brif olarak yoktu.** Ölçme değişmezliği (senaryonun Türkçe'de aynı şeyi ölçmesi) tüm psikometri iddiasının ön koşulu; ancak veri olmadan araştırılamaz → sonraki tura bırakıldı, ama bir sonraki içerik turunun **uzman paketi**ne girmeli.
7. **Karar kriterlerinde "kim uygular" belirsiz.** Brifler "şu olursa şu" diyor; ama araştırma sonucu geldiğinde bu kriteri kim okuyup hangi dosyaya işleyecek (kuyruk satırı mı, KARAR kartı mı) promptta tanımlı değil. **Öneri:** araştırma çıktısı dönünce `00-KUYRUK.md`'de "AR-" önekli satır açılsın ve karar kriteri oradan uygulanıp işaretlensin.
8. **Bir sonraki içerik turu neye bakmalı:** (a) senaryo bankasının 117 şıkkının **sayısal ağırlık** karşılığı (bugün sözel), (b) sertifika 88 şıkkının 1↔2 çizgisinin tutarlılığı (iki bağımsız okuyucuyla), (c) menti "şimdilik" varyantlarının yazımı (madde 139) — B-6 kuralları geldikten sonra.

---

## 7. KAPANIŞ ÖZETİ

- **Açılan brif sayısı:** 8 / 8 — B-1 DISC→Big Five köprüsü · B-2 kişilik uyumu → çıktı · B-3 zorunlu seçim (sahteleme vs ipsatiflik) · B-4 sertifika karar tutarlılığı · B-5 SJT puan toplama · B-6 sonuç dili · B-7 profil eşikleri · B-8 kısa form + kararsızlık bandı
- **Karar kriteri dolu mu:** 8/8 **evet** (her birinde A / B / net çıkmazsa varsayılan yol yazılı)
- **Sonraki tura bırakılan:** 6 başlık (§4)
- **Doğrudan düzeltilebilir yan bulgu:** 5 (§5; numara verilmedi, kuyruğa aday)
- **Promptuna eleştiri:** 8 madde (§6)
- **Belge güncellemesi:** bu rapor + `02-ILERLEME.md` ekleme satırı. 09-DURUM / 10-yol / 00-KARAR-TAKIP **güncellenmedi**: iş kaynağı tek kuyruk (`CLAUDE.md` "AKTİF İŞ KAYNAĞI TEKTİR"), yan bulgular yalnız aday; kuyruğa devir PO'nun ana prompt (A–G) turunda yapılmalı.
- **⛔ Dokunulmayanlar:** ürün kodu · şema · seed · KARAR `CEVAP` satırları · hiçbir şey silinmedi.
