# 01-CEVAPSIZ — CEVAP satırı boş kararlar

> ⚙️ **TÜRETİLMİŞ** — kaynak: `docs/otonom/01-KARARLAR.md` · üretim: 2026-09-23 18:54 UTC · üretici: `scripts/otonom-turet.mjs`
> ⛔ **BURAYA ELLE YAZMA.** Kaynak olarak kullanma, atıf verme. Çelişki halinde **01-KARARLAR.md KAZANIR.**
> Üretim tarihi 1 günden eskiyse bu dosyaya güvenme → kaynaktan hedefli oku (`OTONOM-PROMPT.txt` § 0.4).
> 🔥 SICAK — her otonom turda okunur. Hedefli okuma: OTONOM-PROMPT.txt · Okuma

**Sayım:** 58 kart gövdesi · **cevapsız: 57** · ⚠️ CEVAP satırı bulunamayan: KARAR-18
Kart gövdesini açmak için: `grep -n -A 25 '^### KARAR-<n> ' docs/otonom/01-KARARLAR.md`
"Kilitli işler" = kuyrukta kapısı 🔴 olan, Kapı hücresinde bu kartı anan BEKLIYOR satırlar (otomatik sayım).
"Kaç işi açar" = 01-KARARLAR indeks tablosundaki beyan (elle yazılmış).

