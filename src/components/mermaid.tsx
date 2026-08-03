'use client';

import { useEffect, useState, useId } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'var(--font-sans), sans-serif',
});

export function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const reactId = useId().replace(/:/g, '');

  useEffect(() => {
    let isMounted = true;
    const renderId = `mermaid-${reactId}`;

    mermaid
      .render(renderId, chart.trim())
      .then((result) => {
        if (isMounted) {
          setSvg(result.svg);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Mermaid render error:', err);
          setError(String(err));
        }
      });

    return () => {
      isMounted = false;
    };
  }, [chart, reactId]);

  if (error) {
    return (
      <div className="p-4 my-4 border border-amber-300 rounded-lg bg-amber-50 text-amber-900 text-sm">
        <p className="font-semibold mb-1">⚠ Sơ đồ Mermaid Syntax Warning</p>
        <pre className="text-xs font-mono overflow-x-auto p-2 bg-amber-100/50 rounded">{chart}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="p-6 my-4 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center text-sm text-zinc-500 bg-zinc-50 dark:bg-zinc-900 animate-pulse">
        Đang tải sơ đồ Mermaid...
      </div>
    );
  }

  return (
    <div
      className="mermaid-wrapper my-6 p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-x-auto shadow-xs flex justify-center [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:mx-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
