// 'use client'

// import { useAuth } from '@/lib/auth-provider';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';

// const API_URL = 'http://localhost:8091';

// /**
//  * Custom hook for managing comments and replies for a specific post
//  * @param postId - The ID of the post to fetch comments for
//  * @returns An object containing comments data and related functions
//  */
// export const useComments = (postId: number) => {
//     const { token, user } = useAuth();
//     const queryClient = useQueryClient();

//     /**
//      * Query to fetch comments for a post along with their replies
//      * queryKey - Unique identifier for this query (used for caching)
//      * queryFn - Function that fetches the data (comments + replies)
//      * enabled - Only run query when postId and token are available
//      * select - Transforms the data before returning it
//      */
//     const {
//         data: comments,
//         isLoading: isCommentsLoading,
//         error: commentsError,
//         refetch: refetchComments
//     } = useQuery({
//         queryKey: ['posts', postId, 'comments'],
//         queryFn: async () => {
//             // Fetch main comments for the post
//             const commentsRes = await axios.get(`${API_URL}/posts/${postId}/comments`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })

//             // For each comment, fetch its replies if it has any
//             const commentsWithReplies = await Promise.all(
//                 commentsRes.data.map(async (comment: any, commentId: number) => {
//                     if (comment.repliesCount > 0) {
//                         try {
//                             const repliesRes = await axios.get(
//                                 `${API_URL}/comments/${commentId}/replies`,
//                                 { headers: { Authorization: `Bearer ${token}` } }
//                             )
//                             return { ...comment, replies: repliesRes.data }
//                         } catch (error) {
//                             console.error(`Error loading replies for comment ${commentId}:`, error)
//                             return { ...comment, replies: [] }
//                         }
//                     }
//                     return { ...comment, replies: [] }
//                 })
//             )

//             return commentsWithReplies
//         },
//         enabled: !!postId && !!token,
//         select: (data) => data.map(comment => ({
//             ...comment,
//             replies: comment.replies || [],
//             repliesCount: comment.repliesCount || 0,
//         }))
//     });

//     /**
//      * Fetches replies for a specific comment
//      * @param commentId - The ID of the comment to fetch replies for
//      * @returns Promise with the replies data
//      */
//     const fetchReplies = async (commentId: number) => {
//         try {
//             const res = await axios.get(`${API_URL}/comments/${commentId}/replies`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             return res.data;
//         } catch (error) {
//             console.error("Error fetching replies:", error);
//             throw error;
//         }
//     };

//     /**
//      * Loads replies for a comment and updates the query data
//      * @param commentId - The ID of the comment to load replies for
//      */
//     const loadReplies = async (commentId: number) => {
//         try {
//             const replies = await fetchReplies(commentId);
//             queryClient.setQueryData(
//                 ['posts', postId, 'comments'],
//                 (old: any[]) => old.map(comment => {
//                     if (comment.id === commentId) {
//                         return {
//                             ...comment,
//                             replies,
//                             showReplies: true
//                         };
//                     }
//                     return comment;
//                 })
//             );
//         } catch (error) {
//             console.error("Error loading replies:", error);
//         }
//     };

//     /**
//      * Mutation for adding a new comment to the post
//      * mutationFn - Function that performs the API call to add comment
//      * onMutate - Optimistic update before API call
//      * onError - Rollback if API call fails
//      * onSuccess - Update with actual data when API succeeds
//      * onSettled - Invalidate query to ensure fresh data
//      */
//     const { mutate: addComment, isPending: isAddingComment } = useMutation({
//         mutationFn: async (content: string) => {
//             const res = await axios.post(
//                 `${API_URL}/posts/${postId}/comments`,
//                 { content },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
//             return res.data;
//         },
//         onMutate: async (newCommentContent) => {
//             await queryClient.cancelQueries({
//                 queryKey: ['posts', postId, 'comments']
//             });

//             const previousComments = queryClient.getQueryData(['posts', postId, 'comments']);

//             // Optimistically add new comment
//             queryClient.setQueryData(
//                 ['posts', postId, 'comments'],
//                 (old: any[]) => [
//                     {
//                         id: Date.now(),
//                         content: newCommentContent,
//                         postId,
//                         author: { username: 'You' },
//                         createdAt: new Date().toISOString(),
//                         isOptimistic: true,
//                         repliesCount: 0,
//                         replies: []
//                     },
//                     ...old
//                 ]
//             );

