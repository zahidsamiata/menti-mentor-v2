> 🧊 RUTİN TURDA OKUNMAZ — yalnız bir KARAR cevaplanınca (ya da bir 🔴 işin ayrıntısı gerekince) ilgili § açılır. Rutin turda `00-KUYRUK.md` § 🔴 KİLİT HARİTASI yeter.
> TÜR: 🔥 (yaşayan, soğuk okunur) · Kural: OTONOM-PROMPT.txt § 5c (n) · İlk kuruluş: GÖREV 2.4 duruma göre bölme, 2026-09-28.

# 00-KUYRUK — KARAR BEKLEYEN İŞLER (🔴)

**Ne:** `00-KUYRUK.md`'den kapısı 🔴 (yön kararı bekleyen) ve Durumu ATLANDI(karar) olan satırlar — satır metni kuyruktan AYNEN taşındı; sonradan yapılan satır düzeltmelerinin (NEDEN, sahip, tek kapı, tablo onarımı — GÖREV 2.4, 2026-09-28) önceki tam hâlleri `docs/otonom/arsiv/00-KUYRUK-gecmis.md`'de, KARAR numarasına göre gruplu. Bir satır birden çok KARAR'a bağlıysa ilk KARAR'ın grubunda durur; diğer gruplarda yalnız "→ bkz." atfı vardır. Kapısında KARAR numarası olmayan 🔴 satırlar en sondaki "KARAR numarasız 🔴" grubundadır.

**CEVAP gelince:** o KARAR'a bağlı satırlar AYNI commit'te `00-KUYRUK.md`'ye, grubun "Geri dönüş yeri" satırında yazılı bölüme geri taşınır (kapı cevaba göre güncellenir) ve `00-KUYRUK.md` § 🔴 KİLİT HARİTASI'ndaki işaretçi satırı güncellenir/kaldırılır. Yeni bir 🔴 satır açılınca doğrudan buraya (ilgili KARAR grubuna) yazılır ve işaretçi güncellenir. Kart metni: `docs/otonom/kararlar/KARAR-NNN.md` (indeks: `01-KARARLAR.md`).

## KARAR-2

**Konu:** Profile serbest bağlantı alanı · kart: `docs/otonom/kararlar/KARAR-002.md`

**Geri dönüş yeri:** K-17 → 00-KUYRUK § AŞAMA C — Ürün kararı / migration bekleyenler

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| K-17 | Ş3 | **Sosyal profile serbest bağlantı alanı** (migration). NEDEN: kullanıcı sosyal profiline sabit alanlar dışında bağlantı ekleyemiyor (KARAR-2). | 🔴 KARAR-2 | Kullanıcı ek link ekleyebiliyor | BEKLIYOR | |

## KARAR-3

**Konu:** Sertifika "bildirim yükümlülüğü" hukuki metni · kart: `docs/otonom/kararlar/KARAR-003.md`

**Geri dönüş yeri:** K-16 → 00-KUYRUK § AŞAMA C — Ürün kararı / migration bekleyenler

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| K-16 | Ş0 | **madde 30 — sertifika bankası seed.** ⛔ önce `certification_option_yedek_20260910`, yalnız `seed-certification`. NEDEN: sertifika ekranında gerçek soru metni yerine "Seçenek A" gibi yer tutucular görünüyor (madde 30 · G3-08). | 🔴 KARAR-3, KARAR-4 | Sertifika ekranında "Seçenek A" yerine gerçek metin | BEKLIYOR | = G3-08 (seed `seed-certification.ts` şu an **20 senaryo/80 şık** — eski sürüm; finalize **22/88 içeriği** `docs/raporlar/icerik/` 3 belgede yazılı ama seed'e taşınMADI → K-16 bugün seed atarsa 20/80 çıkar, içerik→seed taşıma adımı gerekir) · G3-09 (npm runner yok, `seed-certification.ts:320` tsx guard var). ⚠️ (PR #184'teki "sayı bayat" ifadesi düzeltildi: iki sayı da gerçek, farklı kaynak.) **ÖNKOŞUL: P-99 — içerik seed'e taşınmadan seed atılırsa 20/80 çıkar**  → ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):**  — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**). ⛔ Pratik sonuç: taşınacak şık sayısı 8 değil **88'in TAMAMI**; düşecek senaryo **15**. Efor **S değil L**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md:16-19,118-122`. · geçmiş: bkz. `arsiv/00-KUYRUK-gecmis.md` §K-16 |

## KARAR-4

**Konu:** Kriz destek kaynağı metni · kart: `docs/otonom/kararlar/KARAR-004.md`

→ bkz. K-16 (KARAR-3 grubunda)

## KARAR-5

**Konu:** Öğrenme yolculuğu seed canlıya · kart: `docs/otonom/kararlar/KARAR-005.md`

**Geri dönüş yeri:** K-18 → 00-KUYRUK § AŞAMA C — Ürün kararı / migration bekleyenler

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| K-18 | Ş0 | **Öğrenme yolculuğu seed** (madde 147/148). ⛔ önce yedek, `seed-learning-journey`. ⛔ **2026-09-21 (içerik konseyi): madde 147 içeriği 5/5 DOLU AMA HER AŞAMADA `{mentor_*}` YER TUTUCUSU taşıyor** ve bu değişkenlerin kodda **0 karşılığı** var (kapsam: iki repo `src`+`prisma`, harf duyarsız → 0 dosya) → **bugün seed edilirse kullanıcı ekranda ham `{mentor_mimar}` görür.** İki engel: (a) **I-09 / madde 146** isim değişkeni altyapısı, (b) seed'de **zaten 6 farklı menti aşaması var** → üzerine yazma/pasifleştirme **PO KARARI**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md` §0② / §2.1. NEDEN: öğrenme yolculuğu içeriği canlıda yok; bugün seed edilirse kullanıcı ham `{mentor_*}` yer tutucusu görür (madde 147/148). | 🔴 KARAR-5 | Canlıda içerik görünüyor | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T2 KOŞULLU)** — yalnız C11 "seed tabloları boş" derse bloker · |

## KARAR-11

