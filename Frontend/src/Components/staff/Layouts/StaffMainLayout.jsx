import Navbar from '../Navbar/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const StaffMainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default StaffMainLayout
