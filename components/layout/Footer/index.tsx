import Logo from "@/components/layout/Logo";
import styles from "../../../assets/components/layout/Footer/index.module.less"

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
