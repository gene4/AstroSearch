import { RefObject } from "react";
import styles from "./Header.module.scss";
import Input from "../components/Input";

interface HeaderProps {
    inputRef: RefObject<HTMLInputElement>;
    refetch: () => void;
    isFetching: boolean;
}

function Header({ inputRef, refetch, isFetching }: HeaderProps) {
    return (
        <header>
            <div className={styles.logo_container}>
                <img src="./icons/astro.svg" width={23} />
                <h1>AstroSearch</h1>
            </div>
            <Input
                required
                ref={inputRef}
                iconSrc1={"/icons/search.svg"}
                iconSrc2={"/icons/rocket.svg"}
                type="text"
                placeholder="Search anything..."
                action={refetch}
                isLoading={isFetching}
            />
        </header>
    );
}

export default Header;
