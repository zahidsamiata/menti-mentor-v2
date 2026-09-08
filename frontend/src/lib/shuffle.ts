/**
 * Fisher-Yates karıştırma — girdiyi mutasyona uğratmadan YENİ dizi döndürür.
 *
 * Şık sırasını her gösterimde rastgeleleştirmek için kullanılır (madde 143:
 * öğrenme yolculuğu + sertifika). Öğeler KİMLİK taşıdığından (choice.key /
 * option.key), sıra değişse de kaydedilen cevap kimliğe bağlıdır — bozulmaz.
 * "Doğru cevap kokusu"nu engeller (şıklar içerik sırasına göre yazılıyor).
 */
export function shuffle<T>(items: readonly T[]): T[] {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
