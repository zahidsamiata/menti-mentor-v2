# 00 — CANLI ÇIKIŞ PLANI (kullanıcı almaya başlamak için NE gerekli)

**🔄 YAŞAYAN** (canonical: çıkış önceliği sınıflandırması) · **Oluşturuldu:** 2026-08-23 · **Güncelleme:** 2026-08-25 (FAZ A/B/C)

> **⚡ GÜNCELLEME (2026-08-25):** **K0 güvenlik ilerledi** — madde 38 (G1) + 68 (G3) **düzeltildi → backend PR #51 (MERGE OLMADI).**
> Kalan K0: madde 39 (G2, migration+PO) · repo private · KVKK metinleri (envanter HAZIR: `../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md`).
> **K1-şüpheli çözüldü (FAZ B kod-teyidi):** T7 opt-in → **K2 değil bloker** (varsayılan görünür); `maxMeetingsPerWeek` → **enforce EDİLMİYOR** (madde 79, 🟡 K1/K2). 9b indirmesi **doğru** (görünür yalan yok).

> **Bu belge NE:** Ürün canlı ayakta, gerçek kullanıcı ~sıfır. Amaç **kullanıcı almaya başlamak.** Açık iş 4 belgeye dağılmıştı;
> bu belge onları **tek çıkış planına** sınıflandırır (K0-K5) ve yürütülebilir turlara böler. **Mevcut belgelerin YERİNE geçmez** —
> detay `10-yol-haritasi.md` (kuyruk) + `00-KARAR-TAKIP.md` (kanıt) + `09-DURUM.md` (ne oldu). Bu belge yalnız **öncelik/çıkış bakışı** verir.
> Her satır kaynak madde numarasını taşır; statü tutmaz, referans verir (KURAL 7/8).
>
> ⚠️ Ad notu: kök `kararlar/`'daki bu belge, `kararlar/konu/11-tasarim-kararlari-...`'dan FARKLIDIR (o tasarım kararları, bu çıkış planı).
> **Varsayılan = ERTELE.** Bir madde "çıkış öncesi" kalabilmek için NEDEN bloker olduğunu KANITLAMAK zorundadır. Şüphede → çıkış sonrası.

## ⚡ TEK BAKIŞTA — çıkmak için kaç iş kaldı
> ~40 madde "v1" görünüyordu; **KATI test sonrası gerçek çıkış-bloker sadece 5 K0 + 1-2 K1.** Gerisi çıkış-sonrası veya v2.

| Kategori | Sayı | Bir cümle |
|---|:---:|---|
| **K0 — 🔴 yasal/güvenlik bloker** | **5** | Çıkıştan ÖNCE MUTLAKA: 2 PII sızıntısı + KVKK silme + repo private + hukuki metinler |
| **K1 — 🟠 çıkış öncesi şart** | **1 (+2 şüpheli)** | Foto volume (veri kaybı) · şüpheli: mentör opt-in FE + görüşme limiti (TEYİT GEREK) |
| **K2 — 🟡 çıkış sonrası ilk dalga** | ~18 | KVKK FE, analytics+çerez, retention (Y1-Y4), UX düzeltmeleri, www-301 |
| **K3 — 🔵 sonra / v2** | ~28 | v2 (14-28) + ölü/temiz kod + SEO paketi çoğu + ileri-faz |
| **K4 — 🟣 PO manuel** | 22 | Kod değil: env, altyapı güvenliği, canlı testler, denetim gözden geçirmeleri |
| **K5 — ❓ keşif/karar** | 10 | PO'nun cevaplaması gereken sorular (aşağıda numaralı) |

**En önemli sonuç:** Ürünü **bugünkü haliyle + 5 K0 + foto volume** ile kullanıcıya açabilirsin. Diğer her şey çıkıştan sonra.

---

## K0 — 🔴 YASAL / GÜVENLİK BLOKER (çıkıştan önce MUTLAKA biter)
> Test: "Gerçek kullanıcı verisi girerse yasa ihlali / veri sızıntısı / geri-alınamaz zarar mı?" — hepsi net EVET.

