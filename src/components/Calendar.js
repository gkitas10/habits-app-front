import CalendarBox from "./CalendarBox";
import { useState, useEffect } from 'react';
import '../styles/Calendar.css';
import CalendarTaskListSelector from "./CalendarTaskListSelector";
import CalendarTaskForm from "./CalendarTaskForm";
import CalendarTaskInfo from "./CalendarTaskInfo";
import useSelectList from "./custom-hooks/useSelectList";
import Stats from "./Stats";

const Calendar = () => {
    const [ monthandyear, setMonthAndYear ] = useState('');
    const [ tasklists, setTaskLists ] = useState([]);
    const [ updatedayandperformance, setUpdatedayandperformance ] = useState({});
    console.log(updatedayandperformance);
    //Probando custom hook
    // const [ selectedday, setSelectedday ] = useState({
    //     date:'',
    //     tasklist:''
    // });
    
    const [ selecteddaywithlist, setSelectedDayWithList, SelectList ] = useSelectList(tasklists, /*selectedday*/);

    const updateTasklists = res => {
        setTaskLists(res.data.tasklistsDB);
    }

    const refreshCalendarBox = (updatedDayDB, refreshondelete) => { 
        console.log(updatedDayDB);
        const dayKey = updatedDayDB.date.slice(8,10)[0] == '0' ? updatedDayDB.date.slice(8,10)[1] : updatedDayDB.date.slice(8,10);

        const updateobj = {
            [dayKey]:refreshondelete ? undefined : updatedDayDB.performance
        }

        setUpdatedayandperformance(updateobj)
        // {
        //     [dayKey]:updatedDayDB.performance
        // }
    }
    
    return (  
        <div className="calendar">
            <div className='calendar__calendar-box-view'>
                <CalendarBox
                monthandyear={monthandyear}
                setMonthAndYear={setMonthAndYear}
                selecteddaywithlist={selecteddaywithlist}
                setSelectedday={setSelectedDayWithList}
                updatedayandperformance={updatedayandperformance}
                />
            </div>
            { 
                selecteddaywithlist.date !== '' && (<div className='calendar__calendar-date-view'>
                <CalendarTaskListSelector
                 SelectList={SelectList}
                 updateTasklists={updateTasklists}
                />
                <div className="calendar__form-info-container">
                    { selecteddaywithlist.tasklist?._id ? (
                        <CalendarTaskInfo
                        selecteddaywithlist={selecteddaywithlist}
                        refreshCalendarBox={refreshCalendarBox}
                        />
                    ): null }
                </div>
            </div>)
           }
            
        </div>
    );
}
 
export default Calendar;