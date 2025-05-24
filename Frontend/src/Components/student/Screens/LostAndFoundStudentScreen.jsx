import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LostAndFoundStudentScreen = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4500/api/lostandfound', { withCredentials: true })
        .then((response) => {
            setItems(response.data.data.lostAndFounds);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div className='p-10 h-screen w-full bg-gray-100 overflow-auto'>
        <h1 className='text-4xl underline mb-6'>Lost and Found</h1>
        <div className='max-h-[80%] overflow-y-auto bg-white p-4 rounded-lg'>
            {items.length > 0 ? (
            items.map((item, index) => (
                <p className='my-1' key={index}>{`${index + 1}. ${item.content}`}</p>
            ))
            ) : (
            <p>No Lost and Found items available.</p>
            )}
        </div>
        </div>
    );
};

export default LostAndFoundStudentScreen;
