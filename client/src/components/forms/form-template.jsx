import React from 'react';
import {useHistory} from "react-router-dom";
import {Form, Col, Button} from "react-bootstrap";
import {Formik} from "formik";
import {AsyncSelectField} from "./async-select-field";
export const FormTemplate = ({formName, formFields, getInitialValues, validationSchema,
                              onSubmit, bottomButtonBlock, showBackButton=true, showFormName = true,data=null, service=null}) => {
    let history = useHistory(),
        initialValues = getInitialValues(data);
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit(initialValues)}
                component={
                    (props)=><FormInputs bottomButtonBlock={bottomButtonBlock}
                                    formFields={formFields}
                                    data={data}
                                    service={service}
                                    {...props}/>
                }
                
            />
        </div>
    )
} 

const FormInputs = ({handleSubmit,handleChange, values,setFieldValue, errors, bottomButtonBlock, formFields, data, service}) => (
    <form onSubmit={handleSubmit}>
        {
            formFields.map(
                (field, idx)=>{
                    let defaultProps = {
                        id:field.name,
                        onChange:handleChange,
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
                            value:values[field.name]
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
                    } else if(field.type==='file') {
                        form = <Form.File {...defaultProps} onChange={(e)=>{setFieldValue('photo', e.target.files[0]);console.log(values['photo'])}} accept = {field.accept}  key={idx} />
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
                                {errors[field.name]?
                                    <p className='text-weight-bold text-danger'>{errors[field.name]}</p>
                                :''}
                            </Col>
                        </Form.Row>
                    )
                }
            )
        }

    {bottomButtonBlock}                    
    </form>
)