import React from 'react';
import styles from '../styles/MetricsDisplay.module.css';

/**
 * Formats a time value to two decimal places.
 *
 * @param {number} time - The time value to format.
 * @returns {string} The formatted time as a string.
 */
const formatTime = (time) => time.toFixed(2);

/**
 * Displays various metrics related to generation time and token usage.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.metrics - The metrics data object.
 * @param {number} props.metrics.generationTime - The time taken for generation.
 * @param {number} props.metrics.averageTime - The average processing time.
 * @param {number} props.metrics.tokenTimeRatio - The ratio of tokens generated per second.
 * @param {number} props.metrics.numGenerations - The total number of generations.
 * @param {number} props.metrics.inputTokenCount - The count of input tokens.
 * @returns {JSX.Element} The rendered MetricsDisplay component.
 */
const MetricsDisplay = ({ metrics }) => (
  <div className={styles.metrics}>
    <div className={styles.metricItem}>
      <h3>Generation Time</h3>
      <p>{formatTime(metrics.generationTime)}s</p>
    </div>
    <div className={styles.metricItem}>
      <h3>Average Time</h3>
      <p>{formatTime(metrics.averageTime)}s</p>
    </div>
    <div className={styles.metricItem}>
      <h3>Tokens/sec</h3>
      <p>{formatTime(metrics.tokenTimeRatio)}</p>
    </div>
    <div className={styles.metricItem}>
      <h3>Generations</h3>
      <p>{metrics.numGenerations}</p>
    </div>
    <div className={styles.metricItem}>
      <h3>Input Tokens</h3>
      <p>{metrics.inputTokenCount}</p>
    </div>
  </div>
);

export default MetricsDisplay;