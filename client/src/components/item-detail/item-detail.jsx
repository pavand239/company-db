import React, {useCallback} from 'react';
import {useParams} from "react-router-dom";

import {useGetData} from "../hooks"
import LoadingIndicator from "../loading-indicator";
import { ListGroup } from 'react-bootstrap';


const ItemDetail = ({getData, children}) => {
    let {id} = useParams();
    const useGetDataCallback = () => {
        let token = localStorage.getItem('token'),
            getDataCallback = useCallback(()=>getData(token,id),[id, token]);
        return useGetData(getDataCallback);
    }
    let {data:item, isLoading, error} = useGetDataCallback();

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
                    {React.Children.map(children, (child, idx)=>(
                        <ListGroup.Item key={item.id}>
                            {React.cloneElement(child, { item })}
                        </ListGroup.Item>)
                    )}
            </ListGroup>
        </div>
    )

}

export default ItemDetail;