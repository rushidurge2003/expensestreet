import React from 'react'
import {useSelector } from 'react-redux'

export const News = () => {

    const state = useSelector((state)=>state.NewsSliceReducer.screenDisplay)

    return (
        <>
            <div className='d-flex justify-content-center'>
                <div><h5>News</h5></div>
            </div>
            {state}
        </>
    )
}
