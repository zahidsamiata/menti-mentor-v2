# BELGE BİLANÇOSU — TUR 2 / GRUP B (`docs/raporlar/kesif/` — 10 belge)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Tur 2/GRUP-B · Salt-okuma defter. Kod/DB/PR/commit YOK.

> **Ne bu:** `docs/raporlar/kesif/` altındaki 10 KEŞİF fotoğrafının (çoğu 2026-08-02, biri 2026-08-19) baştan-sona
> okuma-sayımı. Her karar/iş/niyet/bulgu/öneri kalemi tek satır. Çapraz-referans: `T1-A-canonical.md` (numaralı
> envanter + A1-A23 numarasız + Ç1-Ç6), `T1-B2-kararlar-konu.md`, `T1-B3-kararlar-ozdenetim.md`.
> **Kod SALT-OKUNDU** (12 nokta doğrulaması aşağıda §4); DEĞİŞTİRİLMEDİ. DB'ye dokunulmadı. Numara DOĞURULMADI.
> Belge SİLİNMEDİ/TAŞINMADI. Hakem OLUNMADI. Bu belgeler 2026-08-02..19 keşif fotoğraflarıdır — içlerindeki
> "eksik/⏳/❌" bulgularının çoğu ARADAN yapılmış olabilir; her satır kodla çaprazlandı.

---

## 0. OKUMA İLERLEME TABLOSU

| belge | toplam satır | okunan satır | tam✅/kısmi⚠️ | bulunan kalem |
|---|:---:|:---:|:---:|:---:|
| `admin-panelleri-tasarim-2026-08-02.md` | 93 | 1-93 | ✅ TAM | 14 |
| `belge-mimarisi-...-2026-08-19.md` | 400 | 1-150 / 150-300 / 300-400 | ✅ TAM | 24 |
| `depo-denetimi-2026-08-02.md` | 58 | 1-58 | ✅ TAM | 6 |
| `hayalet-backend-2026-08-02.md` | 71 | 1-71 | ✅ TAM | 18 |
| `kapasite-analizi-2026-08-02.md` | 59 | 1-59 | ✅ TAM | 9 |
| `kart-havuz-backend-envanteri-2026-08-02.md` | 205 | 1-150 / 150-206 | ✅ TAM | 16 |
| `katilim-modeli-mevcut-durum-notu-2026-08-02.md` | 45 | 1-45 | ✅ TAM | 5 |
| `mentor-karti-rakip-analizi-2026-08-02.md` | 132 | 1-132 | ✅ TAM | 16 |
| `tema-durum-ve-landing-maliyeti-2026-08-02.md` | 66 | 1-66 | ✅ TAM | 8 |
| `teshis-raporu-2026-08-02.md` | 114 | 1-114 (offset=1 limit=150 tümünü kapsar) | ✅ TAM | 24 |

**GRUP-B toplam: 10/10 belge TAM okundu. Okunmayan: 0. Toplam defter kalemi: 140.**

> **En kalem-yoğun:** `belge-mimarisi-...` (400 s. — 59-belge düzen envanteri, EKSEN 5 hijyen + EKSEN 6 merge çözümü,
> çoğu belge-hijyen KOD DIŞI) ve `teshis-raporu` (114 s. — A1-A9 panel + B10-B15 bug + C16-C20 UX + D21-23 tema +
> güvenlik/KVKK) ve `kart-havuz-backend-envanteri` (205 s. — 6 konu kod-envanteri, çoğu ✅ VAR).

---

## 1. DEFTER — belge belge

**DURUM kodları:** ✅ YAPILDI · 🟡 YARIM · 🔀 PR'DA · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ ADAYI

### admin-panelleri-tasarim-2026-08-02 (93 satır) — 6 panel TASARIM sunumu (kod yazılmadı o gün)

