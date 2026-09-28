### KARAR-123 · Kayıtta üç soruyu atlayan kişiye sonradan sorulsun mu? (0 iş kilitliyor) [ÜRÜN KARARI]
**Şu an ne var:** "Ne arıyorsun / nasıl destek istersin / neye önem verirsin" üç sorusu yalnız kayıt akışında soruluyor; sekmeyi kapatan kişiye bir daha sorulmuyor, profil sayfasında da yok. Kanıt: `frontend/src/app/onboarding/_OnboardingContent.tsx:249` · `frontend/src/app/(dashboard)` araması (`mentiNeeds`/`supportApproach`) 0 · kaynak `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:597`.
**Sorun ne:** Bugün üç cevap eşleştirme puanına hiç girmiyor (backend `src/services` içinde `mentiNeeds`/`supportApproach` araması 0; yalnız kaydediliyor, `onboardingController.ts:410-427`); yeni formül açılırsa (KARAR-61) cevapsız kişi o parçada nötr sayılacak; eşleşme kartındaki "ikiniz de …" cümlesi (I-11) onun için hiç çıkmayacak.
**Neden sana soruyorum:** Kullanıcıya nerede ve ne sıklıkla soru sorulacağı ürün kararı.
**Seçenekler:**
- **A) Profil sayfasına "Üç soruyu tamamla" kartı.** · Kullanıcı ne görür: profilinde eksik kartı, isterse doldurur · Kazanç: veri tamamlanır, baskı yok · Kaybedersin: az kişi kendiliğinden döner · Süre: S · Geri alınır: evet · Migration: yok
- **B) Panelde bir kez hatırlatma + profil kartı.** · Kullanıcı ne görür: girişte bir kez "eşleşmen iyileşsin" notu · Kazanç: doluluk artar · Kaybedersin: hafif sürtünme · Süre: S-M · Geri alınır: evet · Migration: yok
- **C) Sorma.** · Kullanıcı ne görür: değişiklik yok · Kazanç: iş yok · Kaybedersin: bu kişiler için ihtiyaç verisi hiç oluşmaz · Süre: — · Geri alınır: — · Migration: yok
**Karşılaştırma:** Verinin yeni formülde (KARAR-61) kullanılacağı kesinse A ya da B değer taşır; formül rafa kalkarsa C yeterli.
**Benim önerim:** A — sürtünmesiz ve geri alınabilir; bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** Atlayan kişi cevapsız kalır; başka iş kilitlenmez.
**İlgili kartlar:** KARAR-61 (yeni formülün %45'lik parçası bu üç cevaba dayanıyor)
**CEVAP:**


