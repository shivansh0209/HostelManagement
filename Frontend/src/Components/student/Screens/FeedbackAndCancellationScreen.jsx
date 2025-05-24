import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackAndCancellationScreen = () => {
    const [feedback, setFeedback] = useState('');
    const [cancellations, setCancellations] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedMeals, setSelectedMeals] = useState({
        breakfast: false,
        lunch: false,
        snacks: false,
        dinner: false
    });

    const mealPrices = { breakfast: 30, lunch: 50, snacks: 20, dinner: 50 };


    const fetchCancellations = async () => {
        axios.get('http://localhost:4500/api/mess/messcancellation', { withCredentials: true })
        .then((res) => {
            const pendingCancellations = res.data.data.messCancellations.filter(request => request.status === false);
            setCancellations(pendingCancellations);
        })
        .catch((err) => console.error('Error fetching cancellations:', err));
    }

    useEffect(() => {
        fetchCancellations();
    }, []);

    const handleSubmit = async () => {
        axios.post('http://localhost:4500/api/mess/messfeedback', { content: feedback }, { withCredentials: true })
        .then((res) => {
            console.log('Feedback submitted:', res.data);
        })
        .catch((err) => console.error('Error submitting feedback:', err));
        setFeedback('');
    };

    const calculateAmount = () => {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

        let totalAmount = 0;
        for (const meal in selectedMeals) {
        if (selectedMeals[meal]) {
            totalAmount += mealPrices[meal] * days;
        }
        }
        return totalAmount;
    };

    const deleteCancellation = (id) => {
        axios.get(`http://localhost:4500/api/mess/messcancellation/delete/${id}`, { withCredentials: true })
        .then((res) => {
            fetchCancellations();
        })
        .catch((err) => console.error('Error deleting cancellation:', err));

    }


    const handleMealChange = (meal) => {
        setSelectedMeals((prev) => ({ ...prev, [meal]: !prev[meal] }));
    };

    const handleRequestSubmit = () => {
        let str='';
        str += selectedMeals.breakfast ? ',Breakfast' : '';
        str += selectedMeals.lunch ? ',Lunch' : '';
        str += selectedMeals.snacks ? ',Snacks' : '';
        str += selectedMeals.dinner ? ',Dinner' : '';
        str = str.slice(1);
        
        axios.post('http://localhost:4500/api/mess/messcancellation', {from:fromDate,to:toDate,mealType:str, amount:calculateAmount()} , {withCredentials:true}).then((res) => {
            fetchCancellations();
        } ).catch((err) => {
            console.log(err);
        });
        setShowPopup(false);
    };

    

    return (
        <div className='p-10 h-screen flex flex-col bg-gray-100'>
        <h1 className='text-4xl underline mb-6'>Feedback is Important</h1>

        {/* Feedback Input */}
        <textarea
            placeholder='Share your feedback...'
            className='border-2 w-full h-[40vh] p-4 rounded-lg mb-4 placeholder-top-left'
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        <button onClick={handleSubmit} className='px-4 py-2 bg-[#984120] text-white rounded-lg mb-6'>Submit</button>
        {/* Mess Cancellations Section */}
        <h1 className='text-4xl underline mb-2'>Mess Cancellation Applied</h1>
        <div className='max-h-[20vh] overflow-y-auto bg-white p-4 rounded-lg'>
            {cancellations.length > 0 ? (
            cancellations.map((cancel, index) => (
                <p className='my-1 cursor-pointer' key={index}>{`${index + 1}. From ${cancel.from.split('T')[0]} to ${cancel.to.split('T')[0]} `}<span onClick={() => deleteCancellation(cancel._id)} className='pl-6 text-[#984120]'> Cancel</span></p>
            ))
            ) : (
            <p>No Cancellations Found</p>
            )}
        </div>

        {/* Popup Button */}
        <button
            className='mt-2 w-fit px-4 py-2 bg-[#984120] text-white rounded-lg'
            onClick={() => setShowPopup(true)}
        >
            Add Request
        </button>

        {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-lg'>
                <h1 className='text-2xl mb-4'>Add New Request</h1>
                <label>From: <input type='date' value={fromDate} onChange={(e) => setFromDate(e.target.value)} className='border-2 p-2 mb-2' /></label><br/>
                <label>To: <input type='date' value={toDate} onChange={(e) => setToDate(e.target.value)} className='border-2 p-2 mb-4' /></label>

                {Object.keys(selectedMeals).map((meal) => (
                <label key={meal} className='block mb-2'>
                    <input type='checkbox' checked={selectedMeals[meal]} onChange={() => handleMealChange(meal)} /> {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </label>
                ))}

                <p className='mt-4 text-lg'>Total Amount: ₹{calculateAmount()}</p>
                
                <button onClick={handleRequestSubmit} disabled={(new Date(fromDate) < new Date()) || (new Date(fromDate) > new Date(toDate)) || calculateAmount()===0 || isNaN(calculateAmount())} className='mt-4 px-4 py-2 bg-green-500 text-white rounded-lg'>Submit</button>
                <button onClick={() => setShowPopup(false)} className='mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded-lg'>Close</button>
            </div>
            </div>
        )}
        </div>
    );
};

export default FeedbackAndCancellationScreen;
