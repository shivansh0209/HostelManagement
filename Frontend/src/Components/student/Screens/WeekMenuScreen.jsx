import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeekMenuScreen = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4500/api/mess/menu', { withCredentials: true })
        .then((res) => {
            setMenu(res.data.data.menu)
        })
        .catch((err) => {
            console.error('Error fetching menu:', err);
        });
    }, []);

    return (
        <div className='p-10 h-screen flex flex-col bg-gray-100'>
        <h1 className='text-4xl underline mb-6'>Weekly Menu</h1>
        <div className='overflow-auto border-2 rounded-lg'>
            <table className='w-full text-center'>
            <thead className='bg-[#984120] text-white'>
                <tr>
                <th className='p-4'>Day</th>
                <th className='p-4'>Breakfast</th>
                <th className='p-4'>Lunch</th>
                <th className='p-4'>Snacks</th>
                <th className='p-4'>Dinner</th>
                </tr>
            </thead>
            <tbody>
                {menu.length > 0 ? (
                menu.map((item, index) => (
                    <tr key={index} className='even:bg-gray-50'>
                    <td className='p-4 text-[#9a4b4c]'>{item.day}</td>
                    <td className='p-4'>{item.breakfast}</td>
                    <td className='p-4'>{item.lunch}</td>
                    <td className='p-4'>{item.snacks}</td>
                    <td className='p-4'>{item.dinner}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan='5' className='p-4 text-red-500'>No Menu Available</td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default WeekMenuScreen;
