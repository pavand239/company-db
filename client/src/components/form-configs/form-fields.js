export const surnameField = (readOnly=true)=> ({
    name:'surname',
    label:'Фамилия',
    readOnly: readOnly,
    type:'text'
});
export const nameField = (readOnly=true) => ({
    name:'name',
    label:'Имя',
    readOnly: readOnly,
    type:'text'
});
export const patronymicField = (readOnly=true)=> ({
    name:'patronymic',
    label:'Отчество',
    readOnly: readOnly,
    type:'text'
});
export const birthDateField = (readOnly=true) => ({
    name:'birth_date',
    label:'Дата рождения',
    readOnly: readOnly,
    type:'date'
});
export const birthPlaceField = (readOnly=true) => ({
    name:'birth_place',
    label:'Место рождения',
    readOnly: readOnly,
    type:'text'
});

export const departmentField =(readOnly=true)=> ({
    name:'department',
    label:'Отдел',
    readOnly: readOnly,
    type:'text'
});
export const positionField = (readOnly=true) => ({
    name:'position',
    label:'Должность',
    readOnly: readOnly,
    type:'text'
});
export const passportSeriesField = (readOnly=true) => ({
    name:'passport_series',
    label:'Серия паспорта',
    readOnly: readOnly,
    type:'text'
});
export const passportIDField = (readOnly=true) => ({
    name:'passport_ID',
    label:'Номер пасспорта',
    readOnly: readOnly,
    type:'text'
});
export const addressField = (readOnly=true) => ({
    name:'address',
    label:'Адрес',
    readOnly: readOnly,
    type:'text'
});
export const salaryField = (readOnly=true) => ({
    name:'salary',
    label:'Оклад',
    readOnly: readOnly,
    type:'number'
});
export const attToConsField = (readOnly=true) => ({
    name:'attitude_to_conscription',
    label:'Отношение к воинской обязанности',
    readOnly: readOnly,
    element:'select',
    options:['Негативное','Нейтральное','Позитивное'],
    optionsValues:['neg','neu','pos']
});
export const maritalStatusField = (readOnly=true) => ({
    name:'marital_status',
    label:'Семейное положение',
    readOnly: readOnly,
    element:'select',
    options:['Не женат/не замужем','Женат/замужем'],
    optionsValues:['y','n']
});
export const genderField = (readOnly=true) => ({
    name:'gender',
    label:'Пол',
    readOnly: readOnly,
    element:'select',
    options:['Мужской', 'Женский'],
    optionsValues:['m','f']
});
export const incomeDateField = (readOnly=true) => ({
    name:'income_date',
    label:'Дата получения',
    readOnly: readOnly,
    type:'date'
});
export const percentField = (readOnly=true) => ({
    name:'percent',
    label:'Процент',
    readOnly: readOnly,
    type:'number'
});
export const premiumField = (readOnly=true) => ({
    name:'premium',
    label:'Премия',
    readOnly: readOnly,
    type:'number'
});
export const totalField = (readOnly=true) => ({
    name:'total',
    label:'Итого',
    readOnly: readOnly,
    type:'number'
});
export const employeeField = (readOnly=true) => {
    return {
        name:'employee',
        label:'Работник',
        readOnly: readOnly,
        element:'asyncSelect',
        labelKeys:['surname','name','patronymic'],
        getData:'getEmployeeList'
    }};