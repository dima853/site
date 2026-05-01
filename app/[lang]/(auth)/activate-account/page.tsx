'use client';

import { useState, useRef } from 'react';

const BACKEND_URL = "http://localhost:8088";

/**
 * ActivationPage Component
 * 
 * Handles account activation through a 6-digit verification code.
 * 
 * @component
 * @example
 * return <ActivationPage />
 * 
 * @description
 * This component provides:
 * - A 6-digit input field for activation code
 * - Real-time validation of numeric input
 * - Automatic focus shifting between fields
 * - Submission handling with backend API
 * - Success/error state management
 * - Redirection to login upon success
 * - Retry mechanism for failed attempts
 * 
 * @state {string[]} codeInput - Array holding each digit of the activation code
 * @state {string} message - Status message to display to user
 * @state {boolean} isOkay - Flag indicating successful activation
 * @state {boolean} submitted - Flag indicating if form was submitted
 * @ref {React.RefObject} inputRefs - Array of refs to each input element
 */
function ActivationPage() {
    const [codeInput, setCodeInput] = useState<string[]>(Array(6).fill(''));
    const [message, setMessage] = useState<string>('');
    const [isOkay, setIsOkay] = useState<boolean>(true);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    /**
     * Handles input changes for activation code digits
     * 
     * @param {number} index - Index of the digit being modified
     * @param {React.ChangeEvent<HTMLInputElement>} event - Input change event
     * 
     * @description
     * - Validates input to ensure only single digits are accepted
     * - Updates state with new digit value
     * - Automatically moves focus to next field when digit is entered
     */
    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (!/^\d?$/.test(value)) {
            return;
        }

        const newCodeInput = [...codeInput];
        newCodeInput[index] = value;
        setCodeInput(newCodeInput);

        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    /**
     * Handles keyboard events for activation code inputs
     * 
     * @param {number} index - Index of current input field
     * @param {React.KeyboardEvent<HTMLInputElement>} event - Keyboard event
     * 
     * @description
     * - Moves focus to previous field on backspace when current field is empty
     * - Submits form when enter is pressed and all fields are filled
     */
    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && !codeInput[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (event.key === 'Enter' && codeInput.every(Boolean)) {
            handleCodeCompleted(codeInput.join(''));
        }
    };

    /**
     * Handles activation code submission
     * 
     * @param {string} code - Complete 6-digit activation code
     * 
     * @description
     * - Makes API call to verify activation code
     * - Updates state based on response
     * - Handles both success and error cases
     * - Sets appropriate status messages
     */
    const handleCodeCompleted = async (code: string) => {
        try {
            const apiUrl = `${BACKEND_URL}/api/v1/auth/activate-account?token=${code}`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setIsOkay(true);
                setMessage('');
            } else {
                setIsOkay(false);
                setMessage('Activation failed. Please check your code and try again.');
            }
            setSubmitted(true);
        } catch (error) {
            console.error('Activation error:', error);
            setIsOkay(false);
            setMessage('An error occurred. Please try again later.');
            setSubmitted(true);
        }
    };

    /**
     * Redirects user to login page
     * 
     * @description
     * - Called after successful activation
     * - Performs full page navigation to login route
     */
    const redirectToLogin = () => {
        window.location.href = '/login';
    };

    /**
     * Resets form for retry after failed activation
     * 
     * @description
     * - Clears all input fields
     * - Resets submission state
     * - Returns focus to first input field
     */
    const handleTryAgain = () => {
        setSubmitted(false);
        setCodeInput(Array(6).fill(''));
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
    };

    return (
        <div className="container">
            {submitted ? (
                isOkay ? (
                    <div className="activation-message">
                        <h2>Activation Successful!</h2>
                        <p>Your account has been successfully activated.</p>
                        <button className="btn btn-primary" onClick={redirectToLogin}>
                            Go to Login
                        </button>
                    </div>
                ) : (
                    <div className="activation-error">
                        <h2>Activation Failed!</h2>
                        <p>{message}</p>
                        <button className="btn btn-primary" onClick={handleTryAgain}>
                            Try again
                        </button>
                    </div>
                )
            ) : (
                <div className="text-center" style={{ width: '400px' }}>
                    <h2>Type your activation code</h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={codeInput[index] || ''}
                                onChange={(event) => handleChange(index, event)}
                                onKeyDown={(event) => handleKeyDown(index, event)}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                style={{
                                    width: '2em',
                                    textAlign: 'center',
                                    margin: '0.25em',
                                    fontSize: '1.5em',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                        ))}
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => handleCodeCompleted(codeInput.join(''))}
                        disabled={!codeInput.every(Boolean)}
                    >
                        Activate
                    </button>
                </div>
            )}
        </div>
    );
}

export default ActivationPage;