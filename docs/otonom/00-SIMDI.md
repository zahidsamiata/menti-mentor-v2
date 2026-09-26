> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ).

**Son güncelleme:** 2026-09-26 15:03 UTC · çatı main HEAD (pointer #325 sonrası) · backend main HEAD `66c7dad`

**Durum:** ÇALIŞIYOR

**Şu an yapılan:** GV-18 (rıza sürümü kontrolü) 2. tur bağımsız inceleme sürüyor — 1. tur "SORUN VAR" dedi (legacy backfill kullanıcıları yanlış tetiklerdi), düzeltildi, doğrulanıyor.

**Son merge'ler (bu turda, en yeniden eskiye):**
| PR | İş | Canlı kontrol |
|---|---|---|
| çatı #325 | pointer bump (AN-28 merge commit) | ok:true, db:up, site 200 |
| backend #146 + çatı #323 | AN-28 (mentör durum gösterimi) | ok:true, db:up, site 200 |
| çatı #322 | K-05 (KATI mentörde buton kilidi) | ok:true, db:up, site 200 |
| backend #144 + çatı #321 | K-19/KARAR-7 (toplantı linkini mentör onayda girer) | ok:true, db:up, site 200 |

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| backend #147 · çatı #324 | GV-18 (rıza sürümü kontrolü, ⛔ ÇIKIŞ BLOKERİ T1) | yeşil | 2. tur sürüyor (1. tur SORUN VAR → düzeltildi) | inceleme sonucu bekleniyor |
| backend #143 | PS-A1 (OCEAN ölçek düzeltmesi) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — izin sınıflandırıcısı reddi |
| backend #145 | GV-08 (anonimleştirme eksik alanlar) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — aynı sınıflandırıcı reddi |
| backend #142 · çatı #320 | AN-30 (granüler rıza — klasik kayıt + OAuth) | yeşil | yapılmadı | ⛔ MIGRATION dosyası — ajan asla merge etmez, PO kararı gerekir |
| çatı #110 | ⛔ MERGE ETME işaretli (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok

**Engeller:**
- `gh pr merge` ÜÇ kez (PS-A1 #143, GV-08 #145, önceki turda E-3c #313) izin sınıflandırıcısı tarafından "Merge Without Review" gerekçesiyle reddedildi — ama AN-28 (#146, matching.ts'e dokunuyor) sorunsuz merge edildi, yani desen tutarlı değil / hangi PR'ların reddedileceği önceden kestirilemiyor. Deneyip görmek gerekiyor.

**PO'ya sorular:** yok (56 cevapsız karar kartı duruyor, aşağıya bkz.)

**Strateji katmanına not:**
- **PS-A1 (#143) ve GV-08 (#145) merge için hazır** — ikisi de CI yeşil, bağımsız inceleme ONAY, `mergeable: MERGEABLE`. Yalnız PO'nun GitHub'dan tıklaması gerekiyor.
- **GV-18'de gerçek bir üretim-riski bug bulundu ve düzeltildi** (bağımsız inceleme sayesinde) — 2026-08-28 backfill'lenmiş kullanıcılar düzeltilmeden merge edilseydi yanlışlıkla "yeniden onay gerekiyor" görecekti. Ders: "sürüm hiç değişmedi, davranış aynı kalır" varsayımı doğrulanmadan yazılmıştı; artık koda karşı kontrol edildi.
- AN-28'de de bağımsız inceleme gerçek bir rol-kaynağı güvenlik bulgusu buldu (User.role yerine TenantMembership.role) — iki turda da inceleme süreci işe yaradı, devam edilmeli.

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
1. GV-18 2. tur inceleme sonucunu al, ONAY ise merge et + canlı kontrol
2. AŞAMA U/V taramasına devam (U-18, kalan 🟡'lar) ya da AŞAMA I/K/F taraması
3. PS-A1/GV-08/AN-30 için PO'nun elle yapması gerekenleri 03-PO-ELLE-ISLER.md'de görünür tut
4. Yedek iş havuzuna (K5) düşülmedi — ana kuyrukta hâlâ işlenmemiş 🟡 aile işleri var
5. K1 durma koşulu oluşmadıkça devam
