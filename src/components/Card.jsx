export default function Card({ image, title, id, handleEdit, handleDelete, selectAsActiveCard }) {
    
    return (
      <div className='card'>
        <img className='card-img' src={image} alt="" onClick={() => selectAsActiveCard(id)} />
        <h3 className='card-title'>{title}</h3>
        <div className='card-action'>
          <div className='card-edit' onClick={() => handleEdit(id)}>
            <img src="edit.svg" alt="" />
            <p>edit</p>
          </div>
          <div className='card-delete' onClick={() => handleDelete(id)}>
            <p>delete</p>
            <img src="delete.svg" alt="" />
          </div>
        </div>
      </div>
    )
  }