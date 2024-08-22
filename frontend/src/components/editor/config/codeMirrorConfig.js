/**
 * Configuration settings for the CodeMirror editor.
 * This object contains various options to customize the editor's behavior and appearance.
 *
 * @constant {Object} codeMirrorSetup - The configuration object for CodeMirror
 * @property {boolean} lineNumbers - Enables line numbering in the editor.
 * @property {boolean} highlightActiveLineGutter - Highlights the line gutter of the active line.
 * @property {boolean} highlightSpecialChars - Enables highlighting of special characters.
 * @property {boolean} foldGutter - Allows for code folding in the gutter.
 * @property {boolean} drawSelection - Enables drawing of selection in the editor.
 * @property {boolean} dropCursor - Shows a drop cursor for text manipulation.
 * @property {boolean} allowMultipleSelections - Permits multiple selections in the editor.
 * @property {boolean} indentOnInput - Automatically indents on input.
 * @property {boolean} syntaxHighlighting - Enables syntax highlighting for the editor.
 * @property {boolean} bracketMatching - Enables matching bracket highlighting.
 * @property {boolean} closeBrackets - Automatically closes brackets as they are typed.
 * @property {boolean} autocompletion - Enables autocompletion of code.
 * @property {boolean} rectangularSelection - Allows rectangular selection of text.
 * @property {boolean} crosshairCursor - Enables a crosshair cursor style.
 * @property {boolean} highlightActiveLine - Highlights the active line in the editor.
 * @property {boolean} highlightSelectionMatches - Highlights matches of the selected text.
 * @property {boolean} closeBracketsKeymap - Sets the keymap for closing brackets.
 * @property {boolean} defaultKeymap - Uses the default keymap for editor actions.
 * @property {boolean} searchKeymap - Sets the keymap for search actions.
 * @property {boolean} historyKeymap - Configures the keymap for history navigation.
 * @property {boolean} foldKeymap - Sets the keymap for folding actions.
 * @property {boolean} completionKeymap - Configures the keymap for autocompletion actions.
 * @property {boolean} lintKeymap - Sets the keymap for linting actions.
 */
export const codeMirrorSetup = {
  lineNumbers: true,
  highlightActiveLineGutter: true,
  highlightSpecialChars: true,
  foldGutter: true,
  drawSelection: true,
  dropCursor: true,
  allowMultipleSelections: true,
  indentOnInput: true,
  syntaxHighlighting: true,
  bracketMatching: true,
  closeBrackets: true,
  autocompletion: true,
  rectangularSelection: true,
  crosshairCursor: true,
  highlightActiveLine: true,
  highlightSelectionMatches: true,
  closeBracketsKeymap: true,
  defaultKeymap: true,
  searchKeymap: true,
  historyKeymap: true,
  foldKeymap: true,
  completionKeymap: true,
  lintKeymap: true,
};
