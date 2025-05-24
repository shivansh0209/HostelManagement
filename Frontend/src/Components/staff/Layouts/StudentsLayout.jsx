import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentsSidebar from '../Sidebar/StudentsSidebar'

const StudentsLayout = () => {
    return (
        <div className='flex flex-row'>
            <div className='basis-17/100'
                ><StudentsSidebar/>
            </div>
            <div className='basis-83/100'
                ><Outlet/>
            </div>
        </div>
    )
}

export default StudentsLayout
