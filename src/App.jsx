
import './App.css'
import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { useState } from 'react'
import videoCards from './videoCards'
import { nanoid } from 'nanoid'



function App() {
  const [cardList, setCardList] = useState(videoCards)

  function Card({ image, title }) {
    return (
      <div className='card'>
        <img className='card-img' src={image} alt="" />
        <h3 className='card-title'>{title}</h3>
        <div className='card-action'>
          <div className='card-edit'>
            <img src="edit.svg" alt="" />
            <p>edit</p>
          </div>
          <div className='card-delete' onClick={() => handleDelete(title)}>
            <p>delete</p>
            <img src="delete.svg" alt="" />
          </div>
        </div>
      </div>
    )
  }

  const frontElements = cardList.filter(card => card.category === "frontend").map(card => <Card key={card.title} title={card.title} image={card.image} />)
  const backElements = cardList.filter(card => card.category === "backend").map(card => <Card key={card.title} title={card.title} image={card.image} />)

  function handleDelete(title) {
    setCardList(prevCardList => prevCardList.filter(card => card.title !== title))
  }

  function editCard(editedCard) {
    setCardList(prevCardList => prevCardList.map(
      card => {
        if (card.title !== editCard.title) { return card }
        else { return editedCard }
      }
    )
    )
  }
  
  
console.log(cardList)
  return (
    <>
      <Header />
      <Home />
      <div className='cards-container'>
        <div className='cards-front'>
          <h1>FrontEnd</h1>
          <div className='front-cards-container'>
            {frontElements}
          </div>
        </div>
        <div className='cards-back'>
          <h1>BackEnd</h1>
          <div className='back-cards-container'>
            {backElements}
          </div>
        </div>
      </div>

      <Footer />

    </>
  )
}

export default App


