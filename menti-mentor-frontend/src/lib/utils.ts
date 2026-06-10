import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * shadcn/ui bileşenlerinin standart class birleştirme yardımcısı.
 * clsx koşullu class'ları işler; twMerge çakışan Tailwind sınıflarını çözer.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
