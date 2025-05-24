import React from 'react';
import ComplaintsStudentSidebar from '../Sidebars/ComplaintsStudentSidebar';
import ComplaintsStudentScreen from '../Screens/ComplaintsStudentScreen';


const ComplaintsStudentLayout = () => {
    return (
        <div>
            <div className='flex flex-row'>
                <div className='basis-17/100'
                    ><ComplaintsStudentSidebar/>
                </div>
                <div className='basis-83/100'
                    ><ComplaintsStudentScreen/>
                </div>
            </div>
        </div>
    );
};

export default ComplaintsStudentLayout;