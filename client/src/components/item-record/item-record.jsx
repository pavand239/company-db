import React from 'react'

const Record = ({data, field, label}) => {
    return <span><span className = 'font-weight-bold'>{label}:</span> {data[field]}</span>
}
export default Record