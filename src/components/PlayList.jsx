/* eslint-disable react/prop-types */
import Card from './Card'

export default function PlayList({ playingList, toggleViewed, viewed, handleDelete, handleEdit, selectAsActiveCard,
     activeCategory, playingCardId }) {

    return (
        <div className='playing-list-container'>
            <h1 className='category1-title'> {activeCategory.toUpperCase()}</h1>
            {playingList.map(card => <Card key={card.id} title={card.title} image={card.image} id={card.id} 
                    className="category1-cards"  viewed={viewed.includes(card.id)} selected={playingCardId===card.id}
                   toggleViewed={toggleViewed} handleDelete={handleDelete} handleEdit={handleEdit} selectAsActiveCard={selectAsActiveCard} />)}
        </div>
    )
}
