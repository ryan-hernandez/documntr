import React from 'react';
import styles from '../styles/SessionButton.module.css';

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