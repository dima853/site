'use client'
import React, { createContext, useState, useEffect, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AuthContext = createContext(null);
const queryClient = new QueryClient();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const verifyToken = async (token) => {
        try {
            const response = await fetch('http://localhost:8088/api/v1/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Invalid token');
            }

            return await response.json();
        } catch (error) {
            console.error("Token verification failed:", error);
            throw error;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = sessionStorage.getItem('token');
            console.log("DEBUG: storedToken from sessionStorage:", storedToken);
        console.log("DEBUG: typeof storedToken:", typeof storedToken);
        console.log("DEBUG: storedToken === 'null':", storedToken === 'null');
        console.log("DEBUG: storedToken === null:", storedToken === null);
        
            if (storedToken) {
                try {
                    const userData = await verifyToken(storedToken);
                    setToken(storedToken);
                    setUser(userData);
                } catch (error) {
                    console.error("Token validation error:", error);
                    logout();
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (newToken) => {
        try {
            const userData = await verifyToken(newToken);
            sessionStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(userData);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        if (token) {
            try {
                // Опционально: инвалидация токена на сервере
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error("Logout error:", error);
            }
        }

        sessionStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const getUserId = () => {
        return user?.userId || null;
    };

    const value = {
        token,
        user,
        login,
        logout,
        loading,
        getUserId
    };

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={value}>
                {loading ? <div>Loading Auth...</div> : children}
            </AuthContext.Provider>
        </QueryClientProvider>
    );
};

export const useAuth = () => useContext(AuthContext);