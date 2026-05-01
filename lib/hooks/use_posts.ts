// 'use client'

// import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { useAuth } from '@/lib/auth-provider';

// const API_URL = 'http://localhost:8091/posts';

// /**
//  * Custom hook for managing posts with infinite scrolling
//  * @returns An object containing posts data and related fu      nctions
//  */
// export const usePosts = () => {
//     const { token } = useAuth();
//     const queryClient = useQueryClient();

//     /**
//      * Fetches posts from the API with pagination
//      * @param pageParam - The current page number (defaults to 0)
//      * @returns Promise with the posts data for the requested page
//      */
//     const fetchPosts = async ({ pageParam = 0 }) => {
//         const response = await axios.get(API_URL, {
//             params: {
//                 page: pageParam,
//                 size: pageParam === 0 ? 10 : 5 // Load 10 posts initially, then 5 per subsequent load
//             },
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     };

//     /**
//      * Mutation for deleting a post
//      * mutationFn - API call to delete post
//      * onSuccess - Invalidates posts query to refresh data
//      */
//     const deletePostMutation = useMutation({
//         mutationFn: async (postId: number) => {
//             await axios.delete(`${API_URL}/${postId}/delete`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['posts'] });
//         },
//     });

//     /**
//      * Mutation for recording a post view
//      * mutationFn - API call to record view (no response handling needed)
//      */
//     const recordViewMutation = useMutation({
//         mutationFn: async (postId: number) => {
//             await axios.post(`${API_URL}/${postId}/view`, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//         },
//     });

//     /**
//    * Mutation for voting in a poll
//    */
//     const votePollMutation = useMutation({
//         mutationFn: async ({ postId, optionIds }: { postId: number; optionIds: number[] }) => {
//             await axios.post(
//                 `${API_URL}/${postId}/polls/vote`,
//                 { optionIds },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//         },
//         onSuccess: (_, variables) => {
//             // Оптимистичное обновление
//             queryClient.setQueryData(['posts'], (oldData: any) => {
//                 if (!oldData) return oldData;

//                 return {
//                     ...oldData,
//                     pages: oldData.pages.map((page: any) => ({
//                         ...page,
//                         content: page.content.map((post: any) => {
//                             if (post.id === variables.postId && post.poll) {
//                                 const updatedOptions = post.poll.options.map((option: any) => ({
//                                     ...option,
//                                     voteCount: variables.optionIds.includes(option.id)
//                                         ? option.voteCount + 1
//                                         : option.voteCount,
//                                     voted: variables.optionIds.includes(option.id),
//                                 }));

//                                 return {
//                                     ...post,
//                                     poll: {
//                                         ...post.poll,
//                                         options: updatedOptions,
//                                         voted: true,
//                                         totalVotes: post.poll.totalVotes + variables.optionIds.length,
//                                     },
//                                 };
//                             }
//                             return post;
//                         }),
//                     })),
//                 };
//             });
//         },
//     });

//     /**
//      * Infinite query for loading posts with pagination
//      * queryKey - Unique identifier for this query
//      * queryFn - Function to fetch posts
//      * initialPageParam - Starting page number (0)
//      * getNextPageParam - Calculates the next page to load
//      * staleTime - How long before data is considered stale (5 minutes)
//      * retry - Number of retry attempts on failure
//      */
//     const {
//         data,
//         fetchNextPage,
//         hasNextPage,
//         isFetchingNextPage,
//         isLoading,
//         isError,
//         error,
//         refetch,
//     } = useInfiniteQuery({
//         queryKey: ['posts'],
//         queryFn: fetchPosts,
//         initialPageParam: 0,
//         getNextPageParam: (lastPage, allPages) => {
//             // Stop fetching if:
//             // 1. No content in last page
//             // 2. Content length is 0
//             // 3. Received fewer items than expected (initial 10 or subsequent 5)
//             if (!lastPage.content || lastPage.content.length === 0 || lastPage.content.length < (allPages.length === 1 ? 10 : 5)) {
//                 return undefined;
//             }
//             return allPages.length;
//         },
//         staleTime: 5 * 60 * 1000, // 5 minutes cache time
//         retry: 2, // Retry twice on failure
//     });

//     // Flatten all pages into a single array of posts
//     const posts = data?.pages.flatMap(page => page.content) || [];

//     return {
//         posts, // Array of all loaded posts
//         isLoading, // Loading state for initial load
//         isFetchingNextPage, // Loading state for subsequent pages
//         hasNextPage, // Boolean indicating if more pages are available
//         fetchNextPage, // Function to load next page
//         error: isError ? (error instanceof Error ? error.message : 'Failed to load posts') : null, // Error message if any
//         refetch, // Function to manually refetch all data
//         deletePost: deletePostMutation.mutate, // Function to delete a post
//         isDeleting: deletePostMutation.isPending, // Loading state for delete operation
//         recordView: recordViewMutation.mutate, // Function to record a post view
//         votePoll: votePollMutation.mutate,
//         isVoting: votePollMutation.isPending,
//     };
// };