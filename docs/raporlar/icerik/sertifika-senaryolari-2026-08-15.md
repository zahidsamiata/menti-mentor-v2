# İçerik Dökümü — Sertifika Senaryoları (2026-08-15)

**📸 DONDURULMUŞ (2026-08-15)** — kaynak: `backend/prisma/seed-certification.ts` + canlı DB salt-okuma sayımı.

> Mentör sertifika sınavının **tüm senaryoları + şıkları + puan/açıklama** tam metin. Kullanıcı yanıtı/PII yok.

## Kaynak & ⚠️ KRİTİK tutarsızlık
- **Kod kaynağı:** `seed-certification.ts:37-257` — **10 konu × 2 varyant = 20 senaryo**, her senaryoda 4 şık (`competencyScore` 3/2/1/0 + açıklama). Toplam 80 seçenek.
- **⚠️ Canlı DB (salt-okuma count):** yalnız **5 sertifika sorusu (5 aktif) + 20 seçenek**. → **Koddaki 20 senaryoluk zengin banka CANLIYA SEED EDİLMEMİŞ.** Canlı hâlâ eski/kısıtlı 5 soruyla çalışıyor. Bu en kritik seed-kod farkı (bkz. eksikler raporu). Seed `db seed` tehlikeli olduğundan (veri siler) manuel/kontrollü uygulanmalı — PO kararı.
- **Puan→sonuç:** 3=doğru (correct), 2=kabul edilebilir (acceptable), 1=zayıf (wrong), 0=zararlı (wrong). Motor: `certification.service.ts` (ilk-deneme + red-line + cooldown).
- **DISC-tipine-özel "mentiye yaklaşım" içeriği:** ❌ YOK — senaryolar **genel mentörlük yetkinliği** ölçer ("menti şöyle davrandı, ne yaparsın"); mentinin DISC tipine KOŞULLU dallanma yok. Bu, aranan boşluğun sertifikada da olmadığını doğrular.

> Aşağıda kodun tam 20-senaryo bankası dökülür (canlıya taşınması gereken içerik). Her şık: `[puan] etiket — açıklama`.

---

## KONU 1 — Cevabı verme, buldur (red-line değil)
**CERT_T01_A:** *Mentin bir sorunla geliyor ve "Ne yapmalıyım?" diye soruyor. Sen bu sorunu nasıl çözeceğini çok iyi biliyorsun. Ne yaparsın?*
- **[3] A** — "'Sen olsan nasıl yaklaşırdın, hangi seçenekleri görüyorsun?' diye sorup kendi çözümünü bulmasına rehberlik ederim." — Doğru; iyi mentörlük "söylemek" değil "buldurmaktır".
- **[2] C** — "Önce kendi fikrimi söyler, sonra 'sen ne düşünüyorsun?' diye eklerim." — Kabul edilebilir ama sıra ters; menti fikrini 'doğru cevap' sanabilir.
- **[1] B** — "Doğru cevabı net söylerim; deneyimim var, vakit kaybetmesin." — Zayıf; menti bağımlı kalır.
- **[0] D** — "'Bu kadar basit şeyi kendin çöz' deyip geçiştiririm." — Zararlı; güven kırılır.

**CERT_T01_B:** *Mentin bir kariyer kararında ("bu işi kabul etsem mi?") senin görüşünü soruyor. Senin net bir tercihin var. Ne yaparsın?*
- **[3] A** — Kendi kriterlerini netleştirmesine yardım ederim ("Senin için en önemli 3 şey ne?"). — Doğru; karar onun hayatı.
- **[2] C** — Deneyimimi paylaşırım ama "seninki farklı olabilir" derim. — Kabul edilebilir.
- **[1] B** — "Bence şunu seç" derim; tecrübeliyim. — Zayıf; dayatma.
- **[0] D** — "Bu senin kararın, bana ne" deyip kapatırım. — Zararlı; yalnız bırakma.

## KONU 2 — Yapıcı geri bildirim (RED-LINE)
**CERT_T02_A:** *Mentin heyecanla bir fikir sunuyor ama fikirde ciddi bir kusur var. Menti kırılgan ve özgüveni düşük. Geri bildirimini nasıl verirsin?*
- **[3] B** — Önce güçlü yanını içtenlikle belirtir, kusuru soru olarak açarım. — Doğru; dürüstlük + şefkat.
- **[2] D** — Kusuru söylerim ama "herkes hata yapar" diye yumuşatırım. — Kabul edilebilir ama geçiştirici.
- **[1] C** — Kırılmasın diye kusuru hiç söylemem, "güzel fikir" derim. — Zayıf; sahte övgü.
- **[0] A** — "Bu çalışmaz, baştan yanlış düşünmüşsün." — Zararlı; özgüveni yıkar.

