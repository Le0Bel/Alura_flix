/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home({ playingCardId, cardList }) {

    const [playing, setPlaying] = useState(false)
    const playingCard = cardList.filter(card => card.id === playingCardId)[0]

    const { user } = useContext(AuthContext)

    useEffect(() => { // resetea el player si cambia de video seleccionado
        setPlaying(false)
    }
        , [playingCardId])

    useEffect(() => { // resetea el player si de desloguea el usuario
        !user.isLogged && setPlaying(false)
    }
        , [user.isLogged])


    return (
        <>
            {playingCardId ?
                <section className="hero">
                    <div className="hero-info">
                        <h2 className="hero-info-title">{playingCard?.category.toUpperCase()}</h2>
                        <p className="hero-info-text">{playingCard?.description}</p>
                    </div>
                    {!playing ?
                        <img src={playingCard?.image} className="player-img" alt="" onClick={() => setPlaying(true)} />
                        : <iframe className="player-img" src={`${playingCard.video}?rel=0&autoplay=1`} title={playingCard.title} frameBorder="0" allow="autoplay;" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    }
                </section>
                : <section className="hero">
                    <div className="hero-info">
                        <h2 className="hero-info-title">No video available</h2>
                        <p className="hero-info-text">Please use the new button on the top of the page to add videos to the library</p>
                    </div>

                    <img src='/slashcamera.svg' className="player-img" alt="" />

                </section>
            }

        </>
    )
}