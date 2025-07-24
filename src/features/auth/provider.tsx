/**
 * Auth provider component for state management and business logic
 */
"use client";

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {AuthContext} from './context';
import {AuthService} from './service';
import {Shop, User} from './models';

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [redirectTo, setRedirectTo] = useState("/");
    const router = useRouter();
    const [shop, setShop] = useState<Shop | null>(null);
    // Initialize by checking auth status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);
    const getShop = async (userId:string) => {
        if (!userId) return;
        try {
            const shop = await AuthService.getShop(userId);
            setShop(shop);
        } catch (error) {
            console.error('Failed to fetch shop:', error);
        }
    };

    // Update specific user details without replacing the entire user object
    const updateUserDetails = (details: Partial<User>) => {
        if (!user) return;

        const updatedUser = {...user, ...details};
        setUser(updatedUser);
    };

    const loginWithRedirect = async (redirectTo: string) => {
        setRedirectTo(redirectTo);
        router.push('/auth/login');
    };

    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const userData = await AuthService.getCurrentUser();
            setUser(userData.userInfo);
            await getShop(userData.userInfo.userId);

        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
            const currentPath = window.location.pathname;
            loginWithRedirect(currentPath);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password);
            const user = response.userInfo;
            setUser(user);

            const dest = redirectTo;
            if (redirectTo !== "/") {
                setRedirectTo("/");
            }
            router.push(dest);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (email: string, password: string) => {
        try {
            const response = await AuthService.register(email, password);
            return response;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            shop,
            user,
            loading,
            login,
            register,
            logout,
            loginWithRedirect,
            checkAuthStatus,
            updateUserDetails
        }}>
            {children}
        </AuthContext.Provider>
    );
}
