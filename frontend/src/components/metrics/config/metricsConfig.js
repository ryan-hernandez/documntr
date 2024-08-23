/**
 * Configuration for metrics, including labels and keys.
 *
 * @typedef {Object} MetricConfig
 * @property {string} label - The display name of the metric.
 * @property {string} key - The unique key for the metric.
 * @property {boolean} isTime - Indicates if the metric is time-related.
 */

/**
 * An array of metric configurations.
 *
 * @type {MetricConfig[]}
 */
export const metricsConfig = [
  { label: 'Generation Time', key: 'generationTime', isTime: true },
  { label: 'Average Time', key: 'averageTime', isTime: true },
  { label: 'Token/Time Ratio (TTR)', key: 'tokenTimeRatio', isTime: false },
  { label: 'Average TTR', key: 'averageTokenTimeRatio', isTime: false },
  { label: 'Generations', key: 'numGenerations', isTime: false },
  { label: 'Input Tokens', key: 'inputTokenCount', isTime: false },
  { label: 'Total Tokens', key: 'totalTokens', isTime: false },
  { label: 'Average Tokens', key: 'averageTokens', isTime: false },
];
