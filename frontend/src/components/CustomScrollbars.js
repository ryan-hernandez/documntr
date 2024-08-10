import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { scrollbarStyles } from '../styles/scrollbarStyles';

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