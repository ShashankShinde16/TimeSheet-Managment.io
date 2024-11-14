import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Auth/Login'
import AddUser from './components/Add/AddUser'
import ProjectMaster from './components/Admin/ProjectMaster'
import AddProject from './components/Add/AddProject'
import UserMaster from './components/User/UserMaster'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import TaskMaster from './components/User/TaskMaster'
import ProjectDetails from './components/Admin/ProjectDetails'
import UpdateProject from './components/UpdateProject'
import ResetPassword from './components/Auth/ResetPassword'
import User from './components/User'
import AssignProject from './components/AssignProject'
import RemoveFromProject from './components/RemoveFromProject'
import AddTask from './components/User/AddTask'
import MemberDetails from './components/User/MemberDetails'


function App() {

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='admin'>
          <Route path='projects-list' element={<ProjectMaster />} />
          <Route path='user-list' element={<User />} />
          <Route path='add-user' element={<AddUser />} />
          <Route path='add-project' element={<AddProject />} />
          <Route path='user'>
            <Route path='assign-project' element={<AssignProject />} />
            <Route path='remove-from-project' element={<RemoveFromProject />} />
          </Route>
          <Route path='project-detail'>
            <Route path=':id' element={<ProjectDetails />} />
            <Route path='update-project' element={<UpdateProject />} />
          </Route>
        </Route>
        <Route path='user'>
          <Route path='projects-list' element={<UserMaster />} />
          <Route path='add-task' element={<AddTask />} />
          <Route path='task-list' element={<TaskMaster />} />
          <Route path='project-member-list' element={<MemberDetails />} />
          <Route path='project-detail'>
            <Route path=":id" element={<TaskMaster />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
