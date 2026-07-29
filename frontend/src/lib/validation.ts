/**
 * Zod validasyon şemaları — backend şemalarıyla senkronize tutulmalı.
 * Değişiklik yapılacaksa: authController.ts RegisterSchema ve LoginSchema'ya bakın.
 */

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(1, 'Şifre zorunlu'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// authController.ts ForgotPasswordSchema ile senkron.
export const forgotPasswordSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// authController.ts ResetPasswordSchema ile senkron (password min 8).
// confirmPassword yalnızca frontend UX kontrolü — backend token + password bekler.
export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Şifre en az 8 karakter olmalı'),
    confirmPassword: z.string().min(1, 'Şifre tekrarı zorunlu'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
