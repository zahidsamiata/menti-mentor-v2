# 06 — TASARIM VE UX
**🔄 YAŞAYAN** (canonical: tasarım ve UX)
**Son güncelleme:** 2026-08-02 (geç oturum: kart tasarımı + foto + tema/landing güncellemesi) · Kaynak: mail/panel chat'i, bugünkü oturum

## TEMA (dark/light)
- **Toggle var:** İsteyen light'a geçebilir. Altyapı kuruldu (PR #32: .dark class, ThemeProvider, localStorage, FOUC önleme, ThemeToggle butonu). 🟢✅
- **Landing dark/light: CANLI-SONRASINA ERTELENDİ (2026-08-02 geç oturum'da güncellendi).** 🟢
  - Eski karar: "Landing HER ZAMAN DARK kalır". Yeni karar: landing ileride dark/light **seçilebilir yapılabilir AMA canlı-öncesi değil**.
  - Gerekçe (tema-durum-ve-landing-maliyeti raporu): landing'i seçilebilir yapmak ~256 hardcoded nokta / ~10-13 saat / **orta risk**. Şu an öncelik değil.
  - Şimdilik landing DARK kalır (app tarafı — dashboard/formlar — zaten toggle'lı).
- **Metodoloji sayfası da koyu kalır** (landing ailesi).
- **Yumuşak lacivert yön:** Landing koyu kalsın ama siyaha yakın değil, yumuşak lacivert. Gerekçe: DISC renk kodları koyu zeminde iyi durmalı ama aşırı koyuluk göz yorar. 🟢 ⏳ (uygulanmadı)
- **M² logo dokunulmayacak** (beğenildi). 🟢

## TEMA — KALAN İŞLER (⏳)
- **D21:** Toggle admin/platform nav'a eklenmeli. 🟢✅ **TAMAMLANDI** (2026-08-02, frontend `188aad5`).
- **D22:** DISC renkleri light'ta WCAG FAIL (kontrast 1.8–3.9:1, olması gereken 4.5). Sarı/gri beyaz zeminde soluk. 5 dosya ~7 renk, 600/700 tonuna çekilmeli.
- **D23:** Platform admin rozetleri light'ta koyu leke (koyu-alfa tint), light varyant gerekli.
- **🔴 KARAR BEKLİYOR:** DISC renk TON kararı kullanıcının gözünden verilecek — light'ta henüz onaylanmadı (dashboard'lar çöktüğü için görülemedi, sonra seed geldi ama tema light test edilmedi).

## LANDING
- **Slogan değişikliği** (mail/panel chat'i): Eski "Ağınızı Sadece Takvimle Değil, İnsan Kimyasıyla Yönetin" ZAYIF → yeni H1 "Mentörlük programınızı doğru eşleşmelerle, zahmetsizce yönetin." + alt "DISC davranış modeline göre mentör ve mentileri eşleştirin, tüm süreci tek panelden takip edin." 🟢 ⏳ (karar verildi, uygulanmadı)
  - Slogan yöneticiye (karar verici), alt metin herkese (mentör/menti de landing'e gelir). "yüzlerce ilişki" → "tüm süreç".
- **Landing UX paketi (kodlanmadı ⏳):** tooltip metnin üstüne biniyor + hover köprüsü yok + kaynak linkleri tıklanamıyor; "i" ikonu keşfedilemez (koyu zeminde soluk); düşük kontrast gri metinler (WCAG); SIFIR-etikette sıfır-olmayan skor çelişkisi (AlgorithmBento — mantık hatası, öncelikli); mobil test.

## KART TASARIMI — MENTİ/MENTÖR HAVUZU (2026-08-02 geç oturum, ⏳ tasarlanacak)
Karar verildi, henüz kodlanmadı. Backend %90 hazır (bkz. kart-havuz-backend-envanteri raporu).
- **Düz liste DEĞİL, görsel kartlar** (Mentornity tarzı). Minimal — yığılma yok.
- **Kartta gösterilecek:** foto + isim + rol + DISC rozeti + sektör etiketi + **%UYUM** + aksiyon butonu.
- **%UYUM** = sektör etiketi uyumu + DISC uyum skoru. **Rating/yıldız YOK.**
  - Mevcut skor API'den dönüyor (`/mentors/:id/candidates`, `totalScore/sectorScore/discScore`) →
    **İŞ 7'ye (sektör-scorer) BAĞLI DEĞİL, bugünkü skorla çalışır.**
- **Kartta GÖSTERİLMEYECEK:** deneyim (yıl/şirket — etiket yeter); sosyal linkler; müsaitlik.
- **Grid + sayfalama:** sayfa başına ~15-18 kart (kesin sayı açık soru, bkz. 08); masaüstü 3 / tablet 2 / mobil 1 sütun. 300 mentör → çok sayfa.
- **Detay sayfası (karta tıklayınca):**
  - Sosyal linkler (LinkedIn/Instagram) **burada + KOŞULLU** — kişi bilgi girmişse göster, girmemişse hiçbir şey gösterme.
  - Müsaitlik takvimi → müsait saate tıkla → **niyet mektubu yaz** akışı.
- **Çift yönlü havuz:** mentör menti havuzunu, menti mentör havuzunu görür — **aynı kart mantığı**.
- **Fotoğraf:** herkesten istenecek. Şimdilik **opsiyonel**, ileride zorunlu (bkz. 08 açık soru). Altyapı hazır (bugün tamamlandı).
- **Referanslar:** docs/raporlar/kart-havuz-backend-envanteri-2026-08-02.md + docs/raporlar/mentor-karti-rakip-analizi-2026-08-02.md (rakip analizi + kart kararları).
- **Deneyim referansı (persona):** kart + akış tasarımı iki tarafın deneyimini farklı etkiler —
  menti tarafında **"bekleme anı" riski** (talep sonrası onay beklerken kaybolma), mentör
  tarafında **"sevdirme"** (arz kıt; mentörü tutmak öncelik). Kararlar:
  docs/raporlar/menti-persona-ve-sevdirme-2026-08-02.md · docs/raporlar/mentor-persona-ve-sevdirme-2026-08-02.md.

## MESAJLAŞMA (karar: ŞİMDİLİK YOK)
- **Serbest / LinkedIn-tarzı DM YOK.** Sadece **niyet mektubu akışı** (talep + mesaj).
- **Gerekçe:** toksiklik/spam riski + niyet-mektubu modelini koruma.
- **İleride belki:** eşleşme-sonrası (matched) sınırlı mesajlaşma. Şimdilik gündemde değil.

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
