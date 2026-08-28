# BİLANÇO KARAR DOSYASI — G8: Altyapı / Deploy / PO Manuel İşler

**📸 DONDURULMUŞ** · 2026-08-27 (Tur-5b) · Kaynak: `docs/raporlar/bilanco/kararlar/00-SAYIM-2026-08-27.md` (c/G8) + `docs/raporlar/bilanco/karar-defteri-2026-08-26.md` (GRUP 8)

> **Ne bu:** G8 grubundaki her kalem için PO'nun tek tek karar verebileceği sade kartlar. Bu grubun çoğu **PO-manuel** iş (deploy ayarı, canlı gözlem, ortam temizliği). Kod/dosya iddiaları geniş grep + `ls` ile teyit edildi (yalnız okundu; kod değişmedi).

---

## MUTABAKAT (dosya başı)

- **Tur-5a beyanı (G8):** 17 kalem.
- **Bu dosyada:** 14 karar kartı + 3 ✅ (kart yok, "zaten yapılmışlar" bölümünde) = **17**. ✅ Beyan TUTUYOR.
- **Durum dağılımı (14 kart):** ⬜ 10 · ❓ 3 · 🟡 1 · (🗑️ 0). Ayrıca ✅ 3 (kart yok).
- **Kod-teyidi yapılan iddia:** 7. **Çürüyen (yanlış-pozitif): 0** — kontrol edilen tüm iddialar (foto-volume yok, `.env.backup-anaDB` var, staging yok, `Menti Mentör proje/` silindi, rate limiter in-memory, `.env.test`+guard var, `listUsers` sayfalama var) DOĞRULANDI. **❓ (arandı, sonuç net değil): 0.**
- **PO okuma süresi:** ~14 kart × ~1.25 dk ≈ **~17,5 dk**.

---

## KARARLAR

