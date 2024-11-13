import React, { forwardRef } from 'react';

const Page = forwardRef(function Page({ children }, ref) {
  const style = {
    width: '300px',
    height: '300px',
    margin: '50px auto',
    border: '2px dashed #333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '10px', // Ensure padding isn't affecting the layout
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
});

export default Page;
