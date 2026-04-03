

import React, { useState } from "react";

function Syntex() {
  const [isEligible, setIsEligible] = useState(false);

  const handleClick = () => {
    setIsEligible(!isEligible); // toggle value
  };

  return (
    <div>
      <button onClick={handleClick}>
        Check Eligibility
      </button>

      {/* Conditional Rendering */}
      {isEligible ? (
        <h2>You are eligible to vote </h2>
      ) : (
        <h2>You are not eligible to vote </h2>
      )}
    </div>
  );
}

export default Syntex;