/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import ReactPlayer from 'react-player'

export default function Home({ playingCardId, playingList, viewedCounter, handleViewed, startTime, playing, isPlaying }) {

    const playingCard = playingList.filter(card => card.id === playingCardId)[0]
    const refPlayer = useRef(null)
   
    const { user } = useContext(AuthContext)
   
    useEffect(() => {    // al montar el player resetea el scroll a 0 para ue quede visible
        window.scrollTo(0, 0)
      }, [])

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
                                <p className="video-counter"> {`Videos ${viewedCounter}/${playingList.length}`}</p>
                            </div>
                        </div>
                        <div className="progress-bar-container">
                            <p>Progreso de la colección</p>
                            <progress  value={playingList.length!==0 ?viewedCounter/playingList.length : 0 } className="progress"> </progress>
                            <div className="progress-bar-labels">
                                <p>0%</p>
                                <p>25%</p>
                                <p>50%</p>
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