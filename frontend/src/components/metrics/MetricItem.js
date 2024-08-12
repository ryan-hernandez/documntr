import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/MetricsDisplay.module.css';
import { formatTime } from './utils';

/**
 * Renders a single metric item.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the metric.
 * @param {number|string} props.value - The value of the metric.
 * @param {boolean} [props.isTime=false] - Whether the value should be formatted as time.
 * @returns {JSX.Element} A component displaying a single metric.
 */
const MetricItem = ({ label, value, isTime = false }) => (
  <div className={styles.metricItem}>
    <span className={styles.metricLabel}>{label}</span>
    <span className={styles.metricValue}>
      {isTime ? `${formatTime(value)}s` : value}
    </span>
  </div>
);

MetricItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isTime: PropTypes.bool,
};

export default MetricItem;