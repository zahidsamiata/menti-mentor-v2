### KARAR-8 · Repoları private yapma  [PO AKSİYONU — ajan yapamaz]
**Şu an ne var:** Karar dosyası (`docs/kararlar/00-KARAR-TAKIP.md:429` ve `:538-539`) "repolar PO tarafından private yapıldı" diyor. **Gerçekte ikisi de public** — 2026-09-09'da kimlik doğrulaması olmadan klonlandı; 2026-09-28'de `gh repo view` iki repo (çatı + backend) için de `PUBLIC` gösteriyor.
**Sorun ne:** Kod, KVKK metinleri, güvenlik denetim raporu, tüm karar geçmişi herkese açık. Kapatıldığı sanılan bir açık aslında açık.
**Neden sana soruyorum:** GitHub hesabı senin; ajan yapamaz.
**Seçenekler:**
**A) Bugün private yap** · Kazanç: açık kapanır · Kayıp: strateji sohbetinin repoya doğrudan erişimi kapanır, bağlam paketi yöntemine dönülür · Süre: 2 dakika · Kullanıcı ne görür: site kullanıcıları için değişiklik yok · Geri alınır: evet (ayar tek tıkla geri çevrilir) · Migration: yok
**B) Otonom turlar bitince yap** · Kazanç: birkaç gün daha hızlı bağlam · Kayıp: o günlerde açık sürüyor · Süre: 2 dakika (sonra) · Kullanıcı ne görür: site kullanıcıları için değişiklik yok · Geri alınır: evet · Migration: yok
**C) Public kalsın** · Kazanç: açık kaynak görünürlüğü · Kayıp: KVKK metinleri ve güvenlik raporu dahil her şey açıkta · Kullanıcı ne görür: değişiklik yok · Süre: 0 · Geri alınır: evet (bugüne kadar açıkta kalan içerik geri alınamaz) · Migration: yok
**Karşılaştırma:** Gerçek kullanıcı ~sıfır olduğu için sızacak kişisel veri yok; risk daha çok iş/itibar tarafında. Yine de karar dosyasının yanlış bilgi taşıması başlı başına sorun — hangi seçeneği seçersen seç o satır düzeltilmeli.
**Benim önerim:** B — sonra kesinlikle yap, unutma.
**Cevap vermezsen:** Hiçbir iş kilitlenmez; açık sürer.
**İlgili kartlar:** KARAR-18 (PO elle işler listesinde bu kartın hatırlatması duruyor)
**CEVAP:**

---

