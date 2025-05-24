import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from '../../../Context/UserContext';

const StudentProfileScreen = () => {
    const [profileData, setProfileData] = useState({});
    const { userDetails } = useContext(UserContext);

    useEffect(() => {
        axios.get(`http://localhost:4500/api/student/${userDetails._id}`, {withCredentials: true})
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


        </div>
    );
};

export default StudentProfileScreen;
