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
