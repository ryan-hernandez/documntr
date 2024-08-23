import React from 'react';
import styles from './styles/CodeEditor.module.css';
import LanguageSelector from './LanguageSelector';
import CopyButton from './CopyButton';

/**
 * EditorHeader component displays the header for the code editor.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label to display in the header.
 * @param {boolean} props.readOnly - Indicates if the editor is in read-only mode.
 * @param {boolean} props.disabled - Indicates if the language selector is disabled.
 * @param {string} props.language - The currently selected programming language.
 * @param {function} props.onLanguageChange - Callback function to handle language change.
 * @param {string} props.value - The value to be copied when readOnly is true.
 * @returns {JSX.Element} The rendered component.
 */
const EditorHeader = ({ label, readOnly, disabled, language, onLanguageChange, value }) => {
  return (
    <div className={styles.codeHeader}>
      <h3>{label}</h3>
      <div className={styles.headerControls}>
        {!readOnly ? (
          <LanguageSelector
            language={language}
            onLanguageChange={onLanguageChange}
            disabled={disabled}
          />
        ) : (
          <CopyButton text={value} />
        )}
      </div>
    </div>
  );
};

export default EditorHeader;
