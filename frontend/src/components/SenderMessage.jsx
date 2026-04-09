import React from 'react'
import dp from "../assets/dp.webp"

const SenderMessage = ({image,message}) => {
  return (
    <div className='w-fit max-w-[80%] bg-orange-600 text-black px-4 py-2
    text-lg rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-md shadow-black/40
    flex flex-col gap-2 border border-orange-500/50'>
    {image && <img src={image} className='w-full max-w-[300px] rounded-lg border border-black/10' alt="sent"/>}
    {message && <span className="break-words font-medium">{message}</span>}
    </div>
  )
}

export default SenderMessage