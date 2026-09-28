### KARAR-104 · Uyum eşiğini geçen tek mentör randevuya kapalıysa menti ne görsün? (0 iş kilitler — PS-A4 sonrası ince ayar)  [ÜRÜN KARARI]
> ⭐ Kaynak: PS-A4 bağımsız incelemesi (backend #180, https://github.com/zahidsamiata/menti-mentor/pull/180#issuecomment-5853702508), 2026-09-27.

**Şu an ne var:** PS-A4 ile menti, kurumun uyum barajının (varsayılan 50; yönetici 20-90 arası ayarlar) altındaki mentörleri listede görmüyor. Barajı geçen hiç mentör yoksa liste boş kalmasın diye hepsi gösteriliyor (`backend/src/services/matching.ts:528-535`, `rankMentorsForMenti`). Barajı geçen mentör randevuya kapalıysa (görünürlüğü kapalı ya da müsaitliği yok) kartı soluk görünüyor (KARAR-80 M7; `matching.ts:569-573`).
**Sorun ne:** Barajı geçen mentörlerin hepsi soluksa (randevu alınamıyorsa), menti randevu alabileceği hiçbir mentör görmüyor. Barajın biraz altında kalan ama müsait mentörler ise gizli kalıyor. Menti "kimse yok" sanıp bırakabilir.
**Neden sana soruyorum:** Mentiye uyumu düşük ama müsait bir mentörü göstermek mi, yoksa yalnız uyumluyu gösterip beklemesini istemek mi daha doğru, bu bir ürün tercihi (KARAR-6 ek(1) "uygun olmayanı görmesin" ile KARAR-80 M7 "kart hep kalır" arasındaki denge).
**Seçenekler:**
- **A) Barajı geçen RANDEVUYA AÇIK mentör yoksa baraj altındakiler de gösterilsin** (soluk olanlar yine soluk) — Kullanıcı: her zaman randevu alabileceği en az bir mentör görür (varsa) · Kazanç: menti takılmaz · Kayıp: bazen uyumu düşük mentör görünür, "uygun olmayanı görmesin" kuralı esner · Süre S · Geri alınır · Migration yok.
- **B) Bugünkü gibi kalsın** — Kullanıcı: yalnız uyumlu mentörleri görür, hepsi soluksa bekler · Kazanç: KARAR-6 ek(1) tam uygulanır · Kayıp: küçük kurumda menti randevu alamadan kalabilir · Süre — · Geri alınır · Migration yok.
- **C) Her zaman en az N (örn. 3) randevuya açık mentör gösterilsin**, gerekirse baraj altından tamamlanarak — Kullanıcı: seçim yapabileceği birkaç mentör görür · Kazanç: seçenek duygusu · Kayıp: uyumu düşük mentör daha sık görünür; N sayısı ayrıca belirlenmeli · Süre S-M · Geri alınır · Migration yok.
**Karşılaştırma:** Menti bırakmasın istiyorsan A ya da C; uyum kalitesi öncelikse B. A en az değişiklikle "takılma"yı çözer.
**Benim önerim:** A — yalnız "hiç randevu alınamıyor" durumunda devreye giriyor, geri kalan her durumda baraj aynen işliyor.
**Cevap vermezsen:** Bugünkü davranış (B) sürer; başka iş kilitlenmez.
**İlgili kartlar:** KARAR-6 (cevaplı; "uygun olmayanı görmesin" kuralı oradan) · KARAR-16 (yönetici görünürlük onayı soluk kart sayısını etkiler) · KARAR-32 (cevaplı; havuzdan çekilen mentör soluk kalır) · KARAR-41 (kontenjanı dolan mentör de randevuya kapanır) · KARAR-43 (menti yönü filtreleri ve boş liste riski)
**CEVAP:**

