/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import flixLogo from '../assets/image1.svg'
import { AuthContext } from '../context/AuthContext'



export default function Header({ handleModal, activateEdition, openLogin }) {

    const { user, logout } = useContext(AuthContext)
    const [editVideoBtn, setEditVideoBtn] = useState(false)

    function switchEdit() {
        activateEdition()
        setEditVideoBtn(prev => !prev)
        
    }
    
    return (
        <header>
            <img src={flixLogo} className="logo" alt="Alura flix logo" />
           
                {user.role === "admin" && <div className='video-controls-wrapper'>
                    <button
                         className="btn new-btn" 
                         onClick={handleModal}
                         > NUEVO VIDEO 
                    </button>
                    <button 
                        className={editVideoBtn?"btn edit-btn edit-btn-active":"btn edit-btn"} 
                        onClick={switchEdit}
                    > {editVideoBtn?"EDITANDO VIDEOS":"EDITAR VIDEOS"} 
                    </button>
                </div>}
                
                {!user.isLogged ? <button className=" login-btn" onClick={openLogin}> Login </button>
                    : <div className='logout'>
                        <h3 className="logged-user">{user.name}</h3>
                        <button className="log-btn" onClick={logout}> Logout </button>
                    </div>
                }

        </header>
    )
}