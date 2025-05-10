import React from "react";

const Success = ({successMessage}) => {
  return (
    <div>
      <div className="alert alert-success" role="alert">
        {successMessage}
      </div>
    </div>
  );
};

export default Success;
