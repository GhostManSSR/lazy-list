import { useEffect, useState } from "react";
import HttpProvider from "@/HttpProvider";
import BlockNews from "@/components/News/BlockNews";
import {News as NewsType, NewsTypeVariant} from "../../../types/News/types";
import {fetchNews} from "@/actions/fetchNews";
import LoadingSpin from "@/components/layout/LoadingSpin";
import styles from "../../../assets/components/News/NewsList/index.module.less"
import Button from "@/components/layout/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Skeleton from "@/components/layout/Skeleton";
import Empty from "@/components/layout/Empty";

type Props = {
    type?: NewsTypeVariant;
    showImage?: boolean;
};

const ListNews: React.FC<Props> = ({type = "news", showImage}) => {
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

                let res;

                if (type === "news") {
                    res = await fetchNews(page, 2);
                } else if (type === "business") {
                    res = await fetchNews(page, 3);
                } else{
                    return;
                }

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
                <h2 className={styles["news-title"]}>{type === "news" ? "Новости компании" : type==="important" ? "Важные новости" : "Бизнес"}</h2>
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
                <Empty />
            )}

            <div className={styles["news-list"]}>
                {!loading &&
                    !error &&
                    news.map((item, index) => (
                        <BlockNews key={item.id} news={item} type={type} showImage={showImage ? index === 0 : false}/>
                    ))}
            </div>

            {!error && news.length !== 0 && (
                <div className={styles["pagination"]}>
                    <Button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1 || loading}
                        classList={["button__pagination"]}
                        icon={FaArrowLeft}
                    />
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
