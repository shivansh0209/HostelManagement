import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FineScreen = () => {
    const [unpaidFines, setUnpaidFines] = useState([]);
    const [paidFines, setPaidFines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFines, setSelectedFines] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const sendAlert = () => {
        axios.post('http://localhost:4500/api/fines/sendalert', { studentIds:selectedFines }, { withCredentials: true })
        .then(res => {
            console.log('Hi')
            setSelectedFines([]);

        })
        .catch(err => {
            console.error('Error sending alert:', err);
        });
    };


    const handleCheckboxChange = (e, fineId) => {
        const isChecked = e.target.checked;
        let updatedSelected;
        if (isChecked) {
            updatedSelected = [...selectedFines, fineId];
        } else {
            updatedSelected = selectedFines.filter(id => id !== fineId);
        }
        setSelectedFines(updatedSelected);
        setSelectAll(updatedSelected.length === unpaidFines.length);
    };

    
    const handleSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        if (isChecked) {
            const allFineIds = unpaidFines.map(fine => fine.imposedOn._id);
            setSelectedFines(allFineIds);
        } else {
            setSelectedFines([]);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:4500/api/fines/getallfines', { withCredentials: true })
            .then(res => {
                const fines = res.data.data.fines;
                const unpaid = fines.filter(fine => fine.status === false);
                setUnpaidFines(unpaid);
                setPaidFines(fines.filter(fine => fine.status === true));
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching fines:', err);
                setLoading(false);
            })
    }, []);

    return (
        <div className='p-6 h-screen'>
            <div className='grid max-h-[40%] overflow-y-auto grid-rows-auto gap-4 mb-6 bg-white'>
                <div className='sticky top-0 bg-white' >
                    <h1 className='text-3xl underline sticky top-0 bg-white'>Unpaid Fines</h1>
                    <div className={` flex flex-row justify-between  items-center mt-2  ${selectedFines.length>0?"":"hidden"}`}>
                        <label className='flex items-center'>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                                className="mr-2 "
                            />
                            Select All
                        </label>
                        <button onClick={sendAlert} className=' px-2 w-fit rounded-lg text-white bg-[#984120] py-1 mr-10'>Send Alert</button>
                    </div>
                </div>
                {unpaidFines.length > 0 ? (
                    <div className="grid grid-cols-4 gap-4 font-semibold text-black">
                        <span>Type</span>
                        <span>Name</span>
                        <span>Amount</span>
                        <span>Due Date</span>
                    </div>
                ) : (
                    <div>No unpaid fines</div>
                )}
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    unpaidFines.map((fine, index) => (
                        <div key={fine.imposedOn._id} className='bg-white grid grid-cols-4 gap-4 border-b-2 border-gray-300 items-center'>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    checked={selectedFines.includes(fine.imposedOn._id)}
                                    onChange={(e) => handleCheckboxChange(e, fine.imposedOn._id)}
                                    className="mr-2"
                                />
                                <span className='text-blue-600'>{index + 1 + ". " + fine.type}</span>
                            </div>
                            <span className='text-blue-600'>{fine.imposedOn.name}</span>
                            <span className='text-blue-600'>{fine.amount} Rs</span>
                            <span className='text-blue-600'>{fine.dueDate.split('T')[0]}</span>
                        </div>
                    ))
                )}
            </div>

            <div className='grid max-h-[50%] bg-white  overflow-y-auto grid-rows-auto gap-4'>
                <div className='sticky top-0 bg-white'>
                    <h1 className='text-3xl pb-4 underline mb-4'>Paid Fines</h1>
                    {paidFines.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4 font-semibold text-black">
                            <span>Type</span>
                            <span>Name</span>
                            <span>Amount</span>
                        </div>
                    ) : (
                        <div>No paid fines</div>
                    )}
                </div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    paidFines.map((fine, index) => (
                        <div key={fine.imposedOn._id} className='grid grid-cols-3 gap-4 border-b-2 border-gray-300'>
                            <span className='text-blue-600'>{index + 1 + ". " + fine.type}</span>
                            <span className='text-blue-600'>{fine.imposedOn.name}</span>
                            <span className='text-blue-600'>{fine.amount} Rs</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FineScreen;
