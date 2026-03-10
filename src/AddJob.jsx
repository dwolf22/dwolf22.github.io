import { useState } from "react"


export default function AddJob({getJob}) {

    const [jobData, setJob] =useState({
        company: "",
        role: "",
        date: "",
        status: "",
        notes: ""})

    const handleSubmit = (e) => {
        e.preventDefault()
        getJob(jobData)
    }

    const handleChange = (e) => {
        setJob({
            ...jobData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e)} className="addJob">
                <label htmlFor="company">Company: </label>
                <input type="text" value={jobData.company} name="company" onChange={(e)=>handleChange(e)}/>
                <label htmlFor="role">Role: </label>
                <input type="text" name="role" value={jobData.role} onChange={handleChange}/>
                <label htmlFor="date" >Date:</label>
                <input type="date" name="date" value={jobData.date} onChange={handleChange}/>
                <label htmlFor="status">Status: </label>
                <select name="status" value={jobData.status} onChange={handleChange}>
                    <option value="">Please choose an option</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Reject</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <label htmlFor="notes" name="notes" className="notes">Notes</label>
                <input type="text" name="notes" value={jobData.notes} onChange={handleChange} />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}