**Konu:** Kullanılmayan/mükerrer kod ne olsun · kart: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` § KARAR-11 (cevaplanmış)

**Geri dönüş yeri:** E-5 → 00-KUYRUK § AŞAMA E — ⭐ HAYALET BACKEND: niyet arkeolojisi → triyaj → yapım

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| E-5 | Ş0 | **GERÇEK SİLME** — yalnız karantina bir tur sorunsuz geçtiyse ve KARAR-11 "sil" diyorsa. Arşiv belgesi zaten hazır. | 🔴 KARAR-11 + karantina turu geçmiş | Silinenler listesi + arşivden geri alma yolu çalışıyor | BEKLIYOR | ⚠️ **KİLİT AÇILMADI (2026-09-21) — kasıtlı.** KARAR-11 cevaplandı (**A = karantina → bir tur bekle → sonra sil**) ama bu satırın kapısı **İKİ şartlıydı**: *"KARAR-11 + karantina turu geçmiş"*. **İkinci şart hâlâ sağlanmadı** (karantina turu yapılmadı). Ayrıca `CLAUDE.md` § SİLME PROTOKOLÜ adım 5 açık: *"Karantina 🟡'dır, **gerçek silme 🔴'dır**"* ve silme **PO'nun İKİNCİ onayını** ister ⇒ bu satır cevap gelse de 🔴 kalır. ⭐ **Açılan kısım `K-13`'tedir** (karantina ayağı, zaten 🟡) — oradan ilerlenir, bu satır karantina turu sorunsuz geçince PO'nun ikinci onayıyla açılır. |

## KARAR-12

**Konu:** Görüşme geri bildirim kayıt sistemi · kart: `docs/otonom/kararlar/KARAR-012.md`

**Aktif kuyrukta ayrıca bekleyen (satır `00-KUYRUK.md`'de kalır):** AJ-99 (olası ürün sorusu: mentör kendi geri bildirimini görsün mü (uygulayıcı önce kontrol eder))

**Geri dönüş yeri:** AJ-38 → 00-KUYRUK § AJAN-EKLEDİ SATIRLAR (K-C · PO kararı 2026-09-26, kalıcı)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AJ-38 | Ş0 | **Yöneticinin "Başarı oranı" kartı hiç dolmayacak** — ekran "yeterli değerlendirme yok" diyor ama değerlendirme toplayan ekran yok (PS-05 kalanı). | 🔴 KARAR-12 / KARAR-44 | Kart gerçek veriyle doluyor ya da neden boş olduğunu doğru söylüyor | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` (PS-05, QE2) · kanıt: `backend/src/controllers/feedbackLogController.ts:86` tek yazıcı; ön yüzden çağrı 0 · eski BITTI: PS-05 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:268` · karar gerekebilir: hangi memnuniyet ölçüsü toplanacak (KARAR-12/44) |

## KARAR-15

**Konu:** Çok-kuruma üye kurumlar arası geçiş · kart: `docs/otonom/kararlar/KARAR-015.md`

**Geri dönüş yeri:** AJ-10 → 00-KUYRUK § AJAN-EKLEDİ SATIRLAR (K-C · PO kararı 2026-09-26, kalıcı)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AJ-10 | Ş0 | **Bağlanmamış iki bileşen: `TenantSwitcher.tsx`, `ProfileStrengthCard.tsx`** (hiçbir yer import etmiyor) — önce niyet, sonra bağla ya da karantina. | 🔴 KARAR-15, KARAR-36 | (görünmez ya da bağlanırsa görünür) bileşenler ya ekrana bağlı ya karantinada | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `g-kart-dogrulama-2026-09-26.md:255` (G10-20) · kanıt: `frontend/src/components/organisms/TenantSwitcher.tsx` · `frontend/src/components/organisms/ProfileStrengthCard.tsx` (import 0, kendi dosyaları hariç). ⛔ SİLME PROTOKOLÜ: NİYET → İKAME → YENİ KARAR; karantina 🔵 (EVET kartı), gerçek silme 🔴. K-13/E-4 ailesiyle aynı şerit. · ⭐ **2026-09-27 niyet arkeolojisi (silme protokolü 1-3):** ikisi de `918727b` (2026-06-21, PLG onboarding) ile doğdu, hiç bağlanmadı. `TenantSwitcher` → **KARAR-15** (çok kuruma üye kullanıcı kurumlar arası geçiş; `01-KARARLAR.md` KARAR-15 'Kapsadığı kalemler: TenantSwitcher', CEVAP boş); ikame yok (başka kurum değiştirme akışı / `/my-tenants` yok). `ProfileStrengthCard` → beslendiği `profile-completeness.service.ts` veri hatası **KARAR-36**'ya (cevapsız) bağlı; kullanıcının kendi profil gücünü gösteren ikame yok (AN-28 soluklaştırma farklı mekanizma). ⇒ niyet belgeli, ikame yok, kararlar cevapsız: SİLİNMEZ, karantinaya ALINMAZ; kararlar gelince bağla ya da (C) karantina. Rapor: oturum scratchpad `aj10.md` (özet burada). |

## KARAR-19

**Konu:** KVKK geri-dönülmez yetkiler kümesi · kart: `docs/otonom/kararlar/KARAR-019.md`

**Geri dönüş yeri:** F-07 → 00-KUYRUK § AŞAMA F — BİLANÇO DEVRİ (2026-08-28 öncelik sırası → koda karşı doğrulandı 2026-09-19)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| F-07 | Ş4 | **Denetim izi saklama gerilimi (G1-15).** Kalibrasyon AUDIT izi SystemLog'ta 90 günde siliniyor → iz-koruma ↔ KVKK imha gerilimi. NEDEN: kalibrasyon denetim izi 90 günde siliniyor; iz koruma ile KVKK imha kuralı çelişiyor (G1-15). | 🔴 KARAR-19 | İz-koruma ile imha politikası uzlaştırıldı | BEKLIYOR | hassasiyet: KVKK (saklama/imha) + KARAR-19. =G1-15, Faz 3. Kanıt: `gdprService.ts:341,366`. Tasarım/hukuki karar tarafı KARAR-19'da ⚠️ **KAPI DÜZELTİLDİ (2026-09-21): 🟡 → 🔴 KARAR-19.** `01-KARARLAR.md` İÇİNDEKİLER KARAR-19'u *"1 (F-07)"* diye sayıyor ve F-07'nin kendi Not'u *"hukuki karar tarafı KARAR-19'da"* diyor. 🟡 kalırsa cevaplanmış bir kararın işi yanlışlıkla PR'a gider. |

## KARAR-21

**Konu:** STK anket cevap tipi (answerType) · kart: `docs/otonom/kararlar/KARAR-021.md`

**Geri dönüş yeri:** F-12 → 00-KUYRUK § AŞAMA F — BİLANÇO DEVRİ (2026-08-28 öncelik sırası → koda karşı doğrulandı 2026-09-19)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| F-12 | Ş1 | **STK anket cevap tipi (G3-13).** Kurum-özel soru Likert-sabit; şıklı/açık cevap tipi seçimi yok (migration). NEDEN: kurum özel soru eklerken yalnız Likert kullanabiliyor; şıklı/açık cevap tipi seçemiyor (G3-13). | 🔴 KARAR-21 | Kurum soru eklerken cevap tipini seçiyor | BEKLIYOR | =G3-13, Faz 6. Migration. Kanıt: `Question` modelinde answerType yok (SjtQuestion.AnswerFormat farklı kavram) |

## KARAR-30

**Konu:** Senaryo isimleri: seed'den önce mi sonra mı · kart: `docs/otonom/kararlar/KARAR-030.md`

**Geri dönüş yeri:** I-09 → 00-KUYRUK § AŞAMA I — İÇERİK (PO "EN ÖN SIRA", 2026-09-03)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| I-09 | Ş1 | **madde 146 — isim değişkeni altyapısı (14 değişken).** Metinlerdeki kişi isimleri koda gömülü; kurum kendi adlarını kullanamıyor. NEDEN: senaryo metinlerindeki kişi isimleri koda gömülü; kurum kendi adlarını kullanamıyor (madde 146). | 🔴 KARAR-30 | Kurum senaryolardaki isimleri kendi bağlamına göre değiştirebiliyor | BEKLIYOR | hassasiyet: tenant override alanı ❓ migration. Kanıt: 9 terim (`menti_denge`·`menti_rotaci`·`menti_izacan`·`menti_kasif`·`mentor_mimar`·`mentor_ayna`·`mentor_liman`·`mentor_pusula`·`sert_1`) × iki repo tamamı, harf duyarsız → **kodda 0 dosya** (7 isabetin hepsi `.md`). İçerik hazır: `menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md:56`. ⚠️ **SIRA ÖNEMLİ:** K-16/K-18 seed'inden ÖNCE yapılırsa isimler seed'e değişken girer; SONRA yapılırsa **ikinci kez seed** gerekir → **PO'ya sor** (kart: KARAR-30). · aile: Y-G · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

## KARAR-36

**Konu:** Yarım 3 teknik kalem (`answeredFollowup` · ikiz alan · 2 yedek tablo) · kart: `docs/otonom/kararlar/KARAR-036.md`

**Geri dönüş yeri:** Y-18 → 00-KUYRUK § AŞAMA Y — YOL HARİTASI + KARAR TAKİBİ DEVRİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| Y-18 | Ş0 | **madde 126 — `answeredFollowup` olmayan tabloyu sorguluyor; profil tamamlanma yüzdesi sistematik DÜŞÜK.** NEDEN: profil tamamlanma yüzdesi sistematik olarak düşük hesaplanıyor (madde 126). | 🔴 KARAR-36 | Profil tamamlanma yüzdesi gerçek veriye dayanıyor | BEKLIYOR | ⚠️ **RAPOR DÜZELTMESİ — etki sanılandan BÜYÜK.** Rapor *"try/catch sessizce 0 dönüyor"* dedi; gerçek daha kötü: `profile-completeness.service.ts:43-50` **`(prisma as any).answeredFollowup?.count(...)`** — optional chaining **fırlatmadan `undefined` döner** → `\|\| 0` → **HER ZAMAN 0** ve **`catch` bloğu ÖLÜ KOD**, yani `profileSource==='HYBRID' ? 1 : 0` yedeği **hiç çalışmıyor**. Tablo gerçekten yok (`grep answeredFollowup schema.prisma` → 0). · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) |

→ bkz. AJ-10 (KARAR-15 grubunda)

## KARAR-38

**Konu:** Sunucu ülkesi + KVKK aydınlatma metni · kart: `docs/otonom/kararlar/KARAR-038.md`

**Geri dönüş yeri:** GV-09 → 00-KUYRUK § AŞAMA GV — GÜVENLİK VE KVKK KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| GV-09 | Ş4 | **KVKK aydınlatma sayfası yanlış ülke ve yanlış hukuki rejim beyan ediyor.** Sayfa "İrlanda (AB), GDPR'a tabi" diyor; sunucu Londra/Birleşik Krallık'ta ve AB üyesi değil. OAuth ve e-posta sağlayıcısına aktarım hiç beyan edilmiyor. NEDEN: KVKK aydınlatma metni yanlış ülke ve hukuki rejim beyan ediyor; kullanıcı verisinin nerede tutulduğunu yanlış öğreniyor (güvenlik konseyi §2.B.6). | 🔴 KARAR-38 | Kullanıcı aydınlatma metninde gerçek sunucu ülkesini, doğru hukuki rejimi ve tüm alıcıları görüyor | BEKLIYOR | 🔴 KARAR-38 + 🟡 KVKK/hukuk. **B.6 · güvenlik konseyi §2.B.6.** Kanıt: `app/kvkk/page.tsx:92-107` ↔ `menti-mentor-v2/CLAUDE.md § Ortam / Veritabanı` (madde 92, PO teyitli 2026-08-26); `:94-95` "yönetilen PostgreSQL" ↔ `docker-compose.yml:16-24` kendi konteyneri; `:60-64` OAuth+SMTP saymıyor; `:31-39` 8 veri kategorisi eksik (IP dâhil, `platformAudit.ts:32`). ⚠️ **PO ön koşulu: P-a (avukat sorusu) + P-b (sunucu ülkesi).** ⚠️ `app/gizlilik/page.tsx:76-81` ve `:13` de bayat (self-servis silme var, tarih eski). ⚠️ Y-06 ile aynı sayfalar → SIRALI · ⛔ **çelişki: KARAR-80/M18** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M18: bu satır artık YALNIZ 'hukuki rejim' yorumunu (GDPR/AB uygulanabilirliği, tüm alıcıların beyanı) kapsıyor, KARAR-38'e bağlı kalır (CEVAPSIZ). Ülke adı olgu düzeltmesi (İrlanda→Londra/BK) ayrı satıra taşındı: bkz. GV-09b. |

## KARAR-40

**Konu:** Eski `POST /api/meetings` ucu: düzelt mi karantina mı · kart: `docs/otonom/kararlar/KARAR-040.md`

**Geri dönüş yeri:** V-15 → 00-KUYRUK § AŞAMA V — OPERASYONEL HAZIRLIK BULGULARI (2026-09-19)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| V-15 | Ş2 | **Oryantasyon kilidi canlı `bookMeeting` yolunda uygulanmıyor** — yalnız kullanılmayan `createMeeting`'de bağlı; FE de yalnız banner basıyor → kilitli menti randevu alabiliyor. | 🔴 KARAR-40 | Karara göre oryantasyonsuz menti randevu alamıyor (ya da uyarı olarak kalıyor) | BEKLIYOR | ⚠️ ÜRÜN KARARI GEREKLİ (§9.2 KARAR aday, merge YOK): "Görüşme Kilidi Aktif" uyarı mı gerçek engel mi. AJAN fix tek satır (`bookMeeting`'e `checkOrientationLock`). = W §9.2 / §9.3#29. Kanıt: `meetingController.ts:162` (yalnız createMeeting), `bookMeeting:413-531` 0 satır. Efor S ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ÜRÜN KARARI gerekli (oryantasyon kilidi) ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli. ⚠️ = güvenlik konseyi §2.A.5 (G-11), ek bulgu: kilidi BASAN yer `feedbackController.ts:92-96` — yani GV-02 ile zincirli: saldırgan GV-02 ile kurbana kilit bastırır, kurban V-15 ile kilidi atlar; ikisi de düzeltilmeli. `checkOrientationLock` tanım `meetingController.ts:140`, tek çağrı `:162` (yalnız `createMeeting`). · aile: Y-A · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

## KARAR-41

**Konu:** Mentörün bir kontenjanı olsun mu · kart: `docs/otonom/kararlar/KARAR-041.md`

**Geri dönüş yeri:** P-15 → 00-KUYRUK § AŞAMA P — PANEL DENETİMİ BULGULARI (2026-09-19)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| P-15 | Ş0 | **Mentör kapasite/doluluk dengesi yok.** "Aktif Mentilerim" bir tavanla kıyaslanmıyor; "hangi noktadan sonra yük" kavramı kodlanmamış. NEDEN: mentörün kaç menti alabileceğine dair bir tavan yok; aşırı yüklenme görünmüyor (MT13). | 🔴 KARAR-41 | Mentör doluluk/kapasite durumunu görüyor | BEKLIYOR | hassasiyet: kapsam belirsiz — "kapasite kavramı olsun mu" ürün kararı (kart gerekebilir). =MT13 (⬜). Kanıt: capacity/kapasite/maxMenti 0 sonuç (mentör-bazlı). ⚠️ kapsam belirsiz — "kapasite kavramı olsun mu" PO'ya sonraki tur (kart gerekebilir). Efor M ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ürün kararı gerekebilir ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli. ⚠️ = psikometri konseyi §5 D.5, ek bulgu: "KARTSIZ GİZLİ 🔴" durumu KAPANDI — kontenjan sorusu artık kart olarak açıldı (**KARAR-41**). Kanıt: kapasite kavramı kodda YOK (kapsam BE src/ · prisma/ · tests/, 7 terim iki dilli harf duyarsız → ilgili 0 eşleşme) ve scoreAndFilter'ın hiçbir continue koşulu (matching.ts:267,270,274,278,283) aktif menti sayısını sorgulamıyor. · aile: Y-? (belirsiz — kapsam/ürün kararı, KARAR-41 bekliyor) · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

## KARAR-44

**Konu:** Algoritma kendi sonuçlarından öğrensin mi + hangi memnuniyet "gerçek" · kart: `docs/otonom/kararlar/KARAR-044.md`

**Geri dönüş yeri:** F-08 → 00-KUYRUK § AŞAMA F — BİLANÇO DEVRİ (2026-08-28 öncelik sırası → koda karşı doğrulandı 2026-09-19)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| F-08 | Ş0 | **Sektör asimetri paydası (G2-09).** Sektör skoru paydası menti-etiket sayısı yerine iki tarafın etiket **birleşimi** olmalı (B9.4). NEDEN: sektör skoru tek tarafın etiket sayısına bölünüyor; eşleşme puanı asimetrik ve yanıltıcı (G2-09). | 🔴 KARAR-44 | Sektör skoru simetrik paydayla hesaplanıyor | BEKLIYOR | hassasiyet: matching/skorlama (`scoring.ts`). =G2-09, Faz 5. KARAR-10'dan bağımsız küçük iş. Kanıt: `scoring.ts:34-40` payda `mentiSet.size` ⚠️ = psikometri konseyi §2 A.2, ek bulgu: güncel main'de HÂLÂ AÇIK — scoring.ts:40 paydası mentiSet.size (2026-09-21 teyidi); ayrıca ağırlık DÖRT yerde tanımlı (scoring.ts:89-90 · algorithmTuner.ts:28-33 · matching.ts:38 · scoring.config.ts:48) ve dördüncüsü ölü zincire ait. · aile: Y-C · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. |

→ bkz. AJ-38 (KARAR-12 grubunda)

## KARAR-45

**Konu:** Arketip adları: hangi metin hangi koda bağlanacak · kart: `docs/otonom/kararlar/KARAR-045.md`

**Aktif kuyrukta ayrıca bekleyen (satır `00-KUYRUK.md`'de kalır):** IC-10 (kalan ayak: arketip adları (metinde yer tutucu)) · AN-05 (kalan ayak: arketip adları)

**Geri dönüş yeri:** IC-14 → 00-KUYRUK § AŞAMA IC — İÇERİK KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| IC-14 | Ş0 | **`M1`/`m1` ham arketip kodları yöneticiye çıplak görünüyor.** NEDEN: yönetici eşleşme tablosunda anlamsız `M1`/`m1` kodlarını görüyor, arketip adını değil. | 🔴 KARAR-45 | Yönetici eşleşme tablosunda kod yerine arketip adı görüyor | BEKLIYOR | §6.1②. `admin/eslesmeler/page.tsx:134,142` (`{match.mentorArchetype}`) — **hiçbir sözlük yok**, yönetici çıplak `M1`…`m4` görüyor. Sözlük yazılabilmesi için **hangi ad hangi koda** kararı şart: kodun tanıdığı değerler `disc-to-ocean.adapter.ts:27-43` · `scoring.config.ts:33-44` · `schema.prisma:997`; yeni 8 ad için **0 eşleme** (kapsam: `docs/**/*.md` + BE `src`/`prisma`, 8 ad × 8 kod, harf duyarsız → tek isabet, o da **eski** adlarla `03-psikometri-ve-algoritma.md:14-15`). ⚠️ `IC-03`'ten AYRI tutuldu: diğer 12 enum'un sözlüğü bugün yazılabilir, bu yazılamaz. Efor S (karar sonrası) |

## KARAR-46

**Konu:** Sertifika içeriğinin hangi sürümü canlıya gidecek · kart: `docs/otonom/kararlar/KARAR-046.md`

**Geri dönüş yeri:** F-14 → 00-KUYRUK § AŞAMA F — BİLANÇO DEVRİ (2026-08-28 öncelik sırası → koda karşı doğrulandı 2026-09-19) · P-99 → 00-KUYRUK § AŞAMA P — PANEL DENETİMİ BULGULARI (2026-09-19) · AN-03 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| F-14 | Ş1 | **Menti personası çeşitlendirme (B8).** Sertifika/içerik senaryolarında menti persona çeşitliliği — içerik işi. NEDEN: sertifika/içerik senaryolarında menti personaları tek tip; mentör farklı menti tiplerine hazırlanmıyor (B8). | 🔴 KARAR-46 | Senaryolarda çeşitli menti personaları var | BEKLIYOR | · =Faz6 B8. İçerik turu. Kanıt: persona alanı/çeşitlendirme grep boş · ⚠️ **2026-09-25 kapı düzeltmesi:** Ölçüt (kullanıcı senaryolarda çeşitli persona görüyor) içerik seed'iyle canlıya çıkar; sertifika içeriği sürümü KARAR-46'da, cevapsız (seed kuralı). · ⭐ **KAPI HÜCRESİ SADELEŞTİ 2026-09-27 (GÖREV 0.2):** tek 🔴 = KARAR-46 (cevapsız). Hücre geçmişi: 🟡 → 🟢 (2026-09-19) → 🔴 KARAR-46 (2026-09-25). |
| P-99 | Ş0 | **⭐ Sertifika içeriğini seed dosyasına taşı — K-16'nın ÖNKOŞULU.** Finalize 22 senaryo/88 şık (`docs/raporlar/icerik/sertifika-oturum1/2/3-...-2026-09-08.md`) seed'e taşınmamış; `seed-certification.ts` hâlâ 20/80 eski sürüm. NEDEN: finalize sertifika içeriği (22 senaryo/88 şık) seed dosyasında yok; seed atılırsa eski 20/80 içerik canlıya çıkar (K-16 ön koşulu). | 🔴 KARAR-46 | seed-certification.ts 22 senaryo/88 şık içeriyor (seed ÇALIŞTIRILMAZ) | BEKLIYOR | hassasiyet: SEED (seed-certification.ts, K-16 önkoşulu). TUR 3 B.2 bulgusu.  ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):**  — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**). ⛔ Pratik sonuç: taşınacak şık sayısı 8 değil **88'in TAMAMI**; düşecek senaryo **15**. Efor **S değil L**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md:16-19,118-122`. Seed dosyası değişir, seed çalıştırılmaz. **Efor L** · aile: Y-G · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M19: açık karara bağlandı, CEVAPSIZ. · geçmiş: bkz. `arsiv/00-KUYRUK-gecmis.md` §P-99 |
| AN-03 | Ş1 | **Sertifika kod↔belge puan çatışması:** T05_A/T10_B (score 2→1) + Kültürel B tersliği + Kriz "yanında olurum" 2 puan geçişi. | 🔴 KARAR-46 | Puanlama belge ile tutarlı; kriz red-line doğru eliyor | BEKLIYOR | Kaynak: A4 · IK(B.6) · TO §4.4 · Y-3/Y-4/Y-5. KARAR-46 (88 şık taşıma) turunda yapılır. Neden: kriz red-line canlı mentör elemeyi etkiler. ✅ **KESİNLEŞTİ ⛔ ÇIKIŞ BLOKERİ (KARAR-69 B, 2026-09-23):** ilk kurum mentörlerinin kalite/kriz-güvenlik kapısı doğru elemeli → KALIR (kriz ayağı KARAR-69 (c) güvenlik kovası). |

