import React from 'react';
import './image-record.css';

export const ImageRecord = ({alt, item, field}) =>(
    <div className='d-flex justify-content-center image-record'>
        <img alt={alt} src={item[field]} />
    </div>
)