import React, { useEffect,useContext, useState, use } from 'react';
import axios from 'axios';
import UserContext from '../../../Context/UserContext';

const DashboardStudentScreen = () => {
    const { userDetails } = useContext(UserContext);
    const username = userDetails.name? userDetails.name.split(' ')[0]: 'User';
    const block = userDetails.block;
    const room_number = userDetails.roomNumber ;
    const hostel_name = userDetails.hostel;

    const [personalNotifications, setPersonalNotifications] = useState([]);
    const [hostelNotices, setHostelNotices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4500/api/student/dashboard/getnotifications', {withCredentials: true})
        .then((res) => setPersonalNotifications(res.data.data.notifications))
        .catch((err) => console.error('Error fetching personal notifications:', err));

        axios.get('http://localhost:4500/api/hostelannouncements' , {withCredentials: true})
        .then((res) => setHostelNotices(res.data.data.hostelAnnouncements))
        .catch((err) => console.error('Error fetching hostel notices:', err));

        }, []);

    const renderNotifications = (data, label) => (
        <div className='max-h-[20%] w-[60%] overflow-y-auto bg-white p-4 rounded-lg shadow-lg mb-8 border border-gray-300'>
        <h1 className='text-2xl underline mb-2 font-semibold'>{label}</h1>
        {data.length > 0 ? (
            data.map((item, index) => (
            <p className='my-2 text-gray-700' key={item._id}>{`${index + 1}. ${item.content}`}</p>
            ))
        ) : (
            <p className='text-gray-500'>No {label} Found</p>
        )}
        </div>
    );

    return (
        <div className='p-10 h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200'>

        <h1 className='text-5xl font-bold mb-4 text-[#984120]'>Welcome, {username}</h1>
        <h2 className='text-2xl font-semibold text-gray-600 mb-8'>{`${block}-${room_number}, ${hostel_name} Hostel`}</h2>


        {renderNotifications(personalNotifications, 'Personal Notifications')}


        {renderNotifications(hostelNotices, 'Hostel Noticeboard')}
        </div>
    );
};

export default DashboardStudentScreen;
