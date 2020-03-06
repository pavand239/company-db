import React from 'react'
import {Row, Col} from "react-bootstrap"

const ManyFieldItemRecord = ({item, fieldToDisplay, label=null, className}) => {
    if (!label) {
        return (
            <span className={className}>{fieldToDisplay.map(field=>item[field]).join(' ')}</span>
        )
    } else {
        return ( 
            <Row>
                <Col xs={3}>
                    <span className = {`font-weight-bold ${className}`}>{label}:</span> 
                </Col>
                <Col>
                    <span className = {className}>{fieldToDisplay.map(field=>item[field]).join(' ')}</span>
                </Col>
            </Row>
        )
    }
}
export default ManyFieldItemRecord;