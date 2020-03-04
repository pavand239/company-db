import React, { useContext } from 'react'
import CompanyDBServiceContext from "../company-db-service-context"
import EmployeeDetailAdditionalTable from "../employee-detail-additional-table"

// const {
//     getEmployeeIncome,
//     getEmployeeChildren,
//     getEducationEducation
// } = useContext(CompanyDBServiceContext);

export const EmployeeIncomeTable = () => {
    const {getEmployeeIncome} = useContext(CompanyDBServiceContext);
    return <EmployeeDetailAdditionalTable getData = {getEmployeeIncome}
                tableLabel={'Доходы'}
                fields = {['income_date','salary','percent','premium','total']}
                labels = {["Дата","Оклад","Процент","Премия","Всего"]} />
}
export const EmployeeEducationTable = () => {
    const {getEmployeeEducation} = useContext(CompanyDBServiceContext);
    return <EmployeeDetailAdditionalTable getData = {getEmployeeEducation}
                tableLabel={'Образование'}
                fields = {['edu_inst_name','edu_inst_address','edu_type','admission_year',
                            'graduate_year','speciality_name','diploma_num','degree']}
                labels = {["УЗ","Адрес УЗ","Форма обучения","Год поступления",
                            "Год окончания","Специальность","№ диплома", "Научная степень, звание"]} />
}
export const EmployeeChildrenTable = () => {
    const {getEmployeeChildren} = useContext(CompanyDBServiceContext);
    return <EmployeeDetailAdditionalTable getData = {getEmployeeChildren}
                tableLabel={'Дети'}
                fields = {['surname','name','patronymic','birth_date']}
                labels = {["Фамилия","Имя","Отчество","Дата рождения"]} />
}