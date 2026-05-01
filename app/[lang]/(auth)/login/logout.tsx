'use client';

import React from 'react';

const BACKEND_URL = "http://localhost:8088";

/**
 * LogoutButton Component
 * 
 * Provides logout functionality with CSRF protection and token cleanup.
 * 
 * @component
 * @example
 * return <LogoutButton />
 * 
 * @description
 * This component handles:
 * - Token-based logout API call
 * - CSRF token retrieval from cookies
 * - Local storage cleanup
 * - Automatic redirect to login page
 * - Error handling and logging
 * 
 * @state None - This is a stateless component
 * @sideeffects
 * - Modifies localStorage by removing 'token'
 * - May redirect to '/login'
 * - May output console errors
 */
function LogoutButton() {
    /**
     * Handles the logout process
     * 
     * @async
     * @description
     * - Retrieves JWT token from localStorage
     * - Gets CSRF token from cookies
     * - Makes authenticated POST request to logout endpoint
     * - Clears local storage on success
     * - Redirects to login page
     * - Handles and logs errors appropriately
     */
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            const csrfToken = await getCSRFToken();

            const headers = {
                'Authorization': `Bearer ${token}`,
                ...(csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : {})
            };

            const response = await fetch(`${BACKEND_URL}/api/v1/auth/logout`, {
                method: 'POST',
                headers: headers
            });

            if (response.ok) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                console.error('Logout failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    /**
     * Retrieves CSRF token from browser cookies
     * 
     * @async
     * @returns {Promise<string|null>} CSRF token if found, null otherwise
     * 
     * @description
     * - Parses document.cookie string
     * - Looks for 'XSRF-TOKEN' cookie
     * - Returns token value if found
     */
    async function getCSRFToken() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('XSRF-TOKEN=')) {
                return cookie.substring('XSRF-TOKEN='.length);
            }
        }
        return null;
    }

    return (
        <button
            onClick={handleLogout}
            aria-label="Log out of current session"
        >
            Logout
        </button>
    );
}

export default LogoutButton;