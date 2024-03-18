'use client'

import axios from "axios"
import { useState, createContext, useEffect } from "react"
export const SearchContext = createContext({})

export default function SearchProviderWrapper(props: any) {
    const [searchValue, setSearchValue] = useState("")
    const [searchResult, setSearchResult] = useState([])

    const getResults = () => {
        axios.get(`http://localhost:5005/search/result/${searchValue}`)
        .then((response) => {
            setSearchResult(response.data.filteredResponse)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (searchValue === "")
        setSearchResult([])
    }, [searchValue])

    useEffect(() => {
        getResults()
    }, [searchValue])

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