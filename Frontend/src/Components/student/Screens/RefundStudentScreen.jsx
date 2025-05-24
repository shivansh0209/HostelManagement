import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RefundStudentScreen = () => {
    const [payments, setPayments] = useState([]);
    const [Donepayments, setDonePayments] = useState([]);
    const [Notpayments, setNotPayments] = useState([]);

    // Fetch and filter payments
    useEffect(() => {
        const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:4500/api/mess/messcancellation' , {withCredentials: true});

            // Filter payments
            const done = response.data.data.messCancellations.filter(payment => payment.status === true);
            const notDone = response.data.data.messCancellations.filter(payment => payment.status === false);
            console.log(response.data.data.messCancellations);
            setDonePayments(done);
            setNotPayments(notDone);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
        };

        fetchPayments();
    }, []);

    return (
        <div className='h-screen p-10'>
        {/* Done Payments Section */}
        <div className="max-h-[50%] bg-white overflow-y-auto mt-6">
            <h1 className="text-4xl bg-white mb-2 sticky top-0 underline">Refunds in Process</h1>
            {Donepayments.length > 0 ? (
            Donepayments.map((payment, index) => (
                <div className='mb-4' key={index}>
                <span>{`${index + 1}. Brief about Refund :           `}</span>
                <span className='text-xs text-[#E9B75B] mx-4'>{payment.amount}</span>
                <span className='text-xs text-[#9a4b4c] mx-4'>{payment.status?"Done":"Pending"}</span>
                </div>
            ))
            ) : (
            <div>No Completed Payments</div>
            )}
        </div>

        <div className="max-h-[50%] bg-white overflow-y-auto mt-6">
            <h1 className="text-4xl bg-white mb-2 sticky top-0 underline">Refunds Made</h1>
            {Notpayments.length > 0 ? (
            Notpayments.map((payment, index) => (
                <div className='mb-4' key={index}>
                <span>{`${index + 1}. Brief about Refund :           `}</span>
                <span className='text-xs text-[#E9B75B] mx-4'>{payment.amount}</span>
                <span className='text-xs text-[#9a4b4c] mx-4'>{payment.status?"Done":"Pending"}</span>
                </div>
            ))
            ) : (
            <div>No Pending Payments</div>
            )}
        </div>
        </div>
    );
};

export default RefundStudentScreen;
