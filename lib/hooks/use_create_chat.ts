import axios from 'axios';

const BACKEND_URL = "http://localhost:8088";

export const fetchChats = async (token: string) => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/chats`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const createNewChat = async (name: string, token: string) => {
    const response = await axios.post(
        `${BACKEND_URL}/api/v1/chats`,
        { name },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};