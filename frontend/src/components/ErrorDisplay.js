import React from 'react';
import styles from '../App.module.css';

const ErrorDisplay = ({ error }) => (
  <div className={styles.error}>{error}</div>
);

export default ErrorDisplay;