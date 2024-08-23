import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

/**
 * Custom hook for analyzing code with a server.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {function} params.onSuccess - Callback function to call on successful analysis.
 * @param {function} params.onError - Callback function to call on error during analysis.
 * @param {function} params.onTimerUpdate - Callback function to call for timer updates.
 * @returns {Object} - An object containing the analyzeCode method and isAnalyzing state.
 */
const useCodeAnalysis = ({ onSuccess, onError, onTimerUpdate }) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);

    const getTokenCount = (str) => {
        str = str.trim();
        if (str === '') return 0;
        return str.split(/\s+/).length;
    };

    /**
     * Updates the timer and calls onTimerUpdate with the elapsed time.
     * This function is called recursively with requestAnimationFrame.
     */
    const updateTimer = useCallback(() => {
        if (startTimeRef.current) {
            const currentTime = performance.now();
            const elapsedTime = (currentTime - startTimeRef.current) / 1000;
            onTimerUpdate(elapsedTime);
            timerRef.current = requestAnimationFrame(updateTimer);
        }
    }, [onTimerUpdate]);

    /**
     * Analyzes the provided code by sending it to a server endpoint.
     *
     * @param {string} code - The code to analyze.
     * @param {string} language - The programming language of the code.
     * @returns {Promise<void>} - A promise that resolves when the analysis is complete.
     */
    const analyzeCode = useCallback(async (code, language) => {
        setIsAnalyzing(true);
        startTimeRef.current = performance.now();
        updateTimer();

        try {
            const response = await axios.post(
                'http://localhost:5000/analyze',
                { code, language },
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 60000
                }
            );

            if (response.data && response.data.documented_code) {
                const endTime = performance.now();
                const generationTime = (endTime - startTimeRef.current) / 1000;
                console.log(response.data);
                onSuccess({
                    documented_code: response.data.documented_code,
                    total_tokens: getTokenCount(code),
                    generationTime: generationTime
                });
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Analysis error:', err);
            onError(err.response?.data?.error || err.message || 'An error occurred during analysis');
        } finally {
            setIsAnalyzing(false);
            startTimeRef.current = null;
            if (timerRef.current) {
                cancelAnimationFrame(timerRef.current);
            }
        }
    }, [onSuccess, onError, updateTimer]);

    return { analyzeCode, isAnalyzing };
};

export default useCodeAnalysis;
