'use client'

import { useContext } from "react"
import { SearchContext } from "../context/search.context"
import SearchResultContainer from "./SearchResultContainer"

export default function SearchBar({ setCreateThread, createThread }: any) {
    const { searchValue, setSearchValue, searchResult }: any = useContext(SearchContext)

    return (
        <main className="w-full flex justify-end gap-1 my-2 h-10">
            {!createThread && <button className="bg-[#214642] my-auto hover:bg-[#326a64] h-7 px-5" onClick={() => setCreateThread(true)}><span className="mr-4 font-bold">&#43;</span>Create Thread</button>}
            {!createThread && <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Search" className="my-auto h-7 border-none px-2 text-black" />}
            {createThread && <button className="bg-[#214642] my-auto hover:bg-[#326a64] py-[6px] h-10 px-5" onClick={() => setCreateThread(false)}>Back</button>}
            {searchResult.length > 0 && <div className="absolute bg-neutral-900 border border-neutral-700 flex flex-col gap-1 w-[415px] max-h-[200px] h-[200px] overflow-y-auto bg- mt-10">
            {searchResult.map((result: {}) => {
                return <SearchResultContainer thread={result} />
            })}
            </div>}
        </main>
    )
}