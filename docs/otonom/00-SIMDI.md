> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ).

**Son güncelleme:** 2026-09-26 · çatı main HEAD `951892b` · backend main HEAD `35dfcf2`

**Durum:** ÇALIŞIYOR

**Şu an yapılan:** KR-19 (yönetici çift engelinin tek yönde uygulanması, bug fix) izole worktree'de (`.worktrees/kr19`) arka plan ajanında işleniyor.

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
| backend #148 + çatı #326 | U-18 (mesaj talebi kabul/ret kapısı) | yeşil, mergeable | henüz yapılmadı | ⛔ MIGRATION dosyası (`Conversation.rejectedAt`) — ajan asla merge etmez, PO kararı gerekir |
| backend #143 | PS-A1 (OCEAN ölçek düzeltmesi) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — izin sınıflandırıcısı reddi |
| backend #145 | GV-08 (anonimleştirme eksik alanlar) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — aynı sınıflandırıcı reddi |
| backend #142 · çatı #320 | AN-30 (granüler rıza — klasik kayıt + OAuth) | yeşil | yapılmadı | ⛔ MIGRATION dosyası — ajan asla merge etmez, PO kararı gerekir |
| çatı #110 | ⛔ MERGE ETME işaretli (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Şu an arka planda çalışan:** KR-19 (bug fix, migration yok, 🟡 kapı — inceleme sonrası ben devralıp bağımsız inceleme başlatacağım, PR açılınca).

**Push edilmemiş iş:** yok (docs bu turda commit edilecek)

**Bu turda bulunan doc-senkron gapleri (düzeltildi):**
- **V-16**: kod zaten canlıydı (`/health.commit` alanı çalışıyor, Dokploy `GIT_SHA` set etmediği için `"unknown"` dönüyor — beklenen), ama kuyruk satırı hâlâ `BEKLIYOR` yazıyordu → `✅ BITTI` yapıldı, kalan Dokploy adımı zaten `03-PO-ELLE-ISLER.md:18`'de.
- **U-19**: kalan kapsamı ("profil tamamlanma ölçütü") AN-28 içinde zaten uygulanmış (`matching.ts:454-483` `isProfileFaded`/`isFaded`, FE `menti/page.tsx:318`) → `✅ BITTI` yapıldı, ayrı iş açılmadı.
- **KR-07**: backend #133 (`260e319`) main'in atası olduğu doğrulandı (`git merge-base --is-ancestor`) → pointer zaten güncel, ayrı bump gerekmiyordu → `✅ BITTI` yapıldı.

**Engeller:**
- `gh pr merge` ÜÇ kez (PS-A1 #143, GV-08 #145, önceki turda E-3c #313) izin sınıflandırıcısı tarafından "Merge Without Review" gerekçesiyle reddedildi — AN-28 (#146) ve GV-18 (#147) ise sorunsuz merge edildi, hangi PR'ların reddedileceği önceden kestirilemiyor.
- Geçici git worktree bozulması (önceki turda) düzeltildi, tekrar doğrulandı — tüm worktree'ler sağlıklı.

**PO'ya sorular:** yok (56 cevapsız karar kartı duruyor, aşağıya bkz.)

**Strateji katmanına not:**
- **PS-A1 (#143) ve GV-08 (#145) merge için hazır** — ikisi de CI yeşil, bağımsız inceleme ONAY, `mergeable: MERGEABLE`. Yalnız PO'nun GitHub'dan tıklaması gerekiyor.
- **U-18 (#148/#326) da hazır ama migration içeriyor** — PO'nun açık "evet"i + `Conversation` tablosunda yedek sonrası uygulanabilir; kod tarafı tamamen bitti.
- Doc-senkron taraması (V-16/U-19/KR-07) gösterdi ki kuyrukta merge edilmiş işlerin Durum sütunu bazen güncellenmeden kalabiliyor — periyodik "pointer main'in atası mı" taraması faydalı, devam edilecek.

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
1. KR-19 (yürüyor) — sonuçlanınca bağımsız inceleme başlat, ONAY gelirse merge (🟡 kapı, migration yok)
2. AŞAMA taraması: KR-16 (Prisma CLI Docker imajı, SIRALI KR-01'den sonra — KR-01 BITTI, hazır) veya KR-22 (verify.sh↔CI parity)
3. PS-A1/GV-08/U-18/AN-30 için PO'nun elle yapması gerekenleri görünür tut
4. Yedek iş havuzuna (K5) düşülmedi — ana kuyrukta hâlâ işlenmemiş 🟡 aile işleri var (F/Y ailesi taranmadı)
5. K1 durma koşulu oluşmadıkça devam
