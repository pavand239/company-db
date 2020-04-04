import React from 'react';
import "./employee-list-item.css";
export const EmployeeListItem = ({employee, onSelectItem}) => {
        const {surname, name, patronymic, birth_date, department, position} = employee;
        let birthDate = new Date(birth_date);
        return(
            <div className='employee-list-item'>
                <p className='lead'>{surname} {name} {patronymic}</p>
                <p className='small'>{birthDate.toLocaleDateString()} - {department} - {position}</p>
            </div>
        )
}

