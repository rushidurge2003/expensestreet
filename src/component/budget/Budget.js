import React from 'react'
import { Result } from 'antd'

export const Budget = () => {
    return (
        <>
            <div className='d-flex justify-content-between'>
                <div><h5>Budget</h5></div>
            </div>
            <Result
                status="403"
                title="Budget featues add in next update"
                // subTitle="Sorry, you are not authorized to access this page."
                // extra={<Button type="primary">Back Home</Button>}
            />
        </>
    )
}
