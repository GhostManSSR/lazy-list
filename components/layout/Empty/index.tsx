import Image from "next/image";
import styles from "../../../assets/components/layout/Empty/index.module.less"

const Empty: React.FC<{}> = () => {

    return(
        <div className={styles["empty"]}>
            <Image
                src="/empty.png"
                alt="empty"
                width={200}
                height={200}
            />
            <span>Новых новостей нет</span>
        </div>
    )
}

export default Empty;