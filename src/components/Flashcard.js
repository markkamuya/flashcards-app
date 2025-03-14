import React, { useState } from 'react';

const Flashcard = ({ card, onAnswer, isFlipped }) => {
  return (
    <div className="flashcard">
      <h2>{isFlipped ? card.answer : card.question}</h2>
      {!isFlipped && (
        <input
          type="text"
          placeholder="Your answer"
          onChange={onAnswer}
        />
      )}
    </div>
  );
};

export default Flashcard;
