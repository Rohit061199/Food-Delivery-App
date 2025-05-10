import React from "react";

const Error = ({errorMessage}) => {
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    </div>
  );
};

export default Error;
