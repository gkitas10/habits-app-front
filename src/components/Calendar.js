import CalendarBox from "./CalendarBox";
import { useState } from 'react';
import '../styles/Calendar.css';
import CalendarTaskListSelector from "./CalendarTaskListSelector";
import CalendarTaskInfo from "./CalendarTaskInfo";
import useSelectList from "./custom-hooks/useSelectList";
import ColorCode from "./ColorCode";

const Calendar = () => {
    const [ monthandyear, setMonthAndYear ] = useState('');
    const [ tasklists, setTaskLists ] = useState([]);
    const [ updatedayandperformance, setUpdatedayandperformance ] = useState({});
    const [ showcolorcode, setShowcolorcode ] = useState(false);
    
    const [ selecteddaywithlist, setSelectedDayWithList, SelectList ] = useSelectList(tasklists, /*selectedday*/);

    const updateTasklists = res => {
        setTaskLists(res.data.tasklistsDB);
    }

    const refreshCalendarBox = (updatedDayDB, refreshondelete) => { 
        const dayKey = updatedDayDB.date.slice(8,10)[0] == '0' ? updatedDayDB.date.slice(8,10)[1] : updatedDayDB.date.slice(8,10);

        const updateobj = {
            [dayKey]:refreshondelete ? undefined : updatedDayDB.performance
        }

        setUpdatedayandperformance(updateobj)
    }

    const handleClick = () => {
        setShowcolorcode(!showcolorcode);
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
            <div className="calendar__showcode-btn-cont">
                <button className="calendar__showcode-btn" onClick={handleClick}>Mostrar código de colores</button>
            </div>
            
            { showcolorcode && <ColorCode/> }
            
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