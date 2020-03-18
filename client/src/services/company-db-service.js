
export default class CompanyDBService {
    getToken = async (username,password)=>{
        if (username==='' || password==='') {
            throw new Error('Введите имя пользователя и пароль')
        } else {
            let response = await fetch('http://localhost:8000/auth/token/login/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body:`username=${username}&password=${password}`
            })
            if (response.ok){
                return response.json()
            } else if (response.status===400) {
                throw new Error('Неверные учетные данные')
            } else {
                throw new Error(`Что-то пошло не так... ${response.status}`)
            }
        }
    }
    destroyToken = async (token) =>{
        let response = await fetch('http://localhost:8000/auth/token/logout/',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':`Token ${token}`
            }
        })
        if (!response.ok){
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    getMe = async (token) =>{
        let response = await fetch('http://localhost:8000/auth/users/me/',{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401) {
            throw new Error('Неверный токен')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    getEmployeeList = async (token, params=null) => {
        let paramString = '';
        if (params && Object.keys(params).length) {
           paramString = '?'+Object.entries(params).map(param=>param.join('=')).join('&');
        }
        let response = await fetch(`http://localhost:8000/api/1.0/employee${paramString}`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для просмотра этого содержимого')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }

    getEmployee = async (token,id) => {
        let response = await fetch(`http://localhost:8000/api/1.0/employee/${id}/`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для просмотра этого содержимого')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    getEmployeeIncome = async (token,id) =>{
        let response = await fetch(`http://localhost:8000/api/1.0/employee/${id}/get_income_last_year`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для просмотра этого содержимого')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    getEmployeeChildren = async (token,id) =>{
        let response = await fetch(`http://localhost:8000/api/1.0/employee/${id}/get_children`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для просмотра этого содержимого')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    getEmployeeEducation = async (token,id) =>{
        let response = await fetch(`http://localhost:8000/api/1.0/employee/${id}/get_education`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для просмотра этого содержимого')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    getIncome = async (token,id) => {
        let response = await fetch(`http://localhost:8000/api/1.0/income/${id}/`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для просмотра этого содержимого')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    getIncomeList = async (token) => {
        let response = await fetch(`http://localhost:8000/api/1.0/income/`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для просмотра этого содержимого')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    getEducation= async (token,id) => {
        let response = await fetch(`http://localhost:8000/api/1.0/education/${id}/`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для просмотра этого содержимого')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    getChild = async (token,id) => {
        let response = await fetch(`http://localhost:8000/api/1.0/child/${id}/`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для просмотра этого содержимого')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    patchEmployee = async (token,id,data) => {
        let response = await fetch(`http://localhost:8000/api/1.0/employee/${id}/`,{
            method:'PATCH',
            headers:{
                'Authorization':`Token ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для изменения')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    patchIncome = async (token,id,data) => {
        let response = await fetch(`http://localhost:8000/api/1.0/income/${id}/`,{
            method:'PATCH',
            headers:{
                'Authorization':`Token ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для изменения')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    patchEducation = async (token,id,data) => {
        let response = await fetch(`http://localhost:8000/api/1.0/education/${id}/`,{
            method:'PATCH',
            headers:{
                'Authorization':`Token ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для изменения')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    patchChild = async (token,id,data) => {
        let response = await fetch(`http://localhost:8000/api/1.0/child/${id}/`,{
            method:'PATCH',
            headers:{
                'Authorization':`Token ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для изменения')
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    createEmployee = async (token, data) => {
        let response = await fetch(`http://localhost:8000/api/1.0/employee/`,{
            method:'POST',
            headers:{
                'Authorization':`Token ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для изменения')
        } else if (response.status===400) {
            console.error(JSON.stringify(response.body))
            throw new Error(`Что-то пошло не так... ${response.status}`)
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
    createIncome = async (token, data) => {
        let response = await fetch(`http://localhost:8000/api/1.0/income/`,{
            method:'POST',
            headers:{
                'Authorization':`Token ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok){
            return response.json()
        } else if (response.status===401 || response.status===403) {
            throw new Error('У вас нет прав для изменения')
        } else if (response.status===400) {
            console.error(JSON.stringify(response.body))
            throw new Error(`Что-то пошло не так... ${response.status}`)
        } else {
            throw new Error(`Что-то пошло не так... ${response.status}`)
        }
    }
}