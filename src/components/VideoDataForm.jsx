/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import { nanoid } from 'nanoid'

export default function VideoDataForm({ videoDataRef, cardEditId, videoToEdit, cleanCardToEditState, saveEditedVideoList, addNewVideo }) {

    const emptyCard = useMemo(() => ({
        id: "",
        title: "",
        image: "",
        description: "",
        video: '',
    }), [])

    const [formData, setFormData] = useState(emptyCard)
    
    useEffect(() => {

        function escFunction(event) {             // Funcion para limpiar el cardEditId del estado si el usuario cancela la edicion apretando al tecla escape
            if (event.key === "Escape") {
                cleanCardToEditState()
                console.log("cancelada edicion")
            }
        }
        if (cardEditId) {  // si hay activa una tarjeta para edicion carga los datos de la misma el formulario
            setFormData(videoToEdit)
            document.addEventListener("keydown", escFunction, false)      // para escuchar las teclas apretadas y cancelar la edicion si se aprieta "esc"
            return () => {
                document.removeEventListener("keydown", escFunction, false);
            };
        } else setFormData(emptyCard)
    }, [cardEditId, videoToEdit, cleanCardToEditState, emptyCard])



    function handleChange(event) {
        const id = event.target.id
        const value = event.target.value
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [id]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (cardEditId) {   // Esta en modo edicion si hay un id de tarjeta para editar
            const editedVideo= { ...formData }
            saveEditedVideoList(editedVideo)
            console.log(editedVideo)
        } else {   // Si esta vacio cardToEditId estamso en modo nuevo video
            const video = { ...formData, id: nanoid() }
            addNewVideo(video)
        }
        closeModal()
    }

    function closeModal() {
        if (cardEditId) cleanCardToEditState()  //para limpiar el id de la tarjeta a editar de la app  
        videoDataRef.current.close()           //si el usuario cancela y no estamso en mdodo de nuevo video
    }

    return (
        <dialog ref={videoDataRef}>
            <div className="edit-container">
                <h1>{cardEditId ? "EDITAR VIDEO" : "NUEVO VIDEO"}</h1>
                <svg onClick={closeModal} className="close-btn" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#1b5499" strokeWidth="1.5" />
                    <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <form action="" className="edit-form" onSubmit={handleSubmit}>

                    <label htmlFor="title" >Titulo</label>
                    <input
                        className="edit-input"
                        type="text" id="title"
                        onChange={handleChange}
                        value={formData.title}
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

                    <div className="modal-btn">
                        <button type="button"  onClick={closeModal} className="modal-btn-reset">Cancelar</button>
                        <button type="submit" className="modal-btn-submit">Guardar</button>
                    </div>

                </form>
            </div>
        </dialog>
    )
}

