import Logo from "@/components/layout/Logo";
import styles from "../../../asserts/components/layout/Footer/index.module.less"

const Footer:React.FC<{}> = () => {

    return(
        <div className={styles.footer}>
            <div>
                <Logo/>
            </div>
        </div>
    )
}

export default Footer;
