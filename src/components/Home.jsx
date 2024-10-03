/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import ReactPlayer from 'react-player'

export default function Home({ playingCardId, cardList, handleViewed, startTime, playing, isPlaying }) {


    const playingCard = cardList.filter(card => card.id === playingCardId)[0]
    const refPlayer = useRef(null)

    const { user } = useContext(AuthContext)


    useEffect(() => { // resetea el player si cambia de video seleccionado
        isPlaying(false)
    }
        , [playingCardId, isPlaying])

    useEffect(() => { // resetea el player si de desloguea el usuario
        if (!user.isLogged) isPlaying(false)
    }
        , [user.isLogged, isPlaying])


    function checkStart() {   // Si el video ya estaba empezado lo continua desde donde habia quedado (segun lo que guarda en LS la funcion savePlayedInfo)
        if (startTime.current > 0) {
            refPlayer.current.seekTo(startTime.current)
        }
    }

    function handleOnEnded() {
        isPlaying(false)
        handleViewed(playingCardId)
    }

    function savePlayedInfo(info) {  // guarda la informacion del video activo 
        if (user.role === "user") {
            let activeVideo = { id: playingCardId, playedSeconds: info.playedSeconds, playedPercent: info.played }
            localStorage.setItem(user.name, JSON.stringify(activeVideo))  //  guarda en localstorage el video activo y tiempo reproducido para el usuario actual
            startTime.current = info.playedSeconds // actualiza la referencia de startime para que si se activa y desactiva el play el video comienze de donde estaba
        }
    }

    return (
        <>
            {playingCardId ?

                <section className="hero">

                    {!playing ?
                        <div className="video-img-wrapper" onClick={() => isPlaying(true)} >
                            <img src="./playButton.svg" alt="" />
                        </div>
                        :
                        <div className="video-player-wrapper">
                            <ReactPlayer ref={refPlayer}
                                controls={true} playing={playing}
                                height="100%" width="100%"
                                config={{ youtube: { playerVars: { rel: 0, color: "white" } }, }}
                                url={playingCard.video} progressInterval={5000} onProgress={savePlayedInfo}
                                onReady={checkStart} onEnded={handleOnEnded}
                            />
                        </div>
                    }

                    <div className="hero-info">
                        <div className="hero-info-top">
                            <div className="hero-info-top-left">
                                <p className="hero-info-title">{playingCard?.title}</p>
                                <p className="hero-info-text">{playingCard?.description}</p>
                            </div>
                            <div className="hero-info-top-right">
                                <p className="video-counter"> Videos 1/8</p>
                                <div className="favorite-container">
                                    <p>Favoritos</p>
                                    <svg width="25" height="25" viewBox="0 0 25 25" >
                                        <path className="favorite-star-filled" d="M11.0734 2.00861C11.5224 0.626642 13.4776 0.626641 13.9266 2.00861L15.5044 6.86475C15.8391 7.8948 16.799 8.5922 17.8821 8.5922L22.9881 8.5922C24.4412 8.5922 25.0454 10.4516 23.8698 11.3057L19.7389 14.307C18.8627 14.9436 18.4961 16.072 18.8307 17.1021L20.4086 21.9582C20.8576 23.3402 19.2759 24.4894 18.1003 23.6353L13.9695 20.634C13.0932 19.9974 11.9068 19.9974 11.0305 20.634L6.89966 23.6353C5.72409 24.4894 4.14237 23.3402 4.5914 21.9582L6.16925 17.1021C6.50394 16.072 6.13729 14.9436 5.26107 14.307L1.1302 11.3057C-0.045373 10.4516 0.558788 8.5922 2.01188 8.5922L7.11792 8.5922C8.20099 8.5922 9.16088 7.8948 9.49556 6.86475L11.0734 2.00861Z" stroke="#656565" />
                                    </svg>
                                </div>

                            </div>
                        </div>
                        <div className="progress-bar-container">
                            <p>Progreso de la colección</p>
                            <progress max="100" value="70" className="progress">70% </progress>
                            <div className="progress-bar-labels">
                                <p>0%</p>
                                <p>25%</p>
                                <p>5%</p>
                                <p>100%</p>
                            </div>

                        </div>
                    </div>

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