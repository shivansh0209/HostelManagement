import React from 'react'
import DashboardScreen from '../Screens/DashboardScreen'
import DashboardSidebar from '../Sidebar/DashboardSidebar'

const DashboardLayout = () => {
    return (
        <div>
            <div className='flex flex-row'>
                <div className='basis-17/100'
                    ><DashboardSidebar/>
                </div>
                <div className='basis-83/100'
                    ><DashboardScreen/>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
