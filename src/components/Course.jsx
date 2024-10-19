/* eslint-disable react/prop-types */

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Course({ id, name, description, image, duration, level, handleDeleteCourse, 
    selectActiveCourse, selectCourseToEdit, editable=true }) {


    const { user } = useContext(AuthContext)

    return (
        <div className={`course-card ${!editable ? "preview" : ""}`} onClick={()=> selectActiveCourse(id)}>
            <h1 className={`course-title ${!editable ? "preview" : ""}`}>{name}</h1>
            <div className={`course-main-top ${!editable ? "preview" : ""}`}>
                <p className={`course-description ${!editable ? "preview" : ""}`}>{description} </p>
                <div className={`course-logo ${!editable ? "preview" : ""}`}>
                    <img src={image}  />
                </div>
            </div>
            <div className={`course-main-bottom ${!editable ? "preview" : ""}`}>
                <p className={`course-main-bottom-duration ${!editable ? "preview" : ""}`}>Duracion: <span>{duration}</span></p>
                <p className={`course-main-bottom-nivel ${!editable ? "preview" : ""}`}>Nivel: <span>{level}</span></p>
            </div>
            {user.role === "admin" && editable &&
                <div className='card-action-course' >
                    <div className='card-edit-course' onClick={(e) => selectCourseToEdit(e,id)}>
                        <img className="svg svg-edit-course" src="edit.svg" alt="" />
                    </div>
                    <div className='card-delete-course' onClick={(e) => handleDeleteCourse(e, id)}>
                        <img className="svg svg-delete" src="delete.svg" alt="" />
                    </div>
                </div>
            }
        </div>
    )
}