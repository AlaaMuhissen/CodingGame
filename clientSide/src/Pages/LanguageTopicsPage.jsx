import React from 'react'
import { useParams } from 'react-router-dom'
import { useSyllabus } from '../Component/SyllabusContext';
import TopicCard from '../Component/CreateCard/TopicCard';
import Header from '../Component/Header';
import NavBar from '../Component/NavBar';
import HtmlTitle from '../Component/HtmlTitle';


function LanguageTopicsPage() {
    const language = useParams()["language_Topics"].split("_")[0];
    const syllabus = useSyllabus();
    const languageTopics = syllabus.syllabusContent?.find(lan => lan.lanName == language)
    
  return (
     <>
      <div className='p-4 md:p-8 lg:p-12 xl:p-16'>
        <Header
          name={"Alaa"}
          title={"Let's add a new item together!"} />

          <HtmlTitle title={"Pick a Tale, Sparkle and Sail "}/>
     <div className='flex flex-wrap gap-4'>
       {
        languageTopics?.topics?.map((topic, i) =>(
        <TopicCard 
        title= {topic}
        language = {language}
        key= {i}/>
        )
        )
      }
      </div>
      </div>
     </>
  )
}

export default LanguageTopicsPage