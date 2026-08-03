import type { MDXComponents } from 'mdx/types';
import defaultComponents from 'fumadocs-ui/mdx';
import { Mermaid } from '@/components/mermaid';
import { InteractiveNotepad } from '@/components/interactive-notepad';
import React from 'react';

const DefaultPre = defaultComponents.pre || ((props: React.ComponentProps<'pre'>) => <pre {...props} />);

function extractTextContent(node: any): string {
  if (node === null || node === undefined) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractTextContent).join('');
  if (React.isValidElement(node)) {
    return extractTextContent((node.props as any)?.children);
  }
  return '';
}

function CustomPre(props: any) {
  const rawText = extractTextContent(props.children).trim();

  // Check language hints from MDX/Shiki attributes
  const dataLang = props['data-language'];
  const className = props.className || '';
  let codeClassName = '';
  if (React.isValidElement(props.children)) {
    codeClassName = (props.children.props as any)?.className || '';
  }

  const isMermaidLanguageHint =
    dataLang === 'mermaid' ||
    className.includes('language-mermaid') ||
    codeClassName.includes('language-mermaid') ||
    (typeof props['data-meta'] === 'string' && props['data-meta'].includes('mermaid'));

  // Direct content inspection for Mermaid diagram signatures
  const isMermaidContent =
    rawText.startsWith('erDiagram') ||
    rawText.startsWith('graph ') ||
    rawText.startsWith('graph\n') ||
    rawText.startsWith('graph\r\n') ||
    rawText.startsWith('flowchart') ||
    rawText.startsWith('sequenceDiagram') ||
    rawText.startsWith('stateDiagram') ||
    rawText.startsWith('gantt') ||
    rawText.startsWith('classDiagram') ||
    rawText.startsWith('pie') ||
    rawText.startsWith('gitGraph');

  if (isMermaidLanguageHint || isMermaidContent) {
    if (rawText) {
      return <Mermaid chart={rawText} />;
    }
  }

  return <DefaultPre {...props} />;
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    pre: CustomPre,
    img: (props: any) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        className={`rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-md max-w-full h-auto my-4 mx-auto ${props.className || ''}`}
        loading="lazy"
      />
    ),
    Mermaid,
    InteractiveNotepad,
    ...components,
  };
}

