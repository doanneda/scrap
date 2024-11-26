import React, { forwardRef } from 'react';

const Page = forwardRef(({ size, children }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        border: '2px solid black',
        margin: '50px auto',
        overflow: 'visible',
      }}
    >
      {children}
    </div>
  );
});

export default Page;
