> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ).

**Son güncelleme:** 2026-09-26 15:30 UTC · çatı main HEAD (GV-18 #324 sonrası) · backend main HEAD `35dfcf2`

**Durum:** ÇALIŞIYOR

**Şu an yapılan:** boşta — sıradaki işe geçiliyor (AŞAMA taraması: U-18, kalan 🟡'lar ya da AŞAMA I/K/F).

**Son merge'ler (bu turda, en yeniden eskiye):**
| PR | İş | Canlı kontrol |
|---|---|---|
| backend #147 + çatı #324 | GV-18 (rıza sürümü kontrolü — 1. tur bulgu bulundu+düzeltildi, 2. tur ONAY) | ok:true, db:up, site 200 |
| çatı #325 | pointer bump (AN-28 merge commit) | ok:true, db:up, site 200 |
| backend #146 + çatı #323 | AN-28 (mentör durum gösterimi — bulgu bulundu+düzeltildi) | ok:true, db:up, site 200 |
| çatı #322 | K-05 (KATI mentörde buton kilidi) | ok:true, db:up, site 200 |

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| backend #143 | PS-A1 (OCEAN ölçek düzeltmesi) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — izin sınıflandırıcısı reddi |
| backend #145 | GV-08 (anonimleştirme eksik alanlar) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — aynı sınıflandırıcı reddi |
| backend #142 · çatı #320 | AN-30 (granüler rıza — klasik kayıt + OAuth) | yeşil | yapılmadı | ⛔ MIGRATION dosyası — ajan asla merge etmez, PO kararı gerekir |
| çatı #110 | ⛔ MERGE ETME işaretli (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok

**Engeller:**
- `gh pr merge` ÜÇ kez (PS-A1 #143, GV-08 #145, önceki turda E-3c #313) izin sınıflandırıcısı tarafından "Merge Without Review" gerekçesiyle reddedildi — AN-28 (#146, matching.ts) ve GV-18 (#147, auth/consent) ise sorunsuz merge edildi, yani hangi PR'ların reddedileceği önceden kestirilemiyor.
- ⚠️ **GEÇİCİ GİT BOZULMASI (bu turda yaşandı, DÜZELTİLDİ):** çok sayıda `git worktree add`/`remove` sonrası backend submodule'ün paylaşılan `.git/modules/backend/config` dosyasına yanlış bir `core.worktree = ../../../../../.worktrees/gv18-review/backend` satırı sızmıştı — bu, ANA `/home/ajan/menti/backend` checkout'unda `git status`/`git log` dahil TÜM git komutlarını "cannot chdir" hatasıyla kırıyordu. Satır elle silindi, tüm worktree'ler (`git worktree list`) tekrar sağlıklı doğrulandı. Kök neden netleşmedi (muhtemelen art arda hızlı worktree add/remove'ların bir yarış durumu) — ileride tekrarlarsa `.git/modules/<submodule>/config`'te yanlışlıkla eklenmiş `core.worktree` satırına bak.
- ⚠️ GitHub bir çatı PR'ında (#324) `mergeable:CONFLICTING` gösterdi ama yerel `git merge` TAMAMEN TEMİZ sonuçlandı (submodule pointer fast-forward) — CLAUDE.md'nin "pointer CONFLICTING ama descendant" uyarısının tam örneği. Çözüm: `git merge origin/main` + push, GitHub'ın önbelleği güncellendi.

**PO'ya sorular:** yok (56 cevapsız karar kartı duruyor, aşağıya bkz.)

**Strateji katmanına not:**
- **PS-A1 (#143) ve GV-08 (#145) merge için hazır** — ikisi de CI yeşil, bağımsız inceleme ONAY, `mergeable: MERGEABLE`. Yalnız PO'nun GitHub'dan tıklaması gerekiyor.
- Bu turda bağımsız inceleme SÜRECİ 2 kez gerçek bug yakaladı (AN-28 rol-kaynağı, GV-18 legacy-consent) — her ikisi de "SORUN VAR" → düzeltme → 2. tur "ONAY" akışıyla çözüldü. Süreç çalışıyor, devam edilmeli.

**Karar kilidi tablosu (etkiye göre, cevapsız 56 karttan en çok iş açanlar — değişmedi):**
| Karar | Konu | Kilitlediği iş sayısı |
|---|---|---|
| KARAR-57 | Mizaç sonucunu hangi test belirlesin | 4 |
| KARAR-45 | Arketip adları: ad↔kod eşlemesi | 4 |
| KARAR-56 | Menti aynı hafta birden fazla mentöre talep gönderebilsin mi | 3 |
| KARAR-39 | Anonimleştirme kapsamı: arketip kopyası + başkasının yorumu | 1 (GV-08 yorum ayağı) |
| KARAR-68 | Persona/panel belgeleri A/B/C | 2 |
| KARAR-65 | "D mentör + S menti" yasağı menti tarafında da mı | 2 |
| KARAR-62 | İlk ölçüm: herkes aynı senaryo mu, kişiye göre mi | 2 |
| KARAR-61 | Eşleşme formülü + arketip motoru aynı anda mı açılsın | 2 |
| KARAR-59 | Persona kişi adları "Kişi Adı Yasağı"na dahil mi | 2 |
| KARAR-55 | Sertifikada geri bildirim ne zaman gösterilsin | 2 |
| KARAR-30 | İsim değişkeni altyapısı — seed sırası | 1 (I-09) |
| KARAR-95 | Kriz bildirimi kanalı (güvenlik, hukuk değil) | 1 (I-18) |

**Sıradaki 5 iş:**
1. AŞAMA U taraması: U-18 (mesaj talebi kabul/ret kapısı, migration gerekebilir)
2. AŞAMA I/K/F taraması — kalan 🟡/🟢 BEKLIYOR işleri bul
3. PS-A1/GV-08/AN-30 için PO'nun elle yapması gerekenleri 03-PO-ELLE-ISLER.md'de görünür tut
4. Yedek iş havuzuna (K5) düşülmedi — ana kuyrukta hâlâ işlenmemiş 🟡 aile işleri var
5. K1 durma koşulu oluşmadıkça devam
