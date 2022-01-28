import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/CalendarTaskInfo.css';


const CalendarTaskInfo = ({ selecteddaywithlist }) => {
    
    const tasklist = selecteddaywithlist.tasklist;
    const _id = tasklist?._id;
    const tasklistid = _id;
    
    const [ tasks, setTasks ] = useState([]);
    const [ taskscompleted, setTasksCompleted ] = useState([]);
    console.log(taskscompleted);
    //const  tasklistid  = tasklist._id;
    const { getAccessTokenSilently, user } = useAuth0();


    useEffect(() => {
        const getTasks = async () => {
            try {
                const token = await getAccessTokenSilently();

                const responseDB = await axiosClient.get(`/get-tasklist/${ tasklistid }`, {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }) 

                console.log(responseDB.data) 
                setTasks(responseDB.data.tasklistDB.tasks)  

            } catch (error) {
                console.log(error)
            }  
        }

        if(tasklistid) getTasks();
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

        // const handleChange = (index, name, value) => {
        //     const copyRows = [...rows];
        //     copyRows[index] = {
        //       ...copyRows[index],
        //       [name]: value
        //     };
        //     setRows(copyRows);
        //   };
    }

    const handleSubmit = () => {
        console.log('');
    }

    
    return ( 
        <div className="calendar-date-task-info">
            <div className="taskinfo__table">
                <form className="calendar-date__form"
                onSubmit={handleSubmit}
                >
                    <div className="taskinfo__grid">
                        {
                            tasklistid !== undefined ? (
                                <div className="taskinfo__head">
                                    <div className="taskinfo-head__name">Tarea</div>
                                    <div className="taskinfo-head__valuepercentage">Relevancia (%)</div>
                                    <div className="taskinfo-head__completed"> Completado (%) </div>
                                    <div className="taskinfo-head__multiplied"> %'s Multiplicados</div>
                                </div>
                            ) : null
                        }
                        
                    {tasks.map((task, idx) => (
                        <div className="taskinfo__row">
                            <div className="taskinfo__name">{ task.name}</div>
                            <div className="tasinfo__valuepercentage">{ task.valuepercentage }</div>
                            <div className="taskinfo__title-container">
                                <input className="completed" type='number' name="completed"
                                onChange={ e => handleChange(e, task._id, idx) }
                                />
                            </div>
                            <div className="taskinfo__multiplied">
                                { task.valuepercentage * 2 }
                            </div>
                        </div>
                    ))}
                    </div>
                    <input className="task-info__submit-btn" type='submit' 
                    />  
                    
                </form>
                
                
            </div>
            
        </div>
     );
}
 
export default CalendarTaskInfo;