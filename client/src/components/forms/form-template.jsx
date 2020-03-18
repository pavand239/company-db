import React from 'react';
import {useHistory} from "react-router-dom";
import {Form, Col, Button} from "react-bootstrap";
import {Formik} from "formik";
import {AsyncSelectField} from "./async-select-field";
export const FormTemplate = ({formName, formFields, getInitialValues, validationSchema,
                              onSubmit, bottomButtonBlock, showBackButton=true, showFormName = true,data=null, service=null}) => {
    let history = useHistory();
    console.log(getInitialValues);
    return (
        <div>
            {showBackButton?
                <div className='d-flex flex-row-reverse'>
                    <i className="fa fa-times p-1" aria-hidden="true" onClick={()=>history.goBack()}></i>
                </div>
            :''}
            {showFormName?
                <h3>{formName}</h3>
            :''}
            <Formik
                initialValues={getInitialValues(data)}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
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
                                    if (field.readOnly && data) {
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
                                                            {...field}
                                                            />
                                    } else {
                                        form = <Form.Control {...defaultProps} {...valueProps} {...field} key={idx} />
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

                    {bottomButtonBlock}                    
                    </form>
                )}
            </ Formik>
        </div>
    )
} 