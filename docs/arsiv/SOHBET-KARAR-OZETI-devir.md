# MENTİMENTOR — SOHBET KARAR & DURUM ÖZETİ (devir/hafıza belgesi)

## KÜNYE
- **Ana tema:** Ağırlıklı olarak mail altyapısının (kırık Gmail SMTP → Resend) canlıya alınması + platform admin panelinin derinleştirilmesi (kurum detayı: mentör/menti/görüşme/DISC) + bir dizi güvenli veri/DB operasyonu (test verisi seed, global içerik seed, DB switch). Yan konular: landing slogan/UX, güvenlik felsefesi, hukuki metin, ölçeklenebilirlik.
- **Tarih/sıra:** İçerikten ~2026 Temmuz sonu / 2 Ağustos civarı (docs dosya adı 2026-08-02, test branch 31 Tem auto-delete referansları). Kesin tarih belirsiz.
- **UYARI:** Bu sohbetin sonlarına doğru asistanın (Claude) context'i doldu; en son kısımlardaki bazı uzun belgeler okunamadı. Bu özet, okunabilen kısımlardan derlendi — %100 eksiksiz olmayabilir. En güvenilir liste için Claude Code'a kanıtlı envanter (git/PR/docs tarama) çıkarttırılması önerildi.

---

## (a) ALINAN KESİN KARARLAR

### Mail altyapısı
- **Gmail → Resend geçişi** · `altyapı/DB` · Mail sağlayıcısı Resend'e taşındı · 🟢 · ✅ · Gerekçe: Gmail App Password 20 Tem'de iptal olmuş, mail aylardır kırıktı · Bağlam: emailService generic SMTP'ye çevrildi, domain sivilkapasite.org doğrulandı (DKIM+SPF+DMARC, region Ireland/eu-west-1).
- **@test.local bounce guard** · `altyapı/DB`·`güvenlik/KVKK` · Sahte/test adreslere mail gönderimi atlanıyor · 🟢 · ✅ · Gerekçe: Gmail'e bounce düşmesini önlemek.
- **Resend key rotasyonu** · `güvenlik/KVKK` · Sohbette bir kısmı açığa çıkan eski key silindi, yeni key (mentimentor-prod-v2) aktif · 🟢 · ✅ · Gerekçe: secret hijyeni.

### Panel (platform admin)
- **Panel kapsamı: B (Orta)** · `özellik/panel` · Kurum detayı + Mentörler/Mentiler/Görüşmeler listeleri + DISC dağılımı, MEVCUT veriyle, şema değişikliği YOK · 🟢 · ✅ (kodlandı, merge edilmedi) · Gerekçe: kullanıcının asıl talebini (bir derneğin içine girip üyeleri/görüşmeleri görmek) şema değişikliği olmadan karşılıyor; C (grafik/export/aktiflik) migration gerektirdiği için sonraya · Bağlam: backend PR#26 + frontend PR#29, branch feat/platform-panel-deep.
- **Panel mimarisi C'ye açık olsun** · `özellik/panel`·`tasarım/UX` · B kodlanırken modüler (KpiCards/MembersTable/MeetingsTable/DiscSummary) → ileride C eklenebilir · 🟢 · ✅ · Gerekçe: baştan doğru iskelet.
- **Kurum detay tasarımı: üstte özet+KPI, altta sekmeler (Üyeler/Görüşmeler/Analizler), Üyeler açık** · `tasarım/UX` · 🟢 · ✅ · Gerekçe: "bir bakışta durum + tek tıkla derinlik"; tek tek öncelik seçmek yapay olurdu, sekmeli hepsi dengeli.
- **Güvenlik düzeyi: TAM** · `güvenlik/KVKK` · Panel için audit log + KVKK maskeleme + rate-limit + token domain ayrımı · 🟢 · ✅ (kodlandı) · Gerekçe: panel en hassas veriyi (isim/email/DISC) gösteriyor, güvenlik sonradan eklenemez.
- **Veri kaynağı: mentör/menti sayımı TenantMembership.role** · `altyapı/DB`·`özellik/panel` · User.role değil TenantMembership.role · 🟢 · ✅ · Gerekçe: kullanıcı farklı kurumlarda farklı rolde olabilir, kurum-bazlı doğru rol TenantMembership'te · NOT: Bir ara ekranda "User.role" önerisi çıktı, kullanıcı TenantMembership'e çevirdi (değişti).
- **Görüşmeler = Meeting modeli** (Match değil) · `altyapı/DB` · tenantId ile sorgulanır · 🟢 · ✅ · Gerekçe: Match=eşleşme (OCEAN tabanlı ayrı kavram), Meeting=görüşme.
- **DISC analizi = discType dağılımı, ham profil ASLA gösterilmez** · `güvenlik/KVKK` · discVector/selfProfile/temperamentJson dönmez · 🟢 · ✅ · Gerekçe: KVKK.
- **Audit log canlı SystemLog'a append serbest** · `güvenlik/KVKK` · Erişim logu append-only, iş verisi değiştirmez, test sırasında da yazar · 🟢 · ✅ · Gerekçe: KVKK Md.12 erişim kaydı, zararsız.

