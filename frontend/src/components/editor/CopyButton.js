import React, { useState } from 'react';
import styles from './styles/CopyButton.module.css';

/**
 * CopyButton component that allows the user to copy provided text to the clipboard.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.text - The text to be copied to the clipboard.
 * @returns {JSX.Element} The rendered CopyButton component.
 */
const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

  /**
   * Handles the copy action, writing the text to the clipboard.
   * Sets the copied state to true and resets it after 2 seconds.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the text is copied.
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button className={styles.copyButton} onClick={handleCopy} aria-label="Copy to clipboard">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={styles.copyIcon}
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span className={styles.tooltipText}>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
};

export default CopyButton;