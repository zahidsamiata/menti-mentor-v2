### KARAR-3 · Sertifika senaryosunda "bildirim yükümlülüğü" metni  [ÜRÜN KARARI · HUKUKİ]
**Şu an ne var:** Sertifika soru bankasında 22 senaryo / 88 şık yazılı ama canlıya hiç aktarılmadı. Ekranda "Senaryo Q_T1 / Seçenek A" gibi kod isimleri görünüyor (testte görüldü).
> ⚠️ SAYI DÜZELTMESİ (2026-09-19, kod-teyitli — İKİ SAYI DA GERÇEK, biri diğerini geçersiz kılmaz):
> **"22 senaryo / 88 şık" = YAZILI İÇERİK** — `docs/raporlar/icerik/sertifika-oturum1/2/3-...-2026-09-08.md` üç belgesinde (11 konu × 2 varyant). Bu doğru, kaynak-kanıtlı.
> **AMA seed kodu `backend/prisma/seed-certification.ts` şu an 20 senaryo / 80 şık** (eski sürüm; kanıt: 20× `CERT_T`, 80 `options`, 10 tekil `topic`). **Finalize 22/88 içeriği henüz seed'e taşınMADI.**
> ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):** ~~[ESKİ · 2026-09-21] fark yalnız **2 senaryo + 8 şık** (20/80 → 22/88)~~ — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**). ⛔ Pratik sonuç: taşınacak şık sayısı 8 değil **88'in TAMAMI**; düşecek senaryo **15**. Efor **S değil L**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md:16-19,118-122`.
> ⛔ SONUÇ: K-16 bugün `seed-certification` çalıştırırsa **20/80 çıkar, 22/88 değil.** Seed öncesi bir "içerik→seed taşıma" adımı gerekir (KARAR-3/4 metni + madde 159 kriz hukuki teyidi + KALEM 8 destek kaynağı adı bloklarıyla birlikte). Bu, KARAR-3'ün hukuki-metin sorusunu değiştirmez; yalnız seed'in bugünkü kapsamını netleştirir.
**Sorun ne:** Bankadaki bir senaryoda mentörün ciddi bir durumu öğrendiğinde ne yapacağı soruluyor ve doğru şıkta **yasal bildirim yükümlülüğü** ima ediliyor. Bu hukuki bir iddia, avukat onayı yok. Bu tek cümle yüzünden 88 şıkın tamamı üç haftadır canlıya çıkmıyor.
**Neden sana soruyorum:** Hukuki sonucu olan bir metin. Ben avukat değilim, aşağıdaki hiçbir şey hukuki görüş değildir.
**Seçenekler:**
**A) Yasal iddia içermeyen metinle yaz** — "kurumun belirlediği destek birimine yönlendirir ve kurum politikasını uygular" · Kullanıcı: sertifika içeriği bugün canlıya çıkar · Kazanç: 87 şık serbest kalır, hukuki risk almazsın · Kayıp: avukat sonra "aslında bildirim zorunlu" derse metin yeniden yazılır · Süre: S · Geri alınır: evet
**B) O senaryoyu bankadan geçici çıkar** (21 senaryo / 84 şık seed edilir) · Kullanıcı: sertifika çıkar, bir senaryo eksik · Kazanç: tartışmalı cümleye hiç dokunmazsın · Kayıp: banka eksik, sertifikanın kapsamı daralır, sonra tekrar seed gerekir · Süre: S · Geri alınır: evet
**C) Avukat cevabını bekle** · Kullanıcı: sertifika ekranı bozuk kalmaya devam eder · Kazanç: sıfır risk · Kayıp: süresiz bekleme; bugünkü durum bu · Süre: ? · Geri alınır: —
**Karşılaştırma:** A ile B arasındaki fark, "yumuşatılmış metinle yayınlamak" ile "hiç sormamak". Konunun mentör eğitiminde yer alması senin için önemliyse A; konu hassas ve yarım söylemektense hiç söylememeyi tercih ediyorsan B. C yalnızca avukat görüşünün günler içinde geleceğini biliyorsan mantıklı.
**Benim önerim:** A — metin hukuki iddia içermiyor, kurum politikasına yönlendiriyor; avukat gelince tek satır değişir.
**Cevap vermezsen:** K-16 atlanır → sertifika ekranı bozuk kalır (madde 30 açık).
**CEVAP:**

---