| kod | iş | gerekçe (testi nasıl geçti) | kaynak | boy | migration | tur |
|---|---|---|---|:---:|:---:|:---:|
| **madde 38** (G1) | `updateUser` (+2 kardeş uç) `select`siz → **password hash + PII sızıntısı** | Veri sızıntısı EVET: `PATCH /users/:id` bcrypt hash + email/CV/discVector döner; repo PUBLIC → dışarıdan okunur | `userController.ts:272,355,418`; KT F.1 | S | Hayır | **Tur-1** |
| **madde 68** (G3) | `listSuspicionReports` `select`siz → **şikayet edenin PII'si maskesiz** | PII sızıntısı EVET: şüphe raporu edenin kimlik/iletişim'i maskesiz döner (`maskEmail` deseni atlanmış) | `platformController.ts:353`; KT F.1 | S | Hayır | **Tur-1** |
| **madde 39** (G2) | `hardDeleteUser` FK-RESTRICT → **KVKK Md.7 silme çalışmıyor** | Yasa ihlali EVET: kullanıcı silme talebi karşılanamaz (transaction rollback; kod-yorumu itiraf ediyor) | `gdprService.ts:171-174`; KT F.1 | M | **Olası (SetNull)** | **Tur-3** |
| **repolar PRIVATE** | Çatı + backend repo PUBLIC → private yap | Güvenlik EVET: G1/G3 açık konumları + tüm kaynak dışarıdan okunur | KT E; 10-yol:229 | — | Hayır | **Tur-0 (PO)** |
| **KVKK metinleri** | Aydınlatma/gizlilik/çerez metni **taslak → gerçek/hukuki** | Yasa EVET: gerçek PII (DISC/kişisel) taslak metinle toplamak KVKK ihlali (sayfalar kodda var, metin taslak) | KT:140; 10-yol:64 | — | Hayır | **Tur-0 (PO)** |

## K1 — 🟠 ÇIKIŞ ÖNCESİ ŞART (ürün çalışmaz / kullanıcı kaybı)
| kod | iş | gerekçe | kaynak | boy | migration | tur |
|---|---|---|---|:---:|:---:|:---:|
| **foto volume** | Dokploy `/app/uploads` **kalıcı volume** + `UPLOAD_DIR` + yazma izni | Sistem sessizce yanlış EVET: kalıcı volume yoksa yüklenen fotolar **her redeploy'da SİLİNİR** (veri kaybı) | 10-yol:228; devir 05 | — | Hayır | **Tur-0 (PO)** |

### K1-ŞÜPHELİ (⚠️ TEYİT GEREK — doğrulanırsa K1, değilse K2; şüphede erteledik)
| kod | iş | neden şüpheli — ne teyit edilecek | kaynak |
|---|---|---|---|
| ~~madde 75 (T7)~~ | ~~Mentör opt-in FE~~ | ✅ **ÇÖZÜLDÜ (FAZ B): K1 DEĞİL → K2.** `mentorVisibilityEnabled @default(true)` (varsayılan görünür) + alan hiçbir eşleşme sorgusunda okunmuyor → opt-in eşleşmeyi bloklamıyor. (Yan: alan ölü → madde 86.) | `matching.ts:357-373` |
| ~~maxMeetings~~ | Görüşme limiti enforce | ⚠️ **ÇÖZÜLDÜ (FAZ B): enforce EDİLMİYOR** → `bookMeeting`'te haftalık sayım yok, menti limitsiz açar (sessiz yanlış). **Madde 79** olarak takibe alındı (🟡 K1/K2 — PO önceliklendirir; yasal/veri değil → çıkışı sert bloklamaz). | `meetingController.ts:337-450` |

---

## ⭐ TUR PLANI (K0 + K1 — çalıştırma sırasına dizili)
> **Migration turu ASLA paralel değil — tek başına, en sona.** Farklı dosya + bağımsız → paralel; aynı dosya/bağımlı → sıralı; şüphede sıralı.

