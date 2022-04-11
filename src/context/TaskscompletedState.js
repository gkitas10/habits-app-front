import React, { createContext, useState } from 'react';

export const taskscompletedContext = createContext();

const TaskscompletedState = (props) => {
    const [ taskscompleted, setTaskscompleted ] = useState([
        {
            completed:'hi',
            taskid:''
        }
    ]);

    return ( 
        <taskscompletedContext.Provider
            value={{
                taskscompleted,
                setTaskscompleted
            }}
        >
            { props.children }
        </taskscompletedContext.Provider>
     );
}
 
export default TaskscompletedState;