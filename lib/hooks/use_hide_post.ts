// import { useAuth } from '@/lib/auth-provider';
// import axios from 'axios';
// import { useState } from 'react';

// const API_URL = 'http://localhost:8088';

// export const useHidePost = () => {
//     const { token } = useAuth();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const hidePost = async (postId: number) => {
//         setIsLoading(true);
//         setError(null);

//         try {
//             await axios.post(
//                 `${API_URL}/hide/${postId}`,
//                 {},
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );
//         } catch (err) {
//             setError(err instanceof Error ? err.message : 'Unknown error occurred');
//             console.error('Failed to hide post:', err);
//             throw err;
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return { hidePost, isLoading, error };
// };
