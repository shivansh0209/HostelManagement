import React from 'react';
import DashboardStudentSidebar from "../Sidebars/DashboardStudentSidebar"
import DashboardStudentScreen from '../Screens/DashboardStudentScreen';


const DashboardStudentLayout = () => {
    return (
        <div>
            <div className='flex flex-row'>
                <div className='basis-17/100'
                    ><DashboardStudentSidebar/>
                </div>
                <div className='basis-83/100'
                    ><DashboardStudentScreen/>
                </div>
            </div>
        </div>
    );
};

export default DashboardStudentLayout;