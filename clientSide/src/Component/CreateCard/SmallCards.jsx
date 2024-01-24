import React, { useState } from 'react';
import { getIconComponent } from '../Logics/createIconComponent';
// import { Flip } from '@mui/icons-material';
// import FlipCard from './FlipCard.jsx';


export default function SmallCards({ icon, title, category, handleClick }) {
  
  const [clicked, setClicked] = useState(false);


  const handleButtonClick = () => {
    setClicked((prev)=> !prev);
    handleClick(category);
  };

  const iconColor = clicked ? '#704F38' : '#fff';
  const IconComponent = getIconComponent(icon, 25, iconColor);

  return (
    <div
      className={`flex rounded-md justify-between max-w-48 max-h-24 p-4 cursor-pointer ${
        clicked ? 'bg-[#fff] text-[#704F38] border-1 border-solid border-[#704F38]' : 'bg-[#704F38] text-[#fff]'
      }`}
      onClick={handleButtonClick}
    >
      {IconComponent}
      <div className='ml-2 text-xl'>{title}</div>
    </div>
  );
}
