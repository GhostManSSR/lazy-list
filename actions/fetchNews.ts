import HttpProvider from "@/HttpProvider";
import { FetchNewsResponse } from "@/types/News/types";

const PER_PAGE = 3;

export const fetchNews = async (
    pageNumber: number,
    perPage: number = PER_PAGE
): Promise<FetchNewsResponse> => {
    const res = await HttpProvider.get<FetchNewsResponse>(
        `/api/news?page=${pageNumber}&perPage=${perPage}`
    );

    return {
        news: res.news || [],
        minDatePublication: res.minDatePublication,
        totalPages: res.totalPages,
    };
};
