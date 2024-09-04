/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function EditVideo({ editVideoRef, cardEditId, cardList, cleanCardToEditState, editCard }) {

    const emptyCard = {
        id: "",
        title: "",
        image: "",
        description: "",
        category: "",
        video: '',
        playerBackground: ""
    }
    const [formData, serFormData] = useState(emptyCard)


    useEffect(() => {
        function escFunction(event) {
            if (event.key === "Escape") {
                cleanCardToEditState()
                console.log("cancelada edicion")
            }
        }
        if (cardEditId) {
            const cardToEdit = cardList.filter(card => card.id === cardEditId)[0]
            serFormData(cardToEdit)
            document.addEventListener("keydown", escFunction, false)
            return () => {
                document.removeEventListener("keydown", escFunction, false);
            };

        }
    }, [cardEditId, cardList, cleanCardToEditState])



    function handleChange(event) {
        const id = event.target.id
        const value = event.target.value
        serFormData(prevFormData => {
            return {
                ...prevFormData,
                [id]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (cardEditId) {
            const editedCard = { ...formData, id: cardEditId }
            editCard(editedCard)
            cleanCardToEditState() //para limpiar el estado de App
            editVideoRef.current.close()

        }
    }

    function closeModal() {
        editVideoRef.current.close()
    }
    
    return (
        <dialog ref={editVideoRef}>
            <div className="edit-container">
                <h1>EDITAR VIDEO</h1>
                <svg onClick={closeModal} className="close-btn" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#1b5499" stroke-width="1.5"/>
                    <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <form action="" className="edit-form" onSubmit={handleSubmit}>

                    <label htmlFor="title" >Titulo</label>
                    <input
                        className="edit-input"
                        type="text" id="title"
                        onChange={handleChange}
                        value={formData.title}
                    />

                    <label htmlFor="category">Categoria</label>
                    <input
                        className="edit-input"
                        type="text"
                        id="category"
                        onChange={handleChange}
                        value={formData.category}
                    />

                    <label htmlFor="image">Imagen</label>
                    <input
                        className="edit-input"
                        type="text" id="image"
                        onChange={handleChange}
                        value={formData.image}
                    />

                    <label htmlFor="video">Video</label>
                    <input
                        className="edit-input"
                        type="text" id="video"
                        onChange={handleChange}
                        value={formData.video}
                    />

                    <label htmlFor="description">Descripción</label>
                    <textarea
                        className="edit-text-area"
                        rows="4" id="description"
                        onChange={handleChange}
                        value={formData.description}
                    />

                    <label htmlFor="playerBackground">Fondo del reproductor</label>
                    <input
                        className="edit-input"
                        type="text" id="playerBackground"
                        onChange={handleChange}
                        value={formData.playerBackground}
                    />

                    <div className="modal-btn">
                        <button className="modal-btn-reset">Limpiar</button>
                        <button type="submit" className="modal-btn-submit">Guardar</button>
                    </div>


                </form>
            </div>
        </dialog>
    )
}

