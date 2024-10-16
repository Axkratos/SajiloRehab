import React from 'react';

const FeedbackBar = ({ leftDifference, rightDifference }) => {
  const averageDifference = (leftDifference + rightDifference) / 2;
  const progress = Math.max(0, 100 - averageDifference * 2);  // Simple scoring based on difference

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: '20px' }}>
      <div style={{ width: "80%", backgroundColor: "#ddd" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "25px",
            backgroundColor: progress > 80 ? "green" : "red",
          }}
        />
      </div>
      <span style={{ marginLeft: "10px" }}>{Math.floor(progress)}%</span>
    </div>
  );
};

export default FeedbackBar;
