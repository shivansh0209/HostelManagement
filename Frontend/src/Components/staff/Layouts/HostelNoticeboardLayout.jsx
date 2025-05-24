import React from 'react'
import HostelNoticeboardSidebar from '../Sidebar/HostelNoticeboardSidebar'
import HostelNoticeboardScreen from '../Screens/HostelNoticeboardScreen'

const HostelNoticeboardLayout = () => {
    return (
        <div>
            <div className='flex flex-row'>
                <div className='basis-17/100'
                    ><HostelNoticeboardSidebar/>
                </div>
                <div className='basis-83/100'
                    ><HostelNoticeboardScreen/>
                </div>
            </div>
        </div>
    )
}

export default HostelNoticeboardLayout
