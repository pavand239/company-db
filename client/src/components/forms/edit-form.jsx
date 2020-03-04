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
                        .then(()=>setIsUploading(false))
                        .catch(err=>setUploadError(err));
                }}
            >
                { props => (
                    <form onSubmit={props.handleSubmit}>
                        {
                            formFields.map(
                                (field, idx)=>(
                                    <Form.Row>
                                        <Col xs={3} >
                                            <Form.Label className = 'font-weight-bold mb-0 py-2'>{field.label}</Form.Label> 
                                        </Col>
                                        <Col>
                                            <Form.Control 
                                                id = {field.name}
                                                name = {field.name}
                                                type = {field.type}
                                                readOnly = {field.readOnly}
                                                plaintext = {field.readOnly}
                                                onChange={props.handleChange}
                                                defaultValue={data[field.name]}
                                                value={props.values[field.name]}/>
                                        </Col>
                                    </Form.Row>
                                )
                            )
                        }

                        {
                            uploadError?
                                <p className='text-weight-bold text-danger'>uploadError.message</p>:''
                        }
                        {
                            isUploading?
                                <LoadingIndicator />
                            :
                                <Button type={'submit'}>Submit</Button>
                        }                       
                    </form>
                )}
            </ Formik>
        </div>
    )
}

export default withRouter(EditForm)