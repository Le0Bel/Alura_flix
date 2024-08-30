/* eslint-disable react/prop-types */
import { useContext } from 'react'
import flixLogo from '../assets/image1.svg'
import { AuthContext } from '../context/AuthContext'



export default function Header({handleModal, openLogin}) {

    const {user, logout } = useContext(AuthContext)

    return(
        <header>
            <img src={flixLogo} className="logo" alt="Alura flix logo" />
            <div>
            {!user.isLogged ? <button className="btn home-btn" onClick={openLogin}> Login </button>
            : <div className='logout'> 
                <h2>{user.name}</h2> 
                <button className="btn home-btn" onClick={logout}> Logout </button>
            </div>            
            }

            {user.role==="admin" && <button className="btn new-btn" onClick={handleModal}> NUEVO VIDEO </button>}
            </div>
      </header>
    )
}