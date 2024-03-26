'use client'

import { useContext } from "react"
import { SearchContext } from "../utils/context/search.context"
import SearchResultContainer from "./SearchResultContainer"
import { usePathname, useRouter } from "next/navigation"

export default function SearchBar() {
    const { searchValue, setSearchValue, searchResult }: any = useContext(SearchContext)
    const pathName = usePathname()
    const router = useRouter()


    return (
        <main className="w-full flex justify-end gap-1 my-2 h-10">
            <button className="bg-[#214642] my-auto hover:bg-[#326a64] h-7 px-5" onClick={() => router.push(`/thread/create?topic=${pathName.slice(1)}`)}><span className="mr-4 font-bold">&#43;</span>Create Thread</button>
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Search" className="my-auto h-7 border-none px-2 text-black outline-none" />
            {searchResult.length > 0 && <div className="absolute bg-neutral-900 border border-neutral-700 flex flex-col w-[415px] max-h-[200px] h-[200px] overflow-y-auto mt-10">
                {searchResult.map((result: {}, i: string) => {
                    return <SearchResultContainer key={i} thread={result} />
                })}
            </div>}
        </main>
    )
}