---
**[G8-01] Fotoğraf yükleme için kalıcı disk alanı (Dokploy volume) — MERGE ÖNCESİ ŞART**
Ne: Kullanıcı fotoğrafları sunucuda `/app/uploads` klasörüne yazılıyor; ama sunucuda bu klasör kalıcı disk (volume) olarak tanımlı değil. Her yeniden dağıtımda (redeploy) yüklenen fotoğraflar silinir. Volume tanımı + klasör sahipliği (uid 1001) ayarı + redeploy sonrası test gerekiyor.
Neden başlanmıştı: Fotoğraf yükleme özelliği eklendi (backend hazır); kalıcılık için altyapı adımı şart.
Nerede durdu: Deploy ayarı PO elinde; docker-compose'a volume eklenmemiş.
Bugünkü durum: ⬜
Etkisi: Şu haliyle canlıya çıkılırsa her deploy'da kullanıcı fotoğrafları kaybolur — merge öncesi kritik.
İş boyu: PO-manuel (deploy ayarı)
Kaynak: karar-defteri (A22 foto-volume) · Numara: A22
(teyit) `docker-compose.yml`'de yalnız postgres için volume var; `uploads`/`/app/uploads` volume tanımı YOK — bilanço iddiası DOĞRULANDI.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: 🔴 ÇIKIŞ BLOKERİ — kalıcı disk yoksa her deploy kullanıcı fotoğraflarını siler.
---
**[G8-02] Ortam değişkeni teyidi (`UPLOAD_DIR` + backend/API adresleri)**
Ne: Sunucuda fotoğraf klasörü yolu (`UPLOAD_DIR=/app/uploads`) ve backend/API adres ayarlarının (`BACKEND_URL` / `NEXT_PUBLIC_API_URL`) doğru tanımlı olduğunun teyidi. G8-01 volume işiyle birlikte gider.
Neden başlanmıştı: Fotoğraf yükleme + doğru API adresi için ortam ayarı.
Nerede durdu: Deploy/ortam ayarı PO elinde.
Bugünkü durum: ⬜
Etkisi: Yanlış/eksik ortam değişkeni → fotoğraf yolu veya API çağrıları canlıda kırılabilir.
İş boyu: PO-manuel (ortam ayarı)
Kaynak: karar-defteri (NUMARASIZ) · Numara: NUMARASIZ
(teyit bağlamı) kod ayarı `config.upload.dir` üzerinden okunuyor; asıl teyit canlı ortam değişkenlerinde (PO).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G8-03] Sohbet (chat) özelliğinin canlıda uçtan uca testi**
Ne: Mesajlaşma akışının canlı ortamda baştan sona denenmesi: konuşma başlatma, çan/bildirim, "okundu" işareti ve ilgili mail. PO gözlemi gerekiyor.
Neden başlanmıştı: Chat özelliği eklendi; canlı doğrulama yapılmadı.
Nerede durdu: PO canlı-gözlem adımı.
Bugünkü durum: ⬜
Etkisi: Doğrulanmazsa canlıda mesajlaşma pürüzleri kullanıcıda ilk elden çıkabilir.
İş boyu: PO-manuel (canlı gözlem)
Kaynak: karar-defteri (A22) · Numara: A22

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G8-04] Mentör paneli metriklerini canlıda gözle görme**
Ne: Mentör panelindeki sayı/metriklerin (görüşme sayısı vb.) canlı veriyle doğru göründüğünün PO tarafından gözlemlenmesi.
Neden başlanmıştı: Mentör paneli metrikleri eklendi; canlı doğrulama yapılmadı.
Nerede durdu: PO canlı-gözlem adımı.
Bugünkü durum: ⬜
Etkisi: Metrik yanlış görünürse mentör deneyimi ve güven zedelenir.
İş boyu: PO-manuel (canlı gözlem)
Kaynak: karar-defteri (A22) · Numara: A22

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G8-05] Kullanılmayan yedek ortam dosyasını sil (`.env.backup-anaDB`)**
Ne: Ana veritabanına geçiş sırasında bırakılmış yedek ortam dosyası hâlâ duruyor. Geçiş bittiğine göre bu dosya silinmeli (sır/eski bağlantı barındırabilir).
Neden başlanmıştı: Ortam geçişi sırasında güvenlik amaçlı yedek alınmıştı.
Nerede durdu: Geçiş bitti ama dosya silinmedi (unutuldu).
Bugünkü durum: ⬜
Etkisi: Eski veritabanı bağlantı bilgisi diskte kalmaya devam eder (hijyen/güvenlik).
İş boyu: S (PO-manuel silme)
Kaynak: karar-defteri (NUMARASIZ, depo:25) · Numara: NUMARASIZ
(teyit) `backend/.env.backup-anaDB` dosyası HÂLÂ VAR (`ls` mevcut) — bilanço iddiası DOĞRULANDI.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G8-06] Ortam temizliği (birleşmiş worktree/branch/geçici script sil)**
Ne: Artık işi biten geliştirme dallarının (branch), çalışma kopyalarının (worktree) ve geçici scriptlerin temizlenmesi. Bir kısmı 2026-08-26'da silinmiş; git teyidi kısmi.
Neden başlanmıştı: Depo/çalışma alanı hijyeni.
Nerede durdu: Kısmen yapıldı (yerel+uzak birkaç dal silindi); tam tarama kalmış.
Bugünkü durum: ⬜
Etkisi: Dağınık dal/worktree birikimi kafa karışıklığı ve disk israfı yaratır.
İş boyu: S (PO-manuel + git)
Kaynak: karar-defteri (md.28 v2) · Numara: md.28(v2)

