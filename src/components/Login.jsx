/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login({ loginRef, closeLogin }) {

    const [error, setError] = useState("")
    const { login } = useContext(AuthContext)

    function handleSubmit(e) {
        e.preventDefault()
        const fieldsValues = Object.fromEntries(new FormData(e.target))
        const res = login(fieldsValues.name, fieldsValues.password) //llamo a la API del backend para validar el ususario
        if (res === "error") setError("Nombre o contraseña incorrecta, intente nuevamente")
        else {
            e.target.reset() //limpio el formulario
            setError("")
            closeLogin()
        }
    }


    return (
        <dialog ref={loginRef}>
            <div className="edit-container login-container">
                <h1 className="login-title">Iniciar Sesión</h1>
                <form action="" className="edit-form" onSubmit={handleSubmit}>

                    <label htmlFor="name" >Nombre de Usuario</label>
                    <input
                        className="edit-input"
                        type="text" name="name" id="name"
                        required
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        className="edit-input"
                        type="password"
                        name="password"
                        id="password"
                    />
                    <div className="error-msg-container">
                        {error}
                    </div>
                    <button type="submit" className='login-btn-submit' >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </dialog>
    )
}