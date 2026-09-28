> 📸 DONDURULMUŞ (2026-09-27) — o günün fotoğrafı, güncellenmez. Güncel durum: `docs/otonom/00-KUYRUK.md` (AJ-05 (F-04 kalanı)).
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-27 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş) · etiket: AJ-46/YN-11

# CSP: Report-Only → Zorunlu (enforce) mod geçiş hazırlığı (2026-09-27)

Kaynak: AJ-05 görevi (F-04 kalanı) kapsamında B) maddesi — CSP'yi doğrudan zorunlu moda ALMADIK
(görev tanımı gereği; canlıda gözlem olmadan Next.js inline script/stil kırılabilir). Bu belge
"ne gerekir" sorusunun cevabıdır; geçişin kendisi AYRI bir iş olarak açılacak.

**İncelenen dosyalar:** `frontend/src/lib/securityHeaders.mjs` (CSP tek kaynağı), `frontend/next.config.mjs`,
`frontend/src` altında iframe/script/websocket/eval/font/embed/postMessage/service-worker taraması
(tam liste aşağıda). Yöntem: statik kod taraması — CANLI trafik/ihlal verisi kullanılmadı (§ Bulgu 1'in
sebebi de zaten budur: hiç toplanmıyor).

## Mevcut politika (özet)

```
default-src 'self'
script-src  'self' 'unsafe-inline' (+'unsafe-eval' yalnız next dev)
style-src   'self' 'unsafe-inline'
img-src     'self' data: blob: <api-origin> https://avatars.githubusercontent.com
            https://lh3.googleusercontent.com https://media.licdn.com (+ TENANT_IMAGE_DOMAINS)
font-src    'self'
connect-src 'self' <api-origin>
frame-src   'none'
object-src  'none'
base-uri    'self'
form-action 'self'
frame-ancestors 'none'
```
Başlık adı: `Content-Security-Policy-Report-Only` — tarayıcı hiçbir şeyi ENGELLEMEZ, yalnız ihlali
kendi devtools konsoluna yazar.

## Bulgu 1 (KRİTİK) — İhlal raporu HİÇ TOPLANMIYOR; "rapor izleme" planı şu an boş

`report-uri` / `report-to` directive'i YOK, `Reporting-Endpoints` başlığı YOK, backend'de bir CSP-rapor
ucu YOK (`grep -rn "report-uri\|report-to\|csp-report" frontend/ backend/src` → 0 sonuç). Yani
"Report-Only modunda ihlaller izlenir, sonra enforce'a geçilir" planı **şu ana kadar hiçbir veri
üretmemiştir** — ihlal yalnız o an devtools açık olan tek bir tarayıcı sekmesinde görünür ve kaybolur,
hiçbir yerde biriktirilmez. Enforce'a geçmeden önce bu boşluk kapatılmalı, yoksa "gözlemledik" iddiası
gerçek değil.

**Gereken:** basit bir toplama ucu.
1. Backend'e rate-limitli, PII'siz bir `POST /api/csp-reports` (ya da mevcut `suspicionRoutes.ts`
   yanına benzer küçük bir route) — gövdeyi (`csp-report` JSON, tarayıcı standardı) `SystemLog`'a
   `category: 'CSP_VIOLATION'` ile yazar. **Public** bir uçtur (tarayıcı gönderir, oturum yok) →
   CLAUDE.md "Public endpoint eklerken" kuralı: rate limit + boyut sınırı ZORUNLU (mevcut
   `generalRateLimiter` tenant-key'li olduğu için burada UYGUN DEĞİL — `authRoutes.ts`'teki IP-bazlı
   `loginRateLimiter` deseni uyarlanmalı).
2. `securityHeaders.mjs`'e `report-to: 'csp-endpoint'` directive'i + ayrı `Reporting-Endpoints:
   csp-endpoint="<api-origin>/api/csp-reports"` başlığı eklenir (eski `report-uri` de tarayıcı
   uyumluluğu için birlikte gönderilebilir — Chrome hâlâ onu da destekliyor, Firefox `report-to`'yu
   henüz tam desteklemiyor olabilir; ikisini birlikte göndermek en güvenli yol).
