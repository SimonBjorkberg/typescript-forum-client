"use client"

import ForumTopic from "./ForumTopic"
import topics from '../utils/topics'

export default function Navbar() {

    return (
        <nav className="flex flex-col gap-3 w-[18%] border-r border-neutral-800 h-[90%] my-auto">
            <div className="h-32 text-4xl font-bold text-neutral-100 text-center"></div>
            {topics.map((topic, index) => {
                return <ForumTopic title={topic.title} link={topic.link} key={index} />
            })}
        </nav>
    )
}