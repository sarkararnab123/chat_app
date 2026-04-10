import React, { useEffect, useRef, useState } from 'react'
import dp from "../assets/dp.webp"
import { IoCameraOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../config';
import { setUserData } from '../redux/userSlice';
import axios from "axios";

const Profile = () => {

  let { userData } = useSelector(state => state.user)
  const navigate = useNavigate();
  let dispatch = useDispatch()

  let [name,setName] = useState(userData?.name || "")
  let [frontendImage , setFrontendImage] = useState(userData?.image || dp)
  let [backendImage , setBackendImage] = useState(null)

  let image = useRef();

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setFrontendImage(userData.image || dp);
    }
  }, [userData]);

  const handleImage = (e)=>{
    let file = e.target.files[0]
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleProfile = async(e)=>{
      e.preventDefault()
      try {
        let formData = new FormData()
        formData.append("name",name)
        if(backendImage){
          formData.append("image",backendImage)
        }

        let result = await axios.put(`${serverUrl}/api/user/profile`,formData,{withCredentials:true});
        dispatch(setUserData(result.data))
        
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <div className='w-full min-h-screen bg-[#0a0a0a] flex justify-center items-center px-4 relative'>
      
      {/* Back Button */}
      <button 
        onClick={() => navigate("/")}
        className='absolute top-6 left-6 bg-[#121212] p-2 rounded-full shadow-md hover:bg-orange-900/20 transition border border-orange-900/30'
      >
        <IoArrowBack className='w-6 h-6 text-orange-600'/>
      </button>

      <div className='bg-[#121212] shadow-2xl shadow-black rounded-3xl p-8 flex flex-col items-center gap-6 w-full max-w-[400px] border border-orange-900/20'>
        
        <h1 className='text-orange-500 text-2xl font-bold mb-2'>Edit Profile</h1>

        {/* Profile Image */}
        <div className='relative group cursor-pointer' onClick={()=>image.current.click()}>
          <div className='w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-orange-600 shadow-lg shadow-black'>
            <img src={frontendImage} alt="profile" className='w-full h-full object-cover'/>
          </div>
          <div className='absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300'>
             <IoCameraOutline className='w-10 h-10 text-orange-500'/>
          </div>
          <button className='absolute bottom-2 right-2 bg-orange-600 p-2.5 rounded-full text-black shadow-lg hover:bg-orange-700 transition'>
            <IoCameraOutline className='w-5 h-5'/>
          </button>
        </div>

        {/* Form */}
        <form className='w-full flex flex-col gap-5' onSubmit={handleProfile}>

        <input type='file' hidden accept='image/*' ref={image} onChange={handleImage}/>
          
          <div className='w-full'>
            <label className='text-orange-700 text-sm ml-2 mb-1 block font-medium'>Display Name</label>
            <input
              type='text'
              placeholder='Enter your name'
              className='w-full p-4 rounded-xl bg-black/40 border border-orange-900/30 text-orange-100 outline-none focus:border-orange-500 transition'
              value = {name}
              onChange={(e)=> setName(e.target.value)}
            />
          </div>

          <div className='w-full'>
            <label className='text-orange-700 text-sm ml-2 mb-1 block font-medium'>Username</label>
            <input
              type='text'
              readOnly
              className='w-full p-4 rounded-xl bg-black/20 border border-orange-900/10 text-orange-900 cursor-not-allowed italic'
              value={userData?.userName || ""}
            />
          </div>

          <div className='w-full'>
            <label className='text-orange-700 text-sm ml-2 mb-1 block font-medium'>Email Address</label>
            <input
              type='email'
              readOnly
              className='w-full p-4 rounded-xl bg-black/20 border border-orange-900/10 text-orange-900 cursor-not-allowed italic'
              value={userData?.email || ""}
            />
          </div>

          <button
            type='submit'
            className='w-full bg-orange-600 text-black py-4 rounded-xl font-bold hover:bg-orange-700 transition transform hover:scale-[1.02] active:scale-95 shadow-lg mt-2'
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile