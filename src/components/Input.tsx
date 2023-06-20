import { forwardRef, InputHTMLAttributes, Ref } from "react";
import styles from "./Input.module.scss";
import Spinner from "./Spinner";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    iconSrc1: string;
    iconSrc2: string;
    isLoading: boolean;
    action: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        { iconSrc1, iconSrc2, action, isLoading, ...props },
        ref: Ref<HTMLInputElement>
    ) => {
        return (
            <div className={styles.container}>
                <img src={iconSrc1} width={25} />
                <input
                    {...props}
                    ref={ref}
                    onKeyDown={({ code }) => code === "Enter" && action()}
                />

                <button onClick={action}>
                    {isLoading ? (
                        <Spinner size={20} />
                    ) : (
                        <img src={iconSrc2} width={25} />
                    )}
                </button>
            </div>
        );
    }
);

export default Input;
