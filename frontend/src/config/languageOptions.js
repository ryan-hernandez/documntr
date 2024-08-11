import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java'
import { php } from '@codemirror/lang-php'
import { rust } from '@codemirror/lang-rust'
import { sql } from '@codemirror/lang-sql'
import { xml } from '@codemirror/lang-xml'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { markdown } from '@codemirror/lang-markdown'
import { html } from '@codemirror/lang-html'
import { yaml } from '@codemirror/lang-yaml'
import { csharp } from '@replit/codemirror-lang-csharp'

export const languageOptions = [
  { value: 'python', label: 'Python', extension: python },
  { value: 'javascript', label: 'JavaScript', extension: javascript },
  { value: 'typescript', label: 'TypeScript', extension: javascript },
  { value: 'cpp', label: 'C++', extension: cpp },
  { value: 'c', label: 'C', extension: cpp },
  { value: 'csharp', label: 'C#', extension: csharp },
  { value: 'java', label: 'Java', extension: java },
  { value: 'php', label: 'PHP', extension: php },
  { value: 'rust', label: 'Rust', extension: rust },
  { value: 'sql', label: 'SQL', extension: sql },
  { value: 'xml', label: 'XML', extension: xml },
  { value: 'css', label: 'CSS', extension: css },
  { value: 'json', label: 'JSON', extension: json },
  { value: 'markdown', label: 'Markdown', extension: markdown },
  { value: 'html', label: 'HTML', extension: html },
  { value: 'yaml', label: 'YAML', extension: yaml },
]

export const getLanguageExtension = (value) => {
  const language = languageOptions.find(lang => lang.value === value);
  return language ? language.extension : python;
};