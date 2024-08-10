import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CustomScrollbars from './CustomScrollbars';
import { codeMirrorSetup } from '../config/codeMirrorConfig';
import styles from '../styles/CodeEditor.module.css';

const CodeEditor = ({ value, onChange, label, readOnly = false, disabled = false }) => {
  return (
    <div className={styles.codeContainer}>
      <h3>{label}</h3>
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
          />
        </CustomScrollbars>
        {disabled && <div className={styles.overlay}></div>}
      </div>
    </div>
  );
};

export default CodeEditor;