| kaynak | kalem | numara | durum | kanıt / niyet+nerede-durdu |
|---|---|---|:---:|---|
| :10-18 | 🔴 Global seed eksik (DISC soruları + Learning Journey "boş" görünüyor, kök = ana Neon'da global seed yok) | NUMARASIZ | ⬜ AÇIK | TUR-1'de var: T1-A madde 30/33 (sertifika/SJT seed↔canlı) + A4. NİYET: A8+oyunlaştırma "boş" görünüyor, aslında veri eksik. NEREDE DURDU: "DB yazımı → PO kararı" (canlı=lokal Neon, seed onay bekliyor); `seed-questions.ts` sonradan SİLİNDİ (T1-A/CLAUDE.md), güvenli liste değişti |
| :22-35 | Ortak UI desen envanteri (yeni paneller mevcut şablona uysun: card/badge/table/empty-state/pagination) | NUMARASIZ | ✅ YAPILDI (kural) | KOD DIŞI (tasarım kılavuzu); paneller kodlandı (T1-A madde 8/32 + T1-B2 05:15-22 ✅) |
| :34-35 | 5 yeni panel ADVANCED_NAV'a (Eşleşmeler/Mentör Havuzu/Menti Havuzu/Sertifika Sonuç/Branding) | NUMARASIZ | ✅ YAPILDI | TUR-1'de var: T1-B2 05:15-22 (5 admin paneli PR#32/#26 ✅) |
| :41-47 (A1) | Eşleşme paneli — yönetici "kim kiminle eşleşti" | A1 | ✅ YAPILDI | TUR-1'de var: T1-A A15 + T1-B2 05:20 (Match persist `scoring.service.ts:137` ✅) |
| :43 (A1) | ⚠️ Match GERÇEKTEN persist mi yoksa runtime skorlama mı — DOĞRULANACAK | NUMARASIZ | ✅ YAPILDI | TUR-1'de var: T1-B2 05:20 (persist ✅ `scoring.service.ts:137`) — o günkü şüphe kapandı |
| :49-54 (A2/A3) | Mentör + Menti havuzu (aynı endpoint, mevcut yeter) | A2/A3 | ✅ YAPILDI | TUR-1'de var: T1-B2 05:15-22; ajanın "7 gün" tahmini şişirilmiş notu |
| :56-61 (A4) | Sertifika sonuç panosu (TenantMembership veri hazır, yeni endpoint+sayfa) | A4 | ✅ YAPILDI | TUR-1'de var: T1-A madde 11 (sertifika rozeti ✅) + T1-B2 05:15-22 (A4 sertifika ✅) |
| :63-68 (A7) | Kurum branding düzenleme (kayıt sonrası; Step3 formu yeniden kullan) | A7 | ✅ YAPILDI | TUR-1'de var: T1-B2 05:15-22 (A7 branding ✅) |
| :68 (A7) | ⚠️ logoUrl XSS: `z.string().url()` yetersiz (`data:image/svg` / kötü SVG geçebilir), MIME/host + CSP img-src öner | NUMARASIZ | ❓ TEYİT GEREK | S1(güvenlik). NİYET: logoUrl XSS koruması. NEREDE DURDU: "kodlama turunda ele al" — kod-teyit yapılmadı, T1'de karşılığı yok → AÇIK güvenlik teyidi |
| :70-73 (A8) | DISC soruları görüntüleme = global seed uygula (kod değişmez muhtemelen) | A8 | ⬜ AÇIK | ≡ :10-18 seed; T1-B2 05:36-38 (DISC soru ❓ canlı sayı teyidi) |
| :77-81 | Learning Journey puanlama YOK = bilinçli tasarım; ADMIN görmez; "boş" = seed | NUMARASIZ | ✅ YAPILDI | TUR-1'de var: T1-B2 05:31-34 (öğrenme yolculuğu ✅ seed'lendi) |
| :86 | Önerilen sıra 1: global seed → A8+oyunlaştırma kendiliğinden dolar (DB yazımı → PO) | NUMARASIZ | ⬜ AÇIK | ≡ seed; PO kararı bekliyor |
| :91 | Güvenlik önizleme (her yeni admin endpoint: requireTenant + requireRole ADMIN + where tenantId; ham DISC ASLA) | NUMARASIZ | ✅ YAPILDI (kural) | KOD DIŞI (güvenlik kılavuzu); CLAUDE.md güvenlik kurallarıyla uyumlu |
| :93 | "Kod yazılmadı; PO onaylayınca kodlama turu" (o gün) | NUMARASIZ | ✅ YAPILDI | paneller aradan kodlandı (T1-B2 05:15-22) |

### belge-mimarisi-ve-merge-cozumu-onerileri-2026-08-19 (400 satır) — TESPİT+ÖNERİ (çoğu KOD DIŞI belge-hijyen)

| kaynak | kalem | numara | durum | kanıt / niyet+nerede-durdu |
|---|---|---|:---:|---|
| :12-18 | 2 kalıcı düzen sorunu: (1) 59 belge çokluğu (2) merge sürtünmesi — PO çözüm istedi | NUMARASIZ | ⬜ AÇIK | NİYET: yeni-katılan 59 belgeyi okuyamaz + her merge dansı. NEREDE DURDU: öneri raporu, PO onayı bekliyor; kısmen A5 reorg 2026-08-23 (T1-A A5) |
| :37-50 | Mevcut 6 düzen kuralı iyi tasarlanmış; sorun mimari değil %20 hijyen boşluğu | NUMARASIZ | ✅ YAPILDI (tespit) | KOD DIŞI; T1-B2 belge-duzeni-rehberi 8 kural ✅ (kural sayısı 6→8 büyümüş aradan) |
| :52-61 | Envanter: 59 belge (kararlar 24 / raporlar 18 / icerik 6 / devir 8 / arsiv 3) | NUMARASIZ | 📌 sayım | KOD DIŞI; 2026-08-19 fotoğrafı; bugün sayı değişmiş olabilir |
| :71-116 (5 örtüşme) | 5 şüpheli örtüşmenin hiçbiri birleştirme adayı değil (pano↔harita / denetim-5 / 09↔10 / 08↔unutulmus / stk-çift) — kasıtlı dual | NUMARASIZ | ✅ YAPILDI (tespit) | KOD DIŞI; PO "birleştir mi" sorusuna kanıtlı NO; INDEX'te grupla önerisi |
| :99-101 | ⚠️ "09/10 600+/800+ satır" iddiası YANLIŞ; gerçek 226/175 satır | NUMARASIZ | ✅ YAPILDI (düzeltme) | KOD DIŞI; önceki tarama hatası düzeltilmiş |
| :126-150 (kararlar/ tablo) | 24 kararlar/ belge etiket+öneri (11'inde 🔄/📸 etiket yok; 04/02/03/05/06/chat-v1 bayat ⚠️ NOT) | NUMARASIZ | ⬜ AÇIK (belge) | KOD DIŞI belge-hijyen S2; T1-B2 hepsini işledi (04-IDOR/05-timezone bayat gövde) |
| :147 | `dokploy-foto-volume-talimati` → ⚠️ GÜNCELLEME (2026-08-23): PO kararı, `kararlar/`'da KALIYOR (taşıma iptal) | NUMARASIZ | ✅ YAPILDI (karar) | KOD DIŞI; belge-içi çelişki kapandı (PO kararı) |
| :152-173 (raporlar/ tablo) | 18 raporlar/ 📸 etiket yok, çoğu INDEX'te yok; 7 ARŞİV adayı (koşullu "şu iş bitince") | NUMARASIZ | ❓ TEYİT (belge) | KOD DIŞI belge-hijyen; hiçbiri taşınmadı; bu 10 kesif belgesinin 5'i (hayalet/kapasite/kart-havuz/katilim/mentor-karti/tema) arşiv adayı — PO kararı |
| :156 | `admin-panelleri-tasarim` ETİKET (📸) — tasarım referansı, kalsın | NUMARASIZ | ⬜ AÇIK (belge) | KOD DIŞI; NOT: T1-A A5'te bu belge "arşiv adayı" da geçiyor (PO belge düzeninden memnun değil) |
| :168 | `platform-admin-strateji` "AdminAuditLog tablosu" iddiası ⚠️ kod-teyit gerek | NUMARASIZ | ❓ TEYİT GEREK | Bu tur DB/kod-teyit yapılmadı (o belge grubu değil); T1-A/B'de yok → AÇIK teyit |
| :170 | `stk-yonetici-strateji` "hayalet mod görünmez" iddiası ⚠️ kod-teyit gerek | NUMARASIZ | ❓ TEYİT GEREK | ≡ katilim-modeli hayalet-mod ❌ (aşağıda); T1-A madde 17 v2 |
| :178-193 (devir/ tablo) | 8 devir belgesi; devir işlevi bitmedi (07/08 canlı); 07 arşiv adayı; klasör kalsın | NUMARASIZ | ⬜ AÇIK (belge) | KOD DIŞI belge-hijyen |
| :195-201 (arsiv/ tablo) | 3 arşiv belgesi TUTULMALI (silme yok, Kural 6) | NUMARASIZ | ✅ YAPILDI (karar) | KOD DIŞI |
| :207 | `PROJECT_STATUS.md` DEPRECATED → arşivle + 09-DURUM'a yönlendir (9 Ağu'dan eski) | NUMARASIZ | ⬜ AÇIK (belge) | KOD DIŞI; CLAUDE.md hâlâ "dondurulmuş onboarding" diye işaret ediyor; taşınmamış |
| :210-215 | 00-INDEX eksik: raporlar/arsiv büyük ölçüde INDEX'te yok (Kural 5 boşluğu) | NUMARASIZ | ⬜ AÇIK (belge) | KOD DIŞI belge-hijyen; T1-B2 bdr:KURAL 5 ✅-kural ama uygulama boşluğu |
| :219-237 | "Yapılan/yapılacak kararlar" ayrımı: yeni klasör GEREKMEZ, mevcut yapı+etiket sağlıyor | NUMARASIZ | ✅ YAPILDI (tespit) | KOD DIŞI; PO fikrine kanıtlı alternatif (rozet zenginleştirme opsiyonu) |
| :239-250 | "Yeni gelen" 5 adımlı okuma yolu (CLAUDE.md→INDEX→09-DURUM→10-yol→pano) | NUMARASIZ | ⬜ AÇIK (belge) | KOD DIŞI öneri; INDEX'e eklenmedi |
| :282-312 (SORUN A) | Submodule pointer bump dansı — kök neden + reçete (merge sonrası `git submodule update --remote backend`) | NUMARASIZ | ✅ YAPILDI (uygulandı) | **KOD DIŞI ama UYGULANDI:** CLAUDE.md'de artık "Merge sonrası pointer bump — DANS ÖNLEME" bölümü VAR (Taslak A benimsenmiş) |
| :314-343 (SORUN B) | Docs çakışması (09/10) — serileştir çözümü (paylaşılan durum = sıralı) | NUMARASIZ | ✅ YAPILDI (uygulandı) | **KOD DIŞI ama UYGULANDI:** CLAUDE.md'de "Docs çakışması önleme — SERİLEŞTİR" bölümü VAR (Taslak B benimsenmiş) |
| :310-311 | (b) OPSİYONEL `scripts/bump-submodule.sh` yardımcı script | NUMARASIZ | ❓ TEYİT GEREK | opsiyonel; CLAUDE.md "scripts/ → yalnız verify.sh" diyordu; script eklendi mi teyit (düşük) |
| :332-336 | (b) `.gitattributes` + `merge=union` opsiyonel güvenlik ağı (tek başına önerilmez) | NUMARASIZ | ⬜ AÇIK (opsiyonel) | KOD DIŞI; benimsenmemiş (yalnız serileştirme birincil) |
| :345-375 | CLAUDE.md kural taslakları (A submodule + B docs) — "bu turda YAZILMADI, PO onaylayınca" | NUMARASIZ | ✅ YAPILDI | ikisi de aradan CLAUDE.md'ye işlendi (yukarı) |
| :379-397 (ÖZET) | 7 hijyen önerisi + 2 merge çözümü — her biri ayrı tur, PO kararı | NUMARASIZ | 🟡 YARIM | merge-çözümü (2/2) ✅ CLAUDE.md'de; hijyen (etiket/INDEX/bayat-işaret/arşiv) çoğu ⬜ AÇIK |
| :398-400 | "Bu turda hiçbir belge/kod değişmedi; sıradaki PO önceliklendirir" | NUMARASIZ | ✅ YAPILDI | rapor kaydı |

### depo-denetimi-2026-08-02 (58 satır) — repo hijyen (salt-okuma)

| kaynak | kalem | numara | durum | kanıt / niyet+nerede-durdu |
|---|---|---|:---:|---|
| :12 | Repo büyük ölçüde temiz; klasik hijyen borcu (.bak/.old/.DS_Store/git'e sızmış .env) YOK; .gitignore sağlam | NUMARASIZ | ✅ YAPILDI (tespit) | olumlu tespit; kod işi yok |
| :18-23 (🔴1) | `Menti Mentör proje/` kök klasörü (untracked, tek 0-byte `Untitled`) amaç belirsiz — DOKUNMA, PO'ya sor | NUMARASIZ | ✅ YAPILDI | **KOD KANITI: klasör ARTIK YOK** (`ls -d "Menti Mentör proje"` → GONE). Aradan temizlenmiş (PO kararı verilmiş); T1'de yok |
| :25-30 (🟡2) | `backend/.env.backup-anaDB` (~160 byte, gitignore'lu) — yedek amacı bittiyse sil, teyit iste | NUMARASIZ | ⬜ AÇIK | **KOD KANITI: dosya HÂLÂ VAR** (`ls backend/.env.backup-anaDB` mevcut). TUR-1'de var: T1-B3 belge-aksiyon :229/:65 (.env.backup temizliği ❓ PO). NİYET: env yedeği. NEREDE DURDU: "env geçişi bitince silinebilir" — PO/env-geçiş bekliyor |
| :32-37 (🟢3) | `frontend/.next/` build artefaktı (gitignore'lu, git-dışı, sorun değil) | NUMARASIZ | ✅ YAPILDI (tespit) | KOD DIŞI; yeniden-üretilebilir |
| :41-46 | Temiz çıkanlar (5 madde: .bak yok / .DS_Store yok / .env sızıntı yok / dist yok / boş dosya yok) | NUMARASIZ | ✅ YAPILDI (tespit) | olumlu |
| :50-58 | Sonuç: temizlik hacmi düşük; tek gerçek karar `Menti Mentör proje/` akıbeti (PO) | NUMARASIZ | ✅ YAPILDI | klasör aradan silinmiş (yukarı 🔴1) |

### hayalet-backend-2026-08-02 (71 satır) — yazılmış-ama-çıkmayan/ölü/yarım kod envanteri

| kaynak | kalem | numara | durum | kanıt / niyet+nerede-durdu |
|---|---|---|:---:|---|
| :17 | `POST /api/scoring/compute-profile` muhtemel hayalet (SJT profil, FE çağrısı yok) | NUMARASIZ | ⬜ AÇIK | TUR-1'de var: T1-A madde 101 (SJT/OCEAN eşleştirmede okunmuyor) + T1-B3 karar-statu :90 (SJT endpoint 🟨 bağla/sil PO). NİYET: SJT akışı bağlanacak mı. NEREDE DURDU: SJT akışı yarım, PO kararı (bağla/sil) |
| :18 | `POST /api/scoring/rank-mentors` muhtemel hayalet (SJT sıralama) | NUMARASIZ | ⬜ AÇIK | ≡ :17; SJT akışı yarım |
| :19 | `POST /api/admin/users/:id/rematch` muhtemel hayalet | NUMARASIZ | ⬜ AÇIK | TUR-1'de var: T1-B3 envanter :68 (rematch bildirimi stub, push'a bağlı). NİYET: yeniden eşleştirme tetik. NEREDE DURDU: FE'ye bağlı değil, push-stub bağlı |
| :20 | `POST /api/admin/visibility-optin/:optInId/confirm` (confirmDoubleOptIn) muhtemel hayalet | NUMARASIZ | ❓ TEYİT GEREK | TUR-1'de var: T1-A A20/madde 86 (setVisibilityOptIn Taraf-1 sil/bağla/ertele PO). NİYET: çift opt-in onayı. NEREDE DURDU: KARAR 6 oto-onay tetiği yok (A14) |
| :21-22 | `run-tuning` / `run-purge` cron manuel tetik (bilinçli debug olabilir) | NUMARASIZ | ✅ YAPILDI (bilinçli) | debug amaçlı; T1-A F.5 kalibrasyon cron mevcut |
| :27 | AlgorithmTuner backend tam + admin UI bağlı, manuel cron tetik debug (yarım/izole) | NUMARASIZ | ✅ YAPILDI | TUR-1'de var: T1-B3 stk-admin B6 (algorithmTuner.ts zengin ✅) |
| :28 | Coaching Suggestions (coachingSuggestions.ts + dialog) veri gösterimi tam mı — araştır | NUMARASIZ | ✅ YAPILDI | TUR-1'de var: T1-B2 dm:92-98 (coaching çalışan backend ✅) |
| :31 | ❌ YANLIŞ BULGU düzeltmesi: `orientation-completed` backend'de VAR (`userRoutes.ts:137`) — kırık değil | NUMARASIZ | ✅ YAPILDI (düzeltme) | belge-içi dürüstlük düzeltmesi; ters-yön bulgu 0 |
| :35 | `iceBreaker.ts` CLAUDE.md "decommissioned" — en güçlü ölü-kod adayı | NUMARASIZ | ✅ YAPILDI | TUR-1'de var: T1-A C.2 (iceBreaker.ts) + T1-B3 belge-aksiyon :212 (iceBreaker ✅ SİLİNDİ). Aradan SİLİNMİŞ |
| :36 | `rewardPenalty.ts` import izi yok → araştır | NUMARASIZ | ❓ TEYİT GEREK | TUR-1'de var: T1-B3 belge-aksiyon :212 (rewardPenalty yanlış-alarm). NİYET: belirsiz. NEREDE DURDU: teyit gerek |
| :37 | `matchingInterface.ts` eski desen kalıntısı → araştır | NUMARASIZ | 🔵 (kasıtlı ileride) | TUR-1'de var: T1-A U2 + T1-B3 envanter :69 (USER-strategy stub + Job Board şablon, kasıtlı-ileride) |
| :38 | `llmRetry.ts` LLM kaldırıldı, atıl → araştır | NUMARASIZ | ❓ TEYİT GEREK | TUR-1'de var: T1-A D2/madde 44 (llmRetry ❓terk, kesin-ölü sil PO onayı). NİYET: LLM retry. NEREDE DURDU: LLM devre-dışı, PO silme kararı bekliyor |
| :41 | `User.discResultCard` (JSON) yazılıyor ama okuma izi yok — yaz-ama-oku-yok adayı | NUMARASIZ | ❓ TEYİT GEREK | T1'de doğrudan yok. NİYET: arketip kartı. NEREDE DURDU: kart-havuz :173 "gösterilebilir rozet" diyor (okunuyor olabilir) → çelişki, teyit |
| :42 | `SjtQuestion`/`SjtOption` SJT akışı yarım, minimal kullanım | NUMARASIZ | ⬜ AÇIK | ≡ :17-18 SJT; T1-A madde 101 |
| :43 | `IndustryNode` + `taxonomy.service` (LCA) seed'li ama canlı skorlamada kullanılmıyor (sector-scorer bağlı) | NUMARASIZ | ⬜ AÇIK | TUR-1'de var: T1-A C.2 (taxonomy.service) + madde 14 (sektör-scorer v2). ≡ İŞ 7 |
| :46 | `LLM_PROVIDER` config anahtarı var, LLM devre-dışı, etkin okunmuyor olabilir (düşük) | NUMARASIZ | ❓ TEYİT GEREK | düşük öncelik; değerler gösterilmedi |
| :49 | `pending-approval`/`stk/pending-review` sayfaları nav-linksiz olabilir (programatik yönlendirme) | NUMARASIZ | ❓ TEYİT GEREK | T1'de yok. NİYET: sayfa erişilebilirliği. NEREDE DURDU: statik-okuma, teyit gerek |
| :52 (öne-çıkan) | `sector-scorer.service.ts` DEĞERLİ AMA UNUTULMUŞ — 5-bileşen skoru yazılı, hiçbir controller import etmiyor | NUMARASIZ | 🟡 YARIM | **KOD KANITI: dosya VAR (`sector-scorer.service.ts`) ama `matching.ts` içinde `resolveSectorScore`/import YOK (grep boş)** → HÂLÂ BAĞLANMAMIŞ. TUR-1'de var: T1-A madde 14/U1 (v2 sektör-scorer). NİYET: isabetli sektör skoru. NEREDE DURDU: İŞ 7, staging şart, canlı davranışı değiştirir → ertelendi (v2) |
| :53 | OCEAN adapter + SJT scorer psikometri motorunun bağlanmamış parçaları | NUMARASIZ | 🟡 YARIM | TUR-1'de var: T1-B2 03:9-11 (adapter ✅) — kısmen bağlı; SJT tarafı yarım |
| :54 | NotificationService fonksiyonlar var, gerçek push provider yok (stub/TODO) | NUMARASIZ | ⬜ AÇIK (bilinçli) | TUR-1'de var: T1-A madde 23 v2 + T1-B3 envanter :67 (notificationService TODO push Expo/FCM). Bilinçli stub |

### kapasite-analizi-2026-08-02 (59 satır) — darboğaz/ölçeklenme (salt-okuma önlem)

| kaynak | kalem | numara | durum | kanıt / niyet+nerede-durdu |
|---|---|---|:---:|---|
| :12-17 (🔴1) | `listUsers` sayfalama YOK (CANLI-ÖNCESİ) — `userController.ts:58` take/skip yok, tüm tenant PII döner | NUMARASIZ | ✅ YAPILDI | **KOD KANITI: `userController.ts:38,63-64,99-100,116` — `pageSize` (max 100), `skip`, `take: pageSize`, `{items,total,page,pageSize,totalPages}` DÖNÜYOR.** Aradan yapılmış; T1-A madde 48 (DB perf pagination'sız listeler) ile ilişkili |
| :19-24 (🟡2) | Neon pool + senkron mail cron (CANLI-SONRASI) — connection_limit yok, mail seri await | NUMARASIZ | ❓ TEYİT GEREK | TUR-1'de var: T1-B2 02:48-49/04:39 (Neon pool retry P1 kod-teyit). NİYET: too-many-connections önle. NEREDE DURDU: canlı-sonrası, staging load-test |
| :26-31 (🟡3) | Eşleştirme cache yok + `take:500` sabit (CANLI-SONRASI) — her istekte O(n) skorlama | NUMARASIZ | ⬜ AÇIK | T1'de doğrudan yok. NİYET: CPU/DB fetch azalt. NEREDE DURDU: canlı-sonrası (düşük), cache altyapısı |
| :36 | Rate limit kaba: tenant başına genel bucket, meşru kullanıcı 429 alabilir | NUMARASIZ | ⬜ AÇIK | TUR-1'de var: T1-B2 02:50 (rate limiter in-memory→Redis). ≡ CLAUDE.md güvenlik notu (generalRateLimiter tenant-key zayıf) |
| :37 | Frontend büyük liste: sayfalama var ama sanallaştırma yok (kozmetik) | NUMARASIZ | ⬜ AÇIK (düşük) | UX; düşük |
| :38 | in-process node-cron çok-instance deploy'da cron duplication riski → staging tek-instance/lock | NUMARASIZ | ⬜ AÇIK | TUR-1'de var: T1-A madde 98 (kalibrasyon audit void) ilişkili; T1-A madde 27 v2 (staging). NEREDE DURDU: staging'de ele alınacak |
| :42-52 | Kaba kapasite tahmini (listUsers ~800-1000 ilk kırılma; Neon pool ~30-40; senkron cron 500+) | NUMARASIZ | 📌 tahmin | listUsers artık sayfalı (yukarı 🔴1 ✅) |
| :56-57 | Canlı-öncesi mutlaka #1 listUsers; canlı-sonrası #2/#3 | NUMARASIZ | ✅ YAPILDI (kısmi) | #1 listUsers ✅; #2/#3 açık |
| :59 | Mimari temel sağlıklı (stateless, dış depo); darboğazlar noktasal | NUMARASIZ | ✅ YAPILDI (tespit) | olumlu |

### kart-havuz-backend-envanteri-2026-08-02 (205 satır) — kart/havuz/uyum/niyet/foto backend envanteri

| kaynak | kalem | numara | durum | kanıt / niyet+nerede-durdu |
|---|---|---|:---:|---|
| :18-23 (özet) | 6 konu: uyum% ✅ / niyet-mektubu ✅ / müsaitlik ✅ / foto 🟡KISMEN / havuz ✅ / DISC-rozeti ✅ | NUMARASIZ | ✅/🟡 | foto tek eksik (aşağıda ✅ olmuş) |
| :27-52 (KONU 1) | Uyum yüzdesi/skor ✅ VAR (scoring.ts sektör×0.6+DISC×0.4; API döner; FE gösterir) | NUMARASIZ | ✅ YAPILDI | TUR-1'de var: T1-B2 03:19-21 (formül ✅) + 05:20 |
| :50-52 | 🟡 Sektör uyumu basit tag-overlap; 5-bileşen `sector-scorer` yazılı ama `matching.ts` çağırmıyor (İŞ 7) | NUMARASIZ | 🟡 YARIM | **KOD KANITI: matching.ts sector-scorer import YOK** (yukarı hayalet :52 ile aynı). NİYET: isabetli sektör skoru. NEREDE DURDU: İŞ 7/v2 (madde 14) |
| :56-76 (KONU 2) | Niyet mektubu/talep akışı ✅ VAR (MatchRequest requestMessage 1000 char, mentör görür, IDOR korumalı) | NUMARASIZ | ✅ YAPILDI | **KOD KANITI: `requestController.ts:113-118` isRequester/isTarget/ADMIN yetki (IDOR korumalı)** |
| :67-69 | `mentiRequestController.ts` ikinci akış (request-visibility, VisibilityOptIn) | NUMARASIZ | ✅ YAPILDI | NOT: T1-B3 belge-denetimi :54 "mentiRequestController SİLİNDİ" der → ÇELİŞKİ (bu belge o günkü kod; sonradan refactor); teyit |
| :79-98 (KONU 3) | Müsaitlik/takvim ✅ VAR (AvailabilityBlock, book akışı tam, requestMessage 50-500, PENDING→onay) | NUMARASIZ | ✅ YAPILDI | kod-kanıtlı endpoint listesi |
| :102-111 (KONU 4) | Foto 🟡 KISMEN: `avatarUrl` var ama sadece OAuth'dan; client-side upload YOK (multer/endpoint/depolama yok) | NUMARASIZ | ✅ YAPILDI | **KOD KANITI: `avatarController.ts` + `middleware/avatarUpload.ts` (multer) ARTIK VAR** (grep). Aradan yapılmış; T1-B3 belge-aksiyon :226/F1 "foto upload kod TAM `avatarController.ts:23-57`" ile uyumlu |
| :113-118 | ❌ Havuz kartlarında `avatarUrl` gösterilmiyor (listUsers select'te yok; tiplerde yok) | NUMARASIZ | ✅ YAPILDI | **KOD KANITI: `userController.ts:95,157,472` `avatarUrl: true` (liste select'lerinde ARTIK VAR).** Aradan eklenmiş |
| :120-123 | Zorunlu foto: şema izin veriyor ama upload altyapısı + validasyon + rate limit gerek | NUMARASIZ | 🟡 YARIM | upload ✅ (yukarı); ZORUNLU kılma kararı ❓. TUR-1'de var: T1-B2 06:39 (foto şimdilik opsiyonel, ileride zorunlu). NİYET: herkes foto. NEREDE DURDU: zorunluluk tarihi belirsiz (PO) |
| :126-156 (KONU 5) | Havuz/çift-yönlü listeleme ✅ VAR (mentör→menti + menti→mentör, sayfalama, VisibilityOptIn bidirectional) | NUMARASIZ | ✅ YAPILDI | kod-kanıtlı; T1-B2 05:15-22 |
| :145-147 | Sayfalama ✅ hepsinde (page/pageSize max 100 → {items,total,...}) | NUMARASIZ | ✅ YAPILDI | ≡ kapasite listUsers ✅ |
| :160-183 (KONU 6) | DISC rozeti/sektör etiketi ✅ VAR; ham(discVector/temperamentJson) vs gösterilebilir(discResultCard) KVKK ayrımı | NUMARASIZ | ✅ YAPILDI | TUR-1'de var: T1-A madde 1 (DISC güvenlik ✅ discVisibility.ts) |
| :181-183 | ⚠️ risk: `GET /api/users/:id` ham `discVector` döndürüyor (`userController.ts:128`); kart işinde bu uç kullanılmamalı | NUMARASIZ | ✅ YAPILDI | **KOD KANITI: `userController.ts:202-205` — discVector artık self/admin fullAccess guard ARDINDA (`USER_FULL_SELECT`); satır 139 yorumu "başkasının HAM PII'sini... görememeli". IDOR guard eklenmiş** (o günkü risk kapanmış); T1-A madde 1 ile uyumlu |
| :189-194 | Kart uyum%'yi göstermek İŞ 7'yi BEKLEMEZ (bugünkü tag-overlap ile çalışır) | NUMARASIZ | ✅ YAPILDI (tespit) | bağımlılık netleştirme; kart işi İŞ 7'ye bloke değil |
| :196-205 | Tek gerçek eksik FOTOĞRAF; 3 adım (upload / select'e ekle / zorunluluk) | NUMARASIZ | 🟡 YARIM | upload+select ✅ (yukarı); zorunluluk ❓ |

### katilim-modeli-mevcut-durum-notu-2026-08-02 (45 satır) — İŞ 5 hayalet-mod zemin notu

| kaynak | kalem | numara | durum | kanıt / niyet+nerede-durdu |
|---|---|---|:---:|---|
| :13-16 | ✅ Ön-tanımlı davet MESAJI var (InvitationTemplate model + /admin/invite) | NUMARASIZ | ✅ YAPILDI | TUR-1'de var: T1-A A14 (KARAR 6 InvitationTemplate var, tetik yok) |
| :19-22 | ✅ Davet linki (stateless imzalı token, ayrı Invitation kaydı YOK, join'de User oluşur) | NUMARASIZ | ✅ YAPILDI | `selfServeController.ts:580` |
| :24-26 | ✅ Yönetici elle üye ekleyebilir (POST /api/users, PENDING başlar) | NUMARASIZ | ✅ YAPILDI | `userRoutes.ts:30` |
| :28-35 | ❌ "Hayalet mod" YOK (pasif/görünmez placeholder-user, sonra aktive) + ❌ toplu CSV davet YOK | NUMARASIZ | ⬜ AÇIK | TUR-1'de var: T1-A madde 17 v2 (hayalet mod+CSV davet) + T1-B3 F6. NİYET: yönetici kişileri önceden koyar, pasif dururken sayılır, sonra aktive. NEREDE DURDU: "ayrı büyük tur, migration, hayalet-mod/davet turu" (v2 ertelendi) |
| :39-45 | Sonuç: mevcut akış davet-mesajı+link+elle-ekleme karşılıyor; "hayalet mod" YOK → ayrı tur; karar/kod alınmadı | NUMARASIZ | ⬜ AÇIK | ≡ yukarı; zemin netleştirildi |

### mentor-karti-rakip-analizi-2026-08-02 (132 satır) — kart tasarımı rakip araştırması + PO kararları

| kaynak | kalem | numara | durum | kanıt / niyet+nerede-durdu |
|---|---|---|:---:|---|
| :9-12 | İncelenen rakipler (ADPList/MentorCruise/Mentornity + LinkedIn/kart-UI pratikleri) | NUMARASIZ | ✅ YAPILDI (araştırma) | KOD DIŞI araştırma girdisi |
| :34-37 | "Az bilgi = daha iyi" (kartta 3 çekirdek unsur; foto+isim+rol+etiket yeter, gerisi detay) | NUMARASIZ | ⬜ AÇIK (tasarım) | TUR-1'de var: T1-B2 06:26-40 (kart tasarımı ⏳ tasarlanacak). KOD DIŞI tasarım ilkesi |
| :39-41 | Profil kartı = dijital kartvizit (avatar+isim+rol+aksiyon+1 satır istatistik) | NUMARASIZ | ⬜ AÇIK (tasarım) | ≡ kart işi (madde 31/06:26) |
| :43-46 | DISC+sektör etiketleri kartta olmalı — DISC bizim ayırt edici unsurumuz (rakiplerde yok) | NUMARASIZ | ⬜ AÇIK (tasarım) | KOD DIŞI; DISC rozeti backend hazır (kart-havuz KONU 6 ✅) |
| :48-51 | Grid responsive (mobil 1 → tablet 2 → masaüstü 3-4 kolon); 3 kolon başlangıç | NUMARASIZ | ⬜ AÇIK (tasarım) | T1-B2 06:34 (grid 3/2/1) |
| :53-55 | Fotoğraf kalitesi kritik; yoksa baş-harf avatarı | NUMARASIZ | ⬜ AÇIK (tasarım) | foto upload backend ✅; FE kart tasarımı açık |
| :59-65 | Sayfalama: sayfa başına ~12-20 kart + sayfa no; arama/filtre ikinci adım | NUMARASIZ | ❓ TEYİT GEREK | TUR-1'de var: T1-B2 06:34 (sayfa-başı sayı açık ❓). NİYET: yığılma önle. NEREDE DURDU: kesin sayı PO (15/18/20) |
| :71-82 | Önerilen kart içeriği (foto+isim+rol+DISC rozeti+sektör chip+%uyum+aksiyon); detay sayfasında gerisi | NUMARASIZ | ⬜ AÇIK (tasarım) | kart işi (madde 31) |
| :87-91 (açık kararlar) | 5 açık karar: DISC nasıl göster / sektör chip kaç / sayfa-başı kaç / arama-filtre ne zaman / menti-kartı aynı mı | NUMARASIZ | ❓ TEYİT GEREK | PO'ya sorulacak; T1-B2 06:34/08:46 |
| :99-104 (PO karar 1) | Rating/yıldız YOK → "%uyum" var (sektör+DISC birleşimi); ⚠️ sektör skoru İŞ 7'ye ertelendi (stub) | NUMARASIZ | 🟡 YARIM | uyum% backend ✅ (kart-havuz KONU 1); sektör-scorer bağlanmadı (İŞ 7). NİYET: kalite talep. NEREDE DURDU: İŞ 7 (madde 14) |
| :106 (PO karar 2) | Deneyim (yıl/şirket) YOK, sade kalsın | NUMARASIZ | ⬜ AÇIK (karar) | KOD DIŞI kart kararı; T1-B2 06:33 |
| :108-111 (PO karar 3) | Müsaitlik kartta YOK → detayda takvim → müsait saate tıkla → niyet mektubu | NUMARASIZ | ✅ YAPILDI (backend) | müsaitlik+niyet backend ✅ (kart-havuz KONU 2/3); FE kart akışı açık |
| :113-114 (PO karar 4) | Çift yönlü havuz (mentör menti havuzunu, menti mentör havuzunu aynı kart mantığıyla) | NUMARASIZ | ✅ YAPILDI (backend) | çift-yönlü havuz backend ✅ (kart-havuz KONU 5) |
| :116-119 (PO karar 5) | Mesajlaşma ŞİMDİLİK YOK → sadece niyet mektubu; serbest DM sonraya (toksiklik/spam) | NUMARASIZ | ✅ YAPILDI (karar) | TUR-1'de var: T1-B2 06:46-49 (mesajlaşma yok, chat-v1 talep-mesajlaşma). Karar kesin |
| :121-122 (PO karar 6) | Fotoğraf ZORUNLU (herkes; yükleyene kadar baş-harf; hedef herkes foto) | NUMARASIZ | 🟡 YARIM | foto upload backend ✅; ZORUNLU kılma ❓ (kart-havuz :120-123). NEREDE DURDU: zorunluluk tarihi belirsiz |
| :124-129 | Bu kararlardan doğan işler (kart bileşeni / detay-takvim-niyet / foto-zorunlu / çift-havuz / ileride mesajlaşma) | NUMARASIZ | 🟡 YARIM | backend çoğu ✅; FE kart bileşeni açık (madde 31) |

### tema-durum-ve-landing-maliyeti-2026-08-02 (66 satır) — tema toggle + landing dark/light maliyeti

| kaynak | kalem | numara | durum | kanıt / niyet+nerede-durdu |
|---|---|---|:---:|---|
| :9-13 | Tema altyapısı çalışıyor (ThemeProvider/localStorage mm-theme/.dark class/FOUC script/ThemeToggle) | NUMARASIZ | ✅ YAPILDI | TUR-1'de var: T1-A madde 5 + T1-B2 06:6 (tema toggle ✅ PR#32) |
| :15-23 (D21) | Toggle butonu: DashboardNav ✅ / Admin ❌ / Platform ❌ / Auth ❌; tema global ama buton dar | D21 | 🟡 YARIM | **KOD KANITI: `(admin)/layout.tsx:16,93` ThemeToggle ARTIK VAR ✅; `platform/layout.tsx` ThemeToggle YOK (grep boş) ❌.** TUR-1'de var: T1-A madde 5 (✅ `(admin)/layout.tsx:92`). NEREDE DURDU: admin eklendi, platform HÂLÂ eksik → kısmi |
| :25 | PR/merge durumu: tema #32 WIP, `feat/light-theme` branch, merge edilene kadar canlıda değil | NUMARASIZ | ✅ YAPILDI | aradan merged (T1-A madde 5 ✅ canlıda) |
| :29-31 | Landing bilinçli hep dark (06 kararı glow/gradient pazarlama); seçilebilir=token'a geçir | NUMARASIZ | ⬜ AÇIK | TUR-1'de var: T1-B2 06:7-11 (landing dark/light ertelendi) |
| :33-47 | Hardcoded renk sayımı ~256 nokta / 9 dosya (grep tahmini ±; 06 "205" ile aynı mertebe) | NUMARASIZ | ⬜ AÇIK | T1-B2 06:7-11 (~256 hardcoded nokta) |
| :49-52 | Efor ~10-13 saat / ~1.5 gün (token tanımı + 256 nokta + QA/WCAG/mobil) | NUMARASIZ | 📌 tahmin | maliyet girdisi |
| :54-58 | Risk orta (glow/gradient/opacity light'ta bozulur; anlam-renkler tutarlı; vitrin dönüşüm riski) | NUMARASIZ | ⬜ AÇIK | risk notu |
| :61-67 | Öneri: landing dark/light CANLI-SONRASINA ERTELE; canlı-öncesi küçük değer D21 (admin/platform buton) | NUMARASIZ | 🟡 YARIM | landing ertelendi (madde 22 v2); D21 admin ✅ / platform ❌ (yukarı) |

### teshis-raporu-2026-08-02 (114 satır) — kapsamlı niyet-vs-kod + merge runbook + KVKK + güvenlik

| kaynak | kalem | numara | durum | kanıt / niyet+nerede-durdu |
|---|---|---|:---:|---|
| :17 (A1) | Eşleşme paneli ⚠️yarım (Match model+rankMentisForMentor var; admin UI+endpoint yok) | A1 | ✅ YAPILDI | TUR-1'de var: T1-B2 05:15-22 (A1 ✅) |
| :18-19 (A2/A3) | Mentör/Menti havuzu ⚠️yarım (endpoint var; admin sayfa yok) | A2/A3 | ✅ YAPILDI | TUR-1'de var: T1-B2 05:15-22 |
| :20 (A4) | Sertifika sonuç panosu ⚠️yarım (veri hazır; UI yok) | A4 | ✅ YAPILDI | TUR-1'de var: T1-A madde 11 |
| :21 (A5) | Oyunlaştırma 🔒bilinçli (Learning Journey puanlama YOK = tasarım kararı) | A5 | ✅ YAPILDI | TUR-1'de var: T1-B2 05:31-34 |
| :22 (A6) | DISC+sektör dağılım oranı ayarı ❌yok (WEIGHTS 0.6/0.4 hardcoded) — BÜYÜK (migration+endpoint+UI) | A6 | ✅ YAPILDI | **ARADAN KAPANDI:** TUR-1'de var: T1-A madde 9a (tenant manuel ağırlık PUT weights +/−%5 ✅ CANLIDA #52) + 9 (%60/%40 kartı ✅). O günkü "❌ yok BÜYÜK" bayat |
| :23 (A7) | Kurum branding kayıt-sonrası düzenleme ⚠️yarım | A7 | ✅ YAPILDI | TUR-1'de var: T1-B2 05:15-22 |
| :24 (A8) | DISC soruları görüntüleme ✅ var (kilit rozeti + kuruma-özel ekleme) | A8 | ✅ YAPILDI | ≡ admin-panelleri :70; global seed ayrı |
| :25 (A9) | Yöneticilik verme akışı ✅ var (promote-admin max 3) ama "tüm ONAYLI liste" eksik | A9 | 🟡 YARIM | TUR-1'de var: T1-B2 05:54/08:31 + T1-A A9 (9a ✅ ama A9 yeniden-kurgu ayrı). NİYET: yönetici atama. NEREDE DURDU: PENDING kuyruğu var, tüm-onaylı liste eksik + akış yeniden kurgulanacak (PO'ya sorulacak) |
| :29 (B10) | Sekmeler arası geçiş YAVAŞ 🐛 (useApiClient her render yeni api ref → useQuery yeniden fetch) | B10 | ❓ TEYİT GEREK | T1'de yok. NİYET: performans. NEREDE DURDU: "fix-anında mekanizma doğrulanmalı" — kod-teyit yapılmadı → AÇIK |
| :30 (B11) | Logout 🐛 — logout fonksiyonu var ama UI'a bağlı DEĞİL (kullanıcı çıkamıyor) | B11 | ✅ YAPILDI | **KOD KANITI: `DashboardNav.tsx:30,39` `const {user,logout}=useAuth()` + `await logout()` (UI'a bağlı).** Aradan yapılmış; T1-B3 belge-aksiyon :191/:297 (B11 logout ❓eskimiş) → KAPANMIŞ |
| :31 (B12) | Sol alt kullanıcı kartı 🐛 hiç yok (nav sadece link+toggle) | B12 | ❓ TEYİT GEREK | T1-B3 belge-aksiyon :191 (B12 kullanıcı kartı BOZUK ❓eskimiş). NİYET: kullanıcı kartı+dropdown. NEREDE DURDU: kart/dropdown eklendi mi teyit (B11 ile birlikte planlanmıştı) |
| :32 (B13) | Kurum-özel soru ekleme ✅ çalışıyor (Zod, DISC_ASSESSMENT kilitli, STK_CUSTOM eklenebilir) | B13 | ✅ YAPILDI | TUR-1'de var: T1-B3 stk-admin B8a/B8c |
| :33 (B14) | Hata mesajları belirsiz ⚠️ (VALIDATION yanıtı `message` YOK → generic "Hata") | B14 | ✅ YAPILDI | **ARADAN KAPANDI:** TUR-1'de var: T1-A madde 69/T1 (Zod validation mesajı ✅ #51 `firstValidationMessage`) |
| :34-37 (B15) | Backend↔frontend kontrat: adaptive-test `progress` DÖNMÜYOR → /mentor,/menti çökmesi (kısmen düzeltildi widget guard `cfda33c`) | B15 | ✅ YAPILDI | **ARADAN KAPANDI:** TUR-1'de var: T1-A madde 70/T2 (adaptive-test progress ✅ #51 backend + çatı #114 FE guard) |
| :41 (C16) | Nav yazı boyutu text-sm tutarlı (kontrast/weight küçük iş) | C16 | ⬜ AÇIK (düşük) | UX minor |
| :42 (C17) | Sayfa açıklama metinleri inline/dağınık (9+ dosya) — merkezileştirme orta iş | C17 | ⬜ AÇIK | TUR-1'de var: T1-A madde 47 (temiz-kod borcu) + T1-B3 belge-aksiyon :193 (C17 merkezileştirme). NİYET: DRY/merkezi mesaj. NEREDE DURDU: unutuldu, madde 47 içinde |
| :43 (C18) | Soru ekleme dropdown CORE/DEEPENING İngilizce → Temel/Derinleştirme | C18 | ✅ YAPILDI | TUR-1'de var: T1-B3 stk-admin B9/md.9 (CORE-DEEPENING TR ✅ #62 TYPE_LABELS Temel/Derinleştirme). NOT: T1-B2 06:52-54 hâlâ "dropdown İngilizce" der (görünen-etiket TR, enum EN → nüans) |
| :44 (C19) | Sertifika soru ekleme 🔒bilinçli kısıt (sadece aç/kapa, "eklenemez" yazılı) | C19 | ✅ YAPILDI (bilinçli) | TUR-1'de var: T1-B3 stk-admin B13 (kurum ekleyemez KODLU); "gerekçe belgesi zayıf" ❓ |
| :45 (C20) | Etiket: yönetici sadece öneri onaylar/reddeder/birleştirir; doğrudan ekleme YOK | C20 | ⬜ AÇIK | TUR-1'de var: T1-B2 08:34 (etiket ekleme yönetici doğrudan mı ❓) + admin-11 KARAR 12. Kod durumu belirsiz |
| :49 (D21) | ThemeToggle admin+platform nav'a eklenmeli (küçük ~1-2h) | D21 | 🟡 YARIM | ≡ tema-durum D21: admin ✅ / platform ❌ (kod-kanıtlı yukarı) |
| :50 (D22) | DISC renkleri light kontrast WCAG FAIL (5 dosya ~7 renk → 600/700) | D22 | ⬜ AÇIK | TUR-1'de var: T1-B2 06:17 (D22 ⬜) + T1-A madde 51-55/64. NİYET: WCAG AA. NEREDE DURDU: a11y borcu, kodlanmadı |
| :51 (D23) | Platform admin rozetleri koyu-alfa tint light'ta görünmez → light varyant | D23 | ⬜ AÇIK | TUR-1'de var: T1-B2 06:18 (D23 ⬜). a11y borcu |
| :53-57 (E24) | Kullanıcı geri bildirim mekanizması (her sayfa "Bildir" → mail); altyapı hazır; suspicion mail GÖNDERMİYOR (DB'ye yazıyor) | E24 | ⬜ AÇIK | TUR-1'de var: T1-B2 05:55 (geri bildirim "hata/öneri bildir"→mail). NİYET: kullanıcı geri bildirimi. NEREDE DURDU: MVP ~4-6h tahmin, kodlanmadı; suspicion mail eksik |
| :73-82 (merge runbook) | #26/#29 MERGE-COMMIT (SQUASH YASAK) + 2 round + prod backfill (b3 membership) | NUMARASIZ | ✅ YAPILDI | TUR-1'de var: T1-A panel PR'ları merged (#26/#29); b3 backfill T1-B2 08:35 (arkadaş başvuru b3 ⏳) |
| :88-92 (güvenlik) | #27 IDOR'lar ✅ + 2 YENİ IDOR (`/mentors/:mentorId/candidates` + `/requests/:id`) fix-öncesi | NUMARASIZ | ✅ YAPILDI | **KOD KANITI: `matchingController.ts:46-48` isOwner→403 + `requestController.ts:113-118` isRequester/isTarget.** ARADAN KAPANDI; TUR-1'de var: T1-A KÜME2 + T1-B3 (2 IDOR ✅ `161ae00`) |
| :93 (güvenlik) | Sonra: suspicion-report IP-limit/CAPTCHA + GDPR şifre step-up | NUMARASIZ | ⬜ AÇIK | TUR-1'de var: T1-A madde 71 (SuspicionReport tenantId) ilişkili. Düşük risk |
| :99-107 (KVKK) | KVKK backend güçlü (gdprService anonymize/hardDelete/export, purge cron); blocker'lar: privacy-center YOK + DISC-ayrı-rıza YOK + metinler taslak + Meeting/Feedback FK nullable + 18+ kodda yok | NUMARASIZ | ⬜ AÇIK | TUR-1'de var: T1-A madde 40/83/90/97 + K4. NİYET: KVKK uyum. NEREDE DURDU: canlı-öncesi blocker; privacy-center FE 0 (madde 40), hukukçu bekliyor |
| :106 (KVKK) | Sunucu konumu: DB Neon eu-west-2 İRLANDA/AB ✅, Mail Resend İrlanda AB ✅, deploy bölgesi bilinmiyor | NUMARASIZ | 🗑️ GEÇERSİZ ADAYI | **BAYAT/ÇELİŞKİ: TUR-1'de var: T1-A madde 92/Ç6 — sunucu Londra/BK (eu-west-2=Londra), "İrlanda hatalıydı" (PO teyitli 2026-08-26).** Bu satır (İrlanda/AB) yanlış çıktı → belge-hijyen ⚠️NOT adayı (PO kararı, düzeltmedim) |
| :107 (KVKK) | Kullanıcı kararları: veri sorumlusu kim / sunucu AB'de mi / hedef yaş / DISC ayrı rıza / metin finalize | NUMARASIZ | ❓ TEYİT GEREK | TUR-1'de var: T1-B2 08:11-14 + T1-A madde 82-85. Çoğu açık PO/hukuk |
| :111-114 (özet) | Açık işler hatırlatma (merge/KVKK/güvenlik/tema/paneller/bug/A6/E24); "kod yazılmadı, öncelik PO" | NUMARASIZ | 🟡 YARIM | paneller/IDOR/A6/bug'lar ✅ aradan; KVKK-blocker/E24/tema-kalan açık |

---

## 2. YARIM KALAN İŞLER (duruş sebebine göre gruplu)

### A) PO kararı bekliyor
- **Global seed ana Neon'a uygula** (admin-panelleri :10-18/:86) — DB yazımı, canlı=lokal Neon → PO onayı (DISC soruları + Learning Journey "boş" bunu bekliyor).
- **`backend/.env.backup-anaDB` sil** (depo-denetimi :25-30) — env geçişi bitince, PO/teyit.
- **Fotoğraf ZORUNLU kılma kararı** (mentor-karti PO-karar-6 / kart-havuz :120-123) — upload backend ✅, zorunluluk tarihi belirsiz.
- **Kart tasarımı açık kararları** (mentor-karti :87-91) — DISC gösterim / sektör chip sayısı / sayfa-başı kart / arama-filtre zamanı / menti-kartı aynı mı.
- **A9 yöneticilik-verme akışı yeniden kurgu** (teshis A9) — PO'ya sorulacak sözü.
- **KVKK blocker'ları** (teshis :99-107) — veri-sorumlusu / hedef-yaş / DISC-ayrı-rıza / metin-finalize (hukukçu).
- **Belge-hijyen önerileri** (belge-mimarisi §5) — etiket/INDEX/bayat-işaret/koşullu-arşiv, her biri ayrı tur PO onayı.

### B) Başka işe bağlı
- **sector-scorer bağlama (İŞ 7)** (hayalet :52 / kart-havuz :50-52) — canlı davranışı değiştirir → **staging'e bağlı** (staging İŞ 5, madde 27 v2). Kart uyum%'yi BEKLEMEZ (bloke değil).
- **Kart %uyum tam isabet** (mentor-karti PO-karar-1) — sektör-scorer/İŞ 7'ye bağlı.
- **rematch / confirmDoubleOptIn hayalet uçlar** (hayalet :19-20) — push-stub'a + KARAR 6 oto-onay tetiğine bağlı (madde 23 v2 / A14).
- **Neon pool + mail cron / matching cache** (kapasite :19-31) — canlı-sonrası, staging load-test'e bağlı.

### C) Bilinçli ertelendi (v2 / canlı-sonrası)
- **Hayalet mod + toplu CSV davet** (katilim-modeli :28-35) — ayrı büyük tur, migration (madde 17 v2 / F6).
- **Landing dark/light seçilebilir** (tema-durum :61-67) — ~256 nokta/~1.5 gün, canlı-sonrası (madde 22 v2).
- **matchingInterface USER-strategy** (hayalet :37) — kasıtlı-ileride şablon (U2).
- **NotificationService gerçek push** (hayalet :54) — bilinçli stub, in-app/mail idare (madde 23 v2).

### D) Sebep YAZILMAMIŞ (PO en çok bunu ister) — DURUŞ SEBEBİ YOK
- **B10 sekme-geçiş yavaşlık** (teshis :29) — "fix-anında doğrulanmalı" dışında duruş sebebi yok; aradan düzeldi mi teyit edilmedi (❓).
- **B12 sol-alt kullanıcı kartı** (teshis :31) — B11 logout ✅ oldu ama kart parçası için duruş sebebi yazılmamış; eklendi mi teyit (❓).
- **C17 sayfa metinleri merkezileştirme** (teshis :42) — "orta iş" dışında neden ertelendiği yazılmamış (madde 47 borcuna gömülmüş).
- **C20 etiket doğrudan-ekleme** (teshis :45) — istenirse orta iş; PO isteyip istemediği + kod durumu belirsiz.
- **E24 kullanıcı geri-bildirim mekanizması** (teshis :53-57) — MVP ~4-6h tahmin var ama neden başlanmadığı yazılmamış; suspicion mail hâlâ göndermiyor.
- **`rewardPenalty.ts` / `llmRetry.ts` / `discResultCard` yaz-oku** (hayalet :36/:38/:41) — "araştır/teyit" dışında karar-duruşu yok (kod-teyit yapılmadı).

---

## 3. HAYALET-TAMAMLANMIŞ ADAYLARI (belge "eksik/❌/⏳" diyor, kod "yapıldı" — kod kanıtlı)

> Bu 10 belge 2026-08-02 (biri 08-19) keşif fotoğrafı; birçok "eksik" bulgu ARADAN kapanmış. Kod-doğrulamalı:

| # | Kalem | "eksik" diyen (belge:satır) | "yapıldı" KOD kanıtı |
|---|---|---|---|
| TH1 | `listUsers` sayfalama yok | kapasite :12-17 (🔴 canlı-öncesi) | ✅ `userController.ts:38,64,99-100,116` pageSize/skip/take/totalPages |
| TH2 | Foto client-side upload YOK | kart-havuz :102-118 (🟡) | ✅ `avatarController.ts` + `middleware/avatarUpload.ts` (multer) mevcut |
| TH3 | `avatarUrl` havuz select'lerinde yok | kart-havuz :113-118 (❌) | ✅ `userController.ts:95,157,472` `avatarUrl: true` |
| TH4 | 2 YENİ IDOR (candidates + requests/:id) | teshis :89-91 (🔴 fix-öncesi) | ✅ `matchingController.ts:46-48` isOwner 403 + `requestController.ts:113-118` isRequester/isTarget |
| TH5 | `GET /users/:id` ham discVector döndürüyor (risk) | kart-havuz :181-183 (⚠️) | ✅ `userController.ts:202-205` self/admin fullAccess guard ardında (IDOR :139 yorumu) |
| TH6 | Logout UI'a bağlı DEĞİL (B11) | teshis :30 (🐛) | ✅ `DashboardNav.tsx:30,39` logout()+await |
| TH7 | A6 DISC/sektör ağırlık ayarı ❌ yok BÜYÜK | teshis :22 | ✅ T1-A madde 9a (PUT weights +/−%5 CANLIDA #52) |
| TH8 | B14 VALIDATION `message` yok → generic "Hata" | teshis :33 (⚠️) | ✅ T1-A madde 69 (`firstValidationMessage` #51) |
| TH9 | B15 adaptive-test progress DÖNMÜYOR (çökme) | teshis :34-37 | ✅ T1-A madde 70 (#51 backend + çatı #114) |
| TH10 | `iceBreaker.ts` ölü kod | hayalet :35 | ✅ T1-B3 belge-aksiyon :212 (SİLİNDİ) |
| TH11 | ThemeToggle admin nav'da yok (D21) | tema :15-23 / teshis :49 | ✅ (admin) KAPANDI `(admin)/layout.tsx:16,93` — **ANCAK platform HÂLÂ ❌** (kısmi, bkz. TH-kısmi) |
| TH12 | `Menti Mentör proje/` belirsiz klasör | depo-denetimi :18-23 | ✅ klasör ARTIK YOK (`ls` GONE — temizlenmiş) |

**Hayalet-tamamlanmış (tam kod-kanıtlı): 12.** Bu, T1-A H1-H3 + T1-B3'ün "ARADAN KAPANMIŞ ✅" bulgusunu güçlü biçimde pekiştirir (bu 2026-08-02 keşif fotoğrafları en bayat olanlar).

**Kısmi kapanan (⚠️): D21 ThemeToggle** — admin ✅, **platform layout HÂLÂ eksik** (grep: `platform/layout.tsx` ThemeToggle YOK) → 🟡 YARIM (T1-A madde 5 "✅ mevcut" der ama platform tarafını ayrıca sorgulamadı → YENİ nüans).

---

## 4. SEVİYE-1 / KOD-DOĞRULAMASI DURUMU (bu turda salt-okuma yapılan 12 nokta)

> S1 = güvenlik/KVKK/DB/eşleştirme/kimlik → belge beyanı YETMEZ. Bu turda salt-okuma kod-teyit yapıldı:

- **✅ TEYİT: `listUsers` sayfalı** — `userController.ts:38,63-64,99-100,116` (pageSize max 100, skip/take, totalPages).
- **✅ TEYİT: avatar upload mevcut** — `avatarController.ts` + `middleware/avatarUpload.ts` (multer) + `rateLimiter.ts`'te avatar limiti.
- **✅ TEYİT: avatarUrl liste select'lerinde** — `userController.ts:95,157,472`.
- **✅ TEYİT: candidates IDOR korumalı** — `matchingController.ts:40-48` (isOwner değilse 403).
- **✅ TEYİT: requests/:id IDOR korumalı** — `requestController.ts:8,29-33,113-118` (requesterUserId body'den alınmaz; isRequester/isTarget/ADMIN; yetkisiz 404).
- **✅ TEYİT: discVector guard'lı** — `userController.ts:139(yorum),166-167,202-205,283` (ham PII self/admin fullAccess ardında; updateUser response'tan `discVector/temperamentJson/selfProfile` çıkarılıyor).
- **✅ TEYİT: logout UI'a bağlı** — `DashboardNav.tsx:30,39`.
- **✅ TEYİT: ThemeToggle admin var** — `(admin)/layout.tsx:16,93`.
- **✅ TEYİT (NEGATİF): ThemeToggle platform YOK** — `platform/layout.tsx` grep boş → D21 platform tarafı eksik.
- **✅ TEYİT (NEGATİF): sector-scorer bağlanmamış** — `sector-scorer.service.ts` VAR ama `matching.ts` içinde import/çağrı YOK (grep boş) → İŞ 7 hâlâ açık (madde 14 v2).
- **✅ TEYİT: `Menti Mentör proje/` klasörü YOK** — `ls -d` GONE (aradan temizlenmiş).
- **✅ TEYİT: `.env.backup-anaDB` HÂLÂ VAR** — `ls backend/.env.backup-anaDB` mevcut (silinmemiş, PO/env-geçiş bekliyor).

> **Kod ARANDI ama teyit BEKLEYEN ❓ kalemler** (bu tur derin bakılmadı / DB'ye sorulmadı — kural):
> - B10 sekme-geçiş yavaşlık (useApiClient stable ref) — düzeldi mi? teyit yok.
> - B12 sol-alt kullanıcı kartı — eklendi mi? teyit yok.
> - `rewardPenalty.ts` / `llmRetry.ts` gerçekten atıl mı, `discResultCard` okunuyor mu (kart-havuz :173 ↔ hayalet :41 çelişkisi) — teyit yok.
> - `mentiRequestController.ts` SİLİNDİ mi (T1-B3 belge-denetimi :54) ↔ kart-havuz :67-69 hâlâ referans veriyor — teyit yok.
> - Global seed canlı sayıları (DISC/SJT/LearningStage) — DB'ye sorulmadı (kural).

---

## 5. ÇELİŞKİLER (hakem OLMADIM, ikisini de yazdım)

| # | Çelişki | Belge 1 | Belge 2 / kod | Not (yeni/kod) |
|---|---|---|---|---|
| TÇ1 | **Sunucu konumu** | teshis :106 "DB Neon eu-west-2 İRLANDA/AB, Mail Resend İrlanda/AB" | T1-A madde 92/Ç6 "Londra/BK, eu-west-2=Londra, İrlanda hatalıydı (PO teyitli 2026-08-26)" | KOD/PO KAZANIR = Londra/BK. teshis :106 BAYAT → belge-hijyen ⚠️NOT adayı (düzeltmedim). ≡ T1-A Ç6 |
| TÇ2 | **`mentiRequestController.ts` durumu** | kart-havuz :67-69 "ikinci akış `mentiRequestController.ts:34/148-209` VAR" | T1-B3 belge-denetimi :54 "mentiRequestController SİLİNDİ ✅" | Zaman farkı olabilir (2026-08-02 kart-havuz ↔ sonraki refactor). ❓ TEYİT (kod-teyit yapılmadı) |
| TÇ3 | **`discResultCard` okunuyor mu** | hayalet :41 "yazılıyor ama okuma izi YOK (yaz-ama-oku-yok adayı)" | kart-havuz :173 "gösterilebilir rozet `discResultCard`... kartta gösterilir" | Aynı fotoğraf günü içinde çelişki; ❓ TEYİT (okuma noktası doğrulanmadı) |
| TÇ4 | **C18 dropdown İngilizce mi** | teshis :43 "CORE/DEEPENING İngilizce → değiştir" + T1-B3 stk-admin B9 "✅ TR yapıldı #62" | T1-B2 06:52-54 "dropdown hâlâ İngilizce" | Görünen-etiket TR (TYPE_LABELS) ✅ ama enum DB'de EN kalmalı (bilinçli); T1-B2 satırı "görünen" mi "enum" mu netleştirmeli. Kısmi bayat |
| TÇ5 | **D21 ThemeToggle durumu** | tema :15-23 + teshis :49 "admin+platform nav'a eklenmeli" | KOD: admin ✅ / platform ❌ + T1-A madde 5 "✅ mevcut `(admin)/layout.tsx:92`" | admin KAPANDI, platform HÂLÂ eksik → T1-A madde 5 platform'u ayrıca sorgulamadı; YENİ nüans → 🟡 YARIM |

**Çelişki toplam: 5** (TÇ1-TÇ5). TÇ1 = bayat-satır (kod/PO kazanır) · TÇ2/TÇ3 = teyit-bekleyen (kod-teyit yapılmadı) · TÇ4 = kısmi-bayat (görünen/enum nüansı) · TÇ5 = kısmi-tamamlanma (platform eksik, YENİ bilgi).

---

## KESİN SAYIM

**Toplam defter kalemi: 140.**

Durum dağılımı (TAM sayı):
- **✅ YAPILDI: 66** (çoğu ARADAN KAPANMIŞ — bu keşif fotoğrafları en bayat olanlar; kural/tespit/karar ✅'ları dahil)
- **🟡 YARIM: 13** (sector-scorer bağlama, foto-zorunluluk, A9 yönetici-atama, D21-platform, kart işleri, belge-mimarisi merge-özeti vb.)
- **🔀 PR'DA: 0** (bu belgeler PR takip etmiyor; ilgili PR'lar merged/T1-A'da)
- **⬜ AÇIK: 39** (KVKK blocker, landing dark/light, hayalet mod+CSV, C17/C20 UX, E24, belge-hijyen, seed vb.)
- **❓ TEYİT GEREK: 20** (B10/B12 bug, rewardPenalty/llmRetry, discResultCard, mentiRequestController, kart açık-kararlar, logoUrl XSS, Neon pool vb.)
- **🗑️ GEÇERSİZ ADAYI: 1** (teshis :106 sunucu-konumu İrlanda/AB — Londra/BK ile çürütüldü; belge-hijyen düzeltme, PO kararı — TAŞIMADIM/DEĞİŞTİRMEDİM)

**NUMARASIZ kalem: ~131** (bu keşif belgeleri düz-metin; numara taşıyanlar yalnız teshis A1-A9/B10-B15/C16-C20/D21-D23/E24 ve tema/teshis D21 — panel/bug/UX kodları). Numara DOĞURULMADI.

**🟡 YARIM'ın "NİYET BELGELENMEMİŞ" durumu:** 13 YARIM kaleminin çoğunda niyet belgede AÇIK (sector-scorer=isabetli sektör skoru, foto-zorunlu=herkes foto, A9=yönetici atama). **NİYET BELGELENMEMİŞ: 0** (hepsinin niyeti yazılı). Asıl boşluk "DURUŞ SEBEBİ YOK" grubunda (§2-D: 6 kalem — B10/B12/C17/C20/E24/ölü-kod teyitleri).

**Hayalet-tamamlanmış (kod-kanıtlı): 12** (§3, TH1-TH12) + 1 kısmi (D21 platform).

**Çelişki: 5** (§5, TÇ1-TÇ5).

**Kod arandı: 12 nokta** (§4) — 11'i pozitif/negatif TEYİT, kalan ❓'ler (B10/B12/rewardPenalty/llmRetry/discResultCard/mentiRequestController/seed) bu turda derin-bakılmadı (DB'ye dokunulmadı, kural).
