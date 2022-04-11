import '../styles/NewTaskListFormRow.css';

const NewTaskListFormRow = ({ ForOnChange, removeRow, name, valuepercentage }) => {
    return (
        <div className="form-row">
            <input 
                type="text"
                className="form-control"
                name='name'
                value={name}
                onChange={e => ForOnChange(e.target.name, e.target.value)}
                placeholder='Tarea'
                
                />
            <input
                type="number"
                className="form-control"
                name='valuepercentage'
                value={valuepercentage}
                onChange={e => ForOnChange(e.target.name, e.target.value)}
                placeholder='Relevancia (%)'
                
            />
            <button onClick={removeRow} type='button' className='form-row__delete-button'>Eliminar</button>
        </div>
      );
}
 
export default NewTaskListFormRow;