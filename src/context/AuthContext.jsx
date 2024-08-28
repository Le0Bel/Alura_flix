/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import mockuserdata from "../mockuserdata";


export const AuthContext = createContext()


export default function AuthProvider({ children }) {

    const [user, setUser] = useState({ name: "", isLogged: false, role: "user" })


    function login(username, pass) {
        // aqui deberia ir la llamada a al backend para autenticar,
        // esta mockeado con un arreglo de objetos fijos
        const userData = mockuserdata.filter( dbuser => (dbuser.name === username && dbuser.password === pass) )
        if (userData.length > 0) {
            const user=userData[0]
            setUser({ name: user.name, isLogged: true, role: user.role })
            return "Login Exitoso"
        }
        else return "error"
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