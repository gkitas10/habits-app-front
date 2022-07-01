import { useTranslation} from "react-i18next";

const CalendarBoxDays = () => {
  const { t } = useTranslation();

    return ( 
        <>
            <div className="calendar-box__day">{t("calendardays.mon")}</div>
            <div className="calendar-box__day">{t("calendardays.tue")}</div>
            <div className="calendar-box__day">{t("calendardays.wed")}</div>
            <div className="calendar-box__day">{t("calendardays.thu")}</div>
            <div className="calendar-box__day">{t("calendardays.fri")}</div>
            <div className="calendar-box__day">{t("calendardays.sat")}</div>
            <div className="calendar-box__day">{t("calendardays.sun")}</div>
        </>
     );
}
 
export default CalendarBoxDays;