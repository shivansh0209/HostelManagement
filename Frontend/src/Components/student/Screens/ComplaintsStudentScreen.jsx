import React , {useEffect, useState} from 'react';
import axios from 'axios';

const ComplaintsStudentScreen = () => {
    const [complaintType, setComplaintType] = useState('123');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [complaints, setComplaint] = useState([]);


    const fetchComplaints = () => {
        axios.get('http://localhost:4500/api/complaints/all', {withCredentials:true})
        .then((res) => {
            setComplaint(res.data.data.complaints);
        }).catch((err) => {
            setComplaint([]);
            console.log(err);
        });
    }

    useEffect(()=>{
        fetchComplaints();
    },[])


    const handleSubmit = () => {
        axios.post('http://localhost:4500/api/complaints/create', { type:complaintType, title:subject, description },{withCredentials:true})
        .then((res) => {
            fetchComplaints();
        }).catch((err) => {
            console.log(err);
        });
        setComplaintType('123');
        setSubject('');
        setDescription('');
    };

    const handlePhotoUpload = (e) => {
        setPhoto(e.target.files[0]);
        console.log(e.target.files[0])
    };

    return (
        <div className='p-10 h-screen flex flex-col w-[60%]  bg-gray-100'>
            <h1 className='text-4xl underline mb-6'>Raise A Complaint</h1>
            
            <select
                className='border-2 w-full max-w-md p-2 mb-4 rounded-lg'
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
            >
                <option value="123" disabled>Select</option>
                <option value='Electrical'>Electrical</option>
                <option value='Maintenance'>Maintenance</option>
                <option value='Mechanical'>Food</option>
                <option value='Plumbing'>Plumbing</option>
                <option value='Cleaning'>Cleaning</option>
                <option value='Internet'>Internet</option>
                <option value='Security'>Security</option>
                <option value='Others'>Others</option>
            </select>

            <input
                type='text'
                placeholder='Subject'
                className='border-2 w-full max-w-md p-2 mb-4 rounded-lg'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />

            <input
                type='text'
                placeholder='Description'
                className='border-2 w-full max-w-md p-2 mb-4 rounded-lg'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className='flex space-x-4'>
                <button onClick={handleSubmit} className='px-4 py-1 bg-[#984120] text-white rounded-lg'>Submit</button>
                <label className='px-4 py-1 bg-gray-300 text-black rounded-lg cursor-pointer'>
                Upload a Photo
                <input type='file' accept='image/*' onChange={handlePhotoUpload} className='hidden' />
                </label>
            </div>

            {photo && <p className='mt-4 text-green-600'>Photo Uploaded: {photo.name}</p>}


            <div className="max-h-[30%] bg-white overflow-y-auto mt-6">
                <h1 className="text-4xl bg-white mb-2 sticky top-0 underline">Track Your complaints</h1>
                {
                    complaints.length>0 ? (
                        complaints.map((complaint,index)=> (
                            <div className='mb-4' key={complaint._id}>
                                <span className=''>{`${index+1}. ${complaint.title}`}</span><br/>
                                <p className='text-xs text-[#984120] ml-4 -mt-1'>{complaint.status?"Resolved":"Pending"}</p>
                            </div>
                        ))
                    ):(
                        <div>No Previous Complaints</div>
                    )
                }
            </div>
            
        </div>
    );

};


export default ComplaintsStudentScreen;