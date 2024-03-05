'use client'

import axios from "axios";
import MyEditor from "../components/MyEditor";
import Navbar from "../components/Navbar";
import ProfileBar from "../components/ProfileBar";
import SearchBar from "../components/SearchBar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Dashboard() {

    const [threads, setThreads] = useState([])
    const [reversedThreads, setReversedThreads] = useState([])
    const [createThread, setCreateThread] = useState(false)
    const getPathName = usePathname()

    const pathName = getPathName.slice(1)
    const router = useRouter()

    const getThreads = async () => {
        const response = await axios.get(`http://localhost:5005/thread/getAll/${pathName}`)
        setThreads(response.data.response)
        return;
    }

    useEffect(() => {
        getThreads()
    }, [])

    useEffect(() => {
        setReversedThreads(threads.reverse())
    }, [threads])

    return (
        <>
            <Navbar />
            <main className="w-full ml-5 max-h-full flex flex-col">
                <div className="h-24">
                    <ProfileBar />
                    <SearchBar pathName={pathName} setCreateThread={setCreateThread} createThread={createThread} />
                </div>
                {createThread === false ? <div className="overflow-y-scroll my-1 flex flex-col gap-1" >
                    {reversedThreads?.map((thread: any) => {
                        return <div className="min-h-24 flex bg-opacity-50 bg-neutral-800 border border-neutral-800 hover:cursor-pointer hover:bg-neutral-800 transition-all duration-100" key={thread._id}
                            onClick={() => router.push(`/thread?id=${thread._id}`)}
                        >
                            <Image className="w-20 bg-black m-2" src="" alt="" />
                            <div className="flex flex-col justify-between m-2">
                                <div>
                                    <h1 className="font-bold">{thread.title}</h1>
                                </div>
                                <div className="flex text-sm">
                                    <p className="bg-[#14b78f] px-1 text-black">ID: {thread.numId}</p>
                                    <p className="bg-neutral-700 px-3 text-neutral-200">{thread.author?.username} - {thread.createdAt}</p>
                                </div>
                            </div>
                        </div>;
                    })}
                </div> :
                    <MyEditor />
                }
            </main>
        </>
    )
}