### Landing
- **Slogan değişikliği** · `tasarım/UX`·`ürün-vizyonu` · Eski "Ağınızı Sadece Takvimle Değil, İnsan Kimyasıyla Yönetin" zayıf → yeni H1 "Mentörlük programınızı doğru eşleşmelerle, zahmetsizce yönetin." + alt "DISC davranış modeline göre mentör ve mentileri eşleştirin, tüm süreci tek panelden takip edin." · 🟢 · ⏳ (karar verildi, uygulanmadı) · Gerekçe: eski slogan soyut/klişe, ürünü yanlış anlatıyor; yeni slogan yöneticiye (program+zahmetsiz+yönet), alt metin herkese (mentör/menti de landing'e gelir), uydurma iddia yok.
- **Slogan yöneticiye, alt metin herkese** · `ürün-vizyonu` · 🟢 · ✅ (karar) · Gerekçe: platformu benimseyecek karar verici yönetici; mentör/menti davetle gelir.
- **"yüzlerce ilişki" → "tüm süreç"** · `tasarım/UX` · Alt metinde · 🟢 · ✅ (karar) · Gerekçe: mentör/menti de sayfaya gelir, "yönet" onlara hitap etmez.

### Tema
- **Yumuşak lacivert yön** · `tasarım/UX` · Landing koyu kalsın ama çok koyu olmasın (siyaha yakın → yumuşak lacivert) · 🟢 · ⏳ · Gerekçe: DISC renk kodları koyu zeminde iyi durmalı ama aşırı koyuluk göz yoruyor.
- **M² logo dokunulmayacak** · `tasarım/UX` · 🟢 · ✅ (karar) · Gerekçe: kullanıcı beğendi.

### Ölçeklenebilirlik / güvenlik zamanlaması
- **Ölçeklenebilirlik araştırması ertelendi** · `altyapı/DB` · Şimdi değil, gerçek kullanıcı sinyalleri gelince · 🟢 · ⏳ · Gerekçe: gerçek kullanıcı ~sıfır, erken optimizasyon tuzağı.
- **Sunucu sertleştirme ertelendi** · `güvenlik/KVKK` · Gerçek kişisel veri öncesi · 🟢 · ⏳ · Gerekçe: kod güvenliği (DevSecOps) ≠ sunucu güvenliği; ikincisi acil değil ama gerçek veri öncesi yapılmalı.

### Çalışma tarzı
- **Prompt standardı (8 unsur)** · `çalışma-tarzı` · Her kapsamlı prompt: büyük resim + mod + DevSecOps + paralellik + durak/teyit + hata senaryoları + kapanış · 🟢 · ✅ · Bağlam: PROMPT-STANDARDI-devsecops-paralellik.md.
- **DevSecOps: güvenlik kod yazma anında** · `çalışma-tarzı`·`güvenlik/KVKK` · Sonradan yamanmaz · 🟢 · ✅ · Gerekçe: kullanıcı açıkça istedi.
- **Çok-ajanlı paralellik: uygun işlerde** · `çalışma-tarzı` · Bağımsız işler paralel, bağımlı sıralı, tek oturum · 🟢 · ✅.

---

## (b) YAPILAN İŞLER

- **Mail uçtan uca canlıya alındı** · `altyapı/DB` · ✅ · Lokal + canlı test: gerçek mail gelen kutusuna düştü, reset linki canlıyı gösteriyor · Bağlam: Dokploy backend env Gmail→Resend, pointer bump b313601, deploy.
- **config.ts .env-path fix** · `altyapı/DB` · ✅ · `../../.env` → `../.env`; backend .env hiç okunmuyordu, tüm lokal config varsayılana düşüyordu · Bağlam: backend PR#25 · Gerekçe: platform login bu yüzden çalışmıyordu.
- **3 PR merge + restart** · `altyapı/DB` · ✅ · backend #24(mail)+#25(config) + çatı #26(compose passthrough SMTP_SECURE+PLATFORM_ADMIN_EMAIL) · Bağlam: pointer af8a7d6→b313601, çakışma yoktu.
- **learning-journey prod'a alındı** · `özellik/panel` · ✅ · Pointer bump'la birlikte.
- **Platform panel oturum bug'ı çözüldü** · `özellik/panel` · ✅ · KOD DEĞİLDİ — config restart'ında JWT_SECRET değişmişti, eski token geçersizdi, re-login çözdü · Gerekçe: kullanıcı "önce teşhis, kod değilse uğraşma" dedi, doğru çıktı.
- **Panel derin görünüm kodlandı** · `özellik/panel` · ✅ (merge edilmedi) · Audit log çalışıyor (VIEW_TENANT_MEMBERS logları görüldü).
- **b3 fix: kayıt akışı TenantMembership dolduruyor** · `altyapı/DB` · ✅ · Önceden panel 0 sayıyordu (kayıt akışı membership oluşturmuyormuş).
- **Test verisi seed'lendi (izole test branch)** · `altyapı/DB` · ✅ · Neon test branch ep-polished-darkness (ana ep-fancy-tooth'tan farklı) açıldı, .env geçildi, TEST- kurum+mentör/menti+DISC+görüşme, sonra ana Neon'a geri dönüldü · Bağlam: .env.backup-anaDB yedeği.
- **Global içerik seed** · `altyapı/DB` · ⏳/❓ (uygulandı mı belirsiz — son promptlar okunamadı) · DISC soruları (20) + öğrenme aşamaları (13) ana Neon'a; sadece seed-questions.ts + seed-learning-journey.ts, tehlikeli seed.ts yasak · Bağlam: ana Neon = canlı prod DB (aynı), seed canlıyı da etkiler.

