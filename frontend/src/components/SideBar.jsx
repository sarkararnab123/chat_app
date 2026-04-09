import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { IoSearch } from "react-icons/io5"
import { FiLogOut } from "react-icons/fi"
import axios from 'axios'
import { serverUrl } from '../main'
import { setOtherUsers, setSelectedUser, setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {

    const { userData, otherUsers, onlineUsers, selectedUser } = useSelector(state => state.user)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const handleLogout = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="lg:w-[30%] w-full h-screen bg-[#121212] border-r border-orange-900/20 flex flex-col justify-between">

            <div>
                {/* Header */}
                <div className="w-full h-[300.1px] bg-orange-600 rounded-b-[40px] shadow-lg flex flex-col justify-between px-6 py-5">

                    {/* App Name */}
                    <h1 className="text-black font-bold text-3xl tracking-wide">
                        Chatly
                    </h1>

                    {/* User Info */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-black shadow-md relative">
                            <img
                                src={userData?.image || dp}
                                alt="profile"
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() => navigate("/profile")}
                            />
                        </div>

                        <div>
                            <h2 className="text-black text-xl font-semibold">
                                Hi, {userData?.name || "User"}
                            </h2>
                            <p className="text-orange-100 text-sm">
                                Welcome back 👋
                            </p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center bg-black/20 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-black transition">
                        <IoSearch className="text-black/60 text-lg" />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="ml-2 w-full outline-none text-sm bg-transparent text-black placeholder:text-black/50"
                        />
                    </div>

                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pt-2">
                        {
                            otherUsers?.map((user) => {
                                const isOnline = onlineUsers?.includes(user._id);
                                return (
                                    <div
                                        key={user._id}
                                        className="w-[55px] h-[55px] rounded-full overflow-hidden border-2 border-black shadow-md hover:scale-105 transition cursor-pointer shrink-0 relative"
                                        onClick={() => dispatch(setSelectedUser(user))}
                                    >
                                        <img
                                            src={user.image || dp}
                                            alt="user"
                                            className="w-full h-full object-cover"
                                        />
                                        {isOnline && (
                                            <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                                        )}
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

                {/* Chat List Area */}
                <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">

                    {
                        otherUsers?.map((user) => {
                            const isOnline = onlineUsers?.includes(user._id);
                            const isSelected = selectedUser?._id === user._id;
                            return (
                                <div
                                    key={user._id}
                                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition relative cursor-pointer ${
                                        isSelected ? "bg-orange-600 text-black" : "bg-black/40 hover:bg-black/60 text-orange-500"
                                    }`}
                                    onClick={() => dispatch(setSelectedUser(user))}
                                >
                                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                        <img
                                            src={user.image || dp}
                                            alt="user"
                                            className="w-full h-full object-cover"
                                        />
                                        {isOnline && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold ${isSelected ? "text-black" : "text-orange-500"}`}>{user.name}</h3>
                                        <p className={`text-xs truncate ${isSelected ? "text-black/70" : "text-orange-700"}`}>Click to chat</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>

            {/* Logout Button (Bottom Left) */}
            <div className="p-4">
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-600 text-black shadow-md hover:bg-orange-700 hover:scale-105 transition"
                    onClick={handleLogout}
                >
                    <FiLogOut className="text-xl" />
                </button>
            </div>


        </div>
    )
}

export default SideBar