import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';

import CompanyDBServiceContext from "../company-db-service-context";
import ItemDetail from "../item-detail";
import ItemRecord, {AsyncItemRecord} from "../item-record";
import { useParams, useHistory} from "react-router-dom"

// all fields
// 'id','employee','income_date','percent','premium','tax','salary','total'
// fields edit by Accountig
// [income_date,percent]
// fields edit by chief
// [premium]

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

    let history = useHistory(),
        {id} = useParams();

    return (
        <div>
            <div className='d-flex flex-row-reverse'>
                {buttonEdit && id?
                    <i className="fa fa-cog p-1" aria-hidden="true" onClick={()=>history.push('edit')}></i>:''
                }
            </div>
            <ItemDetail getData={getEducation}>
                {details}
            </ItemDetail>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.user
})

export default connect(mapStateToProps)(EducationDetail)
