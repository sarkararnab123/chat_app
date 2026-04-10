import React, { useEffect, useRef } from 'react'
import { IoArrowBack } from "react-icons/io5";
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { FaImage } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { useState } from 'react';
import EmojiPicker from "emoji-picker-react"
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import { serverUrl } from '../config'
import { setMessages, addMessage } from '../redux/message.Slice';
import axios from "axios";

const MessageArea = () => {

    let {selectedUser,userData,socket} = useSelector(state=>state.user)
    let dispatch = useDispatch()
    let [showPicker , setShowPicker] =useState(false)
    let [input,setInput] = useState("")
    let [frontendImage,setFrontendImage] = useState(null)
    let [backendImage,setBackendImage] = useState(null)
    let image = useRef()
    const scrollRef = useRef()
    let {messages} = useSelector(state=>state.message)

    const handleSendMessage = async(e)=>{
      e.preventDefault()
      if (!input && !backendImage) return;
      try {
        let formdata = new FormData();
        formdata.append("message",input)
        if(backendImage){
          formdata.append("image",backendImage)
        }
        let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formdata,{withCredentials:true})
        dispatch(addMessage(result.data))
        setInput("")
        setFrontendImage(null)
        setBackendImage(null)
        
      } catch (error) {
        console.log(error)
      }
    }

    const onEmojiClick = (emojiData)=>{
        setInput(prevInput=>prevInput+emojiData.emoji)
        setShowPicker(false)
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(()=>{
      if(!socket || !selectedUser) return;
      socket.on("newMessage",(mess)=>{
        if(mess.sender === selectedUser._id){
          dispatch(addMessage(mess))
        }
      })
      return ()=>socket.off("newMessage")

    },[socket, dispatch, selectedUser])

    const handleImage = (e)=>{
      let file = e.target.files[0];
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file))
    }
    return (

        <div className='hidden lg:flex w-[70%] h-full bg-[#0a0a0a] border-l border-orange-900/20 flex-col'>
        {selectedUser && 
        <div className='w-full h-[100.1vh] flex flex-col'>
        <div className='relative w-full h-[100.1px] bg-orange-600 shadow-md flex items-center px-5 rounded-b-[30px] gap-[20.1px]'>
                <button
                    className='p-2 rounded-full hover:bg-orange-700 text-black transition'
                    onClick={()=>dispatch(setSelectedUser(null))}
                    
                >
                    <IoArrowBack className='w-7 h-7 text-black' />
                </button>
                <div className='w-[50.1px] h-[50.1px] rounded-full overflow-hidden flex justify-center items-center
                 shadow-black shadow-lg border-2 border-black'>
                <img src={selectedUser?.image || dp} className='w-full h-full object-cover'/>
                </div>
                <h1 className='text-black font-semibold text-[20.1px]'>{selectedUser?.name || "user"}</h1>
            </div>
            <div className='w-full h-[550.1px] relative flex flex-col py-[30.1px] px-[20.1px] overflow-auto gap-4 scrollbar-thin scrollbar-thumb-orange-600'>

              {showPicker && <div className='absolute bottom-20 left-[20.1px] z-50'><EmojiPicker width={250} height={450} onEmojiClick={onEmojiClick} theme="dark"/></div>}
              {messages?.map((mess, index) => {
  return (
    <div key={index} ref={index === messages.length - 1 ? scrollRef : null}>
      {mess.sender === userData?._id ? (
        <SenderMessage image={mess.image} message={mess.message} />
      ) : (
        <ReceiverMessage image={mess.image} message={mess.message} />
      )}
    </div>
  );
})}
            </div>
            
            {/* Input Area */}
            <div className='w-full h-[80.1px] bg-[#121212] flex items-center px-6 gap-4 border-t border-orange-900/20'>
                <div className='flex items-center gap-3'>
                    <button 
                        className='text-orange-500 hover:text-orange-400 transition'
                        onClick={()=>setShowPicker(!showPicker)}
                    >
                        <BsEmojiSunglassesFill className='w-6 h-6' />
                    </button>
                    <label className='cursor-pointer text-orange-500 hover:text-orange-400 transition'>
                        <FaImage className='w-6 h-6' />
                        <input type="file" className='hidden' onChange={handleImage} accept="image/*" />
                    </label>
                </div>
                
                <form className='flex-1 flex items-center gap-3' onSubmit={handleSendMessage}>
                    <div className='flex-1 relative'>
                        {frontendImage && (
                            <div className='absolute bottom-16 left-0 bg-black/80 p-2 rounded-lg border border-orange-500'>
                                <img src={frontendImage} className='h-20 rounded' alt="preview" />
                                <button 
                                    className='absolute -top-2 -right-2 bg-orange-600 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs'
                                    onClick={()=>setFrontendImage(null)}
                                >x</button>
                            </div>
                        )}
                        <input 
                            type="text" 
                            placeholder='Type a message...' 
                            className='w-full bg-black/40 text-orange-100 outline-none px-4 py-3 rounded-full border border-orange-900/30 focus:border-orange-500 transition'
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit"
                        className='bg-orange-600 p-3 rounded-full text-black hover:bg-orange-700 transition shadow-lg'
                    >
                        <IoIosSend className='w-6 h-6' />
                    </button>
                </form>
            </div>
            </div>

            }
            {!selectedUser && (
  <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 bg-[#0a0a0a]">
      <div className='w-40 h-40 bg-orange-600/10 rounded-full flex items-center justify-center mb-6'>
          <h1 className='text-orange-600 text-6xl font-bold italic'>C</h1>
      </div>
      <h2 className='text-orange-500 text-3xl font-bold mb-2'>Welcome to Chatly</h2>
      <p className='text-orange-800 max-w-md'>Select a user from the sidebar to start a conversation. Stay connected in real-time.</p>
  </div>
)}
        </div>
    )
}

export default MessageArea
