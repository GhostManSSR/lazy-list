import { AppDispatch, RootState } from "../store";
import { fetchNews } from "@/actions/fetchNews";
import { setPageData, setLoading } from "../slices/newsSlice";
import { NewsTypeVariant } from "@/types/News/types";

export const fetchNewsThunk = (type: NewsTypeVariant, page: number, perPage: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {

            if(type === "important") return;

            const cached = getState().news.cache?.[type]?.[page];

            if (cached) return;

            try {
                dispatch(setLoading(true));

                const data = await fetchNews(page, perPage);

                dispatch(
                    setPageData({
                        type,
                        page,
                        data,
                    })
                );
            } finally {
                dispatch(setLoading(false));
            }
};