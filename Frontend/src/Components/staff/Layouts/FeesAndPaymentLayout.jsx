import React from 'react'
import FeesAndPaymentsSidebar from '../Sidebar/FeesAndPaymentsSidebar'
import { Outlet } from 'react-router-dom'

const FeesAndPaymentLayout = () => {
    return (
        <div>
            <div className='flex flex-row'>
                <div className='basis-17/100'
                    ><FeesAndPaymentsSidebar/>
                </div>
                <div className='basis-83/100'
                    ><Outlet/>
                </div>
            </div>
        </div>
    )
}

export default FeesAndPaymentLayout
