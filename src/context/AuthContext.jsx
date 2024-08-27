import { createContext, useState } from "react";


export const AuthContext = createContext()


export default function AuthProvider({ children }) {

    const [user, setUser] = useState({ name: "", isLogged: false, role: "user" })


    function login() {
        // aqui va la Llamada a al backend para autenticar, provisoriamente la harcodeo
        const userData = { name: "Admin", isLogged: false, role: "admin" }
        setUser(userData)
        console.log("login", userData)
    }

    function logout() {
        setUser({ name: "", isLogged: false, role: "user" })
        console.log("logout")
    }


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}