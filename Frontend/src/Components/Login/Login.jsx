import React from 'react'
import { useNavigate } from 'react-router-dom'
import IITBHU from '../../assets/staff/IITBHU.jpeg'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import UserContext from '../../Context/UserContext.js'


const Login = () => {
    const navigate = useNavigate()
    const [email, setemail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [popupType, setPopupType] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [oldpassword, setoldpassword] = useState('');
    const [emailcheck,setemailcheck] = useState('');
    const {setUserDetails} = useContext(UserContext)


    const handleSubmit = () => {
        axios.post('http://localhost:4500/api/auth', { email, password },{
            withCredentials: true
        })
        .then((response) => {
            if (response.status === 200) {
                setUserDetails(response.data.data.user);
                console.log(response.data.data.user);
                setPopupType('success');
                setTimeout(() => {
                    navigate(response.data.data.user.profileType);
                }, 2000);
            } else {
                setPopupType('error');
            }
        })
        .catch((error) => {
            console.error('Error during login:', error);
            setPopupType('error');
        });
    }

    //Done
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(); 
        }
    };

    //Done
    const handleChangepassword = () => {
        axios.post('http://localhost:4500/api/auth/changepassword', { emailcheck, oldpassword, newpassword })
        .then(() => {
            setPopupType('');
            setemailcheck('');
            setoldpassword('');
            setNewPassword('');
            setemail('');
            setPassword('');
        })
        .catch((error) => {
            console.error('Error during password change:', error);
            setPopupType('error');
        });
    }
    
    //Done
    const handleRetry = () => {
        setPopupType('');
        setemail('');
        setPassword('');
    };

    return (
        <div className='bg-[#E9B75B] h-screen flex items-center justify-center ' >
            <div className={`p-4 rounded-lg bg-white w-[28%] ${popupType ? "opacity-10 pointer-events-none" : "opacity-100"} `}>
                <img src={IITBHU}/>
                <h1 className='text-4xl text-center mb-6 mt-2'>Login to IITBHU</h1>
                    <label htmlFor='email'>Email</label>
                    <input
                        placeholder='Enter your email'
                        type='email'
                        value={email}
                        onChange={(e)=>{setemail(e.target.value)}}
                        id='email'
                        className='p-2 border-1 mb-4 w-full rounded-lg'
                        onKeyDown={handleKeyDown}
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        onKeyDown={handleKeyDown}
                        id='password'
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        placeholder='Enter your Password'
                        type='password'
                        className='p-2  border-1 w-full rounded-lg'
                    />
                    <div className="flex mb-4 justify-between">
                        <div></div>
                        <div onClick={() => setPopupType('newPassword')} className='text-xs cursor-pointer italic text-gray-400'>Change Password</div>
                    </div>
                    <button onClick={handleSubmit} type='submit' className='bg-[#984143]  hover:bg-[#984120] border-2 hover:border-[#000000] text-white p-2 w-full rounded-lg'>
                        Login
                    </button>
                </div>
                {popupType === 'error' && (
                    <div className="fixed inset-10 flex items-center justify-center z-50">
                        <div className="p-4 w-[20%] h-auto rounded-lg shadow-lg bg-[white]">
                        <h1 className='text-lg mb-2 font-semibold'>Invalid Credentials</h1>
                        <p className='text-black mb-2'>If you have forgot your credentials contact DoAA</p>
                        <button className=" px-3 py-1 bg-[#984120] text-white rounded-md" onClick={handleRetry}>
                            Retry
                        </button>
                        </div>
                    </div>
                )}
                {popupType === 'newPassword' && (
                        <div className="fixed inset-10 flex items-center justify-center z-50">
                            <div className="p-4 w-[20%] h-auto rounded-lg shadow-lg bg-[white]">
                            <label htmlFor='email'>Email</label>
                            <input
                                placeholder='Enter your email'
                                type='email'
                                onChange={(e)=>{setemailcheck(e.target.value)}}
                                className='p-2 border-1 mb-4 w-full rounded-lg'
                            />
                            <label htmlFor='email'>Old Password</label>
                            <input
                                placeholder='Enter your old password'
                                type='password'
                                onChange={(e)=>{setoldpassword(e.target.value)}}
                                className='p-2 border-1 mb-4 w-full rounded-lg'
                            />
                            <label htmlFor='password'>Password</label>
                            <input
                                onChange={(e)=>{setNewPassword(e.target.value)}}
                                placeholder='Enter your Password'
                                type='password'
                                className='p-2  border-1 mb-2 w-full rounded-lg'
                            />
                            <button className=" px-3 py-1 bg-[#984120] text-white rounded-md" onClick={handleChangepassword}>
                                Change
                            </button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Login
