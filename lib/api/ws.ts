// import * as Stomp from 'stompjs';
// import { useAuth } from '@/lib/auth-provider';
// import SockJS from 'sockjs-client';

// const socket = new SockJS('http://localhost:8088/ws');
// const stompClient = Stomp.over(socket);
// const { token } = useAuth();

// stompClient.connect({
//     Authorization: `Bearer ${token}`
// }, () => {
//     console.log("Connected");
//     stompClient.subscribe(`/topic/messages`, (message) => {
//         const newMessage = JSON.parse(message.body);
//         // Обработка нового сообщения
//     });
// });