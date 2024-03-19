'use client'

import Image from "next/image";
import icon from '../images/dashboard.png'
import logoutIcon from '../images/exit.png'
import { useContext } from "react";
import { AuthContext } from "../utils/context/auth.context";
import { useRouter } from "next/navigation";

export default function ProfileBar() {
    const { loggedInUser, logOutUser }: any = useContext(AuthContext)
    const router = useRouter()
    const handleLogOut = () => {
        logOutUser()
        router.push('/')
    }

    return (
        <div className="h-10 w-full flex justify-end">
            <div className="my-auto flex">
                <Image src={icon} alt="" className="w-9 h-9 bg-black border border-neutral-700" />
                <div className="flex flex-row gap-2 border border-neutral-700 p-1">
                    <p>{loggedInUser?.username}</p>
                    <p className="bg-[#14b78f] px-1 text-black">100</p>
                </div>
                <button onClick={handleLogOut} className="ml-2 my-auto hover:opacity-100 opacity-50 transition-all duration-200"><Image src={logoutIcon} alt="" className="w-7"></Image></button>
            </div>
        </div>
    )
}