import { useState, useEffect } from 'react';
import CalendarDate  from './CalendarDate';
import '../styles/CalendarBox.css';
import getMonthDays from '../functions/CalendarBox/getMonthDays';
import getDateDataForState from '../functions/CalendarBox/getDateDataForState';
import CalendarForm from './CalendarForm';

const CalendarBox = ({ monthandyear, setMonthAndYear, selecteddaywithlist, setSelectedday }) => {
    const currentDate = new Date();
    const { monthname, year, monthNumber, startDay } = getDateDataForState(currentDate);
    console.log('render box');
    const [ month, setMonth ] = useState({
        startday:startDay,
        month:monthname,
        monthnumber:monthNumber,
        totalmonthdays:getMonthDays(monthNumber, startDay, year),
        year:year
    });

    const [ highlighteddate, setHighlighteddate ] = useState('');
    console.log(highlighteddate)

    // const [ selectedday, setSelectedday ] = useState({
    //     date:'',
    //     tasklist:''
    // });

    useEffect(() => {
        if(monthandyear !== '') {
            const firstDayMonthAndYear = new Date(monthandyear.replace(/-/, '\/'));
            const { monthname, year, monthNumber, startDay } = getDateDataForState(firstDayMonthAndYear);
    
            setMonth({
                ...month,
                startday:startDay,
                monthnumber:monthNumber,
                month:monthname,
                year:year,
                totalmonthdays:getMonthDays(monthNumber, startDay, year)
            })
        }
}, [monthandyear])

    return ( 
    <div className='calendar-box'>
        <div className="calendar-box__info">
            <div className="calendar__monthyear-container">
                <div className="calendar__month">{month.month}</div>
                <div className="calendar__year">{month.year}</div>
            </div>
            <CalendarForm
            monthandyear={monthandyear}
            setMonthAndYear={setMonthAndYear}
            />
        </div>
        <div className="calendar-box__week">
            <div className="calendar-box__day">Lun</div>
            <div className="calendar-box__day">Martes</div>
            <div className="calendar-box__day">Mierc</div>
            <div className="calendar-box__day">Jueves</div>
            <div className="calendar-box__day">Viernes</div>
            <div className="calendar-box__day">Sabado</div>
            <div className="calendar-box__day">doming</div>
        </div>
        <div className='calendar-box__dates'>
            {
                month.totalmonthdays.map((daynumber, idx) => (
                    idx < month.startday ? 
                    <CalendarDate
                        daynumber={daynumber}
                        lastmonth={true}
                    /> :
                    <CalendarDate
                        year={month.year}
                        monthnumber={month.monthnumber}
                        daynumber={daynumber}
                        selecteddaywithlist={selecteddaywithlist}
                        highlighteddate={highlighteddate}
                        setHighlighteddate={setHighlighteddate}
                        setSelectedday={setSelectedday}
                    />
                ))
            }
        </div>
    </div>
     );
}
 
export default CalendarBox;