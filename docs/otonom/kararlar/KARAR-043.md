### KARAR-43 · İki yön neden farklı? Menti, mentörün eleyeceği bir eşleşmeyi görmeye devam etmeli mi? (1 işi açar — cevap sonrası yeni satır)  [ÜRÜN KARARI]
> ⭐ **Kaynak:** psikometri konseyi (`docs/raporlar/kesif/konsey-psikometri-2026-09-21.md`), 2026-09-21.
**Şu an ne var:** Eşleştirme iki yönde **asimetrik** çalışıyor (`matching.ts:265-323` ↔ `:406-427`). Mentör→menti yönünde altı mekanizma var: kalite çarpanı (`:300`), toksik-çift vetosu D×S (`:283`), zaman uyumu filtresi (`:274-276`), beklenti kesişimi (`:278-281`), 4 kademeli fallback (`:200-227`), iletişim tarzı bonusu +10 (`:288-294`). **Menti→mentör yönünde bunların HİÇBİRİ yok.**
**Sorun ne:** Aynı çift, iki taraftan bakınca **farklı yüzde** görüyor. Mentörün *"bana uygun değil"* diye eleyeceği bir menti, kendi panelinde o mentörü yüksek uyumla görüp talep gönderiyor — ve reddediliyor. Menti için bu, sistemin ona **yanlış umut** vermesidir.
**Neden sana soruyorum:** "Menti neyi görebilmeli" doğrudan ürün kararıdır. Filtreleri menti yönüne de uygulamak menti havuzunu **daraltır** — az mentörlü kurumda menti ekranı boşalabilir.
**Seçenekler:**
**A) Bugünkü gibi kalsın (menti her şeyi görür)** · Kullanıcı ne görür: değişiklik yok · Ne kazanırsın: menti ekranı hiç boşalmaz, umut sinyali korunur; iş yok · **Ne kaybedersin:** yanlış umut ve boşa giden talepler sürer; "neden mentörde %74, bende %88 yazıyor?" sorusunun cevabı hiç olmaz; her ret bir hayal kırıklığı üretir (P-05'in yükünü artırır) · Süre **yok** · Geri alınır **— (değişiklik yok)** · Migration **yok**
**B) Filtreler iki yöne de uygulansın (simetrik)** · Kullanıcı ne görür: menti yalnız gerçekten uyumlu mentörleri görür · Ne kazanırsın: yüzdeler tutarlı, boşa talep azalır · **Ne kaybedersin:** **menti ekranı boşalabilir** — özellikle küçük kurumda; "hiç mentör yok" hissi menti personasının en büyük kayıp riski (`menti-persona-...:65,73`); boşalan ekranın sebebini de açıklayamayız (PS-10 ile çakışır) · Süre **M** · Geri alınır **evet** · Migration **yok**
**C) Simetrik filtre + menti yönünde fallback** (eleme uygulanır, liste boşalırsa mentör yönündeki 4 kademenin aynısı gevşetir) · Kullanıcı ne görür: uyumlu liste görür; liste boşalırsa "uyum düşük" rozetiyle yine bir şey görür · Ne kazanırsın: B'nin tutarlılığı + A'nın boşalmama güvencesi · **Ne kaybedersin:** en büyük iş; iki yönün kodu ortaklaştırılmalı (bugün ayrı yazılmış) ⇒ **canlı sıralama regresyon riski** ve bu riski yakalayacak test bugün yok (PS-07/PS-08 önce yapılmalı) · Süre **L** · Geri alınır **evet** · Migration **yok**
**Karşılaştırma:** Kurumlarda mentör sayısı mentiden azsa B tehlikelidir — menti boş ekran görür ve gider. C bu riski kapatır ama en pahalısıdır. A yalnız "yanlış umut"un maliyetini kabul ediyorsan doğrudur.
**Benim önerim:** **C** — çünkü fallback mekanizması zaten yazılı (`matching.ts:200-227`), diğer yöne taşınması sıfırdan tasarım değil. *(Bu senin ürün kararın.)*
**Cevap vermezsen:** Asimetri sürer; iki taraftaki yüzde tutarsızlığı açıklanamaz ve mentörün eleyeceği mentiler talep göndermeye devam eder.
**CEVAP:**

---

