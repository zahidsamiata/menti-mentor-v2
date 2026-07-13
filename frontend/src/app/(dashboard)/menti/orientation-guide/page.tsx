'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';

type Choice = { key: string; label: string; outcome: 'correct' | 'warn' | 'wrong'; feedback: string };
type Scenario = { id: number; scene: string; question: string; choices: Choice[] };

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    scene: 'İlk görüşme gününüz. Mentorunuzla 30 dakikanız var.',
    question: 'İlk buluşmada ne yaparsınız?',
    choices: [
      { key: 'A', label: 'Hemen somut bir iş veya staj fırsatı istersiniz.', outcome: 'wrong', feedback: 'İlk görüşmede doğrudan iş istemek ilişkiyi başlamadan bitirir. Güven inşa etmek önce gelir.' },
      { key: 'B', label: 'Kendinizi tanıtır, hedeflerinizi paylaşır ve mentorunuzun deneyimini dinlersiniz.', outcome: 'correct', feedback: 'Doğru! İlk görüşme bir keşif oturumudur. Birbirinizi tanıyın, beklentileri netleştirin.' },
      { key: 'C', label: 'Hazırladığınız uzun bir soru listesini hızlıca bitirmeye çalışırsınız.', outcome: 'warn', feedback: 'Sorular hazırlamak iyi — ama hepsini bitirmek zorunda değilsiniz. İki yönlü bir sohbet olsun.' },
    ],
  },
  {
    id: 2,
    scene: 'Görüşme sabahı yoğun hissediyorsunuz. Hazırlık yapmaya vaktiniz olmadı.',
    question: 'Ne yaparsınız?',
    choices: [
      { key: 'A', label: 'Görüşmeye girer, hazır olmadığınızı söylemezsiniz — her şey yolunda gibi davranırsınız.', outcome: 'wrong', feedback: 'Hazırlıksız gelip bunu gizlemek güveni zedeler. Mentorunuz fark eder.' },
      { key: 'B', label: 'Görüşmeyi iptal eder, bir daha aynı durumun yaşanmaması için plan yaparsınız.', outcome: 'warn', feedback: 'Bazen zorunlu olabilir — ama sık sık iptal etmek sinyaldir. Bir sonraki adım planını paylaşın.' },
      { key: 'C', label: 'Kısa bir mesajla "bugün hazırlığım yetersiz kaldı, en temel soruyu sorabileceğim" diyerek görüşürsünüz.', outcome: 'correct', feedback: 'Dürüstlük en güçlü hazırlıktır. Mentorunuz bu iletişimi takdir eder.' },
    ],
  },
  {
    id: 3,
    scene: 'Mentorunuz sizi kendi hayatından uzun bir hikâye anlatmaya başladı.',
    question: 'Mentorunuz kendi hikâyesini anlatırken ne yaparsınız?',
    choices: [
      { key: 'A', label: 'Kibarca not alır, ardından "sizden öğrenmek istediğim şey şu" diye konuşmayı yönlendirirsiniz.', outcome: 'correct', feedback: 'Doğru! Dinlemek saygıdır — ama gündemini de sahiplenmek senin işin.' },
      { key: 'B', label: 'Sözünü keser, kendi sorularınıza geçmesini istersiniz.', outcome: 'wrong', feedback: 'Mentoru kesmek ilişkiye zarar verir. Sabırla dinleyin, doğal ara noktada yönlendirin.' },
      { key: 'C', label: 'Tamamen pasif dinler, hiç soru sormaz, gündem boşa gider.', outcome: 'warn', feedback: 'Pasif kalmak fırsatı kaçırır. Her 10 dakikada bir bağlantı sorusu sorun.' },
    ],
  },
  {
    id: 4,
    scene: 'Görüşme sonunda mentorunuz "sana yardımcı olabilirim" dedi.',
    question: 'Bu söz için ne yaparsınız?',
    choices: [
      { key: 'A', label: 'Teşekkür eder, bir sonraki görüşme için somut bir soru hazırlayacağınızı söylersiniz.', outcome: 'correct', feedback: 'Harika! Belirsiz "yardım" vaadi somut takiple anlam kazanır.' },
      { key: 'B', label: 'Hemen büyük bir favor istersiniz: "o zaman şu kişiyle beni tanıştırır mısınız?"', outcome: 'wrong', feedback: 'Henüz ilişki kurulmadı. Büyük istekler güven olmadan çalışmaz.' },
      { key: 'C', label: 'Bir şey söylemez, sözü "zaten bilgi verdi, tamam" diye yorumlarsınız.', outcome: 'warn', feedback: 'Vaatten habersiz kalmak fırsatı öldürür. Her vaadi somutlaştırın.' },
    ],
  },
];

