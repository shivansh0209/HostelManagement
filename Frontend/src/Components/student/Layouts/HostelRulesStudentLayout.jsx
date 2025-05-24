import React from 'react';
import HostelRulesStudentSidebar from '../Sidebars/HostelRulesStudentSidebar';
import HostelRulesStudent from '../Screens/HostelRulesStudent';

const HostelRulesStudentLayout = () => {
    return (
        <div>
            <div className='flex flex-row'>
                <div className='basis-17/100'
                    ><HostelRulesStudentSidebar/>
                </div>
                <div className='basis-83/100'
                    ><HostelRulesStudent/>
                </div>
            </div>
        </div>
    );
};

export default HostelRulesStudentLayout;