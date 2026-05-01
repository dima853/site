// import { useAuth } from '@/lib/auth-provider';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { useState } from 'react';

// const API_URL = 'http://localhost:8091';

// export const useLike = (postId: number) => {
//     const { token } = useAuth()
//     const queryClient = useQueryClient()

//     const { data: likeCount } = useQuery({
//         queryKey: ['posts', postId, 'likes-count'],
//         queryFn: async () => {
//             if (!token) return false
//             const res = await axios.get(`${API_URL}/posts/${postId}/likes/count`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             return res.data
//         },
//         initialData: 0,
//         enabled: !!token
//     })

//     const { data: isLiked } = useQuery({
//         queryKey: ['posts', postId, 'likes-check'],
//         queryFn: async () => {
//             if (!token) return false
//             const res = await axios.get(`${API_URL}/posts/${postId}/likes/check`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             return res.data
//         },
//         enabled: !!token
//     })

//     const { mutate: toggleLike, isPending } = useMutation({
//         mutationFn: async () => {
//             const res = await axios.post(
//                 `${API_URL}/posts/${postId}/like`,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             )
//             return res.data
//         },
//         onMutate: async () => {
//             await queryClient.cancelQueries({
//                 queryKey: ['posts', postId, 'likes-count']
//             })
//             await queryClient.cancelQueries({
//                 queryKey: ['posts', postId, 'likes-check']
//             })

//             const previousCount = queryClient.getQueryData(['posts', postId, 'likes-count'])
//             const previousLiked = queryClient.getQueryData(['posts', postId, 'likes-check'])

//             queryClient.setQueryData(['posts', postId, 'likes-check'], !previousLiked)
//             queryClient.setQueryData(
//                 ['posts', postId, 'likes-count'],
//                 (old: number) => previousLiked ? old - 1 : old + 1
//             )

//             return { previousCount, previousLiked }
//         },
//         onError: (err, variables, context) => {
//             queryClient.setQueryData(
//                 ['posts', postId, 'likes-count'],
//                 context?.previousCount
//             )
//             queryClient.setQueryData(
//                 ['posts', postId, 'likes-check'],
//                 context?.previousLiked
//             )
//         },
//         onSettled: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ['posts', postId, 'likes-count']
//             })
//             queryClient.invalidateQueries({
//                 queryKey: ['posts', postId, 'likes-check']
//             })
//         }
//     })

//     return {
//         isLiked: isLiked || false,
//         likeCount: likeCount || 0,
//         isLoading: isPending,
//         toggleLike
//     }
// }