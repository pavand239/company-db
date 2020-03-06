import React, {useCallback} from 'react';
import {Form} from "react-bootstrap";
import LoadingIndicator from "../loading-indicator";
import {useGetData} from "../hooks";

export const AsyncSelectField = ({service, getData, labelKeys, name, readOnly, defaultValue, value, onChange}) => {

    const useGetDataCallback = () => {
        let token = localStorage.getItem('token'),
            getDataCallback = useCallback(()=>service[getData](token),[token]);
        return useGetData(getDataCallback);
    }
    let {data, error, isLoading} = useGetDataCallback();
    
    if (!error && isLoading){
        return <LoadingIndicator />
    }
    if (error){
        return error.message
    }
    let options=data.map(item=>labelKeys.map(labelKey=>item[labelKey]).join(' ')),
        optionValues=data.map(item=>item.id);
    if(readOnly) {
        return (
            <Form.Control readOnly plaintext defaultValue={options[optionValues.indexOf(defaultValue)]}/>
        )
    }
    return (
        <Form.Control id={name} name={name} value={value} onChange={onChange} as='select'>
            {options.map((option,idx)=>(
                <option key={idx} value={optionValues[idx]}>{option}</option>
            ))}
        </Form.Control>
    )
}