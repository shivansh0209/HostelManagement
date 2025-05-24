import React, { useCallback, useEffect,useState } from 'react';
import filter from '../../../assets/staff/filter.svg';
import axios from 'axios';

const ComplaintListScreen = () => {

    const [complaints, setComplaints] = React.useState([]);
    const [type, setType] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [title, setTitle] = React.useState({});
    const [filterPopUp,setFilterPopUp]= useState(false)

    const handleChange = (e) => {
        setType(e.target.value);
    };

    const applyFilter = useCallback(() => {
        setLoading(true);
        axios.get('http://localhost:4500/api/complaints/all' , {withCredentials:true})
            .then(res => {
                let list = res.data.data.complaints.filter(complaint => complaint.status === false);
                list = list.filter(complaint => complaint.type === type || type === 'all');
                setComplaints(list);
                setLoading(false);
                setFilterPopUp(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    },[type])

    const markResolved = (id) => {
        axios.get(`http://localhost:4500/api/complaints/markresolved/${id}`, {withCredentials:true})
        .then(res => {
            loadcomplaints();
        })
        .catch(err => {
            console.log(err);
        });
    }

    const loadcomplaints = useCallback(() => {
        setLoading(true);
        axios.get('http://localhost:4500/api/complaints/all' , {withCredentials:true})
            .then(res => {
                let list=res.data.data.complaints.filter(complaint => complaint.status===false);
                setComplaints(list);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            }
        );
    },[type])

    useEffect(() => {
        loadcomplaints();
    }, []);

    return (
        <>
        <div className={`p-10 ${title.title || filterPopUp ? "opacity-20 pointer-events-none" : "opacity-100"} h-screen`}>
            <div className='flex justify-between mb-8'>
                <span className='text-4xl font-semibold underline'>List of Complaints</span>
                <img className='w-8 h-8 cursor-pointer' onClick={()=>setFilterPopUp(true)} src={filter} />
            </div>
            <div className="grid grid-cols-6 items-center mb-4">
                <span className="font-semibold text-lg">Title</span>
                <span className="font-semibold text-lg">Name</span>
                <span className="font-semibold text-lg">Type</span>
                <span className="font-semibold text-lg">Room Number</span>
                <span className="font-semibold text-lg">Block</span>
                <span className="font-semibold text-lg">Action</span>
            </div>
            <div className='overflow-y-auto max-h-[70%]'>
            {loading === false ? (
                complaints.map((complaint, index) => (
                    <div key={complaint.id} className="grid grid-cols-6 gap-4 border-b-2 border-gray-300  p-1 my-2 bg-white text-black rounded-lg items-center">
                        <span className="hover:underline cursor-pointer" onClick={() => setTitle(complaint)}>
                            {(index + 1) + ".  " + complaint.title}
                        </span>
                        <span>{complaint.createdBy.name}</span>
                        <span>{complaint.type}</span>
                        <span>{complaint.createdBy.roomNumber}</span>
                        <span>{complaint.createdBy.block}</span>
                        <button onClick={() => markResolved(complaint._id)} className="bg-blue-600  h-fit rounded-lg text-white py-1 px-2">
                            Mark as Resolved
                        </button>
                    </div>
            ))
            ) : (
                <div>Loading...</div>
            )}
            </div>
        </div>
        {title.title ? (
            <div className='fixed inset-10 flex items-center justify-center z-50'>
                <div className='w-[40%] p-4 border-2 bg-white rounded-lg shadow-lg'>
                    <h1 className='text-xl mb-3 underline font-semibold'>{title.title}</h1>
                    <p className='mb-4'>{title.description}</p>
                    <button onClick={()=> setTitle({})} className='bg-blue-500 rounded-lg text-white py-1 px-2'>Back to the List</button>
                </div>
            </div>
        ):<div></div>}
            {filterPopUp ? (
            <div className='fixed inset-0 flex items-center  justify-center z-50'>
                <div className='w-[40%] p-4 border-2 bg-white rounded-lg shadow-lg'>
                    <h1 className='text-xl mb-3 underline font-semibold'>Select Filter</h1>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dropdown">
                        Select a Type
                    </label>
                    <select
                        value={type}
                        onChange={handleChange}
                        id="dropdown"
                        className="mb-3 block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="" disabled>Select</option>
                        <option value='Electrical'>Electrical</option>
                        <option value='Maintenance'>Maintenance</option>
                        <option value='Mechanical'>Food</option>
                        <option value='Plumbing'>Plumbing</option>
                        <option value='Cleaning'>Cleaning</option>
                        <option value='Cleaning'>Internet</option>
                        <option value='Cleaning'>Security</option>
                        <option value='Cleaning'>Others</option>
                    </select>
                    <button onClick={applyFilter} className='bg-blue-500 rounded-lg text-white py-1 px-2'>Apply</button>
                </div>
            </div>
        ):<div></div>}
        </>
    );
};

export default ComplaintListScreen;