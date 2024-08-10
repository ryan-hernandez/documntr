import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars-2'; 
import styles from './App.module.css';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [documentedCode, setDocumentedCode] = useState('');
  const [metrics, setMetrics] = useState({ generationTime: 0, averageTime: 0, tokenTimeRatio: 0 });
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);
  const isAnalyzingRef = useRef(false);

  useEffect(() => {
    isAnalyzingRef.current = isAnalyzing;
    if (isAnalyzing) {
      startTimeRef.current = performance.now();
      updateTimer();
    } else {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [isAnalyzing]);

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

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: '4px',
      backgroundColor: '#888',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  const renderTrackVertical = ({ style, ...props }) => {
    const trackStyle = {
      backgroundColor: '#333',
      borderRadius: '4px',
      right: 2,
      bottom: 2,
      top: 2,
      width: '10px',
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  };
  
  const renderTrackHorizontal = ({ style, ...props }) => {
    const trackStyle = {
      backgroundColor: '#333',
      borderRadius: '4px',
      left: 2,
      right: 2,
      bottom: 2,
      height: '10px',
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  };
  
  const renderView = ({ style, ...props }) => {
    const viewStyle = {
      padding: '0 16px 0 0',  // Add some padding to prevent content from touching the scrollbar
    };
    return <div style={{ ...style, ...viewStyle }} {...props} />;
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);
    setDocumentedCode('');
    try {
      const response = await axios.post('http://localhost:5000/analyze', { code: inputCode });
      setDocumentedCode(response.data.documented_code);
      setMetrics(prev => ({
        generationTime: prev.generationTime, // Keep the precise time we measured
        averageTime: response.data.average_time,
        tokenTimeRatio: response.data.token_time_ratio
      }));
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatTime = (time) => {
    return time.toFixed(2);
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>documntr</h1>
      
      <div className={styles.metrics}>
        <div className={styles.metricItem}>
          <h3>Generation Time</h3>
          <p>{formatTime(metrics.generationTime)}s</p>
        </div>
        <div className={styles.metricItem}>
          <h3>Average Time</h3>
          <p>{formatTime(metrics.averageTime)}s</p>
        </div>
        <div className={styles.metricItem}>
          <h3>Token/Time Ratio</h3>
          <p>{formatTime(metrics.tokenTimeRatio)}</p>
        </div>
      </div>

      <div className={styles.codeContainer}>
        <Scrollbars
          renderThumbVertical={renderThumb}
          renderThumbHorizontal={renderThumb}
          renderTrackVertical={renderTrackVertical}
          renderTrackHorizontal={renderTrackHorizontal}
          renderView={renderView}
          hideTracksWhenNotNeeded={true}
        >
          <CodeMirror
            value={inputCode}
            height="500px"
            theme={dracula}
            extensions={[python()]}
            onChange={(value) => setInputCode(value)}
          />
        </Scrollbars>
      </div>
      
      <button className={styles.button} onClick={handleAnalyze} disabled={isAnalyzing}>
        {isAnalyzing ? 'Analyzing...' : 'Analyze'}
      </button>

      {isAnalyzing && <div className={styles.loader}></div>}
      
      {error && <div className={styles.error}>{error}</div>}
      
      {documentedCode && (
        <div className={styles.codeContainer}>
          <Scrollbars
            renderThumbVertical={renderThumb}
            renderThumbHorizontal={renderThumb}
            renderTrackVertical={renderTrackVertical}
            renderTrackHorizontal={renderTrackHorizontal}
            renderView={renderView}
            hideTracksWhenNotNeeded={true}
          >
            <CodeMirror
              value={documentedCode}
              height="500px"
              theme={dracula}
              extensions={[python()]}
              editable={false}
            />
          </Scrollbars>
        </div>
      )}
    </div>
  );
}

export default App;