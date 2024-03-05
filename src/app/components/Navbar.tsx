"use client"

import dashBoardIcon from '../images/icon.svg'
import ForumTopic from "./ForumTopic"
import { useState } from "react"

const topics = [
    {
        title: "Dashboard",
        icon: dashBoardIcon
    },
    {
        title: "Profiles",
        icon: dashBoardIcon
    },
    {
        title: "Incidents",
        icon: dashBoardIcon
    },
    {
        title: "Reports",
        icon: dashBoardIcon
    },
    {
        title: "Evidence",
        icon: dashBoardIcon
    },
    {
        title: "Charges",
        icon: dashBoardIcon
    },
    {
        title: "Staff",
        icon: dashBoardIcon
    },
    {
        title: "FTO Reports",
        icon: dashBoardIcon
    },
    {
        title: "Legislation",
        icon: dashBoardIcon
    },
]

export default function Navbar() {

    return (
        <nav className="flex flex-col gap-3 w-[18%] border-r border-neutral-800 h-[90%] my-auto">
            <div className="h-32 text-4xl font-bold text-neutral-100 text-center"></div>
            {topics.map((topic, index) => {
                return <ForumTopic title={topic.title} icon={topic.icon} key={index} />
            })}
        </nav>
    )
}