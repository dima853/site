// import axios from 'axios';
// import React, { useState, useEffect, useRef } from 'react';

// export const useTypingStatus = (roomId: string, token: string) => {
//     const [typingStatus, setTypingStatus] = useState<TypingStatus[]>([]);
//     const pollingIntervalRef = useRef<NodeJS.Timeout>();

//     const sendTypingStatus = async (isTyping: boolean) => {
//         try {
//             await axios.post(
//                 `http://localhost:8092/api/rooms/${roomId}/typing`,
//                 { isTyping },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//         } catch (error) {
//             console.error("Error sending typing status", error);
//         }
//     };

//     const fetchTypingStatus = async () => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:8092/api/rooms/${roomId}/typing`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             setTypingStatus(response.data);
//         } catch (error) {
//             console.error("Error fetching typing status", error);
//         }
//     };

//     useEffect(() => {
//         // Начинаем опрос статусов печати
//         fetchTypingStatus();
//         pollingIntervalRef.current = setInterval(fetchTypingStatus, 2000);

//         return () => {
//             if (pollingIntervalRef.current) {
//                 clearInterval(pollingIntervalRef.current);
//             }
//         };
//     }, [roomId, token]);

//     return { typingStatus, sendTypingStatus };
// };
