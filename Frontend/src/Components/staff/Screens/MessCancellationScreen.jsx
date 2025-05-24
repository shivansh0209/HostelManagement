import React, { useState,useEffect, useCallback } from 'react';
import axios from 'axios';


const MessCancellationScreen = () => {
    
    const [selectedMess1,setMess1] = useState("all")
    const [selectedMess2,setMess2] = useState("all")
    const [dateIn,setDateIn] = useState("all");
    const [Evaluatedstring,setEvaluatedString] = useState("Select a date first")
    const [activeCancellations,setActiveCancellations] = useState([])

    const funcEvaluate = useCallback(() => {
        if (!dateIn) {
            setEvaluatedString("Please select a valid date");
            return;
        }
    
        axios.get("http://localhost:4500/api/mess/messcancellation", { withCredentials: true })
            .then(res => {
                const formattedDate = new Date(dateIn);
                const allCancellations = res.data.data.messCancellations;
                const messCounts = { 'A': 0, 'B': 0, 'C': 0 };
    
                for (let i = 0; i < allCancellations.length; i++) {
                    const cancel = allCancellations[i];
    
                    const fromDate = new Date(cancel.from).toLocaleDateString('en-CA');
                    const toDate = new Date(cancel.to).toLocaleDateString('en-CA');
                    
                    const mealTypes = cancel.mealType ? cancel.mealType.split(',').map(meal => meal.trim()) : [];
                    
                    // console.log(cancel.messName);
                    if (
                        formattedDate >= new Date(fromDate) && formattedDate <= new Date(toDate) &&
                        (selectedMess2 === 'all' || mealTypes.includes(selectedMess2))
                    ) {
                        messCounts[cancel.messName]++;
                    }
                }
    
                setEvaluatedString(`${messCounts['A']} of Mess A, ${messCounts['B']} of Mess B, ${messCounts['C']} of Mess C`);
            })
            .catch(err => {
                console.error("Error fetching cancellations:", err);
                setEvaluatedString("Error fetching data");
            });
    }, [dateIn, selectedMess2]);
    


    useEffect(() => {
        const evalDate =new Date();
        axios.get("http://localhost:4500/api/mess/messcancellation", {withCredentials: true})
            .then(res => {
                const allCancellations = res.data.data.messCancellations;
                const active = allCancellations.filter(cancel => {
                    const fromDate = new Date(cancel.from);
                    const toDate = new Date(cancel.to);
                    console.log(evalDate >= fromDate && evalDate <= toDate)
                    return evalDate <= fromDate && (selectedMess1 === cancel.mess || selectedMess1 === 'all');
                });
                setActiveCancellations(active);
            })
            .catch(err => {
                console.error("Error fetching cancellations:", err);
                setActiveCancellations([]);
            });
    },[selectedMess1])


    return (
        <div className='p-6 h-screen'>
            <div className='mb-6'>            
                <h1 className='text-4xl underline '>Evaluate Mess Cancellations</h1>
                <select onChange={(e) => setMess2(e.target.value)} className='p-1 pr-6  border-1 border-gray-400 rounded-lg my-3'>
                    <option value="A" disabled>Select Mess</option>
                    <option value="all">All</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snacks">Snacks</option>
                </select><br/>
                <span className='my-2 mr-1'> Date:</span>
                <input type='date' onChange={(e) => setDateIn(e.target.value)}
                    className="text-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={funcEvaluate} className='mt-2 ml-2 px-2 w-fit rounded-lg text-white bg-blue-600'> Evaluate</button>
                <br/>
                <span className='my-4 mr-1'> Total Cancellations: <p className='text-blue-600 inline'>{Evaluatedstring}</p> </span>
            </div>
            
            <div className='grid max-h-[60%] bg-white  overflow-y-auto grid-rows-auto gap-4'>
                <div className='sticky top-0 bg-white'>
                    <h1 className='text-3xl pb-4 underline '>Approved Mess Cancellations</h1>
                    <select onChange={(e) => setMess1(e.target.value)} className='p-1 pr-6  border-1 border-gray-400 rounded-lg my-3'>
                    <option value="A" disabled>Select Mess</option>
                    <option value="all">All</option>
                    <option value="A">Mess A</option>
                    <option value="B">Mess B</option>
                    <option value="C">Mess C</option>
                </select><br/>
                    {activeCancellations.length > 0 ? (
                        <div className="grid grid-cols-4 gap-4 font-semibold text-black">
                            <span>Name</span>
                            <span>From</span>
                            <span>To</span>
                            <span>Of</span>
                        </div>
                    ) : (
                        <div>No active Cancellations</div>
                    )}
                </div>
                    {activeCancellations.length ===0 ? (
                        null
                    ) : (
                        activeCancellations.map((cancellations, index) => (
                            <div key={cancellations._id} className='grid grid-cols-4 gap-4 border-b-2 border-gray-300'>
                                <span className=' text-blue-600'>{index + 1 + ". " + cancellations.createdBy.name}</span>
                                <span className='text-blue-600'>{cancellations.from.split('T')[0]}</span>
                                <span className='text-blue-600'>{cancellations.to.split('T')[0]}</span>
                                <span className='text-blue-600'>{cancellations.mealType}</span>
                            </div>
                        ))
                    )}

            </div>
        </div>
    );
};

export default MessCancellationScreen;