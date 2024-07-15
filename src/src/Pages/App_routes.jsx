import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import LoginSignupPage from './Login'
import DashboardPage from './DashboardPage'
import Private_Route from '../Component/Private_Route'
import AdminPage from './AdminPage'

function App_routes({rendernav,setrendernav}) {
  return (

        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginSignupPage rendernav={rendernav}setrendernav={setrendernav}/>}/>
            <Route path='/profile' element={
                <Private_Route>
                    <DashboardPage/>
                </Private_Route>
            }/>
            <Route path='/admin' element={<AdminPage/>}/>
        </Routes>

  )
}

export default App_routes