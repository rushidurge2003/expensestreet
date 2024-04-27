import { createSlice } from "@reduxjs/toolkit";
import { Allnews } from "../component/news/Allnews";
import { DetailedNews } from "../component/news/DetailedNews";

const initialState = {
    screenDisplay: <Allnews />,
    setData: []
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
        }
    }
})

export const { backAllNews, goDetailedNews, setDNews } = NewsSlice.actions
export default NewsSlice.reducer