import React from 'react'
import { Outlet } from 'react-router-dom'
import HostelRoomsSidebar from '../Sidebar/HostelRoomsSidebar'

const HostelRoomsLayout = () => {
    return (
        <div className='flex flex-row'>
            <div className='basis-17/100'
                ><HostelRoomsSidebar/>
            </div>
            <div className='basis-83/100'
                ><Outlet/>
            </div>
        </div>
    )
}

export default HostelRoomsLayout
