### KARAR-67 · Yönetici drill-down'ı kişinin serbest-metin endişe notuna inmeli mi?  (1 işi açar)  [ÜRÜN KARARI · KVKK]
**Şu an ne var:** Drill-down kişiye iniyor (`yonetici:80`) ama notları göstermiyor. Check-in kayıtlarını sunucu taraflara yalnız kendi kaydını, kurum yöneticisine (ADMIN) ise görüşmenin tüm kayıtlarını serbest not (1000 karakter) ve endişe etiketi dahil döndürüyor (`backend/src/controllers/meetingCheckInController.ts:112-125`; eski G-3 "sahiplik kontrolsüz" açığı GV-04 ile kapandı). Görüşmeler sayfası yöneticiye serbest notu gösteriyor (`frontend/src/components/organisms/MeetingCheckInReadout.tsx:151-155`, `frontend/src/app/(dashboard)/meetings/page.tsx:153`); endişe etiketi ekranda gösterilmiyor. Kanıt: `persona-panel-gelisimi-2026-09-23.md:271-272` (C1).
**Sorun ne:** Yöneticinin "kim kaynıyor" görme hakkı ile mentinin özel notunun mahremiyeti çarpışıyor.
**Neden sana soruyorum:** Yetki + KVKK + kullanıcı güveni kararı.
**Seçenekler:**
· **A — Yönetici yalnız AGGREGATE + durum görür, serbest-metin notu göremez.** Ne kazanırsın: mahremiyet. **Ne kaybedersin:** yönetici bağlamı azalır. Süre M · geri alınır ✅ · migration yok · Kullanıcı ne görür: yönetici görüşmeler sayfasında puanları ve durumu görür, serbest not görünmez
· **B — Görür ama LOGLU + kullanıcı bilgilendirilir.** Ne kazanırsın: aksiyon gücü. **Ne kaybedersin:** kırılgan not maruz kalır. Süre M · geri alınır ✅ (🔴 KVKK) · migration yok · Kullanıcı ne görür: yönetici notu görür; yazan, notunun yöneticiye açık olduğunu önceden bilir
· **C — Not yalnız yazanında kalır — yöneticiye hiç açılmaz** (karşı taraf zaten görmüyor, KARAR-77 cevabı). Ne kazanırsın: en güvenli. **Ne kaybedersin:** yönetici müdahale edemez. Süre M · geri alınır ✅ · migration yok · Kullanıcı ne görür: yönetici notla ilgili hiçbir şey görmez
**Karşılaştırma:** A dengeli; B güçlü ama riskli; C en korumacı ama aksiyonu keser.
**Benim önerim:** A. *(Ürün+KVKK kararın.)*
**Cevap vermezsen:** PL-A2, C1 çatışması açık kalır; yönetici serbest notları görmeye devam eder; aktif kuyruktaki AN-49 (kalite görünümü) bekler.
**İlgili kartlar:** KARAR-44 (kalite verisinde yönetici neyi görür) · KARAR-86 (yöneticinin kişi bazında hassas veri görmesi — aynı KVKK ilkesi) · KARAR-89 (tek kutu seçilen kutu notu taşır) — birlikte cevaplanması önerilir: KARAR-67 + KARAR-89
**CEVAP:**

---

