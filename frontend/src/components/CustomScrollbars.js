import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

/**
 * CustomScrollbars component that wraps children in a scrollable container
 * with customized scrollbar styles.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components to be rendered.
 * @returns {JSX.Element} The rendered CustomScrollbars component.
 */
const CustomScrollbars = ({ children }) => {
  /**
   * Renders a custom scrollbar thumb.
   *
   * @param {Object} param0 - The parameters for rendering the thumb.
   * @param {Object} param0.style - The styles for the scrollbar thumb.
   * @param {Object} param0.props - The additional properties for the thumb.
   * @returns {JSX.Element} The rendered scrollbar thumb.
   */
  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '4px',
      cursor: 'pointer'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  /**
   * Renders a custom vertical track.
   *
   * @param {Object} param0 - The parameters for rendering the vertical track.
   * @param {Object} param0.style - The styles for the track.
   * @param {Object} param0.props - The additional properties for the track.
   * @returns {JSX.Element} The rendered vertical track.
   */
  const renderTrackVertical = ({ style, ...props }) => {
    const trackStyle = {
      position: 'absolute',
      width: '6px',
      right: '2px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px'
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  };

  /**
   * Renders a custom horizontal track.
   *
   * @param {Object} param0 - The parameters for rendering the horizontal track.
   * @param {Object} param0.style - The styles for the track.
   * @param {Object} param0.props - The additional properties for the track.
   * @returns {JSX.Element} The rendered horizontal track.
   */
  const renderTrackHorizontal = ({ style, ...props }) => {
    const trackStyle = {
      position: 'absolute',
      height: '6px',
      left: '2px',
      right: '2px',
      bottom: '2px',
      borderRadius: '3px'
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  };

  /**
   * Renders a custom view for the scrollbar.
   *
   * @param {Object} param0 - The parameters for rendering the view.
   * @param {Object} param0.style - The styles for the view.
   * @param {Object} param0.props - The additional properties for the view.
   * @returns {JSX.Element} The rendered view.
   */
  const renderView = ({ style, ...props }) => {
    const viewStyle = {
      paddingRight: '10px'
    };
    return <div style={{ ...style, ...viewStyle }} {...props} />;
  };

  return (
    <Scrollbars
      renderThumbVertical={renderThumb}
      renderThumbHorizontal={renderThumb}
      renderTrackVertical={renderTrackVertical}
      renderTrackHorizontal={renderTrackHorizontal}
      renderView={renderView}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbars;