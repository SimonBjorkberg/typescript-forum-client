'use client'

import { useRouter } from "next/navigation"
import { useContext } from "react"
import { SearchContext } from "../context/search.context"

export default function SearchResultContainer({ thread }: any) {
    const router = useRouter()
    
    const { setSearchValue, setSearchResult }: any = useContext(SearchContext)
        

    return (
        <div className="min-h-12 h-12 w-full p-1 bg-neutral-800 border-b border-t border-neutral-700 flex justify-between flex-row" key={thread._id} onClick={() => {router.push(`/thread?id=${thread._id}`); setSearchValue(""); setSearchResult([])}}>
            <p className="font-light my-auto">{thread.title}</p>
            <div className="text-sm my-auto">
                <p>
                    by: {thread.author.username}
                </p>
            </div>
        </div>
    )
}