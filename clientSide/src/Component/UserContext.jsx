import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUsers] = useState({});
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");


  useEffect(() => {
    const fetchUser = async () => {
      if(localStorage.getItem('token')){
          try {
          const response = await fetch("http://localhost:3001/api/user/profile", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
  
          if (!response.ok) {
             if(!localStorage.getItem("userDetails")){
              console.log("there is nOOOO")
                 throw new Error('Failed to fetch user user');
             }
           
          }
          const userInLocal = localStorage.getItem("userDetails");
          const data = await response.json() || userInLocal;
          setUsers(data);
          setUserName(data.username);
          setRole(data.role);
        } catch (error) {
          console.error('Error during fetching user user:', error);
        }
      };
  
      
              }
      fetchUser();
  }, []);

//   const updatePoints = async (newPoints) => {
//     try {
//       const response = await fetch("https://codingname.onrender.com/api/user/point", {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ user: newPoints }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update user user');
//       }

//       setUsers(newPoints);
//     } catch (error) {
//       console.error('Error during updating user user:', error);
//     }
//   };

  return (
    <UserContext.Provider value={{ user ,userName , role}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
