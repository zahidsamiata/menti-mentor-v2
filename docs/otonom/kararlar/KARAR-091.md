### KARAR-91 · Görüşme değerlendirmeleri ne kadar saklansın? (1 iş açar) [HUKUKİ · KVKK]
> ⭐ Kaynak: `docs/raporlar/kesif/geri-bildirim-envanteri-2026-09-25.md` (inceleme doğruladı: saklama süresi sonu imhası `MeetingCheckIn`'i kapsamıyor; KVKK veri dışa aktarımı da içermiyor — `backend/src/services/gdprService.ts:317-362`).
**Şu an ne var:** Tek gerçek değerlendirme kutusu `MeetingCheckIn` için silme süresi yok. Kullanıcının "verilerimi indir" çıktısında bu değerlendirmeler yok (`backend/src/services/gdprService.ts:317-362`); özet ekranı "Görüşme değerlendirmesi" satırında boş `FeedbackLog`'u saydığı için "0 kayıt" görünüyor (`frontend/src/lib/kvkkSummary.ts:82`). Süreli imha yalnız `FeedbackLog` (3 yıl) ve sistem kayıtları için var (`gdprService.ts:375,403-436`); `Feedback` için de süre yok. Hesap anonimleştirilince check-in'in serbest notları siliniyor (`gdprService.ts:170-173`).
**Sorun ne:** Kişi hakkında yazılmış değerlendirmeler süresiz tutuluyor ve kişi bunları dışa aktarımda göremiyor. Bu, KVKK'daki saklama ve erişim hakkıyla uyumsuz.
**Neden sana soruyorum:** Saklama süresi hukuki bir karar.
**Seçenekler:**
- **A) 3 yıl (FeedbackLog ile aynı) + dışa aktarıma ekle** · Kazanç: tutarlı politika · **Ne kaybedersin:** 3 yıldan eski değerlendirmeler otomatik silinir · Süre S · Migration yok · Kullanıcı ne görür: "verilerimi indir" çıktısında kendi değerlendirmeleri · Geri alınır: kısmen (silinen kayıt geri gelmez)
- **B) Program bitişinden sonra 1 yıl + dışa aktarım** · Kazanç: veri minimizasyonu · **Ne kaybedersin:** uzun dönem analiz verisi kaybolur · Süre S · Migration yok · Kullanıcı ne görür: A ile aynı · Geri alınır: kısmen (silinen kayıt geri gelmez)
- **C) Yalnız dışa aktarıma ekle, süreyi sonra belirle** · Kazanç: erişim hakkı hemen sağlanır · **Ne kaybedersin:** süresiz saklama sürer · Kullanıcı ne görür: A ile aynı · Süre S · Geri alınır: evet · Migration: yok
**Karşılaştırma:** A basit ve tutarlı. B daha az veri tutar. C erişim açığını hemen kapatır ama saklama açığını bırakır.
**Benim önerim:** C şimdi (dışa aktarım teknik bir düzeltme, 🟡), süre için hukuk görüşüyle A ya da B. *(Hukuki karar senin, önerime güvenme.)*
**Cevap vermezsen:** değerlendirmeler süresiz saklanır; dışa aktarım eksik kalır.
**İlgili kartlar:** KARAR-38 (aydınlatma metni saklama süresini de söyler) · KARAR-39 (başkasının yazdığı değerlendirmenin anonimleştirilmesi) · KARAR-47 (avukata tek pakette sorulacak hukuki kalemler) · KARAR-89 (süre hangi kutuya uygulanacak) · KARAR-94 (dışa aktarım kapsamı — C seçeneği aynı iş) — birlikte cevaplanması önerilir: KARAR-91 + KARAR-94 + KARAR-47
**CEVAP:**

