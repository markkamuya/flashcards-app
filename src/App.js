import React, { useState } from "react";
import Flashcard from "./components/Flashcard";
import Feedback from "./components/Feedback";
import "./App.css";

const App = () => {
  const programmingFlashcards = [
    { question: "Which language is used for web development alongside HTML and CSS?", answer: "JavaScript" },
    { question: "What language is known as the father of all programming languages?", answer: "C" },
    { question: "Which programming language was developed by James Gosling in 1995?", answer: "Java" },
    { question: "Which language is known for its use in data science and AI?", answer: "Python" },
    { question: "Which language is used primarily for iOS development?", answer: "Swift" },
    { question: "What is the language used for building Android apps?", answer: "Kotlin" },
    { question: "Which language is known for its 'write once, run anywhere' philosophy?", answer: "Java" },
    { question: "Which programming language was created by Bjarne Stroustrup?", answer: "C++" }
  ];

  const [cards, setCards] = useState(programmingFlashcards);
  const [masteredCards, setMasteredCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const fuzzyMatch = (input, answer) => {
    return input.toLowerCase().includes(answer.toLowerCase());
  };

  const handleSubmitAnswer = () => {
    const correctAnswer = cards[currentCardIndex].answer;
    const userAns = userAnswer;

    const correct = fuzzyMatch(userAns, correctAnswer);
    setIsCorrect(correct);
    setIsFlipped(true);

    if (correct) {
      setCurrentStreak(currentStreak + 1);
      setLongestStreak(Math.max(longestStreak, currentStreak + 1));
    } else {
      setCurrentStreak(0);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
      setUserAnswer("");
      setIsCorrect(null);  // Reset the answer status for the next card
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
      setUserAnswer("");
      setIsCorrect(null);  // Reset the answer status for the previous card
    }
  };

  const handleShuffle = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setCurrentCardIndex(0);
  };

  const handleMasterCard = () => {
    const mastered = cards[currentCardIndex];
    const newCards = cards.filter((_, index) => index !== currentCardIndex);
    setMasteredCards([...masteredCards, mastered]);
    setCards(newCards);

    if (newCards.length === 0) {
      setCurrentCardIndex(0); // No cards left, reset
    } else if (currentCardIndex >= newCards.length) {
      setCurrentCardIndex(newCards.length - 1); // Move to the previous card if we removed the last one
    } else {
      handleNextCard(); // Move to the next card
    }
  };

  const handleTryAgain = () => {
    setUserAnswer("");  // Clear the input field
    setIsCorrect(null);  // Reset the correctness status
    setIsFlipped(false);  // Flip the card back
  };

  const handleRestart = () => {
    setMasteredCards([]);
    setCards(programmingFlashcards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setUserAnswer("");
    setIsCorrect(null);
    setCurrentStreak(0);
    setLongestStreak(0);
  };

  const allCardsMastered = masteredCards.length === programmingFlashcards.length;

  return (
    <div className="App">
      <h1>Programming Languages Flashcards Trivia</h1>
      <h3>Test your knowledge and master the world's most popular programming languages!</h3>

      <div className="flashcards">
        {!allCardsMastered ? (
          <>
            {cards.length > 0 && cards[currentCardIndex] && (
              <Flashcard card={cards[currentCardIndex]} onAnswer={handleAnswerChange} isFlipped={isFlipped} />
            )}
            <Feedback isCorrect={isCorrect} />
            <div className="controls">
              <button onClick={isCorrect === false ? handleTryAgain : handleSubmitAnswer}>
                {isCorrect === false ? "Try Again" : "Submit Answer"}
              </button>
              <button onClick={handlePreviousCard} disabled={currentCardIndex === 0}>Back</button>
              <button onClick={handleNextCard} disabled={currentCardIndex === cards.length - 1}>Next</button>
              <button onClick={handleShuffle}>Shuffle</button>
              <button onClick={handleMasterCard} disabled={cards.length === 0}>Mark as Mastered</button>
            </div>
            <div className="streak">
              <p>Streak: {currentStreak} (Longest: {longestStreak})</p>
            </div>
          </>
        ) : (
          <div className="completion-message">
            <h4>Hooray! You've mastered all the questions!</h4>
            <button onClick={handleRestart}>Start Over</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
