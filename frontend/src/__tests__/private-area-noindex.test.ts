/**
 * Y-08 — Oturum alanları `noindex, nofollow`; herkese açık sayfalar dizinde kalır.
 *
 * `robots.txt` disallow yalnız tarama önerisidir; dizinden çıkarmayı sayfa meta'sı sağlar.
 * Bu test, özel alan layout/sayfalarının metadata export'unu ve herkese açık sayfaların
 * bu kapsama YANLIŞLIKLA girmediğini kilitler.
 */

import { describe, it, expect } from 'vitest';
import type { Metadata } from 'next';
import { PRIVATE_AREA_METADATA } from '@/lib/privateAreaMetadata';

import { metadata as dashboardLayout } from '@/app/(dashboard)/layout';
import { metadata as adminLayout } from '@/app/(admin)/admin/layout';
import { metadata as platformLayout } from '@/app/platform/layout';
import { metadata as onboardingPage } from '@/app/onboarding/page';
import { metadata as stkPendingReviewLayout } from '@/app/onboarding/stk/pending-review/layout';
import { metadata as pendingApprovalLayout } from '@/app/pending-approval/layout';
import { metadata as oauthLayout } from '@/app/oauth/layout';

import { metadata as homePage } from '@/app/page';
import { metadata as metodolojiPage } from '@/app/metodoloji/page';
import { metadata as loginPage } from '@/app/(auth)/login/page';
import { metadata as registerPage } from '@/app/(auth)/register/page';
import { metadata as kvkkPage } from '@/app/kvkk/page';
import { metadata as gizlilikPage } from '@/app/gizlilik/page';
import { metadata as termsPage } from '@/app/terms/page';

const NOINDEX = { index: false, follow: false };

describe('Y-08 özel alanlar noindex', () => {
  it('ortak sabit index:false + follow:false', () => {
    expect(PRIVATE_AREA_METADATA.robots).toEqual(NOINDEX);
  });

  it.each<[string, Metadata]>([
    ['(dashboard) layout', dashboardLayout],
    ['/admin layout', adminLayout],
    ['/platform layout', platformLayout],
    ['/onboarding sayfası', onboardingPage],
    ['/onboarding/stk/pending-review layout', stkPendingReviewLayout],
    ['/pending-approval layout', pendingApprovalLayout],
    ['/oauth layout', oauthLayout],
  ])('%s noindex, nofollow', (_name, meta) => {
    expect(meta.robots).toEqual(NOINDEX);
  });

  it('/onboarding sayfası başlığını korur', () => {
    expect(onboardingPage.title).toBe('Profilini Tamamla');
  });
});

describe('Y-08 herkese açık sayfalar dizinde kalır', () => {
  it('ana sayfa bilerek index:true', () => {
    expect(homePage.robots).toEqual({ index: true, follow: true });
  });

  it.each<[string, Metadata]>([
    ['/metodoloji', metodolojiPage],
    ['/login', loginPage],
    ['/register', registerPage],
    ['/kvkk', kvkkPage],
    ['/gizlilik', gizlilikPage],
    ['/terms', termsPage],
  ])('%s noindex taşımaz', (_name, meta) => {
    expect(meta.robots).toBeUndefined();
  });
});