const OUTCOME_STYLE: Record<Choice['outcome'], { badge: string; icon: string }> = {
  correct: { badge: 'bg-green-100 text-green-800 border-green-300', icon: '✅' },
  warn:    { badge: 'bg-amber-100 text-amber-800 border-amber-300',  icon: '⚠️' },
  wrong:   { badge: 'bg-red-100 text-red-800 border-red-300',        icon: '❌' },
};

export default function OrientationGuidePage() {
  const { user } = useAuth();
  const api = useApiClient();
  const router = useRouter();

  const [current, setCurrent]     = useState(0);
  const [selected, setSelected]   = useState<string | null>(null);
  const [revealed, setRevealed]   = useState(false);
  const [completing, setCompleting] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const scenario = SCENARIOS[current];
  const isLast   = current === SCENARIOS.length - 1;
  const done     = current >= SCENARIOS.length;

  function choose(key: string) {
    if (revealed) return;
    setSelected(key);
    setRevealed(true);
  }

  function next() {
    setSelected(null);
    setRevealed(false);
    setCurrent((c) => c + 1);
  }

  async function complete() {
    setCompleting(true);
    setError(null);
    const res = await api('/api/users/me/orientation-completed', { method: 'POST' });
    setCompleting(false);
    if (res.ok) {
      router.push('/menti');
    } else {
      setError('Tamamlama işlemi başarısız oldu. Lütfen tekrar deneyin.');
    }
  }

  if (!user || user.role !== 'MENTI') return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in py-6">
      <div>
        <h1 className="text-2xl font-bold">Görüşme Rehberi</h1>
        <p className="text-sm text-muted-foreground mt-1">
          4 kısa senaryo — tamamlayınca görüşme kilidi otomatik kaldırılır.
        </p>
      </div>

      {/* İlerleme */}
      {!done && (
        <div className="flex items-center gap-2">
          {SCENARIOS.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i < current ? 'bg-primary' : i === current ? 'bg-primary/50' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      )}

      {/* Senaryo */}
      {!done && scenario && (
        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit text-xs mb-1">
              {current + 1} / {SCENARIOS.length}
            </Badge>
            <CardTitle className="text-base leading-snug">
              🎬 Sahne: {scenario.scene}
            </CardTitle>
            <p className="text-sm font-medium mt-2">{scenario.question}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {scenario.choices.map((c) => {
              const isSelected = selected === c.key;
              const style = OUTCOME_STYLE[c.outcome];
              return (
                <button
                  key={c.key}
                  onClick={() => choose(c.key)}
                  disabled={revealed}
                  className={`w-full text-left rounded-xl border p-3 text-sm transition-all ${
                    revealed && isSelected
                      ? `${style.badge} border`
                      : revealed
                      ? 'opacity-40 cursor-default border-border bg-muted'
                      : 'border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer'
                  }`}
                >
                  <span className="font-semibold mr-2">{c.key})</span>
                  {revealed && isSelected && <span className="mr-1">{style.icon}</span>}
                  {c.label}
                  {revealed && isSelected && (
                    <p className="mt-2 text-xs opacity-90">{c.feedback}</p>
                  )}
                </button>
              );
            })}

            {revealed && (
              <div className="pt-2 flex justify-end">
                {isLast ? (
                  <Button onClick={() => setCurrent(SCENARIOS.length)} size="sm">
                    Tamamla →
                  </Button>
                ) : (
                  <Button onClick={next} size="sm" variant="outline">
                    Sonraki →
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tamamlandı ekranı */}
      {done && (
        <Card className="border-green-300 bg-green-50 dark:bg-green-950/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="text-4xl">🎉</div>
            <h2 className="text-lg font-semibold">Harika! Rehberi tamamladınız.</h2>
            <p className="text-sm text-muted-foreground">
              Görüşme kilidi kaldırılıyor ve yeni görüşme alabileceksiniz.
            </p>
            {error && <AlertMessage type="error" message={error} />}
            <Button onClick={complete} disabled={completing}>
              {completing ? 'Kaydediliyor…' : 'Görüşmelere Dön'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
