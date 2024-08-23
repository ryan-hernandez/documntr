import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook to manage the metrics of a testing session.
 * Initializes a new session or loads an existing session from localStorage.
 *
 * @returns {Object} An object containing the current test session and functions to update metrics.
 */
const useMetrics = () => {
    const [testSession, setTestSession] = useState(() => {
        const sessionId = new Date().toISOString();
        return {
            id: sessionId,
            generationCount: 0,
            generations: {},
            latestGenerationTime: 0
        };
    });

    /**
     * Effect to load existing session from localStorage upon initialization.
     *
     * @returns {void}
     */
    useEffect(() => {
        const storedSession = localStorage.getItem('currentTestSession');
        if (storedSession) {
            setTestSession(JSON.parse(storedSession));
        }
    }, []);

    /**
     * Updates the metrics with the results of a generation.
     *
     * @param {Object} result - The result of the generation containing generation time and input tokens.
     * @returns {void}
     */
    const updateMetrics = useCallback((result) => {
        setTestSession(prevSession => {
            const newGenerationCount = prevSession.generationCount + 1;
            const newGeneration = {
                generationTime: parseFloat(result.generationTime.toFixed(3)),
                inputTokens: result.inputTokens || 0
            };

            const updatedSession = {
                ...prevSession,
                generationCount: newGenerationCount,
                generations: {
                    ...prevSession.generations,
                    [newGenerationCount]: newGeneration
                },
                latestGenerationTime: newGeneration.generationTime  // Update latest generation time
            };

            localStorage.setItem('currentTestSession', JSON.stringify(updatedSession));

            return updatedSession;
        });
    }, []);

    /**
     * Updates the latest generation time in the session.
     *
     * @param {number} time - The latest generation time.
     * @returns {void}
     */
    const updateGenerationTime = useCallback((time) => {
        setTestSession(prevSession => ({
            ...prevSession,
            latestGenerationTime: parseFloat(time.toFixed(3))
        }));
    }, []);

    /**
     * Resets the metrics by creating a new session.
     *
     * @returns {void}
     */
    const resetMetrics = useCallback(() => {
        const newSessionId = new Date().toISOString();
        const newSession = {
            id: newSessionId,
            generationCount: 0,
            generations: {},
            latestGenerationTime: 0
        };
        setTestSession(newSession);
        localStorage.setItem('currentTestSession', JSON.stringify(newSession));
    }, []);

    /**
     * Saves the current session to localStorage and resets the metrics.
     *
     * @returns {void}
     */
    const saveSession = useCallback(() => {
        localStorage.setItem(`testSession_${testSession.id}`, JSON.stringify(testSession));
        resetMetrics();
    }, [testSession, resetMetrics]);

    return { testSession, updateMetrics, resetMetrics, saveSession, updateGenerationTime };
};

export default useMetrics;
