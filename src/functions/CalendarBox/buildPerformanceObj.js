const buildPerformanceObj = (month, monthdaysdb) => {
    
    //CREATE PERFORMANCE OBJ
    let performance = {}
    let month4search = (month.monthnumber + 1).toString().length === 1 ? '0' + (month.monthnumber + 1).toString() : (month.monthnumber + 1).toString();
    for (let i = 0 ; i < month.totalmonthdays.length ; i++) {
        const monthday4search = month.totalmonthdays[i].toString().length === 1 ? '0' + month.totalmonthdays[i].toString() : month.totalmonthdays[i].toString();
        const date4search = month.year.toString() + '-' + month4search + '-' + monthday4search;
        
        const dayperformance = monthdaysdb.find(day => {
            const reg = new RegExp('^' + date4search)
            return  reg.test(day.date)
        })?.performance

        performance[month.totalmonthdays[i]] = dayperformance;
    }

    return performance;
}

export default buildPerformanceObj;