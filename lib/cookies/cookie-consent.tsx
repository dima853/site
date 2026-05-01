'use client'

import React, { useState, useEffect } from 'react';
import CookieConsent from "react-cookie-consent";

const CookieConsentBanner = () => {
    const [isConsentGiven, setIsConsentGiven] = useState(false);

    useEffect(() => {
        // Check if consent is already given (e.g., from a previous session)
        const consent = localStorage.getItem('cookieConsent');
        if (consent === 'true') {
            setIsConsentGiven(true);
            // Load analytics scripts or set cookies here
            loadAnalytics();
        }
    }, []);

    const handleAccept = () => {
        setIsConsentGiven(true);
        localStorage.setItem('cookieConsent', 'true');
        loadAnalytics();
    };

    const handleDecline = () => {
        setIsConsentGiven(false);
        localStorage.setItem('cookieConsent', 'false');
        // Remove any non-essential cookies if the user declines
        removeNonEssentialCookies();
    };

    const loadAnalytics = () => {
        // Example: Load Google Analytics script
        console.log("Loading Analytics");
        // Implement your analytics script loading logic here
    };

    const removeNonEssentialCookies = () => {
        // Implement your logic to remove cookies.  Example:
        //document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    return (
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            declineButtonText="Decline"
            cookieName="myAwesomeCookieName"
            containerClasses="bg-black text-gray-700 py-1 px-3 rounded-md shadow-md" // Light gray background
            contentClasses="flex items-center" // Tailwind for content
            buttonClasses="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md ml-4" // Green Accept button
            declineButtonClasses="text-gray-700 font-medium py-2 px-4 rounded-md ml-2 hover:bg-gray-200" // Gray Decline Button
            expires={150}
            onAccept={handleAccept}
            onDecline={handleDecline}
        >
            This website uses cookies to enhance user experience.  By using this site, you agree to our use of cookies.
            {/*<a href="/privacy-policy">Learn More</a>*/}
        </CookieConsent>
    );
};

export default CookieConsentBanner;