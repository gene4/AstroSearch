import styles from "./Gallery.module.scss";
import not_found from "../../public/not_found.json";
import Lottie from "lottie-react";
import Image from "./Image";
import {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult,
} from "react-query";
import { NasaImageT } from "../../types";

interface GalleryProps {
    data: InfiniteData<NasaImageT[]>;
    setIsModalOpen: (open: boolean) => void;
    setSelectedImage: (selectedImage: NasaImageT) => void;
    isFetchingNextPage: boolean;
    fetchNextPage: (
        options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult<NasaImageT[], unknown>>;
}

function Gallery({
    data,
    setSelectedImage,
    isFetchingNextPage,
    fetchNextPage,
    setIsModalOpen,
}: GalleryProps) {
    const handleClick = (image: NasaImageT) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    return (
        <div className={styles.gallery}>
            {data?.pages.map((page) =>
                page.map((image, index) => (
                    <Image
                        handleClick={() => handleClick(image)}
                        key={index}
                        image={image}
                        src={image.links[0].href}
                        height={"275px"}
                    />
                ))
            )}

            {data.pages[0].length !== 0 && (
                <button
                    disabled={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    className={styles.loader}
                >
                    {isFetchingNextPage ? "Loading more..." : "Load More"}
                </button>
            )}

            {data.pages[0].length === 0 && (
                <div className={styles.not_found_container}>
                    <h1>Nothing found!</h1>
                    <Lottie animationData={not_found} loop={true} />
                </div>
            )}
        </div>
    );
}

export default Gallery;
