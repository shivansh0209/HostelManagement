import React from 'react';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import deleteSVG from "../../../assets/staff/delete.svg"


const LostAndFoundScreen = () => {
    const [addingItems,setaddingtas]=useState(false);
    const [newItems,setNewItems] = useState(""); 
    const [pendingComplaints, setPendingComplaints] = useState([]);
    
    const handleAddItems = () => {
        axios.post('http://localhost:4500/api/lostandfound', { content: newItems }, { withCredentials: true })
        .then(res => {
            fetchLostAndFounds();
        }).catch(err => {
            console.log(err);
        });
        setNewItems('')
        setaddingtas((prev) => !prev);
    }

    const fetchLostAndFounds = async () => {
        axios.get('http://localhost:4500/api/lostandfound', { withCredentials: true })
        .then(res => {
            setPendingComplaints(res.data.data.lostAndFounds);
        }).catch(err => {
            setPendingComplaints([]);
            console.log(err);
        });
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4500/api/lostandfound/${id}`, { withCredentials: true })
        .then(res => {
            fetchLostAndFounds();
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchLostAndFounds()
    }, []);

    return (
        <div>
            <div className='h-screen w-[60%] text-lg pl-10 pt-6 bg-white rounded-lg shadow-lg'>
                <div className='flex pt-2 mb-10 justify-between items-center sticky top-0 bg-white'>
                    <p  className="underline text-4xl ">
                    Edit Items
                    </p>
                    <button onClick={()=> setaddingtas((prev) => !prev)} className='px-2 h-fit text-xl rounded-lg text-white bg-blue-600'>Edit</button>
                </div>
                <div className={`flex items-center pt-2 mb-2 ${!addingItems?"hidden":""} justify-between`}>
                    <input onChange={(e)=>setNewItems(e.target.value)} value={newItems} placeholder='Add Items' className='p-2 text-sm text-black border-1 rounded-lg w-[85%]'/>
                    <button onClick={handleAddItems} className='px-2 h-fit rounded-lg text-white bg-amber-800 '>Add</button>
                </div>
                {pendingComplaints.length > 0 ? (
                pendingComplaints.map((complaint,index) => (
                    <div key={complaint._id} className='flex justify-between'>
                        <p  className="mb-1">
                        {`${index+1}. ${complaint.content}`}
                        </p>
                        <img onClick={() => handleDelete(complaint._id)} src={deleteSVG} className='w-6 h-6'/>
                    </div>
                ))
                ) : (
                <p>No Items</p>
                )}
            </div>
        </div>
    );
};

export default LostAndFoundScreen;