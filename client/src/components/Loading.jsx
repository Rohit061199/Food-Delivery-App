import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="spinner-border" role="status" style={{height: '100px', width: '100px', marginTop: '100px'}}>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
