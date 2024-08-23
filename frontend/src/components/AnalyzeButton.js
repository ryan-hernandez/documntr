import React from 'react';
import styles from '../styles/AnalyzeButton.module.css';

/**
 * A button component that triggers an analysis action.
 *
 * @param {Object} props - The props for the component.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {boolean} props.isAnalyzing - A flag indicating whether analysis is in progress.
 * @returns {JSX.Element} The rendered button component.
 */
const AnalyzeButton = ({ onClick, isAnalyzing }) => (
  <button className={styles.analyzeButton} onClick={onClick} disabled={isAnalyzing}>
    <span className={styles.buttonText}>
      {isAnalyzing ? 'Analyzing...' : 'Analyze'}
    </span>
    <span className={styles.analyzeDescriptor}>shift+enter</span>
    {isAnalyzing && <span className={styles.spinner}></span>}
  </button>
);

export default AnalyzeButton;
