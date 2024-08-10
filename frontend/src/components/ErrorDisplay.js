import React from 'react';
import styles from '../App.module.css';

/**
 * ErrorDisplay component that renders an error message.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.error - The error message to display.
 * @returns {JSX.Element} A React element displaying the error message.
 */
const ErrorDisplay = ({ error }) => (
  <div className={styles.error}>{error}</div>
);

export default ErrorDisplay;