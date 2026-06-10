/**
 * Zod validasyon şemaları — backend şemalarıyla senkronize tutulmalı.
 * Değişiklik yapılacaksa: authController.ts RegisterSchema ve LoginSchema'ya bakın.
 */

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(1, 'Şifre zorunlu'),
});

export const registerSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalı')
    .regex(/[A-Z]/, 'En az bir büyük harf içermeli')
    .regex(/[0-9]/, 'En az bir rakam içermeli'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Ad soyad en az 2 karakter olmalı').max(120),
  role: z.enum(['MENTOR', 'MENTI'], { message: 'Rol seçin' }),
  tenantSlug: z.string().min(1, 'Kuruluş kodu zorunlu'),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
