import { useEffect, useState } from "react";
import axiosClient from '../axios';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/CalendarTaskListSelector.css';
import { useTranslation} from "react-i18next";
import useSelectList from "./custom-hooks/useSelectList";
import TaskListButton from "./TaskListButton";

const CalendarTaskListSelector = ({ SelectList, updateTasklists }) => {
    const { t } = useTranslation();
    //const [ tasklists, setTaskLists ] = useState([]);
    //const [ selectedlist, SelectList ] = useSelectList(tasklists);
    const { getAccessTokenSilently, user } = useAuth0()

    useEffect(() => {
        const getTaskLists = async () => {
            const token = await getAccessTokenSilently();
    
            const res = await axiosClient.get('get-task-lists', {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            updateTasklists(res);
            //setTaskLists(res.data.tasklistsDB)
        } 

        getTaskLists();

    },[]);
    
    return ( 
        <div className="calendar-date-view-selector">
            <div className="calendar-date-view-selector__instruc">
                {t("listselector")}
            </div>
            <SelectList/>
        </div>
     );
}
 
export default CalendarTaskListSelector;