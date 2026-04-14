import { useEffect, useState } from "react";
import BlockNews from "@/components/News/BlockNews";
import Button from "@/components/layout/Button";
import Skeleton from "@/components/layout/Skeleton";
import LoadingSpin from "@/components/layout/LoadingSpin";
import Empty from "@/components/layout/Empty";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { NewsTypeVariant } from "@/types/News/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNewsThunk } from "@/store/thunks/fetchNewsThunk";

import styles from "../../../assets/components/News/NewsList/index.module.less";

type Props = {
    type?: NewsTypeVariant;
    showImage?: boolean;
};

const getPerPage = (type: NewsTypeVariant) => {
    switch (type) {
        case "news":
            return 2;
        case "business":
            return 3;
        case "important":
            return 2;
        default:
            return 2;
    }
};

const ListNews: React.FC<Props> = ({ type = "news", showImage }) => {
    const dispatch = useAppDispatch();

    const [page, setPage] = useState<number>(1);

    const cached = useAppSelector(
        (state) => state.news.cache?.[type]?.[page]
    );

    const loading = useAppSelector((state) => state.news.loading);

    const news = cached?.news ?? [];
    const totalPages = cached?.totalPages ?? 1;
    const date = cached?.minDatePublication ?? null;

    useEffect(() => {
        dispatch(fetchNewsThunk(type, page, getPerPage(type)));
    }, [dispatch, type, page]);

    const formatPrettyDate = (dateString?: string | null) => {
        if (!dateString) return "";

        const date = new Date(dateString);
        const month = date.toLocaleString("ru-RU", { month: "long" });
        const year = date.getFullYear();

        return `${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
    };

    return (
        <div className={styles["news-container"]}>
            <div className={styles["news-header"]}>
                <h2 className={styles["news-title"]}>
                    {type === "news"
                        ? "Новости компании"
                        : type === "important"
                            ? "Важные новости"
                            : "Бизнес"}
                </h2>

                {date && <span>{formatPrettyDate(date)}</span>}
            </div>

            {loading && (
                <div className={styles["news-loader"]}>
                    <Skeleton />
                    <LoadingSpin />
                </div>
            )}

            {!loading && news.length === 0 && <Empty />}

            <div className={styles["news-list"]}>
                {!loading &&
                    news.map((item, index) => (
                        <BlockNews
                            key={item.id}
                            news={item}
                            type={type}
                            showImage={showImage ? index === 0 : false}
                        />
                    ))}
            </div>

            {!loading && news.length > 0 && (
                <div className={styles["pagination"]}>
                    <Button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1}
                        classList={["button__pagination"]}
                        icon={FaArrowLeft}
                    />
                    <Button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page === totalPages}
                        classList={["button__pagination"]}
                        icon={FaArrowRight}
                    />
                </div>
            )}
        </div>
    );
};

export default ListNews;
