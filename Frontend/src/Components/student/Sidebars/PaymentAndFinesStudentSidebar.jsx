import React from 'react';
import { Link } from 'react-router-dom';

const PaymentAndFinesStudentSidebar = () => {
    return (
        <div className='bg-[#E9B75B] h-screen w-full border-2 border-t-0 border-l-0 flex flex-col items-center justify-start'>
            <Link className='mb-5 text-lg underline'>Payment And Fee</Link>
            <Link to="academicfee" className='mb-1'> Academic Fee</Link>
            <Link to="messfee" className='mb-1'>Mess Fee</Link>
            <Link to="refund" className='mb-1'>Refunds</Link>
            <Link to="fines" className='mb-1'>Fines List</Link>
        </div>
    );
};

export default PaymentAndFinesStudentSidebar;