| Sıra | Tur | Maddeler | Paralel/Sıralı | Migration | PO durağı | Ön koşul |
|:---:|---|---|---|:---:|---|---|
| **0** | **PO manuel** (kod turlarına PARALEL — PO bekletilmez) | repolar PRIVATE · foto volume · KVKK metinleri (hukuk) | — (PO işi) | Hayır | — | yok; hemen başlar |
| **1** | **Güvenlik (kod)** | madde 38 (G1 `userController`) + madde 68 (G3 `platformController`) | **PARALEL** — ayrı dosyalar, bağımsız, migration yok | Hayır | PR onayı | repolar PRIVATE (Tur-0) önce/eşzamanlı |
| **2** | **K1-şüpheli teyit** (salt-okuma) | T7 opt-in + maxMeetings enforce kod-teyidi | Sıralı (küçük) | Hayır | K5-soru 3/4 cevabı | — |
| **3** | **KVKK silme (migration)** | madde 39 (G2 hardDeleteUser FK→SetNull veya zincir) | **TEK BAŞINA** — migration, geri-alınamaz | **Evet** | PO: sil mi anonimleştir mi (K5-soru 2) | Tur-1 sonrası; staging önerilir |

**Kural:** Tur-1 iki dosyaya dokunur ama **farklı** dosyalar (userController ↔ platformController) → paralel güvenli. Tur-3 migration içerdiği için **asla** Tur-1/2 ile paralel değil, en sona ve tek başına.

---

## K4 — 🟣 PO MANUEL (kod değil; kod turlarına paralel yürür)
> Kaynak: AJAN-4 denetimi (34 kalem → 22 uygulanır; 12 pazarlama-sitesi artığı elendi — aşağıda "elenen").

**Çıkış-öncesi (K0/K1 ile birlikte):** repolar PRIVATE (15 dk) · foto volume Dokploy (30-60 dk) · KVKK/gizlilik/çerez metinleri hukuki (2-4 saat) · sunucu/altyapı güvenliği HTTPS/firewall/SSH/SSL/yedek (yarım-tam gün) · yedekleme geri-dönüş denemesi (1-2 saat) · uygulama-içi sayfalar `noindex` teyidi (15 dk).
**Çıkış-anı testleri:** chat uçtan uca (30-45 dk) · mentör paneli metrikleri canlı gözlem (20 dk) · boş-durum + hata/yükleniyor ekranları (1-2+1-2 saat) · mobil kullanılabilirlik yönetici tabloları (2-4 saat).
**Çıkış-sonrası (mail açılınca):** 37m kurum maili `destek@`+SMTP env (1-2 saat) · mail akışları uçtan uca test (30 dk).

