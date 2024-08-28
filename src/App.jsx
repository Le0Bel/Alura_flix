
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
import Login from './components/Login'
import Card from './components/Card'


function App() {
  const [cardList, setCardList] = useState(videoCards)
  const [cardEditId, setCardEditId] = useState("")
  const [playingCardId, setPlayingCardId] = useState(videoCards[0].id)
  const dialogRef = useRef(null)
  const editVideoRef = useRef(null)
  const loginRef = useRef(null)


  function handleDelete(id) {
    // si la tarjeta aborrar es la que esta en reproducir, cambia primero la activa a reproducir por la primera de cardlist sin incluir la que se va a borrar
    if (id === playingCardId) setPlayingCardId(cardList.filter(card => card.id !== id)[0]?.id)

    setCardList(prevCardList => prevCardList.filter(card => card.id !== id))
  }

  function handleEdit(id) {
    setCardEditId(id)
  }

  function selectAsActiveCard(id) {
    setPlayingCardId(id)
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
  function openLogin() {
    loginRef.current.showModal()
  }
  function closeLogin() {
    loginRef.current.close()
  }

  // Makes a list of the categories contained in cardlist
  const categories = [...new Set(cardList.map(card => card.category))]
  // create the containers for each category and fill them with the category cards
  const cardElements = categories.map(category => {
    return (<div key={category}>
      <h1>{category.toUpperCase()}</h1>
      <div className='front-cards-container'>
        {cardList.filter(card => card.category === category).map(
          card => <Card key={card.id} title={card.title} image={card.image} id={card.id}
            handleDelete={handleDelete} handleEdit={handleEdit} selectAsActiveCard={selectAsActiveCard} />)}
      </div>
    </div>)
  })

  if (cardEditId) editVideoRef.current.showModal() // Abre el modal de editar card si hay alguna tarjeta a editar 

  return (
    <>
      <Login loginRef={loginRef} closeLogin={closeLogin} />
      <EditVideo editVideoRef={editVideoRef} cardEditId={cardEditId} cardList={cardList} cleanCardToEditState={cleanCardToEditState} editCard={editCard} />
      <NewVideoNoControlada newVideo={newVideo} dialogRef={dialogRef} closeNewVideoModal={closeNewVideoModal} />
      { /* <NewVideo newVideo={newVideo} dialogRef={dialogRef} /> */}
      <Header handleModal={openNewVideoModal} openLogin={openLogin} />
      <Home playingCardId={playingCardId} cardList={cardList} />
      <div className='cards-container'>
        {cardElements}
      </div>
      <Footer />

    </>
  )
}

export default App


