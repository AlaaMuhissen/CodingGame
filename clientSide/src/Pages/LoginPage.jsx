import React, { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import loginBackground from '../../public/abstract-colorful-cube-shapes-sculpture.jpg'
import Avatar from '../../public/Group.svg'
import { useSyllabus } from '../Component/SyllabusContext';
function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword , setUserPassword] = useState("");
  const [isTeacher , setIsTeacher] = useState(false);
  const navigate = useNavigate();
  const syllabus = useSyllabus();
 
  const handleEmailChange = (e) => {
     e.preventDefault();
     setUserEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setUserPassword(e.target.value);
  }
  const handleLogin = (e) => {
    e.preventDefault();
  
    const userData = {
      email: userEmail,
      password: userPassword
    };

    fetch('http://localhost:3001/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        localStorage.setItem('token', data.token);
      

        const defaultProgress = syllabus.syllabusContent.map((topic) => ({
          name: topic.lanName,
          topics: topic.topics.map((topicName) => ({
            name: topicName,
            levels: Array.from({ length: topic.levelNum }, (_, index) => ({
              name: `Level ${index + 1}`,
              completed: false,
              currentQuestion: 0,
            })),
          })),
        }));

        if (data.progress.length === 0) {
          data.progress = [...defaultProgress];
        }
        
        localStorage.setItem('progress', JSON.stringify(data.progress));
        localStorage.setItem('points', JSON.stringify(data.points));

        navigate(`/dashboard`);
        setUserEmail("");
        setUserPassword("");
        setIsTeacher(false);

      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };
  
  return (
   <>
       <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${loginBackground})` }}>
      <div className='rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8'>
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src={Avatar} width="150" alt="Avatar" />
         
          </div>
          <form>
            <div className="mb-4 text-lg">
              <input
                type="email"
                placeholder='example@gmail.com'
                className="rounded-3xl border-none bg-[#fff] bg-opacity-90 px-6 py-2  text-inherit placeholder-[#e066c5] shadow-lg outline-none backdrop-blur-md text-[#233f92]"
                value={userEmail}
                onChange={handleEmailChange}
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                type="password"
                placeholder="*********"
                className="rounded-3xl border-none bg-[#fff] bg-opacity-90 px-6 py-2  text-inherit placeholder-[#e066c5] shadow-lg outline-none backdrop-blur-md text-[#233f92]"
                value={userPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={isTeacher}
                  onChange={() => setIsTeacher((isTeacher) => !isTeacher)}
                />
                <span className="ml-2 text-sm text-[#fff]">Is Teacher</span>
              </label>
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                type="button"
                className="rounded-3xl bg-[#5aafca] bg-opacity-90 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-[#87e1fc]"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
   </>
  )
}

export default LoginPage