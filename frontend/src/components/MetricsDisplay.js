import React from 'react';
import styles from '../styles/MetricsDisplay.module.css';

const formatTime = (time) => time.toFixed(2);

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
      <h3>Token/Time Ratio</h3>
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