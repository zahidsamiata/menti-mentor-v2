### KARAR-36 · Yarım kalmış üç teknik kalem: `answeredFollowup` · `qualityMultiplier` ikizi · iki yedek tablo  [VERİ KARARI] (4 işi açar)
**Şu an ne var:** (a) Kod var olmayan bir tabloyu sorguluyor — `backend/src/services/profile-completeness.service.ts:43-50`; ⚠️ **bu turda daha kötüsü bulundu:** `(prisma as any).answeredFollowup?.count(...)` optional chaining yüzünden **hata fırlatmadan `undefined` dönüyor** → sonuç **her zaman 0** ve `catch` bloğu **ölü kod**, yedek hesaplama hiç çalışmıyor → profil tamamlanma yüzdesi **sistematik düşük**. (b) `UserProfile.qualityMultiplier` kullanılmıyor (`backend/prisma/schema.prisma:1017`); canlı akış `TenantMembership` üzerinden yürüyor (`schema.prisma:1112` · `backend/src/services/certification.service.ts:252`). (c) İki yedek tablo (`MentorshipAgreement_yedek_20260830` 150 satır · `CertificationOption_yedek_20260909` 20 satır) şemada **yok** → `migrate dev`/`db push` onları fazlalık görüp silebilir.
**Sorun ne:** Üçü de "yarım bırakılmış"; hiçbiri hata vermiyor, bu yüzden kimse fark etmiyor. Ama üçü de bir gün sessizce veri kaybettirebilir.
**Neden sana soruyorum:** Üçü de **silme** kararına dokunuyor; SİLME PROTOKOLÜ senin ikinci onayını şart koşuyor.
**Seçenekler (her kalem için aynı üçlü):**
· **A — Tamamla/kalıcılaştır.** (a) tabloyu aç · (b) ikizi doğru bağla · (c) yedek tabloları şemaya ekle. Ne kazanırsın: hiçbir şey kaybolmaz; (c) için `migrate dev`'in kazara silmesi **imkânsızlaşır**. Ne kaybedersin: **migration** + kalıcı bakım yükü. Süre **M** · geri alınır ✅ · migration **var** · Kullanıcı ne görür: (a) tabloyu açarsa profil tamamlanma yüzdesi gerçek cevaplara göre yükselir; (b)/(c) görünmez.
· **B — Karantinaya al** (`@deprecated`, rota kapalı), bir tur sonra ikinci onayla sil. Ne kazanırsın: protokole uygun, geri dönülebilir. Ne kaybedersin: iki tur sürer; (a)'daki düşük yüzde hatası karantina süresince sürer. Süre **M** · geri alınır ✅ · Kullanıcı ne görür: hiçbir şey (yüzde bugünkü gibi düşük kalır) · migration yok.
· **C — Şimdi sil (DROP).** Ne kazanırsın: en temiz. Ne kaybedersin: **geri dönüşü yok**; yedek tablolar silinirse 6 saatlik geri-yükleme penceresi dışındaki **tek koruma gider**. Süre **S** · geri alınamaz ⛔ · migration **var** · Kullanıcı ne görür: hiçbir şey.
**Karşılaştırma:** (c) yedek tablolar için özellikle dikkat — onlar **koruma amaçlı** duruyor; erken silmek koruma kaybıdır. (a) ve (b) normal ölü-kod protokolüne girer.
**Benim önerim:** (a)+(b) için **B** (karantina), (c) için **A** (şemaya ekle) — çünkü yedek tabloyu şemaya eklemek kazara silinmesini önler ve silme kararını aceleye getirmez.
**Cevap vermezsen:** **Y-18** (madde 126), **AJ-10** (kapısı KARAR-15 ile ortak — `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md:76`), D3, **S26** ve **S37** açık kalır; bir `migrate dev` turunda yedek tablolar **uyarısız kaybolabilir**.
**İlgili kartlar:** KARAR-15 (AJ-10 bağlanmamış bileşenler kapısı ortak) · KARAR-26 ((c) ile aynı iki yedek tablo, mükerrer soru) — birlikte cevaplanması önerilir: KARAR-26 + KARAR-36
**CEVAP:**

---

