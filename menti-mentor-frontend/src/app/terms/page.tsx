import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları — MentiMentor',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Kullanım Koşulları</h1>
          <p className="text-sm text-muted-foreground">Son güncelleme: Temmuz 2026</p>
        </header>

        <section className="space-y-6">

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">1. Hizmet Kapsamı</h2>
            <p className="text-muted-foreground leading-relaxed">
              MentiMentor; sosyal girişimler ve dernekler bünyesinde mentör-menti eşleşmesini
              kolaylaştıran, çok-kiracılı (multi-tenant) bir SaaS platformudur. Platform yalnızca
              onaylı kurum üyelerine hizmet verir.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">2. Üyelik Koşulları</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 leading-relaxed">
              <li>Platforma kayıt olmak için 18 yaşını doldurmuş olmanız gerekmektedir.</li>
              <li>Kayıt sırasında doğru ve eksiksiz bilgi vermeyi kabul edersiniz.</li>
              <li>Hesabınızın güvenliğinden siz sorumlusunuz; şifrenizi kimseyle paylaşmayınız.</li>
              <li>Kurum yöneticisi onayı olmadan eşleşme sürecine dahil edilemezsiniz.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">3. Kabul Edilemez Kullanım</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 leading-relaxed">
              <li>Başka kullanıcılara ait profil veya iletişim bilgilerini izinsiz paylaşmak</li>
              <li>Platforma otomatik araçlarla (bot, scraper) yükleme yapmak</li>
              <li>Eşleşme sürecini kötüye kullanmak veya sistemi manipüle etmek</li>
              <li>Yasalara veya etik kurallara aykırı içerik paylaşmak</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">4. Sorumluluk Sınırı</h2>
            <p className="text-muted-foreground leading-relaxed">
              Platform; eşleşme başarısını, mentörlük ilişkisinin sonuçlarını veya üçüncü taraf
              bağlantılarından doğabilecek zararları garanti etmez. Hizmet &quot;olduğu gibi&quot;
              sunulmaktadır.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">5. Değişiklikler</h2>
            <p className="text-muted-foreground leading-relaxed">
              Bu koşullar önceden bildirim yapılarak güncellenebilir. Güncellemeden sonra platformu
              kullanmaya devam etmeniz, yeni koşulları kabul ettiğiniz anlamına gelir.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">6. Uygulanacak Hukuk</h2>
            <p className="text-muted-foreground leading-relaxed">
              Bu koşullar Türkiye Cumhuriyeti hukuku kapsamında yorumlanır. Uyuşmazlıklarda
              Türkiye mahkemeleri yetkilidir.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Not:</strong> Bu metin taslak niteliğindedir ve
            hukuki danışmanlık yerine geçmez. Nihai kullanım koşulları için platform yönetiminizle
            iletişime geçiniz.
          </div>
        </section>
      </div>
    </main>
  );
}
