import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası — MentiMentor',
};

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Gizlilik Politikası</h1>
          <p className="text-sm text-muted-foreground">Son güncelleme: Temmuz 2026</p>
        </header>

        <section className="space-y-6">

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">1. Topladığımız Bilgiler</h2>
            <p className="text-muted-foreground leading-relaxed">
              Platforma kayıt sırasında ad-soyad, e-posta ve şifre bilgileriniz alınır. Profil
              tamamlama sürecinde sektör etiketleri, beceriler ve deneyim bilgileri eklenir.
              DISC testi yanıtlarınız algoritmik eşleşme amacıyla saklanır.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">2. Bilgileri Nasıl Kullanıyoruz</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 leading-relaxed">
              <li>Mentör-menti eşleştirme algoritması için karakter ve sektör uyum skorlaması</li>
              <li>Kurum yöneticisine onay bildirimleri gönderme</li>
              <li>Buluşma takvimi ve geri bildirim akışlarının yönetimi</li>
              <li>Platform performansını iyileştirmek için anonim aggregate analizler</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">3. Bilgi Paylaşımı</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kişisel bilgileriniz satılmaz, kiralanmaz veya reklam amaçlı kullanılmaz.
              Paylaşım yalnızca şu kapsam ile sınırlıdır:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 leading-relaxed">
              <li>Bağlı bulunduğunuz kurum yöneticisi (rol gereği)</li>
              <li>Eşleşme sonrası karşı taraf (yalnızca opt-in onayından sonra)</li>
              <li>Yasal yükümlülük gerektiren hâller</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">4. Veri Güvenliği</h2>
            <p className="text-muted-foreground leading-relaxed">
              Şifreler bcrypt ile hash&apos;lenerek saklanır. JWT token&apos;ları kısa ömürlüdür (1 saat).
              Refresh token&apos;lar 7 gün geçerliliğini korur ve tek kullanımlıktır. Tüm bağlantılar
              HTTPS üzerinden şifrelenir.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">5. Çerezler</h2>
            <p className="text-muted-foreground leading-relaxed">
              Platform; oturum yönetimi için yalnızca zorunlu çerezler kullanır. Analitik veya
              pazarlama çerezi bulunmamaktadır (rızasız, çerez gerektirmez).
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">6. Saklama ve Silme</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hesabınız aktif olduğu sürece verileriniz saklanır. Hesap silme talebiniz üzerine
              verileriniz KVKK Madde 7 uyarınca imha edilir veya anonimleştirilir. Sistem
              logları 90 gün sonra otomatik olarak silinir.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">7. İletişim</h2>
            <p className="text-muted-foreground leading-relaxed">
              Gizlilikle ilgili sorularınız veya veri silme/düzeltme talepleriniz için kurum
              yöneticiniz aracılığıyla platform desteğine ulaşabilirsiniz.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Not:</strong> Bu metin taslak niteliğindedir.
            KVKK kapsamındaki haklarınızın tamamı için{' '}
            <a href="/kvkk" className="underline text-primary hover:text-primary/80">
              KVKK Aydınlatma Metni
            </a>
            &apos;ne bakınız.
          </div>
        </section>
      </div>
    </main>
  );
}
