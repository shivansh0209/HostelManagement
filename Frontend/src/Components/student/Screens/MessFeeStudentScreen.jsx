import axios from 'axios';
import React, { use, useEffect, useState } from 'react';




const MessFeeStudentScreen = () => {

    const [fee_amount,setFee] = useState("")
    const [status,setStatus] = useState("")
    const [recieptsAndbRochure,setreciepts] = useState([])
    

    
    useEffect(() => {
        //function to fetch reciepts and Brochure Links
        setreciepts(["w12","21w21","qdw","w12","21w21","21w1"])
        setStatus("Paid")
        setFee("15000")
    },[])


    return (
        <div className='h-screen p-10'>
            <h1 className="text-4xl mb-8 underline">Current Semester</h1>
            <span className=' mr-2 mb-4'>Mess Fee for this sem: </span>
            <span className='text-[#984143]'>{fee_amount} Rs</span>
            <br/>
            <span className=' mr-2 mb-4'>Status: </span>
            <span className='text-[#984143]'>{status}</span>
            <br/>
            <span className=' mr-2 mb-4'>Payment Link</span>
            <a href='https://octopod.co.in/iitbhu/semester-fees' className='text-blue-600'>{"https://octopod.co.in/iitbhu/semester-fees"}</a>
            <br/>
            <span className=' mr-2 mb-2 text-sm italic text-gray-500'>To download the Mess fee brochure </span>
            <span className='text-blue-600 text-sm italic'>'Click Here'</span>
            <br/>
            <div className='grid max-h-[50%] bg-white  mt-10 overflow-y-auto grid-rows-auto gap-4 max-w-[50%]'>
                <div className='sticky top-0 bg-white'>
                    <h1 className='text-3xl pb-4 underline mb-4'> Semester Reciepts</h1>
                    {recieptsAndbRochure.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4 font-semibold text-black">
                            <span>Semester</span>
                            <span>Payment Reciept</span>
                            <span>Brochure</span>
                        </div>
                    ) : (
                        <div>No previous reciepts or Brochures</div>
                    )}
                </div>
                {recieptsAndbRochure.length <= 0 ? (
                    null
                ) : (
                    recieptsAndbRochure.map((links, index) => (
                        <div key={links.id} className='grid grid-cols-3 gap-4 border-b-2 border-gray-300'>
                            <span className=''>{index + 1}</span>
                            <span className='text-[#984143]'>Download</span>
                            <span className='text-[#984143]'>Download</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MessFeeStudentScreen;
