// 'use client'

// import { useAuth } from '@/lib/auth-provider';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';

// const API_URL = 'http://localhost:8091';

// interface ReplyData {
//     id: number;
//     content: string;
//     username: string;
//     createdAt: string;
//     userId?: number;
// }

// /**
//  * Custom hook for managing replies to a specific comment
//  * @param commentId - The ID of the parent comment
//  * @returns An object containing replies data and related functions
//  */
// export const useReplies = (commentId: number) => {
//     const { token, user } = useAuth();
//     const queryClient = useQueryClient();

//     /**
//      * Mutation for adding a reply to a comment
//      * - Optimistically updates UI before server response
//      * - Rolls back on error
//      * - Updates with server data on success
//      */
//     const { mutate: addReply, isPending: isAddingReply } = useMutation({
//         mutationFn: async (content: string) => {
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
//         onMutate: async (content) => {
//             await queryClient.cancelQueries({
//                 queryKey: ['comments', commentId, 'replies']
//             });

//             const previousReplies = queryClient.getQueryData(['comments', commentId, 'replies']);

//             // Optimistic update
//             queryClient.setQueryData(
//                 ['comments', commentId, 'replies'],
//                 (old: ReplyData[] = []) => [
//                     ...old,
//                     {
//                         id: Date.now(), // Temporary ID
//                         content,
//                         username: 'You', // Placeholder
//                         createdAt: new Date().toISOString(),
//                         userId: user?.id,
//                         isOptimistic: true
//                     }
//                 ]
//             );

//             return { previousReplies };
//         },
//         onError: (err, content, context) => {
//             // Rollback on error
//             queryClient.setQueryData(
//                 ['comments', commentId, 'replies'],
//                 context?.previousReplies
//             );
//         },
//         onSuccess: (newReply) => {
//             // Replace optimistic reply with actual data
//             queryClient.setQueryData(
//                 ['comments', commentId, 'replies'],
//                 (old: ReplyData[] = []) => [
//                     ...old.filter(reply => !reply.isOptimistic),
//                     newReply
//                 ]
//             );
//         },
//         onSettled: () => {
//             // Refresh data
//             queryClient.invalidateQueries({
//                 queryKey: ['comments', commentId, 'replies']
//             });
//         }
//     });

//     /**
//      * Fetches replies for the comment
//      * - Can be used for manual refetching
//      */
//     const fetchReplies = async () => {
//         try {
//             const res = await axios.get<ReplyData[]>(
//                 `${API_URL}/comments/${commentId}/replies`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
//             return res.data;
//         } catch (error) {
//             console.error("Error fetching replies:", error);
//             throw error;
//         }
//     };

//     /**
//      * Deletes a reply
//      * - Optimistically removes from UI
//      */
//     const { mutate: deleteReply } = useMutation({
//         mutationFn: async (replyId: number) => {
//             await axios.delete(
//                 `${API_URL}/comments/${commentId}/replies/${replyId}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             return replyId;
//         },
//         onMutate: async (replyId) => {
//             await queryClient.cancelQueries({
//                 queryKey: ['comments', commentId, 'replies']
//             });

//             const previousReplies = queryClient.getQueryData(['comments', commentId, 'replies']);

//             // Optimistic removal
//             queryClient.setQueryData(
//                 ['comments', commentId, 'replies'],
//                 (old: ReplyData[] = []) => old.filter(reply => reply.id !== replyId)
//             );

//             return { previousReplies };
//         },
//         onError: (err, replyId, context) => {
//             // Rollback on error
//             queryClient.setQueryData(
//                 ['comments', commentId, 'replies'],
//                 context?.previousReplies
//             );
//         }
//     });

//     return {
//         addReply,
//         isAddingReply,
//         fetchReplies,
//         deleteReply,
//         currentUserId: user?.id
//     };
// };
