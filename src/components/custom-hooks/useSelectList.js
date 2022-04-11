import { useState, Fragment, useEffect } from "react";
import axiosClient from "../../axios";
import { useAuth0 } from '@auth0/auth0-react';
import '../../styles/useSelectList.css';

const useSelectList = (options) => {
    
    const { getAccessTokenSilently } = useAuth0()
    
    const [ selecteddaywithlist, setSelectedDayWithList ] = useState({
        date:'',
        tasklist:{ listname:'', _id:'', },
        taskscompleted:[],
        _id:''
    });   

    const handleChange = async id => {
        const listselected = options.filter(tasklist => tasklist._id === id)[0];

        try {
            const token = await getAccessTokenSilently();
            let savedDayDB = await axiosClient.put(`update-day/${selecteddaywithlist._id}`, 
                listselected
            , {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            setSelectedDayWithList(savedDayDB.data.updatedDay);

        } catch (error) {
            console.log(error)
        }   
    } 

    const SelectList = () => (
        <Fragment>
            
            <select className="tasklist-selector"
            onChange={ e => handleChange(e.target.value) }
            >
                { selecteddaywithlist.tasklist === undefined ? (<option>--Seleccione</option>) : (<option>{ selecteddaywithlist.tasklist?.listname }</option>) }
                {/* <option> { selecteddaywithlist.tasklist?._id !== '' ? selecteddaywithlist.tasklist?.listname : '--Seleccione'} </option> */}
                { options.map(opt => {
                    //Eliminating selected option from options array
                    return selecteddaywithlist.tasklist?._id !== opt._id ? (
                    <option
                    key={opt._id}
                    value={ opt._id } 
                    >{ opt.listname }</option>
                ) : null })}
            </select>
        </Fragment>
    )

    return [ selecteddaywithlist, setSelectedDayWithList, SelectList ];   
}
 
export default useSelectList;