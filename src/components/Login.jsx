

export default function login({ loginRef }) {

    function handleSubmit(e) {
        e.preventDefault();
    }


    return (
        <dialog ref={loginRef}>
            <div className="edit-container">
                <h1>Login</h1>
                <form action="" className="edit-form" onSubmit={handleSubmit}>

                    <label htmlFor="name" >Nombre de Usuario</label>
                    <input
                        className="edit-input"
                        type="text" name="name"
                        required
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        className="edit-input"
                        type="text"
                        name="password"
                    />

                </form>
            </div>
        </dialog>

    )
}