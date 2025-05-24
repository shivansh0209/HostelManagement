import React from 'react';
import { Link } from 'react-router-dom';

const MessStudentSidebar = () => {
    return (
        <div className='bg-[#E9B75B] h-screen w-full border-2 border-t-0 border-l-0 flex flex-col items-center justify-start'>
        <Link className='mb-5 text-lg underline'>Mess</Link>
        <Link to="todaymenu" className='mb-2'> Today's Menu</Link>
        <Link to="weekmenu" className='mb-2'>Weekly Menu</Link>
        <Link to="cancellationandfeedback" className='mb-0'>Mess Cancellations</Link>
        <Link to="cancellationandfeedback" className='-mt-1 mb-1'>And Feedbacks</Link>
    </div>
    );
};

export default MessStudentSidebar;