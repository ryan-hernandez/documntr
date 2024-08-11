import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

export const customDraculaTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#282a36',
    foreground: '#f8f8f2',
    caret: '#f8f8f0',
    selection: '#44475a',
    selectionMatch: '#44475a',
    lineHighlight: '#44475a',
    gutterBackground: '#282a36',
    gutterForeground: '#6d8a88',
  },
  styles: [
    { tag: t.comment, color: '#A0D2DB' },
    { tag: t.variableName, color: '#f8f8f2' },
    { tag: [t.string, t.special(t.brace)], color: '#A6B5EB' },
    { tag: t.number, color: '#bd93f9' },
    { tag: t.bool, color: '#bd93f9' },
    { tag: t.null, color: '#bd93f9' },
    { tag: t.keyword, color: '#726DA8' },
    { tag: t.operator, color: '#726DA8' },
    { tag: t.className, color: '#A0D2DB' },
    { tag: t.definition(t.typeName), color: '#A0D2DB' },
    { tag: t.typeName, color: '#A0D2DB' },
    { tag: t.angleBracket, color: '#726DA8' },
    { tag: t.tagName, color: '#726DA8' },
    { tag: t.attributeName, color: '#50fa7b' },
  ],
});