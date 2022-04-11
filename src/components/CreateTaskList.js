import '../styles/CreateTaskList.css';
import NewTaskListForm from './NewTaskListForm';

const CreateTaskList = () => {

    return (  
        <div className='create-task-list'>
            {/* <div className='create-task-list__instruc'>Crea una lista ¡¡¡</div> */}
            <NewTaskListForm/>
        </div>
    );
}
 
export default CreateTaskList;