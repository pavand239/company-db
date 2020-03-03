import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

// all fields
// 'id','employee','income_date','percent','premium','tax','salary','total'
// fields edit by Accountig
// [income_date,percent]
// fields edit by chief
// [premium]
const EmployeeIncomeTableRow = ({income, user:{user:{groups}}}) => {
    let [isEditing, setIsEditing] = useState(false),
        [incomeDate, setIncomeDate] = useState(''),
        [percent, setPercent] = useState(0),
        [premium, setPremium] = useState(0),
        {salary, total, tax} = income;
    useEffect(()=>{
        setIncomeDate(income.income_date);
        setPercent(income.percent);
        setPremium(income.premium);
    })
    if (isEditing){
        if (groups.includes('Accounting')){
            return (
                <tr>
                    <Form>
                        <td>
                            <Form.Control size='sm'
                                type='text' 
                                value={incomeDate} 
                                onChange={(e)=>setIncomeDate(e.target.value)}/>
                        </td>
                        <td>{salary}</td>
                        <td><Form.Control size='sm'
                                type='text' 
                                value={percent} 
                                onChange={(e)=>setPercent(e.target.value)} />
                        </td>
                        <td>{premium}</td>
                        <td>{(salary*(1+percent)+premium)*(1-tax)}</td>
                        <td>
                            <Button><i className="fas fa-check text-succes"></i></Button>
                            <Button onClick={()=>setIsEditing(false)}><i className="fas fa-times text-danger"></i></Button>
                        </td>
                    </Form>
                </tr>
            )
        }
    } else {
        return (
            <tr>
                <td>{incomeDate}</td>
                <td>{salary}</td>
                <td>{percent}</td>
                <td>{premium}</td>
                <td>{total}</td>
                <td><Button><i className="fas fa-edit text-dark"></i></Button></td>
            </tr>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.user
})

export default connect(mapStateToProps)(EmployeeIncomeTableRow)