**❌ ELENEN — pazarlama-sitesi artığı (bu ürün login'li SaaS, uymaz):** portfolyo · harita/lokasyon · müşteri yorumları/testimonial · ekip fotoğrafı · "hizmetlerimiz" sayfası · satış hero/sticky-CTA (zaten var) · SEO iç-linkleme · teşekkür sayfası · breadcrumb · SSS/FAQ · pazarlama "site hızı". (Gerekçe: KVKK/kişi-adı yasağı + fonksiyonla ilgisiz + login akışında satış hunisi yok.)

---

## K5 — ❓ KEŞİF / KARAR (PO'nun cevaplaması gereken sorular)
1. **Çıkışta Google Analytics/izleme olsun mu?** EVET → çerez-izni bandı (madde 67) + analytics (madde 56) **K0'a yükselir** (çıkıştan önce, KVKK). HAYIR → ikisi de çıkış-sonrası (K2), banner yasal olarak gerekmez (functional/auth cookie'ler rıza istemez). *(#110 zaten merge-kilitli — bu karar onu çözer.)*
2. **KVKK kalıcı silme (G2/madde 39): SİL mi ANONİMLEŞTİR mi?** Kullanıcı verisi tamamen silinsin (FK zinciri) mi, istatistik için anonimleştirilsin (userId→null, SetNull) mi? Migration tasarımı + Tur-3 buna bağlı.
3. ~~Mentör opt-in (T7):~~ ✅ **CEVAPLANDI (FAZ B):** opt-in eşleşmeyi bloklamıyor (varsayılan görünür); alan ölü → K2/madde 86.
4. ~~Görüşme limiti:~~ ✅ **CEVAPLANDI (FAZ B):** `maxMeetingsPerWeek` enforce EDİLMİYOR → madde 79 (🟡). PO: K1 mi K2 mi önceliklendir.
5. **Kulüp modülü (madde 41) + feedback-logs (madde 42):** canlıya girecek özellik mi, yarım-terk mi? (backend tam, FE 0 çağrı)
6. **İçerik & Soru Felsefesi keşfi + DISC-DERİNLEŞME kurgusu (#31/#13/#30):** ne zaman? (çıkış-sonrası büyük içerik turu — kod öncesi keşif şart)
7. **Sertifika baraj "0 puan" (T4/madde 72):** tüm sorularda mı, yalnız `isRedLine`'da mı?
8. **Manuel eşleştirme (T8/madde 76):** strateji "elle eşleştirme YASAK" der, envanter "eksik" der — hangisi geçerli?
9. **Etiket-gerçek çelişkisi:** `oz-denetim/durum-panosu-2026-08-14` → 📸'ye düşsün mü + 2 belge ad-düzeltmesi (KT Bölüm E)?
10. **Bilinçli terk adayları (sil PO kararı):** `MeetingScheduler.tsx` · `iceBreaker.ts` · `PATCH /users/me/social` · `/users/:id/self-profile` — terk mi, bağlanacak mı?

---

## K2 — 🟡 ÇIKIŞ SONRASI İLK DALGA (özet — detay 10-yol/KARAR-TAKIP)
> Tek satır + kaynak; detay kopyalanmaz. Çıkıştan hemen sonra öncelikli sırada.
- **KVKK FE üçlüsü** (madde 40) — export/anonimleştirme/silme FE (başta manuel/e-posta ile köprülenir; backend silme=G2 K0'da).
- **Analytics + çerez bandı** (madde 56+67, KOŞULLU — K5-soru 1) — ikisi birlikte; #56 asla #67 olmadan canlıya alınmaz.
- **Güvenlik-inceliği:** madde 71 (T3 SuspicionReport tenant-izolasyon — platform-admin kapsamı, aktif sızıntı değil).
- **UX düzeltmeleri:** madde 69 (T1 validation mesajı) · 70 (T2 adaptive progress) · 50/64 (a11y/WCAG başlangıç).
- **Retention (persona):** Y1 bekleme anı · Y2 ret yumuşatma+kutlama · Y3 yönetici export/oran · Y4 eşik-alarm.
- **Kalibrasyon:** 9a+9b (birlikte; 9b tek başına kullanıcıya görünür yalan DEĞİL — 9a olmadan gösterim=motor=60/40 tutarlı).
- **Panel/akış:** madde 43 (şikayet inceleme FE) · 77 (T9 platform drill-down) · 78 (T10 mentör takdir) · 66 (www→301 SEO-kanonik).
- **Mail:** madde 6 / 37m (kurum onay-ret maili — PO env açar).

## K3 — 🔵 SONRA / v2 (özet)
- **v2 (madde 14-28):** sektör skoru canlı bağlama, eşleştirme birleştir, tenant hard-delete, hayalet mod+CSV davet, staging, privacy center, RLS lint vb. (tanımı gereği ileri-faz/staging-şart).
- **Ölü/temiz/perf kod:** madde 44 (kesin-ölü sil) · 45 (yarım-özellik bağla) · 46 (radix paketleri) · 47 (temiz-kod borcu) · 48 (N+1/pagination) · 49 (enum/çift-rol).
- **SEO paketi (landing):** madde 51-55,57-63,65 (favicon/OG/sitemap/robots/lang/kurumsal sayfalar/JSON-LD/semantik/WCAG/tema).
- **İleri:** Y5 kapasite · Y6 seed doğrulama · Y7 platform metrik · K6 admin server-guard · madde 74 (T6 API konsolidasyon) · 13/31/DISC-DERİNLEŞME (içerik keşfine bağlı).

---

## 🎯 ŞİMDİ NE YAP — PO için ilk 3 somut adım
1. **Tur-0'ı başlat (bugün, ~1 saat):** repoları PRIVATE yap (15 dk) + foto volume Dokploy ayarı (30-60 dk). İkisi de kod beklemez.
2. **K5-soru 1 ve 2'yi cevapla:** (a) çıkışta analytics olacak mı? (b) KVKK silme: sil mi anonimleştir mi? — bu ikisi Tur-3 ve çerez kapsamını belirler.
3. **Tur-1'i onayla (güvenlik kod turu):** madde 38 + 68 paralel düzeltilir (küçük, migration yok) → PR → merge. Ardından KVKK metinleri (hukuk) + Tur-3 (G2 migration).

> Bu 3 adım + KVKK metinleri = **çıkışa hazır.** Gerisi kullanıcı akarken yapılır.
