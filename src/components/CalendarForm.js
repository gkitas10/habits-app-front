import { useState } from 'react';
import '../styles/CalendarForm.css';
import getDateDataForState from '../functions/CalendarBox/getDateDataForState';
import getMonthDays from '../functions/CalendarBox/getMonthDays';

const CalendarForm = ({ monthandyear, month, setMonthAndYear, setMonth }) => {
    const [ inputval, setInputval ] = useState('');
    
    const handleChange = monthandyear => {
        //Removing ceros on the left
        // let monthandyearWithOut0 = '';

        // for(let i = 0; i < monthandyear.length; i++ ) {
        //     if(monthandyear[i] == 0) {
        //         monthandyearWithOut0 = monthandyear.slice(0,1);
        //     } else {
        //          console.log(monthandyearWithOut0)
        //         return;
        //     }
        // }
        setInputval(monthandyear);
        //Crear regexp para month 'yyyy-mm' para que no se modifique
        const regexp = /\d{4}-\d{2}/g

        if(regexp.test(monthandyear)) {
            //If it matches
            const firstDayMonthAndYear = new Date(monthandyear.replace(/-/, '\/') + '/1');
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
        
    }
  
    return ( 
    <form className='calendar-form'>
        <div className="form-group">
            <input className='calendar-form__input-month' type='month' name='monthandyear' value={ inputval } onChange={e => handleChange(e.target.value)}/>
        </div>
    </form>
     );
}
 
export default CalendarForm;
