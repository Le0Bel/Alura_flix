import  { useEffect, useState } from "react";

export default function Home({ playingCardId, cardList }) {

    const [playing, setPlaying] = useState(false)
    const playingCard = cardList.filter(card => card.id === playingCardId)[0]
    
    useEffect( () => {
        setPlaying(false)
    }
        ,[playingCardId])

    return (
        <>
            <section className="hero">
                <div className="hero-info">
                    <h2 className="hero-info-title">{playingCard.category.toUpperCase()}</h2>
                    <p className="hero-info-text">{playingCard.description}</p>
                </div>
                {!playing ?
                    <img src={playingCard.image} className="player-img" alt="" onClick={() => setPlaying(true)}/>
                    : <iframe className="player-img"  src={`${playingCard.video}?rel=0&autoplay=1`} title={playingCard.title} frameBorder="0" allow="autoplay;" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }
            </section>
            <section className="cards-container">

            </section>
        </>
    )
}