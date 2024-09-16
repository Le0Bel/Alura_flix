import React from "react";
import lbLogo from "/logo-2.svg"

export default function Footer() {
    return(
        <footer>
             <img src={lbLogo} className="logo footer-logo" alt="Alura flix logo" />
        </footer>
    )
}