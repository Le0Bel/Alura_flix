/* eslint-disable react/prop-types */


export default function Card({ image, title, id, selected, selectAsActiveCard, className, viewed, toggleViewed }) {

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
    </div>
  )
}