import { createSlice } from "@reduxjs/toolkit";
import { Allnews } from "../component/news/Allnews";
import { DetailedNews } from "../component/news/DetailedNews";

const initialState = {
    screenDisplay: <Allnews />,
    setData: [],
    pageBackId: [
        { page: 2, id: 0 },
        { page: 3, id: 0 },
        { page: 4, id: 0 },
        { page: 5, id: 0 },
    ]
}

const NewsSlice = createSlice({
    name: "newsSlice",
    initialState,
    reducers: {
        backAllNews(state) {
            state.screenDisplay = <Allnews />
        },
        goDetailedNews(state) {
            state.screenDisplay = <DetailedNews />
        },
        setDNews(state, actions) {
            state.setData = actions.payload
        },
        setPageID(state,actions) {
            state.pageBackId[actions.payload.no].id = actions.payload.id
        }
    }
})

export const { backAllNews, goDetailedNews, setDNews, setPageID } = NewsSlice.actions
export default NewsSlice.reducer