import React, {
    createContext,
    useContext,
    useState
} from "react";
import StorageService from "service/storage";


export const AuthManager = createContext({});

const useAuth = () => useContext(AuthManager);

export const AuthProvider = ({ children }) => {
    const [token, seToken] = useState(() => {
        const current_user = StorageService.getUser()
        return current_user ?? null

    });

    const [user, setUser] = useState(() => {
        const current_user = StorageService.getUser()
        return current_user?.user ?? null
    })

    const [search, setSearch] = useState("")

    const Authenticate = (data) => {
        seToken(data)
        setUser(data?.user)
        StorageService.saveToken(data)
    }


    return (
        <AuthManager.Provider value={{
            isAuthenticated: !!token,
            Authenticate,
            user,
            search, 
            setSearch
        }}>
            {children}
        </AuthManager.Provider>
    )
}

export default useAuth;