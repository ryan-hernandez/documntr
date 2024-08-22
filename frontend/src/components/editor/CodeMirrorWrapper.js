import React, { forwardRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { customDraculaTheme } from './config/themes/customDraculaTheme';
import { getLanguageExtension } from './utils/languageOptions';
import { codeMirrorSetup } from './config/codeMirrorConfig';
import styles from './styles/CodeEditor.module.css';

/**
 * A wrapper component for the CodeMirror editor that handles various props
 * including value, change handling, read-only mode, disabled state, and language.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.value - The current value of the editor.
 * @param {function} props.onChange - Callback function triggered on value change.
 * @param {boolean} props.readOnly - Indicates if the editor is in read-only mode.
 * @param {boolean} props.disabled - Indicates if the editor is disabled.
 * @param {string} props.language - The programming language for syntax highlighting.
 * @param {React.Ref} ref - The ref to be forwarded to the CodeMirror component.
 * @returns {JSX.Element} The rendered CodeMirror wrapper component.
 */
const CodeMirrorWrapper = forwardRef(({ value, onChange, readOnly, disabled, language }, ref) => {
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
        ref={ref}
      />
      {disabled && <div className={styles.overlay}></div>}
    </div>
  );
});

export default CodeMirrorWrapper;
