import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate , useParams} from 'react-router-dom';

import DragAndDropQuiz from '../Component/DragAndDropQuiz';
import { useSyllabus } from '../Component/SyllabusContext';
import Header from '../Component/Header';
import NavBar from '../Component/NavBar';
function HTMLPage() {
    const syllabus =  useSyllabus();
    const [questionArr , setQuestionArr] = useState([]);
    const navigate =useNavigate ();
    const {challengeNum ,levelNum ,topic , language_Topics}  = useParams();
    const language = language_Topics.split("_")[0];
    const progress = JSON.parse(localStorage.getItem('progress'))
    
    // useEffect(() => {
    //   fetch("http://localhost:3001/api/user/progress", {
    //     method: "PUT",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify({ progress: progress }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => console.log(data))
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }, [progress]);
    
 

    useEffect (() =>{
      if(levelNum <= 2){
        console.log("...fetching"); 
          fetch(`http://localhost:3001/api/question/${language}/${topic}/${parseInt(levelNum)}`).then(res => res.json()).then(data => setQuestionArr(data.questions)).catch((err)=>{
            navigate(`/dashboard/`)
          });
      }
      else{
        navigate(`/dashboard/`)
      }
    },[])
 
  return (
    <>
    <div className='p-4 md:p-8 lg:p-12 xl:p-16'>
       <Header
          name={"Alaa"}
          title={"Let's add a new item together!"} />
    <div className='p-4 md:p-8 lg:p-12 xl:p-16'>
     {questionArr&& (questionArr.length !== 0 ) && <DragAndDropQuiz 
       question= {questionArr[parseInt(challengeNum)].question}
       availableBlocks={questionArr[parseInt(challengeNum)].availableBlocks}
       answer={questionArr[parseInt(challengeNum)].answer}
       level={levelNum}
       qNum = {challengeNum}
       lan = {language}
       allQuestionNum = {questionArr.length}
       reward ={questionArr[parseInt(challengeNum)].reward}
       />}

    </div>
   
    </div>

    </>
  )
}

export default HTMLPage