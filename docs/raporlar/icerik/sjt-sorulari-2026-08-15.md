# İçerik Dökümü — SJT Soruları (2026-08-15)

**📸 DONDURULMUŞ (2026-08-15)** — kaynak: `backend/prisma/seed.ts:530-573` + canlı DB salt-okuma sayımı.

> SJT (Situational Judgment Test) senaryo sorularının **tam metni + seçenekler + OCEAN ağırlıkları**. Kullanıcı yanıtı yok.

## Kaynak & tutarlılık
- **Kod kaynağı:** `seed.ts:530-573` — **3 soru** (1 mentör CORE, 1 menti CORE, 1 menti FOLLOWUP), her biri 4 seçenek.
- **Canlı DB (salt-okuma):** 3 soru + 12 seçenek → kod ile birebir tutuyor. ✅
- **⚠️ Belge-kod çelişkisi:** `docs/kararlar/03-psikometri-ve-algoritma.md:44-49` "Mini Akademi = 4 pedagojik SJT" der; kodda **3 SJT** var (ve bunlar Mini Akademi değil, OCEAN kalibrasyonu). Niyet tam kodlanmamış.
- **Amaç:** SJT, DISC→OCEAN türetiminden sonra **kararsız OCEAN boyutlarını** (özellikle O ve N) kalibre eder. **Puansız**; her seçenek OCEAN boyutlarına ağırlık (`weights`) verir + arketip sinyali (`signalsArchetype`).
- **DISC-tipine-özel "mentiye yaklaşım" içeriği:** ❌ YOK — sorular kullanıcının KENDİ eğilimini ölçer; seçenekler arketip sinyali taşır ama "menti D-tipiyse şöyle yaklaş" gibi koşullu içerik yok.

---

### 1. Q_MENTOR_CORE_01 (Mentör, CORE, SINGLE)
Senaryo: *Menteen, haftalardır çalıştığı bir projeyi sana getiriyor. Yaklaşımının temelden hatalı olduğunu fark ediyorsun. Ne yaparsın?*
- **A** — "Doğrudan söylerim: 'Bu yaklaşım çalışmaz, şu adımlarla yeniden kuralım.'" → ağırlık `{a:-2, c:2, e:1}`, sinyal **M4**
- **B** — "Önce dinlerim, sorular sorarak hatayı kendisinin görmesini sağlarım." → `{o:2, e:1, a:1}`, **M2**
- **C** — "Emeğini takdir ederek başlarım, endişelerimi nazikçe paylaşırım." → `{a:3, n:1, e:-1}`, **M3**
- **D** — "Hatayı net gösteririm ve yapılandırılmış bir düzeltme planı sunarım." → `{c:2, o:2}`, **M1**

### 2. Q_MENTI_CORE_01 (Menti, CORE, SINGLE)
Senaryo: *Mentörün net bir yönerge vermeden 'Şunu bir araştır' diyor. Ne yaparsın?*
- **A** — "Hemen detaylı bir plan yapar, adım adım sistematik ilerlerim." → `{c:3, o:-1}`, **m1**
- **B** — "Heyecanlanırım; farklı yönlere dalar, ilginç bulduğum şeyleri kurcalarım." → `{o:3, c:-2, e:1}`, **m2**
- **C** — "Biraz kaygılanırım, netleştirmek için mentöre tekrar yazıp yönerge isterim." → `{n:2, a:1, c:1}`, **m3**
- **D** — "Fırsat olarak görürüm; kendi yorumumu katıp iddialı bir şey hazırlarım." → `{o:2, e:2, a:-2}`, **m4**

### 3. Q_MENTI_FOLLOWUP_N_01 (Menti, FOLLOWUP, MOST_LEAST — `triggersOn: n`)
Senaryo: *Mentörün mesafeli bir geri bildirim verdi. Aşağıdakilerden seni EN ÇOK ve EN AZ yansıtanı seç.*
- **A** — "Üslubuna takılmam, içeriğe bakarım." → `{n:-3}`, **m1**
- **B** — "İlişkinin durumunu uzun uzun sorgularım." → `{n:3, a:1}`, **m3**
- **C** — "Mesafeli üslubu ben de mesafeyle karşılarım." → `{a:-2, e:-1}`
- **D** — "Heyecanla karşılarım, yeni fikirlerle dönüş yaparım." → `{o:2, e:2}`, **m2**

---
*Not: FOLLOWUP soru yalnız N (nörotisizm) boyutu kararsızsa tetiklenir (adaptif). MOST_LEAST formatında en-az seçim −0.5 katsayısıyla işlenir (`sjt-scorer.ts:72`).*
