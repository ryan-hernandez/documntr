import React from 'react';
import styles from '../App.module.css';

/**
 * A button component that triggers an analysis action.
 *
 * @param {Object} props - The props for the component.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {boolean} props.isAnalyzing - A flag indicating whether analysis is in progress.
 * @returns {JSX.Element} The rendered button component.
 */
const AnalyzeButton = ({ onClick, isAnalyzing }) => (
  <button className={styles.button} onClick={onClick} disabled={isAnalyzing}>
    {isAnalyzing ? (
      'Analyzing...'
    ) : (
      'Analyze'
    )}
  </button>
);

export default AnalyzeButton;