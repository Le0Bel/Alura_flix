/* eslint-disable react/prop-types */
import { nanoid } from 'nanoid'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import Course from './Course';
import EditableCard from './EditableCard';
import VideoDataForm from './VideoDataForm';

const DOT_30 = "........................"
const DOT_3L = "....................................................\n" +
    "....................................................\n......................................."

export default function CourseDataForm({ courseEditId, courseList, newCurso, editCourse, cleanCourseToEditState }) {

    const emptyCourse = useMemo(() => ({
        id: "",
        name: "",
        image: "",
        description: "",
        duration: '',
        level: "",
        videos: [],
    }), [])

    const [formData, setFormData] = useState(emptyCourse)
    const [cardEditId, setCardEditId] = useState("")
    const videoDataRef = useRef()

    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (courseEditId) {
            const activeCourse = courseList.filter(course => course.id === courseEditId)[0]
            setFormData(activeCourse)
        } else setFormData(emptyCourse)
    }
        , [courseEditId, courseList, emptyCourse])

    function handleSubmit(e) {
        e.preventDefault();
        if (courseEditId) {
            // Esta en modo edicion 
            const editedCourse = {...formData}
            editCourse(editedCourse)
        } else {   // Si esta vacio cardToEditId estamso en modo nuevo video
            const curso = { ...formData, id: nanoid() }
            console.log(curso)
            newCurso(curso) // agrega el curso una vez agregado el curso pasa al modo ediccion para poder agregarle los videos
        }
    }

    function handleEditVideo(id) {
        setCardEditId(id)
        videoDataRef.current.showModal() // Abre el modal de editar card 
    }

    function cleanVideoToEditState() {
        setCardEditId("")
    }

    function openNewVideoModal() {
        videoDataRef.current.showModal()
    }

    async function handleDeleteVideo(id) {
        // Modifica el estado Formdata con la lista de videos actualizada y llama la API para guardar el curso modificado 
        const updatedCourse = {...formData, videos:formData.videos.filter(vid => vid.id !==id)}
        editCourse(updatedCourse)
    }

    function addNewVideo(newVideo) {
        // agrega un video a la lista de videos y llama la API para guardar el curso modificado 
        const updatedCourse = {...formData, videos:[...formData.videos, newVideo]}
        editCourse(updatedCourse)
    } 

    function saveEditedVideoList (video) {
        // Modifica el estado Formdata con la lista de videos actualizada y llama la API para guardar el curso modificado 
        const updatedVideoList = formData.videos.map( vid => { 
            if(vid.id !== video.id) return vid
            else return video
        })
        const updatedCourse = {...formData, videos:updatedVideoList}
        editCourse(updatedCourse)
    } 

    function handleChange(event) {
        const id = event.target.id
        const value = event.target.value
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [id]: value
            }
        })
    }

    let videoToEdit = null
    if (courseEditId && cardEditId) { // encuentra el video seleccionado en caso de activarse la edicion de un video de un curso 
        const courseToEdit = courseList.filter(course => course.id === courseEditId)[0]
        videoToEdit = courseToEdit.videos.filter(video => video.id === cardEditId)[0]
    }

    return (
        <>
            {user.role === "admin" && courseEditId && 
                <VideoDataForm videoDataRef={videoDataRef} cardEditId={cardEditId} videoToEdit={videoToEdit}
                    cleanCardToEditState={cleanVideoToEditState} saveEditedVideoList={saveEditedVideoList} addNewVideo={addNewVideo} />
            }
            <div className="course-data-container">
                <div className="course-form-container">
                    <div className="course-data-form">
                        <form action="" className="edit-form" onSubmit={handleSubmit}>

                            <label htmlFor="name" >Nombre del Curso</label>
                            <input
                                className="edit-input"
                                type="text" id="name"
                                onChange={handleChange}
                                value={formData.name}
                            />

                            <label htmlFor="image">Imagen</label>
                            <input
                                className="edit-input"
                                type="text" id="image"
                                onChange={handleChange}
                                value={formData.image}
                            />


                            <label htmlFor="description">Descripción</label>
                            <textarea
                                className="edit-text-area"
                                rows="4" id="description"
                                onChange={handleChange}
                                value={formData.description}
                            />

                            <label htmlFor="duration">Duración</label>
                            <input
                                className="edit-input"
                                type="text" id="duration"
                                onChange={handleChange}
                                value={formData.duration}
                            />

                            <label htmlFor="level">Nivel</label>
                            <input
                                className="edit-input"
                                type="text" id="level"
                                onChange={handleChange}
                                value={formData.level}
                            />

                            <div className="modal-btn">
                                <button type="button" className="modal-btn-reset" onClick={cleanCourseToEditState}>Cancelar</button>
                                <button type="submit" className="modal-btn-submit">Guardar</button>
                            </div>

                        </form>
                    </div>
                    <div className="course-preview-card">
                        <Course name={formData.name ? formData.name : DOT_30}
                            image={formData.image ? formData.image : "./logos/logo_placeholder.png"}
                            description={formData.description ? formData.description : DOT_3L}
                            duration={formData.duration ? formData.duration : DOT_30}
                            level={formData.level ? formData.level : DOT_30}
                            editable={false}
                        />
                    </div>
                </div>
                
                <div className='add-new-video-container'>
                    <div className='add-new-course-plus' onClick={openNewVideoModal} >
                        + 
                    </div>
                    <p>Agregar Videos</p>
                    <button className='course-finish-btn'> Finalizar</button>
                </div>
                {courseEditId &&
                    <div className="course-video-list-container">
                    {formData.videos.map(card => <EditableCard key={card.id} title={card.title} image={card.image} id={card.id}
                        className="" handleDelete={handleDeleteVideo} handleEdit={handleEditVideo} />)}
                    
                    </div>
                }
                
            </div>
        </>
    )
}