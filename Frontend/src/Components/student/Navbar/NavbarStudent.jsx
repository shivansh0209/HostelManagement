import React from 'react';
import profileSVG from '../../../assets/staff/profile.svg'
import logoutSVG from '../../../assets/staff/logout.svg'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserContext from '../../../Context/UserContext.js';
import { useContext } from 'react';
import axios from 'axios';

const NavbarStudent = () => {
    const navigate = useNavigate()
    const handleLogOut = async () => {
        await axios.get('http://localhost:4500/api/auth/logout', { withCredentials: true })
        navigate('/')
    }


    const { userDetails } = useContext(UserContext)
    const openProfile = () => {
        navigate('profile')
    }

    return (
        <div>
            <nav className='bg-[#9a4b4c] border-y-2 p-2 flex flex-wrap justify-between items-center'>
                <div className='flex flex-col'>
                    <span className='[text-shadow:2px_2px_4px_rgba(0,0,0,0.4)] text-black m-0 text-2xl basis-4/15 font-semibold'>IIT BHU</span>
                    <span className='text-black -mt-2 font-light'>Academic Year 24-25</span>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <Link to="guardian-ai" className='border-0 border-black text-lg mr-4 p-2 rounded-md w-fit h-fit'>
                        GuardianAI
                    </Link>
                    <Link to="/student" className='border-0 border-black text-lg mr-4 p-2 rounded-md w-fit h-fit'>
                        Dashboard
                    </Link>
                    <img onClick={openProfile} src={profileSVG} alt='logo' className='mr-4 w-8 h-8' />
                    <img onClick={handleLogOut} src={logoutSVG} alt='logo' className='w-8 h-8 cursor-pointer' />
                </div>

            </nav>
        </div>
    );
};

export default NavbarStudent;