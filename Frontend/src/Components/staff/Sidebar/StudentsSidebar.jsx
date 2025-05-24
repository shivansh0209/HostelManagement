import React from 'react';

import { Link } from 'react-router-dom';

const StudentsSidebar = () => {
    return (
        <div className='bg-[#E9B75B] h-screen border-2 border-t-0 border-l-0 flex flex-col items-center justify-start'>
            <Link to="studentlist" className='mb-5 text-lg underline'>Students</Link>
        </div>
    );
};

export default StudentsSidebar;