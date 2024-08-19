import React, { forwardRef } from 'react';
import CodeMirrorWrapper from './CodeMirrorWrapper';
import EditorHeader from './EditorHeader';
import styles from './styles/CodeEditor.module.css';

/**
 * CodeEditor component that renders a code editor with a header.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.value - The current value of the code editor.
 * @param {function} props.onChange - Callback function triggered when the value changes.
 * @param {string} props.label - The label displayed in the editor header.
 * @param {boolean} [props.readOnly=false] - Indicates if the editor is read-only.
 * @param {boolean} [props.disabled=false] - Indicates if the editor is disabled.
 * @param {string} props.language - The programming language for syntax highlighting.
 * @param {function} props.onLanguageChange - Callback function triggered when the language changes.
 * @param {React.Ref} ref - The ref forwarded to the CodeMirrorWrapper.
 * 
 * @return {JSX.Element} The rendered component.
 */
const CodeEditor = forwardRef(({ value, onChange, label, readOnly = false, disabled = false, language, onLanguageChange }, ref) => {
  return (
    <div className={styles.codeContainer}>
      <EditorHeader 
        label={label}
        readOnly={readOnly}
        disabled={disabled}
        language={language}
        onLanguageChange={onLanguageChange}
        value={value}
      />
      <CodeMirrorWrapper
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        language={language}
        ref={ref}
      />
    </div>
  );
});

export default CodeEditor;