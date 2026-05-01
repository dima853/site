// import { useState, useEffect, useCallback } from 'react';
// import { Client } from '@stomp/stompjs';

// const usePrivateChat = (chatId: number, currentUser: string) => {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [isConnected, setIsConnected] = useState(false);
//     const clientRef = useRef<Client | null>(null);

//     const connect = useCallback(() => {
//         const client = new Client({
//             brokerURL: 'ws://localhost:8088/ws-private',
//             connectHeaders: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             },
//             debug: (str) => console.log(str),
//             reconnectDelay: 5000,
//             onConnect: () => {
//                 // Подписка на личные сообщения
//                 client.subscribe(`/user/queue/private`, (message) => {
//                     const newMessage = JSON.parse(message.body);
//                     setMessages(prev => [...prev, newMessage]);
//                 });

//                 // Подписка на обновления чата
//                 client.subscribe(`/topic/chat/${chatId}`, (message) => {
//                     const update = JSON.parse(message.body);
//                     // Обработка обновлений (например, прочитанные сообщения)
//                 });

//                 setIsConnected(true);
//             }
//         });

//         client.activate();
//         clientRef.current = client;

//         return () => {
//             client.deactivate();
//         };
//     }, [chatId]);

//     const sendMessage = useCallback((content: string) => {
//         if (clientRef.current && isConnected) {
//             clientRef.current.publish({
//                 destination: `/app/private-chat/${chatId}`,
//                 body: JSON.stringify({
//                     sender: currentUser,
//                     content,
//                     timestamp: new Date().toISOString()
//                 })
//             });
//         }
//     }, [chatId, currentUser, isConnected]);

//     useEffect(() => {
//         const disconnect = connect();
//         return () => {
//             disconnect?.();
//         };
//     }, [connect]);

//     return { messages, sendMessage, isConnected };
// };
