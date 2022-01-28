import '../styles/NewTaskListFormRow.css';

const NewTaskListFormRow = ({ ForOnChange, removeRow, name, valuepercentage }) => {
   
    return (
        <div className="form-row">
            <div className="form-group">
                {/* <label className='label'>Tarea</label> */}
                <input 
                    type="text"
                    className="form-control"
                    name='name'
                    value={name}
                    onChange={e => ForOnChange(e.target.name, e.target.value)}
                    placeholder='Tarea'
                    />
            </div>
            <div className="form-group">
                {/* <label className='label'>Relevancia en %</label> */}
                <input
                    type="number"
                    className="form-control"
                    name='valuepercentage'
                    value={valuepercentage}
                    onChange={e => ForOnChange(e.target.name, e.target.value)}
                    placeholder='Relevancia (%)'
                />
            </div>
            <button onClick={removeRow} type='button' className='form-row__delete-button'>Eliminar</button>
        </div>
      );
}
 
export default NewTaskListFormRow;