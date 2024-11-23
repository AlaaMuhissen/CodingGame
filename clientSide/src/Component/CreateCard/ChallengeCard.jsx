import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaLock, FaCheckCircle } from "react-icons/fa";

function ChallengeCard({ questionNum }) {
  const navigate = useNavigate();
  const { topic, levelNum } = useParams();
  const language = useParams()["language_Topics"].split("_")[0];
  const progress = JSON.parse(localStorage.getItem("progress"));

  const currentQuestion = progress?.find((progressItem) => progressItem.name === language)?.topics
    .find((topicData) => topicData.name === topic)?.levels[parseInt(levelNum) - 1]?.currentQuestion || 0;

  const solvedQuestions =
    progress?.find((progressItem) => progressItem.name === language)?.topics
      .find((topicData) => topicData.name === topic)?.levels[parseInt(levelNum) - 1]?.solvedQuestions || [];

  const isLocked = questionNum > currentQuestion; 
  const isCompleted = solvedQuestions.includes(questionNum); // Check if the question is completed

  const handleClick = () => {
    if (!isLocked) {
      navigate(`${questionNum}`);
    }
  };

  return (
    <div
      className={`w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-48 mx-auto bg-white rounded-md overflow-hidden shadow-lg transform transition-transform duration-300 ${
        isLocked ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 cursor-pointer opacity-100'
      } p-3 md:p-5 h-full max-h-40 mb-5`}
      onClick={handleClick}
    >
      <div className="mt-4 md:mt-3 flex justify-center items-center">
        <div
          className={`font-bold text-lg md:text-xl mb-2 ${
            isLocked ? 'text-gray-400' : isCompleted ? 'text-green-500' : 'text-[#4E75FF]'
          } mx-auto text-center`}
          style={{ fontFamily: 'cursive' }}
        >
          Challenge {questionNum}
        </div>
        {/* Add lock or checkmark */}
        {isLocked ? (
          <div className="flex justify-center items-center">
            <FaLock fontSize={'32px'} color={'#FF4CB7'} />
          </div>
        ) : isCompleted ? (
          <div className="flex justify-center items-center">
            <FaCheckCircle fontSize={'32px'} color={'#4CAF50'} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ChallengeCard;
