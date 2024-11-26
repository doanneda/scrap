import React, { forwardRef } from 'react';

const Page = forwardRef(({ size, color = 'white', children }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        //border: '2px solid black',
        margin: '50px auto',
        overflow: 'visible',
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  );
});

export default Page;
