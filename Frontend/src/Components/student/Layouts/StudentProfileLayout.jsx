import React from 'react';
import StudentSidebar from '../Sidebars/StudentSidebar';
import StudentProfileScreen from '../Screens/StudentProfileScreen';

const StudentProfileLayout = () => {
    return (
        <div className='h-screen flex flex-row'>
            <div className='basis-17/100'
                ><StudentSidebar/>
            </div>
            <div className='basis-83/100'
                ><StudentProfileScreen/>
            </div>
        </div>
    );
};

export default StudentProfileLayout;