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
                <i className="fa fa-times p-1" aria-hidden="true" onClick={()=>history.goBack()}></i>
            </div>
            <h3>{formName}</h3>
            <Formik
                initialValues={formConfig.getInitialValues(data)}
                validationSchema={formConfig.validationSchema}
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
                                        readOnly:field.readOnly
                                    },
                                        form=null,
                                        valueProps={};
                                    if (field.readOnly) {
                                        valueProps={
                                            defaultValue:data[field.name]
                                        }
                                    } else {
                                        valueProps={
                                            value:props.values[field.name]
                                        }
                                    }
                                    if (field.element==='select') {
                                        if (field.readOnly) {
                                            form = <Form.Control key={idx} {...defaultProps} {...valueProps}/>
                                        } else {
                                            console.log(valueProps)
                                            form = (
                                                <Form.Control key={idx} {...defaultProps} {...valueProps} as={field.element}>
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
                                                            {...valueProps}
                                                            key={idx}
                                                            />
                                    } else {
                                        form = <Form.Control {...defaultProps} {...valueProps} type={field.type} key={idx} />
                                    }

                                    return (
                                        
                                        <Form.Row key={idx}>
                                            <Col xs={3} >
                                                <Form.Label className = 'font-weight-bold mb-0 py-2'>{field.label}</Form.Label> 
                                            </Col>
                                            <Col>
                                                {form}   
                                                {props.errors[field.name]?
                                                    <p className='text-weight-bold text-danger'>{props.errors[field.name]}</p>
                                                :''}
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