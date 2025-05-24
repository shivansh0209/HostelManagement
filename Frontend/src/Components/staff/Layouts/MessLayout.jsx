import React from 'react'
import MessSidebar from '../Sidebar/MessSidebar'
import { Outlet } from 'react-router-dom'
import MessAllocationScreen from '../Screens/MessAllocationScreen'

const MessLayout = () => {
    return (
        <div className='flex flex-row'>
            <div className='basis-17/100'
                ><MessSidebar/>
            </div>
            <div className='basis-83/100'
                ><Outlet/>
            </div>
        </div>
    )
}

export default MessLayout