→ bkz. K-16 (KARAR-3 grubunda; ön koşul P-99 üzerinden)

## KARAR-48

**Konu:** Test sonucu ve eşleşme skoru kullanıcıya nasıl anlatılsın · kart: `docs/otonom/kararlar/KARAR-048.md`

**Geri dönüş yeri:** AN-20 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AN-20 | Ş3 | **Mentör %uyum rozeti görsün** (BY-1, `Meeting.matchId` yazımı). NEDEN: mentör eşleştiği mentiyle uyum yüzdesini göremiyor (PP §6). | 🔴 KARAR-48 | Mentör eşleşme uyum yüzdesini görüyor | BEKLIYOR | Kaynak: PP §6 · MT-A3, R2/R6. 🔓 **KİLİT AÇILDI (KARAR-66 → B, 2026-09-23):** "akıllı eşleştirme/kalite" iddiası geri çekildi → rozet **"kalite garantisi" DEĞİL "yönlendirme uyumu"** olarak sunulur (E.2 eşleştirme→yönlendirme diliyle uyumlu). Kapı 🔴→**🟡** (matching verisine dokunur, hassas). hassasiyet: matching. · aile: Y-C · ⛔ **çelişki: KARAR-80/M5** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M5: tek satır AN-20 (yönlendirme dili); P-04 ve PS-04 katlandı; sıra GV-08 → U-18 (Match yazımı) → AN-20. Metin dili KARAR-48'e (test sonucu/skor anlatımı) bağlı — CEVAPSIZ, kilit korunuyor. |

## KARAR-50

**Konu:** Kuralların "geçersizleşme koşulu" zorunlu olsun mu · kart: `docs/otonom/kararlar/KARAR-050.md`

**Geri dönüş yeri:** YN-04 → 00-KUYRUK § AŞAMA YN — YÖNETİŞİM KONSEYİ (2026-09-21) · YN-05 → 00-KUYRUK § AŞAMA YN — YÖNETİŞİM KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| YN-04 | Ş0 | ⭐ **Güvenlik kuralı yanlış kanıta dayanıyor — 24 gündür.** `CLAUDE.md § Güvenlik Kuralları › Yeniden kullanılacak kalıplar` aynen: *"`registerMessages.ts` örnek addır, dosya HENÜZ kodda YOK: grep boş"*. **Dosya VAR:** `frontend/src/lib/registerMessages.ts` (bu turda `ls` ile doğrulandı). NEDEN: bir güvenlik kuralı var olan dosyayı "yok" diye anlatıyor; kurala uyan ajan yanlış kanıtla çalışıyor. | 🔴 KARAR-50 | Güvenlik kuralının gerekçesi kod gerçeğiyle uyuşuyor | BEKLIYOR | §B.3-1 · E-3. ⚠️ Rapor `:519` diyor — **bölme sonrası satır `:442`'ye kaydı** (rapor BB numarası). Desen: `~~[ESKİ · 2026-08-28] …~~` + `⚠️ GÜNCELLEME (2026-09-21): dosya var — kanıt: frontend/src/lib/registerMessages.ts`. F-28 ile aynı DOSYA adı ama **farklı iş** (F-28 = metin merkezileştirme). · ⛔ **çelişki: KARAR-80/M15** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M15: 'kuralların geçersizleşme koşulu zorunlu mu' KARAR-50'ye bağlandı; CEVAPSIZ. |
| YN-05 | Ş0 | ⭐ **Canonical rehber, DONDURULMUŞ belgeyi canonical gösteriyor.** `belge-duzeni-rehberi.md:13` *"Canonical'lar: … iş kuyruğu → `10-yol-haritasi.md`"*; o belge `:4`'te **📸 DONDURULMUŞ (2026-09-21)**. Rehberi okuyan ajan ölü belgeye yönlendiriliyor. NEDEN: canonical rehber okuyanı dondurulmuş (ölü) iş listesine yönlendiriyor. | 🔴 KARAR-50 | Rehberi okuyan canlı kuyruğa (`00-KUYRUK.md`) yönleniyor | BEKLIYOR | §B.3-2 · E-2. KURAL 7 tablosundaki `10-yol` ve `00-CIKIS-PLANI` satırları da aynı durumda. Karşı kanıt: `CLAUDE.md § AKTİF İŞ KAYNAĞI TEKTİR` — *"Aktif iş kaynağı tektir: `docs/otonom/00-KUYRUK.md`"*. · ⛔ **çelişki: KARAR-80/M15** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M15: KARAR-50'ye bağlandı (YN-04 ile aynı karar); CEVAPSIZ. |

## KARAR-51

**Konu:** 4 "yaşayan ama ölü" belge dondurulsun mu · kart: `docs/otonom/kararlar/KARAR-051.md`

**Geri dönüş yeri:** YN-06 → 00-KUYRUK § AŞAMA YN — YÖNETİŞİM KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| YN-06 | Ş4 | **2 belge künyesinde 🔄 YAŞAYAN diyor ama ölü** — `kararlar/konu/08-acik-sorular.md:5` *"canonical açık-karar takibi artık `00-KARAR-TAKIP.md`"* · `raporlar/icerik/kod-kalemleri-2026-09-03.md:8` *"✅ NUMARALANDI — madde 138-160'a işlendi"*. İkisi de devir kanıtını kendi içinde taşıyor. | 🔴 KARAR-51 | Okuyan bayat belgeyi güncel sanmıyor | BEKLIYOR | §D.1 · E-1. **Hazır dondurma notları raporda `:381-388`** (kopyala-yapıştır). Künyedeki `**🔄 YAŞAYAN**` → `~~[ESKİ · 2026-09-21] **🔄 YAŞAYAN**~~`. Diğer 2 "ölü adayı" PO kararına bağlı (kart §6). **ek bulgu (CS KN-12(b) / Ç-09):** `08-acik-sorular:5` "canonical artık 00-KARAR-TAKIP" ↔ `:2` 🔄 YAŞAYAN = **çift-kaynak** ("AKTİF İŞ KAYNAĞI TEKTİR" kuralıyla çelişir) → AN-44 ile tek PR'da çözülür. kaynak: CS raporu §3. · ⛔ **çelişki: KARAR-80/M15** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M15: '4 yaşayan-ama-ölü belge dondurulsun mu' KARAR-51'e bağlandı; CEVAPSIZ. |

## KARAR-52

**Konu:** Taşınan KURAL 8 mükerreri: hangi gövde kalsın · kart: `docs/otonom/kararlar/KARAR-052.md`

**Geri dönüş yeri:** YN-02 → 00-KUYRUK § AŞAMA YN — YÖNETİŞİM KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| YN-02 | Ş0 | ⭐ **Taşıma iki YENİ tutarsızlık doğurdu (bu turda oluştu).** (a) `belge-duzeni-rehberi.md`'de **KURAL 8 artık İKİ KEZ** var: `:99-109` (kendi gövdesi) + `:143-152` (CLAUDE.md'den taşınan kopya). (b) `rehber:6` hâlâ *"bu **6** kurala uyar"* diyor — dosyada artık **18 kural bloğu** var; `rehber:3` künyesi *"Son güncelleme: **2026-08-23**"*. | 🔴 KARAR-52 | Rehberi okuyan her kuralı bir kez ve tam görüyor; künye dosyanın gerçek hâlini söylüyor | BEKLIYOR | §A.7 AM-3 · §B.1 · §B.4-1. ⚠️ **Rapor B.4-1 "mükerrer çözülür" diyordu (`:337`, kazanç 933) — mükerrer ÇÖZÜLMEDİ, tek dosyanın içine TAŞINDI.** Rehberin kendi KURAL 1'i (tek gerçek kaynağı) kendi dosyasında ihlal oluyor. ⛔ Gövde SİLİNMEZ → biri `## GEÇMİŞ`e veya `~~[ESKİ]~~` damgasıyla. Sayım hatası raporda da vardı: `rehber:6` "6" · eski `CLAUDE.md:377` "8" · gerçek 18 (§B.1 `:276`). **= CS KN-14** (mükerrer, yeni satır AÇILMADI), ek bulgu (CS Ç-08): `belge-duzeni-rehberi:6` "6 kural" ↔ dosyada 16/18 kural + `:13` canonical `10-yol` (📸 donuk) gösteriyor (= YN-05) + künye `:3` bayat — hepsi bu satırın kapsamında. kaynak: CS raporu §3/§6. · ⛔ **çelişki: KARAR-80/M15** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M15: 'taşınan KURAL 8 mükerreri hangi gövde kalsın' KARAR-52'ye bağlandı; CEVAPSIZ. |

## KARAR-56

**Konu:** Menti aynı hafta birden fazla mentöre talep · kart: `docs/otonom/kararlar/KARAR-056.md`

**Geri dönüş yeri:** AN-21 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AN-21 | Ş1 | **Bekleme "senin gibi N kişi bekliyor" akran sinyali** (mentör<3 gizlenme senaryosu dahil). NEDEN: bekleyen menti yalnız olmadığını bilmiyor; bekleme yalnızlık hissi yaratıyor (PP §6). | 🔴 KARAR-56 | Menti beklerken yalnız olmadığını görüyor | BEKLIYOR | Kaynak: PP §6 · M-A3, R1. 🔴: KVKK eşiği (küçük sayıda ifşa) + ürün kararı; KARAR-56 (çoklu talep) ile ilişkili. · ⛔ **çelişki: KARAR-80/M6** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M6: ana satır (P-06 katlandı); küçük sayı k-anonimlik ile gizlenir; KARAR-56 CEVAPSIZ, kilit korunuyor. |

## KARAR-57

**Konu:** Kullanıcının mizaç sonucunu hangi test belirlesin · kart: `docs/otonom/kararlar/KARAR-057.md`

