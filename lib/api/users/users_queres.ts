// 'use client'

// import { useAuth } from '@/lib/auth-provider';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const API_URL = 'http://localhost:8088/';

// interface UserDto {
//     id: number;
//     firstname: string;
//     lastname: string;
//     email: string;
//     username?: string; // Added optional username field
// }

// /**
//  * Custom hook for fetching and managing usernames
//  * @returns An object containing usernames, user data, and loading states
//  */
// export const useUsernames = () => {
//     const [usernames, setUsernames] = useState<string[]>([]);
//     const [user, setUser] = useState<UserDto | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();

//     /**
//      * Fetches all usernames from the API
//      * @returns Promise with array of usernames
//      */
//     const fetchUsernames = async (): Promise<string[]> => {
//         try {
//             const response = await axios.get(`${API_URL}usernames`);
//             return response.data;
//         } catch (err) {
//             console.error('Failed to fetch usernames:', err);
//             throw err;
//         }
//     };

//     /**
//      * Fetches the current user's profile
//      */
//     const fetchProfile = async () => {
//         if (!token) return;

//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(`${API_URL}api/v1/user/username`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch profile: ${response.status}`);
//             }

//             const userData: UserDto = await response.json();
//             setUser(userData);

//             // Fetch usernames after profile is loaded
//             const names = await fetchUsernames();
//             setUsernames(names);
//         } catch (err) {
//             const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
//             setError(errorMessage);
//             console.error('Error fetching profile:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Automatically fetch data when token changes
//     useEffect(() => {
//         fetchProfile();
//     }, [token]);

//     return {
//         usernames,  // Array of all usernames
//         user,       // Current user's profile data
//         loading,    // Loading state
//         error,      // Error message if any
//         refresh: fetchProfile // Function to manually refresh data
//     };
// };

// /**
//  * Fetches all users from the API
//  * @returns Promise with array of all users
//  */
// export const getAllUsers = async (): Promise<UserDto[]> => {
//     try {
//         const response = await axios.get<UserDto[]>(API_URL);
//         return response.data;
//     } catch (err) {
//         console.error('Failed to fetch users:', err);
//         throw err;
//     }
// };