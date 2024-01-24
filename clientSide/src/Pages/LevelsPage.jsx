import React, { useEffect, useState } from 'react'
import { useSyllabus } from '../Component/SyllabusContext'
import { useParams } from 'react-router-dom';
import LevelCard from '../Component/CreateCard/LevelCard';
import Header from '../Component/Header';
import NavBar from '../Component/NavBar';
import HtmlTitle from '../Component/HtmlTitle';


function LevelsPage() {
  const language = useParams()["language_Topics"].split("_")[0];
  const topic = useParams()['topic']
  const [level, setLevel]= useState([]);

  


  useEffect(()=> {
     fetch(`https://codingname.onrender.com/api/question/${language}/${topic}`,  {headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => setLevel(data)).catch(error => {
        console.error('Error during login:', error);
    })

  },[])
  return (
     <>
      <div className='p-4 md:p-8 lg:p-12 xl:p-16'>
       <Header
          name={"Alaa"}
          title={"Let's add a new item together!"} />
            <HtmlTitle title={"Pick Your Playground and Let the Fun Begin "}/>
 <div className='flex flex-wrap '>
       {
        level?.levels?.map((details ,i ) => (
            <LevelCard 
            key= {i}
            language= {language}
            topic ={topic}
            levelNumber= {(i+1)}
            questionNum={details.questions.length} 
            questions={details.questions}
          
            />
        ))
       }
       </div>
      </div>
     </>
  )
}

export default LevelsPage