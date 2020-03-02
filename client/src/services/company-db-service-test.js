export default class CompanyDBServiceTest {
    test_employees_list = [
        {"id":1,"income":[1,3,4,5,6],"children":[1],"education":[1],"surname":"Иванов","name":"Иван","patronymic":"Иванович","birth_date":"1980-11-30","birth_place":"Чебоксары","sex":"m","department":"Информационных технологий","position":"Старший специалист","attitude_to_conscription":"neu","marital_status":"y","passport_series":"9710","passport_ID":"234135","address":"Чебоксары, пр. Ленина 20, 3","salary":40000.0},
        {"id":2,"income":[],"children":[],"education":[],"surname":"Петров","name":"Петр","patronymic":"Петрович","birth_date":"1993-03-17","birth_place":"Чебоксары","sex":"m","department":"Информационных технологий","position":"Специалист","attitude_to_conscription":"neu","marital_status":"n","passport_series":"9712","passport_ID":"123121","address":"Чебоксары, пр. Ленина 27, 2","salary":35000.0}
    ]
    test_child_data = [
        {"id":1,"surname":"Иванов","name":"Александр","patronymic":"Иванович","birth_date":"2007-10-10","employee":[1]}
    ]
    test_education_data = [
        {"id":1,"edu_inst_name":"ЧГУ им. И.Н. Ульянова","edu_inst_address":"Чебоксары, Московский п-т 15","edu_type":"ft","admission_year":2002,"graduate_year":2007,"speciality_name":"Информатика и вычислительная техника","diploma_num":"123456","degree":"специалист","employee":1}
    ]
    test_income_data = [
        { "id": 1, "tax": 0.13, "percent": "0.10", "premium": 10000.0, "income_date": "2019-10-15", "employee": 1 },
        { "id": 3, "tax": 0.13, "percent": "0.15", "premium": 10000.0, "income_date": "2019-11-15", "employee": 1 }, 
        { "id": 4, "tax": 0.13, "percent": "1.00", "premium": 0.0, "income_date": "2019-12-15", "employee": 1 }, 
        { "id": 5, "tax": 0.13, "percent": "-0.10", "premium": 0.0, "income_date": "2020-01-15", "employee": 1 }, 
        { "id": 6, "tax": 0.13, "percent": "0.15", "premium": 10000.0, "income_date": "2020-02-15", "employee": 1 }
    ]

    timeout = (obj) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.9) {
                    reject(new Error('Something went wrong!'));
                } else {
                    resolve(obj);
                }
            },500)
        })
    }
    getEmployeeList = async () => {
        return this.timeout(this.test_employees_list)
    }
    getEmployee = async (id) => {
        return this.timeout(this.test_employees_list[id-1])
    }
    getChildrenList = async () => {
        return this.timeout(this.test_children_list)
    }
    getChild = async (id) => {
        return this.timeout(this.test_children_list[id-1])
    }
    getEducationList = async () => {
        return this.timeout(this.test_education_list)
    }
    getEducation = async (id) => {
        return this.timeout(this.test_education_list[id-1])
    }
    getIncomeList = async () => {
        return this.timeout(this.test_income_list)
    }
    getIncome = async (id) => {
        return this.timeout(this.test_income_list[id-1])
    }
}