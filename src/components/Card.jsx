/* eslint-disable react/prop-types */
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export default function Card({ image, title, id, selected, handleEdit, handleDelete, selectAsActiveCard, editOn, className,
  viewed, toggleViewed}) {

  const { user } = useContext(AuthContext)

  function handleToggleViewed() {

    toggleViewed(id)
  }

  return (
    <div className={`card  ${selected ? "selected-card" : ""}`}>
      <img className={`card-img ${className}`} src={image} alt="" onClick={() => selectAsActiveCard(id)} />
      <div className=" card-info ">
        <p className='card-title'>{title}</p>
        <div className={viewed ? "card-viewed" : "card-not-viewed"} onDoubleClick={handleToggleViewed} />
      </div>
      {user.role === "admin" && editOn &&
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