/* eslint-disable react/prop-types */
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export default function EditableCard({ image, title, id, handleEdit, handleDelete, className }) {

  const { user } = useContext(AuthContext)

  return (
    <div className={`card`}>
      <img className={`card-img ${className}`} src={image} alt=""  />
      <div className=" card-info ">
        <p className='card-title'>{title}</p>
      </div>
      {user.role === "admin" && 
        <div className='card-action' >
          <div className='card-edit' onClick={() => handleEdit(id)}>
            <img className="svg svg-edit" src="edit.svg" alt="" />
            <p>Editar video</p>
          </div>
          <div className='card-delete' onClick={() => handleDelete(id)}>
            <img className="svg svg-delete" src="delete.svg" alt="" />
            <p>Borrar</p>
          </div>
        </div>
      }
    </div>
  )
}