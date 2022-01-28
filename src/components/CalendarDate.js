import { useState, useEffect } from 'react';
import '../styles/CalendarDate.css';
import axiosClient from '../axios';
import { useAuth0 } from '@auth0/auth0-react';
import useSelectList from './custom-hooks/useSelectList';

const CalendarDate = ({ year, monthnumber, daynumber, lastmonth, highlighteddate, setHighlighteddate, setSelectedday }) => {
    const { getAccessTokenSilently, user } = useAuth0()
    console.log('render date');
    const currentDate = new Date();
    const currentDayNumber = currentDate.getDate()
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    //Current Date with time 00000
    const currentDateNoTime = new Date(currentYear, currentMonth, currentDayNumber).toString();
    const componentDate = new Date(year, monthnumber, daynumber).toString();
    const monthStyle = lastmonth ? 'lastmonth' : 'currentmonth'; 
    const todayStyle =  componentDate === currentDateNoTime ? 'today' : '';
    let selectedDateStyle = highlighteddate === componentDate ? 'selected-date' : null;
    // const [ selecteddatestyle, setSelecteddatestyle ] = useState('');

    useEffect(() => {
        console.log('mount');
        return () => {
             
            console.log('unmount');
        }
          
    },[]);

    const handleClick = async () => {
        if(!lastmonth) {    
             try {
                const token = await getAccessTokenSilently();
                const dayDB = await axiosClient.get(`/get-day?date=${componentDate}`, {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });

                let savedDayDB = '';
                let selectedDay = '';

                if(dayDB.data.dayDB === null) {
                    savedDayDB = await axiosClient.post('/save-day', {
                        date:componentDate
                    }, {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    
                    selectedDay = savedDayDB.data;
                    console.log(selectedDay,'post');
                }else {
                    selectedDay = dayDB.data.dayDB;
                    console.log(selectedDay,'2');
                }

                
                setHighlighteddate(componentDate);
                //Usar selected day del custom hook (setSelectedDayWithList)
                setSelectedday({
                    ...selectedDay
                })
    
              } catch (error) {
                console.log(error)
              } 
            } 
        }

    return ( 
        <div
        onClick={ handleClick }
        className={`calendar-date ${monthStyle} ${todayStyle} ${selectedDateStyle}`}>
            { daynumber }
        </div>
     );
}
 
export default CalendarDate;