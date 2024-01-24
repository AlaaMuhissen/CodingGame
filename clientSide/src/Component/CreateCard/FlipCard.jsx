import React, { useState } from 'react';
import './FlipCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faTint, faHatWizard, faListUl } from '@fortawesome/free-solid-svg-icons';

const iconSize = '1.5rem'; 

const FlipCard = ({category ,index}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flip-card  ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="flip-card-inner ">
        <div className="flip-card-front ">
          <img src={category.url} alt="Avatar" className="w-full h-full" />
        </div>
        <div className="flip-card-back p-4 rounded-md shadow-md" key={index}>
  
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
  <div className="flex items-center justify-around mb-4">
    <h2 className="text-2xl font-bold text-gray-800">{category.category}</h2>
    <span className="text-sm text-gray-500">{category.subCategory}</span>
  </div>

  <div className="flex items-center mb-2">
    <FontAwesomeIcon icon={faListUl} className="text-blue-500 mr-2" />
    <span className="text-gray-700">Seasons: {category.seasons.join(', ')}</span>
  </div>

  <div className="flex items-center mb-2">
    <FontAwesomeIcon icon={faTint} className="text-green-500 mr-2" />
    <span className="text-gray-700">Waterproof: {category.waterproof.toString()}</span>
  </div>

  <div className="flex items-center">
    <FontAwesomeIcon icon={faHatWizard} className="text-purple-500 mr-2" />
    <span className="text-gray-700">With Hat: {category.withHat.toString()}</span>
  </div>
</div>


        {/* <FontAwesomeIcon icon={faListUl} className="mr-2" />
        Seasons: {category.seasons.join(', ')}
    
        <FontAwesomeIcon icon={faTint} className="mr-2" />
        Waterproof: {category.waterproof.toString()}
     
        <FontAwesomeIcon icon={faHatWizard} className="mr-2" />
        With Hat: {category.withHat.toString()}
       */}
  </div>
</div>
      
    </div>
  );
};

export default FlipCard;

          