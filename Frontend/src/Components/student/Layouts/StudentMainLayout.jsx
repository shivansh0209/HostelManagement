import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarStudent from '../Navbar/NavbarStudent';


const StudentMainLayout = () => {
    return (
        <div>
            <NavbarStudent/>
            <Outlet/>
        </div>
    );
};

export default StudentMainLayout;