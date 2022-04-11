import { useState, useEffect } from 'react';
import axiosClient from '../axios';
import NewTaskListFormRow from './NewTaskListFormRow';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/NewTaskListForm.css';

const NewTaskListForm = () => {
  const { getAccessTokenSilently, user } = useAuth0()
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
  const [ showalert, setShowalert ] = useState(false);
  const [ showsuccessalert, setShowsuccessalert ] = useState(false);
  const [ showerroralert, setShowerroralert ] = useState(false);
  const [ timerid, setTimerid ] = useState('');
  const [ alertcontent, setAlertcontent ] = useState('');
  const [ tasklistid, setTasklistid ] = useState('');

  useEffect(() => {
        return () => {
          clearTimeout(timerid);
        } 
  },[]);

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

  const handleSubmit = async e => {
    e.preventDefault();
    //Validate listname
    if(newtasklist.listname === '') {
      setAlertcontent('El campo de nombre de la lista no puede estar vacío')
      setShowerroralert(true);
      setTimerid(setTimeout(() => { setShowerroralert(false)}, 4000));

      return;
    }
    //Validate tasks name 
    let nameIsEmpty = false;
    for (let row of rows ) {
      if(row['name'] === '') {
        nameIsEmpty = true;
        break;
      }
    }

    if(nameIsEmpty) {
      setAlertcontent('El campo de tarea no puede estar vacío')
      setShowerroralert(true);
      setTimerid(setTimeout(() => { setShowerroralert(false)}, 4000));

      return;
    }

    //Validate valuepercentages
    const sum = rows.reduce((acc, curr, idx, arr) => +curr.valuepercentage + acc, 0);
    
    if(sum !== 100) {
      setAlertcontent('Los porcentajes de todas las tareas deben sumar 100')
      setShowerroralert(true);
      setShowsuccessalert(false)
      setTimerid(setTimeout(() => { setShowerroralert(false)}, 4000));

      return;
    }
    //get lists w that name
    const responseArr = await getTaskListsForCheck(newtasklist.listname);
    console.log(responseArr);
    //Check if there are any lists that match
      if(responseArr.length > 0) {
        setShowalert(true)
        setTasklistid(responseArr[0]._id);
      } else {
          saveTaskList({  
            ...newtasklist,
            tasks:[...rows],
            created:new Date().toISOString(),
            userid:sub
        });

    //showAlert
    setShowsuccessalert(true);
    setShowerroralert(false)
    setAlertcontent('Lista creada exitosamente')
    setTimerid(setTimeout(() => { setShowsuccessalert(false)}, 4000));
        }
    



    // setNewTaskList({
    //     ...newtasklist,
    //     tasks:[...rows]
    // })

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
      console.log(error.response)
    } 
  }

  

  const getTaskListsForCheck = async (listname) => {

    try {
      const token = await getAccessTokenSilently();
      const response = await axiosClient.get(`/get-tasklists-for-check?listname=${listname}`, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    return response.data;
      
    } catch (error) {
      console.log(error);
    }
  }

  // const createAndUpdateTasklist = async () => {
  //   try {
  //     await axiosClient.put(`/update-tasklist/${}`)
  //   } catch (error) {
  //     console.log();
  //   }
  // }

  const handleClickNo = () => {
    setShowalert(false)
  }

  const handleClickYes = async () => {
    const body = {
      ...newtasklist,
      tasks:[...rows],
      created:new Date().toISOString(),
      userid:sub
  }

  let updatedTasklistDB = '';
//DB update
    try {
      const token = await getAccessTokenSilently();
      updatedTasklistDB = await axiosClient.put(`/update-tasklist/${tasklistid}`, body, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
      
    } catch (error) {
      console.log(error);
    }

    setShowalert(false);

    if(updatedTasklistDB) {
      console.log(updatedTasklistDB);
      setAlertcontent('Lista editada exitosamente')

      setShowsuccessalert(true);
      setTimerid(setTimeout(() => { setShowsuccessalert(false) }, 4000));
    }else{
      console.log('error', updatedTasklistDB);
      setAlertcontent('Ha ocurrido un error');

      setShowerroralert(true);
      setTimerid(setTimeout(() => { setShowerroralert(false) }, 4000));
    }

    // setShowsuccessalert(true);
    // setTimerid(setTimeout(() => { setShowsuccessalert(false) }, 4000));

  //     saveTaskList({
  //     ...newtasklist,
  //     tasks:[...rows],
  //     created:new Date().toISOString(),
  //     userid:sub
  // });
   

  }

  const Alert = <div className='newtasklistform__confirm-alert'>
                  <div className='newtasklistform__confirm-question'>Ya existe una lista con este nombre, deseas sobreescribirla?</div>
                    <div className='newtasklistform__confirm-btn-container'>
                      <button className='newtasklistform__confirm-btn' onClick={handleClickYes}>Si</button>
                      <button className='newtasklistform__confirm-btn' onClick={handleClickNo}>No</button>
                    </div>
                </div>;

  const Successalert = <div className='newtasklistform__success-alert'>{ alertcontent }</div>

  const Erroralert = <div className='newtasklistform__error-alert'>{ alertcontent }</div>

  return (
    <div className='newtasklistform__container'>
      
      <form className='newtasklistform'
              onSubmit={handleSubmit}
          >
          <div className='newtasklistform__instruc'>Crea una lista</div>
              
          <input
            className='newtasklist__form-control newtasklist__listname-input'
            type='text'
            name='listname'
            value={listname}
            onChange={handleInputChange}
            placeholder='Nombre de la lista de tareas'
          />
          
          <button onClick={handleOnAdd} type="button" className='newtasklistform__addtfield-btn'>Agregar campo de tarea</button>

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
      { showalert ? Alert : null }
      { showsuccessalert ? Successalert : null }
      { showerroralert ? Erroralert : null }
    </div>
    );
}
 
export default NewTaskListForm;