import React from 'react';
import styles from '../styles/MetricsDisplay.module.css';

/**
 * Formats a given time value to two decimal places.
 *
 * @param {number} time - The time value to format.
 * @returns {string} The formatted time as a string with two decimal places.
 */
const formatTime = (time) => time.toFixed(2);

/**
 * Displays various metrics related to generation performance.
 *
 * @param {Object} metrics - An object containing metric values.
 * @param {number} metrics.generationTime - The time taken for generation.
 * @param {number} metrics.averageTime - The average time per generation.
 * @param {number} metrics.tokenTimeRatio - The ratio of tokens to time.
 * @param {number} metrics.numGenerations - The number of generations performed.
 * @param {number} metrics.inputTokenCount - The count of input tokens.
 * @returns {JSX.Element} A component displaying the metrics.
 */
const MetricsDisplay = ({ metrics }) => (
  <div className={styles.metricsContainer}>
    <div className={styles.metricItem}>
      <span className={styles.metricLabel}>Generation Time</span>
      <span className={styles.metricValue}>{formatTime(metrics.generationTime)}s</span>
    </div>
    <div className={styles.metricItem}>
      <span className={styles.metricLabel}>Average Time</span>
      <span className={styles.metricValue}>{formatTime(metrics.averageTime)}s</span>
    </div>
    <div className={styles.metricItem}>
      <span className={styles.metricLabel}>Token/Time Ratio</span>
      <span className={styles.metricValue}>{formatTime(metrics.tokenTimeRatio)}</span>
    </div>
    <div className={styles.metricItem}>
      <span className={styles.metricLabel}>Generations</span>
      <span className={styles.metricValue}>{metrics.numGenerations}</span>
    </div>
    <div className={styles.metricItem}>
      <span className={styles.metricLabel}>Input Tokens</span>
      <span className={styles.metricValue}>{metrics.inputTokenCount}</span>
    </div>
  </div>
);

export default MetricsDisplay;