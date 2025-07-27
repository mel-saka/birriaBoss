import React from 'react';

/** Wrapper used to apply the global background and typography. */
const PageWrapper = ({ children }) => (
  <div className="page-wrapper">
    {children}
  </div>
);

export default PageWrapper;
