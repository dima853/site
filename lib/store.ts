import { create } from 'zustand';

interface Message {
    id: string;
    content: string;
    sender: string;
    roomId: string;
    timestamp: Date;
}

interface Room {
    id: string;
    name: string;
}

interface ChatState {
    rooms: Room[];
    messages: Message[];
    currentRoom: Room | null;
    setRooms: (rooms: Room[]) => void;
    addMessage: (message: Message) => void;
    setCurrentRoom: (room: Room) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    rooms: [],
    messages: [],
    currentRoom: null,
    setRooms: (rooms) => set({ rooms }),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    setCurrentRoom: (room) => set({ currentRoom: room }),
}));