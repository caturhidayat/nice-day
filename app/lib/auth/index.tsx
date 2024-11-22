"use client";

import {
    createContext,
    ReactNode,
    use,
    useContext,
    useEffect,
    useState,
} from "react";

type Role = {
    EMPLOYEE: "EMPLOYEE";
    SUPERVISOR: "SUPERVISOR";
    MANAGER: "MANAGER";
    ADMIN: "ADMIN";
};

type UserType = {
    id: String;
    name: String;
    username: String;
    password: String;
    role: Role;
    departmentId: String;
};

type UserContextType = {
    user: UserType | null;
    setUser: (user: UserType) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function useUser(): UserContextType {
    let context = useContext(UserContext);
    if (context === null) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export function UserProvider({
    children,
    userPromise,
}: {
    children: ReactNode;
    userPromise: Promise<UserType | null>;
}) {
    let initialUser = use(userPromise);
    let [user, setUser] = useState<UserType | null>(initialUser);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
