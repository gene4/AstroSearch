import { NasaImageT } from "../types";
import { PAGE_SIZE } from "./constants";

export const fetchData = async (query: string, page: number) => {
    const response = await fetch(
        `https://images-api.nasa.gov/search?q=${query}&media_type=image&page=${page}&page_size=${PAGE_SIZE}`
    );
    const data = await response.json();
    return data.collection.items as NasaImageT[];
};
