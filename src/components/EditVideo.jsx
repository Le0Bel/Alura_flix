import { useEffect, useState } from "react";

export default function EditVideo({ editVideoRef, cardEditId, cardList, cleanCardToEditState, editCard }) {

    const emptyCard = {
        id: "",
        title: "",
        image: "",
        description: "",
        category: "",
        video: ''
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

    return (
        <dialog ref={editVideoRef}>
            <div className="edit-container">
                <h1>EDITAR VIDEO</h1>
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
                    <input
                        className="edit-input"
                        type="text" id="description"
                        onChange={handleChange}
                        value={formData.description}
                    />

                    <div>
                        <button type="submit">Guardar</button>
                        <button>Limpiar</button>
                    </div>


                </form>
            </div>
        </dialog>
    )
}

