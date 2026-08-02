# 06 — TASARIM VE UX
**Son güncelleme:** 2026-08-02 · Kaynak: mail/panel chat'i, bugünkü oturum

## TEMA (dark/light)
- **Toggle var:** İsteyen light'a geçebilir. Altyapı kuruldu (PR #32: .dark class, ThemeProvider, localStorage, FOUC önleme, ThemeToggle butonu). 🟢✅
- **Landing HER ZAMAN DARK kalır** — toggle landing'i kapsamaz, sadece app tarafı (dashboard/formlar). 🟢✅
  - Gerekçe: Landing bilinçli koyu pazarlama tasarımı (glow/gradyan); light'a çevirmek tasarımı bozar + 205 hardcoded nokta.
- **Metodoloji sayfası da koyu kalır** (landing ailesi).
- **Yumuşak lacivert yön:** Landing koyu kalsın ama siyaha yakın değil, yumuşak lacivert. Gerekçe: DISC renk kodları koyu zeminde iyi durmalı ama aşırı koyuluk göz yorar. 🟢 ⏳ (uygulanmadı)
- **M² logo dokunulmayacak** (beğenildi). 🟢

## TEMA — KALAN İŞLER (⏳)
- **D21:** Toggle admin/platform nav'a eklenmeli (şu an sadece menti/mentör DashboardNav'da).
- **D22:** DISC renkleri light'ta WCAG FAIL (kontrast 1.8–3.9:1, olması gereken 4.5). Sarı/gri beyaz zeminde soluk. 5 dosya ~7 renk, 600/700 tonuna çekilmeli.
- **D23:** Platform admin rozetleri light'ta koyu leke (koyu-alfa tint), light varyant gerekli.
- **🔴 KARAR BEKLİYOR:** DISC renk TON kararı kullanıcının gözünden verilecek — light'ta henüz onaylanmadı (dashboard'lar çöktüğü için görülemedi, sonra seed geldi ama tema light test edilmedi).

## LANDING
- **Slogan değişikliği** (mail/panel chat'i): Eski "Ağınızı Sadece Takvimle Değil, İnsan Kimyasıyla Yönetin" ZAYIF → yeni H1 "Mentörlük programınızı doğru eşleşmelerle, zahmetsizce yönetin." + alt "DISC davranış modeline göre mentör ve mentileri eşleştirin, tüm süreci tek panelden takip edin." 🟢 ⏳ (karar verildi, uygulanmadı)
  - Slogan yöneticiye (karar verici), alt metin herkese (mentör/menti de landing'e gelir). "yüzlerce ilişki" → "tüm süreç".
- **Landing UX paketi (kodlanmadı ⏳):** tooltip metnin üstüne biniyor + hover köprüsü yok + kaynak linkleri tıklanamıyor; "i" ikonu keşfedilemez (koyu zeminde soluk); düşük kontrast gri metinler (WCAG); SIFIR-etikette sıfır-olmayan skor çelişkisi (AlgorithmBento — mantık hatası, öncelikli); mobil test.

## UX İYİLEŞTİRMELERİ (bugünkü oturumda bulundu, ⏳)
- **Sol menü tipografi:** Yazılar küçük/soluk, biraz büyütülüp kontrast artırılmalı (CV360 örneği daha okunaklı).
- **Sayfa açıklama metinleri:** Her admin sayfasının başındaki "bu sayfa ne işe yarar" metni daha basit/açıklayıcı olmalı (imleç/tooltip değil, metin iyileştirme).
- **Soru ekleme dropdown'ları:** CORE/DEEPENING neden İngilizce → Türkçeleştir. "Genel (bilgi amaçlı)" dropdown'ında neden DISC (D/I/S/C) seçenekleri var → gözden geçir (kişi DISC üzerinden onaylama yapamaz).

## ONBOARDING UX
(Detay: 05-ozellikler-ve-paneller.md — Çift-Aha, self-serve, üye akışı.)

## KAYIT AKIŞI BASİTLEŞTİRME (⏳)
- 5 uzman rolüyle keşif prompt'u hazır, gönderilmedi. Bilinen: "davet bilgisi eksik" hatası, belirsiz hata mesajları (bugün B14 ile hata mesajları kısmen düzeldi).

## AÇIK SORULAR (bkz. 08)
- Çift-aha onboarding, bildirim yedeği vb. orta öncelikli işler — asistan "değerli ama sonra" dedi, kullanıcı karar vermedi. ⚪
