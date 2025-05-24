import axios from 'axios';
import React, { useEffect, useState } from 'react';
import filterSVG from '../../../assets/staff/filter.svg';

const RoomListScreen = () => {
    const [filterPopUp, setFilterPopUp] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const [blockFilter, setBlockFilter] = useState('');
    const [searchbox, setSearchBox] = useState('');
    const [selectedBlock, setSelectedBlock] = useState('');

    const fetchRooms = () => {
        axios.get('http://localhost:3000/api/roomList')
        .then((res) => {
            let list = res.data.rooms;
            if (blockFilter) {
            list = list.filter((ele) => ele.block === blockFilter);
            }
            if (searchbox) {
            list = list.filter((ele) => ele.room_number.includes(searchbox));
            }
            setRoomList(list);
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchRooms();
    }, [blockFilter, searchbox]);

    const applyFilter = () => {
        setBlockFilter(selectedBlock);
        setFilterPopUp(false);
    };

    return (
        <>
        <div className='flex flex-col max-h-screen p-10'>
            <div className='flex justify-between items-center mb-6'>
            <h1 className='text-4xl underline'>List of Rooms</h1>
            <div className='flex items-center'>
                <input
                className='px-3 py-1 border-2 rounded border-gray-300 w-fit'
                placeholder='Search for Rooms'
                onChange={(e) => setSearchBox(e.target.value)}
                />
                <img src={filterSVG} onClick={() => setFilterPopUp(true)} className='w-6 h-6 ml-2 cursor-pointer' />
            </div>
            </div>

            <div className='grid grid-cols-3 gap-6 font-semibold text-lg'>
            <span>Room Number</span>
            <span>Block</span>
            <span>View Details</span>
            </div>

            <div className='overflow-y-auto h-[50%] mt-4'>
            {roomList.length ? (
                roomList.map((room) => (
                <div key={room.id} className='grid grid-cols-3 gap-6 mt-4 items-center'>
                    <span className='text-blue-600'>{room.room_number}</span>
                    <span className='text-blue-600'>{room.block}</span>
                    <span className='text-gray-600 underline cursor-pointer'>View Details</span>
                </div>
                ))
            ) : (
                <div>No rooms available</div>
            )}
            </div>
        </div>

        {filterPopUp && (
            <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='w-[30%] p-4 border-2 bg-white rounded-lg shadow-lg'>
                <h1 className='text-xl mb-3 underline font-semibold'>Select Block</h1>
                <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className='mb-3 block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg'
                >
                <option value=''>All Blocks</option>
                <option value='A'>Block A</option>
                <option value='B'>Block B</option>
                <option value='C'>Block C</option>
                <option value='D'>Block D</option>
                </select>
                <button onClick={applyFilter} className='bg-blue-500 rounded-lg text-white py-1 px-2'>Apply</button>
            </div>
            </div>
        )}
        </>
    );
};

export default RoomListScreen;
