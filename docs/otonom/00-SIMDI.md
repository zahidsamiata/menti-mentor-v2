> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ).

**Son güncelleme:** 2026-09-26 13:49 UTC · çatı main HEAD `ce4f2af` · backend main HEAD `7aa8a18`

**Durum:** ÇALIŞIYOR

**Şu an yapılan:** boşta — sıradaki işe geçiliyor (U-19 profil tamamlanma kapısı ya da GV-18 rıza sürümü kontrolü değerlendiriliyor).

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
| backend #143 | PS-A1 (OCEAN ölçek düzeltmesi) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — izin sınıflandırıcısı "Merge Without Review" ile reddetti |
| backend #145 | GV-08 (anonimleştirme eksik alanlar) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — aynı sınıflandırıcı reddi |
| backend #142 · çatı #320 | AN-30 (granüler rıza — klasik kayıt + OAuth) | yeşil (backend 131 test dosyası, çatı 388/388) | yapılmadı | ⛔ MIGRATION dosyası — ajan asla merge etmez, PO kararı gerekir |
| çatı #110 | ⛔ MERGE ETME işaretli (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok

**Engeller:**
- `gh pr merge` ÜÇ kez (PS-A1 #143, GV-08 #145, önceki turda E-3c #313) izin sınıflandırıcısı tarafından "Merge Without Review" gerekçesiyle reddedildi — desen netleşti: KVKK/GDPR/matching-skorlama gibi hassas dosyalara dokunan PR'larda sınıflandırıcı bağımsız-inceleme yorumunu "review" saymıyor, GERÇEK bir GitHub PR review (approve) istiyor gibi görünüyor. Rutin özellik PR'ları (K-19, K-05, V-16, K-20, U-01) sorunsuz merge edildi.

**PO'ya sorular:** yok (56 cevapsız karar kartı duruyor, aşağıya bkz.)

**Strateji katmanına not:**
- **PS-A1 (#143) ve GV-08 (#145) merge için hazır** — ikisi de CI yeşil, bağımsız inceleme ONAY, `mergeable: MERGEABLE`. Yalnız PO'nun GitHub'dan tıklaması gerekiyor.
- AN-30 artık hem klasik kayıt hem OAuth kaydını kapsıyor (flag hâlâ varsayılan kapalı, canlıda görünmez). Self-serve kurum kaydı ekranı hâlâ kapsam dışı.
- K-05 artık BITTI sayılıyor (literal "SEÇEMİYOR" ölçütü karşılandı) — tam takvim/slot-seçici UX iyileştirmesi ayrı, numarasız bir gelecek adayı olarak not edildi.

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
1. U-19 (profil tamamlanma kapısı) ya da GV-18 (rıza sürümü kontrolü) — hangisi daha dar kapsamlıysa önce o
2. AŞAMA U/V taramasına devam (U-18, kalan 🟡'lar)
3. PS-A1/GV-08/AN-30 için PO'nun elle yapması gerekenleri 03-PO-ELLE-ISLER.md'de görünür tut
4. Yedek iş havuzuna (K5) düşülmedi — ana kuyrukta hâlâ işlenmemiş 🟡 aile işleri var
5. K1 durma koşulu oluşmadıkça devam
