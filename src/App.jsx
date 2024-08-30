
import { useEffect, useRef } from 'react'
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
  const [cardList, setCardList] = useState([])
  const [cardEditId, setCardEditId] = useState("")
  const [playingCardId, setPlayingCardId] = useState("")
  const dialogRef = useRef(null)
  const editVideoRef = useRef(null)
  const loginRef = useRef(null)

  //Fetch inicial de videos de JsonSrvr

  useEffect(() => {
    fetch("http://localhost:3000/videos")   // ** agregar mejor control de errores al fetch y pasarlo a un custom Hook useFetch
      .then(res => res.json())
      .then(videos => {
        setCardList(videos)
        setPlayingCardId(videos[0].id)
      })
      .catch(error => alert("Unable to get video data from the server"))
  }
    , [])

  async function handleDelete(id) {
    // si la tarjeta aborrar es la que esta en reproducir, cambia primero la activa a reproducir por la primera de cardlist sin incluir la que se va a borrar
    if (id === playingCardId) setPlayingCardId(cardList.filter(card => card.id !== id)[0]?.id)

    setCardList(prevCardList => prevCardList.filter(card => card.id !== id))
    // Llama la API para borrar el vido de la base de datos
    try {
      const response = await fetch(`http://localhost:3000/videos/${id}`, {
        method: "DELETE",
      })
      if (response.ok) console.log("Video eliminado correctamente")
    }
    catch { alert(" Error de conexión con el servidor") }

  }

  function handleEdit(id) {
    setCardEditId(id)
  }

  function selectAsActiveCard(id) {
    setPlayingCardId(id)
  }

  async function newVideo(video) {
    setCardList(prev => ([...prev, video]))
    // hace la llamada  a la Api del srvr para agregar en el nuevo
    const videoJson = await JSON.stringify(video)
    try {
      const response = await fetch("http://localhost:3000/videos", {
        method: "POST",
        body: videoJson
      })
      if (response.ok) console.log("Video agregado correctamente")
    }
    catch { alert(" Error de conexión con el servidor") }
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

  let cardElements
  if (cardList.length > 0) {
    // Makes a list of the categories contained in cardlist
    const categories = [...new Set(cardList.map(card => card?.category))]
    // create the containers for each category and fill them with the category cards
    cardElements = categories.map(category => {
      return (<div key={category}>
        <h1>{category.toUpperCase()}</h1>
        <div className='front-cards-container'>
          {cardList.filter(card => card.category === category).map(
            card => <Card key={card.id} title={card.title} image={card.image} id={card.id}
              handleDelete={handleDelete} handleEdit={handleEdit} selectAsActiveCard={selectAsActiveCard} />)}
        </div>
      </div>)
    })
  }
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


