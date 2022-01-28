import { useState } from 'react';
import axiosClient from '../axios';
import NewTaskListFormRow from './NewTaskListFormRow';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/NewTaskListForm.css';

const NewTaskListForm = () => {
  const { user } = useAuth0();
  const { sub } = user;
  const newTaskListInitialState = {
      listname:'',
      tasks:[],
      created:''
  }

  const rowInitialState = {
      name: "",
      valuepercentage: ""
    };

  const [ newtasklist, setNewTaskList ] = useState(newTaskListInitialState);
  const { listname } = newtasklist;
  const [rows, setRows] = useState([rowInitialState]);

  const handleChange = (index, name, value) => {
      const copyRows = [...rows];
      copyRows[index] = {
        ...copyRows[index],
        [name]: value
      };
      setRows(copyRows);
    };

  const handleOnAdd = () => {
      setRows(rows.concat(rowInitialState));
    };

  const handleOnRemove = index => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };  

  const handleSubmit = e => {
    e.preventDefault();

    setNewTaskList({
        ...newtasklist,
        tasks:[...rows]
    })

    saveTaskList({
      ...newtasklist,
      tasks:[...rows],
      created:new Date().toISOString(),
      userid:sub
  });
  }

  const handleInputChange = e => {
    setNewTaskList({
      ...newtasklist,
      [e.target.name]:e.target.value
    })
  }

  const saveTaskList = async tasklist => {
    try {
      await axiosClient.post('/create-task-list', tasklist);
    } catch (error) {
      console.log(error)
    } 
  }

  return (
    <form className='newtasklistform'
            onSubmit={handleSubmit}
        >
        <div className="form-group">
            {/* <label className='label'>Nombre de la lista de tareas</label> */}
            <input
              className='newtasklist__form-control'
              type='text'
              name='listname'
              value={listname}
              onChange={handleInputChange}
              placeholder='Nombre de la lista de tareas'
              />
              
        </div>


        <button onClick={handleOnAdd} type="button" className='addtaskfield-button'>Agregar campo de tarea +</button>

        {
            rows.map((row, index) => (
                <NewTaskListFormRow
                //Spread operator para pasar props cuando ya son parte de un objeto
                {...row}
                key={index}
                ForOnChange={ (name, value) => handleChange(index, name, value) }
                removeRow={ () => handleOnRemove(index) }
            />
            ))
        }

        { rows.length > 0 ? ( <input className='newtasklistform__submit-btn' type='submit' value='Crear'/> ) : null }
        
        
    </form>
    );
}
 
export default NewTaskListForm;