import { useState, useEffect } from "react"


export default function AddJob({ getJob, editingJob }) {

    const [jobData, setJob] = useState({
        company: "",
        role: "",
        date: "",
        status: "",
        notes: ""
    })

    useEffect(() => {
        if (editingJob) {
            setJob(editingJob)
        }
    }, [editingJob])

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
            <form onSubmit={(e) => handleSubmit(e)} className="addJob">
                <div className="row justify-content-center">
                    <div className="col-3">
                        <input type="text" placeholder="Company" className="form-control" value={jobData.company} name="company" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="col-sm-3">
                        <input type="text" name="role" className="form-control" value={jobData.role} onChange={handleChange} placeholder="Role" />
                    </div>
                    <div className="col-sm-3">
                        <input type="date" name="date" className="form-control" value={jobData.date} onChange={handleChange} />
                    </div>
                    <div className="col-sm-3">
                        <select name="status" className="form-control" value={jobData.status} onChange={handleChange}>
                            <option value="">Hire Status</option>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="col-sm-12">
                        <input type="text" name="notes" className="form-control" value={jobData.notes} onChange={handleChange} placeholder="Notes" />
                    </div>
                </div>
                <div className="row justify-content-center my-3">
                        <button type="submit" className="rounded-4 bg-light border border-dark col-4">{editingJob ? "Update" : "Add"}</button>
                </div>
            </form>
        </div>
    )
}