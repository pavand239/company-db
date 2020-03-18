import React, {useCallback, useState} from 'react';
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom"
import LoadingIndicator from "../loading-indicator";
import {useGetData} from "../hooks";
import { FormTemplate } from "./form-template";

const EditForm = ({getData,patchData,formConfig, service=null}) => {
    let {id} = useParams(),
        [isUploading, setIsUploading] = useState(false),
        [isUploaded, setIsUploaded] = useState(false),
        [uploadError, setUploadError] = useState(null);


    const useGetDataCallback = () => {
        let token = localStorage.getItem('token'),
            getDataCallback = useCallback(()=>getData(token,id),[id, token]);
        return useGetData(getDataCallback);
    }
    const onSubmit = (values) => {
        setIsUploading(true);
        patchData(localStorage.getItem('token'), id, values)
            .then(()=>{setIsUploading(false);setIsUploaded(true);})
            .catch(err=>{setUploadError(err);setIsUploaded(true);})
    }
    let {data, isLoading, error} = useGetDataCallback();
    if (isLoading && !error) {
        return <LoadingIndicator />
    }
    if (error) {
        return  error.message
    }
    const bottomButtonBlock = (
        <div className='d-flex align-items-baseline m-3'>
        {
            isUploading?
                <LoadingIndicator />
            :
                <Button className='mx-3' type={'submit'}>Submit</Button>
        }
        {
            uploadError?
                <p className='text-weight-bold text-danger'>{uploadError.message}</p>:''
        }
        {
            isUploaded?
                <p className='text-weight-bold text-success'>Данные успешно обновлены</p>:''
        }
        </div> 
    )
    return <FormTemplate {...formConfig} 
                        onSubmit={onSubmit} 
                        bottomButtonBlock={bottomButtonBlock} 
                        data={data}
                        service={service}/>
}

export default EditForm;