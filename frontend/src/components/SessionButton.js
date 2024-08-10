import React from 'react';
import styles from '../styles/SessionButton.module.css';

/**
 * Renders a button for saving the current session.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onSaveSession - Callback function to handle saving the session.
 * @returns {JSX.Element} The rendered session button component.
 */
const SessionButton = ({ onSaveSession }) => {
  return (
    <div className={styles.sessionButtonContainer}>
      <button className={styles.button} onClick={onSaveSession}>
        Save Current Session
      </button>
    </div>
  );
};

export default SessionButton;