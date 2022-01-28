import CalendarBox from "./CalendarBox";
import { useState, useEffect } from 'react';
import '../styles/Calendar.css';
import CalendarTaskListSelector from "./CalendarTaskListSelector";
import CalendarTaskForm from "./CalendarTaskForm";
import CalendarTaskInfo from "./CalendarTaskInfo";
import useSelectList from "./custom-hooks/useSelectList";
import Stats from "./Stats";

const Calendar = () => {
    const [monthandyear, setMonthAndYear] = useState('');
    const [ tasklists, setTaskLists ] = useState([]);
    
    //Probando custom hook
    // const [ selectedday, setSelectedday ] = useState({
    //     date:'',
    //     tasklist:''
    // });
    
    const [ selecteddaywithlist, setSelectedDayWithList, SelectList ] = useSelectList(tasklists, /*selectedday*/);
    
    const updateTasklists = res => {
        setTaskLists(res.data.tasklistsDB);
    }
    
    return (  
        <div className="calendar">
            <div className='calendar__calendar-box-view'>
                <CalendarBox
                monthandyear={monthandyear}
                setMonthAndYear={setMonthAndYear}
                selecteddaywithlist={selecteddaywithlist}
                setSelectedday={setSelectedDayWithList}
                />
            </div>
            { 
                selecteddaywithlist.date !== '' && (<div className='calendar__calendar-date-view'>
                <CalendarTaskListSelector
                 SelectList={SelectList}
                 updateTasklists={updateTasklists}
                />
                <div className="calendar__form-info-container">
                     <CalendarTaskInfo
                     selecteddaywithlist={selecteddaywithlist}
                     />
                     {/* <CalendarTaskForm/> */}
                </div>
            </div>)
           }
            
        </div>
    );
}
 
export default Calendar;