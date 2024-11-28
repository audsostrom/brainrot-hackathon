import * as PrismJS from 'prismjs';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-diff.js';
import 'prismjs/components/prism-typescript.js';
import { marked, Renderer, Tokens } from 'marked';

// Import the base SCSS language definition
import 'prismjs/components/prism-scss';

interface Languages {
  bash: string;
  env: string;
  html: string;
  js: string;
  scss: string;
  diff: string;
  ts: string;
  '': string;
}

const languages: Languages = {
  'bash': 'bash',
  'env': 'bash',
  'html': 'markup',
  'js': 'javascript',
  'scss': 'scss',
  'diff': 'diff',
  'ts': 'typescript',
  '': '',
};

const chars: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

function escapeHtml(html: string): string {
  return html.replace(/[&<>]/g, (c) => chars[c]);
}

function highlightSpans(content: string, classname: string): string {
  return `<span class="${classname}">${content}</span>`;
}

const defaultRenderer: Partial<Renderer> = {
  code(token: Tokens.Code): string {
    let { text, lang = '', escaped } = token;
    const language = languages[lang as keyof Languages] || lang;
    const options: Record<string, string> = {};
    let html = '';

    text = text
      .replace(/\/\/\/ (.+?)(?:: (.+))?\n/gm, (_, key, value) => {
        // replace /// key: value with empty string and add to options array
        options[key] = value;
        return '';
      })
      .replace(/^([-+])?((?: {4})+)/gm, (match, prefix = '', spaces) => {
        // for diff types, preserve tabs
        if (prefix && language !== 'diff') return match;

        // for no good reason at all, marked replaces tabs with spaces
        let tabs = '';
        for (let i = 0; i < spaces.length; i += 4) {
          tabs += '\t';
        }
        return prefix + tabs;
      })
      .replace(/\*\\\//g, '*/');

    if (language === 'diff') {
      const lines = text.split('\n').map((content) => {
        let type = null;
        if (/^[+-]/.test(content)) {
          type = content[0] === '+' ? 'inserted' : 'deleted';
          content = content.slice(1);
        }

        return {
          type,
          content: escapeHtml(content),
        };
      });

      html = `<div class="code-block"><pre class="language-diff"><code>${lines
        .map((line) => {
          if (line.type) return `<span class="${line.type}">${line.content}\n</span>`;
          return line.content + '\n';
        })
        .join('')}</code></pre></div>`;
    } else {
      let match; let startLine; let endLine;
      let filename = '';
      if (options['file']) {
        match = options['file'].match(/^(.+?)(?: \(L(\d+)(?:-L(\d+))?\))?$/);
        if (match) {
          filename = match[1];
          startLine = match[2];
          endLine = match[3] || startLine;
        } else {
          filename = options['file'];
        }
      }

      const lang = filename?.split('.')?.pop() as keyof Languages || 'markup';
      const plang = languages[lang as keyof Languages];

      const highlighted = plang ?
        PrismJS.highlight(text, PrismJS.languages[plang], language).replace(/\n/g, '<br />') :
        escapeHtml(text);


      if (match && startLine) {
        html = `<div class="code-block">${
          options['file'] ? `<span class="filename" data-line="${startLine}">${filename}</span>` : ''
        }<pre class='language-${plang}'><code>${highlighted}</code></pre></div>`;
      } else {
        html = `<div class="code-block">${
          options['file'] ? `<span class="filename" data-line="${0}">${filename}</span>` : ''
        }<pre class='language-${plang}'><code>${highlighted}</code></pre></div>`;
      }
    }

    return html
      .replace(/(>)(\s+)(<)/g, (match, p1, p2, p3) => {
        return p1 + p2.replace(/ /g, '&nbsp;') + p3;
      });
  },
};

export async function transform(markdown: string, options: Partial<Renderer> = {}): Promise<string> {
  const renderer = { ...defaultRenderer, ...options };
  const markdownRenderer = new marked.Renderer();

  Object.assign(markdownRenderer, renderer);

  return await marked(markdown, { renderer: markdownRenderer });
}

export async function transformGuide(path: string, markdown: string): Promise<string> {
  const regex = /```[a-z]+\n([\s\S]+?)\n```/g;
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    const content = match[1];
    if (!content.includes('/// file') && !content.includes('/// no-file')) {
      throw new Error(`Code block lacks a \`/// file: ...\` annotation: ${path}`);
    }
  }

  return transform(markdown);
}