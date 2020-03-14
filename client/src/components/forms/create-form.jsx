import React, { useState} from 'react';
import {Button} from "react-bootstrap";

import LoadingIndicator from "../loading-indicator";
import { FormTemplate } from "./form-template";


export const CreateForm = ({createData,formConfig, afterUpload, getResponseData, service=null}) => {
    let [isUploading, setIsUploading] = useState(false),
        [isUploaded, setIsUploaded] = useState(false),
        [uploadError, setUploadError] = useState(null),
        [newId, setNewId] = useState('');

    const onSubmit = (values) => {
        setIsUploading(true);
        createData(localStorage.getItem('token'), values)
            .then((data)=>{getResponseData(data);setIsUploading(false);setIsUploaded(true);})
            .catch(err=>setUploadError(err));
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
                <p className='text-weight-bold text-danger'>uploadError.message</p>:''
        }
        {
            isUploaded?
                <p className='text-weight-bold text-success'>Данные успешно загружены на сервер</p>:''
        }
        </div> 
    )
    if (isUploaded){
        afterUpload();
    }
    return <FormTemplate {...formConfig} 
                        onSubmit={onSubmit} 
                        bottomButtonBlock={bottomButtonBlock} 
                        service={service}/>
}
