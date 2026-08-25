# KVKK Belge Paketi — klasör rehberi

> Bu not **iç süreç içindir** (avukata giden `.docx`'e KONULMAZ).

## Canonical kaynak vs ihraç
- **Markdown (`.md`) = CANONICAL kaynak.** Tüm düzenlemeler önce buraya işlenir.
- **`KVKK-BELGE-PAKETI-2026-08-25.docx` = TÜREV / ihraç dosyası** (avukata sunulan tek profesyonel belge). Elle düzenlenmez.

## Avukat revizyonu geldiğinde akış
1. Revizyonu ilgili `.md` dosyasına işle (canonical).
2. Word'ü yeniden üret: `python scripts/kvkk-docx-gen.py`
3. Yeni `.docx`'i doğrula (Türkçe/emoji/içindekiler/tablo/sayfa-no) ve gönder.

## Word üretimi (teknik)
- Araç: **python-docx** (`pip install python-docx`). Üretici: `scripts/kvkk-docx-gen.py`.
- Word açıldığında **İçindekiler** tablosuna sağ tık → "Alanı Güncelle" (F9) ile dolar.
- İşaretler: SARI = `[HUKUKÇU KARARI]`, GRİ = `[... DOLDURACAK]`. Onay sonrası bu işaretler kaldırılıp yeni Word üretilir.

## Belgeler (paket sırası)
`00-AVUKAT-KONTROL-DOSYASI` (kapak) · `01-aydinlatma` (platform + kurum şablonu) · `02-acik-riza` · `03-gizlilik` · `04-cerez` · `05-saklama-imha` · `06-basvuru-formu` · `07-kullanim-kosullari` · `08-veri-isleyen-sozlesmesi-sablonu`.

## Durum
⚠️ **TASLAK** — hukukçu onayı bekliyor. Ön koşullar: hukukçu onayı + `[PO DOLDURACAK]` alanları (özellikle başvuru `destek@` e-postası + teyitli sunucu ülkesi). Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md`.
