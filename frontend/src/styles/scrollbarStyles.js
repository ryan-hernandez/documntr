export const scrollbarStyles = {
    renderThumb: ({ style, ...props }) => {
      const thumbStyle = {
        borderRadius: '4px',
        backgroundColor: '#888',
      };
      return <div style={{ ...style, ...thumbStyle }} {...props} />;
    },
  
    renderTrackVertical: ({ style, ...props }) => {
      const trackStyle = {
        backgroundColor: '#333',
        borderRadius: '4px',
        right: 2,
        bottom: 2,
        top: 2,
        width: '10px',
      };
      return <div style={{ ...style, ...trackStyle }} {...props} />;
    },
  
    renderTrackHorizontal: ({ style, ...props }) => {
      const trackStyle = {
        backgroundColor: '#333',
        borderRadius: '4px',
        left: 2,
        right: 2,
        bottom: 2,
        height: '10px',
      };
      return <div style={{ ...style, ...trackStyle }} {...props} />;
    },
  
    renderView: ({ style, ...props }) => {
      const viewStyle = {
        padding: '0 16px 0 0',
      };
      return <div style={{ ...style, ...viewStyle }} {...props} />;
    },
  };