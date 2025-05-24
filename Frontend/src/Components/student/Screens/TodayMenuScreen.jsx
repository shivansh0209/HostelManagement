import React, { useContext, useEffect, useState } from 'react';
import clock from "../../../assets/students/clock.svg"
import axios from 'axios';

const TodayMenuScreen = () => {
    const [menu,setMenu] = useState([])
    const time = ["8:00 AM - 10:00 AM","12:00 PM - 02:00 PM","04:30 PM - 05:30 PM","8:00 PM - 10:00 PM"]
    const user={
        messName:"Mess A",
    }

    const fetchMenu = async () => {
        axios.get('http://localhost:4500/api/mess/menu', {withCredentials: true})
        .then((res) => {
            const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
            const data = res.data.data.menu.filter(item => item.messName === user.messName && item.day === dayName);
            if(data[0]){
                setMenu([data[0].breakfast, data[0].lunch, data[0].snacks, data[0].dinner]);
            }
        })

    };

    useEffect(() => {
        fetchMenu();
    },[])

    return (
        <div className='h-screen p-10'>
            <h1 onClick={()=> console.log(userDetails)} className="text-4xl mb-6 underline">Today's menu</h1>
            {
                menu.length>0?(["Breakfast", "Lunch" , "Snacks" , "Dinner"].map((slot,index)=>(
                    <div className='mb-6' key={slot}>
                        <div className='flex flex-row items-center'>
                            <img src={clock} className='mr-2 w-6 h-6' />
                            <p className='text-2xl'>{slot}</p>
                        </div>
                        <div className='ml-8 '>
                            <p className='text-xs'>{time[index]}</p>
                            <p className='mt-1 text-sm'>{menu[index]}</p>
                        </div>
                    </div>
                ))):(
                    <div>No menu as such</div>
                )
            }            
        </div>
    );
};

export default TodayMenuScreen;