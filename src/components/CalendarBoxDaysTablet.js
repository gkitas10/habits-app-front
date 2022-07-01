import { useTranslation} from "react-i18next";

const CalendarBoxDaysTablet = () => {
  const { t } = useTranslation();

    return ( 
        <>
            <div className="calendar-box__day">{t("calendardaystablet.mon")}</div>
            <div className="calendar-box__day">{t("calendardaystablet.tue")}</div>
            <div className="calendar-box__day">{t("calendardaystablet.wed")}</div>
            <div className="calendar-box__day">{t("calendardaystablet.thu")}</div>
            <div className="calendar-box__day">{t("calendardaystablet.fri")}</div>
            <div className="calendar-box__day">{t("calendardaystablet.sat")}</div>
            <div className="calendar-box__day">{t("calendardaystablet.sun")}</div>
        </>
     );
}
 
export default CalendarBoxDaysTablet;