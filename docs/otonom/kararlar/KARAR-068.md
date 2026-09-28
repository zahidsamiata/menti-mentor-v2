### KARAR-68 · Persona/panel belgeleri nasıl gelişmeli: A/B/C?  (2 işi açar)  [BELGE POLİTİKASI]
**Şu an ne var:** 7 persona/panel belgesi 📸 dondurulmuş, 7 hafta güncellenmedi, kimse "varsayım tuttu mu" bakmadı. Kanıt: `docs/raporlar/kesif/persona-panel-gelisimi-2026-09-23.md:288-293` (§7, bu kartın taslağı) + §5.1 (`:176-188`) + U-A6 varsayımı (`:136`: "belge gerçek kullanıcıyla doğrulanacak" — 7 hafta sonra yapılmadı).
**Sorun ne:** Tasarım zemini bayat; ama kör güncelleme tur bütçesini yer (projede yaşanmış sorun).
**Neden sana soruyorum:** Belgelerin nasıl yaşayacağı bir belge-yönetimi + ürün kararı; "aktif iş kaynağı tektir" kuralıyla ilişkisi var.
**Seçenekler:**
· **A — Dondurmayı kaldır, YAŞAYAN yap.** Okuyan/ajan ne görür: 7 belge 🔄, her turda güncellenmesi beklenir. Ne kazanırsın: her zaman güncel tasarım zemini. **Ne kaybedersin:** tur bütçesinin büyük kısmı belge muhasebesine gider; "eğitimli taslak" niteliği kaybolur; ⚠️ zayıf — sürekli güncellenen ikinci bir gerçek kaynağı doğar. Süre L (sürekli) · geri alınır ✅ · migration yok
· **B — HALEF yaşayan belge (persona-v2), eskiyi "yerini X aldı" ile yönlendir.** Okuyan/ajan ne görür: eski 7 belgede yönlendirme, tek yeni yaşayan persona belgesi. Ne kazanırsın: gerçek kullanıcı verisiyle beslenmiş yeni zemin; tarihsel iz korunur. **Ne kaybedersin:** halefi üretecek girdi (gerçek kullanıcı testi) YOKKEN üretilirse yine tahmin olur. Süre M (tetikleyicide) · geri alınır ✅ · migration yok
· **C — Dondurulmuş kalsın; güncel bilgi tek yerde (KUYRUK/09-DURUM), personalar tarihsel zemin.** Okuyan/ajan ne görür: bugünkü gibi 📸 belgeler. Ne kazanırsın: minimum bakım, tek gerçek kaynağı korunur. **Ne kaybedersin:** personaların "varsayım tuttu mu" bilgisi hiçbir yere işlenmez → tekrar bayatlar (bugünkü sorun sürer). Süre — · geri alınır ✅ · migration yok
**Karşılaştırma:** Sürekli güncel zemin öncelik ama bütçe kabulse A; öğrenmeyi kalıcı kaybetmek istemiyorsan ve gerçek kullanıcı testini bekleyebiliyorsan B; minimum bakım öncelikse C ama bayatlama sürer.
**Benim önerim:** Tetikleyicili B (o zamana kadar C) — belgelerin kendi koştuğu şart (gerçek kullanıcı testi) yerine gelmeden A/B yeni tahmin üretir; C öğrenmeyi kalıcı kaybeder; doğru hamle güncellemeyi ilk kullanıcı testine bağlamak (§5.1).
**Cevap vermezsen:** U-A6 (persona raporundaki varsayım `:136`, kuyruk satırı değil) açık kalır, belgeler tekrar bayatlar. Kuyrukta kilitli iş yok (grep 0).
**İlgili kartlar:** KARAR-59 (persona belgelerindeki kurgu kişi adları) · KARAR-71 (persona tasarımının kırılgan kitle seçimi)
**CEVAP:**

---

