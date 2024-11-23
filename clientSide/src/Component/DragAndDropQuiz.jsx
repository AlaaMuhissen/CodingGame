import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragContainer from './DragContainer';
import BlocksDiv from './BlocksDiv';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import CodeBlock from './CodeBlock';
import { usePoints } from './PointContext';
import Header from './Header';
import useSound from 'use-sound';
import coinsSound from '/sounds/cash-register-fake-88639.mp3'
import ohNoSound from '/sounds/oh-no-113125.mp3'
import wahSound from '/sounds/wah-wah-sad-trombone-6347.mp3'
import CodeLevel from './CodeLevel';
export default function DragAndDropQuiz({
  question,
  availableBlocks,
  answer,
  level,
  qNum,
  lan,
  allQuestionNum,
  reward
}) {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState([]);
  const [isRun, setIsRun] = useState(false);
  const [counter, setCounter] = useState(0);
  const { points, updatePoints } = usePoints();
  const [play] = useSound(coinsSound);
  const [playOhNo] = useSound(ohNoSound);
  const [playWah] = useSound(wahSound);
  const [resultHtml, setResultHtml] = useState('');
  const progress = JSON.parse(localStorage.getItem('progress'));

  useEffect(() => {
    const storedPoints = localStorage.getItem('points');
    if (storedPoints !== null) {
      updatePoints(parseInt(storedPoints, 10));
    }
  }, [updatePoints]);

const handleCorrectAnswer = () => {
  const isCorrect =
    userAnswer.length === answer.length &&
    userAnswer.every((obj1) =>
      answer.some((obj2) => obj1.id === obj2.id)
    );

  if (isCorrect || level === 1) {
    console.log("Correct!");
    toast("User's answer is correct!");
    setUserAnswer([]);
    setIsRun(true);
    setCounter(0);
    play();

    const updatedProgress = progress.map((progressItem) => {
      if (progressItem.name === lan) {
        return {
          ...progressItem,
          topics: progressItem.topics.map((topicItem) => {
            if (topicItem.name === topic) {
              return {
                ...topicItem,
                levels: topicItem.levels.map((levelItem, index) => {
                  if (index === parseInt(level) - 1) {
                    const maxQuestions = allQuestionNum;

                    // Check if question is already solved
                    if (levelItem.solvedQuestions?.includes(parseInt(qNum))) {
                      toast.info("No points awarded: Question already solved.");
                      return levelItem; // Return unchanged level
                    }

                    // Add the question to solvedQuestions and update progress
                    const nextQuestion = levelItem.currentQuestion + 1;
                    return {
                      ...levelItem,
                      completed: nextQuestion >= maxQuestions,
                      currentQuestion: Math.min(nextQuestion, maxQuestions),
                      solvedQuestions: [
                        ...(levelItem.solvedQuestions || []), // Preserve existing solved questions
                        parseInt(qNum), // Add current question to solvedQuestions
                      ],
                    };
                  }
                  return levelItem;
                }),
              };
            }
            return topicItem;
          }),
        };
      }
      return progressItem;
    });

    // Save progress locally
    localStorage.setItem("progress", JSON.stringify(updatedProgress));

    // Update points only if the question is new
    if (!progress.some((item) =>
      item.topics.some((topic) =>
        topic.levels.some((level) =>
          level.solvedQuestions?.includes(parseInt(qNum))
        )
      )
    )) {
      const newPoints = points + reward;
      updatePoints(newPoints);
      localStorage.setItem("points", newPoints);
    }

    // Send updated progress to the server
    fetch("https://codingname.onrender.com/api/user/progress", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ progress: updatedProgress }),
    }).catch((err) => console.error("Error updating progress:", err));

    // Navigate to the next challenge or level
    if (parseInt(qNum) + 1 >= allQuestionNum) {
      setTimeout(() => {
        navigate(`/dashboard/${lan}_Topics/${topic}/levels/${parseInt(level) + 1}/challenges/0`);
        window.location.reload();
      }, 2500);
    } else {
      setTimeout(() => {
        navigate(`/dashboard/${lan}_Topics/${topic}/levels/${level}/challenges/${parseInt(qNum) + 1}`);
        window.location.reload();
      }, 2500);
    }

    setResultHtml(userAnswer.map((block) => block.value).join(""));
  } else {
    console.log("Try Again");
    playOhNo();
    toast.error("Try again!");
  }
};
  const handleRunButton = () => {
    setIsRun(true);
    console.log('Updated User Answer:', userAnswer);
    const is = userAnswer.filter((ans) => ans.id !== ans.boardId);
    is.length === 0 ? handleCorrectAnswer(): playWah();
  };

  return (
    <div className="flex">
    {
      parseInt(level) <= 2 ? (<DndProvider backend={HTML5Backend}>
        <BlocksDiv availableBlocks={availableBlocks} />
        <div className="flex flex-col gap-10 text-[#fff]">
          <div className="flex justify-center">
            <span className='font-bold'>{question}</span>
          </div>
          <div className="flex items-center gap-4 justify-center">
            {answer.map((drop, i) => (
              <DragContainer
                availableBlocks={availableBlocks}
                key={i}
                boardId={drop.id}
                level={parseInt(level)}
                setUserAnswerCallback={setUserAnswer}
                userAnswer={userAnswer}
                isRun={isRun}
                answerBlockNum={answer.length}
                onCorrectAnswer={handleCorrectAnswer}
                counter={setCounter}
                tempC={counter}
              />
            ))}
            <ToastContainer />
            {parseInt(level) === 2 && <button onClick={handleRunButton}>Run</button>}
          </div>
        {
          isRun && <div className="bg-white text-black rounded-lg shadow-md p-4 max-w-md mx-auto overflow-hidden">
          <div dangerouslySetInnerHTML={{ __html: resultHtml }} />
          </div>
        }  
        </div>
       
      </DndProvider>) :

      (<CodeLevel />)
    }
      
    </div>
  );
}
