const getDateDataForState = date => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','Octuber','November', 'December'];
    const monthNumber = date.getMonth();
    const monthname = months[`${monthNumber}`];
    const year = date.getFullYear(); 
    const startDayDate = new Date(year, monthNumber, 1);
    const startDay = startDayDate.getDay() -1 === -1 ? 6 : startDayDate.getDay() - 1;
    
    return {
        monthname,
        year,
        monthNumber,
        startDay
    }
}
 
export default getDateDataForState;