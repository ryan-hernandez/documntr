import React from 'react';
import styles from './styles/EditorContainer.module.css';
import CodeEditor from './CodeEditor';
import CopyButton from './CopyButton';
import LanguageSelector from './LanguageSelector';

/**
 * A functional component that wraps the code editor with a header, and optional controls.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.label - The label displayed above the editor.
 * @param {string} props.code - The code to be edited.
 * @param {function} props.onChange - Function to call when the code changes.
 * @param {string} props.language - The selected programming language.
 * @param {function} props.onLanguageChange - Function to call when the language changes.
 * @param {boolean} props.disabled - Indicates if the editor should be disabled.
 * @param {boolean} props.readOnly - Indicates if the editor is in read-only mode.
 * @param {boolean} props.showCopyButton - Flag to show the copy button.
 * @param {boolean} props.showLanguageSelector - Flag to show the language selector.
 * @param {React.Ref} ref - The ref forwarded to the code editor.
 * @returns {JSX.Element} The rendered editor wrapper component.
 */
const EditorWrapper = React.forwardRef(({ label, code, onChange, language, onLanguageChange, disabled, readOnly, showCopyButton, showLanguageSelector }, ref) => (
    <div className={styles.editorWrapper}>
        <div className={styles.editorHeader}>
            <h3>{label}</h3>
            <div className={styles.editorControls}>
                {showLanguageSelector && (
                    <LanguageSelector
                        language={language}
                        onLanguageChange={onLanguageChange}
                        disabled={disabled}
                    />
                )}
                {showCopyButton && <CopyButton text={code} />}
            </div>
        </div>
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
 * The main container for the code editors.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.inputCode - The code entered in the input editor.
 * @param {function} props.setInputCode - Function to update the input code.
 * @param {string} props.documentedCode - The code that has been documented.
 * @param {string} props.selectedLanguage - The currently selected programming language.
 * @param {function} props.setSelectedLanguage - Function to update the selected language.
 * @param {boolean} props.isAnalyzing - Flag to indicate if analysis is in progress.
 * @param {React.Ref} props.inputEditorRef - Ref for the input editor component.
 * @returns {JSX.Element} The rendered editor container component.
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
