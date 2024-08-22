export const scrollbarStyles = {
  /**
   * Renders the scrollbar thumb with specific styling.
   *
   * @param {Object} param0 - The object containing props and style.
   * @param {Object} param0.style - The style to be applied to the thumb.
   * @param {Object} props - Additional props to be applied to the thumb.
   * @returns {JSX.Element} The rendered thumb component.
   */
  renderThumb: ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '4px',
      cursor: 'pointer',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  },

  /**
   * Renders the vertical scrollbar track with specific styling.
   *
   * @param {Object} param0 - The object containing props and style.
   * @param {Object} param0.style - The style to be applied to the vertical track.
   * @param {Object} props - Additional props to be applied to the vertical track.
   * @returns {JSX.Element} The rendered vertical track component.
   */
  renderTrackVertical: ({ style, ...props }) => {
    const trackStyle = {
      backgroundColor: 'transparent',
      right: 2,
      bottom: 2,
      top: 2,
      borderRadius: '4px',
      width: '8px',
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  },

  /**
   * Renders the horizontal scrollbar track with specific styling.
   *
   * @param {Object} param0 - The object containing props and style.
   * @param {Object} param0.style - The style to be applied to the horizontal track.
   * @param {Object} props - Additional props to be applied to the horizontal track.
   * @returns {JSX.Element} The rendered horizontal track component.
   */
  renderTrackHorizontal: ({ style, ...props }) => {
    const trackStyle = {
      backgroundColor: 'transparent',
      left: 2,
      right: 2,
      bottom: 2,
      borderRadius: '4px',
      height: '8px',
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  },

  /**
   * Renders the scrollbar view with specific padding styling.
   *
   * @param {Object} param0 - The object containing props and style.
   * @param {Object} param0.style - The style to be applied to the view.
   * @param {Object} props - Additional props to be applied to the view.
   * @returns {JSX.Element} The rendered view component.
   */
  renderView: ({ style, ...props }) => {
    const viewStyle = {
      padding: '0 8px 0 0',
    };
    return <div style={{ ...style, ...viewStyle }} {...props} />;
  },
};
