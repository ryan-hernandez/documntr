import { useState, useCallback } from 'react';

/**
 * Custom hook to track and manage metrics related to generation times and token counts.
 *
 * @param {Object} initialMetrics - The initial metrics state.
 * @returns {Object} An object containing the current metrics and functions to update them.
 */
const useMetrics = (initialMetrics) => {
    const [metrics, setMetrics] = useState(initialMetrics);

    /**
     * Updates the metrics based on the provided result from a generation.
     *
     * @param {Object} result - The result object containing generation time and total tokens.
     * @param {number} result.generationTime - The time taken for the latest generation.
     * @param {number} result.total_tokens - The total number of tokens processed.
     */
    const updateMetrics = useCallback((result) => {
        setMetrics((prev) => {
            const newNumGenerations = prev.numGenerations + 1;
            const newTotalTime = parseFloat(prev.totalTime) + parseFloat(result.generationTime)
            const newTotalTokens = prev.totalTokens + result.total_tokens;
            const newAverageTime = newTotalTime / newNumGenerations;
            const newAverageTokenTimeRatio = newTotalTokens / newTotalTime;
            const newAverageTokens = newTotalTokens / newNumGenerations;

            return {
                generationTime: parseFloat(result.generationTime.toFixed(3)),
                totalTime: newTotalTime.toFixed(3),
                averageTime: parseFloat(newAverageTime.toFixed(3)),
                inputTokenCount: result.total_tokens,
                totalTokens: newTotalTokens,
                tokenTimeRatio: parseFloat((result.total_tokens / result.generationTime).toFixed(3)),
                averageTokenTimeRatio: parseFloat(newAverageTokenTimeRatio.toFixed(3)),
                numGenerations: newNumGenerations,
                averageTokens: parseFloat(newAverageTokens.toFixed(2)),
            };
        });
    }, []);

    /**
     * Updates the generation time in the metrics.
     *
     * @param {number} time - The new generation time to be set.
     */
    const updateGenerationTime = useCallback((time) => {
        setMetrics((prev) => ({
            ...prev,
            generationTime: parseFloat(time.toFixed(3))
        }));
    }, []);

    /**
     * Resets the metrics to the initial state defined in initialMetrics.
     */
    const resetMetrics = useCallback(() => {
        setMetrics(initialMetrics);
    }, [initialMetrics]);

    return { metrics, updateMetrics, resetMetrics, updateGenerationTime };
};

export default useMetrics;
