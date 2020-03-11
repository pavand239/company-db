import React, { useCallback} from 'react';
import LoadingIndicator from "../loading-indicator";
import {useGetData} from "../hooks";
import ManyFieldItemRecord from "./many-field-item-record"

const AsyncItemRecord = ({getData, field, item, fieldToDisplay, className,label=null, id=null})=>{
    if(!id) {
        id = item[field]
    }
    const useGetDataCallback = () => {
        let token = localStorage.getItem('token'),
            getDataCallback = useCallback(()=>getData(token, id),[token]);
        return useGetData(getDataCallback);
    }
    let {data, error, isLoading} = useGetDataCallback();
    if (!error && isLoading){
        return <LoadingIndicator />
    }
    if (error){
        return error.message
    }
    return <ManyFieldItemRecord item={data} fieldToDisplay={fieldToDisplay} label={label} className={className} />
}
export default AsyncItemRecord;