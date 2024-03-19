import React from 'react'
import { Result } from 'antd'

export const News = () => {
    return (
        <>
            <div className='d-flex justify-content-between'>
                <div><h5>News</h5></div>
            </div>
            <div>
                <Result
                    status="403"
                    title="News features update in soon"
                    // subTitle="Sorry, you are not authorized to access this page."
                />
            </div>
        </>
    )
}
