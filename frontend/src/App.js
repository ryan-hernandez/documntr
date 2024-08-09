import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import axios from 'axios';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [documentedCode, setDocumentedCode] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    try {
      // In the handleAnalyze function, update the axios call:
      const response = await axios.post('/analyze', { code: inputCode });
      setDocumentedCode(response.data.documented_code);
      setMetrics({
        generationTime: response.data.generation_time,
        averageTime: response.data.average_time,
        tokenTimeRatio: response.data.token_time_ratio
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="App">
      <h1>documntr</h1>
      <div className="code-container">
        <CodeMirror
          value={inputCode}
          height="200px"
          theme={dracula}
          extensions={[python()]}
          onChange={(value) => setInputCode(value)}
        />
      </div>
      <button onClick={handleAnalyze}>Analyze</button>
      {error && <div className="error">{error}</div>}
      {documentedCode && (
        <div className="code-container">
          <h2>Documented Code</h2>
          <CodeMirror
            value={documentedCode}
            height="400px"
            theme={dracula}
            extensions={[python()]}
            editable={false}
          />
        </div>
      )}
      {metrics && (
        <div className="metrics">
          <h2>Metrics</h2>
          <p>Generation Time: {metrics.generationTime.toFixed(2)}s</p>
          <p>Average Time: {metrics.averageTime.toFixed(2)}s</p>
          <p>Token/Time Ratio: {metrics.tokenTimeRatio.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;