import React, {useCallback, useState} from 'react';
import {Form, Col, Button} from "react-bootstrap";
import {Formik} from "formik";
import {useParams, useHistory} from "react-router-dom"
import LoadingIndicator from "../loading-indicator";
import {useGetData} from "../hooks";
import {AsyncSelectField} from "./async-select-field";

const EditForm = ({getData,patchData,formConfig, service=null}) => {
    let {id} = useParams(),
        history = useHistory(),
        [isUploading, setIsUploading] = useState(false),
        [isUploaded, setIsUploaded] = useState(false),
        [uploadError, setUploadError] = useState(null);

    const useGetDataCallback = () => {
        let token = localStorage.getItem('token'),
            getDataCallback = useCallback(()=>getData(token,id),[id, token]);
        return useGetData(getDataCallback);
    }
    let {data, isLoading, error} = useGetDataCallback();

    console.log(data)
    if (isLoading && !error) {
        return <LoadingIndicator />
    }
    if (error) {
        return  error.message
    }
    let {formName, formFields} = formConfig;
    return (
        <div>
            <div className='d-flex flex-row-reverse'>
                <i class="fa fa-times p-1" aria-hidden="true" onClick={()=>history.goBack()}></i>
            </div>
            <h3>{formName}</h3>
            <Formik
                initialValues={formConfig.getInitialValues(data)}
                onSubmit={values => {
                    setIsUploading(true);
                    patchData(localStorage.getItem('token'), id, values)
                        .then(()=>{setIsUploading(false);setIsUploaded(true);})
                        .catch(err=>setUploadError(err));
                }}
            >
                { props => (
                    <form onSubmit={props.handleSubmit}>
                        {
                            formFields.map(
                                (field, idx)=>{
                                    let defaultProps = {
                                        id:field.name,
                                        onChange:props.handleChange,
                                        defaultValue:data[field.name],
                                        value:props.values[field.name],
                                        ...field
                                    },
                                        form=null;
                                    if (field.element==='select') {
                                        if (field.readOnly) {
                                            form = <Form.Control key={idx} {...defaultProps} />
                                        } else {
                                            console.log(field.options)
                                            form = (
                                                <Form.Control key={idx} {...defaultProps} as={field.element}>
                                                    {field.options.map((option,idx)=>(
                                                        <option key={idx} value={field.optionsValues[idx]}>{option}</option>
                                                    ))}
                                                </Form.Control>
                                            )
                                        }
                                    } else if (field.element==='asyncSelect'){
                                        form = <AsyncSelectField {...defaultProps} 
                                                            service={service}
                                                            labelKeys={field.labelKeys}
                                                            getData={field.getData}
                                                            />
                                    } else {
                                        form = <Form.Control {...defaultProps} type={field.type} />
                                    }
                                    console.log(field.name);
                                    return (
                                        
                                        <Form.Row>
                                            <Col xs={3} >
                                                <Form.Label className = 'font-weight-bold mb-0 py-2'>{field.label}</Form.Label> 
                                            </Col>
                                            <Col>
                                                {form}   
                                            </Col>
                                        </Form.Row>
                                    )
                                }
                            )
                        }

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
                                <p className='text-weight-bold text-success'>Данные успешно обновлены</p>:''
                        }
                        </div>                     
                    </form>
                )}
            </ Formik>
        </div>
    )
}

export default EditForm;