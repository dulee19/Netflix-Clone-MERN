import { useEffect, useState } from "react"
import { useContentStore } from "../store/content";
import axios from "axios";

export const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null);

    const { contentType } = useContentStore();

    useEffect(() => {
        const getTrendingContent = async () => {
           const response = await axios(`/api/v1/${contentType}/trending`);
           setTrendingContent(response.data.content);
        }

        getTrendingContent();
    }, [contentType]);

    return { trendingContent }
}