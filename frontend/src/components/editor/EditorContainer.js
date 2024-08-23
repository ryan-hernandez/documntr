import React from 'react';
import styles from './styles/EditorContainer.module.css';
import CodeEditor from './CodeEditor';
import EditorHeader from './EditorHeader';

/**
 * A wrapper component that encapsulates the editor header and the code editor.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the editor.
 * @param {string} props.code - The code to be displayed in the editor.
 * @param {function} props.onChange - The callback function to handle code changes.
 * @param {string} props.language - The programming language selected for the editor.
 * @param {function} props.onLanguageChange - The callback function to change the language.
 * @param {boolean} props.disabled - If true, disables the editor.
 * @param {boolean} props.readOnly - If true, sets the editor to read-only mode.
 * @param {React.Ref} ref - The ref forwarded to the code editor.
 * @returns {JSX.Element} The rendered editor wrapper.
 */
const EditorWrapper = React.forwardRef(({ label, code, onChange, language, onLanguageChange, disabled, readOnly }, ref) => (
    <div className={styles.editorWrapper}>
        <EditorHeader
            label={label}
            readOnly={readOnly}
            disabled={disabled}
            language={language}
            onLanguageChange={onLanguageChange}
            value={code}
        />
        <div className={styles.editorContent}>
            {readOnly && !code ? (
                <div className={styles.placeholderEditor}>
                    <p>Documented code will appear here after analysis.</p>
                </div>
            ) : (
                <CodeEditor
                    value={code}
                    onChange={onChange}
                    disabled={disabled}
                    language={language}
                    onLanguageChange={onLanguageChange}
                    readOnly={readOnly}
                    ref={ref}
                />
            )}
        </div>
    </div>
));

/**
 * The main container component for code editing and displaying documented code.
 *
 * @param {Object} props - The component props.
 * @param {string} props.inputCode - The input code for the editor.
 * @param {function} props.setInputCode - The function to update the input code.
 * @param {string} props.documentedCode - The documented code to be displayed.
 * @param {string} props.selectedLanguage - The currently selected programming language.
 * @param {function} props.setSelectedLanguage - The function to update the selected language.
 * @param {boolean} props.isAnalyzing - If true, the editors are currently disabled.
 * @param {React.Ref} props.inputEditorRef - A ref for the input editor.
 * @returns {JSX.Element} The rendered editor container.
 */
const EditorContainer = ({
    inputCode,
    setInputCode,
    documentedCode,
    selectedLanguage,
    setSelectedLanguage,
    isAnalyzing,
    inputEditorRef
}) => {
    return (
        <div className={styles.editorsContainer}>
            <EditorWrapper
                label="Input Code"
                code={inputCode}
                onChange={setInputCode}
                language={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                disabled={isAnalyzing}
                ref={inputEditorRef}
                showLanguageSelector={true}
            />
            <EditorWrapper
                label="Documented Code"
                code={documentedCode}
                language={selectedLanguage}
                readOnly={true}
                showCopyButton={true}
            />
        </div>
    );
};

export default EditorContainer;
