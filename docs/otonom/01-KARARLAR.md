> 🔥 SICAK — her otonom turda okunur: YALNIZ bu indeks. Kart gövdeleri `docs/otonom/kararlar/KARAR-NNN.md`; rutin turda yalnız ✍️ satırının kart dosyası açılır (OTONOM-PROMPT § 0.4).
> TÜR: 🔥 · TAZELEME TETİKLEYİCİSİ: PO bir CEVAP yazınca ya da yeni kart açılınca · Düzen: GÖREV 2.4 (2026-09-28) — eski indeks tablosu ve bölüm metinleri `docs/otonom/arsiv/01-KARARLAR-kart-gecmisi.md`'de (AYNEN).

# 01-KARARLAR — Ürün Karar Kuyruğu (v3 · indeks)

**Nasıl cevaplarsın:** aşağıdaki indekste kartı bul → **kart dosyasını aç** (Kart sütunundaki bağlantı, `docs/otonom/kararlar/KARAR-NNN.md`) → **en alttaki `**CEVAP:**` satırına harf yaz.** Örnek: `**CEVAP:** A` · not da ekleyebilirsin: `**CEVAP:** A — ama metni ben yazacağım`
CEVAP'ın TEK kaynağı kart dosyasıdır; bu indekse CEVAP yazılmaz. Ajan her turda kart dosyalarındaki dolu CEVAP'ları tarar, indekste o satırı ✍️ yapar, işleyince ✅.
Cevapsız bıraktığın karar, ilgili işi kilitler. Kilitlediği işler indekste ve `00-KUYRUK.md` § 🔴 KİLİT HARİTASI'nda yazıyor.

**Ajan bu dosyaya ve kart dosyalarına yalnız SORU ekler, cevap yazmaz.** Yeni kart: `docs/otonom/kararlar/KARAR-<sonraki no>.md` + bu indekse tek satır (OTONOM-PROMPT § 9).
**Teknik kararlar burada YOKTUR** — onları ajan kendi verir (kütüphane, dosya yapısı, isimlendirme,
renk paleti, hata mesajı metni, hangi mükerrer ucun kalacağı, çeviri).

---

## ✍️ PO NOTU
> Serbest not alanı (karar kartına sığmayan kısa bir yön notu). Ajan bu dosyayı okurken görür; işlediğinde notu 02-ILERLEME'ye kaydedip alanı boşaltır.

(boş)

---

## 📑 İNDEKS
Durum: ⬜ cevap bekliyor · ✍️ CEVAP yazıldı, henüz işlenmedi · ✅ cevaplandı. Kilitlediği işler = eski indeksteki "kaç işi açar" bilgisi + bugün kuyrukta 🔴 ile bu karta bağlı satırlar (`00-KUYRUK-KARAR-BEKLEYEN.md`).
Sıra: cevap bekleyenler kuyrukta kilitledikleri iş sayısına göre (çoktan aza), eşitse numara; cevaplanmışlar numara sırasıyla.

### ⬜ / ✍️ Cevap bekleyen (107)

