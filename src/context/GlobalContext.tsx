import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUsers } from "../services/index";
import { GlobalProps, Users } from "../interfaces/data";

const GlobalContext = createContext<GlobalProps | undefined>(undefined);

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassWord] = useState<string>("");
    const [users, setUsers] = useState<Users[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loggedInUser, setLoggedInUser] = useState<Users | null>(null);
    const [showRemove, setShowRemove] = useState<boolean>(false);
    const [deletedUser, setDeletedUser] = useState<Users | null>(null); 

    const getUser = async () => {
        const userArray = await getUsers();
        setUsers(userArray);

        const saveUser = localStorage.getItem("loggedInUser");
        if (saveUser) {
            const parsedUser = JSON.parse(saveUser);
            const isUser = userArray.find((user: Users) => user.email === "ali@gmail.com");
            if (isUser && parsedUser.email === "ali@gmail.com") {
                setLoggedInUser(isUser);
                setIsAdmin(true);
            } else {
                const matchedUser = userArray.find((user: Users) => user.email === parsedUser.email);
                if (matchedUser) {
                    setLoggedInUser(matchedUser);
                    setIsAdmin(false);
                }
            }
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const closeDeleteModal = () => {
        setShowRemove(false);
        setDeletedUser(null);
    };

    const openDeleteModal = (user: any) => {
       setShowRemove(true);
       setDeletedUser(user);
    };

    const contextValue: GlobalProps = {
        showPassword,
        setShowPassword,
        confirmPassword,
        setConfirmPassWord,
        users,
        setUsers,
        isAdmin,
        loggedInUser,
        showRemove,
        setShowRemove,
        deletedUser,
        closeDeleteModal,
        openDeleteModal,
    };

    const Component = GlobalContext.Provider;
    return <Component value={contextValue}>{children}</Component>;
};

const useGlobalContext = (): GlobalProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("Error GlobalContext");
    }
    return context;
};

export { GlobalContextProvider, useGlobalContext };
