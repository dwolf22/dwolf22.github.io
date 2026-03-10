import AddJob from './AddJob.jsx'
import { useState } from "react"

export default function JobList() {

    const [jobs, setJobs] = useState([])

    const [isAdding, setAdding] = useState(false);

    const addButtonVisible = () => {
        setAdding(!isAdding)
    }

    const sendJob = (job) => {
        setJobs([...jobs, job])
        console.log(jobs)
        setAdding(!isAdding)
    }

    
    return (
        <div>
            <button className="addJob" onClick={addButtonVisible}>Add Job</button>
            {isAdding && (<AddJob getJob={sendJob}/>)}
            {jobs.map(
                (job, i) => (
                    <div className="jobBox" key={i}>
                        <h3>{job.company}</h3>
                        <ul>
                            <li>Role: {job.role}</li>
                            <li>Date: {job.date}</li>
                            <li>Status: {job.status}</li>
                            <li>Notes: {job.notes}</li>
                        </ul>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                ))
            }
            
        </div>
    )
}