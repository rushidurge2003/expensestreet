import { configureStore } from "@reduxjs/toolkit";
import LoginSliceReducer from '../slice/LoginSlice'
import SignUpSliceReducer from "../slice/SignUpSlice";
import ProfileDetailSliceReducer from "../slice/ProfileDetailSlice";
import RecordSliceReducer from "../slice/RecordSlice";
import ReminderSliceReducer from "../slice/ReminderSlice";
import InvestmentSliceReducer from "../slice/InvestmentSlice";
import NotificationSliceReducer from "../slice/NotificationSlice";

export const store = configureStore({
    reducer: {
        LoginSliceReducer,
        SignUpSliceReducer,
        ProfileDetailSliceReducer,
        RecordSliceReducer,
        ReminderSliceReducer,
        InvestmentSliceReducer,
        NotificationSliceReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: true,
        }),
})

export default store