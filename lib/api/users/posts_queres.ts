// 'use client'

// import { useAuth } from '@/lib/auth-provider';
// import axios from 'axios';
// import { useState, useEffect } from 'react';

// const API_URL = 'http://localhost:8091/posts';

// /**
//  * Custom hook for creating posts
//  * @returns An object containing post creation function and state variables
//  */
// export const useCreatePost = () => {
//     const { token } = useAuth();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [data, setData] = useState<any>(null);

//     /**
//      * Creates a new post
//      * @param title - The title of the post
//      * @param content - The content of the post
//      * @returns The created post data
//      * @throws Error if post creation fails
//      */
//     const createPost = async (postData: {
//         title: string;
//         content: string;
//         hashtags?: string[];
//         poll?: {
//             question: string;
//             options: string[];
//             multipleChoice: boolean;
//             expiresAt?: string;
//         }
//     }) => {
//         setIsLoading(true);
//         setError(null);

//         try {

//             const response = await axios.post(
//                 API_URL,
//                 postData,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );
//             setData(response.data);
//             return response.data;
//         } catch (err) {
//             const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
//             setError(errorMessage);
//             console.error('Failed to create post:', err);
//             throw err;
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return {
//         createPost,  // Function to create a new post
//         isLoading,   // Loading state during post creation
//         error,       // Error message if creation fails
//         data         // The created post data
//     };
// };

// /**
//  * Custom hook for fetching all posts
//  * @returns An object containing posts data and related state variables
//  */
// export const useGetAllPosts = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [data, setData] = useState<any[]>([]);
//     const { token } = useAuth();

//     /**
//      * Fetches all posts from the API
//      * @returns Array of posts
//      * @throws Error if fetch fails
//      */
//     const fetchPosts = async () => {
//         setIsLoading(true);
//         setError(null);

//         try {
//             const response = await axios.get(API_URL, {
//                 headers: token ? {
//                     'Authorization': `Bearer ${token}`
//                 } : {}
//             });
//             setData(response.data);
//             return response.data;
//         } catch (err) {
//             const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
//             setError(errorMessage);
//             console.error('Failed to fetch posts:', err);
//             throw err;
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Automatically fetch posts when component mounts
//     useEffect(() => {
//         fetchPosts();
//     }, []); // Empty dependency array means this runs once on mount

//     return {
//         fetchPosts,  // Function to manually refetch posts
//         posts: data, // Array of posts
//         isLoading,   // Loading state during fetch
//         error       // Error message if fetch fails
//     };
// };
