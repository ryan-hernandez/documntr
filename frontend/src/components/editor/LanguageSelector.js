import React from 'react';
import styles from './styles/CodeEditor.module.css';
import { languageOptions } from './utils/languageOptions';

/**
 * LanguageSelector component allows users to select a programming language.
 *
 * @param {Object} props - React component props.
 * @param {string} props.language - The currently selected language.
 * @param {function} props.onLanguageChange - Callback function called when the language is changed.
 * @param {boolean} props.disabled - Indicates whether the selector is disabled.
 * @returns {JSX.Element} The rendered LanguageSelector component.
 */
const LanguageSelector = ({ language, onLanguageChange, disabled }) => {
  /**
   * Handles the change event for the language selector.
   *
   * @param {Object} event - The change event.
   */
  const handleLanguageChange = (event) => {
    onLanguageChange(event.target.value);
  };

  return (
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
  );
};

export default LanguageSelector;
