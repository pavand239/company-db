import React from 'react'
import {Row, Col} from "react-bootstrap"

const ItemRecord = ({data, field, label}) => {
    return ( 
        <Row>
            <Col xs={3}>
                <span className = 'font-weight-bold'>{label}:</span> 
            </Col>
            <Col>
                <span>{data[field]}</span>
            </Col>
        </Row>
    )
}
export default ItemRecord