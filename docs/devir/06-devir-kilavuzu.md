# 06 — DEVİR KILAVUZU (yeni oturum buradan başlar)

**🔄 YAŞAYAN giriş belgesi**. Bu klasörün tek yaşayan belgesidir. Diğer dosyalar 📸 tarihsel kayıttır; liste için `00-INDEX.md`'ye bakın.

## ⭐ Yeni oturum buradan başla: 6 dosya, bu SIRAYLA

1. `CLAUDE.md` (kök): kurallar. Çelişki olursa bu dosya kazanır.
2. `docs/otonom/OTONOM-PROMPT.txt`: otonom turun nasıl işlediği. Her turda aynen gönderilir.
3. `docs/otonom/00-SIRADAKI.md`: sıradaki işler. ⚙️ Türetilmiş dosyadır.
4. `docs/otonom/01-CEVAPSIZ.md`: PO'nun cevaplaması gereken kararlar. ⚙️ Türetilmiş dosyadır.
5. `docs/otonom/02-ILERLEME.md`: nerede kalındığı. **Son kısmı** okunur.
6. `docs/otonom/03-PO-ELLE-ISLER.md`: ajanın YAPAMAYACAĞI işler (sunucu, hesap, DB, avukat).

> ⚙️ **Türetilmiş dosyalar (3 ve 4):**
> - Nasıl üretilir: `npm run otonom:turet` komutu, yani `node scripts/otonom-turet.mjs`.
> - Kaynakları: `00-KUYRUK.md` ve `01-KARARLAR.md`. Türetilmiş dosyaya elle yazılmaz. Çelişkide kaynak kazanır.
> - ⚠️ **TEYİT GEREK (2026-09-24):** Bu iki dosya ve komut, `otonom/DA-belge-sistemi-20260923` dalı merge edilince `main`'e gelir.
> - Merge edilmeden önce kaynağı okuyun:
>   - 3 yerine `docs/otonom/00-KUYRUK.md` (hedefli: `grep -n '^| <iş-no> |'`)
>   - 4 yerine `docs/otonom/01-KARARLAR.md`

İlk 6 dosyadan sonra **git'ten doğrulayın**. Hafızaya, PR numarasına ya da SHA'ya güvenmeyin:
```bash
git fetch origin && git log --oneline -3 origin/main   # çatı main nerede
git submodule status                                    # backend pointer'ı
```

---

## Rol dağılımı: kim ne yapar

| Rol | Yapar | Yapmaz |
|---|---|---|
| **PO (ürün sahibi)** | Ürün kararı verir: `01-KARARLAR.md`'de **yalnız PO CEVAP yazar**. Kuyruğa iş ekler. Elle işleri yapar (`03-PO-ELLE-ISLER`). Buluttan gelen PR'ı merge eder | Kod yazmaz. Her adımda onay vermez: iş dosyalardan yürür |
| **Strateji katmanı** (PO ile sohbet) | Karar oturumlarını yürütür: her karar için bugün ne oluyor, kullanıcı ne yaşar, ne kazanılır ve ne kaybedilir (`docs/kararlar/konu/07-calisma-tarzi.md` "Karar oturumu biçimi"). Tur promptlarını yazar | Repoya doğrudan yazmaz. Cevaplar PO adıyla `01-KARARLAR`'a işlenir |
| **Claude Code** (ajan) | Kuyruğu işler, kod ve belge yazar, PR açar. 🟢 kapıda ve yerelde doğrulama tamsa merge eder. Karar noktasında DURMAZ: `01-KARARLAR`'a kart ekler, sonraki işe geçer | Ürün kararı vermez. CEVAP satırı doldurmaz. Canlı DB'ye ya da seed'e dokunmaz |

Çalışma tarzının uzun hali ve gerekçeleri `01-felsefe-ve-calisma-tarzi.md`'de. O belgede ✅ işaretli bölümler geçerli, üstü çizili satırlar bayat.
- Kullanıcı kim: teknik detaya hâkim değil. Sade dille yazılır, seçenekler ve gerekçe sunulur, dürüst pushback yapılır.
- Kanıt disiplini: "sanırım" yasak. Hata durumunda önce teşhis, sonra çözüm.

## Değişmez kurallar (kısa liste; tam metin ve gerekçe `CLAUDE.md`'de)

- **Canlı = lokal aynı DB (en kötü durumu varsay).** DB'ye yazmadan önce yedek ve KARAR gerekir.
  - `CLAUDE.md`: "⚠️ CANLI = LOKAL AYNI DB" ve "Ortam / Veritabanı". İki bölüm arasındaki çelişki notunu da okuyun.
- **Seed yasağı:** `seed.ts`, `npm run seed` ve `prisma db seed` ASLA çalıştırılmaz. Güvenli liste `CLAUDE.md`'de.
- **Silme protokolü:** niyet → ikame kanıtı → yeni karar → arşiv → önce karantina. "Kullanılmıyor" tek başına gerekçe değildir.
  - `CLAUDE.md`: "⛔ SİLME PROTOKOLÜ"
- **Kapı politikası** (`00-KUYRUK.md`):
  - 🟢 yap ve doğrulama tamsa merge et
  - 🟡 yap ve PR aç, merge etme
  - 🔴 KARAR cevaplanmadan dokunma
  - Kaynak: `CLAUDE.md` "MERGE POLİTİKASI"
