import React, {useCallback, useState , useContext} from 'react';
import {Form, Col, Button} from "react-bootstrap";
import {EmployeeEditChief} from "../form-configs";
import {useFormik, Formik} from "formik";
import CompanyDBServiceContext from "../company-db-service-context"
import {withRouter} from "react-router-dom"
import LoadingIndicator from "../loading-indicator";
import {useGetData} from "../hooks";

const EditForm = ({getData,patchData,match,formConfig}) => {
    let {id} = match.params,
        [isUploading, setIsUploading] = useState(false),
        [isUploaded, setIsUploaded] = useState(false),
        [uploadError, setUploadError] = useState(null);

    const useGetDataCallback = () => {
        let token = localStorage.getItem('token'),
            getDataCallback = useCallback(()=>getData(token,id),[id, token]);
        return useGetData(getDataCallback);
    }
    let {data, isLoading, error} = useGetDataCallback();
    
    const formik = useFormik({
        initialValues:data,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
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
                                        name:field.name,
                                        readOnly:field.readOnly,
                                        plaintext:field.readOnly,
                                        onChange:props.handleChange,
                                        defaultValue:data[field.name],
                                        value:props.values[field.name]
                                    },
                                        options='',
                                        form=null;
                                    if (field.element) {
                                        if (field.readOnly) {
                                            form = <Form.Control {...defaultProps} />
                                        } else {
                                            form = (
                                                <Form.Control {...defaultProps} as={field.element}>
                                                    {field.options.map((option,idx)=>(
                                                        <option value={field.optionsValues[idx]}>{option}</option>
                                                    ))}
                                                </Form.Control>
                                            )
                                        }
                                    }
                                    else {
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

export default withRouter(EditForm)