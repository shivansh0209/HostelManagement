import React from 'react';
import { Link } from 'react-router-dom';

const FeesAndPaymentsSidebar = () => {
    return (
        <div className='bg-[#E9B75B] h-screen w-full border-2 border-t-0 border-l-0 flex flex-col items-center justify-start'>
            <Link className='mb-5 text-lg underline'>Dashboard</Link>
            <Link to="reciept" className='mb-1'> Payment Reciepts</Link>
            <Link to="fine" className='mb-1'>Fines</Link>
            <Link to="refund" className='mb-1'>Refunds</Link>
        </div>
    );
};

export default FeesAndPaymentsSidebar;