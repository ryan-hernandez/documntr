import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/MetricsDisplay.module.css';
import MetricItem from './MetricItem';
import { metricsConfig } from './config/metricsConfig';

/**
 * Displays various metrics related to generation performance.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.metrics - An object containing metric values.
 * @returns {JSX.Element} A component displaying the metrics.
 */
const MetricsDisplay = ({ metrics }) => {
  return (
    <div className={styles.metricsContainer}>
      {metricsConfig.map((metric) => (
        <MetricItem
          key={metric.label}
          label={metric.label}
          value={metrics[metric.key]}
          isTime={metric.isTime}
        />
      ))}
    </div>
  );
};

MetricsDisplay.propTypes = {
  metrics: PropTypes.shape(
    metricsConfig.reduce((acc, metric) => {
      acc[metric.key] = PropTypes.number.isRequired;
      return acc;
    }, {})
  ).isRequired,
};

export default MetricsDisplay;