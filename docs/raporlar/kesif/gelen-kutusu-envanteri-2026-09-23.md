# `docs/gelen/` Envanteri — Ne Silinebilir, Ne Kurtarıldı (2026-09-23)

> **Amaç:** `docs/gelen/` klasörü `.gitignore`'da → temiz klonlarda YOK → hiçbir bulut ajanı okumadı.
> Klasörde 13 dosya DİSKTE duruyordu. Bu envanter, her dosyanın yalnızca bir **prompt** mu, yoksa
> içinde **kayıtlanmamış karar / içerik taslağı / iş** mi taşıdığını belirler.
> **PO notu:** *"docs/gelen/ boş bir yer, oraya kendi yazdığım promptları yazıyordum. Bana sorarsan orayı silelim."*
>
> ⛔ **Bu envanter HİÇBİR DOSYAYI SİLMEDİ.** Silme PO'nun işidir (bkz. `docs/otonom/03-PO-ELLE-ISLER.md`).
> Aşağıdaki "silinebilir" kararı, o dosyanın özünün **başka bir izlenen (git-tracked) belgede/kodda zaten var**
> olduğunun kanıtıyla verildi.

## Sonuç — TEK CÜMLE
**13 dosyanın 13'ü de güvenle silinebilir.** İçlerindeki her karar zaten koda/izlenen belgeye işlenmiş,
her içerik taslağı zaten `docs/raporlar/icerik/` altında arşivlenmiş. **Kurtarılması gereken kayıtlanmamış
hiçbir şey çıkmadı.**

## PII taraması
**Gerçek kişi adı · e-posta · şifre · anahtar · token BULUNAMADI.** Not: içerik taslaklarında yer tutucu
değişkenler (`{sert_1}`…`{sert_6}`) ve senaryo dağılım etiketi olarak jenerik Türkçe ilk-adlar
(İhsan/Elif/Yusuf/Zehra/Salih/Rabia — gerçek bir kişiyi tanımlamaz) geçiyor. Bunlar PII değil.
Migration promptu bir DB host'una atıf yapıyor ama maskeleme talimatıyla; secret değer içermiyor.

## Dosya dosya

| Dosya | Sınıf | Öz zaten nerede kayıtlı? → **silinebilir mi?** |
|---|---|---|
| `faz5-veri-akisi-PROMPT.txt.txt` | boş (0 bayt) | Hiçbir şey yok → **SİLİNEBİLİR** |
| `madde73-PROMPT.txt.txt` | PROMPT-ONLY | Sadece talimat (direct-run guard kopyala) → **SİLİNEBİLİR** |
| `uctan-uca-PROMPT.txt.txt` | PROMPT-ONLY | Salt-okuma PLAN denetim promptu → **SİLİNEBİLİR** |
| `kod-sozlugu-PROMPT.txt.txt` | HAS-DECISION | madde 109→🗑️ · 113 · 7 · ölçek kararı(b+c): hepsi `00-KARAR-TAKIP.md` md.1 satırında (2026-09-08 katmanı) → **SİLİNEBİLİR** |
| `madde163-PROMPT.txt.txt` | HAS-DECISION | `CertificationOption.internalNote` → **CANLI**: `backend/prisma/schema.prisma:1158`; migration uygulandı, yedek `CertificationOption_yedek_20260909` (20 satır) → **SİLİNEBİLİR** |
| `madde164-PROMPT.txt.txt` | HAS-DECISION | Kırmızı-çizgi eşiği `===3`→`>=2` → kodlandı (backend PR #71), `00-KARAR-TAKIP.md` md.1 (2026-09-09 katmanı) → **SİLİNEBİLİR** |
| `madde-guncelleme-2-PROMPT.txt.txt` | HAS-DECISION | OCEAN ölçek-uyumsuzluğu + KALEM 19 = madde 167 + mentor yolculuğu 8→10; 167 en büyük madde no, `00-KARAR-TAKIP.md`'de izli → **SİLİNEBİLİR** |
| `migration-calistirma-PROMPT.txt.txt` | HAS-DECISION+WORK | "PO ONAYI ALINDI 2026-09-09" + yedek kuralı; migration CANLI koştu (yukarıdaki yedek tablo). Takip işi (yedek DROP) = söz S37, `00-KARAR-TAKIP.md` md.1 → **SİLİNEBİLİR** |
| `olcek-tip-kayit-PROMPT.txt.txt` | HAS-DECISION+WORK | DISC ölçek tutarlı (uyumsuzluk çürütüldü); `confidence` eksik; madde 168/169 (parseDiscVector guard + DiscVector tip ayrımı) → bu iki iş `00-KUYRUK`'a bu turda AN aşamasında girecek (bkz. Bölüm 5) → **SİLİNEBİLİR** |
| `oturum2-PROMPT.txt.txt` | HAS-CONTENT | Sertifika içerik taslağı (KALEM 11-16, 3 konu/6 senaryo/24 şık) → arşivli: `docs/raporlar/icerik/sertifika-oturum2-3-konu-2026-09-08.md` + CANLI `seed-certification.ts` → **SİLİNEBİLİR** |
| `oturum3-PROMPT.txt.txt` | HAS-CONTENT+DECISION | Sertifika içerik (KALEM 17-19, 4 konu/8 senaryo/32 şık, seri kapanış 11/22/88) + PO KARARI 2026-09-08 (öğrenme yolculuğu gizlilik+bitirme, mentor 8→10) → arşivli: `sertifika-oturum3-4-konu-2026-09-08.md` → **SİLİNEBİLİR** |
| `son-tur-PROMPT.txt.txt` | HAS-DECISION | Y7 bölündü · 9b→✅ · S1→✅ · 3 yeni kural ("YAPILDI≠DOĞRULANDI" vb.) → `00-KARAR-TAKIP.md` md.1 (2026-09-08 gün kapanışı katmanı) → **SİLİNEBİLİR** |

## Doğrulama kanıtı (bu turda çalıştırıldı)
- `grep internalNote backend/prisma/schema.prisma` → satır 1158 (madde 163 canlı).
- `grep 163\|164\|167 docs/kararlar/00-KARAR-TAKIP.md` → md.1 satırında üçü de izli (2026-09-08/09 düzeltme katmanları).
- `ls docs/raporlar/icerik/` → `sertifika-oturum2-3-konu-2026-09-08.md`, `sertifika-oturum3-4-konu-2026-09-08.md` mevcut.
- `ls backend/prisma/seed-certification.ts` → mevcut (içerik canlı seed'de).

## PO'ya öneri (kod dışı iş)
`docs/gelen/` yalnızca kişisel prompt taslağı barındırıyor ve `.gitignore`'da olduğu için hiçbir ajan göremiyor.
Tüm 13 dosya güvenle silinebilir. Kalıcı KURAL önerisi: **karar ya da içerik taşıyan hiçbir metin `docs/gelen/`'de
BIRAKILMAZ; ilgili `docs/` klasörüne taşınır** (çünkü `.gitignore` → ajanlar göremez). Takip: `03-PO-ELLE-ISLER.md`.
