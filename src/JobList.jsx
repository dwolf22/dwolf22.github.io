import AddJob from './AddJob.jsx'
import { useState, useEffect } from "react"
import SearchBar from './SearchBar.jsx';

export default function JobList() {

    // ------------------------------
    // State to store all job applications
    // Initialized from localStorage to persist data across page reloads
    // ------------------------------
    const [jobs, setJobs] = useState(() => {
        const savedJobs = localStorage.getItem("jobs");
        return savedJobs ? JSON.parse(savedJobs) : [];
    });

    // ------------------------------
    // State to track which job is currently being edited
    // If null, the form is in "Add" mode
    // ------------------------------
    const [editJob, setEditJob] = useState(null)

    // ------------------------------
    // State to toggle visibility of the Add/Edit Job form
    // ------------------------------
    const [isAdding, setAdding] = useState(false);

    // ------------------------------
    // State for search filter (status)
    // ------------------------------
    const [search, setSearch] = useState("")

    // ------------------------------
    // Save jobs to localStorage whenever jobs array changes
    // This ensures jobs persist after page reload
    // ------------------------------
    useEffect(() => {
        localStorage.setItem("jobs", JSON.stringify(jobs));
    }, [jobs]);

    // ------------------------------
    // Toggle the Add Job form visibility
    // If opening the form for adding a new job, clear editJob
    // ------------------------------
    const addButtonVisible = () => {
        setAdding(!isAdding)
        setEditJob(null)
    }

    // ------------------------------
    // Handles submission of the Add/Edit form
    // If editJob exists, update the job
    // Otherwise, add a new job with a unique ID
    // ------------------------------
    const sendJob = (job) => {

        if (editJob) {
            // Update existing job in the array
            setJobs(prevJobs =>
                prevJobs.map(j =>
                    j.id === job.id ? job : j // Replace the matching job
                )
            );
            setEditJob(null); // Clear edit state after updating
        } else {
            // Add new job
            const newJob = {
                ...job,
                id: Date.now() // Unique ID for the job
            };

            setJobs(prev => [...prev, newJob]); // Append to existing jobs
        }

        setAdding(false); // Close the form after submission
    }

    // ------------------------------
    // Remove a job from the list by its index
    // ------------------------------
    const remove = (index) => {
        setJobs(prevJobs => prevJobs.filter((_, i) => i !== index));
    }

    // ------------------------------
    // Prepare a job for editing
    // Sets the editJob state and opens the form
    // ------------------------------
    const edit = (job) => {
        setEditJob(job)
        setAdding(true)
    }

    // ------------------------------
    // Filter jobs based on search criteria
    // If no search value or "All" is selected, show all jobs
    // ------------------------------
    const searchedJobs = jobs.filter((job) => {
        if (!search || search === 'All') return true;
        return job.status === search;
    })

    // ------------------------------
    // Handle changes from the SearchBar component
    // ------------------------------
    const handleSearch = (value) => {
        setSearch(value)
    }

    // ------------------------------
    // Render the Job Tracker UI
    // ------------------------------
    return (
        <div>
            {/* Search bar for filtering by status */}
            <SearchBar onChange={handleSearch} />

            {/* Add Job button */}
            <div className="row mb-3 justify-content-center">
                <button className="addJob rounded-4 bg-light border border-dark col-4" onClick={addButtonVisible}>
                    Add Job
                </button>
            </div>

            {/* Show Add/Edit Job form if isAdding is true */}
            {isAdding && (
                <AddJob
                    getJob={sendJob}   // Pass function to handle form submission
                    editJob={editJob}  // Pass job to edit (if editing)
                />
            )}

            {/* Display the list of jobs */}
            <div className="jobBox row justify-content-center" >
                {searchedJobs.map((job, i) => (

                    <div className="col-sm-2 border" key={job.id || i}>
                        <h3>{job.company}</h3>

                        <ul>
                            <li>Role: {job.role}</li>
                            <li>Date: {job.date}</li>
                            <li>Status: {job.status}</li>
                            <li>Notes: {job.notes}</li>
                        </ul>

                        {/* Edit button */}
                        <button onClick={() => edit(job)} className='rounded-4 bg-light border border-dark'>
                            Edit
                        </button>

                        {/* Delete button */}
                        <button onClick={() => remove(i)} className='rounded-4 bg-light border border-dark'>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

        </div>
    )
}