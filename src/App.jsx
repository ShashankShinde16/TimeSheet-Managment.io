import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import AddUser from './components/AddUser'
import ProjectMaster from './components/ProjectMaster'
import AddProject from './components/AddProject'
import UserMaster from './components/UserMaster'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import TaskMaster from './components/TaskMaster'
import ProjectDetails from './components/ProjectDetails'
import UpdateProject from './components/UpdateProject'

function App() {

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='admin'>
          <Route path='projects-list' element={<ProjectMaster />} />
          <Route path='add-user' element={<AddUser />} />
          <Route path='add-project' element={<AddProject />} />
          <Route path='project-detail'>
            <Route path=':id' element={<ProjectDetails />} />
            <Route path='update-project' element={<UpdateProject />} />
          </Route>
        </Route>
        <Route path='user'>
          <Route path='task-list' element={<UserMaster />} />
          <Route path='project-detail'>
            <Route path=":id" element={<TaskMaster />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
