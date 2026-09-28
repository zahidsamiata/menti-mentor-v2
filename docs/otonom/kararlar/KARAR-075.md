### KARAR-75 · KVKK yasal metinlerinde kişi adı — yasak mı istisna mı? (Ç-16 · AN-41/YN-13 ile bağlı) [HUKUK + POLİTİKA KARARI]
> ⭐ Kaynak: CS bilanço denetimi §7 KARAR-D.
**Şu an ne var:** Kök `CLAUDE.md` "hiçbir belgeye kişi adı yazma" diyor; ama KVKK yasal metinleri (aydınlatma, gizlilik, kullanım koşulları, veri-işleyen sözleşmesi) veri sorumlusunu **açık kişi/kurum adıyla** yazıyor (`docs/kararlar/konu/kvkk-metinleri/01:11,44`, `03:9`, `07:7,41`, `08:6`). Canlıdaki aydınlatma sayfası ise kişi adı yazmıyor; veri sorumlusunu platform ve kurum olarak tarif ediyor (`frontend/src/app/kvkk/page.tsx:23-28`).
**Sorun ne:** İki kural birbirini yalanlıyor — biri isim yasaklıyor, diğeri (yasal geçerlilik için) isim zorunlu kılıyor olabilir.
**Neden sana soruyorum:** Yasal metnin geçerliliği için veri sorumlusunun adının yazılması gerekip gerekmediği hukuk kararı; "kişi adı yasağı"nın bu metinlere istisna olup olmadığı politika kararı.
**Seçenekler:**
- **A) KVKK metinleri yasağa İSTİSNA (isim kalır):** · Kazanç: yasal geçerlilik · Kayıp: yasak kuralı delinir, sınır bulanıklaşır · Süre 0 · Geri alınır · Kullanıcı ne görür: yasal metin tamamlanınca işletmecinin kişi adı · Migration: yok
- **B) İsimler kurum/unvana çevrilsin ("Veri Sorumlusu: [Kurum]"):** · Kazanç: yasak korunur · Kayıp: avukat "yeterli mi" teyidi gerekir · Süre S · Geri alınır · Kullanıcı ne görür: yasal metinde kurum/unvan · Migration: yok
**Karşılaştırma:** A pratik ama kuralı zayıflatır; B tutarlı ama hukuk teyidi ister. İkisi de ucuz.
**Benim önerim:** B (kurum/unvan) + avukat teyidi — çünkü kişisel ad zaten gereksiz, kurum adı yeterli. *(Hukuk kararın.)*
**Cevap vermezsen:** KVKK paketi hem yasağı ihlal etmeye devam eder hem her denetimde tekrar işaretlenir (AN-41 + YN-13 etkilenir).
**İlgili kartlar:** KARAR-38 (aynı aydınlatma metni) · KARAR-47 (avukat paketine eklenecek soru) · KARAR-59 (kişi adı yasağının sınırı)
**CEVAP:**

---

