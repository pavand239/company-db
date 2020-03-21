import React, {useCallback, useState} from 'react';
import {Button} from "react-bootstrap";
import {useParams, Redirect} from "react-router-dom"
import LoadingIndicator from "../loading-indicator";
import {useGetData} from "../hooks";
import { FormTemplate } from "./form-template";

const EditForm = ({getData,patchData,formConfig, deleteData, afterUpload=()=>{}, afterDelete=()=>{}, service=null}) => {
    let {id} = useParams(),
        [isUploading, setIsUploading] = useState(false),
        [isUploaded, setIsUploaded] = useState(false),
        [uploadError, setUploadError] = useState(null),
        [isDeleted, setIsDeleted] = useState(false);


    const useGetDataCallback = () => {
        let token = localStorage.getItem('token'),
            getDataCallback = useCallback(()=>getData(token,id),[id, token]);
        return useGetData(getDataCallback);
    }
    const onSubmit = (values) => {
        setIsUploading(true);
        setIsUploaded(false);
        setUploadError(null);
        patchData(localStorage.getItem('token'), id, values)
            .then(()=>{setIsUploading(false);setIsUploaded(true);})
            .catch(err=>{setUploadError(err);setIsUploaded(true);})
    }
    const onDelete = (id) => {
        setIsUploading(true);
        setIsUploaded(false);
        setUploadError(null);
        deleteData(localStorage.getItem('token'), id)
            .then(()=>{setIsUploading(false);setIsDeleted(true);})
            .catch(err=>{setUploadError(err);setIsUploading(false)});
    }
    let {data, isLoading, error} = useGetDataCallback();
    if (isLoading && !error) {
        return <LoadingIndicator />
    }
    if (error) {
        return  error.message
    }
    if (isUploaded) {
        return afterUpload();
    }
    if (isDeleted) {
        return afterDelete();
    }
    const bottomButtonBlock = (
        <div className='d-flex align-items-baseline m-3'>
        {
            isUploading?
                <LoadingIndicator />
            :
                <div>
                    <Button className='mx-3' type={'submit'}>Изменить данные</Button>
                    {formConfig.deletePerm?
                        <Button variant='danger' className='mx-3' onClick={()=>onDelete(id)}>Удалить</Button>
                    :''}   
                </div>
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