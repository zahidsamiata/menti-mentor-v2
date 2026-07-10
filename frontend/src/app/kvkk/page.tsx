import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni — MentiMentor',
};

export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni
          </h1>
          <p className="text-sm text-muted-foreground">Son güncelleme: Temmuz 2026</p>
        </header>

        <section className="prose prose-sm max-w-none text-foreground space-y-6">

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">1. Veri Sorumlusu</h2>
            <p className="text-muted-foreground leading-relaxed">
              MentiMentor platformu kapsamında kişisel verileriniz, 6698 sayılı Kişisel Verilerin
              Korunması Kanunu (&quot;KVKK&quot;) çerçevesinde veri sorumlusu sıfatıyla işlenmektedir.
              Platforma üye olan her sosyal girişim/dernek kendi üyelerinin verileri bakımından
              müstakil veri sorumlusu konumundadır.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">2. İşlenen Kişisel Veriler</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 leading-relaxed">
              <li>Kimlik bilgileri: ad soyad, e-posta adresi</li>
              <li>Profil bilgileri: sektör etiketleri, beceriler, eğitim ve deneyim özeti</li>
              <li>Karakter değerlendirmesi: DISC testi yanıtları ve hesaplanan vektör</li>
              <li>Eşleşme verileri: mentör-menti çiftleri, buluşma kayıtları</li>
              <li>Oturum verileri: JWT erişim token&apos;ı, yenileme token&apos;ı</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">3. İşleme Amaçları</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 leading-relaxed">
              <li>Mentör-menti eşleştirme algoritmalarının çalıştırılması</li>
              <li>Platform hizmetlerinin sunulması ve iyileştirilmesi</li>
              <li>İdari bildirimler (onay, red, buluşma hatırlatmaları)</li>
              <li>KVKK Madde 7 kapsamında saklama süreleri sonunda imha</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">4. Hukuki Dayanak</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kişisel verileriniz; açık rızanıza (KVKK Md. 5/1) ve platform hizmetinin ifası için
              zorunluluk (KVKK Md. 5/2-c) kapsamında işlenmektedir.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">5. Aktarım</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kişisel verileriniz; bağlı bulunduğunuz kurumun yöneticilerine (admin rolü) ve
              eşleştiğiniz mentör/menti ile sınırlı olarak paylaşılır. Üçüncü kişi reklamcılara
              veya pazarlama amaçlı aktarım yapılmaz.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">6. Saklama Süresi</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hesap verileriniz hesabınız aktif olduğu süre boyunca saklanır. Hesabın silinmesini
              talep etmeniz hâlinde verileriniz KVKK Madde 7 uyarınca imha edilir veya
              anonimleştirilir.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">7. Haklarınız (KVKK Madde 11)</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 leading-relaxed">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri öğrenme</li>
              <li>Eksik veya yanlış işlenmiş ise düzeltilmesini isteme</li>
              <li>Silinmesini veya yok edilmesini isteme</li>
              <li>Verilerin aktarıldığı kişilere silinme/düzeltme bildirimini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik analiz ile aleyhinize sonuç doğurmasına itiraz etme</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde tazminat talep etme</li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Not:</strong> Bu metin taslak niteliğinde olup
            platforma ait hukuki aydınlatma metninin tamamlanmış hâli yerine geçmez. Sorularınız
            için platform yöneticinizle iletişime geçiniz.
          </div>
        </section>
      </div>
    </main>
  );
}
