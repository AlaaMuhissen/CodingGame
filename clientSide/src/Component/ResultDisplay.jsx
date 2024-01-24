import React from 'react';

const ResultDisplay = ({ resultHtml }) => {
  return <div dangerouslySetInnerHTML={{ __html: resultHtml }} />;
};

export default ResultDisplay;
