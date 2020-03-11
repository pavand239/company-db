import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';

import CompanyDBServiceContext from "../company-db-service-context";
import ItemDetail from "../item-detail";
import ItemRecord, {MultipleAsyncItemRecord, ManyFieldItemRecord} from "../item-record";
import { useParams } from "react-router-dom"


const ChildDetail=({user:{groups}})=>{
    let {getChild, getEmployee} = useContext(CompanyDBServiceContext),
        [buttonEdit, setButtonEdit] = useState(false),
        details = [
            <MultipleAsyncItemRecord    label={'Работник'} 
                                field={'employee'} 
                                fieldToDisplay={['surname', 'name', 'patronymic']}
                                getData={getEmployee}
                                multiple={true}/>,
            <ManyFieldItemRecord label={'ФИО'} fieldToDisplay={['surname', 'name', 'patronymic']} />,
            <ItemRecord label={'Дата рождения'} field={'birth_date'} />,
        ];

    useEffect(() => {
        if (groups.includes('Admin') || 
            groups.includes('HumanResource')){
                setButtonEdit(true)
        }
    }, [])

    let {id} = useParams();

    return (
        <ItemDetail getData={getChild} buttonEdit={buttonEdit && id}>
            {details}
        </ItemDetail>
    )
}

const mapStateToProps = (state) => ({
    ...state.user
})

export default connect(mapStateToProps)(ChildDetail)
