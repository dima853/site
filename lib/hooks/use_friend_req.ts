// 'use client'

// import { useAuth } from '@/lib/auth-provider';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// const BACKEND_URL = "http://localhost:8088";

// /**
//  * Custom hook for managing friend requests
//  * @returns An object containing friend request data and related functions
//  */
// export function useFriendRequests() {
//     const { token } = useAuth();
//     const queryClient = useQueryClient();

//     /**
//      * Query to fetch pending friend requests
//      * queryKey - Unique identifier for this query (used for caching)
//      * queryFn - Function that fetches the pending friend requests
//      * enabled - Only runs when authentication token is available
//      */
//     const {
//         data: friendRequests,
//         isLoading,
//         error
//     } = useQuery({
//         queryKey: ['friendRequests'],
//         queryFn: async () => {
//             const response = await fetch(`${BACKEND_URL}/api/v1/friends/requests/pending`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             return response.json();
//         },
//         enabled: !!token, // Only fetch if token exists
//     });

//     /**
//      * Mutation for accepting a friend request
//      * mutationFn - Function that makes API call to accept request
//      * onSuccess - Invalidates friendRequests query to refresh data
//      */
//     const acceptRequestMutation = useMutation({
//         mutationFn: async (requestId: string) => {
//             const response = await fetch(`${BACKEND_URL}/api/v1/friends/accept/${requestId}`, {
//                 method: 'POST',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to accept friend request');
//             }

//             return response.json();
//         },
//         onSuccess: () => {
//             // Refresh friend requests list after successful acceptance
//             queryClient.invalidateQueries({ queryKey: ['friendRequests'] });
//         },
//     });

//     return {
//         friendRequests, // Array of pending friend requests
//         isLoading, // Loading state for initial request
//         error, // Error object if request fails
//         acceptRequest: acceptRequestMutation.mutate, // Function to accept a friend request
//         isAccepting: acceptRequestMutation.isPending, // Loading state for accept operation
//     };
// }