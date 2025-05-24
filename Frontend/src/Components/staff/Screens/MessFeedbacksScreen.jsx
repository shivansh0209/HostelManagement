import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessFeedbacksScreen = () => {
    const [currentMess, setCurrentMess] = useState('all');
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4500/api/mess/messfeedback', {withCredentials: true})
            .then(res => setFeedbacks(res.data.data.feedbacks))
            .catch(err => console.error('Error fetching feedbacks:', err));
    }, []);

    const filteredFeedbacks = currentMess === 'all'
        ? feedbacks
        : feedbacks.filter(feedback => feedback.messName === currentMess);

    const getMessColor = (mess) => {
        switch (mess) {
            case 'A': return 'bg-[#984120] border-blue-500';
            case 'B': return 'bg-[#E9B75B] border-green-500';
            case 'C': return 'bg-blue-400 border-yellow-500';
            default: return 'bg-gray-100 border-gray-500';
        }
    };

    return (
        <div className='p-10'>
            <h1 className='text-4xl mb-6 underline'>Mess Feedbacks</h1>
            <select onChange={(e) => setCurrentMess(e.target.value)} className='p-1 pr-6 mb-6 border-1 border-gray-400 rounded-lg'>
                <option value="all">All</option>
                <option value="A">Mess A</option>
                <option value="B">Mess B</option>
                <option value="C">Mess C</option>
            </select>
            <div className='grid grid-cols-2 gap-10 max-h-[60vh] overflow-y-auto'>
                {filteredFeedbacks.map(feedback => (
                    <div key={feedback._id} className={`relative p-6 border rounded-lg shadow-lg ${getMessColor(feedback.messName)}`}>
                        <span className='absolute top-2 right-2 text-sm font-bold'>{feedback.messName}</span>
                        <p className='mt-4'>{feedback.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessFeedbacksScreen;
