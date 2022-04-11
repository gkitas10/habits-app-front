export function getPerformanceStyle (performanceDB, performanceonscreen, daynumber, selecteddaywithlist) {
    let performanceStyle = performanceDB <= 40 ? 'verylow-performance' : performanceDB <= 60 && performanceDB > 40 ? 'low-performance' : performanceDB <= 80 && performanceDB > 60 ? 'reg-performance' : performanceDB <= 90 && performanceDB > 80 ? 'good-performance' : performanceDB > 90 ? 'great-performance' : null;

    if(performanceDB === undefined && performanceStyle === null && typeof performanceonscreen === 'number') {
        if(selecteddaywithlist?.date.slice(8,10) == daynumber) {
            performanceStyle = performanceonscreen <= 40 ? 'verylow-performance' : performanceonscreen <= 60 && performanceonscreen > 40 ? 'low-performance' : performanceonscreen <= 80 && performanceonscreen > 60 ? 'reg-performance' : performanceonscreen <= 90 && performanceonscreen > 80 ? 'good-performance' : performanceonscreen > 90 ? 'great-performance' : null;
        }  
    }

    return performanceStyle;
}




