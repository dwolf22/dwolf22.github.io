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

    const [search, setSearch] = useState("")

    // ------------------------------
    // Save jobs to localStorage whenever jobs array changes
    // ------------------------------
    useEffect(() => {
        localStorage.setItem("jobs", JSON.stringify(jobs));
    }, [jobs]);

    // ------------------------------
    // Toggle the Add Job form visibility
    // If opening the form for adding, clear editJob
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
            // Update existing job
            setJobs(prevJobs =>
                prevJobs.map(j =>
                    j.id === job.id ? job : j // Replace matching job
                )
            );
            setEditJob(null); // Clear edit state
        } else {
            // Add new job
            const newJob = {
                id: Date.now(), // Unique ID for the job
                ...job
            };

            setJobs(prev => [...prev, newJob]);
        }

        setAdding(false); // Close the form after submission
    }

    // ------------------------------
    // Remove a job from the list by index
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

    const update = (upDatedJobs) => {
        setJobs(prevJobs => {
            prevJobs.map(job =>
                job.id === upDatedJobs.id ? upDatedJobs : job
            )
        })
        setEditJob(null);
        setAdding(false);
    }

    const searchedJobs = jobs.filter((job) => {
        if (!search || search === 'All') return true;
        return job.status === search;
    })

    const handleSearch = (value) => {
        setSearch(value)
    }

    // ------------------------------
    // Render the Job Tracker UI
    // ------------------------------
    return (
        <div>
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
                    getJob={sendJob}   // Pass function to handle submission
                    editJob={edit}  // Pass job to edit (if editing)
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