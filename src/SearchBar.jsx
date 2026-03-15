import { useState } from "react"


export default function SearchBar({onChange}) {

    const [search, setSearch] = useState("");

    const sendSearch = (e) => {
        e.preventDefault()
        onChange(search)
    }

    const handleChange = (e) => {

        setSearch(e.target.value);
    }

    return (
        <div className="searchContainer mb-5">
            <form action="" className="jobSearch row justify-content-center" onSubmit={sendSearch}>
                <select name="search" onChange={handleChange} value={search} className="col-sm-2 rounded-4">
                    <option value="" >Filter Bar</option>
                    <option value="All">All</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <button type="submit" className="col-sm-2 rounded-4 bg-light border border-dark">Search</button>
            </form>
        </div>
    )
}