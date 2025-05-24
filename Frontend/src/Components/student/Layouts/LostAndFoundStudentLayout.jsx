import React from 'react';
import LostAndFoundStudentSidebar from '../Sidebars/LostAndFoundStudentSidebar';
import LostAndFoundStudentScreen from '../Screens/LostAndFoundStudentScreen';

const LostAndFoundStudentLayout = () => {
    return (
        <div className='flex flex-row'>
            <div className='basis-17/100'
                ><LostAndFoundStudentSidebar/>
            </div>
            <div className='basis-83/100'
                ><LostAndFoundStudentScreen/>
            </div>
        </div>
    );
};

export default LostAndFoundStudentLayout;