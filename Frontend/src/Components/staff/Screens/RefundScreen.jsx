import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RefundScreen = () => {
    const [refunds, setRefunds] = useState([]);

    const fetchRefunds = async () => {
        axios.get('http://localhost:4500/api/mess/messcancellation', {withCredentials: true})
        .then(res => {
            const pendingRefunds = res.data.data.messCancellations.filter(request => request.status === false);
            console.log(res.data.data.messCancellations)
            setRefunds(pendingRefunds);
        })
        .catch(err => console.error('Error fetching refund requests:', err));
    }


    useEffect(() => {
        fetchRefunds();
    }, []);

    const handleApprove = (id) => {
        axios.get(`http://localhost:4500/api/mess/approve/${id}`, {withCredentials: true})
        .then(res => {
            fetchRefunds()
        })
        .catch(err => console.error('Error approving refund request:', err));
    }

    return (
        <div className="p-10 h-screen">
        <h1 className="text-4xl mb-6 underline">Mess Refund Requests</h1>
        <div className="grid gap-4  max-h-[60%] overflow-y-auto">
            {refunds.map((request, index) => (
            <div key={index} className="grid text-blue-600 border-b-1 border-gray-300 grid-cols-5 gap-4 p-2 rounded-md shadow-sm ">
                <div>{`${index+1}. ${request.createdBy.name}`}</div>
                <div>{request.messName}</div>
                <div>{request.from.split('T')[0]}</div>
                <div>{request.to.split('T')[0]}</div>
                <div onClick={() => handleApprove(request._id)} className="text-green-700 cursor-pointer font-bold">Approve</div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default RefundScreen;
