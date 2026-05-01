// В Next.js API route
import { serialize } from 'cookie';

const setTokenCookie = (res, token) => {
    const serialized = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'strict', // Protect against CSRF
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
    });
    res.setHeader('Set-Cookie', serialized);
};