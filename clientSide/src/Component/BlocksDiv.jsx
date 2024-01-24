import React ,{useEffect ,useState} from 'react'
import CodeBlock from './CodeBlock';

import img from '/abstract-colorful-cube-shapes-sculpture.jpg'
function BlocksDiv({availableBlocks}) {  

  return (
   <>
   <div className='flex justify-center items-center w-full md:w-2/3 lg:w-2/5 mx-auto p-3 md:p-4 relative overflow-hidden rounded-lg'>

 
<div className="w-full md:w-2/3 lg:w-2/5 mx-auto p-3 md:p-4 relative overflow-hidden rounded-lg ">
  <div
    className=" absolute inset-0 transform flex justify-center items-center"
    style={{
      backgroundImage: `url(${img})`,
      backgroundPosition: 'right',
      border: '1px solid #FF4CB7',
      borderRadius : '0.5rem'
    }}
  />
  <div className="relative z-10 flex justify-center items-center">
    <div className="flex flex-col items-center gap-3 md:gap-4">
      {availableBlocks.map((code, i) => (
        <CodeBlock id={code.id} value={code.value} key={i} />
      ))}
    </div>
  </div>
</div>
</div>



   </>
  )
}

export default BlocksDiv;