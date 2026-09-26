> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ).

**Son güncelleme:** 2026-09-26 14:22 UTC · çatı main HEAD `ce4f2af` · backend main HEAD `7aa8a18`

**Durum:** ÇALIŞIYOR

**Şu an yapılan:**
- AN-28 (mentör durum gösterimi — `.worktrees/an28` + `.worktrees/an28/backend`, izole worktree) arka planda devam ediyor.
- GV-18 (rıza sürümü kontrolü) PR'ları açıldı, CI bekleniyor.

**Son merge'ler (bu turda, en yeniden eskiye):**
| PR | İş | Canlı kontrol |
|---|---|---|
| çatı #322 | K-05 (KATI mentörde buton kilidi) | ok:true, db:up, site 200 |
| backend #144 + çatı #321 | K-19/KARAR-7 (toplantı linkini mentör onayda girer) | ok:true, db:up, site 200 |
| çatı #319 + backend #141 | V-16 (`/health.commit`) | ok:true, db:up, site 200 |
| çatı #318 | K-20 (bloksuz mentörde mesaj yolu) | ok:true, db:up, site 200 |
| çatı #317 | U-01 (mentör "gerçekleşmedi" düğmesi) | ok:true, db:up, site 200 |

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| backend #147 · çatı #324 | GV-18 (rıza sürümü kontrolü, ⛔ ÇIKIŞ BLOKERİ T1) | bekleniyor | henüz yok | CI + bağımsız inceleme bekleniyor |
| backend #143 | PS-A1 (OCEAN ölçek düzeltmesi) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — izin sınıflandırıcısı reddi |
| backend #145 | GV-08 (anonimleştirme eksik alanlar) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — aynı sınıflandırıcı reddi |
| backend #142 · çatı #320 | AN-30 (granüler rıza — klasik kayıt + OAuth) | yeşil | yapılmadı | ⛔ MIGRATION dosyası — ajan asla merge etmez, PO kararı gerekir |
| çatı #110 | ⛔ MERGE ETME işaretli (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok

**Engeller:**
- `gh pr merge` ÜÇ kez (PS-A1 #143, GV-08 #145, önceki turda E-3c #313) izin sınıflandırıcısı tarafından "Merge Without Review" gerekçesiyle reddedildi — desen: KVKK/GDPR/matching-skorlama dosyalarına dokunan PR'larda sınıflandırıcı bağımsız-inceleme yorumunu "review" saymıyor. GV-18 (#147) de auth/KVKK dosyasına dokunuyor — muhtemelen aynı red gelecek, merge denemesinde göreceğiz.

**PO'ya sorular:** yok (56 cevapsız karar kartı duruyor, aşağıya bkz.)

**Strateji katmanına not:**
- **PS-A1 (#143) ve GV-08 (#145) merge için hazır** — ikisi de CI yeşil, bağımsız inceleme ONAY, `mergeable: MERGEABLE`. Yalnız PO'nun GitHub'dan tıklaması gerekiyor.
- GV-18 (#147/#324), AN-30 gibi "inert ama doğru altyapı" deseni — bugün canlı davranış değişmiyor (CONSENT_VERSION yer tutucu), avukat metni gelince devreye giriyor. İkisi de aynı çıkış-blokeri mantığıyla (KARAR-69 b) gerekçelendirildi.
- AN-28 tamamlanınca matching.ts'e dokunacağı için muhtemelen aynı "Merge Without Review" reddiyle karşılaşabilir — PO'ya elle merge listesi büyüyor, 03-PO-ELLE-ISLER.md'de toplu görünür tutulmalı.

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
1. GV-18 (#147/#324) CI'ını al, bağımsız inceleme başlat, koşullar tamsa merge et
2. AN-28 ajanının sonucunu al, incele, PR'ları işle
3. AŞAMA U/V taramasına devam (U-18, kalan 🟡'lar)
4. PS-A1/GV-08/AN-30/GV-18 için PO'nun elle yapması gerekenleri 03-PO-ELLE-ISLER.md'de görünür tut
5. K1 durma koşulu oluşmadıkça devam
