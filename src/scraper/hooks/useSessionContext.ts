import { SessionContext } from "@/contexts/SessionContext";
import { useContext } from "react";

export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) throw new Error("useSessionContext must be used within a SessionProvider");
    return context;
};