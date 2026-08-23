# STK Admin Paneli — 13 Bulgu Envanteri (2026-08-11)

**📸 DONDURULMUŞ (2026-08-11)** — STK admin keşif/bulgu envanteri.

> **İLERLEME: 13/13 bulgu tamamlandı.** Salt-okuma keşif; kod/DB değiştirilmedi, DB'ye bağlanılmadı.
> Kaynak: ürün sahibi ekran gözlemleri + 3 paralel salt-okuma kod keşfi (backend `afc2769`, çatı `da6a138`).
> Amaç: her bulgu için "backend hazır mı / ön yüz eksik mi" + iş büyüklüğü. Nihai öncelik ürün sahibinde.
>
> **Ana eksen:** "arka-var-ön-yok" = backend kodu HAZIR, ön yüze çıkmamış → **az işle çok kazanç**.

## Özet tablo

| NO | Bulgu | Backend durumu (dosya:satır) | Eksik ne | Tip | S/M/L |
|---|---|---|---|---|---|
| **B1** | Şifre göster/gizle (göz) butonu yok | Frontend işi — `register/_RegisterContent.tsx:78-126` `PasswordField` (göz VAR); `FormField.tsx:20-44` (toggle yok) | Login + reset-password ekranlarına `PasswordField` deseni taşınacak (register'da hazır kopyalanır). Forgot = e-posta, konu dışı | yarım-özellik | **S** |
| **B2** | Sol menü sıralama/gruplama | `frontend/(admin)/layout.tsx:20-40` PRIMARY_NAV (3) + ADVANCED_NAV (12) | — (mevcut yapı raporlandı; gruplama PO tasarım kararı) | tasarım-kararı | — |
| **B3** | Havuz "Sektörler" kolonu hep "—" | `sectorTags` backend select EDİLİYOR (`adminController.ts:194-206`); frontend render HAZIR (`mentor-havuzu/page.tsx:99-140`) | Veri boş: kullanıcılar `sectorTags` doldurmamış + doldurma/editör akışı zayıf. Gösterim/veri değil, **veri-girişi** boşluğu | tasarım-kararı (+ veri girişi) | — |
| **B4** | DISC gösterimi tek harf (D/I/S/C) | Backend'de tek tipin YANINDA vektör/dağılım VAR: `schema.prisma:239` (discType) + `:275` (discVector Json) + `:932-935` (UserProfile discD/I/S/C); `discVectorService.ts:95-158`. **Admin API sadece discType döner** (`adminController.ts:255`; discVector KVKK gereği maskeli, `:4-6`) | İkincil/karma tip veya % dağılım backend'de var ama havuzda gösterilmiyor. **Nüans:** ham vektörü göstermek KVKK maskeleme kuralına takılabilir → gösterim biçimi kararı gerek | arka-var-ön-yok (KVKK nüanslı) | **S** |
| **B6** | Algoritma Kalibrasyon sayfası çok boş | Backend ZENGİN: `algorithmTuner.ts:28-233` — ağırlıklar `Tenant.tenantVocabulary.algorithmWeights` (varsayılan sektör 0.60/DISC 0.40), NPS-bazlı öneri (cron), onay/red akışı. Endpoint'ler: `GET .../algorithm-tuner/pending`, `POST .../approve`, `.../reject`, `.../run-tuning` (`adminRoutes.ts:70-76`) | Frontend SADECE bildirim sıklığı + bekleyen öneri gösteriyor (`algorithm-tuner/page.tsx`). Eksik: mevcut ağırlıkları göster + elle düzenle UI, kalibrasyon geçmişi, NPS trend grafiği | **arka-var-ön-yok** | **M** |
| **B7** | Yöneticiler sayfası sadece liste | Backend TAM: `promoteToAdmin`/`demoteFromAdmin` (`adminController.ts:689-760`), max 3 admin, son-admin koruması; `GET /api/admin/managers`. **API client'te `promoteToAdmin` bile tanımlı** (`admin.ts:114-115`) | Frontend liste + demote var; **promote (atama) butonu/dialog YOK** — endpoint+client hazır, UI'a bağlanmamış | **arka-var-ön-yok** | **S** |
| **B8a** | "Kuruma özel sorular DISC'i etkilemez" | DOĞRU: `STK_CUSTOM` vs `DISC_ASSESSMENT` kategori ayrımı (`schema.prisma`, `questionService.ts:94-96`); STK_CUSTOM DISC hesabına girmiyor. Ekran metni kodla uyumlu | — | doğru-çalışıyor | S |
| **B8b** | Yeni soru formu cevap tipi (şıklı/açık uçlu) sormuyor | Backend cevap-tipi (answerType) alanı/enum'u **YOK**; Likert (1-5) sabit | Şıklı/açık-uçlu desteği hiç yok — schema + form + puanlama eklenmeli (gerçek yarım özellik) | yarım-özellik | **M** |
| **B8c** | Sorular kullanıcıya gösterim + cevap saklama | DOĞRU: `UserResponse` modeli + tenant izolasyonu; STK_CUSTOM zenginleştirme için saklanıyor | — | doğru-çalışıyor | S |
| **B10** | CORE/DEEPENING form/liste | Backend enum + form dropdown TAM (aşağıda B9 ile Türkçeleştirme ayrımı) | — (işlev tam; sadece görünen metin İngilizce → B9) | doğru-çalışıyor | S |
| **B11** | Yeni soru formunda tek seçenekli dropdown | Backend enum 2 değer: `DISC_ASSESSMENT` (kilitli, admin ekleyemez — `questionController.ts:87-92`) + `STK_CUSTOM`. Forma yalnız eklenebilir olan (STK_CUSTOM) geliyor | — (dropdown "tek seçenek" DOĞRU davranış; DISC ekleme kasıtlı kilitli) | doğru-çalışıyor (tasarım) | S |
| **B12** | Etiket Yönetimi (onay/birleştir/reddet kuyruğu) | Kuyruk TAM: `PendingTag` + `tagController` + `tags/page.tsx` (Bekleyen/Onaylanan/Birleştirilen/Reddedilen). **"Hazır sistem etiketleri" şemada/seed'de BULUNAMADI** (grep boş) | Kullanıcının "neyin dışında" öneri yaptığı belirsiz — hazır etiket havuzu tanımlı değil (gizli eksik). Kuyruk mantığı doğru | doğru-çalışıyor + **TEYİT GEREK** (hazır etiket havuzu) | S/M |
| **B13** | Sertifika Konuları (topic1-5, aç/kapa) | GERÇEK içerik: `seed-certification.ts` → 10 konu / ~20 senaryo (placeholder DEĞİL); `CertificationQuestion`/`CertificationOption` (senaryo+seçenek+skor+açıklama). "Kurum ekleyemez/düzenleyemez, sadece aç/kapa" KODLU: `certification.service.ts` `setCertificationTopic` yalnız toggle; frontend metni + `schema.prisma:171-173` yorumu | — (tasarım+kod uyumlu). **Karar gerekçesi belgesi:** net bir "uzman hazırlar" karar belgesi ZAYIF kanıtlı — gerekçe ağırlıkla kod yorumu + frontend metninde; `admin-panelleri-tasarim-2026-08-02.md` CERT_CONFIG'e değiniyor ama "neden kurum ekleyemez" açık gerekçesi TEYİT GEREK | doğru-çalışıyor (tasarım) | S |
| **B9** | "CORE"/"DEEPENING" İngilizce | **Prisma ENUM** `QuestionType { CORE, DEEPENING }` (`schema.prisma:116-119`) + `z.enum(['CORE','DEEPENING'])` (`questionController.ts:38`) → **DB değeri**. Frontend ham enum'u gösteriyor (`questions/page.tsx:119-124,162`) | Yalnız GÖRÜNEN etiket Türkçeleştirilecek (`{CORE:'Temel', DEEPENING:'Derinleştirme'}` haritası). **Enum değeri DB'de KALMALI — körlemesine değiştirmek kayıtları kırar** | UI-iyileştirme (enum-safe) | **S** |
| **B5** | Havuz sayfası layout (yatay tablo) | `mentor-havuzu`/`menti-havuzu/page.tsx:84-160` 6 kolonlu tablo + overflow-x scroll + 50/sayfa | — (mevcut yapı raporlandı) | tasarım-kararı | — |

> **Not:** B8 üç alt-parçaya bölündü (B8a/B8c doğru-çalışıyor, B8b yarım-özellik) çünkü ekran bulgusu tek maddede
> üç farklı gerçeği barındırıyordu. Toplam 13 orijinal bulgu; kanıt bütünlüğü için alt-parçalar ayrı satırda.

## "Önce yapılmalı" önerisi (nihai öncelik PO'da)
**En ucuz + en görünür kazanç (az işle çok):**
1. **B7 — Yönetici atama UI (S):** endpoint + API client HAZIR, sadece buton/dialog. En düşük efor, tam kapanır.
2. **B9 — CORE/DEEPENING etiket çevirisi (S, enum-safe):** sadece görünen metin haritası; DB'ye dokunmadan.
3. **B1 — Şifre göster/gizle (S):** register'daki `PasswordField` iki ekrana taşınır.
4. **B4 — DISC ikincil/vektör gösterimi (S):** backend veri var; gösterim biçimini KVKK maskeleme ile uyumlu seç.

**Orta kazanç:**
5. **B6 — Kalibrasyon sayfasını zenginleştir (M):** mevcut ağırlık + geçmiş + NPS trend UI (backend hazır).
6. **B8b — Cevap tipi (M):** gerçek yarım özellik; schema+form+puanlama.

**Karar/teyit bekleyen (kod başlamadan):**
7. **B12 hazır etiket havuzu** (TEYİT GEREK) · **B13 karar gerekçesi** (TEYİT GEREK) · **B2/B3/B5 tasarım kararı**.

## Tip dağılımı (ürün sahibi özeti)
- **arka-var-ön-yok (en kıymetli — az işle çok kazanç): 3** → B6, B7, B4.
- **gerçekten yarım/eksik özellik: 2** → B1, B8b.
- **doğru-çalışıyor (dokunma): 5** → B8a, B8c, B10, B11, B13.
- **tasarım-kararı (PO verecek, kod değil): 3** → B2, B3, B5.
- **TEYİT GEREK: 2** → B12 (hazır etiket havuzu var mı) · B13 (karar gerekçesi belgesi zayıf).
- **UI-iyileştirme (enum-safe): 1** → B9.

## Yöntem / kanıt tabanı
- 3 paralel salt-okuma Explore ajanı; her madde dosya:satır kanıtlı. Kod DEĞİŞTİRİLMEDİ, DB'ye BAĞLANILMADI, secret okunmadı.
- Belirsiz/çelişkili maddeler tahmin edilmeden **TEYİT GEREK** işaretlendi (B12 hazır etiket havuzu; B13 karar gerekçesi belgesi).
- Bu rapor gelecekteki inşa turlarının temeli; öncelik ürün sahibinde. Kişi adı yok.

## Belge-senkron notu (CLAUDE.md kuralı gereği)
Belge güncellemesi gerekmedi: salt-okuma keşif turu; kod/özellik tamamlanmadı, iş kuyruğu değişmedi
(09-DURUM/10-yol güncellenmez).
