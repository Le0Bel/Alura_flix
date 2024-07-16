import React from "react";
import flixLogo from '../assets/image1.svg'

export default function Footer() {
    return(
        <footer>
             <img src={flixLogo} className="logo" alt="Alura flix logo" />
        </footer>
    )
}