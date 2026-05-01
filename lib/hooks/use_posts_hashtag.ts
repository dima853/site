// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PostDto } from '@/types/post';

// export const usePostsByHashtag = (hashtag: string) => {
//     const [posts, setPosts] = useState<PostDto[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [page, setPage] = useState(0);
//     const [hasMore, setHasMore] = useState(false);

//     const fetchPosts = async (reset = false) => {
//         const currentPage = reset ? 0 : page;
//         setLoading(true);

//         try {
//             const response = await axios.get(
//                 `http://localhost:8091/posts/hashtags/${hashtag}`,
//                 {
//                     params: {
//                         page: currentPage,
//                         size: 10,
//                         sort: 'createdAt,desc'
//                     }
//                 }
//             );

//             setPosts(prev =>
//                 reset ? response.data.content : [...prev, ...response.data.content]
//             );
//             setHasMore(!response.data.last);
//             setPage(currentPage + 1);
//         } catch (err) {
//             setError(err instanceof Error ? err.message : 'Error loading posts');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (hashtag) {
//             fetchPosts(true);
//         }
//     }, [hashtag]);

//     return {
//         posts,
//         loading,
//         error,
//         hasMore,
//         refresh: () => fetchPosts(true),
//         fetchMore: () => fetchPosts()
//     };
// };
