
import { useContext, useEffect, useRef } from 'react'
import './App.css'
import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { useState } from 'react'
import NewVideo from './components/NewVideo'
import NewVideoNoControlada from './components/NewVideoNoControlada'
import EditVideo from './components/EditVideo'
import Login from './components/Login'
import Card from './components/Card'
import { AuthContext } from './context/AuthContext'


function App() {
  const [cardList, setCardList] = useState([])
  const [cardEditId, setCardEditId] = useState("")
  const [playingCardId, setPlayingCardId] = useState("")
  const [editOn, setEditOn] = useState(false)
  const [viewed, setViewed] = useState([])
  const dialogRef = useRef(null)
  const editVideoRef = useRef(null)
  const loginRef = useRef(null)
  const startTime = useRef(0)
  const { user } = useContext(AuthContext)



  //Fetch inicial de videos de JsonServer
  useEffect(() => {
    fetch("http://localhost:3000/videos")   // ** agregar mejor control de errores al fetch y pasarlo a un custom Hook useFetch
      .then(res => res.json())
      .then(videos => {
        setCardList(videos)

      })
      .catch((error) => { alert("Lo lamentamos no se pudo obener las lista de videos del servidor") })
  }, [])


  // Obtener el ultimo video visto de LS y lista de ya vistos si el usuario esta logueado del server y si es anonimo de localstorage 
  useEffect(() => {
    if (user.role === "user") {

      if (cardList.length > 1) {   // lee el local storage y si hay info de el ultimo video activo la carga
        if (localStorage.getItem(user.name)) {
          const activeVideo = JSON.parse(localStorage.getItem(user.name))
          setPlayingCardId(activeVideo.id)
          startTime.current = activeVideo.playedSeconds
        }
        else {
          setPlayingCardId(cardList[0].id)// si no hay info de el ultimo video visto en LS inicializa con el primero de la lista
          startTime.current = 0
        }

      }

      if (!user.isLogged) {  // usuario anonimo le la lista de vistos de LS
        const viewedFromLS = JSON.parse(localStorage.getItem('viewedAnonymous'))
        if (viewedFromLS) setViewed(viewedFromLS)   // si hay info guardada  en LocalStorage de videos vistos la carga en el estado
      }

      else {  //usuario loggeado pide la lista de videos vistos del server
        fetch(`http://localhost:3000/viewedlist/${user.name}`)
          .then(res => res.json())
          .then(data => setViewed(data.viewed))
          .catch((error) => { console.log("Error no se pudo obtener la lista de videos ya vistos para el usuario", error) });
      }

    }
    else setViewed([]) //limpia para el caso de que haga login un Admin
  }, [user, cardList])




  async function handleViewed(id) {
    if (user.role === "user") {
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
            // actualiza el estado con el nuevo video  
            setViewed(viewedVideo.viewed)
          }
        }
        catch { alert(" No se pudo registrar el video como visto en el servidor") }
      }
      else {
        localStorage.setItem('viewedAnonymous', JSON.stringify(viewedVideo.viewed))  // para usuario anonimo guarda en localstorage
        setViewed(viewedVideo.viewed) // actualizo el estado con el nueo video visto
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
    startTime.current = 0
  }

  async function newVideo(video) {
    // hace la llamada  a la Api del server para agregar en el nuevo
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
              className={`category${index + 1}-cards`} toggleViewed={toggleViewed} viewed={viewed?.includes(card.id)}
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
        <Home playingCardId={playingCardId} cardList={cardList} handleViewed={handleViewed} startTime={startTime} />
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


