import React from 'react';
import { Link } from 'react-router-dom';

const MessSidebar = () => {
    return (
        <div className='bg-[#E9B75B] h-screen w-full border-2 border-t-0 border-l-0 flex flex-col items-center justify-start'>
            <Link to="allocation" className='mb-5 text-lg underline'>Mess</Link>
            <Link to="allocation" className='mb-1'> Mess Allocation</Link>
            <Link to="weeklymenu" className='mb-1'>Mess Weekly Menu</Link>
            <Link to="cancellation" className='mb-1'>Mess Cancellations</Link>
            <Link to="feedback" className='mb-1'>Mess Feedbacks</Link>
        </div>
    );
};

export default MessSidebar;