---

## (c) BEKLEYEN / YARIM İŞLER

- **Arkadaşın başvurusu** · `özellik/panel`·`açık-soru` · ⏳ · ~06:03 canlıdan kaydoldu, "inceleniyor" gördü ama panelde "bekleyen yok"; canlı DB'de var mı, durumu ne — çözülmedi · GERÇEK KİŞİ bekliyor.
- **Panel gezmesi (tüm roller)** · `özellik/panel` · ⏳ · STK yönetici/mentör/menti panellerini kullanıcı kendi gözüyle görecek; test verisi hazır · Bağlam: test branch 31 Tem auto-delete (süre kısıtlı) — ama sonradan ana Neon'a da seed'lendi.
- **Panel PR'ları (#26+#29) merge** · `özellik/panel` · ⏳ · Kodlandı, test bekliyor, merge kararı kullanıcıda (geri-alınamaz).
- **Sunucu güvenlik denetimi** · `güvenlik/KVKK` · ⏳ · Prompt hazır, salt-okuma bilgi amaçlı (VPS/Dokploy HTTP+açık/firewall/SSH/SSL/secret/yedek) · Kullanıcı "şimdi hızlı durum çıkar" dedi ama gönderilip gönderilmediği belirsiz.
- **CLAUDE.md iyileştirme denetimi** · `çalışma-tarzı` · ⏳ · Prompt verildi (güvenlik bölümü + çalışma sözleşmesi ekleme), sonuç gelmedi.
- **Ortam temizliği** · `altyapı/DB` · ⏳ · Ölü worktree/branch/temp script/secret dosya temizliği; prompt hazır.
- **Ana Neon'a geri dönüş / DB switch** · `altyapı/DB` · ✅/⏳ · Yapıldı ama sonraki turlarda tekrar switch'ler oldu; .env.backup-anaDB + .env.testbranch-temp yönetimi.
- **Kayıt akışı basitleştirme** · `tasarım/UX` · ⏳ · 5 uzman rolüyle keşif prompt'u hazır, gönderilmedi · Bilinen: "davet bilgisi eksik" hatası, belirsiz hata mesajları.
- **Landing UX paketi** · `tasarım/UX` · ⏳ · Kodlanmadı: tooltip metnin üstüne biniyor + hover köprüsü yok + kaynak linkleri tıklanamıyor; "i" ikonu keşfedilemez (koyu zeminde soluk); düşük kontrast gri metinler (WCAG); SIFIR-etikette sıfır-olmayan skor çelişkisi (AlgorithmBento — mantık hatası, öncelikli); mobil test.
- **DISC renk kontrastı (WCAG FAIL)** · `tasarım/UX` · ⏳ · Kullanıcı app'i ayağa kaldırıp DISC renkleri + rozetleri görsel inceleyip ton kararı verecekti (görsel inceleme turu) · Bağlam: menti/mentör dashboard, DiscTestStep, admin/questions; test hesapları admin@test.local / mentor1@test.local(D) / menti1@test.local(S), şifre TestPanel!2026, kurum test-panel-demo.
- **Tema (yumuşak lacivert) uygulama** · `tasarım/UX` · ⏳ · Karar verildi, kodlanmadı.
- **İzole test DB kalıcı** · `altyapı/DB` · ⏳ · .env.test'e kalıcı TEST_DATABASE_URL tam oturmadı.
- **Sertifika + öğrenme yolculuğu uçtan uca test** · `özellik/panel` · ⏳ · Merge edildi ama canlıda test edilmedi.
- **Onay bildirimi maili** · `özellik/panel` · ❓ · Kurum onaylanınca/reddedilince başvurana mail gidiyor mu belirsiz.
- **Depoları PRIVATE yapma** · `güvenlik/KVKK` · ⏳ · GitHub, ticari SaaS.

