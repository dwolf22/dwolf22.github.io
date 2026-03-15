import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import JobList from './JobList.jsx'

function App() {

  return (
    <>
      <div className='container-fluid text-center'>

        <h1 className='text-center mb-5'>Job Tracker Project</h1>
        <JobList/>
      </div>
    </>
  )
}

export default App
