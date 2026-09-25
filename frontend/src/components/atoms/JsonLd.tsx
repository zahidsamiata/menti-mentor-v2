import { serializeJsonLd, type JsonLdObject } from '@/lib/structuredData';

/** Y-10 — schema.org yapısal verisini `<script type="application/ld+json">` olarak basar. */
export function JsonLd({ data }: { data: JsonLdObject }) {
  return (
    <script
      type="application/ld+json"
      // serializeJsonLd `<` karakterini kaçırır → script etiketi erken kapatılamaz.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
