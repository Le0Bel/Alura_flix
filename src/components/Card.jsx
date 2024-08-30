/* eslint-disable react/prop-types */
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export default function Card({ image, title, id, handleEdit, handleDelete, selectAsActiveCard }) {

  const { user } = useContext(AuthContext)

  return (
    <div className='card'>
      <img className='card-img' src={image} alt="" onClick={() => selectAsActiveCard(id)} />
      <h3 className='card-title'>{title}</h3>
      {user.role==="admin" &&
        <div className='card-action'>
          <div className='card-edit' onClick={() => handleEdit(id)}>
            <img className="svg svg-edit" src="edit.svg" alt="" />
            <p>edit</p>
          </div>
          <div className='card-delete' onClick={() => handleDelete(id)}>
            <p></p>
            <img className="svg svg-delete" src="delete.svg" alt="" />
          </div>
        </div>
      }
    </div>
  )
}