import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import MetricsDisplay from './components/metrics/MetricsDisplay';
import CodeEditor from './components/editor/CodeEditor';
import AnalyzeButton from './components/AnalyzeButton';
import ErrorDisplay from './components/ErrorDisplay';
import ErrorBoundary from './components/ErrorBoundary';
import SessionButton from './components/metrics/SessionButton';
import { languageOptions } from './components/editor/utils/languageOptions';

/**
 * App component that manages the code analysis functionality.
 * It allows users to input code, analyze it, and view the documented results.
 * 
 * @returns {JSX.Element} The rendered App component.
 */
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
  const inputEditorRef = useRef(null);

  /**
   * Handles the key press event for initiating code analysis.
   * 
   * @param {KeyboardEvent} event - The keyboard event triggered when a key is pressed.
   */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.shiftKey && !isAnalyzing) {
      event.preventDefault();
      if (inputEditorRef.current && inputEditorRef.current.view) {
        const editorView = inputEditorRef.current.view;
        const editorState = editorView.state;
        const currentContent = editorState.doc.toString();
        console.log("Current content:", currentContent);
        setInputCode(currentContent);
        handleAnalyze(currentContent);
      }
    }
  };

  /**
   * Effect hook to clean up the animation frame on component unmount.
   */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isAnalyzing]);

  /**
   * Updates the timer by calculating the elapsed time and adjusting metrics accordingly.
   * This function is called recursively using requestAnimationFrame.
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
   * Handles the analysis of the input code by making an API request
   * to retrieve the documented code and updates metrics.
   * 
   * @param {string} codeToAnalyze - The code to be analyzed.
   * @returns {Promise<void>} A promise that resolves when the analysis is complete.
   */
  const handleAnalyze = async (codeToAnalyze) => {
    if (!codeToAnalyze || !codeToAnalyze.trim()) {
      setError("Please enter some code before analyzing.");
      return;
    }

    setIsAnalyzing(true);
    isAnalyzingRef.current = true;
    setError(null);
    setDocumentedCode('');
    startTimeRef.current = performance.now();
    updateTimer();

    try {
      console.log("Sending code for analysis:", codeToAnalyze);
      const response = await axios.post('http://localhost:5000/analyze', 
        { code: codeToAnalyze, language: selectedLanguage },
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000 // 30 seconds timeout
        }
      );
      
      if (response.data && response.data.documented_code) {
        setDocumentedCode(response.data.documented_code);
        setMetrics(prev => ({
          generationTime: prev.generationTime,
          averageTime: response.data.average_time,
          inputTokenCount: response.data.total_tokens,
          tokenTimeRatio: response.data.token_time_ratio,
          numGenerations: prev.numGenerations + 1
        }));
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.error || err.message || 'An error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
      isAnalyzingRef.current = false;
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    }
  };

  /**
   * Saves the current session metrics to local storage
   * and resets the metrics to their initial state.
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

        <div className={styles.editorsContainer}>
          <div className={styles.editorWrapper}>
            <CodeEditor
              value={inputCode}
              onChange={setInputCode}
              label="Input Code"
              disabled={isAnalyzing}
              language={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              ref={inputEditorRef}
            />
          </div>
          
          <div className={styles.editorWrapper}>
            {documentedCode ? (
              <CodeEditor
                value={documentedCode}
                onChange={() => {}}
                label="Documented Code"
                readOnly={true}
                disabled={false}
                language={selectedLanguage}
                onLanguageChange={() => {}}
              />
            ) : (
              <div className={styles.placeholderEditor}>
                <p>Documented code will appear here after analysis.</p>
              </div>
            )}
          </div>
        </div>
        
        <AnalyzeButton onClick={handleAnalyze} isAnalyzing={isAnalyzing} />
        <span className={styles.analyzeDescriptor}>
          shift+enter
        </span>
        {error && <ErrorDisplay error={error} />}
      </div>
    </ErrorBoundary>
  );
}

export default App;