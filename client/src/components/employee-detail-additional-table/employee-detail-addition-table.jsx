import React, {useCallback} from 'react'
import {withRouter} from "react-router-dom";
import { Table } from 'react-bootstrap';

import {useGetData} from "../hooks"
import LoadingIndicator from "../loading-indicator";
const EmployeeDetailAdditionalTable = ({getData, match, tableLabel, fields, labels}) => {
    let {id} = match.params;
    const useGetDataCallback = () => {
        let token = localStorage.getItem('token'),
            getDataCallback = useCallback(()=>getData(token,id),[id, token]);
        return useGetData(getDataCallback);
    }
    let {data, isLoading, error} = useGetDataCallback();
    if (isLoading && !error) {
        return <LoadingIndicator />
    }
    if (error) {
        return  error.message
    }
    return (
        <div>
            <h4>{tableLabel}:</h4>
            {data.length===0?
                <p className='font-weight-bold'>Информация отсутсвует</p>
            :
                <Table bordered responsive striped>
                    <thead>
                        <tr>
                            <th>№</th>
                            {labels.map((label,idx)=>(<th key={idx}>{label}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item,idx)=>(
                            <tr key = {idx}>
                                <td>{idx+1}</td>
                                {fields.map((field, idx)=>(
                                    <td key = {idx}>{item[field]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </div>
    )
}
export default withRouter(EmployeeDetailAdditionalTable)