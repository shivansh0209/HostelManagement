import React from 'react'
import LostAndFoundSidebar from '../Sidebar/LostAndFoundSidebar'
import LostAndFoundScreen from '../Screens/LostAndFoundScreen'

const LostAndFoundLayout = () => {
    return (
        <div className='flex flex-row'>
            <div className='basis-17/100'
                ><LostAndFoundSidebar/>
            </div>
            <div className='basis-83/100'
                ><LostAndFoundScreen/>
            </div>
        </div>
    )
}

export default LostAndFoundLayout
