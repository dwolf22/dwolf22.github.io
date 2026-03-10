import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './SearchBar.jsx'
import JobList from './JobList.jsx'

function App() {

  return (
    <>
      <div>
        <h1>Job Tracker Project</h1>
        <SearchBar/>
        <JobList/>
      </div>
    </>
  )
}

export default App
