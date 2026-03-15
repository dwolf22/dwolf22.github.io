import { useState } from "react"

// SearchBar component allows users to filter jobs by status
// It communicates the selected status back to the parent component via onChange
export default function SearchBar({ onChange }) {

    // ------------------------------
    // Local state to track the currently selected search/filter value
    // Initialized as an empty string
    // ------------------------------
    const [search, setSearch] = useState("");

    // ------------------------------
    // Handles form submission (clicking "Search" button)
    // Prevents default form submit behavior (page reload)
    // Calls onChange prop with the current search value
    // ------------------------------
    const sendSearch = (e) => {
        e.preventDefault()
        onChange(search)
    }

    // ------------------------------
    // Handles changes to the select dropdown
    // Updates local state with the new selected value
    // ------------------------------
    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    // ------------------------------
    // Render the search/filter form
    // - Uses a <select> dropdown for job status options
    // - Includes a "Search" button that triggers sendSearch on submit
    // - Bootstrap classes used for layout and styling
    // ------------------------------
    return (
        <div className="searchContainer mb-5">
            <form 
                className="jobSearch row justify-content-center" 
                onSubmit={sendSearch} // handle submit
            >
                {/* Dropdown for selecting job status */}
                <select 
                    name="search" 
                    onChange={handleChange} 
                    value={search} 
                    className="col-sm-2 rounded-4"
                >
                    <option value="" >Filter Bar</option>
                    <option value="All">All</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>

                {/* Submit button */}
                <button 
                    type="submit" 
                    className="col-sm-2 rounded-4 bg-light border border-dark text-dark"
                >
                    Search
                </button>
            </form>
        </div>
    )
}