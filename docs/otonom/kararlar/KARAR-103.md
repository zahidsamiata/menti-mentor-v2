### KARAR-103 · Eski planlardaki 13 yapılmamış özellik — hangileri yapılsın? (13 işi açar)  [ÜRÜN KARARI]
> ⭐ Kaynak: G-kart doğrulaması (`docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md`), kodda yeniden doğrulandı 2026-09-27 (ajan-ekledi, K-C). Kuyruk satırı: **AJ-11**.

**Şu an ne var:** Ağustos planlarında (G-kartları) yazılmış ama hiç yapılmamış 13 özellik. Bugün kullanıcı bunların hiçbirini görmüyor:
1. Platform yöneticisi için büyüme grafiği yok — yalnız anlık sayılar (`backend/src/controllers/platformController.ts:113-137`).
2. Platform genel ayarlar ekranı yok (`frontend/src/app/platform/` altında yalnız giriş/dashboard/tenants).
3. Kurum paketi (FREE/PRO/ENTERPRISE) kaydediliyor ama hiçbir sınır uygulamıyor (`backend/prisma/schema.prisma:194`; kısıt kodu 0).
4. Kurum yöneticisi için "demo/önizleme modu" yok — yalnız logo/renk önizlemesi (`frontend/src/app/(admin)/admin/branding/page.tsx:192-220`).
5. Üye persona şablonları (mezun, gönüllü…) ekranı yok.
6. Kurumun "etki duvarı" (mentörlük istatistiklerini gösteren vitrin) yok.
7. Bir kurumun başka kurumu platforma davet etmesi yok.
8. Mentör rozetleri yalnız "Sertifikalı" (`frontend/src/app/(dashboard)/mentor/page.tsx:194-205`).
9. Menti mentör listesini sektöre göre süzemiyor (`backend/src/controllers/mentorFilterController.ts`: "sector" 0).
10. Kurum KPI panelinde zaman içindeki değişim (trend) yok — yalnız anlık oran (`backend/src/services/retentionMetrics.service.ts:138-148`).
11. Telefon bildirimi (push) gerçek değil — servis gönderilmiş gibi davranıyor (`backend/src/services/notificationService.ts:39-54`).
12. Mizaç testinde "ters kodlu" soru (cevap tutarlılığını ölçen soru) yok (`backend/prisma/schema.prisma:738-752`).
13. Mentöre giden bildirimlerin sıklığı ayarlanmıyor — toplu özet ya da seyreltme yok (`backend/src/services/notificationService.ts`; throttle/digest araması 0). Ne sıklıkta bildirim gideceği ürün kararı.

**Sorun ne:** Bunlar planda "yapılacak" diye duruyor ama kimse "gerçekten istiyor muyuz?" diye sormadı. Kuyrukta satırları olmadığı için ne yapılıyor ne de bilinçli olarak erteleniyor; plan belgeleri ürünün olduğundan büyük görünmesine yol açıyor.

**Neden sana soruyorum:** Her biri "bu özellik olsun mu" sorusu — kullanıcıların ne görüp ne yapabileceğini değiştirir. 3 (paket sınırları) ve 7 (kurumdan kuruma davet) gelir/büyüme modeline bağlı; 11 (gerçek bildirim) yeni bir dış servis hesabı ister (senin elin); 12 psikometri tasarımını ve şemayı değiştirir.

**Seçenekler:**
- **A) Hepsi v2'ye ertelensin** — Kullanıcı: bugünkünü görür, değişiklik yok · Kazanç: ekip çıkış işlerine odaklanır, kuyruk sade kalır · Kayıp: bu özelliklerin hiçbiri ilk kurumlarla gelmez; özellikle 9 (sektör filtresi) ve 8 (rozetler) gibi küçük kazançlar da bekler · Süre: — · Geri alınır: evet · Migration: yok.
- **B) Yalnız küçük ve şemasız olanlar şimdi (8 rozet · 9 sektör filtresi · 10 KPI trendi · 1 büyüme grafiği), gerisi v2** — Kullanıcı: mentör listesinde sektör süzgeci, mentör panelinde yeni rozetler, yöneticide trend grafikleri · Kazanç: az emekle görünür iyileşme · Kayıp: paket sınırı, davet kanalı, demo modu, gerçek bildirim gelmez; rozet kuralları (hangi başarıya rozet?) için ajan varsayılanı kullanılır · Süre: M · Geri alınır: evet · Migration: yok.
- **C) Numara yazarak seç** (örnek: "C: 1, 8, 9, 11") — Kullanıcı: yalnız seçtiklerin gelir · Kazanç: tam kontrol · Kayıp: her seçim ayrı iş; 3/7/11/12 seçilirse ek karar/hesap/migration gerekir ve süre uzar · Süre: seçime göre S-L · Geri alınır: çoğu evet · Migration: 3 ve 12 seçilirse muhtemel.

**Karşılaştırma:** Önce ilk kurumla canlıya çıkmak istiyorsan A odağı korur. Ürünün ilk izlenimde daha dolu görünmesini istiyorsan B küçük ve güvenli bir paket. Belirli bir kurum talebin varsa C.
**Benim önerim:** B — dördü de şemasız ve geri alınabilir; gerisi gelir modeli ve dış hesap kararı beklediği için şimdi yapılırsa yarım kalır. *(Bu senin ürün kararın; önerime güvenme.)*
**Cevap vermezsen:** AJ-11 kilitli kalır; 13 özelliğin hiçbiri yapılmaz, planlarda "yapılacak" diye durmaya devam eder. Ayrıca AJ-78'in dönemsel tarih aralığı ayağı (md.10) bekler.
**İlgili kartlar:** KARAR-9 (aynı soru: planlanmış ama ekranı olmayan özellik) · KARAR-17 (md.4 ile aynı yönetici önizlemesi) · KARAR-22 (cevaplı; ret bildirimi gerçek push'a (md.11) dayanır) · KARAR-114 (md.11 ile aynı bildirim gönderimi) · KARAR-117 (md.8 rozetleriyle aynı takdir konusu) · KARAR-119 (md.3/md.7 gelir kanalına bağlı) · KARAR-121 (md.12 ters kodlu soru biçimi) · KARAR-125 (md.7'nin bireyden kuruma hâli) — birlikte cevaplanması önerilir: KARAR-103 + KARAR-119
**CEVAP:**

