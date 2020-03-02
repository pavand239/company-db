import React from 'react'
import { Spinner } from 'react-bootstrap'

export const LoadingIndicator = () => (
    <div className='d-flex my-3'>
        <Spinner className= 'mx-auto' animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>
)