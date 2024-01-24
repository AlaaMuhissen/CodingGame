import React, { createContext, useContext, useState, useEffect } from 'react';

const QAContext = createContext();

export const QAProvider = ({children})=>{
  const [qa,setQa] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/syllabus/main")
      .then(res => res.json())
      .then(data => {
        setSyllabus(data);
      })
      .catch(error => {
        console.error('Error during fetching syllabus:', error);
      });
  }, []);

  return (
    <QAContext.Provider value={qa}>
      {children}
    </QAContext.Provider>
  );

};

export const useQA = () => {
    const qa = useContext(QAContext);
    if (!qa) {
      throw new Error('useSyllabus must be used within a SyllabusProvider');
    }
    return qa;
  };