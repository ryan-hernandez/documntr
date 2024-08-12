import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { codeMirrorSetup } from '../config/codeMirrorConfig';
import { languageOptions, getLanguageExtension } from '../config/languageOptions';
import { customDraculaTheme } from '../config/customDraculaTheme';
import styles from '../styles/CodeEditor.module.css';
import CopyButton from './CopyButton';

/**
 * CodeEditor Component for rendering a customizable code editor with support for different languages.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.value - The content of the code editor.
 * @param {Function} props.onChange - Callback function to be called when the value of the editor changes.
 * @param {string} props.label - The label to display above the editor.
 * @param {boolean} [props.readOnly=false] - Determines if the editor is in read-only mode.
 * @param {boolean} [props.disabled=false] - Determines if the editor is disabled.
 * @param {string} props.language - The programming language to use for syntax highlighting.
 * @param {Function} props.onLanguageChange - Callback function to be called when the language is changed.
 * @returns {JSX.Element} The CodeEditor component.
 */
const CodeEditor = ({ value, onChange, label, readOnly = false, disabled = false, language, onLanguageChange }) => {
  
  /**
   * Handles the change of the language selection.
   *
   * @param {Object} event - The event triggered by the change in the language dropdown.
   */
  const handleLanguageChange = (event) => {
    onLanguageChange(event.target.value);
  };

  return (
    <div className={styles.codeContainer}>
      <div className={styles.codeHeader}>
        <h3>{label}</h3>
        <div className={styles.headerControls}>
          {!readOnly && (
            <select
              className={styles.languageSelect}
              value={language}
              onChange={handleLanguageChange}
              disabled={disabled}
            >
              {languageOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {readOnly && <CopyButton text={value} />}
        </div>
      </div>
      <div className={styles.editorWrapper}>
        <CodeMirror
          value={value}
          height="100%"
          theme={customDraculaTheme}
          extensions={[getLanguageExtension(language)()]}
          onChange={onChange}
          editable={!readOnly && !disabled}
          basicSetup={{
            ...codeMirrorSetup,
            scrollbarStyle: 'native'
          }}
        />
        {disabled && <div className={styles.overlay}></div>}
      </div>
    </div>
  );
};

export default CodeEditor;