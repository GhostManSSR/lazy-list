import { configureStore, combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./slices/newsSlice";
import { newsMiddleware } from "./middleware/newsMiddleware";

const rootReducer = combineReducers({
    news: newsReducer,
});

export const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(newsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;