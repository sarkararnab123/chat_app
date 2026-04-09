import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import useGetMessage from '../customhooks/getMessages'

const Home = () => {
  useGetMessage()
  return (
    <div className='w-full h-screen flex '>
      <SideBar/>
      <MessageArea/>
    </div>
  )
}

export default Home