**Geri dönüş yeri:** F-09 → 00-KUYRUK § AŞAMA F — BİLANÇO DEVRİ (2026-08-28 öncelik sırası → koda karşı doğrulandı 2026-09-19) · PS-03 → 00-KUYRUK § AŞAMA PS — PSİKOMETRİ KONSEYİ (2026-09-21) · I-12 → 00-KUYRUK § AŞAMA I — İÇERİK (PO "EN ÖN SIRA", 2026-09-03)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| F-09 | Ş0 | **12 SJT senaryo + arketip seed.** Şema/model ✅ (`SjtQuestion.triggersOn/signalsArchetype`); seed'de yalnız 3 senaryo var (12 değil). NEDEN: seed'de 12 yerine yalnız 3 SJT senaryosu var; arketip ölçümü eksik veriyle yapılıyor. | 🔴 KARAR-57 | Canlıda 12 SJT senaryosu + arketipler | BEKLIYOR | =Faz5 "12 senaryo+arketip". Seed=PO onayı + yedek. Kanıt: `seed.ts:530-573` 3 senaryo ⚠️ **KAPI DÜZELTİLDİ (2026-09-21): `🔴 seed` → 🟡.** Cevaplanacak bir KARAR **numarası yoktu** → sonsuz kilit; 13 🔴'nın numarasız tek'iydi. Emsal: **P-99 🟡** (*"seed dosyası değişir, seed çalıştırılmaz"*). ⛔ Seed **çalıştırılmaz**; yalnız dosya hazırlanır, çalıştırma PO onayı + yedek ister. · aile: Y-G · ⛔ **çelişki: KARAR-80/M9** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M9: KARAR-57/58 (hangi test, geçiş dönemi) SONRASINA; ikisi de CEVAPSIZ, kilit korunuyor. |
| PS-03 | Ş0 | **Likert yolu (`/disc-test`) `discType`'ı hiç yazmıyor** → testini güncelleyen kullanıcı onboarding'den kalma ESKİ `discType` ile eşleştirilmeye devam ediyor. NEDEN: DISC testini güncelleyen kullanıcı hâlâ eski tipine göre eşleştiriliyor. | 🔴 KARAR-57 | Kullanıcı DISC testini güncelleyince eşleştirmesi gerçekten değişiyor | BEKLIYOR | hassasiyet: matching/scoring. Kapsam beyanı (rapor): `discVectorService.ts` tamamı, `discType` harf duyarsız → **0 eşleşme**. Matris skoru (`scoring.ts:74,83`) ve anti-match (`:24-29`) `discType`'a dayanıyor. ⚠️ **PS-02 ile AYNI DOSYA AİLESİ → SIRALI.** ⚠️ **KARAR-42 (DISC tekrar testi) ile ilişkili**: tekrar test açılmazsa bu satırın kullanıcı faydası yalnız *ilk* Likert turunda görünür. = psikometri konseyi §4 C.2 · aile: Y-C · ⛔ **çelişki: KARAR-80/M8** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M8: hangi test mizacı belirleyeceği (Likert/discType yazımı) KARAR-57'ye kilitlendi; CEVAPSIZ. |
| I-12 | Ş1 | **madde 142 — karakter kartı derinleştikçe yeniden hesaplanmıyor (15→35 soru).** Kart onboarding'de bir kez üretiliyor, sonra hiç tazelenmiyor. NEDEN: karakter kartı onboarding'de bir kez üretiliyor; kullanıcı daha çok soru cevaplasa da kartı değişmiyor (madde 142). | 🟢 | Kullanıcı daha fazla soru cevaplayınca kartı güncelleniyor | ATLANDI(karar) | hassasiyet: matching/skorlama dosyası. ⚠️ I-13'ün ölçek düzeltmesinden SONRA anlamlı. · aile: Y-C · ⏭️ **ATLANDI(karar) 2026-09-26:** kartı derinleşen cevaplardan yeniden hesaplamak, "mizaç sonucunu hangi test belirler" sorusunu fiilen A (32 soruluk test esas) yönünde cevaplamak demek → **KARAR-57** cevaplanınca açılır. Kanıt: kart yalnız `onboardingController.ts:482-498` (8 soruluk test) üretiyor; `recalcDiscVector` (`discVectorService.ts:107-174`) `discType`/`discResultCard`'a dokunmuyor. |

## KARAR-58

**Konu:** Eski DISC ↔ yeni Big Five geçiş dönemi · kart: `docs/otonom/kararlar/KARAR-058.md`

**Aktif kuyrukta ayrıca bekleyen (satır `00-KUYRUK.md`'de kalır):** PS-A3 (ön koşul PS-A2 üzerinden)

**Geri dönüş yeri:** PS-A2 → 00-KUYRUK § AŞAMA PS — PSİKOMETRİ KONSEYİ (2026-09-21) · AN-04 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| PS-A2 | Ş0 | **⭐ KARAR-10 · AŞAMA 2 — YENİDEN HESAPLAMA (backfill).** DB'de kayıtlı yanlış `archetype` / `ocean*` değerleri PS-A1'in düzeltilmiş formülüyle yeniden hesaplanır. NEDEN: kayıtlı arketip/OCEAN değerleri eski hatalı formülle hesaplanmış; kullanıcıların profili yanlış (KARAR-10 aşama 2). | 🔴 KARAR-58 | Kayıtlı psikometrik değerler artık çöp değil (`M1`/`m1`'e sıkışmış değil) | BEKLIYOR | hassasiyet: ⛔ **CANLI VERİ** (istisna 1 + 3). PO cevabının kendi şartı: **ÖNCE tarihli yedek tablo, SONRA PO'nun AÇIK onayı.** ⛔ **Şema migration'ı YOK** (kolon tipleri aynı) ama **verinin ANLAMI değişiyor** → `backfill/recompute` script'i. ⛔ Ön koşul **PS-A1**. ⚠️ **Kaç satırı etkilediği ÖLÇÜLMELİ, varsayılmamalı** → `03-PO-ELLE-ISLER` **#22(a)** (`SELECT count(*) FROM "UserProfile" WHERE "archetype" IS NOT NULL;`). ⛔ Bulut oturumu bunu **YAPAMAZ** (DB erişimi yok). Efor M · aile: Y-F · ⛔ **çelişki: KARAR-80/M9** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M9: yeniden hesaplama (backfill), KARAR-58 (eski DISC↔yeni Big Five geçişi) SONRASINA; CEVAPSIZ, kilit korunuyor — canlı veriye erken dokunulmasın. |
| AN-04 | Ş1 | **39 senaryo/117 şık karakter bankası + 8 arketip kartı + 8 yaklaşım metnini koda/seed'e taşı.** | 🔴 KARAR-58/62 | Yeni ölçüm içeriği koda girdi | BEKLIYOR | Kaynak: A5 · IK(D/F). Kuyrukta hiç karşılığı yok (F-09 SJT'dir). Neden: yeni ölçüm sistemi bunsuz çalışmaz. ⚠️ DB modeli tespiti ön koşul → migration olası; KARAR-58 (geçiş) + KARAR-62 (akış) bekler. |

## KARAR-61

**Konu:** Yeni formül arketip motoruyla aynı anda mı açılsın · kart: `docs/otonom/kararlar/KARAR-061.md`

**Geri dönüş yeri:** F-11 → 00-KUYRUK § AŞAMA F — BİLANÇO DEVRİ (2026-08-28 öncelik sırası → koda karşı doğrulandı 2026-09-19) · AJ-92 → 00-KUYRUK § AJAN-EKLEDİ SATIRLAR (K-C · PO kararı 2026-09-26, kalıcı)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| F-11 | Ş0 | **Algoritma çekirdeği — KARAR-10 kilitli küme.** OCEAN/sektör motoru canlı eşleştirmeye bağlama (G2-07/08/G10-21) + yeni skor formülü %45/30/25 + 2 veto (V1/V2) + triggersOn derinleşme (madde 125/B6) + Big Five göç planı (B12). Motorlar YAZILI ama `matching.ts` onları çağırmıyor. NEDEN: yeni eşleştirme motoru yazılı ama canlı eşleştirme onu çağırmıyor; kullanıcı eski 0.6/0.4 formülüyle eşleşiyor. | 🔴 KARAR-61 | KARAR-10 cevabına göre motor bağlanır/ertelenir | BEKLIYOR | =Faz5 çoğu. Hepsi KARAR-10'a kilitli. Kanıt: `matching.ts:3-5` yeni motoru import etmez; `scoring.ts:89-90` hâlâ 0.6/0.4 ⚠️ `= psikometri konseyi §3 B.4, ek bulgu: seçeneklerin somut maliyeti KARAR-10 kartına eklendi; motorun SIFIR birim testi var ⇒ hangi seçenek seçilirse seçilsin onarımın doğruluğunu kanıtlayacak kanıt örtüsü bugün yok.` **+ ⛔ çapraz atıf (bkz. §4)** ⛔ **BİRLİKTE YAPILMALI — önce silme yolu düzeltilir, SONRA Match yazımı açılır. Ters sıra = KVKK ihlali.** *(karşı taraf: **GV-08**. `createMatchIfEligible` ölü OCEAN motorunun İÇİNDE (`scoring.service.ts:137`) ve arketipi bizzat o yazıyor — KARAR-10'a "C" cevabı gelirse `Match` yazımı bu satır üzerinden açılır.)* 🔓 **KİLİT AÇILDI (2026-09-21, KARAR-10 → C aşamalı).** Kapı **hassasiyet: ** — matching/skorlama (istisna 2). ⚠️ Bu satır **tek başına yapılmaz**: KARAR-10'un cevabı işi **üç aşamaya** böldü → `PS-A1` (düzelt+test) → `PS-A2` (backfill, ⛔ canlı veri) → `PS-A3` (bağlama, ⛔ feature flag). F-11 bu üç satırın **şemsiyesidir**. · aile: Y-C · ⛔ **çelişki: KARAR-80/M9** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M9: yalnız 'formül + veto' olarak daraltıldı; yeni formülün ne zaman açılacağı KARAR-61 (+KARAR-65, D-mentör/S-menti yasağı) CEVAPSIZ, kilit korunuyor. |
| AJ-92 | Ş0 | **Yeni eşleştirme formülü bağlanırken "çift ceza" kontrolü** — ortak beklentisi olmayan aday hem elemede düşüp hem skor kaybetmemeli (bugün skorda beklenti yok, çift ceza yok). | 🔴 KARAR-61 (+7b) | Birim testi: elemeyi geçen aday için beklenti örtüşmesi skoru ikinci kez düşürmüyor; PS-A3/F-11 uygulamasının ön koşul testi | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:572` (GÖREV 4) · kanıt: `backend/src/services/matching.ts:343-345` (yalnız eleme) |

## KARAR-62

**Konu:** İlk ölçüm: herkes aynı mı, adaptif mi · kart: `docs/otonom/kararlar/KARAR-062.md`

→ bkz. AN-04 (KARAR-58 grubunda)

## KARAR-64

**Konu:** "Mizaç" mı "karakter" mi "kişilik" mi · kart: `docs/otonom/kararlar/KARAR-064.md`

**Aktif kuyrukta ayrıca bekleyen (satır `00-KUYRUK.md`'de kalır):** AN-10 (kalan ayak: mizaç/karakter/kişilik adlandırması)

**Geri dönüş yeri:** I-01 → 00-KUYRUK § AŞAMA I — İÇERİK (PO "EN ÖN SIRA", 2026-09-03) · I-11 → 00-KUYRUK § AŞAMA I — İÇERİK (PO "EN ÖN SIRA", 2026-09-03) · AN-50 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23) · AN-51 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| I-01 | Ş2 | **madde 31+151 — eşleşen taraflar birbirine nasıl yaklaşacağını hiçbir yerde okumuyor.** 8 hazır metin (4 mentöre + 4 mentiye) YAZILI ama ekranda gösterilmiyor. NEDEN: eşleşen taraflar birbirine nasıl yaklaşacağını okuyamıyor; 8 hazır metin ekrana bağlı değil (madde 31+151). | 🔴 KARAR-64 | Eşleşme kurulunca iki taraf da karşısındakine nasıl yaklaşacağını okuyor | BEKLIYOR | ⭐ **İÇERİK HAZIR — iş "sıfırdan yaz" değil "hazır metni bağla".** ⚠️ **İÇERİK KONSEYİ TEYİDİ (2026-09-21): metin ✅ 8/8 TAM** (yer tutucu/editör notu yok, redaksiyonsuz ekrana konabilir) — **AMA bağlanamaz durumda:** 8 adın hiçbirinin kod değerine (`M1..M4`/`m1..m4`) **eşlemesi yazılı değil** ve "Kâşif" adı üç ayrı anlamda kullanılıyor (canlı DISC kartı C harfi `onboardingController.ts:94,97-98` ↔ canonical mentör M2 `03-psikometri-ve-algoritma.md:14` ↔ yeni menti arketipi `arketip-ve-yaklasim-icerigi-2026-09-03.md:53`). **Ad↔kod eşlemesi bir ÜRÜN KARARIDIR** → I-15/KARAR-10 ile birlikte. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md` §0② / §2.1③. 8/8 metin: `docs/raporlar/icerik/arketip-ve-yaklasim-icerigi-2026-09-03.md:307` (başlık) · mentöre `:322-363` · mentiye `:364-405`. Kod kanıtı (⬜): 5 terim (`approachGuide`·`mentorApproach`·`approachText`·`yaklasim`·`yaklaşım`) × BE `src/`+`prisma/` + FE `src/` harf duyarsız → 11 satır, **0'ı alakalı**. madde 152'den BAĞIMSIZ. Migration yok. ⚠️ = içerik konseyi §2.1, ek bulgu: metin 8/8 TAM doğrulandı (yer tutucu yok, editör notu yok, redaksiyonsuz konabilir) — ama iş "S" değil: şema/seed gerekmiyor, buna karşılık metni gösterecek **eşleşme-detay ekranı FE'de hiç yok** (metin S, uçtan uca **L**) ve ön koşul **ad↔kod eşlemesi** (**KARAR-45**) — anahtarlar `M1..M4`/`m1..m4`, yeni 8 ad için 0 eşleme. · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M16: hazır metinler AN-50 'yönlendirme' diline çevrilerek bağlanacak; AN-50'nin kendisi KARAR-64'e kilitli (CEVAPSIZ) → zincirleme kilit. Ayrıca ad↔kod eşlemesi KARAR-45 (CEVAPSIZ) gerektiriyor. |
| I-11 | Ş1 | **madde 151+152+153 — eşleşme detay sayfası yok.** Bugün yalnız tek cümlelik "neden uyumlu" var. NEDEN: menti "neden bu mentör, nasıl çalışırız, ilk görüşmede ne konuşulur" bilgisini göremiyor; yalnız tek cümle var (madde 151-153). | 🔴 KARAR-64 | Menti "neden bu mentör · nasıl çalışırsınız · ilk görüşmede ne konuşulur" bölümlerini görüyor | BEKLIYOR | hassasiyet: **içerik ön koşullu** — Bölüm 2'nin 16 kombinasyonundan **15'i YAZILMADI**. Katman-1 VAR: `compatibilityReason` render ediliyor (`menti/page.tsx:318`, `mentor/page.tsx:482-484`). Detay rotası YOK (FE dizin listesi teyitli). madde 153: cümle S1/S2/S3'ten DEĞİL, skor eşiğinden üretiliyor (`matchingController.ts:12-15,48-60`; `supportApproach\|needStatement\|threeQuestion` → 0). ⚠️ **Bölüm 1 ve 3 BAĞIMSIZ ilerler** — PO isterse ikiye bölünsün. ⚠️ S1 (`mentiNeeds`) karşı tarafa GÖSTERİLMEZ, yalnız örtüşme cümlesi. ⚠️ = psikometri konseyi §5 D.2 (KOPMA 3), ek bulgu: üç sorunun (mentiNeeds · mentorStrengths · supportApproach · priorityValue) tek yazanı onboardingController.ts; matching.ts · scoring.ts · scoring.service.ts · sector-scorer.service.ts içinde 0 eşleşme ⇒ veri toplanıyor ama hiçbir skorlama dosyasında okunmuyor (I-11'in "detay sayfası" ayağından ayrı, SKORLAMA ayağı). · aile: Y-C · KARAR-80 işlendi (2026-09-26, A kabul) — M16: hazır metinler AN-50 diline çevrilerek bağlanacak; AN-50 KARAR-64'e kilitli (CEVAPSIZ) → zincirleme kilit. · ⛔ **çelişki: KARAR-80/M16** (2026-09-25) |
| AN-50 | Ş3 | ⭐ **"eşleştirme" → "yönlendirme" (kullanıcıya GÖRÜNEN metin).** Ekran metinleri · kartlar · e-posta şablonları · sertifika metinleri · landing'de "eşleştirme" gözden geçir; doğrusu "öneri"/"yönlendirme". | 🔴 KARAR-64 | Kullanıcı "sistem eşleştirir" değil "yönlendirir/önerir" dilini görüyor | BEKLIYOR | kaynak: **KARAR-66 B + PO düzeltmesi** (E.2a). ⛔ **KOD İÇİ teknik adlar DEĞİŞMEZ** (`matching.ts` · `matchScore` · `Match` tablosu) — yalnız kullanıcıya görünen metin. Kapsam beyanı ver (dizin · desen · harf duyarsız · iki dilli). ⚠️ **KARAR-64 (mizaç/karakter/kişilik adı) ile BİRLİKTE yapılmalı** — ayrı yapılırsa kullanıcıya İKİ KEZ metin değişikliği gider. Neden gerekli: sistem eşleştirmiyor, ÖNERİYOR (yanlış vaat). · ⚠️ **2026-09-25 kapı düzeltmesi:** Not'taki bağımlılık: KARAR-64 (mizaç/karakter/kişilik adı) ile BİRLİKTE yapılmalı; KARAR-64 cevapsız. |
| AN-51 | Ş4 | **BELGELERDE "eşleştirme" iddiası gözden geçir** (düşük öncelik). "Eşleştirme" iddiası geçen yerlere `~~üstü çizili~~` + "⚠️ DÜZELTME (2026-09-23, PO): sistem eşleştirmez, YÖNLENDİRİR." | 🔴 KARAR-64 | (belgeler "eşleştirme" değil "yönlendirme" der) | BEKLIYOR | kaynak: KARAR-66 B (E.2b). ⛔ 📸 DONDURULMUŞ belgelerin gövdesini DEĞİŞTİRME; not SONA eklenir. Neden gerekli: iddia belgelerde de yanlış. · ⚠️ **2026-09-25 kapı düzeltmesi:** AN-50 ile aynı terim kararına bağlı (KARAR-64 cevapsız). |

## KARAR-72

**Konu:** Ghost / "kalıcı red" özelliği olacak mı · kart: `docs/otonom/kararlar/KARAR-072.md`

**Geri dönüş yeri:** KR-20 → 00-KUYRUK § ⛔⛔⛔ EN ÜST — KOD İNCELEMESİ BULGULARI (KR, 2026-09-24 taraması · 2026-09-25 kuyruğa işlendi) · AN-33 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| KR-20 | Ş4 | **Ret sonrası tekrar başvuru ve geri onay bozuk (rapor D5).** NEDEN: reddedilen kurum aynı adresle yeniden başvuramıyor ya da yeniden onaylanan kullanıcı giriş yapamıyor (kod inceleme D5). | 🔴 KARAR-72 | Reddedilen kurum aynı adresle tekrar başvurabiliyor; reddedilip onaylanan kullanıcı giriş yapabiliyor | BEKLIYOR | Dosyalar: `backend/src/controllers/selfServeController.ts` · `backend/src/controllers/adminController.ts`. Rapor: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` D5 [teyit gerek]. hassasiyet: hesap durumu/onay (belirsizde 🟡). SIRALI: KR-05'ten SONRA; GV-11 / GV-12 / U-13 ile. · aile: Y-KR · ⛔ **çelişki: KARAR-80/M21** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M21: KR-20 (reddedileni yeniden başvurtma) KARAR-72 (kalıcı red) cevabına kadar bekler — ters yönde olabilir. CEVAPSIZ. |
| AN-33 | Ş4 | **Ghost / "kalıcı red" özelliğini kuyruğa al** (`rejectionType: GHOST`, veri temizleme, reapply bloğu) — KARAR-72 cevabı sonrası. NEDEN: kalıcı ret (ghost) tasarımda var, kodda yok; kötüye kullanan başvurucu sonsuza kadar yeniden başvurabiliyor (CS raporu KN-01). | 🔴 KARAR-72 | Yönetici bir başvuruyu "kalıcı ret" işaretleyince kullanıcı sessizce elenir/yeniden başvuramaz | BEKLIYOR | kaynak: CS raporu (KN-01) · §0.3/§4.1. Kanıt: tasarım `konu/11-tasarim-kararlari-yasam-dongusu-ve-disc.md:53-81` TAM yazılı; kodda **0** (grep ghost/rejectionType boş); bugünkü red `adminController.ts:740 rejectUser` (şeffaf, yeniden başvurulabilir). 7 haftadır hiçbir tura girmemiş öksüz. 🔴: migration + ürün/hukuk kararı. |

## KARAR-73

**Konu:** Değerlendirme AŞAMA 2/3 otomatik pasifleştirme · kart: `docs/otonom/kararlar/KARAR-073.md`

**Geri dönüş yeri:** AN-34 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AN-34 | Ş4 | **Değerlendirme AŞAMA 2/3** (eşik-altı mentörün otomatik pasifleşmesi + yeniden-değerlendirme + onay döngüsü) kuyruğa al — KARAR-73 sonrası. NEDEN: değerlendirme sisteminin 2. ve 3. aşaması yok; düşük puanlı mentör otomatik pasifleşmiyor (CS raporu KN-02). | 🔴 KARAR-73 | Düşük puanlı mentör otomatik pasifleşir, yönetici onayıyla yeniden aktifleşir | BEKLIYOR | kaynak: CS raporu (KN-02) · §4.1. Kanıt: `konu/degerlendirme-metrik-sistemi-tasarim-2026-08-19.md:175-188`; AŞAMA 1 merged (`persistMentorQualityMultiplier` canlı), 2/3 kodda **0**; kuyrukta karşılığı yok (F-07/Y-14 farklı konu). 🔴: migration + ürün kararı. |

## KARAR-74

**Konu:** Kurum (tenant) kalıcı silme hakkı (G1-29) · kart: `docs/otonom/kararlar/KARAR-074.md`

**Geri dönüş yeri:** AN-37 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AN-37 | Ş4 | **Kurum (tenant) kalıcı silme akışı (G1-29)** — KARAR-74 sonrası. NEDEN: platform yöneticisi bir kurumu yalnız dondurabiliyor, KVKK gereği kalıcı silemiyor (G1-29 · CS raporu KN-05). | 🔴 KARAR-74 | Platform admin bir kurumu (yalnız freeze değil) kalıcı silebilir | BEKLIYOR | kaynak: CS raporu (KN-05) · §4.2. Kanıt: `platformRoutes.ts:53 /freeze` var; `hardDeleteTenant` grep **yok**. 🟡/🔴: geri-dönülmez silme + KVKK; çift-onay + tarihli yedek zorunlu (silme protokolü). · aile: Y-F · ⛔ **çelişki: KARAR-80/M19** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M19: KARAR-19 değil KARAR-74'e yönlendirildi (kurum silme kısmı); CEVAPSIZ. |

## KARAR-76

**Konu:** `Tenant.verifiedBy` alanı ne olsun (silme protokolü boşluğu) · kart: `docs/otonom/kararlar/KARAR-076.md`

**Geri dönüş yeri:** AN-08 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AN-08 | Ş3 | **`Tenant.verifiedBy` yazımı** (doğrulama controller'ında `verifiedBy: adminId`). NEDEN: kurumu kimin doğruladığı denetim izine yazılmıyor (A9 · OB-19). | 🔴 KARAR-76 | Kurum doğrulamasında kim onayladı audit izinde | BEKLIYOR | Kaynak: A9 · OB-19. Bilinçli ertelenmiş audit izi. ⚠️ **KARAR-76'ya BAĞLI (2026-09-23):** `Tenant.verifiedBy` alanının kaderi KARAR-76'da (kalsın/karantina/sil) — "sil" gelirse bu iş İPTAL, "kalsın/karantina" gelirse bu yazım işi geçerli. Önce KARAR-76. · ⚠️ **2026-09-25 kapı düzeltmesi:** Not'taki bağımlılık: `Tenant.verifiedBy` alanının kaderi KARAR-76'da; cevapsız. |

## KARAR-78

**Konu:** Dönemlik anket: bağla / karantina / beklet · kart: `docs/otonom/kararlar/KARAR-078.md`

**Geri dönüş yeri:** KR-11 → 00-KUYRUK § ⛔⛔⛔ EN ÜST — KOD İNCELEMESİ BULGULARI (KR, 2026-09-24 taraması · 2026-09-25 kuyruğa işlendi)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| KR-11 | Ş0 | **Dönemlik anket gönderilemiyor ve sayfaya bağlantı yok (rapor A8).** NEDEN: dönemlik anket gönderilemiyor ve sayfasına bağlantı yok; bu geri bildirim hiç toplanmıyor (kod inceleme A8). | 🔴 KARAR-78 | (karara göre) Anket bağlanıp çalışıyor ya da karantinaya alınmış | BEKLIYOR | Dosyalar: `frontend/src/app/(dashboard)/periodic-survey/page.tsx` (+ `backend/src/controllers/feedbackController.ts` şeması). Rapor: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` A8 [D] (anket aynı görüşme-başına-tek `Feedback` kaydına yazıyor → KR-08 / KARAR-77 ile bağlı). ⛔ Silme seçeneği SİLME PROTOKOLÜ'ne tabi (karantina önce). · aile: Y-KR · KARAR-77=A verildi (2026-09-25); KR-11 hâlâ KARAR-78'e bağlı. |

## KARAR-79

**Konu:** Zamanlanmış iş tetikleme yetkisi kimde · kart: `docs/otonom/kararlar/KARAR-079.md`