**CERT_T02_B:** *Gönüllü mentin haftalarca emek verdiği etkinlik planını gururla sunuyor ama plan bütçeyi çok aşıyor, uygulanamaz. Ne yaparsın?*
- **[3] B** — Emeğini takdir eder, "bütçeyle nasıl uyarlarız?" diye birlikte çözerim. — Doğru.
- **[2] D** — Güzel olmuş derim ama bütçeyi aştığını açıkça söylerim. — Kabul edilebilir; "birlikte çözme" eksik.
- **[1] C** — Moralini bozmam, bütçe sorununu sonra ben hallederim. — Zayıf; sürdürülemez.
- **[0] A** — "Bu bütçeyle olmaz, baştan düşünmemişsin." — Zararlı; gönüllü emeğini değersizleştirir.

## KONU 3 — Beklentileri hizalama (red-line değil)
**CERT_T03_A:** *Yeni mentiyle ilk görüşme. Ne sıklıkta görüşeceğiniz/ne bekleyebileceği hiç konuşulmadı. Ne yaparsın?*
- **[3] A** — İlk görüşmede birlikte net çerçeve kurarız (sıklık, konular, karşılıklı beklenti). — Doğru.
- **[2] C** — İlk birkaç görüşmeyi doğal bırakır, sonra çerçeve koyarım. — Kabul edilebilir ama riskli.
- **[1] B** — Menti ne isterse ona göre giderim, kural koymam. — Zayıf; yapısızlık.
- **[0] D** — Kendi kurallarımı koyar, uymasını beklerim. — Zararlı; tek taraflı dayatma.

**CERT_T03_B:** *Mentin verebileceğinin çok üstünde bir şey bekliyor — tüm kariyer sorunlarını çözmeni, iş bulmanı umuyor. Ne yaparsın?*
- **[3] A** — Nazikçe rolümü netleştiririm ("yol göstermede yanındayım, kararları sen atacaksın"). — Doğru.
- **[2] C** — Elimden geleni yaparım der, sınırı zamanla netleştiririm. — Kabul edilebilir.
- **[1] B** — Söz vermeden elimden geleni yaparım. — Zayıf; belirsiz söz.
- **[0] D** — "Ben her şeyi hallederim, merak etme." — Zararlı; taşınamayacak söz.

## KONU 4 — Aktif dinleme & yargılamama (red-line değil)
**CERT_T04_A:** *Mentin üç haftadır geç geliyor ve son buluşmayı habersiz kaçırdı. Ne yaparsın?*
- **[3] A** — Yargılamadan neler olduğunu, engel mi var, hedefler uygun mu diye açık uçlu sorarım. — Doğru.
- **[2] B** — Nazikçe devamlılığın önemini hatırlatır, sonra dinlerim. — Kabul edilebilir; önce anlamak daha güçlü.
- **[1] C** — Bir şey demeden devam ederim, belki yoğundur. — Zayıf; örüntüyü görmezden gelme.
- **[0] D** — Ciddiyetsizse programdan çıkarırım. — Zararlı; cezalandırıcı.

**CERT_T04_B:** *Görüşmede mentin anlatırken sen sıradaki tavsiyeni düşünüp onu tam dinlemediğini fark ediyorsun. Ne yaparsın?*
- **[3] A** — Kendimi durdurur, dikkatimi geri veririm ("bir daha söyler misin, tam anlamak istiyorum"). — Doğru.
- **[2] C** — Konuşmasını beklerim, sonra genel cevap veririm. — Kabul edilebilir; yüzeysel olabilir.
- **[1] B** — Tavsiyemi vermeye odaklanırım, önemli olan çözüm. — Zayıf; yanlış hedefe gider.
- **[0] D** — Ne diyeceğini tahmin ediyorum, sözünü keserim. — Zararlı; duyulmama hissi.

