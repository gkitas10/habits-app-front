const CalendarForm = ({monthandyear, setMonthAndYear}) => {
    return ( 
    <form>
        <div className="form-group">
            <label className="form-group__label">Mes y año</label>
            <input type='month' name='monthandyear' value={monthandyear} onChange={e => setMonthAndYear(e.target.value)}/>
        </div>
    </form>
     );
}
 
export default CalendarForm;
