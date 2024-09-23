
import { useCallback, useContext, useEffect, useRef } from 'react'
import './App.css'
import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { useState } from 'react'
import VideoDataForm from './components/VideoDataForm'
import Login from './components/Login'
import Card from './components/Card'
import { AuthContext } from './context/AuthContext'
import { deleteVideos, editVideo, getVideos } from './services/videosCrud'


function App() {
  const [cardList, setCardList] = useState([])
  const [cardEditId, setCardEditId] = useState("")
  const [playingCardId, setPlayingCardId] = useState("")
  const [editOn, setEditOn] = useState(false)
  const [viewed, setViewed] = useState([])
  const [playing, setPlaying] = useState(false)

  const videoDataRef = useRef(null)
  const loginRef = useRef(null)
  const startTime = useRef(0)

  const { user } = useContext(AuthContext)



  //Fetch inicial de videos de JsonServer
  useEffect(() => {
    getVideos().then(videos => {
      if (videos){  // si hubo algun error al recibir los videos recibe undefined y no setea los estados
      setCardList(videos)
      setPlayingCardId(videos[0].id)}
    })
  }, [])


  // Obtener el ultimo video activo de LS, si esta, y lista de ya vistos si el usuario esta logueado del server y si es anonimo de localstorage 
  useEffect(() => {
    if (user.role === "user") {
      if (cardList.length > 0) {                 // lee el local storage y si hay info del ultimo video activo la carga
        if (localStorage.getItem(user.name)) {
          const activeVideo = JSON.parse(localStorage.getItem(user.name))
          setPlayingCardId(activeVideo.id)
          startTime.current = (activeVideo.playedSeconds)
        }
      }
      if (user.isLogged) {  //usuario loggeado, lee la lista de videos ya vistos del server            
        fetch(`http://localhost:3000/viewedlist/${user.name}`)
          .then(res => res.json())
          .then(data => setViewed(data.viewed))
          .catch((error) => { console.log("Error no se pudo obtener la lista de videos ya vistos para el usuario", error) })
      }
      else setViewed(JSON.parse(localStorage.getItem('viewedAnonymous')))  // usuario anonimo, lee la lista de videos ya vistos de localStorage  
    }

    else setViewed([]) //limpia para el caso de que haga login un Admin (cuando user.role no es user) 
  }, [user, cardList])


  async function handleViewed(id) {  // agrega los videos ya listos a la lista en el srvr o en LS segun usuario loggueado o anonimo y reseta la info del video quw se estaba reproduciendo 
    if (user.role === "user") {

      if (localStorage.getItem(user.name)) { // si el video termino resetea el startTime para que no comienze desde el final si el usuario vuelve clikear el mismo video
        const activeVideo = JSON.parse(localStorage.getItem(user.name))
        localStorage.setItem(user.name, JSON.stringify({ ...activeVideo, playedSeconds: 0, played: 0 }))  // resetea el tiempo reproducido

        if (viewed.includes(id)) return //early return si el video ya fue visto previamente

        const viewedVideo = { id: user.name, viewed: [...viewed, id] }

        if (user.isLogged) { // para usuario loggueado guarda los vistos en el servidor a nombre del usuario activo
          try { // hace la llamada  a la Api del server para agregar el video visto a la lista
            const response = await fetch(`http://localhost:3000/viewedlist/${user.name}`, {
              method: "PATCH",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(viewedVideo)
            })
            if (response.ok) {
              console.log("Video agregado a vistos correctamente")
              setViewed(viewedVideo.viewed) // actualiza el estado con el nuevo video  
            }
          }
          catch { alert(" No se pudo registrar el video como visto en el servidor") }
        }
        else {
          localStorage.setItem('viewedAnonymous', JSON.stringify(viewedVideo.viewed))  // para usuario anonimo guarda en localStorage
          setViewed(viewedVideo.viewed) // actualizo el estado con el nuevo video visto
        }
      }
    }
  }



  async function toggleViewed(id) {
    if (user.role === "user") {
      let viewedVideo // si ya existe elimina la id del video y si no existe en la lista de vistos la agrega
      if (viewed.includes(id)) {
        viewedVideo = { id: user.name, viewed: viewed.filter(viewId => id !== viewId) } //elimina la id}
      }
      else viewedVideo = { id: user.name, viewed: [...viewed, id] }  // agrega la id

      if (user.isLogged) { // para usuario loggueado guarda los vistos en el servidor a nombre del usuario activo
        try { // hace la llamada  a la Api del server para agregar el video visto a la lista
          const response = await fetch(`http://localhost:3000/viewedlist/${user.name}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(viewedVideo)
          })
          if (response.ok) {

            setViewed(viewedVideo.viewed) // actualiza el estado con el nuevo video  
          }
        }
        catch { alert(" Fallo toggle Viewed no se pudo comunicar con en el servidor") }
      }
      else {
        localStorage.setItem('viewedAnonymous', JSON.stringify(viewedVideo.viewed))  // para usuario anonimo guarda en localstorage
        setViewed(viewedVideo.viewed) // actualizo el estado con el nueo video visto
      }
    }
  }

  async function handleDelete(id) {
    // si la tarjeta aborrar es la que esta en reproducir, cambia primero la activa a reproducir por la primera de cardlist sin incluir la que se va a borrar
    if (id === playingCardId) setPlayingCardId(cardList.filter(card => card.id !== id)[0]?.id)
    // Llama la API para borrar el vido de la base de datos
    try {
      const response = await deleteVideos(id)
      if (response.ok) console.log("Video eliminado correctamente")
      // actualiza el estado sin la tarjeta eliminada
      setCardList(prevCardList => prevCardList.filter(card => card.id !== id))
    }
    catch { alert(" No se pudo eliminar el video por un error de conexión con el servidor") }
  }


  function selectAsActiveCard(id) {
    if (id === playingCardId) setPlaying(false)  // si se esta viendo un video y se clickea la tarjeta de ese mismo video se corta la reproduccion 
    else { // Este caso corresponde a si se clickea otra tarjeta diferente de la que esta elegida actualmente (PlayingCardId)
      setPlayingCardId(id)
      startTime.current = 0 // cuando se cambia de video activo se resetea a 0 startime para que comienze desde el pricipio
    }
  }

  const isPlaying = useCallback((value) => {
    setPlaying(value)
  }, [])


  async function newVideo(video) {
    // hace la llamada  a la Api del server para agregar en el nuevo video
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

  async function editCard(editedCard) {
    try {
      const response = await editVideo(editedCard)
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

  function handleEdit(id) {
    setCardEditId(id)
    videoDataRef.current.showModal() // Abre el modal de editar card 
  }


  function cleanCardToEditState() {
    setCardEditId("")
  }

  function openNewVideoModal() {
    videoDataRef.current.showModal()
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
        <div className='section-frame'>
          <div className='section-frame-side'>
            <div className='section-frame-side-line'></div>
            <div ></div>
          </div>
          <h1 className={`category${index + 1}-title`}>{category.toUpperCase()}</h1>
          <div className='section-frame-side'>
            <div className='section-frame-side-line'></div>
            <div ></div>
          </div>
        </div>

        <div className='front-cards-container'>
          {cardList.filter(card => card.category === category).map(
            card => <Card key={card.id} title={card.title} image={card.image} id={card.id} editOn={editOn}
              className={`category${index + 1}-cards`} toggleViewed={toggleViewed} viewed={viewed.includes(card.id)}
              handleDelete={handleDelete} handleEdit={handleEdit} selectAsActiveCard={selectAsActiveCard} />)}
        </div>
      </div>)
    })
  }


  return (
    <>
      <Login loginRef={loginRef} closeLogin={closeLogin} />
      {user.role === "admin" && <VideoDataForm videoDataRef={videoDataRef} cardEditId={cardEditId} cardList={cardList}
        cleanCardToEditState={cleanCardToEditState} editCard={editCard} newVideo={newVideo} />}
      <div className='fixed-top'>
        <Header handleModal={openNewVideoModal} activateEdition={activateEdition} openLogin={openLogin} isPlaying={isPlaying} />
        <Home playingCardId={playingCardId} cardList={cardList} handleViewed={handleViewed} startTime={startTime}
          playing={playing} isPlaying={isPlaying} />
      </div>
      <div className='cards-container-spacer'></div>
      <div className='cards-container'>
        {cardElements}
      </div>
      <Footer />

    </>
  )
}

export default App


