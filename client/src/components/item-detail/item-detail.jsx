import React, {useCallback} from 'react';
import {withRouter} from "react-router-dom";

import {useGetData} from "../hooks"
import LoadingIndicator from "../loading-indicator";
import { ListGroup } from 'react-bootstrap';


const ItemDetail = ({getData, match, children}) => {
    let {id} = match.params;
    const useGetDataCallback = () => {
        let token = localStorage.getItem('token'),
            getDataCallback = useCallback(()=>getData(token,id),[id, token]);
        return useGetData(getDataCallback);
    }
    let {data, isLoading, error} = useGetDataCallback();
    console.log(data)
    if (!id){
        return <h3>Выберите работника из списка</h3>
    }
    if (isLoading && !error) {
        return <LoadingIndicator />
    }
    if (error) {
        return  error.message
    }
    return (
        <div>
            <ListGroup>
                    {React.Children.map(children, (child)=>(
                        <ListGroup.Item>
                            {React.cloneElement(child, { data })}
                        </ListGroup.Item>)
                    )}
            </ListGroup>
        </div>
    )

}

export default withRouter(ItemDetail);