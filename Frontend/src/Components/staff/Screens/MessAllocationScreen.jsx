import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import filterSVG from "../../../assets/staff/filter.svg"

const MessAllocationScreen = () => {
    const [filterPopUp, setFilterPopUp] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [currentMess, setCurrentMess] = useState("all");
    const [sarchbox, setSearchBox] = useState("");
    const [type, setType] = useState('A');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedMess, setSelectedMess] = useState('A');

    const handleAllocate = () => {
        axios.post('http://localhost:4500/api/mess/allocate', { studentIds: selectedStudents, messName: selectedMess }, { withCredentials: true })
            .then((res) => {
                setSelectedStudents([]);
                fetchStudents();
            })
            .catch((err) => {
                console.log(err);
                alert("Error in allocating mess");
            });
    };

    const applyFilter = () => {
        setFilterPopUp(false);
        axios.get(`http://localhost:4500/api/student?searchQuery=${sarchbox}`, {withCredentials: true})
            .then((res) => {
                let list = res.data.data.studentsList.filter((ele) => ele.block === type);
                console.log(list)
                setStudentList(list);
            })
            .catch((err) => console.log(err));
    };

    const fetchStudents = useCallback(() => {
        axios.get(`http://localhost:4500/api/student?searchQuery=${sarchbox}`, {withCredentials: true})
            .then((res) => {
                let list = res.data.data.studentsList.filter((ele) => ele.messName === currentMess || currentMess === "all");
                setStudentList(list);
            })
            .catch((err) => {
                setStudentList([]);
                console.log(err)
            });
    }, [currentMess,sarchbox,selectedStudents]);

    useEffect(() => {
        fetchStudents();
    }, [currentMess,sarchbox]);

    const handleSelect = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id) ? prev.filter((studentId) => studentId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        const allIds = studentList.map((student) => student._id);
        setSelectedStudents(selectedStudents.length === allIds.length ? [] : allIds);
    };

    return (
        <>
            <div className='flex flex-col max-h-screen p-10'>
                <h1 className='text-4xl underline mb-4'>Mess Allocations</h1>
                <div className='flex justify-between'>
                    <select onChange={(e) => setCurrentMess(e.target.value)} className='p-1 pr-6 border-1 border-gray-400 rounded-lg'>
                        <option value="all">All</option>
                        <option value="A">Mess A</option>
                        <option value="B">Mess B</option>
                        <option value="C">Mess C</option>
                    </select>
                    <input
                        className='px-3 py-1 border-2 border-gray-300 w-[30%]'
                        placeholder='Search for Students'
                        onChange={(e) => setSearchBox(e.target.value)}
                    />
                    <img onClick={() => setFilterPopUp(true)} src={filterSVG} className='w-6 h-6 my-2' />
                </div>

                {(studentList.length>0 && selectedStudents.length>0) && (
                    <button onClick={handleSelectAll} className='my-2 px-2 w-fit  text-black border'>
                        {selectedStudents.length === studentList.length ? 'Deselect All' : 'Select All'}
                    </button>
                )}

                <div className='grid mt-4 grid-cols-4 gap-6 items-center'>
                    <span className='font-semibold text-lg'>Name</span>
                    <span className='font-semibold text-lg'>Block</span>
                    <span className='font-semibold text-lg'>Room Number</span>
                    <span className='font-semibold text-lg'>Roll Number</span>
                    {/* <span className='font-semibold text-lg'>Action</span> */}
                </div>

                <div className="overflow-y-auto h-[50%] mt-4">
                    {studentList.length > 0 ? studentList.map((student) => (
                        <div key={student._id} className='grid mt-4 grid-cols-4 gap-6 items-center'>
                            <div className='flex items-center'>
                                <input
                                    type='checkbox'
                                    checked={selectedStudents.includes(student._id)}
                                    onChange={() => handleSelect(student._id)}
                                    className='mr-2'
                                />
                                <span className='text-blue-600'>{student.name}</span>
                            </div>
                            <span className='text-blue-600'>{student.block}</span>
                            <span className='text-blue-600'>{student.roomNumber}</span>
                            <span className='text-blue-600'>{student.rollNumber}</span>
                            {/* <span className='text-gray-600 cursor-pointer'>Remove</span> */}
                        </div>
                    )) : (
                        <div>No students found</div>
                    )}
                </div>
                <div className='mt-4'>
                    <label className='mr-2 font-semibold'>Allot to Mess:</label>
                    <select value={selectedMess} onChange={(e) => setSelectedMess(e.target.value)} className='p-1 pr-6 border-1 border-gray-400 rounded-lg'>
                        <option value="A">Mess A</option>
                        <option value="B">Mess B</option>
                        <option value="C">Mess C</option>
                    </select>
                </div>

                <button onClick={handleAllocate} disabled={selectedStudents.length===0} className='disabled:bg-blue-400 mt-4 px-2 w-fit rounded-lg text-white bg-blue-600'>Edit Allocation</button>
            </div>

            {filterPopUp && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='w-[40%] p-4 border-2 bg-white rounded-lg shadow-lg'>
                        <h1 className='text-xl mb-3 underline font-semibold'>Select Filter</h1>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dropdown">Select a Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            id="dropdown"
                            className="mb-3 block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg"
                        >
                            <option value="A">Block-A</option>
                            <option value="B">Block-B</option>
                            <option value="C">Block-C</option>
                            <option value="D">Block-D</option>
                        </select>
                        <button onClick={applyFilter} className='bg-blue-500 rounded-lg text-white py-1 px-2'>Apply</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MessAllocationScreen;
