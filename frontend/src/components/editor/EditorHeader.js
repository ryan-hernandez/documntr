import React from 'react';
import styles from './styles/CodeEditor.module.css';
import LanguageSelector from './LanguageSelector';
import CopyButton from './CopyButton';

/**
 * Renders the header for the code editor, displaying a label,
 * a language selector if not in read-only mode, or a copy button
 * if in read-only mode.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.label - The label to display in the header.
 * @param {boolean} props.readOnly - Indicates if the editor is in read-only mode.
 * @param {boolean} props.disabled - Indicates if the language selector is disabled.
 * @param {string} props.language - The currently selected language.
 * @param {Function} props.onLanguageChange - Function to call when the language changes.
 * @param {string} props.value - The text value to copy when in read-only mode.
 * @returns {JSX.Element} The rendered header component.
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