import Image from "@/components/Image";
import React from "react";
import styles from "../../../asserts/components/layout/Logo/index.module.less"

const Logo:React.FC<{}> = () => {

    return(
        <Image style={{ width: 120, height: 80 }}
                placeholderImg="logo.svg"
                src="public/logo.svg"
               className={styles.logo}
        />
    )
}

export default Logo;