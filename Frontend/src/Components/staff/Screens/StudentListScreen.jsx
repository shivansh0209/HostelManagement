import axios from 'axios';
import React, { use, useEffect, useState} from 'react';
import filterSVG from '../../../assets/staff/filter.svg';
import { Link, useNavigate } from 'react-router-dom';

const StudentListScreen = () => {
    const navigate = useNavigate();
    const [filterPopUp, setFilterPopUp] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [branchFilter, setBranchFilter] = useState('');
    const [blockSort, setBlockSort] = useState('');
    const [searchbox, setSearchBox] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');

    const fetchStudents = () => {
        axios.get(`http://localhost:4500/api/student?searchQuery=${searchbox}` , {withCredentials: true})
        .then((res) => {
            let list = res.data.data.studentsList;
            if (blockSort) {
                list = list.filter((ele) => ele.block === blockSort);
            }
            setStudentList(list);
        })
        .catch((err) => {
            setStudentList([]);
            console.log(err)
        });
    };


    useEffect(() => {
        fetchStudents();
    }, [branchFilter, searchbox, blockSort]);

    const applyFilter = () => {
        setBranchFilter(selectedBranch);
        setFilterPopUp(false);
    };

    return (
        <>
        <div className='flex flex-col max-h-screen p-10'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-4xl underline'>List of Students</h1>
                <div className='flex items-center'>
                    <input
                        className='px-3 py-1 border-2 rounded border-gray-300 w-fit'
                        placeholder='Search for Students'
                        onChange={(e) => setSearchBox(e.target.value)}
                    />
                    <img src={filterSVG} onClick={() => setFilterPopUp(true)} className='w-6 h-6 ml-2 cursor-pointer' />
                </div>
            </div>

            <div className='grid grid-cols-5 gap-6 font-semibold text-lg'>
                <span>Name</span>
                <span>Block</span>
                <span>Room Number</span>
                <span>Roll Number</span>
                <span>Sheet Details</span>
            </div>

            <div className='overflow-y-auto h-[50%] mt-4'>
            {studentList.length ? (
                studentList.map((student) => (
                <div key={student._id} className='grid grid-cols-5 gap-6 mt-4 items-center'>
                    <span className='text-blue-600'>{student.name}</span>
                    <span className='text-blue-600'>{student.block}</span>
                    <span className='text-blue-600'>{student.roomNumber}</span>
                    <span className='text-blue-600'>{student.rollNumber}</span>
                    <span onClick={() => navigate(student._id)} className='text-gray-600 underline cursor-pointer'>View Details</span>
                </div>
                ))
            ) : (
                <div>No students available</div>
            )}
            </div>
            <Link to='addstudent' className='px-2 py-1 bg-[#9a4b4c] mt-6 rounded-lg text-white w-fit'>Add a Student</Link>
        </div>

        {filterPopUp && (
            <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='w-[30%] p-4 border-2 bg-white rounded-lg shadow-lg'>
                <h1 className='text-xl my-3'>Select Block</h1>
                <select
                value={blockSort}
                onChange={(e) => setBlockSort(e.target.value)}
                className='mb-3 block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg'
                >
                <option value=''>All Blocks</option>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
                <option value='D'>D</option>
                </select>
                <button onClick={applyFilter} className='bg-blue-500 rounded-lg text-white py-1 px-2'>Apply</button>
            </div>
            </div>
        )}
        </>
    );
};

export default StudentListScreen;
