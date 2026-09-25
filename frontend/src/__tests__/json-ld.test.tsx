/**
 * Y-10 — JSON-LD yapısal veri (Organization + WebSite).
 *
 * Ana sayfada `<script type="application/ld+json">` basılır; JSON geçerli, schema.org
 * alanları doğru, `<` kaçırılıyor (XSS) ve koddan gelmeyen iletişim alanları YOK (KARAR-88).
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { JsonLd } from '@/components/atoms/JsonLd';
import { buildHomeJsonLd, serializeJsonLd, HOME_DESCRIPTION } from '@/lib/structuredData';

const SITE = 'https://app.example.com';

type Node = Record<string, unknown>;

function renderAndParse(data: Node) {
  const { container } = render(<JsonLd data={data} />);
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  const raw = script!.innerHTML;
  return { raw, parsed: JSON.parse(raw) as Node };
}

describe('JSON-LD (Y-10)', () => {
  it('ld+json script render edilir ve JSON geçerlidir', () => {
    const { parsed } = renderAndParse(buildHomeJsonLd(SITE));
    expect(parsed['@context']).toBe('https://schema.org');
    expect(Array.isArray(parsed['@graph'])).toBe(true);
  });

  it('Organization ve WebSite doğru @type/name/url taşır', () => {
    const { parsed } = renderAndParse(buildHomeJsonLd(SITE));
    const graph = parsed['@graph'] as Node[];
    const org = graph.find((n) => n['@type'] === 'Organization')!;
    const site = graph.find((n) => n['@type'] === 'WebSite')!;
    expect(org).toBeDefined();
    expect(site).toBeDefined();
    expect(org.name).toBe('MentiMentor');
    expect(org.url).toBe(SITE);
    expect(org.logo).toBe(`${SITE}/favicon.ico`);
    expect(org.description).toBe(HOME_DESCRIPTION);
    expect(site.name).toBe('MentiMentor');
    expect(site.url).toBe(SITE);
    expect(site.publisher).toEqual({ '@id': org['@id'] });
  });

  it('iletişim/sosyal alanları YOK (koddan gelmeyen bilgi uydurulmaz)', () => {
    const json = serializeJsonLd(buildHomeJsonLd(SITE));
    for (const key of ['address', 'telephone', 'email', 'sameAs', 'contactPoint', 'founder']) {
      expect(json).not.toContain(`"${key}"`);
    }
  });

  it('negatif: veri içindeki "<" kaçırılır, </script> ile etiket kapatılamaz', () => {
    const evil = { '@context': 'https://schema.org', name: '</script><script>alert(1)</script>' };
    const serialized = serializeJsonLd(evil);
    expect(serialized).not.toContain('<');
    expect(serialized).toContain('\\u003c/script>');
    // Kaçış, ayrıştırılan değeri değiştirmez.
    expect(JSON.parse(serialized).name).toBe(evil.name);

    const { raw, parsed } = renderAndParse(evil);
    expect(raw).not.toContain('</script>');
    expect(parsed.name).toBe(evil.name);
  });
});
