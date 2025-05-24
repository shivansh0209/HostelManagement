import React from 'react';
import ComplaintSidebar from '../Sidebar/ComplaintSidebar';
import ComplaintListScreen from '../Screens/ComplaintListScreen';


const ComplaintsLayout = () => {
    return (
        <div>
            <div className='flex flex-row'>
                <div className='basis-17/100'
                    ><ComplaintSidebar/>
                </div>
                <div className='basis-83/100'
                    ><ComplaintListScreen/>
                </div>
            </div>
        </div>
    );
};

export default ComplaintsLayout;