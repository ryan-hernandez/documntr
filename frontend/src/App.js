import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import MetricsDisplay from './components/MetricsDisplay';
import CodeEditor from './components/CodeEditor';
import AnalyzeButton from './components/AnalyzeButton';
import ErrorDisplay from './components/ErrorDisplay';
import ErrorBoundary from './components/ErrorBoundary';
import SessionButton from './components/SessionButton';
import { languageOptions } from './config/languageOptions';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [documentedCode, setDocumentedCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].value);
  const [metrics, setMetrics] = useState({
    generationTime: 0,
    averageTime: 0,
    tokenTimeRatio: 0,
    numGenerations: 0,
    inputTokenCount: 0
  });
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);
  const isAnalyzingRef = useRef(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, []);

  /** 
   * Updates the timer to calculate the elapsed time while analyzing.
   * @returns {void}
   */
  const updateTimer = () => {
    if (!isAnalyzingRef.current) {
      return;
    }
    const currentTime = performance.now();
    const elapsedTime = (currentTime - startTimeRef.current) / 1000;
    setMetrics(prev => ({
      ...prev,
      generationTime: elapsedTime
    }));
    timerRef.current = requestAnimationFrame(updateTimer);
  };

  /** 
   * Handles the analysis of the input code by sending a request to the server. 
   * Sets the appropriate metrics and handles any errors that occur during the process.
   * @returns {Promise<void>}
   */
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    isAnalyzingRef.current = true;
    setError(null);
    setDocumentedCode('');
    startTimeRef.current = performance.now();
    updateTimer();

    try {
      const response = await axios.post('http://localhost:5000/analyze', { code: inputCode, language: selectedLanguage });
      setDocumentedCode(response.data.documented_code);
      setMetrics(prev => ({
        generationTime: prev.generationTime,
        averageTime: response.data.average_time,
        inputTokenCount: response.data.total_tokens,
        tokenTimeRatio: response.data.token_time_ratio,
        numGenerations: prev.numGenerations + 1
      }));
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setIsAnalyzing(false);
      isAnalyzingRef.current = false;
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    }
  };

  /** 
   * Saves the current session data to localStorage and resets the metrics to their initial values.
   * @returns {void}
   */
  const saveAndResetSession = () => {
    const timestamp = new Date().toISOString();
    const sessionData = JSON.stringify({ timestamp, metrics });
    localStorage.setItem(`testSession_${timestamp}`, sessionData);
    setMetrics({
      generationTime: 0,
      averageTime: 0,
      tokenTimeRatio: 0,
      numGenerations: 0,
      inputTokenCount: 0
    });
  };

  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <h1 className={styles.title}>documntr</h1>
        
        <SessionButton onSaveSession={saveAndResetSession} />

        <MetricsDisplay metrics={metrics} />

        <CodeEditor
          value={inputCode}
          onChange={setInputCode}
          label="Input Code"
          disabled={isAnalyzing}
          language={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
        
        <AnalyzeButton onClick={handleAnalyze} isAnalyzing={isAnalyzing} />

        {error && <ErrorDisplay error={error} />}
        
        {documentedCode && (
          <CodeEditor
            value={documentedCode}
            onChange={() => {}}
            label="Documented Code"
            readOnly={true}
            disabled={false}
            language={selectedLanguage}
            onLanguageChange={() => {}} // This won't be used for the read-only editor
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;