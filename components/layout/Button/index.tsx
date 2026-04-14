import { Button as ButtonProps } from "@/types/layout/types";
import styles from "../../../asserts/components/layout/Button/index.module.less"

const Button: React.FC<ButtonProps> = (props) => {
    const Icon = props.icon;

    return (
        <button className={[
            styles.button,
            ...(props.classList || []).map(cls => styles[cls])
        ].join(" ")} onClick={props.onClick} disabled={props.disabled}>
            {Icon && <Icon className={styles.icon} />}
            {props.children}
        </button>
    );
};

export default Button;