| # | Konu | Kilitlediği işler | Durum | Öneri | Kart |
|---|---|---|---|---|---|
| KARAR-64 | "Mizaç" mı "karakter" mi "kişilik" mi | **1** (MUT §4-5 · `onboardingController.ts:492`) · 🔴 kuyrukta: I-01, I-11, AN-50, AN-51 | ⬜ boş · ⭐ analiz turu · öneri C (kişilik) | C | [kart](kararlar/KARAR-064.md) |
| KARAR-46 | Sertifika içeriğinin hangi sürümü canlıya gidecek | **2** (P-99 → K-16) · 🔴 kuyrukta: F-14, P-99, AN-03 | ⬜ boş · ⭐ içerik konseyi · SEED · ⚠️ 88 şıkın TAMAMI + 15 senaryo eler | A | [kart](kararlar/KARAR-046.md) |
| KARAR-36 | Yarım 3 teknik kalem (`answeredFollowup` · ikiz alan · 2 yedek tablo) | **4** (Y-18, D3, S26, S37) · 🔴 kuyrukta: Y-18, AJ-10 | ⬜ boş · ⭐ BB turu · ⚠️ `migrate dev` yedek tabloyu silebilir | (a)+(b) için B (karantina), (c) için A (şemaya ekle) | [kart](kararlar/KARAR-036.md) |
| KARAR-44 | Algoritma kendi sonuçlarından öğrensin mi + hangi memnuniyet "gerçek" | **2-3** (PS-05, F-08, KARAR-12) · 🔴 kuyrukta: F-08, AJ-38 | ⬜ boş · ⭐ psikometri konseyi | B | [kart](kararlar/KARAR-044.md) |
| KARAR-50 | Kuralların "geçersizleşme koşulu" zorunlu olsun mu | **4** (YN-04, YN-05 + 2 takip) · 🔴 kuyrukta: YN-04, YN-05 | ⬜ boş · ⭐ yönetişim konseyi · ⚠️ "KURAL 17" diye bir kural HİÇ YAZILMADI | A şimdi, C sonra | [kart](kararlar/KARAR-050.md) |
| KARAR-57 | Kullanıcının mizaç sonucunu hangi test belirlesin | **4** (TO §0-2) · 🔴 kuyrukta: F-09, PS-03 | ⬜ boş · ⭐ analiz turu · öneri A (32 soru esas) | A | [kart](kararlar/KARAR-057.md) |
| KARAR-58 | Eski DISC ↔ yeni Big Five geçiş dönemi | **2+** (IK:223 · TO Y-23) · 🔴 kuyrukta: PS-A2, AN-04 | ⬜ boş · ⭐ analiz turu · MIGRATION/GERİ DÖNÜLMEZ, öneri YOK; yedek zorunlu | öneri YOK | [kart](kararlar/KARAR-058.md) |
| KARAR-61 | Yeni formül arketip motoruyla aynı anda mı açılsın | **2** (MUT §4 · `scoring.ts:89-90`) · 🔴 kuyrukta: F-11, AJ-92 | ⬜ boş · ⭐ analiz turu · öneri B (iki adım) | B | [kart](kararlar/KARAR-061.md) |
| KARAR-72 | Ghost / "kalıcı red" özelliği olacak mı | **1** (AN-33) · 🔴 kuyrukta: KR-20, AN-33 | ⬜ boş · ⭐ CS bilanço · ÜRÜN+HUKUK · öneri B (koru) | B (koru), gerçek kötüye-kullanım görülene kadar | [kart](kararlar/KARAR-072.md) |
| KARAR-88 | Hakkımızda / İletişim + yüzen WhatsApp | **2** (Y-07, Y-11) · 🔴 kuyrukta: Y-07, Y-11 | ⬜ boş · kurumlara görünen metin · öneri A (iki sayfa + e-posta) | A | [kart](kararlar/KARAR-088.md) |
| KARAR-89 | Görüşme değerlendirmesinin tek kutusu | **3** (KR-08, AN-49, KR-11) · 🔴 kuyrukta: KR-08, AJ-49 | ⬜ boş · MIGRATION · ⚠️ KARAR-77 ile çelişki · öneri B | B | [kart](kararlar/KARAR-089.md) |
| KARAR-95 | Kriz kanalı — güvenlik sorusu olarak yeniden | **2** (I-18, IC-13) · 🔴 kuyrukta: I-18, IC-13 | ⬜ boş · ⭐ KARAR-80/M20'den doğdu (2026-09-26), KARAR-69 (c) gereği · öneri A | C | [kart](kararlar/KARAR-095.md) |
| KARAR-110 | Periyodik anket (ilişki geneli değerlendirme) ne olsun | **1** (AJ-14) · 🔴 kuyrukta: AJ-14, AJ-49 | ⬜ boş · ajan-ekledi · öneri A | A | [kart](kararlar/KARAR-110.md) |
| KARAR-2 | Profile serbest bağlantı alanı | 1 (K-17) · 🔴 kuyrukta: K-17 | ⬜ boş | A | [kart](kararlar/KARAR-002.md) |
| KARAR-3 | Sertifika "bildirim yükümlülüğü" hukuki metni | 1 (K-16) · 🔴 kuyrukta: K-16 | ⬜ boş | A | [kart](kararlar/KARAR-003.md) |
| KARAR-4 | Kriz destek kaynağı metni | 1 (K-16) · 🔴 kuyrukta: K-16 | ⬜ boş | A şimdi, B'yi kuyruk adayı yap | [kart](kararlar/KARAR-004.md) |
| KARAR-5 | Öğrenme yolculuğu seed canlıya | 1 (K-18) · 🔴 kuyrukta: K-18 | ⬜ boş | B | [kart](kararlar/KARAR-005.md) |
| KARAR-12 | Görüşme geri bildirim kayıt sistemi | 0 · 🔴 kuyrukta: AJ-38 | ⬜ boş | A | [kart](kararlar/KARAR-012.md) |
| KARAR-15 | Çok-kuruma üye kurumlar arası geçiş | 0 · 🔴 kuyrukta: AJ-10 | ⬜ boş | B | [kart](kararlar/KARAR-015.md) |
| KARAR-19 | KVKK geri-dönülmez yetkiler kümesi | 1 (F-07) · 🔴 kuyrukta: F-07 | ⬜ boş · ⚠️ ağustos G1-15/16/29 ✅ işleme-al | C şimdi + B'yi kuyruk adayı | [kart](kararlar/KARAR-019.md) |
| KARAR-21 | STK anket cevap tipi (answerType) | 1 (F-12) · 🔴 kuyrukta: F-12 | ⬜ boş · ⚠️ ağustos G3-13 ✅ → C seçeneği dışlanmış | A | [kart](kararlar/KARAR-021.md) |
| KARAR-30 | Senaryo isimleri: seed'den önce mi sonra mı | **2** (I-09, K-16/K-18 sırası) · 🔴 kuyrukta: I-09 | ⬜ boş · ⭐ BB turu · ⚠️ yanlış sıra = içerik iki kez canlıya yazılır | A | [kart](kararlar/KARAR-030.md) |
| KARAR-38 | Sunucu ülkesi + KVKK aydınlatma metni | **1** (GV-09) · 🔴 kuyrukta: GV-09 | ⬜ boş · ⭐ güvenlik konseyi · ⛔ AVUKAT ön koşulu (03-PO #19/#20) · KARAR-47 paketinde | C → sonra A. Çünkü "BK'ye aktarım ek rıza ister mi" sorusunu… | [kart](kararlar/KARAR-038.md) |
| KARAR-40 | Eski `POST /api/meetings` ucu: düzelt mi karantina mı | **1** (GV-06 kalıcı çözümü) · 🔴 kuyrukta: V-15 | ⬜ boş · ⭐ güvenlik konseyi · ⚠️ acil yama karardan BAĞIMSIZ · K-13/E-4 kümesi | A şimdi, B sonra | [kart](kararlar/KARAR-040.md) |
| KARAR-41 | Mentörün bir kontenjanı olsun mu | **1** (P-15) · 🔴 kuyrukta: P-15 | ⬜ boş · ⭐ psikometri konseyi · B seçeneği MIGRATION | C | [kart](kararlar/KARAR-041.md) |
| KARAR-45 | Arketip adları: hangi metin hangi koda bağlanacak | **4** (IC-14, I-01, I-15, IC-03'ün `M1`/`m1` ayağı) · 🔴 kuyrukta: IC-14 | ⬜ boş · ⭐ içerik konseyi · ⚠️ "Kâşif" üç ayrı anlamda · KARAR-10'dan AYRI | C | [kart](kararlar/KARAR-045.md) |
| KARAR-48 | Test sonucu ve eşleşme skoru kullanıcıya nasıl anlatılsın | **1** (3 ekran · C1-1…C1-6) · 🔴 kuyrukta: AN-20 | ⬜ boş · ⭐ içerik konseyi | A | [kart](kararlar/KARAR-048.md) |
| KARAR-51 | 4 "yaşayan ama ölü" belge dondurulsun mu | **2** (YN-06 + 🔄 sayımı) · 🔴 kuyrukta: YN-06 | ⬜ boş · ⭐ yönetişim konseyi | A | [kart](kararlar/KARAR-051.md) |
| KARAR-52 | Taşınan KURAL 8 mükerreri: hangi gövde kalsın | **1** (YN-02) · 🔴 kuyrukta: YN-02 | ⬜ boş · ⭐ yönetişim konseyi · ⚠️ BU TURDA DOĞDU (CLAUDE.md bölmesi) | B | [kart](kararlar/KARAR-052.md) |
| KARAR-56 | Menti aynı hafta birden fazla mentöre talep | **3** (`meetingController.ts:79-84`) · 🔴 kuyrukta: AN-21 | ⬜ boş · ⭐ analiz turu · öneri B (yalnız onaylananlar) | B | [kart](kararlar/KARAR-056.md) |
| KARAR-62 | İlk ölçüm: herkes aynı mı, adaptif mi | **2** (MUT §4 · TAS:159-163) · 🔴 kuyrukta: AN-04 | ⬜ boş · ⭐ analiz turu · öneri C; cross-ref KARAR-57 | C | [kart](kararlar/KARAR-062.md) |
| KARAR-73 | Değerlendirme AŞAMA 2/3 otomatik pasifleştirme | **1** (AN-34) · 🔴 kuyrukta: AN-34 | ⬜ boş · ⭐ CS bilanço · öneri C→B (veri birikince) | C şimdilik, veri birikince B | [kart](kararlar/KARAR-073.md) |
| KARAR-74 | Kurum (tenant) kalıcı silme hakkı (G1-29) | **1** (AN-37) · 🔴 kuyrukta: AN-37 | ⬜ boş · ⭐ CS bilanço · KVKK/GERİ DÖNÜLMEZ · öneri A (yedek+çift-onay) | A | [kart](kararlar/KARAR-074.md) |
| KARAR-76 | `Tenant.verifiedBy` alanı ne olsun (silme protokolü boşluğu) | **1** (AN-08 · AN-54) · 🔴 kuyrukta: AN-08 | ⬜ boş · ⭐ silme protokolü · VERİ · öneri B (karantina) | B | [kart](kararlar/KARAR-076.md) |
| KARAR-78 | Dönemlik anket: bağla / karantina / beklet | **1** (KR-11) · 🔴 kuyrukta: KR-11 | ⬜ boş · ⭐ kod incelemesi · SİLME PROTOKOLÜ · öneri B (karantina) | B | [kart](kararlar/KARAR-078.md) |
| KARAR-79 | Zamanlanmış iş tetikleme yetkisi kimde | **1** (KR-05) · 🔴 kuyrukta: KR-05 | ⬜ boş · ⭐ kod incelemesi · GÜVENLİK/YETKİ · öneri A · KARAR-13 ile birlikte cevaplanmalı | A | [kart](kararlar/KARAR-079.md) |
| KARAR-82 | Davet bağlantısı modeli | **1** (U-12) · 🔴 kuyrukta: U-12 | ⬜ boş · çıkış blokeri · öneri B (iptal edilebilir toplu link) | B | [kart](kararlar/KARAR-082.md) |
| KARAR-83 | Rolü kim, nasıl değiştirir | **1** (U-13) · 🔴 kuyrukta: U-13 | ⬜ boş · çıkış blokeri · YETKİ · öneri B (yalnız düşürme hatası) | B şimdi, A ihtiyaç doğunca | [kart](kararlar/KARAR-083.md) |
| KARAR-84 | E-posta yokken şifre sıfırlama | **1** (U-15) · 🔴 kuyrukta: U-15 | ⬜ boş · çıkış blokeri · YETKİ · öneri B (platform yöneticisi) | B | [kart](kararlar/KARAR-084.md) |
| KARAR-85 | Yeni ortamda DISC soru havuzu | **1** (U-17) · 🔴 kuyrukta: U-17 | ⬜ boş · çıkış blokeri · SEED · öneri A (silmeyen betik) | A | [kart](kararlar/KARAR-085.md) |
| KARAR-87 | Birden çok platform yöneticisi olacak mı? | **1** (AN-38) · 🔴 kuyrukta: AN-38 | ⬜ boş · yetki · öneri A (tek hesap kalsın) | A | [kart](kararlar/KARAR-087.md) |
| KARAR-93 | Üyeyi kurumdan çıkarma — 30 gün sonra kişilik verisi silme onayı | **1** (Y-14) · 🔴 kuyrukta: Y-14 | ⬜ boş · CANLI VERİ SİLME · evet/hayır · öneri B şimdi | B şimdi, silme adımı A olarak ayrı PR'da (sen "evet" dersen) | [kart](kararlar/KARAR-093.md) |
| KARAR-94 | Dışa aktarım hakkı (GV-17) çıkış blokeri olsun mu | **1** (GV-17) · 🔴 kuyrukta: GV-17 | ⬜ boş · ⭐ KARAR-80/M18'den doğdu (2026-09-26) · öneri A (blokeri olsun) | A | [kart](kararlar/KARAR-094.md) |
| KARAR-103 | Eski planlardaki 13 yapılmamış özellik — hangileri yapılsın | **13** (AJ-11) · 🔴 kuyrukta: AJ-11 | ⬜ boş · ajan-ekledi (K-C) · öneri B (4 küçük şemasız özellik) | B | [kart](kararlar/KARAR-103.md) |
| KARAR-105 | Kurumlar arası anonim karşılaştırma: izni kim açar, hangi sayılar paylaşılır | **1** (AN-31) · 🔴 kuyrukta: AN-31 | ⬜ boş · KARAR-34 SORU 2 (B) ayrıntısı · migration gerekir · öneri A | C şimdilik, sonra A | [kart](kararlar/KARAR-105.md) |
| KARAR-113 | Sertifika sınavında her seferinde kaç konu sorulsun, baraj neye göre? (AJ-34 / madde 149) | **1** (AJ-34) · 🔴 kuyrukta: AJ-34 | ⬜ boş · ajan-ekledi · öneri B | B | [kart](kararlar/KARAR-113.md) |
| KARAR-8 | Repoları private yap | 0 (PO aksiyonu) | ⬜ boş | B | [kart](kararlar/KARAR-008.md) |
| KARAR-9 | Kulüp modülü + İş İlanları | 0 (eklenmezse B) | ⬜ boş · ⚠️ ağustos G1-13 kulüp kurumu aktif / G10-12 modül ⏸️ | B | [kart](kararlar/KARAR-009.md) |
| KARAR-13 | Yöneticiye manuel "işlet" butonları | 0 | ⬜ boş | B | [kart](kararlar/KARAR-013.md) |
| KARAR-14 | Yönetici bir kullanıcının verisini silsin mi | 0 | ⬜ boş | B | [kart](kararlar/KARAR-014.md) |
| KARAR-16 | Yöneticiye eşleştirme kontrolleri | 0 | ⬜ boş | B | [kart](kararlar/KARAR-016.md) |
| KARAR-17 | Kurum yöneticisi davetsiz önizleme | 0 | ⬜ boş | C şimdilik | [kart](kararlar/KARAR-017.md) |
| KARAR-18 | PO-manuel işler listesi (onay değil) | — | — (hatırlatma) | — | [kart](kararlar/KARAR-018.md) |
| KARAR-25 | Gerçek yedek nereye yazılsın | 0 (G1-28 🔴) | ⬜ boş · W §4.3 · KVKK | Bu senin ürün+hukuk kararın, önerime güvenme | [kart](kararlar/KARAR-025.md) |
| KARAR-26 | İki yedek tablo (S26/S37) düşürülsün mü | 0 (DB) | ⬜ boş · W §4.4 · GERİ DÖNÜLMEZ | Bu senin veri kararın, önerime güvenme | [kart](kararlar/KARAR-026.md) |
| KARAR-28 | Ölü LLM/OpenAI env silinsin mi | 0 | ⬜ boş · Bölüm 4 · SİLME PROTOKOLÜ | A | [kart](kararlar/KARAR-028.md) |
| KARAR-31 | Kriz bildirimi (kendine zarar) + yaş sınırı | **2** (I-18, G1-01) | ⬜ boş · ⭐ BB turu · ⛔ AVUKAT ön koşulu, öneri YOK | Yok | [kart](kararlar/KARAR-031.md) |
| KARAR-35 | Canlı DB'ye salt-okuma izni | **5+** (md.30·33·118, S10, Y6) | ⬜ boş · ⭐ BB turu · en çok iş açan yeni kart | A | [kart](kararlar/KARAR-035.md) |
| KARAR-37 | madde 103 — kart mı özet mi kazanır | 1 (md.103) | ⬜ boş · ⭐ BB turu · G1-23 vakasının tekrarı riski | B | [kart](kararlar/KARAR-037.md) |
| KARAR-39 | Anonimleştirme kapsamı: arketip kopyası + başkasının yorumu | **1** (GV-08 yorum ayağı) | ⬜ boş · ⭐ güvenlik konseyi · arketip ayağı karardan BAĞIMSIZ | B + taahhüt metninin netleştirilmesi | [kart](kararlar/KARAR-039.md) |
| KARAR-42 | DISC testi tekrar edilebilsin mi (3 düğme vaat ediyor, hiçbiri çalışmıyor) | **2** (PS-10 döngüsü, PS-03'ün faydası) + yeni satır | ⬜ boş · ⭐ psikometri konseyi · VERİ | B | [kart](kararlar/KARAR-042.md) |
| KARAR-43 | Menti, mentörün eleyeceği eşleşmeyi görmeye devam etmeli mi | **1** (cevap sonrası yeni satır) | ⬜ boş · ⭐ psikometri konseyi | C | [kart](kararlar/KARAR-043.md) |
| KARAR-47 | Hukuki metin paketi — avukata tek seferde ne sorulacak | **5 kalem** (KARAR-38·3·4 + F-02 + F-03/GV-18) | ⬜ boş · ⭐ içerik konseyi · ⛔ AVUKAT · tek görüşme | B | [kart](kararlar/KARAR-047.md) |
| KARAR-49 | `devir/01` ve `devir/06`: dondurulmuş mu, kalıcı referans mı | **2** (6 bayat "merge etme" satırı) | ⬜ boş · ⭐ yönetişim konseyi · BELGE POLİTİKASI | B | [kart](kararlar/KARAR-049.md) |
| KARAR-54 | Mentör/menti kart havuzu 5 tasarım kararı | **5+** (OB-01..05 · `mentor-karti-rakip-analizi:87-91`) | ⬜ boş · ⭐ analiz turu · en yüksek öncelik; 5 alt-soru, öneri YOK | öneri YOK | [kart](kararlar/KARAR-054.md) |
| KARAR-55 | Sertifikada geri bildirim ne zaman gösterilsin | **2** (TO §8.2 · TAS:369-371) | ⬜ boş · ⭐ analiz turu · öneri B (sonda) | B | [kart](kararlar/KARAR-055.md) |
| KARAR-59 | Kurgu/persona kişi adları yasağa dahil mi | **2** (IK:229 · PP:165,247) | ⬜ boş · ⭐ analiz turu · KURAL/KVKK, öneri YOK | öneri YOK | [kart](kararlar/KARAR-059.md) |
| KARAR-60 | Kullanıcı kişilik boyut yüzdesini görür mü | **1** (TO Z-15,Y-19) | ⬜ boş · ⭐ analiz turu · öneri A (yüzde gizli) | A | [kart](kararlar/KARAR-060.md) |
| KARAR-63 | Arketip eşiği 45/55/60 belgelensin mi kaldırılsın mı | **1** (MUT §4 · `scoring.config.ts:31`) | ⬜ boş · ⭐ analiz turu · öneri A (P3) | A | [kart](kararlar/KARAR-063.md) |
| KARAR-65 | "D mentör + S menti" yasağı menti tarafında da mı | **2** (TO §8.2 · `matching.ts:200-216`) | ⬜ boş · ⭐ analiz turu · öneri B; KARAR-61 ile birlikte | B | [kart](kararlar/KARAR-065.md) |
| KARAR-67 | Yönetici drill-down serbest-metin nota inmeli mi | **1** (PP:271 C1 · KVKK) | ⬜ boş · ⭐ analiz turu · öneri A (aggregate) | A | [kart](kararlar/KARAR-067.md) |
| KARAR-68 | Persona/panel belgeleri nasıl gelişmeli A/B/C | **2** (PP §7 E · §5.1) | ⬜ boş · ⭐ analiz turu · BELGE POLİTİKASI · öneri tetikleyicili B | Tetikleyicili B (o zamana kadar C) | [kart](kararlar/KARAR-068.md) |
| KARAR-71 | Kırılgan kullanıcıda tutundurma etiğinin sınırı | **1+** (PP:237 C3 · prompt) | ⬜ boş · ⭐ analiz turu · ETİK/UZMAN, öneri YOK | öneri YOK | [kart](kararlar/KARAR-071.md) |
| KARAR-75 | KVKK yasal metinlerinde kişi adı: yasak mı istisna mı | **0** (AN-41/YN-13 etkiler) | ⬜ boş · ⭐ CS bilanço · HUKUK/POLİTİKA · öneri B (kurum/unvan) | B (kurum/unvan) + avukat teyidi | [kart](kararlar/KARAR-075.md) |
| KARAR-86 | Platform üye listesinde kişilik tipi | **0** (yeni iş) | ⬜ boş · KVKK · öneri A (gösterilmesin) | A | [kart](kararlar/KARAR-086.md) |
| KARAR-90 | Görüşme sonrası yeni sorular (AN-48) | **1** | ⬜ boş · öneri A şimdi + B paket | A şimdi, gerisi B ile KARAR-89 paketinde | [kart](kararlar/KARAR-090.md) |
| KARAR-91 | Görüşme değerlendirmeleri saklama süresi | **1** | ⬜ boş · KVKK/hukuki · öneri C şimdi | C şimdi (dışa aktarım teknik bir düzeltme, 🟡), süre için huk… | [kart](kararlar/KARAR-091.md) |
| KARAR-92 | Oryantasyon kilidi tetiklensin mi | **1** | ⬜ boş · öneri B (2 ardışık) | B | [kart](kararlar/KARAR-092.md) |
| KARAR-96 | 🔵 EVET/HAYIR — AN-30 ayrı ayrı rıza kutuları (veritabanına 6 yeni rıza türü) | **1** (AN-30) | ⬜ boş · 🔵 canlı DB değişikliği · PR backend #142 + çatı #320 | — | [kart](kararlar/KARAR-096.md) |
| KARAR-97 | 🔵 EVET/HAYIR — U-18 mentör mesaj talebini reddedebilsin (veritabanına 1 yeni alan) | **1** (U-18) | ⬜ boş · 🔵 canlı DB değişikliği · PR backend #148 + çatı #326 | — | [kart](kararlar/KARAR-097.md) |
| KARAR-98 | 🔵 EVET/HAYIR — AN-26 yanıtsız mentöre hatırlatma + yöneticiye bildirim (veritabanına 3 yeni alan) | **1** (AN-26) | ⬜ boş · 🔵 canlı DB değişikliği · PR backend #157 + çatı #337 | — | [kart](kararlar/KARAR-098.md) |
| KARAR-99 | 🔵 EVET/HAYIR — AN-02 iki soru metnindeki yazım hatası canlıda düzeltilsin mi | **1** (AN-02) | ⬜ boş · 🔵 canlı veriye yazma (2 satır) · PR backend #160 | — | [kart](kararlar/KARAR-099.md) |
| KARAR-100 | `ProfileSource.SJT_ENRICHED` değeri ne olsun (silme protokolü — gerekçe bulunamadı) | **0** (AN-54 bulgusu) | ⬜ boş · KARAR-76 ile aynı tür soru | A | [kart](kararlar/KARAR-100.md) |
| KARAR-101 | Onay bekleyen kullanıcı giriş yapıp "Bekleme Odası"nı görebilsin mi (güvenlik açığı B8'in kapatılma biçimi) | **1** (Y1-B8 — PR #164/#343) | ⬜ boş · güvenlik + ürün · öneri B | B | [kart](kararlar/KARAR-101.md) |
| KARAR-102 | Kayıttan sonra hemen giriş mi, önce e-posta doğrulaması mı (e-posta sızıntısının son kalıntısı) | **1** (GV-12 kalanı) | ⬜ boş · güvenlik + ürün · öneri C | C | [kart](kararlar/KARAR-102.md) |
| KARAR-104 | Uyum eşiğini geçen tek mentör randevuya kapalıysa menti ne görsün | **0** (PS-A4 sonrası ince ayar) | ⬜ boş · ajan-ekledi (PS-A4 7b notu) · öneri A | A | [kart](kararlar/KARAR-104.md) |
| KARAR-106 | 🔵 EVET/HAYIR — AN-52-1 ürün-içi anket cevap tablosu (yeni tablo, mevcut veri etkilenmez) | **1** (AN-52-3) | ⬜ boş · 🔵 canlı DB değişikliği (yeni tablo, yedek gerekmez) · PR backend #185 | — | [kart](kararlar/KARAR-106.md) |
| KARAR-107 | 🔵 EVET/HAYIR — dondurulmuş `interactionStyle` alanının yazılması kapatılsın mı (karantina) | **1** (AN-12) | ⬜ boş · 🔵 · migration yok · yedek gerekmez | — | [kart](kararlar/KARAR-107.md) |
| KARAR-108 | DISC eşitlik sırası iki yerde farklı — tek kaynak hangisi | **0** (bugün etkisi yok) | ⬜ boş · psikometri · öneri A | A | [kart](kararlar/KARAR-108.md) |
| KARAR-109 | Mentörlük anlaşması taslağını kim başlatabilsin | **1** (E-3 anlaşma taslağı) | ⬜ boş · ajan-ekledi (E-3 ayıklaması) · öneri A | A | [kart](kararlar/KARAR-109.md) |
| KARAR-111 | 🔵 EVET/HAYIR — müsaitliğe görüşme türü + süre (K-15, ⛔ MIGRATION) | **1** (K-15) | ⬜ boş · 🔵 · yedek: `AvailabilityBlock` | — | [kart](kararlar/KARAR-111.md) |
| KARAR-112 | Kurum logosu hangi adreslerden gösterilebilsin? (AJ-22 kalanı — izleme pikseli) | **1** (AJ-22) | ⬜ boş | A şimdilik, C ayrı iş olarak planlansın | [kart](kararlar/KARAR-112.md) |
| KARAR-114 | Tarayıcı bildirimi gerçekten gönderilsin mi? (AJ-39 sonrası) | **0** (yeni özellik sorusu) | ⬜ boş · ajan-ekledi · öneri A | A | [kart](kararlar/KARAR-114.md) |
| KARAR-115 | "Kurumunu Kur" sayfası arama motorlarında görünsün mü? (AJ-47 sonrası) | **0** | ⬜ boş · ajan-ekledi · öneri A | A şimdilik | [kart](kararlar/KARAR-115.md) |
| KARAR-116 | 🔵 EVET/HAYIR — eski kişilik kartlarındaki ham test puanları temizlensin mi (AJ-50) | **1** (AJ-50) | ⬜ boş · 🔵 · yedek: `User.discResultCard` (etkilenecek satırlar) | EVET | [kart](kararlar/KARAR-116.md) |
| KARAR-117 | Mentörün emeği dönemsel olarak da takdir edilsin mi ("dönemin/yılın mentörü") | **0** | ⬜ boş · ajan-ekledi · öneri A | A (şimdilik) | [kart](kararlar/KARAR-117.md) |
| KARAR-118 | Ayrı bir deneme (staging) ortamı kurulsun mu | **0** | ⬜ boş · ajan-ekledi · öneri B | B | [kart](kararlar/KARAR-118.md) |
| KARAR-119 | Gelir/sürdürülebilirlik modeli hangi kanal (kurumsal abonelik · sponsor/hibe · ertele) | **0** (KARAR-103 md.3/7'yi etkiler) | ⬜ boş · ajan-ekledi · öneri C | C | [kart](kararlar/KARAR-119.md) |
| KARAR-120 | Pasif üyelere otomatik hatırlatma e-postası gitsin mi (KVKK) | **0** | ⬜ boş · ajan-ekledi · öneri B | B | [kart](kararlar/KARAR-120.md) |
| KARAR-121 | Kişilik testinin cevap biçimi: zorunlu seçim mi, puanlama mı, karma mı | **0** | ⬜ boş · ajan-ekledi · öneri C | C | [kart](kararlar/KARAR-121.md) |
| KARAR-122 | Kişi derinleşme sorularını sınırsız yeniden cevaplayıp profilini değiştirebilsin mi | **0** | ⬜ boş · ajan-ekledi · öneri B | B | [kart](kararlar/KARAR-122.md) |
| KARAR-123 | Kayıtta üç soruyu atlayan kişiye sonradan sorulsun mu | **0** | ⬜ boş · ajan-ekledi · öneri A | A | [kart](kararlar/KARAR-123.md) |
| KARAR-124 | Platform yöneticisinin "mentör/menti sayısı" neyi saysın: kişiyi mi, kurum üyeliğini mi | **0** (cevap 1 küçük iş açar) | ⬜ boş · ajan-ekledi · öneri C | C | [kart](kararlar/KARAR-124.md) |
| KARAR-125 | Mentör/menti kendi kurumunu platforma önerebilsin mi ("ters çekim") | **0** | ⬜ boş · ajan-ekledi · öneri A | A (şimdilik) | [kart](kararlar/KARAR-125.md) |
| KARAR-126 | Az yanıtlı ilk ayda "NPS düşüşü" önerisi çıkmasın mı (KVKK çıkarımı) | **0** | ⬜ boş · ajan-ekledi (AJ-69) · öneri B | B | [kart](kararlar/KARAR-126.md) |
| KARAR-127 | Sertifikadan önce "Mini Akademi" (4 kısa modül) yapılsın mı | **0** (cevap AJ-101'i şekillendirir) | ⬜ boş · ajan-ekledi (GÖREV 2.2) · öneri A | A şimdilik (belge düzeltilir), gerçek mentör geri bildirimi … | [kart](kararlar/KARAR-127.md) |
| KARAR-128 | 🔵 EVET/HAYIR — 13 durum alanı veritabanında enum (AJ-77, migration) | **1** (AJ-77) | ⬜ boş · 🔵 · öneri EVET (§3b sayımı 0 şartıyla) | EVET | [kart](kararlar/KARAR-128.md) |

### ✅ Cevaplanmış (22)

| # | Konu | Kilitlediği işler | Durum | Öneri | Kart |
|---|---|---|---|---|---|
| KARAR-0 | Merge politikası | — | ✅ CEVAPLANDI · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-1 | Randevu format/süre kim belirler | 1 (K-15) | ✅ **CEVAPLANDI (2026-09-21): A** · ⛔ migration + yedek + PO onayı · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-6 | Menti tüm mentörleri görsün mü | 1 (K-19 içerik) | ✅ **CEVAPLANDI (2026-09-21): A** · + alt uyum eşiği · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-7 | Online toplantı linkini kim girer | 1 (K-19 içerik) | ✅ **CEVAPLANDI (2026-09-21): A** · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-10 | OCEAN/SJT psikometri motoru | 1 (F-11) | ✅ **CEVAPLANDI (2026-09-21): C** · ⭐ AŞAMALI (3 aşama, feature flag) · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-11 | Kullanılmayan/mükerrer kod ne olsun | **2** (K-13, E-5) | ✅ **CEVAPLANDI (2026-09-21): A** · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-20 | Mentör menti talebini reddedebilsin mi | 1 (F-17) | ✅ **CEVAPLANDI (2026-09-21): A** · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-22 | Mentör reddederken ne olsun (ret deneyimi) | 1 (P-05) | ✅ **CEVAPLANDI (2026-09-21): B** · ⚠️ e-posta ayağı SMTP bekler · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-23 | Kurum bildirimleri açılsın mı (onay/ret/düzeltme maili) | 1 (U-04) | ✅ **CEVAPLANDI (2026-09-21): ÖZEL — onay+düzeltme maili, ret maili YOK** · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-24 | Hata iz kaydı (stack) panele açılsın mı | 0 (V-02 kısmı) | ✅ **CEVAPLANDI (2026-09-21): B — PII temizlenmiş** · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-27 | Dış hata izleme servisi kurulsun mu | 0 | ✅ **CEVAPLANDI (2026-09-21): A — Sentry, PII temizleme + KVKK metni** · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-29 | Öğrenme yolculuğu diğer şık açıklamaları gösterilsin mi | 1 (K-06) | ✅ **CEVAPLANDI (2026-09-21): A** · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-32 | Mentör kendini havuzdan çekebilsin mi | **2** (Y-15, `mentorVisibilityEnabled`) | ✅ **CEVAPLANDI (2026-09-23 REVİZYON): havuzdan ÇIKMAZ — soluk görünür, yalnız mesaj, randevu almaz** (KARAR-53 ③); ~~2026-09-21: A~~ · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-33 | Kurumdan üye çıkarma + red tipi | **2** (Y-14/md.36, md.35) | ✅ **CEVAPLANDI (2026-09-21): B — dondur, sebep seç, 30 gün sonra psikometri sil** · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-34 | Kulüp tipi kurum + kurumlar arası görünürlük | **3** (md.91·115·116) | ✅ **CEVAPLANDI (2026-09-23): ÖZEL — topluluk lideri modeli** (lider onaylanır, üyeler değil; lider=veri sorumlusu) + kayıt ekranı zorunlu/isteğe-bağlı + SORU2→B anonim toplu; ⛔ AVUKAT · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-53 | Menti müsait olmayan saati önerebilsin mi (booking ↔ müsaitlik çelişkisi) | **1** (K-05) ⛔ çıkış blokeri | ✅ **CEVAPLANDI (2026-09-23): ÖZEL — mentörün 4 hâli** (blok=kat+takvim · koşul=esnek · meşgul=soluk/mesaj · boş=dürt+eskalasyon); KARAR-1 ile TEK migration · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-66 | "Akıllı eşleştirme" iddiası — ölç mü geri çek mi | **2** (PP:248 C2) | ✅ **CEVAPLANDI (2026-09-23): B — iddia geri çekilir, "YÖNLENDİRME"** · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-69 | "ÇIKIŞ" tanımı ne | **0** (tüm çıkış-blokeri etiketlerini geçerli kılar) | ✅ **CEVAPLANDI (2026-09-23): A+B — ilk kurum + KVKK tabanı; ölçek hukuku ertelenir** · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-70 | Gerçek kullanıcı görüşmesi: ne zaman, kaç kişi | **1** (görüşme kılavuzu · PP:334,337) | ✅ **CEVAPLANDI (2026-09-23): C sonra B + sistem-içi otomatik soru** · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-77 | Görüşmeye iki taraf da değerlendirme yazsın mı | **2** (KR-08 · KR-11 dolaylı) | ✅ **CEVAPLANDI (2026-09-25): A** — her taraf kendi kaydı, görünürlük değişmez · kart KR-08 bitene kadar ana dosyada | A | [kart](kararlar/KARAR-077.md) |
| KARAR-80 | Kuyruk çelişkileri (22 madde, tek cevapla) | **85** (liste kartta · her satırın Not'unda "çelişki: KARAR-80/Mx") | ✅ **CEVAPLANDI (2026-09-26): M1-M22 hepsi A** — 85 satır işlendi (kilit açıldı/katlandı/açık karara bağlandı); 2 yeni kart açtı: KARAR-94 (GV-17), KARAR-95 (kriz kanalı) · 📦 tam metin: `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md` | — | [arşiv](arsiv/01-KARARLAR-cevaplanmis.md) |
| KARAR-81 | Taslak kurumlar · kurulum ne zaman tamam | **2** (mevcut taslaklar · kayıt anında tamamlandı) | ✅ CEVAPLANDI 2026-09-25: ÖZEL — temizlik sürer, mevcut taslaklar test verisi (dokunulmaz); işaret kayıtla aynı transaction'da → KR-23 | A | [kart](arsiv/kararlar/KARAR-081.md) |
