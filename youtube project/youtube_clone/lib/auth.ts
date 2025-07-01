import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Make sure to store this secret securely

// Hash password
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Verify password
export const verifyPassword = async (password: string, hashedPassword: string) => {
    // console.log(password, hashedPassword);

    return bcrypt.compare(password, hashedPassword);
};

// Set login session (JWT token in cookies)
export const setLoginSession = (response: NextResponse, userId: number) => {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '8h' });

    response.headers.set(
        'Set-Cookie',
        cookie.serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60, // 1 hour
            path: '/',
        })
    );
};

// Get login session (extract JWT token from cookies)
export const getLoginSession = (req: any) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    console.log(cookies);
    if (!token) {
        return null;
    }

    try {
        return jwt.verify(token, JWT_SECRET) as { userId: number };
    } catch (error) {
        return null;
    }
};

// Clear login session (clear the JWT cookie)
export const clearLoginSession = (res: any) => {
    const serialized = cookie.serialize('auth_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
    });

    res.setHeader('Set-Cookie', serialized);
};
