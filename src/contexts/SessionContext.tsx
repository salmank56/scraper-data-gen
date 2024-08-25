import React, { createContext, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERROR_PATH, SESSION_TIMEOUT_DURATION, WINDOWS_SESSION_REQUEST, WINDOWS_VALID_ORIGINS } from "../config";

export interface Session {
    token: string;
    expiry: number;
    roles: string[];
    vertical: string;
    username: string;
}
const session: Session = {
    token: "",
    expiry: 0,
    roles: [],
    vertical: "",
    username: "",
};

const initialState = {getSession: ()=> session, reload: () => {}};
export const SessionContext = createContext<typeof initialState>(initialState);
export const SessionProvider = ({ children, loader }: { children: ReactNode; loader: React.ReactNode }) => {
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const origin = useRef(WINDOWS_VALID_ORIGINS[0]);

    const reload = useCallback(() => {
        window.opener.postMessage(WINDOWS_SESSION_REQUEST, origin.current);
    }, []);
    const getSession = useCallback(() => {
        if (new Date().getTime() < session.expiry - 60000)
            reload();
        return {...session, roles: [...session.roles]};
    }, [reload]);
    

    useEffect(() => {
        const handlePostMessage = (event: MessageEvent) => {
            if (!WINDOWS_VALID_ORIGINS.includes(event.origin)) return;
            origin.current = event.origin;
            const { token, expiry, roles, vertical, username } = event.data;
            if (token) {
                session.token = token;
                session.roles = roles;
                session.expiry = expiry;                
                session.vertical = vertical;
                session.username = username;
                setLoading(false);
                clearTimeout(timeoutId);
            } else {
                navigate(ERROR_PATH);
            }
        };
        const timeoutId = setTimeout(() => navigate(ERROR_PATH), SESSION_TIMEOUT_DURATION);
        window.addEventListener("message", handlePostMessage);
        if (window.opener) window.opener.postMessage(WINDOWS_SESSION_REQUEST, "*");

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("message", handlePostMessage);
        };
    }, [navigate]);
    
    if (loading) return loader;
    return <SessionContext.Provider value={{getSession, reload}}>{children}</SessionContext.Provider>;
};
