import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';

import CompanyDBServiceContext from "../company-db-service-context";
import ItemDetail from "../item-detail";
import ItemRecord, {AsyncItemRecord} from "../item-record";
import { useParams } from "react-router-dom"


const EducationDetail=({user:{groups}})=>{
    let {getEducation, getEmployee} = useContext(CompanyDBServiceContext),
        [buttonEdit, setButtonEdit] = useState(false),
        details = [
            <AsyncItemRecord    label={'Работник'} 
                                field={'employee'} 
                                fieldToDisplay={['surname', 'name', 'patronymic']}
                                getData={getEmployee}/>,
            <ItemRecord label={'Наименование УЗ'} field={'edu_inst_name'} />,
            <ItemRecord label={'Адрес УЗ'} field={'edu_inst_address'} />,
            <ItemRecord label={'Факультет'} field={'faculty_name'} />,
            <ItemRecord label={'Форма обучения'} field={'edu_type'} />,
            <ItemRecord label={'Год поступления'} field={'admission_year'} />,
            <ItemRecord label={'Год окончания'} field={'graduate_year'} />,
            <ItemRecord label={'Специальность'} field={'speciality_name'} />,
            <ItemRecord label={'№ диплома'} field={'diploma_num'} />,
            <ItemRecord label={'Научная степень, звание'} field={'degree'} />,
        ];

    useEffect(() => {
        if (groups.includes('Admin') || 
            groups.includes('HumanResource')){
                setButtonEdit(true)
        }
    }, [])

    let {id} = useParams();

    return (
        <ItemDetail getData={getEducation} buttonEdit={buttonEdit && id}>
            {details}
        </ItemDetail>
    )
}

const mapStateToProps = (state) => ({
    ...state.user
})

export default connect(mapStateToProps)(EducationDetail)
