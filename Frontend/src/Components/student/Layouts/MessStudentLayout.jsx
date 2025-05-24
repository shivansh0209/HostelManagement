import React from 'react';
import MessStudentSidebar from '../Sidebars/MessStudentSidebar';
import { Outlet } from 'react-router-dom';

const MessStudentLayout = () => {
    return (
        <div className='flex flex-row'>
            <div className='basis-17/100'
                ><MessStudentSidebar/>
            </div>
            <div className='basis-83/100'
                ><Outlet/>
            </div>
        </div>
    );
};

export default MessStudentLayout;