---

## (d) KARARA BAĞLANMAYAN AÇIK SORULAR

- **Hukuki metin — yaş politikası** · `güvenlik/KVKK`·`açık-soru` · ❓ · 18+ mı, gençler de mi (veli izni)? Kullanıcı "öyle bir gündemim yok, hukuki sorun olmayacak şekilde her şey olabilir" dedi = NET KARAR YOK · Mevcut Kullanım Koşulları "18+" diyor ama ürün genç menti hedefliyor = çelişki.
- **Hukuki metin — veri sorumlusu kimliği** · `güvenlik/KVKK`·`açık-soru` · ❓ · Şahıs/şirket/dernek? Kullanıcı "bilmiyorum, anlamadım" dedi = belirsiz.
- **Hukuki metin — sunucu konumu** · `altyapı/DB`·`açık-soru` · ❓ · Resend=Ireland (netleşti), Neon=?, Hostinger=? — yurt dışı aktarım beyanı için gerekli.
- **Global içerik seed canlıyı etkiliyor mu (uygulandı mı)** · `altyapı/DB`·`açık-soru` · ❓ · Ana Neon = canlı prod DB olduğu teyit edildi; seed uygulandıysa canlı da etkilenir — son durum belirsiz (context doldu).

---

## (e) ÖNEMLİ TEKNİK GERÇEKLER / UYARILAR

