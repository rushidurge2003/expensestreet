import React from 'react'
import { useSelector } from 'react-redux'

export const Investment = () => {

    const state = useSelector((state)=>state.InvestmentSliceReducer.screenDisplay)

    return (
        <>
            {state}
        </>
    )
}
