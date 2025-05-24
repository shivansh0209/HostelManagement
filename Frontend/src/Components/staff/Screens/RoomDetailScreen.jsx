import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RoomDetailsScreen = () => {
    const { room } = useParams();
    const [students, setStudents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/api/students`)
        .then((res) => setStudents(res.data.students))
        .catch((err) => console.error('API Error:', err));
    }, [room]);

    const handleRemove = (studentId) => {
        console.log(studentId)
    };

    const handleAdd = () => {
        console.log(searchTerm)
    };

    return (
        <div className='flex flex-col max-h-screen p-10'>
        <h1 className='text-4xl underline mb-4'>{room} Details</h1>

        <div className='grid grid-cols-3 gap-6 items-center font-semibold text-lg'>
            <span>Name</span>
            <span>View Details</span>
            <span>Remove</span>
        </div>

        <div className='overflow-y-auto h-[50%] mt-4'>
            {students.length > 0 ? (
            students.map((student) => (
                <div key={student.id} className='grid grid-cols-3 gap-6 items-center mt-4'>
                <span className='text-blue-600'>{student.name}</span>
                <span className='text-gray-600 cursor-pointer'>View Details</span>
                <span onClick={() => handleRemove(student.id)} className='text-red-600 cursor-pointer'>Remove</span>
                </div>
            ))
            ) : (
            <div>No students found</div>
            )}
        </div>

        
        {isEditing && (
            <div className='mt-4 flex items-center'>
            <input
                className='px-3 py-1 border-2 border-gray-300 w-[30%]'
                placeholder='Enter the roll number of the student'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleAdd} className='ml-4 px-4 py-2 bg-green-600 text-white rounded-lg'>Add</button>
            </div>
        )}
        
        <button onClick={() => setIsEditing(!isEditing)} className='mt-4 w-fit px-4 py-2 bg-blue-600 text-white rounded-lg'>
            {isEditing ? 'Cancel' : 'Edit'}
        </button>

        </div>
    );
};

export default RoomDetailsScreen;
