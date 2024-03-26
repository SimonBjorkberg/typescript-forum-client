'use client'

import Navbar from "../components/Navbar";
import ProfileBar from "../components/ProfileBar";
import SearchBar from "../components/SearchBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThreadContainer from "../components/ThreadContainer";
import threadService from "../utils/services/thread.service";

interface Thread {
    _id: string;
    title: string;
    numId: number;
    author: {
        username: string;
    };
    createdAt: string;
}

export default function Dashboard() {
    const [threads, setThreads] = useState([])
    const [reversedThreads, setReversedThreads] = useState([])
    const getPathName = usePathname()

    const pathName = getPathName.slice(1)

    const getThreads = async () => {
        const response = await threadService.getAll(pathName)
        setThreads(response.data.response)
        return;
    }

    useEffect(() => {
        getThreads()
    }, [getThreads])

    useEffect(() => {
        setReversedThreads(threads.reverse())
    }, [threads])

    return (
        <main className="flex h-screen w-full mx-auto">
            <div className="flex h-screen w-[80%] max-w-[1550px] mx-auto">
                <Navbar />
                <div className="w-full ml-5 flex flex-col h-[90%] my-auto">
                    <div className="h-24">
                        <ProfileBar />
                        <SearchBar />
                    </div>
                    <div className="overflow-y-auto my-1 flex flex-col gap-1" >

                        {reversedThreads.length === 0 && <div className="text-white">No threads created yet</div>}

                        {reversedThreads?.map((thread: Thread, i) => {
                            return <ThreadContainer key={i} thread={thread} />
                        })}
                        
                    </div>
                </div>
            </div>
        </main>
    )
}