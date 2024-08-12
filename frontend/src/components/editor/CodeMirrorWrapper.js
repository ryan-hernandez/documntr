import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { customDraculaTheme } from './config/themes/customDraculaTheme';
import { getLanguageExtension } from './utils/languageOptions';
import { codeMirrorSetup } from './config/codeMirrorConfig';
import styles from './styles/CodeEditor.module.css';

/**
 * CodeMirrorWrapper component for rendering a CodeMirror editor.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The current value of the editor.
 * @param {Function} props.onChange - Callback function that is called when the content is changed.
 * @param {boolean} props.readOnly - Indicates if the editor is read-only.
 * @param {boolean} props.disabled - Indicates if the editor is disabled.
 * @param {string} props.language - The language for syntax highlighting.
 * @returns {JSX.Element} The rendered CodeMirror editor component.
 */
const CodeMirrorWrapper = ({ value, onChange, readOnly, disabled, language }) => {
  return (
    <div className={styles.editorWrapper}>
      <CodeMirror
        value={value}
        height="100%"
        theme={customDraculaTheme}
        extensions={[getLanguageExtension(language)()]}
        onChange={onChange}
        editable={!readOnly && !disabled}
        basicSetup={{
          ...codeMirrorSetup,
          scrollbarStyle: 'native'
        }}
      />
      {disabled && <div className={styles.overlay}></div>}
    </div>
  );
};

export default CodeMirrorWrapper;