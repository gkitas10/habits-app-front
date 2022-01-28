const isLeap = year => {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

const getMonthNumberOfDays = (monthnumber, year) => {
    if(monthnumber == 0 || monthnumber == 2 || monthnumber == 4 || monthnumber == 6 || monthnumber == 7 ||
        monthnumber == 9 || monthnumber == 11){
            return 31;
        }else if(monthnumber == 3 || monthnumber == 5 || monthnumber == 8 ||  monthnumber == 10){
            return 30;
        } else {
            return isLeap(year) ? 29 : 28;
        }
}

const getMonthDays = (monthnumber, startday, year) => {

    let monthNumberOfDays = getMonthNumberOfDays(monthnumber, year);
    let totalMonthDates = [];

    for(let i = 1; i<=monthNumberOfDays ; i++) {
        totalMonthDates = [...totalMonthDates, i];
    }
    
    let lastMonthNumber = monthnumber - 1 === -1 ? 11 : monthnumber - 1;
    let lastMonthNumberOfDays = getMonthNumberOfDays(lastMonthNumber, year);
    let lastMonthDates = [];
    

    for(let i = 1; i<=lastMonthNumberOfDays ; i++) {
        lastMonthDates = [...lastMonthDates, i];
    }

    let calendarMonthDates = [];
   
    if(startday !== 0) {
        calendarMonthDates = [...lastMonthDates.slice(`-${startday}`), ...totalMonthDates]
    } else {
        calendarMonthDates = totalMonthDates;
    }

    return calendarMonthDates;
}

export default getMonthDays;