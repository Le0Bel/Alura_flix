import React from "react";
import playerImg from '../assets/home-fondo-player.png'

export default function Home() {
    return (
        <>
        <section className="hero">
            <div className="hero-info">
                <h2 className="hero-info-title">Front End</h2>
                <p className="hero-info-text">Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.</p>
            </div>
            <img src={playerImg} className="player-img" alt="" />
        </section>
        <section className="cards-container">

        </section>
        </>
    )
}