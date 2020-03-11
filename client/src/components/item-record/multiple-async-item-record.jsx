import React, { useCallback} from 'react';
import { Row, Col, ListGroup } from "react-bootstrap";
import AsyncItemRecord from "./async-item-recod"

export const MultipleAsyncItemRecord=({getData, field, item, fieldToDisplay,label})=>{
    let records=item[field].map((id)=>(
        <ListGroup.Item>
            <AsyncItemRecord 
                        id={id}
                        getData={getData}
                        fieldToDisplay={fieldToDisplay} />
        </ListGroup.Item>
    ))
    return ( 
        <Row>
            <Col xs={3}>
                <span className = 'font-weight-bold'>{label}:</span> 
            </Col>
            <Col>
                <ListGroup>
                    {records}
                </ListGroup>
            </Col>
        </Row>
    )
}