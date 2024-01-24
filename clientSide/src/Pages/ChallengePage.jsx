import React from 'react'
import { useLocation } from 'react-router-dom';
import ChallengeCard from '../Component/CreateCard/ChallengeCard'
import NavBar from '../Component/NavBar';
import Header from '../Component/Header';
import HtmlTitle from '../Component/HtmlTitle';
function ChallengePage() {
    const location = useLocation();
    const questions = location.state.questions;

  return (
   
    <>
         <div className='p-4 md:p-8 lg:p-12 xl:p-16'>
      <Header
          name={"Alaa"}
          title={"Your Path to Triumph Awaits!"} />
        <HtmlTitle title={"Embark on Your Daily Adventure, Little Explorer! "}/>
          <div className='flex flex-wrap '>

    {
      questions.map((question ,index) => (
          <ChallengeCard questionNum = {index} question = {question} key={index}
         /> 
      ))
    }
    </div>
    </div>
    </>
  )
}

export default ChallengePage