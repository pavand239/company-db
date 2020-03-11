import * as fields from "./form-fields"
import * as Yup from "yup";

export const ChildEditConfig = {
    formName:'Редактирование информации о ребенке сотрудника',
    getInitialValues:   (data)=>({
                            ...data
                        }),
    validationSchema: Yup.object().shape({
        employee:Yup.array(Yup.number())
            .max(2,'Максимальное число родителей из работников - 2')
            .required('Необходимое поле'),
        surname:Yup.string()
            .min(2,'Минимальная длина 2 символа')
            .max(100,'Максимальная длина 100 символов')
            .required('Необходимое поле'),
        name:Yup.string()
            .min(2,'Минимальная длина 2 символа')
            .max(100,'Максимальная длина 100 символов')
            .required('Необходимое поле'),
        patronymic: Yup.string()
        .min(2,'Минимальная длина 2 символа')
        .max(100,'Максимальная длина 100 символов')
    }),
    formFields:[
        fields.employeeField(false, true),
        fields.surnameField(false),
        fields.nameField(false),
        fields.patronymicField(false)
    ]
}