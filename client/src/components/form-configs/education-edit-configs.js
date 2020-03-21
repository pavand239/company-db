import * as fields from "./form-fields";
import * as Yup from "yup";

export const EducationEditConfig = {
    formName: 'Редактирование информации об образовании сотрудника',
    getInitialValues:   (data)=>({
                            ...data
                        }),
    validationSchema: Yup.object().shape({
        employee:Yup.number()
            .required('Необходимое поле'),
        edu_inst_name:Yup.string()
            .min(2,'Минимальная длина 2 символа')
            .max(200,'Максимальная длина 200 символов')
            .required('Необходимое поле'),
        edu_inst_name:Yup.string()
            .min(2,'Минимальная длина 2 символа')
            .max(200,'Максимальная длина 200 символов')
            .required('Необходимое поле'),
        edu_type: Yup.string()
            .required('Необходимое поле'),
        admission_year: Yup.number()
            .min(1900,'Минимальный год - 1900')
            .max(new Date().getFullYear(),'Неверный год')
            .required('Необходимое поле'),
        graduate_year: Yup.number()
            .min(1900,'Минимальный год - 1900')
            .max(new Date().getFullYear(),'Неверный год'),
        faculty_name: Yup.string()
            .max(100,'Максимальная длина 100'),
        speciality_name: Yup.string()
            .max(100,'Максимальная длина 100'),
        diploma_num: Yup.string()
            .max(25,'Максимальная длина 25'),
        degree: Yup.string()
            .max(100,'Максимальная длина 100'),
    }),
    deletePerm:true,
    formFields:[
        fields.employeeField(false),
        fields.eduInstNameField(false),
        fields.eduInstAddressField(false),
        fields.facultyField(false),
        fields.eduTypeField(false),
        fields.admYearField(false),
        fields.gradYearField(false),
        fields.specialityField(false),
        fields.diplomaNumField(false),
        fields.degreeField(false)
    ]
}