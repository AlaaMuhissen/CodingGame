import React, { createContext, useContext, useState, useEffect } from 'react';

const PointContext = createContext();

export const PointProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      if(localStorage.getItem('token')){
          try {
          const response = await fetch("https://codingname.onrender.com/api/user/point", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
  
          if (!response.ok) {
             if(!localStorage.getItem("points")){
              console.log("there is nOOOO")
                 throw new Error('Failed to fetch user points');
             }
           
          }
          const pointInLocal = localStorage.getItem("points");

          console.log("there is yess")
          const data = await response.json() || pointInLocal;
          setPoints(data.points);
        } catch (error) {
          console.error('Error during fetching user points:', error);
        }
      };
  
      fetchPoints();

        }
  }, []);

  const updatePoints = async (newPoints) => {
    try {
      const response = await fetch("https://codingname.onrender.com/api/user/point", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ points: newPoints }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user points');
      }

      setPoints(newPoints);
    } catch (error) {
      console.error('Error during updating user points:', error);
    }
  };

  return (
    <PointContext.Provider value={{ points, updatePoints }}>
      {children}
    </PointContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointProvider');
  }
  return context;
};
