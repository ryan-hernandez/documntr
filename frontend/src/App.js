import React, { useState, useRef, useCallback } from 'react';
import styles from './App.module.css';
import MetricsDisplay from './components/metrics/MetricsDisplay';
import AnalyzeButton from './components/AnalyzeButton';
import ErrorDisplay from './components/ErrorDisplay';
import ErrorBoundary from './components/ErrorBoundary';
import SessionButton from './components/metrics/SessionButton';
import { languageOptions } from './components/editor/utils/languageOptions';
import useCodeAnalysis from './hooks/useCodeAnalysis';
import useKeyPress from './hooks/useKeyPress';
import useMetrics from './hooks/useMetrics';
import EditorContainer from './components/editor/EditorContainer';

const INITIAL_METRICS = {
  generationTime: 0,
  totalTime: 0,
  averageTime: 0,
  tokenTimeRatio: 0,
  numGenerations: 0,
  inputTokenCount: 0,
  totalTokens: 0,
  averageTokenTimeRatio: 0,
  averageTokens: 0,
};

/**
 * Main application component.
 *
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  const [inputCode, setInputCode] = useState('');
  const [documentedCode, setDocumentedCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].value);
  const [error, setError] = useState(null);
  const inputEditorRef = useRef(null);

  const { metrics, updateMetrics, resetMetrics, updateGenerationTime } = useMetrics(INITIAL_METRICS);

  /**
   * Callback function to handle successful code analysis.
   *
   * @param {Object} result - The result of the code analysis.
   */
  const handleAnalysisSuccess = useCallback((result) => {
    setDocumentedCode(result.documented_code);
    updateMetrics(result);
  }, [updateMetrics]);

  /**
   * Callback function to update the timer on elapsed time.
   *
   * @param {number} elapsedTime - The time elapsed since the analysis started.
   */
  const handleTimerUpdate = useCallback((elapsedTime) => {
    updateGenerationTime(elapsedTime);
  }, [updateGenerationTime]);

  const { analyzeCode, isAnalyzing } = useCodeAnalysis({
    onSuccess: handleAnalysisSuccess,
    onError: setError,
    onTimerUpdate: handleTimerUpdate,
  });

  /**
   * Function to handle the analysis of the code.
   */
  const handleAnalyze = useCallback(() => {
    const currentContent = inputEditorRef.current?.view?.state.doc.toString();
    if (!currentContent?.trim()) {
      setError("Please enter some code before analyzing.");
      return;
    }
    setInputCode(currentContent);
    analyzeCode(currentContent, selectedLanguage);
  }, [analyzeCode, selectedLanguage]);

  useKeyPress('Enter', handleAnalyze, { shift: true, disabled: isAnalyzing });

  /**
   * Function to save metrics of the session and reset the metrics.
   */
  const saveAndResetSession = useCallback(() => {
    const timestamp = new Date().toISOString();
    localStorage.setItem(`testSession_${timestamp}`, JSON.stringify({ timestamp, metrics }));
    resetMetrics();
  }, [metrics, resetMetrics]);

  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <h1 className={styles.title}>documntr</h1>
        <SessionButton onSaveSession={saveAndResetSession} />
        <MetricsDisplay metrics={metrics} />
        <EditorContainer
          inputCode={inputCode}
          setInputCode={setInputCode}
          documentedCode={documentedCode}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          isAnalyzing={isAnalyzing}
          inputEditorRef={inputEditorRef}
        />
        <AnalyzeButton onClick={handleAnalyze} isAnalyzing={isAnalyzing} />
        <span className={styles.analyzeDescriptor}>shift+enter</span>
        {error && <ErrorDisplay error={error} />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
