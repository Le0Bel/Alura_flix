
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
  const [editOn, setEditOn] = useState(false)
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
      .catch((error) => { alert("Lo lamentamos no se pudo obener las lista de videos del servidor") })
  }
    , [])

  async function handleDelete(id) {
    // si la tarjeta aborrar es la que esta en reproducir, cambia primero la activa a reproducir por la primera de cardlist sin incluir la que se va a borrar
    if (id === playingCardId) setPlayingCardId(cardList.filter(card => card.id !== id)[0]?.id)

    // Llama la API para borrar el vido de la base de datos
    try {
      const response = await fetch(`http://localhost:3000/videos/${id}`, {
        method: "DELETE",
      })
      if (response.ok) console.log("Video eliminado correctamente")
      // actualiza el estado sin la tarjeta eliminada
      setCardList(prevCardList => prevCardList.filter(card => card.id !== id))
    }
    catch { alert(" No se pudo eliminar el video por un error de conexión con el servidor") }

  }

  function handleEdit(id) {
    setCardEditId(id)
  }

  function selectAsActiveCard(id) {
    setPlayingCardId(id)
  }

  async function newVideo(video) {

    // hace la llamada  a la Api del srvr para agregar en el nuevo
    try {
      const response = await fetch("http://localhost:3000/videos", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video)
      })
      if (response.ok) console.log("Video agregado correctamente")
      // actualiza el estado con el nuevo video  
      setCardList(prev => ([...prev, video]))
    }
    catch { alert(" Error de conexión con el servidor al agregar video") }
  }

  function cleanCardToEditState() {
    setCardEditId("")
  }

  async function editCard(editedCard) {
    try {
      const response = await fetch(`http://localhost:3000/videos/${editedCard.id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedCard)
      })
      if (response.ok) console.log("Video editado correctamente")
      // Actualiza el estado con la card editada
      setCardList(prevCardList => prevCardList.map(
        card => {
          if (card.id !== editedCard.id) { return card }
          else { return editedCard }
        }
      ))
    }
    catch { alert(" Error de conexión con el servidor al editer video") }
  }

  function activateEdition() {
    setEditOn(prev => !prev)
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
    cardElements = categories.map((category, index) => {
      return (<div key={category}>
        <h1 className={`category${index+1}-title`}>{category.toUpperCase()}</h1>
        <div className='front-cards-container'>
          {cardList.filter(card => card.category === category).map(
            card => <Card key={card.id} title={card.title} image={card.image} id={card.id} editOn={editOn} className={`category${index+1}-cards`}
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
      <div className='fixed-top'>
        <Header handleModal={openNewVideoModal} activateEdition={activateEdition} openLogin={openLogin} />
        <Home playingCardId={playingCardId} cardList={cardList} />
      </div>
      <div className='cards-container'>
        {cardElements}
      </div>
      <Footer />

    </>
  )
}

export default App


