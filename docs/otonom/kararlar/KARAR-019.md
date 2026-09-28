### KARAR-19 · KVKK geri-dönülmez yetkiler kümesi  [ÜRÜN KARARI · HUKUKİ · GERİ DÖNÜLMEZ]
**Şu an ne var:** Üç KVKK kalemi teknik olarak yarım kaldı ve hepsi geri-dönülmez/hukuki sonuç taşıdığı için ajan kendi başına ilerletemiyor:
(a) Kurum (tenant) **kalıcı silme** ucu yok — sadece "dondurma" var (`platformRoutes.ts:54` freeze; cron yalnız TASLAK kurum siler, `cronScheduler.ts:227-228`) — bu kalem KARAR-74'te ayrıca soruluyor. (b) Rıza mekanizması **öncesi** kayıtlar için yeniden-rıza politikası belirsiz (teknik backfill ✅ yapıldı `backfill-consent.ts`, ama eski kayıt politikası açık — G1-16). (c) Denetim izi (kalibrasyon AUDIT) SystemLog'ta **90 günde siliniyor** (`gdprService.ts:374,414-416`; silme kategori ayırmıyor, AUDIT kayıtları da gidiyor) → iz-koruma ile KVKK imha süresi çelişiyor (G1-15).
**Sorun ne:** Bir kurum "bizi tamamen silin" derse yapının buna cevabı yok; eski kayıtların rıza durumu belirsiz kalırsa hukuki açık; denetim izini hem tutup hem 90 günde silmek ikisini de zayıflatıyor.
**Neden sana soruyorum:** Üçü de geri-dönülmez (kalıcı silme) ve/veya hukuki (rıza, saklama süresi). Ben avukat değilim; aşağıdakiler hukuki görüş değildir.
**Seçenekler:**
**A) Üçünü de şimdi netleştir** (kurum hard-delete ucu + eski-kayıt yeniden-rıza akışı + denetim izi ayrı saklama) · Kullanıcı: kurum tam silinebilir, eski kayıtlar yeniden rıza ister, denetim izi korunur · Kazanç: KVKK duruşu tam · Kaybedersin: en büyük iş, kalıcı silme riski, hukukçu onayı şart, migration · Süre: L · Geri alınır: kurum silme HAYIR · Migration: VAR
**B) Yalnız denetim izi saklamasını çöz** (audit izini SystemLog 90g'den ayır, uzun sakla), kurum silme + eski-rıza ertele · Kullanıcı: değişiklik yok · Kazanç: en düşük riskli, iz kaybı önlenir · Kaybedersin: kurum silme + eski-rıza açık kalır · Süre: M · Geri alınır: evet · Migration: küçük
**C) Şimdilik hiçbiri, hukukçu paketiyle birlikte** · Kullanıcı: değişiklik yok · Kazanç: emek çekirdeğe gider, tek hukuk turunda toplanır · Kaybedersin: üç açık da sürer · Süre: yok · Migration: yok
**Karşılaştırma:** Yakında kuruma satış/KVKK denetimi bekliyorsan A gerekli ama hukukçu ve migration şart. Riski minimize edip en somut açığı (iz kaybı) kapatmak istiyorsan B. KVKK paketini avukatla toptan çözeceksen C — bu projede hukuk zaten G1-10'da bekliyor.
**Benim önerim:** C şimdi + B'yi kuyruk adayı — kalıcı kurum silme ve eski-rıza avukat metnine (G1-10) bağlı; denetim izi saklaması ise düşük riskli, ayrı yapılabilir. (Bu senin ürün+hukuk kararın, önerime güvenme.)
**Cevap vermezsen:** F-02/F-07 ve G1-29/G1-16 açık kalır. Başka iş etkilenmez.
⚠️ AĞUSTOS SİNYALİ (2026-08-27, KISMİ — A/B/C DEĞİL): Üç alt-kalem de ağustosta ✅ İŞLEME AL kovasında: G1-29 (kurum silme) · G1-16 (eski-rıza) · G1-15 (denetim izi) (`00-PO-KARARLARI-2026-08-27.md:58`). Yani "yapılacak" yönü var; ama HANGİ kapsam/sıra (bu kartın A/B/C'si) ağustosta belirlenmedi. G1-10 (aydınlatma metni, avukat) çıkış blokeri (`:51`) — bu kararlar ona bağlı. PO teyit ederse CEVAP'a yazılabilir.
**İlgili kartlar:** KARAR-14 (kişi düzeyinde silme/dışa aktarma yetkisi) · KARAR-47 (eski-rıza ve saklama süresi avukat paketinde) · KARAR-74 ((a) kalemiyle aynı soru, mükerrer) — birlikte cevaplanması önerilir: KARAR-19 + KARAR-74
**CEVAP:**

---

