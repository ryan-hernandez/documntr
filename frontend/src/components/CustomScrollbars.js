import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { scrollbarStyles } from '../styles/scrollbarStyles';

/**
 * A component that wraps children with customizable scrollbars.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be wrapped with custom scrollbars.
 * @returns {JSX.Element} The rendered scrollbars component containing the children.
 */
const CustomScrollbars = ({ children }) => {
  return (
    <Scrollbars
      renderThumbVertical={scrollbarStyles.renderThumb}
      renderThumbHorizontal={scrollbarStyles.renderThumb}
      renderTrackVertical={scrollbarStyles.renderTrackVertical}
      renderTrackHorizontal={scrollbarStyles.renderTrackHorizontal}
      renderView={scrollbarStyles.renderView}
      hideTracksWhenNotNeeded={true}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbars;