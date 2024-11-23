import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBackground from '../../public/abstract-colorful-cube-shapes-sculpture.jpg';
import { useSyllabus } from '../Component/SyllabusContext';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const navigate = useNavigate();
  const syllabus = useSyllabus();
  const handleRegistration = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const newUserData = {
      username,
      email,
      password,
      role,
    };

    fetch('http://localhost:3001/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.error || 'Something went wrong');
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Build default progress from scratch
      const defaultProgress = syllabus.syllabusContent.map((topic) => ({
        name: topic.lanName,
        topics: topic.topics.map((topicName) => ({
          name: topicName,
          levels: Array.from({ length: topic.levelNum }, (_, index) => ({
            name: `Level ${index + 1}`,
            completed: false,
            currentQuestion: 0,
            solvedQuestions: [],
          })),
        })),
      }));

      // Initialize default points
      const initialPoints = 0;

      // Save progress, points, and token to localStorage
      localStorage.setItem('progress', JSON.stringify(defaultProgress));
      localStorage.setItem('points', JSON.stringify(initialPoints));
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('Student');
      setUsername('');
    })
    .catch((error) => {
      console.error('Error during registration:', error);
      setErrorMessage('This email is already registered. Try another one!');
      
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('Student');
      setUsername('');
    });
    
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="bg-gray-800 bg-opacity-75 rounded-xl px-10 py-8 shadow-lg backdrop-blur-md max-w-md w-full text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create an Account</h2>
        {errorMessage && (
            <div className="text-center mb-6">
              <span className="inline-block bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg animate-pulse shadow-lg">
                {errorMessage}
              </span>
            </div>
          )}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your username"
            className="w-full px-4 py-2 rounded-md bg-white text-gray-800 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-2 rounded-md bg-white text-gray-800 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-white text-gray-800 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-2 rounded-md bg-white text-gray-800 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <select
            className="w-full px-4 py-2 rounded-md bg-white text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>
        <div className="mt-8 flex justify-center text-lg text-black">
        <button
            type="button"
            className={`rounded-3xl px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 ${
              errorMessage ? 'bg-red-600 hover:bg-red-500' : 'bg-[#5aafca] hover:bg-[#87e1fc]'
            }`}
            onClick={handleRegistration}
          >
            Register
          </button>

        </div>
        <div className="mt-4 text-sm text-center">
          <span>Already have an account? </span>
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate('/')}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
