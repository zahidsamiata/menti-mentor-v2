### KARAR-50 · Kuralların "geçersizleşme koşulu" zorunlu olsun mu?  [BELGE/METODOLOJİ] (4 işi açar)
> ⭐ **Kaynak:** yönetişim konseyi (`docs/raporlar/kesif/konsey-yonetisim-2026-09-21.md`), 2026-09-21.

**Şu an ne var:** 74 kuraldan **6'sının** (%8,1) geçersizleşme koşulu yazılı; **68'inin yok**. 6'sının hiçbiri ölçülebilir tetik taşımıyor (*"X olunca"* diyor, X'i kimin ne zaman kontrol edeceği yazılı değil) — bu yüzden **hiçbiri kendiliğinden tetiklenmemiş**. Sonuç: koşulu fiilen sağlanmış 4 kural hâlâ yürürlükte görünüyor, biri **yanlış kanıta dayanan bir güvenlik kuralı** (`CLAUDE.md § Güvenlik Kuralları › Yeniden kullanılacak kalıplar`, 24 gündür yanlış).
⚠️ Brief *"KURAL 17 var ama yarım uygulanmış"* diyordu — **öyle bir kural hiç yazılmadı** (13 terim · BB + 11 dal · 0 dosya; bu turda `docs/` + `CLAUDE.md` yeniden tarandı → yalnız raporun kendi 4 "yok" beyanı çıktı).

**Sorun ne:** Kurallar yalnız **birikiyor**, hiç düşmüyor. Her ders yeni kural oluyor, hiçbiri emekliye ayrılmıyor. CLAUDE.md bölmeyle 34.742'ye inmişti (pay yalnız 258 karakter); **bugün 36.941 karakter** (`wc -m CLAUDE.md`, 2026-09-28) — pay tükendi, sınır yeniden aşıldı.

**Neden sana soruyorum:** Bu konseyin özel kuralı *"CLAUDE.md'yi BÜYÜTECEK hiçbir öneri kabul edilmez"* diyor. Böyle bir kural eklemek CLAUDE.md'yi büyütür. **Ben bu yüzden önermiyorum ve kuralı YAZMADIM** — ama sorunun kendisi gerçek ve kararı senin.

**Seçenekler:**
· **A — Kural EKLEME. Bunun yerine 4 bayat kuralı tek seferde düzelt** (YN-04, YN-05 + 2 takip kalemi). Kullanıcı/ajan ne görür: yanlış kanıta dayanan güvenlik kuralı düzelir. Ne kazanırsın: CLAUDE.md **büyümez**, bugünkü zarar biter, 258 karakterlik pay korunur. **Ne kaybedersin: mekanizma kurulmaz** — 3 ay sonra aynı yerde olursunuz, bayat kurallar yeniden birikir. Süre **S** · geri alınır ✅ · migration yok.
· **B — Kural ekle ama yer aç: YN-14 birleştirmeleriyle BİRLİKTE uygula.** Kullanıcı/ajan ne görür: her kuralın altında "şu olunca bu kural düşer" satırı; CLAUDE.md birleştirmelerle kısalır. Ne kazanırsın: mekanizma kurulur **ve** dosya yine de küçülür (birleştirme ≈4.494 kazandırıyor, kural ~400 maliyet). **Ne kaybedersin:** kural sayısı artar, her yeni kural yazımı zahmetlenir; ve konseyin "büyütme" yasağını ancak bir paketle birlikte delmiş olursun — emsal doğar. Süre **M** · geri alınır ✅ · migration yok.
· **C — Kural yerine ALIŞKANLIK: KURAL 12'nin 3. ayağını (tazelik denetimi) script'e bağla.** Kullanıcı/ajan ne görür: kural metni değişmez; bayatlayan kural/belge için otomatik uyarı çıkar. Ne kazanırsın: **sıfır karakter maliyeti** — denetim otomatikleşir, CLAUDE.md hiç büyümez. **Ne kaybedersin:** script yazılana kadar hiçbir şey değişmez; `CLAUDE.md` bunu *"ileride script ile"* diyeli beri **hiç yapılmadı** (`scripts/` altında tazelik script'i yok: `kvkk-docx-gen.py` · `verify.sh` · `belge-bekci.sh` — bekçi aktif/arşiv ayrımı, boyut ve 1.000-karakter uyarısı yapıyor, kural tazeliğine bakmıyor: `scripts/belge-bekci.sh:1-21`) — aynı akıbet olabilir. Süre **M** · geri alınır ✅ · migration yok.

**Karşılaştırma:** A bugünü kurtarır, yarını kurtarmaz. B kalıcı çözüm ama kural sayısını artırır ve yasakla ancak paket hâlinde bağdaşır. C en zarif olanı (maliyet sıfır) ama aynı söz bir kez verilip tutulmadı; script gerçekten yazılacaksa en iyisi, yazılmayacaksa en kötüsü.

**Benim önerim:** **A şimdi, C sonra** — B'yi önermiyorum çünkü konseyin yasağını ancak bir paketle birlikte deler; A'nın kazancı kesin ve bugün alınabilir, C ayrı bir iş olarak kuyruğa girebilir.

**Cevap vermezsen:** 4 bayat kural yürürlükte kalır — en ciddisi `CLAUDE.md § Güvenlik Kuralları › Yeniden kullanılacak kalıplar`'deki **yanlış kanıtlı güvenlik kuralı**; ve kural birikmesi aynı hızla sürer, 258 karakterlik pay zaten tükendi (bugün 36.941). Kilitli işler: YN-04 (CLAUDE.md:433 "registerMessages.ts dosya HENÜZ kodda YOK" diyor, dosya var: `frontend/src/lib/registerMessages.ts`) · YN-05 (`belge-duzeni-rehberi.md:16` iş kuyruğu canonical'ı olarak dondurulmuş `10-yol-haritasi.md`'yi gösteriyor).
**İlgili kartlar:** KARAR-37 (bayat özet/kart çelişkisi, aynı birikme sorunu) · KARAR-49 (dondurulmuş belgede bayat kural satırları) · KARAR-51 ("yaşayan" damgalı ölü belgeler, aynı tazelik boşluğu) · KARAR-52 (kural gövdesi mükerreri, aynı rehber dosyası)

**CEVAP:**

---

