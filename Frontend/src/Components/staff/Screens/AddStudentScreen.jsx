import React, { useState } from 'react';
import axios from 'axios';

const AddStudentScreen = () => {
    const [newStudentDetails, setNewStudentDetails] = useState({
    name: '',
    fatherName: '',
    programme: '',
    motherName: '',
    department: '',
    rollNumber: '',
    password: '',
    email: '',
    permanentAddress: '',
    hostelAddress: '',
    bloodGroup: '',
    academicYear: '',
    semester: '',
    dateOfBirth: '',
    messName: '',
    roomNumber: '',
    block: '',
    hostel: '',
    nationality: '',
    state: '',
    contact: '',
    fatherContact: '',
    motherContact: '',
    profilePic: null,
    messReciept: null,
    academicReceipt: null,
    });
    const [errorPopup, setErrorPopup] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredKeys = Object.keys(newStudentDetails).filter(key => key !== 'profilePic');
        for (let key of requiredKeys) {
            if (!newStudentDetails[key] && key !== 'profilePic' && key !== 'messReciept' && key !== 'academicReceipt') {
            setErrorPopup('Please fill all required fields.');
            return;
            }
        }
        const studentDetails = new FormData();
        Object.keys(newStudentDetails).forEach((key) => {
            studentDetails.append(key, newStudentDetails[key]);
        });
        axios.post('http://localhost:4500/api/student/addAStudent', studentDetails , {withCredentials: true,headers: { 'Content-Type': 'multipart/form-data' }})
        .then((response) => {
            console.log('Student added successfully:', response.data);
            Object.keys(newStudentDetails).forEach((key) => {
                newStudentDetails[key] = '';
            });
        })
        .catch((error) => {
            console.error('Error adding student:', error);
        });
        setNewStudentDetails({
            name: '',
            fatherName: '',
            programme: '',
            motherName: '',
            department: '',
            rollNumber: '',
            password: '',
            email: '',
            permanentAddress: '',
            hostelAddress: '',
            bloodGroup: '',
            academicYear: '',
            semester: '',
            dateOfBirth: '',
            messName: '',
            roomNumber: '',
            block: '',
            hostel: '',
            nationality: '',
            state: '',
            contact: '',
            fatherContact: '',
            motherContact: '',
            profilePic: null,
        });
        
    };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudentDetails({ ...newStudentDetails, [name]: value });
    };

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div className="h-[90%] w-full p-4 bg-white">
            <h1 className='text-4xl underline mb-6'>Add Student</h1>
            <div className="grid grid-cols-2 gap-6 items-center max-h-[86%] overflow-y-auto">
                {Object.keys(newStudentDetails).map((key) => (
                <div key={key} className='flex flex-col'>
                    <label className='text-lg font-semibold capitalize mb-1'>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                    {key === 'profilePic'? (
                    <input
                        type='file'
                        name={key}
                        onChange={(e) => setNewStudentDetails({ ...newStudentDetails, profilePic: e.target.files[0] })}
                        className='p-2 border rounded-lg bg-white'/>
                    ) : key === 'messReciept'? (
                        <input
                        type='file'
                        name={key}
                        onChange={(e) => setNewStudentDetails({ ...newStudentDetails, messReciept: e.target.files[0] })}
                        className='p-2 border rounded-lg bg-white'/>
                    ) :key === 'academicReceipt'? (
                        <input
                        type='file'
                        name={key}
                        onChange={(e) => setNewStudentDetails({ ...newStudentDetails, academicReceipt: e.target.files[0] })}
                        className='p-2 border rounded-lg bg-white'/>
                    ) :(                
                    <input 
                        type={key === 'dateOfBirth' ? 'date' : 'text'}
                        name={key}
                        value={newStudentDetails[key]}
                        onChange={handleChange}
                        className='p-2 border rounded-lg bg-white'
                        />)}
                </div>))}
                <button type='submit' onClick={handleSubmit} className='col-span-2 mt-6 px-6 py-3 hover:bg-blue-700 bg-blue-600 text-white rounded-lg'>Submit</button>
            </div>
        </div>
        {errorPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
                    <h2 className='text-2xl font-bold mb-4'>Error</h2>
                    <p className='mb-4 text-gray-700'>{errorPopup}</p>
                    <button className='px-4 py-2 bg-red-500 text-white rounded-lg' onClick={() => setErrorPopup('')}>Close</button>
                </div>
            </div>
        )}
        </div>  
    )};

export default AddStudentScreen;
