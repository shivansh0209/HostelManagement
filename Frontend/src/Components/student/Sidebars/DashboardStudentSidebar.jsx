import React from 'react';
import { Link } from 'react-router-dom';

const DashboardStudentSidebar = () => {
    return (
        <div className='bg-[#E9B75B] h-screen w-full border-2 border-t-0 border-l-0 flex flex-col items-center justify-start'>
            <Link to="/student/" className='mb-5 text-lg underline'>Dashboard</Link>
            <Link to="/student/paymentandfines/academicfee" className='mb-1'>Payment And Fee</Link>
            <Link to="/student/mess/todaymenu" className='mb-1'>Mess Information</Link>
            <Link to="/student/complaints" className='mb-1'>Complaints</Link>
            <Link to="/student/hostelrules" className='mb-1'>Hostel Rules</Link>
            <Link to="/student/lostandfound" className='mb-1'>Lost and Found</Link>
        </div>
    );
};

export default DashboardStudentSidebar;