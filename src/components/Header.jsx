/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import lbLogo from "/logo-2.svg"




export default function Header({ openLogin, resetEditAndPLayState, showNewCourseButton, openNewCourseForm }) {

    const { user, logout } = useContext(AuthContext)



    return (
        <header>
            <div className='header-logo-container' onClick={() => resetEditAndPLayState()}>
                <img src={lbLogo} className="logo" alt="Learning blocks logo" />
                <p className='logo-letters'>imparo</p>
            </div>
            {user.role === "admin" && showNewCourseButton && 
                <div className='video-controls-wrapper'>
                    <button
                        className="btn new-btn"
                        onClick={openNewCourseForm}
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