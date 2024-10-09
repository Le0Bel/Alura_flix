import { nanoid } from 'nanoid'
import { useMemo, useState } from 'react'
import Course from './Course';




export default function CourseDataForm() {

    const emptyCourse = useMemo(() => ({
        id: "",
        name: "",
        image: "",
        description: "",
        duration: '',
        level: ""
    }), [])

    const [formData, setFormData] = useState(emptyCourse)


    function handleSubmit(e) {
        e.preventDefault();
        /*  if (cardEditId) {   // Esta en modo edicion si hay un id de tarjeta para editar
             const editedCard = { ...formData, id: cardEditId }
             editCard(editedCard)
         } else {   // Si esta vacio cardToEditId estamso en modo nuevo video
             const video = { ...formData, id: nanoid() }
             newVideo(video)
         } */
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


    return (
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
                            <button type="button" className="modal-btn-reset">Cancelar</button>
                            <button type="submit" className="modal-btn-submit">Guardar</button>
                        </div>

                    </form>
                </div>
                <div className="course-preview-card">
                    <Course name={formData.name} image={formData.image} description={formData.description}
                        duration={formData.duration} level={formData.level} />
                </div>
            </div>
            <div className="course-video-list-container">

            </div>
        </div>
    )
}