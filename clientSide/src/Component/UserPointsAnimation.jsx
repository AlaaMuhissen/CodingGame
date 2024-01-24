// // UserPointsAnimation.js
// import React, { useState, useEffect } from 'react';
// import './UserPointsAnimation.css';

// const UserPointsAnimation = ({ userPoints }) => {
//   const [points, setPoints] = useState([]);

//   useEffect(() => {
//     // Sort the user points by scores in descending order
//     const sortedPoints = userPoints.sort((a, b) => b.score - a.score);
//     // Take the top 3 users
//     const top3Points = sortedPoints.slice(0, 3);
//     setPoints(top3Points);
//   }, [userPoints]);

//   const handleAnimation = () => {
//     // Update the points with new positions (for demonstration purposes)
//     const updatedPoints = points.map(point => ({
//       ...point,
//       x: Math.random() * 500,
//       y: Math.random() * 500,
//     }));

//     setPoints(updatedPoints);

//     // Optionally, you can reset the positions after a delay
//     setTimeout(() => {
//       setPoints(top3Points);
//     }, 1000);
//   };

//   return (
//     <div className="user-points-container">
//       {points.map((point, index) => (
//         <div
//           key={index}
//           className="user-point"
//           style={{ left: point.x, top: point.y }}
//         >
//           {point.name} - {point.score}
//         </div>
//       ))}
//       <button onClick={handleAnimation}>Animate Points</button>
//     </div>
//   );
// };

// export default UserPointsAnimation;
