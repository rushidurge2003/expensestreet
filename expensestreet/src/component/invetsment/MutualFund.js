import React from 'react'
import { useDispatch } from 'react-redux'
import { backDisplayInevstment } from '../../slice/InvestmentSlice'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';

export const MutualFund = () => {

    const dispatch = useDispatch()

    return (
        <>
            <div className='d-flex justify-content-between'>
                <div className='d-flex justify-content-between'>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => { dispatch(backDisplayInevstment()) }} />
                    <div style={{ marginLeft: 10 }}><h5>Mutual Fund</h5></div>
                </div>
            </div>
        </>
    )
}
