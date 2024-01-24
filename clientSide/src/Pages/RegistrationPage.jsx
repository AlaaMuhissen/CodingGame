import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const handleRegistration = () => {
      if(password !== confirmPassword){
        alert("error");
        return;
      }
      const newUserData = {
        username :username,
        email: email,
        password : password,
        role : role,
      }
      fetch("https://codingname.onrender.com/api/user/register", {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(newUserData)
      })
      .then (response => response.json())
      .then (data =>{
        console.log(data);
        localStorage.setItem('token', data);
        navigate('/dashboard');
        setEmail("");
        setConfirmPassword("")
        setPassword("")
        setRole("")
        setUsername("")
      })
      .catch(error =>{
        console.error('Error during register:', error);
      })
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Register an Account</h2>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Email:</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Password:</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Confirm Password:</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Role:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Username:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-[#704F38] text-white py-2 px-4 rounded-md hover:bg-[#5c3d2f] focus:outline-none focus:ring focus:border-white-300"
          onClick={handleRegistration}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;
