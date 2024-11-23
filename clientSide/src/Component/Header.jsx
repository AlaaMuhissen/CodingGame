import React, { useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { usePoints } from './PointContext';
import { useNavigate } from 'react-router-dom';
import { GiCash } from "react-icons/gi";
import CountUp from 'react-countup';
import { useUser } from './UserContext';
import { useSyllabus } from './SyllabusContext';

const Header = ({ name, title }) => {
  const { points, updatePoints } = usePoints();
  const { userName, role,user } = useUser();
  console.log("username is " , userName)
  console.log("user is " , user)
  const navigate = useNavigate();
  const syllabus = useSyllabus()
  const restart = () => {
    const defaultProgress = syllabus.syllabusContent.map((topic) => ({
      name: topic.lanName,
      topics: topic.topics.map((topicName) => ({
        name: topicName,
        levels: Array.from({ length: topic.levelNum }, (_, index) => ({
          name: `Level ${index + 1}`,
          completed: false,
          currentQuestion: 0,
          solvedQuestions: [],
        })),
      })),
    }));

    // Initialize default points
    const initialPoints = 0;

    // Save progress, points, and token to localStorage
    localStorage.setItem('progress', JSON.stringify(defaultProgress));
    localStorage.setItem('points', JSON.stringify(initialPoints));
    updatePoints(0)
    navigate('/dashboard')

  }

  useEffect(() => {
    const storedPoints = localStorage.getItem('points');
    if (storedPoints !== null) {
      updatePoints(parseInt(storedPoints, 10));
    }
    <CountUp end={points} duration={10} />

  }, [updatePoints]);
  const logOut = () => {
    localStorage.clear();
    navigate('/')
  };
   const handleClickRoute = ()=>{
    navigate('/dashboard')
   }
  return (
    <header className='xl:mb-18 md:mb-16 flex flex-col md:flex-row justify-between items-center'>
    <div className='mb-3 md:mb-0 md:flex md:flex-col' onClick={handleClickRoute}>
      <h3 className='text-2xl md:text-4xl text-[#FF4CB7] font-bold mb-1 md:mb-3' style={{fontFamily :'cursive'}}>
        Hi Again {userName}
      </h3>
      <p className='text-lg md:text-xl text-[#4E75FF] font-bold' style={{fontFamily :'cursive'}}>{title}</p>
    </div>
  
    <p className='text-lg md:text-2xl text-[#FFD700] font-bold ' style={{fontFamily :'cursive'}}><GiCash /> {points}</p>
  
    <button onClick={logOut} className='md:ml-4'>
      <AiOutlineLogout color='#4E75FF' size={'2rem'} />
    </button>

    <button onClick={restart} className='md:ml-4'>
      <AiOutlineLogout color='black' size={'2rem'} />
    </button>
  </header>
  
  );
};

export default Header;