| Kart | Başlık | Kaç işi açar (indeks) | Kilitli işler (kuyruk 🔴) |
|---|---|---|---|
| KARAR-2 | Profile serbest bağlantı alanı  [ÜRÜN KARARI · MIGRATION] | 1 (K-17) | K-17 |
| KARAR-3 | Sertifika senaryosunda "bildirim yükümlülüğü" metni  [ÜRÜN KARARI · HUKUKİ] | 1 (K-16) | K-16 |
| KARAR-4 | Kriz durumunda yönlendirilecek "destek kaynağı" ne yazsın?  [ÜRÜN KARARI] | 1 (K-16) | K-16 |
| KARAR-5 | Öğrenme yolculuğu içeriği canlıya girsin mi?  [ÜRÜN KARARI · SEED] | 1 (K-18) | K-18 |
| KARAR-8 | Repoları private yapma  [PO AKSİYONU — ajan yapamaz] | 0 (PO aksiyonu) | — |
| KARAR-9 | Kulüp modülü ve İş İlanları  [ÜRÜN KARARI] | 0 (eklenmezse B) | — |
| KARAR-12 | Görüşme geri bildirim kayıt sistemi ne olsun?  [ÜRÜN KARARI] | 0 | — |
| KARAR-13 | Yöneticiye manuel "işlet" butonları verilsin mi?  [ÜRÜN KARARI] | 0 | — |
| KARAR-14 | Yönetici, bir kullanıcının verisini panelden silebilsin/indirebilsin mi?  [ÜRÜN KARARI · HUKUKİ/KVKK] | 0 | — |
| KARAR-15 | Çok kuruma üye kullanıcı, kurumlar arası geçiş yapabilsin mi?  [ÜRÜN KARARI] | 0 | — |
| KARAR-16 | Yöneticiye eşleştirme kontrolleri (görünürlük onayı + yeniden eşleştirme) verilsin mi?  [ÜRÜN KARARI] | 0 | — |
| KARAR-17 | Kurum yöneticisi, davet göndermeden canlı bir önizleme görebilsin mi?  [ÜRÜN KARARI] | 0 | — |
| KARAR-19 | KVKK geri-dönülmez yetkiler kümesi  [ÜRÜN KARARI · HUKUKİ · GERİ DÖNÜLMEZ] | 1 (F-07) | F-07 |
| KARAR-21 | STK anket sorusu cevap tipi: Likert-sabit mi, seçmeli mi?  [ÜRÜN KARARI · MIGRATION] | 1 (F-12) | F-12 |
| KARAR-25 | Gerçek yedek nereye yazılsın? (0 işi açar — G1-28 🔴 blokerine bağlı)  [ÜRÜN KARARI · KVKK · ALTYAPI] | 0 (G1-28 🔴) | — |
| KARAR-26 | İki yedek tablo (S26/S37) düşürülsün mü? (0 işi açar — DB)  [ÜRÜN KARARI · DB · GERİ DÖNÜLMEZ] | 0 (DB) | — |
| KARAR-28 | Ölü LLM/OpenAI ortam değişkenleri silinsin mi? (0 işi açar — SİLME PROTOKOLÜ)  [ÜRÜN KARARI · SİLME PROTOKOLÜ] | 0 | — |
| KARAR-30 | Senaryo isimleri: seed'den ÖNCE mi SONRA mı değişken yapılsın  [ÜRÜN + SIRA KARARI] (2 işi açar) | **2** (I-09, K-16/K-18 sırası) | — |
| KARAR-31 | Kriz bildirimi (kendine zarar) + yaş sınırı  [ÜRÜN + HUKUK] (2 işi açar) | **2** (I-18, G1-01) | I-18 · IC-13 |
| KARAR-35 | Canlı veritabanına salt-okuma izni  [OPERASYON KARARI] (5+ işi açar) | **5+** (md.30·33·118, S10, Y6) | — |
| KARAR-36 | Yarım kalmış üç teknik kalem: `answeredFollowup` · `qualityMultiplier` ikizi · iki yedek tablo  [VERİ KARARI] (4 işi açar) | **4** (Y-18, D3, S26, S37) | — |
| KARAR-37 | `00-KARAR-TAKIP` madde 103 — kart mı özet mi kazanır  [BELGE/METODOLOJİ] | 1 (md.103) | — |
| KARAR-38 | Kurum sunucusunun ülkesi ve aydınlatma metninin düzeltilmesi  [HUKUK + ÜRÜN] (1 işi açar) | **1** (GV-09) | GV-09 |
| KARAR-39 | Anonimleştirme kapsamı: psikometrik kopyalar ve başkasının yazdığı yorumlar  [ÜRÜN + KVKK] (1 işi açar) | **1** (GV-08 yorum ayağı) | — |
| KARAR-40 | Eski `POST /api/meetings` ucu: düzeltilsin mi, karantinaya mı alınsın  [ÜRÜN/TEKNİK] (1 işi açar) | **1** (GV-06 kalıcı çözümü) | — |
| KARAR-41 | Mentörün bir kontenjanı olsun mu? (1 işi açar — P-15)  [ÜRÜN KARARI · ŞEMA] | **1** (P-15) | — |
| KARAR-42 | DISC testi tekrar edilebilsin mi? (3 düğme bunu vaat ediyor, hiçbiri çalışmıyor)  [ÜRÜN KARARI · VERİ] | **2** (PS-10 döngüsü, PS-03'ün faydası) + yeni satır | — |
| KARAR-43 | İki yön neden farklı? Menti, mentörün eleyeceği bir eşleşmeyi görmeye devam etmeli mi? (1 işi açar — cevap sonrası yeni satır)  [ÜRÜN KARARI] | **1** (cevap sonrası yeni satır) | — |
| KARAR-44 | Algoritma kendi sonuçlarından öğrensin mi — ve hangi memnuniyet verisi "gerçek" sayılsın? (2-3 işi açar)  [ÜRÜN + VERİ KARARI] | **2-3** (PS-05, F-08, KARAR-12) | — |
| KARAR-45 | Arketip adları: hangi metin hangi koda bağlanacak? (4 işi açar) [ÜRÜN KARARI] | **4** (IC-14, I-01, I-15, IC-03'ün `M1`/`m1` ayağı) | IC-14 |
| KARAR-46 | Sertifika içeriğinin hangi sürümü canlıya gidecek? (P-99'u açar) [ÜRÜN KARARI · SEED] | **2** (P-99 → K-16) | AN-03 |
| KARAR-47 | Hukuki metin paketi — avukata tek seferde ne sorulacak? (5 kalem) [HUKUKİ · PO+AVUKAT] | **5 kalem** (KARAR-38·3·4 + F-02 + F-03/GV-18) | — |
| KARAR-48 | Test sonucu ve eşleşme skoru kullanıcıya nasıl anlatılsın? (3 ekran) [ÜRÜN KARARI] | **1** (3 ekran · C1-1…C1-6) | — |
| KARAR-49 | `devir/01` ve `devir/06`: "dondurulmuş" mu, "kalıcı referans" mı?  [BELGE POLİTİKASI] (2 işi açar) | **2** (6 bayat "merge etme" satırı) | — |
| KARAR-50 | Kuralların "geçersizleşme koşulu" zorunlu olsun mu?  [BELGE/METODOLOJİ] (4 işi açar) | **4** (YN-04, YN-05 + 2 takip) | — |
| KARAR-51 | 4 "yaşayan ama ölü" belge dondurulsun mu?  [BELGE POLİTİKASI] (2 işi açar) | **2** (YN-06 + 🔄 sayımı) | — |
| KARAR-52 | Taşınan KURAL 8 mükerreri: hangi gövde kalsın?  [BELGE/METODOLOJİ] — ⭐ BU TURDA DOĞDU | **1** (YN-02) | — |
| KARAR-54 | Mentör/menti kart havuzu 5 tasarım kararı  (5+ işi açar)  [ÜRÜN KARARI · TASARIM · EN YÜKSEK ÖNCELİK] | **5+** (OB-01..05 · `mentor-karti-rakip-analizi:87-91`) | — |
| KARAR-55 | Sertifikada geri bildirim ne zaman gösterilsin?  (2 işi açar)  [ÜRÜN KARARI · SERTİFİKA] | **2** (TO §8.2 · TAS:369-371) | — |
| KARAR-56 | Menti aynı hafta birden fazla mentöre görüşme talebi gönderebilsin mi?  (3 işi açar)  [ÜRÜN KARARI] | **3** (`meetingController.ts:79-84`) | AN-21 |
| KARAR-57 | Kullanıcının mizaç sonucunu hangi test belirlesin?  (4 işi açar)  [ÜRÜN KARARI · TEKNİK] | **4** (TO §0-2) | — |
| KARAR-58 | Eski DISC ölçümü ↔ yeni Big Five senaryo bankası geçiş dönemi  (2+ işi açar)  [ÜRÜN KARARI · MIGRATION · GERİ DÖNÜLMEZ] | **2+** (IK:223 · TO Y-23) | AN-04 |
| KARAR-59 | Kurgu/persona kişi adları "Kişi Adı Yasağı"na dahil mi?  (2 işi açar)  [ÜRÜN KARARI · KURAL/KVKK] | **2** (IK:229 · PP:165,247) | — |
| KARAR-60 | Kullanıcı kişilik boyut yüzdesini görür mü?  (1 işi açar)  [ÜRÜN KARARI] | **1** (TO Z-15,Y-19) | — |
| KARAR-61 | Eşleşme puanının yeni formülü arketip motoruyla AYNI ANDA mı açılsın?  (2 işi açar)  [ÜRÜN KARARI] | **2** (MUT §4 · `scoring.ts:89-90`) | — |
| KARAR-62 | İlk ölçüm: herkes aynı senaryoları mı çözsün, sistem kişiye göre mi seçsin?  (2 işi açar)  [ÜRÜN KARARI · ÖLÇME YÖNTEMİ] | **2** (MUT §4 · TAS:159-163) | — |
| KARAR-63 | Arketip atama eşiği: 45/55/60 bandı belgelensin mi, kaldırılsın mı?  (1 işi açar)  [ÜRÜN KARARI · PUANLAMA] | **1** (MUT §4 · `scoring.config.ts:31`) | — |
| KARAR-64 | Kullanıcıya görünen ad: "mizaç" mı, "karakter" mi, "kişilik" mi?  (1 işi açar)  [ÜRÜN KARARI · KULLANICI METNİ] | **1** (MUT §4-5 · `onboardingController.ts:492`) | — |
| KARAR-65 | "D mentör + S menti" yasağı menti tarafında da geçerli olsun mu?  (2 işi açar)  [ÜRÜN KARARI] | **2** (TO §8.2 · `matching.ts:200-216`) | — |
| KARAR-67 | Yönetici drill-down'ı kişinin serbest-metin endişe notuna inmeli mi?  (1 işi açar)  [ÜRÜN KARARI · KVKK] | **1** (PP:271 C1 · KVKK) | — |
| KARAR-68 | Persona/panel belgeleri nasıl gelişmeli: A/B/C?  (2 işi açar)  [BELGE POLİTİKASI] | **2** (PP §7 E · §5.1) | — |
| KARAR-71 | Kırılgan kullanıcıda tutundurma etiğinin sınırı nerede?  (1+ işi açar)  [ÜRÜN KARARI · ETİK · UZMAN GÖRÜŞÜNE BAĞLI] | **1+** (PP:237 C3 · prompt) | — |
| KARAR-72 | Ghost / "kalıcı red" özelliği olacak mı? (1 iş açar: AN-33) [ÜRÜN + HUKUK KARARI] | **1** (AN-33) | AN-33 |
| KARAR-73 | Değerlendirme AŞAMA 2/3 (otomatik pasifleştirme) yapılacak mı? (1 iş açar: AN-34) [ÜRÜN KARARI] | **1** (AN-34) | AN-34 |
| KARAR-74 | Kurum (tenant) kalıcı silme hakkı (G1-29) — (1 iş açar: AN-37) [ÜRÜN + KVKK KARARI] | **1** (AN-37) | — |
| KARAR-75 | KVKK yasal metinlerinde kişi adı — yasak mı istisna mı? (Ç-16 · AN-41/YN-13 ile bağlı) [HUKUK + POLİTİKA KARARI] | **0** (AN-41/YN-13 etkiler) | — |
| KARAR-76 | `Tenant.verifiedBy` alanı ne olsun? (silme protokolü boşluğu) [VERİ KARARI · SİLME PROTOKOLÜ] | **1** (AN-08 · AN-54) | — |
