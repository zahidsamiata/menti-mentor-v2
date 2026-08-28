# 00 — ÖNCELİK SIRASI (kod iş sırası) — 2026-08-28

> 🔄 **YAŞAYAN BELGE**
>
> PO'nun "işleme al" kalemlerini kod iş sırasına soktuğu tek-canonical sıralama.
> Bu belge **kaydeder**; karar/detay `G*.md` kartlarındadır (buradan yalnız referans verilir).
> Kaynak kararlar: `docs/raporlar/bilanco/kararlar/00-PO-KARARLARI-2026-08-27.md` + `G*.md` kartları.

## Sıralama Mantığı

1. **Veri kaybı ve yasa ihlali önce.**
2. **Bir işi AÇAN iş, kilitlenen işten önce.**
3. **Migration ASLA paralel değil, tek başına.**

> ⚠️ **DÜRÜSTLÜK NOTU:** Bu bir SIRA, TAAHHÜT DEĞİL. Faz 1-2 bitince (Faz 0
> PO-manuel'le birlikte) kullanıcı alınabilir; gerisi kullanıcı akarken yapılır.
> **Faz 7-8'in bir kısmı hiç yapılmayabilir ve bu normaldir.**

---

## 🟣 FAZ 0 — PO-PARK (kod sırasından çıkarıldı, İPTAL EDİLMEDİ)

> ⚠️ **FAZ 0 PARK NOTU:** PO kararı — Faz 0 kalemleri PO-manuel adım beklediği
> için kod sırasından ÇIKARILDI, ama İPTAL EDİLMEDİ. Kodu hazır olanlar
> "env/ayar bekliyor" durumundadır. Bunlar 🟣 PO-PARK olarak işaretlenir, kaybolmaz.

| Kalem | Durum |
|---|---|
| G8-01 + G8-02 foto volume + env | sunucu ayarı |
| G5-01 + G5-02 kurum maili | kod HAZIR, destek@ yok |
| G1-09 destek@ | aynı zincir |
| G1-10 + G1-13 aydınlatma metni + kulüp beyanı | avukatta (BAĞLI: kulüp aktifse beyan ŞART) |
| G1-28 sunucu sertleştirme | ajan tarayabilir, uygulama PO |
| G8-03 + G8-04 canlı testler | gözle görme |
| G8-05 yedek env dosyası sil | PO |
| G8-08 izole test DB | PO |

---

## ── KOD SIRASI ──

### FAZ 1 — UCUZ TEMİZLİK (paralel güvenli, migration yok)
G9 grubu 12 kalem (belge düzeni) · G9-05 gerekçe · G10-01 ölü kod sil ·
G6-07 kullanılmayan paketler · G8-06 dal temizliği · G3-15 yazım hataları ·
G7-12 slogan · G7-13 tema yönü

### FAZ 2 — ÇIKIŞ BLOKERİ KOD TARAFI
G1-05 KVKK hak ekranı · G1-07 rıza sürümü
⚠️ **MIGRATION TEK BAŞINA** — avukattan metin gelmeden yapılmalı, sonra eski
rızalar belirsizleşir ·
G1-06 otomatik imha · G1-08 OAuth rıza ayrımı

### FAZ 3 — GÜVENLİK İNCELİKLERİ
⭐ **G1-17 + G7-04 BİRLİKTE** (aynı dosya: frontend `middleware.ts` — admin guard
+ www→301 tek işte) ·
G1-04 SuspicionReport tenantId · G1-23 logoUrl backend guard · G1-26 CAPTCHA/IP
limit · G1-02 DISC harf teyidi · G1-19 qualityMultiplier okuma teyidi ·
G1-14 + G1-15 denetim izi

### FAZ 4 — VERİ TEMELİ (⚠️ algoritmadan ÖNCE)
1. **S21 profil envanteri** (KEŞİF — ne var ne yok; tasarım belgesi B10.6 ön koşul)
2. **Üç soru (S1/S2/S3) + görünürlük kuralları**
   ⚠️ **MIGRATION TEK BAŞINA** — tasarım belgesi B10.2/10.3
3. **G1-29 + G6-03** tenant silme + onDelete
   ⚠️ **MIGRATION TEK BAŞINA**
4. **G1-16** eski kayıt rıza backfill
   ⭐ kullanıcı ~sıfırken neredeyse bedava, sonra imkânsız

### FAZ 5 — ALGORİTMA (ana iş; tasarım belgesi B9)
1. **G2-09** sektör asimetri düzeltmesi (küçük, isabeti hemen artırır — B9.4)
2. **G2-10** kalite çarpanı çift-uygulama hatası (B9.5)
3. **G2-07 + G2-08 + G10-21** sektör motoru + OCEAN bağlama (ÜÇÜ TEK İŞ)
4. **12 senaryo + arketipler** ⚠️ **MIGRATION** (B3/B5)
5. **Yeni skor fonksiyonu + 2 veto** (B9.1/9.2/9.3)
6. **madde 125 derinleşme** — triggersOn canlandırma (B6)
7. **G4-01 havuz kartı** rol-bazlı görünüm (B10.3)
8. **Göç planı** — mevcut profiller (B12, ⚠️ AÇIK)

### FAZ 6 — İÇERİK
⭐ **G3-09 seed runner ÖNCE** (G3-08'i kilitliyor) ·
G3-08 sertifika 5→20 (⚠️ canlı DB, PO onayı) · G3-13 answerType ⚠️ **MIGRATION**
(STK anket kararı) · G3-19 etiket havuzu · sertifika hatalı-konu hedefleme (B7) ·
öğrenme↔sertifika yüzey ayrımı (B8) · menti personası çeşitlendirme (B8) ·
G3-16 + G3-18 canlı içerik teyidi

### FAZ 7 — KULLANICI DENEYİMİ
G4-22 + G4-23 bekleme anı · G4-24 menti özgüven sunumu · G4-25 ret yumuşatma ·
G4-30 yönetici export · G4-31 kırmızı uyarı · G5-04 bildirim izni ·
G5-07 push stub · **G7-01 + G7-02 + G7-09 erişilebilirlik (TEK PAKET)**

### FAZ 8 — KALANLAR
G4-02/04/05/08/14/17 panel · G6-01 N+1 · G6-05 metin merkezileştirme ·
G7-03 SEO · G10-22/23 · G5-05 geri bildirim akışı
**KEŞİFLER (araya sıkışır):** G4-09 + G4-10 super-admin · G10-25 profil düzenleme

> ⚠️ **FAZ 8 — sıralamada tek tek anılmayan "işleme al" kalemleri (DURAK gereği buraya eklendi):**
> Aşağıdaki 11 kart karar kutusunda `[x] işleme al` işaretli ama PO'nun verdiği faz
> listesinde adı geçmiyordu → kaybolmasın diye Faz 8'e alındı. **Yerleştirme PO teyidine açık.**
> - G1-01 yaş (18+) form-input + DB alanı *(⚠️ KVKK-akraba; PO Faz 2/4'e çekmek isteyebilir)*
> - G2-01 DISC uyum matrisi PO onayı · G2-02 hard-gate toksik blok onayı · G2-03 tiebreak D>I>S>C onayı · G2-04 psikometrik gerekçe belgeleme · G2-05 %60/40 varsayılan onayı *(⚠️ 5'i de DISC psikometri PO-onay noktası; Big Five tasarımıyla örtüşme PO kararı)*
> - G2-11 KARAR 6 otomatik onay tetiği (davetli=onaylı)
> - G3-05 sertifika soru ekleme yetkisi + gerekçe belgesi
> - G4-39 "görüşme tamamladım 🎉" paylaşım kartı
> - G8-13 sekme geçiş yavaşlığı (istemci önbelleği) · G8-14 sol-alt kullanıcı kartı/menü

---

## BAĞLI İŞLER TABLOSU

| Bağ | İlişki |
|---|---|
| G1-13 ↔ G1-10 | kulüp aktif + açık beyan |
| G3-04 → G3-13 | anket → answerType migration |
| G1-17 ↔ G7-04 | aynı dosya, iki iş |
| G2-07 + G2-08 + G10-21 | tek iş |
| G8-01 ↔ G10-25 | fotoğraf zinciri |
| G3-09 → G3-08 | runner açmadan seed yok |
| G5-01 + G5-02 + G1-09 | destek@ zinciri, PO-park |
