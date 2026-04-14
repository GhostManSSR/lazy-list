import React from "react";
import styles from "../../../asserts/components/layout/LoadingSpin/index.module.less"


const LoadingSpin: React.FC = () => {
    return (
        <div className={styles.loading__container}>
            <div className={styles.spinner}/>
            <p className={styles.loading__text}>Загрузка...</p>
        </div>
    );
};

export default LoadingSpin;
