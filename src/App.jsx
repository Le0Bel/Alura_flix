
import { useCallback, useContext, useEffect, useRef } from 'react'
import './App.css'
import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { useState } from 'react'
import VideoDataForm from './components/VideoDataForm'
import Login from './components/Login'
import { AuthContext } from './context/AuthContext'
import { deleteVideos, editVideo, getVideos, saveNewVideo } from './services/videosCrud'
import { deleteCourse, getCourses, saveNewCourse, saveEditedCourse } from './services/courses'
import { getViewedList, saveViewed } from './services/viewedList'
import PlayList from './components/PlayList'
import Course from './components/Course'
import CourseDataForm from './components/CourseDataForm'


function App() {
  const [courseList, setCourseList] = useState([])
  const [courseEdit, setCourseEdit] = useState({ isNewCourse: false, courseEditId: "" })
  const [playingCardId, setPlayingCardId] = useState(null)
  const [activeCourseId, setActiveCourseId] = useState("")
  const [viewed, setViewed] = useState([])
  const [playing, setPlaying] = useState(false)


  const loginRef = useRef(null)
  const startTime = useRef(0)

  const { user } = useContext(AuthContext)


  //Fetch inicial de videos de JsonServer
  useEffect(() => {
    getCourses().then(courses => {
      if (courses) {  // si hubo algun error al recibir los videos recibe undefined y no setea los estados
        setCourseList(courses)
      }
    })
  }, [])


  // Obtener el ultimo video activo de LS, si esta, y lista de ya vistos si el usuario esta logueado del server y si es anonimo de localstorage 
  /* useEffect(() => {
    if (user.role === "user") {
      if (cardList.length > 0) {
        if (localStorage.getItem(user.name)) { // lee el local storage y si hay info del ultimo video activo la carga
          const activeVideo = JSON.parse(localStorage.getItem(user.name))
          setPlayingCardId(activeVideo.id)
          startTime.current = (activeVideo.playedSeconds)
        }
      }
      if (user.isLogged) {  //usuario loggeado, lee la lista de videos ya vistos del server            
        getViewedList(user.name).then(viewedList => {
          if (viewedList) setViewed(viewedList)
        })
      }
      else setViewed(JSON.parse(localStorage.getItem('viewedAnonymous')))  // usuario anonimo, lee la lista de videos ya vistos de localStorage  
    }
    else setViewed([]) //limpia para el caso de que haga login un Admin (cuando user.role no es user) 
  }, [user, cardList]) */


  async function handleViewed(id) {  // agrega los videos ya listos a la lista en el srvr o en LS segun usuario loggueado o anonimo y reseta la info del video quw se estaba reproduciendo 
    if (user.role === "user") {

      if (localStorage.getItem(user.name)) { // si el video termino resetea el startTime para que no comienze desde el final si el usuario vuelve clikear el mismo video
        const activeVideo = JSON.parse(localStorage.getItem(user.name))
        localStorage.setItem(user.name, JSON.stringify({ ...activeVideo, playedSeconds: 0, played: 0 }))  // resetea el tiempo reproducido

        if (viewed.includes(id)) return //early return si el video ya fue visto previamente

        const viewedVideos = { id: user.name, viewed: [...viewed, id] }

        if (user.isLogged) { // para usuario loggueado guarda los vistos en el servidor a nombre del usuario activo
          try { // hace la llamada  a la Api del server para agregar el video visto a la lista
            const response = await saveViewed(user.name, viewedVideos)
            if (response.ok) {
              console.log("Video agregado a vistos correctamente")
              setViewed(viewedVideos.viewed) // actualiza el estado con el nuevo video  
            }
          }
          catch { alert(" No se pudo registrar el video como visto en el servidor") }
        }
        else {
          localStorage.setItem('viewedAnonymous', JSON.stringify(viewedVideos.viewed))  // para usuario anonimo guarda en localStorage
          setViewed(viewedVideos.viewed) // actualizo el estado con el nuevo video visto
        }
      }
    }
  }



  async function toggleViewed(id) {
    if (user.role === "user") {
      let viewedVideos // si ya existe elimina la id del video y si no existe en la lista de vistos la agrega
      if (viewed.includes(id)) {
        viewedVideos = { id: user.name, viewed: viewed.filter(viewId => id !== viewId) } //elimina la id}
      }
      else viewedVideos = { id: user.name, viewed: [...viewed, id] }  // agrega la id

      if (user.isLogged) { // para usuario loggueado guarda los vistos en el servidor a nombre del usuario activo
        try { // hace la llamada  a la Api del server para agregar el video visto a la lista
          const response = await saveViewed(user.name, viewedVideos)
          if (response.ok) {
            setViewed(viewedVideos.viewed) // actualiza el estado con el nuevo video  
          }
        }
        catch { alert(" Fallo toggle Viewed no se pudo comunicar con en el servidor") }
      }
      else {
        localStorage.setItem('viewedAnonymous', JSON.stringify(viewedVideos.viewed))  // para usuario anonimo guarda en localstorage
        setViewed(viewedVideos.viewed) // actualizo el estado con el nueo video visto
      }
    }
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

  function resetPlayingCardId() {
    setPlayingCardId(null)
  }

  async function handleDeleteCourse(e, id) {
    e.stopPropagation()
    try {
      const response = await deleteCourse(id)
      if (response.ok) {
        console.log("Curso eliminado correctamente")
        // actualiza el estado sin el curso eliminada
        setCourseList(prev => prev.filter(course => course.id !== id))
      }
    }
    catch { alert(" No se pudo eliminar el video por un error de conexión con el servidor") }
  }

  function cleanCourseToEditState() {
    setCourseEdit(prev => ({ courseEditId: "", isNewCourse: false }))
  }


  async function newVideo(video) {
    // hace la llamada  a la Api del server para agregar en el nuevo video
    try {
      const response = await saveNewVideo(video)
      if (response.ok) {
        console.log("Video agregado correctamente")
        // setCardList(prev => ([...prev, video])) // actualiza el estado con el nuevo video  
      }
    }
    catch { alert(" Error de conexión con el servidor al agregar video") }
  }

  function selectCourseToEdit(e, id) {
    e.stopPropagation()
    setCourseEdit(prev => ({ ...prev, courseEditId: id }))
  }

  async function newCurso(curso) {
    // hace la llamada  a la Api del server para agregar en el nuevo video
    try {
      const response = await saveNewCourse(curso)
      if (response.ok) {
        console.log("Curso agregado correctamente")
        setCourseList(prev => ([...prev, curso])) // actualiza el estado con el nuevo video  
        setCourseEdit({ courseEditId: curso.id, isNewCourse: false })
      }
    }
    catch { alert(" Error de conexión con el servidor al agregar el curso") }
  }

  async function editCourse(editedCourse) {
    // hace la llamada  a la Api del server para guardar el curso editado
    try {
      const response = await saveEditedCourse(editedCourse)
      if (response.ok) {
        console.log("Curso editado correctamente en sl Srvr")
        setCourseList(prevCourseList => prevCourseList.map(    // actualiza el estado con el nuevo curso 
          course => {
            if (course.id !== editedCourse.id) { return course }
            else { return editedCourse }
          }
        ))
      }
    }
    catch { alert(" Error de conexión con el servidor al agregar el curso") }
  }

  function openNewCourseForm() {
    setCourseEdit(prev => ({ ...prev, isNewCourse: true }))
  }

  function activateEdition() {
    setEditOn(prev => !prev)
  }

  function openLogin() {
    loginRef.current.showModal()
  }
  function closeLogin() {
    loginRef.current.close()
  }





  function selectActiveCourse(id) {
    setActiveCourseId(id)
    setPlayingCardId(courseList.filter(course => course.id === id)[0].videos[0].id)
  }

  let playingList = []
  let activeCourseName
  let viewdCounter = 0
  if (playingCardId) {
    const activeCourse = courseList.filter(course => course.id === activeCourseId)[0]
    playingList = activeCourse.videos
    activeCourseName = activeCourse.name
    viewdCounter = playingList.filter(video => viewed.includes(video.id)).length
  }
   console.log(courseEdit.isNewCourse, courseEdit.courseEditId )
  return (
    <>
      <Login loginRef={loginRef} closeLogin={closeLogin} />

      <Header activateEdition={activateEdition} openLogin={openLogin} openNewCourseForm={openNewCourseForm}
        isPlaying={isPlaying} resetPlayingCardId={resetPlayingCardId} />

      {playingCardId &&
        <div className='player-dashboard-container'>

          <Home playingCardId={playingCardId} playingList={playingList} viewedCounter={viewdCounter} handleViewed={handleViewed} startTime={startTime}
            playing={playing} isPlaying={isPlaying} />

          <PlayList playingList={playingList} toggleViewed={toggleViewed} viewed={viewed} activeCourseName={activeCourseName}
            selectAsActiveCard={selectAsActiveCard} playingCardId={playingCardId} />

        </div>
      }

      {!playingCardId && !courseEdit.isNewCourse && !courseEdit.courseEditId &&
        <div className='front-page-main' >
          <div className='banner'>
            <div className='banner-info'>
              <h1 className='banner-title'>Home</h1>
              <p className='banner-main-text'> Te damos la bienvenida a imparo! ,
                un espacio en donde puedes aprender nuevas habilidades y aumentar tus conocimientos!
              </p>
            </div>
          </div>
          <div className='courses-main-container'>
            <h2 className='courses-main-container-title'>Cursos</h2>
            <div className='courses-card-container'>
              {courseList.map(course => <Course key={course.id} id={course.id} {...course} selectActiveCourse={selectActiveCourse}
                handleDeleteCourse={handleDeleteCourse} selectCourseToEdit={selectCourseToEdit} />)}
            </div>
          </div>
        </div>}
      {user.role === "admin" && (courseEdit.isNewCourse || courseEdit.courseEditId) &&
        <CourseDataForm courseEditId={courseEdit.courseEditId} courseList={courseList} newCurso={newCurso}
          editCourse={editCourse} cleanCourseToEditState={cleanCourseToEditState} />
      }
      <Footer />

    </>
  )

}



export default App


