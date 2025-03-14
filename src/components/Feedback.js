import React from 'react';

const Feedback = ({ isCorrect }) => {
  if (isCorrect === null) return null;
  return (
    <p>{isCorrect ? "Correct!" : "Incorrect, try again!"}</p>
  );
};

export default Feedback;
