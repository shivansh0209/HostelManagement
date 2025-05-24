import React , {useState,useEffect} from 'react';
import axios from "axios"

const FinesStudentScreen = () => {

    const [refunds, setRefunds] = useState([]);
    const [payments, setPayments] = useState([]);


    const fetchFines = () => {
        axios.get('http://localhost:4500/api/fines/getallfines', { withCredentials: true })
        .then(res => {
            const pendingRefunds = res.data.data.fines.filter(request => request.status === false);
            const paidRefunds = res.data.data.fines.filter(request => request.status === true);
            setPayments(paidRefunds);
            setRefunds(pendingRefunds);
        })
        .catch(err => console.error('Error fetching refund requests:', err));
    }

    useEffect(() => {
        fetchFines();
    }, []);

    const handleApprove = (id) => {
        axios.post(`http://localhost:4500/api/fines/payfine`, {id}, { withCredentials: true })
        .then(res => {
            fetchFines();
            console.log('Fine paid:', res.data);
        })
        .catch(err => console.error('Error paying fine:', err));
    }

    

    useEffect(()=>{
        axios.get('http://localhost:3000/api/COmplaintStudent').
        then((res)=>{
            setPayments(res.data.complaintsStudent);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return (
        <div className="p-10 h-screen">
            <h1 className="text-4xl mb-6 underline">Fines</h1>
            <div className="grid font-bold grid-cols-5 gap-4 p-2 rounded-md">
                <div>Reason</div>
                <div>Date</div>
                <div>Amount</div>
                <div>Due Date</div>
                <div>Action</div>
            </div>
            <div className="grid gap-4  max-h-[40%] overflow-y-auto">
                {refunds.map((request, index) => (
                <div key={request._id} className="grid text-blue-600 border-b-1 border-gray-300 grid-cols-5 gap-4 p-2 rounded-md shadow-sm ">
                    <div>{`${index+1}. ${request.type}`}</div>
                    <div>{request.madeOn?request.madeOn.split('T')[0]:'N/A'}</div>
                    <div>{request.amount}</div>
                    <div>{request.dueDate?request.dueDate.split('T')[0]:'N/A'}</div>
                    <div onClick={() => handleApprove(request._id)} className="text-green-700 cursor-pointer font-bold">Pay Now</div>
                </div>
                ))}
            </div>

            <div className="max-h-[30%] bg-white overflow-y-auto mt-6">
                <h1 className="text-4xl bg-white mb-2 sticky top-0 underline">Track Your Payments</h1>
                {
                    payments.length>0 ? (
                        payments.map((payment,index)=> (
                            <div className='mb-4' key={payment.index}>
                                <span className=''>{`${index+1}. ${payment.type}`}</span><br/>
                                <div className='ml-4 -mt-1'>
                                    <p className='text-xs inline text-[#984120] mx-1'>{payment.amount} Rs</p>
                                    <p className='text-xs inline text-[#E9B75B]'>On {payment.paidOn?payment.paidOn.split('T')[0]:"N/A"}</p>
                                </div>
                            </div>
                        ))
                    ):(
                        <div>No Previous payments</div>
                    )
                }
            </div>
        </div>
    );
};

export default FinesStudentScreen;