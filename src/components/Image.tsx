import { ImgHTMLAttributes, FC, useState } from "react";
import styles from "./Image.module.scss";
import { NasaImageT } from "../../types";
import { formatDate } from "../utils/formatDate";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    height: string;
    image: NasaImageT;
    handleClick: () => void;
}

const Image: FC<ImageProps> = ({ height, image, handleClick, ...props }) => {
    const [isLoadingCompleted, setIsLoadingCompleted] = useState(false);

    return (
        <div
            style={{ height }}
            onClick={handleClick}
            className={styles.container}
            onKeyDown={({ code }) => code === "Enter" && handleClick()}
            tabIndex={0}
        >
            <img
                {...props}
                style={{
                    opacity: isLoadingCompleted ? 1 : 0,
                }}
                loading="lazy"
                onLoad={() => setIsLoadingCompleted(true)}
            />
            <div className={styles.details}>
                <p>{image.data[0].title}</p>
                <p>{formatDate(image.data[0].date_created)}</p>
            </div>
        </div>
    );
};

export default Image;
