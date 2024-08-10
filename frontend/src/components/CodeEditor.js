import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CustomScrollbars from './CustomScrollbars';
import { codeMirrorSetup } from '../config/codeMirrorConfig';
import styles from '../styles/CodeEditor.module.css';
import CopyButton from './CopyButton';

const CodeEditor = ({ value, onChange, label, readOnly = false, disabled = false }) => {
  return (
    <div className={styles.codeContainer}>
      <div className={styles.codeHeader}>
        <h3>{label}</h3>
        {readOnly && <CopyButton text={value} />}
      </div>
      <div className={styles.editorWrapper}>
        <CustomScrollbars>
          <CodeMirror
            value={value}
            height="500px"
            theme={dracula}
            extensions={[python()]}
            onChange={onChange}
            editable={!readOnly && !disabled}
            basicSetup={codeMirrorSetup}
            style={{ fontFamily: "'Source Code Pro', monospace" }}
          />
        </CustomScrollbars>
        {disabled && <div className={styles.overlay}></div>}
      </div>
    </div>
  );
};

export default CodeEditor;