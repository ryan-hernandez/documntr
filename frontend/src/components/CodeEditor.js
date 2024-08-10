import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CustomScrollbars from './CustomScrollbars';
import { codeMirrorSetup } from '../config/codeMirrorConfig';
import styles from '../styles/CodeEditor.module.css';

/**
 * CodeEditor component for displaying and editing Python code with syntax highlighting.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} props.value - The current value of the code editor.
 * @param {function} props.onChange - The function to call when the code value changes.
 * @param {string} props.label - The label to display above the code editor.
 * @param {boolean} [props.readOnly=false] - Determines if the editor is editable.
 * @param {boolean} [props.disabled=false] - Determines if the overlay is visible to indicate a disabled state.
 * @returns {JSX.Element} The rendered CodeEditor component.
 */
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