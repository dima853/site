// 'use client'

// import { useAuth } from '@/lib/auth-provider';
// import axios from 'axios';
// import { useState } from 'react';

// const API_URL = 'http://localhost:8091/posts';

// /**
//  * Custom hook for post polls
//  */
// export const usePostPolls = () => {
//     const { token } = useAuth();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     /**
//      * Votes in a poll
//      */
//     const voteInPoll = async (postId: number, optionIds: number[]) => {
//         setIsLoading(true);
//         setError(null);

//         try {
//             await axios.post(
//                 `${API_URL}/${postId}/polls/vote`,
//                 { optionIds },
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );
//         } catch (err) {
//             const errorMessage = err instanceof Error ? err.message : 'Failed to vote';
//             setError(errorMessage);
//             console.error('Failed to vote in poll:', err);
//             throw err;
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     /**
//      * Gets poll details
//      */
//     const getPoll = async (postId: number) => {
//         setIsLoading(true);
//         setError(null);

//         try {
//             const response = await axios.get(
//                 `${API_URL}/${postId}/polls`,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );
//             return response.data;
//         } catch (err) {
//             const errorMessage = err instanceof Error ? err.message : 'Failed to fetch poll';
//             setError(errorMessage);
//             console.error('Failed to get poll:', err);
//             throw err;
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return {
//         voteInPoll,
//         getPoll,
//         isLoading,
//         error
//     };
// };