import { useEffect, useState } from "react";
import HttpProvider from "@/HttpProvider";
import BlockNews from "@/components/News/BlockNews";
import { News as NewsType } from "../../../types/News/types";
import {fetchNews} from "@/actions/fetchNews";
import Loading from "@/asserts/components/layout/Loading";
import LoadingSpin from "@/components/layout/LoadingSpin";
import styles from "../../../asserts/components/News/NewsList/index.module.less"
import Button from "@/components/layout/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Skeleton from "@/components/layout/Skeleton";

const ListNews: React.FC = () => {
    const [news, setNews] = useState<NewsType[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [date, setDate] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetchNews(page);

                setNews(res.news);
                setDate(res.minDatePublication);
                setTotalPages(res.totalPages);
            } catch (e) {
                setError("Не удалось загрузить новости");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [page]);

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
                <h2>Новости компании</h2>
                {date && <span>{formatPrettyDate(date)}</span>}
            </div>

            {loading && (
                <div className={styles["news-loader"]}>
                    <Skeleton />
                    <LoadingSpin/>
                </div>
            )}

            {error && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && news.length === 0 && (
                <div className="empty">
                    <p>Новостей пока нет</p>
                </div>
            )}

            <div className={styles["news-list"]}>
                {!loading &&
                    !error &&
                    news.map((item) => (
                        <BlockNews key={item.id} news={item} />
                    ))}
            </div>

            {!error && (
                <div className={styles["pagination"]}>
                    <Button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1 || loading}
                        classList={["button__pagination"]}
                        icon={FaArrowLeft}
                    />

                    <span className={styles["pagination-pages"]}>
                        {page} / {totalPages}
                    </span>

                    <Button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page === totalPages || loading}
                        classList={["button__pagination"]}
                        icon={FaArrowRight}
                   />
                </div>
            )}
        </div>
    );
};

export default ListNews;