## KONU 5 — Sınır koyma & rol netliği (RED-LINE)
**CERT_T05_A:** *Mentin günün her saati mesaj atıyor, sürekli anlık destek bekliyor. Bu seni yıpratıyor. Ne yaparsın?*
- **[3] B** — Şefkatle ama net sınır koyarım ("en iyi desteği şu saatlerde verebilirim"). — Doğru.
- **[2] D** — Şimdilik idare ederim, çok yorulunca konuşurum. — Kabul edilebilire uzak; ertelemek sınırı zorlaştırır.
- **[1] C** — Elimden geldiğince hep cevap veririm, menti bu. — Zayıf; tükenmişlik.
- **[0] A** — Rahatsız edici, mesajları görmezden gelirim. — Zararlı; sessiz çekilme.

**CERT_T05_B:** *Mentin ilişkiyi arkadaşlığa dönüştürmeye çalışıyor; kişisel etkinliklere çağırıyor, özel iyilikler istiyor. Rol bulanıklaşıyor. Ne yaparsın?*
- **[3] B** — Sıcaklığı korurum ama rolümüzü nazikçe netleştiririm. — Doğru.
- **[2] D** — Bazı davetleri kabul eder, dengeyi tutmaya çalışırım. — Kabul edilebilir ama riskli.
- **[1] C** — Kırmamak için çoğu isteğini kabul ederim. — Zayıf; hedef kaybolur.
- **[0] A** — Mesafe için soğur, uzaklaşırım. — Zararlı; reddedilmişlik.

## KONU 6 — Gönüllü tükenmişliği & motivasyon (STK-özel, red-line değil)
**CERT_T06_A:** *Menti-gönüllü "ne için uğraşıyorum ki, kimse fark etmiyor" dedi. Ne yaparsın?*
- **[3] A** — Emeğinin somut etkisini hatırlatır, motivasyonunu yeniden keşfetmesine yardım ederim. — Doğru.
- **[2] C** — Biraz mola vermesini öneririm. — Kabul edilebilir; anlam kaybını çözmez.
- **[1] B** — Herkes yorulur, geçer derim. — Zayıf; küçümser.
- **[0] D** — Gönüllülük bu, istemiyorsan bırakabilirsin derim. — Zararlı; kapıyı gösterir.

**CERT_T06_B:** *Yetenekli menti-gönüllüye işler hep yükleniyor, "sürekli ben mi yapıyorum" diye yakınıyor. Ne yaparsın?*
- **[3] A** — Haklı olduğunu kabul eder, yükün adil dağılması için birlikte yol ararım. — Doğru.
- **[2] C** — Değerini vurgular, biraz daha dayanmasını rica ederim. — Kabul edilebilir; yapısal sorun sürer.
- **[1] B** — Herkes elinden geleni yapıyor derim. — Zayıf; dengesizliği görmezden gelme.
- **[0] D** — En iyisi sen yapıyorsun derim. — Zararlı; yükü daha da yıkar.

## KONU 7 — Okul/iş ile gönüllülük dengesi (STK-özel, red-line değil)
**CERT_T07_A:** *Üniversiteli mentin sınav döneminde görevlerini aksatıyor, proje aksıyor. Ne yaparsın?*
- **[3] A** — Önceliğinin okul olduğunu onaylar, görevleri geçici hafifletir/yeniden planlarız. — Doğru.
- **[2] C** — Sınav bitene kadar araya girmem, sonra devam ederiz. — Kabul edilebilir; boşluk yaratır.
- **[1] B** — Söz verdiği görevleri yine de yapmasını beklerim. — Zayıf; baskı.
- **[0] D** — Sorumluluk alan bırakmamalı, güvenilmez derim. — Zararlı; aidiyeti kırar.

**CERT_T07_B:** *Hem çalışan hem gönüllü genç menti, yorgunluktan katkı veremediği için suçlu hissediyor. Ne yaparsın?*
- **[3] A** — Suçluluğu hafifletir, az katkıyı bile değerli bulur, gerçekçi tempo belirleriz. — Doğru.
- **[2] C** — Elinden geleni yapması yeterli derim. — Kabul edilebilir; somut plan eksik.
- **[1] B** — Herkes zorlanıyor, idare et derim. — Zayıf; geçiştirir.
- **[0] D** — Söz verdiysen yapmalısın derim. — Zararlı; tükenmeyi hızlandırır.

