import React from "react";
import flixLogo from '../assets/image1.svg'

export default function Header() {
    return(
        <header>
            <img src={flixLogo} className="logo" alt="Alura flix logo" />
            <div>
            <button className="btn home-btn"> HOME </button>
            <button className="btn new-btn"> NUEVO VIDEO </button>
            </div>
      </header>
    )
}