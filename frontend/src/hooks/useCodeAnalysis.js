import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

/**
 * Custom hook for analyzing code.
 *
 * @param {Object} options - Options for the analysis.
 * @param {Function} options.onSuccess - Callback to handle successful analysis.
 * @param {Function} options.onError - Callback to handle errors during analysis.
 * @param {Function} options.onProgress - Callback to report progress of analysis.
 * @returns {Object} - Contains the analyzeCode function and isAnalyzing state.
 */
const useCodeAnalysis = ({ onSuccess, onError, onProgress }) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const startTimeRef = useRef(null);
    const progressIntervalRef = useRef(null);

    /**
     * Estimates the number of tokens in a given text.
     *
     * @param {string} text - The text to estimate tokens from.
     * @returns {number} - The estimated number of tokens.
     */
    const estimateTokens = (text) => {
        return text.split(/\s+/).length;
    };

    /**
     * Updates the progress of the analysis.
     * This function is called at regular intervals to report
     * the elapsed time since the analysis started.
     */
    const updateProgress = useCallback(() => {
        if (startTimeRef.current) {
            const currentTime = performance.now();
            const elapsedTime = (currentTime - startTimeRef.current) / 1000; // Convert to seconds
            onProgress(elapsedTime);
        }
    }, [onProgress]);

    /**
     * Analyzes the provided code in the specified programming language.
     *
     * @param {string} code - The code to be analyzed.
     * @param {string} language - The programming language of the code.
     * @returns {Promise<void>} - A promise that resolves when the analysis is complete.
     */
    const analyzeCode = useCallback(async (code, language) => {
        if (!code) return;

        setIsAnalyzing(true);
        startTimeRef.current = performance.now();
        progressIntervalRef.current = setInterval(updateProgress, 10); // Update every 10ms for smoother animation

        try {
            const inputTokens = estimateTokens(code);
            const response = await axios.post('http://localhost:5000/analyze', { code, language });
            const endTime = performance.now();
            const generationTime = (endTime - startTimeRef.current) / 1000; // Convert to seconds

            const result = {
                ...response.data,
                generationTime,
                inputTokens,
            };

            onSuccess(result);
        } catch (error) {
            onError(error.response?.data?.error || 'An error occurred during analysis');
        } finally {
            setIsAnalyzing(false);
            clearInterval(progressIntervalRef.current);
            startTimeRef.current = null;
        }
    }, [onSuccess, onError, updateProgress]);

    return { analyzeCode, isAnalyzing };
};

export default useCodeAnalysis;
