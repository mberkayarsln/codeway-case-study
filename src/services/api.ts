import { getAuth } from "firebase/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not authenticated");
    }

    const token = await user.getIdToken();

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...options.headers
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        throw {
            message: `API request failed with status ${response.status}`,
            status: response.status
        };
    }

    return response.json();
}