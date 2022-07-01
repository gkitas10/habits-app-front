import '../styles/NewTaskListFormRow.css';
import { useTranslation} from "react-i18next";

const NewTaskListFormRow = ({ ForOnChange, removeRow, name, valuepercentage }) => {
  const { t } = useTranslation();

    return (
        <div className="form-row">
            <input 
                type="text"
                className="form-control"
                name='name'
                value={name}
                onChange={e => ForOnChange(e.target.name, e.target.value)}
                placeholder={t("createtasklistform.formrow.task")}
                
                />
            <input
                type="number"
                className="form-control"
                name='valuepercentage'
                value={valuepercentage}
                onChange={e => ForOnChange(e.target.name, e.target.value)}
                placeholder={t("createtasklistform.formrow.importance")}
                
            />
            <button onClick={removeRow} type='button' className='form-row__delete-button'>{t("createtasklistform.formrow.deletebtn")}</button>
        </div>
      );
}
 
export default NewTaskListFormRow;