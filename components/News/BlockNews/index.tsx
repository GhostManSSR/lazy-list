import {getImageUrl} from "@/HttpProvider";
import Image from "@/components/Image";
import ImageNext from "next/image";
import styles from "../../../assets/components/News/NewsBlock/index.module.less"
import { FcLike } from "react-icons/fc";
import { GrView } from "react-icons/gr";
import { News as NewsBlockProps } from "@/types/News/types";
import { NewsTypeVariant } from "@/types/News/types";

type Props = {
    news: NewsBlockProps;
    type?: NewsTypeVariant;
    showImage?: boolean;
};

const BlockNews: React.FC<Props> = ({ news, type = "news", showImage }) => {
    const rawImage = news.cover.images?.[0]?.hd;

    const image = rawImage
        ? getImageUrl(rawImage)
        : "/placeholder.png";

    const rubric = news.rubrics?.[0]?.name;

    const directions = news.directions?.[0]?.name;

    const formatDate = (dateString: string) => {
        const formatted = new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(dateString));

        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };

    console.log(type)

    if(type === "business") {
        return(
            <div className={styles.business__block}>
                {showImage && <div>
                    <Image src={image} alt={news.title} className={styles.business__img} />
                </div>}
                <div className={styles.news__help}>
                    <h3 className={styles.news__label}>{news.title}</h3>
                    <div className={styles.business__metric}>
                        <div className={styles["news__metric__block"]}>
                            {directions && <span className={styles.business__metric__directions}>#{directions}</span>}
                            {rubric && <span className={styles.business__metric__rubric}>#{rubric}</span>}
                        </div>
                        <span className={styles.business__metric__point}></span>
                        <div>
                            <span className={styles.business__date}>{formatDate(news.publishedAt)}</span>
                        </div>
                        <span className={styles.business__metric__point}></span>
                        <div className={styles["news__metric__block"]}>
                            <span className={styles["news__metric__block-item"]}><ImageNext
                                src="/like.png"
                                alt="like"
                                width={16}
                                height={17}
                            />{news.likeCount}</span>
                            <span className={styles["news__metric__block-item"]}><GrView/>{news.viewCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.news__block}>
            <div>
                <Image src={image} alt={news.title} className={styles.news__img} />
            </div>
            <div className={styles.news__help}>
                <div>
                    <span className={styles.news__date}>{new Date(news.publishedAt).toLocaleDateString()}</span>
                </div>
                <h3 className={styles.news__label}>{news.title}</h3>
                <div className={styles.news__metric}>
                    <div className={styles["news__metric__block"]}>
                        {directions && <span className={styles.news__metric__directions}>{directions}</span>}
                        {rubric && <span className={styles.news__metric__rubric}>{rubric}</span>}
                    </div>
                    <div className={styles["news__metric__block"]}>
                        <span className={styles["news__metric__block-item"]}><ImageNext
                            src="/like.png"
                            alt="like"
                            width={16}
                            height={17}
                        />{news.likeCount}</span>
                        <span className={styles["news__metric__block-item"]}><GrView/>{news.viewCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlockNews;