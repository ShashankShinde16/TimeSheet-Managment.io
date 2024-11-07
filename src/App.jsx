import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import Signup from './components/Signup'
import ProjectMaster from './components/ProjectMaster'
import AddProject from './components/AddProject'
import UserMaster from './components/UserMaster'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import TaskMaster from './components/TaskMaster'
import ProjectDetails from './components/ProjectDetails'

function App() {

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='admin'>
          <Route path='projects-list' element={<ProjectMaster />} />
          <Route path='add-project' element={<AddProject />} />
          <Route path='project-detail'>
            <Route path='{id:5}' element={<ProjectDetails />} />
          </Route>
        </Route>
        <Route path='user'>
          <Route path='projects-list' element={<UserMaster />} />
          <Route path='add-project' element={<AddProject />} />
          <Route path='project-detail'>
            <Route path='{id:5}' element={<TaskMaster />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
