'use client'

import axios from "axios"
import { usePathname } from "next/navigation"
import { useState, createContext, useEffect } from "react"
export const SearchContext = createContext({})

export default function SearchProviderWrapper(props: any) {
    const [searchValue, setSearchValue] = useState("")
    const [searchResult, setSearchResult] = useState([])

    const pathName = usePathname()

    const getResults = () => {
        axios.get(`http://localhost:5005/search/result/${searchValue}`)
            .then((response) => {
                setSearchResult(response.data.filteredResponse)
            })
            .catch((err) => {

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