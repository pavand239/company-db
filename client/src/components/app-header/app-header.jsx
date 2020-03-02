import React from 'react';
import {Navbar, Button} from "react-bootstrap";
import { userLogout } from '../../actions';
import { connect } from 'react-redux';
import { withCompanyDBService } from '../hoc';


const AppHeader = ({user,userLogout}) => (
    <Navbar bg='light' sticky='top'>
        <Navbar.Brand href='/'>
            <h1>Company DB</h1>
        </Navbar.Brand>
        {user?
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: {user.username}
                </Navbar.Text>
                <Button 
                    variant='outline-danger'
                    onClick={userLogout}>Выход</Button>
            </Navbar.Collapse>
        :''}
        {console.log(user)}
    </Navbar>
)

const mapDispatchToProps = (dispatch, {companyDBService}) =>({
    userLogout: async () =>{
                        companyDBService.destroyToken(localStorage.getItem('token'));
                        dispatch(userLogout());
                        localStorage.removeItem('token');
                    }
})

const mapStateToProps = (state) => ({
    ...state.user
})

export default withCompanyDBService(
                    connect(mapStateToProps, mapDispatchToProps)
                        (AppHeader))
