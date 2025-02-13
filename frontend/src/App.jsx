import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StartPage from './pages/StartPage'
import UserLogin from './pages/UserLogin'
import WhoIsLogging from './pages/WhoIsLogging'
import DriverLogin from './pages/DriverLogin'
import AdminLogin from './pages/AdminLogin'
import UserHome from './pages/UserHome'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import DriverHome from './pages/DriverHome'
import AdminHome from './pages/AdminHome'
import AdminProtectedWrapper from './pages/AdminProtectedWrapper'
import DriverProtectedWrapper from './pages/DriverProtectedWrapper'
import UserLogout from './pages/UserLogout'
import DriverLogout from './pages/DriverLogout'
import AdminLogout from './pages/AdminLogout'
import CreateStudentID from './pages/CreateStudentID'
import CreateDriverID from './pages/CreateDriverID'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path='/who-is-login' element={<WhoIsLogging />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/driver-login' element={<DriverLogin />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/user-home' element={
          <UserProtectedWrapper>
            <UserHome />
          </UserProtectedWrapper>
        } 
        />
        <Route path='/driver-home' element={
          <DriverProtectedWrapper>
            <DriverHome />
          </DriverProtectedWrapper>
        } 
        />
        <Route path='/admin-home' element={
          <AdminProtectedWrapper>
            <AdminHome />
          </AdminProtectedWrapper>
          } 
        />
        <Route path='/user-logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } 
        />
        <Route path='/driver-logout' element={
          <DriverProtectedWrapper>
            <DriverLogout />
          </DriverProtectedWrapper>
        } />
        <Route path='/admin-logout' element={
          <AdminProtectedWrapper>
            <AdminLogout />
          </AdminProtectedWrapper>
        } />
        <Route path='/create-student-id' element={<CreateStudentID />} />
        <Route path='/create-driver-id' element={<CreateDriverID />} />
      </Routes>
    </div>
  )
}

export default App