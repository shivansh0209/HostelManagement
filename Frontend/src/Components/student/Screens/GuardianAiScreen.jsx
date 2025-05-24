import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Loading from '../../../assets/students/Loading.gif'

const GuardianAiScreen = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);


    const fetchAIResponse = async () => {
        setLoading(true)
        axios.post('https://f686-35-236-184-184.ngrok-free.app/guadian-ai' , {query},{
            headers: {
                "Content-Type": "application/json"
            }
        } )
        .then((res)=>{
            setLoading(false);
            setResponse(res.data.response)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    return (
        <div className='p-10 h-screen'>
            <h1 className='text-4xl font-bold mb-6 underline'>Your GuardianAI</h1>
            <div className='bg-blue-300 h-[50%] shadow-lg overflow-y-auto rounded-lg p-4'>
                <h2 className='text-lg font-semibold'>Ask your queries</h2>
                <div className="flex">
                    <input
                        type='text'
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        className='w-full h-fit bg-white p-2 border-2 rounded-lg'
                        placeholder='Type your question here...'
                    />
                    <button onClick={fetchAIResponse} className='bg-blue-500 text-white p-2 rounded-lg ml-2'>Submit</button>
                </div>

                <h2 className='text-lg font-semibold mt-4'>Your GuardianAI's Response</h2>

                {loading ? (
                    <div className='w-full h-40 flex justify-center items-center'>
                        <img src={Loading} alt="Loading..." className='h-16' />
                    </div>
                ) : (
                    <div className={`w-full ${response ? "" : "hidden"} bg-white p-2 border-2 rounded-lg whitespace-pre-wrap break-words`}>
                        {response}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuardianAiScreen;