/* eslint-disable react/prop-types */
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export default function Card({ image, title, id, handleEdit, handleDelete, selectAsActiveCard, editOn, className }) {

  const { user } = useContext(AuthContext)

  return (
    <div className={`card ${className} `}>
      <img className='card-img' src={image} alt="" onClick={() => selectAsActiveCard(id)} />
      <p className='card-title'>{title}</p>
      {user.role==="admin" && editOn &&
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