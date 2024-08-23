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

/**
 * The main application component that manages code analysis,
 * session tracking, and error handling.
 *
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
  const [inputCode, setInputCode] = useState('');
  const [documentedCode, setDocumentedCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].value);
  const [error, setError] = useState(null);
  const inputEditorRef = useRef(null);

  const { testSession, updateMetrics, saveSession, updateGenerationTime } = useMetrics();

  /**
   * Handles the success callback for code analysis,
   * updating documented code and metrics.
   *
   * @param {Object} result - The result of the code analysis.
   * @param {string} result.documented_code - The documented code string.
   */
  const handleAnalysisSuccess = useCallback((result) => {
    setDocumentedCode(result.documented_code);
    updateMetrics(result);
  }, [updateMetrics]);

  /**
   * Handles the progress of the code analysis,
   * updating the generation time.
   *
   * @param {number} elapsedTime - The elapsed time during analysis.
   */
  const handleAnalysisProgress = useCallback((elapsedTime) => {
    updateGenerationTime(elapsedTime);
  }, [updateGenerationTime]);

  const { analyzeCode, isAnalyzing } = useCodeAnalysis({
    onSuccess: handleAnalysisSuccess,
    onError: setError,
    onProgress: handleAnalysisProgress,
  });

  /**
   * Handles the analysis of the code by extracting the current
   * content from the editor and invoking the analyzeCode function.
   * Sets an error if no code is present for analysis.
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

  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <h1 className={styles.title}>documntr</h1>
        <SessionButton onSaveSession={saveSession} />
        <MetricsDisplay testSession={testSession} />
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
        {error && <ErrorDisplay error={error} />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
