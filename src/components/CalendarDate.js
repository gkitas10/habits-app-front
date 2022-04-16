import { useState, useEffect } from 'react';
import { getPerformanceStyle } from '../functions/CalendarDate/getPerformanceStyle';
import '../styles/CalendarDate.css';
import axiosClient from '../axios';
import { useAuth0 } from '@auth0/auth0-react';

const CalendarDate = ({ year, monthnumber, daynumber, lastmonth, highlighteddate, performanceDB, setHighlighteddate, setSelectedday, performanceonscreen, selecteddaywithlist }) => {
    const { getAccessTokenSilently } = useAuth0()

    const currentDate = new Date();
    const currentDayNumber = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    //Current Date with time 00000
    const currentDateNoTime = new Date(currentYear, currentMonth, currentDayNumber).toISOString();
    const componentDate = new Date(year, monthnumber, daynumber);
    //Check if it's a valid date obj
    const componentDateString = componentDate instanceof Date && !isNaN(componentDate.getTime()) ? componentDate.toISOString() : componentDate.toString();    
    const monthStyle = lastmonth ? 'lastmonth' : 'currentmonth'; 
    const todayStyle =  componentDateString === currentDateNoTime && !lastmonth ? 'today' : '';
    let selectedDateStyle = highlighteddate === componentDateString ? 'selected-date' : null;
    //Class based on performance
    const performanceStyle = getPerformanceStyle(performanceDB, performanceonscreen, daynumber, selecteddaywithlist);
    const [ performancestyle, setPerformancestyle ] = useState(performanceStyle);
    
    const handleClick = async () => {
        if(!lastmonth) {    
             try {
                const token = await getAccessTokenSilently();
                const dayDB = await axiosClient.get(`/get-day?date=${componentDateString}`, {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });

                let savedDayDB = '';
                let selectedDay = '';

                if(dayDB.data.dayDB === null) {
                    savedDayDB = await axiosClient.post('/save-day', {
                        date:componentDateString
                    }, {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    
                    selectedDay = savedDayDB.data;
                }else {
                    selectedDay = dayDB.data.dayDB;
                }

                setHighlighteddate(componentDateString);
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
        className={`calendar-date ${monthStyle} ${todayStyle} ${selectedDateStyle} ${performanceStyle} ${performancestyle}`}>
            <div className='calendar-date__daynumber'>
                { daynumber }
            </div>
            
        </div>
     );
}
 
export default CalendarDate;