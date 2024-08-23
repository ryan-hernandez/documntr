import { useEffect } from 'react';

/**
 * Custom hook that triggers an action when a specified key is pressed.
 *
 * @param {string} targetKey - The key that will trigger the action when pressed.
 * @param {function} action - The function to be executed when the target key is pressed.
 * @param {Object} [options={}] - Optional settings for the hook.
 * @param {boolean} [options.shift] - If true, the action will only trigger when the shift key is also pressed.
 * @param {boolean} [options.disabled] - If true, the action will not trigger regardless of the key pressed.
 *
 * @returns {void}
 */
const useKeyPress = (targetKey, action, options = {}) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (
                event.key === targetKey &&
                (!options.shift || event.shiftKey) &&
                !options.disabled
            ) {
                event.preventDefault();
                action();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [targetKey, action, options]);
};

export default useKeyPress;
