import React from 'react'
import { Link } from 'react-router-dom'

const DashboardSidebar = () => {
    return (
        <div className='bg-[#E9B75B] h-screen w-full border-2 border-t-0 border-l-0 flex flex-col items-center justify-start'>
            <Link to="/staff/" className='mb-5 text-lg underline'>Dashboard</Link>
            <Link to="/staff/hostelrooms" className='mb-1'>Hostel Rooms</Link>
            <Link to="#" className='mb-1'>Hostel Budget</Link>
            <Link to="/staff/feesandpayments/reciept" className='mb-1'>Fees and Payment</Link>
            <Link to="/staff/mess/allocation" className='mb-1'>Mess Information</Link>
            <Link to="/staff/students" className='mb-1'>Students</Link>
            <Link to="/staff/complaints" className='mb-1'>Complaints</Link>
            <Link to="/staff/noticeboard" className='mb-1'>Hostel Noticeboard</Link>
            <Link to="/staff/lostandfound" className='mb-1'>Lost and Found</Link>
        </div>
    )
}

export default DashboardSidebar
