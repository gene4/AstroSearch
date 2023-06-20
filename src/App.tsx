import { useState, useRef } from "react";
import styles from "./App.module.scss";
import Lottie from "lottie-react";
import monkey from "../public/monkey.json";
import { fetchData } from "./api";
import { useInfiniteQuery } from "react-query";
import Modal from "./components/Modal";
import { NasaImageT } from "../types";
import Gallery from "./components/Gallery";
import Header from "./components/Header";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [selectedImage, setSelectedImage] = useState<NasaImageT>();
    const inputRef = useRef<HTMLInputElement>(null);

    const { data, isFetching, fetchNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ["images"],
            queryFn: async ({ pageParam = 1 }) =>
                fetchData(inputRef.current!.value, pageParam),
            enabled: false,
            getNextPageParam: (_, pages) => {
                return pages.length + 1;
            },
        });
    console.log(data);

    return (
        <div className={styles.container}>
            <Header
                refetch={refetch}
                isFetching={isFetching}
                inputRef={inputRef}
            />
            <main>
                {data ? (
                    <Gallery
                        data={data}
                        setSelectedImage={setSelectedImage}
                        isFetchingNextPage={isFetchingNextPage}
                        fetchNextPage={fetchNextPage}
                        setIsModalOpen={setIsModalOpen}
                    />
                ) : (
                    <Lottie
                        animationData={monkey}
                        style={{ maxWidth: 500 }}
                        loop={true}
                    />
                )}
            </main>
            {selectedImage && (
                <Modal
                    selectedImage={selectedImage}
                    setIsOpen={setIsModalOpen}
                    isOpen={isModalOpen}
                />
            )}
        </div>
    );
}

export default App;
