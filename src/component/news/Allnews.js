import React, { useState, useEffect } from 'react'
import { Card, Pagination, FloatButton } from 'antd';
import axios from 'axios'
import { Loading } from '../loading/Loading'
import { useDispatch } from 'react-redux';
import { goDetailedNews, setDNews } from '../../slice/NewsSlice';
import nullNews from './images/nullNews.jpg'
const { Meta } = Card;

export const Allnews = () => {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [newsData, setNewsData] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const setData = async () => {
            setIsLoading(true)
            // const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=880616c94fbb434f9a32afe90ccc70b9&page=${page}`)
            const result = await axios.get(`https://newsdata.io/api/1/news?apikey=pub_328032e8980e4d865f28751b6098f3d5527a7&category=business&country=in&size=10`)
            setNewsData(result.data.results)
            setIsLoading(false)
            console.log("News : ", result.data.results);
        };
        setData()
    }, [page])



    if (isLoading) {
        return (<Loading />)
    }

    return (
        <>
            {/* <div className='row d-flex justify-content-center text-center'>
                {
                    newsData?.map((x, index) => {
                        return (
                            <>
                                <Card
                                    key={index}
                                    style={{ width: 272 }}
                                    cover={
                                        <img
                                            key={index}
                                            alt="example"
                                            src={(x.urlToImage) === null ? nullNews : x.urlToImage}
                                        />
                                    }
                                    className='col-xl-2 col-lg-4 my-3 mx-3'
                                    hoverable
                                    onClick={() => {
                                        dispatch(goDetailedNews())
                                        dispatch(setDNews(x))
                                    }}
                                >
                                    {(x.publishedAt).slice(0, 10)} <br />
                                    {x.source.name}

                                    <Meta
                                        key={index}
                                        title={x.title}
                                        description={(x.description) === null ? "" : (x.description).slice(0, 90)}
                                    />
                                </Card>
                            </>
                        )
                    })
                }
            </div> */}
            <div className='row d-flex justify-content-center text-center'>
                {
                    newsData?.map((x, index) => {
                        return (
                            <>
                                <Card
                                    key={index}
                                    style={{ width: 272 }}
                                    cover={
                                        <img
                                            key={index}
                                            alt="example"
                                            src={(x.image_url) === null ? nullNews : x.image_url}
                                        />
                                    }
                                    className='col-xl-2 col-lg-4 my-3 mx-3'
                                    hoverable
                                    // onClick={() => {
                                    //     dispatch(goDetailedNews())
                                    //     dispatch(setDNews(x))
                                    // }}
                                >
                                    {(x.pubDate).slice(0, 10)} <br />
                                    {x.source_id}

                                    <Meta
                                        key={index}
                                        title={x.title}
                                        description={(x.description) === null ? "" : (x.description).slice(0, 90)}
                                    />
                                </Card>
                            </>
                        )
                    })
                }
            </div>
            <FloatButton.BackTop visibilityHeight={250} style={{ right: 20, bottom: 100 }} />
            <Pagination current={page} total={40} onChange={(p) => { setPage(p); }} />
        </>
    )
}
