import React, {useCallback} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {useSelector} from 'react-redux';
import {useGetData} from "../hooks"
import LoadingIndicator from "../loading-indicator";
import { ListGroup } from 'react-bootstrap';


const ItemDetail = ({getData, buttonEdit, children, actionWithItem = null}) => {
    let {id} = useParams(),
        history = useHistory(),
        returnButton = false,
        selectedEmployee = useSelector(state=>state.selectedEmployee);
    const useGetDataCallback = () => {
        let token = localStorage.getItem('token'),
            getDataCallback = useCallback(()=>getData(token,id),[id, token]);
        return useGetData(getDataCallback);
    }
    let {data:item, isLoading, error} = useGetDataCallback();
    if (actionWithItem && typeof(actionWithItem)==='function' ) {
        actionWithItem(item)
    }

    if (isLoading && !error) {
        return <LoadingIndicator />
    }
    if (error) {
        return  error.message
    }
    if (item.employee && selectedEmployee) {
        returnButton=true;
    }
    return (
        <div>
            <div className='d-flex flex-row-reverse'>
                {returnButton? 
                    <i className="fa fa-times p-1" aria-hidden="true" onClick={()=>{history.push(`/${selectedEmployee.id}/`);}}></i>:''
                }
                {buttonEdit && id?
                    <i className="fa fa-cog p-1" aria-hidden="true" onClick={()=>history.push('edit')}></i>:''
                }
            </div>
            <ListGroup>
                    {React.Children.map(children, (child)=>(
                        <ListGroup.Item key={item.id}>
                            {React.cloneElement(child, { item })}
                        </ListGroup.Item>)
                    )}
            </ListGroup>
        </div>
    )

}

export default ItemDetail;