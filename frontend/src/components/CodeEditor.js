import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { codeMirrorSetup } from '../config/codeMirrorConfig';
import { languageOptions, getLanguageExtension } from '../config/languageOptions';
import { customDraculaTheme } from '../config/customDraculaTheme';
import styles from '../styles/CodeEditor.module.css';
import CopyButton from './CopyButton';

const CodeEditor = ({ value, onChange, label, readOnly = false, disabled = false, language, onLanguageChange }) => {
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