**Geri dönüş yeri:** KR-05 → 00-KUYRUK § ⛔⛔⛔ EN ÜST — KOD İNCELEMESİ BULGULARI (KR, 2026-09-24 taraması · 2026-09-25 kuyruğa işlendi)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| KR-05 | Ş4 | **Zamanlanmış iş tetikleme uçlarında yetki kapsamı hatalı (rapor B5).** Ayrıntı rapora kapanışta eklenir. NEDEN: zamanlanmış işler karardaki rol ve kapsamın dışında da tetiklenebiliyor (kod inceleme B5 [D]; güvenlik ayrıntısı public repoda yazılmıyor). | 🔴 KARAR-79 | Zamanlanmış işleri yalnız karardaki rol, karardaki kapsamda tetikleyebiliyor | BEKLIYOR | ⭐ Öncelik 3 (B bloğu). Dosyalar: `backend/src/routes/adminRoutes.ts` · `backend/src/controllers/adminController.ts`. Rapor: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` B5 [D]. SIRALI: KR-20 bundan SONRA (aynı `adminController.ts`). · aile: Y-KR |

## KARAR-82

**Konu:** Davet bağlantısı modeli · kart: `docs/otonom/kararlar/KARAR-082.md`

**Geri dönüş yeri:** U-12 → 00-KUYRUK § AŞAMA U — UÇTAN UCA YOLCULUK BULGULARI (2026-09-19)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| U-12 | Ş0 | **Davet token'ı e-postaya bağlı değil, tek kullanımlık değil, iptal edilemez, 30 gün geçerli.** NEDEN: davet bağlantısı sızarsa yabancı biri kalıcı üye olabiliyor (e-postaya bağlı değil, iptal edilemez, 30 gün). | 🔴 KARAR-82 | Karara göre davet token modeli güçlendirildi | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T1)** — davet token'ı e-postaya bağlı değil, iptal edilemez, 30 gün — link sızarsa yabancı kalıcı üye olur · ⚠️ ÜRÜN/GÜVENLİK KARARI GEREKLİ (KARAR aday, merge YOK) + auth. = X §10#16. Kanıt: `selfServeController.ts:562-572`. Efor M ⚠️ **KARTSIZ GİZLİ 🔴 (2026-09-21):** ÜRÜN/GÜVENLİK KARARI gerekli (davet token modeli) ama **kart YOK** → PO cevaplayamaz çünkü soru SORULMAMIŞ. Kart açılana kadar bu satır fiilen kilitli. ⚠️ = güvenlik konseyi §2.C.3, ek bulgu: token modelinden BAĞIMSIZ bir sızıntı kanalı var — davet JWT'si URL path'inde taşınıyor (`invitationRoutes.ts:13`) ve `requestLogger.ts:22-23` `originalUrl`'i olduğu gibi stdout'a basıyor → log'a erişen herkes geçerli davet token'ı toplar. Bu kanal ayrı ve daha ucuz kapanır → **GV-14** olarak ayrı satır açıldı; U-12 kartı beklerken GV-14 ilerleyebilir. · aile: Y-E · 🔴 **kart açıldı (2026-09-25): KARAR-82** |

## KARAR-83

**Konu:** Rolü kim, nasıl değiştirir · kart: `docs/otonom/kararlar/KARAR-083.md`

**Geri dönüş yeri:** U-13 → 00-KUYRUK § AŞAMA U — UÇTAN UCA YOLCULUK BULGULARI (2026-09-19)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| U-13 | Ş4 | **Rol değiştiren (MENTOR↔MENTI) hiçbir uç yok; ADMIN düşürme körlemesine `MENTOR` yazıyor** (`adminController.ts:959`) → aslında MENTI ise rolü bozulur. NEDEN: yanlış rolle kayıt olan düzeltilemiyor; yönetici yetkisi düşürülen menti sessizce MENTOR oluyor. | 🔴 KARAR-83 | Yanlış rolle kayıt düzeltilebiliyor; ADMIN düşürme rolü bozmuyor | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T1+T3)** — rol değiştirme ucu yok, ADMIN düşürme körlemesine `MENTOR` yazıyor — rol sessizce bozulur · hassasiyet: auth/yetki (rol atama). = X §4.5 / §10#17. İki parça: (a) rol-değiştirme ucu yok (ürün) · (b) `:959` hardcoded MENTOR bug'ı. Kanıt: `UpdateUserSchema` `.strict()` (role yok); `adminController.ts:959`. Efor M ⚠️ = güvenlik konseyi §2.A.4 (G-8), ek bulgu: rol kaynağı sorunu yazma ucuyla sınırlı değil — `requireTenant` rolü `TenantMembership`'ten DEĞİL JWT payload'ından okuyor (`tenant.ts:82-85` membership'i çekiyor ama `select:{isActive:true}`, rol seçilmiyor; `:102` `role: payload.role`) → `demoteFromAdmin` (`adminController.ts:951-978`) iki tabloyu da güncellese bile token ≤1 saat ADMIN kalır. Ayrıca admin SAYIMLARI `prisma.user.count({role:'ADMIN'})` ile yapılıyor (`:909,929,960`) → `ensureMembershipSafe` non-fatal olduğu için senkron bozulursa `MAX_ADMINS` ve "son admin" koruması yanlış sayıya dayanır. Token iptali ayağı GV-10'da. · aile: Y-A · 🔴 **kart açıldı (2026-09-25): KARAR-83** |

## KARAR-84

**Konu:** E-posta yokken şifre sıfırlama · kart: `docs/otonom/kararlar/KARAR-084.md`

**Geri dönüş yeri:** U-15 → 00-KUYRUK § AŞAMA U — UÇTAN UCA YOLCULUK BULGULARI (2026-09-19)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| U-15 | Ş0 | **Şifre sıfırlama tek kanala (SMTP) bağımlı;** SMTP hatası kullanıcıya hiç yansımıyor, admin tarafında sıfırlama ucu yok → mail kapalıyken şifresini unutan geri giremez. NEDEN: e-posta çalışmazsa şifresini unutan kullanıcı geri giremiyor ve kimse bunu görmüyor. | 🔴 KARAR-84 | SMTP hatası kullanıcıya yansıyor / admin sıfırlama yolu var | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T2+T3)** — şifre sıfırlama tek kanala bağlı, hata yansımıyor — şifresini unutan geri giremez, kimse görmez · hassasiyet: auth (şifre sıfırlama). ⚠️ PO ADIMI: SMTP teyidi (`03-PO`). = X §4.4 / §10#19. Kanıt: `authController.ts:534-550`; `UpdateUserSchema` password yok. Efor M ⚠️ = güvenlik konseyi §2.C.5, ek bulgu: sıfırlama akışının KENDİSİ örnek nitelikte (256-bit entropi `:534` · SHA-256 hash'li DB kaydı `:535-541` · 60 dk · tek kullanımlık `:580-587` · kullanımda tüm refresh token'lar silinir `:586` · pasif hesaba token verilmez `:531,568`) — sorun kanal bağımlılığında. Ayrı eksik: oturum-içi şifre DEĞİŞTİRME ucu hiç yok ve karmaşıklık kuralı yok → GV-19 (aynı dosya, SIRALI). · aile: Y-E · 🔴 **kart açıldı (2026-09-25): KARAR-84** |

## KARAR-85

**Konu:** Yeni ortamda DISC soru havuzu · kart: `docs/otonom/kararlar/KARAR-085.md`

**Geri dönüş yeri:** U-17 → 00-KUYRUK § AŞAMA U — UÇTAN UCA YOLCULUK BULGULARI (2026-09-19)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| U-17 | Ş0 | **Temiz DB'de DISC havuzu boş kalıyor ve yalnız yıkıcı `prisma/seed.ts` ile dolabiliyor** (`createQuestion` DISC'i 403'lüyor). Yeni ortam kurulurken patlar. NEDEN: yeni ortam kurulurken DISC soru havuzu boş kalıyor; tek dolum yolu her şeyi silen `seed.ts` (çıkış blokeri T2). | 🔴 KARAR-85 | Temiz DB'de DISC havuzu güvenli yolla dolabiliyor | BEKLIYOR | ⛔ **ÇIKIŞ BLOKERİ (T2)** — temiz DB'de DISC havuzu boş — yeni ortam kurulurken patlar; tek yol yıkıcı `seed.ts` · hassasiyet: SEED + yıkıcı `seed.ts` riski (PO kararı). = X §4.6 / §10#21. Kanıt: `questionService.ts:174`; `questionController.ts:124-129`; `seed.ts:295-319` koşulsuz `deleteMany`. Efor L ⚠️ = güvenlik konseyi §3.3, ek bulgu: aynı dosyada ikinci sorun — `prisma/seed.ts` prod'da çalışmayı ENGELLEYEN guard taşımıyor (*kapsam:* `prisma/seed.ts`, desen `NODE_ENV\|isProd` harf duyarsız → 0) ve `:293` sabit bir seed şifresi içeriyor (`:383` yorumu düz metin tekrarlıyor). U-17 ile BİRLİKTE yapılmalı: dosyaya dokunulurken guard da eklensin. ⚠️ = psikometri konseyi §4 C.1, ek bulgu: havuz boşken /disc-test DOĞRU davranıyor (DiscTestEmpty, K-02'de düzeltilmiş) ama /onboarding savunmasız (→ PS-11); ayrıca mantık hatası questionService.ts:173 ve questionController.ts:327'de 0 >= 0 ⇒ havuz TEK soruya düşerse ilk cevapta discAssessmentCompletedAt yazılır ve admin'e "test tamamlandı" e-postası gider. · aile: Y-G · **KARAR-80/M21 sıra notu:** seed koruması ayağı = KR-01 (#91 merge edildi). · 🔴 **kart açıldı (2026-09-25): KARAR-85** |

## KARAR-87

**Konu:** Birden çok platform yöneticisi olacak mı? · kart: `docs/otonom/kararlar/KARAR-087.md`

**Geri dönüş yeri:** AN-38 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AN-38 | Ş4 | **`reviewedBy` gerçek kimlik** — `platformController.ts:525` sabit `'platform-admin'` düzelt (G4-15). | 🔴 KARAR-87 | Rapor incelendi kaydında gerçek yönetici adı görünür | BEKLIYOR | kaynak: CS raporu (KN-06) · §4.2 "kuyruk-boşluğu" (kart var, F-satırı yok). Kanıt: `platformController.ts:525`. Düşük efor. · ⚠️ **2026-09-25:** platform yöneticisi tek ortak hesap (`platformController.ts:35-60`, `sub: 'platform-admin'`) → kaydedilecek başka kimlik yok; "gerçek ad" yeni hesap modeli ister → **KARAR-87** |

## KARAR-88

**Konu:** Hakkımızda / İletişim + yüzen WhatsApp · kart: `docs/otonom/kararlar/KARAR-088.md`

**Geri dönüş yeri:** Y-07 → 00-KUYRUK § AŞAMA Y — YOL HARİTASI + KARAR TAKİBİ DEVRİ (2026-09-21) · Y-11 → 00-KUYRUK § AŞAMA Y — YOL HARİTASI + KARAR TAKİBİ DEVRİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| Y-07 | Ş4 | **madde 57 — Hakkımızda ve İletişim sayfaları yok.** NEDEN: ziyaretçi Hakkımızda ve İletişim sayfalarını bulamıyor; kuruma ulaşma yolu yok (madde 57). | 🔴 KARAR-88 | Ziyaretçi /hakkimizda ve /iletisim'i açıp iletişim yolunu görüyor | BEKLIYOR | Kanıt (4 desen `*hakkimizda*`/`*iletisim*`/`*about*`/`*contact*`, `find`, harf duyarsız → **0**): `frontend/src/app/` dizin listesi. ⚠️ Y-06 ile **aynı dosyalara** dokunur → **SIRALI** (önce Y-06 Footer bileşeni). İletişim bilgisi **PO'dan** gelmeli. · ⚠️ **2026-09-25:** metin + iletişim bilgisi PO'dan gelmeli → **🔴 KARAR-88**. |
| Y-11 | Ş4 | **madde 60+61 — "yukarı çık" ve yüzen WhatsApp düğmesi yok.** NEDEN: "yukarı çık" ve yüzen iletişim düğmesi yok (madde 60+61). | 🔴 KARAR-88 | Kullanıcı sağ-altta iki düğmeyi görüp kullanıyor | BEKLIYOR | Kanıt: `frontend/src/`, 6 terim (`scrolltotop`·`scrollTo(0`·`scrollTo({ top: 0`·`yukarı çık`·`back-to-top`·`backToTop`), harf duyarsız → **0**. ⚠️ **RAPOR DÜZELTMESİ:** WhatsApp yalnız `ShareButtons.tsx:21` denmişti; **ikinci kullanım `(admin)/admin/invite/page.tsx:39,77,209`** (davet metni şablonu) — ikisi de yüzen iletişim düğmesi DEĞİL. Klavye erişimi + `aria-label` zorunlu. Numara PO teyidi ister. · ⚠️ **2026-09-25:** WhatsApp ayağı (numara + düğme olsun mu) → **🔴 KARAR-88**; "yukarı çık" ayağı teknik, bağımsız yapılabilir. · 🟡 **KISMEN (2026-09-25):** "yukarı çık" ayağı çatı #299 (`f769daf`, inceleme https://github.com/zahidsamiata/menti-mentor-v2/pull/299#issuecomment-5829486936) · `frontend/src/components/atoms/ScrollToTopButton.tsx` · kök `app/layout.tsx` · test `scroll-to-top-button.test.tsx` (8; negatif: eşik altında gizli). CANLIDA BAK: uzun sayfada 600px aşağı inince sağ-altta ↑ düğmesi; tıklayınca/Enter ile başa döner. **Kalan:** WhatsApp → KARAR-88. · ⚠️ **2026-09-25 kapı düzeltmesi:** "yukarı çık" ayağı BITTI (#299); kalan WhatsApp ayağı KARAR-88'e bağlı. |

## KARAR-89

**Konu:** Görüşme değerlendirmesinin tek kutusu · kart: `docs/otonom/kararlar/KARAR-089.md`

**Aktif kuyrukta ayrıca bekleyen (satır `00-KUYRUK.md`'de kalır):** AN-49 (kart KARAR-89 bu işi kilitlediğini söylüyor (tek değerlendirme kutusu))

**Geri dönüş yeri:** KR-08 → 00-KUYRUK § ⛔⛔⛔ EN ÜST — KOD İNCELEMESİ BULGULARI (KR, 2026-09-24 taraması · 2026-09-25 kuyruğa işlendi) · AJ-49 → 00-KUYRUK § AJAN-EKLEDİ SATIRLAR (K-C · PO kararı 2026-09-26, kalıcı)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| KR-08 | Ş0 | **Bir görüşmeye yalnız bir taraf değerlendirme yazabiliyor (rapor A5).** NEDEN: görüşmede ilk yazan tarafın değerlendirmesi kaydediliyor, diğerininki kayboluyor (kod inceleme A5). | 🔴 KARAR-89 | (karara göre) Mentör ve menti aynı görüşmeye ayrı ayrı değerlendirme yazabiliyor | BEKLIYOR | Dosyalar: `backend/prisma/schema.prisma` · `backend/src/controllers/feedbackController.ts`. Rapor: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` A5 [D]. ⛔ **MIGRATION** → tarihli yedek tablo + PO onayı (Y-G kuralları). İlişkili: AN-47 (geri bildirim modelleri envanteri). · aile: Y-KR · ⭐ **KARAR-77=A (2026-09-25).** Görünürlük testle kanıtlanacak (karşı taraf göremez · yönetici görür · yazan kendini görür). Önce AN-47 envanterine bak; çelişki varsa BASARISIZ + sebep. Mevcut kayıtların 'yazan kim' yorumu PR açıklamasında örnekle gösterilecek. · ⛔ **ÇELİŞKİ (2026-09-25, AN-47):** `MeetingCheckIn` KARAR-77=A'nın istediği taraf-başına kaydı zaten uyguluyor; `Feedback` bölünürse ikinci kutu doğar → **KARAR-89** cevaplanana kadar dokunulmaz. · ⭐ **KAPI HÜCRESİ SADELEŞTİ 2026-09-27 (GÖREV 0.2):** tek 🔴 = KARAR-89 (cevapsız, `01-KARARLAR.md` KARAR-89 CEVAP boş). |
| AJ-49 | Ş0 | **Görüşme değerlendirmesini (Feedback) okuma ucunun sahibi yok** — `GET /api/meetings/:meetingId/feedback` korumalı ama hiçbir ekran çağırmıyor; tabloya yazan tek ekran (dönemsel anket) AJ-14'te bozuk. E-3e bunu değil check-in'i okuyor. | 🔴 KARAR-89 (+KARAR-110) | Değerlendirme ekranda görünüyor ya da uç bilinçli iç kullanımda bırakıldı ve belgede yazılı | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `bitti-dogrulama-2026-09-27.md` § GÖREV B teyit (e3:30/:66), 7b #379 N1 · kanıt: `backend/src/controllers/feedbackController.ts:153-200` (tenant `:163`, taraf kapısı `:173-175`); ön yüz GET çağrısı yok (`frontend/src`, yalnız POST `periodic-survey/page.tsx:55`); iç okuyucu `backend/src/services/scoring.ts:129` · karar gerekebilir: Feedback tablosu kalsın mı (KARAR-89) · `PATCH /api/meetings/:id` ön yüzde çağrılmıyor → silme protokolü adayı (SİLME YOK) |

## KARAR-93

**Konu:** Üyeyi kurumdan çıkarma — 30 gün sonra kişilik verisi silme onayı · kart: `docs/otonom/kararlar/KARAR-093.md`

**Geri dönüş yeri:** Y-14 → 00-KUYRUK § AŞAMA Y — YOL HARİTASI + KARAR TAKİBİ DEVRİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| Y-14 | Ş3 | **madde 36 — onaylı üyeyi kurumdan çıkarma ekranda YOK.** Backend zaten yapabiliyor; eksik olan düğme ve doğru e-posta metni. NEDEN: yönetici onaylı bir üyeyi kurumdan çıkaramıyor; düğme ve doğru bilgilendirme e-postası yok (madde 36). | 🔴 KARAR-93 | Yönetici onaylı bir üyeyi kurumdan çıkarabiliyor ve kişi doğru metinli bilgilendirme alıyor | BEKLIYOR | hassasiyet: yetki/rol akışı. ⚠️ **RAPOR DÜZELTMESİ — iş sanılandan KÜÇÜK.** Backend VAR: `adminController.ts:740-781` `rejectUser`, tek engel `:755` (REJECTED→409); **APPROVED engellenmiyor**. FE sarmalayıcı da VAR: `lib/api/admin.ts:83`. Eksik: **düğmenin onaylı-üye ekranlarına mount'u** (`mentor-havuzu`/`menti-havuzu`/`managers` bugün yalnız `rejectedAt` OKUYOR) **+ ayrı e-posta metni** — `emailService.ts:174` *"dilerseniz tekrar başvurabilirsiniz"* onaylı üye çıkarılırken **yanlış** (`adminController.ts:771-777` bunu da gönderiyor). 🔓 **KİLİT AÇILDI + KAPSAM GENİŞLEDİ (2026-09-22, KARAR-33 → B + detaylar).** Kapı **hassasiyet: ** — KVKK/silme + matching istisnası. Genişleyen kapsam (KARAR-33 CEVAP): (1) üyelik **dondurulur**, geçmiş kalır · (2) yönetici çıkarırken **SEBEP seçer**, mesaj tonu sebebe göre değişir · (3) yönetici çıkardıysa 30 gün içinde geri alınmazsa **karakter analizi (DISC/arketip/psikometri) SİLİNİR** (yeni zamanlı iş) · (4) kişi kendisi çıktıysa `/me/delete-account` akışıyla uyumlu, KVKK süresi · (5) mentörün **görüşme SAYISI düşmez** · (6) mentör geçmişinde eski üye adı **SOLUK** görünür — ⚠️ **AVUKAT onayına bağlı** (onaylanmazsa "Eski üye"). Bu ayak güvenlik konseyi ③'ü (`Match.mentorArchetype`) de çözer. Detay: `01-KARARLAR.md` KARAR-33 CEVAP. · aile: Y-B · **KARAR-80/M21 sıra notu:** GV-10 ve KR-20'den SONRA; arketip silme tek satırda (GV-08). · ⛔ **2026-09-25 doğrulama (düğme BAĞLANMADI):** `rejectUser` (`adminController.ts:760-770`) kurumdan değil **bütün platformdan** kapatıyor (User tek hesap, `schema.prisma:268` e-posta @unique; `TenantMembership` dokunulmuyor), "tekrar başvurabilirsiniz" e-postası (`emailService.ts:174`) + `reapply` ile kendi geri dönebiliyor (`authController.ts:441-453`) → KARAR-33 (B)'ye aykırı. İş yeniden tanım: backend'de kurum bazlı dondurma + sebep + mesaj + (30 gün sonra psikometri silme → canlı veri silme → **KARAR-93** evet/hayır). Sıra: GV-10 · KR-20 sonrası. |

## KARAR-94

**Konu:** Dışa aktarım hakkı (GV-17) çıkış blokeri olsun mu · kart: `docs/otonom/kararlar/KARAR-094.md`

**Geri dönüş yeri:** GV-17 → 00-KUYRUK § AŞAMA GV — GÜVENLİK VE KVKK KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| GV-17 | Ş3 | **Kişi kendi psikometrik profilini dışa aktaramıyor.** OCEAN/arketip/DISC türevlerinin tamamı ve kendi yazdığı mesajların içeriği dışa aktarımda yok. NEDEN: kullanıcı KVKK dışa aktarımında kendi psikometrik profilini ve mesajlarını alamıyor (güvenlik konseyi §2.B.3). | 🔴 KARAR-94 | Kullanıcı verilerini indirdiğinde artık kendi psikometrik profilini ve kendi yazdığı mesajları da görüyor | BEKLIYOR | 🟡 KVKK. **B.3 · güvenlik konseyi §2.B.3.** Kanıt: `exportUserData` `gdprService.ts:284-333` yalnız **6 kaynak**; `UserProfile` **hiç yok**; `:314` mesaj **yalnız `count`** (tip `:280-281` → FE `kvkk.ts:20-22`). **16 tablo + ≈22 `User` alanı** eksik. ⚠️ **K-12 (BITTI) FE işiydi** — özet backend'in verdiğinden fazlasını üretemez; eksiklik **backend kaynaklı**, K-12 bayat sayılmaz. ⚠️ V-10 (BITTI) bu ucun rate limitini kapattı · aile: Y-B · ⛔ **çelişki: KARAR-80/M18** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M18: GV-17 (dışa aktarım hakkı) için PO'ya ayrı karar kartı açıldı — bkz. KARAR-94 (çıkış blokeri olsun mu). CEVAPSIZ. |

## KARAR-95

**Konu:** Kriz kanalı — güvenlik sorusu olarak yeniden · kart: `docs/otonom/kararlar/KARAR-095.md`

**Geri dönüş yeri:** I-18 → 00-KUYRUK § AŞAMA I — İÇERİK (PO "EN ÖN SIRA", 2026-09-03) · IC-13 → 00-KUYRUK § AŞAMA IC — İÇERİK KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| I-18 | Ş0 | **madde 159 — kriz bildirimi akışı yok.** Kendine zarar ifadesinde kimse haberdar olmuyor; sertifikada senaryo olarak SINANIYOR ama canlı karşılığı yok. NEDEN: kendine zarar ifadesinde kimse haberdar olmuyor; kriz akışı yok (madde 159). | 🔴 KARAR-95 | Kriz ifadesinde kurum yöneticisine bildirim gidiyor | BEKLIYOR | ⛔ **HUKUKİ ÖN KOŞUL.** Kanıt (7 terim, İKİ DİLLİ, harf duyarsız, BE `src/`+`prisma/seed.ts`+FE `src/`): `kriz`·`crisis`·`selfharm`·`self-harm`·`kendine zarar`·`acil durum`·`emergency` → **2 satır, 0'ı akış** (`analyticsEngine.ts:299` iş unvanı listesi · `admin/certification/page.tsx:23` sınav konu etiketi); ayrıca `seed-certification.ts` `topic:'kriz-yonetimi'` = **sınav konusu**, bildirim akışı değil. ⚠️ **G1-01 ÇELİŞKİSİ:** 18 yaş altı menti kabul edilecekse gerçek yaş + veli onayı gerekir → "18+ beyanı yeterli" çöker. Avukat paketine TEK SORU. · ⛔ **çelişki: KARAR-80/M20** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M20: KARAR-69 (c) gereği kriz kanalı HUKUK değil GÜVENLİK sorusu; yeni kart KARAR-95 açıldı. CEVAPSIZ. |
| IC-13 | Ş1 | **Menti tarafında kriz/kötü-muamele içeriği ve bildirim kanalı YOK.** NEDEN: menti kriz ya da kötü muamele yaşarsa ne yapacağını ve nereye başvuracağını ekranda göremiyor. | 🔴 KARAR-95 | Menti, kendisi ya da mentörü kaynaklı bir sorunda ne yapacağını ekranda okuyor ve nereye başvuracağını biliyor | BEKLIYOR | §4.3. `menti/orientation-guide/page.tsx:17-63` dört senaryo içeriyor, **hiçbiri** kriz/kötü muamele/sınır ihlali değil. Menti *"sadece konuşacak biri lazım"* diyebiliyor (`threeQuestionsText.ts:30`) ama bu yalnız eşleştirme sinyali, hiçbir destek çerçevesine bağlanmıyor. Tek "bildir" kanalı kriz için değil: `/bildir` kapsamı sahte kurum kaydı/yetkisiz davet (`bildir/page.tsx:55`). ⚠️ **`I-18`/KARAR-31'in MENTİ ayağı** — I-18 yalnız "kurum yöneticisine bildirim" tarafını kapsıyor. ⚠️ KARAR-4 (somut destek kaynağı adı) buraya da bağlı: ürün içindeki tek somut kaynak adı *"okul psikoloğu"* (`seed-learning-journey.ts:196`) — yetişkin menti/STK için karşılığı yok. Efor M · ⛔ **çelişki: KARAR-80/M20** (2026-09-25) · KARAR-80 işlendi (2026-09-26, A kabul) — M20: I-18 ile birlikte KARAR-95'e bağlandı. CEVAPSIZ. |

## KARAR-102

**Konu:** Kayıttan sonra hemen giriş mi, önce e-posta doğrulaması mı (e-posta sızıntısının son kalıntısı) · kart: `docs/otonom/kararlar/KARAR-102.md`

**Geri dönüş yeri:** GV-12 → 00-KUYRUK § AŞAMA GV — GÜVENLİK VE KVKK KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| GV-12 | Ş4 | **Kurum kaydında "bu e-posta zaten kayıtlı" deniyor — üyelik bilgisi sızıyor.** Aynı kontrol normal kayıt akışında bilinçli olarak gizleniyor. NEDEN: kurum kaydı bir e-postanın sistemde kayıtlı olup olmadığını ele veriyor (üyelik bilgisi sızıyor; güvenlik konseyi §2.C.5-B). | 🟢 | Kayıtlı ve kayıtsız e-posta artık iki kayıt yolunda da **aynı** yanıtı alıyor | ATLANDI(karar) | 🟡 auth. **C.5-B · güvenlik konseyi §2.C.5-B, orkestratör teyitli.** Şiddet: 🔴 açık oracle. Kanıt: `selfServeController.ts:262-267` `409 EMAIL_MEVCUT` ↔ `authController.ts:177-184` **bilinçli enumeration-safe** (kodda açıklayıcı yorum). Tek fren IP 5/dk (`rateLimiter.ts:239`) ≈ 7.200 adres/gün/IP. ⭐ k-anonimlik (P-00) ve IDOR ile **aynı sınıf**: koruma bir yolda var, ikinci yol açık. ⚠️ Zamanlama yan-kanalı (`login` bcrypt atlama `:292`, `forgot-password` `:531-550`) **ayrı ve daha küçük iş**; sabit-zaman deseni `platformController.ts:23-32`'de zaten var · aile: Y-A · ⚠️ **denetimde tutmadı (K5-Y2, 2026-09-26):** 409 kalktı ama yanıt gövdesi (tenant/user null vs dolu) ve sonraki ekran kayıtlı/kayıtsız e-postayı ayırt ettiriyor (`selfServeController.ts:264-275`, kod yorumu `:269-270` "bilinen sınır"; FE `Step4Account.tsx:110-140`). Rapor `docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md`. · ⏭️ **ATLANDI(karar) 2026-09-26:** kalan sızıntı (farklı sonraki ekran) yalnız oturumsuz kayıtla tam kapanır — ürün kararı → **KARAR-102** (öneri C). 409 kaldırma kısmı canlıda. · DURUM: 409 ayağı BITTI (backend #131 + çatı #312, 2026-09-26); kalan sızıntı KARAR-102'de · geçmiş: bkz. `docs/otonom/arsiv/00-KUYRUK-gecmis.md` § GV-12 (2026-09-28) |

## KARAR-103

**Konu:** Eski planlardaki 13 yapılmamış özellik — hangileri yapılsın · kart: `docs/otonom/kararlar/KARAR-103.md`

**Aktif kuyrukta ayrıca bekleyen (satır `00-KUYRUK.md`'de kalır):** AJ-78 (kalan ayak: dönemsel tarih aralığı (md.10))

**Geri dönüş yeri:** AJ-11 → 00-KUYRUK § AJAN-EKLEDİ SATIRLAR (K-C · PO kararı 2026-09-26, kalıcı)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AJ-11 | Ş0 | **Eski planlardaki 13 yapılmamış özellik — yapılsın mı?** (platform büyüme grafiği · platform ayarlar ekranı · plan/paket sınırları · yönetici demo modu · üye persona şablonları · kurum etki duvarı · kurumdan kuruma davet · mentör rozetleri · mentörde sektör filtresi · kurum KPI trendi · gerçek telefon bildirimi · soru bankasında ters kodlu sorular · mentör bildirim sıklığı) NEDEN: eski planlarda söz verilmiş 13 özellik ne yapıldı ne reddedildi; PO hangilerinin yapılacağına karar vermeli (g-kart doğrulaması). | 🔴 KARAR-103 | PO'nun seçtiği özellikler ayrı AJ satırı olarak kuyruğa giriyor; seçilmeyenler v2'ye | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: `g-kart-dogrulama-2026-09-26.md:103,136,137,143,148,151,154,155,157,159,160,166,167` · kanıt: kart KARAR-103'te her kalem için dosya:satır. Hepsi "özellik var mı yok mu" = ürün kararı. |

## KARAR-105

**Konu:** Kurumlar arası anonim karşılaştırma: izni kim açar, hangi sayılar paylaşılır · kart: `docs/otonom/kararlar/KARAR-105.md`

**Geri dönüş yeri:** AN-31 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AN-31 | Ş3 | **Kurumlar arası anonim toplu veri izni + gösterimi** (yalnız k-anonim toplu, kişi düzeyi YOK). NEDEN: kurumlar birbirleriyle anonim toplu karşılaştırma yapamıyor (KARAR-34 SORU 2 → B). | 🔴 KARAR-105 | İzin veren kurum anonim toplu karşılaştırma görüyor | BEKLIYOR | Kaynak: **KARAR-34 SORU 2 → B** (Bölüm 3). Altyapı hazır: `backend/src/services/mask.ts` · `applyKAnonymity`. 🟡 KVKK. · aile: Y-B · ⭐ **KAPI 2026-09-27:** 🟢→🔴 KARAR-105 — uygulama denemesi (salt-okuma) kararın izin yerini ve metrik setini tanımlamadığını ve kalıcı izin alanı için migration gerektiğini gösterdi (`backend/prisma/schema.prisma:181-262` Tenant'ta uygun alan yok; `isSharedPoolActive` :185 farklı özellik — kişi-düzeyi eşleştirme havuzu; AN-30'un `KURUMLARARASI_PAYLASIM` rızası kişi-düzeyi ve henüz merge değil). Altyapı hazır: `backend/src/services/mask.ts:70` `applyKAnonymity`. |

## KARAR-110

**Konu:** Periyodik anket (ilişki geneli değerlendirme) ne olsun · kart: `docs/otonom/kararlar/KARAR-110.md`

**Geri dönüş yeri:** AJ-14 → 00-KUYRUK § AJAN-EKLEDİ SATIRLAR (K-C · PO kararı 2026-09-26, kalıcı)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AJ-14 | Ş2 | **Periyodik anket gönderimi her zaman reddediliyor** — sayfa `periodic*` alanlarını gönderiyor, sunucu şeması bunları tanımıyor ve "en az bir puan" kuralıyla 400 dönüyor. Sayfaya hiçbir yerden bağlantı da yok. | 🔴 KARAR-110 | Periyodik anket (doğrudan adresle açılınca) gönderiliyor ve kaydediliyor | BEKLIYOR | ajan-ekledi 2026-09-27 · kaynak: E-3e alt ajan yan bulgusu (çatı #372) · kanıt: `backend/src/controllers/feedbackController.ts:11-30` (`FeedbackSchema` yalnız 5 puan + 2 metin; `.refine` en az bir puan ister; bilinmeyen alanlar atılır) ↔ `frontend/src/app/(dashboard)/periodic-survey/page.tsx:55-64` (yalnız `periodicNpsScore/TrustScore/ConfidenceScore/CareerGrowth` + `specificComments` gönderiyor) · model alanları var: `backend/prisma/schema.prisma:644-648` (migration gerekmez) · bağlantı: ön yüz ve backend'de `periodic-survey` referansı 0. ⚠️ Sayfayı kullanıcıya BAĞLAMAK (ne zaman/kime gösterilir) ayrı ürün sorusu — bu satır yalnız gönderimi düzeltir. · ⚠️ **GİZLİLİK NOTU (E-3e 7b yan bulgusu, 2026-09-27):** `getMeetingFeedback` (`feedbackController.ts:152-200`) `specificComments` + `periodic*` alanlarını MENTÖRÜN kendi alanı sayıp mentöre açıyor; periyodik anketi menti doldurursa mentinin notu mentöre görünür. Bugün sızıntı yok (gönderim zaten başarısız). Düzeltmede periyodik alanlar kimin yazdığına göre ayrılmalı (ya da ayrı sütun/kayıt → 🔵) — KARAR-80 M22 "en dar görünürlük". · ⭐ **KAPI 2026-09-27:** 🟢→🔴 KARAR-110 — düzgün düzeltme yeni kayıt yapısı (migration) + gösterim kararı istiyor; tek satırlık `Feedback`'te iki rolün cevabı çakışır ve gizlilik (M22) bozulur. |

→ bkz. AJ-49 (KARAR-89 grubunda)

## KARAR-113

**Konu:** Sertifika sınavında her seferinde kaç konu sorulsun, baraj neye göre? (AJ-34 / madde 149) · kart: `docs/otonom/kararlar/KARAR-113.md`

**Geri dönüş yeri:** AJ-34 → 00-KUYRUK § AJAN-EKLEDİ SATIRLAR (K-C · PO kararı 2026-09-26, kalıcı)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AJ-34 | Ş0 | **Sertifika sınavında "4 rastgele konu" çekimi devrede değil** — `maxTopics` verilmiyor, tüm aktif sorular geliyor (I-04 kalanı). | 🔴 KARAR-113 | Sınav 4 garanti + 4 rastgele konudan kuruluyor; çağrı noktası testli | ATLANDI(karar) | ajan-ekledi 2026-09-27 · kaynak: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md` (I-04, parti 08 mutasyon + QA) · kanıt: `backend/src/services/certification.service.ts:320` · eski BITTI: I-04 `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:163` · karar gerekebilir: örnekleme açılmadan önce puanlama paydası · ⏸ **2026-09-27 ATLANDI(karar):** uygulayıcı kodda doğruladı — çekimi açmak barajın anlamını ve kuruma görünen metni değiştiriyor → **KARAR-113** (A 4+4 & 8'de 7 · B bugünkü gibi hepsi · C 4+4 & tüm konular). Kod yazılmadı. Not: A seçilirse çekim `userId+tenantId+certAttempts` tohumuyla belirlenimli olmalı (sunucu, gösterilen çekimi puanlamada yeniden hesaplar; migration yok) + negatif test: çekilmeyen konunun cevabı sayılmaz. |

## KARAR numarasız 🔴

Kapısında KARAR numarası olmayan 🔴 satırlar (silme protokolü · karar çelişkisi · keşif · açılmamış kart taslağı). Kilidi açan koşul satırın Kapı/Not hücresinde.

**Geri dönüş yeri:** AN-45 → 00-KUYRUK § AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23) · AJ-64 → 00-KUYRUK § AJAN-EKLEDİ SATIRLAR (K-C · PO kararı 2026-09-26, kalıcı) · AJ-67 → 00-KUYRUK § AJAN-EKLEDİ SATIRLAR (K-C · PO kararı 2026-09-26, kalıcı) · AJ-97 → 00-KUYRUK § AJAN-EKLEDİ SATIRLAR (K-C · PO kararı 2026-09-26, kalıcı)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| AN-45 | Ş3 | **G2-10 eşleşme tetikleyicisi** (event vs sayfa-açılış) kararı — keşif. NEDEN: eşleşmenin ne zaman hesaplandığı belirsiz; menti güncel olmayan öneriler görebilir (G2-10 · CS raporu KN-13) — etki: teyit. | 🔴 keşif | Eşleşme ne zaman hesaplanır netleşir | BEKLIYOR | kaynak: CS raporu (KN-13). Kanıt: `G2-eslestirme-psikometri.md` G2-10. ⚠️ **NUMARA ÇAKIŞMASI:** kuyrukta F-fazı "G2-10 🗑️" (satır 243) **FARKLI kalem** (qm² çift-çarpım, PR #138'de çürütüldü) — CS'nin G2-10'u eşleşme tetikleyicisidir, karıştırma. 🔴: keşif kararı gerekir (KARAR kartı henüz yok). · sahip: PO (keşif kararı — KARAR kartı henüz açılmadı → GÖREV 3; kart taslağı: ajan) |
| AJ-64 | Ş0 | **Mentör aday listesinde mentinin DISC harfi yok** (AN-35 Ö2 · admin KARAR 2+5: mentör menti tipini görür) — mentöre dönen DTO türetilmiş harf alır, ham vektör yok. | 🔴 karar çelişkisi (önce doğrula) | Mentör aday kartında menti için "DI" gibi harf görüyor | BEKLIYOR | ajan-ekledi 2026-09-27 (AJ-46/AN-35) · kaynak: `tasarim-kararlari-admin.md` § Statü, Ö2 · kanıt: `backend/src/controllers/matchingController.ts:12-17` (`buildPublicItem`) DTO'da DISC tipi yok · `P-04` (uyum yüzdesi) ile aynı ekran → birlikte yapılabilir · ⚠️ **ÇELİŞKİ (7b #404):** `backend/src/controllers/matchingController.ts:10-11` kasıtlı karar "KARAR 3: … DISC tipi açıklanmaz" ↔ `tasarim-kararlari-admin` KARAR 5 ("mentör mentinin tipini görür"). Uygulamadan ÖNCE hangi kararın geçerli olduğu doğrulanır (01-KARARLAR + cevaplanmış arşiv); çelişki sürerse KARAR kartı açılır. DISC = psikometrik veri (KVKK) — 🟢 işlenmez. · sahip: önce ajan (7b #404 çelişkisini koda karşı doğrula), sonra PO (çelişki kalırsa KARAR kartı → GÖREV 3) |
| AJ-67 | Ş0 | **Başlangıç sektör/etiket havuzunun tek kaynağı yok + profilde havuzdan seçim yok** (AN-35 Ö5 · admin KARAR 12) — onboarding listesi frontend'e gömülü ve tehlikeli `seed.ts` havuzuyla farklı; onaylanan öneri ortak havuza girmiyor. | 🔴 KARAR (kart taslağı hazır, açılmadı) | Kullanıcı profilinde sektörünü hazır listeden seçiyor; onaylanan öneri herkesin listesine giriyor | BEKLIYOR | ajan-ekledi 2026-09-27 (AJ-46/AN-35) · kaynak: `tasarim-kararlari-admin.md` § Statü, Ö5 · kanıt: `frontend/src/app/onboarding/_steps/ProfileStep.tsx:12-16` · `SectorTagSuggest.tsx:15` · ürün sorusu: havuz kodda sabit liste mi, yönetici-yönetilir tablo mu (ikincisi şema değişikliği) — KARAR kartı taslağı AJ-46 PR'ında, `01-KARARLAR.md`'ye ana ajan açacak · sahip: PO (KARAR kartı taslağı AJ-46 PR'ında hazır, `01-KARARLAR`'a henüz açılmadı → GÖREV 3; açılışı: ana ajan) |
| AJ-97 | Ş0 | **Eski `kvkkConsentAt` alanları (User/Tenant) artık okunmuyor ama duruyor** (AJ-88 kalanı; consent planı `docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:46` "kaldırılması ayrı iş") — iki kaynak yan yana kaldıkça biri yanlışlıkla yeniden okunabilir. | 🔴 silme protokolü | Önce okuma/yazma envanteri (dual-write hâlâ yazıyor mu, kimse okumuyor mu — dosya:satır); sonra NİYET → İKAME (Consent tablosu) → arşiv → karantina (okuma yolu yok, yazım durdurulur mu PO) → PO ikinci onayıyla kolon | BEKLIYOR | ajan-ekledi 2026-09-28 · kaynak: AJ-88 (backend #218) · `docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:46` · kanıt: `backend/prisma/schema.prisma` `kvkkConsentAt` (User, Tenant) · okuma yolu kaldırıldı `backend/src/controllers/platformTenantController.ts` (AJ-88) · NEDEN: KVKK kaydının tek kaynağı olmalı · kısım kapısı: karantina 🔵 · gerçek silme PO ikinci onayı; kolon düşürme = migration · sahip: PO (silme protokolü — karantina için 🔵 EVET kartı, gerçek silme ikinci onay; kart henüz açılmadı → GÖREV 3). Ön adım (okuma/yazma envanteri): ajan |
