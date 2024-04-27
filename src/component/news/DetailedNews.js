import React from 'react'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { backAllNews } from '../../slice/NewsSlice';
import { Link } from 'react-router-dom'
import nullNews from './images/nullNews.jpg'

export const DetailedNews = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.NewsSliceReducer.setData)
    console.log("Detailed News", state);
    return (
        <>
            <div style={{ display: "flex", justifyContent: "start", position: "relative", bottom: 35 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => { dispatch(backAllNews()) }} />
            </div>
            <div style={{ marginTop: 0, marginBottom: 30 }}>
                <h3>{state.title}</h3>
            </div>
            <div>
                <div className='row'>
                    <div className='col-6'>
                        <img src={(state.urlToImage) === null ? nullNews : state.urlToImage} style={{ width: 500 }} />
                    </div>
                    <div className='col-6'>
                        Date : {(state.publishedAt).slice(0, 10)} <br />
                        Source : <b>{state.source.name}</b> <br />
                        Author : <b>{state.author}</b><br /><br /><br />
                        <h5>{(state.description) === null ? "" : (state.description).slice(0, 90)}</h5>
                    </div>
                </div>
                <div style={{ marginTop: 30 }}>
                    <h6><strong>{(state.content) === null ? "" : (state.content).slice(0, 200)}</strong><Link target='blank' to={state.url}><Button type="text">Read More</Button></Link><span></span></h6>
                </div>
            </div>
        </>
    )
}