//             return { previousComments };
//         },
//         onError: (err, newCommentContent, context) => {
//             // Rollback on error
//             queryClient.setQueryData(
//                 ['posts', postId, 'comments'],
//                 context?.previousComments
//             );
//         },
//         onSuccess: (newComment, newCommentContent) => {
//             // Replace optimistic comment with actual data
//             queryClient.setQueryData(
//                 ['posts', postId, 'comments'],
//                 (old: any[]) => [
//                     newComment,
//                     ...old.filter(comment => !comment.isOptimistic)
//                 ]
//             );
//         },
//         onSettled: () => {
//             // Invalidate to refresh data
//             queryClient.invalidateQueries({
//                 queryKey: ['posts', postId, 'comments']
//             });
//         }
//     });

//     /**
//      * Mutation for toggling a comment's pinned status
//      * mutationFn - API call to toggle pin status
//      * onSuccess - Update local data with new pinned status
//      */
//     const { mutate: togglePinComment } = useMutation({
//         mutationFn: async (commentId: number) => {
//             const res = await axios.patch(
//                 `${API_URL}/posts/${postId}/comments/${commentId}/pin`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
//             return res.data;
//         },
//         onSuccess: (updatedComment) => {
//             queryClient.setQueryData(
//                 ['posts', postId, 'comments'],
//                 (old: any[]) => old.map(comment =>
//                     comment.id === updatedComment.id
//                         ? updatedComment
//                         : { ...comment, isPinned: false }
//                 )
//             );
//         },
//         onError: (error) => {
//             console.error("Error toggling pin:", error);
//             throw error;
//         }
//     });

//     /**
//      * Mutation for adding a reply to a comment
//      * mutationFn - API call to add reply
//      * onMutate - Optimistic update
//      * onError - Rollback on failure
//      * onSuccess - Update with actual data
//      * onSettled - Invalidate query
//      */
//     const { mutate: addReply, isPending: isAddingReply } = useMutation({
//         mutationFn: async ({ commentId, content }: { commentId: number, content: string }) => {
//             const res = await axios.post(
//                 `${API_URL}/comments/${commentId}/replies`,
//                 { content },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
//             return res.data;
//         },
//         onMutate: async ({ commentId, content }) => {
//             await queryClient.cancelQueries({
//                 queryKey: ['posts', postId, 'comments']
//             });

//             const previousComments = queryClient.getQueryData(['posts', postId, 'comments']);

//             // Optimistically add reply
//             queryClient.setQueryData(
//                 ['posts', postId, 'comments'],
//                 (old: any[]) => old.map(comment => {
//                     if (comment.id === commentId) {
//                         return {
//                             ...comment,
//                             repliesCount: comment.repliesCount + 1,
//                             replies: [
//                                 ...(comment.replies || []),
//                                 {
//                                     id: Date.now(),
//                                     content,
//                                     author: { username: 'You' },
//                                     createdAt: new Date().toISOString(),
//                                     isOptimistic: true
//                                 }
//                             ]
//                         };
//                     }
//                     return comment;
//                 })
//             );

//             return { previousComments };
//         },
//         onError: (err, variables, context) => {
//             // Rollback on error
//             queryClient.setQueryData(
//                 ['posts', postId, 'comments'],
//                 context?.previousComments
//             );
//         },
//         onSuccess: (newReply, variables) => {
//             // Replace optimistic reply with actual data
//             queryClient.setQueryData(
//                 ['posts', postId, 'comments'],
//                 (old: any[]) => old.map(comment => {
//                     if (comment.id === variables.commentId) {
//                         return {
//                             ...comment,
//                             replies: [
//                                 newReply,
//                                 ...(comment.replies?.filter((r: any) => !r.isOptimistic) || [])
//                             ]
//                         };
//                     }
//                     return comment;
//                 })
//             );
//         },
//         onSettled: () => {
//             // Invalidate to refresh data
//             queryClient.invalidateQueries({
//                 queryKey: ['posts', postId, 'comments']
//             });
//         }
//     });

//     return {
//         comments: comments || [],
//         isLoading: isCommentsLoading,
//         error: commentsError,
//         addComment,
//         addReply: (commentId: number, content: string) => addReply({ commentId, content }),
//         isAddingComment,
//         isAddingReply,
//         refetchComments,
//         loadReplies,
//         togglePinComment,
//         currentUserId: user?.id
//     };
// };
