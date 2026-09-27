# Erişilebilirlik Denetimi — 2026-09-27 (AJ-07)

> Kapsam: giriş, kayıt, DISC testi (adaptif + onboarding), menti paneli, mentör paneli, mesajlar, randevu
> (`book-meeting`/`meetings`) ekranları + bu ekranların doğrudan kullandığı paylaşılan bileşenler
> (`FormField`, `PasswordField`, `OAuthButtons`, `ReportUserButton`, `UserAvatar`, `TenantLogo`).
> Yöntem: statik kod taraması (grep + okuma) — tarayıcıda gerçek AT (screen reader) testi YAPILMADI,
> bu bir sonraki adımdır. Bu tur ilk defa yapılan denetimdir (CLAUDE.md: "bütünsel erişilebilirlik
> denetimi hiç yapılmadı").

## Özet

| # | Bulgu | WCAG | Durum |
|---|---|---|---|
| 1 | DISC I/S harf rengi (`yellow-600`/`green-600`) beyaz zeminde AA altı | 1.4.3 | ✅ düzeltildi |
| 2 | `emerald-600` "kaydedildi/eşleşiyor/alındı" mesajları AA altı (4 yer, kapsam içi) | 1.4.3 | ✅ düzeltildi |
| 3 | `amber-600` karakter sayacı uyarısı (randevu formu) AA altı | 1.4.3 | ✅ düzeltildi |
| 4 | Mentör paneli: "Minimum Uyum Skoru" `<label>` girdiye bağlı değildi | 1.3.1 / 4.1.2 | ✅ düzeltildi |
| 5 | Mentör paneli: görüşme linki input'unda erişilebilir ad yok | 1.3.1 / 3.3.2 | ✅ düzeltildi |
| 6 | Randevu formu: "Görüşme Yeri/Telefon" ve "Neden görüşme" `<label>`'ları girdiye bağlı değildi | 1.3.1 / 4.1.2 | ✅ düzeltildi |
| 7 | Randevu formu: "Format"/"Süre" buton grupları `aria-pressed`/`role=group` taşımıyordu (komşu Gün/Saat grubunda vardı) | 4.1.2 | ✅ düzeltildi |
| 8 | Mesaj kutuları (menti modal, randevu-mesaj, konuşma detay) erişilebilir ad taşımıyordu | 1.3.1 / 3.3.2 | ✅ düzeltildi |
| 9 | `/disc-test` (adaptif) tamamlandı/hata/boş ekranlarındaki dekoratif SVG'ler `aria-hidden` taşımıyordu | 1.1.1 (best practice) | ✅ düzeltildi |
| 10 | `emerald-600` deseni kapsam DIŞI ekranlarda (platform admin, algorithm-tuner, onboarding/stk, admin panelleri) ~15 yerde daha tekrar ediyor | 1.4.3 | 🟡 raporda, düzeltilmedi |
| 11 | "Format"/"Süre" gibi buton-grubu başlıkları `<label>` ile işaretleniyor ama `htmlFor` yok (herhangi bir tekil girdiye bağlanmıyor) | kod hijyeni, WCAG ihlali değil | 🟡 raporda, düzeltilmedi |
| 12 | Ekran okuyucuyla (VoiceOver/NVDA) gerçek gezinme testi hiç yapılmadı | — | 🟡 sonraki adım |

---

## 1) DISC I/S harf rengi — WCAG 1.4.3 (kontrast, ≥4.5:1)

**Kanıt (düzeltme öncesi):**
- `frontend/src/components/atoms/DiscBadge.tsx:14-15` — `I: text-yellow-600` (beyaz zeminde ~2.9:1), `S: text-green-600` (~3.3:1)
- Aynı harf→renk eşlemesi 3 dosyada daha tekrar ediyordu (kod-teyitli, `__tests__/dark-mode-contrast.test.tsx:79-107`'de zaten birlikte izleniyor):
  `frontend/src/app/(dashboard)/profile/page.tsx:36-37` · `frontend/src/app/(dashboard)/mentor/page.tsx:31-32` ·
  `frontend/src/app/(admin)/admin/questions/page.tsx:16`

**Kapsam kararı:** Tek kaynağa taşımak (paylaşılan bir `DISC_COLORS` modülü) ayrı bir refaktör olurdu —
4 dosyanın da kendi `DISC_META`/`DISC_OPTIONS`/`DISC_COLORS` yapısı farklı (bazısında `archetype`/`icon` da var).
Bu turda **hizalama** seçildi: hepsinde `yellow-600→700`, `green-600→700` (koyu mod `dark:*-400` dokunulmadı).
D (`red-600`, ~4.83:1) ve C (`blue-600`, ~5.17:1) zaten AA üstündeydi, değiştirilmedi.

**Kontrast (beyaz zemin, hesaplanan):**
| Ton | Önce | Sonra |
|---|---|---|
| yellow-600 → yellow-700 | ~2.94:1 | ~4.93:1 |
| green-600 → green-700 | ~3.30:1 | ~5.02:1 |

**Test:** `frontend/src/__tests__/dark-mode-contrast.test.tsx` — `DiscBadge` için I ve S harflerinin açık
temada 700, koyu temada 400 tonunu kullandığını ve 500/600 tonunun kalmadığını doğrulayan iki birim test.

---

## 2) `emerald-600` durum mesajları — WCAG 1.4.3

`emerald-600` (#059669) beyaz zeminde ~3.77:1 — AA metin eşiği 4.5:1'in altında. Kapsam içi 4 yerde
`emerald-700`e çekildi (~5.49:1), koyu mod dokunulmadı:
- `frontend/src/app/(dashboard)/mentor/page.tsx:472` — "✓ Kaydedildi" (filtre kaydı)
- `frontend/src/app/(auth)/register/_RegisterContent.tsx:399` — "Şifreler eşleşiyor"
- `frontend/src/components/organisms/ReportUserButton.tsx:82` — "Şikayetiniz alındı. Teşekkürler." (menti/mentör panelinde kullanılan paylaşılan bileşen)

**Kapsam dışı bırakılan (bulgu #10):** aynı `text-emerald-600` deseni şu dosyalarda da var, ama bunlar
denetim kapsamındaki 6 ekranın dışında (platform admin, kurum onboarding, algoritma ayarları) —
düzeltilmedi, ayrı bir işe bırakıldı:
`components/molecules/SectorTagSuggest.tsx:24` · `components/organisms/ProgramHealthSection.tsx:180` ·
`components/organisms/TenantSwitcher.tsx:132` · `app/(dashboard)/profile/page.tsx:449` ·
`app/platform/dashboard/page.tsx:470,486,672` · `app/platform/tenants/[id]/page.tsx:37,178` ·
`app/platform/tenants/[id]/_components/MeetingsTable.tsx:18,71` ·
`app/platform/tenants/[id]/_components/MembersTable.tsx:105` ·
`app/onboarding/stk/pending-review/page.tsx:54` · `app/onboarding/stk/_steps/Step1Slug.tsx:70,115` ·
`app/onboarding/stk/_steps/Step5Invite.tsx:27` · `app/(admin)/admin/algorithm-tuner/page.tsx:238`.
**Öneri:** ayrı bir işte hepsi `emerald-700`e çekilsin (tek desen, tek PR — bu denetimin kapsamı dışında
büyük görünüyor ama mekanik bir bul-değiştir, riski düşük).

---

## 3) `amber-600` karakter sayacı — WCAG 1.4.3

`frontend/src/app/(dashboard)/book-meeting/page.tsx:311` — randevu talebi mesaj kutusunda "450 karakteri
geçince" uyarı rengi `amber-600` (~3.19:1) idi, `amber-700`e çekildi (~5.02:1). Aynı dosyada kullanılan
`amber-700/800` tonları (bekleme süresi bantları, `menti/page.tsx:187-238`) zaten AA üstündeydi.

---

## 4) Mentör paneli — "Minimum Uyum Skoru" `<label>`/input bağı yok — WCAG 1.3.1 / 4.1.2

**Önce:** `frontend/src/app/(dashboard)/mentor/page.tsx` — `<label>` düz metindi (`htmlFor` yok), `<input
type="range">`'in `id`'si yoktu. Ekran okuyucu kullanıcısı slider'a odaklandığında hiçbir isim duymuyordu.
**Sonra:** `useId()` ile üretilen id, `htmlFor`/`id` çifti eklendi (`mentor/page.tsx:134,405,413`).

## 5) Mentör paneli — görüşme linki input'u — WCAG 1.3.1 / 3.3.2

`mentor/page.tsx:357` — ONLINE görüşme onayında mentörün girdiği link input'unun yalnız `placeholder`'ı
vardı (programatik erişilebilir ad yok — placeholder kayboluyor, WCAG bunu label yerine saymaz).
`aria-label="Görüşme bağlantısı"` eklendi.

## 6) Randevu formu — "Görüşme Yeri/Telefon" ve mesaj alanı — WCAG 1.3.1 / 4.1.2

`frontend/src/app/(dashboard)/book-meeting/page.tsx:279,289` — iki `<label>` da `htmlFor` taşımıyordu,
altındaki `<input>`/`<textarea>`'da `id` yoktu. `useId()` ile `locationId`/`messageId` eklendi, `htmlFor`/`id`
çiftleri kuruldu.

## 7) Randevu formu — "Format"/"Süre" toggle butonları — WCAG 4.1.2 (komşu uç karşılaştırması)

Aynı dosyada, birkaç satır aşağıdaki "Gün seçin"/"Saat seçin" buton gruplarında zaten `role="group"` +
`aria-pressed` vardı (`book-meeting/page.tsx:243-258`, önceki bir işte eklenmiş) — ama "Görüşme Formatı"
ve "Süre" butonlarında (aynı aile, aynı görsel/etkileşim deseni) bu yoktu. Ekran okuyucu kullanıcısı hangi
formatın/sürenin seçili olduğunu duyamıyordu. `book-meeting/page.tsx:203-224` — `role="group"` +
`aria-labelledby` (başlığa bağlı) + her butona `aria-pressed` eklendi; komşu uçla hizalandı.

## 8) Mesaj kutuları — erişilebilir ad eksik — WCAG 1.3.1 / 3.3.2

Üç mesaj `<textarea>`'sı yalnız `placeholder` taşıyordu, `aria-label` yoktu:
- `frontend/src/app/(dashboard)/menti/page.tsx:406` — mentöre ilk mesaj modalı → `aria-label="Mesajınız"`
- `frontend/src/app/(dashboard)/messages/[id]/page.tsx:129` — konuşma detay mesaj kutusu → `aria-label="Mesaj"`
- `frontend/src/app/(dashboard)/book-meeting/page.tsx:174` — müsaitlik yokken gönderilen ilk mesaj → `aria-label="Mentöre mesaj"`

## 9) `/disc-test` dekoratif SVG'ler — WCAG 1.1.1 iyi pratik

`frontend/src/app/(dashboard)/disc-test/page.tsx:70,128,153` — tamamlandı/hata/boş-havuz ekranlarındaki
dekoratif ikon `<svg>`'leri `aria-hidden` taşımıyordu (bütün kod tabanında ham `<svg>` yalnız 5 yerde var,
3'ü buradaydı — `lucide-react` ikonları zaten hep `aria-hidden` alıyor, bu üçü istisnaydı). Eklendi.

---

## 10) Bulgu — buton-grubu başlıkları için `<label>` kullanımı (kod hijyeni, WCAG ihlali değil)

`book-meeting/page.tsx` içinde "Görüşme Formatı"/"Süre"/"Tarih ve Saat" başlıkları `<label>` etiketiyle
işaretli ama hiçbiri tek bir form girdisine `htmlFor` ile bağlanmıyor (bir buton grubunun başlığı, tekil
input değil). Bu bir AT hatasına yol açmıyor (yönlendirilmemiş `<label>` sessizce düz metin gibi render
olur) ama semantik olarak yanlış — `<p>`/`<span>` + `aria-labelledby` (7. bulguda yapıldığı gibi) daha
doğru olurdu. Düşük öncelik, düzeltilmedi.

## 11) Ekran okuyucu ile gerçek gezinme testi yapılmadı

Bu denetim tamamen statik (kod okuma + grep). VoiceOver/NVDA ile gerçek klavye-only + screen-reader
gezinme testi (özellikle DISC testi radiogroup akışı, randevu tarih/saat seçimi, mesajlaşma) ayrı bir
iş olarak kuyruğa eklenmeli.

---

## Bu PR'da düzeltilenler — dosya listesi

- `frontend/src/components/atoms/DiscBadge.tsx`
- `frontend/src/app/(dashboard)/profile/page.tsx`
- `frontend/src/app/(dashboard)/mentor/page.tsx`
- `frontend/src/app/(admin)/admin/questions/page.tsx`
- `frontend/src/app/(dashboard)/disc-test/page.tsx`
- `frontend/src/app/(dashboard)/book-meeting/page.tsx`
- `frontend/src/app/(dashboard)/menti/page.tsx`
- `frontend/src/app/(dashboard)/messages/[id]/page.tsx`
- `frontend/src/app/(auth)/register/_RegisterContent.tsx`
- `frontend/src/components/organisms/ReportUserButton.tsx`
- `frontend/src/__tests__/dark-mode-contrast.test.tsx` (yeni/güncellenmiş testler)

## Raporda bırakılanlar (ayrı iş)

- Bulgu #10: `emerald-600` deseni ~15 yerde daha (platform/admin/onboarding ekranları) — mekanik toplu düzeltme.
- Bulgu #11: buton-grubu `<label>` kullanımı — kod hijyeni.
- Bulgu #12: gerçek ekran okuyucu testi.
