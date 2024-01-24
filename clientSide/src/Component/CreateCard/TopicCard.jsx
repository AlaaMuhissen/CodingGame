import React from 'react'
import { useNavigate } from 'react-router-dom';
import img from '/abstract-colorful-cube-shapes-sculpture.jpg'

function TopicCard({title ,language}) {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/dashboard/${language}_Topics/${title}/levels`);
    };
  
    return (
      <div className='w-full rounded-lg md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-48 mx-auto overflow-hidden transition-transform duration-300 hover:scale-105  h-full max-h-40 cursor-pointer hover:shadow-lg bg-left-bottom' style={{ backgroundImage: `url(${img})`, backgroundPosition : 'bottom right'}}>
      <div
      className="shadow-lg max-sm:px-8 bg-opacity-50 backdrop-filter backdrop-blur-sm backdrop-saturate-180 border border-[#FF4CB7] rounded-lg p-4 text-wrap"
      onClick={handleClick}
    >
      <div className="mt-4 md:mt-6 text-balance">
        <div className="font-bold text-sm md:text-md lg:text-lg xl:text-lg text-[#fff] mb-2 " style={{fontFamily :'cursive'}}>
          {title}
        </div>
      </div>
    </div>
    </div>
    
    );
  }
  
export default TopicCard