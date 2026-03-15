import { useState, useEffect } from "react"

// AddJob component handles both adding a new job and editing an existing job
export default function AddJob({ getJob, editJob }) {

    // ------------------------------
    // State to store the form data for a job
    // Initialized with empty strings for all fields
    // ------------------------------
    const [jobData, setJob] = useState({
        company: "",
        role: "",
        date: "",
        status: "",
        notes: ""
    })

    // ------------------------------
    // useEffect runs whenever editJob changes
    // If editJob exists, pre-fill the form with its data
    // This is what makes the form work for editing
    // ------------------------------
    useEffect(() => {
        if (editJob) {
            setJob(editJob) // prefill form with existing job data
        }
    }, [editJob])

    // ------------------------------
    // Handle form submission
    // Prevents default page reload
    // Passes the job data to parent via getJob
    // If editing, preserves the existing id
    // Otherwise generates a new unique id with Date.now()
    // ------------------------------
    const handleSubmit = (e) => {
        e.preventDefault()
        getJob({
            ...jobData,
            id: editJob?.id || Date.now()
        })
    }

    // ------------------------------
    // Handle input changes in the form
    // Updates jobData state dynamically based on the input name
    // ------------------------------
    const handleChange = (e) => {
        setJob({
            ...jobData,
            [e.target.name]: e.target.value
        })
    }

    // ------------------------------
    // Render the form
    // Bootstrap classes are used for styling and layout
    // ------------------------------
    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className="addJob">
                <div className="row justify-content-center">
                    {/* Company input */}
                    <div className="col-sm-3">
                        <input 
                            type="text" 
                            placeholder="Company" 
                            className="form-control" 
                            value={jobData.company} 
                            name="company" 
                            onChange={handleChange} 
                        />
                    </div>

                    {/* Role input */}
                    <div className="col-sm-3">
                        <input 
                            type="text" 
                            name="role" 
                            className="form-control" 
                            value={jobData.role} 
                            onChange={handleChange} 
                            placeholder="Role" 
                        />
                    </div>

                    {/* Date input */}
                    <div className="col-sm-3">
                        <input 
                            type="date" 
                            name="date" 
                            className="form-control flex-shrink-0 w-100" 
                            value={jobData.date} 
                            onChange={handleChange} 
                        />
                        {/* Note: value must be in YYYY-MM-DD format for mobile browsers */}
                    </div>

                    {/* Status dropdown */}
                    <div className="col-sm-3">
                        <select 
                            name="status" 
                            className="form-select" 
                            value={jobData.status} 
                            onChange={handleChange}
                        >
                            <option value="">Hire Status</option>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    {/* Notes input */}
                    <div className="col-sm-12">
                        <input 
                            type="text" 
                            name="notes" 
                            className="form-control" 
                            value={jobData.notes} 
                            onChange={handleChange} 
                            placeholder="Notes" 
                        />
                    </div>
                </div>

                {/* Submit button */}
                <div className="row justify-content-center my-3">
                    <button 
                        type="submit" 
                        className="text-dark rounded-4 bg-light border border-dark col-4"
                    >
                        {editJob ? "Update" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    )
}