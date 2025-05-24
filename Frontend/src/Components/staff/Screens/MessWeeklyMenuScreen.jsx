import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const MessWeeklyMenuScreen = () => {
    const [mess, setMess] = useState('');
    const [day, setDay] = useState('');
    const [menu, setMenu] = useState({ breakfast: '', lunch: '', dinner: '', snacks: '' });

    useEffect(() => {
        fetchMenu();
    }, [mess,day]);

    const fetchMenu = useCallback(() => {
        axios.get('http://localhost:4500/api/mess/menu' , { withCredentials: true })
            .then(res => {
                const data = res.data.data.menu.filter(item => item.messName === mess && item.day === day);
                if (data[0]) {
                    setMenu({
                        breakfast: data[0].breakfast || '',
                        lunch: data[0].lunch || '',
                        dinner: data[0].dinner || '',
                        snacks: data[0].snacks || '',
                    });
                } else {
                    setMenu({ breakfast: '', lunch: '', dinner: '', snacks: '' });
                }
            })
            .catch(err => console.error('Error fetching menu:', err));
    },[mess,menu,day])

    const handleSave = () => {
        axios.post('http://localhost:4500/api/mess/savemenu', { messName:mess, day, ...menu }, { withCredentials: true })
        .then(res => {
            fetchMenu();
        }).catch(err => console.error('Error saving menu:', err));
    }

    return (
        <div className='p-10'>
            <h1 className='text-4xl mb-6 underline'>Mess Weekly Menu</h1>
            <div className='flex mb-6'>
                <select value={mess} onChange={(e) => setMess(e.target.value)} className='p-1 pr-6 border-1 border-gray-400 rounded-lg'>
                    <option value='' disabled>Select</option>
                    <option value='Mess A'>Mess A</option>
                    <option value='Mess B'>Mess B</option>
                    <option value='Mess C'>Mess C</option>
                </select>
                <select value={day} onChange={(e) => setDay(e.target.value)} className='p-1 ml-3 pr-6 border-1 border-gray-400 rounded-lg'>
                    <option value='' disabled>Select</option>
                    <option value='Monday'>Monday</option>
                    <option value='Tuesday'>Tuesday</option>
                    <option value='Wednesday'>Wednesday</option>
                    <option value='Thursday'>Thursday</option>
                    <option value='Friday'>Friday</option>
                    <option value='Saturday'>Saturday</option>
                    <option value='Sunday'>Sunday</option>
                </select>
            </div>
            <div className='grid grid-cols-1 gap-4 w-[60%]'>
                {['breakfast', 'lunch', 'dinner', 'snacks'].map((meal) => (
                    <div key={meal}>
                        <label className='block  text-[#984120]'>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</label>
                        <input
                            type='text'
                            value={menu[meal]}
                            onChange={(e) => setMenu({ ...menu, [meal]: e.target.value })}
                            className='p-2 w-full border-2 border-gray-300 rounded-lg'
                        />
                    </div>
                ))}
            </div>
            <button onClick={handleSave} className='mt-6 px-4 py-2 bg-[#984120] text-white rounded-lg'>Save Menu</button>
        </div>
    );
};

export default MessWeeklyMenuScreen;
