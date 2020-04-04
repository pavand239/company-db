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
    label:'Номер паспорта',
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
    options:['---','Негативное','Нейтральное','Позитивное'],
    optionsValues:['','neg','neu','pos']
});
export const maritalStatusField = (readOnly=true) => ({
    name:'marital_status',
    label:'Семейное положение',
    readOnly: readOnly,
    element:'select',
    options:['---','Не женат/не замужем','Женат/замужем'],
    optionsValues:['','n','y']
});
export const genderField = (readOnly=true) => ({
    name:'gender',
    label:'Пол',
    readOnly: readOnly,
    element:'select',
    options:['---','Мужской', 'Женский'],
    optionsValues:['','m','f']
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
    type:'number',
    step:'0.01',
    min:'0',
    max:'1'
});
export const premiumField = (readOnly=true) => ({
    name:'premium',
    label:'Премия',
    readOnly: readOnly,
    type:'number',
    step:'1'
});
export const taxField = () => ({
    name:'tax',
    label:'НДФЛ',
    readOnly: true,
    type:'number',
});
export const totalField = (readOnly=true) => ({
    name:'total',
    label:'Итого',
    readOnly: readOnly,
    type:'number'
});
export const employeeField = (readOnly=true, multiple=false) => ({
    name:'employee',
    label:'Работник',
    readOnly: readOnly,
    element:'asyncSelect',
    multiple:multiple,
    labelKeys:['surname','name','patronymic'],
    getData:'getEmployeeList'
});
export const eduInstNameField = (readOnly=true) => ({
    name:'edu_inst_name',
    label:'Наименование УЗ',
    readOnly: readOnly,
    type:'text'
});
export const eduInstAddressField = (readOnly=true) => ({
    name:'edu_inst_address',
    label:'Адрес УЗ',
    readOnly: readOnly,
    type:'text'
});
export const eduTypeField = (readOnly=true) => ({
    name:'edu_type',
    label:'Форма обучения',
    readOnly: readOnly,
    element:'select',
    options:['---','Очная', 'Заочная'],
    optionsValues:['','ft','pt']
});
export const admYearField = (readOnly=true) => ({
    name:'admission_year',
    label:'Год поступления',
    readOnly: readOnly,
    type:'number',
    min:1900,
    max:new Date().getFullYear()
});
export const gradYearField = (readOnly=true) => ({
    name:'graduate_year',
    label:'Год выпуска',
    readOnly: readOnly,
    type:'number',
    min:1900,
    max:new Date().getFullYear()
});
export const facultyField = (readOnly=true) => ({
    name:'faculty_name',
    label:'Факультет',
    readOnly: readOnly,
    type:'text'
});
export const specialityField = (readOnly=true) => ({
    name:'speciality_name',
    label:'Специальность',
    readOnly: readOnly,
    type:'text'
});
export const diplomaNumField = (readOnly=true) => ({
    name:'diploma_num',
    label:'Номер диплома',
    readOnly: readOnly,
    type:'text'
});
export const degreeField = (readOnly=true) => ({
    name:'degree',
    label:'Научная степень, звание',
    readOnly: readOnly,
    type:'text'
});

export const searchField = () => ({
    name:'search',
    label:'Поиск',
    type:'text'
})

export const taxValueField = (readOnly=true) => ({
    name:'value',
    label:'Значение',
    readOnly: readOnly,
    type:'number',
    step:'0.01',
    min:'0',
    max:'1'
})
export const taxNameField = (readOnly=true) => ({
    name:'name',
    label:'Наименование',
    readOnly: readOnly,
})