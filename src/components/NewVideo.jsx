import { useState } from "react";
import { nanoid } from 'nanoid'


export default function NewVideo({ dialogRef, newVideo }) {
    
    const emptyCard = {
        id:"",
        title: "",
        image : "",
        description:"",
        category:"",
        video:''
    }
    const [formData, serFormData] = useState(emptyCard)

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
        const video = { ...formData, id: nanoid() }
        newVideo(video)
        serFormData(emptyCard)
    }

    return (
        <dialog ref={dialogRef}>
            <div className="edit-container">
                <h1>NUEVO VIDEO</h1>
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

