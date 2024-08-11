import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { codeMirrorSetup } from '../config/codeMirrorConfig';
import styles from '../styles/CodeEditor.module.css';
import CopyButton from './CopyButton';

/**
 * A functional component that renders a code editor with optional read-only and disabled states.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} props.value - The current code value in the editor.
 * @param {Function} props.onChange - The function to call when the code changes.
 * @param {string} props.label - The label displayed above the code editor.
 * @param {boolean} [props.readOnly=false] - Indicates if the editor should be read-only.
 * @param {boolean} [props.disabled=false] - Indicates if the editor is disabled.
 * @returns {JSX.Element} The rendered code editor component.
 */
const CodeEditor = ({ value, onChange, label, readOnly = false, disabled = false }) => {
  return (
    <div className={styles.codeContainer}>
      <div className={styles.codeHeader}>
        <h3>{label}</h3>
        <div className={styles.copyButtonContainer}>
          {readOnly && <CopyButton text={value} />}
        </div>
      </div>
      <div className={styles.editorWrapper}>
        <CodeMirror
          value={value}
          height="100%"
          theme={dracula}
          extensions={[python()]}
          onChange={onChange}
          editable={!readOnly && !disabled}
          basicSetup={{
            ...codeMirrorSetup,
            scrollbarStyle: 'native'
          }}
          style={{ fontFamily: "'Source Code Pro', monospace" }}
        />
        {disabled && <div className={styles.overlay}></div>}
      </div>
    </div>
  );
};

export default CodeEditor;