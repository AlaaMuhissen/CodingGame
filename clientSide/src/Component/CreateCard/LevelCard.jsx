import React from 'react';
import { useNavigate } from 'react-router-dom';

function LevelCard({ language, topic, levelNumber, questionNum, questions }) {
  const navigate = useNavigate();

  const progress = JSON.parse(localStorage.getItem('progress'));

  const currentQuestion =
    progress?.find((progressItem) => progressItem.name === language)?.topics
      .find((topicData) => topicData.name === topic)?.levels[parseInt(levelNumber) - 1]?.currentQuestion || 0;

  const isPreviousLevelCompleted =
    parseInt(levelNumber) === 1 || // Allow access to the first level
    progress?.find((progressItem) => progressItem.name === language)?.topics
      .find((topicData) => topicData.name === topic)?.levels[parseInt(levelNumber) - 2]?.completed;

  const handleClick = () => {
    if (!isPreviousLevelCompleted) {
      return; // Prevent navigation for locked levels
    }

    navigate(`/dashboard/${language}_Topics/${topic}/levels/${levelNumber}/challenges`, {
      state: { questions, language, topic, levelNumber },
    });
  };

  return (
    <div
      className={`relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-48 mx-auto bg-white rounded-md overflow-hidden shadow-lg transition-transform duration-300 ${
        isPreviousLevelCompleted ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'
      } h-full max-h-40 mb-5`}
      onClick={isPreviousLevelCompleted ? handleClick : null} // Prevent click on locked levels
      style={{
        opacity: isPreviousLevelCompleted ? 1 : 0.5, // Grayed-out locked levels
      }}
    >
      {/* Level Info */}
      <div className="relative mt-2 md:mt-4">
        <h2
          className={`font-bold text-lg md:text-xl mb-2 mx-auto text-center ${
            isPreviousLevelCompleted ? 'text-[#4E75FF]' : 'text-gray-400'
          }`}
          style={{ fontFamily: 'cursive' }}
        >
          Level {levelNumber}
        </h2>
        <div
          className={`font-bold text-lg md:text-xl mb-2 mx-auto text-center ${
            isPreviousLevelCompleted ? 'text-[#FF4CB7]' : 'text-gray-400'
          }`}
          style={{ fontFamily: 'cursive' }}
        >
          {currentQuestion} of {questionNum}
        </div>
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-300 rounded-full mt-2">
          <div
            className="h-full bg-[#4E75FF] rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / questionNum) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Lock Icon for Locked Levels */}
      {!isPreviousLevelCompleted && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <span className="text-white text-4xl font-bold">🔒</span>
        </div>
      )}
    </div>
  );
}

export default LevelCard;
