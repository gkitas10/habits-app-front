const CalendarBoxDaysMobile = () => {
    return ( 
        <>
            <div className="calendar-box__day">L</div>
            <div className="calendar-box__day">M</div>
            <div className="calendar-box__day">Mi</div>
            <div className="calendar-box__day">J</div>
            <div className="calendar-box__day">V</div>
            <div className="calendar-box__day">S</div>
            <div className="calendar-box__day">D</div>
        </>
     );
}
 
export default CalendarBoxDaysMobile;

// { isMobile ? <CalendarBoxDaysMobile/> : isTablet ? <CalendarBoxDaysTablet/> : isDesktop ? <CalendarBoxDays/> : <CalendarBoxDays/> }
// const isMobile = useMediaQuery({
//     query: '(max-width: 600px)'
// })

// const isTablet = useMediaQuery({
//     query: '(max-width: 768px)'
// })

// const isDesktop = useMediaQuery({
//     query: '(m-width: 1024px)'
// })