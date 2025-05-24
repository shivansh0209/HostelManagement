import React, { useState, useEffect } from 'react';
import axios from 'axios';
import filteSVG from "../../../assets/staff/filter.svg";

const PaymentRecieptScreen = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [popup, setPopup] = useState(false);
    const [filterOption, setFilterOption] = useState('');

    useEffect(() => {
    axios.get(`http://localhost:4500/api/student?searchQuery=${search}`, { withCredentials: true })
        .then(res => setStudents(res.data.data.studentsList))
        .catch(err => console.error('Error fetching students:', err));
    }, [search]);



    const handleApplyFilter = () => {
    setPopup(false);
    };

    return (
        <>
    <div className={`p-10 h-screen relative ${popup ? "opacity-14 pointer-events-none" : "opacity-100"}`}>
        <h1 className="underline text-4xl mb-4">Reciepts</h1>
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl">Student Wise List</h2>
        <div className="flex items-center gap-4">
            <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-400 rounded-md"
            />
            <img
            onClick={() => setPopup(true)}
            src={filteSVG}
            alt="Filter"
            className="h-6 w-6 cursor-pointer" 
            />
        </div>
        </div>

        <div className="grid gap-4 max-h-[60%] overflow-y-auto">
        {students.map((student, index) => (
            <div key={student._id} className="grid border-b-1 border-gray-300 grid-cols-5 gap-4 p-2 text-blue-600 rounded-md shadow-sm">
            <div>{`${index + 1}. ${student.name}`}</div>
            <div>{student.roomNumber}</div>
            <div>{student.block}</div>
            <div className="text-green-700"><a target='_black' href={student.messReciept}></a>Mess</div>
            <div className="text-green-700"><a  target='_blank' href={student.academicReceipt}>Academic</a></div>
            </div>
        ))}
        </div>
        <h1 className="text-center text-sm text-gray-500 mt-3">
        Click on the "Mess" and "Academic" to download the reciept
        </h1>
    </div>
    {popup && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white border w-[30%] h-fit p-6 rounded-md shadow-lg">
            <h2 className="text-2xl mb-4">Filter Options</h2>
            <div className="mb-4">
                <label className="flex items-center mb-2">
                <input
                    type="radio"
                    name="filter"
                    value="Block-Wise"
                    checked={filterOption === 'Block-Wise'}
                    onChange={(e) => setFilterOption(e.target.value)}
                    className="mr-2"
                />
                Block-Wise
                </label>
            </div>
            <button
                onClick={handleApplyFilter}
                className="px-4 py-2 bg-[#984120] text-white rounded-md"
            >
                Apply
            </button>
            </div>
        </div>
        )}
        </>
    );
};

export default PaymentRecieptScreen;
