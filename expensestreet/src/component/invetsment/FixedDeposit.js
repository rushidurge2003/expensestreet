import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { backDisplayInevstment } from '../../slice/InvestmentSlice'
import { Button, Modal } from 'antd'
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';

export const FixedDeposit = () => {

    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='d-flex justify-content-between'>
                <div className='d-flex justify-content-between'>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => { dispatch(backDisplayInevstment()) }} />
                    <div style={{ marginLeft: 10 }}><h5>Fixed Deposit</h5></div>
                </div>
                <Button onClick={showModal} icon={<PlusOutlined />} />
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}
