'use client'

import { useRouter } from "next/navigation";

interface Props {
    thread: {
        _id: string,
        title: string;
        numId: number;
        author: {
            username: string;
        };
        createdAt: string;
    }
}

export default function ThreadContainer({ thread }: Props) {
    const router = useRouter()

    return (
        <div className="min-h-24 flex bg-opacity-50 bg-neutral-800 border border-neutral-800 hover:cursor-pointer hover:bg-neutral-800 transition-all duration-100" key={thread._id}
            onClick={() => router.push(`/thread?id=${thread._id}`)}
        >
            <div className="w-20 bg-black m-2" />
            <div className="flex flex-col justify-between m-2">
                <div>
                    <h1 className="font-bold">{thread.title}</h1>
                </div>
                <div className="flex text-sm">
                    <p className="bg-[#14b78f] px-1 text-black">ID: {thread.numId}</p>
                    <p className="bg-neutral-700 px-3 text-neutral-200">{thread.author?.username} - {thread.createdAt}</p>
                </div>
            </div>
        </div>
    )
}