const getDateDataForState = date => {
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'August', 'september','octuber','november', 'december'];
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