import CryptoJS from "crypto-js";
import React, { createContext, useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ENV } from "../keys";
import { apiRequest } from "../utilities/apiRequest";

const SECRET_KEY = ENV.secretKey;

interface User {
    id?: string;
    email: string;
    password: string;
    name?: string;
    role?: "advocate" | "user";

}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Encrypt function
const encryptData = (data: any) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt function
const decryptData = (ciphertext: string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        return null;
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate()

    useLayoutEffect(() => {
        const savedUser = sessionStorage.getItem("user");
        const savedToken = sessionStorage.getItem("token");

        if (savedUser && savedToken) {
            const decryptedUser = decryptData(savedUser) as User | null;
            const decryptedToken = decryptData(savedToken) as string | null;

            console.log({
                decryptedUser,
                decryptedToken,
            })
            if (
                decryptedUser &&
                typeof decryptedUser === "object" &&
                decryptedUser.email
            ) {
                setUser(decryptedUser);
                setToken(decryptedToken);
            } else {
                console.warn("Invalid or tampered authentication data. Logging out...");
                logout();
            }
        }
    }, []);

    const login = async (userData: User, state: string) => {
        try {
            const res = await apiRequest({
                method: "POST",
                url: `/auth/${state}`,
                data: userData,
            })
            const encryptedUser = encryptData(res.user);
            const encryptedToken = encryptData(res.token);
            setToken(res.token);
            setUser(res.user);
            sessionStorage.setItem("user", encryptedUser);
            sessionStorage.setItem("token", encryptedToken);
            toast.success(res.message || "Login successful!");
            navigate("/")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An error occurred during login.");
            return;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        window.history.replaceState(null, "", "/");
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
