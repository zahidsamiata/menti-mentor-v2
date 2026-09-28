### KARAR-46 · Sertifika içeriğinin hangi sürümü canlıya gidecek? (P-99'u açar) [ÜRÜN KARARI · SEED]
> ⭐ **Kaynak:** içerik konseyi (`docs/raporlar/kesif/konsey-icerik-2026-09-21.md`), 2026-09-21.
> ⚠️ **ÇAPRAZ:** **KARAR-3** (kriz senaryosunun hukuki metni) ile aynı seed'i bekliyor ama farklı soru — o *tek cümlenin hukuku*, bu *hangi sürüm*. İkisi de cevaplanmadan **P-99 → K-16** zinciri açılmaz. ⚠️ Kapsam: yeni sürüm 88 şıkın TAMAMINI taşır ve seed'deki 20 senaryonun 15'ini eler (bkz. `00-KUYRUK` P-99 sayı düzeltmesi).

**Şu an ne var:** Aynı sertifika sahnesi **üç farklı metinle** üç yerde duruyor: 2026-09-03 tarihli faz6 belgesi ·
2026-09-08 tarihli oturum belgeleri · **kodda bambaşka bir üçüncü sahne** (`seed-certification.ts:216-217`).
Hangisinin canlıya gideceği hiçbir belgede yazmıyor; faz6 hâlâ "dondurulmuş" etiketli.

· A seçilirse seed'deki iki STK-özel konu (`gonullu-tukenmisligi`, `okul-gonulluluk-dengesi`) canlıdan kalkar ve sonuç ekranındaki (I-03) konu adları değişir; seed'deki "mentorluk/mentörlük" karışıklığı kendiliğinden düzelir (`seed-certification.ts:139,197,232`). *(2026-09-23 EK BİLGİ katmanı buraya işlendi 2026-09-27; aslı: `docs/otonom/arsiv/01-KARARLAR-kart-gecmisi.md` §KARAR-46)*
**Sorun ne:** Kuyruk (P-99) işi "22 senaryoyu seed'e taşı" diye tarif ediyor; gerçekte **22'nin 17'sinin seed'de
karşılığı yok, seed'deki 20'nin 15'i belgelerde gerekçeli elenmiş** ve ortak olan 5 senaryonun **5'i de yeniden
yazılmış** — birinde puanlamanın anlamı ters dönmüş. Ayrıca taşımadan önce üç teknik soru cevapsız: konu
kodlarının değişmesi kurumların "kapattığım konu" kaydını öksüz bırakır, geçme eşiği 10 konuda 8 iken 11 konuda
**9'a çıkar** (sertifika zorlaşır), ve belgelerdeki 17 "iç not" konu düzeyinde yazılmış ama alan **şık**
düzeyinde (`schema.prisma:1158`).

**Neden sana soruyorum:** Hangi içeriğin mentörlere sınav olarak çıkacağı ve sertifikanın **zorlaşması** ürün
kararı; ayrıca canlı veriye yazma (seed) senin iki değişmez kuralından biri.

**Seçenekler:**
**A) 2026-09-08 serisi kazanır — tam taşıma** · Kullanıcı: 11 konu / 22 senaryo ile sınava girer, sertifika
zorlaşır (8→9 konu) · Kazanç: en olgun içerik canlıya çıkar, elenen 15 sahnenin gerekçesi zaten yazılı ·
Kayıp: 88 şıkkın tamamı yeniden yazılacak (efor L), konu kodları değişince eski kayıtlar öksüz kalır ·
Süre: L · Geri alınır: evet (yedek + pasifleştirme) · Migration: yok (iç not şık düzeyinde kalırsa)
**B) Önce yalnız 4 kritik (red-line) konu taşınır, gerisi sonra** · Kullanıcı: kriz/sınır/gizlilik/geri bildirim
konularında yeni metni görür, kalan 7 konu eski metinde kalır · Kazanç: en riskli içerik önce düzelir, efor M ·
Kayıp: bir süre **karışık sürüm** yayında olur (bazı konular yeni, bazıları eski); geçme eşiği iki kez değişir ·
Süre: M · Geri alınır: evet · Migration: yok
**C) Hiç taşıma — bugünkü 20/80 kalır** · Kullanıcı: bugünkü sınavı görmeye devam eder · Kazanç: sıfır risk,
sıfır iş · Kayıp: üç haftadır yazılı duran içerik rafta kalır; **puanlama anlamı ters olan senaryo canlıda
kalmaya devam eder** · Süre: — (iş yok) · Geri alınır: — (değişiklik yok) · Migration: yok

**Karşılaştırma:** Sertifikanın zorlaşmasını şimdi göze alabiliyorsan A tek turda biter. Kriz içeriğinin doğru
olması acilse ama toplu değişimi istemiyorsan B; ama karışık sürüm yönetmek gerekir. C'nin tek savunması zaman.
**Benim önerim:** A — ama **KARAR-3 ve KARAR-4 cevaplanmadan başlanamaz** (kriz senaryolarının 8 şıkkı onlara
bağlı) ve iş ikiye bölünmeli: "içerik taşıma PR'ı" ve "seed çalıştırma turu".
**Cevap vermezsen:** F-14, P-99, AN-03 ve K-16 açık kalır (`00-KUYRUK.md` kilit haritası); sertifika ekranı bugünkü hâliyle kalır — bugünkü seed'de kriz konusunda yalnız dinleyip yönlendirmeyen şık 2 puan alıyor ve eşik 2 olduğu için kritik konuyu geçiriyor (`backend/prisma/seed-certification.ts:242` · `backend/src/services/certification.service.ts:78-79`, AN-03).
**İlgili işler:** madde 164 (kritik konuda 2 puan geçer eşiği; 88 şık bu eşikle puanlandı — kodda ✅ `backend/src/services/certification.service.ts:78-79`, test `backend/tests/certification.test.ts:73-78`; taşıma bu eşiği değiştirmemeli)
**İlgili kartlar:** KARAR-3 (önkoşul: kriz şıkkının metni) · KARAR-4 (önkoşul: destek kaynağı adı) · KARAR-30 (içerik seed'den önce isim değişkeni mi) · KARAR-55 (yeni içerik açıklama-sonda varsayımıyla yazıldı) · KARAR-113 (baraj/konu sayısı aynı sınav; A seçilirse 11 konuda 9) · KARAR-127 (sertifika öncesi hazırlık aynı konulara dayanır) — birlikte cevaplanması önerilir: KARAR-3 + KARAR-4 + KARAR-46 · KARAR-46 + KARAR-113
**CEVAP:**

---

