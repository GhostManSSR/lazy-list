import React from "react";
import styles from "../../../assets/components/Skeleton/index.module.less";

const Skeleton: React.FC = () => {
    return (
        <div className={styles.skeleton}>
            {[...Array(3)].map((_, i) => (
                <div key={i} className={styles.skeleton__block}>
                    <div className={styles.skeleton__img} />

                    <div className={styles.skeleton__content}>
                        <div className={styles.skeleton__date} />

                        <div className={styles.skeleton__title} />
                        <div className={styles.skeleton__titleShort} />

                        <div className={styles.skeleton__bottom}>
                            <div className={styles.skeleton__tags}>
                                <div className={styles.skeleton__tag} />
                                <div className={styles.skeleton__tag} />
                            </div>

                            <div className={styles.skeleton__metrics}>
                                <div className={styles.skeleton__metric} />
                                <div className={styles.skeleton__metric} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Skeleton;
