import React from 'react';
import styles from '../App.module.css';

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