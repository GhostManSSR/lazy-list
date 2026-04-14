import HttpProvider from "@/HttpProvider";
import {FetchNewsResponse} from "@/types/News/types";

const PER_PAGE = 3;

export const fetchNews = async (
    pageNumber: number
): Promise<FetchNewsResponse> => {
    const res = await HttpProvider.get<FetchNewsResponse>(
        `http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed/company/short?perPage=${PER_PAGE}&page=${pageNumber}`
    );

    return {
        news: res.news || [],
        minDatePublication: res.minDatePublication,
        totalPages: res.totalPages,
    };
};