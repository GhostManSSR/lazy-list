import {Header as HeaderProps} from "@/types/layout/types";
import Logo from "@/components/layout/Logo";
import styles from "../../../asserts/components/layout/Header/index.module.less"

const Header: React.FC<HeaderProps> = (props) => {

    return(
        <header className={styles.header}>
            <div className={styles.header__column}>
                <Logo/>
            </div>
            <div className={styles.header__column}>
            </div>
        </header>
    )
}
export default Header