import React from 'react';
import styles from './styles/CodeEditor.module.css';
import CodeMirrorWrapper from './CodeMirrorWrapper';
import EditorHeader from './EditorHeader';

/**
 * CodeEditor component that provides an editable code environment with a header and a code mirror.
 * 
 * @param {string} value - The content of the code editor.
 * @param {function} onChange - Callback function to handle changes in the editor's content.
 * @param {string} label - Label to display in the editor header.
 * @param {boolean} [readOnly=false] - Determines if the editor is in read-only mode.
 * @param {boolean} [disabled=false] - Determines if the editor is disabled.
 * @param {string} language - The programming language of the code editor.
 * @param {function} onLanguageChange - Callback function to handle changes in the programming language.
 * @returns {JSX.Element} The rendered CodeEditor component.
 */
const CodeEditor = ({ value, onChange, label, readOnly = false, disabled = false, language, onLanguageChange }) => {
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
      />
    </div>
  );
};

export default CodeEditor;