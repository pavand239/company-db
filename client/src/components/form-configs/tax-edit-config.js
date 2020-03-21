import * as fields from "./form-fields"
import * as Yup from "yup";

export const TaxEditConfig = {
    formName:'Редактирование ставки НДФЛ',
    getInitialValues:   (data)=>({
                            value:data.value
                        }),
    validationSchema: Yup.object().shape({
        value: Yup.number()
            .min(0,'Миниамльное значение 0')
            .max(1,'Максимальное значение 1')
}),
    formFields:[
        fields.taxNameField(),
        fields.taxValueField(false)
    ]
}