'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import {
  ScenarioGuideEngine,
  type EngineScenario,
  type ScenarioOutcome,
} from '@/components/organisms/ScenarioGuideEngine';

// Görüşme Rehberi senaryoları — feedback gömülü (yerel çözümleme).
// Öğrenme Yolculuğu'ndan farkı: burada içerik istemci tarafında, orada API'den gelir.
type LocalChoice = { key: string; label: string; outcome: ScenarioOutcome; feedback: string };
type LocalScenario = { id: string; situationText: string; question: string; choices: LocalChoice[] };

const SCENARIOS: LocalScenario[] = [
  {
    id: '1',
    situationText: 'İlk görüşme gününüz. Mentorunuzla 30 dakikanız var.',
    question: 'İlk buluşmada ne yaparsınız?',
    choices: [
      { key: 'A', label: 'Hemen somut bir iş veya staj fırsatı istersiniz.', outcome: 'wrong', feedback: 'İlk görüşmede doğrudan iş istemek ilişkiyi başlamadan bitirir. Güven inşa etmek önce gelir.' },
      { key: 'B', label: 'Kendinizi tanıtır, hedeflerinizi paylaşır ve mentorunuzun deneyimini dinlersiniz.', outcome: 'correct', feedback: 'Doğru! İlk görüşme bir keşif oturumudur. Birbirinizi tanıyın, beklentileri netleştirin.' },
      { key: 'C', label: 'Hazırladığınız uzun bir soru listesini hızlıca bitirmeye çalışırsınız.', outcome: 'warn', feedback: 'Sorular hazırlamak iyi — ama hepsini bitirmek zorunda değilsiniz. İki yönlü bir sohbet olsun.' },
    ],
  },
  {
    id: '2',
    situationText: 'Görüşme sabahı yoğun hissediyorsunuz. Hazırlık yapmaya vaktiniz olmadı.',
    question: 'Ne yaparsınız?',
    choices: [
      { key: 'A', label: 'Görüşmeye girer, hazır olmadığınızı söylemezsiniz — her şey yolunda gibi davranırsınız.', outcome: 'wrong', feedback: 'Hazırlıksız gelip bunu gizlemek güveni zedeler. Mentorunuz fark eder.' },
      { key: 'B', label: 'Görüşmeyi iptal eder, bir daha aynı durumun yaşanmaması için plan yaparsınız.', outcome: 'warn', feedback: 'Bazen zorunlu olabilir — ama sık sık iptal etmek sinyaldir. Bir sonraki adım planını paylaşın.' },
      { key: 'C', label: 'Kısa bir mesajla "bugün hazırlığım yetersiz kaldı, en temel soruyu sorabileceğim" diyerek görüşürsünüz.', outcome: 'correct', feedback: 'Dürüstlük en güçlü hazırlıktır. Mentorunuz bu iletişimi takdir eder.' },
    ],
  },
  {
    id: '3',
    situationText: 'Mentorunuz sizi kendi hayatından uzun bir hikâye anlatmaya başladı.',
    question: 'Mentorunuz kendi hikâyesini anlatırken ne yaparsınız?',
    choices: [
      { key: 'A', label: 'Kibarca not alır, ardından "sizden öğrenmek istediğim şey şu" diye konuşmayı yönlendirirsiniz.', outcome: 'correct', feedback: 'Doğru! Dinlemek saygıdır — ama gündemini de sahiplenmek senin işin.' },
      { key: 'B', label: 'Sözünü keser, kendi sorularınıza geçmesini istersiniz.', outcome: 'wrong', feedback: 'Mentoru kesmek ilişkiye zarar verir. Sabırla dinleyin, doğal ara noktada yönlendirin.' },
      { key: 'C', label: 'Tamamen pasif dinler, hiç soru sormaz, gündem boşa gider.', outcome: 'warn', feedback: 'Pasif kalmak fırsatı kaçırır. Her 10 dakikada bir bağlantı sorusu sorun.' },
    ],
  },
  {
    id: '4',
    situationText: 'Görüşme sonunda mentorunuz "sana yardımcı olabilirim" dedi.',
    question: 'Bu söz için ne yaparsınız?',
    choices: [
      { key: 'A', label: 'Teşekkür eder, bir sonraki görüşme için somut bir soru hazırlayacağınızı söylersiniz.', outcome: 'correct', feedback: 'Harika! Belirsiz "yardım" vaadi somut takiple anlam kazanır.' },
      { key: 'B', label: 'Hemen büyük bir favor istersiniz: "o zaman şu kişiyle beni tanıştırır mısınız?"', outcome: 'wrong', feedback: 'Henüz ilişki kurulmadı. Büyük istekler güven olmadan çalışmaz.' },
      { key: 'C', label: 'Bir şey söylemez, sözü "zaten bilgi verdi, tamam" diye yorumlarsınız.', outcome: 'warn', feedback: 'Vaatten habersiz kalmak fırsatı öldürür. Her vaadi somutlaştırın.' },
    ],
  },
];

// Engine'e verilecek biçim: cevap anahtarı (outcome/feedback) ayrı tutulur.
const ENGINE_SCENARIOS: EngineScenario[] = SCENARIOS.map((s) => ({
  id: s.id,
  situationText: s.situationText,
  question: s.question,
  choices: s.choices.map((c) => ({ key: c.key, label: c.label })),
}));

export default function OrientationGuidePage() {
  const { user } = useAuth();
  const api = useApiClient();
  const router = useRouter();

  if (!user || user.role !== 'MENTI') return null;

  // Yerel çözümleme — feedback gömülü olduğu için API çağrısı gerekmez.
  async function resolveChoice(scenarioId: string, choiceKey: string) {
    const scenario = SCENARIOS.find((s) => s.id === scenarioId);
    const choice = scenario?.choices.find((c) => c.key === choiceKey);
    if (!choice) throw new Error('Seçenek bulunamadı');
    return { outcome: choice.outcome, feedback: choice.feedback };
  }

  async function onComplete() {
    const res = await api('/api/users/me/orientation-completed', { method: 'POST' });
    if (res.ok) router.push('/menti');
    return { ok: res.ok };
  }

  return (
    <ScenarioGuideEngine
      title="Görüşme Rehberi"
      subtitle="4 kısa senaryo — tamamlayınca görüşme kilidi otomatik kaldırılır. Bu bir sınav değil; her seçim bir öğrenme anı."
      scenarios={ENGINE_SCENARIOS}
      resolveChoice={resolveChoice}
      onComplete={onComplete}
      completion={{
        emoji: '🎉',
        title: 'Harika! Rehberi tamamladınız.',
        message: 'Görüşme kilidi kaldırılıyor ve yeni görüşme alabileceksiniz.',
        buttonLabel: 'Görüşmelere Dön',
      }}
    />
  );
}