🟡 **YARIM — GÜNCELLEME (2026-08-28, Faz 1b, çatı PR #129):** **12 merged yerel dal `-d` (güvenli) ile silindi** (chore/pointer-bump-53-54 + docs/{belge-bilancosu,belge-duzeni-reorg,claude-md-duzeltme,eslestirme-kesfi,faz1a-belge-duzeni,icerik-kesfi,karar-dosyalari-sayim,oncelik-siralama,oturum-tezi,po-kararlari,tasarim-belgesi}). **Korundu:** `main`, güncel çalışma dalı, `#110` dalı (`feat/analytics-seo-2026-08-22`), unmerged dallar (ci/github-actions, docs/merge-turu-devir, feat/{chat-messaging,claude-md-update,platform-panel-deep,register-error-ux,security-audit-2-fixes}). Worktree temizliği gereksiz (yalnız ana dizin). **⬜ Kalan: uzak merged dallar SİLİNMEDİ** — remote mutation (dışa-dönük) → PO onayına bırakıldı (adaylar: origin/chore/pointer-bump-52 · origin/docs/* merged · origin/feat/kalibrasyon-aktor-izi-fe).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G8-07] Ayrı test/önizleme ortamı (staging)**
Ne: Canlıya çıkmadan önce değişiklikleri deneyeceğiniz ayrı bir ortam: `staging.sivilkapasite.org` + ayrı Neon veritabanı dalı + Dokploy'da 2. uygulama + ayrı ortam dosyası. Şu an hiç yok. Yük testi ve çok-instance işlerinin (G8-10, G8-11, G8-13) ön-koşulu.
Neden başlanmıştı: Güvenli test ortamı ihtiyacı.
Nerede durdu: Hiç kurulmadı.
Bugünkü durum: ⬜
Etkisi: Staging olmadan riskli değişiklikler doğrudan canlıda denenir; birçok kapasite işi bloklanır.
İş boyu: PO-manuel (altyapı kurulumu)
Kaynak: karar-defteri (md.27 v2) · Numara: md.27(v2)
(teyit) `*staging*` adlı hiçbir dosya YOK (grep sonucu boş) — bilanço iddiası DOĞRULANDI.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G8-08] İzole test veritabanı (`TEST_DATABASE_URL` + Neon test dalı)**
Ne: Testlerin canlı veritabanına dokunmadan çalışması için ayrı bir test veritabanı. Koruma (guard) ve `.env.test` dosyası mevcut; kalıcı `TEST_DATABASE_URL` ve ayrı Neon dalı kurulumu PO elinde.
Neden başlanmıştı: Testlerin canlı Neon'a yazma/silme riskini önlemek.
Nerede durdu: Guard + `.env.test` hazır (yarım); kalıcı izole dal PO adımı.
Bugünkü durum: 🟡
Etkisi: Kalıcı izole DB kurulmazsa lokal test yeşili aldatıcı olur (asıl kanıt CI'da) — CLAUDE.md'de not edilmiş risk.
İş boyu: PO-manuel (Neon dalı kurulumu)
Kaynak: karar-defteri (md.İŞ2) · Numara: md.İŞ2
(teyit) `backend/.env.test` VAR + `backend/tests/helpers/assertTestDatabase.ts` guard VAR — "guard var, izole branch PO adımı" DOĞRULANDI.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Faz 0-park (PO manuel). Kalıcı izole test DB kurulmadan lokal test yeşili ALDATICI — asıl kanıt CI'da.
---
**[G8-09] Veritabanı bağlantı havuzu + mail görevlerinin sıralı çalışması (canlı sonrası)**
Ne: Veritabanı bağlantı sayısı sınırlanmamış (`connection_limit` yok) ve mail gönderim görevi sırayla (seri) bekliyor. Yoğunlukta bu darboğaz olabilir; canlı sonrası yük testinde ele alınacak.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (kapasite denetimi notu).
Nerede durdu: Canlı sonrasına bırakılmış; staging yük testine bağlı.
Bugünkü durum: ❓
Etkisi: Yoğun trafikte bağlantı tükenmesi veya mail gecikmesi riski (düşük-orta, canlı-sonrası).
İş boyu: PO-manuel + geliştirme (staging gerekli)
Kaynak: karar-defteri (NUMARASIZ, 02:48-49) · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G8-10] Eşleştirme önbelleği yok + sabit `take:500` (canlı sonrası)**
Ne: Eşleştirme hesabı önbelleklenmiyor ve her seferinde en fazla 500 kayıt üzerinden çalışıyor (kişi sayısı arttıkça yavaşlar). Canlı sonrası ölçeklenme işi.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (kapasite denetimi notu).
Nerede durdu: Canlı sonrasına bırakılmış.
Bugünkü durum: ⬜
Etkisi: Büyük kurumlarda eşleştirme yavaşlar; 500 üstü kayıtta eksik hesap riski.
İş boyu: M (geliştirme, canlı-sonrası)
Kaynak: karar-defteri (NUMARASIZ, kapasite :26-31) · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G8-11] Hız sınırlayıcı (rate limiter) tek sunucu hafızasında — çok sunucuda Redis gerekir**
Ne: İstek hız sınırı şu an tek sunucunun hafızasında tutuluyor. Birden çok sunucu örneği (instance) çalışırsa sınır her örnekte ayrı sayılır ve zayıflar; ortak bir depo (Redis) gerekir. Ayrıca genel sınırlayıcı kuruma göre anahtarlı olduğundan herkese açık uçlarda zayıf.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (kapasite/güvenlik denetimi).
Nerede durdu: Tek örnekle çalışıldığından ertelendi; çok-örnek senaryosuna bağlı.
Bugünkü durum: ⬜
Etkisi: Çok sunuculu kuruluma geçilirse hız sınırı etkisiz kalır (kötüye kullanım/DoS riski).
İş boyu: M (geliştirme)
Kaynak: karar-defteri (md.02:50 / E2) · Numara: md.02:50 / E2
(teyit) `rateLimiter.ts` sayaçları `new Map` ile hafızada tutuyor ("in-memory sliding window") ve `generalRateLimiter` tenant-anahtarlı — bilanço iddiası DOĞRULANDI.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G8-12] Zamanlanmış görevlerin (cron) çok sunucuda çift çalışma riski**
Ne: Zamanlanmış işler (mail cron, temizlik vb.) uygulama içinde (`node-cron`) çalışıyor. Birden çok sunucu örneği olursa aynı iş iki kez tetiklenebilir; tek-örnek staging veya kilit mekanizması gerekir.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (kapasite denetimi notu).
Nerede durdu: Tek örnekle sorun yok; çok-örneğe bağlı.
Bugünkü durum: ⬜
Etkisi: Çok sunuculu kurulumda çift mail/çift işlem riski.
İş boyu: M (geliştirme)
Kaynak: karar-defteri (NUMARASIZ, kapasite :38) · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G8-13] Sekmeler arası geçişte yavaşlık (istemci önbelleği)**
Ne: Panelde sekmeler arasında geçerken bir yavaşlık raporlanmıştı (API çağrı sarmalayıcısının kararlı referansı / önbellek turu). Düzeldiği teyit edilmemiş.
Neden başlanmıştı: Performans şikâyeti (teşhis notu).
Nerede durdu: DURUŞ SEBEBİ YOK — düzeldi mi teyit edilmemiş.
Bugünkü durum: ❓
Etkisi: Sürerse gündelik panel kullanımı hantal hissettirir.
İş boyu: S (teyit + gerekirse fix)
Kaynak: karar-defteri (E17 / B10) · Numara: E17 / B10

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G8-14] Sol-alt kullanıcı kartı / açılır menü**
Ne: Panelde sol-alt köşedeki kullanıcı kartı ve açılır menünün eklenip eklenmediği belirsiz; teyit edilmemiş.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (arayüz notu).
Nerede durdu: DURUŞ SEBEBİ YOK — eklendi mi teyit yok.
Bugünkü durum: ❓
Etkisi: Küçük UX bileşeni; eksikse gezinme/oturum menüsü tutarsız olur.
İş boyu: S (teyit + gerekirse ekleme)
Kaynak: karar-defteri (B12) · Numara: B12

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## Bu grupta zaten yapılmışlar (✅ — kart yok)

- ✅ **Repoları PRIVATE yapma** (kod depolarını gizli/özel yapma): 2026-08-25 PO tarafından yapıldı; belgedeki "yap" satırı bayat kalmıştı. (karar-defteri: A22/H3)
- ✅ **`Menti Mentör proje/` belirsiz kök klasör**: klasör ARTIK YOK — temizlendi. (karar-defteri: NUMARASIZ, depo:18) — kod teyidi: `ls` ile klasör bulunamadı (GONE).
- ✅ **`listUsers` sayfalama** (kullanıcı listesinde sayfalama, canlı-öncesi): eklendi (`userController.ts` pageSize/skip/take). (karar-defteri: NUMARASIZ, kapasite:12/TH1)