- **Mod etiketi:** 🟩 PLANLA (salt-okuma) ve 🟥 BYPASS (uygula). Kare mod, daire kapı anlamındadır (`CLAUDE.md` "MOD ETİKETİ").
- **Yasak bölge:** `server.ts`'in rate-limit ve trust-proxy kısmına dokunulmaz (`OTONOM-PROMPT.txt` "YASAK BOLGE").
- **Ara kayıt:** her iş bitince hemen commit ve push. Push edilmeyen iş kaybolur (`OTONOM-PROMPT.txt` §3).
- **Kanıt disiplini:** her iddia için dosya:satır verilir. SHA ve PR git'ten doğrulanır. Test ya da CI yeşil gösterilmez, gerçek durum yazılır.
  - `TEST_DATABASE_URL` yoksa entegrasyon testleri guard'da durur. Bu "yeşil" sayılmaz (`CLAUDE.md` "verify ↔ CI farkı").
- **Submodule sırası:** backend push → çatı `git add backend` → çatı push. Backend PR merge edildikten sonra pointer yeniden bump edilir (`CLAUDE.md` "Merge sonrası pointer bump").
- **Aktif iş kaynağı tektir:** `00-KUYRUK.md`. Yeni planlama belgesi açılmaz (`CLAUDE.md` "AKTİF İŞ KAYNAĞI TEKTİR").
- **Kişi adı yasağı.** Kullanıcıya görünen metin Türkçe olur.

## Çalışma ortamları: hangisi ne yapabilir

| Yetenek | Yerel terminal (PO'nun PC'si) | Bulut (claude.ai/code) | Remote Control |
|---|---|---|---|
| Kod, belge, commit, push, PR | ✅ | ✅ | ✅ (yürütme yerelde) |
| **Merge** | ✅ (🟢 kapı + doğrulama tamsa) | ⛔ **hiçbir kapıda**. Merge PO'nun GitHub'dan tek tıkı | ✅ (yerel yetkiyle) |
| Canlı DB, migration, seed | ✅ ama yalnız KARAR + yedek sonrası | ⛔ Neon ve Dokploy erişimi yok | ✅ (yerel yetkiyle) |
| Submodule pointer bump | ✅ | ✅ (commit olarak); merge sonrası bump PO turunda | ✅ |
| Gördüğü dosyalar | Yerel diskteki her şey | **Yalnız repoya commit edilmiş** dosyalar | Yerel |
| İzin modları | Bypass dahil | Auto, Accept edits, Plan (Bypass yok) | Yerel oturumunki |

Kaynaklar:
- Bulut sütunu: `CLAUDE.md` "Bulut oturumu farkı (claude.ai/code)".
- Remote Control sütunu: `OTONOM-PROMPT.txt`'nin PR #200 sürümündeki satır ("yerel oturum + telefondan kontrol; yürütme YERELDE kalır → merge edebilir, DB'ye erişebilir, pointer bump yapabilir").
  - ⚠️ **TEYİT GEREK:** Bu satır `2d84138` commit'inde prompttan çıkarıldı. Güncel hiçbir belgede tanımı yok.
- PC kapalıyken terminal çalıştırma seçeneği (VPS ajan sunucusu): `03-PO-ELLE-ISLER.md` "Ajan sunucusu (opsiyonel)".

## Nereye bakılır

| Arıyorsan | Bak |
|---|---|
| Bir belge (hangisi nerede, 🔄 mi 📸 mi) | `docs/00-BELGE-HARITASI.md` |
| Bir iş kaleminin **güncel** durumu | `docs/otonom/00-KUYRUK.md`, iş no ile hedefli `grep` |
| Eski bilanço kartından kuyruğa köprü (G-kartı → kuyruk satırı) | `docs/kararlar/00-KART-INDEKSI.md` (📸, durum tutmaz, yönlendirir) |
| Karar, söz ve ölü kod geçmişi | `docs/kararlar/00-KARAR-TAKIP.md` |
| "Şu an canlıda ne var" anlatısı | `docs/kararlar/09-DURUM.md` |
| Belge yazma kuralları | `docs/kararlar/konu/belge-duzeni-rehberi.md` |
| Eski oturumlar (tarihsel) | `docs/devir/07-oturum-gunlugu.md`, `docs/devir/gunluk/` (📸) |
| Kararların arkasındaki muhakeme (DISC→Big Five, arketip) | `docs/devir/08-oturum-tezi-2026-08-28.md` (📸) |

---

## ⚠️ BU BELGE DURUM TUTMAZ

- Burada iş sayısı, kart sayısı, PR numarası ya da SHA **yoktur ve yazılmaz**. Bunlar bayatlar. Durum için yukarıdaki dosyalara gidin.
- **Son güncelleme:** 2026-09-24 (DC turu, devir klasörü düzeni). Eski gövde: `docs/arsiv/06-devir-kilavuzu-eski-2026-08-11.md`.
- **Tazeleme tetikleyicisi:** Aşağıdakilerden biri değişince bu belge güncellenir:
  - otonom sistemin dosya düzeni (`docs/otonom/` dosya adları, türetme komutu)
  - rol dağılımı
  - kapı ya da merge politikası
  - çalışma ortamlarının yetenekleri
  - `CLAUDE.md`'deki değişmez kurallardan biri
- Tetikleyici yoksa dokunulmaz.
