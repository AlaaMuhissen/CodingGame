import { useState } from 'react'
import HTMLPage from './Pages/HTMLPage'
import LoginPage from './Pages/LoginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegistrationPage from './Pages/RegistrationPage'
import DashboardPage from './Pages/DashboardPage'
import LanguageTopicsPage from './Pages/LanguageTopicsPage'
import { SyllabusProvider } from './Component/SyllabusContext'
import LevelsPage from './Pages/LevelsPage'
import ChallengePage from './Pages/ChallengePage'
import { PointProvider } from './Component/PointContext'
import PointProviderLayout from './Component/PointProviderLayout'


function App() {
  
  // #100F15
  // #D33B96
  // #2C4290


  // #FF4CB7
  // #4E75FF
  return (
    <>
    <div className='bg-[#100F15] min-h-screen '>
   
    <BrowserRouter>
      <SyllabusProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
           <Route element={<PointProviderLayout />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/dashboard/:language_Topics' element={<LanguageTopicsPage />} />
            <Route path='/dashboard/:language_Topics/:topic/levels' element={<LevelsPage />} />
            <Route path='/dashboard/:language_Topics/:topic/levels/:levelNum/challenges' element={<ChallengePage />} />
            <Route path='/dashboard/:language_Topics/:topic/levels/:levelNum/challenges/:challengeNum' element={<HTMLPage />} />
          </Route>
        </Routes>
      </SyllabusProvider>
    </BrowserRouter>
 
    </div>
    </>
  )
}

export default App
