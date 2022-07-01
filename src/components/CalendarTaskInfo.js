import { useEffect, useState, useContext } from "react";
import axiosClient from "../axios";
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/CalendarTaskInfo.css';
import { useMediaQuery } from "react-responsive";
import { useTranslation} from "react-i18next";
import TaskinfoTableMobile from "./TaskinfoTableMobile";

const CalendarTaskInfo = ({ selecteddaywithlist, setPerformanceonscreen, refreshCalendarBox }) => {
    const { t } = useTranslation();
    const { getAccessTokenSilently } = useAuth0();
    const tasklist = selecteddaywithlist.tasklist;
    const _id = tasklist?._id;
    const tasklistid = _id;
    const [ tasks, setTasks ] = useState([]);
    const [ taskscompleted, setTasksCompleted ] = useState(selecteddaywithlist.taskscompleted);
    const [ showsuccessalert, setShowsuccessalert ] = useState(false);
    const [ showerroralert, setShowerroralert ] = useState(false);
    const [ timerid, setTimerid ] = useState('');
    const [ alertcontent, setAlertcontent ] = useState('');
    const [ showconfirm, setShowconfirm ] = useState(false);
    //iterate tasks and multiply each element value % by taskscompleted array elemnts
    const performance = tasks.reduce((prev, curr, idx, arr) => {
        return (curr['valuepercentage'] * taskscompleted[idx]?.completed / 100) + prev;
    }, 0)
    //Media queries
    const isMobile = useMediaQuery({
        query: '(max-width: 600px)'
        })


    useEffect(() => {
        const getTasks = async () => {
            try {
                const token = await getAccessTokenSilently();

                const responseDB = await axiosClient.get(`/get-tasklist/${ tasklistid }`, {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }) 

                setTasks(responseDB.data.tasklistDB.tasks)  

            } catch (error) {
                console.log(error)
            }  
        }

        setTasksCompleted(selecteddaywithlist.taskscompleted);
        getTasks();
            
    }, [selecteddaywithlist])

    const handleChange = (e, taskid, idx) => {
        const task = {
            [e.target.name]:e.target.value,
            taskid
        }

        const copyTaskscompleted = [...taskscompleted];
        copyTaskscompleted[idx] = {
            ...copyTaskscompleted[idx],
            [e.target.name]:e.target.value,
            taskid
        }
        
        setTasksCompleted(copyTaskscompleted); 
    }

    const handleSubmit = async e => {   
        e.preventDefault();
        //Validate tasks completed
        let isValid = true; 
        for (let task of taskscompleted) {
            if(task.completed < 0 || task.completed > 100) {
                isValid = false;
            }

            break;
        }

        if(!isValid) {
            setAlertcontent(t("calendarinfo.alerts.completed"))
            setShowerroralert(true);
            setTimerid(setTimeout(() => { setShowerroralert(false)}, 4000));

            return;
        }
        
        try {
            const token = await getAccessTokenSilently();

            const updatedTasksDB = await axiosClient.put(`/update-day-tasks/${selecteddaywithlist._id}`, { taskscompleted, performance }, {
                headers:{
                        Authorization:`Bearer ${token}`
                }});    

            setAlertcontent(t("calendarinfo.alerts.completedsaved"));
            setShowsuccessalert(true);
            setTimerid(setTimeout(() => { setShowsuccessalert(false) }, 4000));
            refreshCalendarBox(updatedTasksDB.data.updatedDay)
            
        } catch (error) {
           console.log(error);
        }
    }

    const handleClickOnDelete = () => {
        setShowconfirm(true)
    }

    const handleClickOnConfirm = async () => {
        const token = await getAccessTokenSilently();
        try {
            const deletedDayDB = await axiosClient.delete(`/delete-day/${selecteddaywithlist._id}`, {
                headers:{
                        Authorization:`Bearer ${token}`
                }})
                //set 2nd arg true 
                refreshCalendarBox(deletedDayDB.data.deletedDayDB, true)
                setShowconfirm(false)
                setAlertcontent(t("calendarinfo.alerts.datedeleted"))
                setShowsuccessalert(true);
                setTimerid(setTimeout(() => { setShowsuccessalert(false) }, 4000));
        } catch (error) {
            console.log(error);
        }  
    }

    const handleClickOnCancel = () => {
        setShowconfirm(false)
    }

    const Successalert = <div className='newtasklistform__success-alert'>{ alertcontent }</div>
    const Erroralert = <div className='newtasklistform__error-alert'>{ alertcontent }</div>

    return ( 
        <div className="calendar-task-info">
            <div className="taskinfo__table">
                <form className="calendar-task-info__form"
                onSubmit={handleSubmit}
                >
                    <div className="taskinfo__grid">
                        {
                            tasklistid !== undefined ? (
                                <div className="taskinfo__head">
                                    <div className="taskinfo-head__name">{t("calendarinfo.task")}</div>
                                    <div className="taskinfo-head__valuepercentage">{t("calendarinfo.importance")}</div>
                                    <div className="taskinfo-head__completed">{t("calendarinfo.completed")}</div>
                                    <div className="taskinfo-head__multiplied">{t("calendarinfo.multiplied")}</div>
                                </div>
                            ) : null
                        }
                        
                    {tasks.map((task, idx) => (
                        <div className="taskinfo__row"
                            key={task._id}
                        >
                            <div className="taskinfo__name">{ task.name}</div>
                            <div className="tasinfo__valuepercentage">{ task.valuepercentage }</div>
                            <div className="taskinfo__title-container">
                                <input className="completed" type='number' name="completed"
                                value={taskscompleted[idx]?.completed === undefined ? '' : taskscompleted[idx]?.completed }
                                
                                onChange={ e => handleChange(e, task._id, idx) }
                                />
                            </div>
                            <div className="taskinfo__multiplied">
                                { isNaN(task.valuepercentage * +taskscompleted[idx]?.completed / 100) ? '-' : task.valuepercentage * +taskscompleted[idx]?.completed / 100 }
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="task-info__submit-btn-container">
                    <input className="task-info__submit-btn" type='submit' value={t("calendarinfo.savebtn")}/> 
                    </div>
                        
                </form>
            </div>

            <div className="calendar-task-info__performance-container">
                <div className="calendar-task-info__performance-title">{t("calendarinfo.performance")}</div>
                <div className="calendar-task-info__performance">
                    { isNaN(performance) ? '-' : performance.toFixed(2) + '%' } 
                </div>
            </div>
            
            <div className="calendar-task-info__delete-container">
                <div className="calendar-task-info__delete-question" onClick={handleClickOnDelete}>
                    {t("calendarinfo.erasequestion")}
                </div>
                { showconfirm ? ( <div className="calendar-task-info__confirm-btn-container">
                    <button className="calendar-task-info__confirm-btn" onClick={handleClickOnConfirm}>{t("calendarinfo.confirmbtn")}</button>
                    <button className="calendar-task-info__cancel-btn" onClick={handleClickOnCancel}>{t("calendarinfo.cancelbtn")}</button>
                </div> ) : null }
            </div>
            { showsuccessalert ? Successalert : null }
            { showerroralert ? Erroralert : null }
        </div>
     );
}
 
export default CalendarTaskInfo;