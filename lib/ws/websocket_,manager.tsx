'use client';

import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useChatStore } from '@/lib/store';

export default function WebSocketManager() {
    const { addMessage, setRooms, currentRoom } = useChatStore();

    useEffect(() => {
        const socket = new SockJS('http://localhost:8092/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                // Подписываемся на обновления комнат
                client.subscribe('/topic/rooms', (message) => {
                    setRooms(JSON.parse(message.body));
                });

                // Подписываемся на сообщения в текущей комнате
                if (currentRoom) {
                    client.subscribe(`/topic/room.${currentRoom.id}`, (message) => {
                        addMessage(JSON.parse(message.body));
                    });
                }
            },
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [currentRoom]);

    return null;
}