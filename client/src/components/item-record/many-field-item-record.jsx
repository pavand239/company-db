import React from 'react'
import {Row, Col} from "react-bootstrap"

const ManyFieldItemRecord = ({item, fieldToDisplay, label=null}) => {
    if (!label) {
        return (
            <span>{fieldToDisplay.map(field=>item[field]).join(' ')}</span>
        )
    } else {
        return ( 
            <Row>
                <Col xs={3}>
                    <span className = 'font-weight-bold'>{label}:</span> 
                </Col>
                <Col>
                    <span>{fieldToDisplay.map(field=>item[field]).join(' ')}</span>
                </Col>
            </Row>
        )
    }
}
export default ManyFieldItemRecord;