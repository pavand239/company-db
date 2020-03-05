import React, {useState, useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {Form, Button} from "react-bootstrap" ;
import CompanyDBServiceContext from "../company-db-service-context";
import {withCompanyDBService} from "../hoc";
import {fetchUser} from '../../actions';
import LoadingIndicator from "../loading-indicator";
import { Redirect } from 'react-router-dom';


const LoginPage = ({user, error, isLoading, afterLoginRedirectPath, fetchUser}) => {
    let [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        [errorLogin, setErrorLogin] = useState(''),
        [isTokenLoading, setIsTokenLoading] = useState(false),
        companyDBService = useContext(CompanyDBServiceContext);
    useEffect(() => {
        let localToken=localStorage.getItem('token');
        if (localToken){
            fetchUser(localToken)
        }
    }, [])
    const handlerOnSubmit = (e) =>{
        e.preventDefault();
        setIsTokenLoading(true);
        companyDBService.getToken(username,password)
            .then(data=>{
                setErrorLogin(false);
                localStorage.setItem('token',data.auth_token);
                console.log(fetchUser);
                fetchUser(data.auth_token);
            })
            .catch(error=>{
                setErrorLogin(error.message);
                setIsTokenLoading(false);
            })
    }
    if (isLoading){
        return <LoadingIndicator />
    }
    return (
            <Form className='w-50 mx-auto'>
                {errorLogin?
                    <Form.Text className='text-danger'>
                        {errorLogin}
                    </Form.Text>:''
                }
                {error?
                    <Form.Text className='text-danger'>
                        {error.message}
                        {localStorage.removeItem('token')}
                    </Form.Text>:''
                }
                {user?
                    <Redirect to={afterLoginRedirectPath}/>:''
                }
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Username" 
                                    value={username} 
                                    onChange={e=>setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={e=>setPassword(e.target.value)}/>
                </Form.Group>
                {isTokenLoading?<LoadingIndicator />:
                    <Button variant="primary" type="submit" onClick={handlerOnSubmit}>
                        Submit
                    </Button>}
            </Form>
    )
}

const mapStateToProps = (state)=>({
    ...state.user,
    afterLoginRedirectPath:state.afterLoginRedirectPath
})

const mapDispatchToProps = (dispatch,{companyDBService})=> (
    {
        fetchUser: (token)=>dispatch(fetchUser(companyDBService)(token))
    }
)

export default withCompanyDBService(
                    connect(mapStateToProps, mapDispatchToProps)
                        (LoginPage)
)