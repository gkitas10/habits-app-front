import { useState, useEffect } from 'react';
import CalendarDate  from './CalendarDate';
import '../styles/CalendarBox.css';
import getMonthDays from '../functions/CalendarBox/getMonthDays';
import getDateDataForState from '../functions/CalendarBox/getDateDataForState';
import CalendarForm from './CalendarForm';
import CalendarBoxDays from './CalendarBoxDays';
import CalendarBoxDaysMobile from './CalendarBoxDaysMobile';
import CalendarBoxDaysTablet from './CalendarBoxDaysTablet';
import axiosClient from '../axios';
import { useAuth0 } from '@auth0/auth0-react';
import buildPerformanceObj from '../functions/CalendarBox/buildPerformanceObj'
import { useMediaQuery } from 'react-responsive';

const CalendarBox = ({ monthandyear, setMonthAndYear, selecteddaywithlist, setSelectedday, updatedayandperformance }) => {
    const currentDate = new Date();
    const { monthname, year, monthNumber, startDay } = getDateDataForState(currentDate);
    //Create initial value for CalendarForm
    const [ month, setMonth ] = useState({
        startday:startDay,
        month:monthname,
        monthnumber:monthNumber,
        totalmonthdays:getMonthDays(monthNumber, startDay, year),
        year:year
    });
    
    const [ dayandperformance, setDayandperformance ] = useState({});
    console.log(dayandperformance);
    
    const [ highlighteddate, setHighlighteddate ] = useState('');
    
    // const [ selectedday, setSelectedday ] = useState({
    //     date:'',
    //     tasklist:''
    // });
    const { getAccessTokenSilently } = useAuth0();
    //Media queries
    const isMobile = useMediaQuery({
    query: '(max-width: 600px)'
    })

    const isTablet = useMediaQuery({
        query: '(max-width: 768px)'
    })

    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    })

//     useEffect(() => {
//         console.log('exec1');
//         if(monthandyear !== '') {
//             const firstDayMonthAndYear = new Date(monthandyear.replace(/-/, '\/'));
//             const { monthname, year, monthNumber, startDay } = getDateDataForState(firstDayMonthAndYear);
    
//             setMonth({
//                 ...month,
//                 startday:startDay,
//                 monthnumber:monthNumber,
//                 month:monthname,
//                 year:year,
//                 totalmonthdays:getMonthDays(monthNumber, startDay, year)
//             })
//         }
// }, [monthandyear])

    useEffect(() => {
        const getDays = async () => {
            //Transform date
            const monthNumPlus1 = month.monthnumber + 1;
            let monthNum2Dig = '';
            if(monthNumPlus1.toString().length === 1) {
                monthNum2Dig = '0' + monthNumPlus1
             }

            const currMonthAndYear = year.toString() + '-' +  monthNum2Dig;

        try {
            const token = await getAccessTokenSilently();  
            //When component mount monthandyear is '' so in that case the request is made w currMonthAndYear
            const monthAndYearQuery = monthandyear === '' ? currMonthAndYear : monthandyear;
            const response = await axiosClient.get(`/get-days?currmonthandyear=${ monthAndYearQuery }`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
              }) 
            
            setDayandperformance(buildPerformanceObj(month, response.data.daysDB));
            
            
          } catch (error) {
              console.log(error);
          }
        }

        getDays();
        
    }, [month])  

    useEffect(() => {
        console.log(updatedayandperformance)
           setDayandperformance({
               ...dayandperformance,
               ...updatedayandperformance
           })
    },[updatedayandperformance]);
      
    return ( 
    <div className='calendar-box'>
        <div className="calendar-box__info">
            <CalendarForm
            monthandyear={monthandyear}
            month={month}
            setMonthAndYear={setMonthAndYear}
            setMonth={setMonth}
            />
            <div className="calendar__monthyear-container">
                <div className="calendar__month">{month.month}</div>
                <div className="calendar__year">{month.year}</div>
            </div>
        </div>
        <div className="calendar-box__week">
           { isMobile ? <CalendarBoxDaysMobile/> : isTablet ? <CalendarBoxDaysTablet/> : isDesktop ? <CalendarBoxDays/> : <CalendarBoxDays/> }
        </div>
        <div className='calendar-box__dates'>
            {
                month.totalmonthdays.map((daynumber, idx) => (
                    idx < month.startday ? 
                    <CalendarDate
                        year={month.year}
                        monthnumber={month.monthnumber}
                        daynumber={daynumber}
                        lastmonth={true}
                    /> :
                    <CalendarDate
                        year={month.year}
                        monthnumber={month.monthnumber}
                        daynumber={daynumber}
                        selecteddaywithlist={selecteddaywithlist}
                        highlighteddate={highlighteddate}
                        performanceDB={ dayandperformance[daynumber] }
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