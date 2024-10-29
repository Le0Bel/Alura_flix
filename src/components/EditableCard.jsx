/* eslint-disable react/prop-types */
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export default function EditableCard({ image, title, id, handleEdit, handleDelete }) {

  const { user } = useContext(AuthContext)

  return (
    <div className={`card`}>
      <div className={`card-img`} style={{backgroundImage:`url("${image}")`}}>
        <svg className="drag-anchor" width="50px" height="50px" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </div>

      

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