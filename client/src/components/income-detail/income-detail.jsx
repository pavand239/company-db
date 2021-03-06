import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';

import CompanyDBServiceContext from "../company-db-service-context";
import ItemDetail from "../item-detail";
import ItemRecord, {AsyncItemRecord} from "../item-record";
import { useParams } from "react-router-dom"

// all fields
// 'id','employee','income_date','percent','premium','tax','salary','total'
// fields edit by Accountig
// [income_date,percent]
// fields edit by chief
// [premium]

const IncomeDetail=({user:{groups}})=>{
    let {getIncome, getEmployee} = useContext(CompanyDBServiceContext),
        [buttonEdit, setButtonEdit] = useState(false),
        details = [
            <AsyncItemRecord    label={'Работник'} 
                                field={'employee'} 
                                fieldToDisplay={['surname', 'name', 'patronymic']}
                                getData={getEmployee}/>,
            <ItemRecord label={'Дата получения'} field={'income_date'} />,
            <ItemRecord label={'Оклад'} field={'salary'} />,
            <ItemRecord label={'Процент'} field={'percent'} />,
            <ItemRecord label={'Премия'} field={'premium'} />,
            <ItemRecord label={'НДФЛ'} field={'tax'} />,
            <ItemRecord label={'Итого'} field={'total'} />,
        ];

    useEffect(() => {
        if (groups.includes('Chief') || 
            groups.includes('Accounting')){
                setButtonEdit(true)
        }
    }, [])

    let {id} = useParams();

    return (
        <ItemDetail getData={getIncome} buttonEdit={buttonEdit && id}>
            {details}
        </ItemDetail>
    )
}

const mapStateToProps = (state) => ({
    ...state.user
})

export default connect(mapStateToProps)(IncomeDetail)
