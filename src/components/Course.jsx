/* eslint-disable react/prop-types */

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Course({ id, name, description, image, duration, level, handleDeleteCourse, editCourse, editable=true }) {


    const { user } = useContext(AuthContext)

    return (
        <div className="course-card">
            <h1 className="course-title">{name}</h1>
            <div className="course-main-top">
                <p className="course-description">{description} </p>
                <div className="course-logo">
                    <img src={image} alt="" />
                </div>
            </div>
            <div className="course-main-bottom">
                <p className="course-main-bottom-duration">Duracion: {duration}</p>
                <p >Nivel: {level}</p>
            </div>
            {user.role === "admin" && editable &&
                <div className='card-action' >
                    <div className='card-edit' onClick={() => editCourse(id)}>
                        <img className="svg svg-edit" src="edit.svg" alt="" />
                        <p>Editar Curso</p>
                    </div>
                    <div className='card-delete' onClick={() => handleDeleteCourse(id)}>
                        <img className="svg svg-delete" src="delete.svg" alt="" />
                        <p>Borrar</p>
                    </div>
                </div>
            }
        </div>
    )
}