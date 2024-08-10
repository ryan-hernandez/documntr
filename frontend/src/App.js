import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import MetricsDisplay from './components/MetricsDisplay';
import CodeEditor from './components/CodeEditor';
import AnalyzeButton from './components/AnalyzeButton';
import ErrorDisplay from './components/ErrorDisplay';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [documentedCode, setDocumentedCode] = useState('');
  const [metrics, setMetrics] = useState({ generationTime: 0, averageTime: 0, tokenTimeRatio: 0, numGenerations: 0 });
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

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    isAnalyzingRef.current = true;
    setError(null);
    setDocumentedCode('');
    startTimeRef.current = performance.now();
    updateTimer();

    try {
      const response = await axios.post('http://localhost:5000/analyze', { code: inputCode });
      setDocumentedCode(response.data.documented_code);
      setMetrics(prev => ({
        generationTime: prev.generationTime,
        averageTime: response.data.average_time,
        tokenTimeRatio: response.data.token_time_ratio,
        numGenerations: prev.numGenerations + 1
      }));
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setIsAnalyzing(false);
      setInputCode('')
      isAnalyzingRef.current = false;
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <h1 className={styles.title}>documntr</h1>
        
        <MetricsDisplay metrics={metrics} />

        <CodeEditor
          value={inputCode}
          onChange={setInputCode}
          label="Input Code"
          disabled={isAnalyzing}
        />
        
        <AnalyzeButton onClick={handleAnalyze} isAnalyzing={isAnalyzing} />

        {error && <ErrorDisplay error={error} />}
        
        {documentedCode && (
          <CodeEditor
            value={documentedCode}
            onChange={() => {}}
            label="Documented Code"
            readOnly
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;