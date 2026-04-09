import React from 'react'
import dp from "../assets/dp.webp"

const ReceiverMessage = ({image,message}) => {
  return (
        <div className='w-fit max-w-[80%] bg-[#1a1a1a] text-orange-400 px-4 py-2
        text-lg rounded-tl-none rounded-2xl relative left-0 shadow-md shadow-black/40
        flex flex-col gap-2 border border-orange-900/30'>
    {image && <img src={image} className='w-full max-w-[300px] rounded-lg border border-orange-900/20' alt="received"/>}
     {message && <span className="break-words font-medium">{message}</span>}
        </div>
  )
}

export default ReceiverMessage