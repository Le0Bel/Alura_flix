import { nanoid } from 'nanoid'


export default function NewVideoNoControlada({ dialogRef, newVideo, closeNewVideoModal }) {
    

    function handleSubmit(e) {
        e.preventDefault();
        const fieldsValues = Object.fromEntries(new FormData(e.target))
        const video = { ...fieldsValues, id: nanoid() }
        newVideo(video)
        e.target.reset()
        closeNewVideoModal()
    }

    return (
        <dialog ref={dialogRef}>
            <div className="edit-container">
                <h1>NUEVO VIDEO</h1>
                <form action="" className="edit-form" onSubmit={handleSubmit}>

                    <label htmlFor="title" >Titulo</label>
                    <input
                        className="edit-input"
                        type="text" name="title" 
                    />

                    <label htmlFor="category">Categoria</label>
                    <input
                        className="edit-input"
                        type="text"
                        name="category"
                    />

                    <label htmlFor="image">Imagen</label>
                    <input
                        className="edit-input"
                        type="text" 
                        name="image"
                    />

                    <label htmlFor="video">Video</label>
                    <input
                        className="edit-input"
                        type="text" 
                        name="video"
                    />

                    <label htmlFor="description">Descripción</label>
                    <input
                        className="edit-input"
                        type="text" 
                        name="description"
                    />

                    <div>
                        <button type="submit">Guardar</button>
                        <button type="reset">Limpiar</button>
                    </div>

                </form>
            </div>
        </dialog>
    )
}

