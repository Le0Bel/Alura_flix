/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import editVideoSvg from '/edit.svg'
import lbLogo from "/logo-2.svg"




export default function Header({ handleModal, activateEdition, openLogin, isPlaying, resetPlayingCardId }) {

    const { user, logout } = useContext(AuthContext)
    const [editVideoBtn, setEditVideoBtn] = useState(false)

    function switchEdit() {
        activateEdition()
        setEditVideoBtn(prev => !prev)
        
    }
    
    return (
        <header>
            <div className='header-logo-container' onClick={()=> resetPlayingCardId()}>
            <img src={lbLogo} className="logo" alt="Learning blocks logo" />
            <p className='logo-letters'>imparo</p>
            </div>
                {user.role === "admin" && <div className='video-controls-wrapper'>
                    <button
                         className="btn new-btn" 
                         onClick={handleModal}
                         > <span>➕ NUEVO CURSO </span>
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