## KONU 8 — Kültürel/bireysel farklılıklara saygı (red-line değil)
**CERT_T08_A:** *Mentin çok farklı bir çalışma tarzına sahip, senin yönteminle çalışmıyor ama işini yapıyor. Ne yaparsın?*
- **[3] A** — Farklı tarzına saygı gösterir, sonuca odaklanırım; kendi yöntemimi dayatmam. — Doğru.
- **[2] C** — Kendi yöntemimi öneririm ama seçimi ona bırakırım. — Kabul edilebilir.
- **[1] B** — Zamanla benim tarzıma alışmasını beklerim. — Zayıf; örtük dayatma.
- **[0] D** — Böyle olmaz, benim gibi çalışmalı derim. — Zararlı; dışlayıcı.

**CERT_T08_B:** *Mentinin çok farklı dünya görüşü var, bir konuda görüşü seninkine tamamen ters. Ne yaparsın?*
- **[3] A** — Görüşüne saygı gösterir, merakla anlamaya çalışırım; amacım değiştirmek değil. — Doğru.
- **[2] C** — Kendi görüşümü belirtirim ama tartışmaya girmem. — Kabul edilebilir.
- **[1] B** — Konuyu değiştirir, hiç girmem. — Zayıf; bağ fırsatını kaçırır.
- **[0] D** — Yanlış düşünüyorsun, ikna etmeye çalışırım. — Zararlı; alanı yok eder.

## KONU 9 — Gizlilik & güven (RED-LINE)
**CERT_T09_A:** *Mentin ailevi bir sorununu güvenerek anlattı. Ertesi gün başka gönüllü "menti nasıl, sorunu mu var?" diye sordu. Ne yaparsın?*
- **[3] B** — "Bunu onunla konuşman en iyisi" der, paylaşılanı korurum. — Doğru.
- **[2] C** — "İyi, biraz yoğun" gibi geçiştiririm. — Kabul edilebilir; en temizi kapı aralamamak.
- **[1] D** — Genel bir şey söylerim, detay vermem. — Zayıf; ima bile güveni riske atar.
- **[0] A** — Sorunu olduğunu anlatırım, yardım etsin diye. — Zararlı; güveni kırar.

**CERT_T09_B:** *Mentin bir hatasını utanarak itiraf etti; birkaç gün sonra o hatayla ilgili tartışma çıktı, senin bildiğin ortaya çıkabilir. Ne yaparsın?*
- **[3] B** — Güvenerek anlattığını korur, ifşa etmem; istersem onu kendisi konuşmaya cesaretlendiririm. — Doğru.
- **[2] C** — Sessiz kalır ama mentiyi kendisi açıklamaya teşvik ederim. — Kabul edilebilir (3'e yakın).
- **[1] D** — Sorulmadıkça söylemem ama sorulursa doğruyu söylerim. — Zayıf; koşullu güven.
- **[0] A** — Doğrusu bu, bildiğimi paylaşırım. — Zararlı; mentorluk biter.

## KONU 10 — Kriz & hassas durum yönetimi (RED-LINE)
**CERT_T10_A:** *Mentin görüşmede ciddi duygusal kriz belirtisi gösteriyor ("artık dayanamıyorum"). Ne yaparsın?*
- **[3] B** — Yargılamadan dinler, ciddiye alır, bir uzmana/profesyonel desteğe nazikçe yönlendiririm. — Doğru.
- **[2] D** — Dinlerim ve yanında olduğumu söylerim. — Kabul edilebilir ama eksik (yönlendirme yok).
- **[1] C** — Konuyu olumluya çevirmeye çalışırım. — Zayıf; duyguyu geçersiz kılar.
- **[0] A** — Bu benim işim değil, konuyu değiştiririm. — Zararlı.

**CERT_T10_B:** *Mentin ailede ciddi sağlık/şiddet durumu yaşadığını anlatıyor, senden yardım bekliyor ama sen uzman değilsin. Ne yaparsın?*
- **[3] B** — İçtenlikle dinler, yanında olduğumu belli eder, doğru profesyonel desteğe yönlendiririm. — Doğru.
- **[2] D** — Elimden geldiğince akıl vermeye çalışırım. — Kabul edilebilire uzak; amatör tavsiye zarar verebilir.
- **[1] C** — Çok üzülür, kendi benzer deneyimimi anlatırım. — Zayıf; odağı kendine çeker.
- **[0] A** — Bu çok ağır, giremem deyip uzaklaşırım. — Zararlı; terk.

---
*Red-line konular (kapatılamaz): 2, 5, 9, 10. Canlıya 20-senaryo bankasının taşınması PO onayı + kontrollü seed gerektirir (tehlikeli `db seed` değil).*
