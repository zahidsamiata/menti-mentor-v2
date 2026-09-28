> 📸 DONDURULMUŞ (2026-09-27) — dondurulmuş belgelerde "açık" görünen, ama doğrulaması yapılmış işlerin eşleme tablosu. Dondurulmuş belgelere DOKUNULMAZ; güncel durum buradan okunur.
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-27 · TAZELEME TETİKLEYİCİSİ: yeni BITTI işin kaynağı dondurulmuş belgedeyse satır EKLENİR (OTONOM-PROMPT 5c kural h) — mevcut satırlar değişmez

# Dondurulmuş belge eşlemesi — 2026-09-27

Kaynak: GÖREV B.3 (`docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md`). Dondurulmuş belge listesi: B.0 kuralı (ilk 5 satırda 📸 / DONDURULDU + `10-yol-haritasi.md`, `00-CIKIS-PLANI.md`) + `00-KART-INDEKSI.md` (📸 damgası 7. satırda, "durum değiştirilmez" — 7b inceleme #379), `docs/arsiv/` ve `docs/otonom/arsiv/` hariç, bu doğrulamanın kendi dosyaları hariç. Tarama: 2 salt-okuma alt-ajan (grep + satır okuma). "Durum" = 2026-09-27 doğrulama kategorisi (✅ doğrulandı · ⚠️ kısmen · 🔁 sonradan değişti · 👁 insan gözü (kod ✅) · ❌ tutmuyor). "Eşleşme belirsiz" satırları bilgi amaçlıdır.

| Belge:satır | İş | Durum | Eşleşme | Belgedeki ifade |
|---|---|---|---|---|
| docs/devir/01-felsefe-ve-calisma-tarzi.md:56 | GV-09b | 👁 | tam | canlı DB Neon mu docker Postgres mi tartışmalı, yedek zorunlu |
| docs/raporlar/bilanco/bolumler/T2-C-kod-denetimi.md:132 | GV-09b | 👁 | belirsiz | Neon bölge çelişkisi ❓ TEYİT GEREK (PO); Londra teyidiyle kısmen çözüldü |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:45 | AN-10 | ⚠️ | tam | mizaç/karakter/kişilik ayağı KARAR-64'te açık, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:47 | AN-05 | ⚠️ | tam | "şimdilik" metni yalnız belgede; FE/BE'de yok, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:49 | YN-13 | ⚠️ | tam | backend settings.local.json'da ad kaldı, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:60 | PS-01 | 🔁 | tam | take:500 skordan önce kesiyor, AN-07'ye bırakılmış, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:62 | GV-18 | ✅ | tam | ReconsentBanner admin'de yok, bugün görünmez, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:64 | GV-12 | ⚠️ | tam | 409 kalktı ama yanıt gövdesi farklı, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:66 | GV-10 | 🔁 | tam | logout yalnız refresh siler, access denylist yok, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:70 | V-16 | ⚠️ | tam | canlı /health commit:"unknown", Dokploy GIT_SHA yok |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:71 | U-19 | ⚠️ | belirsiz | ölçüt metni bayat, TUTMUYOR (ölçüt bayat) |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:73 | F-28 | ⚠️ | tam | inline metinler 7 yerde hâlâ sözlüğe taşınmadı, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:76 | F-04 | ⚠️ | tam | host/MIME yok, CSP Report-Only, backend CSP kapalı, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:79 | K-05 | ✅ | tam | serbest saat girilebiliyor, yalnız gönderme kilitli, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:82 | KR-19 | ⚠️ | tam | engel öncesi konuşmada mesajlaşma/talep sürüyor, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:97 | YN-10 | ⚠️ | tam | CLAUDE.md kendi satır-no atıfları hâlâ kırık, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:98 | YN-09 | ⚠️ | tam | KUYRUK 130 satır >1000 karakter, GEÇMİŞ yok, TUTMUYOR |
| docs/raporlar/kesif/bitti-yeniden-denetim-2026-09-26.md:100 | F-27 | 🔁 | tam | sayfalama var, konuşma başına ayrı sorgu (N+1) sürüyor, TUTMUYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:123 | Y-02 | ✅ | tam | madde 94 listPendingTenants audit izi yok, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:124 | Y-03 | ⚠️ | tam | madde 47, 90 yerde kopya Zod doğrulama bloğu, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:125 | Y-04 | ✅ | tam | madde 48 kalanı, 3 liste ucu sayfalamasız, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:134 | I-02 | ✅ | tam | madde 141 kart üç sorudan önce gösteriliyor, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:135 | I-04 | ⚠️ | tam | madde 149, sınavda 4 kritik konu garanti değil, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:136 | I-03 | ✅ | tam | madde 150 sınavı geçemeyen zayıf konusunu öğrenmiyor, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:139 | P-05 | 👁 | belirsiz | madde 154 bekleyen talep süresiz asılı kalıyor, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:139 | U-01 | ✅ | belirsiz | madde 154 bekleyen talep süresiz asılı kalıyor, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:140 | I-05 | ✅ | tam | madde 156 görüşme sıklığı yalnız anlaşma sayfasında, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:141 | I-07 | ✅ | tam | madde 157+158 sertifika deneme disiplini yok, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:143 | I-06 | ✅ | tam | madde 160 iptal edilmiş karar hâlâ geçerli görünüyor, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:145 | P-05 | 👁 | tam | madde 155 ret ekranı sebep gösteriyor, KARAR-22, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:152 | Y-06 | ⚠️ | tam | madde 58 footer yalnız ana sayfada, yasal linkler ölü, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:154 | Y-08 | ⚠️ | tam | madde 53 dashboard/admin arama motoruna kapalı sayılmıyor, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:155 | Y-09 | 👁 | tam | madde 51+52 site simgesi/paylaşım görseli yok, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:156 | Y-13 | ✅ | tam | madde 54 sitemap elle yazılmış, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:157 | Y-10 | 👁 | tam | madde 62 JSON-LD yapısal veri yok, BEKLIYOR |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:164 | Y-16 | ✅ | tam | madde 127 etiket önerme FE 🟢, backend düzeldi çağıran yok |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:335 | F-32 | ✅ | tam | durum BEKLIYOR doğru, gerçekten önbelleksiz (kanıt yolu bayat) |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:353 | U-01 | ✅ | belirsiz | ürün kararı gerekli: kim/ne zaman COMPLETED işaretler, ❌ YOK |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:438 | U-08 | ⚠️ | belirsiz | PENDING mentor-matches erişimi; kuyruğun kendisi de ❓ diyor |
| docs/raporlar/kesif/devir-analizi-2026-09-21.md:490 | U-08 | ⚠️ | tam | onay kapısı yalnız /api/users'ta; rank-mentors açık, ❓ TEYİT |
| docs/raporlar/kesif/devir-klasoru-envanteri-2026-09-24.md:34 | GV-09b | 👁 | tam | ❌ bayat; canlı DB kimliği hâlâ tartışmalı (ÇELİŞKİ 2026-09-21) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:24 | AJ-01 | ⚠️ | belirsiz | G1-18 kurum-içi sayımlar User.role'den, kuyrukta karşılığı yok |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:24 | AJ-08 | ⚠️ | belirsiz | G3-09 sertifika seed npm komutu, kuyrukta karşılığı yok |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:56 | F-04 | ⚠️ | tam | G1-23 host/MIME yok, CSP rapor modunda, HÂLÂ AÇIK (kısmi) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:87 | PS-A1 | ⚠️ | belirsiz | G2-07 OCEAN/SJT canlı eşleştirmede okunmuyor, HÂLÂ AÇIK |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:132 | F-24 | ✅ | tam | G4-08 platform tek-kullanıcı drill-down, HÂLÂ AÇIK (BEKLIYOR) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:147 | P-05 | 👁 | tam | G4-25 ret hâlâ çıplak, alternatif yok, HÂLÂ AÇIK |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:152 | F-18 | ✅ | tam | G4-30 yönetici rapor export yok, HÂLÂ AÇIK (BEKLIYOR) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:185 | F-27 | 🔁 | tam | G6-01 N+1 sürüyor, tek sorgu/JOIN yapılmadı, HÂLÂ AÇIK |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:200 | F-21 | 👁 | tam | G7-09 bütünsel WCAG 2.1 AA denetimi yok, HÂLÂ AÇIK |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:206 | K-04 | ✅ | belirsiz | G8-01 foto kalıcı disk, Dokploy canlı ayarı DOĞRULANAMADI |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:207 | K-04 | ✅ | belirsiz | G8-02 UPLOAD_DIR/BACKEND_URL, canlı env DOĞRULANAMADI |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:215 | AN-07 | ✅ | tam | G8-10 take:500, önbellek yok, HÂLÂ AÇIK (BEKLIYOR) |
| docs/raporlar/kesif/gerekcesiz-kalem-taramasi-2026-09-26.md:17 | AN-54 | ⚠️ | tam | Ortak adlı alanlar için model-bazlı ikinci geçiş YAPILMADI |
| docs/raporlar/kesif/icerik-kalitesi-2026-09-23.md:186 | IC-10 | ✅ | tam | 4 şimdilik varyantı (I-15+IC-10): menti tarafı hiç yazılmamış |
| docs/raporlar/kesif/icerik-kalitesi-2026-09-23.md:197 | IC-10 | ✅ | tam | [aday] Menti şimdilik 4 varyantını yaz 🟢 (IC-10 ile) |
| docs/raporlar/kesif/icerik-kalitesi-2026-09-23.md:211 | PS-A1 | ⚠️ | tam | Bekleyen: PS-A1, senaryo bankası koda geçişi |
| docs/raporlar/kesif/icerik-kalitesi-2026-09-23.md:215 | PS-A1 | ⚠️ | tam | Bekleyen: KARAR-10 (C), PS-A1/A3, Göç Planı |
| docs/raporlar/kesif/icerik-mutabakati-2026-09-23.md:93 | I-03 | ✅ | belirsiz | I-03'ün hangi ad setini gösterdiği TEYİT GEREK |
| docs/raporlar/kesif/icerik-mutabakati-2026-09-23.md:203 | PS-A1 | ⚠️ | tam | PS-A1 tam bu dosyaya dokunacak (eşik düzeltmesi) |
| docs/raporlar/kesif/icerik-mutabakati-2026-09-23.md:206 | I-02 | ✅ | tam | Kod işi I-02'de (🟢, BEKLIYOR) |
| docs/raporlar/kesif/icerik-mutabakati-2026-09-23.md:332 | PS-A1 | ⚠️ | tam | PS-A1 (ölçek düzeltme) tam bu dosyaya dokunacak |
| docs/raporlar/kesif/icerik-mutabakati-2026-09-23.md:412 | PS-A1 | ⚠️ | tam | PS-A1'den ÖNCE cevaplanmalı (aynı dosya) — BEKLIYOR |
| docs/raporlar/kesif/icerik-mutabakati-2026-09-23.md:586 | I-02 | ✅ | tam | Kart sırası: kalan yalnız kod (I-02) |
| docs/raporlar/kesif/icerik-mutabakati-2026-09-23.md:596 | I-03 | ✅ | belirsiz | I-03 sonuç ekranında hangi konu adı setini gösteriyor: TEYİT GEREK |
| docs/raporlar/kesif/icerik-tam-okuma-2026-09-23.md:649 | PS-02 | ⚠️ | belirsiz | Cevap vermezsen: md.162,168,169, PS-02 bağlanamaz |
| docs/raporlar/kesif/kod-inceleme-teyit-dogrulamasi-2026-09-26.md:22 | U-08 | ⚠️ | tam | U-08 BITTI ama yalnız eşleştirme uçlarını kapsıyor |
| docs/raporlar/kesif/kod-inceleme-teyit-dogrulamasi-2026-09-26.md:23 | GV-10 | 🔁 | tam | GV-10 BITTI ama yalnız kullanıcı düzeyinde, kapsama girmedi |
| docs/raporlar/kesif/kod-inceleme-teyit-dogrulamasi-2026-09-26.md:35 | YN-09 | ⚠️ | tam | D8: 09-DURUM güncellenmemiş; YN-09/YN-10 yalnız taşıma/atıf |
| docs/raporlar/kesif/kod-inceleme-teyit-dogrulamasi-2026-09-26.md:35 | YN-10 | ⚠️ | tam | D8: 09-DURUM güncellenmemiş; YN-09/YN-10 yalnız taşıma/atıf |
| docs/raporlar/kesif/kod-inceleme-teyit-dogrulamasi-2026-09-26.md:41 | GV-10 | 🔁 | tam | GV-10 kanıtında adı geçmiş ama düzeltilmemiş |
| docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md:41 | U-08 | ⚠️ | tam | 17 BEKLIYOR listesinde: ...U-08... |
| docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md:41 | F-04 | ⚠️ | tam | 17 BEKLIYOR listesinde: ...F-04... |
| docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md:41 | F-23 | ⚠️ | tam | 17 BEKLIYOR listesinde: ...F-23... |
| docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md:41 | K-14 | ⚠️ | tam | 17 BEKLIYOR listesinde: ...K-14... |
| docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md:41 | V-05 | ✅ | tam | 17 BEKLIYOR listesinde: ...V-05... |
| docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md:41 | V-06 | ✅ | tam | 17 BEKLIYOR listesinde: ...V-06... |
| docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md:41 | Y-02 | ✅ | tam | 17 BEKLIYOR listesinde: ...Y-02... |
| docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md:41 | P-16 | ✅ | tam | 17 BEKLIYOR listesinde: ...P-16... |
| docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md:162 | F-04 | ⚠️ | tam | asıl açık kalan nokta TenantSwitcher.tsx:198 (F-04 ek bulgu) |
| docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md:320 | U-08 | ⚠️ | tam | G-10 BEKLIYOR: PENDING menti onaylı mentörleri görebiliyor (U-08 ek bulgu) |
| docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md:356 | F-04 | ⚠️ | tam | G-?? BEKLIYOR: TenantSwitcher.tsx allowlist atlanıyor (F-04 ek bulgu) |
| docs/raporlar/kesif/konsey-icerik-kalitesi-E-arastirma-brifleri-2026-09-23.md:49 | PS-A1 | ⚠️ | tam | Bekleyen: KARAR-10=C → PS-A1 (ölçek düzelt)·PS-A2·PS-A3 |
| docs/raporlar/kesif/konsey-icerik-kalitesi-E-arastirma-brifleri-2026-09-23.md:276 | PS-A1 | ⚠️ | tam | Bekleyen: PS-A1 (ölçek düzelt + test yaz) |
| docs/raporlar/kesif/konsey-icerik-kalitesi-E-arastirma-brifleri-2026-09-23.md:293 | PS-A1 | ⚠️ | tam | PS-A1'e ek madde: payda düzeltmesi + test yazılır (henüz yok) |
| docs/raporlar/kesif/panel-denetimi-mentor-menti-2026-09-19.md:225 | K-09 | ✅ | belirsiz | 09-DURUM çelişkisi: K-09 CANLIDA ↔ Menti ⬜ (sıradaki) |
| docs/raporlar/kesif/persona-panel-gelisimi-2026-09-23.md:325 | I-02 | ✅ | tam | Bazı işler merge bekliyor (I-02) |
| docs/kararlar/00-KART-INDEKSI.md:32 | Y-02 | ✅ | tam | G1-03 / listPendingTenants audit izi / ❓ / md.94 / — / G-kartı |
| docs/kararlar/00-KART-INDEKSI.md:43 | F-06 | ⚠️ | tam | G1-14 / Kalibrasyon audit ateşle-unut / ❓ / md.98 / F-06 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:52 | F-04 | ⚠️ | tam | G1-23 / logoUrl XSS koruması / ⬜ / — / F-04 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:52 | AJ-05 | ⚠️ | tam | G1-23 / logoUrl XSS koruması / ⬜ / — / F-04 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:57 | K-14 | ⚠️ | belirsiz | G1-28 / Sunucu/altyapı sertleştirme / ⬜ / **madde 120** / K-14 · KARAR-18 / KUYR |
| docs/kararlar/00-KART-INDEKSI.md:87 | AJ-08 | ⚠️ | tam | G3-09 / Güvenli sertifika seed runner / ⬜ / md.73 / K-16 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:102 | F-10 | ✅ | tam | G4-01 / Havuz KART görünümü rol-bazlı / ⬜ / KARAR-2 / F-10 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:106 | F-23 | ⚠️ | tam | G4-05 / adminSettings zayıf izolasyon / ⬜ / — / F-23 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:109 | F-24 | ✅ | tam | G4-08 / Platform drill-down yok / ⬜ / md.77 / F-24 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:115 | F-25 | ⚠️ | tam | G4-14 / Sistem sağlığı mail-göstergesi / 🟡 / — / F-25 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:117 | AN-39 | ✅ | tam | G4-16 / user-reports sayfalama yok / ⬜ / — / — / G-kartı |
| docs/kararlar/00-KART-INDEKSI.md:118 | F-26 | ✅ | tam | G4-17 / PLATFORM_ADMIN_EMAIL .env.example / ⬜ / — / F-26 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:123 | F-15 | ⚠️ | tam | G4-22 / Menti "bekleme anı" / ⬜ / Y1 / F-15 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:124 | F-15 | ⚠️ | belirsiz | G4-23 / Umut sinyali / sosyal-kanıt / ⬜ / Y1 / F-15 · P-06 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:125 | F-16 | ✅ | tam | G4-24 / Menti "özgüven aşısı" sunumu / ⬜ / — / F-16 · P-03 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:125 | P-03 | ✅ | tam | G4-24 / Menti "özgüven aşısı" sunumu / ⬜ / — / F-16 · P-03 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:126 | P-05 | 👁 | belirsiz | G4-25 / Reddi yumuşat + kutlama / ⬜ / Y2 / F-17 · P-05 · KARAR-20/22 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:129 | P-14 | 👁 | belirsiz | G4-28 / Mentör "kendi etkim" yuvası / 🟡 / md.78 / P-14 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:131 | F-18 | ✅ | tam | G4-30 / Yönetici rapor EXPORT / ⬜ / Y3 / F-18 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:132 | F-19 | ✅ | tam | G4-31 / Proaktif kırmızı uyarı / 🟡 / Y4 / F-19 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:140 | F-22 | ⚠️ | tam | G4-39 / "Görüşme tamamladım" paylaşım kartı / 🟡 / — / F-22 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:148 | F-20 | ⚠️ | tam | G5-04 / Bekleme salonu bildirim izni / ⬜ / — / F-20 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:150 | P-10 | 👁 | belirsiz | G5-06 / Mentör bildirim ritmi / ⬜ / — / P-10 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:156 | F-27 | 🔁 | tam | G6-01 / N+1 konuşma listesi / ⬜ / md.48 / F-27 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:156 | AJ-06 | ⚠️ | tam | G6-01 / N+1 konuşma listesi / ⬜ / md.48 / F-27 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:160 | F-28 | ⚠️ | tam | G6-05 / Sayfa metni merkezileştirme / ⬜ / md.47/C17 / F-28 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:161 | Y-03 | ⚠️ | belirsiz | G6-06 / Temiz-kod borcu / ⬜ / md.47 / — / G-kartı |
| docs/kararlar/00-KART-INDEKSI.md:167 | F-21 | 👁 | tam | G7-01 / Ekran-okuyucu düzeltmeleri / ⬜ / md.50 / F-21 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:168 | AJ-07 | ✅ | tam | G7-02 / DISC kontrast (WCAG) / ⬜ / md.64 / F-21 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:169 | F-29 | 🔁 | belirsiz | G7-03 / SEO teknik paketi / ⬜ / md.51-55 / F-29 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:174 | Y-10 | 👁 | belirsiz | G7-08 / Kurumsal sayfalar + JSON-LD / ⬜ / md.57-63 / — / G-kartı |
| docs/kararlar/00-KART-INDEKSI.md:174 | Y-06 | ⚠️ | belirsiz | G7-08 / Kurumsal sayfalar + JSON-LD / ⬜ / md.57-63 / — / G-kartı |
| docs/kararlar/00-KART-INDEKSI.md:175 | AJ-07 | ✅ | tam | G7-09 / WCAG 2.1 AA bütünsel / ⬜ / md.64 / F-21 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:185 | K-04 | ✅ | belirsiz | G8-01 / Fotoğraf kalıcı disk (volume) / ⬜ / A22 / K-04 · KARAR-18 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:186 | K-04 | ✅ | belirsiz | G8-02 / Ortam değişkeni teyidi / ⬜ / — / K-04 · KARAR-18 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:197 | F-32 | ✅ | tam | G8-13 / Sekme geçiş yavaşlığı / ❓ / E17/B10 / F-32 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:198 | F-33 | 👁 | tam | G8-14 / Sol-alt kullanıcı kartı / ❓ / B12 / F-33 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:223 | E-1 | ⚠️ | belirsiz | G10-01 / Kesin-ölü kod bloğu / 🟡 / md.44 / K-13 · E-1..E-5 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:223 | E-2 | ✅ | belirsiz | G10-01 / Kesin-ölü kod bloğu / 🟡 / md.44 / K-13 · E-1..E-5 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:244 | F-30 | ✅ | tam | G10-22 / LoginForm "Sprint 14" yorum / ❓ / — / F-30 / KUYRUK |
| docs/kararlar/00-KART-INDEKSI.md:51 | V-05 | ✅ | belirsiz | G1-22 / k-anonimlik metrik yuvarlama / ⬜ / **madde 119** / — / G-kartı |
| docs/kararlar/00-KART-INDEKSI.md:54 | GV-06 | ✅ | belirsiz | G1-25 / createMeeting kapsamsız findUnique / ❓ / — / — / G-kartı |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:45 | G1-06 | 🟨 S2 → F-02 (🟡, PO kısmı 03-PO #16 avukattan süre) · KARAR-47 | tam | Message (kullanıcı mesajı) otomatik imhası yok |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:46 | G1-08 | 🟨 S2 → AN-30 (🔵, KARAR-96) · 03-PO #17 | tam | OAuth'ta açık rıza UI yok + KVKK/18+ tek kutu |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:47 | G1-09 | 🟨 S2 → KARAR-18 (PO-manuel liste: G1-09 destek@ kutusu) · KARAR-47/AN-41 (metin) | tam | destek@ KVKK başvuru kanalı (ekran ayağı canlı, adres/kutu yok) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:48 | G1-10 | 🟨 S2 → KARAR-18 · KARAR-47 · AN-41 (🟡) | tam | Aydınlatma metninde eksik veri kategorileri (mesaj, sosyal, OCEAN, SJT, telefon) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:49 | G1-12 | 🟨 S2 → AN-36 (🟡) | tam | Veri İşleyen Sözleşmesi — kurum yasal kimlik alanları yok |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:50 | G1-13 | 🟨 S2 → AN-29 · 03-PO A7 · KARAR-18 | tam | Kulüp tipi kurum aktif + aydınlatmada imza/temsil yetkisi beyanı |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:51 | G1-15 | 🟨 S2 → F-07 (🔴 KARAR-19) | tam | SystemLog 90g imhası kalibrasyon 'son değişiklik' izini siliyor |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:53 | G1-18 | 🟨 S2 → AJ-56 (🟢 +7b) | tam | Kurum-içi rol/sayım okumaları TenantMembership'ten mi |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:54 | G1-20 | 🟨 S3 → AJ-75 | tam | findUnique tenant sızıntısını yakalayan lint kuralı yok |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:56 | G1-23 | 🟨 S2 → KARAR-112 (AJ-22 kalanı) · AJ-52 (🟢) | tam | logoUrl host/MIME allowlist + zorlayıcı CSP |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:57 | G1-24 | 🟨 S3 → AJ-73 | tam | OAuth dönüşünde accessToken URL sorgu parametresinde |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:58 | G1-25 | 🟨 S3 → AJ-74 | tam | createMeeting oryantasyon kilidi tenant-kapsamsız findUnique |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:59 | G1-26 | 🟨 S2 → F-05 (🟡) · 03-PO Turnstile maddesi | tam | Şüphe formu CAPTCHA + step-up |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:60 | G1-27 | 🟨 S3 → 03-PO #30 | tam | Prod yönetici anahtarı (PLATFORM_ADMIN_KEY) rotasyonu |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:62 | G1-29 | 🟨 S2 → AN-37 (🔴 KARAR-74) | tam | Kurum kalıcı silme (yalnız freeze var) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:63 | G1-30 | 🟨 S2 → Y-12 | tam | Çerez izni bandı (Consent Mode v2) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:86 | G2-06 | 🟨 S3 → AJ-79 | tam | 'Varsayılana düşen profil oranı' metriği yok |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:87 | G2-07 | 🟨 S2 → F-11 (🔴 KARAR-61) | tam | OCEAN/SJT canlı eşleştirmede okunmuyor |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:88 | G2-08 | 🟨 S2 → F-11 (🔴 KARAR-61) | tam | sector-scorer uyuyor (canlıya bağlı değil) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:89 | G2-09 | 🟨 S3 → AJ-80 | tam | CORE eşiği iki yolda farklı (5 ↔ coreCount) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:91 | G3-01 | 🟨 S2 → I-01 · AN-04 | tam | DISC'e özel 'mentiye yaklaşım' içeriği gösterilmiyor |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:96 | G3-07 | 🟨 S2 → F-09 (🔴 KARAR-57) | tam | SJT senaryo 3→4 mü, belge düzeltme mi |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:97 | G3-08 | 🟨 S2 → P-99 (🔴 KARAR-46) → K-16 | tam | Sertifika seed ↔ canlı (20 ↔ ~5) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:98 | G3-09 | ✅ S1 — AJ-08 (BITTI, arsiv/00-KUYRUK-bitti-2026-09.md:371) | tam | Güvenli sertifika seed runner (npm komutu) yok |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:99 | G3-10 | 🟨 S3 → 03-PO #31 | tam | 68 soruluk PO inceleme belgesi boş |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:102 | G3-13 | 🟨 S2 → F-12 (🔴 KARAR-21) | tam | Kurum sorusu cevap tipi (answerType) yok |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:103 | G3-14 | 🟨 S2 → AJ-11 (🔴 KARAR-103) | tam | İçerik felsefesi gözlemleri (ters kodlu soru vb.) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:104 | G3-15 | 🟨 S2 → AN-02 (🔵 KARAR-99) | tam | Soru metni yazım hataları ('güçlüğüm', 'Menteen') |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:105 | G3-16 | 🟨 S2 → K-18 · K-16 · 03-PO C11 | tam | Global içerik seed'i ana DB'de dolu mu |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:106 | G3-17 | 🟨 S2 → K-18 (KARAR-5) · I-17 · P-08 | tam | Öğrenme yolculuğu kalan uçları (DISC ton + içerik onayı + uçtan uca) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:128 | G4-01 | 🟨 S3 → AJ-81 (yönetici kartı AJ-63 · mentör tarafı AJ-64) | tam | Havuz KART görünümü |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:130 | G4-05 | ✅ S1 — F-23 + AJ-44 (BITTI) | tam | adminSettings izolasyon deseni |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:132 | G4-08 | ✅ S1 — F-24 (BITTI) | tam | Platform tek-kullanıcı drill-down |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:133 | G4-09 | 🟨 S2 → E-4 (🔵) · KARAR-11 | tam | Mükerrer /api/super-admin API |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:135 | G4-11 | ⚪ S5 — PO v1'i yeterli saydı; v2 bugünkü ürün yönünde istenmiyor (AJ-11 listesine de alınmadı). (PO teyit listesinde) | tam | Anomali tespiti v2 + alarm bandı |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:136 | G4-12 | 🟨 S2 → AJ-11 (🔴 KARAR-103) | tam | Platform büyüme trendi |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:137 | G4-13 | 🟨 S2 → AJ-11 (🔴 KARAR-103) | tam | Platform ayarlar UI |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:139 | G4-15 | 🟨 S2 → AN-38 (🔴 KARAR-87) | tam | reviewedBy='platform-admin' sabit |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:140 | G4-16 | ✅ S1 — AN-39 (BITTI) | tam | user-reports 200 tavanı |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:141 | G4-17 | ✅ S1 — — (canlı teyit: 03-PO #19) | tam | PLATFORM_ADMIN_EMAIL .env.example'da |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:143 | G4-19 | 🟨 S2 → AJ-11 (🔴 KARAR-103) | tam | Premium/Tenant.plan limitleri |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:144 | G4-22 | 🟨 S3 → AJ-82 | tam | Menti bekleme anı |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:145 | G4-23 | 🟨 S2 → AN-21 (🔴 KARAR-56) | tam | Umut sinyali / sosyal kanıt ('N kişi bekliyor' yok) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:146 | G4-24 | ✅ S1 — F-16 (BITTI; bitti-dogrulama ✅) | tam | Menti özgüven sunumu |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:147 | G4-25 | ✅ S1 — P-05 (BITTI) · AJ-33 (BITTI) | tam | Reddi yumuşat + küçük kutlama |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:148 | G4-26 | 🟨 S2 → AJ-11 (🔴 KARAR-103) | tam | Mentör rozet çeşitliliği |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:149 | G4-27 | 🟨 S2 → P-15 (🔴 KARAR-41) | tam | Mentör kapasite sınırı |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:151 | G4-29 | 🟨 S2 → AJ-11 (🔴 KARAR-103) | tam | Mentör sektör filtresi |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:152 | G4-30 | 🟨 S3 → AJ-78 | tam | Yönetici rapor export |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:153 | G4-31 | ✅ S1 — F-19 (BITTI; bitti-dogrulama ✅) | tam | Proaktif kırmızı uyarı |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:154 | G4-32 | 🟨 S2 → AJ-11 (🔴 KARAR-103) | tam | STK zaman serisi KPI |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:155 | G4-33 | 🟨 S2 → AJ-11 (🔴 KARAR-103) · KARAR-17 | tam | Yönetici önizleme-demo |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:157 | G4-35 | 🟨 S2 → AJ-11 (🔴 KARAR-103) | tam | Member persona şablon ekranı |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:159 | G4-37 | 🟨 S2 → AJ-11 (🔴 KARAR-103) | tam | Kurum sosyal kanıt duvarı + Etki kartı |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:160 | G4-38 | 🟨 S2 → AJ-11 (🔴 KARAR-103) · bireyden kuruma ayağı → KARAR-125 | tam | Ters çekim büyüme kanalı (kurumdan kuruma davet) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:162 | G5-01 | 🟨 S2 → DK-02 (🟡) · 03-PO B5 | tam | Kurum mail bayrağını açma |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:164 | G5-04 | 🟨 S2 → AJ-39 (🟢) | tam | Bekleme salonu bildirim izni |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:165 | G5-05 | 🟨 S2 → AN-52 (🔵 KARAR-106) | tam | Ürün geri bildirim mekanizması |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:166 | G5-06 | 🟨 S2 → AJ-11 (🔴 KARAR-103) | tam | Mentör bildirim ritmi |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:167 | G5-07 | 🟨 S2 → AJ-11 (🔴 KARAR-103) | tam | Gerçek push (Expo/FCM) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:185 | G6-01 | 🟨 S3 → AJ-83 | tam | N+1 konuşma listesi + sayfalama |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:186 | G6-02 | 🟨 S3 → AJ-77 (🔵) | tam | String→enum dönüşümü + çift rol (User.role ↔ TenantMembership.role) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:187 | G6-03 | 🟨 S2 → AN-37 (🔴 KARAR-74) | tam | onDelete stratejisi / dolu kurum silme |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:189 | G6-05 | 🟨 S2 → AJ-41 (🟢) | tam | Sayfa metni merkezileştirme |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:190 | G6-06 | 🟨 S2 → AJ-43 (🟢) | tam | validate() + cookie helper + PII-select |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:191 | G6-07 | ✅ S1 — Faz1 (00-KUYRUK.md:258 G6-07 ✅) | tam | Kullanılmayan 5 @radix-ui paketi |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:192 | G7-01 | 🟨 S3 → AJ-84 | tam | Ekran okuyucu noktasal düzeltmeler |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:193 | G7-02 | ✅ S1 — AJ-07 (BITTI) | tam | DISC renkleri açık temada kontrast |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:194 | G7-03 | 🟨 S2 → AJ-47 (🟢) | tam | SEO teknik paketi |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:195 | G7-04 | ✅ S1 — Faz3 (00-KUYRUK.md:259 G7-04 ✅) | tam | www → apex 301 |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:196 | G7-05 | 🟨 S2 → Y-12 | tam | GTM/GA4/Clarity kodu |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:199 | G7-08 | 🟨 S2 → Y-07 · Y-11 (🔴 KARAR-88) | tam | Kurumsal sayfalar + footer/nav/yukarı-çık/WhatsApp/JSON-LD |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:200 | G7-09 | 🟨 S3 → AJ-85 | tam | WCAG 2.1 AA bütünsel denetim |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:201 | G7-10 | 🟨 S3 → AJ-86 | tam | Landing UX paketi (tooltip, 'i' ikonu, gri kontrast, AlgorithmBento, mobil) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:202 | G7-11 | 🟨 S3 → AJ-86 | tam | Landing koyu/açık tema seçimi |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:204 | G7-13 | 🟨 S3 → AJ-86 | tam | Yumuşak lacivert landing teması (kod) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:205 | G7-14 | 🟨 S3 → AJ-83 | tam | Konuşma listesi sanallaştırma |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:206 | G8-01 | 🟨 S2 → 03-PO A1 (#1) · KARAR-18 | tam | Foto kalıcı disk (volume) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:207 | G8-02 | 🟨 S2 → 03-PO A1/B6/B7 · KARAR-18 | tam | UPLOAD_DIR + BACKEND_URL/NEXT_PUBLIC_API_URL teyidi |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:208 | G8-03 | 🟨 S2 → 03-PO #14 | tam | Chat canlı uçtan uca test |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:209 | G8-04 | 🟨 S2 → 03-PO #15 | tam | Mentör paneli metrikleri canlı gözlem |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:211 | G8-06 | 🟨 S2 → KARAR-18 (PO-manuel liste) | tam | Birleşmiş dal/worktree temizliği |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:212 | G8-07 | 🟨 S3 → KARAR-118 | tam | Staging ortamı |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:215 | G8-10 | ✅ S1 — AN-07 (BITTI 2026-09-26; bitti-dogrulama ✅) | tam | Eşleştirme önbelleği yok + take:500 |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:216 | G8-11 | 🟨 S3 → AJ-76 (🟡) | tam | Rate limiter bellek içi (Redis yok) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:217 | G8-12 | 🟨 S2 → AN-06 (🟢) | tam | Cron çok-instance çift çalışma |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:237 | G9-06 | 🟨 S2 → F-01 (🟢) | tam | durum-panosu tarihli ad tarihsizleştir |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:239 | G9-11 | 🟨 S2 → F-01 (🟢) | tam | 5 taşıyıcı belge + 38 referans reorg |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:240 | G9-12 | 🟨 S2 → F-01 (🟢) | tam | Büyük belge reorg (~68 belge) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:241 | G10-01 | 🟨 S2 → E-4 (🔵) · KARAR-11 | tam | MeetingScheduler bağlanmamış (mükerrer) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:242 | G10-02 | 🟨 S2 → E-4 (🔵) · KARAR-11 · silme protokolü (karantina) | tam | VisibilityOptIn.requestMessage DROP |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:243 | G10-03 | 🟨 S2 → E-4 (🔵) | tam | matchingInterface.ts (Job Board) bağlanmamış |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:244 | G10-04 | 🟨 S2 → E-4 (🔵) | tam | Checkpoint cron LOG-ONLY |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:245 | G10-05 | 🟨 S2 → AJ-14 (🔴 KARAR-110) · E-4 | tam | Feedback alanları (engagement/goalClarity/periodic*) yazılmıyor |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:246 | G10-06 | 🟨 S2 → E-4 (🔵) · KARAR-78 | tam | ContextualFeedbackHost/MeetingProvider mount edilmemiş |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:250 | G10-12 | 🟨 S2 → KARAR-9 | tam | /clubs ön yüze bağla (PO: aktif) |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:252 | G10-14 | 🟨 S2 → KARAR-16 · E-4 | tam | /rematch admin FE aksiyonu yok |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:253 | G10-15 | 🟨 S2 → E-4 (🔵) | tam | Toplu /questions/respond kullanılmıyor |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:254 | G10-18 | 🟨 S2 → E-4 (🔵) | tam | enneagramWing tüketicisi yok |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:255 | G10-20 | 🟨 S2 → AJ-10 (🔴 KARAR-15/36) · E-4 | tam | 5-dosya yarım-özellik demeti |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:256 | G10-21 | 🟨 S2 → F-11 (🔴 KARAR-61) | tam | taxonomy/IndustryNode skorlamada yok |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:258 | G11-01 | ⚪ S5 — PO sırayı onayladı ve yıllara erteledi; açık iş/karar değil. (PO teyit listesinde) | tam | Modül sırası vizyonu |
| docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:259 | G11-02 | 🟨 S2 → KARAR-70 → AN-52 · AN-29 · gelir kanalı → KARAR-119 | tam | Gelir modeli + pilot + kullanıcı görüşmesi |
| docs/raporlar/kesif/erisilebilirlik-denetimi-2026-09-27.md:25 | AJ-07 kalanı | 🟨 S3 → 03-PO #32 | tam | Ekran okuyucuyla (VoiceOver/NVDA) gerçek gezinme testi hiç yapılmadı |
| docs/raporlar/kesif/csp-zorunlu-mod-hazirlik-2026-09-27.md:123 | AJ-22 kalanı | ✅ S1 — kodda + testte (bkz. rapor) | tam | Frontend X-Frame-Options göndermiyor (clickjacking) — ayrı bağımsız iş |
| docs/raporlar/kesif/csp-zorunlu-mod-hazirlik-2026-09-27.md:139 | AJ-22 kalanı | 🟨 S2 → AJ-22 · AJ-52 · KARAR-112 · 03-PO kabul testi 13 | tam | CSP zorunlu moda geçiş adımları 3-5 (enforce + smoke: logo, OAuth, next/image avatar, branding) |
| docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:21 | Big Five ayrı açık rıza (G1-11) | 🟨 S2 → AN-30 · KARAR-96 (🔵) | tam | Big Five kişilik profili ayrı açık rıza gerektirebilir |
| docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:46 | Eski kvkkConsentAt alanının kaldırılması | 🟨 S3 → AJ-88 (platform göstergesi) + eski alan kaldırma silme protokolü adayı | tam | Eski kvkkConsentAt (User/Tenant) alanı kaldırılması ayrı/sonraki iş |
| docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:88 | G1-08 OAuth rıza gösterimi + tipli yazım | 🟨 S2 → AN-30 · KARAR-96 · 03-PO #17 | tam | G1-08: OAuth rıza gösterimi + tipli yazım |
| docs/kararlar/konu/chat-v1-teslim.md:67 | VisibilityOptIn.requestMessage ölü alan | 🟨 S3 → silme protokolü adayı (E-4 karantina; G10-02 ile aynı) | tam | kolon DROP ayrı PO-onaylı temizlik turu |
