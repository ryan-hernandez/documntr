import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { customDraculaTheme } from './config/themes/customDraculaTheme';
import { getLanguageExtension } from './utils/languageOptions';
import { codeMirrorSetup } from './config/codeMirrorConfig';
import styles from './styles/CodeEditor.module.css';

/**
 * CodeEditor component for rendering a code editor using CodeMirror.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.value - The current value of the code editor.
 * @param {function} props.onChange - Callback function triggered when the value changes.
 * @param {string} props.label - The label for the code editor (not used in this snippet).
 * @param {boolean} props.disabled - Indicates whether the editor is disabled.
 * @param {string} props.language - The programming language for syntax highlighting.
 * @param {function} props.onLanguageChange - Callback function triggered when the language changes (not used in this snippet).
 * @param {boolean} props.readOnly - Indicates whether the editor is read-only.
 * @param {React.Ref} ref - Ref for the CodeMirror component.
 * @returns {JSX.Element} The rendered CodeEditor component.
 */
const CodeEditor = React.forwardRef(({ value, onChange, label, disabled, language, onLanguageChange, readOnly }, ref) => {
  return (
    <div className={styles.codeEditorContainer}>
      <CodeMirror
        value={value}
        height="100%"
        theme={customDraculaTheme}
        extensions={[getLanguageExtension(language)()]}
        onChange={onChange}
        editable={!readOnly && !disabled}
        basicSetup={{
          ...codeMirrorSetup,
          lineNumbers: true,
          foldGutter: true,
        }}
        className={styles.codeMirrorWrapper}
        ref={ref}
      />
    </div>
  );
});

export default CodeEditor;
