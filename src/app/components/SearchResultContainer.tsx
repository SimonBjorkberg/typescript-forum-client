'use client'

import { useRouter } from "next/navigation"
import { useContext } from "react"
import { SearchContext } from "../context/search.context"
import topics from '../utils/topics'

export default function SearchResultContainer({ thread }: any) {
    const router = useRouter()
    
    const { setSearchValue, setSearchResult }: any = useContext(SearchContext)
        
    const topic = topics.filter((threads) => {
        return thread.parentTopic === threads.link
    })

    return (
        <div className="w-full min-h-16 p-1 bg-neutral-800 border-b border-t border-neutral-700 flex justify-between flex-row hover:cursor-pointer hover:bg-neutral-700 transition-colors duration-100" key={thread._id} onClick={() => {router.push(`/thread?id=${thread._id}`); setSearchValue(""); setSearchResult([])}}>
            <p className="font-light my-auto">{thread.title}</p>
            <div className="text-sm my-auto">
                <p>
                    by {thread.author.username} in {topic[0].title}
                </p>
            </div>
        </div>
    )
}