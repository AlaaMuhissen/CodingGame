import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import NavBar from '../Component/NavBar'
import LanguageCard from '../Component/CreateCard/LanguageCard'
import { useSyllabus } from '../Component/SyllabusContext'
import { IoIosArrowBack ,IoIosArrowForward } from "react-icons/io";
import HtmlTitle from '../Component/HtmlTitle'


function DashboardPage() {
  const syllabus = useSyllabus();
  
  return (
     <>
     <div className='p-4 md:p-8 lg:p-12 xl:p-16'>
       <Header
          name ={"Alaa"}
          title = {"How do you wanna spice up your brain today?"} />
        
       <HtmlTitle title={"Language To Learn"} />
        <div className='flex flex-wrap '>
        {
          
            syllabus&& syllabus.syllabusContent?.map((lan, i) => (
            
                <LanguageCard icon= {lan.icon} title= {lan.lanName} key={i} />
            ))
        }
        </div>
       </div>
     </>
  )
}

export default DashboardPage