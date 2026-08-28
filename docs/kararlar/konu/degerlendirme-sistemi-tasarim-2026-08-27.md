# Değerlendirme + Eşleştirme Sistemi — Tasarım Belgesi

> 🔄 **YAŞAYAN BELGE**
>
> **Bu belge iki turda yazıldı. Bölüm 9-16 Tur B'de eklenecek.**
>
> Bu belge, strateji oturumunda verilen ve akademik araştırmayla
> doğrulanan değerlendirme + eşleştirme sistemi kararlarını tek yerde
> toplar. Kaynak keşif raporları:
> - `docs/kararlar/konu/kesif/eslestirme-motoru-kesfi-2026-08-27.md`
> - `docs/kararlar/konu/icerik/tam-soru-dokumu-2026-08-26.md`
>
> **Kapsam notu:** Bu belge kararları KAYDEDER. Tasarımı yorumlamaz,
> öneri getirmez. Eksik/karara bağlanmamış noktalar `⚠️ AÇIK` ile
> işaretlidir — bu turda doldurulmamıştır.

---

## Bölüm 1 — Neden Yeniden Tasarım

Keşif bulguları (kaynak: `kesif/eslestirme-motoru-kesfi-2026-08-27.md` +
`icerik/tam-soru-dokumu-2026-08-26.md`):

- Canlı formül basit etiket kesişimi + DISC matris.
- Psikometrik sabitlerin hiçbirinin gerekçesi belgelenmemiş.
- SJT hesaplanıyor ama canlı eşleştirmede okunmuyor (madde 101).
- DEEPENING baskın boyuttan geliyor → profil pekişiyor, netleşmiyor
  (PO fikrinin TERSİ).
- Sektör skoru asimetrik: payda mentinin etiket sayısı → profilini iyi
  dolduran menti cezalandırılıyor.
- Kalite çarpanı iki kez uygulanıyor (olası hata).

---

## Bölüm 2 — Model Kararı

**KARAR:** DISC bırakıldı. **B modeli** benimsendi.

- **GÖRÜNEN YÜZ:** kendi arketiplerimiz.
- **MOTOR:** Big Five (OCEAN) — kullanıcı boyut yüzdesi GÖRMEZ.
- Havuzda **EŞLEŞME yüzdesi GÖRÜNÜR** (%87 gibi) — PO isteği.

**GEREKÇE (araştırma turu):**

- DISC, Marston'ın 1928 kitabına dayanır; bağımsız akademik
  değerlendirmeler yordayıcı geçerliğin gösterilmediğini belirtir.
  "Tip uyumu" iddiasının ampirik dayanağı yok.
- Big Five, psikolojinin en iyi doğrulanmış modeli.

> ⚠️ **DÜRÜSTLÜK SINIRI:** "bilimsel olarak doğrulanmış test" DENMEZ.
> Denebilecek: "Big Five modeline dayanır, kendi verimizle kalibre
> edilecektir."

**LİSANS:**

- **IPIP** kamu malı, ticari kullanım dahil ücretsiz → madde kaynağımız.
- **BFI-10** ticari kullanıma KAPALI.
- **TIPI** serbest ama iç tutarlılığı düşük.

> ⚠️ Türkçe uyarlamanın geçerliği kendi örneklemimizde ayrıca
> doğrulanmalı.

---

## Bölüm 3 — Arketipler

**Seçilen set: METAFOR** (PO kararı)

- **Mentör:** Mimar · Ayna · Liman · Pusula
- **Menti:** Rotacı · Kâşif · Denge Arayan · İz Açan

**Gösterim: BASKIN + İKİNCİL**

> "Sen bir Limansın — Ayna tarafın da güçlü."

Kodda M1-M4 / m1-m4 arketip iskeleti zaten VAR (keşif §6).

### Mentör Arketipleri (SJT şıklarından türedi)

- **Mimar** — hatayı net gösterir, adım adım düzeltme planı sunar
  (yüksek sorumluluk + açıklık).
- **Ayna** — önce dinler, soruyla kendi bulmasını sağlar
  (açıklık + sıcaklık).
- **Liman** — emeği takdir eder, endişeyi nazikçe söyler
  (çok yüksek uyumluluk).
- **Pusula** — doğrudan söyler, yön verir
  (düşük uyumluluk + yüksek sorumluluk).

### Menti Arketipleri

- **Rotacı** — belirsizlikte hemen sistematik plan yapar
  (çok yüksek sorumluluk).
- **Kâşif** — heyecanlanır, dallanır, kurcalar
  (çok yüksek açıklık).
- **Denge Arayan** — netlik ister, zemini sağlamlaştırır
  (yüksek hassasiyet).
- **İz Açan** — fırsat görür, kendi yorumunu katar
  (açıklık + dışadönüklük, düşük uyumluluk).

> ⚠️ **İSİMLENDİRME KURALI:** hiçbir arketip aşağılayıcı olmayacak.
> "Denge Arayan" ve "İz Açan" onurlu dille anlatılacak — "kaygılı" veya
> "ukala" gibi okunmamalı.

> ⚠️ **ETİKETLEME RİSKİ (araştırma):** Barnum etkisi (Forer 1949) ve
> etiketleme riski gerçek. Kullanıcıya "sen busun" değil "bu bir eğilim"
> dili kullanılacak.

> ⚠️ **AÇIK:** "İz Açan" adı PO tarafından kesinleşmedi.

---

## Bölüm 4 — Ölçme Yöntemi

**KARAR:** Likert 1-5 KALKTI → senaryo + şık.

### Senaryo Anatomisi

- Sahne 2-3 cümle, ikinci tekil şahıs, şimdiki zaman.
- Gündelik an (çekirdekte mentörlük senaryosu KULLANILMAZ).
- 4 şık, her biri bir arketibin doğal davranışı.
- Seçim: "en çok ben" + "en az ben".
- Bazı senaryolarda "ikinci yakının hangisi?".

### Yazım Kuralları (5, hepsi sert)

1. **Rol giydirme YASAK** — kişi kendi personasını yaşar.
   - ❌ "Bir yönetici olduğunu düşün"
   - ✅ "İlk kez katıldığın bir toplantıdasın"
2. **Doğru cevap kokusu YASAK** — 4 şık da makul, savunulabilir.
3. **Sahne gündelik** — aşırı duygusal sahne persona tetikler.
4. **Kısa** — uzun hikâye hikâyeye tepki verdirir.
5. **Ne ölçtüğü belli olmasın.**

**NEDEN MENTÖRLÜK SENARYOSU DEĞİL:** "mentin sana bir sorunla geldi"
diye sorulursa kişi "iyi bir mentör ne yapardı" diye düşünür, kendini
değil. Mentörlük senaryoları sertifikada ve öğrenme yolculuğunda zaten
var.

**PUANLAMA:** en çok = tam ağırlık · en az = yarım ters ağırlık.
Kodda MOST_LEAST mekanizması çalışıyor (+1.0 / −0.5).

> ⚠️ **İPSATİF UYARISI (araştırma bulgusu, ÇÖZÜLMEDİ):** Zorunlu seçim
> kişiler-arası karşılaştırmayı zorlaştırır; eşleştirme tam da onu yapar.
> Literatürdeki çözüm (Thurstonian IRT) bizim ölçeğimiz için ağır.

> ⚠️ **AÇIK:** karma format (bazı senaryolar normatif, bazıları
> en-çok/en-az) tasarlanacak.

**ACQUIESCENCE:** dengeli ölçek (düz + ters kodlu madde) + dikkat kontrol
maddesi. Ters madde oranı abartılmayacak (yapay faktör riski — literatür
uyarısı).

---
