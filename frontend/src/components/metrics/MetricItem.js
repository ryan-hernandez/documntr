import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/MetricsDisplay.module.css';
import { formatTime } from './utils';

/**
 * Renders a metric item displaying a label and its corresponding value.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the metric item.
 * @param {number|string} props.value - The value for the metric item. Can be a number or a string.
 * @param {boolean} [props.isTime=false] - Indicates if the value should be formatted as time.
 * @returns {JSX.Element} The rendered metric item.
 */
const MetricItem = ({ label, value, isTime = false }) => {
  let formattedValue;
  if (isTime) {
    formattedValue = `${formatTime(value)}s`;
  } else if (label === 'Token/Time Ratio') {
    formattedValue = value.toFixed(3);
  } else {
    formattedValue = value;
  }

  return (
    <div className={styles.metricItem}>
      <span className={styles.metricLabel}>{label}</span>
      <span className={styles.metricValue}>{formattedValue}</span>
    </div>
  );
};

MetricItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isTime: PropTypes.bool,
};

export default MetricItem;