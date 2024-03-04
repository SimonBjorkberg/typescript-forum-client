'use client'

import Image from "next/image";
import icon from '../images/dashboard.png'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function ProfileBar() {

    const { loggedInUser }: any = useContext(AuthContext)

    return (
        <div className="h-10 w-full flex justify-end">
            <div className="my-auto flex">
                <Image src={icon} alt="" className="w-9 h-9 bg-black border border-neutral-700" />
                <div className="flex flex-row gap-2 border border-neutral-700 p-1">
                    <p>{ loggedInUser?.username }</p>
                    <p className="bg-[#14b78f] px-1">100</p>
                </div>
            </div>
        </div>
    )
}