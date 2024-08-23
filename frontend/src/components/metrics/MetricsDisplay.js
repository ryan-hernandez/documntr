import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/MetricsDisplay.module.css';
import { formatTime } from './utils';

/**
 * Displays various metrics related to the test session.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.testSession - The test session data containing metrics.
 * @returns {JSX.Element} The rendered metrics display component.
 */
const MetricsDisplay = ({ testSession }) => {
  const { generationCount, generations, latestGenerationTime } = testSession;

  /**
   * Calculates average metrics from the generations data.
   *
   * @returns {Object} An object containing average time, average tokens, and average token/time ratio.
   */
  const calculateAverages = () => {
    if (generationCount === 0) return { avgTime: 0, avgTokens: 0, avgTokenTimeRatio: 0 };

    const totals = Object.values(generations).reduce(
      (acc, gen) => {
        acc.time += gen.generationTime || 0;
        acc.tokens += gen.inputTokens || 0;
        return acc;
      },
      { time: 0, tokens: 0 }
    );

    const avgTime = totals.time / generationCount;
    const avgTokens = totals.tokens / generationCount;
    const avgTokenTimeRatio = totals.time > 0 ? totals.tokens / totals.time : 0;

    return { avgTime, avgTokens, avgTokenTimeRatio };
  };

  const { avgTime, avgTokens, avgTokenTimeRatio } = calculateAverages();

  const latestCompletedGeneration = generations[generationCount] || { generationTime: 0, inputTokens: 0 };

  const metricsConfig = [
    { label: 'Generation Count', value: generationCount },
    { label: 'Latest Generation Time', value: latestGenerationTime != null ? formatTime(latestGenerationTime) : 'N/A', isTime: true },
    { label: 'Latest Input Tokens', value: latestCompletedGeneration.inputTokens || 0 },
    { label: 'Average Generation Time', value: avgTime != null ? formatTime(avgTime) : 'N/A', isTime: true },
    { label: 'Average Input Tokens', value: avgTokens != null ? avgTokens.toFixed(2) : 'N/A' },
    { label: 'Average Token/Time Ratio', value: avgTokenTimeRatio != null ? avgTokenTimeRatio.toFixed(2) : 'N/A' },
  ];

  return (
    <div className={styles.metricsContainer}>
      {metricsConfig.map((metric) => (
        <div key={metric.label} className={styles.metricItem}>
          <span className={styles.metricLabel}>{metric.label}</span>
          <span className={styles.metricValue}>
            {metric.isTime && metric.value !== 'N/A' ? `${metric.value}s` : metric.value}
          </span>
        </div>
      ))}
    </div>
  );
};

MetricsDisplay.propTypes = {
  testSession: PropTypes.shape({
    id: PropTypes.string.isRequired,
    generationCount: PropTypes.number.isRequired,
    generations: PropTypes.objectOf(
      PropTypes.shape({
        generationTime: PropTypes.number,
        inputTokens: PropTypes.number,
      })
    ).isRequired,
    latestGenerationTime: PropTypes.number,
  }).isRequired,
};

export default MetricsDisplay;
