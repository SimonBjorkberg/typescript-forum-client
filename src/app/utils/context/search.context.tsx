'use client'

import { usePathname } from "next/navigation"
import { useState, createContext, useEffect } from "react"
import searchService from "../services/search.service"
export const SearchContext = createContext({})

export default function SearchProviderWrapper(props: any) {
    const [searchValue, setSearchValue] = useState("")
    const [searchResult, setSearchResult] = useState([])

    const pathName = usePathname()

    const getResults = () => {
        searchService.getResults(searchValue)
            .then((response: any) => {
                setSearchResult(response.data.filteredResponse)
            })
            .catch((err: any) => {

            })
    }

    useEffect(() => {
        if (searchValue === "")
            setSearchResult([])
    }, [searchValue])

    useEffect(() => {
        getResults()
        // eslint-disable-next-line
    }, [searchValue])

    useEffect(() => {
        setSearchValue("")
    }, [pathName])

    return (
        <SearchContext.Provider
            value={{
                setSearchValue,
                searchValue,
                setSearchResult,
                searchResult,
            }}
        >
            {props.children}
        </SearchContext.Provider>
    )
}