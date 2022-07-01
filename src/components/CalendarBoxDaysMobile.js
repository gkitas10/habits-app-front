import { useTranslation} from "react-i18next";

const CalendarBoxDaysMobile = () => {
  const { t } = useTranslation();

    return ( 
        <>
            <div className="calendar-box__day">{t("calendardaysmobile.mon")}</div>
            <div className="calendar-box__day">{t("calendardaysmobile.tue")}</div>
            <div className="calendar-box__day">{t("calendardaysmobile.wed")}</div>
            <div className="calendar-box__day">{t("calendardaysmobile.thu")}</div>
            <div className="calendar-box__day">{t("calendardaysmobile.fri")}</div>
            <div className="calendar-box__day">{t("calendardaysmobile.sat")}</div>
            <div className="calendar-box__day">{t("calendardaysmobile.sun")}</div>
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