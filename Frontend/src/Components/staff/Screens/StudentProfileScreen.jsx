import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const StudentProfileScreen = () => {
    const [profileData, setProfileData] = useState({});
    const [showPopup, setShowPopup] = useState('');
    const [fineAmount, setFineAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [fineReason, setFineReason] = useState('');
    const { studentId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4500/api/student/${studentId}`, {withCredentials: true})
        .then((res) => {
            const studentData = res.data.data.student;
            studentData.dateOfBirth = new Date(studentData.dateOfBirth).toLocaleDateString('en-GB');
            setProfileData(studentData);
        })
        .catch((err) => console.error('Error fetching student profile:', err));
    }, []);

    const submitFine = () => {
        axios.post('http://localhost:4500/api/fines/imposefine', {
            amount: fineAmount,
            dueDate,
            imposedOn: profileData._id,
            type: fineReason,
        }, {withCredentials: true})
        .then((res) => {
            console.log('Fine imposed:', res.data);
        }).catch((err) => {
            console.error('Error imposing fine:', err);
        });
        setShowPopup('');
    }

    const ProfileRow = ({ label, value }) => (
        <div className='mb-2'>
        <span className='font-semibold'>{label}: </span>
        <span className='text-blue-500'>{value || 'N/A'}</span>
        </div>
    );

    const sendNoti = () => {
        axios.post('http://localhost:4500/api/fines/sendalert', {studentIds:[profileData._id], message:fineReason}, {withCredentials: true})
        .then(res => {
            console.log('Notification sent:', res.data);
        })
        .catch(err => {
            console.error('Error sending notification:', err);
        });
        setShowPopup('');
    }

    return (
        <div className='p-10 h-screen bg-gray-100 flex flex-col items-center'>
        <div className='w-full flex flex-col items-center mb-8'>
            <img 
            src={profileData.profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO9cHtp-svWkCeIygi8if8bhZnkqbOMO8keQ&s'}
            className='w-42 h-42 rounded-full mb-4 border-4 border-gray-300'
            />
            <h1 className='text-3xl font-bold'>{profileData.name || 'Shivansh Pandey'}</h1>
        </div>

        <div className='w-full flex justify-around'>
            <div className='w-1/2'>
            <ProfileRow label='Roll Number' value={profileData.rollNumber} />
            <ProfileRow label='Father Name' value={profileData.fatherName} />
            <ProfileRow label='Father Contact' value={profileData.fatherContact} />
            <ProfileRow label='Date of Birth' value={profileData.dateOfBirth} />
            <ProfileRow label='Programme' value={profileData.programme} />
            <ProfileRow label='Mess Allocated' value={profileData.messName} />
            <ProfileRow label='Hostel' value={profileData.hostel} />
            <ProfileRow label='State' value={profileData.state} />
            <ProfileRow label='Contact' value={profileData.contact} />
            <ProfileRow label='Mess Fee Status' value={profileData.messReciept?"Paid":"Unpaid"} />
            </div>

            {/* Right Column */}
            <div className='w-1/2'>
            <ProfileRow label='Academic Session' value={profileData.academicYear} />
            <ProfileRow label='Mother Name' value={profileData.motherName} />
            <ProfileRow label='Mother Contact' value={profileData.motherContact} />
            <ProfileRow label='Blood Group' value={profileData.bloodGroup} />
            <ProfileRow label='Department/School' value={profileData.department} />
            <ProfileRow label='Fines Imposed' value={profileData.finesImposed} />
            <ProfileRow label='Permanent Address' value={profileData.permanentAddress} />
            <ProfileRow label='Nationality' value={profileData.nationality} />
            <ProfileRow label='Email' value={profileData.email} />
            <ProfileRow label='Academic Fee Status' value={profileData.academicReceipt?"Paid":"Unpaid"} />
            </div>
        </div>

        {/* Impose Fine Button */}
        <div className='flex flex-row mt-2 w-full'>
            <button
                className='px-6 mr-4 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg w-fit'
                onClick={() => setShowPopup('fine')} 
            >
                Impose Fine
            </button>
            <button
                className='px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg '
                onClick={() => setShowPopup('noti')}
            >
                Send Personal Message
            </button>
        </div>

        {/* Popup */}
        {showPopup && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold mb-4'>{showPopup==='fine'?"Impose Fine":"Send Personal Notification"}</h2>
                <label className={`${showPopup==='noti'?"hidden":""} block mb-2`}>Amount:</label>
                <input
                type='number'
                value={fineAmount}
                onChange={(e) => setFineAmount(e.target.value)}
                className={`w-full p-2 border rounded mb-4 ${showPopup==='noti'?"hidden":""}`}
                />
                <label className={`block mb-2 ${showPopup==='noti'?"hidden":""}`}>Due Date:</label>
                <input
                type='date'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full ${showPopup==='noti'?"hidden":""} p-2 border rounded mb-4`}
                />
                <label className='block mb-2'>{showPopup==='fine'?"Reason":"Message"}</label>
                <input
                type='text'
                value={fineReason}
                onChange={(e) => setFineReason(e.target.value)}
                className='w-full p-2 border rounded mb-4'
                />
                <button
                onClick={showPopup==='fine'?submitFine:sendNoti}
                className='px-4 py-2 bg-green-500 text-white rounded-lg mr-2'
                >
                Submit
                </button>
                <button
                onClick={() => setShowPopup('')}
                className='px-4 py-2 bg-gray-400 text-white rounded-lg'
                >
                Cancel
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default StudentProfileScreen;
