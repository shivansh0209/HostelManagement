import React from 'react';
import { Outlet } from 'react-router-dom';
import PaymentAndFinesStudentSidebar from '../Sidebars/PaymentAndFinesStudentSidebar';

const PaymentAndFeeStudentLayout = () => {
    return (
        <div className='flex flex-row'>
            <div className='basis-17/100'
                ><PaymentAndFinesStudentSidebar/>
            </div>
            <div className='basis-83/100'
                ><Outlet/>
            </div>
        </div>
    );
};

export default PaymentAndFeeStudentLayout;