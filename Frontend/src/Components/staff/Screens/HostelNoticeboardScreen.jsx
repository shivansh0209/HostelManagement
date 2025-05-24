import React from 'react';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import deleteSVG from "../../../assets/staff/delete.svg"


const HostelNoticeboardScreen = () => {
    const [addingNoticeboard,setaddingtas]=useState(false);
    const [newNoticeboard,setNewNoticeboard] = useState(""); 
    const [hostelAnnouncements, sethostelAnnouncements] = useState([]);
    
    const handleAddNoticeboard = () => {
        axios.post('http://localhost:4500/api/hostelannouncements', { content: newNoticeboard }, { withCredentials: true })
        .then(res => {
            fetchHostelAnnouncements();
        }).catch(err => {
            console.log(err);
        });
        setNewNoticeboard('')
        setaddingtas((prev) => !prev);
    }

    const fetchHostelAnnouncements = async () => {
        axios.get('http://localhost:4500/api/hostelannouncements', { withCredentials: true })
        .then(res => {
            sethostelAnnouncements(res.data.data.hostelAnnouncements);
        }).catch(err => {
            sethostelAnnouncements([]);
            console.log(err);
        });
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4500/api/hostelannouncements/${id}`, { withCredentials: true })
        .then(res => {
            fetchHostelAnnouncements();
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchHostelAnnouncements();}, []);

    return (
        <div>
            <div className='h-screen w-[60%] text-lg pl-10 pt-6 bg-white rounded-lg shadow-lg'>
                <div className='flex pt-2 mb-10 justify-between sticky top-0 bg-white items-center'>
                    <p  className="underline text-4xl  ">
                    Edit Noticeboard
                    </p>
                    <button onClick={()=> setaddingtas((prev) => !prev)} className='px-2 h-fit rounded-lg text-white text-xl bg-blue-600'>Edit</button>
                </div>
                <div className={`flex items-center pt-2 mb-2 ${!addingNoticeboard?"hidden":""} justify-between`}>
                    <input onChange={(e)=>setNewNoticeboard(e.target.value)} value={newNoticeboard} placeholder='Add Noticeboard' className='p-1 text-black border-1 rounded-lg w-[85%]'/>
                    <button onClick={handleAddNoticeboard} className='px-2 h-fit rounded-lg text-white bg-amber-800'>Add</button>
                </div>
                {hostelAnnouncements.length > 0 ? (
                hostelAnnouncements.map((complaint,index) => (
                    <div key={complaint._id} className='flex justify-between'>
                        <p  className="mb-1">
                        {`${index+1}. ${complaint.content}`}
                        </p>
                        <img onClick={() => handleDelete(complaint._id)} src={deleteSVG} className='w-6 h-6'/>
                    </div>
                ))
                ) : (
                <p>No Annoucements</p>
                )}
            </div>
        </div>
    );
};

export default HostelNoticeboardScreen;