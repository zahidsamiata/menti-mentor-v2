> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ) · kapılar 4 renk (Bölüm 7).

**Son güncelleme:** 2026-09-26 18:57 UTC · çatı main HEAD `96be884` · backend main HEAD `60715c7` (canlı pointer `b6418c2`)

**Durum:** ÇALIŞIYOR (VPS oturumu · en fazla 2 şerit)

**Şu an yapılan:** Şerit 1 (alt ajan): AN-26 7b düzeltme turu. Şerit 2: IC-11 çatı #338 pointer `60715c7`'ye re-bump (IC-11 #158 + Y-02 #156) → CI → merge → canlı kontrol.

**Son merge'ler (bu oturum, en yeniden eskiye):**
| PR | İş | Canlı kontrol |
|---|---|---|
| backend #156 · #158 | Y-02 (platform okuma denetim izi) · IC-11 (backend metinler) | #338 pointer'ıyla çıkacak |
| backend #152 + çatı #335 | GV-19 (şifre değiştirme) + AN-09 (#155) | ok:true, db:up, site 200 |
| backend #153 · #154 + çatı #336 | PS-09 · KR-21 (pointer → `3f76c7b`) | ok:true, db:up, site 200 |
| çatı #334 | YN-13 (kişi adı) | belge işi |
| çatı #333 | PS-10 (boş mentör listesi profili suçlamıyor) | ok:true, db:up, site 200 |
| çatı #331 | IC-01 (DISC boyut etiketleri Türkçe) | ok:true, db:up, site 200 |
| çatı #330 | KR-22 (verify.sh ↔ CI) | ok:true, db:up |
| backend #143 · #145 · #150 + çatı #329 | PS-A1 · GV-08 · KR-14 | ok:true, db:up, site 200 |
| çatı #328 | GÖREV 0 — kapı düzeni 4 renk | ok:true, db:up, site 200 |

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| çatı #338 | IC-11 (frontend) + pointer `60715c7` (IC-11 #158 · Y-02 #156) · 🟢 | koşuyor | gerekmiyor | CI → merge → canlı kontrol |
| backend #157 + çatı #337 | AN-26 · 🔵 KARAR-98 (migration) | yeşil | **SORUN VAR** → düzeltme sürüyor | 7b ONAY + PO EVET (+ alt soru: paylaşımlı havuzda kime) + `Conversation` yedeği |
| backend #151 + çatı #332 | IC-08 onay bekleyene düzeltme notu · 🟢+7b | yeşil | ✅ ONAY | ⛔ #151 merge sınıflandırıcı reddi (Engeller) |
| backend #148 + çatı #326 | U-18 · 🔵 KARAR-97 | yeşil | ✅ ONAY (2. tur) | PO EVET + `Conversation` yedeği (DB erişimi gerekir) |
| backend #142 + çatı #320 | AN-30 · 🔵 KARAR-96 · ⛔ çıkış blokeri | yeşil | ✅ ONAY (2. tur) | PO EVET + `Consent` yedeği (DB erişimi gerekir) |
| çatı #110 | ⛔ MERGE ETME (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Kapı dağılımı (#328 sonrası, açık 122 satır):** 🟢 51 · 🔵 11 · 🟡 9 · 🔴 51 (beklenen 51/11/6/50). Fark: 🟡 +3 = PS-A1 · PS-A3 · PS-A4 (49'luk listede yoktu, değiştirilmedi); 🔴 +1 = KR-08 / F-14 karışık hücre (teyit gerek). Ayrıntı: `02-ILERLEME.md` 2026-09-26 kaydı · PR #328.

**Push edilmemiş iş:** yok. (Önceki oturumun `/tmp` worktree'sindeki KR-22 yarım işi kurtarıldı → #330; eski `/tmp` worktree'leri silinmedi — PO onayıyla temizlenir.)

**Engeller:**
- ⛔ 2026-09-26 18:25 UTC — `gh pr merge 151 --merge` (backend, IC-08) REDDEDİLDİ. Ret metni AYNEN: `Permission for this action was denied by the Claude Code auto mode classifier. Reason: [Merge Without Review].` #151 CI yeşil + 7b ONAY (yorum 5848715616); çatı #332 buna bağlı. Ardışık ret: 1 (sonraki merge'ler başarılı → sayaç sıfırlandı).
- 🔵 DB erişimi: AN-30 (KARAR-96) ve U-18 (KARAR-97) için PO "EVET" verirse tarihli yedek gerekir → bu VPS'te DATABASE_URL yok: "tek seferlik DB erişimi gerekiyor: AN-30 #142/#320 · U-18 #148/#326".

**PO'ya sorular:** KARAR-96 (AN-30) · KARAR-97 (U-18) · KARAR-98 (AN-26) — üçü de 🔵 EVET/HAYIR; ilk ikisi 7b ONAY'lı.

**Strateji katmanına not:**
- AN-30 7b: OAuth pending token ile access token aynı sırrı kullanıyor (`typ` yok, sömürülemez) — kuyrukta satırı yok; AN-30 merge edildiği turda CLAUDE.md public uç listesine `POST /api/auth/oauth/complete-registration` eklenmeli.
- U-18 takip: gerçek bildirim + inbox'ta ret işareti (bildirim servisi hâlâ stub — OB-09).
- PS-A1/PS-A3/PS-A4 kapı sütunu 🟡 (yeni tanımla matching → 🟢+7b beklenir).
- `/api/super-admin/*` uçları frontend'de kullanılmıyor (MÜKERRER, K-13); Y-02 PR'ı maskesiz PII sızıntısını kapattı, kaldırma silme protokolüne tabi.
- I-12 ATLANDI(karar): KARAR-57 cevabına bağlı. AN-06 kod ayağı büyük olasılıkla migration (🔵) + PO teyidi.

**Karar kilidi (en çok iş açan cevapsız kartlar):** KARAR-57 (4, +I-12) · KARAR-45 (4) · KARAR-56 (3) · KARAR-68/65/62/61/59/55 (2'şer) · 🔵 KARAR-96 (AN-30 çıkış blokeri) · 🔵 KARAR-97 (U-18).

**Sıradaki 5 iş:** (1) GV-19/Y-02 7b sonucu → merge + pointer bump (AN-09 dahil) · (2) E-3 kalan BAĞLA kalemleri (çifti engelle arayüzü) · (3) AN-26 hatırlatma/eskalasyon · (4) Y-17 / Y-12 değerlendirmesi · (5) K5 yedek havuz (Y1 teyit-gerek maddeleri).
