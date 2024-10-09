/* eslint-disable react/prop-types */

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Course({id, name, description, image, duration, level, deleteCourse, editCourse }) {


    const { user } = useContext(AuthContext)

    return (
        <div className="course-card">
            <h1 className="course-title">{name}</h1>
            <div className="course-main-top">
                <p className="course-description">{description} </p>
                <img src={image} alt="" />
            </div>
            <div className="course-main-bottom">
                <p>Duracion: {duration}</p>
                <p>Nivel: {level}</p>
            </div>
            {user.role === "admin" &&
                <div className='card-action' >
                    <div className='card-edit' onClick={() => editCourse(id)}>
                        <img className="svg svg-edit" src="edit.svg" alt="" />
                        <p>Editar Curso</p>
                    </div>
                    <div className='card-delete' onClick={() => deleteCourse(id)}>
                        <img className="svg svg-delete" src="delete.svg" alt="" />
                        <p>Borrar</p>
                    </div>
                </div>
            }
        </div>
    )
}