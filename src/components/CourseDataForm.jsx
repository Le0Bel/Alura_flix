/* eslint-disable react/prop-types */
import { nanoid } from 'nanoid'
import { useEffect, useMemo, useState } from 'react'
import Course from './Course';

const DOT_30 = "........................"
const DOT_3L = "....................................................\n" +
    "....................................................\n......................................."

export default function CourseDataForm({ courseEditId, courseList, newCurso }) {

    const emptyCourse = useMemo(() => ({
        id: "",
        name: "",
        image: "",
        description: "",
        duration: '',
        level: "",
        videos:[],
    }), [])

    const [formData, setFormData] = useState(emptyCourse)

    useEffect(()=>{
        if(courseEditId){
            const activeCourse = courseList.filter(course => course.id===courseEditId )[0]
            console.log(activeCourse)
            setFormData(activeCourse)
        }else setFormData(emptyCourse)
    }
    ,[courseEditId,courseList,emptyCourse])

    function handleSubmit(e) {
        e.preventDefault();
        if (courseEditId) {
            console.log("form submited courid true", courseEditId)
            // Esta en modo edicion si hay un id de tarjeta para editar
            //const editedCard = { ...formData, id: cardEditId }
            //editCard(editedCard)
        } else {   // Si esta vacio cardToEditId estamso en modo nuevo video
            const curso = { ...formData, id: nanoid() }
            newCurso(curso)
        }
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
                    <Course name={formData.name ? formData.name : DOT_30}
                        image={formData.image ? formData.image : "./logos/logo_placeholder.png"}
                        description={formData.description ? formData.description : DOT_3L}
                        duration={formData.duration ? formData.duration : DOT_30}
                        level={formData.level ? formData.level : DOT_30}
                        editable={false}
                    />
                </div>
            </div>
            <div className="course-video-list-container" style={{ height: "200px", padding: "30px", color: "black", backgroundColor: "whitesmoke" }}>
                Aqui va la lista de videos del curso
            </div>
        </div>
    )
}