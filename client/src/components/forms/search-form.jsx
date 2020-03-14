import React, { useState} from 'react';
import {Button} from "react-bootstrap";

import LoadingIndicator from "../loading-indicator";
import { FormTemplate } from "./form-template";

export const SearchForm = ({formConfig, onSubmit, showFormName = false, showBackButton = false}) => {
    const bottomButtonBlock = (
        <div className='d-flex align-items-baseline m-3'>
            <Button className='mx-3' type={'submit'}>Поиск</Button>
        </div> 
    );
    console.log(formConfig)
    return <FormTemplate {...formConfig}
        onSubmit={onSubmit}
        bottomButtonBlock={bottomButtonBlock} 
        showFormName={showFormName}
        showBackButton={showBackButton}/>

}