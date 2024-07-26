
import { useRef } from 'react'
import './App.css'
import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { useState } from 'react'
import videoCards from './videoCards'
import NewVideo from './components/NewVideo'
import NewVideoNoControlada from './components/NewVideoNoControlada'
import EditVideo from './components/EditVideo'


function App() {
  const [cardList, setCardList] = useState(videoCards)
  const [cardEditId, setCardEditId] = useState("")
  const [playingCardId, setPlayingCardId] = useState(videoCards[0].id)
  const dialogRef = useRef(null)
  const editVideoRef = useRef(null)

  function Card({ image, title, id }) {
    return (
      <div className='card'>
        <img className='card-img' src={image} alt="" onClick={() => setPlayingCardId(id)} />
        <h3 className='card-title'>{title}</h3>
        <div className='card-action'>
          <div className='card-edit' onClick={() => handleEdit(id)}>
            <img src="edit.svg" alt="" />
            <p>edit</p>
          </div>
          <div className='card-delete' onClick={() => handleDelete(id)}>
            <p>delete</p>
            <img src="delete.svg" alt="" />
          </div>
        </div>
      </div>
    )
  }

  function handleDelete(id) {
    // si la tarjeta aborrar es la que esta en reproducir, cambia primero la activa a reproducir por la primera de cardlist si incluir la a borrar
    console.log(id)
    console.log(cardList.filter(card => card.id !== id)[0]?.id, "proxima Carta" )
    if (id === playingCardId) setPlayingCardId(cardList.filter(card => card.id !== id)[0]?.id)
    setCardList(prevCardList => prevCardList.filter(card => card.id !== id))
  }

  function handleEdit(id) {
    setCardEditId(id)
  }

  function newVideo(video) {
    setCardList(prev => ([...prev, video]))
  }

  function cleanCardToEditState() {
    setCardEditId("")
  }

  function editCard(editedCard) {
    setCardList(prevCardList => prevCardList.map(
      card => {
        if (card.id !== editedCard.id) { return card }
        else { return editedCard }
      }
    )
    )
  }

  function openNewVideoModal() {
    dialogRef.current.showModal()
  }
  function closeNewVideoModal() {
    dialogRef.current.close()
  }

  const frontElements = cardList.filter(card => card.category === "frontend").map(
    card => <Card key={card.id} title={card.title} image={card.image} id={card.id} />)
  const backElements = cardList.filter(card => card.category !== "frontend").map(
    card => <Card key={card.id} title={card.title} image={card.image} id={card.id} />)

  if (cardEditId) editVideoRef.current.showModal() // Abre el modal de editar card si hay alguna tarjeta a editar 

  return (
    <>
      <EditVideo editVideoRef={editVideoRef} cardEditId={cardEditId} cardList={cardList} cleanCardToEditState={cleanCardToEditState} editCard={editCard} />
      <NewVideoNoControlada newVideo={newVideo} dialogRef={dialogRef} closeNewVideoModal={closeNewVideoModal} />
      { /* <NewVideo newVideo={newVideo} dialogRef={dialogRef} /> */}
      <Header handleModal={openNewVideoModal} />
      <Home playingCardId={playingCardId} cardList={cardList} />
      <div className='cards-container'>
        <div className='cards-front'>
          <h1>FrontEnd</h1>
          <div className='front-cards-container'>
            {frontElements}
          </div>
        </div>
        <div className='cards-back'>
          <h1>BackEnd</h1>
          <div className='back-cards-container'>
            {backElements}
          </div>
        </div>
      </div>

      <Footer />

    </>
  )
}

export default App


