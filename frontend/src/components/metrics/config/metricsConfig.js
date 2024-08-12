/**
 * Configuration for the metrics to be displayed.
 * Each object in the array represents a metric with its label and properties.
 *
 * @type {Array<{label: string, key: string, isTime: boolean}>}
 */
export const metricsConfig = [
    { label: 'Generation Time', key: 'generationTime', isTime: true },
    { label: 'Average Time', key: 'averageTime', isTime: true },
    { label: 'Token/Time Ratio', key: 'tokenTimeRatio', isTime: false },
    { label: 'Generations', key: 'numGenerations', isTime: false },
    { label: 'Input Tokens', key: 'inputTokenCount', isTime: false },
  ];