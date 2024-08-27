import { useContext } from 'react'
import flixLogo from '../assets/image1.svg'
import { AuthContext } from '../context/AuthContext'



export default function Header({handleModal, openLogin}) {

    const {user} = useContext(AuthContext)

    return(
        <header>
            <img src={flixLogo} className="logo" alt="Alura flix logo" />
            <div>
            <button className="btn home-btn" onClick={openLogin}> Login </button>
            {user.role==="admin" && <button className="btn new-btn" onClick={handleModal}> NUEVO VIDEO </button>}
            </div>
      </header>
    )
}