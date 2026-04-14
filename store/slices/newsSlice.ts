import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchNewsResponse, NewsTypeVariant, News } from "@/types/News/types";

type PageCache = {
    news: News[];
    minDatePublication: string;
    totalPages: number;
};

type NewsState = {
    cache: Record<string, Record<number, PageCache>>;
    loading: boolean;
};

const initialState: NewsState = {
    cache: {},
    loading: false,
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        setPageData(
            state,
            action: PayloadAction<{
                type: NewsTypeVariant;
                page: number;
                data: FetchNewsResponse;
            }>
        ) {
            const { type, page, data } = action.payload;

            if (!state.cache[type]) {
                state.cache[type] = {};
            }

            state.cache[type][page] = {
                news: data.news,
                minDatePublication: data.minDatePublication,
                totalPages: data.totalPages,
            };
        },
    },
});

export const { setLoading, setPageData } = newsSlice.actions;
export default newsSlice.reducer;
