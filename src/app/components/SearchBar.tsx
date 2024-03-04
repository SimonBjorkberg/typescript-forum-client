export default function SearchBar() {
    return (
        <main className="h-10 w-full flex justify-end gap-1">
            <button className="bg-[#214642] h-[80%] my-auto px-3 hover:bg-[#326a64]"><span className="mr-2">+</span> Create Topic</button>
            <input type="text" placeholder="Search" className="h-[80%] my-auto" />
        </main>
    )
}