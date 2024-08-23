/**
 * Formats a given time value to three decimal places.
 *
 * @param {number} time - The time value to format.
 * @returns {string} The formatted time as a string with three decimal places, or 'N/A' if the input is invalid.
 */
export const formatTime = (time) => {
    if (time == null || isNaN(time)) {
        return 'N/A';
    }
    return time.toFixed(3);
};