3. En az birkaç gün/hafta **gerçek prod trafiğinde** rapor biriktir, `SystemLog` üzerinden özetle
   (kaç farklı `violated-directive`, kaç farklı `blocked-uri` host'u).

## Bulgu 2 (KRİTİK — bu işle doğrudan ilişkili) — `img-src` allow-list'i kurum logolarını kıracak

AJ-05 bilerek logoUrl'in **alan adını sabit bir listeye kilitlemedi** (herhangi bir https CDN'e izin
verilir; yalnız IP-literal/localhost/özel-ağ/port/userinfo reddedilir, uzantı kısıtlanır). Ama
`img-src` şu an yalnız `'self' data: blob: <api-origin>` + 3 sabit OAuth-avatar host'u
(`avatars.githubusercontent.com`, `lh3.googleusercontent.com`, `media.licdn.com`) + opsiyonel
`TENANT_IMAGE_DOMAINS` env değişkenini kabul ediyor. Repo'da `TENANT_IMAGE_DOMAINS` HİÇBİR
docker-compose/Dockerfile/env dosyasında tanımlı değil (`grep -rn TENANT_IMAGE_DOMAINS` → 0 sonuç
dışında `securityHeaders.mjs`/`next.config.mjs`'in kendisi) → prod'da muhtemelen **boş/varsayılan**.

Sonuç: bir kurum logosunu `https://cdn.kendi-sunuculari.com/logo.png` gibi allow-list'te OLMAYAN bir
domainden servis ediyorsa (ki self-serve akışında bu NORMAL, kısıtlanmadı), CSP şu an **Report-Only**
olduğu için logo yine de render ediliyor (yalnız konsola ihlal yazılıyor). **Enforce'a geçilirse bu
logo tarayıcıda SESSİZCE KAYBOLUR** (img `onError` zaten var, baş-harf rozetine düşer — kırılma
"hata sayfası" değil ama marka görünürlüğü beklenmedik şekilde bozulur, ve kimse neden bilmez çünkü
network sekmesinde "CSP" hatası DevTools'a bakmadan görünmez).

**Üç seçenek (teknik karar, PO'ya sorulmadı — ürün etkisi yalnız "logo bazen görünmeyebilir" riski):**
- **A — `img-src`'i genişlet:** `https:` şemasının tamamına izin ver (host kısıtı kaldır, yalnız şema
  kalır). En basit, AJ-05'in "her https CDN kabul edilir" tasarımıyla tutarlı. Kaybedilen: CSP artık
  görsel kaynağını hiç kısıtlamıyor (zaten AJ-05 kendi katmanında IP-literal/özel-ağ/uzantı kısıtlıyor,
  bu yüzden kayıp sınırlı).
- **B — `TENANT_IMAGE_DOMAINS`'i canlı veriden doldur:** aktif her kurumun `logoUrl` host'unu topla,
  env'e ekle. Kırılgan — yeni kurum her logo değiştirdiğinde env güncellemesi + redeploy gerekir;
  otonom ajan bunu OTOMATİKLEŞTİREMEZ (env/Dokploy = PO eli, 🟡).
  ⚠️ Ayrıca çatı repo'daki `TENANT_IMAGE_DOMAINS`, `images.remotePatterns` (next/image) ile PAYLAŞILAN
  tek kaynak — bu seçenek her iki listeyi de büyütür (bkz. `next.config.mjs:55-58`).
- **C — Logoyu kendi originimizden servis et (proxy/indirme):** kayıt anında backend dış URL'i
  indirip `/uploads`'a kaydeder, `logoUrl` DB'de kendi domainimizi gösterir. En güvenli (img-src zaten
  `<api-origin>`'i kapsıyor, hiçbir genişletme gerekmez) ama en pahalı — indirme = gerçek sunucu-taraflı
  SSRF yüzeyi AÇAR (şimdi backend dış URL'i fetch eder), boyut/MIME doğrulaması + zamanlama/timeout
  gerekir → AYRI, daha büyük bir iş.
- **Benim önerim: A.** B kırılgan ve PO'nun elini her logo değişiminde gerektirir; C bu işin
  kapsamını (SSRF savunması dahil) katbekat büyütür. A, AJ-05'in zaten uyguladığı kısıtları (IP-literal/
  özel-ağ/uzantı reddi) tekrar kullanır, CSP'yi yalnız "şema" seviyesinde tutar — pratikte savunma
  derinliği azalır ama sıfır değildir (hâlâ `data:`/`blob:` dışı her şey `https:` olmalı, `http:`/
  `javascript:` engellenir).

## Bulgu 3 (bilgi amaçlı, engelleyici DEĞİL) — inline script/style zaten dar kapsamlı

Frontend'de tarama (iframe/script/websocket/eval/font/embed/postMessage/service-worker) şunu gösterdi:
- **Sıfır** `<iframe>`, harici `<script src>`, üçüncü taraf analytics/SDK (Sentry/GA/Hotjar/Intercom
  vb. — `error.tsx:11` yorumu zaten "dış hata izleme servisi EKLENMEZ" diyor), WebSocket/socket.io,
  `eval`/`new Function`, harici font linki (yalnız `next/font/google` — build'de self-host), embed
  (YouTube/Maps/Calendly), `document.write`/`postMessage`, service worker/manifest.
- Yalnız İKİ inline `<script>` (`dangerouslySetInnerHTML`): `app/layout.tsx:61` (tema-init FOUC
  önleme) ve `components/atoms/JsonLd.tsx:6-9` (JSON-LD SEO verisi, zaten `<` escape ile XSS-güvenli
  yazılmış). Next App Router'ın kendi hydration payload'ı (`self.__next_f.push(...)`) da inline.
- `connect-src` yalnız `NEXT_PUBLIC_API_URL` origin'ine ihtiyaç duyuyor (tek dış bağımlılık, zaten
  politika bunu kapsıyor).
- Inline `style={{...}}` (React'in kendi stil prop'u) çokça kullanılıyor (ör. preset renk seçici
  butonları) — bunlar HTML `style` ATTRIBUTE'ı üretir, `style-src 'unsafe-inline'` gerektirir; nonce/
  hash bu tür attribute'ları KAPSAMAZ (CSP3 `'unsafe-hashes'` hariç, o da event-handler/style attribute
  için ayrı bir konu, bu işin kapsamı dışı).

**Sonuç:** `script-src`/`style-src`'de `'unsafe-inline'`'i KALDIRMAK (nonce/hash'e geçmek) — mevcut
kod tabanının Server Component + statik render karışımı düşünüldüğünde — Next.js'in her sayfayı
dinamik render'a zorlamasını gerektirir (securityHeaders.mjs'teki mevcut yorum bunu zaten
belirtiyor). **Bu iş kapsamında ÖNERİLMEZ** — maliyet (statik optimizasyon kaybı, ISR/CDN cache
kaybı) kazanca (XSS'e karşı ekstra savunma katmanı; zaten `object-src none` + `base-uri self` +
`form-action self` mevcut) oranla yüksek. `'unsafe-inline'`'i AYNEN KORUYARAK enforce'a geçmek
mümkündür — o zaman script/style tarafında YENİ bir kırılma riski yoktur (Report-Only ile enforce
arasında bu iki directive için davranış farkı olmaz, zaten hepsine izin veriliyor).

## Bulgu 4 (düşük risk, teyit gerekir) — `frame-ancestors` ilk kez aktifleşecek

Tarayıcılar `frame-ancestors`'ı Report-Only modunda YOK SAYAR (tıklama tuzağı/clickjacking koruması
yalnız enforce'ta devreye girer — `securityHeaders.mjs:12-13` bunu zaten belirtiyor). Tarama hiçbir
meşru iframe-içine-gömülme senaryosu bulamadı (partner embed, admin önizleme iframe'i yok) → enforce
sonrası `frame-ancestors 'none'` muhtemelen sorunsuz. **Ek, bağımsız ve düşük riskli bir hızlı kazanım:**
frontend şu an hiç `X-Frame-Options` göndermiyor (yalnız backend `/uploads` için `X-Content-Type-Options:
nosniff` var — `server.ts:78`); `X-Frame-Options: DENY` bugün bile (CSP beklemeden) eklenebilir —
CSP enforce'a kadar geçecek sürede eski tarayıcılar için de clickjacking savunması sağlar. Bu, AYRI ve
bağımsız bir iş olarak açılabilir (bu raporun konusu değil, yalnız fark edildiği için not düşüldü).

## Önerilen sıra (bu rapor kapanınca AYRI iş olarak açılır)

1. Bulgu 1'i kapat: `POST /api/csp-reports` ucu (rate-limitli, PII'siz, `SystemLog` kaydı) +
   `report-to`/`Reporting-Endpoints` başlığı.
2. Bulgu 2'de **A**'yı uygula: `img-src`'i `https:` (şema-geneli) yap.
3. Prod'da gerçek trafikte **en az birkaç gün** rapor biriktir (adım 1'in ürettiği veriyle) — beklenmeyen
   `blocked-uri`/`violated-directive` çıkarsa politika güncellenir, çıkmazsa adım 4'e geçilir.
4. `CSP_HEADER_NAME`'i `Content-Security-Policy-Report-Only`'den `Content-Security-Policy`'ye çevir
   (script-src/style-src içeriği DEĞİŞMEDEN — Bulgu 3 gereği). Bu tek satırlık bir değişikliktir
   (`securityHeaders.mjs:32`), riskin tamamı yukarıdaki 1-3. adımların DOĞRU yapılmasında.
5. Enforce sonrası smoke test: kurum logosu (farklı domain), OAuth login (redirect+callback),
   next/image tenant avatarı, admin/branding önizleme.

## Kapsam dışı bırakılanlar (bu rapor önerilerinde YOK)

- `script-src`/`style-src` nonce/hash'e geçiş (Bulgu 3 — maliyet/kazanç dengesi negatif, ayrı gerekçeli
  bir karar gerektirir).
- `TENANT_IMAGE_DOMAINS`'in env'den doldurulması (Bulgu 2 seçenek B — PO eli, 🟡, önerilmedi).
- Logo proxy/indirme mimarisi (Bulgu 2 seçenek C — SSRF savunması gerektiren ayrı, büyük iş).
