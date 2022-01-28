import { useState, Fragment, useEffect } from "react";
import axiosClient from "../../axios";
import { useAuth0 } from '@auth0/auth0-react';


const useSelectList = (options) => {
    
    const { getAccessTokenSilently } = useAuth0()
    
    // useEffect(() => {
        
        
    // }, [])
    
    const [ selecteddaywithlist, setSelectedDayWithList ] = useState({
        date:'',
        tasklist:{ listname:'', _id:'', },
        taskscompleted:[],
        _id:''
    });   

    console.log(selecteddaywithlist); 

    const handleChange = async id => {
        console.log('change'); 
        console.log(selecteddaywithlist); 
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
            <label>Lista de tareas</label>
            <select
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