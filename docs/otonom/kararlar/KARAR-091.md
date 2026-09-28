### KARAR-91 · Görüşme değerlendirmeleri ne kadar saklansın? (1 iş açar) [HUKUKİ · KVKK]
> ⭐ Kaynak: `docs/raporlar/kesif/geri-bildirim-envanteri-2026-09-25.md` (inceleme doğruladı: saklama süresi sonu imhası `MeetingCheckIn`'i kapsamıyor; KVKK veri dışa aktarımı da içermiyor — `backend/src/services/gdprService.ts:283-306`).
**Şu an ne var:** Tek gerçek değerlendirme kutusu `MeetingCheckIn` için silme süresi yok. Kullanıcının "verilerimi indir" çıktısında bu değerlendirmeler yok ("0 kayıt" görünüyor). Diğer kutularda süre var (ör. `FeedbackLog` 3 yıl).
**Sorun ne:** Kişi hakkında yazılmış değerlendirmeler süresiz tutuluyor ve kişi bunları dışa aktarımda göremiyor. Bu, KVKK'daki saklama ve erişim hakkıyla uyumsuz.
**Neden sana soruyorum:** Saklama süresi hukuki bir karar.
**Seçenekler:**
- **A) 3 yıl (FeedbackLog ile aynı) + dışa aktarıma ekle** · Kazanç: tutarlı politika · **Ne kaybedersin:** 3 yıldan eski değerlendirmeler otomatik silinir · Süre S · Migration yok
- **B) Program bitişinden sonra 1 yıl + dışa aktarım** · Kazanç: veri minimizasyonu · **Ne kaybedersin:** uzun dönem analiz verisi kaybolur · Süre S · Migration yok
- **C) Yalnız dışa aktarıma ekle, süreyi sonra belirle** · Kazanç: erişim hakkı hemen sağlanır · **Ne kaybedersin:** süresiz saklama sürer
**Karşılaştırma:** A basit ve tutarlı. B daha az veri tutar. C erişim açığını hemen kapatır ama saklama açığını bırakır.
**Benim önerim:** C şimdi (dışa aktarım teknik bir düzeltme, 🟡), süre için hukuk görüşüyle A ya da B. *(Hukuki karar senin, önerime güvenme.)*
**Cevap vermezsen:** değerlendirmeler süresiz saklanır; dışa aktarım eksik kalır.
**CEVAP:**

