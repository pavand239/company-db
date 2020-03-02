import React from 'react';

export const EmployeeListItem = ({employee, onSelectItem}) => {
        let {surname, name, patronymic} = employee;
        return(
            <span >
                {surname} {name} {patronymic}
            </span>
        )
}

