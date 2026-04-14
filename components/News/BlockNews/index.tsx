import {News as NewsBlockProps} from "@/types/News/types";
import {getImageUrl} from "@/HttpProvider";
import Image from "@/components/Image";
import styles from "../../../asserts/components/News/NewsBlock/index.module.less"
import { FcLike } from "react-icons/fc";
import { GrView } from "react-icons/gr";


const BlockNews: React.FC<{ news: NewsBlockProps }> = ({ news }) => {
    const image = getImageUrl(news.cover.images?.[0]?.hd);

    const rubric = news.rubrics?.[0]?.name;

    const directions = news.directions?.[0]?.name;

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
                        <span className={styles["news__metric__block-item"]}><FcLike/>{news.likeCount}</span>
                        <span className={styles["news__metric__block-item"]}><GrView/>{news.viewCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlockNews;