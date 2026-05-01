import { useState, useEffect } from 'react';
import axios from 'axios';

export const useHashtags = () => {
    const [popularHashtags, setPopularHashtags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPopularHashtags = async (count = 10) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8091/posts/hashtags/popular`,
                {
                    params: { count }
                }
            );

            // Нормализуем хештеги (добавляем # если отсутствует)
            const normalizedHashtags = response.data.map((tag: string) =>
                tag.startsWith('#') ? tag : `#${tag}`
            );
            setPopularHashtags(normalizedHashtags);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load hashtags');
            console.error('Error fetching popular hashtags:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPopularHashtags();
    }, []);

    return {
        popularHashtags,
        loading,
        error,
        refresh: () => fetchPopularHashtags()
    };
};