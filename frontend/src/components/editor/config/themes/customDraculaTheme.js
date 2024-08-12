import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

/**
 * Custom Dracula theme for CodeMirror.
 * This theme creates a dark-themed editor with specific colors
 * defined for various syntax elements and editor settings.
 */
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
    /** 
     * Style for comments in the editor. 
     * @type {Object}
     * @property {string} tag - Represents comment syntax.
     * @property {string} color - Color for comments.
     */
    { tag: t.comment, color: '#A0D2DB' },
    /** 
     * Style for variable names in the editor. 
     * @type {Object}
     * @property {string} tag - Represents variableName syntax.
     * @property {string} color - Color for variable names.
     */
    { tag: t.variableName, color: '#f8f8f2' },
    /** 
     * Style for strings and special brace characters in the editor.
     * @type {Object}
     * @property {Array} tag - Represents string and special brace syntax.
     * @property {string} color - Color for strings and braces.
     */
    { tag: [t.string, t.special(t.brace)], color: '#A6B5EB' },
    /** 
     * Style for numbers in the editor. 
     * @type {Object}
     * @property {string} tag - Represents number syntax.
     * @property {string} color - Color for numbers.
     */
    { tag: t.number, color: '#bd93f9' },
    /** 
     * Style for boolean values in the editor. 
     * @type {Object}
     * @property {string} tag - Represents boolean syntax.
     * @property {string} color - Color for boolean values.
     */
    { tag: t.bool, color: '#bd93f9' },
    /** 
     * Style for null values in the editor. 
     * @type {Object}
     * @property {string} tag - Represents null syntax.
     * @property {string} color - Color for null values.
     */
    { tag: t.null, color: '#bd93f9' },
    /** 
     * Style for keywords in the editor. 
     * @type {Object}
     * @property {string} tag - Represents keyword syntax.
     * @property {string} color - Color for keywords.
     */
    { tag: t.keyword, color: '#726DA8' },
    /** 
     * Style for operators in the editor. 
     * @type {Object}
     * @property {string} tag - Represents operator syntax.
     * @property {string} color - Color for operators.
     */
    { tag: t.operator, color: '#726DA8' },
    /** 
     * Style for class names in the editor. 
     * @type {Object}
     * @property {string} tag - Represents className syntax.
     * @property {string} color - Color for class names.
     */
    { tag: t.className, color: '#A0D2DB' },
    /** 
     * Style for type names in definitions in the editor. 
     * @type {Object}
     * @property {string} tag - Represents typeName definition syntax.
     * @property {string} color - Color for type names in definitions.
     */
    { tag: t.definition(t.typeName), color: '#A0D2DB' },
    /** 
     * Style for type names in the editor. 
     * @type {Object}
     * @property {string} tag - Represents typeName syntax.
     * @property {string} color - Color for type names.
     */
    { tag: t.typeName, color: '#A0D2DB' },
    /** 
     * Style for angle brackets in the editor. 
     * @type {Object}
     * @property {string} tag - Represents angleBracket syntax.
     * @property {string} color - Color for angle brackets.
     */
    { tag: t.angleBracket, color: '#726DA8' },
    /** 
     * Style for tag names in the editor. 
     * @type {Object}
     * @property {string} tag - Represents tagName syntax.
     * @property {string} color - Color for tag names.
     */
    { tag: t.tagName, color: '#726DA8' },
    /** 
     * Style for attribute names in the editor. 
     * @type {Object}
     * @property {string} tag - Represents attributeName syntax.
     * @property {string} color - Color for attribute names.
     */
    { tag: t.attributeName, color: '#50fa7b' },
  ],
});