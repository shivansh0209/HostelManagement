import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import deleteSVG from '../../../assets/staff/delete.svg';
import UserContext from '../../../Context/UserContext';

const DashboardScreen = () => {
    const { userDetails } = useContext(UserContext);
    const [pendingComplaints, setPendingComplaints] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [popup, setPopUp] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const user = userDetails.name ? userDetails.name.split(' ')[0] : 'User';
    const hostel = userDetails.hostel;

    const handleAddTask = () => {
        axios
        .post('http://localhost:4500/api/tasks/create', { content: newTask }, { withCredentials: true })
        .then((res) => {
            fetchTasks();
            setNewTask('');
        }).catch((err) => {
            console.log('Error adding task:', err);
        });
    };

    const handleDelete = (id) => {
        axios.get(`http://localhost:4500/api/tasks/delete/${id}`, { withCredentials: true })
        .then((res) => {
            fetchTasks();
        }).catch((err) => {
            console.log('Error deleting task:', err);
        });
    };

    useEffect(() => {
        axios
        .get('http://localhost:4500/api/complaints/all', { withCredentials: true })
        .then((res) => {
            const filteredComplaints = res.data.data.complaints.filter(
            (complaint) => complaint.status === false
            );
            setPendingComplaints(filteredComplaints);
        })
        .catch((err) => console.log('Error fetching complaints:', err));
    }, []);

    useEffect(() => {
        axios
        .get('http://localhost:4500/api/hostelAnnouncements', { withCredentials: true })
        .then((res) => setAnnouncements(res.data.data.hostelAnnouncements))
        .catch((err) => console.log('Error fetching announcements:', err));
    }, []);

    const fetchTasks = async () => {
        axios
        .get('http://localhost:4500/api/tasks/all', { withCredentials: true })
        .then((res) => setTasks(res.data.data.tasks))
        .catch((err) => console.log('Error fetching tasks:', err));
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className='h-screen px-10 py-4'>
        <div className='mb-8'>
            <span className='text-4xl font-bold text-[#9a4b4c]'>Welcome {user}</span>
            <p className='text-xl text-gray-500'>{hostel} Hostel</p>
        </div>

        <div className='grid grid-rows-3 gap-6 h-[70%]'>
            <div className='grid grid-cols-2 gap-8'>
            <div className='border rounded-lg p-4 bg-white shadow-md overflow-y-auto'>
                <h2 onClick={() => setPopUp(true)} className='text-xl font-semibold mb-2 underline cursor-pointer'>
                Task List
                </h2>
                {tasks.length > 0 ? (
                tasks.map((complaint, index) => (
                    <p key={complaint._id} className='mb-1'>{`${index + 1}. ${complaint.content}`}</p>
                ))
                ) : (
                <p className='text-gray-500'>No Tasks</p>
                )}
            </div>

            <div className='border rounded-lg p-4 bg-white shadow-md overflow-y-auto'>
                <h2 className='text-xl font-semibold mb-2'>Pending Complaints</h2>
                {pendingComplaints.length > 0 ? (
                pendingComplaints.map((complaint, index) => (
                    <p key={complaint._id} className='mb-1'>{`${index + 1}. ${complaint.description}`}</p>
                ))
                ) : (
                <p className='text-gray-500'>No Pending Complaints</p>
                )}
            </div>
            </div>

            <div className='border rounded-lg p-4 bg-white shadow-md overflow-y-auto'>
            <div className='flex justify-between mb-2'>
                <h2 className='text-xl font-semibold'>Hostel Noticeboard</h2>
                <Link to='/staff/noticeboard' className='px-4 py-2 bg-blue-600 text-white rounded-lg'>Visit</Link>
            </div>
            {announcements.length > 0 ? (
                announcements.map((announcement, index) => (
                <p key={announcement._id} className='mb-1'>{`${index + 1}. ${announcement.content}`}</p>
                ))
            ) : (
                <p className='text-gray-500'>No Announcements Available</p>
            )}
            </div>

            <div className='border rounded-lg p-4 bg-white shadow-md overflow-y-auto'>
            <h2 className='text-xl font-semibold mb-2'>Announcements</h2>
            {announcements.length > 0 ? (
                announcements.map((announcement, index) => (
                <p key={announcement._id} className='mb-1'>{`${index + 1}. ${announcement.content}`}</p>
                ))
            ) : (
                <p className='text-gray-500'>No Announcements Available</p>
            )}
            </div>
        </div>

        {popup && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-[40%] max-h-[60%] overflow-y-auto p-6 bg-white rounded-lg shadow-lg'>
                <div className='flex justify-between mb-4'>
                <p className='text-xl font-bold'>Edit Tasks</p>
                <button onClick={() => setPopUp(false)} className='px-4 py-2 bg-red-500 text-white rounded-lg'>Close</button>
                </div>
                <div className='flex mb-4'>
                <input
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
                    placeholder='Add Task'
                    className='flex-1 p-2 border rounded-lg mr-4'
                />
                <button onClick={handleAddTask} className='px-4 py-2 bg-green-500 text-white rounded-lg'>Add</button>
                </div>
                {tasks.length > 0 ? (
                tasks.map((complaint, index) => (
                    <div key={complaint._id} className='flex justify-between items-center mb-2'>
                    <p>{`${index + 1}. ${complaint.content}`}</p>
                    <img onClick={() => handleDelete(complaint._id)} src={deleteSVG} className='w-6 h-6 cursor-pointer' alt='Delete' />
                    </div>
                ))
                ) : (
                <p className='text-gray-500'>No Tasks</p>
                )}
            </div>
            </div>
        )}
        </div>
    );
};

export default DashboardScreen;