- **PROD = DEV DB (kritik)** · `altyapı/DB` · Dokploy canlı backend DATABASE_URL = lokal ana Neon (ep-fancy-tooth-ab4u5xhr, NODE_ENV=production) BİREBİR AYNI. Yani lokalde ana Neon'a yazmak = canlıyı etkilemek. Test branch = ep-polished-darkness (farklı, izole).
- **NODE_ENV=production'da reset guard tetiklenmez** · `altyapı/DB`·`güvenlik/KVKK` · Prod DB güvende; ama NODE_ENV yanlışsa reset guard DB silebilir → deploy öncesi teyit edildi (prod'da NODE_ENV=production doğrulandı).
- **Tehlikeli seed uyarısı** · `altyapı/DB` · `seed.ts` / `npm run seed` / `prisma db seed` VERİ SİLER — asla çalıştırılmamalı. Güvenli olanlar: seed-questions.ts, seed-learning-journey.ts, seed-test-tenant.mjs.
- **Neon migration kuralı** · `altyapı/DB` · IF NOT EXISTS + db execute + migrate resolve. `db push`/`migrate dev` YASAK.
- **Submodule/merge koreografisi** · `altyapı/DB` · Önce backend PR → çatı pointer bump → çatı PR. Autodeploy AÇIK (main push→otomatik deploy), env değişikliği otomatik yansımaz (manuel redeploy şart).
- **SHA tahmin etme dersi** · `çalışma-tarzı` · Asistan bir kez yanlış SHA (4460f22) verdi, Claude Code git'ten doğrulayıp yakaladı (doğrusu b313601), prod çökmesini önledi → "tahmin etme, doğrula" kuralı kanıtlandı.
- **Prod admin key** · `güvenlik/KVKK` · d0aeef3c... 64-hane, güçlü kabul edildi; rotasyon opsiyonel/ileride (eski zayıf ...change-in-production varsayılanı prod'da yoktu).
- **Test hesapları** · `özellik/panel` · admin@test.local / mentor1@test.local(D) / menti1@test.local(S) vb., şifre TestPanel!2026, kurum test-panel-demo, @test.local (mail gitmez).
- **Global içerik sayıları** · `altyapı/DB` · 20 DISC sorusu + 13 öğrenme aşaması (beklenen); mevcut veri 3 kurum / 7 kullanıcı / 3 görüşme (sabit kalmalı referansı).

---

## ÇELİŞKİ / BAĞLANTI NOTLARI (birleştirme aşaması için)
- **Panel veri kaynağı** başka sohbette User.role olarak konuşulmuş olabilir — bu sohbette TenantMembership.role'e karara bağlandı; birleştirmede kontrol et.
- **Hukuki metin kararları** başka sohbetlerde de geçmiş olabilir (05 devir belgesi) — çelişki kontrolü gerekir.
- **Ölçeklenebilirlik + sunucu güvenliği** "ileride" notları başka özetlerle örtüşebilir — tekrar olmasın.
- **Test branch (31 Tem)** vs **ana Neon seed** — panel gezmesi için hangisinin kullanıldığı sohbet içinde değişti (önce izole test branch, sonra ana Neon'a da seed'lendi); güncel durum: ana Neon'da test verisi + global içerik.
- **Bu özet asistan context'i dolmadan önceki kısımları kapsar** — en sondaki bazı işlemler (global seed uygulaması, son görsel inceleme) belirsiz kalabilir, kanıtlı envanterle doğrulanmalı.
